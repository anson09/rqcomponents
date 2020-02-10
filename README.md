# usage:

## Full

```js
import UI from "@rqjs/rqcomponents";

Vue.use(UI);

new Vue({
    el: "#rq-header",
    template: "<RqHeader></RqHeader>"
})
```

## Package

```js
import {RqHeader} from "@rqjs/rqcomponents";
import "@rqjs/rqcomponents/dist/rqcomponents.esm.css";
import "@rqjs/rqcomponents/packages/common/assets/icon/iconfont.css";

Vue.use(RqHeader);

new Vue({
    el: "#rq-header",
    template: "<RqHeader></RqHeader>"
})
```

### umd

bundled all assets

```js
import {RqHeader} from "@rqjs/rqcomponents/dist/rqcomponents.js";

Vue.use(RqHeader);

new Vue({
    el: "#rq-header",
    template: "<RqHeader></RqHeader>"
})
```


## Components

### RqHeader

> Common Header.

