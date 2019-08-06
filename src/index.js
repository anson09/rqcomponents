import RqHeader from "../packages/header";
import RqPersonalCenter from "../packages/personal-center";

const components = [
  RqHeader,
  RqPersonalCenter
];

const install = function(Vue, opt = {}) {
  components.forEach(component => {
    component.install(Vue, opt[component.name]);
  });
};

export {RqHeader, RqPersonalCenter};

export default {
  install,
};
