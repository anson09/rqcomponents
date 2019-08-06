(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('http'), require('https'), require('url'), require('assert'), require('stream'), require('tty'), require('util'), require('os'), require('zlib')) :
  typeof define === 'function' && define.amd ? define(['exports', 'http', 'https', 'url', 'assert', 'stream', 'tty', 'util', 'os', 'zlib'], factory) :
  (global = global || self, factory(global.rqcomponent = {}, global.http, global.https, global.url, global.assert, global.stream, global.tty, global.util, global.os, global.zlib));
}(this, function (exports, http, https, url, assert, stream, tty, util, os, zlib) { 'use strict';

  http = http && http.hasOwnProperty('default') ? http['default'] : http;
  https = https && https.hasOwnProperty('default') ? https['default'] : https;
  url = url && url.hasOwnProperty('default') ? url['default'] : url;
  assert = assert && assert.hasOwnProperty('default') ? assert['default'] : assert;
  stream = stream && stream.hasOwnProperty('default') ? stream['default'] : stream;
  tty = tty && tty.hasOwnProperty('default') ? tty['default'] : tty;
  util = util && util.hasOwnProperty('default') ? util['default'] : util;
  os = os && os.hasOwnProperty('default') ? os['default'] : os;
  zlib = zlib && zlib.hasOwnProperty('default') ? zlib['default'] : zlib;

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
  				href: "/site/api/python/chn"
  			},
  			{
  				label: "研究文档",
  				href: "/site/api/research/chn"
  			},
  			{
  				label: "API文档",
  				href: "/site/api/python/chn"
  			},
  			{
  				label: "数据文档",
  				href: "/site/fundamentals"
  			},
  			{
  				label: "常见问题特殊情况",
  				href: "/site/faq"
  			}
  		]
  	},
  	{
  		label: "社区",
  		href: "/site/community"
  	},
  	{
  		type: "header",
  		img: "avator",
  		links: [
  			{
  				label: "设置",
  				href: "/site/profile"
  			},
  			{
  				label: "首页",
  				href: "/"
  			},
  			{
  				label: "登出",
  				event: [
  					"logout"
  				]
  			}
  		]
  	}
  ];

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  function getCjsExportFromNamespace (n) {
  	return n && n['default'] || n;
  }

  /** Detect free variable `global` from Node.js. */
  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

  var _freeGlobal = freeGlobal;

  /** Detect free variable `self`. */
  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

  /** Used as a reference to the global object. */
  var root = _freeGlobal || freeSelf || Function('return this')();

  var _root = root;

  /** Built-in value references. */
  var Symbol = _root.Symbol;

  var _Symbol = Symbol;

  /** Built-in value references. */
  var symToStringTag = _Symbol ? _Symbol.toStringTag : undefined;

  /** Built-in value references. */
  var symToStringTag$1 = _Symbol ? _Symbol.toStringTag : undefined;

  /** Used to convert symbols to primitives and strings. */
  var symbolProto = _Symbol ? _Symbol.prototype : undefined,
      symbolToString = symbolProto ? symbolProto.toString : undefined;

  var bind = function bind(fn, thisArg) {
    return function wrap() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      return fn.apply(thisArg, args);
    };
  };

  /*!
   * Determine if an object is a Buffer
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   */

  var isBuffer = function isBuffer (obj) {
    return obj != null && obj.constructor != null &&
      typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
  };

  /*global toString:true*/

  // utils is a library of generic helper functions non-specific to axios

  var toString = Object.prototype.toString;

  /**
   * Determine if a value is an Array
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Array, otherwise false
   */
  function isArray(val) {
    return toString.call(val) === '[object Array]';
  }

  /**
   * Determine if a value is an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an ArrayBuffer, otherwise false
   */
  function isArrayBuffer(val) {
    return toString.call(val) === '[object ArrayBuffer]';
  }

  /**
   * Determine if a value is a FormData
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an FormData, otherwise false
   */
  function isFormData(val) {
    return (typeof FormData !== 'undefined') && (val instanceof FormData);
  }

  /**
   * Determine if a value is a view on an ArrayBuffer
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
   */
  function isArrayBufferView(val) {
    var result;
    if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
      result = ArrayBuffer.isView(val);
    } else {
      result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
    }
    return result;
  }

  /**
   * Determine if a value is a String
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a String, otherwise false
   */
  function isString(val) {
    return typeof val === 'string';
  }

  /**
   * Determine if a value is a Number
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Number, otherwise false
   */
  function isNumber(val) {
    return typeof val === 'number';
  }

  /**
   * Determine if a value is undefined
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if the value is undefined, otherwise false
   */
  function isUndefined(val) {
    return typeof val === 'undefined';
  }

  /**
   * Determine if a value is an Object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is an Object, otherwise false
   */
  function isObject(val) {
    return val !== null && typeof val === 'object';
  }

  /**
   * Determine if a value is a Date
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Date, otherwise false
   */
  function isDate(val) {
    return toString.call(val) === '[object Date]';
  }

  /**
   * Determine if a value is a File
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a File, otherwise false
   */
  function isFile(val) {
    return toString.call(val) === '[object File]';
  }

  /**
   * Determine if a value is a Blob
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Blob, otherwise false
   */
  function isBlob(val) {
    return toString.call(val) === '[object Blob]';
  }

  /**
   * Determine if a value is a Function
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Function, otherwise false
   */
  function isFunction(val) {
    return toString.call(val) === '[object Function]';
  }

  /**
   * Determine if a value is a Stream
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a Stream, otherwise false
   */
  function isStream(val) {
    return isObject(val) && isFunction(val.pipe);
  }

  /**
   * Determine if a value is a URLSearchParams object
   *
   * @param {Object} val The value to test
   * @returns {boolean} True if value is a URLSearchParams object, otherwise false
   */
  function isURLSearchParams(val) {
    return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
  }

  /**
   * Trim excess whitespace off the beginning and end of a string
   *
   * @param {String} str The String to trim
   * @returns {String} The String freed of excess whitespace
   */
  function trim(str) {
    return str.replace(/^\s*/, '').replace(/\s*$/, '');
  }

  /**
   * Determine if we're running in a standard browser environment
   *
   * This allows axios to run in a web worker, and react-native.
   * Both environments support XMLHttpRequest, but not fully standard globals.
   *
   * web workers:
   *  typeof window -> undefined
   *  typeof document -> undefined
   *
   * react-native:
   *  navigator.product -> 'ReactNative'
   * nativescript
   *  navigator.product -> 'NativeScript' or 'NS'
   */
  function isStandardBrowserEnv() {
    if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                             navigator.product === 'NativeScript' ||
                                             navigator.product === 'NS')) {
      return false;
    }
    return (
      typeof window !== 'undefined' &&
      typeof document !== 'undefined'
    );
  }

  /**
   * Iterate over an Array or an Object invoking a function for each item.
   *
   * If `obj` is an Array callback will be called passing
   * the value, index, and complete array for each item.
   *
   * If 'obj' is an Object callback will be called passing
   * the value, key, and complete object for each property.
   *
   * @param {Object|Array} obj The object to iterate
   * @param {Function} fn The callback to invoke for each item
   */
  function forEach(obj, fn) {
    // Don't bother if no value provided
    if (obj === null || typeof obj === 'undefined') {
      return;
    }

    // Force an array if not already something iterable
    if (typeof obj !== 'object') {
      /*eslint no-param-reassign:0*/
      obj = [obj];
    }

    if (isArray(obj)) {
      // Iterate over array values
      for (var i = 0, l = obj.length; i < l; i++) {
        fn.call(null, obj[i], i, obj);
      }
    } else {
      // Iterate over object keys
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          fn.call(null, obj[key], key, obj);
        }
      }
    }
  }

  /**
   * Accepts varargs expecting each argument to be an object, then
   * immutably merges the properties of each object and returns result.
   *
   * When multiple objects contain the same key the later object in
   * the arguments list will take precedence.
   *
   * Example:
   *
   * ```js
   * var result = merge({foo: 123}, {foo: 456});
   * console.log(result.foo); // outputs 456
   * ```
   *
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function merge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = merge(result[key], val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Function equal to merge with the difference being that no reference
   * to original objects is kept.
   *
   * @see merge
   * @param {Object} obj1 Object to merge
   * @returns {Object} Result of all merge properties
   */
  function deepMerge(/* obj1, obj2, obj3, ... */) {
    var result = {};
    function assignValue(val, key) {
      if (typeof result[key] === 'object' && typeof val === 'object') {
        result[key] = deepMerge(result[key], val);
      } else if (typeof val === 'object') {
        result[key] = deepMerge({}, val);
      } else {
        result[key] = val;
      }
    }

    for (var i = 0, l = arguments.length; i < l; i++) {
      forEach(arguments[i], assignValue);
    }
    return result;
  }

  /**
   * Extends object a by mutably adding to it the properties of object b.
   *
   * @param {Object} a The object to be extended
   * @param {Object} b The object to copy properties from
   * @param {Object} thisArg The object to bind function to
   * @return {Object} The resulting value of object a
   */
  function extend(a, b, thisArg) {
    forEach(b, function assignValue(val, key) {
      if (thisArg && typeof val === 'function') {
        a[key] = bind(val, thisArg);
      } else {
        a[key] = val;
      }
    });
    return a;
  }

  var utils = {
    isArray: isArray,
    isArrayBuffer: isArrayBuffer,
    isBuffer: isBuffer,
    isFormData: isFormData,
    isArrayBufferView: isArrayBufferView,
    isString: isString,
    isNumber: isNumber,
    isObject: isObject,
    isUndefined: isUndefined,
    isDate: isDate,
    isFile: isFile,
    isBlob: isBlob,
    isFunction: isFunction,
    isStream: isStream,
    isURLSearchParams: isURLSearchParams,
    isStandardBrowserEnv: isStandardBrowserEnv,
    forEach: forEach,
    merge: merge,
    deepMerge: deepMerge,
    extend: extend,
    trim: trim
  };

  function encode(val) {
    return encodeURIComponent(val).
      replace(/%40/gi, '@').
      replace(/%3A/gi, ':').
      replace(/%24/g, '$').
      replace(/%2C/gi, ',').
      replace(/%20/g, '+').
      replace(/%5B/gi, '[').
      replace(/%5D/gi, ']');
  }

  /**
   * Build a URL by appending params to the end
   *
   * @param {string} url The base of the url (e.g., http://www.google.com)
   * @param {object} [params] The params to be appended
   * @returns {string} The formatted url
   */
  var buildURL = function buildURL(url, params, paramsSerializer) {
    /*eslint no-param-reassign:0*/
    if (!params) {
      return url;
    }

    var serializedParams;
    if (paramsSerializer) {
      serializedParams = paramsSerializer(params);
    } else if (utils.isURLSearchParams(params)) {
      serializedParams = params.toString();
    } else {
      var parts = [];

      utils.forEach(params, function serialize(val, key) {
        if (val === null || typeof val === 'undefined') {
          return;
        }

        if (utils.isArray(val)) {
          key = key + '[]';
        } else {
          val = [val];
        }

        utils.forEach(val, function parseValue(v) {
          if (utils.isDate(v)) {
            v = v.toISOString();
          } else if (utils.isObject(v)) {
            v = JSON.stringify(v);
          }
          parts.push(encode(key) + '=' + encode(v));
        });
      });

      serializedParams = parts.join('&');
    }

    if (serializedParams) {
      var hashmarkIndex = url.indexOf('#');
      if (hashmarkIndex !== -1) {
        url = url.slice(0, hashmarkIndex);
      }

      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
    }

    return url;
  };

  function InterceptorManager() {
    this.handlers = [];
  }

  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  InterceptorManager.prototype.use = function use(fulfilled, rejected) {
    this.handlers.push({
      fulfilled: fulfilled,
      rejected: rejected
    });
    return this.handlers.length - 1;
  };

  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   */
  InterceptorManager.prototype.eject = function eject(id) {
    if (this.handlers[id]) {
      this.handlers[id] = null;
    }
  };

  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   */
  InterceptorManager.prototype.forEach = function forEach(fn) {
    utils.forEach(this.handlers, function forEachHandler(h) {
      if (h !== null) {
        fn(h);
      }
    });
  };

  var InterceptorManager_1 = InterceptorManager;

  /**
   * Transform the data for a request or a response
   *
   * @param {Object|String} data The data to be transformed
   * @param {Array} headers The headers for the request or response
   * @param {Array|Function} fns A single function or Array of functions
   * @returns {*} The resulting transformed data
   */
  var transformData = function transformData(data, headers, fns) {
    /*eslint no-param-reassign:0*/
    utils.forEach(fns, function transform(fn) {
      data = fn(data, headers);
    });

    return data;
  };

  var isCancel = function isCancel(value) {
    return !!(value && value.__CANCEL__);
  };

  var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
    utils.forEach(headers, function processHeader(value, name) {
      if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
        headers[normalizedName] = value;
        delete headers[name];
      }
    });
  };

  /**
   * Update an Error with the specified config, error code, and response.
   *
   * @param {Error} error The error to update.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The error.
   */
  var enhanceError = function enhanceError(error, config, code, request, response) {
    error.config = config;
    if (code) {
      error.code = code;
    }

    error.request = request;
    error.response = response;
    error.isAxiosError = true;

    error.toJSON = function() {
      return {
        // Standard
        message: this.message,
        name: this.name,
        // Microsoft
        description: this.description,
        number: this.number,
        // Mozilla
        fileName: this.fileName,
        lineNumber: this.lineNumber,
        columnNumber: this.columnNumber,
        stack: this.stack,
        // Axios
        config: this.config,
        code: this.code
      };
    };
    return error;
  };

  /**
   * Create an Error with the specified message, config, error code, request and response.
   *
   * @param {string} message The error message.
   * @param {Object} config The config.
   * @param {string} [code] The error code (for example, 'ECONNABORTED').
   * @param {Object} [request] The request.
   * @param {Object} [response] The response.
   * @returns {Error} The created error.
   */
  var createError = function createError(message, config, code, request, response) {
    var error = new Error(message);
    return enhanceError(error, config, code, request, response);
  };

  /**
   * Resolve or reject a Promise based on response status.
   *
   * @param {Function} resolve A function that resolves the promise.
   * @param {Function} reject A function that rejects the promise.
   * @param {object} response The response.
   */
  var settle = function settle(resolve, reject, response) {
    var validateStatus = response.config.validateStatus;
    if (!validateStatus || validateStatus(response.status)) {
      resolve(response);
    } else {
      reject(createError(
        'Request failed with status code ' + response.status,
        response.config,
        null,
        response.request,
        response
      ));
    }
  };

  /**
   * Helpers.
   */

  var s = 1000;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;

  /**
   * Parse or format the given `val`.
   *
   * Options:
   *
   *  - `long` verbose formatting [false]
   *
   * @param {String|Number} val
   * @param {Object} [options]
   * @throws {Error} throw an error if val is not a non-empty string or a number
   * @return {String|Number}
   * @api public
   */

  var ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === 'string' && val.length > 0) {
      return parse(val);
    } else if (type === 'number' && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      'val is not a non-empty string or a valid number. val=' +
        JSON.stringify(val)
    );
  };

  /**
   * Parse the given `str` and return milliseconds.
   *
   * @param {String} str
   * @return {Number}
   * @api private
   */

  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || 'ms').toLowerCase();
    switch (type) {
      case 'years':
      case 'year':
      case 'yrs':
      case 'yr':
      case 'y':
        return n * y;
      case 'days':
      case 'day':
      case 'd':
        return n * d;
      case 'hours':
      case 'hour':
      case 'hrs':
      case 'hr':
      case 'h':
        return n * h;
      case 'minutes':
      case 'minute':
      case 'mins':
      case 'min':
      case 'm':
        return n * m;
      case 'seconds':
      case 'second':
      case 'secs':
      case 'sec':
      case 's':
        return n * s;
      case 'milliseconds':
      case 'millisecond':
      case 'msecs':
      case 'msec':
      case 'ms':
        return n;
      default:
        return undefined;
    }
  }

  /**
   * Short format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtShort(ms) {
    if (ms >= d) {
      return Math.round(ms / d) + 'd';
    }
    if (ms >= h) {
      return Math.round(ms / h) + 'h';
    }
    if (ms >= m) {
      return Math.round(ms / m) + 'm';
    }
    if (ms >= s) {
      return Math.round(ms / s) + 's';
    }
    return ms + 'ms';
  }

  /**
   * Long format for `ms`.
   *
   * @param {Number} ms
   * @return {String}
   * @api private
   */

  function fmtLong(ms) {
    return plural(ms, d, 'day') ||
      plural(ms, h, 'hour') ||
      plural(ms, m, 'minute') ||
      plural(ms, s, 'second') ||
      ms + ' ms';
  }

  /**
   * Pluralization helper.
   */

  function plural(ms, n, name) {
    if (ms < n) {
      return;
    }
    if (ms < n * 1.5) {
      return Math.floor(ms / n) + ' ' + name;
    }
    return Math.ceil(ms / n) + ' ' + name + 's';
  }

  var debug = createCommonjsModule(function (module, exports) {
  /**
   * This is the common logic for both the Node.js and web browser
   * implementations of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
  exports.coerce = coerce;
  exports.disable = disable;
  exports.enable = enable;
  exports.enabled = enabled;
  exports.humanize = ms;

  /**
   * Active `debug` instances.
   */
  exports.instances = [];

  /**
   * The currently active debug mode names, and names to skip.
   */

  exports.names = [];
  exports.skips = [];

  /**
   * Map of special "%n" handling functions, for the debug "format" argument.
   *
   * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
   */

  exports.formatters = {};

  /**
   * Select a color.
   * @param {String} namespace
   * @return {Number}
   * @api private
   */

  function selectColor(namespace) {
    var hash = 0, i;

    for (i in namespace) {
      hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    return exports.colors[Math.abs(hash) % exports.colors.length];
  }

  /**
   * Create a debugger with the given `namespace`.
   *
   * @param {String} namespace
   * @return {Function}
   * @api public
   */

  function createDebug(namespace) {

    var prevTime;

    function debug() {
      // disabled?
      if (!debug.enabled) return;

      var self = debug;

      // set `diff` timestamp
      var curr = +new Date();
      var ms = curr - (prevTime || curr);
      self.diff = ms;
      self.prev = prevTime;
      self.curr = curr;
      prevTime = curr;

      // turn the `arguments` into a proper Array
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }

      args[0] = exports.coerce(args[0]);

      if ('string' !== typeof args[0]) {
        // anything else let's inspect with %O
        args.unshift('%O');
      }

      // apply any `formatters` transformations
      var index = 0;
      args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
        // if we encounter an escaped % then don't increase the array index
        if (match === '%%') return match;
        index++;
        var formatter = exports.formatters[format];
        if ('function' === typeof formatter) {
          var val = args[index];
          match = formatter.call(self, val);

          // now we need to remove `args[index]` since it's inlined in the `format`
          args.splice(index, 1);
          index--;
        }
        return match;
      });

      // apply env-specific formatting (colors, etc.)
      exports.formatArgs.call(self, args);

      var logFn = debug.log || exports.log || console.log.bind(console);
      logFn.apply(self, args);
    }

    debug.namespace = namespace;
    debug.enabled = exports.enabled(namespace);
    debug.useColors = exports.useColors();
    debug.color = selectColor(namespace);
    debug.destroy = destroy;

    // env-specific initialization logic for debug instances
    if ('function' === typeof exports.init) {
      exports.init(debug);
    }

    exports.instances.push(debug);

    return debug;
  }

  function destroy () {
    var index = exports.instances.indexOf(this);
    if (index !== -1) {
      exports.instances.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }

  /**
   * Enables a debug mode by namespaces. This can include modes
   * separated by a colon and wildcards.
   *
   * @param {String} namespaces
   * @api public
   */

  function enable(namespaces) {
    exports.save(namespaces);

    exports.names = [];
    exports.skips = [];

    var i;
    var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
    var len = split.length;

    for (i = 0; i < len; i++) {
      if (!split[i]) continue; // ignore empty strings
      namespaces = split[i].replace(/\*/g, '.*?');
      if (namespaces[0] === '-') {
        exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
      } else {
        exports.names.push(new RegExp('^' + namespaces + '$'));
      }
    }

    for (i = 0; i < exports.instances.length; i++) {
      var instance = exports.instances[i];
      instance.enabled = exports.enabled(instance.namespace);
    }
  }

  /**
   * Disable debug output.
   *
   * @api public
   */

  function disable() {
    exports.enable('');
  }

  /**
   * Returns true if the given mode name is enabled, false otherwise.
   *
   * @param {String} name
   * @return {Boolean}
   * @api public
   */

  function enabled(name) {
    if (name[name.length - 1] === '*') {
      return true;
    }
    var i, len;
    for (i = 0, len = exports.skips.length; i < len; i++) {
      if (exports.skips[i].test(name)) {
        return false;
      }
    }
    for (i = 0, len = exports.names.length; i < len; i++) {
      if (exports.names[i].test(name)) {
        return true;
      }
    }
    return false;
  }

  /**
   * Coerce `val`.
   *
   * @param {Mixed} val
   * @return {Mixed}
   * @api private
   */

  function coerce(val) {
    if (val instanceof Error) return val.stack || val.message;
    return val;
  }
  });
  var debug_1 = debug.coerce;
  var debug_2 = debug.disable;
  var debug_3 = debug.enable;
  var debug_4 = debug.enabled;
  var debug_5 = debug.humanize;
  var debug_6 = debug.instances;
  var debug_7 = debug.names;
  var debug_8 = debug.skips;
  var debug_9 = debug.formatters;

  var browser = createCommonjsModule(function (module, exports) {
  /**
   * This is the web browser implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;
  exports.storage = 'undefined' != typeof chrome
                 && 'undefined' != typeof chrome.storage
                    ? chrome.storage.local
                    : localstorage();

  /**
   * Colors.
   */

  exports.colors = [
    '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
    '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
    '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
    '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
    '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
    '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
    '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
    '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
    '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
    '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
    '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
  ];

  /**
   * Currently only WebKit-based Web Inspectors, Firefox >= v31,
   * and the Firebug extension (any Firefox version) are known
   * to support "%c" CSS customizations.
   *
   * TODO: add a `localStorage` variable to explicitly enable/disable colors
   */

  function useColors() {
    // NB: In an Electron preload script, document will be defined but not fully
    // initialized. Since we know we're in Chrome, we'll just detect this case
    // explicitly
    if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
      return true;
    }

    // Internet Explorer and Edge do not support colors.
    if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
      return false;
    }

    // is webkit? http://stackoverflow.com/a/16459606/376773
    // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
    return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
      // is firebug? http://stackoverflow.com/a/398120/376773
      (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
      // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
      // double check webkit in userAgent just in case we are in a worker
      (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
  }

  /**
   * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
   */

  exports.formatters.j = function(v) {
    try {
      return JSON.stringify(v);
    } catch (err) {
      return '[UnexpectedJSONParseError]: ' + err.message;
    }
  };


  /**
   * Colorize log arguments if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var useColors = this.useColors;

    args[0] = (useColors ? '%c' : '')
      + this.namespace
      + (useColors ? ' %c' : ' ')
      + args[0]
      + (useColors ? '%c ' : ' ')
      + '+' + exports.humanize(this.diff);

    if (!useColors) return;

    var c = 'color: ' + this.color;
    args.splice(1, 0, c, 'color: inherit');

    // the final "%c" is somewhat tricky, because there could be other
    // arguments passed either before or after the %c, so we need to
    // figure out the correct index to insert the CSS into
    var index = 0;
    var lastC = 0;
    args[0].replace(/%[a-zA-Z%]/g, function(match) {
      if ('%%' === match) return;
      index++;
      if ('%c' === match) {
        // we only are interested in the *last* %c
        // (the user may have provided their own)
        lastC = index;
      }
    });

    args.splice(lastC, 0, c);
  }

  /**
   * Invokes `console.log()` when available.
   * No-op when `console.log` is not a "function".
   *
   * @api public
   */

  function log() {
    // this hackery is required for IE8/9, where
    // the `console.log` function doesn't have 'apply'
    return 'object' === typeof console
      && console.log
      && Function.prototype.apply.call(console.log, console, arguments);
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    try {
      if (null == namespaces) {
        exports.storage.removeItem('debug');
      } else {
        exports.storage.debug = namespaces;
      }
    } catch(e) {}
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    var r;
    try {
      r = exports.storage.debug;
    } catch(e) {}

    // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
    if (!r && typeof process !== 'undefined' && 'env' in process) {
      r = process.env.DEBUG;
    }

    return r;
  }

  /**
   * Enable namespaces listed in `localStorage.debug` initially.
   */

  exports.enable(load());

  /**
   * Localstorage attempts to return the localstorage.
   *
   * This is necessary because safari throws
   * when a user disables cookies/localstorage
   * and you attempt to access it.
   *
   * @return {LocalStorage}
   * @api private
   */

  function localstorage() {
    try {
      return window.localStorage;
    } catch (e) {}
  }
  });
  var browser_1 = browser.log;
  var browser_2 = browser.formatArgs;
  var browser_3 = browser.save;
  var browser_4 = browser.load;
  var browser_5 = browser.useColors;
  var browser_6 = browser.storage;
  var browser_7 = browser.colors;

  var hasFlag = (flag, argv) => {
  	argv = argv || process.argv;
  	const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
  	const pos = argv.indexOf(prefix + flag);
  	const terminatorPos = argv.indexOf('--');
  	return pos !== -1 && (terminatorPos === -1 ? true : pos < terminatorPos);
  };

  const {env} = process;

  let forceColor;
  if (hasFlag('no-color') ||
  	hasFlag('no-colors') ||
  	hasFlag('color=false') ||
  	hasFlag('color=never')) {
  	forceColor = 0;
  } else if (hasFlag('color') ||
  	hasFlag('colors') ||
  	hasFlag('color=true') ||
  	hasFlag('color=always')) {
  	forceColor = 1;
  }
  if ('FORCE_COLOR' in env) {
  	if (env.FORCE_COLOR === true || env.FORCE_COLOR === 'true') {
  		forceColor = 1;
  	} else if (env.FORCE_COLOR === false || env.FORCE_COLOR === 'false') {
  		forceColor = 0;
  	} else {
  		forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
  	}
  }

  function translateLevel(level) {
  	if (level === 0) {
  		return false;
  	}

  	return {
  		level,
  		hasBasic: true,
  		has256: level >= 2,
  		has16m: level >= 3
  	};
  }

  function supportsColor(stream) {
  	if (forceColor === 0) {
  		return 0;
  	}

  	if (hasFlag('color=16m') ||
  		hasFlag('color=full') ||
  		hasFlag('color=truecolor')) {
  		return 3;
  	}

  	if (hasFlag('color=256')) {
  		return 2;
  	}

  	if (stream && !stream.isTTY && forceColor === undefined) {
  		return 0;
  	}

  	const min = forceColor || 0;

  	if (env.TERM === 'dumb') {
  		return min;
  	}

  	if (process.platform === 'win32') {
  		// Node.js 7.5.0 is the first version of Node.js to include a patch to
  		// libuv that enables 256 color output on Windows. Anything earlier and it
  		// won't work. However, here we target Node.js 8 at minimum as it is an LTS
  		// release, and Node.js 7 is not. Windows 10 build 10586 is the first Windows
  		// release that supports 256 colors. Windows 10 build 14931 is the first release
  		// that supports 16m/TrueColor.
  		const osRelease = os.release().split('.');
  		if (
  			Number(process.versions.node.split('.')[0]) >= 8 &&
  			Number(osRelease[0]) >= 10 &&
  			Number(osRelease[2]) >= 10586
  		) {
  			return Number(osRelease[2]) >= 14931 ? 3 : 2;
  		}

  		return 1;
  	}

  	if ('CI' in env) {
  		if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
  			return 1;
  		}

  		return min;
  	}

  	if ('TEAMCITY_VERSION' in env) {
  		return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
  	}

  	if (env.COLORTERM === 'truecolor') {
  		return 3;
  	}

  	if ('TERM_PROGRAM' in env) {
  		const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);

  		switch (env.TERM_PROGRAM) {
  			case 'iTerm.app':
  				return version >= 3 ? 3 : 2;
  			case 'Apple_Terminal':
  				return 2;
  			// No default
  		}
  	}

  	if (/-256(color)?$/i.test(env.TERM)) {
  		return 2;
  	}

  	if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
  		return 1;
  	}

  	if ('COLORTERM' in env) {
  		return 1;
  	}

  	return min;
  }

  function getSupportLevel(stream) {
  	const level = supportsColor(stream);
  	return translateLevel(level);
  }

  var supportsColor_1 = {
  	supportsColor: getSupportLevel,
  	stdout: getSupportLevel(process.stdout),
  	stderr: getSupportLevel(process.stderr)
  };

  var node = createCommonjsModule(function (module, exports) {
  /**
   * Module dependencies.
   */




  /**
   * This is the Node.js implementation of `debug()`.
   *
   * Expose `debug()` as the module.
   */

  exports = module.exports = debug;
  exports.init = init;
  exports.log = log;
  exports.formatArgs = formatArgs;
  exports.save = save;
  exports.load = load;
  exports.useColors = useColors;

  /**
   * Colors.
   */

  exports.colors = [ 6, 2, 3, 4, 5, 1 ];

  try {
    var supportsColor = supportsColor_1;
    if (supportsColor && supportsColor.level >= 2) {
      exports.colors = [
        20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68,
        69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 128, 129, 134,
        135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171,
        172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204,
        205, 206, 207, 208, 209, 214, 215, 220, 221
      ];
    }
  } catch (err) {
    // swallow - we only care if `supports-color` is available; it doesn't have to be.
  }

  /**
   * Build up the default `inspectOpts` object from the environment variables.
   *
   *   $ DEBUG_COLORS=no DEBUG_DEPTH=10 DEBUG_SHOW_HIDDEN=enabled node script.js
   */

  exports.inspectOpts = Object.keys(process.env).filter(function (key) {
    return /^debug_/i.test(key);
  }).reduce(function (obj, key) {
    // camel-case
    var prop = key
      .substring(6)
      .toLowerCase()
      .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });

    // coerce string value into JS value
    var val = process.env[key];
    if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
    else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
    else if (val === 'null') val = null;
    else val = Number(val);

    obj[prop] = val;
    return obj;
  }, {});

  /**
   * Is stdout a TTY? Colored output is enabled when `true`.
   */

  function useColors() {
    return 'colors' in exports.inspectOpts
      ? Boolean(exports.inspectOpts.colors)
      : tty.isatty(process.stderr.fd);
  }

  /**
   * Map %o to `util.inspect()`, all on a single line.
   */

  exports.formatters.o = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts)
      .split('\n').map(function(str) {
        return str.trim()
      }).join(' ');
  };

  /**
   * Map %o to `util.inspect()`, allowing multiple lines if needed.
   */

  exports.formatters.O = function(v) {
    this.inspectOpts.colors = this.useColors;
    return util.inspect(v, this.inspectOpts);
  };

  /**
   * Adds ANSI color escape codes if enabled.
   *
   * @api public
   */

  function formatArgs(args) {
    var name = this.namespace;
    var useColors = this.useColors;

    if (useColors) {
      var c = this.color;
      var colorCode = '\u001b[3' + (c < 8 ? c : '8;5;' + c);
      var prefix = '  ' + colorCode + ';1m' + name + ' ' + '\u001b[0m';

      args[0] = prefix + args[0].split('\n').join('\n' + prefix);
      args.push(colorCode + 'm+' + exports.humanize(this.diff) + '\u001b[0m');
    } else {
      args[0] = getDate() + name + ' ' + args[0];
    }
  }

  function getDate() {
    if (exports.inspectOpts.hideDate) {
      return '';
    } else {
      return new Date().toISOString() + ' ';
    }
  }

  /**
   * Invokes `util.format()` with the specified arguments and writes to stderr.
   */

  function log() {
    return process.stderr.write(util.format.apply(util, arguments) + '\n');
  }

  /**
   * Save `namespaces`.
   *
   * @param {String} namespaces
   * @api private
   */

  function save(namespaces) {
    if (null == namespaces) {
      // If you set a process.env field to null or undefined, it gets cast to the
      // string 'null' or 'undefined'. Just delete instead.
      delete process.env.DEBUG;
    } else {
      process.env.DEBUG = namespaces;
    }
  }

  /**
   * Load `namespaces`.
   *
   * @return {String} returns the previously persisted debug modes
   * @api private
   */

  function load() {
    return process.env.DEBUG;
  }

  /**
   * Init logic for `debug` instances.
   *
   * Create a new `inspectOpts` object in case `useColors` is set
   * differently for a particular `debug` instance.
   */

  function init (debug) {
    debug.inspectOpts = {};

    var keys = Object.keys(exports.inspectOpts);
    for (var i = 0; i < keys.length; i++) {
      debug.inspectOpts[keys[i]] = exports.inspectOpts[keys[i]];
    }
  }

  /**
   * Enable namespaces listed in `process.env.DEBUG` initially.
   */

  exports.enable(load());
  });
  var node_1 = node.init;
  var node_2 = node.log;
  var node_3 = node.formatArgs;
  var node_4 = node.save;
  var node_5 = node.load;
  var node_6 = node.useColors;
  var node_7 = node.colors;
  var node_8 = node.inspectOpts;

  var src = createCommonjsModule(function (module) {
  /**
   * Detect Electron renderer process, which is node, but we should
   * treat as a browser.
   */

  if (typeof process === 'undefined' || process.type === 'renderer') {
    module.exports = browser;
  } else {
    module.exports = node;
  }
  });

  var Writable = stream.Writable;
  var debug$1 = src("follow-redirects");

  // RFC7231§4.2.1: Of the request methods defined by this specification,
  // the GET, HEAD, OPTIONS, and TRACE methods are defined to be safe.
  var SAFE_METHODS = { GET: true, HEAD: true, OPTIONS: true, TRACE: true };

  // Create handlers that pass events from native requests
  var eventHandlers = Object.create(null);
  ["abort", "aborted", "error", "socket", "timeout"].forEach(function (event) {
    eventHandlers[event] = function (arg) {
      this._redirectable.emit(event, arg);
    };
  });

  // An HTTP(S) request that can be redirected
  function RedirectableRequest(options, responseCallback) {
    // Initialize the request
    Writable.call(this);
    options.headers = options.headers || {};
    this._options = options;
    this._redirectCount = 0;
    this._redirects = [];
    this._requestBodyLength = 0;
    this._requestBodyBuffers = [];

    // Since http.request treats host as an alias of hostname,
    // but the url module interprets host as hostname plus port,
    // eliminate the host property to avoid confusion.
    if (options.host) {
      // Use hostname if set, because it has precedence
      if (!options.hostname) {
        options.hostname = options.host;
      }
      delete options.host;
    }

    // Attach a callback if passed
    if (responseCallback) {
      this.on("response", responseCallback);
    }

    // React to responses of native requests
    var self = this;
    this._onNativeResponse = function (response) {
      self._processResponse(response);
    };

    // Complete the URL object when necessary
    if (!options.pathname && options.path) {
      var searchPos = options.path.indexOf("?");
      if (searchPos < 0) {
        options.pathname = options.path;
      }
      else {
        options.pathname = options.path.substring(0, searchPos);
        options.search = options.path.substring(searchPos);
      }
    }

    // Perform the first request
    this._performRequest();
  }
  RedirectableRequest.prototype = Object.create(Writable.prototype);

  // Writes buffered data to the current native request
  RedirectableRequest.prototype.write = function (data, encoding, callback) {
    // Validate input and shift parameters if necessary
    if (!(typeof data === "string" || typeof data === "object" && ("length" in data))) {
      throw new Error("data should be a string, Buffer or Uint8Array");
    }
    if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Ignore empty buffers, since writing them doesn't invoke the callback
    // https://github.com/nodejs/node/issues/22066
    if (data.length === 0) {
      if (callback) {
        callback();
      }
      return;
    }
    // Only write when we don't exceed the maximum body length
    if (this._requestBodyLength + data.length <= this._options.maxBodyLength) {
      this._requestBodyLength += data.length;
      this._requestBodyBuffers.push({ data: data, encoding: encoding });
      this._currentRequest.write(data, encoding, callback);
    }
    // Error when we exceed the maximum body length
    else {
      this.emit("error", new Error("Request body larger than maxBodyLength limit"));
      this.abort();
    }
  };

  // Ends the current native request
  RedirectableRequest.prototype.end = function (data, encoding, callback) {
    // Shift parameters if necessary
    if (typeof data === "function") {
      callback = data;
      data = encoding = null;
    }
    else if (typeof encoding === "function") {
      callback = encoding;
      encoding = null;
    }

    // Write data and end
    var currentRequest = this._currentRequest;
    this.write(data || "", encoding, function () {
      currentRequest.end(null, null, callback);
    });
  };

  // Sets a header value on the current native request
  RedirectableRequest.prototype.setHeader = function (name, value) {
    this._options.headers[name] = value;
    this._currentRequest.setHeader(name, value);
  };

  // Clears a header value on the current native request
  RedirectableRequest.prototype.removeHeader = function (name) {
    delete this._options.headers[name];
    this._currentRequest.removeHeader(name);
  };

  // Proxy all other public ClientRequest methods
  [
    "abort", "flushHeaders", "getHeader",
    "setNoDelay", "setSocketKeepAlive", "setTimeout",
  ].forEach(function (method) {
    RedirectableRequest.prototype[method] = function (a, b) {
      return this._currentRequest[method](a, b);
    };
  });

  // Proxy all public ClientRequest properties
  ["aborted", "connection", "socket"].forEach(function (property) {
    Object.defineProperty(RedirectableRequest.prototype, property, {
      get: function () { return this._currentRequest[property]; },
    });
  });

  // Executes the next native request (initial or redirect)
  RedirectableRequest.prototype._performRequest = function () {
    // Load the native protocol
    var protocol = this._options.protocol;
    var nativeProtocol = this._options.nativeProtocols[protocol];
    if (!nativeProtocol) {
      this.emit("error", new Error("Unsupported protocol " + protocol));
      return;
    }

    // If specified, use the agent corresponding to the protocol
    // (HTTP and HTTPS use different types of agents)
    if (this._options.agents) {
      var scheme = protocol.substr(0, protocol.length - 1);
      this._options.agent = this._options.agents[scheme];
    }

    // Create the native request
    var request = this._currentRequest =
          nativeProtocol.request(this._options, this._onNativeResponse);
    this._currentUrl = url.format(this._options);

    // Set up event handlers
    request._redirectable = this;
    for (var event in eventHandlers) {
      /* istanbul ignore else */
      if (event) {
        request.on(event, eventHandlers[event]);
      }
    }

    // End a redirected request
    // (The first request must be ended explicitly with RedirectableRequest#end)
    if (this._isRedirect) {
      // Write the request entity and end.
      var i = 0;
      var buffers = this._requestBodyBuffers;
      (function writeNext() {
        if (i < buffers.length) {
          var buffer = buffers[i++];
          request.write(buffer.data, buffer.encoding, writeNext);
        }
        else {
          request.end();
        }
      }());
    }
  };

  // Processes a response from the current native request
  RedirectableRequest.prototype._processResponse = function (response) {
    // Store the redirected response
    if (this._options.trackRedirects) {
      this._redirects.push({
        url: this._currentUrl,
        headers: response.headers,
        statusCode: response.statusCode,
      });
    }

    // RFC7231§6.4: The 3xx (Redirection) class of status code indicates
    // that further action needs to be taken by the user agent in order to
    // fulfill the request. If a Location header field is provided,
    // the user agent MAY automatically redirect its request to the URI
    // referenced by the Location field value,
    // even if the specific status code is not understood.
    var location = response.headers.location;
    if (location && this._options.followRedirects !== false &&
        response.statusCode >= 300 && response.statusCode < 400) {
      // RFC7231§6.4: A client SHOULD detect and intervene
      // in cyclical redirections (i.e., "infinite" redirection loops).
      if (++this._redirectCount > this._options.maxRedirects) {
        this.emit("error", new Error("Max redirects exceeded."));
        return;
      }

      // RFC7231§6.4: Automatic redirection needs to done with
      // care for methods not known to be safe […],
      // since the user might not wish to redirect an unsafe request.
      // RFC7231§6.4.7: The 307 (Temporary Redirect) status code indicates
      // that the target resource resides temporarily under a different URI
      // and the user agent MUST NOT change the request method
      // if it performs an automatic redirection to that URI.
      var header;
      var headers = this._options.headers;
      if (response.statusCode !== 307 && !(this._options.method in SAFE_METHODS)) {
        this._options.method = "GET";
        // Drop a possible entity and headers related to it
        this._requestBodyBuffers = [];
        for (header in headers) {
          if (/^content-/i.test(header)) {
            delete headers[header];
          }
        }
      }

      // Drop the Host header, as the redirect might lead to a different host
      if (!this._isRedirect) {
        for (header in headers) {
          if (/^host$/i.test(header)) {
            delete headers[header];
          }
        }
      }

      // Perform the redirected request
      var redirectUrl = url.resolve(this._currentUrl, location);
      debug$1("redirecting to", redirectUrl);
      Object.assign(this._options, url.parse(redirectUrl));
      this._isRedirect = true;
      this._performRequest();

      // Discard the remainder of the response to avoid waiting for data
      response.destroy();
    }
    else {
      // The response is not a redirect; return it as-is
      response.responseUrl = this._currentUrl;
      response.redirects = this._redirects;
      this.emit("response", response);

      // Clean up
      this._requestBodyBuffers = [];
    }
  };

  // Wraps the key/value object of protocols with redirect functionality
  function wrap(protocols) {
    // Default settings
    var exports = {
      maxRedirects: 21,
      maxBodyLength: 10 * 1024 * 1024,
    };

    // Wrap each protocol
    var nativeProtocols = {};
    Object.keys(protocols).forEach(function (scheme) {
      var protocol = scheme + ":";
      var nativeProtocol = nativeProtocols[protocol] = protocols[scheme];
      var wrappedProtocol = exports[scheme] = Object.create(nativeProtocol);

      // Executes a request, following redirects
      wrappedProtocol.request = function (options, callback) {
        if (typeof options === "string") {
          options = url.parse(options);
          options.maxRedirects = exports.maxRedirects;
        }
        else {
          options = Object.assign({
            protocol: protocol,
            maxRedirects: exports.maxRedirects,
            maxBodyLength: exports.maxBodyLength,
          }, options);
        }
        options.nativeProtocols = nativeProtocols;
        assert.equal(options.protocol, protocol, "protocol mismatch");
        debug$1("options", options);
        return new RedirectableRequest(options, callback);
      };

      // Executes a GET request, following redirects
      wrappedProtocol.get = function (options, callback) {
        var request = wrappedProtocol.request(options, callback);
        request.end();
        return request;
      };
    });
    return exports;
  }

  // Exports
  var followRedirects = wrap({ http: http, https: https });
  var wrap_1 = wrap;
  followRedirects.wrap = wrap_1;

  var _args = [
  	[
  		"axios@0.19.0",
  		"/Users/41chen/web/ricequant/rqcomponents"
  	]
  ];
  var _from = "axios@0.19.0";
  var _id = "axios@0.19.0";
  var _inBundle = false;
  var _integrity = "sha512-1uvKqKQta3KBxIz14F2v06AEHZ/dIoeKfbTRkK1E5oqjDnuEerLmYTgJB5AiQZHJcljpg1TuRzdjDR06qNk0DQ==";
  var _location = "/axios";
  var _phantomChildren = {
  };
  var _requested = {
  	type: "version",
  	registry: true,
  	raw: "axios@0.19.0",
  	name: "axios",
  	escapedName: "axios",
  	rawSpec: "0.19.0",
  	saveSpec: null,
  	fetchSpec: "0.19.0"
  };
  var _requiredBy = [
  	"/"
  ];
  var _resolved = "https://registry.npmjs.org/axios/-/axios-0.19.0.tgz";
  var _spec = "0.19.0";
  var _where = "/Users/41chen/web/ricequant/rqcomponents";
  var author = {
  	name: "Matt Zabriskie"
  };
  var browser$1 = {
  	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
  };
  var bugs = {
  	url: "https://github.com/axios/axios/issues"
  };
  var bundlesize = [
  	{
  		path: "./dist/axios.min.js",
  		threshold: "5kB"
  	}
  ];
  var dependencies = {
  	"follow-redirects": "1.5.10",
  	"is-buffer": "^2.0.2"
  };
  var description = "Promise based HTTP client for the browser and node.js";
  var devDependencies = {
  	bundlesize: "^0.17.0",
  	coveralls: "^3.0.0",
  	"es6-promise": "^4.2.4",
  	grunt: "^1.0.2",
  	"grunt-banner": "^0.6.0",
  	"grunt-cli": "^1.2.0",
  	"grunt-contrib-clean": "^1.1.0",
  	"grunt-contrib-watch": "^1.0.0",
  	"grunt-eslint": "^20.1.0",
  	"grunt-karma": "^2.0.0",
  	"grunt-mocha-test": "^0.13.3",
  	"grunt-ts": "^6.0.0-beta.19",
  	"grunt-webpack": "^1.0.18",
  	"istanbul-instrumenter-loader": "^1.0.0",
  	"jasmine-core": "^2.4.1",
  	karma: "^1.3.0",
  	"karma-chrome-launcher": "^2.2.0",
  	"karma-coverage": "^1.1.1",
  	"karma-firefox-launcher": "^1.1.0",
  	"karma-jasmine": "^1.1.1",
  	"karma-jasmine-ajax": "^0.1.13",
  	"karma-opera-launcher": "^1.0.0",
  	"karma-safari-launcher": "^1.0.0",
  	"karma-sauce-launcher": "^1.2.0",
  	"karma-sinon": "^1.0.5",
  	"karma-sourcemap-loader": "^0.3.7",
  	"karma-webpack": "^1.7.0",
  	"load-grunt-tasks": "^3.5.2",
  	minimist: "^1.2.0",
  	mocha: "^5.2.0",
  	sinon: "^4.5.0",
  	typescript: "^2.8.1",
  	"url-search-params": "^0.10.0",
  	webpack: "^1.13.1",
  	"webpack-dev-server": "^1.14.1"
  };
  var homepage = "https://github.com/axios/axios";
  var keywords = [
  	"xhr",
  	"http",
  	"ajax",
  	"promise",
  	"node"
  ];
  var license = "MIT";
  var main = "index.js";
  var name = "axios";
  var repository = {
  	type: "git",
  	url: "git+https://github.com/axios/axios.git"
  };
  var scripts = {
  	build: "NODE_ENV=production grunt build",
  	coveralls: "cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js",
  	examples: "node ./examples/server.js",
  	fix: "eslint --fix lib/**/*.js",
  	postversion: "git push && git push --tags",
  	preversion: "npm test",
  	start: "node ./sandbox/server.js",
  	test: "grunt test && bundlesize",
  	version: "npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json"
  };
  var typings = "./index.d.ts";
  var version = "0.19.0";
  var _package = {
  	_args: _args,
  	_from: _from,
  	_id: _id,
  	_inBundle: _inBundle,
  	_integrity: _integrity,
  	_location: _location,
  	_phantomChildren: _phantomChildren,
  	_requested: _requested,
  	_requiredBy: _requiredBy,
  	_resolved: _resolved,
  	_spec: _spec,
  	_where: _where,
  	author: author,
  	browser: browser$1,
  	bugs: bugs,
  	bundlesize: bundlesize,
  	dependencies: dependencies,
  	description: description,
  	devDependencies: devDependencies,
  	homepage: homepage,
  	keywords: keywords,
  	license: license,
  	main: main,
  	name: name,
  	repository: repository,
  	scripts: scripts,
  	typings: typings,
  	version: version
  };

  var _package$1 = /*#__PURE__*/Object.freeze({
    _args: _args,
    _from: _from,
    _id: _id,
    _inBundle: _inBundle,
    _integrity: _integrity,
    _location: _location,
    _phantomChildren: _phantomChildren,
    _requested: _requested,
    _requiredBy: _requiredBy,
    _resolved: _resolved,
    _spec: _spec,
    _where: _where,
    author: author,
    browser: browser$1,
    bugs: bugs,
    bundlesize: bundlesize,
    dependencies: dependencies,
    description: description,
    devDependencies: devDependencies,
    homepage: homepage,
    keywords: keywords,
    license: license,
    main: main,
    name: name,
    repository: repository,
    scripts: scripts,
    typings: typings,
    version: version,
    'default': _package
  });

  var pkg = getCjsExportFromNamespace(_package$1);

  var httpFollow = followRedirects.http;
  var httpsFollow = followRedirects.https;






  var isHttps = /https:?/;

  /*eslint consistent-return:0*/
  var http_1 = function httpAdapter(config) {
    return new Promise(function dispatchHttpRequest(resolvePromise, rejectPromise) {
      var timer;
      var resolve = function resolve(value) {
        clearTimeout(timer);
        resolvePromise(value);
      };
      var reject = function reject(value) {
        clearTimeout(timer);
        rejectPromise(value);
      };
      var data = config.data;
      var headers = config.headers;

      // Set User-Agent (required by some servers)
      // Only set header if it hasn't been set in config
      // See https://github.com/axios/axios/issues/69
      if (!headers['User-Agent'] && !headers['user-agent']) {
        headers['User-Agent'] = 'axios/' + pkg.version;
      }

      if (data && !utils.isStream(data)) {
        if (Buffer.isBuffer(data)) ; else if (utils.isArrayBuffer(data)) {
          data = Buffer.from(new Uint8Array(data));
        } else if (utils.isString(data)) {
          data = Buffer.from(data, 'utf-8');
        } else {
          return reject(createError(
            'Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream',
            config
          ));
        }

        // Add Content-Length header if data exists
        headers['Content-Length'] = data.length;
      }

      // HTTP basic authentication
      var auth = undefined;
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        auth = username + ':' + password;
      }

      // Parse url
      var parsed = url.parse(config.url);
      var protocol = parsed.protocol || 'http:';

      if (!auth && parsed.auth) {
        var urlAuth = parsed.auth.split(':');
        var urlUsername = urlAuth[0] || '';
        var urlPassword = urlAuth[1] || '';
        auth = urlUsername + ':' + urlPassword;
      }

      if (auth) {
        delete headers.Authorization;
      }

      var isHttpsRequest = isHttps.test(protocol);
      var agent = isHttpsRequest ? config.httpsAgent : config.httpAgent;

      var options = {
        path: buildURL(parsed.path, config.params, config.paramsSerializer).replace(/^\?/, ''),
        method: config.method.toUpperCase(),
        headers: headers,
        agent: agent,
        auth: auth
      };

      if (config.socketPath) {
        options.socketPath = config.socketPath;
      } else {
        options.hostname = parsed.hostname;
        options.port = parsed.port;
      }

      var proxy = config.proxy;
      if (!proxy && proxy !== false) {
        var proxyEnv = protocol.slice(0, -1) + '_proxy';
        var proxyUrl = process.env[proxyEnv] || process.env[proxyEnv.toUpperCase()];
        if (proxyUrl) {
          var parsedProxyUrl = url.parse(proxyUrl);
          var noProxyEnv = process.env.no_proxy || process.env.NO_PROXY;
          var shouldProxy = true;

          if (noProxyEnv) {
            var noProxy = noProxyEnv.split(',').map(function trim(s) {
              return s.trim();
            });

            shouldProxy = !noProxy.some(function proxyMatch(proxyElement) {
              if (!proxyElement) {
                return false;
              }
              if (proxyElement === '*') {
                return true;
              }
              if (proxyElement[0] === '.' &&
                  parsed.hostname.substr(parsed.hostname.length - proxyElement.length) === proxyElement &&
                  proxyElement.match(/\./g).length === parsed.hostname.match(/\./g).length) {
                return true;
              }

              return parsed.hostname === proxyElement;
            });
          }


          if (shouldProxy) {
            proxy = {
              host: parsedProxyUrl.hostname,
              port: parsedProxyUrl.port
            };

            if (parsedProxyUrl.auth) {
              var proxyUrlAuth = parsedProxyUrl.auth.split(':');
              proxy.auth = {
                username: proxyUrlAuth[0],
                password: proxyUrlAuth[1]
              };
            }
          }
        }
      }

      if (proxy) {
        options.hostname = proxy.host;
        options.host = proxy.host;
        options.headers.host = parsed.hostname + (parsed.port ? ':' + parsed.port : '');
        options.port = proxy.port;
        options.path = protocol + '//' + parsed.hostname + (parsed.port ? ':' + parsed.port : '') + options.path;

        // Basic proxy authorization
        if (proxy.auth) {
          var base64 = Buffer.from(proxy.auth.username + ':' + proxy.auth.password, 'utf8').toString('base64');
          options.headers['Proxy-Authorization'] = 'Basic ' + base64;
        }
      }

      var transport;
      var isHttpsProxy = isHttpsRequest && (proxy ? isHttps.test(proxy.protocol) : true);
      if (config.transport) {
        transport = config.transport;
      } else if (config.maxRedirects === 0) {
        transport = isHttpsProxy ? https : http;
      } else {
        if (config.maxRedirects) {
          options.maxRedirects = config.maxRedirects;
        }
        transport = isHttpsProxy ? httpsFollow : httpFollow;
      }

      if (config.maxContentLength && config.maxContentLength > -1) {
        options.maxBodyLength = config.maxContentLength;
      }

      // Create the request
      var req = transport.request(options, function handleResponse(res) {
        if (req.aborted) return;

        // uncompress the response body transparently if required
        var stream = res;
        switch (res.headers['content-encoding']) {
        /*eslint default-case:0*/
        case 'gzip':
        case 'compress':
        case 'deflate':
          // add the unzipper to the body stream processing pipeline
          stream = (res.statusCode === 204) ? stream : stream.pipe(zlib.createUnzip());

          // remove the content-encoding in order to not confuse downstream operations
          delete res.headers['content-encoding'];
          break;
        }

        // return the last request in case of redirects
        var lastRequest = res.req || req;

        var response = {
          status: res.statusCode,
          statusText: res.statusMessage,
          headers: res.headers,
          config: config,
          request: lastRequest
        };

        if (config.responseType === 'stream') {
          response.data = stream;
          settle(resolve, reject, response);
        } else {
          var responseBuffer = [];
          stream.on('data', function handleStreamData(chunk) {
            responseBuffer.push(chunk);

            // make sure the content length is not over the maxContentLength if specified
            if (config.maxContentLength > -1 && Buffer.concat(responseBuffer).length > config.maxContentLength) {
              stream.destroy();
              reject(createError('maxContentLength size of ' + config.maxContentLength + ' exceeded',
                config, null, lastRequest));
            }
          });

          stream.on('error', function handleStreamError(err) {
            if (req.aborted) return;
            reject(enhanceError(err, config, null, lastRequest));
          });

          stream.on('end', function handleStreamEnd() {
            var responseData = Buffer.concat(responseBuffer);
            if (config.responseType !== 'arraybuffer') {
              responseData = responseData.toString(config.responseEncoding);
            }

            response.data = responseData;
            settle(resolve, reject, response);
          });
        }
      });

      // Handle errors
      req.on('error', function handleRequestError(err) {
        if (req.aborted) return;
        reject(enhanceError(err, config, null, req));
      });

      // Handle request timeout
      if (config.timeout) {
        timer = setTimeout(function handleRequestTimeout() {
          req.abort();
          reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED', req));
        }, config.timeout);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (req.aborted) return;

          req.abort();
          reject(cancel);
        });
      }

      // Send the request
      if (utils.isStream(data)) {
        data.on('error', function handleStreamError(err) {
          reject(enhanceError(err, config, null, req));
        }).pipe(req);
      } else {
        req.end(data);
      }
    });
  };

  // Headers whose duplicates are ignored by node
  // c.f. https://nodejs.org/api/http.html#http_message_headers
  var ignoreDuplicateOf = [
    'age', 'authorization', 'content-length', 'content-type', 'etag',
    'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
    'last-modified', 'location', 'max-forwards', 'proxy-authorization',
    'referer', 'retry-after', 'user-agent'
  ];

  /**
   * Parse headers into an object
   *
   * ```
   * Date: Wed, 27 Aug 2014 08:58:49 GMT
   * Content-Type: application/json
   * Connection: keep-alive
   * Transfer-Encoding: chunked
   * ```
   *
   * @param {String} headers Headers needing to be parsed
   * @returns {Object} Headers parsed into an object
   */
  var parseHeaders = function parseHeaders(headers) {
    var parsed = {};
    var key;
    var val;
    var i;

    if (!headers) { return parsed; }

    utils.forEach(headers.split('\n'), function parser(line) {
      i = line.indexOf(':');
      key = utils.trim(line.substr(0, i)).toLowerCase();
      val = utils.trim(line.substr(i + 1));

      if (key) {
        if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
          return;
        }
        if (key === 'set-cookie') {
          parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
        } else {
          parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
        }
      }
    });

    return parsed;
  };

  var isURLSameOrigin = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs have full support of the APIs needed to test
    // whether the request URL is of the same origin as current location.
      (function standardBrowserEnv() {
        var msie = /(msie|trident)/i.test(navigator.userAgent);
        var urlParsingNode = document.createElement('a');
        var originURL;

        /**
      * Parse a URL to discover it's components
      *
      * @param {String} url The URL to be parsed
      * @returns {Object}
      */
        function resolveURL(url) {
          var href = url;

          if (msie) {
          // IE needs attribute set twice to normalize properties
            urlParsingNode.setAttribute('href', href);
            href = urlParsingNode.href;
          }

          urlParsingNode.setAttribute('href', href);

          // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
          return {
            href: urlParsingNode.href,
            protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
            host: urlParsingNode.host,
            search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
            hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
            hostname: urlParsingNode.hostname,
            port: urlParsingNode.port,
            pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
              urlParsingNode.pathname :
              '/' + urlParsingNode.pathname
          };
        }

        originURL = resolveURL(window.location.href);

        /**
      * Determine if a URL shares the same origin as the current location
      *
      * @param {String} requestURL The URL to test
      * @returns {boolean} True if URL shares the same origin, otherwise false
      */
        return function isURLSameOrigin(requestURL) {
          var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
          return (parsed.protocol === originURL.protocol &&
              parsed.host === originURL.host);
        };
      })() :

    // Non standard browser envs (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return function isURLSameOrigin() {
          return true;
        };
      })()
  );

  var cookies = (
    utils.isStandardBrowserEnv() ?

    // Standard browser envs support document.cookie
      (function standardBrowserEnv() {
        return {
          write: function write(name, value, expires, path, domain, secure) {
            var cookie = [];
            cookie.push(name + '=' + encodeURIComponent(value));

            if (utils.isNumber(expires)) {
              cookie.push('expires=' + new Date(expires).toGMTString());
            }

            if (utils.isString(path)) {
              cookie.push('path=' + path);
            }

            if (utils.isString(domain)) {
              cookie.push('domain=' + domain);
            }

            if (secure === true) {
              cookie.push('secure');
            }

            document.cookie = cookie.join('; ');
          },

          read: function read(name) {
            var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
            return (match ? decodeURIComponent(match[3]) : null);
          },

          remove: function remove(name) {
            this.write(name, '', Date.now() - 86400000);
          }
        };
      })() :

    // Non standard browser env (web workers, react-native) lack needed support.
      (function nonStandardBrowserEnv() {
        return {
          write: function write() {},
          read: function read() { return null; },
          remove: function remove() {}
        };
      })()
  );

  var xhr = function xhrAdapter(config) {
    return new Promise(function dispatchXhrRequest(resolve, reject) {
      var requestData = config.data;
      var requestHeaders = config.headers;

      if (utils.isFormData(requestData)) {
        delete requestHeaders['Content-Type']; // Let the browser set it
      }

      var request = new XMLHttpRequest();

      // HTTP basic authentication
      if (config.auth) {
        var username = config.auth.username || '';
        var password = config.auth.password || '';
        requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
      }

      request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

      // Set the request timeout in MS
      request.timeout = config.timeout;

      // Listen for ready state
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }

        // Prepare the response
        var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
        var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
        var response = {
          data: responseData,
          status: request.status,
          statusText: request.statusText,
          headers: responseHeaders,
          config: config,
          request: request
        };

        settle(resolve, reject, response);

        // Clean up request
        request = null;
      };

      // Handle browser request cancellation (as opposed to a manual cancellation)
      request.onabort = function handleAbort() {
        if (!request) {
          return;
        }

        reject(createError('Request aborted', config, 'ECONNABORTED', request));

        // Clean up request
        request = null;
      };

      // Handle low level network errors
      request.onerror = function handleError() {
        // Real errors are hidden from us by the browser
        // onerror should only fire if it's a network error
        reject(createError('Network Error', config, null, request));

        // Clean up request
        request = null;
      };

      // Handle timeout
      request.ontimeout = function handleTimeout() {
        reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
          request));

        // Clean up request
        request = null;
      };

      // Add xsrf header
      // This is only done if running in a standard browser environment.
      // Specifically not if we're in a web worker, or react-native.
      if (utils.isStandardBrowserEnv()) {
        var cookies$1 = cookies;

        // Add xsrf header
        var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies$1.read(config.xsrfCookieName) :
          undefined;

        if (xsrfValue) {
          requestHeaders[config.xsrfHeaderName] = xsrfValue;
        }
      }

      // Add headers to the request
      if ('setRequestHeader' in request) {
        utils.forEach(requestHeaders, function setRequestHeader(val, key) {
          if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
            // Remove Content-Type if data is undefined
            delete requestHeaders[key];
          } else {
            // Otherwise add header to the request
            request.setRequestHeader(key, val);
          }
        });
      }

      // Add withCredentials to request if needed
      if (config.withCredentials) {
        request.withCredentials = true;
      }

      // Add responseType to request if needed
      if (config.responseType) {
        try {
          request.responseType = config.responseType;
        } catch (e) {
          // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
          // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
          if (config.responseType !== 'json') {
            throw e;
          }
        }
      }

      // Handle progress if needed
      if (typeof config.onDownloadProgress === 'function') {
        request.addEventListener('progress', config.onDownloadProgress);
      }

      // Not all browsers support upload events
      if (typeof config.onUploadProgress === 'function' && request.upload) {
        request.upload.addEventListener('progress', config.onUploadProgress);
      }

      if (config.cancelToken) {
        // Handle cancellation
        config.cancelToken.promise.then(function onCanceled(cancel) {
          if (!request) {
            return;
          }

          request.abort();
          reject(cancel);
          // Clean up request
          request = null;
        });
      }

      if (requestData === undefined) {
        requestData = null;
      }

      // Send the request
      request.send(requestData);
    });
  };

  var DEFAULT_CONTENT_TYPE = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };

  function setContentTypeIfUnset(headers, value) {
    if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
      headers['Content-Type'] = value;
    }
  }

  function getDefaultAdapter() {
    var adapter;
    // Only Node.JS has a process variable that is of [[Class]] process
    if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
      // For node use HTTP adapter
      adapter = http_1;
    } else if (typeof XMLHttpRequest !== 'undefined') {
      // For browsers use XHR adapter
      adapter = xhr;
    }
    return adapter;
  }

  var defaults = {
    adapter: getDefaultAdapter(),

    transformRequest: [function transformRequest(data, headers) {
      normalizeHeaderName(headers, 'Accept');
      normalizeHeaderName(headers, 'Content-Type');
      if (utils.isFormData(data) ||
        utils.isArrayBuffer(data) ||
        utils.isBuffer(data) ||
        utils.isStream(data) ||
        utils.isFile(data) ||
        utils.isBlob(data)
      ) {
        return data;
      }
      if (utils.isArrayBufferView(data)) {
        return data.buffer;
      }
      if (utils.isURLSearchParams(data)) {
        setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
        return data.toString();
      }
      if (utils.isObject(data)) {
        setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
        return JSON.stringify(data);
      }
      return data;
    }],

    transformResponse: [function transformResponse(data) {
      /*eslint no-param-reassign:0*/
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch (e) { /* Ignore */ }
      }
      return data;
    }],

    /**
     * A timeout in milliseconds to abort a request. If set to 0 (default) a
     * timeout is not created.
     */
    timeout: 0,

    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',

    maxContentLength: -1,

    validateStatus: function validateStatus(status) {
      return status >= 200 && status < 300;
    }
  };

  defaults.headers = {
    common: {
      'Accept': 'application/json, text/plain, */*'
    }
  };

  utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
    defaults.headers[method] = {};
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
  });

  var defaults_1 = defaults;

  /**
   * Determines whether the specified URL is absolute
   *
   * @param {string} url The URL to test
   * @returns {boolean} True if the specified URL is absolute, otherwise false
   */
  var isAbsoluteURL = function isAbsoluteURL(url) {
    // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
    // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
    // by any combination of letters, digits, plus, period, or hyphen.
    return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
  };

  /**
   * Creates a new URL by combining the specified URLs
   *
   * @param {string} baseURL The base URL
   * @param {string} relativeURL The relative URL
   * @returns {string} The combined URL
   */
  var combineURLs = function combineURLs(baseURL, relativeURL) {
    return relativeURL
      ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
      : baseURL;
  };

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  function throwIfCancellationRequested(config) {
    if (config.cancelToken) {
      config.cancelToken.throwIfRequested();
    }
  }

  /**
   * Dispatch a request to the server using the configured adapter.
   *
   * @param {object} config The config that is to be used for the request
   * @returns {Promise} The Promise to be fulfilled
   */
  var dispatchRequest = function dispatchRequest(config) {
    throwIfCancellationRequested(config);

    // Support baseURL config
    if (config.baseURL && !isAbsoluteURL(config.url)) {
      config.url = combineURLs(config.baseURL, config.url);
    }

    // Ensure headers exist
    config.headers = config.headers || {};

    // Transform request data
    config.data = transformData(
      config.data,
      config.headers,
      config.transformRequest
    );

    // Flatten headers
    config.headers = utils.merge(
      config.headers.common || {},
      config.headers[config.method] || {},
      config.headers || {}
    );

    utils.forEach(
      ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
      function cleanHeaderConfig(method) {
        delete config.headers[method];
      }
    );

    var adapter = config.adapter || defaults_1.adapter;

    return adapter(config).then(function onAdapterResolution(response) {
      throwIfCancellationRequested(config);

      // Transform response data
      response.data = transformData(
        response.data,
        response.headers,
        config.transformResponse
      );

      return response;
    }, function onAdapterRejection(reason) {
      if (!isCancel(reason)) {
        throwIfCancellationRequested(config);

        // Transform response data
        if (reason && reason.response) {
          reason.response.data = transformData(
            reason.response.data,
            reason.response.headers,
            config.transformResponse
          );
        }
      }

      return Promise.reject(reason);
    });
  };

  /**
   * Config-specific merge-function which creates a new config-object
   * by merging two configuration objects together.
   *
   * @param {Object} config1
   * @param {Object} config2
   * @returns {Object} New object resulting from merging config2 to config1
   */
  var mergeConfig = function mergeConfig(config1, config2) {
    // eslint-disable-next-line no-param-reassign
    config2 = config2 || {};
    var config = {};

    utils.forEach(['url', 'method', 'params', 'data'], function valueFromConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      }
    });

    utils.forEach(['headers', 'auth', 'proxy'], function mergeDeepProperties(prop) {
      if (utils.isObject(config2[prop])) {
        config[prop] = utils.deepMerge(config1[prop], config2[prop]);
      } else if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (utils.isObject(config1[prop])) {
        config[prop] = utils.deepMerge(config1[prop]);
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });

    utils.forEach([
      'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
      'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
      'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength',
      'validateStatus', 'maxRedirects', 'httpAgent', 'httpsAgent', 'cancelToken',
      'socketPath'
    ], function defaultToConfig2(prop) {
      if (typeof config2[prop] !== 'undefined') {
        config[prop] = config2[prop];
      } else if (typeof config1[prop] !== 'undefined') {
        config[prop] = config1[prop];
      }
    });

    return config;
  };

  /**
   * Create a new instance of Axios
   *
   * @param {Object} instanceConfig The default config for the instance
   */
  function Axios(instanceConfig) {
    this.defaults = instanceConfig;
    this.interceptors = {
      request: new InterceptorManager_1(),
      response: new InterceptorManager_1()
    };
  }

  /**
   * Dispatch a request
   *
   * @param {Object} config The config specific for this request (merged with this.defaults)
   */
  Axios.prototype.request = function request(config) {
    /*eslint no-param-reassign:0*/
    // Allow for axios('example/url'[, config]) a la fetch API
    if (typeof config === 'string') {
      config = arguments[1] || {};
      config.url = arguments[0];
    } else {
      config = config || {};
    }

    config = mergeConfig(this.defaults, config);
    config.method = config.method ? config.method.toLowerCase() : 'get';

    // Hook up interceptors middleware
    var chain = [dispatchRequest, undefined];
    var promise = Promise.resolve(config);

    this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
      chain.unshift(interceptor.fulfilled, interceptor.rejected);
    });

    this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
      chain.push(interceptor.fulfilled, interceptor.rejected);
    });

    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  };

  Axios.prototype.getUri = function getUri(config) {
    config = mergeConfig(this.defaults, config);
    return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
  };

  // Provide aliases for supported request methods
  utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url
      }));
    };
  });

  utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, data, config) {
      return this.request(utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      }));
    };
  });

  var Axios_1 = Axios;

  /**
   * A `Cancel` is an object that is thrown when an operation is canceled.
   *
   * @class
   * @param {string=} message The message.
   */
  function Cancel(message) {
    this.message = message;
  }

  Cancel.prototype.toString = function toString() {
    return 'Cancel' + (this.message ? ': ' + this.message : '');
  };

  Cancel.prototype.__CANCEL__ = true;

  var Cancel_1 = Cancel;

  /**
   * A `CancelToken` is an object that can be used to request cancellation of an operation.
   *
   * @class
   * @param {Function} executor The executor function.
   */
  function CancelToken(executor) {
    if (typeof executor !== 'function') {
      throw new TypeError('executor must be a function.');
    }

    var resolvePromise;
    this.promise = new Promise(function promiseExecutor(resolve) {
      resolvePromise = resolve;
    });

    var token = this;
    executor(function cancel(message) {
      if (token.reason) {
        // Cancellation has already been requested
        return;
      }

      token.reason = new Cancel_1(message);
      resolvePromise(token.reason);
    });
  }

  /**
   * Throws a `Cancel` if cancellation has been requested.
   */
  CancelToken.prototype.throwIfRequested = function throwIfRequested() {
    if (this.reason) {
      throw this.reason;
    }
  };

  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  CancelToken.source = function source() {
    var cancel;
    var token = new CancelToken(function executor(c) {
      cancel = c;
    });
    return {
      token: token,
      cancel: cancel
    };
  };

  var CancelToken_1 = CancelToken;

  /**
   * Syntactic sugar for invoking a function and expanding an array for arguments.
   *
   * Common use case would be to use `Function.prototype.apply`.
   *
   *  ```js
   *  function f(x, y, z) {}
   *  var args = [1, 2, 3];
   *  f.apply(null, args);
   *  ```
   *
   * With `spread` this example can be re-written.
   *
   *  ```js
   *  spread(function(x, y, z) {})([1, 2, 3]);
   *  ```
   *
   * @param {Function} callback
   * @returns {Function}
   */
  var spread = function spread(callback) {
    return function wrap(arr) {
      return callback.apply(null, arr);
    };
  };

  /**
   * Create an instance of Axios
   *
   * @param {Object} defaultConfig The default config for the instance
   * @return {Axios} A new instance of Axios
   */
  function createInstance(defaultConfig) {
    var context = new Axios_1(defaultConfig);
    var instance = bind(Axios_1.prototype.request, context);

    // Copy axios.prototype to instance
    utils.extend(instance, Axios_1.prototype, context);

    // Copy context to instance
    utils.extend(instance, context);

    return instance;
  }

  // Create the default instance to be exported
  var axios = createInstance(defaults_1);

  // Expose Axios class to allow class inheritance
  axios.Axios = Axios_1;

  // Factory for creating new instances
  axios.create = function create(instanceConfig) {
    return createInstance(mergeConfig(axios.defaults, instanceConfig));
  };

  // Expose Cancel & CancelToken
  axios.Cancel = Cancel_1;
  axios.CancelToken = CancelToken_1;
  axios.isCancel = isCancel;

  // Expose all/spread
  axios.all = function all(promises) {
    return Promise.all(promises);
  };
  axios.spread = spread;

  var axios_1 = axios;

  // Allow use of default import syntax in TypeScript
  var default_1 = axios;
  axios_1.default = default_1;

  var axios$1 = axios_1;

  const instance = axios$1.create({
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

  var logo = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIgAAAAiCAYAAACEPZHaAAAAAXNSR0IArs4c6QAAC4BJREFUeAHtW31wVcUV3733fSbhAYEYUggYjA4pWsZBKx+ROtVxYAptpSJWaQH5qEgpjIOFKlA+HC0q0NF2KCAxlPoHpNBCC0iRYcaCloL41ShQhAARJIF8v5f3ce/d/vaSe7P3vpuXJyQx5WVnNnv2nLNnd8+ePXt27wshKZ4GP1Wa0W/ywd25Uw7dneKqcJw+dcSmCJIbR02o+i3CyEhKaRUh9L7y4hGfpMj0k5qmlBTXDcgkGgefHmMskxG2b+CMw7fdgNO95imlpAfRjSNYvQdaK4zTHCXnPTK998zGkWfjaCmISDkPktA4uAEwkhtTyNsDZh7NSUF7iJtyShlIq8bRpB4cNflqJLxv0OzDveI0lmKIlDlikjUOcf2hnPd9Add3T702rE7EpxKcMh6kNlizHgsbH3MQ0gBDKKWUfGlfeEbI0MZ6dZ0dn0r1lDEQQkm2bWGDRJKe9Aeye5dvKry9vLgwR5Zd98JYzoh8qN8k1lMNdrXFhNPc7qGqoj2HXRiDvKjs980PBoOX2kJ2+8igFR6ZjTpTNOKEKP9c0bCD/Wd9PFRrrDvIGPmmSEtVWPJSiSWRIz5JLvb7/X3tisrPz/fCOJb1ysmeFNbUicztWqo2hl+x83Wmukyk8WeKCi3GYYzv3NpvVbsIfdyop3qZ7BHjwUPSZC0cOZEmy+NEpZ0/fXoGpey9CxcuhLxU3hWJRD4H3SvydCaYEho9t2n4oURjKise+SHnS8Rzo9B8VD5qOAis7Rj7vJI1EKNduqqxEp/L9YCBgIA0xuidvB5h6veys7PT4Z7b5Ogy+ugq20cD3bp164Urvb52LfVgNRAqrfFkpPcWM+KJvhIl8yHA2FFeomqb+dHChTJKL1KJ7IT3KPFJ0pKaistbZJf0fEsdduE7jwaUUIhvdKsN2IZn2emI2EP19fVXbDy8usorSVG8Mr7KK7j+9TlfVnYfwL16XWOb9JKRhzk1FIuN5XWn5PP5BrKoMpcwbTToOcjolpzBx7KPEOT+zd+9+1tVVVVx7w6If3JZJDIVFjkaVs8DyHTeDs1PwEC3NCrKm5CBoXVM4m7Z6AkTuBhm2jeMOi8zMjKyYsFQhYiLMI3P1UyBQCAz0tAwEXPCsc0GgJCLzOV+IVH6tuyS1zZEo5+ZDWyAOAZO8rhdBVFFmwbdcv1zWSoydEtKumdl/fbSpUtB1IlPlmfykmnkEV4aCZ5/DGi8nZ4w2MsWAzEITiX1eHaxSFQ3EJ2uaXlOfIlw6PxxyHgdPD4b3x2IcZDJpGBN3SrQuMcyE4xzDuKfl4BAO3NdOP1W1G/FRMf6JdeszMzMMU7GZQrqRAB08USkvmENhhSwzYmPMqAxVqDFlJngmxVW1TeSGXospuwHn8VQUR8CvQ6pqaickJWVVVhZWdnANLbOSR76nCOqF5o+ltC9iEJkVcVEmhMs3MnTNDPYIL/LVYiB/RFou3FYOOEEPhURfkmah0FzwzTbwbIrEES+D1yjwQuvMiJYXfumUe/0JSP3Y4wWnTqM2QudbYDuRjjQ4lBYULtxiDxD6q5ULxYRycBJG4iqanMEgSr1ehPeBAResnTpUklTNb7IZn9Y5LNwfc9KEh1PJToNx0Mx6PVUkkqNthkeT4HGCPccRmoE/6MLf70kJ8zUuxAf3QI5pw0iduJYBNCjmuudF2IS5ZuFJwXH5B5CpZeQ18DwDwInukmZqSzZhVWhxzdwaM+mVFoJ3VzWe2j6Q5k2kYPg2apnrIGFTug7Jk3nkf5BjCvO1VIuwVXnh2L2y/JjCED/IvLhTWS9IRgu8CcijcMGzSgh40ciD65Wh3sgGXSj7NmzZ3cj+OU4n+RaJrbDUfOkwWuUcbIlucigiWW/KYf29518kPWbfCgi4luCOZ/Oj3ZOPOK4fFS6YOfhMYjIw2GRZ8KECTL0uJXHZCKew3xjQOZZoX3YzsPrAl1/y8JaTBf50tPTs8FTK/BpIh39/0mgMadrri0GYQ+rGg80W07ctffpn/uLsrIynQnn42Z0YuwGx4Y4A8WgVXG55SdqkOzM1dXVtcgmmjFtnFlBAJ1fUFBUWmo6GJ2UkZm5t+7yFa58bBhsPcb+L346WFJSomK4j5AwL6yJB6bYROcxm/5NlKTelVx+/w7S0GAK46/ZMLQglGMcZbqOTIYkAJuBJG4B4zggp/keg3E4WnSLrRkTPpLRfVCAdZVbaIjZ9DG2HeDLnx8//mPsEgt3fVUVr/NYJK2JcHNT2akL7kF2btv2M8roJBhCHgZrWTzEVJmdYQJ2A8F5SEJNA+NW22y5VHp54ZJFCxFPWNxUMpPAIvc2+CTK3rGcsAahlRIy+hONFbfCxsn+JHh0Fn6EiLxfbCq0LJJIa0uYx2QvLlvxV8gcC0NoS9FtLstmIHQvXkP14wAf4O5UFfUIetS3LGVs5HX0bhoaHtYsbwOtyLRrz3LDcWoLLxcU8XnTDg3QqJSGufB3k2tILH3A9PcKZCqppzfcc/IaBMQ1eXH58hlAisduFAHqq7jBmZ616SrqiWvcwQjzVmHvF49dH+Aqu9bA82vkyuXLf27Uv2J51uCHoWUZcOslPS3yyBJ9Fo9NgxNl3G6+LbaJKeyAElM/RRx0j4hPFubtePtITPls6MyjxjGWbHNHPhwrP7UQKJkX0ZRnEM8V8zxu/PjNoHeIN7OMw6HSooFwXm+g22KM0tzxuHK+gKj7Zgc5CVG4Opn/SoDvNj9IyCwSKbVcpTWNreYvqiJLIpj/ZBAuKC8RT9I0xqSKaGSwwG96NwC4MKRnCzSiNDYmmCcTfzlfP3zUqA1i213btz+IulvEfV1wQgPRbxoSfUYYXDqJxBxf4QSeOBDvHVsMJDzRcDx+PW3UxRIvoYG0tDTzscft1q+sZsyDhRjIwpEjaD+fH4HdPJ5BXpdrtFdyrcRVfLsoi8PBkHqXHYf+pcFLSxO6bk7nfPa22NR3GDhsnHMGjDKghhr/g2v5b3AVfwrXxyIcEX8Q6BYQ8zA9EeTUHDhwwLzKYAPmYSNstDRovwoP7s0EBzAeV+zbvV5vPr6rLeJjcVCCya8D+MaxuenxRq9DcQ/iJjFFryT5p29e3t+hiHKDHQNZhWvcHty7x+GVcDjeMiZAqeuC1TXn1XB0nsFXH4mcxNm82qjzEsrNRvuXEVMci8Lt48PhHnxU+CUoD6V7POYCXm3jeOV11ZTVbMJ1GEOKTxzP6aDY4jPOq5nyGZVMo+cUjKs3ruULAPweMqYCZb1ucabmVGaAaJfrk91r0t3uIdDH90kkuh84/o2q/VPzY53eF8Y9Hc/1n5Bo7L84WleQqDKtVQPB8cBktzwbEkwrx21iNVxqn2RncOrUqQheQLkMzP1qgqGNxk8HduKF9V3smK0Y3ExQAohRhhk8vPzVkkULeAAHsLl/kUGAFUWbLlSJppG7xboJM/Zo7tR3YVTxSceDHk+BeQgeJNCr5wrwfOTEx3Gwvgst0qj0ZwuNaXMVRf0Q+tgBBeVZaO1YCSvKP+Hdn2uxC7y8tmogvHEwGv0Yi/SaIQiT6KmEwr8z6smUIVXdiSd1vrOaX3IcG+pfNU0Kv1YjgJuLT5WDeNAMb3YUxFrkEBbhS9SPwIhfh+zJ7jTf82ZDAJh83BEj0G8RYBFsCc/N2/Qg/KNXj5uy8C+bZBEac0OpQw4iH4euXnG7XfcDdkxpPQKrQPjAkQgk5rMF8/p3S/S2xIc17QUqS99Br7uhz4uQzedwEmNYjzmMA65jE39abvrczwOxvsh8DGcxoGNQ9u5eOTk7ysvLLWdje43w63oH4fPhP6yqrax8Gq58Iqq3IcPg6b/w04WNCxYv3rZyxYqH8HXVPGoimvaVNiTvoyt1aaBLA10a6NJAh2sAX3Z38cw7bgnu8EF10g6TClI76divd1jmjQqCRPh65d5Q7f8HthM+mC4BkaoAAAAASUVORK5CYII=";

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

        this.$set(this.btnConfig[idx], "active", !this.btnConfig[idx].active);
      },

      closeDropdown(idx) {
        if (!this.btnConfig[idx].links) {
          return;
        }

        this.$set(this.btnConfig[idx], "active", false);
      },

      clickHandler(cfg) {
        if (cfg.href) {
          return this.redirect(cfg.href);
        } else if (cfg.event) {
          this.$emit(...cfg.event);
        }
      },

      redirect(href) {
        if (href) {
          window.location.href = href;
        }
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

  var browser$2 = createInjector;

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
                ? _c(
                    "span",
                    {
                      staticClass: "rqheader-btn__label",
                      on: {
                        click: function($event) {
                          return _vm.clickHandler(btn)
                        }
                      }
                    },
                    [_vm._v(_vm._s(btn.label))]
                  )
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
                          [
                            _c(
                              "span",
                              {
                                on: {
                                  click: function($event) {
                                    return _vm.clickHandler(link)
                                  }
                                }
                              },
                              [_vm._v(_vm._s(link.label))]
                            )
                          ]
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
      inject("data-v-facaaaf8_0", { source: "p[data-v-facaaaf8] {\n  margin: 0;\n}\n.rqheader[data-v-facaaaf8] {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: #ffffff;\n  z-index: 1;\n}\n.rqheader__logo[data-v-facaaaf8] {\n  display: block;\n  width: 136px;\n}\n.rqheader-btn[data-v-facaaaf8] {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  padding-right: 20px;\n  align-items: center;\n  transition: all 0.3s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  cursor: pointer;\n  transition: color 0.1s;\n}\n.rqheader-btn[data-v-facaaaf8]:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn[data-v-facaaaf8]::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  transition: background 0.3s;\n}\n.rqheader-btn__label[data-v-facaaaf8] {\n  padding-left: 20px;\n}\n.rqheader-btn__label + .arrow[data-v-facaaaf8] {\n  margin-left: 10px;\n}\n.rqheader-btn .arrow[data-v-facaaaf8] {\n  display: inline-block;\n  width: 16px;\n  transition: transform 0.3s;\n  transform-origin: center;\n}\n.rqheader-btn__dropdown[data-v-facaaaf8] {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 70px;\n  padding: 0 20px;\n  box-shadow: 0px 8px 12px 0px rgba(45, 54, 158, 0.08);\n  background: #ffffff;\n  z-index: -1;\n  border-radius: 0 0 12px 12px;\n}\n.rqheader-btn__dropdown--item[data-v-facaaaf8] {\n  padding-top: 18px;\n  cursor: pointer;\n  transition: color 0.1s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.rqheader-btn__dropdown--item[data-v-facaaaf8]:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn__dropdown--item[data-v-facaaaf8]:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btn.active[data-v-facaaaf8] {\n  background: #ffffff;\n  color: #1b5fc4;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.active .arrow[data-v-facaaaf8] {\n  transform: rotate(180deg);\n}\n.rqheader-btn.active[data-v-facaaaf8]::after {\n  background: #1b5fc4;\n}\n.rqheader-btn.header[data-v-facaaaf8] {\n  position: relative;\n  height: 100%;\n}\n.rqheader-btn.header img[data-v-facaaaf8] {\n  margin-left: 20px;\n  width: 34px;\n}\n.rqheader-btn.header.active[data-v-facaaaf8] {\n  background: #ffffff;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.header .rqheader-btn__dropdown[data-v-facaaaf8] {\n  padding: 0;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item[data-v-facaaaf8] {\n  text-align: center;\n  padding-top: 18px;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item[data-v-facaaaf8]:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btns[data-v-facaaaf8] {\n  margin-left: auto;\n  margin-right: 0;\n  display: flex;\n  height: 100%;\n  flex-direction: row;\n}\n\n/*# sourceMappingURL=Header.vue.map */", map: {"version":3,"sources":["Header.vue","/Users/41chen/web/ricequant/rqcomponents/packages/header/src/Header.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;ACqFA;EACA,kBAAA;EACA,aAAA;EACA,sBAAA;EACA,mBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,mBAAA;EACA,mBAAA;EACA,UAAA;ADlFA;ACmFA;EACA,cAAA;EACA,YAAA;ADjFA;ACmFA;EACA,kBAAA;EACA,sBAAA;EACA,aAAA;EACA,mBAAA;EACA,mBAAA;EACA,oBAAA;EDjFE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EC6DlB,eAAA;EACA,sBAAA;AD3DA;AC4DA;EACA,cAAA;AD1DA;AC2EA;EACA,WAAA;EACA,kBAAA;EACA,MAAA;EACA,WAAA;EACA,WAAA;EACA,uBAAA;EACA,2BAAA;ADzEA;AC2EA;EACA,kBAAA;ADzEA;AC2EA;EACA,iBAAA;ADzEA;AC2EA;EACA,qBAAA;EACA,WAAA;EACA,0BAAA;EACA,wBAAA;ADzEA;AC2EA;EACA,kBAAA;EACA,sBAAA;EACA,WAAA;EACA,SAAA;EACA,eAAA;EACA,oDAAA;EACA,mBAAA;EACA,WAAA;EACA,4BAAA;ADzEA;AC0EA;EACA,iBAAA;EApDA,eAAA;EACA,sBAAA;EDnBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACgBA;EACA,cAAA;ADdA;ACkEA;EACA,oBAAA;ADhEA;ACoEA;EACA,mBAAA;EACA,cAAA;EACA,qDAAA;ADlEA;ACmEA;EACA,yBAAA;ADjEA;ACmEA;EACA,mBAAA;ADjEA;ACoEA;EACA,kBAAA;EACA,YAAA;ADlEA;ACmEA;EACA,iBAAA;EACA,WAAA;ADjEA;ACmEA;EACA,mBAAA;EACA,qDAAA;ADjEA;ACmEA;EACA,UAAA;ADjEA;ACkEA;EACA,kBAAA;EACA,iBAAA;ADhEA;ACiEA;EACA,oBAAA;AD/DA;ACqEA;EACA,iBAAA;EACA,eAAA;EACA,aAAA;EACA,YAAA;EACA,mBAAA;ADnEA;;AAEA,qCAAqC","file":"Header.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.rqheader {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: #ffffff;\n  z-index: 1;\n}\n.rqheader__logo {\n  display: block;\n  width: 136px;\n}\n.rqheader-btn {\n  position: relative;\n  box-sizing: border-box;\n  display: flex;\n  padding-right: 20px;\n  align-items: center;\n  transition: all 0.3s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  cursor: pointer;\n  transition: color 0.1s;\n}\n.rqheader-btn:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn::after {\n  content: \"\";\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 4px;\n  background: transparent;\n  transition: background 0.3s;\n}\n.rqheader-btn__label {\n  padding-left: 20px;\n}\n.rqheader-btn__label + .arrow {\n  margin-left: 10px;\n}\n.rqheader-btn .arrow {\n  display: inline-block;\n  width: 16px;\n  transition: transform 0.3s;\n  transform-origin: center;\n}\n.rqheader-btn__dropdown {\n  position: absolute;\n  box-sizing: border-box;\n  width: 100%;\n  top: 70px;\n  padding: 0 20px;\n  box-shadow: 0px 8px 12px 0px rgba(45, 54, 158, 0.08);\n  background: #ffffff;\n  z-index: -1;\n  border-radius: 0 0 12px 12px;\n}\n.rqheader-btn__dropdown--item {\n  padding-top: 18px;\n  cursor: pointer;\n  transition: color 0.1s;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.rqheader-btn__dropdown--item:hover {\n  color: #1b5fc4;\n}\n.rqheader-btn__dropdown--item:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btn.active {\n  background: #ffffff;\n  color: #1b5fc4;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.active .arrow {\n  transform: rotate(180deg);\n}\n.rqheader-btn.active::after {\n  background: #1b5fc4;\n}\n.rqheader-btn.header {\n  position: relative;\n  height: 100%;\n}\n.rqheader-btn.header img {\n  margin-left: 20px;\n  width: 34px;\n}\n.rqheader-btn.header.active {\n  background: #ffffff;\n  box-shadow: 0px -8px 12px 0px rgba(45, 54, 158, 0.08);\n}\n.rqheader-btn.header .rqheader-btn__dropdown {\n  padding: 0;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item {\n  text-align: center;\n  padding-top: 18px;\n}\n.rqheader-btn.header .rqheader-btn__dropdown--item:last-child {\n  padding-bottom: 20px;\n}\n.rqheader-btns {\n  margin-left: auto;\n  margin-right: 0;\n  display: flex;\n  height: 100%;\n  flex-direction: row;\n}\n\n/*# sourceMappingURL=Header.vue.map */","<template>\n  <header class=\"rqheader\">\n    <img :src=\"images.logo\" alt=\"logo\" class=\"rqheader__logo\">\n    <div class=\"rqheader-btns\">\n      <div\n        v-for=\"(btn, idx) in btnConfig\"\n        :key=\"idx\"\n        :class=\"['rqheader-btn', {header: btn.type === 'header', active: btn.active, active: btn.active}]\"\n        @click= \"openDropdown(idx)\"\n        @mouseleave= \"closeDropdown(idx)\"\n      >\n        <span v-if=\"btn.label\" class=\"rqheader-btn__label\" @click=\"clickHandler(btn)\">{{btn.label}}</span>\n        <img v-if=\"btn.type === 'header'\" :src=\"avatar\" alt=\"\">\n        <span v-if=\"btn.links && !btn.type\" class=\"arrow\">\n          <i class=\"rq-icons icon-arrow-down\"></i>\n        </span>\n        <transition name=\"rq-zoom-in-top\">\n          <div class=\"rqheader-btn__dropdown\" v-if=\"btn.links && btn.active\">\n            <div class=\"rqheader-btn__dropdown--item\"\n              v-for=\"(link, linkIdx) in btn.links\"\n              :key=\"linkIdx\"\n            >\n              <span @click=\"clickHandler(link)\">{{link.label}}</span>\n            </div>\n          </div>\n        </transition>\n      </div>\n    </div>\n  </header>\n</template>\n\n<script>\nimport headerBtns from \"../assets/dict/header.json\";\nimport { getAccount } from \"../api\";\nimport logo from \"../assets/img/logo.png\";\nimport header from \"../assets/img/header.png\";\n\nexport default {\n  name: \"RqHeader\",\n  data() {\n    return {\n      images: {\n        logo,\n        header\n      },\n      avatar: header,\n      btnConfig: headerBtns\n    }\n  },\n  async mounted() {\n    const {avatar} = await getAccount();\n    if (avatar) {\n      this.avatar = avatar;\n    }\n  },\n  methods: {\n    openDropdown(idx) {\n      if (!this.btnConfig[idx].links) {\n        return;\n      }\n      this.$set(this.btnConfig[idx], \"active\", !this.btnConfig[idx].active);\n    },\n    closeDropdown(idx) {\n      if (!this.btnConfig[idx].links) {\n        return;\n      }\n      this.$set(this.btnConfig[idx], \"active\", false);\n    },\n    clickHandler(cfg) {\n      if (cfg.href) {\n        return this.redirect(cfg.href)\n      } else if (cfg.event) {\n        this.$emit(...cfg.event)\n      }\n    },\n    redirect(href) {\n      if (href) {\n        window.location.href = href;\n      }\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import \"../../common/style/common\";\n\n.rqheader {\n  position: relative;\n  display: flex;\n  box-sizing: border-box;\n  align-items: center;\n  width: 100%;\n  height: 70px;\n  padding-left: 40px;\n  padding-right: 20px;\n  background: $bg-white;\n  z-index: 1;\n  &__logo {\n    display: block;\n    width: 136px;\n  }\n  &-btn {\n    position: relative;\n    box-sizing: border-box;\n    display: flex;\n    padding-right: 20px;\n    align-items: center;\n    transition: all .3s;\n    @include text;\n    @include hover;\n    &::after {\n      content: \"\";\n      position: absolute;\n      top: 0;\n      width: 100%;\n      height: 4px;\n      background: transparent;\n      transition: background .3s;\n    }\n    &__label {\n      padding-left:20px;\n    }\n    &__label + .arrow {\n      margin-left: 10px;\n    }\n    .arrow {\n      display: inline-block;\n      width: 16px;\n      transition: transform .3s;\n      transform-origin: center;\n    }\n    &__dropdown {\n      position: absolute;\n      box-sizing: border-box;\n      width: 100%;\n      top: 70px;\n      padding: 0 20px;\n      box-shadow: 0px 8px 12px 0px rgba(45,54,158,0.08);\n      background: $bg-white;\n      z-index: -1;\n      border-radius: 0 0 12px 12px;\n      &--item {\n        padding-top: 18px;\n        @include hover;\n        @include text;\n        &:last-child {\n          padding-bottom: 20px;\n        }\n      }\n    }\n    &.active {\n      background: $bg-white;\n      color: $highlight;\n      box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);\n      .arrow {\n        transform: rotate(180deg);\n      }\n      &::after {\n        background: $highlight;\n      }\n    }\n    &.header {\n      position: relative;\n      height: 100%;\n      img {\n        margin-left:20px;\n        width: 34px\n      }\n      &.active {\n        background: $bg-white;\n        box-shadow: 0px -8px 12px 0px rgba(45,54,158,0.08);\n      }\n      .rqheader-btn__dropdown {\n        padding: 0;\n        &--item {\n          text-align: center;\n          padding-top: 18px;\n          &:last-child {\n            padding-bottom: 20px;\n          }\n        }\n      }\n    }\n  }\n  &-btns {\n    margin-left: auto;\n    margin-right: 0;\n    display: flex;\n    height: 100%;\n    flex-direction: row;\n  }\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__ = "data-v-facaaaf8";
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
      browser$2,
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
      inject("data-v-3942837d_0", { source: "p[data-v-3942837d] {\n  margin: 0;\n}\n.card[data-v-3942837d] {\n  padding: 26px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card[data-v-3942837d]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.card .label[data-v-3942837d] {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.card .value[data-v-3942837d] {\n  font-size: 18px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 700;\n}\n.card .value.red[data-v-3942837d] {\n  color: #d74848;\n}\n.card .value.green[data-v-3942837d] {\n  color: #50bf80;\n}\n.card__wrapper[data-v-3942837d] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.card__wrapper.col-1[data-v-3942837d] {\n  width: 100%;\n}\n.card__wrapper.col-1[data-v-3942837d]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-2[data-v-3942837d] {\n  width: 50%;\n}\n.card__wrapper.col-2[data-v-3942837d]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-3[data-v-3942837d] {\n  width: 33.3333333333%;\n}\n.card__wrapper.col-3[data-v-3942837d]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-4[data-v-3942837d] {\n  width: 25%;\n}\n.card__wrapper.col-4[data-v-3942837d]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-5[data-v-3942837d] {\n  width: 20%;\n}\n.card__wrapper.col-5[data-v-3942837d]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-6[data-v-3942837d] {\n  width: 16.6666666667%;\n}\n.card__wrapper.col-6[data-v-3942837d]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.card__wrapper + .card__wrapper[data-v-3942837d] {\n  padding-left: 20px;\n}\n.card__title[data-v-3942837d] {\n  font-size: 20px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n}\n.card__content[data-v-3942837d] {\n  display: flex;\n  margin-top: 30px;\n  margin-bottom: 40px;\n}\n.card__content--item[data-v-3942837d] {\n  display: inline-block;\n}\n.card__content--item + .card__content--item[data-v-3942837d] {\n  margin-left: 24px;\n}\n.card__footer[data-v-3942837d] {\n  text-align: right;\n}\n.card__footer .value[data-v-3942837d] {\n  font-size: 16px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 400;\n}\n\n/*# sourceMappingURL=Card.vue.map */", map: {"version":3,"sources":["Card.vue","/Users/41chen/web/ricequant/rqcomponents/packages/personal-center/src/components/Card.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;ACsDA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EDnDE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;AC+CA;ED7CE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;AC2CA;EDzCE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACsCA;EACA,cAAA;ADpCA;ACsCA;EACA,cAAA;ADpCA;ACuCA;EDrCE,kBAAkB;EAClB,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;AACpB;ACFA;EDIE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACNA;EACA,aAAA;EACA,gBAAA;EACA,mBAAA;ADQA;ACPA;EACA,qBAAA;ADSA;ACRA;EACA,iBAAA;ADUA;ACNA;EACA,iBAAA;ADQA;ACPA;EDSE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,mCAAmC","file":"Card.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.card {\n  padding: 26px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.card:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.card .label {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.card .value {\n  font-size: 18px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 700;\n}\n.card .value.red {\n  color: #d74848;\n}\n.card .value.green {\n  color: #50bf80;\n}\n.card__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.card__wrapper.col-1 {\n  width: 100%;\n}\n.card__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-2 {\n  width: 50%;\n}\n.card__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.card__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-4 {\n  width: 25%;\n}\n.card__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-5 {\n  width: 20%;\n}\n.card__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.card__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.card__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.card__wrapper + .card__wrapper {\n  padding-left: 20px;\n}\n.card__title {\n  font-size: 20px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n}\n.card__content {\n  display: flex;\n  margin-top: 30px;\n  margin-bottom: 40px;\n}\n.card__content--item {\n  display: inline-block;\n}\n.card__content--item + .card__content--item {\n  margin-left: 24px;\n}\n.card__footer {\n  text-align: right;\n}\n.card__footer .value {\n  font-size: 16px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 400;\n}\n\n/*# sourceMappingURL=Card.vue.map */","<template>\n  <div class=\"card__wrapper\">\n    <div class=\"card\" @click=\"redirect\">\n      <p class=\"card__title\">\n        {{info.name}}\n      </p>\n      <div class=\"card__content\">\n        <div\n          v-for=\"(key, idx) in contentKeys\"\n          :key=\"idx\"\n          class=\"card__content--item\">\n            <p class=\"label\">{{labels[key]}}</p>\n            <p class=\"value\">{{info[key]}}%</p>\n          </div>\n      </div>\n       <div class=\"card__footer\">\n        <span class=\"label\">{{labels.startAt}}</span>\n        <span class=\"value\">{{info.startAt}}</span>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Card\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  data() {\n    return {\n      contentKeys: [\n        \"total\",\n        \"year\",\n        \"retracement\",\n      ],\n      labels: {\n        total: \"累计收益\",\n        year: \"年化收益\",\n        retracement: \"最大回馈\",\n        startAt: \"开始时间\"\n      }\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"scrafts\", this.info.algoId);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.card {\n  padding: 26px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  .label {\n    @include mini-text;\n  }\n  .value {\n    @include h5;\n    &.red {\n      color: $rq-red; \n    }\n    &.green {\n      color: $rq-green; \n    }\n  }\n  &__wrapper {\n    @include flex-item;\n  }\n  &__title {\n    @include h4;\n  }\n  &__content {\n    display: flex;\n    margin-top: 30px;\n    margin-bottom: 40px;\n    &--item {\n      display: inline-block;\n      & + & {\n        margin-left: 24px;\n      }\n    }\n  }\n  &__footer {\n    text-align: right;\n    .value {\n      @include rg-text;\n    }\n  }\n\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$1 = "data-v-3942837d";
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
      browser$2,
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
      inject("data-v-3a5c0cfc_0", { source: "p[data-v-3a5c0cfc] {\n  margin: 0;\n}\n.topic[data-v-3a5c0cfc] {\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.topic[data-v-3a5c0cfc]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.topic__wrapper[data-v-3a5c0cfc] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.topic__wrapper.col-1[data-v-3a5c0cfc] {\n  width: 100%;\n}\n.topic__wrapper.col-1[data-v-3a5c0cfc]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-2[data-v-3a5c0cfc] {\n  width: 50%;\n}\n.topic__wrapper.col-2[data-v-3a5c0cfc]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-3[data-v-3a5c0cfc] {\n  width: 33.3333333333%;\n}\n.topic__wrapper.col-3[data-v-3a5c0cfc]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-4[data-v-3a5c0cfc] {\n  width: 25%;\n}\n.topic__wrapper.col-4[data-v-3a5c0cfc]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-5[data-v-3a5c0cfc] {\n  width: 20%;\n}\n.topic__wrapper.col-5[data-v-3a5c0cfc]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-6[data-v-3a5c0cfc] {\n  width: 16.6666666667%;\n}\n.topic__wrapper.col-6[data-v-3a5c0cfc]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.topic__wrapper + .topic__wrapper[data-v-3a5c0cfc] {\n  padding-left: 20px;\n}\n.topic .highlight[data-v-3a5c0cfc] {\n  color: #1b5fc4;\n}\n.topic .avatar[data-v-3a5c0cfc] {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  overflow: hidden;\n}\n.topic .avatar img[data-v-3a5c0cfc] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.topic .left + .right[data-v-3a5c0cfc] {\n  margin-left: 24px;\n}\n.topic__content[data-v-3a5c0cfc] {\n  display: flex;\n  margin-bottom: 20px;\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__content .topic__title[data-v-3a5c0cfc] {\n  font-size: 14px;\n  color: #333;\n  line-height: 1.5;\n  font-weight: 500;\n  margin-bottom: 12px;\n}\n.topic__content p + p[data-v-3a5c0cfc] {\n  margin-top: 6px;\n}\n.topic__footer[data-v-3a5c0cfc] {\n  text-align: right;\n}\n.topic__footer span[data-v-3a5c0cfc], .topic__footer i[data-v-3a5c0cfc] {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__footer i[data-v-3a5c0cfc] {\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.topic__footer span[data-v-3a5c0cfc]:last-child {\n  position: relative;\n  padding: 2px 6px;\n  background: #1b5fc4;\n  color: #ffffff;\n  border-radius: 2px;\n}\n.topic__footer span[data-v-3a5c0cfc]:last-child::before {\n  content: \"\";\n  position: absolute;\n  height: 0;\n  width: 0;\n  top: 1px;\n  left: -8px;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid #1b5fc4;\n}\n\n/*# sourceMappingURL=Topic.vue.map */", map: {"version":3,"sources":["Topic.vue","/Users/41chen/web/ricequant/rqcomponents/packages/personal-center/src/components/Topic.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;ACwDA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;EAsCA,eAAA;EACA,oBAAA;AD1FA;AC2FA;EACA,sBAAA;EACA,iDAAA;ADzFA;ACiDA;EAmDA,kBAAA;EACA,sBAAA;EACA,iBAAA;ADjGA;ACmGA;EACA,WAAA;ADjGA;ACkGA;EACA,eAAA;ADhGA;AC6FA;EACA,UAAA;AD3FA;AC4FA;EACA,eAAA;AD1FA;ACuFA;EACA,qBAAA;ADrFA;ACsFA;EACA,eAAA;ADpFA;ACiFA;EACA,UAAA;AD/EA;ACgFA;EACA,eAAA;AD9EA;AC2EA;EACA,UAAA;ADzEA;AC0EA;EACA,eAAA;ADxEA;ACqEA;EACA,qBAAA;ADnEA;ACoEA;EACA,eAAA;ADlEA;AACA;ECsEA,kBAAA;ADpEA;ACQA;EACA,cAAA;ADNA;ACQA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;ADNA;ACOA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADLA;ACQA;EACA,iBAAA;ADNA;ACQA;EACA,aAAA;EACA,mBAAA;EDNE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACGA;EDDE,eAAe;EACf,WAAW;EACX,gBAAgB;EAChB,gBAAgB;ECAlB,mBAAA;ADEA;ACAA;EACA,eAAA;ADEA;ACCA;EACA,iBAAA;ADCA;ACAA;EDEE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;AAClB;ACJA;EACA,iBAAA;EACA,kBAAA;ADMA;ACHA;EACA,kBAAA;EACA,gBAAA;EACA,mBAAA;EACA,cAAA;EACA,kBAAA;ADKA;ACJA;EACA,WAAA;EACA,kBAAA;EACA,SAAA;EACA,QAAA;EACA,QAAA;EACA,UAAA;EACA,iCAAA;EACA,oCAAA;EACA,+BAAA;ADMA;;AAEA,oCAAoC","file":"Topic.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.topic {\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.topic:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.topic__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.topic__wrapper.col-1 {\n  width: 100%;\n}\n.topic__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-2 {\n  width: 50%;\n}\n.topic__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.topic__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-4 {\n  width: 25%;\n}\n.topic__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-5 {\n  width: 20%;\n}\n.topic__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.topic__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.topic__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.topic__wrapper + .topic__wrapper {\n  padding-left: 20px;\n}\n.topic .highlight {\n  color: #1b5fc4;\n}\n.topic .avatar {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  overflow: hidden;\n}\n.topic .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.topic .left + .right {\n  margin-left: 24px;\n}\n.topic__content {\n  display: flex;\n  margin-bottom: 20px;\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__content .topic__title {\n  font-size: 14px;\n  color: #333;\n  line-height: 1.5;\n  font-weight: 500;\n  margin-bottom: 12px;\n}\n.topic__content p + p {\n  margin-top: 6px;\n}\n.topic__footer {\n  text-align: right;\n}\n.topic__footer span, .topic__footer i {\n  font-size: 12px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 300;\n}\n.topic__footer i {\n  margin-left: 20px;\n  margin-right: 10px;\n}\n.topic__footer span:last-child {\n  position: relative;\n  padding: 2px 6px;\n  background: #1b5fc4;\n  color: #ffffff;\n  border-radius: 2px;\n}\n.topic__footer span:last-child::before {\n  content: \"\";\n  position: absolute;\n  height: 0;\n  width: 0;\n  top: 1px;\n  left: -8px;\n  border-top: 8px solid transparent;\n  border-bottom: 8px solid transparent;\n  border-right: 8px solid #1b5fc4;\n}\n\n/*# sourceMappingURL=Topic.vue.map */","<template>\n  <div class=\"topic__wrapper\">\n    <div class=\"topic\" @click=\"redirect\">\n      <div class=\"topic__content\">\n        <div class=\"left avatar\">\n          <img :src=\"info.author.avatar\" alt=\"\">\n        </div>\n        <div class=\"right\">\n          <p class=\"topic__title\">\n            {{info.name}}\n          </p>\n          <p><a class=\"highlight\" @click.stop=\"redirectAuthor\">{{info.author.name}}</a>{{labels.createAt}}{{info.createAt}}</p>\n          <p>{{labels.lastRepeat}}{{info.lastRepeat}}</p>\n        </div>\n      </div>\n       <div class=\"topic__footer\">\n        <i class=\"rq-icons icon-chat\"> </i>\n        <span>{{info.chat}}</span>\n        <i class=\"rq-icons icon-view\"> </i>\n        <span>{{info.view}}</span>\n        <i class=\"rq-icons icon-heart\"> </i>\n        <span>{{info.like}}</span>\n        <i class=\"rq-icons icon-chart highlight\"> </i>\n        <span>{{info.chart}}</span>\n      </div>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Topic\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  data() {\n    return {\n      labels: {\n        createAt: \"发表于\",\n        lastRepeat: \"最后回复于\"\n      }\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"community\", \"topic\", this.info.tid);\n    },\n    redirectAuthor() {\n      this.$emit(\"redirect\", \"profile\", this.info.author.uid);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.topic {\n  padding: 24px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  &__wrapper {\n    @include flex-item;\n  }\n  .highlight {\n    color: $highlight;\n  }\n  .avatar {\n    position: relative;\n    width: 76px;\n    height: 76px;\n    overflow: hidden;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n  .left + .right {\n    margin-left: 24px;\n  }\n  &__content {\n    display: flex;\n    margin-bottom: 20px;\n    @include mini-text;\n    .topic__title {\n      @include text($text-dark);\n      margin-bottom: 12px;\n    }\n    p + p {\n      margin-top: 6px;\n    }\n  }\n  &__footer {\n    text-align: right;\n    span, i {\n      @include mini-text;\n    }\n    i {\n      margin-left: 20px;\n      margin-right: 10px;\n    }\n    span {\n      &:last-child {\n        position: relative;\n        padding: 2px 6px;\n        background: $highlight;\n        color: $text-white;\n        border-radius: 2px;\n        &::before {\n          content: \"\";\n          position: absolute;\n          height: 0;\n          width: 0;\n          top: 1px;\n          left: -8px;\n          border-top: 8px solid transparent;\n          border-bottom: 8px solid transparent;\n          border-right: 8px solid $highlight;\n        }\n      }\n    }\n  }\n\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$2 = "data-v-3a5c0cfc";
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
      browser$2,
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
      inject("data-v-33032202_0", { source: "p[data-v-33032202] {\n  margin: 0;\n}\n.follow[data-v-33032202] {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.follow[data-v-33032202]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.follow__wrapper[data-v-33032202] {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.follow__wrapper.col-1[data-v-33032202] {\n  width: 100%;\n}\n.follow__wrapper.col-1[data-v-33032202]:nth-child(1n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-2[data-v-33032202] {\n  width: 50%;\n}\n.follow__wrapper.col-2[data-v-33032202]:nth-child(2n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-3[data-v-33032202] {\n  width: 33.3333333333%;\n}\n.follow__wrapper.col-3[data-v-33032202]:nth-child(3n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-4[data-v-33032202] {\n  width: 25%;\n}\n.follow__wrapper.col-4[data-v-33032202]:nth-child(4n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-5[data-v-33032202] {\n  width: 20%;\n}\n.follow__wrapper.col-5[data-v-33032202]:nth-child(5n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-6[data-v-33032202] {\n  width: 16.6666666667%;\n}\n.follow__wrapper.col-6[data-v-33032202]:nth-child(6n+1) {\n  padding-left: 0;\n}\n.follow__wrapper + .follow__wrapper[data-v-33032202] {\n  padding-left: 20px;\n}\n.follow .avatar[data-v-33032202] {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.follow .avatar img[data-v-33032202] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.follow .follow__title[data-v-33032202] {\n  margin-left: 24px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Follow.vue.map */", map: {"version":3,"sources":["Follow.vue","/Users/41chen/web/ricequant/rqcomponents/packages/personal-center/src/components/Follow.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC6BA;EACA,aAAA;EACA,mBAAA;EACA,aAAA;EACA,mBAAA;EACA,kBAAA;ED1BE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;ACsBA;EDpBE,kBAAkB;EAClB,sBAAsB;EACtB,iBAAiB;AACnB;AACA;EACE,WAAW;AACb;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,UAAU;AACZ;AACA;EACE,eAAe;AACjB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,eAAe;AACjB;AACA;EACE,kBAAkB;AACpB;ACnBA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,kBAAA;EACA,gBAAA;ADqBA;ACpBA;EACA,WAAA;EACA,YAAA;EACA,iBAAA;ADsBA;ACnBA;EACA,iBAAA;EDqBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,qCAAqC","file":"Follow.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.follow {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: #ffffff;\n  border-radius: 8px;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.follow:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.follow__wrapper {\n  position: relative;\n  box-sizing: border-box;\n  padding-top: 20px;\n}\n.follow__wrapper.col-1 {\n  width: 100%;\n}\n.follow__wrapper.col-1:nth-child(1n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-2 {\n  width: 50%;\n}\n.follow__wrapper.col-2:nth-child(2n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-3 {\n  width: 33.3333333333%;\n}\n.follow__wrapper.col-3:nth-child(3n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-4 {\n  width: 25%;\n}\n.follow__wrapper.col-4:nth-child(4n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-5 {\n  width: 20%;\n}\n.follow__wrapper.col-5:nth-child(5n+1) {\n  padding-left: 0;\n}\n.follow__wrapper.col-6 {\n  width: 16.6666666667%;\n}\n.follow__wrapper.col-6:nth-child(6n+1) {\n  padding-left: 0;\n}\n.follow__wrapper + .follow__wrapper {\n  padding-left: 20px;\n}\n.follow .avatar {\n  position: relative;\n  width: 76px;\n  height: 76px;\n  border-radius: 50%;\n  overflow: hidden;\n}\n.follow .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.follow .follow__title {\n  margin-left: 24px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Follow.vue.map */","<template>\n  <div class=\"follow__wrapper\">\n    <div class=\"follow\" @click=\"redirect\">\n      <div class=\"avatar\">\n        <img :src=\"info.avatar\" alt=\"\">\n      </div>\n      <p class=\"follow__title\">\n        {{info.name}}\n      </p>\n    </div>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Follow\",\n  props: {\n    info: {\n      required: true,\n      type: Object\n    }\n  },\n  methods: {\n    redirect() {\n      this.$emit(\"redirect\", \"profile\", this.info.uid);\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.follow {\n  display: flex;\n  align-items: center;\n  padding: 24px;\n  background: $bg-white;\n  border-radius: 8px;\n  @include hover-scale;\n  &__wrapper {\n    @include flex-item;\n  }\n  .avatar {\n    position: relative;\n    width: 76px;\n    height: 76px;\n    border-radius: 50%;\n    overflow: hidden;\n    img {\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n    }\n  }\n  .follow__title {\n    margin-left: 24px;\n    @include text($text-gray-light);\n  }\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$3 = "data-v-33032202";
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
      browser$2,
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
      inject("data-v-50fe4546_0", { source: "p[data-v-50fe4546] {\n  margin: 0;\n}\n.empty[data-v-50fe4546] {\n  padding: 40px 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #ffffff;\n}\n.empty .empty__logo i[data-v-50fe4546] {\n  font-size: 40px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.empty .empty__title[data-v-50fe4546] {\n  margin-top: 16px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Empty.vue.map */", map: {"version":3,"sources":["Empty.vue","/Users/41chen/web/ricequant/rqcomponents/packages/personal-center/src/components/Empty.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC2BA;EACA,eAAA;EACA,WAAA;EDxBE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;ECuBrB,mBAAA;ADrBA;ACsBA;EDpBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACmBA;EACA,gBAAA;EDjBE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA,oCAAoC","file":"Empty.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.empty {\n  padding: 40px 0;\n  width: 100%;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #ffffff;\n}\n.empty .empty__logo i {\n  font-size: 40px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.empty .empty__title {\n  margin-top: 16px;\n  font-size: 14px;\n  color: #6D6D6D;\n  line-height: 1.5;\n  font-weight: 500;\n}\n\n/*# sourceMappingURL=Empty.vue.map */","<template>\n  <div class=\"empty\">\n    <p class=\"empty__logo\">\n      <i class=\"rq-icons icon-empty\"></i>\n    </p>\n    <p class=\"empty__title\">\n      {{emptyText}}\n      {{emptyLabel}}\n    </p>\n  </div>\n</template>\n<script>\nexport default {\n  name: \"Empty\",\n  props: {\n    emptyText: {\n      default: \"暂时没有\",\n      type: String\n    },\n    emptyLabel: {\n      default: \"粉丝\",\n      type: String\n    }\n  }\n};\n</script>\n<style lang=\"scss\" scoped>\n@import \"../../../common/style/common\";\n\n.empty {\n  padding: 40px 0;\n  width: 100%;\n  @include f-column;\n  background: $bg-white;\n  .empty__logo i{\n    @include text($text-gray-light, 40);\n  }\n  .empty__title {\n    margin-top: 16px;\n    @include text($text-gray-light);\n  }\n}\n</style>"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$4 = "data-v-50fe4546";
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
      browser$2,
      undefined
    );

  var bannerImage = "data:image/png;base64,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";

  var bronzeImage = "data:image/png;base64,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";

  var goldImage = "data:image/png;base64,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";

  var diamondImage = "data:image/png;base64,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";

  var kingImage = "data:image/png;base64,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";

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
      inject("data-v-3fddf0cc_0", { source: "p[data-v-3fddf0cc] {\n  margin: 0;\n}\n.personal-center[data-v-3fddf0cc] {\n  width: 100%;\n  min-width: 1280px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #f7f8fa;\n  padding-bottom: 40px;\n}\n.personal-center__block[data-v-3fddf0cc] {\n  position: relative;\n  padding-top: 40px;\n  width: 1170px;\n}\n.personal-center .banner[data-v-3fddf0cc] {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n.personal-center .banner .personal-center__block[data-v-3fddf0cc] {\n  position: relative;\n  padding: 0;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  height: 100%;\n  align-items: center;\n  background: transparent;\n}\n.personal-center .banner .bg[data-v-3fddf0cc] {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.personal-center .banner .bg img[data-v-3fddf0cc] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .avatar[data-v-3fddf0cc] {\n  width: 146px;\n  height: 146px;\n  background: #4768d35e;\n  overflow: hidden;\n  border-radius: 50%;\n}\n.personal-center .banner .avatar img[data-v-3fddf0cc] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .content[data-v-3fddf0cc] {\n  flex: 1;\n  padding: 0 30px;\n}\n.personal-center .banner .content p[data-v-3fddf0cc] {\n  font-size: 14px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .banner .content p.title[data-v-3fddf0cc] {\n  font-size: 24px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 0;\n  vertical-align: center;\n}\n.personal-center .banner .content p.title + p[data-v-3fddf0cc] {\n  margin-top: 24px;\n}\n.personal-center .banner .content p.title i[data-v-3fddf0cc] {\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .content p.title i[data-v-3fddf0cc]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .content span[data-v-3fddf0cc]:nth-child(2n) {\n  margin-right: 14px;\n}\n.personal-center .banner .content p + p[data-v-3fddf0cc] {\n  margin-top: 12px;\n}\n.personal-center .banner .content .rq-icons[data-v-3fddf0cc] {\n  margin-left: 14px;\n}\n.personal-center .banner .content .rq-icons.icon-heart[data-v-3fddf0cc] {\n  color: #1b5fc4;\n}\n.personal-center .banner .level[data-v-3fddf0cc] {\n  width: 170px;\n  height: 170px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .level[data-v-3fddf0cc]:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .level .level-img[data-v-3fddf0cc] {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .title[data-v-3fddf0cc] {\n  font-size: 24px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 6px;\n}\n.personal-center .title a[data-v-3fddf0cc] {\n  margin-left: 14px;\n  text-decoration: none;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .card-list[data-v-3fddf0cc] {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=PersonalCenter.vue.map */", map: {"version":3,"sources":["PersonalCenter.vue","/Users/41chen/web/ricequant/rqcomponents/packages/personal-center/src/PersonalCenter.vue"],"names":[],"mappings":"AAAA;EACE,SAAS;AACX;AC6RA;EACA,WAAA;EACA,iBAAA;ED1RE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,mBAAmB;ECyRrB,mBAAA;EACA,oBAAA;ADvRA;ACwRA;EACA,kBAAA;EACA,iBAAA;EACA,aAAA;ADtRA;ACwRA;EACA,kBAAA;EACA,WAAA;EACA,aAAA;ADtRA;ACuRA;EACA,kBAAA;EACA,UAAA;EACA,aAAA;EDrRE,MAAM;EACN,QAAQ;EACR,SAAS;EACT,OAAO;EACP,YAAY;ECmRd,YAAA;EACA,mBAAA;EACA,uBAAA;ADjRA;ACmRA;EACA,kBAAA;EACA,WAAA;EACA,YAAA;EACA,gBAAA;ADjRA;ACkRA;EDhRE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;ACiRA;EACA,YAAA;EACA,aAAA;EACA,qBAAA;EACA,gBAAA;EACA,kBAAA;AD/QA;ACgRA;ED9QE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AC+QA;EACA,OAAA;EACA,eAAA;AD7QA;AC8QA;ED5QE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;AC0QA;EDxQE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;ECsQlB,cAAA;EACA,sBAAA;ADpQA;ACqQA;EACA,gBAAA;ADnQA;ACqQA;EDnQE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;ACkQA;EACA,kBAAA;ADhQA;ACkQA;EACA,gBAAA;ADhQA;ACkQA;EACA,iBAAA;ADhQA;ACiQA;EACA,cAAA;AD/PA;ACmQA;EACA,YAAA;EACA,aAAA;EACA,gBAAA;EDjQE,eAAe;EACf,oBAAoB;AACtB;AACA;EACE,sBAAsB;EACtB,iDAAiD;AACnD;AC6PA;ED3PE,WAAW;EACX,YAAY;EACZ,iBAAiB;AACnB;AC6PA;ED3PE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;EAChB,gBAAgB;ECyPlB,gBAAA;ADvPA;ACwPA;EACA,iBAAA;EACA,qBAAA;EDtPE,eAAe;EACf,cAAc;EACd,gBAAgB;EAChB,gBAAgB;AAClB;ACsPA;EACA,aAAA;EACA,eAAA;ADpPA;;AAEA,6CAA6C","file":"PersonalCenter.vue","sourcesContent":["p {\n  margin: 0;\n}\n\n.personal-center {\n  width: 100%;\n  min-width: 1280px;\n  display: flex;\n  justify-content: center;\n  flex-direction: column;\n  align-items: center;\n  background: #f7f8fa;\n  padding-bottom: 40px;\n}\n.personal-center__block {\n  position: relative;\n  padding-top: 40px;\n  width: 1170px;\n}\n.personal-center .banner {\n  position: relative;\n  width: 100%;\n  height: 280px;\n}\n.personal-center .banner .personal-center__block {\n  position: relative;\n  padding: 0;\n  display: flex;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  margin: auto;\n  height: 100%;\n  align-items: center;\n  background: transparent;\n}\n.personal-center .banner .bg {\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n}\n.personal-center .banner .bg img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .avatar {\n  width: 146px;\n  height: 146px;\n  background: #4768d35e;\n  overflow: hidden;\n  border-radius: 50%;\n}\n.personal-center .banner .avatar img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .banner .content {\n  flex: 1;\n  padding: 0 30px;\n}\n.personal-center .banner .content p {\n  font-size: 14px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .banner .content p.title {\n  font-size: 24px;\n  color: #ffffff;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 0;\n  vertical-align: center;\n}\n.personal-center .banner .content p.title + p {\n  margin-top: 24px;\n}\n.personal-center .banner .content p.title i {\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .content p.title i:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .content span:nth-child(2n) {\n  margin-right: 14px;\n}\n.personal-center .banner .content p + p {\n  margin-top: 12px;\n}\n.personal-center .banner .content .rq-icons {\n  margin-left: 14px;\n}\n.personal-center .banner .content .rq-icons.icon-heart {\n  color: #1b5fc4;\n}\n.personal-center .banner .level {\n  width: 170px;\n  height: 170px;\n  overflow: hidden;\n  cursor: pointer;\n  transition: all 0.2s;\n}\n.personal-center .banner .level:hover {\n  transform: scale(1.02);\n  box-shadow: 0px 0 12px 0px rgba(45, 54, 158, 0.1);\n}\n.personal-center .banner .level .level-img {\n  width: 100%;\n  height: 100%;\n  object-fit: cover;\n}\n.personal-center .title {\n  font-size: 24px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n  font-weight: 500;\n  margin-left: 6px;\n}\n.personal-center .title a {\n  margin-left: 14px;\n  text-decoration: none;\n  font-size: 14px;\n  color: #666666;\n  line-height: 1.5;\n  font-weight: 500;\n}\n.personal-center .card-list {\n  display: flex;\n  flex-wrap: wrap;\n}\n\n/*# sourceMappingURL=PersonalCenter.vue.map */","<template>\n  <div class=\"personal-center\">\n    <div class=\"banner\">\n      <div class=\"bg\">\n        <img :src=\"banner\" alt=\"\">\n      </div>\n      <div class=\"personal-center__block\">\n        <div class=\"avatar\">\n          <transition name=\"rq-fade-in-linear\">\n            <img v-if=\"account.avatar\" :src=\"account.avatar\" alt=\"\">\n          </transition>\n        </div>\n        <div class=\"content\">\n          <p class=\"title\">\n            {{account.name}}\n            <i v-if=\"account.isFollow\" class=\"rq-icons icon-heart\" @click=\"follow(false)\"></i>\n            <i v-else class=\"rq-icons icon-follow\" @click=\"follow(true)\"></i>\n          </p>\n          <p>\n            <span>{{labels.follow}}: </span>\n            <span>{{account.follow}}</span>\n            <span>{{labels.fans}}: </span>\n            <span>{{account.fans}}</span>\n          </p>\n          <p>\n            {{account.descrition}}\n          </p>\n        </div>\n        <div class=\"level\">\n          <transition-group name=\"rq-fade-in-linear\">\n            <img\n              class=\"level-img\"\n              v-for=\"(level, idx) in labels.level\"\n              v-show=\"idx === account.level - 1\"\n              :key=\"level.label\"\n              :src=\"level.image\" alt=\"\">\n          </transition-group>\n        </div>\n      </div>\n    </div>\n    <div\n      v-for=\"(val, key) in contentKeys\"\n      :key=\"key\"\n      class=\"personal-center__block\">\n      <div class=\"title\">\n        {{labels[key]}}\n        <a href=\"\">{{labels.more}}</a>\n      </div>\n        <div\n          v-if=\"info[key].length !== 0\"\n          class=\"card-list\">\n            <Component\n              v-for=\"(item, idx) in info[key]\"\n              :class=\"'col-' + val.col\"\n              :key=\"idx\"\n              :is=\"val.component\"\n              :info=\"item\"\n              @redirect=\"redirect\"\n            ></Component>\n        </div>\n        <Empty\n          v-else\n          :emptyLabel=\"labels[key]\"\n        ></Empty>\n    </div>\n  </div>\n</template>\n\n<script>\nimport Card from \"./components/Card.vue\";\nimport Topic from \"./components/Topic.vue\";\nimport Follow from \"./components/Follow.vue\";\nimport Empty from \"./components/Empty.vue\";\nimport bannerImage from \"../assets/img/banner.png\";\nimport bronzeImage from \"../assets/img/bronze.png\";\nimport goldImage from \"../assets/img/gold.png\";\nimport diamondImage from \"../assets/img/diamond.png\";\nimport kingImage from \"../assets/img/king.png\";\nimport {\n  getAccount,\n  getSubscribe,\n  getShare,\n  getTopic,\n  getFollow,\n  getFans\n} from \"../api\";\nimport { fmtDate, fmtDatetime } from \"../../common/util\";\n\nexport default {\n  name: \"RqPersonalCenter\",\n  components: {\n    Card,\n    Topic,\n    Follow,\n    Empty\n  },\n  props: {\n    uid: {\n      required: true,\n      type: Number\n    }\n  },\n  data() {\n    return {\n      banner: bannerImage,\n      contentKeys: {\n        subscribe: {\n          col: 3,\n          component: \"Card\"\n        },\n        share: {\n          col: 3,\n          component: \"Card\"\n        },\n        topic: {\n          col: 2,\n          component: \"Topic\"\n        },\n        follow: {\n          col: 4,\n          component: \"Follow\"\n        },\n        fans: {\n          col: 4,\n          component: \"Follow\"\n        }\n      },\n      labels: {\n        follow: \"关注\",\n        fans: \"粉丝\",\n        more: \"更多 >\",\n        subscribe: \"我的订阅\",\n        share: \"分享的订阅\",\n        topic: \"发表的主题\",\n        level: [{\n          label: \"青铜韭菜\",\n          image: bronzeImage\n        }, {\n          label: \"黄金矿工\",\n          image: goldImage\n        }, {\n          label: \"钻石强者\",\n          image: diamondImage\n        }, {\n          label: \"量化王者\",\n          image: kingImage\n        }]\n      },\n      account: {\n        name: \"金尾巴\",\n        avatar: \"\",\n        follow: 2,\n        fans: 300,\n        isFollow: false,\n        descrition: \"这家伙很懒，什么也没有留下\",\n        level: 1\n      },\n      info: {\n        subscribe: [],\n        share: [],\n        topic: [],\n        follow: [],\n        fans: []\n      }\n    }\n  },\n  async mounted() {\n    this.loadData(this.uid);\n  },\n  watch: {\n    uid: {\n      handler(val) {\n        this.loadData(val);\n      }\n    }\n  },\n  methods: {\n    loadData(uid) {\n      this.loadAccountData(uid);\n      this.loadSubscribeData();\n      this.loadShareData(uid);\n      this.loadTopicData(uid);\n      this.loadFansAndFollowData(uid);\n    },\n    initAlgoData(key, data) {\n      const fmtPercent = num => (num * 100).toFixed(2);\n      this.info[key] = data.map(e => ({\n          algoId: e[\"algo-id\"],\n          name: e.title,\n          year: fmtPercent(e.annualizedReturn),\n          total: fmtPercent(e.totalReturn),\n          retracement: fmtPercent(e.maximumDrawdown),\n          startAt: fmtDate(e.runStartTimestamp)\n      }));\n    },\n    async loadAccountData(uid) {\n      const paramsList = {\n        name: [\"userInfo\", \"username\"],\n        avatar: [\"userInfo\", \"picture\"],\n        descrition: [\"userInfo\", \"signature\"],\n        follow: [\"userInfo\", \"followingCount\"],\n        fans: [\"userInfo\", \"followerCount\"],\n        isFollow: [\"userInfo\", \"isFollowing\"],\n        level: [\"level\"],\n      }\n      const { data: {code, userData} } = await getAccount(132782);\n      if (code === 0) {\n        Object.entries(paramsList).map(([key, path]) => {\n          const val = path.length === 1 ?\n            userData[path[0]]\n            : path.reduce((a, b) => {\n              if (typeof a === \"string\") {\n                return userData[a][b];\n              } else {\n                return a[b];\n              }\n            });\n          this.account[key] = val !== \"\"  ? val : this.account[key];\n        })\n      }\n    },\n    async loadTopicData(uid) {\n      const {topics} = await getTopic(uid);\n      this.info.topic = topics.map(e => {\n        return {\n          tid: e.tid,\n          createAt: fmtDatetime(e.timestamp),\n          lastRepeat: fmtDatetime(e.relativeTime),\n          name: e.title,\n          author: {\n            name: e.user.username,\n            avatar: e.user.picture,\n            uid: e.user.uid\n          },\n          chat: e.postcount,\n          view: e.viewcount,\n          like: e.votes,\n          chart: e.clone\n        }\n      });\n    },\n    async loadFansAndFollowData(uid) {\n      getFans(uid).then(({users}) => {\n        this.info.fans = users.map(e => {\n          return {\n            name: e.username,\n            avatar: e.picture,\n            uid: e.uid\n          }\n        });\n      });\n\n      getFollow(uid).then(({users}) => {\n        this.info.follow = users.map(e => {\n          return {\n            name: e.username,\n            avatar: e.picture,\n            uid: e.uid\n          }\n        });\n      });\n    },\n    async loadShareData(uid) {\n      const {data} = await getShare(uid);\n      this.initAlgoData(\"share\", data);\n    },\n    async loadSubscribeData() {\n      const {data} = await getSubscribe();\n      this.initAlgoData(\"subscribe\", data);\n    },\n    follow(follow=true) {\n      this.$emit(\"follow\", this.uid, follow);\n      this.account.isFollow = follow;\n    },\n    redirect(...path) {\n      this.$emit(\"redirect\", ...path);\n    }\n  }\n};\n</script>\n\n<style lang=\"scss\" scoped>\n@import \"../../common/style/common/index.scss\";\n\n::v-deep {\n  // @include debug;\n}\n.personal-center {\n  width: 100%;\n  min-width: $min-vw;\n  @include f-column;\n  background: $container-bg;\n  padding-bottom: 40px;\n  &__block {\n    position: relative;\n    padding-top: 40px;\n    width: $article-width;\n  }\n  .banner {\n    position: relative;\n    width: 100%;\n    height: 280px;\n    .personal-center__block {\n      position: relative;\n      padding: 0;\n      display: flex;\n      @include m-center;\n      height: 100%;\n      align-items: center;\n      background: transparent;\n    }\n    .bg {\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      overflow: hidden;\n      img {\n        @include img-center;\n      }\n    }\n    .avatar {\n      width: 146px;\n      height: 146px;\n      background: $avatar-bg;\n      overflow: hidden;\n      border-radius: 50%;\n      img {\n        @include img-center;\n      }\n    }\n    .content {\n      flex: 1;\n      padding: 0 30px;\n      p {\n        @include text($text-white);\n        &.title {\n          @include h3($text-white);\n          margin-left: 0;\n          vertical-align: center;\n          & + p {\n            margin-top: 24px;\n          }\n          i {\n            @include hover-scale;\n          }\n        }\n      }\n      span:nth-child(2n) {\n        margin-right: 14px;\n      }\n      p + p {\n        margin-top: 12px;\n      }\n      .rq-icons {\n        margin-left: 14px;\n        &.icon-heart {\n          color: $highlight;\n        }\n      }\n    }\n    .level {\n      width: 170px;\n      height: 170px;\n      overflow: hidden;\n      @include hover-scale;\n      .level-img {\n        @include img-center;\n      }\n    }\n  }\n  .title {\n    @include h3;\n    margin-left: 6px;\n    a {\n      margin-left: 14px;\n      text-decoration: none;\n      @include text;\n    }\n  }\n  .card-list {\n    display: flex;\n    flex-wrap: wrap;\n  }\n}\n</style>\n"]}, media: undefined });

    };
    /* scoped */
    const __vue_scope_id__$5 = "data-v-3fddf0cc";
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
      browser$2,
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

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=rqcomponents.js.map
