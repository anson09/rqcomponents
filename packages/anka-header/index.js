import "element-ui/lib/theme-chalk/base.css"; // el-icon
import RqAnkaHeader from "./Header.vue";

RqAnkaHeader.install = function (Vue) {
  Vue.component(RqAnkaHeader.name, RqAnkaHeader);
};

export default RqAnkaHeader;
