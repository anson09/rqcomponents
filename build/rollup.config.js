import babel from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import vue from "rollup-plugin-vue";
import images from "rollup-plugin-image-files";
import filesize from "rollup-plugin-filesize";

import componentsList from "./components.json";
import pkg from "../package.json";

const { plugins: postcssPlugins } = require("../.postcssrc.js");

const componentsConfig = Object.entries(componentsList).map(
  ([fileName, filePath]) => ({
    input: filePath,
    output: {
      file: `lib/${fileName}.js`,
      format: "esm",
      sourcemap: true,
    },
    plugins: [
      json(),
      images(),
      vue({
        css: false,
        needMap: false,
      }),
      postcss({
        extract: `lib/theme/${fileName}.css`,
        plugins: postcssPlugins,
        // sourceMap: true,
      }),
      resolve(),
      babel({
        exclude: "node_modules/**",
        babelHelpers: "runtime",
        presets: [["@babel/preset-env", { modules: false }]],
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            {
              useESModules: true,
              // corejs: 3,
              // proposals: true,
              version: "^7.9.6",
            },
          ],
        ],
      }),
      commonjs(),
      filesize(),
    ].filter(Boolean),
    external: (id) =>
      new RegExp(
        `^(${Object.keys({
          ...pkg.dependencies,
          ...pkg.peerDependencies,
        }).join("|")})($|/)`
      ).test(id),
  })
);

const baseCssConfig = {
  input: "./packages/common/style/index.js",
  output: {
    // TODO css only
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
      limit: 0,
      fileName: "iconfont[extname]",
      destDir: "lib/theme",
    }),
    postcss({
      extract: "lib/theme/base.css",
      // sourceMap: true,
    }),
  ],
};
export default [...componentsConfig, baseCssConfig];
