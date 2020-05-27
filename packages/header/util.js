// redirect with v-router or windows.methods

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
    ? JSON.parse(localStorage[name] || "{}")
    : localStorage[name];

const setStorage = (key, val) =>
  localStorage.setItem(
    key,
    typeof val === "object" ? JSON.stringify(val) : val
  );

const removeStorage = (key) => localStorage.removeItem(key);

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
