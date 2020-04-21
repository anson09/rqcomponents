import babel from "rollup-plugin-babel";
import ignoreImport from "rollup-plugin-ignore-import";
import images from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import url from "@rollup/plugin-url";
import vue from "rollup-plugin-vue";
import filesize from "rollup-plugin-filesize";
import componentsList from "./components.json";
import pkg from "../package.json";
const { plugins: postPlugins } = require("../.postcssrc");

const external = Object.keys(pkg.peerDependencies || {});

const makeExternalPredicate = (externalArr) => {
  if (externalArr.length === 0) {
    return () => false;
  }
  const pattern = new RegExp(`^(${externalArr.join("|")})($|/)`);
  return (id) => pattern.test(id);
};

const createConfig = Object.entries(componentsList).map(
  ([fileName, filePath]) => {
    const isDev = process.env.NODE_ENV === "development";
    return {
      input: filePath,
      output: {
        file: `lib/${fileName}.js`,
        format: "esm",
      },
      plugins: [
        images(),
        ignoreImport({
          include: ["**/style/index.js"],
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
        }),
        vue({
          css: false,
          compileTemplate: true,
          htmlMinifier: {
            customAttrSurround: [
              [/@/, new RegExp("")],
              [/:/, new RegExp("")],
            ],
            collapseWhitespace: true,
            removeComments: true,
          },
        }),
        json(),
        // minify, can set off for develop
        !isDev && terser(),
        filesize(),
      ].filter(Boolean),
      external: makeExternalPredicate(external),
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
