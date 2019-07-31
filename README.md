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

Vue.use(RqHeader);

new Vue({
    el: "#rq-header",
    template: "<RqHeader></RqHeader>"
})
```

## Components

### RqHeader

> Common Header for user logged.

#### Events

- logout

### RqPersonalCenter

> Personal center component.

#### Props

- uid: Number
  - reqiured: true

### Event

- follow

  #### params

  - uid: Number, user uid
  - follow: Boolean

- redirect

  #### params

  - pathParams: String

  ```javascript
  // example
  @redirect="redirect"
  
  //methods
  redirect(...path) {
    doRedirect(path.join('/'))
  }
  ```

# TODO

- [ ] move all styles, fonts to theme
