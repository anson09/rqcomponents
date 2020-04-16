#!/usr/bin/env bash

eslint --fix "src/index.js"
eslint --fix "packages/**/*.{vue,js}"
stylelint --fix "packages/**/*.{vue,scss}"
prettier --write "**/*.{vue,js,html,scss,json,yml,md}"
