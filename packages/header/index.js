import "../common/style";
import RqHeader from "./src/Header.vue";

/* istanbul ignore next */
RqHeader.install = function(Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export { RqHeader };
