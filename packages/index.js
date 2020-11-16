import RqHeader from "./header";
import RqFooter from "./footer";
import RqLoggedHeader from "./logged-header";
import RqNotFound from "./not-found";
import RqMaintenance from "./maintenance";

const components = [
  RqHeader,
  RqFooter,
  RqLoggedHeader,
  RqNotFound,
  RqMaintenance,
];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqFooter, RqNotFound, RqLoggedHeader, RqMaintenance };

export default {
  install,
};
