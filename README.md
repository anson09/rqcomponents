# Import

## Full Import（NOT RECOMMANDED）

```js
import UI from "@rqjs/rqcomponents";
import "@rqjs/rqcomponents/lib/theme/rqcomponents.css";
import "@rqjs/rqcomponents/lib/theme/base";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition
```

## Partial Import

rqcomponnets only exports esm standard packages now.

```js
import RqHeader from "@rqjs/rqcomponents/lib/[component-name]";
// Or import all components and deconstruction.
// import { RqHeader } from "@rqjs/rqcomponents";

import "@rqjs/rqcomponents/lib/theme/[component-name].css";
import "@rqjs/rqcomponents/lib/theme/base";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition
```

# Registration

## Global Registration

```js
import RqHeader from "@rqjs/rqcomponents/lib/[component-name]";

Vue.use(RqHeader);

new Vue({
  el: "#rq-header",
  render: (h) => h("RqHeader"),
});
```

## Local Registration

```js
import RqHeader from "@rqjs/rqcomponents/lib/[component-name]";

new Vue({
  el: "#rq-header",
  components: { RqHeader },
  render: (h) => h("RqHeader"),
});
```

# Components Description

## RqHeader

### props

#### notification: string | slot

Default: ""

Raise a warning on the top of the header.

#### before-logout: function(done: function) {}

Default: null

Custom way to handle logout event.

### events

#### create-workspace

Parameters:

Triggers when user click create workspace button.

#### switch-workspace

Parameters: currentWorkspaceId

Triggers when current workspace change.

## RqNotFound

## RqMaintenance

### props

#### date: string

Default: ""

The maintenance time.
