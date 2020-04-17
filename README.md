# usage:

## Full

```js
import UI from "@rqjs/rqcomponents";
import "@rqjs/rqcomponents/lib/theme/rqcomponents.css";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition

Vue.use(UI);

new Vue({
  el: "#rq-header",
  template: "<RqHeader></RqHeader>",
});
```

## Package

All format as esm script.

```js
import { RqHeader } from "@rqjs/rqcomponents/lib/[componentName]";
import "@rqjs/rqcomponents/lib/theme/[componentName].css";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition

Vue.use(RqHeader);

new Vue({
  el: "#rq-header",
  template: "<RqHeader></RqHeader>",
});
```

Or import all components and deconstruction.

```js
import { RqHeader } from "@rqjs/rqcomponents";
import "@rqjs/rqcomponents/lib/theme/[componentName].css";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition

Vue.use(RqHeader);

new Vue({
  el: "#rq-header",
  template: "<RqHeader></RqHeader>",
});
```

## Components

### RqHeader

> Common Header.

#### props:

##### notification: string | slot

Default: ""
Raise a warning on the top of the header.

##### opacity: boolean

Default: false
Set background opacity with white font-color;

##### topic: string

Default: ""
A clear header with a topic text only.
