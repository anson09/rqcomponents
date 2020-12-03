# RQCOMPONENTS

> ricequant common vue componenets

## Release

master: https://www.npmjs.com/package/@rqjs/rqcomponents

## Import

### Full Import（NOT RECOMMANDED）

```js
import UI from "@rqjs/rqcomponents";
import "@rqjs/rqcomponents/lib/theme/index.css";
import "@rqjs/rqcomponents/lib/theme/base";
import "@rqjs/rqcomponents/lib/theme/base.css";
```

### Partial Import

rqcomponent only exports esm packages.

```js
import RqHeader from "@rqjs/rqcomponents/lib/[rq-component-name]";
// Or import all components and deconstruction.
// import { RqHeader } from "@rqjs/rqcomponents";

import "@rqjs/rqcomponents/lib/theme/[rq-component-name].css";
import "@rqjs/rqcomponents/lib/theme/base";
import "@rqjs/rqcomponents/lib/theme/base.css";
```

## Registration

### Global Registration

```js
import RqHeader from "@rqjs/rqcomponents/lib/[rq-component-name]";

Vue.use(RqHeader);

new Vue({
  el: "#rq-header",
  render: (h) => h(RqHeader),
});
```

### Local Registration

```js
import RqHeader from "@rqjs/rqcomponents/lib/[rq-component-name]";

new Vue({
  el: "#rq-header",
  components: { RqHeader },
  render: (h) => h(RqHeader),
});
```

## [Components Description Link](./COMPONENTS_DOC.md)

## Developer

### Commands

```bash
npm run start: preview components, need configure `nginx.sample.conf`,visit http://<host>/rqcomponents

npm run dev : generating publish files use watch mode

npm run build : generating publish files

npm run lint : audit code style

npm run clean : clear demo cache
```

### Contributions

1. [`git 规范`](http://wiki.ricequant.com/pages/viewpage.action?pageId=17269198)

2. [`lint 规范`](http://wiki.ricequant.com/pages/viewpage.action?pageId=45875427)

3. [`npm 规范`](http://wiki.ricequant.com/pages/viewpage.action?pageId=52232790)

4. [`icon 规范`](http://wiki.ricequant.com/pages/viewpage.action?pageId=19562729)
