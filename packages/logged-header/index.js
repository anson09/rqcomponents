import "element-ui/lib/theme-chalk/base.css"; // el-icon
import RqLoggedHeader from "./Header.vue";

RqLoggedHeader.install = function (Vue) {
  Vue.component(RqLoggedHeader.name, RqLoggedHeader);
};

export default RqLoggedHeader;
