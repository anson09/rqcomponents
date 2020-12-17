import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import url from "@rollup/plugin-url";
import postcss from "rollup-plugin-postcss";
import vue from "rollup-plugin-vue";
import images from "rollup-plugin-image-files";

import meta from "./package.json";

const packagePath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "./packages"
);
const NOT_EXPORT = ["common"];
const exportPackages = [
  ["index", path.join(packagePath, "index.js")],
  ...fs
    .readdirSync(packagePath)
    .filter(
      (p) =>
        !NOT_EXPORT.includes(p) &&
        fs.statSync(path.join(packagePath, p)).isDirectory()
    )
    .map((p) => [`rq-${p}`, path.join(packagePath, p, "index.js")]),
];

const componentsConfig = exportPackages.map(([fileName, filePath]) => ({
  input: filePath,
  output: {
    file: `lib/${fileName}.js`,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    images(),
    vue({ css: false, needMap: false }),
    postcss({
      extract: `theme/${fileName}.css`,
      sourceMap: true,
    }),
  ],
  external: (id) =>
    new RegExp(
      `^(${Object.keys({
        ...meta.dependencies,
        ...meta.peerDependencies,
      }).join("|")})($|/)`
    ).test(id),
}));

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
    }),
    postcss({
      extract: "base.css",
      sourceMap: true,
    }),
  ],
};

export default [...componentsConfig, baseCssConfig];
