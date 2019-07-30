import RqHeader from "../packages/header";
import RqPersonalCenter from "../packages/personal-center";

const components = [
  RqHeader,
  RqPersonalCenter
];

const install = function(Vue, opt = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};

export {RqHeader, RqPersonalCenter};

export default {
  install,
};
