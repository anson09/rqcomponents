import RqHeader from "./header/index";
import RqNotFound from "./not-found/index";
import RqMaintenance from "./maintenance/index";
import RqLogin from "./login/index";
import RqPicture from "./picture/index";

const components = [RqHeader, RqNotFound, RqMaintenance, RqLogin, RqPicture];

const install = function (Vue) {
  components.forEach((component) => {
    component.install(Vue);
  });
};

export { RqHeader, RqNotFound, RqMaintenance, RqLogin, RqPicture };

export default {
  install,
};
