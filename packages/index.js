import RqHeader from "./header/index";
import RqNotFound from "./not-found/index";
import RqMaintenance from "./maintenance/index";

const components = [RqHeader, RqNotFound, RqMaintenance];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqNotFound, RqMaintenance };

export default {
  install,
};
