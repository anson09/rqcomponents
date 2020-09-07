import "element-ui/lib/theme-chalk/base.css"; // el-icon
import RqHeader from "./Header.vue";

RqHeader.install = function (Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export default RqHeader;
