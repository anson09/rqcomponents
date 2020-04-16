import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import vue from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import json from "rollup-plugin-json";
import { terser } from "rollup-plugin-terser";
import images from "@rollup/plugin-image";
import ignoreImport from "rollup-plugin-ignore-import";
import pkg from "../package.json";
import componentsList from "./components.json";
const { plugins: postPlugins } = require("../.postcssrc");

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

const createConfig = Object.entries(componentsList).map(
  ([fileName, filePath]) => {
    return {
      input: filePath,
      output: {
        file: `lib/${fileName}.js`,
        format: "cjs",
        name: fileName,
        exports: "named",
        sourcemap: true,
      },
      plugins: [
        images(),
        ignoreImport({
          include: "**/iconfont.css",
          body: "",
        }),
        postcss({
          extract: true,
          plugins: postPlugins,
          minimize: true,
          sourceMap: false,
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
              {
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
      external: makeExternalPredicate(allExternal),
    };
  }
);

export default createConfig;
