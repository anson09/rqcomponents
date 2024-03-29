const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

/* no local variable now*/
// const file = path.resolve(__dirname, `packages/common/style/variables.scss`);

// function parseClass2Json(filePath, selector) {
//   const source = fs.readFileSync(filePath, "utf8");
//   const classScope = source.match(new RegExp(`${selector}.+?}`, "s"))[0];
//   const varLine = classScope.match(/--.+\)/g);
//   return Object.fromEntries(varLine.map((l) => l.split(":")));
// }

module.exports = {
  plugins:
    process.env.PARCEL_AUTOINSTALL === "false"
      ? [
          postcss.plugin("postcss-none", function () {
            return () => {};
          }),
        ]
      : [
          require("autoprefixer")({ grid: true }),
          require("postcss-css-variables")({
            preserve: true,
            preserveInjectedVariables: false,
            variables: Object.assign(
              {},
              // parseClass2Json(file, ".theme-light"),
              require("@rqjs/rqthemes/lib/light.json")
            ),
          }),
        ],
};
