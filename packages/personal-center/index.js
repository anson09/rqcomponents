import "../common/style";
import PersonalCenter from "./src/PersonalCenter";

PersonalCenter.install = function(Vue) {
  Vue.component(PersonalCenter.name, PersonalCenter);
};

export default PersonalCenter;
