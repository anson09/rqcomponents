import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import vue from 'rollup-plugin-vue';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import url from 'rollup-plugin-url';
import json from 'rollup-plugin-json';
import sass from 'node-sass';
import pkg from './package.json';

const ensureArray = maybeArr =>
    Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = externalArr => {



    if (externalArr.length === 0) {
        return () => false;
    }
    const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`);
    return id => pattern.test(id);
};

const processSass = function (context, payload) {
    return new Promise((resolve, reject) => {
        sass.render({
            file: context
        }, function (err, result) {
            if (!err) {
                resolve(result);
            } else {
                reject(err)
            }
        });
    })
}

const createConfig = ({output, browser = false, umd = false, env} = {}) => {
    const min = env === 'production';

    return {
        input: 'src/index.js',
        output: ensureArray(output).map(format =>
            Object.assign({}, format, {
                name: 'rqcomponent',
                exports: 'named',
                sourcemap: true,
            })
        ),
        plugins: [
            url({
                limit: 10 * 1024,
                include: ['**/*.eot', '**/*.woff', '**/*.woff2', '**/*.ttf', '**/*.svg', '**/*.png'],
                emitFiles: true
            }),
            postcss({
                extract: false,
                minimize: min,
                sourceMap: true,
                process: processSass,
            }),
            resolve(),
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true,
                plugins: [
                    [
                        '@babel/transform-runtime',
                        {useESModules: output.format !== 'cjs'}
                    ]
                ]
            }),
            commonjs(),
            vue(),
            json()
        ].filter(Boolean),
        external: makeExternalPredicate(umd ? external : allExternal)
    };
};

const configs = {
    cjs: {
        output: {file: pkg.main, format: 'cjs'}
    },
    esm: {
        output: {file: pkg.module, format: 'esm'}
    },
    umd_prod: {
        output: {file: pkg.unpkg.replace(/\.min\.js$/, '.js'), format: 'umd'},
        umd: true,
        env: 'development'
    },
    umd: {
        output: {file: pkg.unpkg, format: 'umd'},
        umd: true,
        env: 'production'
    }
};

const buildTypes = Object.keys(configs);
const {ROLLUP_BUILDS = buildTypes.join(',')} = process.env;
const builds = ROLLUP_BUILDS.split(',');

export default buildTypes
    .filter(type => builds.includes(type))
    .map(type => createConfig(configs[type]));