globalThis.global = globalThis;
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index.js
function noop() {
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function compute_slots(slots) {
  const result = {};
  for (const key2 in slots) {
    result[key2] = true;
  }
  return result;
}
function set_current_component(component4) {
  current_component = component4;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function setContext(key2, context) {
  get_current_component().$$.context.set(key2, context);
  return context;
}
function getContext(key2) {
  return get_current_component().$$.context.get(key2);
}
function is_void(name) {
  return void_element_names.test(name) || name.toLowerCase() === "!doctype";
}
function escape(value, is_attr = false) {
  const str = String(value);
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last = 0;
  while (pattern2.test(str)) {
    const i = pattern2.lastIndex - 1;
    const ch = str[i];
    escaped2 += str.substring(last, i) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last = i + 1;
  }
  return escaped2 + str.substring(last);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
function validate_component(component4, name) {
  if (!component4 || !component4.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules. Otherwise you may need to fix a <${name}>.`);
  }
  return component4;
}
function create_ssr_component(fn) {
  function $$render(result, props2, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(context || (parent_component ? parent_component.$$.context : [])),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props2, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props2 = {}, { $$slots = {}, context = /* @__PURE__ */ new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: /* @__PURE__ */ new Set() };
      const html = $$render(result, props2, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css) => css.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  const assignment = boolean && value === true ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
var current_component, void_element_names, ATTR_REGEX, CONTENT_REGEX, missing_component, on_destroy;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    Promise.resolve();
    void_element_names = /^(?:area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/;
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    missing_component = {
      $$render: () => ""
    };
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe: subscribe2 };
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_chunks();
    subscriber_queue = [];
  }
});

// .svelte-kit/output/server/chunks/hooks.js
var hooks_exports = {};
var init_hooks = __esm({
  ".svelte-kit/output/server/chunks/hooks.js"() {
  }
});

// .svelte-kit/output/server/entries/pages/_layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
var Layout;
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_layout.svelte.js"() {
    init_chunks();
    Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      return `${slots.default ? slots.default({}) : ``}`;
    });
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  file: () => file,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component, file, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default;
    file = "_app/immutable/components/pages/_layout.svelte-7469703b.js";
    imports = ["_app/immutable/components/pages/_layout.svelte-7469703b.js", "_app/immutable/chunks/index-d1a17515.js"];
    stylesheets = ["_app/immutable/assets/_layout-a6e8dd72.css"];
    fonts = [];
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error$1
});
var getStores, page, Error$1;
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_chunks();
    getStores = () => {
      const stores2 = getContext("__svelte__");
      return {
        page: {
          subscribe: stores2.page.subscribe
        },
        navigating: {
          subscribe: stores2.navigating.subscribe
        },
        updated: stores2.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
    Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let $page, $$unsubscribe_page;
      $$unsubscribe_page = subscribe(page, (value) => $page = value);
      $$unsubscribe_page();
      return `<h1>${escape($page.status)}</h1>
<p>${escape($page.error?.message)}</p>`;
    });
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  file: () => file2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component2, file2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default;
    file2 = "_app/immutable/components/error.svelte-168ea032.js";
    imports2 = ["_app/immutable/components/error.svelte-168ea032.js", "_app/immutable/chunks/index-d1a17515.js", "_app/immutable/chunks/singletons-e12b43fd.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/modern/dexie.mjs
function extend(obj, extension) {
  if (typeof extension !== "object")
    return obj;
  keys(extension).forEach(function(key2) {
    obj[key2] = extension[key2];
  });
  return obj;
}
function hasOwn(obj, prop) {
  return _hasOwn.call(obj, prop);
}
function props(proto, extension) {
  if (typeof extension === "function")
    extension = extension(getProto(proto));
  (typeof Reflect === "undefined" ? keys : Reflect.ownKeys)(extension).forEach((key2) => {
    setProp(proto, key2, extension[key2]);
  });
}
function setProp(obj, prop, functionOrGetSet, options) {
  defineProperty(obj, prop, extend(functionOrGetSet && hasOwn(functionOrGetSet, "get") && typeof functionOrGetSet.get === "function" ? { get: functionOrGetSet.get, set: functionOrGetSet.set, configurable: true } : { value: functionOrGetSet, configurable: true, writable: true }, options));
}
function derive(Child) {
  return {
    from: function(Parent) {
      Child.prototype = Object.create(Parent.prototype);
      setProp(Child.prototype, "constructor", Child);
      return {
        extend: props.bind(null, Child.prototype)
      };
    }
  };
}
function getPropertyDescriptor(obj, prop) {
  const pd = getOwnPropertyDescriptor(obj, prop);
  let proto;
  return pd || (proto = getProto(obj)) && getPropertyDescriptor(proto, prop);
}
function slice(args, start, end) {
  return _slice.call(args, start, end);
}
function override(origFunc, overridedFactory) {
  return overridedFactory(origFunc);
}
function assert(b) {
  if (!b)
    throw new Error("Assertion Failed");
}
function asap$1(fn) {
  if (_global.setImmediate)
    setImmediate(fn);
  else
    setTimeout(fn, 0);
}
function arrayToObject(array2, extractor) {
  return array2.reduce((result, item, i) => {
    var nameAndValue = extractor(item, i);
    if (nameAndValue)
      result[nameAndValue[0]] = nameAndValue[1];
    return result;
  }, {});
}
function tryCatch(fn, onerror, args) {
  try {
    fn.apply(null, args);
  } catch (ex) {
    onerror && onerror(ex);
  }
}
function getByKeyPath(obj, keyPath) {
  if (hasOwn(obj, keyPath))
    return obj[keyPath];
  if (!keyPath)
    return obj;
  if (typeof keyPath !== "string") {
    var rv = [];
    for (var i = 0, l = keyPath.length; i < l; ++i) {
      var val = getByKeyPath(obj, keyPath[i]);
      rv.push(val);
    }
    return rv;
  }
  var period = keyPath.indexOf(".");
  if (period !== -1) {
    var innerObj = obj[keyPath.substr(0, period)];
    return innerObj === void 0 ? void 0 : getByKeyPath(innerObj, keyPath.substr(period + 1));
  }
  return void 0;
}
function setByKeyPath(obj, keyPath, value) {
  if (!obj || keyPath === void 0)
    return;
  if ("isFrozen" in Object && Object.isFrozen(obj))
    return;
  if (typeof keyPath !== "string" && "length" in keyPath) {
    assert(typeof value !== "string" && "length" in value);
    for (var i = 0, l = keyPath.length; i < l; ++i) {
      setByKeyPath(obj, keyPath[i], value[i]);
    }
  } else {
    var period = keyPath.indexOf(".");
    if (period !== -1) {
      var currentKeyPath = keyPath.substr(0, period);
      var remainingKeyPath = keyPath.substr(period + 1);
      if (remainingKeyPath === "")
        if (value === void 0) {
          if (isArray(obj) && !isNaN(parseInt(currentKeyPath)))
            obj.splice(currentKeyPath, 1);
          else
            delete obj[currentKeyPath];
        } else
          obj[currentKeyPath] = value;
      else {
        var innerObj = obj[currentKeyPath];
        if (!innerObj || !hasOwn(obj, currentKeyPath))
          innerObj = obj[currentKeyPath] = {};
        setByKeyPath(innerObj, remainingKeyPath, value);
      }
    } else {
      if (value === void 0) {
        if (isArray(obj) && !isNaN(parseInt(keyPath)))
          obj.splice(keyPath, 1);
        else
          delete obj[keyPath];
      } else
        obj[keyPath] = value;
    }
  }
}
function delByKeyPath(obj, keyPath) {
  if (typeof keyPath === "string")
    setByKeyPath(obj, keyPath, void 0);
  else if ("length" in keyPath)
    [].map.call(keyPath, function(kp) {
      setByKeyPath(obj, kp, void 0);
    });
}
function shallowClone(obj) {
  var rv = {};
  for (var m in obj) {
    if (hasOwn(obj, m))
      rv[m] = obj[m];
  }
  return rv;
}
function flatten(a) {
  return concat.apply([], a);
}
function deepClone(any) {
  circularRefs = typeof WeakMap !== "undefined" && /* @__PURE__ */ new WeakMap();
  const rv = innerDeepClone(any);
  circularRefs = null;
  return rv;
}
function innerDeepClone(any) {
  if (!any || typeof any !== "object")
    return any;
  let rv = circularRefs && circularRefs.get(any);
  if (rv)
    return rv;
  if (isArray(any)) {
    rv = [];
    circularRefs && circularRefs.set(any, rv);
    for (var i = 0, l = any.length; i < l; ++i) {
      rv.push(innerDeepClone(any[i]));
    }
  } else if (intrinsicTypes.indexOf(any.constructor) >= 0) {
    rv = any;
  } else {
    const proto = getProto(any);
    rv = proto === Object.prototype ? {} : Object.create(proto);
    circularRefs && circularRefs.set(any, rv);
    for (var prop in any) {
      if (hasOwn(any, prop)) {
        rv[prop] = innerDeepClone(any[prop]);
      }
    }
  }
  return rv;
}
function toStringTag(o) {
  return toString.call(o).slice(8, -1);
}
function getArrayOf(arrayLike) {
  var i, a, x, it;
  if (arguments.length === 1) {
    if (isArray(arrayLike))
      return arrayLike.slice();
    if (this === NO_CHAR_ARRAY && typeof arrayLike === "string")
      return [arrayLike];
    if (it = getIteratorOf(arrayLike)) {
      a = [];
      while (x = it.next(), !x.done)
        a.push(x.value);
      return a;
    }
    if (arrayLike == null)
      return [arrayLike];
    i = arrayLike.length;
    if (typeof i === "number") {
      a = new Array(i);
      while (i--)
        a[i] = arrayLike[i];
      return a;
    }
    return [arrayLike];
  }
  i = arguments.length;
  a = new Array(i);
  while (i--)
    a[i] = arguments[i];
  return a;
}
function setDebug(value, filter) {
  debug = value;
  libraryFilter = filter;
}
function getErrorWithStack() {
  if (NEEDS_THROW_FOR_STACK)
    try {
      getErrorWithStack.arguments;
      throw new Error();
    } catch (e) {
      return e;
    }
  return new Error();
}
function prettyStack(exception, numIgnoredFrames) {
  var stack = exception.stack;
  if (!stack)
    return "";
  numIgnoredFrames = numIgnoredFrames || 0;
  if (stack.indexOf(exception.name) === 0)
    numIgnoredFrames += (exception.name + exception.message).split("\n").length;
  return stack.split("\n").slice(numIgnoredFrames).filter(libraryFilter).map((frame) => "\n" + frame).join("");
}
function DexieError(name, msg) {
  this._e = getErrorWithStack();
  this.name = name;
  this.message = msg;
}
function getMultiErrorMessage(msg, failures) {
  return msg + ". Errors: " + Object.keys(failures).map((key2) => failures[key2].toString()).filter((v, i, s2) => s2.indexOf(v) === i).join("\n");
}
function ModifyError(msg, failures, successCount, failedKeys) {
  this._e = getErrorWithStack();
  this.failures = failures;
  this.failedKeys = failedKeys;
  this.successCount = successCount;
  this.message = getMultiErrorMessage(msg, failures);
}
function BulkError(msg, failures) {
  this._e = getErrorWithStack();
  this.name = "BulkError";
  this.failures = Object.keys(failures).map((pos) => failures[pos]);
  this.failuresByPos = failures;
  this.message = getMultiErrorMessage(msg, failures);
}
function mapError(domError, message) {
  if (!domError || domError instanceof DexieError || domError instanceof TypeError || domError instanceof SyntaxError || !domError.name || !exceptionMap[domError.name])
    return domError;
  var rv = new exceptionMap[domError.name](message || domError.message, domError);
  if ("stack" in domError) {
    setProp(rv, "stack", { get: function() {
      return this.inner.stack;
    } });
  }
  return rv;
}
function nop() {
}
function mirror(val) {
  return val;
}
function pureFunctionChain(f1, f2) {
  if (f1 == null || f1 === mirror)
    return f2;
  return function(val) {
    return f2(f1(val));
  };
}
function callBoth(on1, on2) {
  return function() {
    on1.apply(this, arguments);
    on2.apply(this, arguments);
  };
}
function hookCreatingChain(f1, f2) {
  if (f1 === nop)
    return f2;
  return function() {
    var res = f1.apply(this, arguments);
    if (res !== void 0)
      arguments[0] = res;
    var onsuccess = this.onsuccess, onerror = this.onerror;
    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess)
      this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror)
      this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res2 !== void 0 ? res2 : res;
  };
}
function hookDeletingChain(f1, f2) {
  if (f1 === nop)
    return f2;
  return function() {
    f1.apply(this, arguments);
    var onsuccess = this.onsuccess, onerror = this.onerror;
    this.onsuccess = this.onerror = null;
    f2.apply(this, arguments);
    if (onsuccess)
      this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror)
      this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
  };
}
function hookUpdatingChain(f1, f2) {
  if (f1 === nop)
    return f2;
  return function(modifications) {
    var res = f1.apply(this, arguments);
    extend(modifications, res);
    var onsuccess = this.onsuccess, onerror = this.onerror;
    this.onsuccess = null;
    this.onerror = null;
    var res2 = f2.apply(this, arguments);
    if (onsuccess)
      this.onsuccess = this.onsuccess ? callBoth(onsuccess, this.onsuccess) : onsuccess;
    if (onerror)
      this.onerror = this.onerror ? callBoth(onerror, this.onerror) : onerror;
    return res === void 0 ? res2 === void 0 ? void 0 : res2 : extend(res, res2);
  };
}
function reverseStoppableEventChain(f1, f2) {
  if (f1 === nop)
    return f2;
  return function() {
    if (f2.apply(this, arguments) === false)
      return false;
    return f1.apply(this, arguments);
  };
}
function promisableChain(f1, f2) {
  if (f1 === nop)
    return f2;
  return function() {
    var res = f1.apply(this, arguments);
    if (res && typeof res.then === "function") {
      var thiz = this, i = arguments.length, args = new Array(i);
      while (i--)
        args[i] = arguments[i];
      return res.then(function() {
        return f2.apply(thiz, args);
      });
    }
    return f2.apply(this, arguments);
  };
}
function DexiePromise(fn) {
  if (typeof this !== "object")
    throw new TypeError("Promises must be constructed via new");
  this._listeners = [];
  this.onuncatched = nop;
  this._lib = false;
  var psd = this._PSD = PSD;
  if (debug) {
    this._stackHolder = getErrorWithStack();
    this._prev = null;
    this._numPrev = 0;
  }
  if (typeof fn !== "function") {
    if (fn !== INTERNAL)
      throw new TypeError("Not a function");
    this._state = arguments[1];
    this._value = arguments[2];
    if (this._state === false)
      handleRejection(this, this._value);
    return;
  }
  this._state = null;
  this._value = null;
  ++psd.ref;
  executePromiseTask(this, fn);
}
function Listener(onFulfilled, onRejected, resolve, reject, zone) {
  this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
  this.onRejected = typeof onRejected === "function" ? onRejected : null;
  this.resolve = resolve;
  this.reject = reject;
  this.psd = zone;
}
function executePromiseTask(promise, fn) {
  try {
    fn((value) => {
      if (promise._state !== null)
        return;
      if (value === promise)
        throw new TypeError("A promise cannot be resolved with itself.");
      var shouldExecuteTick = promise._lib && beginMicroTickScope();
      if (value && typeof value.then === "function") {
        executePromiseTask(promise, (resolve, reject) => {
          value instanceof DexiePromise ? value._then(resolve, reject) : value.then(resolve, reject);
        });
      } else {
        promise._state = true;
        promise._value = value;
        propagateAllListeners(promise);
      }
      if (shouldExecuteTick)
        endMicroTickScope();
    }, handleRejection.bind(null, promise));
  } catch (ex) {
    handleRejection(promise, ex);
  }
}
function handleRejection(promise, reason) {
  rejectingErrors.push(reason);
  if (promise._state !== null)
    return;
  var shouldExecuteTick = promise._lib && beginMicroTickScope();
  reason = rejectionMapper(reason);
  promise._state = false;
  promise._value = reason;
  debug && reason !== null && typeof reason === "object" && !reason._promise && tryCatch(() => {
    var origProp = getPropertyDescriptor(reason, "stack");
    reason._promise = promise;
    setProp(reason, "stack", {
      get: () => stack_being_generated ? origProp && (origProp.get ? origProp.get.apply(reason) : origProp.value) : promise.stack
    });
  });
  addPossiblyUnhandledError(promise);
  propagateAllListeners(promise);
  if (shouldExecuteTick)
    endMicroTickScope();
}
function propagateAllListeners(promise) {
  var listeners = promise._listeners;
  promise._listeners = [];
  for (var i = 0, len = listeners.length; i < len; ++i) {
    propagateToListener(promise, listeners[i]);
  }
  var psd = promise._PSD;
  --psd.ref || psd.finalize();
  if (numScheduledCalls === 0) {
    ++numScheduledCalls;
    asap(() => {
      if (--numScheduledCalls === 0)
        finalizePhysicalTick();
    }, []);
  }
}
function propagateToListener(promise, listener) {
  if (promise._state === null) {
    promise._listeners.push(listener);
    return;
  }
  var cb = promise._state ? listener.onFulfilled : listener.onRejected;
  if (cb === null) {
    return (promise._state ? listener.resolve : listener.reject)(promise._value);
  }
  ++listener.psd.ref;
  ++numScheduledCalls;
  asap(callListener, [cb, promise, listener]);
}
function callListener(cb, promise, listener) {
  try {
    currentFulfiller = promise;
    var ret, value = promise._value;
    if (promise._state) {
      ret = cb(value);
    } else {
      if (rejectingErrors.length)
        rejectingErrors = [];
      ret = cb(value);
      if (rejectingErrors.indexOf(value) === -1)
        markErrorAsHandled(promise);
    }
    listener.resolve(ret);
  } catch (e) {
    listener.reject(e);
  } finally {
    currentFulfiller = null;
    if (--numScheduledCalls === 0)
      finalizePhysicalTick();
    --listener.psd.ref || listener.psd.finalize();
  }
}
function getStack(promise, stacks, limit) {
  if (stacks.length === limit)
    return stacks;
  var stack = "";
  if (promise._state === false) {
    var failure = promise._value, errorName, message;
    if (failure != null) {
      errorName = failure.name || "Error";
      message = failure.message || failure;
      stack = prettyStack(failure, 0);
    } else {
      errorName = failure;
      message = "";
    }
    stacks.push(errorName + (message ? ": " + message : "") + stack);
  }
  if (debug) {
    stack = prettyStack(promise._stackHolder, 2);
    if (stack && stacks.indexOf(stack) === -1)
      stacks.push(stack);
    if (promise._prev)
      getStack(promise._prev, stacks, limit);
  }
  return stacks;
}
function linkToPreviousPromise(promise, prev) {
  var numPrev = prev ? prev._numPrev + 1 : 0;
  if (numPrev < LONG_STACKS_CLIP_LIMIT) {
    promise._prev = prev;
    promise._numPrev = numPrev;
  }
}
function physicalTick() {
  beginMicroTickScope() && endMicroTickScope();
}
function beginMicroTickScope() {
  var wasRootExec = isOutsideMicroTick;
  isOutsideMicroTick = false;
  needsNewPhysicalTick = false;
  return wasRootExec;
}
function endMicroTickScope() {
  var callbacks, i, l;
  do {
    while (microtickQueue.length > 0) {
      callbacks = microtickQueue;
      microtickQueue = [];
      l = callbacks.length;
      for (i = 0; i < l; ++i) {
        var item = callbacks[i];
        item[0].apply(null, item[1]);
      }
    }
  } while (microtickQueue.length > 0);
  isOutsideMicroTick = true;
  needsNewPhysicalTick = true;
}
function finalizePhysicalTick() {
  var unhandledErrs = unhandledErrors;
  unhandledErrors = [];
  unhandledErrs.forEach((p) => {
    p._PSD.onunhandled.call(null, p._value, p);
  });
  var finalizers = tickFinalizers.slice(0);
  var i = finalizers.length;
  while (i)
    finalizers[--i]();
}
function run_at_end_of_this_or_next_physical_tick(fn) {
  function finalizer() {
    fn();
    tickFinalizers.splice(tickFinalizers.indexOf(finalizer), 1);
  }
  tickFinalizers.push(finalizer);
  ++numScheduledCalls;
  asap(() => {
    if (--numScheduledCalls === 0)
      finalizePhysicalTick();
  }, []);
}
function addPossiblyUnhandledError(promise) {
  if (!unhandledErrors.some((p) => p._value === promise._value))
    unhandledErrors.push(promise);
}
function markErrorAsHandled(promise) {
  var i = unhandledErrors.length;
  while (i)
    if (unhandledErrors[--i]._value === promise._value) {
      unhandledErrors.splice(i, 1);
      return;
    }
}
function PromiseReject(reason) {
  return new DexiePromise(INTERNAL, false, reason);
}
function wrap(fn, errorCatcher) {
  var psd = PSD;
  return function() {
    var wasRootExec = beginMicroTickScope(), outerScope = PSD;
    try {
      switchToZone(psd, true);
      return fn.apply(this, arguments);
    } catch (e) {
      errorCatcher && errorCatcher(e);
    } finally {
      switchToZone(outerScope, false);
      if (wasRootExec)
        endMicroTickScope();
    }
  };
}
function newScope(fn, props2, a1, a2) {
  var parent = PSD, psd = Object.create(parent);
  psd.parent = parent;
  psd.ref = 0;
  psd.global = false;
  psd.id = ++zone_id_counter;
  var globalEnv = globalPSD.env;
  psd.env = patchGlobalPromise ? {
    Promise: DexiePromise,
    PromiseProp: { value: DexiePromise, configurable: true, writable: true },
    all: DexiePromise.all,
    race: DexiePromise.race,
    allSettled: DexiePromise.allSettled,
    any: DexiePromise.any,
    resolve: DexiePromise.resolve,
    reject: DexiePromise.reject,
    nthen: getPatchedPromiseThen(globalEnv.nthen, psd),
    gthen: getPatchedPromiseThen(globalEnv.gthen, psd)
  } : {};
  if (props2)
    extend(psd, props2);
  ++parent.ref;
  psd.finalize = function() {
    --this.parent.ref || this.parent.finalize();
  };
  var rv = usePSD(psd, fn, a1, a2);
  if (psd.ref === 0)
    psd.finalize();
  return rv;
}
function incrementExpectedAwaits() {
  if (!task.id)
    task.id = ++taskCounter;
  ++task.awaits;
  task.echoes += ZONE_ECHO_LIMIT;
  return task.id;
}
function decrementExpectedAwaits() {
  if (!task.awaits)
    return false;
  if (--task.awaits === 0)
    task.id = 0;
  task.echoes = task.awaits * ZONE_ECHO_LIMIT;
  return true;
}
function onPossibleParallellAsync(possiblePromise) {
  if (task.echoes && possiblePromise && possiblePromise.constructor === NativePromise) {
    incrementExpectedAwaits();
    return possiblePromise.then((x) => {
      decrementExpectedAwaits();
      return x;
    }, (e) => {
      decrementExpectedAwaits();
      return rejection(e);
    });
  }
  return possiblePromise;
}
function zoneEnterEcho(targetZone) {
  ++totalEchoes;
  if (!task.echoes || --task.echoes === 0) {
    task.echoes = task.id = 0;
  }
  zoneStack.push(PSD);
  switchToZone(targetZone, true);
}
function zoneLeaveEcho() {
  var zone = zoneStack[zoneStack.length - 1];
  zoneStack.pop();
  switchToZone(zone, false);
}
function switchToZone(targetZone, bEnteringZone) {
  var currentZone = PSD;
  if (bEnteringZone ? task.echoes && (!zoneEchoes++ || targetZone !== PSD) : zoneEchoes && (!--zoneEchoes || targetZone !== PSD)) {
    enqueueNativeMicroTask(bEnteringZone ? zoneEnterEcho.bind(null, targetZone) : zoneLeaveEcho);
  }
  if (targetZone === PSD)
    return;
  PSD = targetZone;
  if (currentZone === globalPSD)
    globalPSD.env = snapShot();
  if (patchGlobalPromise) {
    var GlobalPromise = globalPSD.env.Promise;
    var targetEnv = targetZone.env;
    nativePromiseProto.then = targetEnv.nthen;
    GlobalPromise.prototype.then = targetEnv.gthen;
    if (currentZone.global || targetZone.global) {
      Object.defineProperty(_global, "Promise", targetEnv.PromiseProp);
      GlobalPromise.all = targetEnv.all;
      GlobalPromise.race = targetEnv.race;
      GlobalPromise.resolve = targetEnv.resolve;
      GlobalPromise.reject = targetEnv.reject;
      if (targetEnv.allSettled)
        GlobalPromise.allSettled = targetEnv.allSettled;
      if (targetEnv.any)
        GlobalPromise.any = targetEnv.any;
    }
  }
}
function snapShot() {
  var GlobalPromise = _global.Promise;
  return patchGlobalPromise ? {
    Promise: GlobalPromise,
    PromiseProp: Object.getOwnPropertyDescriptor(_global, "Promise"),
    all: GlobalPromise.all,
    race: GlobalPromise.race,
    allSettled: GlobalPromise.allSettled,
    any: GlobalPromise.any,
    resolve: GlobalPromise.resolve,
    reject: GlobalPromise.reject,
    nthen: nativePromiseProto.then,
    gthen: GlobalPromise.prototype.then
  } : {};
}
function usePSD(psd, fn, a1, a2, a3) {
  var outerScope = PSD;
  try {
    switchToZone(psd, true);
    return fn(a1, a2, a3);
  } finally {
    switchToZone(outerScope, false);
  }
}
function enqueueNativeMicroTask(job) {
  nativePromiseThen.call(resolvedNativePromise, job);
}
function nativeAwaitCompatibleWrap(fn, zone, possibleAwait, cleanup) {
  return typeof fn !== "function" ? fn : function() {
    var outerZone = PSD;
    if (possibleAwait)
      incrementExpectedAwaits();
    switchToZone(zone, true);
    try {
      return fn.apply(this, arguments);
    } finally {
      switchToZone(outerZone, false);
      if (cleanup)
        enqueueNativeMicroTask(decrementExpectedAwaits);
    }
  };
}
function getPatchedPromiseThen(origThen, zone) {
  return function(onResolved, onRejected) {
    return origThen.call(this, nativeAwaitCompatibleWrap(onResolved, zone), nativeAwaitCompatibleWrap(onRejected, zone));
  };
}
function globalError(err, promise) {
  var rv;
  try {
    rv = promise.onuncatched(err);
  } catch (e) {
  }
  if (rv !== false)
    try {
      var event, eventData = { promise, reason: err };
      if (_global.document && document.createEvent) {
        event = document.createEvent("Event");
        event.initEvent(UNHANDLEDREJECTION, true, true);
        extend(event, eventData);
      } else if (_global.CustomEvent) {
        event = new CustomEvent(UNHANDLEDREJECTION, { detail: eventData });
        extend(event, eventData);
      }
      if (event && _global.dispatchEvent) {
        dispatchEvent(event);
        if (!_global.PromiseRejectionEvent && _global.onunhandledrejection)
          try {
            _global.onunhandledrejection(event);
          } catch (_) {
          }
      }
      if (debug && event && !event.defaultPrevented) {
        console.warn(`Unhandled rejection: ${err.stack || err}`);
      }
    } catch (e) {
    }
}
function tempTransaction(db2, mode, storeNames, fn) {
  if (!db2.idbdb || !db2._state.openComplete && (!PSD.letThrough && !db2._vip)) {
    if (db2._state.openComplete) {
      return rejection(new exceptions.DatabaseClosed(db2._state.dbOpenError));
    }
    if (!db2._state.isBeingOpened) {
      if (!db2._options.autoOpen)
        return rejection(new exceptions.DatabaseClosed());
      db2.open().catch(nop);
    }
    return db2._state.dbReadyPromise.then(() => tempTransaction(db2, mode, storeNames, fn));
  } else {
    var trans = db2._createTransaction(mode, storeNames, db2._dbSchema);
    try {
      trans.create();
      db2._state.PR1398_maxLoop = 3;
    } catch (ex) {
      if (ex.name === errnames.InvalidState && db2.isOpen() && --db2._state.PR1398_maxLoop > 0) {
        console.warn("Dexie: Need to reopen db");
        db2._close();
        return db2.open().then(() => tempTransaction(db2, mode, storeNames, fn));
      }
      return rejection(ex);
    }
    return trans._promise(mode, (resolve, reject) => {
      return newScope(() => {
        PSD.trans = trans;
        return fn(resolve, reject, trans);
      });
    }).then((result) => {
      return trans._completion.then(() => result);
    });
  }
}
function combine(filter1, filter2) {
  return filter1 ? filter2 ? function() {
    return filter1.apply(this, arguments) && filter2.apply(this, arguments);
  } : filter1 : filter2;
}
function workaroundForUndefinedPrimKey(keyPath) {
  return typeof keyPath === "string" && !/\./.test(keyPath) ? (obj) => {
    if (obj[keyPath] === void 0 && keyPath in obj) {
      obj = deepClone(obj);
      delete obj[keyPath];
    }
    return obj;
  } : (obj) => obj;
}
function Events(ctx) {
  var evs = {};
  var rv = function(eventName, subscriber) {
    if (subscriber) {
      var i2 = arguments.length, args = new Array(i2 - 1);
      while (--i2)
        args[i2 - 1] = arguments[i2];
      evs[eventName].subscribe.apply(null, args);
      return ctx;
    } else if (typeof eventName === "string") {
      return evs[eventName];
    }
  };
  rv.addEventType = add;
  for (var i = 1, l = arguments.length; i < l; ++i) {
    add(arguments[i]);
  }
  return rv;
  function add(eventName, chainFunction, defaultFunction) {
    if (typeof eventName === "object")
      return addConfiguredEvents(eventName);
    if (!chainFunction)
      chainFunction = reverseStoppableEventChain;
    if (!defaultFunction)
      defaultFunction = nop;
    var context = {
      subscribers: [],
      fire: defaultFunction,
      subscribe: function(cb) {
        if (context.subscribers.indexOf(cb) === -1) {
          context.subscribers.push(cb);
          context.fire = chainFunction(context.fire, cb);
        }
      },
      unsubscribe: function(cb) {
        context.subscribers = context.subscribers.filter(function(fn) {
          return fn !== cb;
        });
        context.fire = context.subscribers.reduce(chainFunction, defaultFunction);
      }
    };
    evs[eventName] = rv[eventName] = context;
    return context;
  }
  function addConfiguredEvents(cfg) {
    keys(cfg).forEach(function(eventName) {
      var args = cfg[eventName];
      if (isArray(args)) {
        add(eventName, cfg[eventName][0], cfg[eventName][1]);
      } else if (args === "asap") {
        var context = add(eventName, mirror, function fire() {
          var i2 = arguments.length, args2 = new Array(i2);
          while (i2--)
            args2[i2] = arguments[i2];
          context.subscribers.forEach(function(fn) {
            asap$1(function fireEvent() {
              fn.apply(null, args2);
            });
          });
        });
      } else
        throw new exceptions.InvalidArgument("Invalid event config");
    });
  }
}
function makeClassConstructor(prototype, constructor) {
  derive(constructor).from({ prototype });
  return constructor;
}
function createTableConstructor(db2) {
  return makeClassConstructor(Table.prototype, function Table2(name, tableSchema, trans) {
    this.db = db2;
    this._tx = trans;
    this.name = name;
    this.schema = tableSchema;
    this.hook = db2._allTables[name] ? db2._allTables[name].hook : Events(null, {
      "creating": [hookCreatingChain, nop],
      "reading": [pureFunctionChain, mirror],
      "updating": [hookUpdatingChain, nop],
      "deleting": [hookDeletingChain, nop]
    });
  });
}
function isPlainKeyRange(ctx, ignoreLimitFilter) {
  return !(ctx.filter || ctx.algorithm || ctx.or) && (ignoreLimitFilter ? ctx.justLimit : !ctx.replayFilter);
}
function addFilter(ctx, fn) {
  ctx.filter = combine(ctx.filter, fn);
}
function addReplayFilter(ctx, factory, isLimitFilter) {
  var curr = ctx.replayFilter;
  ctx.replayFilter = curr ? () => combine(curr(), factory()) : factory;
  ctx.justLimit = isLimitFilter && !curr;
}
function addMatchFilter(ctx, fn) {
  ctx.isMatch = combine(ctx.isMatch, fn);
}
function getIndexOrStore(ctx, coreSchema) {
  if (ctx.isPrimKey)
    return coreSchema.primaryKey;
  const index4 = coreSchema.getIndexByKeyPath(ctx.index);
  if (!index4)
    throw new exceptions.Schema("KeyPath " + ctx.index + " on object store " + coreSchema.name + " is not indexed");
  return index4;
}
function openCursor(ctx, coreTable, trans) {
  const index4 = getIndexOrStore(ctx, coreTable.schema);
  return coreTable.openCursor({
    trans,
    values: !ctx.keysOnly,
    reverse: ctx.dir === "prev",
    unique: !!ctx.unique,
    query: {
      index: index4,
      range: ctx.range
    }
  });
}
function iter(ctx, fn, coreTrans, coreTable) {
  const filter = ctx.replayFilter ? combine(ctx.filter, ctx.replayFilter()) : ctx.filter;
  if (!ctx.or) {
    return iterate(openCursor(ctx, coreTable, coreTrans), combine(ctx.algorithm, filter), fn, !ctx.keysOnly && ctx.valueMapper);
  } else {
    const set = {};
    const union = (item, cursor, advance) => {
      if (!filter || filter(cursor, advance, (result) => cursor.stop(result), (err) => cursor.fail(err))) {
        var primaryKey = cursor.primaryKey;
        var key2 = "" + primaryKey;
        if (key2 === "[object ArrayBuffer]")
          key2 = "" + new Uint8Array(primaryKey);
        if (!hasOwn(set, key2)) {
          set[key2] = true;
          fn(item, cursor, advance);
        }
      }
    };
    return Promise.all([
      ctx.or._iterate(union, coreTrans),
      iterate(openCursor(ctx, coreTable, coreTrans), ctx.algorithm, union, !ctx.keysOnly && ctx.valueMapper)
    ]);
  }
}
function iterate(cursorPromise, filter, fn, valueMapper) {
  var mappedFn = valueMapper ? (x, c, a) => fn(valueMapper(x), c, a) : fn;
  var wrappedFn = wrap(mappedFn);
  return cursorPromise.then((cursor) => {
    if (cursor) {
      return cursor.start(() => {
        var c = () => cursor.continue();
        if (!filter || filter(cursor, (advancer) => c = advancer, (val) => {
          cursor.stop(val);
          c = nop;
        }, (e) => {
          cursor.fail(e);
          c = nop;
        }))
          wrappedFn(cursor.value, cursor, (advancer) => c = advancer);
        c();
      });
    }
  });
}
function cmp(a, b) {
  try {
    const ta = type(a);
    const tb = type(b);
    if (ta !== tb) {
      if (ta === "Array")
        return 1;
      if (tb === "Array")
        return -1;
      if (ta === "binary")
        return 1;
      if (tb === "binary")
        return -1;
      if (ta === "string")
        return 1;
      if (tb === "string")
        return -1;
      if (ta === "Date")
        return 1;
      if (tb !== "Date")
        return NaN;
      return -1;
    }
    switch (ta) {
      case "number":
      case "Date":
      case "string":
        return a > b ? 1 : a < b ? -1 : 0;
      case "binary": {
        return compareUint8Arrays(getUint8Array(a), getUint8Array(b));
      }
      case "Array":
        return compareArrays(a, b);
    }
  } catch (_a) {
  }
  return NaN;
}
function compareArrays(a, b) {
  const al = a.length;
  const bl = b.length;
  const l = al < bl ? al : bl;
  for (let i = 0; i < l; ++i) {
    const res = cmp(a[i], b[i]);
    if (res !== 0)
      return res;
  }
  return al === bl ? 0 : al < bl ? -1 : 1;
}
function compareUint8Arrays(a, b) {
  const al = a.length;
  const bl = b.length;
  const l = al < bl ? al : bl;
  for (let i = 0; i < l; ++i) {
    if (a[i] !== b[i])
      return a[i] < b[i] ? -1 : 1;
  }
  return al === bl ? 0 : al < bl ? -1 : 1;
}
function type(x) {
  const t = typeof x;
  if (t !== "object")
    return t;
  if (ArrayBuffer.isView(x))
    return "binary";
  const tsTag = toStringTag(x);
  return tsTag === "ArrayBuffer" ? "binary" : tsTag;
}
function getUint8Array(a) {
  if (a instanceof Uint8Array)
    return a;
  if (ArrayBuffer.isView(a))
    return new Uint8Array(a.buffer, a.byteOffset, a.byteLength);
  return new Uint8Array(a);
}
function createCollectionConstructor(db2) {
  return makeClassConstructor(Collection.prototype, function Collection2(whereClause, keyRangeGenerator) {
    this.db = db2;
    let keyRange = AnyRange, error2 = null;
    if (keyRangeGenerator)
      try {
        keyRange = keyRangeGenerator();
      } catch (ex) {
        error2 = ex;
      }
    const whereCtx = whereClause._ctx;
    const table = whereCtx.table;
    const readingHook = table.hook.reading.fire;
    this._ctx = {
      table,
      index: whereCtx.index,
      isPrimKey: !whereCtx.index || table.schema.primKey.keyPath && whereCtx.index === table.schema.primKey.name,
      range: keyRange,
      keysOnly: false,
      dir: "next",
      unique: "",
      algorithm: null,
      filter: null,
      replayFilter: null,
      justLimit: true,
      isMatch: null,
      offset: 0,
      limit: Infinity,
      error: error2,
      or: whereCtx.or,
      valueMapper: readingHook !== mirror ? readingHook : null
    };
  });
}
function simpleCompare(a, b) {
  return a < b ? -1 : a === b ? 0 : 1;
}
function simpleCompareReverse(a, b) {
  return a > b ? -1 : a === b ? 0 : 1;
}
function fail(collectionOrWhereClause, err, T) {
  var collection = collectionOrWhereClause instanceof WhereClause ? new collectionOrWhereClause.Collection(collectionOrWhereClause) : collectionOrWhereClause;
  collection._ctx.error = T ? new T(err) : new TypeError(err);
  return collection;
}
function emptyCollection(whereClause) {
  return new whereClause.Collection(whereClause, () => rangeEqual("")).limit(0);
}
function upperFactory(dir) {
  return dir === "next" ? (s2) => s2.toUpperCase() : (s2) => s2.toLowerCase();
}
function lowerFactory(dir) {
  return dir === "next" ? (s2) => s2.toLowerCase() : (s2) => s2.toUpperCase();
}
function nextCasing(key2, lowerKey, upperNeedle, lowerNeedle, cmp2, dir) {
  var length = Math.min(key2.length, lowerNeedle.length);
  var llp = -1;
  for (var i = 0; i < length; ++i) {
    var lwrKeyChar = lowerKey[i];
    if (lwrKeyChar !== lowerNeedle[i]) {
      if (cmp2(key2[i], upperNeedle[i]) < 0)
        return key2.substr(0, i) + upperNeedle[i] + upperNeedle.substr(i + 1);
      if (cmp2(key2[i], lowerNeedle[i]) < 0)
        return key2.substr(0, i) + lowerNeedle[i] + upperNeedle.substr(i + 1);
      if (llp >= 0)
        return key2.substr(0, llp) + lowerKey[llp] + upperNeedle.substr(llp + 1);
      return null;
    }
    if (cmp2(key2[i], lwrKeyChar) < 0)
      llp = i;
  }
  if (length < lowerNeedle.length && dir === "next")
    return key2 + upperNeedle.substr(key2.length);
  if (length < key2.length && dir === "prev")
    return key2.substr(0, upperNeedle.length);
  return llp < 0 ? null : key2.substr(0, llp) + lowerNeedle[llp] + upperNeedle.substr(llp + 1);
}
function addIgnoreCaseAlgorithm(whereClause, match, needles, suffix) {
  var upper, lower, compare, upperNeedles, lowerNeedles, direction, nextKeySuffix, needlesLen = needles.length;
  if (!needles.every((s2) => typeof s2 === "string")) {
    return fail(whereClause, STRING_EXPECTED);
  }
  function initDirection(dir) {
    upper = upperFactory(dir);
    lower = lowerFactory(dir);
    compare = dir === "next" ? simpleCompare : simpleCompareReverse;
    var needleBounds = needles.map(function(needle) {
      return { lower: lower(needle), upper: upper(needle) };
    }).sort(function(a, b) {
      return compare(a.lower, b.lower);
    });
    upperNeedles = needleBounds.map(function(nb) {
      return nb.upper;
    });
    lowerNeedles = needleBounds.map(function(nb) {
      return nb.lower;
    });
    direction = dir;
    nextKeySuffix = dir === "next" ? "" : suffix;
  }
  initDirection("next");
  var c = new whereClause.Collection(whereClause, () => createRange(upperNeedles[0], lowerNeedles[needlesLen - 1] + suffix));
  c._ondirectionchange = function(direction2) {
    initDirection(direction2);
  };
  var firstPossibleNeedle = 0;
  c._addAlgorithm(function(cursor, advance, resolve) {
    var key2 = cursor.key;
    if (typeof key2 !== "string")
      return false;
    var lowerKey = lower(key2);
    if (match(lowerKey, lowerNeedles, firstPossibleNeedle)) {
      return true;
    } else {
      var lowestPossibleCasing = null;
      for (var i = firstPossibleNeedle; i < needlesLen; ++i) {
        var casing = nextCasing(key2, lowerKey, upperNeedles[i], lowerNeedles[i], compare, direction);
        if (casing === null && lowestPossibleCasing === null)
          firstPossibleNeedle = i + 1;
        else if (lowestPossibleCasing === null || compare(lowestPossibleCasing, casing) > 0) {
          lowestPossibleCasing = casing;
        }
      }
      if (lowestPossibleCasing !== null) {
        advance(function() {
          cursor.continue(lowestPossibleCasing + nextKeySuffix);
        });
      } else {
        advance(resolve);
      }
      return false;
    }
  });
  return c;
}
function createRange(lower, upper, lowerOpen, upperOpen) {
  return {
    type: 2,
    lower,
    upper,
    lowerOpen,
    upperOpen
  };
}
function rangeEqual(value) {
  return {
    type: 1,
    lower: value,
    upper: value
  };
}
function createWhereClauseConstructor(db2) {
  return makeClassConstructor(WhereClause.prototype, function WhereClause2(table, index4, orCollection) {
    this.db = db2;
    this._ctx = {
      table,
      index: index4 === ":id" ? null : index4,
      or: orCollection
    };
    const indexedDB2 = db2._deps.indexedDB;
    if (!indexedDB2)
      throw new exceptions.MissingAPI();
    this._cmp = this._ascending = indexedDB2.cmp.bind(indexedDB2);
    this._descending = (a, b) => indexedDB2.cmp(b, a);
    this._max = (a, b) => indexedDB2.cmp(a, b) > 0 ? a : b;
    this._min = (a, b) => indexedDB2.cmp(a, b) < 0 ? a : b;
    this._IDBKeyRange = db2._deps.IDBKeyRange;
  });
}
function eventRejectHandler(reject) {
  return wrap(function(event) {
    preventDefault(event);
    reject(event.target.error);
    return false;
  });
}
function preventDefault(event) {
  if (event.stopPropagation)
    event.stopPropagation();
  if (event.preventDefault)
    event.preventDefault();
}
function createTransactionConstructor(db2) {
  return makeClassConstructor(Transaction.prototype, function Transaction2(mode, storeNames, dbschema, chromeTransactionDurability, parent) {
    this.db = db2;
    this.mode = mode;
    this.storeNames = storeNames;
    this.schema = dbschema;
    this.chromeTransactionDurability = chromeTransactionDurability;
    this.idbtrans = null;
    this.on = Events(this, "complete", "error", "abort");
    this.parent = parent || null;
    this.active = true;
    this._reculock = 0;
    this._blockedFuncs = [];
    this._resolve = null;
    this._reject = null;
    this._waitingFor = null;
    this._waitingQueue = null;
    this._spinCount = 0;
    this._completion = new DexiePromise((resolve, reject) => {
      this._resolve = resolve;
      this._reject = reject;
    });
    this._completion.then(() => {
      this.active = false;
      this.on.complete.fire();
    }, (e) => {
      var wasActive = this.active;
      this.active = false;
      this.on.error.fire(e);
      this.parent ? this.parent._reject(e) : wasActive && this.idbtrans && this.idbtrans.abort();
      return rejection(e);
    });
  });
}
function createIndexSpec(name, keyPath, unique, multi, auto, compound, isPrimKey) {
  return {
    name,
    keyPath,
    unique,
    multi,
    auto,
    compound,
    src: (unique && !isPrimKey ? "&" : "") + (multi ? "*" : "") + (auto ? "++" : "") + nameFromKeyPath(keyPath)
  };
}
function nameFromKeyPath(keyPath) {
  return typeof keyPath === "string" ? keyPath : keyPath ? "[" + [].join.call(keyPath, "+") + "]" : "";
}
function createTableSchema(name, primKey, indexes) {
  return {
    name,
    primKey,
    indexes,
    mappedClass: null,
    idxByName: arrayToObject(indexes, (index4) => [index4.name, index4])
  };
}
function safariMultiStoreFix(storeNames) {
  return storeNames.length === 1 ? storeNames[0] : storeNames;
}
function getKeyExtractor(keyPath) {
  if (keyPath == null) {
    return () => void 0;
  } else if (typeof keyPath === "string") {
    return getSinglePathKeyExtractor(keyPath);
  } else {
    return (obj) => getByKeyPath(obj, keyPath);
  }
}
function getSinglePathKeyExtractor(keyPath) {
  const split = keyPath.split(".");
  if (split.length === 1) {
    return (obj) => obj[keyPath];
  } else {
    return (obj) => getByKeyPath(obj, keyPath);
  }
}
function arrayify(arrayLike) {
  return [].slice.call(arrayLike);
}
function getKeyPathAlias(keyPath) {
  return keyPath == null ? ":id" : typeof keyPath === "string" ? keyPath : `[${keyPath.join("+")}]`;
}
function createDBCore(db2, IdbKeyRange, tmpTrans) {
  function extractSchema(db3, trans) {
    const tables2 = arrayify(db3.objectStoreNames);
    return {
      schema: {
        name: db3.name,
        tables: tables2.map((table) => trans.objectStore(table)).map((store) => {
          const { keyPath, autoIncrement } = store;
          const compound = isArray(keyPath);
          const outbound = keyPath == null;
          const indexByKeyPath = {};
          const result = {
            name: store.name,
            primaryKey: {
              name: null,
              isPrimaryKey: true,
              outbound,
              compound,
              keyPath,
              autoIncrement,
              unique: true,
              extractKey: getKeyExtractor(keyPath)
            },
            indexes: arrayify(store.indexNames).map((indexName) => store.index(indexName)).map((index4) => {
              const { name, unique, multiEntry, keyPath: keyPath2 } = index4;
              const compound2 = isArray(keyPath2);
              const result2 = {
                name,
                compound: compound2,
                keyPath: keyPath2,
                unique,
                multiEntry,
                extractKey: getKeyExtractor(keyPath2)
              };
              indexByKeyPath[getKeyPathAlias(keyPath2)] = result2;
              return result2;
            }),
            getIndexByKeyPath: (keyPath2) => indexByKeyPath[getKeyPathAlias(keyPath2)]
          };
          indexByKeyPath[":id"] = result.primaryKey;
          if (keyPath != null) {
            indexByKeyPath[getKeyPathAlias(keyPath)] = result.primaryKey;
          }
          return result;
        })
      },
      hasGetAll: tables2.length > 0 && "getAll" in trans.objectStore(tables2[0]) && !(typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604)
    };
  }
  function makeIDBKeyRange(range) {
    if (range.type === 3)
      return null;
    if (range.type === 4)
      throw new Error("Cannot convert never type to IDBKeyRange");
    const { lower, upper, lowerOpen, upperOpen } = range;
    const idbRange = lower === void 0 ? upper === void 0 ? null : IdbKeyRange.upperBound(upper, !!upperOpen) : upper === void 0 ? IdbKeyRange.lowerBound(lower, !!lowerOpen) : IdbKeyRange.bound(lower, upper, !!lowerOpen, !!upperOpen);
    return idbRange;
  }
  function createDbCoreTable(tableSchema) {
    const tableName = tableSchema.name;
    function mutate({ trans, type: type2, keys: keys2, values, range }) {
      return new Promise((resolve, reject) => {
        resolve = wrap(resolve);
        const store = trans.objectStore(tableName);
        const outbound = store.keyPath == null;
        const isAddOrPut = type2 === "put" || type2 === "add";
        if (!isAddOrPut && type2 !== "delete" && type2 !== "deleteRange")
          throw new Error("Invalid operation type: " + type2);
        const { length } = keys2 || values || { length: 1 };
        if (keys2 && values && keys2.length !== values.length) {
          throw new Error("Given keys array must have same length as given values array.");
        }
        if (length === 0)
          return resolve({ numFailures: 0, failures: {}, results: [], lastResult: void 0 });
        let req;
        const reqs = [];
        const failures = [];
        let numFailures = 0;
        const errorHandler = (event) => {
          ++numFailures;
          preventDefault(event);
        };
        if (type2 === "deleteRange") {
          if (range.type === 4)
            return resolve({ numFailures, failures, results: [], lastResult: void 0 });
          if (range.type === 3)
            reqs.push(req = store.clear());
          else
            reqs.push(req = store.delete(makeIDBKeyRange(range)));
        } else {
          const [args1, args2] = isAddOrPut ? outbound ? [values, keys2] : [values, null] : [keys2, null];
          if (isAddOrPut) {
            for (let i = 0; i < length; ++i) {
              reqs.push(req = args2 && args2[i] !== void 0 ? store[type2](args1[i], args2[i]) : store[type2](args1[i]));
              req.onerror = errorHandler;
            }
          } else {
            for (let i = 0; i < length; ++i) {
              reqs.push(req = store[type2](args1[i]));
              req.onerror = errorHandler;
            }
          }
        }
        const done = (event) => {
          const lastResult = event.target.result;
          reqs.forEach((req2, i) => req2.error != null && (failures[i] = req2.error));
          resolve({
            numFailures,
            failures,
            results: type2 === "delete" ? keys2 : reqs.map((req2) => req2.result),
            lastResult
          });
        };
        req.onerror = (event) => {
          errorHandler(event);
          done(event);
        };
        req.onsuccess = done;
      });
    }
    function openCursor2({ trans, values, query: query2, reverse, unique }) {
      return new Promise((resolve, reject) => {
        resolve = wrap(resolve);
        const { index: index4, range } = query2;
        const store = trans.objectStore(tableName);
        const source = index4.isPrimaryKey ? store : store.index(index4.name);
        const direction = reverse ? unique ? "prevunique" : "prev" : unique ? "nextunique" : "next";
        const req = values || !("openKeyCursor" in source) ? source.openCursor(makeIDBKeyRange(range), direction) : source.openKeyCursor(makeIDBKeyRange(range), direction);
        req.onerror = eventRejectHandler(reject);
        req.onsuccess = wrap((ev) => {
          const cursor = req.result;
          if (!cursor) {
            resolve(null);
            return;
          }
          cursor.___id = ++_id_counter;
          cursor.done = false;
          const _cursorContinue = cursor.continue.bind(cursor);
          let _cursorContinuePrimaryKey = cursor.continuePrimaryKey;
          if (_cursorContinuePrimaryKey)
            _cursorContinuePrimaryKey = _cursorContinuePrimaryKey.bind(cursor);
          const _cursorAdvance = cursor.advance.bind(cursor);
          const doThrowCursorIsNotStarted = () => {
            throw new Error("Cursor not started");
          };
          const doThrowCursorIsStopped = () => {
            throw new Error("Cursor not stopped");
          };
          cursor.trans = trans;
          cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsNotStarted;
          cursor.fail = wrap(reject);
          cursor.next = function() {
            let gotOne = 1;
            return this.start(() => gotOne-- ? this.continue() : this.stop()).then(() => this);
          };
          cursor.start = (callback) => {
            const iterationPromise = new Promise((resolveIteration, rejectIteration) => {
              resolveIteration = wrap(resolveIteration);
              req.onerror = eventRejectHandler(rejectIteration);
              cursor.fail = rejectIteration;
              cursor.stop = (value) => {
                cursor.stop = cursor.continue = cursor.continuePrimaryKey = cursor.advance = doThrowCursorIsStopped;
                resolveIteration(value);
              };
            });
            const guardedCallback = () => {
              if (req.result) {
                try {
                  callback();
                } catch (err) {
                  cursor.fail(err);
                }
              } else {
                cursor.done = true;
                cursor.start = () => {
                  throw new Error("Cursor behind last entry");
                };
                cursor.stop();
              }
            };
            req.onsuccess = wrap((ev2) => {
              req.onsuccess = guardedCallback;
              guardedCallback();
            });
            cursor.continue = _cursorContinue;
            cursor.continuePrimaryKey = _cursorContinuePrimaryKey;
            cursor.advance = _cursorAdvance;
            guardedCallback();
            return iterationPromise;
          };
          resolve(cursor);
        }, reject);
      });
    }
    function query(hasGetAll2) {
      return (request) => {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const { trans, values, limit, query: query2 } = request;
          const nonInfinitLimit = limit === Infinity ? void 0 : limit;
          const { index: index4, range } = query2;
          const store = trans.objectStore(tableName);
          const source = index4.isPrimaryKey ? store : store.index(index4.name);
          const idbKeyRange = makeIDBKeyRange(range);
          if (limit === 0)
            return resolve({ result: [] });
          if (hasGetAll2) {
            const req = values ? source.getAll(idbKeyRange, nonInfinitLimit) : source.getAllKeys(idbKeyRange, nonInfinitLimit);
            req.onsuccess = (event) => resolve({ result: event.target.result });
            req.onerror = eventRejectHandler(reject);
          } else {
            let count = 0;
            const req = values || !("openKeyCursor" in source) ? source.openCursor(idbKeyRange) : source.openKeyCursor(idbKeyRange);
            const result = [];
            req.onsuccess = (event) => {
              const cursor = req.result;
              if (!cursor)
                return resolve({ result });
              result.push(values ? cursor.value : cursor.primaryKey);
              if (++count === limit)
                return resolve({ result });
              cursor.continue();
            };
            req.onerror = eventRejectHandler(reject);
          }
        });
      };
    }
    return {
      name: tableName,
      schema: tableSchema,
      mutate,
      getMany({ trans, keys: keys2 }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const store = trans.objectStore(tableName);
          const length = keys2.length;
          const result = new Array(length);
          let keyCount = 0;
          let callbackCount = 0;
          let req;
          const successHandler = (event) => {
            const req2 = event.target;
            if ((result[req2._pos] = req2.result) != null)
              ;
            if (++callbackCount === keyCount)
              resolve(result);
          };
          const errorHandler = eventRejectHandler(reject);
          for (let i = 0; i < length; ++i) {
            const key2 = keys2[i];
            if (key2 != null) {
              req = store.get(keys2[i]);
              req._pos = i;
              req.onsuccess = successHandler;
              req.onerror = errorHandler;
              ++keyCount;
            }
          }
          if (keyCount === 0)
            resolve(result);
        });
      },
      get({ trans, key: key2 }) {
        return new Promise((resolve, reject) => {
          resolve = wrap(resolve);
          const store = trans.objectStore(tableName);
          const req = store.get(key2);
          req.onsuccess = (event) => resolve(event.target.result);
          req.onerror = eventRejectHandler(reject);
        });
      },
      query: query(hasGetAll),
      openCursor: openCursor2,
      count({ query: query2, trans }) {
        const { index: index4, range } = query2;
        return new Promise((resolve, reject) => {
          const store = trans.objectStore(tableName);
          const source = index4.isPrimaryKey ? store : store.index(index4.name);
          const idbKeyRange = makeIDBKeyRange(range);
          const req = idbKeyRange ? source.count(idbKeyRange) : source.count();
          req.onsuccess = wrap((ev) => resolve(ev.target.result));
          req.onerror = eventRejectHandler(reject);
        });
      }
    };
  }
  const { schema, hasGetAll } = extractSchema(db2, tmpTrans);
  const tables = schema.tables.map((tableSchema) => createDbCoreTable(tableSchema));
  const tableMap = {};
  tables.forEach((table) => tableMap[table.name] = table);
  return {
    stack: "dbcore",
    transaction: db2.transaction.bind(db2),
    table(name) {
      const result = tableMap[name];
      if (!result)
        throw new Error(`Table '${name}' not found`);
      return tableMap[name];
    },
    MIN_KEY: -Infinity,
    MAX_KEY: getMaxKey(IdbKeyRange),
    schema
  };
}
function createMiddlewareStack(stackImpl, middlewares) {
  return middlewares.reduce((down, { create }) => ({ ...down, ...create(down) }), stackImpl);
}
function createMiddlewareStacks(middlewares, idbdb, { IDBKeyRange, indexedDB: indexedDB2 }, tmpTrans) {
  const dbcore = createMiddlewareStack(createDBCore(idbdb, IDBKeyRange, tmpTrans), middlewares.dbcore);
  return {
    dbcore
  };
}
function generateMiddlewareStacks({ _novip: db2 }, tmpTrans) {
  const idbdb = tmpTrans.db;
  const stacks = createMiddlewareStacks(db2._middlewares, idbdb, db2._deps, tmpTrans);
  db2.core = stacks.dbcore;
  db2.tables.forEach((table) => {
    const tableName = table.name;
    if (db2.core.schema.tables.some((tbl) => tbl.name === tableName)) {
      table.core = db2.core.table(tableName);
      if (db2[tableName] instanceof db2.Table) {
        db2[tableName].core = table.core;
      }
    }
  });
}
function setApiOnPlace({ _novip: db2 }, objs, tableNames, dbschema) {
  tableNames.forEach((tableName) => {
    const schema = dbschema[tableName];
    objs.forEach((obj) => {
      const propDesc = getPropertyDescriptor(obj, tableName);
      if (!propDesc || "value" in propDesc && propDesc.value === void 0) {
        if (obj === db2.Transaction.prototype || obj instanceof db2.Transaction) {
          setProp(obj, tableName, {
            get() {
              return this.table(tableName);
            },
            set(value) {
              defineProperty(this, tableName, { value, writable: true, configurable: true, enumerable: true });
            }
          });
        } else {
          obj[tableName] = new db2.Table(tableName, schema);
        }
      }
    });
  });
}
function removeTablesApi({ _novip: db2 }, objs) {
  objs.forEach((obj) => {
    for (let key2 in obj) {
      if (obj[key2] instanceof db2.Table)
        delete obj[key2];
    }
  });
}
function lowerVersionFirst(a, b) {
  return a._cfg.version - b._cfg.version;
}
function runUpgraders(db2, oldVersion, idbUpgradeTrans, reject) {
  const globalSchema = db2._dbSchema;
  const trans = db2._createTransaction("readwrite", db2._storeNames, globalSchema);
  trans.create(idbUpgradeTrans);
  trans._completion.catch(reject);
  const rejectTransaction = trans._reject.bind(trans);
  const transless = PSD.transless || PSD;
  newScope(() => {
    PSD.trans = trans;
    PSD.transless = transless;
    if (oldVersion === 0) {
      keys(globalSchema).forEach((tableName) => {
        createTable(idbUpgradeTrans, tableName, globalSchema[tableName].primKey, globalSchema[tableName].indexes);
      });
      generateMiddlewareStacks(db2, idbUpgradeTrans);
      DexiePromise.follow(() => db2.on.populate.fire(trans)).catch(rejectTransaction);
    } else
      updateTablesAndIndexes(db2, oldVersion, trans, idbUpgradeTrans).catch(rejectTransaction);
  });
}
function updateTablesAndIndexes({ _novip: db2 }, oldVersion, trans, idbUpgradeTrans) {
  const queue = [];
  const versions = db2._versions;
  let globalSchema = db2._dbSchema = buildGlobalSchema(db2, db2.idbdb, idbUpgradeTrans);
  let anyContentUpgraderHasRun = false;
  const versToRun = versions.filter((v) => v._cfg.version >= oldVersion);
  versToRun.forEach((version) => {
    queue.push(() => {
      const oldSchema = globalSchema;
      const newSchema = version._cfg.dbschema;
      adjustToExistingIndexNames(db2, oldSchema, idbUpgradeTrans);
      adjustToExistingIndexNames(db2, newSchema, idbUpgradeTrans);
      globalSchema = db2._dbSchema = newSchema;
      const diff = getSchemaDiff(oldSchema, newSchema);
      diff.add.forEach((tuple) => {
        createTable(idbUpgradeTrans, tuple[0], tuple[1].primKey, tuple[1].indexes);
      });
      diff.change.forEach((change) => {
        if (change.recreate) {
          throw new exceptions.Upgrade("Not yet support for changing primary key");
        } else {
          const store = idbUpgradeTrans.objectStore(change.name);
          change.add.forEach((idx) => addIndex(store, idx));
          change.change.forEach((idx) => {
            store.deleteIndex(idx.name);
            addIndex(store, idx);
          });
          change.del.forEach((idxName) => store.deleteIndex(idxName));
        }
      });
      const contentUpgrade = version._cfg.contentUpgrade;
      if (contentUpgrade && version._cfg.version > oldVersion) {
        generateMiddlewareStacks(db2, idbUpgradeTrans);
        trans._memoizedTables = {};
        anyContentUpgraderHasRun = true;
        let upgradeSchema = shallowClone(newSchema);
        diff.del.forEach((table) => {
          upgradeSchema[table] = oldSchema[table];
        });
        removeTablesApi(db2, [db2.Transaction.prototype]);
        setApiOnPlace(db2, [db2.Transaction.prototype], keys(upgradeSchema), upgradeSchema);
        trans.schema = upgradeSchema;
        const contentUpgradeIsAsync = isAsyncFunction(contentUpgrade);
        if (contentUpgradeIsAsync) {
          incrementExpectedAwaits();
        }
        let returnValue;
        const promiseFollowed = DexiePromise.follow(() => {
          returnValue = contentUpgrade(trans);
          if (returnValue) {
            if (contentUpgradeIsAsync) {
              var decrementor = decrementExpectedAwaits.bind(null, null);
              returnValue.then(decrementor, decrementor);
            }
          }
        });
        return returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue) : promiseFollowed.then(() => returnValue);
      }
    });
    queue.push((idbtrans) => {
      if (!anyContentUpgraderHasRun || !hasIEDeleteObjectStoreBug) {
        const newSchema = version._cfg.dbschema;
        deleteRemovedTables(newSchema, idbtrans);
      }
      removeTablesApi(db2, [db2.Transaction.prototype]);
      setApiOnPlace(db2, [db2.Transaction.prototype], db2._storeNames, db2._dbSchema);
      trans.schema = db2._dbSchema;
    });
  });
  function runQueue() {
    return queue.length ? DexiePromise.resolve(queue.shift()(trans.idbtrans)).then(runQueue) : DexiePromise.resolve();
  }
  return runQueue().then(() => {
    createMissingTables(globalSchema, idbUpgradeTrans);
  });
}
function getSchemaDiff(oldSchema, newSchema) {
  const diff = {
    del: [],
    add: [],
    change: []
  };
  let table;
  for (table in oldSchema) {
    if (!newSchema[table])
      diff.del.push(table);
  }
  for (table in newSchema) {
    const oldDef = oldSchema[table], newDef = newSchema[table];
    if (!oldDef) {
      diff.add.push([table, newDef]);
    } else {
      const change = {
        name: table,
        def: newDef,
        recreate: false,
        del: [],
        add: [],
        change: []
      };
      if ("" + (oldDef.primKey.keyPath || "") !== "" + (newDef.primKey.keyPath || "") || oldDef.primKey.auto !== newDef.primKey.auto && !isIEOrEdge) {
        change.recreate = true;
        diff.change.push(change);
      } else {
        const oldIndexes = oldDef.idxByName;
        const newIndexes = newDef.idxByName;
        let idxName;
        for (idxName in oldIndexes) {
          if (!newIndexes[idxName])
            change.del.push(idxName);
        }
        for (idxName in newIndexes) {
          const oldIdx = oldIndexes[idxName], newIdx = newIndexes[idxName];
          if (!oldIdx)
            change.add.push(newIdx);
          else if (oldIdx.src !== newIdx.src)
            change.change.push(newIdx);
        }
        if (change.del.length > 0 || change.add.length > 0 || change.change.length > 0) {
          diff.change.push(change);
        }
      }
    }
  }
  return diff;
}
function createTable(idbtrans, tableName, primKey, indexes) {
  const store = idbtrans.db.createObjectStore(tableName, primKey.keyPath ? { keyPath: primKey.keyPath, autoIncrement: primKey.auto } : { autoIncrement: primKey.auto });
  indexes.forEach((idx) => addIndex(store, idx));
  return store;
}
function createMissingTables(newSchema, idbtrans) {
  keys(newSchema).forEach((tableName) => {
    if (!idbtrans.db.objectStoreNames.contains(tableName)) {
      createTable(idbtrans, tableName, newSchema[tableName].primKey, newSchema[tableName].indexes);
    }
  });
}
function deleteRemovedTables(newSchema, idbtrans) {
  [].slice.call(idbtrans.db.objectStoreNames).forEach((storeName) => newSchema[storeName] == null && idbtrans.db.deleteObjectStore(storeName));
}
function addIndex(store, idx) {
  store.createIndex(idx.name, idx.keyPath, { unique: idx.unique, multiEntry: idx.multi });
}
function buildGlobalSchema(db2, idbdb, tmpTrans) {
  const globalSchema = {};
  const dbStoreNames = slice(idbdb.objectStoreNames, 0);
  dbStoreNames.forEach((storeName) => {
    const store = tmpTrans.objectStore(storeName);
    let keyPath = store.keyPath;
    const primKey = createIndexSpec(nameFromKeyPath(keyPath), keyPath || "", false, false, !!store.autoIncrement, keyPath && typeof keyPath !== "string", true);
    const indexes = [];
    for (let j = 0; j < store.indexNames.length; ++j) {
      const idbindex = store.index(store.indexNames[j]);
      keyPath = idbindex.keyPath;
      var index4 = createIndexSpec(idbindex.name, keyPath, !!idbindex.unique, !!idbindex.multiEntry, false, keyPath && typeof keyPath !== "string", false);
      indexes.push(index4);
    }
    globalSchema[storeName] = createTableSchema(storeName, primKey, indexes);
  });
  return globalSchema;
}
function readGlobalSchema({ _novip: db2 }, idbdb, tmpTrans) {
  db2.verno = idbdb.version / 10;
  const globalSchema = db2._dbSchema = buildGlobalSchema(db2, idbdb, tmpTrans);
  db2._storeNames = slice(idbdb.objectStoreNames, 0);
  setApiOnPlace(db2, [db2._allTables], keys(globalSchema), globalSchema);
}
function verifyInstalledSchema(db2, tmpTrans) {
  const installedSchema = buildGlobalSchema(db2, db2.idbdb, tmpTrans);
  const diff = getSchemaDiff(installedSchema, db2._dbSchema);
  return !(diff.add.length || diff.change.some((ch) => ch.add.length || ch.change.length));
}
function adjustToExistingIndexNames({ _novip: db2 }, schema, idbtrans) {
  const storeNames = idbtrans.db.objectStoreNames;
  for (let i = 0; i < storeNames.length; ++i) {
    const storeName = storeNames[i];
    const store = idbtrans.objectStore(storeName);
    db2._hasGetAll = "getAll" in store;
    for (let j = 0; j < store.indexNames.length; ++j) {
      const indexName = store.indexNames[j];
      const keyPath = store.index(indexName).keyPath;
      const dexieName = typeof keyPath === "string" ? keyPath : "[" + slice(keyPath).join("+") + "]";
      if (schema[storeName]) {
        const indexSpec = schema[storeName].idxByName[dexieName];
        if (indexSpec) {
          indexSpec.name = indexName;
          delete schema[storeName].idxByName[dexieName];
          schema[storeName].idxByName[indexName] = indexSpec;
        }
      }
    }
  }
  if (typeof navigator !== "undefined" && /Safari/.test(navigator.userAgent) && !/(Chrome\/|Edge\/)/.test(navigator.userAgent) && _global.WorkerGlobalScope && _global instanceof _global.WorkerGlobalScope && [].concat(navigator.userAgent.match(/Safari\/(\d*)/))[1] < 604) {
    db2._hasGetAll = false;
  }
}
function parseIndexSyntax(primKeyAndIndexes) {
  return primKeyAndIndexes.split(",").map((index4, indexNum) => {
    index4 = index4.trim();
    const name = index4.replace(/([&*]|\+\+)/g, "");
    const keyPath = /^\[/.test(name) ? name.match(/^\[(.*)\]$/)[1].split("+") : name;
    return createIndexSpec(name, keyPath || null, /\&/.test(index4), /\*/.test(index4), /\+\+/.test(index4), isArray(keyPath), indexNum === 0);
  });
}
function createVersionConstructor(db2) {
  return makeClassConstructor(Version.prototype, function Version2(versionNumber) {
    this.db = db2;
    this._cfg = {
      version: versionNumber,
      storesSource: null,
      dbschema: {},
      tables: {},
      contentUpgrade: null
    };
  });
}
function getDbNamesTable(indexedDB2, IDBKeyRange) {
  let dbNamesDB = indexedDB2["_dbNamesDB"];
  if (!dbNamesDB) {
    dbNamesDB = indexedDB2["_dbNamesDB"] = new Dexie$1(DBNAMES_DB, {
      addons: [],
      indexedDB: indexedDB2,
      IDBKeyRange
    });
    dbNamesDB.version(1).stores({ dbnames: "name" });
  }
  return dbNamesDB.table("dbnames");
}
function hasDatabasesNative(indexedDB2) {
  return indexedDB2 && typeof indexedDB2.databases === "function";
}
function getDatabaseNames({ indexedDB: indexedDB2, IDBKeyRange }) {
  return hasDatabasesNative(indexedDB2) ? Promise.resolve(indexedDB2.databases()).then((infos) => infos.map((info) => info.name).filter((name) => name !== DBNAMES_DB)) : getDbNamesTable(indexedDB2, IDBKeyRange).toCollection().primaryKeys();
}
function _onDatabaseCreated({ indexedDB: indexedDB2, IDBKeyRange }, name) {
  !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).put({ name }).catch(nop);
}
function _onDatabaseDeleted({ indexedDB: indexedDB2, IDBKeyRange }, name) {
  !hasDatabasesNative(indexedDB2) && name !== DBNAMES_DB && getDbNamesTable(indexedDB2, IDBKeyRange).delete(name).catch(nop);
}
function vip(fn) {
  return newScope(function() {
    PSD.letThrough = true;
    return fn();
  });
}
function idbReady() {
  var isSafari = !navigator.userAgentData && /Safari\//.test(navigator.userAgent) && !/Chrom(e|ium)\//.test(navigator.userAgent);
  if (!isSafari || !indexedDB.databases)
    return Promise.resolve();
  var intervalId;
  return new Promise(function(resolve) {
    var tryIdb = function() {
      return indexedDB.databases().finally(resolve);
    };
    intervalId = setInterval(tryIdb, 100);
    tryIdb();
  }).finally(function() {
    return clearInterval(intervalId);
  });
}
function dexieOpen(db2) {
  const state = db2._state;
  const { indexedDB: indexedDB2 } = db2._deps;
  if (state.isBeingOpened || db2.idbdb)
    return state.dbReadyPromise.then(() => state.dbOpenError ? rejection(state.dbOpenError) : db2);
  debug && (state.openCanceller._stackHolder = getErrorWithStack());
  state.isBeingOpened = true;
  state.dbOpenError = null;
  state.openComplete = false;
  const openCanceller = state.openCanceller;
  function throwIfCancelled() {
    if (state.openCanceller !== openCanceller)
      throw new exceptions.DatabaseClosed("db.open() was cancelled");
  }
  let resolveDbReady = state.dbReadyResolve, upgradeTransaction = null, wasCreated = false;
  return DexiePromise.race([openCanceller, (typeof navigator === "undefined" ? DexiePromise.resolve() : idbReady()).then(() => new DexiePromise((resolve, reject) => {
    throwIfCancelled();
    if (!indexedDB2)
      throw new exceptions.MissingAPI();
    const dbName = db2.name;
    const req = state.autoSchema ? indexedDB2.open(dbName) : indexedDB2.open(dbName, Math.round(db2.verno * 10));
    if (!req)
      throw new exceptions.MissingAPI();
    req.onerror = eventRejectHandler(reject);
    req.onblocked = wrap(db2._fireOnBlocked);
    req.onupgradeneeded = wrap((e) => {
      upgradeTransaction = req.transaction;
      if (state.autoSchema && !db2._options.allowEmptyDB) {
        req.onerror = preventDefault;
        upgradeTransaction.abort();
        req.result.close();
        const delreq = indexedDB2.deleteDatabase(dbName);
        delreq.onsuccess = delreq.onerror = wrap(() => {
          reject(new exceptions.NoSuchDatabase(`Database ${dbName} doesnt exist`));
        });
      } else {
        upgradeTransaction.onerror = eventRejectHandler(reject);
        var oldVer = e.oldVersion > Math.pow(2, 62) ? 0 : e.oldVersion;
        wasCreated = oldVer < 1;
        db2._novip.idbdb = req.result;
        runUpgraders(db2, oldVer / 10, upgradeTransaction, reject);
      }
    }, reject);
    req.onsuccess = wrap(() => {
      upgradeTransaction = null;
      const idbdb = db2._novip.idbdb = req.result;
      const objectStoreNames = slice(idbdb.objectStoreNames);
      if (objectStoreNames.length > 0)
        try {
          const tmpTrans = idbdb.transaction(safariMultiStoreFix(objectStoreNames), "readonly");
          if (state.autoSchema)
            readGlobalSchema(db2, idbdb, tmpTrans);
          else {
            adjustToExistingIndexNames(db2, db2._dbSchema, tmpTrans);
            if (!verifyInstalledSchema(db2, tmpTrans)) {
              console.warn(`Dexie SchemaDiff: Schema was extended without increasing the number passed to db.version(). Some queries may fail.`);
            }
          }
          generateMiddlewareStacks(db2, tmpTrans);
        } catch (e) {
        }
      connections.push(db2);
      idbdb.onversionchange = wrap((ev) => {
        state.vcFired = true;
        db2.on("versionchange").fire(ev);
      });
      idbdb.onclose = wrap((ev) => {
        db2.on("close").fire(ev);
      });
      if (wasCreated)
        _onDatabaseCreated(db2._deps, dbName);
      resolve();
    }, reject);
  }))]).then(() => {
    throwIfCancelled();
    state.onReadyBeingFired = [];
    return DexiePromise.resolve(vip(() => db2.on.ready.fire(db2.vip))).then(function fireRemainders() {
      if (state.onReadyBeingFired.length > 0) {
        let remainders = state.onReadyBeingFired.reduce(promisableChain, nop);
        state.onReadyBeingFired = [];
        return DexiePromise.resolve(vip(() => remainders(db2.vip))).then(fireRemainders);
      }
    });
  }).finally(() => {
    state.onReadyBeingFired = null;
    state.isBeingOpened = false;
  }).then(() => {
    return db2;
  }).catch((err) => {
    state.dbOpenError = err;
    try {
      upgradeTransaction && upgradeTransaction.abort();
    } catch (_a) {
    }
    if (openCanceller === state.openCanceller) {
      db2._close();
    }
    return rejection(err);
  }).finally(() => {
    state.openComplete = true;
    resolveDbReady();
  });
}
function awaitIterator(iterator) {
  var callNext = (result) => iterator.next(result), doThrow = (error2) => iterator.throw(error2), onSuccess = step(callNext), onError = step(doThrow);
  function step(getNext) {
    return (val) => {
      var next = getNext(val), value = next.value;
      return next.done ? value : !value || typeof value.then !== "function" ? isArray(value) ? Promise.all(value).then(onSuccess, onError) : onSuccess(value) : value.then(onSuccess, onError);
    };
  }
  return step(callNext)();
}
function extractTransactionArgs(mode, _tableArgs_, scopeFunc) {
  var i = arguments.length;
  if (i < 2)
    throw new exceptions.InvalidArgument("Too few arguments");
  var args = new Array(i - 1);
  while (--i)
    args[i - 1] = arguments[i];
  scopeFunc = args.pop();
  var tables = flatten(args);
  return [mode, tables, scopeFunc];
}
function enterTransactionScope(db2, mode, storeNames, parentTransaction, scopeFunc) {
  return DexiePromise.resolve().then(() => {
    const transless = PSD.transless || PSD;
    const trans = db2._createTransaction(mode, storeNames, db2._dbSchema, parentTransaction);
    const zoneProps = {
      trans,
      transless
    };
    if (parentTransaction) {
      trans.idbtrans = parentTransaction.idbtrans;
    } else {
      try {
        trans.create();
        db2._state.PR1398_maxLoop = 3;
      } catch (ex) {
        if (ex.name === errnames.InvalidState && db2.isOpen() && --db2._state.PR1398_maxLoop > 0) {
          console.warn("Dexie: Need to reopen db");
          db2._close();
          return db2.open().then(() => enterTransactionScope(db2, mode, storeNames, null, scopeFunc));
        }
        return rejection(ex);
      }
    }
    const scopeFuncIsAsync = isAsyncFunction(scopeFunc);
    if (scopeFuncIsAsync) {
      incrementExpectedAwaits();
    }
    let returnValue;
    const promiseFollowed = DexiePromise.follow(() => {
      returnValue = scopeFunc.call(trans, trans);
      if (returnValue) {
        if (scopeFuncIsAsync) {
          var decrementor = decrementExpectedAwaits.bind(null, null);
          returnValue.then(decrementor, decrementor);
        } else if (typeof returnValue.next === "function" && typeof returnValue.throw === "function") {
          returnValue = awaitIterator(returnValue);
        }
      }
    }, zoneProps);
    return (returnValue && typeof returnValue.then === "function" ? DexiePromise.resolve(returnValue).then((x) => trans.active ? x : rejection(new exceptions.PrematureCommit("Transaction committed too early. See http://bit.ly/2kdckMn"))) : promiseFollowed.then(() => returnValue)).then((x) => {
      if (parentTransaction)
        trans._resolve();
      return trans._completion.then(() => x);
    }).catch((e) => {
      trans._reject(e);
      return rejection(e);
    });
  });
}
function pad(a, value, count) {
  const result = isArray(a) ? a.slice() : [a];
  for (let i = 0; i < count; ++i)
    result.push(value);
  return result;
}
function createVirtualIndexMiddleware(down) {
  return {
    ...down,
    table(tableName) {
      const table = down.table(tableName);
      const { schema } = table;
      const indexLookup = {};
      const allVirtualIndexes = [];
      function addVirtualIndexes(keyPath, keyTail, lowLevelIndex) {
        const keyPathAlias = getKeyPathAlias(keyPath);
        const indexList = indexLookup[keyPathAlias] = indexLookup[keyPathAlias] || [];
        const keyLength = keyPath == null ? 0 : typeof keyPath === "string" ? 1 : keyPath.length;
        const isVirtual = keyTail > 0;
        const virtualIndex = {
          ...lowLevelIndex,
          isVirtual,
          keyTail,
          keyLength,
          extractKey: getKeyExtractor(keyPath),
          unique: !isVirtual && lowLevelIndex.unique
        };
        indexList.push(virtualIndex);
        if (!virtualIndex.isPrimaryKey) {
          allVirtualIndexes.push(virtualIndex);
        }
        if (keyLength > 1) {
          const virtualKeyPath = keyLength === 2 ? keyPath[0] : keyPath.slice(0, keyLength - 1);
          addVirtualIndexes(virtualKeyPath, keyTail + 1, lowLevelIndex);
        }
        indexList.sort((a, b) => a.keyTail - b.keyTail);
        return virtualIndex;
      }
      const primaryKey = addVirtualIndexes(schema.primaryKey.keyPath, 0, schema.primaryKey);
      indexLookup[":id"] = [primaryKey];
      for (const index4 of schema.indexes) {
        addVirtualIndexes(index4.keyPath, 0, index4);
      }
      function findBestIndex(keyPath) {
        const result2 = indexLookup[getKeyPathAlias(keyPath)];
        return result2 && result2[0];
      }
      function translateRange(range, keyTail) {
        return {
          type: range.type === 1 ? 2 : range.type,
          lower: pad(range.lower, range.lowerOpen ? down.MAX_KEY : down.MIN_KEY, keyTail),
          lowerOpen: true,
          upper: pad(range.upper, range.upperOpen ? down.MIN_KEY : down.MAX_KEY, keyTail),
          upperOpen: true
        };
      }
      function translateRequest(req) {
        const index4 = req.query.index;
        return index4.isVirtual ? {
          ...req,
          query: {
            index: index4,
            range: translateRange(req.query.range, index4.keyTail)
          }
        } : req;
      }
      const result = {
        ...table,
        schema: {
          ...schema,
          primaryKey,
          indexes: allVirtualIndexes,
          getIndexByKeyPath: findBestIndex
        },
        count(req) {
          return table.count(translateRequest(req));
        },
        query(req) {
          return table.query(translateRequest(req));
        },
        openCursor(req) {
          const { keyTail, isVirtual, keyLength } = req.query.index;
          if (!isVirtual)
            return table.openCursor(req);
          function createVirtualCursor(cursor) {
            function _continue(key2) {
              key2 != null ? cursor.continue(pad(key2, req.reverse ? down.MAX_KEY : down.MIN_KEY, keyTail)) : req.unique ? cursor.continue(cursor.key.slice(0, keyLength).concat(req.reverse ? down.MIN_KEY : down.MAX_KEY, keyTail)) : cursor.continue();
            }
            const virtualCursor = Object.create(cursor, {
              continue: { value: _continue },
              continuePrimaryKey: {
                value(key2, primaryKey2) {
                  cursor.continuePrimaryKey(pad(key2, down.MAX_KEY, keyTail), primaryKey2);
                }
              },
              primaryKey: {
                get() {
                  return cursor.primaryKey;
                }
              },
              key: {
                get() {
                  const key2 = cursor.key;
                  return keyLength === 1 ? key2[0] : key2.slice(0, keyLength);
                }
              },
              value: {
                get() {
                  return cursor.value;
                }
              }
            });
            return virtualCursor;
          }
          return table.openCursor(translateRequest(req)).then((cursor) => cursor && createVirtualCursor(cursor));
        }
      };
      return result;
    }
  };
}
function getObjectDiff(a, b, rv, prfx) {
  rv = rv || {};
  prfx = prfx || "";
  keys(a).forEach((prop) => {
    if (!hasOwn(b, prop)) {
      rv[prfx + prop] = void 0;
    } else {
      var ap = a[prop], bp = b[prop];
      if (typeof ap === "object" && typeof bp === "object" && ap && bp) {
        const apTypeName = toStringTag(ap);
        const bpTypeName = toStringTag(bp);
        if (apTypeName !== bpTypeName) {
          rv[prfx + prop] = b[prop];
        } else if (apTypeName === "Object") {
          getObjectDiff(ap, bp, rv, prfx + prop + ".");
        } else if (ap !== bp) {
          rv[prfx + prop] = b[prop];
        }
      } else if (ap !== bp)
        rv[prfx + prop] = b[prop];
    }
  });
  keys(b).forEach((prop) => {
    if (!hasOwn(a, prop)) {
      rv[prfx + prop] = b[prop];
    }
  });
  return rv;
}
function getEffectiveKeys(primaryKey, req) {
  if (req.type === "delete")
    return req.keys;
  return req.keys || req.values.map(primaryKey.extractKey);
}
function getExistingValues(table, req, effectiveKeys) {
  return req.type === "add" ? Promise.resolve([]) : table.getMany({ trans: req.trans, keys: effectiveKeys, cache: "immutable" });
}
function getFromTransactionCache(keys2, cache, clone) {
  try {
    if (!cache)
      return null;
    if (cache.keys.length < keys2.length)
      return null;
    const result = [];
    for (let i = 0, j = 0; i < cache.keys.length && j < keys2.length; ++i) {
      if (cmp(cache.keys[i], keys2[j]) !== 0)
        continue;
      result.push(clone ? deepClone(cache.values[i]) : cache.values[i]);
      ++j;
    }
    return result.length === keys2.length ? result : null;
  } catch (_a) {
    return null;
  }
}
function isEmptyRange(node) {
  return !("from" in node);
}
function addRange(target, from, to) {
  const diff = cmp(from, to);
  if (isNaN(diff))
    return;
  if (diff > 0)
    throw RangeError();
  if (isEmptyRange(target))
    return extend(target, { from, to, d: 1 });
  const left = target.l;
  const right = target.r;
  if (cmp(to, target.from) < 0) {
    left ? addRange(left, from, to) : target.l = { from, to, d: 1, l: null, r: null };
    return rebalance(target);
  }
  if (cmp(from, target.to) > 0) {
    right ? addRange(right, from, to) : target.r = { from, to, d: 1, l: null, r: null };
    return rebalance(target);
  }
  if (cmp(from, target.from) < 0) {
    target.from = from;
    target.l = null;
    target.d = right ? right.d + 1 : 1;
  }
  if (cmp(to, target.to) > 0) {
    target.to = to;
    target.r = null;
    target.d = target.l ? target.l.d + 1 : 1;
  }
  const rightWasCutOff = !target.r;
  if (left && !target.l) {
    mergeRanges(target, left);
  }
  if (right && rightWasCutOff) {
    mergeRanges(target, right);
  }
}
function mergeRanges(target, newSet) {
  function _addRangeSet(target2, { from, to, l, r }) {
    addRange(target2, from, to);
    if (l)
      _addRangeSet(target2, l);
    if (r)
      _addRangeSet(target2, r);
  }
  if (!isEmptyRange(newSet))
    _addRangeSet(target, newSet);
}
function rangesOverlap(rangeSet1, rangeSet2) {
  const i1 = getRangeSetIterator(rangeSet2);
  let nextResult1 = i1.next();
  if (nextResult1.done)
    return false;
  let a = nextResult1.value;
  const i2 = getRangeSetIterator(rangeSet1);
  let nextResult2 = i2.next(a.from);
  let b = nextResult2.value;
  while (!nextResult1.done && !nextResult2.done) {
    if (cmp(b.from, a.to) <= 0 && cmp(b.to, a.from) >= 0)
      return true;
    cmp(a.from, b.from) < 0 ? a = (nextResult1 = i1.next(b.from)).value : b = (nextResult2 = i2.next(a.from)).value;
  }
  return false;
}
function getRangeSetIterator(node) {
  let state = isEmptyRange(node) ? null : { s: 0, n: node };
  return {
    next(key2) {
      const keyProvided = arguments.length > 0;
      while (state) {
        switch (state.s) {
          case 0:
            state.s = 1;
            if (keyProvided) {
              while (state.n.l && cmp(key2, state.n.from) < 0)
                state = { up: state, n: state.n.l, s: 1 };
            } else {
              while (state.n.l)
                state = { up: state, n: state.n.l, s: 1 };
            }
          case 1:
            state.s = 2;
            if (!keyProvided || cmp(key2, state.n.to) <= 0)
              return { value: state.n, done: false };
          case 2:
            if (state.n.r) {
              state.s = 3;
              state = { up: state, n: state.n.r, s: 0 };
              continue;
            }
          case 3:
            state = state.up;
        }
      }
      return { done: true };
    }
  };
}
function rebalance(target) {
  var _a, _b;
  const diff = (((_a = target.r) === null || _a === void 0 ? void 0 : _a.d) || 0) - (((_b = target.l) === null || _b === void 0 ? void 0 : _b.d) || 0);
  const r = diff > 1 ? "r" : diff < -1 ? "l" : "";
  if (r) {
    const l = r === "r" ? "l" : "r";
    const rootClone = { ...target };
    const oldRootRight = target[r];
    target.from = oldRootRight.from;
    target.to = oldRootRight.to;
    target[r] = oldRootRight[r];
    rootClone[r] = oldRootRight[l];
    target[l] = rootClone;
    rootClone.d = computeDepth(rootClone);
  }
  target.d = computeDepth(target);
}
function computeDepth({ r, l }) {
  return (r ? l ? Math.max(r.d, l.d) : r.d : l ? l.d : 0) + 1;
}
function trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs) {
  function addAffectedIndex(ix) {
    const rangeSet = getRangeSet(ix.name || "");
    function extractKey(obj) {
      return obj != null ? ix.extractKey(obj) : null;
    }
    const addKeyOrKeys = (key2) => ix.multiEntry && isArray(key2) ? key2.forEach((key3) => rangeSet.addKey(key3)) : rangeSet.addKey(key2);
    (oldObjs || newObjs).forEach((_, i) => {
      const oldKey = oldObjs && extractKey(oldObjs[i]);
      const newKey = newObjs && extractKey(newObjs[i]);
      if (cmp(oldKey, newKey) !== 0) {
        if (oldKey != null)
          addKeyOrKeys(oldKey);
        if (newKey != null)
          addKeyOrKeys(newKey);
      }
    });
  }
  schema.indexes.forEach(addAffectedIndex);
}
function extendObservabilitySet(target, newSet) {
  keys(newSet).forEach((part) => {
    const rangeSet = target[part] || (target[part] = new RangeSet());
    mergeRanges(rangeSet, newSet[part]);
  });
  return target;
}
function liveQuery(querier) {
  return new Observable((observer) => {
    const scopeFuncIsAsync = isAsyncFunction(querier);
    function execute(subscr) {
      if (scopeFuncIsAsync) {
        incrementExpectedAwaits();
      }
      const exec2 = () => newScope(querier, { subscr, trans: null });
      const rv = PSD.trans ? usePSD(PSD.transless, exec2) : exec2();
      if (scopeFuncIsAsync) {
        rv.then(decrementExpectedAwaits, decrementExpectedAwaits);
      }
      return rv;
    }
    let closed = false;
    let accumMuts = {};
    let currentObs = {};
    const subscription = {
      get closed() {
        return closed;
      },
      unsubscribe: () => {
        closed = true;
        globalEvents.storagemutated.unsubscribe(mutationListener);
      }
    };
    observer.start && observer.start(subscription);
    let querying = false, startedListening = false;
    function shouldNotify() {
      return keys(currentObs).some((key2) => accumMuts[key2] && rangesOverlap(accumMuts[key2], currentObs[key2]));
    }
    const mutationListener = (parts) => {
      extendObservabilitySet(accumMuts, parts);
      if (shouldNotify()) {
        doQuery();
      }
    };
    const doQuery = () => {
      if (querying || closed)
        return;
      accumMuts = {};
      const subscr = {};
      const ret = execute(subscr);
      if (!startedListening) {
        globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, mutationListener);
        startedListening = true;
      }
      querying = true;
      Promise.resolve(ret).then((result) => {
        querying = false;
        if (closed)
          return;
        if (shouldNotify()) {
          doQuery();
        } else {
          accumMuts = {};
          currentObs = subscr;
          observer.next && observer.next(result);
        }
      }, (err) => {
        querying = false;
        observer.error && observer.error(err);
        subscription.unsubscribe();
      });
    };
    doQuery();
    return subscription;
  });
}
function propagateLocally(updateParts) {
  let wasMe = propagatingLocally;
  try {
    propagatingLocally = true;
    globalEvents.storagemutated.fire(updateParts);
  } finally {
    propagatingLocally = wasMe;
  }
}
function propagateMessageLocally({ data }) {
  if (data && data.type === STORAGE_MUTATED_DOM_EVENT_NAME) {
    propagateLocally(data.changedParts);
  }
}
var _global, keys, isArray, getProto, _hasOwn, defineProperty, getOwnPropertyDescriptor, _slice, concat, intrinsicTypeNames, intrinsicTypes, circularRefs, toString, iteratorSymbol, getIteratorOf, NO_CHAR_ARRAY, isAsyncFunction, debug, libraryFilter, NEEDS_THROW_FOR_STACK, dexieErrorNames, idbDomErrorNames, errorList, defaultTexts, errnames, BaseException, exceptions, exceptionMap, fullNameExceptions, INTERNAL, LONG_STACKS_CLIP_LIMIT, MAX_LONG_STACKS, ZONE_ECHO_LIMIT, resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise, nativePromiseThen, NativePromise, patchGlobalPromise, stack_being_generated, schedulePhysicalTick, asap, isOutsideMicroTick, needsNewPhysicalTick, unhandledErrors, rejectingErrors, currentFulfiller, rejectionMapper, globalPSD, PSD, microtickQueue, numScheduledCalls, tickFinalizers, thenProp, task, taskCounter, zoneStack, zoneEchoes, totalEchoes, zone_id_counter, UNHANDLEDREJECTION, rejection, DEXIE_VERSION, maxString, minKey, INVALID_KEY_ARGUMENT, STRING_EXPECTED, connections, isIEOrEdge, hasIEDeleteObjectStoreBug, hangsOnDeleteLargeKeyRange, dexieStackFrameFilter, DBNAMES_DB, READONLY, READWRITE, AnyRange, Table, Collection, deleteCallback, WhereClause, DEXIE_STORAGE_MUTATED_EVENT_NAME, STORAGE_MUTATED_DOM_EVENT_NAME, globalEvents, Transaction, getMaxKey, _id_counter, Version, virtualIndexMiddleware, hooksMiddleware, cacheExistingValuesMiddleware, RangeSet, observabilityMiddleware, Dexie$1, symbolObservable, Observable, domDeps, Dexie, propagatingLocally;
var init_dexie = __esm({
  "node_modules/.pnpm/dexie@3.2.2/node_modules/dexie/dist/modern/dexie.mjs"() {
    _global = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : global;
    keys = Object.keys;
    isArray = Array.isArray;
    if (typeof Promise !== "undefined" && !_global.Promise) {
      _global.Promise = Promise;
    }
    getProto = Object.getPrototypeOf;
    _hasOwn = {}.hasOwnProperty;
    defineProperty = Object.defineProperty;
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    _slice = [].slice;
    concat = [].concat;
    intrinsicTypeNames = "Boolean,String,Date,RegExp,Blob,File,FileList,FileSystemFileHandle,ArrayBuffer,DataView,Uint8ClampedArray,ImageBitmap,ImageData,Map,Set,CryptoKey".split(",").concat(flatten([8, 16, 32, 64].map((num) => ["Int", "Uint", "Float"].map((t) => t + num + "Array")))).filter((t) => _global[t]);
    intrinsicTypes = intrinsicTypeNames.map((t) => _global[t]);
    arrayToObject(intrinsicTypeNames, (x) => [x, true]);
    circularRefs = null;
    ({ toString } = {});
    iteratorSymbol = typeof Symbol !== "undefined" ? Symbol.iterator : "@@iterator";
    getIteratorOf = typeof iteratorSymbol === "symbol" ? function(x) {
      var i;
      return x != null && (i = x[iteratorSymbol]) && i.apply(x);
    } : function() {
      return null;
    };
    NO_CHAR_ARRAY = {};
    isAsyncFunction = typeof Symbol !== "undefined" ? (fn) => fn[Symbol.toStringTag] === "AsyncFunction" : () => false;
    debug = typeof location !== "undefined" && /^(http|https):\/\/(localhost|127\.0\.0\.1)/.test(location.href);
    libraryFilter = () => true;
    NEEDS_THROW_FOR_STACK = !new Error("").stack;
    dexieErrorNames = [
      "Modify",
      "Bulk",
      "OpenFailed",
      "VersionChange",
      "Schema",
      "Upgrade",
      "InvalidTable",
      "MissingAPI",
      "NoSuchDatabase",
      "InvalidArgument",
      "SubTransaction",
      "Unsupported",
      "Internal",
      "DatabaseClosed",
      "PrematureCommit",
      "ForeignAwait"
    ];
    idbDomErrorNames = [
      "Unknown",
      "Constraint",
      "Data",
      "TransactionInactive",
      "ReadOnly",
      "Version",
      "NotFound",
      "InvalidState",
      "InvalidAccess",
      "Abort",
      "Timeout",
      "QuotaExceeded",
      "Syntax",
      "DataClone"
    ];
    errorList = dexieErrorNames.concat(idbDomErrorNames);
    defaultTexts = {
      VersionChanged: "Database version changed by other database connection",
      DatabaseClosed: "Database has been closed",
      Abort: "Transaction aborted",
      TransactionInactive: "Transaction has already completed or failed",
      MissingAPI: "IndexedDB API missing. Please visit https://tinyurl.com/y2uuvskb"
    };
    derive(DexieError).from(Error).extend({
      stack: {
        get: function() {
          return this._stack || (this._stack = this.name + ": " + this.message + prettyStack(this._e, 2));
        }
      },
      toString: function() {
        return this.name + ": " + this.message;
      }
    });
    derive(ModifyError).from(DexieError);
    derive(BulkError).from(DexieError);
    errnames = errorList.reduce((obj, name) => (obj[name] = name + "Error", obj), {});
    BaseException = DexieError;
    exceptions = errorList.reduce((obj, name) => {
      var fullName = name + "Error";
      function DexieError2(msgOrInner, inner) {
        this._e = getErrorWithStack();
        this.name = fullName;
        if (!msgOrInner) {
          this.message = defaultTexts[name] || fullName;
          this.inner = null;
        } else if (typeof msgOrInner === "string") {
          this.message = `${msgOrInner}${!inner ? "" : "\n " + inner}`;
          this.inner = inner || null;
        } else if (typeof msgOrInner === "object") {
          this.message = `${msgOrInner.name} ${msgOrInner.message}`;
          this.inner = msgOrInner;
        }
      }
      derive(DexieError2).from(BaseException);
      obj[name] = DexieError2;
      return obj;
    }, {});
    exceptions.Syntax = SyntaxError;
    exceptions.Type = TypeError;
    exceptions.Range = RangeError;
    exceptionMap = idbDomErrorNames.reduce((obj, name) => {
      obj[name + "Error"] = exceptions[name];
      return obj;
    }, {});
    fullNameExceptions = errorList.reduce((obj, name) => {
      if (["Syntax", "Type", "Range"].indexOf(name) === -1)
        obj[name + "Error"] = exceptions[name];
      return obj;
    }, {});
    fullNameExceptions.ModifyError = ModifyError;
    fullNameExceptions.DexieError = DexieError;
    fullNameExceptions.BulkError = BulkError;
    INTERNAL = {};
    LONG_STACKS_CLIP_LIMIT = 100;
    MAX_LONG_STACKS = 20;
    ZONE_ECHO_LIMIT = 100;
    [resolvedNativePromise, nativePromiseProto, resolvedGlobalPromise] = typeof Promise === "undefined" ? [] : (() => {
      let globalP = Promise.resolve();
      if (typeof crypto === "undefined" || !crypto.subtle)
        return [globalP, getProto(globalP), globalP];
      const nativeP = crypto.subtle.digest("SHA-512", new Uint8Array([0]));
      return [
        nativeP,
        getProto(nativeP),
        globalP
      ];
    })();
    nativePromiseThen = nativePromiseProto && nativePromiseProto.then;
    NativePromise = resolvedNativePromise && resolvedNativePromise.constructor;
    patchGlobalPromise = !!resolvedGlobalPromise;
    stack_being_generated = false;
    schedulePhysicalTick = resolvedGlobalPromise ? () => {
      resolvedGlobalPromise.then(physicalTick);
    } : _global.setImmediate ? setImmediate.bind(null, physicalTick) : _global.MutationObserver ? () => {
      var hiddenDiv = document.createElement("div");
      new MutationObserver(() => {
        physicalTick();
        hiddenDiv = null;
      }).observe(hiddenDiv, { attributes: true });
      hiddenDiv.setAttribute("i", "1");
    } : () => {
      setTimeout(physicalTick, 0);
    };
    asap = function(callback, args) {
      microtickQueue.push([callback, args]);
      if (needsNewPhysicalTick) {
        schedulePhysicalTick();
        needsNewPhysicalTick = false;
      }
    };
    isOutsideMicroTick = true;
    needsNewPhysicalTick = true;
    unhandledErrors = [];
    rejectingErrors = [];
    currentFulfiller = null;
    rejectionMapper = mirror;
    globalPSD = {
      id: "global",
      global: true,
      ref: 0,
      unhandleds: [],
      onunhandled: globalError,
      pgp: false,
      env: {},
      finalize: function() {
        this.unhandleds.forEach((uh) => {
          try {
            globalError(uh[0], uh[1]);
          } catch (e) {
          }
        });
      }
    };
    PSD = globalPSD;
    microtickQueue = [];
    numScheduledCalls = 0;
    tickFinalizers = [];
    thenProp = {
      get: function() {
        var psd = PSD, microTaskId = totalEchoes;
        function then(onFulfilled, onRejected) {
          var possibleAwait = !psd.global && (psd !== PSD || microTaskId !== totalEchoes);
          const cleanup = possibleAwait && !decrementExpectedAwaits();
          var rv = new DexiePromise((resolve, reject) => {
            propagateToListener(this, new Listener(nativeAwaitCompatibleWrap(onFulfilled, psd, possibleAwait, cleanup), nativeAwaitCompatibleWrap(onRejected, psd, possibleAwait, cleanup), resolve, reject, psd));
          });
          debug && linkToPreviousPromise(rv, this);
          return rv;
        }
        then.prototype = INTERNAL;
        return then;
      },
      set: function(value) {
        setProp(this, "then", value && value.prototype === INTERNAL ? thenProp : {
          get: function() {
            return value;
          },
          set: thenProp.set
        });
      }
    };
    props(DexiePromise.prototype, {
      then: thenProp,
      _then: function(onFulfilled, onRejected) {
        propagateToListener(this, new Listener(null, null, onFulfilled, onRejected, PSD));
      },
      catch: function(onRejected) {
        if (arguments.length === 1)
          return this.then(null, onRejected);
        var type2 = arguments[0], handler = arguments[1];
        return typeof type2 === "function" ? this.then(null, (err) => err instanceof type2 ? handler(err) : PromiseReject(err)) : this.then(null, (err) => err && err.name === type2 ? handler(err) : PromiseReject(err));
      },
      finally: function(onFinally) {
        return this.then((value) => {
          onFinally();
          return value;
        }, (err) => {
          onFinally();
          return PromiseReject(err);
        });
      },
      stack: {
        get: function() {
          if (this._stack)
            return this._stack;
          try {
            stack_being_generated = true;
            var stacks = getStack(this, [], MAX_LONG_STACKS);
            var stack = stacks.join("\nFrom previous: ");
            if (this._state !== null)
              this._stack = stack;
            return stack;
          } finally {
            stack_being_generated = false;
          }
        }
      },
      timeout: function(ms, msg) {
        return ms < Infinity ? new DexiePromise((resolve, reject) => {
          var handle = setTimeout(() => reject(new exceptions.Timeout(msg)), ms);
          this.then(resolve, reject).finally(clearTimeout.bind(null, handle));
        }) : this;
      }
    });
    if (typeof Symbol !== "undefined" && Symbol.toStringTag)
      setProp(DexiePromise.prototype, Symbol.toStringTag, "Dexie.Promise");
    globalPSD.env = snapShot();
    props(DexiePromise, {
      all: function() {
        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new DexiePromise(function(resolve, reject) {
          if (values.length === 0)
            resolve([]);
          var remaining = values.length;
          values.forEach((a, i) => DexiePromise.resolve(a).then((x) => {
            values[i] = x;
            if (!--remaining)
              resolve(values);
          }, reject));
        });
      },
      resolve: (value) => {
        if (value instanceof DexiePromise)
          return value;
        if (value && typeof value.then === "function")
          return new DexiePromise((resolve, reject) => {
            value.then(resolve, reject);
          });
        var rv = new DexiePromise(INTERNAL, true, value);
        linkToPreviousPromise(rv, currentFulfiller);
        return rv;
      },
      reject: PromiseReject,
      race: function() {
        var values = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
        return new DexiePromise((resolve, reject) => {
          values.map((value) => DexiePromise.resolve(value).then(resolve, reject));
        });
      },
      PSD: {
        get: () => PSD,
        set: (value) => PSD = value
      },
      totalEchoes: { get: () => totalEchoes },
      newPSD: newScope,
      usePSD,
      scheduler: {
        get: () => asap,
        set: (value) => {
          asap = value;
        }
      },
      rejectionMapper: {
        get: () => rejectionMapper,
        set: (value) => {
          rejectionMapper = value;
        }
      },
      follow: (fn, zoneProps) => {
        return new DexiePromise((resolve, reject) => {
          return newScope((resolve2, reject2) => {
            var psd = PSD;
            psd.unhandleds = [];
            psd.onunhandled = reject2;
            psd.finalize = callBoth(function() {
              run_at_end_of_this_or_next_physical_tick(() => {
                this.unhandleds.length === 0 ? resolve2() : reject2(this.unhandleds[0]);
              });
            }, psd.finalize);
            fn();
          }, zoneProps, resolve, reject);
        });
      }
    });
    if (NativePromise) {
      if (NativePromise.allSettled)
        setProp(DexiePromise, "allSettled", function() {
          const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise((resolve) => {
            if (possiblePromises.length === 0)
              resolve([]);
            let remaining = possiblePromises.length;
            const results = new Array(remaining);
            possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => results[i] = { status: "fulfilled", value }, (reason) => results[i] = { status: "rejected", reason }).then(() => --remaining || resolve(results)));
          });
        });
      if (NativePromise.any && typeof AggregateError !== "undefined")
        setProp(DexiePromise, "any", function() {
          const possiblePromises = getArrayOf.apply(null, arguments).map(onPossibleParallellAsync);
          return new DexiePromise((resolve, reject) => {
            if (possiblePromises.length === 0)
              reject(new AggregateError([]));
            let remaining = possiblePromises.length;
            const failures = new Array(remaining);
            possiblePromises.forEach((p, i) => DexiePromise.resolve(p).then((value) => resolve(value), (failure) => {
              failures[i] = failure;
              if (!--remaining)
                reject(new AggregateError(failures));
            }));
          });
        });
    }
    task = { awaits: 0, echoes: 0, id: 0 };
    taskCounter = 0;
    zoneStack = [];
    zoneEchoes = 0;
    totalEchoes = 0;
    zone_id_counter = 0;
    if (("" + nativePromiseThen).indexOf("[native code]") === -1) {
      incrementExpectedAwaits = decrementExpectedAwaits = nop;
    }
    UNHANDLEDREJECTION = "unhandledrejection";
    rejection = DexiePromise.reject;
    DEXIE_VERSION = "3.2.2";
    maxString = String.fromCharCode(65535);
    minKey = -Infinity;
    INVALID_KEY_ARGUMENT = "Invalid key provided. Keys must be of type string, number, Date or Array<string | number | Date>.";
    STRING_EXPECTED = "String expected.";
    connections = [];
    isIEOrEdge = typeof navigator !== "undefined" && /(MSIE|Trident|Edge)/.test(navigator.userAgent);
    hasIEDeleteObjectStoreBug = isIEOrEdge;
    hangsOnDeleteLargeKeyRange = isIEOrEdge;
    dexieStackFrameFilter = (frame) => !/(dexie\.js|dexie\.min\.js)/.test(frame);
    DBNAMES_DB = "__dbnames";
    READONLY = "readonly";
    READWRITE = "readwrite";
    AnyRange = {
      type: 3,
      lower: -Infinity,
      lowerOpen: false,
      upper: [[]],
      upperOpen: false
    };
    Table = class {
      _trans(mode, fn, writeLocked) {
        const trans = this._tx || PSD.trans;
        const tableName = this.name;
        function checkTableInTransaction(resolve, reject, trans2) {
          if (!trans2.schema[tableName])
            throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
          return fn(trans2.idbtrans, trans2);
        }
        const wasRootExec = beginMicroTickScope();
        try {
          return trans && trans.db === this.db ? trans === PSD.trans ? trans._promise(mode, checkTableInTransaction, writeLocked) : newScope(() => trans._promise(mode, checkTableInTransaction, writeLocked), { trans, transless: PSD.transless || PSD }) : tempTransaction(this.db, mode, [this.name], checkTableInTransaction);
        } finally {
          if (wasRootExec)
            endMicroTickScope();
        }
      }
      get(keyOrCrit, cb) {
        if (keyOrCrit && keyOrCrit.constructor === Object)
          return this.where(keyOrCrit).first(cb);
        return this._trans("readonly", (trans) => {
          return this.core.get({ trans, key: keyOrCrit }).then((res) => this.hook.reading.fire(res));
        }).then(cb);
      }
      where(indexOrCrit) {
        if (typeof indexOrCrit === "string")
          return new this.db.WhereClause(this, indexOrCrit);
        if (isArray(indexOrCrit))
          return new this.db.WhereClause(this, `[${indexOrCrit.join("+")}]`);
        const keyPaths = keys(indexOrCrit);
        if (keyPaths.length === 1)
          return this.where(keyPaths[0]).equals(indexOrCrit[keyPaths[0]]);
        const compoundIndex = this.schema.indexes.concat(this.schema.primKey).filter((ix) => ix.compound && keyPaths.every((keyPath) => ix.keyPath.indexOf(keyPath) >= 0) && ix.keyPath.every((keyPath) => keyPaths.indexOf(keyPath) >= 0))[0];
        if (compoundIndex && this.db._maxKey !== maxString)
          return this.where(compoundIndex.name).equals(compoundIndex.keyPath.map((kp) => indexOrCrit[kp]));
        if (!compoundIndex && debug)
          console.warn(`The query ${JSON.stringify(indexOrCrit)} on ${this.name} would benefit of a compound index [${keyPaths.join("+")}]`);
        const { idxByName } = this.schema;
        const idb = this.db._deps.indexedDB;
        function equals(a, b) {
          try {
            return idb.cmp(a, b) === 0;
          } catch (e) {
            return false;
          }
        }
        const [idx, filterFunction] = keyPaths.reduce(([prevIndex, prevFilterFn], keyPath) => {
          const index4 = idxByName[keyPath];
          const value = indexOrCrit[keyPath];
          return [
            prevIndex || index4,
            prevIndex || !index4 ? combine(prevFilterFn, index4 && index4.multi ? (x) => {
              const prop = getByKeyPath(x, keyPath);
              return isArray(prop) && prop.some((item) => equals(value, item));
            } : (x) => equals(value, getByKeyPath(x, keyPath))) : prevFilterFn
          ];
        }, [null, null]);
        return idx ? this.where(idx.name).equals(indexOrCrit[idx.keyPath]).filter(filterFunction) : compoundIndex ? this.filter(filterFunction) : this.where(keyPaths).equals("");
      }
      filter(filterFunction) {
        return this.toCollection().and(filterFunction);
      }
      count(thenShortcut) {
        return this.toCollection().count(thenShortcut);
      }
      offset(offset) {
        return this.toCollection().offset(offset);
      }
      limit(numRows) {
        return this.toCollection().limit(numRows);
      }
      each(callback) {
        return this.toCollection().each(callback);
      }
      toArray(thenShortcut) {
        return this.toCollection().toArray(thenShortcut);
      }
      toCollection() {
        return new this.db.Collection(new this.db.WhereClause(this));
      }
      orderBy(index4) {
        return new this.db.Collection(new this.db.WhereClause(this, isArray(index4) ? `[${index4.join("+")}]` : index4));
      }
      reverse() {
        return this.toCollection().reverse();
      }
      mapToClass(constructor) {
        this.schema.mappedClass = constructor;
        const readHook = (obj) => {
          if (!obj)
            return obj;
          const res = Object.create(constructor.prototype);
          for (var m in obj)
            if (hasOwn(obj, m))
              try {
                res[m] = obj[m];
              } catch (_) {
              }
          return res;
        };
        if (this.schema.readHook) {
          this.hook.reading.unsubscribe(this.schema.readHook);
        }
        this.schema.readHook = readHook;
        this.hook("reading", readHook);
        return constructor;
      }
      defineClass() {
        function Class(content) {
          extend(this, content);
        }
        return this.mapToClass(Class);
      }
      add(obj, key2) {
        const { auto, keyPath } = this.schema.primKey;
        let objToAdd = obj;
        if (keyPath && auto) {
          objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
        }
        return this._trans("readwrite", (trans) => {
          return this.core.mutate({ trans, type: "add", keys: key2 != null ? [key2] : null, values: [objToAdd] });
        }).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
          if (keyPath) {
            try {
              setByKeyPath(obj, keyPath, lastResult);
            } catch (_) {
            }
          }
          return lastResult;
        });
      }
      update(keyOrObject, modifications) {
        if (typeof keyOrObject === "object" && !isArray(keyOrObject)) {
          const key2 = getByKeyPath(keyOrObject, this.schema.primKey.keyPath);
          if (key2 === void 0)
            return rejection(new exceptions.InvalidArgument("Given object does not contain its primary key"));
          try {
            if (typeof modifications !== "function") {
              keys(modifications).forEach((keyPath) => {
                setByKeyPath(keyOrObject, keyPath, modifications[keyPath]);
              });
            } else {
              modifications(keyOrObject, { value: keyOrObject, primKey: key2 });
            }
          } catch (_a) {
          }
          return this.where(":id").equals(key2).modify(modifications);
        } else {
          return this.where(":id").equals(keyOrObject).modify(modifications);
        }
      }
      put(obj, key2) {
        const { auto, keyPath } = this.schema.primKey;
        let objToAdd = obj;
        if (keyPath && auto) {
          objToAdd = workaroundForUndefinedPrimKey(keyPath)(obj);
        }
        return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "put", values: [objToAdd], keys: key2 != null ? [key2] : null })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : res.lastResult).then((lastResult) => {
          if (keyPath) {
            try {
              setByKeyPath(obj, keyPath, lastResult);
            } catch (_) {
            }
          }
          return lastResult;
        });
      }
      delete(key2) {
        return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "delete", keys: [key2] })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
      }
      clear() {
        return this._trans("readwrite", (trans) => this.core.mutate({ trans, type: "deleteRange", range: AnyRange })).then((res) => res.numFailures ? DexiePromise.reject(res.failures[0]) : void 0);
      }
      bulkGet(keys2) {
        return this._trans("readonly", (trans) => {
          return this.core.getMany({
            keys: keys2,
            trans
          }).then((result) => result.map((res) => this.hook.reading.fire(res)));
        });
      }
      bulkAdd(objects, keysOrOptions, options) {
        const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
        options = options || (keys2 ? void 0 : keysOrOptions);
        const wantResults = options ? options.allKeys : void 0;
        return this._trans("readwrite", (trans) => {
          const { auto, keyPath } = this.schema.primKey;
          if (keyPath && keys2)
            throw new exceptions.InvalidArgument("bulkAdd(): keys argument invalid on tables with inbound keys");
          if (keys2 && keys2.length !== objects.length)
            throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
          const numObjects = objects.length;
          let objectsToAdd = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
          return this.core.mutate({ trans, type: "add", keys: keys2, values: objectsToAdd, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
            const result = wantResults ? results : lastResult;
            if (numFailures === 0)
              return result;
            throw new BulkError(`${this.name}.bulkAdd(): ${numFailures} of ${numObjects} operations failed`, failures);
          });
        });
      }
      bulkPut(objects, keysOrOptions, options) {
        const keys2 = Array.isArray(keysOrOptions) ? keysOrOptions : void 0;
        options = options || (keys2 ? void 0 : keysOrOptions);
        const wantResults = options ? options.allKeys : void 0;
        return this._trans("readwrite", (trans) => {
          const { auto, keyPath } = this.schema.primKey;
          if (keyPath && keys2)
            throw new exceptions.InvalidArgument("bulkPut(): keys argument invalid on tables with inbound keys");
          if (keys2 && keys2.length !== objects.length)
            throw new exceptions.InvalidArgument("Arguments objects and keys must have the same length");
          const numObjects = objects.length;
          let objectsToPut = keyPath && auto ? objects.map(workaroundForUndefinedPrimKey(keyPath)) : objects;
          return this.core.mutate({ trans, type: "put", keys: keys2, values: objectsToPut, wantResults }).then(({ numFailures, results, lastResult, failures }) => {
            const result = wantResults ? results : lastResult;
            if (numFailures === 0)
              return result;
            throw new BulkError(`${this.name}.bulkPut(): ${numFailures} of ${numObjects} operations failed`, failures);
          });
        });
      }
      bulkDelete(keys2) {
        const numKeys = keys2.length;
        return this._trans("readwrite", (trans) => {
          return this.core.mutate({ trans, type: "delete", keys: keys2 });
        }).then(({ numFailures, lastResult, failures }) => {
          if (numFailures === 0)
            return lastResult;
          throw new BulkError(`${this.name}.bulkDelete(): ${numFailures} of ${numKeys} operations failed`, failures);
        });
      }
    };
    Collection = class {
      _read(fn, cb) {
        var ctx = this._ctx;
        return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readonly", fn).then(cb);
      }
      _write(fn) {
        var ctx = this._ctx;
        return ctx.error ? ctx.table._trans(null, rejection.bind(null, ctx.error)) : ctx.table._trans("readwrite", fn, "locked");
      }
      _addAlgorithm(fn) {
        var ctx = this._ctx;
        ctx.algorithm = combine(ctx.algorithm, fn);
      }
      _iterate(fn, coreTrans) {
        return iter(this._ctx, fn, coreTrans, this._ctx.table.core);
      }
      clone(props2) {
        var rv = Object.create(this.constructor.prototype), ctx = Object.create(this._ctx);
        if (props2)
          extend(ctx, props2);
        rv._ctx = ctx;
        return rv;
      }
      raw() {
        this._ctx.valueMapper = null;
        return this;
      }
      each(fn) {
        var ctx = this._ctx;
        return this._read((trans) => iter(ctx, fn, trans, ctx.table.core));
      }
      count(cb) {
        return this._read((trans) => {
          const ctx = this._ctx;
          const coreTable = ctx.table.core;
          if (isPlainKeyRange(ctx, true)) {
            return coreTable.count({
              trans,
              query: {
                index: getIndexOrStore(ctx, coreTable.schema),
                range: ctx.range
              }
            }).then((count2) => Math.min(count2, ctx.limit));
          } else {
            var count = 0;
            return iter(ctx, () => {
              ++count;
              return false;
            }, trans, coreTable).then(() => count);
          }
        }).then(cb);
      }
      sortBy(keyPath, cb) {
        const parts = keyPath.split(".").reverse(), lastPart = parts[0], lastIndex = parts.length - 1;
        function getval(obj, i) {
          if (i)
            return getval(obj[parts[i]], i - 1);
          return obj[lastPart];
        }
        var order = this._ctx.dir === "next" ? 1 : -1;
        function sorter(a, b) {
          var aVal = getval(a, lastIndex), bVal = getval(b, lastIndex);
          return aVal < bVal ? -order : aVal > bVal ? order : 0;
        }
        return this.toArray(function(a) {
          return a.sort(sorter);
        }).then(cb);
      }
      toArray(cb) {
        return this._read((trans) => {
          var ctx = this._ctx;
          if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
            const { valueMapper } = ctx;
            const index4 = getIndexOrStore(ctx, ctx.table.core.schema);
            return ctx.table.core.query({
              trans,
              limit: ctx.limit,
              values: true,
              query: {
                index: index4,
                range: ctx.range
              }
            }).then(({ result }) => valueMapper ? result.map(valueMapper) : result);
          } else {
            const a = [];
            return iter(ctx, (item) => a.push(item), trans, ctx.table.core).then(() => a);
          }
        }, cb);
      }
      offset(offset) {
        var ctx = this._ctx;
        if (offset <= 0)
          return this;
        ctx.offset += offset;
        if (isPlainKeyRange(ctx)) {
          addReplayFilter(ctx, () => {
            var offsetLeft = offset;
            return (cursor, advance) => {
              if (offsetLeft === 0)
                return true;
              if (offsetLeft === 1) {
                --offsetLeft;
                return false;
              }
              advance(() => {
                cursor.advance(offsetLeft);
                offsetLeft = 0;
              });
              return false;
            };
          });
        } else {
          addReplayFilter(ctx, () => {
            var offsetLeft = offset;
            return () => --offsetLeft < 0;
          });
        }
        return this;
      }
      limit(numRows) {
        this._ctx.limit = Math.min(this._ctx.limit, numRows);
        addReplayFilter(this._ctx, () => {
          var rowsLeft = numRows;
          return function(cursor, advance, resolve) {
            if (--rowsLeft <= 0)
              advance(resolve);
            return rowsLeft >= 0;
          };
        }, true);
        return this;
      }
      until(filterFunction, bIncludeStopEntry) {
        addFilter(this._ctx, function(cursor, advance, resolve) {
          if (filterFunction(cursor.value)) {
            advance(resolve);
            return bIncludeStopEntry;
          } else {
            return true;
          }
        });
        return this;
      }
      first(cb) {
        return this.limit(1).toArray(function(a) {
          return a[0];
        }).then(cb);
      }
      last(cb) {
        return this.reverse().first(cb);
      }
      filter(filterFunction) {
        addFilter(this._ctx, function(cursor) {
          return filterFunction(cursor.value);
        });
        addMatchFilter(this._ctx, filterFunction);
        return this;
      }
      and(filter) {
        return this.filter(filter);
      }
      or(indexName) {
        return new this.db.WhereClause(this._ctx.table, indexName, this);
      }
      reverse() {
        this._ctx.dir = this._ctx.dir === "prev" ? "next" : "prev";
        if (this._ondirectionchange)
          this._ondirectionchange(this._ctx.dir);
        return this;
      }
      desc() {
        return this.reverse();
      }
      eachKey(cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function(val, cursor) {
          cb(cursor.key, cursor);
        });
      }
      eachUniqueKey(cb) {
        this._ctx.unique = "unique";
        return this.eachKey(cb);
      }
      eachPrimaryKey(cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        return this.each(function(val, cursor) {
          cb(cursor.primaryKey, cursor);
        });
      }
      keys(cb) {
        var ctx = this._ctx;
        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function(item, cursor) {
          a.push(cursor.key);
        }).then(function() {
          return a;
        }).then(cb);
      }
      primaryKeys(cb) {
        var ctx = this._ctx;
        if (ctx.dir === "next" && isPlainKeyRange(ctx, true) && ctx.limit > 0) {
          return this._read((trans) => {
            var index4 = getIndexOrStore(ctx, ctx.table.core.schema);
            return ctx.table.core.query({
              trans,
              values: false,
              limit: ctx.limit,
              query: {
                index: index4,
                range: ctx.range
              }
            });
          }).then(({ result }) => result).then(cb);
        }
        ctx.keysOnly = !ctx.isMatch;
        var a = [];
        return this.each(function(item, cursor) {
          a.push(cursor.primaryKey);
        }).then(function() {
          return a;
        }).then(cb);
      }
      uniqueKeys(cb) {
        this._ctx.unique = "unique";
        return this.keys(cb);
      }
      firstKey(cb) {
        return this.limit(1).keys(function(a) {
          return a[0];
        }).then(cb);
      }
      lastKey(cb) {
        return this.reverse().firstKey(cb);
      }
      distinct() {
        var ctx = this._ctx, idx = ctx.index && ctx.table.schema.idxByName[ctx.index];
        if (!idx || !idx.multi)
          return this;
        var set = {};
        addFilter(this._ctx, function(cursor) {
          var strKey = cursor.primaryKey.toString();
          var found = hasOwn(set, strKey);
          set[strKey] = true;
          return !found;
        });
        return this;
      }
      modify(changes) {
        var ctx = this._ctx;
        return this._write((trans) => {
          var modifyer;
          if (typeof changes === "function") {
            modifyer = changes;
          } else {
            var keyPaths = keys(changes);
            var numKeys = keyPaths.length;
            modifyer = function(item) {
              var anythingModified = false;
              for (var i = 0; i < numKeys; ++i) {
                var keyPath = keyPaths[i], val = changes[keyPath];
                if (getByKeyPath(item, keyPath) !== val) {
                  setByKeyPath(item, keyPath, val);
                  anythingModified = true;
                }
              }
              return anythingModified;
            };
          }
          const coreTable = ctx.table.core;
          const { outbound, extractKey } = coreTable.schema.primaryKey;
          const limit = this.db._options.modifyChunkSize || 200;
          const totalFailures = [];
          let successCount = 0;
          const failedKeys = [];
          const applyMutateResult = (expectedCount, res) => {
            const { failures, numFailures } = res;
            successCount += expectedCount - numFailures;
            for (let pos of keys(failures)) {
              totalFailures.push(failures[pos]);
            }
          };
          return this.clone().primaryKeys().then((keys2) => {
            const nextChunk = (offset) => {
              const count = Math.min(limit, keys2.length - offset);
              return coreTable.getMany({
                trans,
                keys: keys2.slice(offset, offset + count),
                cache: "immutable"
              }).then((values) => {
                const addValues = [];
                const putValues = [];
                const putKeys = outbound ? [] : null;
                const deleteKeys = [];
                for (let i = 0; i < count; ++i) {
                  const origValue = values[i];
                  const ctx2 = {
                    value: deepClone(origValue),
                    primKey: keys2[offset + i]
                  };
                  if (modifyer.call(ctx2, ctx2.value, ctx2) !== false) {
                    if (ctx2.value == null) {
                      deleteKeys.push(keys2[offset + i]);
                    } else if (!outbound && cmp(extractKey(origValue), extractKey(ctx2.value)) !== 0) {
                      deleteKeys.push(keys2[offset + i]);
                      addValues.push(ctx2.value);
                    } else {
                      putValues.push(ctx2.value);
                      if (outbound)
                        putKeys.push(keys2[offset + i]);
                    }
                  }
                }
                const criteria = isPlainKeyRange(ctx) && ctx.limit === Infinity && (typeof changes !== "function" || changes === deleteCallback) && {
                  index: ctx.index,
                  range: ctx.range
                };
                return Promise.resolve(addValues.length > 0 && coreTable.mutate({ trans, type: "add", values: addValues }).then((res) => {
                  for (let pos in res.failures) {
                    deleteKeys.splice(parseInt(pos), 1);
                  }
                  applyMutateResult(addValues.length, res);
                })).then(() => (putValues.length > 0 || criteria && typeof changes === "object") && coreTable.mutate({
                  trans,
                  type: "put",
                  keys: putKeys,
                  values: putValues,
                  criteria,
                  changeSpec: typeof changes !== "function" && changes
                }).then((res) => applyMutateResult(putValues.length, res))).then(() => (deleteKeys.length > 0 || criteria && changes === deleteCallback) && coreTable.mutate({
                  trans,
                  type: "delete",
                  keys: deleteKeys,
                  criteria
                }).then((res) => applyMutateResult(deleteKeys.length, res))).then(() => {
                  return keys2.length > offset + count && nextChunk(offset + limit);
                });
              });
            };
            return nextChunk(0).then(() => {
              if (totalFailures.length > 0)
                throw new ModifyError("Error modifying one or more objects", totalFailures, successCount, failedKeys);
              return keys2.length;
            });
          });
        });
      }
      delete() {
        var ctx = this._ctx, range = ctx.range;
        if (isPlainKeyRange(ctx) && (ctx.isPrimKey && !hangsOnDeleteLargeKeyRange || range.type === 3)) {
          return this._write((trans) => {
            const { primaryKey } = ctx.table.core.schema;
            const coreRange = range;
            return ctx.table.core.count({ trans, query: { index: primaryKey, range: coreRange } }).then((count) => {
              return ctx.table.core.mutate({ trans, type: "deleteRange", range: coreRange }).then(({ failures, lastResult, results, numFailures }) => {
                if (numFailures)
                  throw new ModifyError("Could not delete some values", Object.keys(failures).map((pos) => failures[pos]), count - numFailures);
                return count - numFailures;
              });
            });
          });
        }
        return this.modify(deleteCallback);
      }
    };
    deleteCallback = (value, ctx) => ctx.value = null;
    WhereClause = class {
      get Collection() {
        return this._ctx.table.db.Collection;
      }
      between(lower, upper, includeLower, includeUpper) {
        includeLower = includeLower !== false;
        includeUpper = includeUpper === true;
        try {
          if (this._cmp(lower, upper) > 0 || this._cmp(lower, upper) === 0 && (includeLower || includeUpper) && !(includeLower && includeUpper))
            return emptyCollection(this);
          return new this.Collection(this, () => createRange(lower, upper, !includeLower, !includeUpper));
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }
      }
      equals(value) {
        if (value == null)
          return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, () => rangeEqual(value));
      }
      above(value) {
        if (value == null)
          return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, () => createRange(value, void 0, true));
      }
      aboveOrEqual(value) {
        if (value == null)
          return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, () => createRange(value, void 0, false));
      }
      below(value) {
        if (value == null)
          return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, () => createRange(void 0, value, false, true));
      }
      belowOrEqual(value) {
        if (value == null)
          return fail(this, INVALID_KEY_ARGUMENT);
        return new this.Collection(this, () => createRange(void 0, value));
      }
      startsWith(str) {
        if (typeof str !== "string")
          return fail(this, STRING_EXPECTED);
        return this.between(str, str + maxString, true, true);
      }
      startsWithIgnoreCase(str) {
        if (str === "")
          return this.startsWith(str);
        return addIgnoreCaseAlgorithm(this, (x, a) => x.indexOf(a[0]) === 0, [str], maxString);
      }
      equalsIgnoreCase(str) {
        return addIgnoreCaseAlgorithm(this, (x, a) => x === a[0], [str], "");
      }
      anyOfIgnoreCase() {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
          return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, (x, a) => a.indexOf(x) !== -1, set, "");
      }
      startsWithAnyOfIgnoreCase() {
        var set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
          return emptyCollection(this);
        return addIgnoreCaseAlgorithm(this, (x, a) => a.some((n) => x.indexOf(n) === 0), set, maxString);
      }
      anyOf() {
        const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        let compare = this._cmp;
        try {
          set.sort(compare);
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }
        if (set.length === 0)
          return emptyCollection(this);
        const c = new this.Collection(this, () => createRange(set[0], set[set.length - 1]));
        c._ondirectionchange = (direction) => {
          compare = direction === "next" ? this._ascending : this._descending;
          set.sort(compare);
        };
        let i = 0;
        c._addAlgorithm((cursor, advance, resolve) => {
          const key2 = cursor.key;
          while (compare(key2, set[i]) > 0) {
            ++i;
            if (i === set.length) {
              advance(resolve);
              return false;
            }
          }
          if (compare(key2, set[i]) === 0) {
            return true;
          } else {
            advance(() => {
              cursor.continue(set[i]);
            });
            return false;
          }
        });
        return c;
      }
      notEqual(value) {
        return this.inAnyRange([[minKey, value], [value, this.db._maxKey]], { includeLowers: false, includeUppers: false });
      }
      noneOf() {
        const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (set.length === 0)
          return new this.Collection(this);
        try {
          set.sort(this._ascending);
        } catch (e) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }
        const ranges = set.reduce((res, val) => res ? res.concat([[res[res.length - 1][1], val]]) : [[minKey, val]], null);
        ranges.push([set[set.length - 1], this.db._maxKey]);
        return this.inAnyRange(ranges, { includeLowers: false, includeUppers: false });
      }
      inAnyRange(ranges, options) {
        const cmp2 = this._cmp, ascending = this._ascending, descending = this._descending, min = this._min, max = this._max;
        if (ranges.length === 0)
          return emptyCollection(this);
        if (!ranges.every((range) => range[0] !== void 0 && range[1] !== void 0 && ascending(range[0], range[1]) <= 0)) {
          return fail(this, "First argument to inAnyRange() must be an Array of two-value Arrays [lower,upper] where upper must not be lower than lower", exceptions.InvalidArgument);
        }
        const includeLowers = !options || options.includeLowers !== false;
        const includeUppers = options && options.includeUppers === true;
        function addRange2(ranges2, newRange) {
          let i = 0, l = ranges2.length;
          for (; i < l; ++i) {
            const range = ranges2[i];
            if (cmp2(newRange[0], range[1]) < 0 && cmp2(newRange[1], range[0]) > 0) {
              range[0] = min(range[0], newRange[0]);
              range[1] = max(range[1], newRange[1]);
              break;
            }
          }
          if (i === l)
            ranges2.push(newRange);
          return ranges2;
        }
        let sortDirection = ascending;
        function rangeSorter(a, b) {
          return sortDirection(a[0], b[0]);
        }
        let set;
        try {
          set = ranges.reduce(addRange2, []);
          set.sort(rangeSorter);
        } catch (ex) {
          return fail(this, INVALID_KEY_ARGUMENT);
        }
        let rangePos = 0;
        const keyIsBeyondCurrentEntry = includeUppers ? (key2) => ascending(key2, set[rangePos][1]) > 0 : (key2) => ascending(key2, set[rangePos][1]) >= 0;
        const keyIsBeforeCurrentEntry = includeLowers ? (key2) => descending(key2, set[rangePos][0]) > 0 : (key2) => descending(key2, set[rangePos][0]) >= 0;
        function keyWithinCurrentRange(key2) {
          return !keyIsBeyondCurrentEntry(key2) && !keyIsBeforeCurrentEntry(key2);
        }
        let checkKey = keyIsBeyondCurrentEntry;
        const c = new this.Collection(this, () => createRange(set[0][0], set[set.length - 1][1], !includeLowers, !includeUppers));
        c._ondirectionchange = (direction) => {
          if (direction === "next") {
            checkKey = keyIsBeyondCurrentEntry;
            sortDirection = ascending;
          } else {
            checkKey = keyIsBeforeCurrentEntry;
            sortDirection = descending;
          }
          set.sort(rangeSorter);
        };
        c._addAlgorithm((cursor, advance, resolve) => {
          var key2 = cursor.key;
          while (checkKey(key2)) {
            ++rangePos;
            if (rangePos === set.length) {
              advance(resolve);
              return false;
            }
          }
          if (keyWithinCurrentRange(key2)) {
            return true;
          } else if (this._cmp(key2, set[rangePos][1]) === 0 || this._cmp(key2, set[rangePos][0]) === 0) {
            return false;
          } else {
            advance(() => {
              if (sortDirection === ascending)
                cursor.continue(set[rangePos][0]);
              else
                cursor.continue(set[rangePos][1]);
            });
            return false;
          }
        });
        return c;
      }
      startsWithAnyOf() {
        const set = getArrayOf.apply(NO_CHAR_ARRAY, arguments);
        if (!set.every((s2) => typeof s2 === "string")) {
          return fail(this, "startsWithAnyOf() only works with strings");
        }
        if (set.length === 0)
          return emptyCollection(this);
        return this.inAnyRange(set.map((str) => [str, str + maxString]));
      }
    };
    DEXIE_STORAGE_MUTATED_EVENT_NAME = "storagemutated";
    STORAGE_MUTATED_DOM_EVENT_NAME = "x-storagemutated-1";
    globalEvents = Events(null, DEXIE_STORAGE_MUTATED_EVENT_NAME);
    Transaction = class {
      _lock() {
        assert(!PSD.global);
        ++this._reculock;
        if (this._reculock === 1 && !PSD.global)
          PSD.lockOwnerFor = this;
        return this;
      }
      _unlock() {
        assert(!PSD.global);
        if (--this._reculock === 0) {
          if (!PSD.global)
            PSD.lockOwnerFor = null;
          while (this._blockedFuncs.length > 0 && !this._locked()) {
            var fnAndPSD = this._blockedFuncs.shift();
            try {
              usePSD(fnAndPSD[1], fnAndPSD[0]);
            } catch (e) {
            }
          }
        }
        return this;
      }
      _locked() {
        return this._reculock && PSD.lockOwnerFor !== this;
      }
      create(idbtrans) {
        if (!this.mode)
          return this;
        const idbdb = this.db.idbdb;
        const dbOpenError = this.db._state.dbOpenError;
        assert(!this.idbtrans);
        if (!idbtrans && !idbdb) {
          switch (dbOpenError && dbOpenError.name) {
            case "DatabaseClosedError":
              throw new exceptions.DatabaseClosed(dbOpenError);
            case "MissingAPIError":
              throw new exceptions.MissingAPI(dbOpenError.message, dbOpenError);
            default:
              throw new exceptions.OpenFailed(dbOpenError);
          }
        }
        if (!this.active)
          throw new exceptions.TransactionInactive();
        assert(this._completion._state === null);
        idbtrans = this.idbtrans = idbtrans || (this.db.core ? this.db.core.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }) : idbdb.transaction(this.storeNames, this.mode, { durability: this.chromeTransactionDurability }));
        idbtrans.onerror = wrap((ev) => {
          preventDefault(ev);
          this._reject(idbtrans.error);
        });
        idbtrans.onabort = wrap((ev) => {
          preventDefault(ev);
          this.active && this._reject(new exceptions.Abort(idbtrans.error));
          this.active = false;
          this.on("abort").fire(ev);
        });
        idbtrans.oncomplete = wrap(() => {
          this.active = false;
          this._resolve();
          if ("mutatedParts" in idbtrans) {
            globalEvents.storagemutated.fire(idbtrans["mutatedParts"]);
          }
        });
        return this;
      }
      _promise(mode, fn, bWriteLock) {
        if (mode === "readwrite" && this.mode !== "readwrite")
          return rejection(new exceptions.ReadOnly("Transaction is readonly"));
        if (!this.active)
          return rejection(new exceptions.TransactionInactive());
        if (this._locked()) {
          return new DexiePromise((resolve, reject) => {
            this._blockedFuncs.push([() => {
              this._promise(mode, fn, bWriteLock).then(resolve, reject);
            }, PSD]);
          });
        } else if (bWriteLock) {
          return newScope(() => {
            var p2 = new DexiePromise((resolve, reject) => {
              this._lock();
              const rv = fn(resolve, reject, this);
              if (rv && rv.then)
                rv.then(resolve, reject);
            });
            p2.finally(() => this._unlock());
            p2._lib = true;
            return p2;
          });
        } else {
          var p = new DexiePromise((resolve, reject) => {
            var rv = fn(resolve, reject, this);
            if (rv && rv.then)
              rv.then(resolve, reject);
          });
          p._lib = true;
          return p;
        }
      }
      _root() {
        return this.parent ? this.parent._root() : this;
      }
      waitFor(promiseLike) {
        var root = this._root();
        const promise = DexiePromise.resolve(promiseLike);
        if (root._waitingFor) {
          root._waitingFor = root._waitingFor.then(() => promise);
        } else {
          root._waitingFor = promise;
          root._waitingQueue = [];
          var store = root.idbtrans.objectStore(root.storeNames[0]);
          (function spin() {
            ++root._spinCount;
            while (root._waitingQueue.length)
              root._waitingQueue.shift()();
            if (root._waitingFor)
              store.get(-Infinity).onsuccess = spin;
          })();
        }
        var currentWaitPromise = root._waitingFor;
        return new DexiePromise((resolve, reject) => {
          promise.then((res) => root._waitingQueue.push(wrap(resolve.bind(null, res))), (err) => root._waitingQueue.push(wrap(reject.bind(null, err)))).finally(() => {
            if (root._waitingFor === currentWaitPromise) {
              root._waitingFor = null;
            }
          });
        });
      }
      abort() {
        if (this.active) {
          this.active = false;
          if (this.idbtrans)
            this.idbtrans.abort();
          this._reject(new exceptions.Abort());
        }
      }
      table(tableName) {
        const memoizedTables = this._memoizedTables || (this._memoizedTables = {});
        if (hasOwn(memoizedTables, tableName))
          return memoizedTables[tableName];
        const tableSchema = this.schema[tableName];
        if (!tableSchema) {
          throw new exceptions.NotFound("Table " + tableName + " not part of transaction");
        }
        const transactionBoundTable = new this.db.Table(tableName, tableSchema, this);
        transactionBoundTable.core = this.db.core.table(tableName);
        memoizedTables[tableName] = transactionBoundTable;
        return transactionBoundTable;
      }
    };
    getMaxKey = (IdbKeyRange) => {
      try {
        IdbKeyRange.only([[]]);
        getMaxKey = () => [[]];
        return [[]];
      } catch (e) {
        getMaxKey = () => maxString;
        return maxString;
      }
    };
    _id_counter = 0;
    Version = class {
      _parseStoresSpec(stores2, outSchema) {
        keys(stores2).forEach((tableName) => {
          if (stores2[tableName] !== null) {
            var indexes = parseIndexSyntax(stores2[tableName]);
            var primKey = indexes.shift();
            if (primKey.multi)
              throw new exceptions.Schema("Primary key cannot be multi-valued");
            indexes.forEach((idx) => {
              if (idx.auto)
                throw new exceptions.Schema("Only primary key can be marked as autoIncrement (++)");
              if (!idx.keyPath)
                throw new exceptions.Schema("Index must have a name and cannot be an empty string");
            });
            outSchema[tableName] = createTableSchema(tableName, primKey, indexes);
          }
        });
      }
      stores(stores2) {
        const db2 = this.db;
        this._cfg.storesSource = this._cfg.storesSource ? extend(this._cfg.storesSource, stores2) : stores2;
        const versions = db2._versions;
        const storesSpec = {};
        let dbschema = {};
        versions.forEach((version) => {
          extend(storesSpec, version._cfg.storesSource);
          dbschema = version._cfg.dbschema = {};
          version._parseStoresSpec(storesSpec, dbschema);
        });
        db2._dbSchema = dbschema;
        removeTablesApi(db2, [db2._allTables, db2, db2.Transaction.prototype]);
        setApiOnPlace(db2, [db2._allTables, db2, db2.Transaction.prototype, this._cfg.tables], keys(dbschema), dbschema);
        db2._storeNames = keys(dbschema);
        return this;
      }
      upgrade(upgradeFunction) {
        this._cfg.contentUpgrade = promisableChain(this._cfg.contentUpgrade || nop, upgradeFunction);
        return this;
      }
    };
    virtualIndexMiddleware = {
      stack: "dbcore",
      name: "VirtualIndexMiddleware",
      level: 1,
      create: createVirtualIndexMiddleware
    };
    hooksMiddleware = {
      stack: "dbcore",
      name: "HooksMiddleware",
      level: 2,
      create: (downCore) => ({
        ...downCore,
        table(tableName) {
          const downTable = downCore.table(tableName);
          const { primaryKey } = downTable.schema;
          const tableMiddleware = {
            ...downTable,
            mutate(req) {
              const dxTrans = PSD.trans;
              const { deleting, creating, updating } = dxTrans.table(tableName).hook;
              switch (req.type) {
                case "add":
                  if (creating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                case "put":
                  if (creating.fire === nop && updating.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                case "delete":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", () => addPutOrDelete(req), true);
                case "deleteRange":
                  if (deleting.fire === nop)
                    break;
                  return dxTrans._promise("readwrite", () => deleteRange(req), true);
              }
              return downTable.mutate(req);
              function addPutOrDelete(req2) {
                const dxTrans2 = PSD.trans;
                const keys2 = req2.keys || getEffectiveKeys(primaryKey, req2);
                if (!keys2)
                  throw new Error("Keys missing");
                req2 = req2.type === "add" || req2.type === "put" ? { ...req2, keys: keys2 } : { ...req2 };
                if (req2.type !== "delete")
                  req2.values = [...req2.values];
                if (req2.keys)
                  req2.keys = [...req2.keys];
                return getExistingValues(downTable, req2, keys2).then((existingValues) => {
                  const contexts = keys2.map((key2, i) => {
                    const existingValue = existingValues[i];
                    const ctx = { onerror: null, onsuccess: null };
                    if (req2.type === "delete") {
                      deleting.fire.call(ctx, key2, existingValue, dxTrans2);
                    } else if (req2.type === "add" || existingValue === void 0) {
                      const generatedPrimaryKey = creating.fire.call(ctx, key2, req2.values[i], dxTrans2);
                      if (key2 == null && generatedPrimaryKey != null) {
                        key2 = generatedPrimaryKey;
                        req2.keys[i] = key2;
                        if (!primaryKey.outbound) {
                          setByKeyPath(req2.values[i], primaryKey.keyPath, key2);
                        }
                      }
                    } else {
                      const objectDiff = getObjectDiff(existingValue, req2.values[i]);
                      const additionalChanges = updating.fire.call(ctx, objectDiff, key2, existingValue, dxTrans2);
                      if (additionalChanges) {
                        const requestedValue = req2.values[i];
                        Object.keys(additionalChanges).forEach((keyPath) => {
                          if (hasOwn(requestedValue, keyPath)) {
                            requestedValue[keyPath] = additionalChanges[keyPath];
                          } else {
                            setByKeyPath(requestedValue, keyPath, additionalChanges[keyPath]);
                          }
                        });
                      }
                    }
                    return ctx;
                  });
                  return downTable.mutate(req2).then(({ failures, results, numFailures, lastResult }) => {
                    for (let i = 0; i < keys2.length; ++i) {
                      const primKey = results ? results[i] : keys2[i];
                      const ctx = contexts[i];
                      if (primKey == null) {
                        ctx.onerror && ctx.onerror(failures[i]);
                      } else {
                        ctx.onsuccess && ctx.onsuccess(
                          req2.type === "put" && existingValues[i] ? req2.values[i] : primKey
                        );
                      }
                    }
                    return { failures, results, numFailures, lastResult };
                  }).catch((error2) => {
                    contexts.forEach((ctx) => ctx.onerror && ctx.onerror(error2));
                    return Promise.reject(error2);
                  });
                });
              }
              function deleteRange(req2) {
                return deleteNextChunk(req2.trans, req2.range, 1e4);
              }
              function deleteNextChunk(trans, range, limit) {
                return downTable.query({ trans, values: false, query: { index: primaryKey, range }, limit }).then(({ result }) => {
                  return addPutOrDelete({ type: "delete", keys: result, trans }).then((res) => {
                    if (res.numFailures > 0)
                      return Promise.reject(res.failures[0]);
                    if (result.length < limit) {
                      return { failures: [], numFailures: 0, lastResult: void 0 };
                    } else {
                      return deleteNextChunk(trans, { ...range, lower: result[result.length - 1], lowerOpen: true }, limit);
                    }
                  });
                });
              }
            }
          };
          return tableMiddleware;
        }
      })
    };
    cacheExistingValuesMiddleware = {
      stack: "dbcore",
      level: -1,
      create: (core) => {
        return {
          table: (tableName) => {
            const table = core.table(tableName);
            return {
              ...table,
              getMany: (req) => {
                if (!req.cache) {
                  return table.getMany(req);
                }
                const cachedResult = getFromTransactionCache(req.keys, req.trans["_cache"], req.cache === "clone");
                if (cachedResult) {
                  return DexiePromise.resolve(cachedResult);
                }
                return table.getMany(req).then((res) => {
                  req.trans["_cache"] = {
                    keys: req.keys,
                    values: req.cache === "clone" ? deepClone(res) : res
                  };
                  return res;
                });
              },
              mutate: (req) => {
                if (req.type !== "add")
                  req.trans["_cache"] = null;
                return table.mutate(req);
              }
            };
          }
        };
      }
    };
    RangeSet = function(fromOrTree, to) {
      if (this) {
        extend(this, arguments.length ? { d: 1, from: fromOrTree, to: arguments.length > 1 ? to : fromOrTree } : { d: 0 });
      } else {
        const rv = new RangeSet();
        if (fromOrTree && "d" in fromOrTree) {
          extend(rv, fromOrTree);
        }
        return rv;
      }
    };
    props(RangeSet.prototype, {
      add(rangeSet) {
        mergeRanges(this, rangeSet);
        return this;
      },
      addKey(key2) {
        addRange(this, key2, key2);
        return this;
      },
      addKeys(keys2) {
        keys2.forEach((key2) => addRange(this, key2, key2));
        return this;
      },
      [iteratorSymbol]() {
        return getRangeSetIterator(this);
      }
    });
    observabilityMiddleware = {
      stack: "dbcore",
      level: 0,
      create: (core) => {
        const dbName = core.schema.name;
        const FULL_RANGE = new RangeSet(core.MIN_KEY, core.MAX_KEY);
        return {
          ...core,
          table: (tableName) => {
            const table = core.table(tableName);
            const { schema } = table;
            const { primaryKey } = schema;
            const { extractKey, outbound } = primaryKey;
            const tableClone = {
              ...table,
              mutate: (req) => {
                const trans = req.trans;
                const mutatedParts = trans.mutatedParts || (trans.mutatedParts = {});
                const getRangeSet = (indexName) => {
                  const part = `idb://${dbName}/${tableName}/${indexName}`;
                  return mutatedParts[part] || (mutatedParts[part] = new RangeSet());
                };
                const pkRangeSet = getRangeSet("");
                const delsRangeSet = getRangeSet(":dels");
                const { type: type2 } = req;
                let [keys2, newObjs] = req.type === "deleteRange" ? [req.range] : req.type === "delete" ? [req.keys] : req.values.length < 50 ? [[], req.values] : [];
                const oldCache = req.trans["_cache"];
                return table.mutate(req).then((res) => {
                  if (isArray(keys2)) {
                    if (type2 !== "delete")
                      keys2 = res.results;
                    pkRangeSet.addKeys(keys2);
                    const oldObjs = getFromTransactionCache(keys2, oldCache);
                    if (!oldObjs && type2 !== "add") {
                      delsRangeSet.addKeys(keys2);
                    }
                    if (oldObjs || newObjs) {
                      trackAffectedIndexes(getRangeSet, schema, oldObjs, newObjs);
                    }
                  } else if (keys2) {
                    const range = { from: keys2.lower, to: keys2.upper };
                    delsRangeSet.add(range);
                    pkRangeSet.add(range);
                  } else {
                    pkRangeSet.add(FULL_RANGE);
                    delsRangeSet.add(FULL_RANGE);
                    schema.indexes.forEach((idx) => getRangeSet(idx.name).add(FULL_RANGE));
                  }
                  return res;
                });
              }
            };
            const getRange = ({ query: { index: index4, range } }) => {
              var _a, _b;
              return [
                index4,
                new RangeSet((_a = range.lower) !== null && _a !== void 0 ? _a : core.MIN_KEY, (_b = range.upper) !== null && _b !== void 0 ? _b : core.MAX_KEY)
              ];
            };
            const readSubscribers = {
              get: (req) => [primaryKey, new RangeSet(req.key)],
              getMany: (req) => [primaryKey, new RangeSet().addKeys(req.keys)],
              count: getRange,
              query: getRange,
              openCursor: getRange
            };
            keys(readSubscribers).forEach((method) => {
              tableClone[method] = function(req) {
                const { subscr } = PSD;
                if (subscr) {
                  const getRangeSet = (indexName) => {
                    const part = `idb://${dbName}/${tableName}/${indexName}`;
                    return subscr[part] || (subscr[part] = new RangeSet());
                  };
                  const pkRangeSet = getRangeSet("");
                  const delsRangeSet = getRangeSet(":dels");
                  const [queriedIndex, queriedRanges] = readSubscribers[method](req);
                  getRangeSet(queriedIndex.name || "").add(queriedRanges);
                  if (!queriedIndex.isPrimaryKey) {
                    if (method === "count") {
                      delsRangeSet.add(FULL_RANGE);
                    } else {
                      const keysPromise = method === "query" && outbound && req.values && table.query({
                        ...req,
                        values: false
                      });
                      return table[method].apply(this, arguments).then((res) => {
                        if (method === "query") {
                          if (outbound && req.values) {
                            return keysPromise.then(({ result: resultingKeys }) => {
                              pkRangeSet.addKeys(resultingKeys);
                              return res;
                            });
                          }
                          const pKeys = req.values ? res.result.map(extractKey) : res.result;
                          if (req.values) {
                            pkRangeSet.addKeys(pKeys);
                          } else {
                            delsRangeSet.addKeys(pKeys);
                          }
                        } else if (method === "openCursor") {
                          const cursor = res;
                          const wantValues = req.values;
                          return cursor && Object.create(cursor, {
                            key: {
                              get() {
                                delsRangeSet.addKey(cursor.primaryKey);
                                return cursor.key;
                              }
                            },
                            primaryKey: {
                              get() {
                                const pkey = cursor.primaryKey;
                                delsRangeSet.addKey(pkey);
                                return pkey;
                              }
                            },
                            value: {
                              get() {
                                wantValues && pkRangeSet.addKey(cursor.primaryKey);
                                return cursor.value;
                              }
                            }
                          });
                        }
                        return res;
                      });
                    }
                  }
                }
                return table[method].apply(this, arguments);
              };
            });
            return tableClone;
          }
        };
      }
    };
    Dexie$1 = class {
      constructor(name, options) {
        this._middlewares = {};
        this.verno = 0;
        const deps = Dexie$1.dependencies;
        this._options = options = {
          addons: Dexie$1.addons,
          autoOpen: true,
          indexedDB: deps.indexedDB,
          IDBKeyRange: deps.IDBKeyRange,
          ...options
        };
        this._deps = {
          indexedDB: options.indexedDB,
          IDBKeyRange: options.IDBKeyRange
        };
        const { addons } = options;
        this._dbSchema = {};
        this._versions = [];
        this._storeNames = [];
        this._allTables = {};
        this.idbdb = null;
        this._novip = this;
        const state = {
          dbOpenError: null,
          isBeingOpened: false,
          onReadyBeingFired: null,
          openComplete: false,
          dbReadyResolve: nop,
          dbReadyPromise: null,
          cancelOpen: nop,
          openCanceller: null,
          autoSchema: true,
          PR1398_maxLoop: 3
        };
        state.dbReadyPromise = new DexiePromise((resolve) => {
          state.dbReadyResolve = resolve;
        });
        state.openCanceller = new DexiePromise((_, reject) => {
          state.cancelOpen = reject;
        });
        this._state = state;
        this.name = name;
        this.on = Events(this, "populate", "blocked", "versionchange", "close", { ready: [promisableChain, nop] });
        this.on.ready.subscribe = override(this.on.ready.subscribe, (subscribe2) => {
          return (subscriber, bSticky) => {
            Dexie$1.vip(() => {
              const state2 = this._state;
              if (state2.openComplete) {
                if (!state2.dbOpenError)
                  DexiePromise.resolve().then(subscriber);
                if (bSticky)
                  subscribe2(subscriber);
              } else if (state2.onReadyBeingFired) {
                state2.onReadyBeingFired.push(subscriber);
                if (bSticky)
                  subscribe2(subscriber);
              } else {
                subscribe2(subscriber);
                const db2 = this;
                if (!bSticky)
                  subscribe2(function unsubscribe() {
                    db2.on.ready.unsubscribe(subscriber);
                    db2.on.ready.unsubscribe(unsubscribe);
                  });
              }
            });
          };
        });
        this.Collection = createCollectionConstructor(this);
        this.Table = createTableConstructor(this);
        this.Transaction = createTransactionConstructor(this);
        this.Version = createVersionConstructor(this);
        this.WhereClause = createWhereClauseConstructor(this);
        this.on("versionchange", (ev) => {
          if (ev.newVersion > 0)
            console.warn(`Another connection wants to upgrade database '${this.name}'. Closing db now to resume the upgrade.`);
          else
            console.warn(`Another connection wants to delete database '${this.name}'. Closing db now to resume the delete request.`);
          this.close();
        });
        this.on("blocked", (ev) => {
          if (!ev.newVersion || ev.newVersion < ev.oldVersion)
            console.warn(`Dexie.delete('${this.name}') was blocked`);
          else
            console.warn(`Upgrade '${this.name}' blocked by other connection holding version ${ev.oldVersion / 10}`);
        });
        this._maxKey = getMaxKey(options.IDBKeyRange);
        this._createTransaction = (mode, storeNames, dbschema, parentTransaction) => new this.Transaction(mode, storeNames, dbschema, this._options.chromeTransactionDurability, parentTransaction);
        this._fireOnBlocked = (ev) => {
          this.on("blocked").fire(ev);
          connections.filter((c) => c.name === this.name && c !== this && !c._state.vcFired).map((c) => c.on("versionchange").fire(ev));
        };
        this.use(virtualIndexMiddleware);
        this.use(hooksMiddleware);
        this.use(observabilityMiddleware);
        this.use(cacheExistingValuesMiddleware);
        this.vip = Object.create(this, { _vip: { value: true } });
        addons.forEach((addon) => addon(this));
      }
      version(versionNumber) {
        if (isNaN(versionNumber) || versionNumber < 0.1)
          throw new exceptions.Type(`Given version is not a positive number`);
        versionNumber = Math.round(versionNumber * 10) / 10;
        if (this.idbdb || this._state.isBeingOpened)
          throw new exceptions.Schema("Cannot add version when database is open");
        this.verno = Math.max(this.verno, versionNumber);
        const versions = this._versions;
        var versionInstance = versions.filter((v) => v._cfg.version === versionNumber)[0];
        if (versionInstance)
          return versionInstance;
        versionInstance = new this.Version(versionNumber);
        versions.push(versionInstance);
        versions.sort(lowerVersionFirst);
        versionInstance.stores({});
        this._state.autoSchema = false;
        return versionInstance;
      }
      _whenReady(fn) {
        return this.idbdb && (this._state.openComplete || PSD.letThrough || this._vip) ? fn() : new DexiePromise((resolve, reject) => {
          if (this._state.openComplete) {
            return reject(new exceptions.DatabaseClosed(this._state.dbOpenError));
          }
          if (!this._state.isBeingOpened) {
            if (!this._options.autoOpen) {
              reject(new exceptions.DatabaseClosed());
              return;
            }
            this.open().catch(nop);
          }
          this._state.dbReadyPromise.then(resolve, reject);
        }).then(fn);
      }
      use({ stack, create, level, name }) {
        if (name)
          this.unuse({ stack, name });
        const middlewares = this._middlewares[stack] || (this._middlewares[stack] = []);
        middlewares.push({ stack, create, level: level == null ? 10 : level, name });
        middlewares.sort((a, b) => a.level - b.level);
        return this;
      }
      unuse({ stack, name, create }) {
        if (stack && this._middlewares[stack]) {
          this._middlewares[stack] = this._middlewares[stack].filter((mw) => create ? mw.create !== create : name ? mw.name !== name : false);
        }
        return this;
      }
      open() {
        return dexieOpen(this);
      }
      _close() {
        const state = this._state;
        const idx = connections.indexOf(this);
        if (idx >= 0)
          connections.splice(idx, 1);
        if (this.idbdb) {
          try {
            this.idbdb.close();
          } catch (e) {
          }
          this._novip.idbdb = null;
        }
        state.dbReadyPromise = new DexiePromise((resolve) => {
          state.dbReadyResolve = resolve;
        });
        state.openCanceller = new DexiePromise((_, reject) => {
          state.cancelOpen = reject;
        });
      }
      close() {
        this._close();
        const state = this._state;
        this._options.autoOpen = false;
        state.dbOpenError = new exceptions.DatabaseClosed();
        if (state.isBeingOpened)
          state.cancelOpen(state.dbOpenError);
      }
      delete() {
        const hasArguments = arguments.length > 0;
        const state = this._state;
        return new DexiePromise((resolve, reject) => {
          const doDelete = () => {
            this.close();
            var req = this._deps.indexedDB.deleteDatabase(this.name);
            req.onsuccess = wrap(() => {
              _onDatabaseDeleted(this._deps, this.name);
              resolve();
            });
            req.onerror = eventRejectHandler(reject);
            req.onblocked = this._fireOnBlocked;
          };
          if (hasArguments)
            throw new exceptions.InvalidArgument("Arguments not allowed in db.delete()");
          if (state.isBeingOpened) {
            state.dbReadyPromise.then(doDelete);
          } else {
            doDelete();
          }
        });
      }
      backendDB() {
        return this.idbdb;
      }
      isOpen() {
        return this.idbdb !== null;
      }
      hasBeenClosed() {
        const dbOpenError = this._state.dbOpenError;
        return dbOpenError && dbOpenError.name === "DatabaseClosed";
      }
      hasFailed() {
        return this._state.dbOpenError !== null;
      }
      dynamicallyOpened() {
        return this._state.autoSchema;
      }
      get tables() {
        return keys(this._allTables).map((name) => this._allTables[name]);
      }
      transaction() {
        const args = extractTransactionArgs.apply(this, arguments);
        return this._transaction.apply(this, args);
      }
      _transaction(mode, tables, scopeFunc) {
        let parentTransaction = PSD.trans;
        if (!parentTransaction || parentTransaction.db !== this || mode.indexOf("!") !== -1)
          parentTransaction = null;
        const onlyIfCompatible = mode.indexOf("?") !== -1;
        mode = mode.replace("!", "").replace("?", "");
        let idbMode, storeNames;
        try {
          storeNames = tables.map((table) => {
            var storeName = table instanceof this.Table ? table.name : table;
            if (typeof storeName !== "string")
              throw new TypeError("Invalid table argument to Dexie.transaction(). Only Table or String are allowed");
            return storeName;
          });
          if (mode == "r" || mode === READONLY)
            idbMode = READONLY;
          else if (mode == "rw" || mode == READWRITE)
            idbMode = READWRITE;
          else
            throw new exceptions.InvalidArgument("Invalid transaction mode: " + mode);
          if (parentTransaction) {
            if (parentTransaction.mode === READONLY && idbMode === READWRITE) {
              if (onlyIfCompatible) {
                parentTransaction = null;
              } else
                throw new exceptions.SubTransaction("Cannot enter a sub-transaction with READWRITE mode when parent transaction is READONLY");
            }
            if (parentTransaction) {
              storeNames.forEach((storeName) => {
                if (parentTransaction && parentTransaction.storeNames.indexOf(storeName) === -1) {
                  if (onlyIfCompatible) {
                    parentTransaction = null;
                  } else
                    throw new exceptions.SubTransaction("Table " + storeName + " not included in parent transaction.");
                }
              });
            }
            if (onlyIfCompatible && parentTransaction && !parentTransaction.active) {
              parentTransaction = null;
            }
          }
        } catch (e) {
          return parentTransaction ? parentTransaction._promise(null, (_, reject) => {
            reject(e);
          }) : rejection(e);
        }
        const enterTransaction = enterTransactionScope.bind(null, this, idbMode, storeNames, parentTransaction, scopeFunc);
        return parentTransaction ? parentTransaction._promise(idbMode, enterTransaction, "lock") : PSD.trans ? usePSD(PSD.transless, () => this._whenReady(enterTransaction)) : this._whenReady(enterTransaction);
      }
      table(tableName) {
        if (!hasOwn(this._allTables, tableName)) {
          throw new exceptions.InvalidTable(`Table ${tableName} does not exist`);
        }
        return this._allTables[tableName];
      }
    };
    symbolObservable = typeof Symbol !== "undefined" && "observable" in Symbol ? Symbol.observable : "@@observable";
    Observable = class {
      constructor(subscribe2) {
        this._subscribe = subscribe2;
      }
      subscribe(x, error2, complete) {
        return this._subscribe(!x || typeof x === "function" ? { next: x, error: error2, complete } : x);
      }
      [symbolObservable]() {
        return this;
      }
    };
    try {
      domDeps = {
        indexedDB: _global.indexedDB || _global.mozIndexedDB || _global.webkitIndexedDB || _global.msIndexedDB,
        IDBKeyRange: _global.IDBKeyRange || _global.webkitIDBKeyRange
      };
    } catch (e) {
      domDeps = { indexedDB: null, IDBKeyRange: null };
    }
    Dexie = Dexie$1;
    props(Dexie, {
      ...fullNameExceptions,
      delete(databaseName) {
        const db2 = new Dexie(databaseName, { addons: [] });
        return db2.delete();
      },
      exists(name) {
        return new Dexie(name, { addons: [] }).open().then((db2) => {
          db2.close();
          return true;
        }).catch("NoSuchDatabaseError", () => false);
      },
      getDatabaseNames(cb) {
        try {
          return getDatabaseNames(Dexie.dependencies).then(cb);
        } catch (_a) {
          return rejection(new exceptions.MissingAPI());
        }
      },
      defineClass() {
        function Class(content) {
          extend(this, content);
        }
        return Class;
      },
      ignoreTransaction(scopeFunc) {
        return PSD.trans ? usePSD(PSD.transless, scopeFunc) : scopeFunc();
      },
      vip,
      async: function(generatorFn) {
        return function() {
          try {
            var rv = awaitIterator(generatorFn.apply(this, arguments));
            if (!rv || typeof rv.then !== "function")
              return DexiePromise.resolve(rv);
            return rv;
          } catch (e) {
            return rejection(e);
          }
        };
      },
      spawn: function(generatorFn, args, thiz) {
        try {
          var rv = awaitIterator(generatorFn.apply(thiz, args || []));
          if (!rv || typeof rv.then !== "function")
            return DexiePromise.resolve(rv);
          return rv;
        } catch (e) {
          return rejection(e);
        }
      },
      currentTransaction: {
        get: () => PSD.trans || null
      },
      waitFor: function(promiseOrFunction, optionalTimeout) {
        const promise = DexiePromise.resolve(typeof promiseOrFunction === "function" ? Dexie.ignoreTransaction(promiseOrFunction) : promiseOrFunction).timeout(optionalTimeout || 6e4);
        return PSD.trans ? PSD.trans.waitFor(promise) : promise;
      },
      Promise: DexiePromise,
      debug: {
        get: () => debug,
        set: (value) => {
          setDebug(value, value === "dexie" ? () => true : dexieStackFrameFilter);
        }
      },
      derive,
      extend,
      props,
      override,
      Events,
      on: globalEvents,
      liveQuery,
      extendObservabilitySet,
      getByKeyPath,
      setByKeyPath,
      delByKeyPath,
      shallowClone,
      deepClone,
      getObjectDiff,
      cmp,
      asap: asap$1,
      minKey,
      addons: [],
      connections,
      errnames,
      dependencies: domDeps,
      semVer: DEXIE_VERSION,
      version: DEXIE_VERSION.split(".").map((n) => parseInt(n)).reduce((p, c, i) => p + c / Math.pow(10, i * 2))
    });
    Dexie.maxKey = getMaxKey(Dexie.dependencies.IDBKeyRange);
    if (typeof dispatchEvent !== "undefined" && typeof addEventListener !== "undefined") {
      globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (updatedParts) => {
        if (!propagatingLocally) {
          let event;
          if (isIEOrEdge) {
            event = document.createEvent("CustomEvent");
            event.initCustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, true, true, updatedParts);
          } else {
            event = new CustomEvent(STORAGE_MUTATED_DOM_EVENT_NAME, {
              detail: updatedParts
            });
          }
          propagatingLocally = true;
          dispatchEvent(event);
          propagatingLocally = false;
        }
      });
      addEventListener(STORAGE_MUTATED_DOM_EVENT_NAME, ({ detail }) => {
        if (!propagatingLocally) {
          propagateLocally(detail);
        }
      });
    }
    propagatingLocally = false;
    if (typeof BroadcastChannel !== "undefined") {
      const bc = new BroadcastChannel(STORAGE_MUTATED_DOM_EVENT_NAME);
      globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
        if (!propagatingLocally) {
          bc.postMessage(changedParts);
        }
      });
      bc.onmessage = (ev) => {
        if (ev.data)
          propagateLocally(ev.data);
      };
    } else if (typeof self !== "undefined" && typeof navigator !== "undefined") {
      globalEvents(DEXIE_STORAGE_MUTATED_EVENT_NAME, (changedParts) => {
        try {
          if (!propagatingLocally) {
            if (typeof localStorage !== "undefined") {
              localStorage.setItem(STORAGE_MUTATED_DOM_EVENT_NAME, JSON.stringify({
                trig: Math.random(),
                changedParts
              }));
            }
            if (typeof self["clients"] === "object") {
              [...self["clients"].matchAll({ includeUncontrolled: true })].forEach((client) => client.postMessage({
                type: STORAGE_MUTATED_DOM_EVENT_NAME,
                changedParts
              }));
            }
          }
        } catch (_a) {
        }
      });
      if (typeof addEventListener !== "undefined") {
        addEventListener("storage", (ev) => {
          if (ev.key === STORAGE_MUTATED_DOM_EVENT_NAME) {
            const data = JSON.parse(ev.newValue);
            if (data)
              propagateLocally(data.changedParts);
          }
        });
      }
      const swContainer = self.document && navigator.serviceWorker;
      if (swContainer) {
        swContainer.addEventListener("message", propagateMessageLocally);
      }
    }
    DexiePromise.rejectionMapper = mapError;
    setDebug(debug, dexieStackFrameFilter);
  }
});

// .svelte-kit/output/server/entries/pages/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => Page
});
function modalService() {
  const { subscribe: subscribe2, set, update } = writable([]);
  return {
    subscribe: subscribe2,
    set,
    update,
    trigger: (modal) => update((mStore) => {
      mStore.push(modal);
      return mStore;
    }),
    close: () => update((mStore) => {
      if (mStore.length > 0)
        mStore.shift();
      return mStore;
    }),
    clear: () => set([])
  };
}
function localStorageStore(key2, initialValue, options) {
  const browser = typeof localStorage != "undefined" && typeof window != "undefined";
  const serializer = options?.serializer || JSON;
  function updateStorage(key22, value) {
    if (!browser)
      return;
    localStorage.setItem(key22, serializer.stringify(value));
  }
  if (!stores[key2]) {
    const store = writable(initialValue, (set2) => {
      const json2 = browser ? localStorage.getItem(key2) : null;
      if (json2) {
        set2(serializer.parse(json2));
      }
      if (browser) {
        const handleStorage = (event) => {
          if (event.key === key2)
            set2(event.newValue ? serializer.parse(event.newValue) : null);
        };
        window.addEventListener("storage", handleStorage);
        return () => window.removeEventListener("storage", handleStorage);
      }
    });
    const { subscribe: subscribe2, set } = store;
    stores[key2] = {
      set(value) {
        updateStorage(key2, value);
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        updateStorage(key2, value);
        set(value);
      },
      subscribe: subscribe2
    };
  }
  return stores[key2];
}
var modalStore, stores, storePrefersDarkScheme, storeLightSwitch, icons, cBase, SvgIcon, cBaseHeading, GradientHeading, cBackdrop, cModalImage, Modal, cTrack, cThumb, cIcon, LightSwitch, BoardName, seedData, MySubClassedDexie, db, Board, Page;
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/_page.svelte.js"() {
    init_chunks();
    init_index2();
    init_dexie();
    modalStore = modalService();
    stores = {};
    storePrefersDarkScheme = localStorageStore("storePrefersDarkScheme", false);
    storeLightSwitch = localStorageStore("storeLightSwitch", void 0);
    icons = {
      image: {
        path: "M447.1 32h-384C28.64 32-.0091 60.65-.0091 96v320c0 35.35 28.65 64 63.1 64h384c35.35 0 64-28.65 64-64V96C511.1 60.65 483.3 32 447.1 32zM111.1 96c26.51 0 48 21.49 48 48S138.5 192 111.1 192s-48-21.49-48-48S85.48 96 111.1 96zM446.1 407.6C443.3 412.8 437.9 416 432 416H82.01c-6.021 0-11.53-3.379-14.26-8.75c-2.73-5.367-2.215-11.81 1.334-16.68l70-96C142.1 290.4 146.9 288 152 288s9.916 2.441 12.93 6.574l32.46 44.51l93.3-139.1C293.7 194.7 298.7 192 304 192s10.35 2.672 13.31 7.125l128 192C448.6 396 448.9 402.3 446.1 407.6z"
      },
      github: {
        path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
      },
      discord: {
        viewBox: "0 0 640 512",
        path: "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
      },
      twitter: {
        path: "M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
      },
      svelte: {
        viewBox: `0 0 513.978 597.129`,
        path: "M179.547 545.729c-63.418-10.114-114.409-57.647-126.738-118.147-6.814-33.436-1.056-69.7 15.357-96.718l3.628-5.972-4.271-9.908c-24.281-56.32-9.106-121.877 36.892-159.376 10.666-8.695 132.771-86.226 145.148-92.162 21.395-10.261 41.161-14.203 66.834-13.328 18.527.631 27.235 2.147 43.648 7.597 51.619 17.139 90.63 60.248 101.124 111.747 6.814 33.436 1.056 69.7-15.357 96.719l-3.628 5.972 4.272 9.907c24.28 56.32 9.105 121.877-36.893 159.376-10.665 8.696-132.77 86.227-145.148 92.163-12.055 5.781-25.266 9.867-39.22 12.13-11.505 1.867-33.943 1.866-45.648 0zm40.107-56.452c8.462-1.864 18.23-5.676 24.437-9.538 35.719-22.223 123.574-78.887 127.592-82.293 12.127-10.28 21.731-25.243 26.045-40.577 3.4-12.09 3.396-31.504-.01-43.495-13.838-48.709-63.665-77.61-112.356-65.171-10.868 2.776-18.714 6.93-45.78 24.232-13.075 8.359-25.352 15.857-27.283 16.664-4.16 1.738-13.889 1.925-18.096.347-17.67-6.628-23.849-28.21-11.645-40.68 5.378-5.494 122.039-79.894 127.75-81.47 9.037-2.496 20.352 1.013 26.744 8.293 4.882 5.56 6.727 10.52 6.695 17.99l-.029 6.446 4.904 1.306c12.307 3.278 34.058 14.246 45.35 22.869 2.72 2.076 5.285 3.775 5.7 3.775 1.288 0 5.255-14.95 6.4-24.12 3.407-27.296-9.063-57.132-31.933-76.408-26.294-22.162-62.304-28-94.067-15.252-6.577 2.64-.2-1.29-74.004 45.59-55.791 35.438-59.99 38.319-68.987 47.332-10.858 10.879-16.752 20.816-20.829 35.118-3.414 11.98-3.41 31.399.01 43.435 13.837 48.71 63.663 77.611 112.355 65.171 10.824-2.765 18.631-6.896 45.876-24.271 13.128-8.373 25.406-15.869 27.283-16.657 4.071-1.71 13.823-1.88 18-.314 17.67 6.628 23.848 28.21 11.644 40.679-5.378 5.494-122.038 79.894-127.749 81.47-9.037 2.496-20.352-1.013-26.744-8.293-4.883-5.56-6.728-10.52-6.695-17.99l.028-6.446-4.904-1.306c-12.306-3.278-34.057-14.246-45.35-22.868-2.72-2.077-5.284-3.776-5.699-3.776-1.288 0-5.255 14.95-6.4 24.121-4.265 34.178 16.128 70.808 48.833 87.712 20.186 10.434 40.992 13.203 62.915 8.375z"
      },
      tailwind: {
        viewBox: `0.15 0.13 799.7 479.69`,
        path: "M400 .13c-106.63 0-173.27 53.3-199.93 159.89 39.99-53.3 86.64-73.28 139.95-59.96 30.42 7.6 52.16 29.67 76.23 54.09 39.2 39.78 84.57 85.82 183.68 85.82 106.62 0 173.27-53.3 199.92-159.9-39.98 53.3-86.63 73.29-139.95 59.97-30.41-7.6-52.15-29.67-76.22-54.09C544.48 46.17 499.1.13 400 .13zM200.07 239.97c-106.62 0-173.27 53.3-199.92 159.9 39.98-53.3 86.63-73.29 139.95-59.96 30.41 7.61 52.15 29.67 76.22 54.08 39.2 39.78 84.58 85.83 183.68 85.83 106.63 0 173.27-53.3 199.93-159.9-39.99 53.3-86.64 73.29-139.95 59.96-30.42-7.59-52.16-29.67-76.23-54.08-39.2-39.78-84.57-85.83-183.68-85.83z"
      },
      astro: {
        viewBox: "0 0 1280 1280",
        path: "M815 95c10 12 15 28 25 61l216 711c-80-42-167-72-259-88L656 303a18 18 0 0 0-35 0L482 779c-92 16-180 46-260 88l217-712c10-32 15-48 25-60 9-11 20-19 32-24 15-6 32-6 66-6h155c34 0 51 0 66 6 12 5 23 13 32 24Zm26 806c-36 30-107 51-189 51-101 0-185-31-208-73-8 24-9 51-9 69 0 0-6 87 55 147 0-31 25-57 56-57 54 0 54 47 54 85v4c0 57 35 107 85 128-7-16-11-33-11-51 0-55 32-76 70-100 29-19 63-40 86-82a155 155 0 0 0 11-121Z"
      },
      linkedin: {
        path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
      },
      npm: {
        viewBox: `0 0 576 512`,
        path: "M288 288h-32v-64h32v64zm288-128v192H288v32H160v-32H0V160h576zm-416 32H32v128h64v-96h32v96h32V192zm160 0H192v160h64v-32h64V192zm224 0H352v128h64v-96h32v96h32v-96h32v96h32V192z"
      },
      "angle-down": {
        viewBox: `0 0 384 512`,
        path: "M192 384c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0L192 306.8l137.4-137.4c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25l-160 160C208.4 380.9 200.2 384 192 384z"
      },
      "copy-button": {
        viewBox: "0 0 512 512",
        path: "M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"
      },
      sun: {
        path: "M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z"
      },
      moon: {
        path: "M32 256c0-123.8 100.3-224 223.8-224c11.36 0 29.7 1.668 40.9 3.746c9.616 1.777 11.75 14.63 3.279 19.44C245 86.5 211.2 144.6 211.2 207.8c0 109.7 99.71 193 208.3 172.3c9.561-1.805 16.28 9.324 10.11 16.95C387.9 448.6 324.8 480 255.8 480C132.1 480 32 379.6 32 256z"
      },
      bars: {
        viewBox: "0 0 576 512",
        path: "M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"
      },
      house: {
        viewBox: "0 0 576 512",
        path: "M575.8 255.5C575.8 273.5 560.8 287.6 543.8 287.6H511.8L512.5 447.7C512.5 450.5 512.3 453.1 512 455.8V472C512 494.1 494.1 512 472 512H456C454.9 512 453.8 511.1 452.7 511.9C451.3 511.1 449.9 512 448.5 512H392C369.9 512 352 494.1 352 472V384C352 366.3 337.7 352 320 352H256C238.3 352 224 366.3 224 384V472C224 494.1 206.1 512 184 512H128.1C126.6 512 125.1 511.9 123.6 511.8C122.4 511.9 121.2 512 120 512H104C81.91 512 64 494.1 64 472V360C64 359.1 64.03 358.1 64.09 357.2V287.6H32.05C14.02 287.6 0 273.5 0 255.5C0 246.5 3.004 238.5 10.01 231.5L266.4 8.016C273.4 1.002 281.4 0 288.4 0C295.4 0 303.4 2.004 309.5 7.014L564.8 231.5C572.8 238.5 576.9 246.5 575.8 255.5L575.8 255.5z"
      },
      "circle-question": {
        path: "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 400c-18 0-32-14-32-32s13.1-32 32-32c17.1 0 32 14 32 32S273.1 400 256 400zM325.1 258L280 286V288c0 13-11 24-24 24S232 301 232 288V272c0-8 4-16 12-21l57-34C308 213 312 206 312 198C312 186 301.1 176 289.1 176h-51.1C225.1 176 216 186 216 198c0 13-11 24-24 24s-24-11-24-24C168 159 199 128 237.1 128h51.1C329 128 360 159 360 198C360 222 347 245 325.1 258z"
      },
      "circle-check": {
        path: "M0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256zM371.8 211.8C382.7 200.9 382.7 183.1 371.8 172.2C360.9 161.3 343.1 161.3 332.2 172.2L224 280.4L179.8 236.2C168.9 225.3 151.1 225.3 140.2 236.2C129.3 247.1 129.3 264.9 140.2 275.8L204.2 339.8C215.1 350.7 232.9 350.7 243.8 339.8L371.8 211.8z"
      },
      heart: {
        path: "M0 190.9V185.1C0 115.2 50.52 55.58 119.4 44.1C164.1 36.51 211.4 51.37 244 84.02L256 96L267.1 84.02C300.6 51.37 347 36.51 392.6 44.1C461.5 55.58 512 115.2 512 185.1V190.9C512 232.4 494.8 272.1 464.4 300.4L283.7 469.1C276.2 476.1 266.3 480 256 480C245.7 480 235.8 476.1 228.3 469.1L47.59 300.4C17.23 272.1 .0003 232.4 .0003 190.9L0 190.9z"
      },
      skull: {
        path: "M416 400V464C416 490.5 394.5 512 368 512H320V464C320 455.2 312.8 448 304 448C295.2 448 288 455.2 288 464V512H224V464C224 455.2 216.8 448 208 448C199.2 448 192 455.2 192 464V512H144C117.5 512 96 490.5 96 464V400C96 399.6 96 399.3 96.01 398.9C37.48 357.8 0 294.7 0 224C0 100.3 114.6 0 256 0C397.4 0 512 100.3 512 224C512 294.7 474.5 357.8 415.1 398.9C415.1 399.3 416 399.6 416 400V400zM160 192C124.7 192 96 220.7 96 256C96 291.3 124.7 320 160 320C195.3 320 224 291.3 224 256C224 220.7 195.3 192 160 192zM352 320C387.3 320 416 291.3 416 256C416 220.7 387.3 192 352 192C316.7 192 288 220.7 288 256C288 291.3 316.7 320 352 320z"
      },
      "align-left": {
        viewBox: "0 0 448 512",
        path: "M256 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H256C273.7 32 288 46.33 288 64C288 81.67 273.7 96 256 96zM256 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H256C273.7 288 288 302.3 288 320C288 337.7 273.7 352 256 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"
      },
      "align-justify": {
        viewBox: "0 0 448 512",
        path: "M416 96H32C14.33 96 0 81.67 0 64C0 46.33 14.33 32 32 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96zM416 352H32C14.33 352 0 337.7 0 320C0 302.3 14.33 288 32 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"
      },
      "align-right": {
        viewBox: "0 0 448 512",
        path: "M416 96H192C174.3 96 160 81.67 160 64C160 46.33 174.3 32 192 32H416C433.7 32 448 46.33 448 64C448 81.67 433.7 96 416 96zM416 352H192C174.3 352 160 337.7 160 320C160 302.3 174.3 288 192 288H416C433.7 288 448 302.3 448 320C448 337.7 433.7 352 416 352zM0 192C0 174.3 14.33 160 32 160H416C433.7 160 448 174.3 448 192C448 209.7 433.7 224 416 224H32C14.33 224 0 209.7 0 192zM416 480H32C14.33 480 0 465.7 0 448C0 430.3 14.33 416 32 416H416C433.7 416 448 430.3 448 448C448 465.7 433.7 480 416 480z"
      },
      book: {
        path: "M448 336v-288C448 21.49 426.5 0 400 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c17.67 0 32-14.33 32-31.1c0-11.72-6.607-21.52-16-27.1v-81.36C441.8 362.8 448 350.2 448 336zM143.1 128h192C344.8 128 352 135.2 352 144C352 152.8 344.8 160 336 160H143.1C135.2 160 128 152.8 128 144C128 135.2 135.2 128 143.1 128zM143.1 192h192C344.8 192 352 199.2 352 208C352 216.8 344.8 224 336 224H143.1C135.2 224 128 216.8 128 208C128 199.2 135.2 192 143.1 192zM384 448H96c-17.67 0-32-14.33-32-32c0-17.67 14.33-32 32-32h288V448z"
      },
      clapperboard: {
        path: "M326.1 160l127.4-127.4C451.7 32.39 449.9 32 448 32h-86.06l-128 128H326.1zM166.1 160l128-128H201.9l-128 128H166.1zM497.7 56.19L393.9 160H512V96C512 80.87 506.5 67.15 497.7 56.19zM134.1 32H64C28.65 32 0 60.65 0 96v64h6.062L134.1 32zM0 416c0 35.35 28.65 64 64 64h384c35.35 0 64-28.65 64-64V192H0V416z"
      },
      tv: {
        viewBox: "0 0 640 512",
        path: "M463.1 32h-416C21.49 32-.0001 53.49-.0001 80v352c0 26.51 21.49 48 47.1 48h416c26.51 0 48-21.49 48-48v-352C511.1 53.49 490.5 32 463.1 32zM111.1 408c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 408zM111.1 280c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM111.1 152c0 4.418-3.582 8-8 8H55.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8L111.1 152zM351.1 400c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V400zM351.1 208c0 8.836-7.164 16-16 16H175.1c-8.836 0-16-7.164-16-16v-96c0-8.838 7.164-16 16-16h160c8.836 0 16 7.162 16 16V208zM463.1 408c0 4.418-3.582 8-8 8h-47.1c-4.418 0-7.1-3.582-7.1-8l0-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V408zM463.1 280c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8v-48c0-4.418 3.582-8 8-8h47.1c4.418 0 8 3.582 8 8V280zM463.1 152c0 4.418-3.582 8-8 8h-47.1c-4.418 0-8-3.582-8-8l0-48c0-4.418 3.582-8 7.1-8h47.1c4.418 0 8 3.582 8 8V152z"
      },
      swatchbook: {
        path: "M0 32C0 14.33 14.33 0 32 0H160C177.7 0 192 14.33 192 32V416C192 469 149 512 96 512C42.98 512 0 469 0 416V32zM128 64H64V128H128V64zM64 256H128V192H64V256zM96 440C109.3 440 120 429.3 120 416C120 402.7 109.3 392 96 392C82.75 392 72 402.7 72 416C72 429.3 82.75 440 96 440zM224 416V154L299.4 78.63C311.9 66.13 332.2 66.13 344.7 78.63L435.2 169.1C447.7 181.6 447.7 201.9 435.2 214.4L223.6 425.9C223.9 422.7 224 419.3 224 416V416zM374.8 320H480C497.7 320 512 334.3 512 352V480C512 497.7 497.7 512 480 512H182.8L374.8 320z"
      },
      screwdriver: {
        path: "M331.8 224.1c28.29 0 54.88 10.99 74.86 30.97l19.59 19.59c40.01-17.74 71.25-53.3 81.62-96.65c5.725-23.92 5.34-47.08 .2148-68.4c-2.613-10.88-16.43-14.51-24.34-6.604l-68.9 68.9h-75.6V97.2l68.9-68.9c7.912-7.912 4.275-21.73-6.604-24.34c-21.32-5.125-44.48-5.51-68.4 .2148c-55.3 13.23-98.39 60.22-107.2 116.4C224.5 128.9 224.2 137 224.3 145l82.78 82.86C315.2 225.1 323.5 224.1 331.8 224.1zM384 278.6c-23.16-23.16-57.57-27.57-85.39-13.9L191.1 158L191.1 95.99l-127.1-95.99L0 63.1l96 127.1l62.04 .0077l106.7 106.6c-13.67 27.82-9.251 62.23 13.91 85.39l117 117.1c14.62 14.5 38.21 14.5 52.71-.0016l52.75-52.75c14.5-14.5 14.5-38.08-.0016-52.71L384 278.6zM227.9 307L168.7 247.9l-148.9 148.9c-26.37 26.37-26.37 69.08 0 95.45C32.96 505.4 50.21 512 67.5 512s34.54-6.592 47.72-19.78l119.1-119.1C225.5 352.3 222.6 329.4 227.9 307zM64 472c-13.25 0-24-10.75-24-24c0-13.26 10.75-24 24-24S88 434.7 88 448C88 461.3 77.25 472 64 472z"
      },
      "pen-ruler": {
        path: "M469.3 19.3l23.4 23.4c25 25 25 65.5 0 90.5l-56.4 56.4L322.3 75.7l56.4-56.4c25-25 65.5-25 90.5 0zM44.9 353.2L299.7 98.3 413.7 212.3 158.8 467.1c-6.7 6.7-15.1 11.6-24.2 14.2l-104 29.7c-8.4 2.4-17.4 .1-23.6-6.1s-8.5-15.2-6.1-23.6l29.7-104c2.6-9.2 7.5-17.5 14.2-24.2zM249.4 103.4L103.4 249.4 16 161.9c-18.7-18.7-18.7-49.1 0-67.9L94.1 16c18.7-18.7 49.1-18.7 67.9 0l19.8 19.8c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1l45.1 45.1zM408.6 262.6l45.1 45.1c-.3 .3-.7 .6-1 .9l-64 64c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l64-64c.3-.3 .6-.7 .9-1L496 350.1c18.7 18.7 18.7 49.1 0 67.9L417.9 496c-18.7 18.7-49.1 18.7-67.9 0l-87.4-87.4L408.6 262.6z"
      },
      keyboard: {
        viewBox: "0 0 576 512",
        path: "M512 64H64C28.65 64 0 92.65 0 128v256c0 35.35 28.65 64 64 64h448c35.35 0 64-28.65 64-64V128C576 92.65 547.3 64 512 64zM528 384c0 8.822-7.178 16-16 16H64c-8.822 0-16-7.178-16-16V128c0-8.822 7.178-16 16-16h448c8.822 0 16 7.178 16 16V384zM140 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 157.3 146.7 152 140 152zM196 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 194.7 189.3 200 196 200zM276 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 194.7 269.3 200 276 200zM356 200h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 194.7 349.3 200 356 200zM460 152h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 157.3 466.7 152 460 152zM140 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C152 237.3 146.7 232 140 232zM196 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C184 274.7 189.3 280 196 280zM276 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C264 274.7 269.3 280 276 280zM356 280h24c6.656 0 12-5.344 12-12v-24c0-6.656-5.344-12-12-12h-24c-6.656 0-12 5.344-12 12v24C344 274.7 349.3 280 356 280zM460 232h-24c-6.656 0-12 5.344-12 12v24c0 6.656 5.344 12 12 12h24c6.656 0 12-5.344 12-12v-24C472 237.3 466.7 232 460 232zM400 320h-224C167.1 320 160 327.1 160 336V352c0 8.875 7.125 16 16 16h224c8.875 0 16-7.125 16-16v-16C416 327.1 408.9 320 400 320z"
      },
      rocket: {
        path: "M156.6 384.9L125.7 354c-8.5-8.5-11.5-20.8-7.7-32.2c3-8.9 7-20.5 11.8-33.8L24 288c-8.6 0-16.6-4.6-20.9-12.1s-4.2-16.7 .2-24.1l52.5-88.5c13-21.9 36.5-35.3 61.9-35.3l82.3 0c2.4-4 4.8-7.7 7.2-11.3C289.1-4.1 411.1-8.1 483.9 5.3c11.6 2.1 20.6 11.2 22.8 22.8c13.4 72.9 9.3 194.8-111.4 276.7c-3.5 2.4-7.3 4.8-11.3 7.2v82.3c0 25.4-13.4 49-35.3 61.9l-88.5 52.5c-7.4 4.4-16.6 4.5-24.1 .2s-12.1-12.2-12.1-20.9V380.8c-14.1 4.9-26.4 8.9-35.7 11.9c-11.2 3.6-23.4 .5-31.8-7.8zM384 168c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40s17.9 40 40 40z"
      },
      copy: {
        viewBox: "0 0 512 512",
        path: "M224 0c-35.3 0-64 28.7-64 64V288c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H224zM64 160c-35.3 0-64 28.7-64 64V448c0 35.3 28.7 64 64 64H288c35.3 0 64-28.7 64-64V384H288v64H64V224h64V160H64z"
      },
      cubes: {
        viewBox: "0 0 576 512",
        path: "M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5V204.7c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7V413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3V294.7c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3V92.5c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2V152.6L392 121v89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4V354.8L256 323.2v95.9l-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1V354.8L528 323.2v90.7c0 3.2-1.9 6-4.8 7.3z"
      },
      search: {
        viewBox: "0 0 512 512",
        path: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"
      }
    };
    cBase = "inline-block outline-none";
    SvgIcon = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classesBase;
      let $$slots = compute_slots(slots);
      let { name = "image" } = $$props;
      let { x = "0px" } = $$props;
      let { y = "0px" } = $$props;
      let { viewBox = icons[name].viewBox || "0 0 512 512" } = $$props;
      let { fill = "fill-current" } = $$props;
      let { width = "w-5" } = $$props;
      let { height = "h-5" } = $$props;
      let { title = "" } = $$props;
      if ($$props.name === void 0 && $$bindings.name && name !== void 0)
        $$bindings.name(name);
      if ($$props.x === void 0 && $$bindings.x && x !== void 0)
        $$bindings.x(x);
      if ($$props.y === void 0 && $$bindings.y && y !== void 0)
        $$bindings.y(y);
      if ($$props.viewBox === void 0 && $$bindings.viewBox && viewBox !== void 0)
        $$bindings.viewBox(viewBox);
      if ($$props.fill === void 0 && $$bindings.fill && fill !== void 0)
        $$bindings.fill(fill);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.title === void 0 && $$bindings.title && title !== void 0)
        $$bindings.title(title);
      classesBase = `${cBase} ${fill} ${width} ${height}`;
      return `
<svg xmlns="${"http://www.w3.org/2000/svg"}"${add_attribute("x", x, 0)}${add_attribute("y", y, 0)}${add_attribute("viewBox", viewBox, 0)} class="${"svg-icon " + escape(classesBase, true) + " " + escape($$props.class ?? "", true)}" focusable="${"false"}" data-testid="${"svg-icon"}">${title ? `<title>${escape(title)}</title>` : ``}${$$slots.default ? `${slots.default ? slots.default({}) : ``}` : `<path${add_attribute("d", icons[name].path, 0)}></path>`}</svg>`;
    });
    cBaseHeading = "bg-clip-text text-transparent box-decoration-clone";
    GradientHeading = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classesBase;
      let clasesText;
      let { tag = "h1" } = $$props;
      let { direction = "bg-gradient-to-r" } = $$props;
      let { from = "from-primary-500" } = $$props;
      let { to = "to-accent-500" } = $$props;
      if ($$props.tag === void 0 && $$bindings.tag && tag !== void 0)
        $$bindings.tag(tag);
      if ($$props.direction === void 0 && $$bindings.direction && direction !== void 0)
        $$bindings.direction(direction);
      if ($$props.from === void 0 && $$bindings.from && from !== void 0)
        $$bindings.from(from);
      if ($$props.to === void 0 && $$bindings.to && to !== void 0)
        $$bindings.to(to);
      classesBase = `${$$props.class ?? ""}`;
      clasesText = `${cBaseHeading} ${direction} ${from} ${to}`;
      return `
${((tag$1) => {
        return tag$1 ? `<${tag} class="${"gradient-heading " + escape(classesBase, true)}" data-testid="${"gradient-heading"}" role="${"heading"}">${is_void(tag$1) ? "" : `<span class="${"gradient-heading-text " + escape(clasesText, true)}">${slots.default ? slots.default({}) : ``}</span>`}${is_void(tag$1) ? "" : `</${tag$1}>`}` : "";
      })(tag)}`;
    });
    cBackdrop = "fixed top-0 left-0 right-0 bottom-0 z-[999] flex justify-center items-center p-4";
    cModalImage = "w-full h-auto";
    Modal = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classesBackdrop;
      let classesModal;
      let parent;
      let $modalStore, $$unsubscribe_modalStore;
      $$unsubscribe_modalStore = subscribe(modalStore, (value) => $modalStore = value);
      let { duration = 150 } = $$props;
      let { background = "bg-surface-100-800-token" } = $$props;
      let { width = "w-full max-w-[640px]" } = $$props;
      let { height = "h-auto" } = $$props;
      let { padding = "p-4" } = $$props;
      let { spacing = "space-y-4" } = $$props;
      let { rounded = "rounded-container-token" } = $$props;
      let { shadow = "shadow-xl" } = $$props;
      let { buttonNeutral = "btn-ghost-surface" } = $$props;
      let { buttonPositive = "btn-filled-primary" } = $$props;
      let { buttonTextCancel = "Cancel" } = $$props;
      let { buttonTextConfirm = "Confirm" } = $$props;
      let { buttonTextSubmit = "Submit" } = $$props;
      let { regionBackdrop = "bg-surface-backdrop-token" } = $$props;
      let { regionHeader = "text-2xl font-bold" } = $$props;
      let { regionBody = "max-h-[200px] overflow-hidden" } = $$props;
      let { regionFooter = "flex justify-end space-x-2" } = $$props;
      let promptValue;
      modalStore.subscribe((dArr) => {
        if (!dArr.length)
          return;
        promptValue = dArr[0].value;
      });
      function onClose() {
        if ($modalStore[0].response)
          $modalStore[0].response(false);
        modalStore.close();
      }
      if ($$props.duration === void 0 && $$bindings.duration && duration !== void 0)
        $$bindings.duration(duration);
      if ($$props.background === void 0 && $$bindings.background && background !== void 0)
        $$bindings.background(background);
      if ($$props.width === void 0 && $$bindings.width && width !== void 0)
        $$bindings.width(width);
      if ($$props.height === void 0 && $$bindings.height && height !== void 0)
        $$bindings.height(height);
      if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
        $$bindings.padding(padding);
      if ($$props.spacing === void 0 && $$bindings.spacing && spacing !== void 0)
        $$bindings.spacing(spacing);
      if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
        $$bindings.rounded(rounded);
      if ($$props.shadow === void 0 && $$bindings.shadow && shadow !== void 0)
        $$bindings.shadow(shadow);
      if ($$props.buttonNeutral === void 0 && $$bindings.buttonNeutral && buttonNeutral !== void 0)
        $$bindings.buttonNeutral(buttonNeutral);
      if ($$props.buttonPositive === void 0 && $$bindings.buttonPositive && buttonPositive !== void 0)
        $$bindings.buttonPositive(buttonPositive);
      if ($$props.buttonTextCancel === void 0 && $$bindings.buttonTextCancel && buttonTextCancel !== void 0)
        $$bindings.buttonTextCancel(buttonTextCancel);
      if ($$props.buttonTextConfirm === void 0 && $$bindings.buttonTextConfirm && buttonTextConfirm !== void 0)
        $$bindings.buttonTextConfirm(buttonTextConfirm);
      if ($$props.buttonTextSubmit === void 0 && $$bindings.buttonTextSubmit && buttonTextSubmit !== void 0)
        $$bindings.buttonTextSubmit(buttonTextSubmit);
      if ($$props.regionBackdrop === void 0 && $$bindings.regionBackdrop && regionBackdrop !== void 0)
        $$bindings.regionBackdrop(regionBackdrop);
      if ($$props.regionHeader === void 0 && $$bindings.regionHeader && regionHeader !== void 0)
        $$bindings.regionHeader(regionHeader);
      if ($$props.regionBody === void 0 && $$bindings.regionBody && regionBody !== void 0)
        $$bindings.regionBody(regionBody);
      if ($$props.regionFooter === void 0 && $$bindings.regionFooter && regionFooter !== void 0)
        $$bindings.regionFooter(regionFooter);
      classesBackdrop = `${cBackdrop} ${regionBackdrop} ${$$props.class || ""}`;
      classesModal = `${background} ${width} ${height} ${padding} ${spacing} ${rounded} ${shadow}`;
      parent = {
        background,
        width,
        height,
        padding,
        spacing,
        rounded,
        shadow,
        buttonNeutral,
        buttonPositive,
        buttonTextCancel,
        buttonTextConfirm,
        buttonTextSubmit,
        regionBackdrop,
        regionHeader,
        regionBody,
        regionFooter,
        onClose
      };
      $$unsubscribe_modalStore();
      return `

${$modalStore.length > 0 ? `
		<div class="${"modal-backdrop " + escape(classesBackdrop, true)}" data-testid="${"modal-backdrop"}">
			<div class="${"modal " + escape(classesModal, true) + " " + escape($modalStore[0].classes, true)}" data-testid="${"modal"}" role="${"dialog"}" aria-modal="${"true"}"${add_attribute("aria-label", $modalStore[0].title, 0)}>
				${$modalStore[0]?.title ? `<header class="${"modal-header " + escape(regionHeader, true)}"><!-- HTML_TAG_START -->${$modalStore[0].title}<!-- HTML_TAG_END --></header>` : ``}
				
				${$modalStore[0]?.body ? `<article class="${"modal-body " + escape(regionBody, true)}"><!-- HTML_TAG_START -->${$modalStore[0].body}<!-- HTML_TAG_END --></article>` : ``}
				
				${$modalStore[0]?.image && typeof $modalStore[0]?.image === "string" ? `<img class="${"modal-image " + escape(cModalImage, true)}"${add_attribute("src", $modalStore[0]?.image, 0)} alt="${"Modal"}">` : ``}
				
				${$modalStore[0].type === "alert" ? `
					<footer class="${"modal-footer " + escape(regionFooter, true)}">
						<button class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button></footer>` : `${$modalStore[0].type === "confirm" ? `
					
					<footer class="${"modal-footer " + escape(regionFooter, true)}"><button class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button>
					<button class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextConfirm)}</button></footer>` : `${$modalStore[0].type === "prompt" ? `
					<input class="${"modal-prompt-input"}" type="${"text"}" required${add_attribute("value", promptValue, 0)}>
					
					<footer class="${"modal-footer " + escape(regionFooter, true)}"><button class="${"btn " + escape(buttonNeutral, true)}">${escape(buttonTextCancel)}</button>
					<button class="${"btn " + escape(buttonPositive, true)}">${escape(buttonTextSubmit)}</button></footer>` : `${$modalStore[0].type === "component" ? `
					
					${validate_component($modalStore[0].component?.ref || missing_component, "svelte:component").$$render($$result, Object.assign($modalStore[0].component?.props, { parent }), {}, {
        default: () => {
          return `<!-- HTML_TAG_START -->${$modalStore[0].component?.slot}<!-- HTML_TAG_END -->`;
        }
      })}` : ``}`}`}`}</div></div>` : ``}`;
    });
    cTrack = "inline-block bg-surface-200-700-token ring-[1px] ring-surface-300-600-token ring-inset w-12 h-6 rounded-full cursor-pointer transition-all duration-[100ms]";
    cThumb = "bg-white dark:bg-black fill-white dark:fill-black w-6 h-6 flex justify-center items-center rounded-full shadow-lg transition-all duration-[100ms] scale-90";
    cIcon = "block w-4 h-4";
    LightSwitch = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let classesPosition;
      let classesBase;
      let classesThumb;
      let $storeLightSwitch, $$unsubscribe_storeLightSwitch;
      let $$unsubscribe_storePrefersDarkScheme;
      $$unsubscribe_storeLightSwitch = subscribe(storeLightSwitch, (value) => $storeLightSwitch = value);
      $$unsubscribe_storePrefersDarkScheme = subscribe(storePrefersDarkScheme, (value) => value);
      classesPosition = $storeLightSwitch ? "translate-x-full" : "translate-x-0";
      classesBase = `${cTrack} ${$$props.class ?? ""}`;
      classesThumb = `${cThumb} ${classesPosition}`;
      $$unsubscribe_storeLightSwitch();
      $$unsubscribe_storePrefersDarkScheme();
      return `



<div class="${"lightswitch " + escape(classesBase, true)}" role="${"switch"}" aria-label="${"Light Switch"}"${add_attribute("aria-checked", $storeLightSwitch, 0)} title="${"Toggle " + escape($storeLightSwitch ? "Light" : "Dark", true) + " Mode"}" tabindex="${"0"}">
	<div class="${"lightswitch-thumb " + escape(classesThumb, true)}">
		${validate_component(SvgIcon, "SvgIcon").$$render(
        $$result,
        {
          name: $storeLightSwitch === false ? "sun" : "moon",
          class: "lightswitch-icon " + cIcon
        },
        {},
        {}
      )}</div></div>`;
    });
    BoardName = /* @__PURE__ */ ((BoardName2) => {
      BoardName2["CONCEPT"] = "concept";
      BoardName2["FACT"] = "fact";
      BoardName2["APPLICATION"] = "application";
      return BoardName2;
    })(BoardName || {});
    seedData = [
      {
        id: "initial",
        name: "Sheet 1",
        boards: [
          { id: 1, name: "concept", items: [] },
          { id: 2, name: "fact", items: [] },
          { id: 3, name: "application", items: [] }
        ]
      }
    ];
    MySubClassedDexie = class extends Dexie$1 {
      constructor() {
        super("wtd");
        __publicField(this, "sheet");
        this.version(1).stores({
          sheet: "++id, &name, boards"
        });
        this.open().then(() => {
          db.sheet.count((count) => {
            if (count === 0) {
              db.sheet.bulkAdd(seedData).then(() => {
                console.log("Data seeded successfully!");
              }).catch((error2) => {
                console.error("Error seeding data:", error2);
              });
            }
          });
        });
      }
    };
    db = new MySubClassedDexie();
    Board = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let { columnItems } = $$props;
      function colorBasedOnColumn(columName) {
        switch (columName) {
          case BoardName.CONCEPT:
            return "btn-filled-primary";
          case BoardName.FACT:
            return "btn-filled-accent";
          case BoardName.APPLICATION:
            return "btn-filled-tertiary";
        }
      }
      if ($$props.columnItems === void 0 && $$bindings.columnItems && columnItems !== void 0)
        $$bindings.columnItems(columnItems);
      return `<section class="${"relative h-[90vh] max-h-full min-h-[90vh] p-2 sm:grid sm:grid-cols-3"}">${each(columnItems, (column) => {
        return `<div class="${"card-glass rounded-container-token h-[33%] sm:h-full"}"><h1 class="${"absolute text-4xl px-4 py-2 bottom-0 right-0 text-surface-400-500-token"}">${escape(column.name)}</h1>

			<div class="${"rounded-container-token space-x-1 space-y-1 ring-outline-token w-inherit h-full min-h-full overflow-auto "}">${each(column.items, (item) => {
          return `<div class="${"btn p-2 transition-colors " + escape(colorBasedOnColumn(column.name), true)}">${escape(item.title)}
					</div>`;
        })}</div>
		</div>`;
      })}</section>`;
    });
    Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
      let sheet;
      let sheetValue;
      let boards;
      let $sheet, $$unsubscribe_sheet = noop, $$subscribe_sheet = () => ($$unsubscribe_sheet(), $$unsubscribe_sheet = subscribe(sheet, ($$value) => $sheet = $$value), sheet);
      $$subscribe_sheet(sheet = liveQuery(() => ({})));
      sheetValue = $sheet;
      boards = sheetValue?.boards;
      $$unsubscribe_sheet();
      return `${validate_component(Modal, "Modal").$$render($$result, {}, {}, {})}

<header class="${"flex items-center justify-between p-2 "}">${validate_component(LightSwitch, "LightSwitch").$$render($$result, {}, {}, {})}

	<div><button class="${"btn-icon"}">+</button>
		<button class="${"btn-icon"}">\u{1F9F9}</button></div>

	${validate_component(GradientHeading, "GradientHeading").$$render(
        $$result,
        {
          tag: "h1",
          direction: "bg-gradient-to-r",
          from: "from-primary-300",
          to: "to-accent-200"
        },
        {},
        {
          default: () => {
            return `3what`;
          }
        }
      )}</header>

<main>${boards ? `${validate_component(Board, "Board").$$render($$result, { columnItems: boards }, {}, {})}` : ``}</main>

<footer class="${"absolute text-accent-600-300-token bottom-0 text-xs p-1"}">by
	<a href="${"https://github.com/leovoon/3what"}">leovoon</a></footer>`;
    });
  }
});

// .svelte-kit/output/server/nodes/2.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  file: () => file3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component3, file3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/2.js"() {
    index3 = 2;
    component3 = async () => (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default;
    file3 = "_app/immutable/components/pages/_page.svelte-0083ddcf.js";
    imports3 = ["_app/immutable/components/pages/_page.svelte-0083ddcf.js", "_app/immutable/chunks/index-d1a17515.js", "_app/immutable/chunks/singletons-e12b43fd.js"];
    stylesheets3 = ["_app/immutable/assets/_page-a008cc9e.css"];
    fonts3 = [];
  }
});

// .svelte-kit/output/server/index.js
init_chunks();
init_index2();
function afterUpdate() {
}
var DEV = false;
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores: stores2 } = $$props;
  let { page: page2 } = $$props;
  let { components } = $$props;
  let { form } = $$props;
  let { data_0 = null } = $$props;
  let { data_1 = null } = $$props;
  {
    setContext("__svelte__", stores2);
  }
  afterUpdate(stores2.page.notify);
  if ($$props.stores === void 0 && $$bindings.stores && stores2 !== void 0)
    $$bindings.stores(stores2);
  if ($$props.page === void 0 && $$bindings.page && page2 !== void 0)
    $$bindings.page(page2);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.form === void 0 && $$bindings.form && form !== void 0)
    $$bindings.form(form);
  if ($$props.data_0 === void 0 && $$bindings.data_0 && data_0 !== void 0)
    $$bindings.data_0(data_0);
  if ($$props.data_1 === void 0 && $$bindings.data_1 && data_1 !== void 0)
    $$bindings.data_1(data_1);
  {
    stores2.page.set(page2);
  }
  return `


${components[1] ? `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0 }, {}, {
    default: () => {
      return `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, { data: data_1, form }, {}, {})}`;
    }
  })}` : `${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, { data: data_0, form }, {}, {})}`}

${``}`;
});
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type2, subtype, q = "1"] = match;
      parts.push({ type: type2, subtype, q: +q, i });
    }
  });
  parts.sort((a, b) => {
    if (a.q !== b.q) {
      return b.q - a.q;
    }
    if (a.subtype === "*" !== (b.subtype === "*")) {
      return a.subtype === "*" ? 1 : -1;
    }
    if (a.type === "*" !== (b.type === "*")) {
      return a.type === "*" ? 1 : -1;
    }
    return a.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type2, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type2 || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type2 = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type2);
}
function is_form_content_type(request) {
  return is_content_type(request, "application/x-www-form-urlencoded", "multipart/form-data");
}
var HttpError = class {
  constructor(status, body) {
    this.status = status;
    if (typeof body === "string") {
      this.body = { message: body };
    } else if (body) {
      this.body = body;
    } else {
      this.body = { message: `Error: ${status}` };
    }
  }
  toString() {
    return JSON.stringify(this.body);
  }
};
var Redirect = class {
  constructor(status, location2) {
    this.status = status;
    this.location = location2;
  }
};
var ActionFailure = class {
  constructor(status, data) {
    this.status = status;
    this.data = data;
  }
};
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\u0000",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var DevalueError = class extends Error {
  constructor(message, keys2) {
    super(message);
    this.name = "DevalueError";
    this.path = keys2.join("");
  }
};
function is_primitive(thing) {
  return Object(thing) !== thing;
}
var object_proto_names$1 = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names$1;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function stringify_string(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
var chars$1 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafe_chars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var object_proto_names = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function uneval(value) {
  const counts = /* @__PURE__ */ new Map();
  const keys2 = [];
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys2);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i) => {
            keys2.push(`[${i}]`);
            walk(value2);
            keys2.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys2.push(
              `.get(${is_primitive(key2) ? stringify_primitive$1(key2) : "..."})`
            );
            walk(value2);
            keys2.pop();
          }
          break;
        default:
          const proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== object_proto_names) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys2
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys2
            );
          }
          for (const key2 in thing) {
            keys2.push(`.${key2}`);
            walk(thing[key2]);
            keys2.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a, b) => b[1] - a[1]).forEach((entry, i) => {
    names.set(entry[0], get_name(i));
  });
  function stringify2(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive$1(thing);
    }
    const type2 = get_type(thing);
    switch (type2) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify2(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = thing.map(
          (v, i) => i in thing ? stringify2(v) : ""
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type2}([${Array.from(thing).map(stringify2).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify2(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify2(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (is_primitive(thing)) {
        values.push(stringify_primitive$1(thing));
        return;
      }
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify2(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i) => {
            statements.push(`${name}[${i}]=${stringify2(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify2(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify2(k)}, ${stringify2(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify2(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars$1[num % chars$1.length] + name;
    num = ~~(num / chars$1.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive$1(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var UNDEFINED = -1;
var HOLE = -2;
var NAN = -3;
var POSITIVE_INFINITY = -4;
var NEGATIVE_INFINITY = -5;
var NEGATIVE_ZERO = -6;
function stringify(value) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const keys2 = [];
  let p = 0;
  function flatten2(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys2);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p++;
    indexes.set(thing, index22);
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive(thing);
    } else {
      const type2 = get_type(thing);
      switch (type2) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source)},"${flags}"]` : `["RegExp",${stringify_string(source)}]`;
          break;
        case "Array":
          str = "[";
          for (let i = 0; i < thing.length; i += 1) {
            if (i > 0)
              str += ",";
            if (i in thing) {
              keys2.push(`[${i}]`);
              str += flatten2(thing[i]);
              keys2.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten2(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys2.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            str += `,${flatten2(key2)},${flatten2(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys2
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys2
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys2.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten2(thing[key2])}`;
              keys2.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys2.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten2(thing[key2])}`;
              keys2.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index4 = flatten2(value);
  if (index4 < 0)
    return `${index4}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
  const type2 = typeof thing;
  if (type2 === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type2 === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
function coalesce_to_error(err) {
  return err instanceof Error || err && err.name && err.message ? err : new Error(JSON.stringify(err));
}
function normalize_error(error2) {
  return error2;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
var tracked_url_properties = ["href", "pathname", "search", "searchParams", "toString", "toJSON"];
function make_trackable(url, callback) {
  const tracked = new URL(url);
  for (const property of tracked_url_properties) {
    let value = tracked[property];
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return value;
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  disable_hash(tracked);
  return tracked;
}
function disable_hash(url) {
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
var DATA_SUFFIX = "/__data.json";
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  return pathname.slice(0, -DATA_SUFFIX.length);
}
var GENERIC_ERROR = {
  id: "__error"
};
function method_not_allowed(mod, method) {
  return new Response(`${method} method not allowed`, {
    status: 405,
    headers: {
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = [];
  for (const method in ["GET", "POST", "PUT", "PATCH", "DELETE"]) {
    if (method in mod)
      allowed.push(method);
  }
  if (mod.GET || mod.HEAD)
    allowed.push("HEAD");
  return allowed;
}
function get_option(nodes, option) {
  return nodes.reduce((value, node) => {
    return node?.universal?.[option] ?? node?.server?.[option] ?? value;
  }, void 0);
}
function static_error_page(options, status, message) {
  return new Response(options.error_template({ status, message }), {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options, error2) {
  error2 = error2 instanceof HttpError ? error2 : coalesce_to_error(error2);
  const status = error2 instanceof HttpError ? error2.status : 500;
  const body = await handle_error_and_jsonify(event, options, error2);
  const type2 = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (has_data_suffix(new URL(event.request.url).pathname) || type2 === "application/json") {
    return new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json; charset=utf-8" }
    });
  }
  return static_error_page(options, status, body.message);
}
function handle_error_and_jsonify(event, options, error2) {
  if (error2 instanceof HttpError) {
    return error2.body;
  } else {
    return options.handle_error(error2, event);
  }
}
function redirect_response(status, location2) {
  const response = new Response(void 0, {
    status,
    headers: { location: location2 }
  });
  return response;
}
function clarify_devalue_error(event, error2) {
  if (error2.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error2.message} (data${error2.path})`;
  }
  if (error2.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error2.message;
}
function serialize_data_node(node) {
  if (!node)
    return "null";
  if (node.type === "error" || node.type === "skip") {
    return JSON.stringify(node);
  }
  const stringified = stringify(node.data);
  const uses = [];
  if (node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses.parent)
    uses.push(`"parent":1`);
  if (node.uses.route)
    uses.push(`"route":1`);
  if (node.uses.url)
    uses.push(`"url":1`);
  return `{"type":"data","data":${stringified},"uses":{${uses.join(",")}}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
}
async function render_endpoint(event, mod, state) {
  const method = event.request.method;
  let handler = mod[method];
  if (!handler && method === "HEAD") {
    handler = mod.GET;
  }
  if (!handler) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.initiator) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    const response = await handler(
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (error2) {
    if (error2 instanceof Redirect) {
      return new Response(void 0, {
        status: error2.status,
        headers: { location: error2.location }
      });
    }
    throw error2;
  }
}
function is_endpoint_request(event) {
  const { method, headers } = event.request;
  if (method === "PUT" || method === "PATCH" || method === "DELETE") {
    return true;
  }
  if (method === "POST" && headers.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter((val) => val != null);
}
function error(status, message) {
  if (isNaN(status) || status < 400 || status > 599) {
    throw new Error(`HTTP error status codes must be between 400 and 599 \u2014 ${status} is invalid`);
  }
  return new HttpError(status, message);
}
function json(data, init2) {
  const headers = new Headers(init2?.headers);
  if (!headers.has("content-type")) {
    headers.set("content-type", "application/json");
  }
  return new Response(JSON.stringify(data), {
    ...init2,
    headers
  });
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options, server2) {
  const actions = server2?.actions;
  if (!actions) {
    if (server2) {
      maybe_throw_migration_error(server2);
    }
    const no_actions_error = error(405, "POST method not allowed. No actions exist for this page");
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (data instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data.status,
        data: stringify_action_response(data.data, event.route.id)
      });
    } else {
      return action_json({
        type: "success",
        status: data ? 200 : 204,
        data: stringify_action_response(data, event.route.id)
      });
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return action_json({
        type: "redirect",
        status: error2.status,
        location: error2.location
      });
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options, check_incorrect_fail_use(error2))
      },
      {
        status: error2 instanceof HttpError ? error2.status : 500
      }
    );
  }
}
function check_incorrect_fail_use(error2) {
  return error2 instanceof ActionFailure ? new Error(`Cannot "throw fail()". Use "return fail()"`) : error2;
}
function action_json(data, init2) {
  return json(data, init2);
}
function is_action_request(event, leaf_node) {
  return leaf_node.server && event.request.method !== "GET" && event.request.method !== "HEAD";
}
async function handle_action_request(event, server2) {
  const actions = server2.actions;
  if (!actions) {
    maybe_throw_migration_error(server2);
    event.setHeaders({
      allow: "GET"
    });
    return {
      type: "error",
      error: error(405, "POST method not allowed. No actions exist for this page")
    };
  }
  check_named_default_separate(actions);
  try {
    const data = await call_action(event, actions);
    if (data instanceof ActionFailure) {
      return { type: "failure", status: data.status, data: data.data };
    } else {
      return {
        type: "success",
        status: 200,
        data
      };
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return {
        type: "redirect",
        status: error2.status,
        location: error2.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(error2)
    };
  }
}
function check_named_default_separate(actions) {
  if (actions.default && Object.keys(actions).length > 1) {
    throw new Error(
      `When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions`
    );
  }
}
async function call_action(event, actions) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions[name];
  if (!action) {
    throw new Error(`No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new Error(
      `Actions expect form-encoded data (received ${event.request.headers.get("content-type")}`
    );
  }
  return action(event);
}
function maybe_throw_migration_error(server2) {
  for (const method of ["POST", "PUT", "PATCH", "DELETE"]) {
    if (server2[method]) {
      throw new Error(
        `${method} method no longer allowed in +page.server, use actions instead. See the PR for more info: https://github.com/sveltejs/kit/pull/6469`
      );
    }
  }
}
function uneval_action_response(data, route_id) {
  return try_deserialize(data, uneval, route_id);
}
function stringify_action_response(data, route_id) {
  return try_deserialize(data, stringify, route_id);
}
function try_deserialize(data, fn, route_id) {
  try {
    return fn(data);
  } catch (e) {
    const error2 = e;
    if ("path" in error2) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error2.message}`;
      if (error2.path !== "")
        message += ` (data.${error2.path})`;
      throw new Error(message);
    }
    throw error2;
  }
}
async function unwrap_promises(object) {
  for (const key2 in object) {
    if (typeof object[key2]?.then === "function") {
      return Object.fromEntries(
        await Promise.all(Object.entries(object).map(async ([key3, value]) => [key3, await value]))
      );
    }
  }
  return object;
}
async function load_server_data({ event, options, state, node, parent }) {
  if (!node?.server)
    return null;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false
  };
  const url = make_trackable(event.url, () => {
    uses.url = true;
  });
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        uses.params.add(key2);
        return target[key2];
      }
    }),
    parent: async () => {
      uses.parent = true;
      return parent();
    },
    route: {
      get id() {
        uses.route = true;
        return event.route.id;
      }
    },
    url
  });
  const data = result ? await unwrap_promises(result) : null;
  if (options.dev) {
    validate_load_response(data, event.route.id);
  }
  return {
    type: "data",
    data,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: async (input, init2) => {
      const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
      const response = await event.fetch(input, init2);
      const url = new URL(input instanceof Request ? input.url : input, event.url);
      const same_origin = url.origin === event.url.origin;
      let dependency;
      if (same_origin) {
        if (state.prerendering) {
          dependency = { response, body: null };
          state.prerendering.dependencies.set(url.pathname, dependency);
        }
      } else {
        const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
        if (mode !== "no-cors") {
          const acao = response.headers.get("access-control-allow-origin");
          if (!acao || acao !== event.url.origin && acao !== "*") {
            throw new Error(
              `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
            );
          }
        }
      }
      const proxy = new Proxy(response, {
        get(response2, key2, _receiver) {
          async function text() {
            const body = await response2.text();
            if (!body || typeof body === "string") {
              const status_number = Number(response2.status);
              if (isNaN(status_number)) {
                throw new Error(
                  `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
                );
              }
              fetched.push({
                url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
                method: event.request.method,
                request_body: input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body,
                response_body: body,
                response: response2
              });
            }
            if (dependency) {
              dependency.body = body;
            }
            return body;
          }
          if (key2 === "arrayBuffer") {
            return async () => {
              const buffer = await response2.arrayBuffer();
              if (dependency) {
                dependency.body = new Uint8Array(buffer);
              }
              return buffer;
            };
          }
          if (key2 === "text") {
            return text;
          }
          if (key2 === "json") {
            return async () => {
              return JSON.parse(await text());
            };
          }
          return Reflect.get(response2, key2, response2);
        }
      });
      if (csr) {
        const get = response.headers.get;
        response.headers.get = (key2) => {
          const lower = key2.toLowerCase();
          const value = get.call(response.headers, lower);
          if (value && !lower.startsWith("x-sveltekit-")) {
            const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
            if (!included) {
              throw new Error(
                `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route})`
              );
            }
          }
          return value;
        };
      }
      return proxy;
    },
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent
  });
  const data = result ? await unwrap_promises(result) : null;
  validate_load_response(data, event.route.id);
  return data;
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function validate_load_response(data, routeId) {
  if (data != null && Object.getPrototypeOf(data) !== Object.prototype) {
    throw new Error(
      `a load function related to route '${routeId}' returned ${typeof data !== "object" ? `a ${typeof data}` : data instanceof Response ? "a Response object" : Array.isArray(data) ? "an array" : "a non-plain object"}, but must return a plain object at the top level (i.e. \`return {...}\`)`
    );
  }
}
function hash(value) {
  let hash2 = 5381;
  if (typeof value === "string") {
    let i = value.length;
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else if (ArrayBuffer.isView(value)) {
    const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
    let i = buffer.length;
    while (i)
      hash2 = hash2 * 33 ^ buffer[--i];
  } else {
    throw new TypeError("value must be a string or TypedArray");
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering = false) {
  const headers = {};
  let cache_control = null;
  let age = null;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    if (key2 === "age")
      age = value;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.request_body) {
    attrs.push(`data-hash=${escape_html_attr(hash(fetched.request_body))}`);
  }
  if (!prerendering && fetched.method === "GET" && cache_control) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder = new TextEncoder();
function sha256(data) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode$1(data);
  for (let i = 0; i < array2.length; i += 16) {
    const w = array2.subarray(i, i + 16);
    let tmp;
    let a;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i2 = 0; i2 < 64; i2++) {
      if (i2 < 16) {
        tmp = w[i2];
      } else {
        a = w[i2 + 1 & 15];
        b = w[i2 + 14 & 15];
        tmp = w[i2 & 15] = (a >>> 7 ^ a >>> 18 ^ a >>> 3 ^ a << 25 ^ a << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i2 & 15] + w[i2 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i2];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x) {
    return (x - Math.floor(x)) * 4294967296;
  }
  let prime = 2;
  for (let i = 0; i < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i < 8) {
        init[i] = frac(prime ** (1 / 2));
      }
      key[i] = frac(prime ** (1 / 3));
      i++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i = 0; i < bytes.length; i += 4) {
    const a = bytes[i + 0];
    const b = bytes[i + 1];
    const c = bytes[i + 2];
    const d = bytes[i + 3];
    bytes[i + 0] = d;
    bytes[i + 1] = c;
    bytes[i + 2] = b;
    bytes[i + 3] = a;
  }
}
function encode$1(str) {
  const encoded = encoder.encode(str);
  const length = encoded.length * 8;
  const size = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l = bytes.length;
  let result = "";
  let i;
  for (i = 2; i < l; i += 3) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2 | bytes[i] >> 6];
    result += chars[bytes[i] & 63];
  }
  if (i === l + 1) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4];
    result += "==";
  }
  if (i === l) {
    result += chars[bytes[i - 2] >> 2];
    result += chars[(bytes[i - 2] & 3) << 4 | bytes[i - 1] >> 4];
    result += chars[(bytes[i - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _style_src, _nonce;
var BaseProvider = class {
  constructor(use_hashes, directives, nonce, dev) {
    __privateAdd(this, _use_hashes, void 0);
    __privateAdd(this, _script_needs_csp, void 0);
    __privateAdd(this, _style_needs_csp, void 0);
    __privateAdd(this, _directives, void 0);
    __privateAdd(this, _script_src, void 0);
    __privateAdd(this, _style_src, void 0);
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, dev ? { ...directives } : directives);
    const d = __privateGet(this, _directives);
    if (dev) {
      const effective_style_src2 = d["style-src"] || d["default-src"];
      if (effective_style_src2 && !effective_style_src2.includes("unsafe-inline")) {
        d["style-src"] = [...effective_style_src2, "unsafe-inline"];
      }
    }
    __privateSet(this, _script_src, []);
    __privateSet(this, _style_src, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const effective_style_src = d["style-src"] || d["default-src"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !dev && !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _script_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _script_src).length === 0) {
        __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      if (__privateGet(this, _use_hashes)) {
        __privateGet(this, _style_src).push(`sha256-${sha256(content)}`);
      } else if (__privateGet(this, _style_src).length === 0) {
        __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
      }
    }
  }
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = directives[key2];
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_style_src = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = escape_html_attr(this.get_header(true));
    return `<meta http-equiv="content-security-policy" content=${content}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  constructor(use_hashes, directives, nonce, dev) {
    super(use_hashes, directives, nonce, dev);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  constructor({ mode, directives, reportOnly }, { prerender, dev }) {
    __publicField(this, "nonce", generate_nonce());
    __publicField(this, "csp_provider");
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce, dev);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce, dev);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
var updated = {
  ...readable(false),
  check: () => false
};
async function render_response({
  branch,
  fetched,
  options,
  state,
  page_config,
  status,
  error: error2 = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { entry } = options.manifest._;
  const stylesheets4 = new Set(entry.stylesheets);
  const modulepreloads = new Set(entry.imports);
  const fonts4 = new Set(options.manifest._.entry.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  if (page_config.ssr) {
    const props2 = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      components: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data = {};
    for (let i = 0; i < branch.length; i += 1) {
      data = { ...data, ...branch[i].data };
      props2[`data_${i}`] = data;
    }
    props2.page = {
      error: error2,
      params: event.params,
      route: event.route,
      status,
      url: event.url,
      data,
      form: form_value
    };
    rendered = options.root.render(props2);
    for (const { node } of branch) {
      if (node.imports) {
        node.imports.forEach((url) => modulepreloads.add(url));
      }
      if (node.stylesheets) {
        node.stylesheets.forEach((url) => stylesheets4.add(url));
      }
      if (node.fonts) {
        node.fonts.forEach((url) => fonts4.add(url));
      }
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head = "";
  let body = rendered.html;
  const csp = new Csp(options.csp, {
    dev: options.dev,
    prerender: !!state.prerendering
  });
  const target = hash(body);
  let assets2;
  if (options.paths.assets) {
    assets2 = options.paths.assets;
  } else if (state.prerendering?.fallback) {
    assets2 = options.paths.base;
  } else {
    const segments = event.url.pathname.slice(options.paths.base.length).split("/").slice(2);
    assets2 = segments.length > 0 ? segments.map(() => "..").join("/") : ".";
  }
  const prefixed = (path) => path.startsWith("/") ? path : `${assets2}/${path}`;
  const serialized = { data: "", form: "null" };
  try {
    serialized.data = `[${branch.map(({ server_data }) => {
      if (server_data?.type === "data") {
        const data = uneval(server_data.data);
        const uses = [];
        if (server_data.uses.dependencies.size > 0) {
          uses.push(`dependencies:${s(Array.from(server_data.uses.dependencies))}`);
        }
        if (server_data.uses.params.size > 0) {
          uses.push(`params:${s(Array.from(server_data.uses.params))}`);
        }
        if (server_data.uses.parent)
          uses.push(`parent:1`);
        if (server_data.uses.route)
          uses.push(`route:1`);
        if (server_data.uses.url)
          uses.push(`url:1`);
        return `{type:"data",data:${data},uses:{${uses.join(",")}}${server_data.slash ? `,slash:${s(server_data.slash)}` : ""}}`;
      }
      return s(server_data);
    }).join(",")}]`;
  } catch (e) {
    const error3 = e;
    throw new Error(clarify_devalue_error(event, error3));
  }
  if (form_value) {
    serialized.form = uneval_action_response(form_value, event.route.id);
  }
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (options.dev)
      attributes.push(" data-sveltekit");
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "css", path })) {
      const attributes = [];
      if (csp.style_needs_nonce) {
        attributes.push(`nonce="${csp.nonce}"`);
      }
      if (inline_styles.has(dep)) {
        attributes.push("disabled", 'media="(max-width: 0)"');
      } else {
        const preload_atts = ['rel="preload"', 'as="style"'].concat(attributes);
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
      attributes.unshift('rel="stylesheet"');
      head += `
		<link href="${path}" ${attributes.join(" ")}>`;
    }
  }
  for (const dep of fonts4) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head += `
		<link ${attributes.join(" ")}>`;
    }
  }
  if (page_config.csr) {
    const opts = [
      `env: ${s(options.public_env)}`,
      `paths: ${s(options.paths)}`,
      `target: document.querySelector('[data-sveltekit-hydrate="${target}"]').parentNode`,
      `version: ${s(options.version)}`
    ];
    if (page_config.ssr) {
      const hydrate = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        `data: ${serialized.data}`,
        `form: ${serialized.form}`
      ];
      if (status !== 200) {
        hydrate.push(`status: ${status}`);
      }
      if (error2) {
        hydrate.push(`error: ${uneval(error2)}`);
      }
      if (options.embedded) {
        hydrate.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      opts.push(`hydrate: {
					${hydrate.join(",\n					")}
				}`);
    }
    const init_app = `
			import { start } from ${s(prefixed(entry.file))};

			start({
				${opts.join(",\n				")}
			});
		`;
    for (const dep of modulepreloads) {
      const path = prefixed(dep);
      if (resolve_opts.preload({ type: "js", path })) {
        link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
        if (state.prerendering) {
          head += `
		<link rel="modulepreload" href="${path}">`;
        }
      }
    }
    const attributes = ['type="module"', `data-sveltekit-hydrate="${target}"`];
    csp.add_script(init_app);
    if (csp.script_needs_nonce) {
      attributes.push(`nonce="${csp.nonce}"`);
    }
    body += `
		<script ${attributes.join(" ")}>${init_app}<\/script>`;
  }
  if (page_config.ssr && page_config.csr) {
    body += `
	${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n	")}`;
  }
  if (options.service_worker) {
    const opts = options.dev ? `, { type: 'module' }` : "";
    const init_service_worker = `
			if ('serviceWorker' in navigator) {
				addEventListener('load', function () {
					navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
				});
			}
		`;
    csp.add_script(init_service_worker);
    head += `
		<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_service_worker}<\/script>`;
  }
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head = http_equiv.join("\n") + head;
    }
  }
  head += rendered.head;
  const html = await resolve_opts.transformPageChunk({
    html: options.app_template({ head, body, assets: assets2, nonce: csp.nonce }),
    done: true
  }) || "";
  const headers = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html",
    etag: `"${hash(html)}"`
  });
  if (!state.prerendering) {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  return new Response(html, {
    status,
    headers
  });
}
async function respond_with_error({ event, options, state, status, error: error2, resolve_opts }) {
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await options.manifest._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.initiator = GENERIC_ERROR;
      const server_data_promise = load_server_data({
        event,
        options,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data
        },
        {
          node: await options.manifest._.nodes[1](),
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options,
      state,
      page_config: {
        ssr,
        csr: get_option([default_layout], "csr") ?? true
      },
      status,
      error: await handle_error_and_jsonify(event, options, error2),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (error3) {
    if (error3 instanceof Redirect) {
      return redirect_response(error3.status, error3.location);
    }
    return static_error_page(
      options,
      error3 instanceof HttpError ? error3.status : 500,
      (await handle_error_and_jsonify(event, options, error3)).message
    );
  }
}
async function render_page(event, route, page2, options, state, resolve_opts) {
  if (state.initiator === route) {
    return new Response(`Not found: ${event.url.pathname}`, {
      status: 404
    });
  }
  state.initiator = route;
  if (is_action_json_request(event)) {
    const node = await options.manifest._.nodes[page2.leaf]();
    return handle_action_json_request(event, options, node?.server);
  }
  try {
    const nodes = await Promise.all([
      ...page2.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
      options.manifest._.nodes[page2.leaf]()
    ]);
    const leaf_node = nodes.at(-1);
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event, leaf_node)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(303, action_result.location);
      }
      if (action_result?.type === "error") {
        const error2 = action_result.error;
        status = error2 instanceof HttpError ? error2.status : 500;
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender");
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod && mod.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      if (should_prerender !== false && get_option(nodes, "ssr") === false && !leaf_node.server?.actions) {
        return await render_response({
          branch: [],
          fetched: [],
          page_config: {
            ssr: false,
            csr: get_option(nodes, "csr") ?? true
          },
          status,
          error: null,
          event,
          options,
          state,
          resolve_opts
        });
      }
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options,
        state,
        resolve_opts
      });
    }
    let branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            options,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await server_promises[j];
                if (parent)
                  Object.assign(data, await parent.data);
              }
              return data;
            }
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                Object.assign(data, await load_promises[j]);
              }
              return data;
            },
            resolve_opts,
            server_data_promise: server_promises[i],
            state,
            csr
          });
        } catch (e) {
          load_error = e;
          throw load_error;
        }
      });
    });
    for (const p of server_promises)
      p.catch(() => {
      });
    for (const p of load_promises)
      p.catch(() => {
      });
    for (let i = 0; i < nodes.length; i += 1) {
      const node = nodes[i];
      if (node) {
        try {
          const server_data = await server_promises[i];
          const data = await load_promises[i];
          branch.push({ node, server_data, data });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: new Response(body),
                body
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = err instanceof HttpError ? err.status : 500;
          const error2 = await handle_error_and_jsonify(event, options, err);
          while (i--) {
            if (page2.errors[i]) {
              const index4 = page2.errors[i];
              const node2 = await options.manifest._.nodes[index4]();
              let j = i;
              while (!branch[j])
                j -= 1;
              return await render_response({
                event,
                options,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error: error2,
                branch: compact(branch.slice(0, j + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options, status2, error2.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      const body = `{"type":"data","nodes":[${branch.map((node) => serialize_data_node(node?.server_data)).join(",")}]}`;
      state.prerendering.dependencies.set(data_pathname, {
        response: new Response(body),
        body
      });
    }
    return await render_response({
      event,
      options,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr: true
      },
      status,
      error: null,
      branch: compact(branch),
      action_result,
      fetched
    });
  } catch (error2) {
    return await respond_with_error({
      event,
      options,
      state,
      status: 500,
      error: error2,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  let buffered = "";
  for (let i = 0; i < params.length; i += 1) {
    const param = params[i];
    let value = values[i];
    if (param.chained && param.rest && buffered) {
      value = value ? buffered + "/" + value : buffered;
    }
    buffered = "";
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
    } else {
      if (param.matcher && !matchers[param.matcher](value)) {
        if (param.optional && param.chained) {
          let j = values.indexOf(void 0, i);
          if (j === -1) {
            const next = params[i + 1];
            if (next?.rest && next.chained) {
              buffered = value;
            } else {
              return;
            }
          }
          while (j >= i) {
            values[j] = values[j - 1];
            j -= 1;
          }
          continue;
        }
        return;
      }
      result[param.name] = value;
    }
  }
  if (buffered)
    return;
  return result;
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
async function render_data(event, route, options, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i) => {
      return once(async () => {
        try {
          if (aborted) {
            return {
              type: "skip"
            };
          }
          const node = n == void 0 ? n : await options.manifest._.nodes[n]();
          return load_server_data({
            event: new_event,
            options,
            state,
            node,
            parent: async () => {
              const data = {};
              for (let j = 0; j < i; j += 1) {
                const parent = await functions[j]();
                if (parent) {
                  Object.assign(data, parent.data);
                }
              }
              return data;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i) => {
      if (!invalidated[i]) {
        return {
          type: "skip"
        };
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p, i) => p.catch(async (error2) => {
          if (error2 instanceof Redirect) {
            throw error2;
          }
          length = Math.min(length, i + 1);
          return {
            type: "error",
            error: await handle_error_and_jsonify(event, options, error2),
            status: error2 instanceof HttpError ? error2.status : void 0
          };
        })
      )
    );
    try {
      const stubs = nodes.slice(0, length).map(serialize_data_node);
      const json2 = `{"type":"data","nodes":[${stubs.join(",")}]}`;
      return json_response(json2);
    } catch (e) {
      const error2 = e;
      return json_response(JSON.stringify(clarify_devalue_error(event, error2)), 500);
    }
  } catch (e) {
    const error2 = normalize_error(e);
    if (error2 instanceof Redirect) {
      return redirect_json_response(error2);
    } else {
      return json_response(JSON.stringify(await handle_error_and_jsonify(event, options, error2)));
    }
  }
}
function json_response(json2, status = 200) {
  return new Response(json2, {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect) {
  return json_response(
    JSON.stringify({
      type: "redirect",
      location: redirect.location
    })
  );
}
var parse_1 = parse$1;
var serialize_1 = serialize;
var __toString = Object.prototype.toString;
var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  var obj = {};
  var opt = options || {};
  var dec = opt.decode || decode;
  var index4 = 0;
  while (index4 < str.length) {
    var eqIdx = str.indexOf("=", index4);
    if (eqIdx === -1) {
      break;
    }
    var endIdx = str.indexOf(";", index4);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index4 = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    var key2 = str.slice(index4, eqIdx).trim();
    if (void 0 === obj[key2]) {
      var val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.charCodeAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key2] = tryDecode(val, dec);
    }
    index4 = endIdx + 1;
  }
  return obj;
}
function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  var value = enc(val);
  if (value && !fieldContentRegExp.test(value)) {
    throw new TypeError("argument val is invalid");
  }
  var str = name + "=" + value;
  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge) || !isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    var expires = opt.expires;
    if (!isDate(expires) || isNaN(expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low":
        str += "; Priority=Low";
        break;
      case "medium":
        str += "; Priority=Medium";
        break;
      case "high":
        str += "; Priority=High";
        break;
      default:
        throw new TypeError("option priority is invalid");
    }
  }
  if (opt.sameSite) {
    var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true:
        str += "; SameSite=Strict";
        break;
      case "lax":
        str += "; SameSite=Lax";
        break;
      case "strict":
        str += "; SameSite=Strict";
        break;
      case "none":
        str += "; SameSite=None";
        break;
      default:
        throw new TypeError("option sameSite is invalid");
    }
  }
  return str;
}
function decode(str) {
  return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
}
function encode(val) {
  return encodeURIComponent(val);
}
function isDate(val) {
  return __toString.call(val) === "[object Date]" || val instanceof Date;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch (e) {
    return str;
  }
}
var cookie_paths = {};
function get_cookies(request, url, dev, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = parse_1(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const default_path = normalized_url.split("/").slice(0, -1).join("/") || "/";
  if (dev) {
    const initial_decoded_cookies = parse_1(header, { decode: decodeURIComponent });
    for (const name of Object.keys(cookie_paths)) {
      cookie_paths[name] = new Set(
        [...cookie_paths[name]].filter(
          (path) => !path_matches(normalized_url, path) || name in initial_decoded_cookies
        )
      );
    }
    for (const name in initial_decoded_cookies) {
      cookie_paths[name] = cookie_paths[name] ?? /* @__PURE__ */ new Set();
      if (![...cookie_paths[name]].some((path) => path_matches(normalized_url, path))) {
        cookie_paths[name].add(default_path);
      }
    }
  }
  const new_cookies = {};
  const defaults = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = parse_1(header, { decode: decoder });
      const cookie = req_cookies[name];
      if (!dev || cookie) {
        return cookie;
      }
      const paths = /* @__PURE__ */ new Set([...cookie_paths[name] ?? []]);
      if (c) {
        paths.add(c.options.path ?? default_path);
      }
      if (paths.size > 0) {
        console.warn(
          `Cookie with name '${name}' was not found at path '${url.pathname}', but a cookie with that name exists at these paths: '${[...paths].join("', '")}'. Did you mean to set its 'path' to '/' instead?`
        );
      }
    },
    set(name, value, opts = {}) {
      let path = opts.path ?? default_path;
      new_cookies[name] = {
        name,
        value,
        options: {
          ...defaults,
          ...opts,
          path
        }
      };
      if (dev) {
        cookie_paths[name] = cookie_paths[name] ?? /* @__PURE__ */ new Set();
        if (!value) {
          if (!cookie_paths[name].has(path) && cookie_paths[name].size > 0) {
            const paths = `'${Array.from(cookie_paths[name]).join("', '")}'`;
            console.warn(
              `Trying to delete cookie '${name}' at path '${path}', but a cookie with that name only exists at these paths: ${paths}.`
            );
          }
          cookie_paths[name].delete(path);
        } else {
          cookie_paths[name].add(path);
        }
      }
    },
    delete(name, opts = {}) {
      cookies.set(name, "", {
        ...opts,
        maxAge: 0
      });
    },
    serialize(name, value, opts) {
      return serialize_1(name, value, {
        ...defaults,
        ...opts
      });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder2 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder2(cookie.value);
    }
    if (header2) {
      const parsed = parse_1(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  return { cookies, new_cookies, get_cookie_header };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options } = new_cookie;
    headers.append("set-cookie", serialize_1(name, value, options));
  }
}
var setCookie = { exports: {} };
var defaultParseOptions = {
  decodeValues: true,
  map: false,
  silent: false
};
function isNonEmptyString(str) {
  return typeof str === "string" && !!str.trim();
}
function parseString(setCookieValue, options) {
  var parts = setCookieValue.split(";").filter(isNonEmptyString);
  var nameValuePairStr = parts.shift();
  var parsed = parseNameValuePair(nameValuePairStr);
  var name = parsed.name;
  var value = parsed.value;
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  try {
    value = options.decodeValues ? decodeURIComponent(value) : value;
  } catch (e) {
    console.error(
      "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
      e
    );
  }
  var cookie = {
    name,
    value
  };
  parts.forEach(function(part) {
    var sides = part.split("=");
    var key2 = sides.shift().trimLeft().toLowerCase();
    var value2 = sides.join("=");
    if (key2 === "expires") {
      cookie.expires = new Date(value2);
    } else if (key2 === "max-age") {
      cookie.maxAge = parseInt(value2, 10);
    } else if (key2 === "secure") {
      cookie.secure = true;
    } else if (key2 === "httponly") {
      cookie.httpOnly = true;
    } else if (key2 === "samesite") {
      cookie.sameSite = value2;
    } else {
      cookie[key2] = value2;
    }
  });
  return cookie;
}
function parseNameValuePair(nameValuePairStr) {
  var name = "";
  var value = "";
  var nameValueArr = nameValuePairStr.split("=");
  if (nameValueArr.length > 1) {
    name = nameValueArr.shift();
    value = nameValueArr.join("=");
  } else {
    value = nameValuePairStr;
  }
  return { name, value };
}
function parse(input, options) {
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!input) {
    if (!options.map) {
      return [];
    } else {
      return {};
    }
  }
  if (input.headers && input.headers["set-cookie"]) {
    input = input.headers["set-cookie"];
  } else if (input.headers) {
    var sch = input.headers[Object.keys(input.headers).find(function(key2) {
      return key2.toLowerCase() === "set-cookie";
    })];
    if (!sch && input.headers.cookie && !options.silent) {
      console.warn(
        "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
      );
    }
    input = sch;
  }
  if (!Array.isArray(input)) {
    input = [input];
  }
  options = options ? Object.assign({}, defaultParseOptions, options) : defaultParseOptions;
  if (!options.map) {
    return input.filter(isNonEmptyString).map(function(str) {
      return parseString(str, options);
    });
  } else {
    var cookies = {};
    return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
      var cookie = parseString(str, options);
      cookies2[cookie.name] = cookie;
      return cookies2;
    }, cookies);
  }
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString;
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  var cookiesStrings = [];
  var pos = 0;
  var start;
  var ch;
  var lastComma;
  var nextStart;
  var cookiesSeparatorFound;
  function skipWhitespace() {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  }
  function notSpecialChar() {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  }
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.substring(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
    }
  }
  return cookiesStrings;
}
setCookie.exports = parse;
setCookie.exports.parse = parse;
var parseString_1 = setCookie.exports.parseString = parseString;
var splitCookiesString_1 = setCookie.exports.splitCookiesString = splitCookiesString;
function create_fetch({ event, options, state, get_cookie_header }) {
  return async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    const request_body = init2?.body;
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return await options.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          let response2 = await fetch(request);
          if (mode === "no-cors") {
            response2 = new Response("", {
              status: response2.status,
              statusText: response2.statusText,
              headers: response2.headers
            });
          }
          return response2;
        }
        let response;
        const prefix = options.paths.assets || options.paths.base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix) ? decoded.slice(prefix.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = options.manifest.assets.has(filename);
        const is_asset_html = options.manifest.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file4 = is_asset ? filename : filename_html;
          if (options.read) {
            const type2 = is_asset ? options.manifest.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(options.read(file4), {
              headers: type2 ? { "content-type": type2 } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (request_body && typeof request_body !== "string" && !ArrayBuffer.isView(request_body)) {
          throw new Error("Request body must be a string or TypedArray");
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            event.request.headers.get("accept-language")
          );
        }
        response = await respond(request, options, state);
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of splitCookiesString_1(set_cookie)) {
            const { name, value, ...options2 } = parseString_1(str);
            event.cookies.set(
              name,
              value,
              options2
            );
          }
        }
        return response;
      }
    });
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
function validator(expected) {
  const set = new Set(expected);
  function validate(module, route_id) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] !== "_" && !set.has(key2)) {
        const valid = expected.join(", ");
        throw new Error(
          `Invalid export '${key2}'${route_id ? ` in ${route_id}` : ""} (valid exports are ${valid}, or anything with a '_' prefix)`
        );
      }
    }
  }
  return validate;
}
var validate_common_exports = validator([
  "load",
  "prerender",
  "csr",
  "ssr",
  "trailingSlash"
]);
var validate_page_server_exports = validator([
  "load",
  "prerender",
  "csr",
  "ssr",
  "actions",
  "trailingSlash"
]);
var validate_server_exports = validator([
  "GET",
  "POST",
  "PATCH",
  "PUT",
  "DELETE",
  "prerender",
  "trailingSlash"
]);
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type: type2 }) => type2 === "js" || type2 === "css";
async function respond(request, options, state) {
  let url = new URL(request.url);
  if (options.csrf.check_origin) {
    const forbidden = request.method === "POST" && request.headers.get("origin") !== url.origin && is_form_content_type(request);
    if (forbidden) {
      const csrf_error = error(403, `Cross-site ${request.method} form submissions are forbidden`);
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return new Response(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let decoded;
  try {
    decoded = decode_pathname(url.pathname);
  } catch {
    return new Response("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (options.paths.base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(options.paths.base)) {
      return new Response("Not found", { status: 404 });
    }
    decoded = decoded.slice(options.paths.base.length) || "/";
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) || "/";
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("_").map(Boolean);
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await options.manifest._.matchers();
    for (const candidate of options.manifest._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers = {};
  const event = {
    cookies: null,
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-vercel"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            `Use \`event.cookies.set(name, value, options)\` instead of \`event.setHeaders\` to set cookies`
          );
        } else if (lower in headers) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route && !is_data_request) {
      if (route.page) {
        const nodes = await Promise.all([
          ...route.page.layouts.map((n) => n == void 0 ? n : options.manifest._.nodes[n]()),
          options.manifest._.nodes[route.page.leaf]()
        ]);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
      if (normalized !== url.pathname && !state.prerendering?.fallback) {
        return new Response(void 0, {
          status: 301,
          headers: {
            "x-sveltekit-normalize": "1",
            location: (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
          }
        });
      }
    }
    const { cookies, new_cookies, get_cookie_header } = get_cookies(
      request,
      url,
      options.dev,
      trailing_slash ?? "never"
    );
    event.cookies = cookies;
    event.fetch = create_fetch({ event, options, state, get_cookie_header });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options.hooks.handle({
      event,
      resolve: (event2, opts) => resolve(event2, opts).then((response2) => {
        for (const key2 in headers) {
          const value = headers[key2];
          response2.headers.set(key2, value);
        }
        add_cookies_to_headers(response2.headers, Object.values(new_cookies));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag = response.headers.get("etag");
      if (if_none_match_value === etag) {
        const headers2 = new Headers({ etag });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers2.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers2
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location2 = response.headers.get("location");
      if (location2) {
        return redirect_json_response(new Redirect(response.status, location2));
      }
    }
    return response;
  } catch (error2) {
    if (error2 instanceof Redirect) {
      if (is_data_request) {
        return redirect_json_response(error2);
      } else {
        return redirect_response(error2.status, error2.location);
      }
    }
    return await handle_fatal_error(event, options, error2);
  }
  async function resolve(event2, opts) {
    try {
      if (opts) {
        if ("ssr" in opts) {
          throw new Error(
            "ssr has been removed, set it in the appropriate +layout.js instead. See the PR for more information: https://github.com/sveltejs/kit/pull/6197"
          );
        }
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          response = await render_page(event2, route, route.page, options, state, resolve_opts);
        } else {
          throw new Error("This should never happen");
        }
        return response;
      }
      if (state.initiator === GENERIC_ERROR) {
        return new Response("Internal Server Error", {
          status: 500
        });
      }
      if (!state.initiator) {
        return await respond_with_error({
          event: event2,
          options,
          state,
          status: 404,
          error: new Error(`Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return new Response("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (error2) {
      return await handle_fatal_error(event2, options, error2);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
var base = "";
var assets = "";
function set_paths(paths) {
  base = paths.base;
  assets = paths.assets || base;
}
var app_template = ({ head, body, assets: assets2, nonce }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<link rel="icon" href="' + assets2 + '/favicon.svg" />\n		<meta name="viewport" content="width=device-width" />\n		' + head + '\n	</head>\n	<body data-sveltekit-preload-data="hover">\n		<div style="display: contents">' + body + "</div>\n	</body>\n</html>\n";
var error_template = ({ status, message }) => '<!DOCTYPE html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
					Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid #ccc;
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n";
var read = null;
set_paths({ "base": "", "assets": "" });
var Server = class {
  constructor(manifest2) {
    this.options = {
      csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
      csrf: {
        check_origin: true
      },
      dev: false,
      embedded: false,
      handle_error: (error2, event) => {
        return this.options.hooks.handleError({ error: error2, event }) ?? {
          message: event.route.id != null ? "Internal Error" : "Not Found"
        };
      },
      hooks: null,
      manifest: manifest2,
      paths: { base, assets },
      public_env: {},
      read,
      root: Root,
      service_worker: false,
      app_template,
      app_template_contains_nonce: false,
      error_template,
      version: "1671587100139"
    };
  }
  async init({ env }) {
    const entries = Object.entries(env);
    Object.fromEntries(entries.filter(([k]) => !k.startsWith("PUBLIC_")));
    const pub = Object.fromEntries(entries.filter(([k]) => k.startsWith("PUBLIC_")));
    this.options.public_env = pub;
    if (!this.options.hooks) {
      const module = await Promise.resolve().then(() => (init_hooks(), hooks_exports));
      this.options.hooks = {
        handle: module.handle || (({ event, resolve }) => resolve(event)),
        handleError: module.handleError || (({ error: error2 }) => console.error(error2.stack)),
        handleFetch: module.handleFetch || (({ request, fetch: fetch2 }) => fetch2(request))
      };
    }
  }
  async respond(request, options = {}) {
    if (!(request instanceof Request)) {
      throw new Error("The first argument to server.respond must be a Request object. See https://github.com/sveltejs/kit/pull/3384 for details");
    }
    return respond(request, this.options, options);
  }
};

// .svelte-kit/vercel-tmp/render/manifest.js
var manifest = {
  appDir: "_app",
  appPath: "_app",
  assets: /* @__PURE__ */ new Set(["favicon.svg"]),
  mimeTypes: { ".svg": "image/svg+xml" },
  _: {
    entry: { "file": "_app/immutable/start-97270277.js", "imports": ["_app/immutable/start-97270277.js", "_app/immutable/chunks/index-d1a17515.js", "_app/immutable/chunks/singletons-e12b43fd.js"], "stylesheets": [], "fonts": [] },
    nodes: [
      () => Promise.resolve().then(() => (init__(), __exports)),
      () => Promise.resolve().then(() => (init__2(), __exports2)),
      () => Promise.resolve().then(() => (init__3(), __exports3))
    ],
    routes: [
      {
        id: "/",
        pattern: /^\/$/,
        params: [],
        page: { layouts: [0], errors: [1], leaf: 2 },
        endpoint: null
      }
    ],
    matchers: async () => {
      return {};
    }
  }
};

// .svelte-kit/vercel-tmp/render/edge.js
var server = new Server(manifest);
var initialized = server.init({
  env: process.env
});
var edge_default = async (request) => {
  await initialized;
  return server.respond(request, {
    getClientAddress() {
      return request.headers.get("x-forwarded-for");
    }
  });
};
export {
  edge_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=index.js.map
