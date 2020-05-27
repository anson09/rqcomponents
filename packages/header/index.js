import "element-ui/lib/theme-chalk/base.css";
import "element-ui/lib/theme-chalk/button.css";
import "element-ui/lib/theme-chalk/message.css";
import "element-ui/lib/theme-chalk/popover.css";
import RqHeader from "./Header.vue";

RqHeader.install = function (Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export default RqHeader;
