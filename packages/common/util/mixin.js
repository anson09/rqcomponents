const methods = {
  handleLink(params) {
    if (!params) return;
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
      // 新开tab
      if (inner) {
        // 若是 anka 内部链接，则补上 /welcome 前缀
        prefix = this.rootConfig.ankaPrefix;
      }
      window.open(prefix + href);
    } else if (!outer && this.rootConfig.router && this.$router) {
      // anka 项目中，非内部链接则直接使用 router 跳转
      this.$router.push(href);
    } else {
      // 其他项目中，若是没有带 outer 则需要补上 /welcome
      if (!outer) {
        prefix = this.rootConfig.ankaPrefix;
      }
      window.location.href = prefix + href;
    }
  },
  getFirstPath() {
    const path = this.getPath();
    return path.match(/\/(.*?)(\/|$)/)?.[1] ?? path;
  },
  handleEvent(event) {
    const dialogModes = ["login", "forget", "register"];
    if (!dialogModes.includes(event)) {
      return;
    }
    if (this.rootConfig.admin) {
      this.$emit("auth", event);
    } else {
      const paramStr = Object.entries({
        redirect: encodeURIComponent(window.location.href),
        auth: event,
      })
        .map((kv) => kv.join("="))
        .join("&");
      window.location.href = `${this.rootConfig.ankaPrefix}/?${paramStr}`;
    }
  },
  getPath() {
    let path;
    // config.router 只有 anka 有，为了过滤出 welcome
    if (this.rootConfig.router && this.$route) {
      path = this.$route.path;
    } else {
      path = window.location.href
        .split("/")
        .slice(3)
        .map((key) => `/${key}`)
        .join("");
    }

    return path.replace(/\/$/, "");
  },
};

export default {
  inject: ["rootConfig"],
  methods,
};

export const rootMixin = {
  props: {
    config: {
      default: () => ({
        router: false,
        admin: false,
        ankaPrefix: "/welcome",
      }),
      type: Object,
    },
  },
  provide() {
    return {
      rootConfig: this.config,
    };
  },
  computed: {
    rootConfig() {
      return this.config;
    },
  },
  methods,
};
