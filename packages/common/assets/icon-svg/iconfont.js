!(function (t) {
  var e,
    l,
    o,
    i,
    a,
    n,
    h,
    d =
      '<svg><symbol id="icon-base-colorful-logo-sdk" viewBox="0 0 1024 1024"><path d="M0 0h317.21651l164.750173 496.174801L0 656.176135z" fill="#F28F00" ></path><path d="M1024.008533 0v316.201035L527.526529 481.070676 367.793998 0z" fill="#E03632" ></path><path d="M657.212943 1024L497.092142 541.743181 0.021334 706.79629v317.054375z" fill="#3B2CA8" ></path><path d="M542.643455 526.592122l481.360812-159.800799v657.20441h-316.213835z" fill="#0C8088" ></path></symbol><symbol id="icon-base-colorful-logo-sdk-gray" viewBox="0 0 1024 1024"><path d="M0 0.002133h317.21651l164.750173 496.174802L0 656.178268z" fill="#8C8C8C" ></path><path d="M1024.008533 0.002133v316.201035L527.526529 481.072809 367.793998 0.002133z" fill="#383838" ></path><path d="M657.212943 1024.002133L497.092142 541.745315 0.021334 706.798423v317.054376z" fill="#383838" ></path><path d="M542.643455 526.594255l481.360812-159.800798v657.20441h-316.213835z" fill="#383838" ></path></symbol><symbol id="icon-base-colorful-logo-sdk-blue" viewBox="0 0 1024 1024"><path d="M0 0h317.21651l164.750173 496.174801L0 656.176135z" fill="#1B5FC5" ></path><path d="M1024.008533 0v316.201035L527.526529 481.070676 367.793998 0z" fill="#1B3C77" ></path><path d="M657.212943 1024L497.092142 541.743181 0.021334 706.79629v317.054375z" fill="#1B3C77" ></path><path d="M542.643455 526.592122l481.360812-159.800799v657.20441h-316.213835z" fill="#1B3C77" ></path></symbol><symbol id="icon-base-colorful-logo-ricequant" viewBox="0 0 1024 1024"><path d="M307.385212 194.528537h132.68629v131.637484h-132.68629z" fill="#A02A2A" ></path><path d="M307.385212 697.837464h132.68629v131.633999h-132.68629z" fill="#A02A2A" ></path><path d="M256.652218 357.138931V93.870933H123.976381v394.898513h132.686291z" fill="#A02A2A" ></path><path d="M256.652218 697.837464v-131.633999H123.976381v263.267998h132.686291z" fill="#FF5C5C" ></path><path d="M623.490786 798.498552v-263.264514h-132.68629v394.898513h132.68629z" fill="#A02A2A" ></path><path d="M623.490786 326.166021V194.532022h-132.68629v263.264513h132.68629z" fill="#FF5C5C" ></path><path d="M674.22378 798.495068V930.129067h132.68629v-263.267998h-132.68629z" fill="#FF5C5C" ></path></symbol></svg>',
    s = (e = document.getElementsByTagName("script"))[
      e.length - 1
    ].getAttribute("data-injectcss");
  if (s && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0;
    try {
      document.write(
        "<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>"
      );
    } catch (t) {
      console && console.log(t);
    }
  }
  function c() {
    n || ((n = !0), i());
  }
  (l = function () {
    var t,
      e,
      l,
      o,
      i,
      a = document.createElement("div");
    (a.innerHTML = d),
      (d = null),
      (t = a.getElementsByTagName("svg")[0]) &&
        (t.setAttribute("aria-hidden", "true"),
        (t.style.position = "absolute"),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = "hidden"),
        (e = t),
        (l = document.body).firstChild
          ? ((o = e), (i = l.firstChild).parentNode.insertBefore(o, i))
          : l.appendChild(e));
  }),
    document.addEventListener
      ? ~["complete", "loaded", "interactive"].indexOf(document.readyState)
        ? setTimeout(l, 0)
        : ((o = function () {
            document.removeEventListener("DOMContentLoaded", o, !1), l();
          }),
          document.addEventListener("DOMContentLoaded", o, !1))
      : document.attachEvent &&
        ((i = l),
        (a = t.document),
        (n = !1),
        (h = function () {
          try {
            a.documentElement.doScroll("left");
          } catch (t) {
            return void setTimeout(h, 50);
          }
          c();
        })(),
        (a.onreadystatechange = function () {
          "complete" == a.readyState && ((a.onreadystatechange = null), c());
        }));
})(window);
