export default {
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
  methods: {
    // eslint-disable-next-line complexity
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
          prefix = this.config.ankaPrefix;
        }
        window.open(prefix + href);
      } else if (!outer && this.config.router && this.$router) {
        // anka 项目中，非内部链接则直接使用 router 跳转
        this.$router.push(href);
      } else {
        // 其他项目中，若是没有带 outer 则需要补上 /welcome
        if (!outer) {
          prefix = this.config.ankaPrefix;
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
      if (this.config.admin) {
        this.$emit("auth", event);
      } else {
        const paramStr = Object.entries({
          redirect: encodeURIComponent(window.location.href),
          auth: event,
        })
          .map((kv) => kv.join("="))
          .join("&");
        window.location.href = `${this.config.ankaPrefix}/?${paramStr}`;
      }
    },
    getPath() {
      // config.router 只有 anka 有，为了过滤出 welcome
      if (this.config.router && this.$route) {
        return this.$route.path;
      }
      const path = window.location.href.split("/").slice(3);
      return path.map((key) => `/${key}`).join("");
    },
  },
};
