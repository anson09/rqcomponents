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

  var _from = "axios@^0.19.0";
  var _id = "axios@0.19.0";
  var _inBundle = false;
  var _integrity = "sha512-1uvKqKQta3KBxIz14F2v06AEHZ/dIoeKfbTRkK1E5oqjDnuEerLmYTgJB5AiQZHJcljpg1TuRzdjDR06qNk0DQ==";
  var _location = "/axios";
  var _phantomChildren = {
  };
  var _requested = {
  	type: "range",
  	registry: true,
  	raw: "axios@^0.19.0",
  	name: "axios",
  	escapedName: "axios",
  	rawSpec: "^0.19.0",
  	saveSpec: null,
  	fetchSpec: "^0.19.0"
  };
  var _requiredBy = [
  	"/"
  ];
  var _resolved = "https://registry.npmjs.org/axios/-/axios-0.19.0.tgz";
  var _shasum = "8e09bff3d9122e133f7b8101c8fbdd00ed3d2ab8";
  var _spec = "axios@^0.19.0";
  var _where = "/Users/arius/Code/rq-ui";
  var author = {
  	name: "Matt Zabriskie"
  };
  var browser$1 = {
  	"./lib/adapters/http.js": "./lib/adapters/xhr.js"
  };
  var bugs = {
  	url: "https://github.com/axios/axios/issues"
  };
  var bundleDependencies = false;
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
  var deprecated = false;
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
  	_from: _from,
  	_id: _id,
  	_inBundle: _inBundle,
  	_integrity: _integrity,
  	_location: _location,
  	_phantomChildren: _phantomChildren,
  	_requested: _requested,
  	_requiredBy: _requiredBy,
  	_resolved: _resolved,
  	_shasum: _shasum,
  	_spec: _spec,
  	_where: _where,
  	author: author,
  	browser: browser$1,
  	bugs: bugs,
  	bundleDependencies: bundleDependencies,
  	bundlesize: bundlesize,
  	dependencies: dependencies,
  	deprecated: deprecated,
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
    _from: _from,
    _id: _id,
    _inBundle: _inBundle,
    _integrity: _integrity,
    _location: _location,
    _phantomChildren: _phantomChildren,
    _requested: _requested,
    _requiredBy: _requiredBy,
    _resolved: _resolved,
    _shasum: _shasum,
    _spec: _spec,
    _where: _where,
    author: author,
    browser: browser$1,
    bugs: bugs,
    bundleDependencies: bundleDependencies,
    bundlesize: bundlesize,
    dependencies: dependencies,
    deprecated: deprecated,
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
      browser$2,
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
