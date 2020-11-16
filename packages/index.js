import RqHeader from "./header";
import RqFooter from "./footer";
import RqLoggedHeader from "./logged-header";
import RqNotFound from "./not-found";

const components = [RqHeader, RqFooter, RqLoggedHeader, RqNotFound];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqFooter, RqNotFound };

export default {
  install,
};
