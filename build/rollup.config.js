import { getBabelOutputPlugin } from "@rollup/plugin-babel";
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
      images(),
      vue({ css: false }),
      postcss({
        extract: `theme/${fileName}.css`,
        plugins: postcssPlugins,
      }),
      getBabelOutputPlugin({
        presets: [["@babel/preset-env", { targets: "defaults" }]],
        plugins: [
          [
            "@babel/plugin-transform-runtime",
            {
              useESModules: true,
              corejs: { version: 3, proposals: true },
              version: "^7.12.5",
            },
          ],
        ],
      }),
      filesize(),
    ],
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
    file: "lib/theme/base.js",
  },
  plugins: [
    url({
      include: ["**/*.eot", "**/*.woff", "**/*.woff2", "**/*.ttf", "**/*.svg"],
      limit: 0,
      fileName: "[name][extname]",
      destDir: "lib/theme",
    }),
    postcss({
      extract: "base.css",
    }),
  ],
};
export default [...componentsConfig, baseCssConfig];
