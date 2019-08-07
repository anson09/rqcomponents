function methodConstructor(cfg)  {
  return {
    handleLink(link) {
      if (typeof link === "string") {
        link = {href: link};
      }
      const {
        outer,
        inner,
        href,
        newBlock,
        event
      } = link;
      if (event) {
        this.handleEvent(event);
        return;
      } else if (!href) return;
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
          auth: event
        })
        .map((kv) => kv.join("="))
        .join("&");
        window.location.href = `${cfg.ankaPrefix}/?${paramStr}`;
      }
    },
    getPath() {
      if (cfg.router && this.$route) {
        return this.$route.path;
      } else {
        const path = window.location.href.split("/").slice(3);
        return path.map(key => "/" + key).join("");
      }
    }
  }
}

export {methodConstructor}
