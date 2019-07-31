'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('lodash/snakeCase');
var axios = _interopDefault(require('axios'));

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".rq-zoom-in-top-enter-active,\n.rq-zoom-in-top-leave-active {\n  opacity: 1;\n  transform: translateY(0) scaleY(1);\n  transition: all 0.3s;\n  transform-origin: center top; }\n\n.rq-zoom-in-top-enter,\n.rq-zoom-in-top-leave-active {\n  opacity: 0;\n  transform: translateY(-10%) scaleY(0); }\n\n.rq-fade-in-linear-item {\n  transition: all 1s;\n  display: inline-block; }\n\n.rq-fade-in-linear-enter-active,\n.rq-fade-in-linear-leave-active {\n  transition: all 0.3s; }\n\n.rq-fade-in-linear-enter,\n.rq-fade-in-linear-leave,\n.rq-fade-in-linear-leave-active,\n.rq-fade-in-item-move {\n  opacity: 0; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIl90cmFuc2l0aW9uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0VBRUUsVUFBVTtFQUNWLGtDQUFrQztFQUNsQyxvQkFBb0I7RUFDcEIsNEJBQTRCLEVBQUU7O0FBRWhDOztFQUVFLFVBQVU7RUFDVixxQ0FBcUMsRUFBRTs7QUFFekM7RUFDRSxrQkFBa0I7RUFDbEIscUJBQXFCLEVBQUU7O0FBRXpCOztFQUVFLG9CQUFvQixFQUFFOztBQUV4Qjs7OztFQUlFLFVBQVUsRUFBRSIsImZpbGUiOiJfdHJhbnNpdGlvbi5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnJxLXpvb20taW4tdG9wLWVudGVyLWFjdGl2ZSxcbi5ycS16b29tLWluLXRvcC1sZWF2ZS1hY3RpdmUge1xuICBvcGFjaXR5OiAxO1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoMCkgc2NhbGVZKDEpO1xuICB0cmFuc2l0aW9uOiBhbGwgMC4zcztcbiAgdHJhbnNmb3JtLW9yaWdpbjogY2VudGVyIHRvcDsgfVxuXG4ucnEtem9vbS1pbi10b3AtZW50ZXIsXG4ucnEtem9vbS1pbi10b3AtbGVhdmUtYWN0aXZlIHtcbiAgb3BhY2l0eTogMDtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xMCUpIHNjYWxlWSgwKTsgfVxuXG4ucnEtZmFkZS1pbi1saW5lYXItaXRlbSB7XG4gIHRyYW5zaXRpb246IGFsbCAxcztcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrOyB9XG5cbi5ycS1mYWRlLWluLWxpbmVhci1lbnRlci1hY3RpdmUsXG4ucnEtZmFkZS1pbi1saW5lYXItbGVhdmUtYWN0aXZlIHtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3M7IH1cblxuLnJxLWZhZGUtaW4tbGluZWFyLWVudGVyLFxuLnJxLWZhZGUtaW4tbGluZWFyLWxlYXZlLFxuLnJxLWZhZGUtaW4tbGluZWFyLWxlYXZlLWFjdGl2ZSxcbi5ycS1mYWRlLWluLWl0ZW0tbW92ZSB7XG4gIG9wYWNpdHk6IDA7IH1cbiJdfQ== */";
styleInject(css);

var headerBtns = [
	{
		label: "帮助文档",
		links: [
			{
				label: "系统文档",
				href: "/api/python/chn"
			},
			{
				label: "研究文档",
				href: "/api/research/chn"
			},
			{
				label: "API文档",
				href: "/api/python/chn"
			},
			{
				label: "数据文档",
				href: "/fundamentals"
			},
			{
				label: "常见问题特殊情况",
				href: "/faq"
			}
		]
	},
	{
		label: "社区",
		herf: "/community"
	},
	{
		type: "header",
		img: "avator",
		links: [
			{
				label: "设置",
				href: "/profile"
			},
			{
				label: "首页",
				href: "/"
			},
			{
				label: "登出",
				href: "/"
			}
		]
	}
];

const instance = axios.create({
  baseURL: "/",
  timeout: 3000
});

function queryStringify(data) {
  return Object.entries(data).map(kvArr => kvArr.join("=")).join("&");
}

async function urlencodePost(url, params) {
  const data = await instance({
    url,
    method: "post",
    headers: {
      "content-type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    data: queryStringify(params)
  });
  return data;
}

const getAccount = () => {
  return urlencodePost("api/user/isLogin.do", {});
};

var logo = "data:image/png;base64,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";

var header = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAiCAYAAAAzrKu4AAAEyklEQVRYR62Xb0xbVRjGn/e2BWRg0OgYvaBkQpaoM1liEGgr4qKRmJA4AzMOeu+cWfTLTBb8lwwz55ZANpMZ/bK5bC1g5sZcdP6Zi3GM0cLcF6ObusRpiOu9MGdcmLP8Kb2vuReBMkp7buF8bJ/f8z4559xz3kPIYLj9/WuI+HEwHgHxKoBkgPMAMAMjBFxl0AUCvo9LjpPDhyp/tluGRIECtadgGbteBngjQOWi3JSOfgWwLxqNHrje/cSICJs2WFndV9mjy/NbGPQaAbeLmC6kYeCGBNoViWp70d04kcorZTBryWAcBmHVYgIlYS8hzs9pXb4fFvJdMJis9PsBYz+A7CUONWXHGAXxS1rQ15HMP2kw2R/eCvAeENIu9aJCs/WxbNE7vB/c6jOvsFsJbSLgQ3PHLqqoOMwM2qQHPYcSkTnFZTVUCaZegLPEfZdEOUYGPxbp9H037TYTrLD51DKnlHcR4FKbpf4GcIIJ1llFjPsB1AO406bP75yds1rf/3DU8pmGi5W+dvNIsGVG9N64xK1/HfT+k8jd9UIoPytOOwm8xY4fE7frAd8bM8HubTpbNOmQfgNwm7gRt2pB385UetkfagVhh7AnY3RCylp5LVAxbM1YsRpuY+bXhQ1A57VgdaW1cCkHk6z0nwO4QtSbGG2RDu+bhIajDjnXfQVAkSgMYr8W8HWK6GU13AzmpGfVAvyQFtVLqEgJPyqBe0WKTGskUNmVoMdc+rSjuKm/jB2GeVcKDwNUQ24l9DYBbwlTAFwUKxoM1A6LMKXq+RUxnhgS0U5rGNhBshL6AsDTdkAwVWsdngERRvaHq0DcL6JN0HxpBjOnucwOSMCeSND7qghTrIR2M9Aiop3V0GUz2HUABfZARCXQQ+n2WYkSvs8A/wgg15Y/0Yi5x2IEOG2BlpguxUmqGw5UDSZjV6gDpQ4j/nWGLdOkOWM3AOTbD2YR5mzvZoM/0jt9f5g/uJv77iGJNgAwl/qODH3/NYOZhiUZGsxijJtTEwmz91/koAjJ/vAZENcs0mlJcQb6SFbDe8H8im1nxk2WcEJiOs5sXJjkqGZ6OClXJpJWG8TryEB9JjNIRO+TrPY1gOmojWAGgQ5OuBzb/jxQeTUVt/zFc4VZscldDGwEINmosZ7ubujJy8p1XQOQIwBGmaQNeqD6UwHtjKTI3/eMRNQleGyMjU46C63uQlZCRwA0pi7G4wznWj1YFbYTalrrVgY8hPi3aR83RN1awNM41fb4z1YwSTNtbbLCRLQ5EvCYb4GMh6z0bQZoXyoDjsc9eldN/0wH61ZDJ4nxVFKI6bTW4VmbcaIEUFZCpwHUJvNiolN6wGNlmG2t1d5yZod5fczfazYu7XTh3U291eRwJNsO44bhWDPUWfXLnGDWXlPDW8H8bqI5Az/pQe+D6Qra+d+thC4S8MBchlq0oGem9ry3o6yGPwbz+mmIidr1gMd6ICzVcKvhNprTyvMxLehtTGzV5wUrVXtyJtj1GQFPWlNq4NlIp/f4UoWyPjY1tI4Zn/zvecZFsbrBQO1YYo2kr20zXIyzjgBcb6cpFA2f0Dx+7qJY462h5u2xucZsXlfbaFI6HOmqvixaVERXrPaWG4bzeX3lN+9g+3YjGfMfxI+037oKIooAAAAASUVORK5CYII=";

//
var script = {
  name: "RqHeader",

  data() {
    return {
      images: {
        logo,
        header
      },
      avatar: header,
      btnConfig: headerBtns
    };
  },

  async mounted() {
    //mock cookie
    // sid: a2c39e88-5151-4c68-a69f-5c45a26ce396|8058e3ada2f16fbbd90231c145795e7e92a03f2f72690c79eaf6c38a2db391a4f28d81e9a12ee90833d58ed8f59c9649feb951f5824871c40b330637afffe606
    const {
      avatar
    } = await getAccount();

    if (avatar) {
      this.avatar = avatar;
    }
  },

  methods: {
    openDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }

      this.$set(this.btnConfig[idx], 'active', !this.btnConfig[idx].active);
    },

    closeDropdown(idx) {
      if (!this.btnConfig[idx].links) {
        return;
      }

      this.$set(this.btnConfig[idx], 'active', false);
    }

  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("header", { staticClass: "rqheader" }, [
    _c("img", {
      staticClass: "rqheader__logo",
      attrs: { src: _vm.images.logo, alt: "logo" }
    }),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "rqheader-btns" },
      _vm._l(_vm.btnConfig, function(btn, idx) {
        return _c(
          "div",
          {
            key: idx,
            class: [
              "rqheader-btn",
              {
                header: btn.type === "header",
                active: btn.active,
                active: btn.active
              }
            ],
            on: {
              click: function($event) {
                return _vm.openDropdown(idx)
              },
              mouseleave: function($event) {
                return _vm.closeDropdown(idx)
              }
            }
          },
          [
            btn.label
              ? _c("span", { staticClass: "rqheader-btn__label" }, [
                  _vm._v(_vm._s(btn.label))
                ])
              : _vm._e(),
            _vm._v(" "),
            btn.type === "header"
              ? _c("img", { attrs: { src: _vm.avatar, alt: "" } })
              : _vm._e(),
            _vm._v(" "),
            btn.links && !btn.type
              ? _c("span", { staticClass: "arrow" }, [
                  _c("i", { staticClass: "rq-icons icon-arrow-down" })
                ])
              : _vm._e(),
            _vm._v(" "),
            _c("transition", { attrs: { name: "rq-zoom-in-top" } }, [
              btn.links && btn.active
                ? _c(
                    "div",
                    { staticClass: "rqheader-btn__dropdown" },
                    _vm._l(btn.links, function(link, linkIdx) {
                      return _c(
                        "div",
                        {
                          key: linkIdx,
                          staticClass: "rqheader-btn__dropdown--item"
                        },
                        [_c("span", [_vm._v(_vm._s(link.label))])]
                      )
                    }),
                    0
                  )
                : _vm._e()
            ])
          ],
          1
        )
      }),
      0
    )
  ])
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = function (inject) {
    if (!inject) return
    inject("data-v-3fef3a79_0", { source: "p[data-v-3fef3a79] {\n  margin: 0;\n}\n.rqheader[data-v-3fef3a79] {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: #ffffff;\n  z-index: 1;\n}\n.rqheader__logo[data-v-3fef3a79] {\n  display: block;\n  width: 136px;\n}\n.rqheader-btn[data-v-3fef3a79] {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  padding-right: 20px;\n  align-items: center;\n  transition: all 0.3s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  cursor: pointer;\n  transition: color 0.1s;\n}\n.rqheader-btn[data-v-3fef3a79]:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn[data-v-3fef3a79]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  transition: background 0.3s;\n}\n.rqheader-btn__label[data-v-3fef3a79] {\n  padding-left: 20px;\n}\n.rqheader-btn__label + .arrow[data-v-3fef3a79] {\n  margin-left: 10px;\n}\n.rqheader-btn .arrow[data-v-3fef3a79] {\n  display: inline-block;\n  width: 16px;\n  transition: transform 0.3s;\n  transform-origin: center;\n}\n.rqheader-btn__dropdown[data-v-3fef3a79] {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 70px;\n  padding: 0 20px;\n  box-shadow: 0px 8px 12px 0px rgba(45, 54, 158, 0.08);\n  background: #ffffff;\n  z-index: -1;\n  border-radius: 0 0 12px 12px;\n}\n.rqheader-btn__dropdown--item[data-v-3fef3a79] {\n  padding-top: 18px;\n  cursor: pointer;\n  transition: color 0.1s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.rqheader-btn__dropdown--item[data-v-3fef3a79]:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn__dropdown--item[data-v-3fef3a79]:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btn.active[data-v-3fef3a79] {\n  background: #ffffff;\n  color: #1b5fc4;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.active .arrow[data-v-3fef3a79] {\n  transform: rotate(180deg);\n}\n.rqheader-btn.active[data-v-3fef3a79]::after {\n  background: #1b5fc4;\n}\n.rqheader-btn.header[data-v-3fef3a79] {\n  position: relative;\n  height: 100%;\n}\n.rqheader-btn.header img[data-v-3fef3a79] {\n  margin-left: 20px;\n  width: 34px;\n}\n.rqheader-btn.header.active[data-v-3fef3a79] {\n  background: #ffffff;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.header .rqheader-btn__dropdown[data-v-3fef3a79] {\n  padding: 0;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item[data-v-3fef3a79] {\n  text-align: center;\n  padding-top: 18px;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item[data-v-3fef3a79]:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btns[data-v-3fef3a79] {\n  margin-left: auto;\n  margin-right: 0;\n  display: flex;\n  height: 100%;\n  flex-direction: row;\n}\n\n/*# sourceMappingURL=Header.vue.map */", map: {"version":3,"sources":["Header.vue","/Users/arius/Code/rq-ui/packages/header/src/Header.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC2EA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,UAAA;ADxEA;ACyEA;EACA,cAAA;EACA,YAAA;ADvEA;ACyEA;EACA,kBAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EDvEE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EC6DlB,eAAA;EACA,sBAAA;AD3DA;AC4DA;EACA,cAAA;AD1DA;ACiEA;EACA,WAAA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,uBAAA;EACA,2BAAA;AD/DA;ACiEA;EACA,kBAAA;AD/DA;ACiEA;EACA,iBAAA;AD/DA;ACiEA;EACA,qBAAA;EACA,WAAA;EACA,0BAAA;EACA,wBAAA;AD/DA;ACiEA;EACA,kBAAA;EACA,sBAAA;EACA,WAAA;EACA,SAAA;EACA,eAAA;EACA,oDAAA;EACA,mBAAA;EACA,WAAA;EACA,4BAAA;AD/DA;ACgEA;EACA,iBAAA;EA1CA,eAAA;EACA,sBAAA;EDnBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACgBA;EACA,cAAA;ADdA;ACwDA;EACA,oBAAA;ADtDA;AC0DA;EACA,mBAAA;EACA,cAAA;EACA,qDAAA;ADxDA;ACyDA;EACA,yBAAA;ADvDA;ACyDA;EACA,mBAAA;ADvDA;AC0DA;EACA,kBAAA;EACA,YAAA;ADxDA;ACyDA;EACA,iBAAA;EACA,WAAA;ADvDA;ACyDA;EACA,mBAAA;EACA,qDAAA;ADvDA;ACyDA;EACA,UAAA;ADvDA;ACwDA;EACA,kBAAA;EACA,iBAAA;ADtDA;ACuDA;EACA,oBAAA;ADrDA;AC2DA;EACA,iBAAA;EACA,eAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;ADzDA;;AAEA,qCAAqC","file":"Header.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.rqheader {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: #ffffff;\n  z-index: 1;\n}\n.rqheader__logo {\n  display: block;\n  width: 136px;\n}\n.rqheader-btn {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  padding-right: 20px;\n  align-items: center;\n  transition: all 0.3s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  cursor: pointer;\n  transition: color 0.1s;\n}\n.rqheader-btn:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  transition: background 0.3s;\n}\n.rqheader-btn__label {\n  padding-left: 20px;\n}\n.rqheader-btn__label + .arrow {\n  margin-left: 10px;\n}\n.rqheader-btn .arrow {\n  display: inline-block;\n  width: 16px;\n  transition: transform 0.3s;\n  transform-origin: center;\n}\n.rqheader-btn__dropdown {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 70px;\n  padding: 0 20px;\n  box-shadow: 0px 8px 12px 0px rgba(45, 54, 158, 0.08);\n  background: #ffffff;\n  z-index: -1;\n  border-radius: 0 0 12px 12px;\n}\n.rqheader-btn__dropdown--item {\n  padding-top: 18px;\n  cursor: pointer;\n  transition: color 0.1s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.rqheader-btn__dropdown--item:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn__dropdown--item:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btn.active {\n  background: #ffffff;\n  color: #1b5fc4;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.active .arrow {\n  transform: rotate(180deg);\n}\n.rqheader-btn.active::after {\n  background: #1b5fc4;\n}\n.rqheader-btn.header {\n  position: relative;\n  height: 100%;\n}\n.rqheader-btn.header img {\n  margin-left: 20px;\n  width: 34px;\n}\n.rqheader-btn.header.active {\n  background: #ffffff;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.header .rqheader-btn__dropdown {\n  padding: 0;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item {\n  text-align: center;\n  padding-top: 18px;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btns {\n  margin-left: auto;\n  margin-right: 0;\n  display: flex;\n  height: 100%;\n  flex-direction: row;\n}\n\n/*# sourceMappingURL=Header.vue.map */","<template>\n  <header class=\"rqheader\">\n    <img :src=\"images.logo\" alt=\"logo\" class=\"rqheader__logo\">\n    <div class=\"rqheader-btns\">\n      <div\n        v-for=\"(btn, idx) in btnConfig\"\n        :key=\"idx\"\n        :class=\"['rqheader-btn', {header: btn.type === 'header', active: btn.active, active: btn.active}]\"\n        @click= \"openDropdown(idx)\"\n        @mouseleave= \"closeDropdown(idx)\"\n      >\n        <span v-if=\"btn.label\" class=\"rqheader-btn__label\">{{btn.label}}</span>\n        <img v-if=\"btn.type === 'header'\" :src=\"avatar\" alt=\"\">\n        <span v-if=\"btn.links && !btn.type\" class=\"arrow\">\n          <i class=\"rq-icons icon-arrow-down\"></i>\n        </span>\n        <transition name=\"rq-zoom-in-top\">\n          <div class=\"rqheader-btn__dropdown\" v-if=\"btn.links && btn.active\">\n            <div class=\"rqheader-btn__dropdown--item\"\n              v-for=\"(link, linkIdx) in btn.links\"\n              :key=\"linkIdx\"\n            >\n              <span>{{link.label}}</span>\n            </div>\n          </div>\n        </transition>\n      </div>\n    </div>\n  </header>\n</template>\n\n<script>\nimport headerBtns from \"../assets/dict/header.json\";\nimport { getAccount } from \"../api\";\nimport logo from \"../assets/img/logo.png\";\nimport header from \"../assets/img/header.png\";\n\nexport default {\n  name: \"RqHeader\",\n  data() {\n    return {\n      images: {\n        logo,\n        header\n      },\n      avatar: header,\n      btnConfig: headerBtns\n    }\n  },\n  async mounted() {\n    //mock cookie\n    // sid: a2c39e88-5151-4c68-a69f-5c45a26ce396|8058e3ada2f16fbbd90231c145795e7e92a03f2f72690c79eaf6c38a2db391a4f28d81e9a12ee90833d58ed8f59c9649feb951f5824871c40b330637afffe606\n    const {avatar} = await getAccount();\n    if (avatar) {\n      this.avatar = avatar;\n    }\n  },\n  methods: {\n    openDropdown(idx) {\n      if (!this.btnConfig[idx].links) {\n        return;\n      }\n      this.$set(this.btnConfig[idx], 'active', !this.btnConfig[idx].active);\n    },\n    closeDropdown(idx) {\n      if (!this.btnConfig[idx].links) {\n        return;\n      }\n      this.$set(this.btnConfig[idx], 'active', false);\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import \"../../common/style/common\";\n\n.rqheader {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: $bg-white;\n  z-index: 1;\n  &__logo {\n    display: block;\n    width: 136px;\n  }\n  &-btn {\n    position: relative;\n    box-sizing: border-box;\n    display: flex;\n    padding-right: 20px;\n    align-items: center;\n    transition: all .3s;\n    @include text;\n    @include hover;\n    &::after {\n      content: \"\";\n      position: absolute;\n      top: 0;\n      width: 100%;\n      height: 4px;\n      background: transparent;\n      transition: background .3s;\n    }\n    &__label {\n      padding-left:20px;\n    }\n    &__label + .arrow {\n      margin-left: 10px;\n    }\n    .arrow {\n      display: inline-block;\n      width: 16px;\n      transition: transform .3s;\n      transform-origin: center;\n    }\n    &__dropdown {\n      position: absolute;\n      box-sizing: border-box;\n      width: 100%;\n      top: 70px;\n      padding: 0 20px;\n      box-shadow: 0px 8px 12px 0px rgba(45,54,158,0.08);\n      background: $bg-white;\n      z-index: -1;\n      border-radius: 0 0 12px 12px;\n      &--item {\n        padding-top: 18px;\n        @include hover;\n        @include text;\n        &:last-child {\n          padding-bottom: 20px;\n        }\n      }\n    }\n    &.active {\n      background: $bg-white;\n      color: $highlight;\n      box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);\n      .arrow {\n        transform: rotate(180deg);\n      }\n      &::after {\n        background: $highlight;\n      }\n    }\n    &.header {\n      position: relative;\n      height: 100%;\n      img {\n        margin-left:20px;\n        width: 34px\n      }\n      &.active {\n        background: $bg-white;\n        box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);\n      }\n      .rqheader-btn__dropdown {\n        padding: 0;\n        &--item {\n          text-align: center;\n          padding-top: 18px;\n          &:last-child {\n            padding-bottom: 20px;\n          }\n        }\n      }\n    }\n  }\n  &-btns {\n    margin-left: auto;\n    margin-right: 0;\n    display: flex;\n    height: 100%;\n    flex-direction: row;\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__ = "data-v-3fef3a79";
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject SSR */
  

  
  var RqHeader = normalizeComponent_1(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    browser,
    undefined
  );

RqHeader.install = function (Vue) {
  Vue.component(RqHeader.name, RqHeader);
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  name: "Card",
  props: {
    info: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      contentKeys: ["total", "year", "retracement"],
      labels: {
        total: "累计收益",
        year: "年化收益",
        retracement: "最大回馈",
        startAt: "开始时间"
      }
    };
  },

  methods: {
    redirect() {
      this.$emit("redirect", "scrafts", this.info.algoId);
    }

  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "card__wrapper" }, [
    _c("div", { staticClass: "card", on: { click: _vm.redirect } }, [
      _c("p", { staticClass: "card__title" }, [
        _vm._v("\n      " + _vm._s(_vm.info.name) + "\n    ")
      ]),
      _vm._v(" "),
      _c(
        "div",
        { staticClass: "card__content" },
        _vm._l(_vm.contentKeys, function(key, idx) {
          return _c("div", { key: idx, staticClass: "card__content--item" }, [
            _c("p", { staticClass: "label" }, [
              _vm._v(_vm._s(_vm.labels[key]))
            ]),
            _vm._v(" "),
            _c("p", { staticClass: "value" }, [
              _vm._v(_vm._s(_vm.info[key]) + "%")
            ])
          ])
        }),
        0
      ),
      _vm._v(" "),
      _c("div", { staticClass: "card__footer" }, [
        _c("span", { staticClass: "label" }, [
          _vm._v(_vm._s(_vm.labels.startAt))
        ]),
        _vm._v(" "),
        _c("span", { staticClass: "value" }, [_vm._v(_vm._s(_vm.info.startAt))])
      ])
    ])
  ])
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = function (inject) {
    if (!inject) return
    inject("data-v-78c637bd_0", { source: "p[data-v-78c637bd] {\n  margin: 0;\n}\n.card[data-v-78c637bd] {\n  padding: 26px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card[data-v-78c637bd]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.card .label[data-v-78c637bd] {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.card .value[data-v-78c637bd] {\n  font-size: 18px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 700;\n}\n.card .value.red[data-v-78c637bd] {\n  color: #d74848;\n}\n.card .value.green[data-v-78c637bd] {\n  color: #50bf80;\n}\n.card__wrapper[data-v-78c637bd] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.card__wrapper.col-1[data-v-78c637bd] {\n  width: 100%;\n}\n.card__wrapper.col-1[data-v-78c637bd]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-2[data-v-78c637bd] {\n  width: 50%;\n}\n.card__wrapper.col-2[data-v-78c637bd]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-3[data-v-78c637bd] {\n  width: 33.3333333333%;\n}\n.card__wrapper.col-3[data-v-78c637bd]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-4[data-v-78c637bd] {\n  width: 25%;\n}\n.card__wrapper.col-4[data-v-78c637bd]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-5[data-v-78c637bd] {\n  width: 20%;\n}\n.card__wrapper.col-5[data-v-78c637bd]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-6[data-v-78c637bd] {\n  width: 16.6666666667%;\n}\n.card__wrapper.col-6[data-v-78c637bd]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.card__wrapper + .card__wrapper[data-v-78c637bd] {\n  padding-left: 20px;\n}\n.card__title[data-v-78c637bd] {\n  font-size: 20px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n}\n.card__content[data-v-78c637bd] {\n  display: flex;\n  margin-top: 30px;\n  margin-bottom: 40px;\n}\n.card__content--item[data-v-78c637bd] {\n  display: inline-block;\n}\n.card__content--item + .card__content--item[data-v-78c637bd] {\n  margin-left: 24px;\n}\n.card__footer[data-v-78c637bd] {\n  text-align: right;\n}\n.card__footer .value[data-v-78c637bd] {\n  font-size: 16px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 400;\n}\n\n/*# sourceMappingURL=Card.vue.map */", map: {"version":3,"sources":["Card.vue","/Users/arius/Code/rq-ui/packages/personal-center/src/components/Card.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;ACsDA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EDnDE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;AC+CA;ED7CE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;AC2CA;EDzCE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACsCA;EACA,cAAA;ADpCA;ACsCA;EACA,cAAA;ADpCA;ACuCA;EDrCE,kBAAkB;EAClB,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;AACpB;ACFA;EDIE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACNA;EACA,aAAA;EACA,gBAAA;EACA,mBAAA;ADQA;ACPA;EACA,qBAAA;ADSA;ACRA;EACA,iBAAA;ADUA;ACNA;EACA,iBAAA;ADQA;ACPA;EDSE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,mCAAmC","file":"Card.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.card {\n  padding: 26px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.card .label {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.card .value {\n  font-size: 18px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 700;\n}\n.card .value.red {\n  color: #d74848;\n}\n.card .value.green {\n  color: #50bf80;\n}\n.card__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.card__wrapper.col-1 {\n  width: 100%;\n}\n.card__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-2 {\n  width: 50%;\n}\n.card__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.card__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-4 {\n  width: 25%;\n}\n.card__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-5 {\n  width: 20%;\n}\n.card__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.card__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.card__wrapper + .card__wrapper {\n  padding-left: 20px;\n}\n.card__title {\n  font-size: 20px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n}\n.card__content {\n  display: flex;\n  margin-top: 30px;\n  margin-bottom: 40px;\n}\n.card__content--item {\n  display: inline-block;\n}\n.card__content--item + .card__content--item {\n  margin-left: 24px;\n}\n.card__footer {\n  text-align: right;\n}\n.card__footer .value {\n  font-size: 16px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 400;\n}\n\n/*# sourceMappingURL=Card.vue.map */","<template>\n  <div class=\"card__wrapper\">\n    <div class=\"card\" @click=\"redirect\">\n      <p class=\"card__title\">\n        {{info.name}}\n      </p>\n      <div class=\"card__content\">\n        <div\n          v-for=\"(key, idx) in contentKeys\"\n          :key=\"idx\"\n          class=\"card__content--item\">\n            <p class=\"label\">{{labels[key]}}</p>\n            <p class=\"value\">{{info[key]}}%</p>\n          </div>\n      </div>\n       <div class=\"card__footer\">\n        <span class=\"label\">{{labels.startAt}}</span>\n        <span class=\"value\">{{info.startAt}}</span>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Card\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  data() {\n    return {\n      contentKeys: [\n        \"total\",\n        \"year\",\n        \"retracement\",\n      ],\n      labels: {\n        total: \"累计收益\",\n        year: \"年化收益\",\n        retracement: \"最大回馈\",\n        startAt: \"开始时间\"\n      }\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"scrafts\", this.info.algoId);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.card {\n  padding: 26px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  .label {\n    @include mini-text;\n  }\n  .value {\n    @include h5;\n    &.red {\n      color: $rq-red; \n    }\n    &.green {\n      color: $rq-green; \n    }\n  }\n  &__wrapper {\n    @include flex-item;\n  }\n  &__title {\n    @include h4;\n  }\n  &__content {\n    display: flex;\n    margin-top: 30px;\n    margin-bottom: 40px;\n    &--item {\n      display: inline-block;\n      & + & {\n        margin-left: 24px;\n      }\n    }\n  }\n  &__footer {\n    text-align: right;\n    .value {\n      @include rg-text;\n    }\n  }\n\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$1 = "data-v-78c637bd";
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject SSR */
  

  
  var Card = normalizeComponent_1(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var script$2 = {
  name: "Topic",
  props: {
    info: {
      required: true,
      type: Object
    }
  },

  data() {
    return {
      labels: {
        createAt: "发表于",
        lastRepeat: "最后回复于"
      }
    };
  },

  methods: {
    redirect() {
      this.$emit("redirect", "community", "topic", this.info.tid);
    },

    redirectAuthor() {
      this.$emit("redirect", "profile", this.info.author.uid);
    }

  }
};

/* script */
const __vue_script__$2 = script$2;

/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "topic__wrapper" }, [
    _c("div", { staticClass: "topic", on: { click: _vm.redirect } }, [
      _c("div", { staticClass: "topic__content" }, [
        _c("div", { staticClass: "left avatar" }, [
          _c("img", { attrs: { src: _vm.info.author.avatar, alt: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "right" }, [
          _c("p", { staticClass: "topic__title" }, [
            _vm._v("\n          " + _vm._s(_vm.info.name) + "\n        ")
          ]),
          _vm._v(" "),
          _c("p", [
            _c(
              "a",
              {
                staticClass: "highlight",
                on: {
                  click: function($event) {
                    $event.stopPropagation();
                    return _vm.redirectAuthor($event)
                  }
                }
              },
              [_vm._v(_vm._s(_vm.info.author.name))]
            ),
            _vm._v(_vm._s(_vm.labels.createAt) + _vm._s(_vm.info.createAt))
          ]),
          _vm._v(" "),
          _c("p", [
            _vm._v(_vm._s(_vm.labels.lastRepeat) + _vm._s(_vm.info.lastRepeat))
          ])
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "topic__footer" }, [
        _c("i", { staticClass: "rq-icons icon-chat" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.info.chat))]),
        _vm._v(" "),
        _c("i", { staticClass: "rq-icons icon-view" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.info.view))]),
        _vm._v(" "),
        _c("i", { staticClass: "rq-icons icon-heart" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.info.like))]),
        _vm._v(" "),
        _c("i", { staticClass: "rq-icons icon-chart highlight" }),
        _vm._v(" "),
        _c("span", [_vm._v(_vm._s(_vm.info.chart))])
      ])
    ])
  ])
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$2 = function (inject) {
    if (!inject) return
    inject("data-v-050f50bc_0", { source: "p[data-v-050f50bc] {\n  margin: 0;\n}\n.topic[data-v-050f50bc] {\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.topic[data-v-050f50bc]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.topic__wrapper[data-v-050f50bc] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.topic__wrapper.col-1[data-v-050f50bc] {\n  width: 100%;\n}\n.topic__wrapper.col-1[data-v-050f50bc]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-2[data-v-050f50bc] {\n  width: 50%;\n}\n.topic__wrapper.col-2[data-v-050f50bc]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-3[data-v-050f50bc] {\n  width: 33.3333333333%;\n}\n.topic__wrapper.col-3[data-v-050f50bc]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-4[data-v-050f50bc] {\n  width: 25%;\n}\n.topic__wrapper.col-4[data-v-050f50bc]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-5[data-v-050f50bc] {\n  width: 20%;\n}\n.topic__wrapper.col-5[data-v-050f50bc]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-6[data-v-050f50bc] {\n  width: 16.6666666667%;\n}\n.topic__wrapper.col-6[data-v-050f50bc]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.topic__wrapper + .topic__wrapper[data-v-050f50bc] {\n  padding-left: 20px;\n}\n.topic .highlight[data-v-050f50bc] {\n  color: #1b5fc4;\n}\n.topic .avatar[data-v-050f50bc] {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  overflow: hidden;\n}\n.topic .avatar img[data-v-050f50bc] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.topic .left + .right[data-v-050f50bc] {\n  margin-left: 24px;\n}\n.topic__content[data-v-050f50bc] {\n  display: flex;\n  margin-bottom: 20px;\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__content .topic__title[data-v-050f50bc] {\n  font-size: 14px;\n  color: #333;\n  line-height: 1.5;\n  font-weight: 500;\n  margin-bottom: 12px;\n}\n.topic__content p + p[data-v-050f50bc] {\n  margin-top: 6px;\n}\n.topic__footer[data-v-050f50bc] {\n  text-align: right;\n}\n.topic__footer span[data-v-050f50bc], .topic__footer i[data-v-050f50bc] {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__footer i[data-v-050f50bc] {\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.topic__footer span[data-v-050f50bc]:last-child {\n  position: relative;\n  padding: 2px 6px;\n  background: #1b5fc4;\n  color: #ffffff;\n  border-radius: 2px;\n}\n.topic__footer span[data-v-050f50bc]:last-child::before {\n  content: \"\";\n  position: absolute;\n  height: 0;\n  width: 0;\n  top: 1px;\n  left: -8px;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid #1b5fc4;\n}\n\n/*# sourceMappingURL=Topic.vue.map */", map: {"version":3,"sources":["Topic.vue","/Users/arius/Code/rq-ui/packages/personal-center/src/components/Topic.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;ACwDA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EAsCA,eAAA;EACA,oBAAA;AD1FA;AC2FA;EACA,sBAAA;EACA,iDAAA;ADzFA;ACiDA;EAmDA,kBAAA;EACA,sBAAA;EACA,iBAAA;ADjGA;ACmGA;EACA,WAAA;ADjGA;ACkGA;EACA,eAAA;ADhGA;AC6FA;EACA,UAAA;AD3FA;AC4FA;EACA,eAAA;AD1FA;ACuFA;EACA,qBAAA;ADrFA;ACsFA;EACA,eAAA;ADpFA;ACiFA;EACA,UAAA;AD/EA;ACgFA;EACA,eAAA;AD9EA;AC2EA;EACA,UAAA;ADzEA;AC0EA;EACA,eAAA;ADxEA;ACqEA;EACA,qBAAA;ADnEA;ACoEA;EACA,eAAA;ADlEA;AACA;ECsEA,kBAAA;ADpEA;ACQA;EACA,cAAA;ADNA;ACQA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;ADNA;ACOA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADLA;ACQA;EACA,iBAAA;ADNA;ACQA;EACA,aAAA;EACA,mBAAA;EDNE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACGA;EDDE,eAAe;EACf,WAAW;EACX,gBAAgB;EAChB,gBAAgB;ECAlB,mBAAA;ADEA;ACAA;EACA,eAAA;ADEA;ACCA;EACA,iBAAA;ADCA;ACAA;EDEE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACJA;EACA,iBAAA;EACA,kBAAA;ADMA;ACHA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,cAAA;EACA,kBAAA;ADKA;ACJA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,QAAA;EACA,UAAA;EACA,iCAAA;EACA,oCAAA;EACA,+BAAA;ADMA;;AAEA,oCAAoC","file":"Topic.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.topic {\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.topic:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.topic__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.topic__wrapper.col-1 {\n  width: 100%;\n}\n.topic__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-2 {\n  width: 50%;\n}\n.topic__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.topic__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-4 {\n  width: 25%;\n}\n.topic__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-5 {\n  width: 20%;\n}\n.topic__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.topic__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.topic__wrapper + .topic__wrapper {\n  padding-left: 20px;\n}\n.topic .highlight {\n  color: #1b5fc4;\n}\n.topic .avatar {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  overflow: hidden;\n}\n.topic .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.topic .left + .right {\n  margin-left: 24px;\n}\n.topic__content {\n  display: flex;\n  margin-bottom: 20px;\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__content .topic__title {\n  font-size: 14px;\n  color: #333;\n  line-height: 1.5;\n  font-weight: 500;\n  margin-bottom: 12px;\n}\n.topic__content p + p {\n  margin-top: 6px;\n}\n.topic__footer {\n  text-align: right;\n}\n.topic__footer span, .topic__footer i {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__footer i {\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.topic__footer span:last-child {\n  position: relative;\n  padding: 2px 6px;\n  background: #1b5fc4;\n  color: #ffffff;\n  border-radius: 2px;\n}\n.topic__footer span:last-child::before {\n  content: \"\";\n  position: absolute;\n  height: 0;\n  width: 0;\n  top: 1px;\n  left: -8px;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid #1b5fc4;\n}\n\n/*# sourceMappingURL=Topic.vue.map */","<template>\n  <div class=\"topic__wrapper\">\n    <div class=\"topic\" @click=\"redirect\">\n      <div class=\"topic__content\">\n        <div class=\"left avatar\">\n          <img :src=\"info.author.avatar\" alt=\"\">\n        </div>\n        <div class=\"right\">\n          <p class=\"topic__title\">\n            {{info.name}}\n          </p>\n          <p><a class=\"highlight\" @click.stop=\"redirectAuthor\">{{info.author.name}}</a>{{labels.createAt}}{{info.createAt}}</p>\n          <p>{{labels.lastRepeat}}{{info.lastRepeat}}</p>\n        </div>\n      </div>\n       <div class=\"topic__footer\">\n        <i class=\"rq-icons icon-chat\"> </i>\n        <span>{{info.chat}}</span>\n        <i class=\"rq-icons icon-view\"> </i>\n        <span>{{info.view}}</span>\n        <i class=\"rq-icons icon-heart\"> </i>\n        <span>{{info.like}}</span>\n        <i class=\"rq-icons icon-chart highlight\"> </i>\n        <span>{{info.chart}}</span>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Topic\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  data() {\n    return {\n      labels: {\n        createAt: \"发表于\",\n        lastRepeat: \"最后回复于\"\n      }\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"community\", \"topic\", this.info.tid);\n    },\n    redirectAuthor() {\n      this.$emit(\"redirect\", \"profile\", this.info.author.uid);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.topic {\n  padding: 24px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  &__wrapper {\n    @include flex-item;\n  }\n  .highlight {\n    color: $highlight;\n  }\n  .avatar {\n    position: relative;\n    width: 76px;\n    height: 76px;\n    overflow: hidden;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n  .left + .right {\n    margin-left: 24px;\n  }\n  &__content {\n    display: flex;\n    margin-bottom: 20px;\n    @include mini-text;\n    .topic__title {\n      @include text($text-dark);\n      margin-bottom: 12px;\n    }\n    p + p {\n      margin-top: 6px;\n    }\n  }\n  &__footer {\n    text-align: right;\n    span, i {\n      @include mini-text;\n    }\n    i {\n      margin-left: 20px;\n      margin-right: 10px;\n    }\n    span {\n      &:last-child {\n        position: relative;\n        padding: 2px 6px;\n        background: $highlight;\n        color: $text-white;\n        border-radius: 2px;\n        &::before {\n          content: \"\";\n          position: absolute;\n          height: 0;\n          width: 0;\n          top: 1px;\n          left: -8px;\n          border-top: 8px solid transparent;\n          border-bottom: 8px solid transparent;\n          border-right: 8px solid $highlight;\n        }\n      }\n    }\n  }\n\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$2 = "data-v-050f50bc";
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = false;
  /* style inject SSR */
  

  
  var Topic = normalizeComponent_1(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
//
var script$3 = {
  name: "Follow",
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  methods: {
    redirect() {
      this.$emit("redirect", "profile", this.info.uid);
    }

  }
};

/* script */
const __vue_script__$3 = script$3;

/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "follow__wrapper" }, [
    _c("div", { staticClass: "follow", on: { click: _vm.redirect } }, [
      _c("div", { staticClass: "avatar" }, [
        _c("img", { attrs: { src: _vm.info.avatar, alt: "" } })
      ]),
      _vm._v(" "),
      _c("p", { staticClass: "follow__title" }, [
        _vm._v("\n      " + _vm._s(_vm.info.name) + "\n    ")
      ])
    ])
  ])
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = function (inject) {
    if (!inject) return
    inject("data-v-df65537c_0", { source: "p[data-v-df65537c] {\n  margin: 0;\n}\n.follow[data-v-df65537c] {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.follow[data-v-df65537c]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.follow__wrapper[data-v-df65537c] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.follow__wrapper.col-1[data-v-df65537c] {\n  width: 100%;\n}\n.follow__wrapper.col-1[data-v-df65537c]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-2[data-v-df65537c] {\n  width: 50%;\n}\n.follow__wrapper.col-2[data-v-df65537c]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-3[data-v-df65537c] {\n  width: 33.3333333333%;\n}\n.follow__wrapper.col-3[data-v-df65537c]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-4[data-v-df65537c] {\n  width: 25%;\n}\n.follow__wrapper.col-4[data-v-df65537c]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-5[data-v-df65537c] {\n  width: 20%;\n}\n.follow__wrapper.col-5[data-v-df65537c]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-6[data-v-df65537c] {\n  width: 16.6666666667%;\n}\n.follow__wrapper.col-6[data-v-df65537c]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.follow__wrapper + .follow__wrapper[data-v-df65537c] {\n  padding-left: 20px;\n}\n.follow .avatar[data-v-df65537c] {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.follow .avatar img[data-v-df65537c] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.follow .follow__title[data-v-df65537c] {\n  margin-left: 24px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Follow.vue.map */", map: {"version":3,"sources":["Follow.vue","/Users/arius/Code/rq-ui/packages/personal-center/src/components/Follow.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC6BA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;ED1BE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;ACsBA;EDpBE,kBAAkB;EAClB,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;AACpB;ACnBA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;ADqBA;ACpBA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADsBA;ACnBA;EACA,iBAAA;EDqBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,qCAAqC","file":"Follow.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.follow {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.follow:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.follow__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.follow__wrapper.col-1 {\n  width: 100%;\n}\n.follow__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-2 {\n  width: 50%;\n}\n.follow__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.follow__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-4 {\n  width: 25%;\n}\n.follow__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-5 {\n  width: 20%;\n}\n.follow__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.follow__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.follow__wrapper + .follow__wrapper {\n  padding-left: 20px;\n}\n.follow .avatar {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.follow .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.follow .follow__title {\n  margin-left: 24px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Follow.vue.map */","<template>\n  <div class=\"follow__wrapper\">\n    <div class=\"follow\" @click=\"redirect\">\n      <div class=\"avatar\">\n        <img :src=\"info.avatar\" alt=\"\">\n      </div>\n      <p class=\"follow__title\">\n        {{info.name}}\n      </p>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Follow\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"profile\", this.info.uid);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.follow {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  &__wrapper {\n    @include flex-item;\n  }\n  .avatar {\n    position: relative;\n    width: 76px;\n    height: 76px;\n    border-radius: 50%;\n    overflow: hidden;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n  .follow__title {\n    margin-left: 24px;\n    @include text($text-gray-light);\n  }\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$3 = "data-v-df65537c";
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject SSR */
  

  
  var Follow = normalizeComponent_1(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    browser,
    undefined
  );

//
//
//
//
//
//
//
//
//
//
//
var script$4 = {
  name: "Empty",
  props: {
    emptyText: {
      default: "暂时没有",
      type: String
    },
    emptyLabel: {
      default: "粉丝",
      type: String
    }
  }
};

/* script */
const __vue_script__$4 = script$4;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", { staticClass: "empty" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("p", { staticClass: "empty__title" }, [
      _vm._v(
        "\n    " +
          _vm._s(_vm.emptyText) +
          "\n    " +
          _vm._s(_vm.emptyLabel) +
          "\n  "
      )
    ])
  ])
};
var __vue_staticRenderFns__$4 = [
  function() {
    var _vm = this;
    var _h = _vm.$createElement;
    var _c = _vm._self._c || _h;
    return _c("p", { staticClass: "empty__logo" }, [
      _c("i", { staticClass: "rq-icons icon-empty" })
    ])
  }
];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = function (inject) {
    if (!inject) return
    inject("data-v-7343711d_0", { source: "p[data-v-7343711d] {\n  margin: 0;\n}\n.empty[data-v-7343711d] {\n  padding: 40px 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #ffffff;\n}\n.empty .empty__logo i[data-v-7343711d] {\n  font-size: 40px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.empty .empty__title[data-v-7343711d] {\n  margin-top: 16px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Empty.vue.map */", map: {"version":3,"sources":["Empty.vue","/Users/arius/Code/rq-ui/packages/personal-center/src/components/Empty.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC2BA;EACA,eAAA;EACA,WAAA;EDxBE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;ECuBrB,mBAAA;ADrBA;ACsBA;EDpBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACmBA;EACA,gBAAA;EDjBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,oCAAoC","file":"Empty.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.empty {\n  padding: 40px 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #ffffff;\n}\n.empty .empty__logo i {\n  font-size: 40px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.empty .empty__title {\n  margin-top: 16px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Empty.vue.map */","<template>\n  <div class=\"empty\">\n    <p class=\"empty__logo\">\n      <i class=\"rq-icons icon-empty\"></i>\n    </p>\n    <p class=\"empty__title\">\n      {{emptyText}}\n      {{emptyLabel}}\n    </p>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Empty\",\n  props: {\n    emptyText: {\n      default: \"暂时没有\",\n      type: String\n    },\n    emptyLabel: {\n      default: \"粉丝\",\n      type: String\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.empty {\n  padding: 40px 0;\n  width: 100%;\n  @include f-column;\n  background: $bg-white;\n  .empty__logo i{\n    @include text($text-gray-light, 40);\n  }\n  .empty__title {\n    margin-top: 16px;\n    @include text($text-gray-light);\n  }\n}\n</style>"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$4 = "data-v-7343711d";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject SSR */
  

  
  var Empty = normalizeComponent_1(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    browser,
    undefined
  );

var bannerImage = "d01bf9fd0eb65936.png";

var bronzeImage = "a94cb8f6d3b548cb.png";

var goldImage = "b4bdc52432b76250.png";

var diamondImage = "91c9ab717b86fe49.png";

var kingImage = "143a714b490af3ea.png";

const getAccount$1 = uid => {
  return urlencodePost("community/api/user/account", {
    uid
  });
};

const getSubscribe = async () => {
  const url = "api/pts/list";
  const params = {
    page: 1,
    count: 6,
    filter: "mysubscribed"
  };
  const {
    data
  } = await instance.get(url, {
    params
  });
  return data;
};

const getShare = async uid => {
  const url = "api/pts/info";
  const {
    data
  } = await instance.get(url, {
    params: {
      uid
    }
  });
  return data;
};

const communityApi = async (uid, key, count = 4) => {
  const url = `community/api/user/${uid}/${key}`;
  const params = {
    uid,
    page: 1,
    count
  };
  const {
    data
  } = await instance.get(url, {
    params
  });
  return data;
};

const getTopic = uid => {
  return communityApi(uid, 'topics', 6);
};

const getFollow = uid => {
  return communityApi(uid, 'following');
};

const getFans = uid => {
  return communityApi(uid, 'followers');
};

const dataFormater = str => {
  const date = new Date(str);

  const twoBit = data => data.toString().padStart(0, 2);

  Object.assign(date, {
    y: date.getFullYear().toString(),
    m: twoBit(date.getMonth() + 1),
    d: twoBit(date.getDate()),
    h: twoBit(date.getHours()),
    min: twoBit(date.getMinutes()),
    s: twoBit(date.getSeconds())
  });
  return date;
};

const fmtDate = str => {
  const {
    y,
    m,
    d
  } = dataFormater(str);
  return `${y}-${m}-${d}`;
};

const fmtDatetime = str => {
  const {
    y,
    m,
    d,
    h,
    min,
    s
  } = dataFormater(str);
  return `${y}-${m}-${d} ${h}:${min}:${s}`;
};

//
var script$5 = {
  name: "RqPersonalCenter",
  components: {
    Card,
    Topic,
    Follow,
    Empty
  },
  props: {
    uid: {
      required: true,
      type: Number
    }
  },

  data() {
    return {
      banner: bannerImage,
      contentKeys: {
        subscribe: {
          col: 3,
          component: "Card"
        },
        share: {
          col: 3,
          component: "Card"
        },
        topic: {
          col: 2,
          component: "Topic"
        },
        follow: {
          col: 4,
          component: "Follow"
        },
        fans: {
          col: 4,
          component: "Follow"
        }
      },
      labels: {
        follow: "关注",
        fans: "粉丝",
        more: "更多 >",
        subscribe: "我的订阅",
        share: "分享的订阅",
        topic: "发表的主题",
        level: [{
          label: "青铜韭菜",
          image: bronzeImage
        }, {
          label: "黄金矿工",
          image: goldImage
        }, {
          label: "钻石强者",
          image: diamondImage
        }, {
          label: "量化王者",
          image: kingImage
        }]
      },
      account: {
        name: "金尾巴",
        avatar: "",
        follow: 2,
        fans: 300,
        isFollow: false,
        descrition: "这家伙很懒，什么也没有留下",
        level: 1
      },
      info: {
        subscribe: [],
        share: [],
        topic: [],
        follow: [],
        fans: []
      }
    };
  },

  async mounted() {
    this.loadData(this.uid);
  },

  watch: {
    uid: {
      handler(val) {
        this.loadData(val);
      }

    }
  },
  methods: {
    loadData(uid) {
      this.loadAccountData(uid);
      this.loadSubscribeData();
      this.loadShareData(uid);
      this.loadTopicData(uid);
      this.loadFansAndFollowData(uid);
    },

    initAlgoData(key, data) {
      const fmtPercent = num => (num * 100).toFixed(2);

      this.info[key] = data.map(e => ({
        algoId: e["algo-id"],
        name: e.title,
        year: fmtPercent(e.annualizedReturn),
        total: fmtPercent(e.totalReturn),
        retracement: fmtPercent(e.maximumDrawdown),
        startAt: fmtDate(e.runStartTimestamp)
      }));
    },

    async loadAccountData(uid) {
      const paramsList = {
        name: ["userInfo", "username"],
        avatar: ["userInfo", "picture"],
        descrition: ["userInfo", "signature"],
        follow: ["userInfo", "followingCount"],
        fans: ["userInfo", "followerCount"],
        isFollow: ["userInfo", "isFollowing"],
        level: ["level"]
      };
      const {
        data: {
          code,
          userData
        }
      } = await getAccount$1(132782);

      if (code === 0) {
        Object.entries(paramsList).map(([key, path]) => {
          const val = path.length === 1 ? userData[path[0]] : path.reduce((a, b) => {
            if (typeof a === "string") {
              return userData[a][b];
            } else {
              return a[b];
            }
          });
          this.account[key] = val !== "" ? val : this.account[key];
        });
      }
    },

    async loadTopicData(uid) {
      const {
        topics
      } = await getTopic(uid);
      this.info.topic = topics.map(e => {
        return {
          tid: e.tid,
          createAt: fmtDatetime(e.timestamp),
          lastRepeat: fmtDatetime(e.relativeTime),
          name: e.title,
          author: {
            name: e.user.username,
            avatar: e.user.picture,
            uid: e.user.uid
          },
          chat: e.postcount,
          view: e.viewcount,
          like: e.votes,
          chart: e.clone
        };
      });
    },

    async loadFansAndFollowData(uid) {
      getFans(uid).then(({
        users
      }) => {
        this.info.fans = users.map(e => {
          return {
            name: e.username,
            avatar: e.picture,
            uid: e.uid
          };
        });
      });
      getFollow(uid).then(({
        users
      }) => {
        this.info.follow = users.map(e => {
          return {
            name: e.username,
            avatar: e.picture,
            uid: e.uid
          };
        });
      });
    },

    async loadShareData(uid) {
      const {
        data
      } = await getShare(uid);
      this.initAlgoData("share", data);
    },

    async loadSubscribeData() {
      const {
        data
      } = await getSubscribe();
      this.initAlgoData("subscribe", data);
    },

    follow(follow = true) {
      this.$emit("follow", this.uid, follow);
      this.account.isFollow = follow;
    },

    redirect(...path) {
      this.$emit("redirect", ...path);
    }

  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$5 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { staticClass: "personal-center" },
    [
      _c("div", { staticClass: "banner" }, [
        _c("div", { staticClass: "bg" }, [
          _c("img", { attrs: { src: _vm.banner, alt: "" } })
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "personal-center__block" }, [
          _c(
            "div",
            { staticClass: "avatar" },
            [
              _c("transition", { attrs: { name: "rq-fade-in-linear" } }, [
                _vm.account.avatar
                  ? _c("img", { attrs: { src: _vm.account.avatar, alt: "" } })
                  : _vm._e()
              ])
            ],
            1
          ),
          _vm._v(" "),
          _c("div", { staticClass: "content" }, [
            _c("p", { staticClass: "title" }, [
              _vm._v(
                "\n          " + _vm._s(_vm.account.name) + "\n          "
              ),
              _vm.account.isFollow
                ? _c("i", {
                    staticClass: "rq-icons icon-heart",
                    on: {
                      click: function($event) {
                        return _vm.follow(false)
                      }
                    }
                  })
                : _c("i", {
                    staticClass: "rq-icons icon-follow",
                    on: {
                      click: function($event) {
                        return _vm.follow(true)
                      }
                    }
                  })
            ]),
            _vm._v(" "),
            _c("p", [
              _c("span", [_vm._v(_vm._s(_vm.labels.follow) + ": ")]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.account.follow))]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.labels.fans) + ": ")]),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.account.fans))])
            ]),
            _vm._v(" "),
            _c("p", [
              _vm._v(
                "\n          " + _vm._s(_vm.account.descrition) + "\n        "
              )
            ])
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "level" },
            [
              _c(
                "transition-group",
                { attrs: { name: "rq-fade-in-linear" } },
                _vm._l(_vm.labels.level, function(level, idx) {
                  return _c("img", {
                    directives: [
                      {
                        name: "show",
                        rawName: "v-show",
                        value: idx === _vm.account.level - 1,
                        expression: "idx === account.level - 1"
                      }
                    ],
                    key: level.label,
                    staticClass: "level-img",
                    attrs: { src: level.image, alt: "" }
                  })
                }),
                0
              )
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _vm._l(_vm.contentKeys, function(val, key) {
        return _c(
          "div",
          { key: key, staticClass: "personal-center__block" },
          [
            _c("div", { staticClass: "title" }, [
              _vm._v("\n      " + _vm._s(_vm.labels[key]) + "\n      "),
              _c("a", { attrs: { href: "" } }, [
                _vm._v(_vm._s(_vm.labels.more))
              ])
            ]),
            _vm._v(" "),
            _vm.info[key].length !== 0
              ? _c(
                  "div",
                  { staticClass: "card-list" },
                  _vm._l(_vm.info[key], function(item, idx) {
                    return _c(val.component, {
                      key: idx,
                      tag: "Component",
                      class: "col-" + val.col,
                      attrs: { info: item },
                      on: { redirect: _vm.redirect }
                    })
                  }),
                  1
                )
              : _c("Empty", { attrs: { emptyLabel: _vm.labels[key] } })
          ],
          1
        )
      })
    ],
    2
  )
};
var __vue_staticRenderFns__$5 = [];
__vue_render__$5._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = function (inject) {
    if (!inject) return
    inject("data-v-4a8d548c_0", { source: "p[data-v-4a8d548c] {\n  margin: 0;\n}\n.personal-center[data-v-4a8d548c] {\n  width: 100%;\n  min-width: 1280px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #f7f8fa;\n  padding-bottom: 40px;\n}\n.personal-center__block[data-v-4a8d548c] {\n  position: relative;\n  padding-top: 40px;\n  width: 1170px;\n}\n.personal-center .banner[data-v-4a8d548c] {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n.personal-center .banner .personal-center__block[data-v-4a8d548c] {\n  position: relative;\n  padding: 0;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  height: 100%;\n  align-items: center;\n  background: transparent;\n}\n.personal-center .banner .bg[data-v-4a8d548c] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.personal-center .banner .bg img[data-v-4a8d548c] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .avatar[data-v-4a8d548c] {\n  width: 146px;\n  height: 146px;\n  background: #4768d35e;\n  overflow: hidden;\n  border-radius: 50%;\n}\n.personal-center .banner .avatar img[data-v-4a8d548c] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .content[data-v-4a8d548c] {\n  flex: 1;\n  padding: 0 30px;\n}\n.personal-center .banner .content p[data-v-4a8d548c] {\n  font-size: 14px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .banner .content p.title[data-v-4a8d548c] {\n  font-size: 24px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 0;\n  vertical-align: center;\n}\n.personal-center .banner .content p.title + p[data-v-4a8d548c] {\n  margin-top: 24px;\n}\n.personal-center .banner .content p.title i[data-v-4a8d548c] {\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .content p.title i[data-v-4a8d548c]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .content span[data-v-4a8d548c]:nth-child(2n) {\n  margin-right: 14px;\n}\n.personal-center .banner .content p + p[data-v-4a8d548c] {\n  margin-top: 12px;\n}\n.personal-center .banner .content .rq-icons[data-v-4a8d548c] {\n  margin-left: 14px;\n}\n.personal-center .banner .content .rq-icons.icon-heart[data-v-4a8d548c] {\n  color: #1b5fc4;\n}\n.personal-center .banner .level[data-v-4a8d548c] {\n  width: 170px;\n  height: 170px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .level[data-v-4a8d548c]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .level .level-img[data-v-4a8d548c] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .title[data-v-4a8d548c] {\n  font-size: 24px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 6px;\n}\n.personal-center .title a[data-v-4a8d548c] {\n  margin-left: 14px;\n  text-decoration: none;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .card-list[data-v-4a8d548c] {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=PersonalCenter.vue.map */", map: {"version":3,"sources":["PersonalCenter.vue","/Users/arius/Code/rq-ui/packages/personal-center/src/PersonalCenter.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC6RA;EACA,WAAA;EACA,iBAAA;ED1RE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;ECyRrB,mBAAA;EACA,oBAAA;ADvRA;ACwRA;EACA,kBAAA;EACA,iBAAA;EACA,aAAA;ADtRA;ACwRA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;ADtRA;ACuRA;EACA,kBAAA;EACA,UAAA;EACA,aAAA;EDrRE,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;ECmRd,YAAA;EACA,mBAAA;EACA,uBAAA;ADjRA;ACmRA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;ADjRA;ACkRA;EDhRE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;ACiRA;EACA,YAAA;EACA,aAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;AD/QA;ACgRA;ED9QE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AC+QA;EACA,OAAA;EACA,eAAA;AD7QA;AC8QA;ED5QE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;AC0QA;EDxQE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;ECsQlB,cAAA;EACA,sBAAA;ADpQA;ACqQA;EACA,gBAAA;ADnQA;ACqQA;EDnQE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;ACkQA;EACA,kBAAA;ADhQA;ACkQA;EACA,gBAAA;ADhQA;ACkQA;EACA,iBAAA;ADhQA;ACiQA;EACA,cAAA;AD/PA;ACmQA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EDjQE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;AC6PA;ED3PE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AC6PA;ED3PE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;ECyPlB,gBAAA;ADvPA;ACwPA;EACA,iBAAA;EACA,qBAAA;EDtPE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACsPA;EACA,aAAA;EACA,eAAA;ADpPA;;AAEA,6CAA6C","file":"PersonalCenter.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.personal-center {\n  width: 100%;\n  min-width: 1280px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #f7f8fa;\n  padding-bottom: 40px;\n}\n.personal-center__block {\n  position: relative;\n  padding-top: 40px;\n  width: 1170px;\n}\n.personal-center .banner {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n.personal-center .banner .personal-center__block {\n  position: relative;\n  padding: 0;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  height: 100%;\n  align-items: center;\n  background: transparent;\n}\n.personal-center .banner .bg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.personal-center .banner .bg img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .avatar {\n  width: 146px;\n  height: 146px;\n  background: #4768d35e;\n  overflow: hidden;\n  border-radius: 50%;\n}\n.personal-center .banner .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .content {\n  flex: 1;\n  padding: 0 30px;\n}\n.personal-center .banner .content p {\n  font-size: 14px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .banner .content p.title {\n  font-size: 24px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 0;\n  vertical-align: center;\n}\n.personal-center .banner .content p.title + p {\n  margin-top: 24px;\n}\n.personal-center .banner .content p.title i {\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .content p.title i:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .content span:nth-child(2n) {\n  margin-right: 14px;\n}\n.personal-center .banner .content p + p {\n  margin-top: 12px;\n}\n.personal-center .banner .content .rq-icons {\n  margin-left: 14px;\n}\n.personal-center .banner .content .rq-icons.icon-heart {\n  color: #1b5fc4;\n}\n.personal-center .banner .level {\n  width: 170px;\n  height: 170px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .level:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .level .level-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .title {\n  font-size: 24px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 6px;\n}\n.personal-center .title a {\n  margin-left: 14px;\n  text-decoration: none;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .card-list {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=PersonalCenter.vue.map */","<template>\n  <div class=\"personal-center\">\n    <div class=\"banner\">\n      <div class=\"bg\">\n        <img :src=\"banner\" alt=\"\">\n      </div>\n      <div class=\"personal-center__block\">\n        <div class=\"avatar\">\n          <transition name=\"rq-fade-in-linear\">\n            <img v-if=\"account.avatar\" :src=\"account.avatar\" alt=\"\">\n          </transition>\n        </div>\n        <div class=\"content\">\n          <p class=\"title\">\n            {{account.name}}\n            <i v-if=\"account.isFollow\" class=\"rq-icons icon-heart\" @click=\"follow(false)\"></i>\n            <i v-else class=\"rq-icons icon-follow\" @click=\"follow(true)\"></i>\n          </p>\n          <p>\n            <span>{{labels.follow}}: </span>\n            <span>{{account.follow}}</span>\n            <span>{{labels.fans}}: </span>\n            <span>{{account.fans}}</span>\n          </p>\n          <p>\n            {{account.descrition}}\n          </p>\n        </div>\n        <div class=\"level\">\n          <transition-group name=\"rq-fade-in-linear\">\n            <img\n              class=\"level-img\"\n              v-for=\"(level, idx) in labels.level\"\n              v-show=\"idx === account.level - 1\"\n              :key=\"level.label\"\n              :src=\"level.image\" alt=\"\">\n          </transition-group>\n        </div>\n      </div>\n    </div>\n    <div\n      v-for=\"(val, key) in contentKeys\"\n      :key=\"key\"\n      class=\"personal-center__block\">\n      <div class=\"title\">\n        {{labels[key]}}\n        <a href=\"\">{{labels.more}}</a>\n      </div>\n        <div\n          v-if=\"info[key].length !== 0\"\n          class=\"card-list\">\n            <Component\n              v-for=\"(item, idx) in info[key]\"\n              :class=\"'col-' + val.col\"\n              :key=\"idx\"\n              :is=\"val.component\"\n              :info=\"item\"\n              @redirect=\"redirect\"\n            ></Component>\n        </div>\n        <Empty\n          v-else\n          :emptyLabel=\"labels[key]\"\n        ></Empty>\n    </div>\n  </div>\n</template>\n\n<script>\nimport Card from \"./components/Card.vue\";\nimport Topic from \"./components/Topic.vue\";\nimport Follow from \"./components/Follow.vue\";\nimport Empty from \"./components/Empty.vue\";\nimport bannerImage from \"../assets/img/banner.png\";\nimport bronzeImage from \"../assets/img/bronze.png\";\nimport goldImage from \"../assets/img/gold.png\";\nimport diamondImage from \"../assets/img/diamond.png\";\nimport kingImage from \"../assets/img/king.png\";\nimport {\n  getAccount,\n  getSubscribe,\n  getShare,\n  getTopic,\n  getFollow,\n  getFans\n} from \"../api\";\nimport { fmtDate, fmtDatetime } from \"../../common/util\";\n\nexport default {\n  name: \"RqPersonalCenter\",\n  components: {\n    Card,\n    Topic,\n    Follow,\n    Empty\n  },\n  props: {\n    uid: {\n      required: true,\n      type: Number\n    }\n  },\n  data() {\n    return {\n      banner: bannerImage,\n      contentKeys: {\n        subscribe: {\n          col: 3,\n          component: \"Card\"\n        },\n        share: {\n          col: 3,\n          component: \"Card\"\n        },\n        topic: {\n          col: 2,\n          component: \"Topic\"\n        },\n        follow: {\n          col: 4,\n          component: \"Follow\"\n        },\n        fans: {\n          col: 4,\n          component: \"Follow\"\n        }\n      },\n      labels: {\n        follow: \"关注\",\n        fans: \"粉丝\",\n        more: \"更多 >\",\n        subscribe: \"我的订阅\",\n        share: \"分享的订阅\",\n        topic: \"发表的主题\",\n        level: [{\n          label: \"青铜韭菜\",\n          image: bronzeImage\n        }, {\n          label: \"黄金矿工\",\n          image: goldImage\n        }, {\n          label: \"钻石强者\",\n          image: diamondImage\n        }, {\n          label: \"量化王者\",\n          image: kingImage\n        }]\n      },\n      account: {\n        name: \"金尾巴\",\n        avatar: \"\",\n        follow: 2,\n        fans: 300,\n        isFollow: false,\n        descrition: \"这家伙很懒，什么也没有留下\",\n        level: 1\n      },\n      info: {\n        subscribe: [],\n        share: [],\n        topic: [],\n        follow: [],\n        fans: []\n      }\n    }\n  },\n  async mounted() {\n    this.loadData(this.uid);\n  },\n  watch: {\n    uid: {\n      handler(val) {\n        this.loadData(val);\n      }\n    }\n  },\n  methods: {\n    loadData(uid) {\n      this.loadAccountData(uid);\n      this.loadSubscribeData();\n      this.loadShareData(uid);\n      this.loadTopicData(uid);\n      this.loadFansAndFollowData(uid);\n    },\n    initAlgoData(key, data) {\n      const fmtPercent = num => (num * 100).toFixed(2);\n      this.info[key] = data.map(e => ({\n          algoId: e[\"algo-id\"],\n          name: e.title,\n          year: fmtPercent(e.annualizedReturn),\n          total: fmtPercent(e.totalReturn),\n          retracement: fmtPercent(e.maximumDrawdown),\n          startAt: fmtDate(e.runStartTimestamp)\n      }));\n    },\n    async loadAccountData(uid) {\n      const paramsList = {\n        name: [\"userInfo\", \"username\"],\n        avatar: [\"userInfo\", \"picture\"],\n        descrition: [\"userInfo\", \"signature\"],\n        follow: [\"userInfo\", \"followingCount\"],\n        fans: [\"userInfo\", \"followerCount\"],\n        isFollow: [\"userInfo\", \"isFollowing\"],\n        level: [\"level\"],\n      }\n      const { data: {code, userData} } = await getAccount(132782);\n      if (code === 0) {\n        Object.entries(paramsList).map(([key, path]) => {\n          const val = path.length === 1 ?\n            userData[path[0]]\n            : path.reduce((a, b) => {\n              if (typeof a === \"string\") {\n                return userData[a][b];\n              } else {\n                return a[b];\n              }\n            });\n          this.account[key] = val !== \"\"  ? val : this.account[key];\n        })\n      }\n    },\n    async loadTopicData(uid) {\n      const {topics} = await getTopic(uid);\n      this.info.topic = topics.map(e => {\n        return {\n          tid: e.tid,\n          createAt: fmtDatetime(e.timestamp),\n          lastRepeat: fmtDatetime(e.relativeTime),\n          name: e.title,\n          author: {\n            name: e.user.username,\n            avatar: e.user.picture,\n            uid: e.user.uid\n          },\n          chat: e.postcount,\n          view: e.viewcount,\n          like: e.votes,\n          chart: e.clone\n        }\n      });\n    },\n    async loadFansAndFollowData(uid) {\n      getFans(uid).then(({users}) => {\n        this.info.fans = users.map(e => {\n          return {\n            name: e.username,\n            avatar: e.picture,\n            uid: e.uid\n          }\n        });\n      });\n\n      getFollow(uid).then(({users}) => {\n        this.info.follow = users.map(e => {\n          return {\n            name: e.username,\n            avatar: e.picture,\n            uid: e.uid\n          }\n        });\n      });\n    },\n    async loadShareData(uid) {\n      const {data} = await getShare(uid);\n      this.initAlgoData(\"share\", data);\n    },\n    async loadSubscribeData() {\n      const {data} = await getSubscribe();\n      this.initAlgoData(\"subscribe\", data);\n    },\n    follow(follow=true) {\n      this.$emit(\"follow\", this.uid, follow);\n      this.account.isFollow = follow;\n    },\n    redirect(...path) {\n      this.$emit(\"redirect\", ...path);\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import \"../../common/style/common/index.scss\";\n\n::v-deep {\n  // @include debug;\n}\n.personal-center {\n  width: 100%;\n  min-width: $min-vw;\n  @include f-column;\n  background: $container-bg;\n  padding-bottom: 40px;\n  &__block {\n    position: relative;\n    padding-top: 40px;\n    width: $article-width;\n  }\n  .banner {\n    position: relative;\n    width: 100%;\n    height: 280px;\n    .personal-center__block {\n      position: relative;\n      padding: 0;\n      display: flex;\n      @include m-center;\n      height: 100%;\n      align-items: center;\n      background: transparent;\n    }\n    .bg {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      img {\n        @include img-center;\n      }\n    }\n    .avatar {\n      width: 146px;\n      height: 146px;\n      background: $avatar-bg;\n      overflow: hidden;\n      border-radius: 50%;\n      img {\n        @include img-center;\n      }\n    }\n    .content {\n      flex: 1;\n      padding: 0 30px;\n      p {\n        @include text($text-white);\n        &.title {\n          @include h3($text-white);\n          margin-left: 0;\n          vertical-align: center;\n          & + p {\n            margin-top: 24px;\n          }\n          i {\n            @include hover-scale;\n          }\n        }\n      }\n      span:nth-child(2n) {\n        margin-right: 14px;\n      }\n      p + p {\n        margin-top: 12px;\n      }\n      .rq-icons {\n        margin-left: 14px;\n        &.icon-heart {\n          color: $highlight;\n        }\n      }\n    }\n    .level {\n      width: 170px;\n      height: 170px;\n      overflow: hidden;\n      @include hover-scale;\n      .level-img {\n        @include img-center;\n      }\n    }\n  }\n  .title {\n    @include h3;\n    margin-left: 6px;\n    a {\n      margin-left: 14px;\n      text-decoration: none;\n      @include text;\n    }\n  }\n  .card-list {\n    display: flex;\n    flex-wrap: wrap;\n  }\n}\n</style>\n"]}, media: undefined });

  };
  /* scoped */
  const __vue_scope_id__$5 = "data-v-4a8d548c";
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject SSR */
  

  
  var PersonalCenter = normalizeComponent_1(
    { render: __vue_render__$5, staticRenderFns: __vue_staticRenderFns__$5 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    browser,
    undefined
  );

PersonalCenter.install = function (Vue) {
  Vue.component(PersonalCenter.name, PersonalCenter);
};

const components = [RqHeader, PersonalCenter];

const install = function (Vue, opt = {}) {
  components.forEach(component => {
    Vue.component(component.name, component);
  });
};
var index = {
  install
};

exports.RqHeader = RqHeader;
exports.RqPersonalCenter = PersonalCenter;
exports.default = index;
//# sourceMappingURL=rqcomponents.cjs.js.map
