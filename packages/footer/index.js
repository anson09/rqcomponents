import "element-ui/lib/theme-chalk/popover.css";
import RqFooter from "./Footer.vue";

RqFooter.install = function (Vue) {
  Vue.component(RqFooter.name, RqFooter);
};

export default RqFooter;
