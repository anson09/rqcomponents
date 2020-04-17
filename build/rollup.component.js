import babel from "rollup-plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import ignoreImport from "rollup-plugin-ignore-import";
import images from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import url from "@rollup/plugin-url";
import vue from "rollup-plugin-vue";

import componentsList from "./components.json";
import pkg from "../package.json";
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
        format: "esm",
        name: fileName,
        exports: "named",
      },
      plugins: [
        images(),
        ignoreImport({
          include: ["**/style/index.js"],
          body: "",
        }),
        postcss({
          extract: `lib/theme/${fileName}.css`,
          plugins: postPlugins,
          minimize: true,
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

const iconfont = {
  input: "./packages/common/style/index",
  output: {
    // FIXME css only
    file: "lib/base.js",
  },
  onwarn: () => {},
  plugins: [
    url({
      include: [
        "**/*.eot",
        "**/*.woff",
        "**/*.woff2",
        "**/*.ttf",
        "**/*.svg",
        "**/*.png",
        "**/*.jpg",
      ],
      fileName: "iconfont[extname]",
      destDir: "lib/theme",
    }),
    postcss({
      extract: "lib/theme/base.css",
      minimize: true,
    }),
  ],
};
export default [...createConfig, iconfont];
