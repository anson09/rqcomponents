// redirect with v-router or windows.methods
function methodConstructor(cfg) {
  return {
    handleLink(params) {
      let link = params;
      if (typeof link === "string") {
        link = { href: link };
      }
      const { outer, inner, href, newBlock, event } = link;
      if (event) {
        this.handleEvent(event);
        return;
      }
      if (!href) return;
      let prefix = "";
      if (newBlock) {
        if (inner) {
          prefix = cfg.ankaPrefix;
        }
        window.open(prefix + href);
      } else if (!outer && cfg.router && this.$router) {
        this.$router.push(href);
      } else {
        if (!outer) {
          prefix = cfg.ankaPrefix;
        }
        window.location.href = prefix + href;
      }
    },
    handleEvent(event) {
      const dialogModes = ["login", "forget", "register"];
      if (!dialogModes.includes(event)) {
        return;
      }
      if (cfg.admin) {
        this.$emit("auth", event);
      } else {
        const paramStr = Object.entries({
          redirect: encodeURIComponent(window.location.href),
          auth: event,
        })
          .map((kv) => kv.join("="))
          .join("&");
        window.location.href = `${cfg.ankaPrefix}/?${paramStr}`;
      }
    },
    getPath() {
      if (cfg.router && this.$route) {
        return this.$route.path;
      }
      const path = window.location.href.split("/").slice(3);
      return path.map((key) => `/${key}`).join("");
    },
  };
}

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

export { methodConstructor, THEME_MODE, themeRender, isSupported };
