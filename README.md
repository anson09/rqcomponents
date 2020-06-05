# Import:

## Full Import（NOT RECOMMANDED）

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

## Partial Import

rqcomponnets only exports esm standard packages now.

```js
import RqHeader from "@rqjs/rqcomponents/lib/[componentName]";
// Or import all components and deconstruction.
// import { RqHeader } from "@rqjs/rqcomponents";

import "@rqjs/rqcomponents/lib/theme/[componentName].css";
import "@rqjs/rqcomponents/lib/theme/base.css"; // iconfont and transition

Vue.use(RqHeader);

new Vue({
  el: "#rq-header",
  template: "<RqHeader></RqHeader>",
});
```

# Components Description

## RqHeader

### props:

#### notification: string | slot

Default: ""

Raise a warning on the top of the header.

#### opacity: boolean

Default: false

Set background opacity with white font-color.

#### topic: string

Default: ""

A clear header with a topic text only.

#### config: object

Default: { router: false, admin: flase, ankaPrefix: '/welcome' }

router: whether to use vue-router or window.location.href in handleLink.

admin: whether to use vue-events(auth) or redirect when click login or register button.

ankaPrefix: anka publick path.

##### before-logout: function(done: function) {}

Default: null

Custom way to handle logout event.

### events:

#### auth

Parameters: mode(login|register)

Triggers when user click login or register button.

#### createWorkspace

Parameters:

Triggers when user click create workspace button.

### switchWorkspace

Parameters: currentWorkspaceId

Triggers when current workspace change.

## RqFooter

### props:

#### config: object

Default: { router: false, admin: flase, ankaPrefix: '/welcome' }

router: whether to use vue-router or window.location.href in handleLink.

admin: whether to use vue-events(auth) or redirect when click login or register button.

ankaPrefix: anka publick path.

#### opacity: boolean

Default: false

Set background opacity with white font-color.
