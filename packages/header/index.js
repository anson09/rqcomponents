import "../common/style";
import RqHeader from "./src/Header";

RqHeader.install = function(Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

export default RqHeader;
