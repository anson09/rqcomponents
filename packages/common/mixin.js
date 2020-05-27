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
          prefix = this.config.ankaPrefix;
        }
        window.open(prefix + href);
      } else if (!outer && this.config.router && this.$router) {
        this.$router.push(href);
      } else {
        if (!outer) {
          prefix = this.config.ankaPrefix;
        }
        window.location.href = prefix + href;
      }
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
      if (this.config.router && this.$route) {
        return this.$route.path;
      }
      const path = window.location.href.split("/").slice(3);
      return path.map((key) => `/${key}`).join("");
    },
  },
};
