import "../common/style";
import RqHeader from "./src/Header.vue";

RqHeader.install = function(Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export default RqHeader;
