import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import url from "rollup-plugin-url";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import images from "rollup-plugin-image-files";
import ignoreImport from "rollup-plugin-ignore-import";
import pkg from "./package.json";

const ensureArray = maybeArr =>
  Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return id => pattern.test(id);
};

const createConfig = ({ output, umd = false, env } = {}) => {
  const min = env === "production";

  return {
    input: "src/index.js",
    output: ensureArray(output).map(format =>
      Object.assign({}, format, {
        name: "rqcomponent",
        exports: "named",
        sourcemap: true,
        amd: { id: "rqcomponents" }
      })
    ),
    plugins: [
      umd &&
        url({
          limit: 1024 * 1024,
          include: [
            "**/*.eot",
            "**/*.woff",
            "**/*.woff2",
            "**/*.ttf",
            "**/*.svg",
            "**/*.png",
            "**/*.jpg"
          ],
          emitFiles: true
        }),
      !umd && images(),
      !umd &&
        ignoreImport({
          include: "**/iconfont.css",
          body: ""
        }),
      postcss({
        extract: !umd,
        plugins: require("./.postcssrc").plugins,
        minimize: min,
        sourceMap: !min
      }),
      resolve({
        preferBuiltins: false,
        browser: true
      }),
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
        presets: [
          [
            "@babel/preset-env",
            umd
              ? {
                  corejs: 2,
                  modules: false,
                  useBuiltIns: "usage",
                  targets: {
                    ie: "11"
                  }
                }
              : {
                  targets: {
                    ie: "11"
                  }
                }
          ]
        ],
        plugins: [["@babel/plugin-proposal-object-rest-spread"]]
      }),
      commonjs(),
      vue({css: false}),
      json(),
      terser({
        include: [/^.+\.min\.js$/]
      })
    ].filter(Boolean),
    external: makeExternalPredicate(umd ? external : allExternal)
  };
};

const configs = {
  cjs: {
    output: { file: pkg.main, format: "cjs" }
  },
  esm: {
    output: { file: pkg.module, format: "esm" }
  },
  umd: {
    output: { file: pkg.unpkg.replace(/\.min\.js$/, ".js"), format: "umd" },
    umd: true,
    env: "development"
  },
  umd_prod: {
    output: { file: pkg.unpkg, format: "umd" },
    umd: true,
    env: "production"
  }
};

const buildTypes = Object.keys(configs);
const { ROLLUP_BUILDS = buildTypes.join(",") } = process.env;
const builds = ROLLUP_BUILDS.split(",");

export default buildTypes
  .filter(type => builds.includes(type))
  .map(type => createConfig(configs[type]));
