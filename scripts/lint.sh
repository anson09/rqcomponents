#!/usr/bin/env bash
set -ex

eslint --fix "*.js" "packages/**/*.{vue,js}" "demo/*.{vue,js}"
stylelint --fix "packages/**/*.{vue,scss}"
prettier --write "**/*.{vue,js,html,scss,json,yml,md}"
