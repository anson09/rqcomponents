// redirect with v-router or windows.methods
function methodConstructor(cfg) {
  return {
    // eslint-disable-next-line complexity
    handleLink(params) {
      let link = params;
      if (typeof link === "string") {
        link = { href: link };
      }
      const { outer, inner, newBlock, event } = link;
      let { href } = link;

      if (event) {
        if (event === "roadShow") {
          const path = this.getFirstPath();
          if (["quant", "ams", "rqdata", "rqoptimizer"].includes(path)) {
            href += `#${path}`;
          }
        } else {
          this.handleEvent(event);
          return;
        }
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
    getFirstPath() {
      const path = this.getPath();
      return path.match(/\/(.*?)(\/|$)/)?.[1] ?? path;
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
