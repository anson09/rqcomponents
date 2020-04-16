import "element-ui/lib/theme-chalk/base.css";
import "element-ui/lib/theme-chalk/button.css";
import "element-ui/lib/theme-chalk/message.css";
import "element-ui/lib/theme-chalk/popover.css";
import "../common/style";
import RqHeader from "./src/Header.vue";
import { methodConstructor } from "./util";

RqHeader.install = function (Vue, option) {
  const cfg = {
    router: false,
    admin: false,
    ankaPrefix: "/welcome",
  };
  if (option) {
    Object.keys(cfg).forEach((key) => {
      if (key in option) {
        cfg[key] = option[key];
      }
    });
  }
  RqHeader.methods = Object.assign(
    RqHeader.methods || {},
    methodConstructor(cfg)
  );
  Vue.component(RqHeader.name, RqHeader);
};

export default RqHeader;
