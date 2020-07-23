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

const isSupported = () =>
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports("color", "var(--fake-var)");

const isProductPath = (path) =>
  ["/ams", "/quant"].some((url) => path.includes(url));

const flattenNode = (node, level = 0) => {
  if (Array.isArray(node)) {
    return [
      ...node.reduce((arr, item) => [...arr, ...flattenNode(item, level)], []),
    ];
  }
  const isRoot = level === 0;
  if (node.links) {
    const obj = { ...node };
    delete obj.links;
    return [
      { ...obj, level, isRoot, isLeaf: false },
      ...flattenNode(node.links, level + 1),
    ];
  }
  return [{ ...node, level, isRoot, isLeaf: true }];
};
export { THEME_MODE, themeRender, isSupported, isProductPath, flattenNode };
