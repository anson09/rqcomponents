import RqHeader from "./header";
import RqNotFound from "./not-found";
import RqMaintenance from "./maintenance";

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
