import RqHeader from "../packages/header";
import UndoneDialog from "../packages/undone";

const components = [
  UndoneDialog,
  RqHeader
];

const install = function(Vue, opt = {}) {
  components.forEach(component => {
    component.install(Vue, opt[component.name]);
  });
};

export {RqHeader, UndoneDialog};

export default {
  install,
};
