// redirect with v-router or windows.methods

import { storageKeys } from "../common/assets/dict/config";

const THEME_MODE = ["dark", "light"];

const themeRender = (theme = "light") => {
  if (!THEME_MODE.includes(theme)) return;
  const bodyClassList = document.body.classList;
  bodyClassList.add(`theme-${theme}`);
  [...bodyClassList]
    .filter(
      (className) => className.includes("theme") && !className.includes(theme)
    )
    .map((className) => bodyClassList.remove(className));
};

const getStorage = (name, type = "object") =>
  type === "object"
    ? JSON.parse(localStorage[storageKeys[name]] || "{}")
    : localStorage[storageKeys[name]];

const setStorage = (name, val) =>
  localStorage.setItem(
    storageKeys[name],
    typeof val === "object" ? JSON.stringify(val) : val
  );

const removeStorage = (name) => localStorage.removeItem(storageKeys[name]);

const isSupported = () =>
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports("color", "var(--fake-var)");

const isProductPath = (path) =>
  ["/ams", "/quant"].some((url) => path.includes(url));

export {
  THEME_MODE,
  themeRender,
  isSupported,
  isProductPath,
  getStorage,
  setStorage,
  removeStorage,
};
