import "../common/style";
import RqHeader from "./src/Header";

/* istanbul ignore next */
RqHeader.install = function(Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export { RqHeader };
