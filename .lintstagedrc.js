const { ESLint } = require("eslint");
const eslintCli = new ESLint();

const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

const removeIgnoredFiles = async (files) => {
  const filteredFiles = await asyncFilter(files, async (file) => {
    const isIgnored = await eslintCli.isPathIgnored(file);
    return !isIgnored;
  });
  return filteredFiles.join(" ");
};

const eslint = async (files) =>
  "eslint --fix --max-warnings=0 " + (await removeIgnoredFiles(files));
const stylelint = (files) => `stylelint --fix --mw 0 ${files.join(" ")}`;
const prettier = (files) => `prettier --write ${files.join(" ")}`;

function rules(...args) {
  return async (files) => Promise.all(args.map((f) => f(files)));
}

module.exports = {
  "*.vue": rules(eslint, stylelint, prettier),
  "*.js": rules(eslint, prettier),
  "*.scss": rules(stylelint, prettier),
  "*.{html,yml,json,md}": rules(prettier),
};
