import "../common/style";
import PersonalCenter from "./src/PersonalCenter.vue";

PersonalCenter.install = function(Vue) {
  Vue.component(PersonalCenter.name, PersonalCenter);
};

export default PersonalCenter;
