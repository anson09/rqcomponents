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
import pkg from "../package.json";
import componentsList from "./components.json";
import { plugins as postPlugins } from "./.postcssrc";

const ensureArray = (maybeArr) =>
  Array.isArray(maybeArr) ? maybeArr : [maybeArr];

const external = Object.keys(pkg.peerDependencies || {});
const allExternal = external.concat(Object.keys(pkg.dependencies || {}));

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return (id) => pattern.test(id);
};

const createConfig = ({ output, umd = false, env } = {}) =>
  Object.entries(componentsList).map(([fileName, filePath]) => {
    const min = env === "production";
    console.log("fileName, filePath", fileName, filePath);

    return {
      input: filePath,
      output: ensureArray(output).map((format) => ({
        ...format(fileName),
        name: fileName,
        exports: "named",
        sourcemap: true,
      })),
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
              "**/*.jpg",
            ],
            emitFiles: true,
          }),
        !umd && images(),
        !umd &&
          ignoreImport({
            include: "**/iconfont.css",
            body: "",
          }),
        postcss({
          extract: !umd,
          plugins: postPlugins,
          minimize: min,
          sourceMap: !min,
        }),
        resolve({
          preferBuiltins: false,
          browser: true,
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
                      ie: "11",
                    },
                  }
                : {
                    targets: {
                      ie: "11",
                    },
                  },
            ],
          ],
          plugins: [["@babel/plugin-proposal-object-rest-spread"]],
        }),
        commonjs(),
        vue({ css: false }),
        json(),
        terser({
          include: [/^.+\.min\.js$/],
        }),
      ].filter(Boolean),
      external: makeExternalPredicate(umd ? external : allExternal),
    };
  });

const configs = {
  cjs: {
    output: (name) => ({ file: `lib/${name}.cjs.js`, format: "cjs" }),
  },
  esm: {
    output: (name) => ({ file: `lib/${name}.esm.js`, format: "esm" }),
  },
  umd: {
    output: (name) => ({ file: `lib/${name}.js`, format: "umd" }),
    umd: true,
    env: "development",
  },
  umd_prod: {
    output: (name) => ({ file: `lib/${name}.min.js`, format: "umd" }),
    umd: true,
    env: "production",
  },
};

const buildTypes = Object.keys(configs);
const { ROLLUP_BUILDS = buildTypes.join(",") } = process.env;
const builds = ROLLUP_BUILDS.split(",");

Object.defineProperty(Array.prototype, "flat", {
  value: function (depth = 1) {
    return this.reduce(function (flat, toFlatten) {
      return flat.concat(
        Array.isArray(toFlatten) && depth > 1
          ? toFlatten.flat(depth - 1)
          : toFlatten
      );
    }, []);
  },
});

console.log(
  buildTypes
    .filter((type) => builds.includes(type))
    .map((type) => createConfig(configs[type]))
);

console.log(
  buildTypes
    .filter((type) => builds.includes(type))
    .map((type) => createConfig(configs[type]))
    .flat()
);

export default buildTypes
  .filter((type) => builds.includes(type))
  .map((type) => createConfig(configs[type]))
  .flat();
