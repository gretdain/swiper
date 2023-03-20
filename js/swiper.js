!function (t) {
  var e = {};

  function i(s) {
    if (e[s]) return e[s].exports;
    var n = e[s] = {i: s, l: !1, exports: {}};
    return t[s].call(n.exports, n, n.exports, i), n.l = !0, n.exports
  }

  i.m = t, i.c = e, i.d = function (t, e, s) {
    i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: s})
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var s = Object.create(null);
    if (i.r(s), Object.defineProperty(s, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var n in t) i.d(s, n, function (e) {
      return t[e]
    }.bind(null, n));
    return s
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return i.d(e, "a", e), e
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, i.p = "", i(i.s = 5)
}([function (t, e, i) {
}, function (t, e, i) {
}, function (t, e, i) {
}, function (t, e, i) {
}, function (t, e) {
  var i;
  i = "fancyapp by Artyom Pilosyan", console.log(i)
}, function (t, e, i) {
  "use strict";
  i.r(e);
  i(0), i(1), i(2), i(3);
  const s = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
    n = (t, ...e) => {
      const i = e.length;
      for (let o = 0; o < i; o++) {
        const i = e[o] || {};
        Object.entries(i).forEach(([e, i]) => {
          const o = Array.isArray(i) ? [] : {};
          t[e] || Object.assign(t, {[e]: o}), s(i) ? Object.assign(t[e], n(o, i)) : Array.isArray(i) ? Object.assign(t, {[e]: [...i]}) : Object.assign(t, {[e]: i})
        })
      }
      return t
    }, o = function (t, e) {
      let i = !0;
      return (...s) => {
        i && (i = !1, t(...s), setTimeout(() => {
          i = !0
        }, e))
      }
    }, a = (t, e) => {
      let i = [];
      return t.childNodes.forEach(t => {
        t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t)
      }), i
    }, r = function (t) {
      return (new DOMParser).parseFromString(t, "text/html").body.firstChild
    }, l = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e),
    h = t => ("" + (t || "")).split(" ").filter(t => !!t), c = (t, e) => {
      h(e).forEach(e => {
        t && t.classList.add(e)
      })
    }, d = (t, e) => {
      h(e).forEach(e => {
        t && t.classList.remove(e)
      })
    }, u = (t, e, i) => {
      h(e).forEach(e => {
        t && t.classList.toggle(e, i || !1)
      })
    },
    p = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',
    g = function (t, e) {
      return t.split(".").reduce((t, e) => "object" == typeof t ? t[e] : void 0, e)
    };

  class m {
    constructor(t = {}) {
      Object.defineProperty(this, "options", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
      }), Object.defineProperty(this, "events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
      }), this.setOptions(t);
      for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this))
    }

    setOptions(t) {
      this.options = t ? n({}, this.constructor.defaults, t) : {};
      for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e)
    }

    option(t, ...e) {
      let i = g(t, this.options);
      return i && "function" == typeof i && (i = i.call(this, this, ...e)), i
    }

    optionFor(t, e, i, ...s) {
      let n = g(e, t);
      var o;
      "string" != typeof (o = n) || isNaN(o) || isNaN(parseFloat(o)) || (n = parseFloat(n)), "true" === n && (n = !0), "false" === n && (n = !1), n && "function" == typeof n && (n = n.call(this, this, t, ...s));
      let a = g(e, this.options);
      return a && "function" == typeof a ? n = a.call(this, this, t, ...s, n) : void 0 === n && (n = a), void 0 === n ? i : n
    }

    cn(t) {
      const e = this.options.classes;
      return e && e[t] || ""
    }

    localize(t, e = []) {
      t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, e, i) => {
        let s = "";
        return i ? s = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (s = this.option("l10n." + e)), s || (s = t), s
      });
      for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
      return t.replace(/\{\{(.*)\}\}/, (t, e) => e)
    }

    on(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), i.forEach(t => {
        let i = this.events.get(t);
        i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i)
      })
    }

    off(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach(t => {
        const i = this.events.get(t);
        if (Array.isArray(i)) {
          const t = i.indexOf(e);
          t > -1 && i.splice(t, 1)
        }
      })
    }

    emit(t, ...e) {
      [...this.events.get(t) || []].forEach(t => t(this, ...e)), "*" !== t && this.emit("*", t, ...e)
    }
  }

  Object.defineProperty(m, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.8"
  }), Object.defineProperty(m, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: {}});

  class f extends m {
    constructor(t = {}) {
      super(t), Object.defineProperty(this, "plugins", {enumerable: !0, configurable: !0, writable: !0, value: {}})
    }

    attachPlugins(t = {}) {
      const e = new Map;
      for (const [i, s] of Object.entries(t)) {
        const t = this.option(i), n = this.plugins[i];
        n || !1 === t ? n && !1 === t && (n.detach(), delete this.plugins[i]) : e.set(i, new s(this, t || {}))
      }
      for (const [t, i] of e) this.plugins[t] = i, i.attach();
      this.emit("attachPlugins")
    }

    detachPlugins() {
      for (const t of Object.values(this.plugins)) t.detach();
      return this.plugins = {}, this.emit("detachPlugins"), this
    }
  }

  const b = function (t, e) {
    return !(!t || t === document.body || e && t === e) && (function (t) {
      if (!(t && t instanceof Element && t.offsetParent)) return !1;
      const e = t.scrollHeight > t.clientHeight, i = window.getComputedStyle(t).overflowY,
        s = -1 !== i.indexOf("hidden"), n = -1 !== i.indexOf("visible");
      return e && !s && !n
    }(t) ? t : b(t.parentElement, e))
  };

  class v {
    constructor(t) {
      Object.defineProperty(this, "pageX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "pageY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "clientX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "clientY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "time", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "nativePointer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
    }
  }

  const y = {passive: !1};

  class w {
    constructor(t, {
      start: e = (() => !0), move: i = (() => {
      }), end: s = (() => {
      })
    }) {
      Object.defineProperty(this, "element", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "startCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "moveCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "endCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "currentPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "startPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = s;
      for (const t of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[t] = this[t].bind(this);
      this.element.addEventListener("mousedown", this.onPointerStart, y), this.element.addEventListener("touchstart", this.onTouchStart, y), this.element.addEventListener("touchmove", this.onMove, y), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd)
    }

    onPointerStart(t) {
      if (!t.buttons || 0 !== t.button) return;
      const e = new v(t);
      this.currentPointers.some(t => t.id === e.id) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
    }

    onTouchStart(t) {
      for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new v(e), t);
      window.addEventListener("blur", this.onWindowBlur)
    }

    onMove(t) {
      const e = this.currentPointers.slice(),
        i = "changedTouches" in t ? Array.from(t.changedTouches || []).map(t => new v(t)) : [new v(t)], s = [];
      for (const t of i) {
        const e = this.currentPointers.findIndex(e => e.id === t.id);
        e < 0 || (s.push(t), this.currentPointers[e] = t)
      }
      s.length && this.moveCallback(t, this.currentPointers.slice(), e)
    }

    onPointerEnd(t) {
      t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new v(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
    }

    onTouchEnd(t) {
      for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new v(e))
    }

    triggerPointerStart(t, e) {
      return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0)
    }

    triggerPointerEnd(t, e) {
      const i = this.currentPointers.findIndex(t => t.id === e.id);
      i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()))
    }

    onWindowBlur() {
      this.clear()
    }

    clear() {
      for (; this.currentPointers.length;) {
        const t = this.currentPointers[this.currentPointers.length - 1];
        this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
          bubbles: !0,
          cancelable: !0,
          clientX: t.clientX,
          clientY: t.clientY
        }), t, this.currentPointers.slice())
      }
    }

    stop() {
      this.element.removeEventListener("mousedown", this.onPointerStart, y), this.element.removeEventListener("touchstart", this.onTouchStart, y), this.element.removeEventListener("touchmove", this.onMove, y), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
    }
  }

  function x(t, e) {
    return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0
  }

  function S(t, e) {
    return e ? {clientX: (t.clientX + e.clientX) / 2, clientY: (t.clientY + e.clientY) / 2} : t
  }

  var P;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy"
  }(P || (P = {}));
  const E = ["a", "b", "c", "d", "e", "f"], T = t => t && null !== t && t instanceof Element && "nodeType" in t,
    M = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
  let O = null, C = null;

  class z extends f {
    get isTouchDevice() {
      return null === C && (C = window.matchMedia("(hover: none)").matches), C
    }

    get isMobile() {
      return null === O && (O = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), O
    }

    get panMode() {
      return "mousemove" !== this.options.panMode || this.isTouchDevice ? "drag" : "mousemove"
    }

    get panOnlyZoomed() {
      const t = this.options.panOnlyZoomed;
      return "auto" === t ? this.isTouchDevice : t
    }

    get isInfinite() {
      return this.option("infinite")
    }

    get angle() {
      return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
    }

    get targetAngle() {
      return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
    }

    get scale() {
      const {a: t, b: e} = this.current;
      return Math.sqrt(t * t + e * e) || 1
    }

    get targetScale() {
      const {a: t, b: e} = this.target;
      return Math.sqrt(t * t + e * e) || 1
    }

    get minScale() {
      return this.option("minScale") || 1
    }

    get fullScale() {
      const {contentRect: t} = this;
      return t.fullWidth / t.fitWidth || 1
    }

    get maxScale() {
      return this.fullScale * (this.option("maxScale") || 1) || 1
    }

    get coverScale() {
      const {containerRect: t, contentRect: e} = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
      return Math.min(this.fullScale, i)
    }

    get isScaling() {
      return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
    }

    get isContentLoading() {
      const t = this.content;
      return !!(t && t instanceof HTMLImageElement) && !t.complete
    }

    get isResting() {
      if (this.isBouncingX || this.isBouncingY) return !1;
      for (const t of E) {
        const e = "e" == t || "f" === t ? .001 : 1e-5;
        if (Math.abs(this.target[t] - this.current[t]) > e) return !1
      }
      return !(!this.ignoreBounds && !this.checkBounds().inBounds)
    }

    constructor(t, e = {}, i = {}) {
      var s;
      if (super(e), Object.defineProperty(this, "pointerTracker", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "resizeObserver", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "updateTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "rAF", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "isTicking", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "friction", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "ignoreBounds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "isBouncingX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "isBouncingY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "clicks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "trackingPoints", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "wheelDelta", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevWheelDelta", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevWheelTime", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevMouseMoveEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: P.Init
      }), Object.defineProperty(this, "isDragging", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "content", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "spinner", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "containerRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {width: 0, height: 0, innerWidth: 0, innerHeight: 0}
      }), Object.defineProperty(this, "contentRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          fullWidth: 0,
          fullHeight: 0,
          fitWidth: 0,
          fitHeight: 0,
          width: 0,
          height: 0
        }
      }), Object.defineProperty(this, "dragStart", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {x: 0, y: 0, top: 0, left: 0, time: 0}
      }), Object.defineProperty(this, "dragOffset", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {x: 0, y: 0, time: 0}
      }), Object.defineProperty(this, "current", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, M)
      }), Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, M)
      }), Object.defineProperty(this, "velocity", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0}
      }), Object.defineProperty(this, "lockedAxis", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), !t) throw new Error("No Element found");
      if (this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, z.Plugins), i)), this.emit("init"), this.isContentLoading) {
        const e = this.content;
        if (this.option("spinner")) {
          t.classList.add(this.cn("isLoading"));
          const i = r(p);
          t.contains(e) ? this.spinner = (null === (s = e.parentElement) || void 0 === s ? void 0 : s.insertBefore(i, e)) || null : this.spinner = t.appendChild(i)
        }
        this.emit("beforeLoad"), e.addEventListener("load", this.onLoad), e.addEventListener("error", this.onError)
      } else queueMicrotask(() => {
        this.enable()
      })
    }

    initContent() {
      const {container: t} = this;
      let e = this.option("content") || t.querySelector("." + this.cn("content"));
      if (e || (e = t.querySelector("img") || t.firstElementChild, e && e.classList.add(this.cn("content"))), !e) throw new Error("No content found");
      this.content = e
    }

    onLoad() {
      this.spinner && (this.spinner.remove(), this.spinner = null), this.option("spinner") && this.container.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), this.state === P.Init && this.enable()
    }

    onError() {
      this.state !== P.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = P.Error, this.emit("error"))
    }

    attachObserver() {
      var t;
      const e = () => Math.abs(this.containerRect.width - this.container.getBoundingClientRect().width) > .1 || Math.abs(this.containerRect.height - this.container.getBoundingClientRect().height) > .1;
      this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver(() => {
        this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
          e() && this.onResize(), this.updateTimer = null
        }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null))
      })), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container)
    }

    detachObserver() {
      var t;
      null === (t = this.resizeObserver) || void 0 === t || t.disconnect()
    }

    attachEvents() {
      const {container: t} = this;
      t.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.addEventListener("wheel", this.onWheel, {passive: !1}), this.pointerTracker = new w(t, {
        start: this.onPointerDown,
        move: this.onPointerMove,
        end: this.onPointerUp
      }), document.addEventListener("mousemove", this.onMouseMove)
    }

    detachEvents() {
      var t;
      const {container: e} = this;
      e.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), e.removeEventListener("wheel", this.onWheel, {passive: !1}), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
    }

    animate() {
      this.setTargetForce();
      const t = this.option("maxVelocity");
      for (const e of E) this.friction ? (this.velocity[e] *= 1 - this.friction, t && !this.isScaling && (this.velocity[e] = Math.max(Math.min(this.velocity[e], t), -1 * t)), this.current[e] += this.velocity[e]) : this.current[e] = this.target[e];
      this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current")
    }

    setTargetForce() {
      for (const t of E) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
    }

    checkBounds(t = 0, e = 0) {
      const {current: i} = this, s = i.e + t, n = i.f + e, o = this.getBounds(), {x: a, y: r} = o, l = a.min, h = a.max,
        c = r.min, d = r.max;
      let u = 0, p = 0;
      return l !== 1 / 0 && s < l ? u = l - s : h !== 1 / 0 && s > h && (u = h - s), c !== 1 / 0 && n < c ? p = c - n : d !== 1 / 0 && n > d && (p = d - n), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Object.assign(Object.assign({}, o), {
        xDiff: u,
        yDiff: p,
        inBounds: !u && !p
      })
    }

    clampTargetBounds() {
      const {target: t} = this, {x: e, y: i} = this.getBounds();
      e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max))
    }

    calculateContentDim(t = this.current) {
      const {content: e, contentRect: i} = this, {fitWidth: s, fitHeight: n, fullWidth: o, fullHeight: a} = i;
      let r = o, l = a;
      if (this.option("zoom") || 0 !== this.angle) {
        const i = !(e instanceof HTMLImageElement || "none" !== window.getComputedStyle(e).maxWidth && "none" !== window.getComputedStyle(e).maxHeight),
          h = i ? o : s, c = i ? a : n, d = this.getMatrix(t), u = new DOMPoint(0, 0).matrixTransform(d),
          p = new DOMPoint(0 + h, 0).matrixTransform(d), g = new DOMPoint(0 + h, 0 + c).matrixTransform(d),
          m = new DOMPoint(0, 0 + c).matrixTransform(d), f = Math.abs(g.x - u.x), b = Math.abs(g.y - u.y),
          v = Math.abs(m.x - p.x), y = Math.abs(m.y - p.y);
        r = Math.max(f, v), l = Math.max(b, y)
      }
      return {contentWidth: r, contentHeight: l}
    }

    setEdgeForce() {
      if (this.ignoreBounds || this.isDragging || "mousemove" === this.panMode || this.targetScale < this.scale) return this.isBouncingX = !1, void (this.isBouncingY = !1);
      const {target: t} = this, {x: e, y: i, xDiff: s, yDiff: n} = this.checkBounds(), o = this.option("maxVelocity");
      let a = this.velocity.e, r = this.velocity.f;
      0 !== s ? (this.isBouncingX = !0, s * a <= 0 ? a += .14 * s : (a = .14 * s, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 0 !== n ? (this.isBouncingY = !0, n * r <= 0 ? r += .14 * n : (r = .14 * n, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r)
    }

    enable() {
      const {content: t} = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
      for (const t of E) this.current[t] = this.target[t] = e[t];
      this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = P.Ready, this.emit("ready")
    }

    onClick(t) {
      var e;
      this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), this.trackingPoints = [], this.startDecelAnim());
      const i = t.target;
      if (!i || t.defaultPrevented) return;
      if (i && i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
      if ((() => {
        const t = window.getSelection();
        return t && "Range" === t.type
      })() && !i.closest("button")) return;
      const s = i.closest("[data-panzoom-action]"), n = i.closest("[data-panzoom-change]"), o = s || n,
        a = o && T(o) ? o.dataset : null;
      if (a) {
        const e = a.panzoomChange, i = a.panzoomAction;
        if ((e || i) && t.preventDefault(), e) {
          let i = {};
          try {
            i = JSON.parse(e)
          } catch (t) {
            console && console.warn("The given data was not valid JSON")
          }
          return void this.applyChange(i)
        }
        if (i) return void (this[i] && this[i]())
      }
      if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
      const r = this.content.getBoundingClientRect();
      if (this.dragStart.time && !this.canZoomOut() && (Math.abs(r.x - this.dragStart.x) > 2 || Math.abs(r.y - this.dragStart.y) > 2)) return;
      this.dragStart.time = 0;
      const l = e => {
        !this.option("zoom") || Math.abs(this.velocity.a) > .3 || e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), this[e]({event: t}))
      }, h = this.option("click", t), c = this.option("dblClick", t);
      c ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout(() => {
        1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && l(h)) : (this.emit("dblClick", t), t.defaultPrevented || l(c)), this.clicks = 0, this.clickTimer = null
      }, 350))) : (this.emit("click", t), !t.defaultPrevented && h && l(h))
    }

    addTrackingPoint(t) {
      const e = this.trackingPoints.filter(t => t.time > Date.now() - 100);
      e.push(t), this.trackingPoints = e
    }

    onPointerDown(t, e, i) {
      var s;
      this.dragOffset = {x: 0, y: 0, time: 0}, this.trackingPoints = [];
      const n = this.content.getBoundingClientRect();
      if (this.dragStart = {x: n.x, y: n.y, top: n.top, left: n.left, time: Date.now()}, this.clickTimer) return !1;
      if ("mousemove" === this.panMode && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
      if (!i.length) {
        const e = t.composedPath()[0];
        if (["A", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(e.nodeName) || e.closest("[contenteditable]") || e.closest("[data-selectable]") || e.closest("[data-panzoom-change]") || e.closest("[data-panzoom-action]")) return !1;
        null === (s = window.getSelection()) || void 0 === s || s.removeAllRanges()
      }
      return "mousedown" === t.type && t.preventDefault(), l(this.targetScale, 1e3) === l(this.minScale, 1e3) ? (this.stop(), this.target.e = this.current.e, this.target.f = this.current.f) : this.stop("target"), this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t), !0
    }

    onPointerMove(t, e, i) {
      if (!1 === this.option("touch", t)) return;
      if (!this.isDragging) return;
      if (e.length < 2 && this.panOnlyZoomed && l(this.targetScale) <= l(this.minScale)) return;
      if (this.emit("touchMove", t), t.defaultPrevented) return;
      this.addTrackingPoint(e[0]);
      const {content: s} = this, n = S(i[0], i[1]), o = S(e[0], e[1]);
      let a = 0, r = 0;
      if (e.length > 1) {
        const t = s.getBoundingClientRect();
        a = n.clientX - t.left - .5 * t.width, r = n.clientY - t.top - .5 * t.height
      }
      const h = x(i[0], i[1]), c = x(e[0], e[1]);
      let d = h ? c / h : 1, u = o.clientX - n.clientX, p = o.clientY - n.clientY;
      this.dragOffset.x += u, this.dragOffset.y += p, this.dragOffset.time = Date.now() - this.dragStart.time;
      let g = l(this.targetScale) === l(this.minScale) && this.option("lockAxis");
      if (g && !this.lockedAxis) if ("xy" === g || "y" === g || "touchmove" === t.type) {
        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
        const e = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
        this.lockedAxis = e > 45 && e < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, u = 0, p = 0
      } else this.lockedAxis = g;
      if (b(t.target, this.content) && (g = "x", this.dragOffset.y = 0), g && "xy" !== g && this.lockedAxis !== g && l(this.targetScale) === l(this.minScale)) return;
      t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
      const m = this.checkBounds(u, p);
      this.option("rubberband") ? ("x" !== this.isInfinite && (m.xDiff > 0 && u < 0 || m.xDiff < 0 && u > 0) && (u *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * m.xDiff))), "y" !== this.isInfinite && (m.yDiff > 0 && p < 0 || m.yDiff < 0 && p > 0) && (p *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * m.yDiff)))) : (m.xDiff && (u = 0), m.yDiff && (p = 0));
      const f = this.targetScale, v = this.minScale, y = this.maxScale;
      f < .5 * v && (d = Math.max(d, v)), f > 1.5 * y && (d = Math.min(d, y)), "y" === this.lockedAxis && l(f) === l(v) && (u = 0), "x" === this.lockedAxis && l(f) === l(v) && (p = 0), this.applyChange({
        originX: a,
        originY: r,
        panX: u,
        panY: p,
        scale: d,
        friction: this.option("dragFriction"),
        ignoreBounds: !0
      })
    }

    onPointerUp(t, e, i) {
      if (i.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
      this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), b(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== P.Destroy && (t.defaultPrevented || this.startDecelAnim()))
    }

    startDecelAnim() {
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const t of E) this.velocity[t] = 0, this.target[t] = this.current[t];
      d(this.container, "is-scaling"), d(this.container, "is-animating"), this.isTicking = !1;
      const {trackingPoints: t} = this, e = t[0], i = t[t.length - 1];
      let s = 0, n = 0, o = 0;
      i && e && (s = i.clientX - e.clientX, n = i.clientY - e.clientY, o = i.time - e.time);
      let a = 0, r = 0, h = 0, c = 0, u = this.option("decelFriction");
      const p = this.targetScale;
      if ((p < this.minScale - 1e-5 || p > this.maxScale + 1e-5) && (u = .35), o > 0) {
        h = Math.abs(s) > 3 ? s / (o / 30) : 0, c = Math.abs(n) > 3 ? n / (o / 30) : 0;
        const t = this.option("maxVelocity");
        t && (h = Math.max(Math.min(h, t), -1 * t), c = Math.max(Math.min(c, t), -1 * t))
      }
      h && (a = h / (1 / (1 - u) - 1)), c && (r = c / (1 / (1 - u) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && l(p) === this.minScale) && (a = h = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && l(p) === this.minScale) && (r = c = 0);
      const g = this.dragOffset.x, m = this.dragOffset.y, f = this.option("dragMinThreshold") || 0;
      Math.abs(g) < f && Math.abs(m) < f && (a = r = 0, h = c = 0), this.applyChange({
        panX: a,
        panY: r,
        friction: u
      }), this.emit("decel", h, c, g, m)
    }

    onWheel(t) {
      const e = Date.now(), i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail));
      if (this.prevWheelTime && e - this.prevWheelTime < 200 && this.prevWheelDelta !== i) return void t.preventDefault();
      if (this.prevWheelDelta = i, this.prevWheelTime = e, this.emit("wheel", t, i), "mousemove" === this.panMode) return;
      if (t.defaultPrevented) return;
      const s = this.option("wheel");
      "pan" === s ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
        panY: 100 * i,
        bounce: !1
      })) : "zoom" === s && !1 !== this.option("zoom") && this.zoomWithWheel(t)
    }

    onMouseMove(t) {
      this.panWithMouse(t)
    }

    onKeydown(t) {
      "Escape" === t.key && this.toggleFS()
    }

    onResize() {
      this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
    }

    setTransform() {
      this.emit("beforeTransform");
      const {current: t, target: e, content: i, contentRect: s} = this, n = Object.assign({}, M);
      for (const i of E) {
        const s = "e" == i || "f" === i ? 1e3 : 1e5;
        n[i] = l(t[i], s), Math.abs(e[i] - t[i]) < ("e" == i || "f" === i ? .51 : .001) && (this.current[i] = e[i])
      }
      const {a: o, b: a, c: r, d: h, e: c, f: d} = n, u = `matrix(${o}, ${a}, ${r}, ${h}, ${c}, ${d})`,
        p = (this.option("transformParent") ? i.parentElement : null) || i;
      if (p.style.transform === u) return;
      p.style.transform = u;
      const {contentWidth: g, contentHeight: m} = this.calculateContentDim();
      s.width = g, s.height = m, this.emit("afterTransform")
    }

    updateMetrics(t = !1) {
      if (!this || this.state === P.Destroy) return;
      const {container: e, containerRect: i, content: s} = this, n = i.innerWidth, o = i.innerHeight,
        a = e.getBoundingClientRect(), r = getComputedStyle(this.container), h = a.width, c = a.height,
        d = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom),
        u = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight);
      this.containerRect = {width: h, height: c, innerWidth: h - u, innerHeight: c - d};
      let p = this.option("width") || "auto", g = this.option("height") || "auto";
      "auto" === p && (p = parseFloat(s.dataset.width || "") || (t => {
        let e = 0;
        return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : t.offsetWidth, Math.max(e, t.scrollWidth)
      })(s)), "auto" === g && (g = parseFloat(s.dataset.height || "") || (t => {
        let e = 0;
        return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : t.offsetHeight, Math.max(e, t.scrollHeight)
      })(s));
      const m = (this.option("transformParent") ? s.parentElement : null) || s, f = m.getAttribute("style") || "";
      m.style.setProperty("transform", "none", "important"), s instanceof HTMLImageElement && (m.style.width = "", m.style.height = ""), m.offsetHeight;
      const b = s.getBoundingClientRect();
      let v = b.width, y = b.height, w = 0, x = 0;
      if (s instanceof HTMLImageElement && ({width: v, height: y, top: w, left: x} = ((t, e, i, s) => {
        const n = i / s;
        return n > t / e ? (i = t, s = t / n) : (i = e * n, s = e), {
          width: i,
          height: s,
          top: .5 * (e - s),
          left: .5 * (t - i)
        }
      })(b.width, b.height, p, g)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
        top: b.top - a.top + w,
        bottom: a.bottom - b.bottom + w,
        left: b.left - a.left + x,
        right: a.right - b.right + x,
        fitWidth: v,
        fitHeight: y,
        width: v,
        height: y,
        fullWidth: p,
        fullHeight: g
      }), m.style.cssText = f, s instanceof HTMLImageElement && (m.style.width = v + "px", m.style.height = y + "px"), this.setTransform(), !0 !== t) {
        let t = "";
        Math.abs(h - n) > 1 && (t += "x"), Math.abs(c - o) > 1 && (t += "y"), t && this.emit("refresh", t)
      }
      this.ignoreBounds || (l(this.targetScale) < l(this.minScale) ? this.zoomTo(this.minScale, {friction: 0}) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {friction: 0}) : this.state === P.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
    }

    getBounds() {
      const t = this.option("bounds");
      if ("auto" !== t) return t;
      const {contentWidth: e, contentHeight: i} = this.calculateContentDim(this.target);
      let s = 0, n = 0, o = 0, a = 0;
      const r = this.option("infinite");
      if (!0 === r || this.lockedAxis && r === this.lockedAxis) s = -1 / 0, o = 1 / 0, n = -1 / 0, a = 1 / 0; else {
        let {containerRect: t, contentRect: r} = this, h = l(this.contentRect.fitWidth * this.targetScale, 1e3),
          c = l(this.contentRect.fitHeight * this.targetScale, 1e3), {innerWidth: d, innerHeight: u} = t;
        if (this.containerRect.width === h && (d = t.width), this.containerRect.width === c && (u = t.height), e > d) {
          o = .5 * (e - d), s = -1 * o;
          let t = .5 * (r.right - r.left);
          s += t, o += t
        }
        if (this.contentRect.fitWidth > d && e < d && (s -= .5 * (this.contentRect.fitWidth - d), o -= .5 * (this.contentRect.fitWidth - d)), i > u) {
          a = .5 * (i - u), n = -1 * a;
          let t = .5 * (r.bottom - r.top);
          n += t, a += t
        }
        this.contentRect.fitHeight > u && i < u && (s -= .5 * (this.contentRect.fitHeight - u), o -= .5 * (this.contentRect.fitHeight - u))
      }
      return {x: {min: s, max: o}, y: {min: n, max: a}}
    }

    updateControls() {
      const t = this, e = t.container;
      let i = {
          toggleMax: this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? this.maxScale : this.minScale,
          toggleCover: this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? this.coverScale : this.minScale,
          toggleZoom: this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? this.fullScale : this.minScale
        }[this.option("click") || ""] || this.minScale, s = t.canZoomIn(), n = t.canZoomOut(),
        o = "drag" === this.panMode, a = n && o;
      this.targetScale <= this.minScale && !this.panOnlyZoomed && (a = !0), (this.contentRect.width - this.contentRect.fitWidth > -1 || this.contentRect.height - this.contentRect.fitHeight > -1) && (a = !0), this.contentRect.width * this.targetScale < this.contentRect.fitWidth && (a = !1), "mousemove" === this.panMode && (a = !1);
      let r = s && l(i) > l(this.targetScale), h = !r && !a && n && l(i) < l(this.targetScale);
      u(e, this.cn("canZoomIn"), r), u(e, this.cn("canZoomOut"), h), u(e, this.cn("isDraggable"), a);
      for (const t of e.querySelectorAll('[data-panzoom-action="zoomIn"]')) s ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
      for (const t of e.querySelectorAll('[data-panzoom-action="zoomOut"]')) n ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
      for (const i of e.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
        s = t.targetScale < t.fullScale - .1, s || n ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"));
        const e = i.querySelector("g");
        e && (e.style.display = t.targetScale > .9 * t.fullScale ? "none" : "")
      }
    }

    panTo({x: t = this.target.e, y: e = this.target.f, scale: i = this.targetScale, friction: s = this.option("friction"), angle: n = 0, originX: o = 0, originY: a = 0, flipX: r = !1, flipY: l = !1, ignoreBounds: h = !1}) {
      this.state !== P.Destroy && this.applyChange({
        panX: t - this.target.e,
        panY: e - this.target.f,
        scale: i / this.targetScale,
        angle: n,
        originX: o,
        originY: a,
        friction: s,
        flipX: r,
        flipY: l,
        ignoreBounds: h
      })
    }

    applyChange({panX: t = 0, panY: e = 0, scale: i = 1, angle: s = 0, originX: n = -this.current.e, originY: o = -this.current.f, friction: a = this.option("friction"), flipX: r = !1, flipY: h = !1, ignoreBounds: c = !1, bounce: d = this.option("bounce")}) {
      const u = this.state;
      if (u === P.Init || u === P.Destroy) return;
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const t of E) this.velocity[t] = 0;
      this.friction = a || 0, this.ignoreBounds = c;
      const {current: p} = this, g = p.e, m = p.f, f = this.getMatrix(this.target);
      let b = (new DOMMatrix).translate(g, m).translate(n, o).translate(t, e);
      if (this.option("zoom")) {
        if (!c) {
          const t = this.targetScale, e = this.minScale, s = this.maxScale;
          t * i < e && (i = e / t), t * i > s && (i = s / t)
        }
        b = b.scale(i)
      }
      b = b.translate(-n, -o).translate(-g, -m).multiply(f), s && (b = b.rotate(s)), r && (b = b.scale(-1, 1)), h && (b = b.scale(1, -1));
      for (const t of E) "a" != t && "d" != t || !(b[t] > this.minScale + 1e-5 || b[t] < this.minScale - 1e-5) ? this.target[t] = l(b[t], 1e3) : this.target[t] = b[t];
      (this.targetScale < this.scale || Math.abs(i - 1) > .1 || "mousemove" === this.panMode || !1 === d) && !c && this.clampTargetBounds(), this.isResting || (this.state = P.Panning, this.requestTick())
    }

    stop(t = !1) {
      if (this.state === P.Init || this.state === P.Destroy) return;
      const e = this.isTicking;
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const e of E) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
      this.setTransform(), d(this.container, "is-scaling"), d(this.container, "is-animating"), this.isTicking = !1, this.state = P.Ready, e && (this.emit("endAnimation"), this.updateControls())
    }

    requestTick() {
      this.isTicking || (this.emit("startAnimation"), this.updateControls(), c(this.container, "is-animating"), this.isScaling && c(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()))
    }

    panWithMouse(t, e = this.option("mouseMoveFriction")) {
      if (this.prevMouseMoveEvent = t, "mousemove" !== this.panMode || !t) return;
      if (l(this.targetScale) <= l(this.minScale)) return;
      this.emit("mouseMove", t);
      const {container: i, containerRect: s, contentRect: n} = this, o = s.width, a = s.height,
        r = i.getBoundingClientRect(), h = (t.clientX || 0) - r.left, c = (t.clientY || 0) - r.top;
      let {contentWidth: d, contentHeight: u} = this.calculateContentDim(this.target);
      const p = this.option("mouseMoveFactor");
      p > 1 && (d !== o && (d *= p), u !== a && (u *= p));
      let g = .5 * (d - o) - h / o * 100 / 100 * (d - o);
      g += .5 * (n.right - n.left);
      let m = .5 * (u - a) - c / a * 100 / 100 * (u - a);
      m += .5 * (n.bottom - n.top), this.applyChange({panX: g - this.target.e, panY: m - this.target.f, friction: e})
    }

    zoomWithWheel(t) {
      if (this.state === P.Destroy || this.state === P.Init) return;
      const e = Math.abs(t.deltaY) < 100 && Math.abs(t.deltaX) < 100 ? 25 : 50,
        i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail)), s = this.targetScale, n = this.maxScale,
        o = this.minScale;
      let a = s * (100 + i * e) / 100;
      a < o && s <= o ? (this.wheelDelta += Math.abs(i), a = o) : a > n && s >= n ? (this.wheelDelta += Math.abs(i), a = n) : (this.wheelDelta = 0, a = Math.max(Math.min(a, n), o)), this.wheelDelta > this.option("wheelLimit") || (t.preventDefault(), a !== s && this.zoomTo(a, {event: t}))
    }

    canZoomIn() {
      return this.option("zoom") && (this.contentRect.width < this.contentRect.fitWidth || this.targetScale < this.maxScale - 1e-5)
    }

    canZoomOut() {
      return this.option("zoom") && this.targetScale > this.minScale + 1e-5
    }

    zoomIn(t = 1.25, e) {
      this.zoomTo(this.targetScale * t, e)
    }

    zoomOut(t = .8, e) {
      this.zoomTo(this.targetScale * t, e)
    }

    zoomToFit(t) {
      this.zoomTo("fit", t)
    }

    zoomToCover(t) {
      this.zoomTo("cover", t)
    }

    zoomToFull(t) {
      this.zoomTo("full", t)
    }

    zoomToMax(t) {
      this.zoomTo("max", t)
    }

    toggleZoom(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? "full" : "fit", t)
    }

    toggleMax(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? "max" : "fit", t)
    }

    toggleCover(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? "cover" : "fit", t)
    }

    iterateZoom(t) {
      this.zoomTo("next", t)
    }

    zoomTo(t = 1, {friction: e = "auto", originX: i = 0, originY: s = 0, event: n} = {}) {
      if (this.isContentLoading || this.state === P.Destroy) return;
      this.stop();
      const {targetScale: o} = this;
      let a = 1;
      if ("mousemove" === this.panMode && (n = this.prevMouseMoveEvent || n), n) {
        const t = this.content.getBoundingClientRect(), e = n.clientX || 0, o = n.clientY || 0;
        i = e - t.left - .5 * t.width, s = o - t.top - .5 * t.height
      }
      const r = this.fullScale, l = this.maxScale;
      let h = this.coverScale;
      "number" == typeof t ? a = t / o : ("next" === t && (r - h < .2 && (h = r), t = o < r - 1e-5 ? "full" : o < l - 1e-5 ? "max" : "fit"), a = "full" === t ? r / o || 1 : "cover" === t ? h / o || 1 : "max" === t ? l / o || 1 : 1 / o || 1), e = "auto" === e ? a > 1 ? .15 : .25 : e, this.applyChange({
        scale: a,
        originX: i,
        originY: s,
        friction: e
      }), n && "mousemove" === this.panMode && this.panWithMouse(n, e)
    }

    rotateCCW() {
      this.applyChange({angle: -90})
    }

    rotateCW() {
      this.applyChange({angle: 90})
    }

    flipX() {
      this.applyChange({flipX: !0})
    }

    flipY() {
      this.applyChange({flipY: !0})
    }

    fitX() {
      this.stop("target");
      const {containerRect: t, contentRect: e, target: i} = this;
      this.applyChange({
        panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
        panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
        scale: t.width / e.fitWidth / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0
      })
    }

    fitY() {
      this.stop("target");
      const {containerRect: t, contentRect: e, target: i} = this;
      this.applyChange({
        panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
        panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
        scale: t.height / e.fitHeight / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0
      })
    }

    toggleFS() {
      const {container: t} = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
      t.classList.toggle(e);
      const s = t.classList.contains(e);
      s ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(s ? "enterFS" : "exitFS")
    }

    getMatrix(t = this.current) {
      const {a: e, b: i, c: s, d: n, e: o, f: a} = t;
      return new DOMMatrix([e, i, s, n, o, a])
    }

    reset(t) {
      if (this.state !== P.Init && this.state !== P.Destroy) {
        this.stop("current");
        for (const t of E) this.target[t] = M[t];
        this.target.a = this.minScale, this.target.d = this.minScale, this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = P.Panning, this.requestTick())
      }
    }

    destroy() {
      this.stop(), this.state = P.Destroy, this.detachEvents(), this.detachObserver();
      const {container: t, content: e} = this, i = this.option("classes") || {};
      for (const e of Object.values(i)) t.classList.remove(e + "");
      e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
    }
  }

  Object.defineProperty(z, "defaults", {
    enumerable: !0, configurable: !0, writable: !0, value: {
      content: null,
      width: "auto",
      height: "auto",
      panMode: "drag",
      touch: !0,
      dragMinThreshold: 3,
      lockAxis: !1,
      mouseMoveFactor: 1,
      mouseMoveFriction: .12,
      zoom: !0,
      pinchToZoom: !0,
      panOnlyZoomed: "auto",
      minScale: 1,
      maxScale: 2,
      friction: .25,
      dragFriction: .35,
      decelFriction: .05,
      click: "toggleZoom",
      dblClick: !1,
      wheel: "zoom",
      wheelLimit: 7,
      spinner: !0,
      bounds: "auto",
      infinite: !1,
      rubberband: !0,
      bounce: !0,
      maxVelocity: 75,
      transformParent: !1,
      classes: {
        content: "f-panzoom__content",
        isLoading: "is-loading",
        canZoomIn: "can-zoom_in",
        canZoomOut: "can-zoom_out",
        isDraggable: "is-draggable",
        isDragging: "is-dragging",
        inFullscreen: "in-fullscreen",
        htmlHasFullscreen: "with-panzoom-in-fullscreen"
      },
      l10n: {
        PANUP: "Move up",
        PANDOWN: "Move down",
        PANLEFT: "Move left",
        PANRIGHT: "Move right",
        ZOOMIN: "Zoom in",
        ZOOMOUT: "Zoom out",
        TOGGLEZOOM: "Toggle zoom level",
        TOGGLE1TO1: "Toggle zoom level",
        ITERATEZOOM: "Toggle zoom level",
        ROTATECCW: "Rotate counterclockwise",
        ROTATECW: "Rotate clockwise",
        FLIPX: "Flip horizontally",
        FLIPY: "Flip vertically",
        FITX: "Fit horizontally",
        FITY: "Fit vertically",
        RESET: "Reset",
        TOGGLEFS: "Toggle fullscreen"
      }
    }
  }), Object.defineProperty(z, "Plugins", {enumerable: !0, configurable: !0, writable: !0, value: {}});
  var A;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy"
  }(A || (A = {}));
  const L = t => {
    if ("string" == typeof t && (t = {html: t}), !(t instanceof String || t instanceof HTMLElement)) {
      const e = t.thumb;
      void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb)
    }
    return Object.assign({
      html: "",
      el: null,
      isDom: !1,
      class: "",
      index: -1,
      dim: 0,
      gap: 0,
      pos: 0,
      transition: !1
    }, t)
  }, R = (t = {}) => Object.assign({index: -1, slides: [], dim: 0, pos: -1}, t);

  class k extends m {
    constructor(t, e) {
      super(e), Object.defineProperty(this, "instance", {enumerable: !0, configurable: !0, writable: !0, value: t})
    }

    attach() {
    }

    detach() {
    }
  }

  class D extends k {
    constructor() {
      super(...arguments), Object.defineProperty(this, "isDynamic", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "list", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onRefresh() {
      this.refresh()
    }

    build() {
      let t = this.list;
      return t || (t = document.createElement("ul"), c(t, this.cn("list")), t.setAttribute("role", "tablist"), this.instance.container.appendChild(t), c(this.instance.container, this.cn("hasDots")), this.list = t), t
    }

    refresh() {
      var t;
      const e = this.instance.pages.length, i = Math.min(2, this.option("minCount")),
        s = Math.max(2e3, this.option("maxCount")), n = this.option("dynamicFrom");
      if (e < i || e > s) return void this.cleanup();
      const o = "number" == typeof n && e > 5 && e >= n,
        a = !this.list || this.isDynamic !== o || this.list.children.length !== e;
      a && this.cleanup();
      const r = this.build();
      if (u(r, this.cn("isDynamic"), !!o), a) for (let t = 0; t < e; t++) r.append(this.createItem(t));
      let l, h = 0;
      for (const e of [...r.children]) {
        const i = h === this.instance.page;
        i && (l = e), u(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
        for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) d(e, this.cn(t));
        h++
      }
      if (l = l || r.firstChild, o && l) {
        const t = l.previousElementSibling, e = t && t.previousElementSibling;
        c(t, this.cn("isPrev")), c(e, this.cn("isBeforePrev"));
        const i = l.nextElementSibling, s = i && i.nextElementSibling;
        c(i, this.cn("isNext")), c(s, this.cn("isAfterNext"))
      }
      this.isDynamic = o
    }

    createItem(t = 0) {
      var e;
      const i = document.createElement("li");
      i.setAttribute("role", "presentation");
      const s = r(this.instance.localize(this.option("dotTpl"), [["%d", t + 1]]).replace(/\%i/g, t + ""));
      return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), i
    }

    cleanup() {
      this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, d(this.instance.container, this.cn("hasDots"))
    }

    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh)
    }

    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
    }
  }

  Object.defineProperty(D, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      classes: {
        list: "f-carousel__dots",
        isDynamic: "is-dynamic",
        hasDots: "has-dots",
        dot: "f-carousel__dot",
        isBeforePrev: "is-before-prev",
        isPrev: "is-prev",
        isCurrent: "is-current",
        isNext: "is-next",
        isAfterNext: "is-after-next"
      },
      dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
      dynamicFrom: 11,
      maxCount: 1 / 0,
      minCount: 2
    }
  });

  class I extends k {
    constructor() {
      super(...arguments), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "prev", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "next", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onRefresh() {
      const t = this.instance, e = t.pages.length, i = t.page;
      if (e < 2) return void this.cleanup();
      this.build();
      let s = this.prev, n = this.next;
      s && n && (s.removeAttribute("disabled"), n.removeAttribute("disabled"), t.isInfinite || (i <= 0 && s.setAttribute("disabled", ""), i >= e - 1 && n.setAttribute("disabled", "")))
    }

    createButton(t) {
      const e = this.instance, i = document.createElement("button");
      i.setAttribute("tabindex", "0"), i.setAttribute("title", e.localize(`{{${t.toUpperCase()}}}`)), c(i, this.cn("button") + " " + this.cn("next" === t ? "isNext" : "isPrev"));
      const s = e.isRTL ? "next" === t ? "prev" : "next" : t;
      var n;
      return i.innerHTML = e.localize(this.option(s + "Tpl")), i.dataset["carousel" + (n = t, n ? n.match("^[a-z]") ? n.charAt(0).toUpperCase() + n.substring(1) : n : "")] = "true", i
    }

    build() {
      let t = this.container;
      t || (this.container = t = document.createElement("div"), c(t, this.cn("container")), this.instance.container.appendChild(t)), this.next || (this.next = t.appendChild(this.createButton("next"))), this.prev || (this.prev = t.appendChild(this.createButton("prev")))
    }

    cleanup() {
      this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), this.prev = null, this.next = null, this.container = null
    }

    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh)
    }

    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
    }
  }

  Object.defineProperty(I, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      classes: {container: "f-carousel__nav", button: "f-button", isNext: "is-next", isPrev: "is-prev"},
      nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
      prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
    }
  });

  class j extends k {
    constructor() {
      super(...arguments), Object.defineProperty(this, "selectedIndex", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "nav", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    addAsTargetFor(t) {
      this.target = this.instance, this.nav = t, this.attachEvents()
    }

    addAsNavFor(t) {
      this.nav = this.instance, this.target = t, this.attachEvents()
    }

    attachEvents() {
      this.nav && this.target && (this.nav.options.initialSlide = this.target.options.initialPage, this.nav.on("ready", this.onNavReady), this.nav.state === A.Ready && this.onNavReady(this.nav), this.target.on("ready", this.onTargetReady), this.target.state === A.Ready && this.onTargetReady(this.target))
    }

    onNavReady(t) {
      t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange()
    }

    onTargetReady(t) {
      t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
    }

    onNavClick(t, e, i) {
      i.pointerType || this.onNavTouch(t, t.panzoom, i)
    }

    onNavTouch(t, e, i) {
      var s, n;
      if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
      const o = i.target, {nav: a, target: r} = this;
      if (!a || !r || !o) return;
      const l = o.closest("[data-index]");
      if (i.stopPropagation(), i.preventDefault(), !l) return;
      const h = parseInt(l.dataset.index || "", 10) || 0, c = r.getPageForSlide(h), d = a.getPageForSlide(h);
      a.slideTo(d), r.slideTo(c, {friction: null === (n = null === (s = this.nav) || void 0 === s ? void 0 : s.plugins) || void 0 === n ? void 0 : n.Sync.option("friction")}), this.markSelectedSlide(h)
    }

    onNavCreateSlide(t, e) {
      e.index === this.selectedIndex && this.markSelectedSlide(e.index)
    }

    onTargetChange() {
      const {target: t, nav: e} = this;
      if (!t || !e) return;
      if (e.state !== A.Ready || t.state !== A.Ready) return;
      const i = t.pages[t.page].slides[0].index, s = e.getPageForSlide(i);
      this.markSelectedSlide(i), e.slideTo(s)
    }

    markSelectedSlide(t) {
      const {nav: e} = this;
      e && e.state === A.Ready && (this.selectedIndex = t, [...e.slides].map(e => {
        e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected")
      }))
    }

    attach() {
      let t = this.options.target, e = this.options.nav;
      t ? this.addAsNavFor(t) : e && this.addAsTargetFor(e)
    }

    detach() {
      this.nav && (this.nav.off("ready", this.onNavReady), this.nav.off("createSlide", this.onNavCreateSlide), this.nav.off("Panzoom.click", this.onNavClick), this.nav.off("Panzoom.touchEnd", this.onNavTouch)), this.nav = null, this.target && (this.target.off("ready", this.onTargetReady), this.target.off("refresh", this.onTargetChange), this.target.off("change", this.onTargetChange)), this.target = null
    }
  }

  Object.defineProperty(j, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: {friction: .35}});
  const F = {Navigation: I, Dots: D, Sync: j};

  class H extends f {
    get axis() {
      return this.isHorizontal ? "e" : "f"
    }

    get isEnabled() {
      return this.state === A.Ready
    }

    get isInfinite() {
      let t = !1;
      const e = this.contentDim, i = this.viewportDim;
      return this.pages.length >= 2 && e > 1.5 * i && (t = this.option("infinite")), t
    }

    get isRTL() {
      return "rtl" === this.option("direction")
    }

    get isHorizontal() {
      return "x" === this.option("axis")
    }

    constructor(t, e = {}, i = {}) {
      if (super(), Object.defineProperty(this, "userOptions", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
      }), Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
      }), Object.defineProperty(this, "bp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ""
      }), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: A.Init
      }), Object.defineProperty(this, "page", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevPage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "viewport", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "slides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "pages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "inTransition", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set
      }), Object.defineProperty(this, "contentDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "viewportDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), "string" == typeof t && (t = document.querySelector(t)), !t || !T(t)) throw new Error("No Element found");
      this.container = t, this.slideNext = o(this.slideNext.bind(this), 150), this.slidePrev = o(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = i, queueMicrotask(() => {
        this.processOptions()
      })
    }

    processOptions() {
      const t = n({}, H.defaults, this.userOptions);
      let e = "";
      const i = t.breakpoints;
      if (i && s(i)) for (const [o, a] of Object.entries(i)) window.matchMedia(o).matches && s(a) && (e += o, n(t, a));
      e === this.bp && this.state !== A.Init || (this.bp = e, this.state === A.Ready && (t.initialSlide = this.pages[this.page].slides[0].index), this.state !== A.Init && this.destroy(), super.setOptions(t), !1 === this.option("enabled") ? this.attachEvents() : setTimeout(() => {
        this.init()
      }, 0))
    }

    init() {
      this.state = A.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, H.Plugins), this.userPlugins)), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = A.Ready, this.emit("ready")
    }

    initLayout() {
      const {container: t} = this, e = this.option("classes");
      c(t, this.cn("container")), u(t, e.isLTR, !this.isRTL), u(t, e.isRTL, this.isRTL), u(t, e.isVertical, !this.isHorizontal), u(t, e.isHorizontal, this.isHorizontal);
      let i = this.option("viewport") || t.querySelector("." + e.viewport);
      i || (i = document.createElement("div"), c(i, e.viewport), i.append(...a(t, "." + e.slide)), t.prepend(i));
      let s = this.option("track") || t.querySelector("." + e.track);
      s || (s = document.createElement("div"), c(s, e.track), s.append(...Array.from(i.childNodes))), s.setAttribute("aria-live", "polite"), i.contains(s) || i.prepend(s), this.viewport = i, this.track = s, this.emit("initLayout")
    }

    initSlides() {
      const {track: t} = this;
      if (t) {
        this.slides = [], [...a(t, "." + this.cn("slide"))].forEach(t => {
          if (T(t)) {
            const e = L({el: t, isDom: !0, index: this.slides.length});
            this.slides.push(e), this.emit("initSlide", e, this.slides.length)
          }
        });
        for (let t of this.option("slides", [])) {
          const e = L(t);
          e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", e, this.slides.length)
        }
        this.emit("initSlides")
      }
    }

    setInitialPage() {
      let t = 0;
      const e = this.option("initialSlide");
      t = "number" == typeof e ? this.getPageForSlide(e) : parseInt(this.option("initialPage", 0) + "", 10) || 0, this.page = t
    }

    setInitialPosition() {
      if (!this.track || !this.pages.length) return;
      const t = this.isHorizontal;
      let e = this.page;
      this.pages[e] || (this.page = e = 0);
      const i = this.pages[e].pos * (this.isRTL && t ? 1 : -1), s = t ? i + "px" : "0", n = t ? "0" : i + "px";
      this.track.style.transform = `translate3d(${s}, ${n}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
    }

    initPanzoom() {
      this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
      const t = this.option("Panzoom") || {};
      this.panzoom = new z(this.viewport, n({}, {
        content: this.track,
        zoom: !1,
        panOnlyZoomed: !1,
        lockAxis: this.isHorizontal ? "x" : "y",
        infinite: this.isInfinite,
        click: !1,
        dblClick: !1,
        touch: t => !(this.pages.length < 2 && !t.options.infinite),
        bounds: () => this.getBounds(),
        maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
      }, t)), this.panzoom.on("*", (t, e, ...i) => {
        this.emit("Panzoom." + e, t, ...i)
      }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation)
    }

    attachEvents() {
      const t = this.container;
      t && (t.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
    }

    createPages() {
      let t = [];
      const {contentDim: e, viewportDim: i} = this, s = this.option("slidesPerPage");
      if ("number" == typeof s && e > i) {
        for (let e = 0; e < this.slides.length; e += s) t.push(R({index: e, slides: this.slides.slice(e, e + s)}));
        return t
      }
      let n = 0, o = 0;
      for (const e of this.slides) (!t.length || o + e.dim > i) && (t.push(R()), n = t.length - 1, o = 0), o += e.dim + e.gap, t[n].slides.push(e);
      return t
    }

    processPages() {
      const t = this.pages, {contentDim: e, viewportDim: i} = this, s = this.option("center"), n = this.option("fill"),
        o = n && s && e > i && !this.isInfinite;
      if (t.forEach((t, n) => {
        t.index = n, t.pos = t.slides[0].pos, t.dim = 0;
        for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
        o && t.pos + .5 * t.dim < .5 * i ? t.pos = 0 : o && t.pos + .5 * t.dim >= e - .5 * i ? t.pos = e - i : s && (t.pos += -.5 * (i - t.dim))
      }), t.forEach((t, s) => {
        n && !this.isInfinite && e > i && (t.pos = Math.max(t.pos, 0), t.pos = Math.min(t.pos, e - i)), t.pos = l(t.pos, 1e3), t.dim = l(t.dim, 1e3), t.pos < .1 && t.pos > -.1 && (t.pos = 0)
      }), this.isInfinite) return t;
      const a = [];
      let r;
      return t.forEach(t => {
        const e = Object.assign({}, t);
        r && e.pos === r.pos ? (r.dim += e.dim, r.slides = [...r.slides, ...e.slides]) : (e.index = a.length, r = e, a.push(e))
      }), a
    }

    getPageFromIndex(t = 0) {
      const e = this.pages.length;
      let i;
      return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, this.pages.length - 1), 0), i
    }

    getSlideMetrics(t) {
      const e = this.isHorizontal ? "width" : "height";
      let i = 0, s = 0, n = t.el;
      n ? i = parseFloat(n.dataset[e] || "") || 0 : (n = document.createElement("div"), n.style.visibility = "hidden", c(n, this.cn("slide") + " " + t.class), (this.track || document.body).prepend(n)), i ? (n.style[e] = i + "px", n.style["width" === e ? "height" : "width"] = "") : i = n.getBoundingClientRect()[e];
      const o = getComputedStyle(n);
      return "content-box" === o.boxSizing && (this.isHorizontal ? (i += parseFloat(o.paddingLeft) || 0, i += parseFloat(o.paddingRight) || 0) : (i += parseFloat(o.paddingTop) || 0, i += parseFloat(o.paddingBottom) || 0)), s = parseFloat(o[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, this.isHorizontal, t.el || n.remove(), {
        dim: l(i, 1e3),
        gap: l(s, 1e3)
      }
    }

    getBounds() {
      let t = {min: 0, max: 0};
      if (this.isInfinite) t = {min: -1 / 0, max: 1 / 0}; else if (this.pages.length) {
        const e = this.pages[0].pos, i = this.pages[this.pages.length - 1].pos;
        t = this.isRTL && this.isHorizontal ? {min: e, max: i} : {min: -1 * i, max: -1 * e}
      }
      return {x: this.isHorizontal ? t : {min: 0, max: 0}, y: this.isHorizontal ? {min: 0, max: 0} : t}
    }

    repositionSlides() {
      const {viewportDim: t, contentDim: e, page: i, pages: s} = this;
      let n, o = 0, a = 0, r = 0, h = 0;
      this.panzoom ? h = -1 * this.panzoom.current[this.isHorizontal ? "e" : "f"] : s[i] && (h = s[i].pos || 0), n = this.isHorizontal ? this.isRTL ? "right" : "left" : "top", this.isRTL && this.isHorizontal && (h *= -1);
      for (const t of this.slides) t.el ? ("top" === n ? (t.el.style.right = "", t.el.style.left = "") : t.el.style.top = "", t.index !== o ? t.el.style[n] = 0 === a ? "" : l(a, 1e3) + "px" : t.el.style[n] = "", r += t.dim + t.gap, o++) : a += t.dim + t.gap;
      if (this.isInfinite && r) for (const i of this.slides) i.el && (l(i.pos) < l(t) && l(i.pos + i.dim + i.gap) < l(h) && l(h) > l(e - t) && (i.el.style[n] = l(a + r, 1e3) + "px"), l(i.pos + i.gap) >= l(e - t) && l(i.pos) > l(h + t) && l(h) < l(t) && (i.el.style[n] = `-${l(r, 1e3)}px`));
      let c, d, u = [...this.inTransition];
      if (u.length > 1 && (c = this.pages[u[0]], d = this.pages[u[1]]), c && d) {
        let t = 0;
        for (const e of this.slides) e.el ? this.inTransition.has(e.index) && c.slides.indexOf(e) < 0 && (e.el.style[n] = l(t + (c.pos - d.pos), 1e3) + "px") : t += e.dim + e.gap
      }
    }

    createSlideEl(t) {
      if (!this.track || !t) return;
      if (t.el) return;
      const e = document.createElement("div");
      c(e, this.cn("slide")), c(e, t.class), c(e, t.customClass), t.html && (e.innerHTML = t.html);
      const i = [];
      this.slides.forEach((t, e) => {
        t.el && i.push(e)
      });
      const s = t.index;
      let n = null;
      if (i.length) {
        let t = i.reduce((t, e) => Math.abs(e - s) < Math.abs(t - s) ? e : t);
        n = this.slides[t]
      }
      const o = n && n.el ? n.index < t.index ? n.el.nextSibling : n.el : null;
      this.track.insertBefore(e, this.track.contains(o) ? o : null), t.el = e, this.emit("createSlide", t)
    }

    removeSlideEl(t, e = !1) {
      const i = t.el;
      if (!i) return;
      if (d(i, this.cn("isSelected")), t.isDom && !e) return i.removeAttribute("aria-hidden"), i.removeAttribute("data-index"), d(i, this.cn("isSelected")), void (i.style.left = "");
      this.emit("removeSlide", t);
      const s = new CustomEvent("animationend");
      i.dispatchEvent(s), t.el && t.el.remove(), t.el = null
    }

    transitionTo(t = 0, e = this.option("transition")) {
      if (!e) return !1;
      const {pages: i, panzoom: s} = this;
      t = parseInt((t || 0).toString()) || 0;
      const n = this.getPageFromIndex(t);
      if (!s || !i[n] || i.length < 2 || i[this.page].slides[0].dim < this.viewportDim) return !1;
      const o = t > this.page ? 1 : -1, a = this.pages[n].pos * (this.isRTL ? 1 : -1);
      if (this.page === n && l(a, 1e3) === l(s.target[this.axis], 1e3)) return !1;
      this.clearTransitions();
      const r = s.isResting;
      c(this.container, this.cn("inTransition"));
      const h = this.pages[this.page].slides[0], d = this.pages[n].slides[0];
      this.inTransition.add(d.index), this.createSlideEl(d);
      let u = h.el, p = d.el;
      r || "slide" === e || (e = "fadeFast", u = null);
      const g = this.isRTL ? "next" : "prev", m = this.isRTL ? "prev" : "next";
      return u && (this.inTransition.add(h.index), h.transition = e, u.addEventListener("animationend", this.onAnimationEnd), u.classList.add(`f-${e}Out`, "to-" + (o > 0 ? m : g))), p && (d.transition = e, p.addEventListener("animationend", this.onAnimationEnd), p.classList.add(`f-${e}In`, "from-" + (o > 0 ? g : m))), s.panTo({
        x: this.isHorizontal ? a : 0,
        y: this.isHorizontal ? 0 : a,
        friction: 0
      }), this.onChange(n), !0
    }

    manageSlideVisiblity() {
      const t = new Set, e = new Set, i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
      for (const s of this.slides) i.has(s) ? t.add(s) : e.add(s);
      for (const e of this.inTransition) t.add(this.slides[e]);
      for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
      for (const i of e) t.has(i) || this.removeSlideEl(i);
      this.markSelectedSlides(), this.repositionSlides()
    }

    markSelectedSlides() {
      if (!this.pages[this.page] || !this.pages[this.page].slides) return;
      const t = "aria-hidden";
      let e = this.cn("isSelected");
      if (e) for (const i of this.slides) i.el && (i.el.dataset.index = "" + i.index, this.pages[this.page].slides.includes(i) ? (i.el.classList.contains(e) || (c(i.el, e), this.emit("selectSlide", i)), i.el.removeAttribute(t)) : (i.el.classList.contains(e) && (d(i.el, e), this.emit("unselectSlide", i)), i.el.setAttribute(t, "true")))
    }

    flipInfiniteTrack() {
      const t = this.panzoom;
      if (!t || !this.isInfinite) return;
      const e = "x" === this.option("axis") ? "e" : "f", {viewportDim: i, contentDim: s} = this;
      let n = t.current[e], o = t.target[e] - n, a = 0, r = .5 * i, l = s;
      this.isRTL && this.isHorizontal ? (n < -r && (a = -1, n += l), n > l - r && (a = 1, n -= l)) : (n > r && (a = 1, n -= l), n < -l + r && (a = -1, n += l)), a && (t.current[e] = n, t.target[e] = n + o)
    }

    lazyLoadSlide(t) {
      const e = this, i = t && t.el;
      if (!i) return;
      const s = new Set, n = "f-fadeIn";
      i.querySelectorAll("[data-lazy-srcset]").forEach(t => {
        t instanceof HTMLImageElement && s.add(t)
      }), i.querySelectorAll("[data-lazy-src]").forEach(t => {
        t instanceof HTMLImageElement ? s.add(t) : T(t) && (t.style.backgroundImage = `url('${t.dataset.lazySrc || ""}')`)
      });
      const o = (t, i, s) => {
        s && (s.remove(), s = null), i.complete && (i.classList.add(n), setTimeout(() => {
          i.classList.remove(n)
        }, 350), i.style.display = ""), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && e.setViewportHeight()
      };
      for (const e of s) {
        let i = null;
        e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.style.display = "none", e.addEventListener("error", () => {
          o(t, e, i)
        }), e.addEventListener("load", () => {
          o(t, e, i)
        }), setTimeout(() => {
          e.parentNode && t.el && (e.complete ? o(t, e, i) : (i = r(p), e.parentNode.insertBefore(i, e)))
        }, 300)
      }
      let a = i.dataset.lazySrc;
      a && a.length && (i.style.backgroundImage = `url('${a}')`)
    }

    onAnimationEnd(t) {
      var e;
      const i = t.target, s = i ? parseInt(i.dataset.index || "", 10) || 0 : -1, n = this.slides[s],
        o = t.animationName;
      if (!i || !n || !o) return;
      const a = !!this.inTransition.has(s) && n.transition;
      a && o.substring(0, a.length + 2) === "f-" + a && this.inTransition.delete(s), this.inTransition.size || this.clearTransitions(), s === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle")
    }

    onDecel(t, e = 0, i = 0, s = 0, n = 0) {
      const o = this.isRTL, a = this.isHorizontal, r = this.axis, l = this.pages.length,
        h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
      let c = 0;
      if (c = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !l) return;
      const d = this.option("dragFree");
      let u = this.page;
      const p = t.target[r] * (this.isRTL && a ? 1 : -1), {pageIndex: g} = this.getPageFromPosition(p),
        m = t.current[r] * (o && a ? 1 : -1);
      let {page: f} = this.getPageFromPosition(m);
      d ? this.onChange(g) : (Math.abs(c) > 5 ? ((this.pages.length < 3 || Math.max(Math.abs(s), Math.abs(n)) > this.pages[u].slides[0].dim) && (u = f), u = o && a ? c < 0 ? u - 1 : u + 1 : c < 0 ? u + 1 : u - 1) : u = f, this.slideTo(u, {
        transition: !1,
        friction: t.option("decelFriction")
      }))
    }

    onClick(t) {
      const e = t.target, i = e && T(e) ? e.dataset : null;
      let s, n;
      i && (void 0 !== i.carouselPage ? (n = "slideTo", s = i.carouselPage) : void 0 !== i.carouselNext ? n = "slideNext" : void 0 !== i.carouselPrev && (n = "slidePrev")), n ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[n](s)) : this.emit("click", t)
    }

    onSlideTo(t) {
      const e = t.detail || 0;
      this.slideTo(this.getPageForSlide(e), {friction: 0})
    }

    onChange(t, e = 0) {
      const i = this.page;
      this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e))
    }

    onRefresh(t, e = "") {
      let i = this.contentDim, s = this.viewportDim;
      this.updateMetrics(), this.contentDim === i && this.viewportDim === s || this.slideTo(this.page, {
        friction: 0,
        transition: !1
      })
    }

    onResize() {
      this.option("breakpoints") && this.processOptions()
    }

    onBeforeTransform() {
      this.flipInfiniteTrack(), this.manageSlideVisiblity()
    }

    onEndAnimation() {
      this.emit("settle")
    }

    reInit(t = null, e = null) {
      this.destroy(), this.state = A.Init, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
    }

    slideTo(t = 0, {friction: e = this.option("friction"), transition: i = this.option("transition")} = {}) {
      if (this.state === A.Destroy) return;
      const s = this.panzoom, n = this.pages.length;
      if (!s || !n) return;
      if (this.transitionTo(t, i)) return;
      const o = this.axis, a = this.getPageFromIndex(t);
      let r = this.pages[a].pos, l = 0;
      if (this.isInfinite) {
        const t = s.current[o] * (this.isRTL && this.isHorizontal ? 1 : -1), e = this.contentDim, i = r + e, n = r - e;
        Math.abs(t - i) < Math.abs(t - r) && (r = i, l = 1), Math.abs(t - n) < Math.abs(t - r) && (r = n, l = -1)
      }
      r *= this.isRTL && this.isHorizontal ? 1 : -1, Math.abs(s.target[o] - r) < .1 || (s.panTo({
        x: this.isHorizontal ? r : 0,
        y: this.isHorizontal ? 0 : r,
        friction: e
      }), this.onChange(a, l))
    }

    slideToClosest(t) {
      if (this.panzoom) {
        const {pageIndex: e} = this.getPageFromPosition(this.panzoom.current[this.isHorizontal ? "e" : "f"]);
        this.slideTo(e, t)
      }
    }

    slideNext() {
      this.slideTo(this.page + 1)
    }

    slidePrev() {
      this.slideTo(this.page - 1)
    }

    clearTransitions() {
      this.inTransition.clear(), d(this.container, this.cn("inTransition"));
      const t = ["to-prev", "to-next", "from-prev", "from-next"];
      for (const e of this.slides) {
        const i = e.el;
        if (i) {
          i.removeEventListener("animationend", this.onAnimationEnd), i.classList.remove(...t);
          const s = e.transition;
          s && i.classList.remove(`f-${s}Out`, `f-${s}In`)
        }
      }
      this.manageSlideVisiblity()
    }

    prependSlide(t) {
      var e, i;
      let s = Array.isArray(t) ? t : [t];
      for (const t of s.reverse()) this.slides.unshift(L(t));
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      const n = (null === (e = this.pages[this.page]) || void 0 === e ? void 0 : e.pos) || 0;
      this.page += s.length, this.updateMetrics();
      const o = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0;
      if (this.panzoom) {
        const t = this.isRTL ? n - o : o - n;
        this.panzoom.target.e -= t, this.panzoom.current.e -= t, this.panzoom.requestTick()
      }
    }

    appendSlide(t) {
      let e = Array.isArray(t) ? t : [t];
      for (const t of e) {
        const e = L(t);
        e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", t, this.slides.length)
      }
      this.updateMetrics()
    }

    removeSlide(t) {
      const e = this.slides.length;
      t = (t % e + e) % e, this.removeSlideEl(this.slides[t], !0), this.slides.splice(t, 1);
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      this.updateMetrics(), this.slideTo(this.page, {friction: 0, transition: !1})
    }

    updateMetrics() {
      const t = this.panzoom;
      if (!this.track) return;
      const e = "e" === this.axis ? "width" : "height";
      let i, s = this.pages.length, n = 0;
      for (const [t, e] of this.slides.entries()) {
        let s = 0, o = 0;
        !e.el && i ? (s = i.dim, o = i.gap) : (({
          dim: s,
          gap: o
        } = this.getSlideMetrics(e)), i = e), s = l(s, 1e3), o = l(o, 1e3), e.dim = s, e.gap = o, e.pos = n, n += s, (this.isInfinite || t < this.slides.length - 1) && (n += o)
      }
      this.viewport && (this.viewportDim = l(this.viewport.getBoundingClientRect()[e], 1e3));
      const o = this.contentDim;
      this.contentDim = n, t && (t.contentRect[e] = n, t.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = n), this.pages = this.createPages(), this.pages = this.processPages(), this.state === A.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), t && s === this.pages.length && n !== o && (t.target[this.axis] = -1 * this.pages[this.page].pos, t.current[this.axis] = -1 * this.pages[this.page].pos, t.stop()), this.manageSlideVisiblity(), this.emit("refresh")
    }

    getProgress(t) {
      void 0 === t && (t = this.page);
      const e = this, i = e.panzoom, s = e.pages[t] || 0;
      if (!s || !i) return 0;
      let n = -1 * i.current.e, o = e.contentDim;
      var a = [l((n - s.pos) / (1 * s.dim), 1e3), l((n + o - s.pos) / (1 * s.dim), 1e3), l((n - o - s.pos) / (1 * s.dim), 1e3)].reduce((function (t, e) {
        return Math.abs(e - 0) < Math.abs(t - 0) ? e : t
      }));
      return Math.max(-1, Math.min(1, a))
    }

    setViewportHeight() {
      const {page: t, pages: e, viewport: i, isHorizontal: s} = this;
      if (!i || !e[t]) return;
      let n = 0;
      s && this.track && (this.track.style.height = "auto", e[t].slides.forEach(t => {
        t.el && (n = Math.max(n, t.el.offsetHeight))
      })), i.style.height = n ? n + "px" : ""
    }

    getPageForSlide(t) {
      for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
      return -1
    }

    getVisibleSlides(t = 0) {
      var e;
      const i = new Set;
      let {contentDim: s, viewportDim: n, pages: o, page: a} = this;
      s = s + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
      let r = 0;
      r = this.panzoom ? -1 * this.panzoom.current[this.axis] : o[a] && o[a].pos || 0, this.isInfinite && (r -= Math.floor(r / s) * s), this.isRTL && this.isHorizontal && (r *= -1);
      const l = r - n * t, h = r + n * (t + 1), c = this.isInfinite ? [-1, 0, 1] : [0];
      for (const t of this.slides) for (const e of c) {
        const n = t.pos + e * s, o = t.pos + t.dim + t.gap + e * s;
        n < h && o > l && i.add(t)
      }
      return i
    }

    getPageFromPosition(t) {
      const {viewportDim: e, contentDim: i} = this, s = this.pages.length, n = this.slides.length,
        o = this.slides[n - 1];
      let a = 0, r = 0, l = 0;
      const h = this.option("center");
      h && (t += .5 * e), this.isInfinite || (t = Math.max(this.slides[0].pos, Math.min(t, o.pos)));
      const c = i + o.gap;
      l = Math.floor(t / c) || 0, t -= l * c;
      let d = o, u = this.slides.find(e => {
        const i = t + (d && !h ? .5 * d.dim : 0);
        return d = e, e.pos <= i && e.pos + e.dim + e.gap > i
      });
      return u || (u = o), r = this.getPageForSlide(u.index), a = r + l * s, {page: a, pageIndex: r}
    }

    destroy() {
      if ([A.Destroy].includes(this.state)) return;
      this.state = A.Destroy;
      const {container: t, viewport: e, track: i, slides: s, panzoom: n} = this, o = this.option("classes");
      t.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), n && (n.destroy(), this.panzoom = null), s && s.forEach(t => {
        this.removeSlideEl(t)
      }), this.detachPlugins(), this.track = null, this.viewport = null, this.page = 0, e && i && e.replaceWith(...i.childNodes);
      for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
      this.slides = [];
      const a = this.events.get("ready");
      this.events = new Map, a && this.events.set("ready", a)
    }
  }

  Object.defineProperty(H, "Panzoom", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: z
  }), Object.defineProperty(H, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      viewport: null,
      track: null,
      enabled: !0,
      slides: [],
      axis: "x",
      transition: "fade",
      preload: 1,
      slidesPerPage: "auto",
      initialPage: 0,
      friction: .12,
      Panzoom: {decelFriction: .12},
      center: !0,
      infinite: !0,
      fill: !0,
      dragFree: !1,
      adaptiveHeight: !1,
      direction: "ltr",
      classes: {
        container: "f-carousel",
        viewport: "f-carousel__viewport",
        track: "f-carousel__track",
        slide: "f-carousel__slide",
        isLTR: "is-ltr",
        isRTL: "is-rtl",
        isHorizontal: "is-horizontal",
        isVertical: "is-vertical",
        inTransition: "in-transition",
        isSelected: "is-selected"
      },
      l10n: {NEXT: "Next slide", PREV: "Previous slide", GOTO: "Go to slide #%d"}
    }
  }), Object.defineProperty(H, "Plugins", {enumerable: !0, configurable: !0, writable: !0, value: F});
  const B = (t, ...e) => {
    const i = e.length;
    for (let s = 0; s < i; s++) {
      const i = e[s] || {};
      Object.entries(i).forEach(([e, i]) => {
        const s = Array.isArray(i) ? [] : {};
        var n;
        t[e] || Object.assign(t, {[e]: s}), "object" == typeof (n = i) && null !== n && n.constructor === Object && "[object Object]" === Object.prototype.toString.call(n) ? Object.assign(t[e], B(s, i)) : Array.isArray(i) ? Object.assign(t, {[e]: [...i]}) : Object.assign(t, {[e]: i})
      })
    }
    return t
  }, N = function (t, e) {
    return t.split(".").reduce((t, e) => "object" == typeof t ? t[e] : void 0, e)
  };

  class W {
    constructor(t = {}) {
      Object.defineProperty(this, "options", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
      }), Object.defineProperty(this, "events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
      }), this.setOptions(t);
      for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this))
    }

    setOptions(t) {
      this.options = t ? B({}, this.constructor.defaults, t) : {};
      for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e)
    }

    option(t, ...e) {
      let i = N(t, this.options);
      return i && "function" == typeof i && (i = i.call(this, this, ...e)), i
    }

    optionFor(t, e, i, ...s) {
      let n = N(e, t);
      var o;
      "string" != typeof (o = n) || isNaN(o) || isNaN(parseFloat(o)) || (n = parseFloat(n)), "true" === n && (n = !0), "false" === n && (n = !1), n && "function" == typeof n && (n = n.call(this, this, t, ...s));
      let a = N(e, this.options);
      return a && "function" == typeof a ? n = a.call(this, this, t, ...s, n) : void 0 === n && (n = a), void 0 === n ? i : n
    }

    cn(t) {
      const e = this.options.classes;
      return e && e[t] || ""
    }

    localize(t, e = []) {
      t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, e, i) => {
        let s = "";
        return i ? s = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (s = this.option("l10n." + e)), s || (s = t), s
      });
      for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
      return t.replace(/\{\{(.*)\}\}/, (t, e) => e)
    }

    on(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), i.forEach(t => {
        let i = this.events.get(t);
        i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i)
      })
    }

    off(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach(t => {
        const i = this.events.get(t);
        if (Array.isArray(i)) {
          const t = i.indexOf(e);
          t > -1 && i.splice(t, 1)
        }
      })
    }

    emit(t, ...e) {
      [...this.events.get(t) || []].forEach(t => t(this, ...e)), "*" !== t && this.emit("*", t, ...e)
    }
  }

  Object.defineProperty(W, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.8"
  }), Object.defineProperty(W, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: {}});

  class _ extends W {
    constructor(t, e) {
      super(e), Object.defineProperty(this, "instance", {enumerable: !0, configurable: !0, writable: !0, value: t})
    }

    attach() {
    }

    detach() {
    }
  }

  const X = t => ("" + (t || "")).split(" ").filter(t => !!t), Y = (t, e) => {
    X(e).forEach(e => {
      t && t.classList.add(e)
    })
  };

  class q extends _ {
    constructor() {
      super(...arguments), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ready"
      }), Object.defineProperty(this, "inHover", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "timer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "progressBar", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    get isActive() {
      return "ready" !== this.state
    }

    onReady(t) {
      this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
    }

    onChange() {
      var t;
      (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) || (this.removeProgressBar(), this.pause())
    }

    onSettle() {
      this.resume()
    }

    onVisibilityChange() {
      "visible" === document.visibilityState ? this.resume() : this.pause()
    }

    onMouseEnter() {
      this.inHover = !0, this.pause()
    }

    onMouseLeave() {
      var t;
      this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume()
    }

    onTimerEnd() {
      "play" === this.state && (this.instance.isInfinite || this.instance.page !== this.instance.pages.length - 1 ? this.instance.slideNext() : this.instance.slideTo(0))
    }

    removeProgressBar() {
      this.progressBar && (this.progressBar.remove(), this.progressBar = null)
    }

    createProgressBar() {
      var t;
      if (!this.option("showProgress")) return null;
      this.removeProgressBar();
      const e = this.instance, i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
      let s = this.option("progressParentEl");
      if (s || (s = (1 === i.length ? i[0].el : null) || e.viewport), !s) return null;
      const n = document.createElement("div");
      return Y(n, "f-progress"), s.prepend(n), this.progressBar = n, n.offsetHeight, n
    }

    set() {
      if (this.instance.pages.length < 2) return;
      if (this.progressBar) return;
      const t = this.option("timeout");
      this.state = "play", Y(this.instance.container, "has-autoplay");
      let e = this.createProgressBar();
      e && (e.style.transitionDuration = t + "ms", e.style.transform = "scaleX(1)"), this.timer = setTimeout(() => {
        this.timer = null, this.inHover || this.onTimerEnd()
      }, t), this.emit("set")
    }

    clear() {
      this.timer && (clearTimeout(this.timer), this.timer = null), this.removeProgressBar()
    }

    start() {
      if (this.set(), this.option("pauseOnHover")) {
        const t = this.instance.container;
        t.addEventListener("mouseenter", this.onMouseEnter, !1), t.addEventListener("mouseleave", this.onMouseLeave, !1)
      }
      document.addEventListener("visibilitychange", this.onVisibilityChange, !1)
    }

    stop() {
      const t = this.instance.container;
      var e;
      this.clear(), this.state = "ready", t.removeEventListener("mouseenter", this.onMouseEnter, !1), t.removeEventListener("mouseleave", this.onMouseLeave, !1), document.removeEventListener("visibilitychange", this.onVisibilityChange, !1), e = t, X("has-autoplay").forEach(t => {
        e && e.classList.remove(t)
      }), this.emit("stop")
    }

    pause() {
      "play" === this.state && (this.state = "pause", this.clear(), this.emit("pause"))
    }

    resume() {
      const t = this.instance;
      if (t.isInfinite || t.page !== t.pages.length - 1) if ("play" !== this.state) {
        if ("pause" === this.state && !this.inHover) {
          const t = new Event("resume", {bubbles: !0, cancelable: !0});
          this.emit("resume", event), t.defaultPrevented || this.set()
        }
      } else this.set(); else this.stop()
    }

    toggle() {
      "play" === this.state || "pause" === this.state ? this.stop() : this.set()
    }

    attach() {
      this.instance.on("ready", this.onReady), this.instance.on("Panzoom.startAnimation", this.onChange), this.instance.on("Panzoom.endAnimation", this.onSettle), this.instance.on("Panzoom.touchMove", this.onChange)
    }

    detach() {
      this.instance.off("ready", this.onReady), this.instance.off("Panzoom.startAnimation", this.onChange), this.instance.off("Panzoom.endAnimation", this.onSettle), this.instance.off("Panzoom.touchMove", this.onChange), this.stop()
    }
  }

  Object.defineProperty(q, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {autoStart: !0, pauseOnHover: !0, progressParentEl: null, showProgress: !0, timeout: 3e3}
  });
  const Z = t => "object" == typeof t && null !== t && t.constructor === Object && "[object Object]" === Object.prototype.toString.call(t),
    V = (t, ...e) => {
      const i = e.length;
      for (let s = 0; s < i; s++) {
        const i = e[s] || {};
        Object.entries(i).forEach(([e, i]) => {
          const s = Array.isArray(i) ? [] : {};
          t[e] || Object.assign(t, {[e]: s}), Z(i) ? Object.assign(t[e], V(s, i)) : Array.isArray(i) ? Object.assign(t, {[e]: [...i]}) : Object.assign(t, {[e]: i})
        })
      }
      return t
    }, $ = function (t) {
      return (new DOMParser).parseFromString(t, "text/html").body.firstChild
    }, G = t => t && null !== t && t instanceof Element && "nodeType" in t, U = function (t) {
      const e = window.pageYOffset, i = window.pageYOffset + window.innerHeight;
      if (!G(t)) return 0;
      const s = t.getBoundingClientRect(), n = s.y + window.pageYOffset, o = s.y + s.height + window.pageYOffset;
      if (e > o || i < n) return 0;
      if (e < n && i > o) return 100;
      if (n < e && o > i) return 100;
      let a = s.height;
      n < e && (a -= window.pageYOffset - n), o > i && (a -= o - i);
      const r = a / window.innerHeight * 100;
      return Math.round(r)
    }, K = !("undefined" == typeof window || !window.document || !window.document.createElement);
  let J;
  const Q = ["a[href]", "area[href]", 'input:not([disabled]):not([type="hidden"]):not([aria-hidden])', "select:not([disabled]):not([aria-hidden])", "textarea:not([disabled]):not([aria-hidden])", "button:not([disabled]):not([aria-hidden]):not(.fancybox-focus-guard)", "iframe", "object", "embed", "video", "audio", "[contenteditable]", '[tabindex]:not([tabindex^="-"]):not([disabled]):not([aria-hidden])'].join(","),
    tt = t => {
      if (t && K) {
        void 0 === J && document.createElement("div").focus({
          get preventScroll() {
            return J = !0, !1
          }
        });
        try {
          if (J) t.focus({preventScroll: !0}); else {
            const e = window.pageXOffset || document.body.scrollTop, i = window.pageYOffset || document.body.scrollLeft;
            t.focus(), document.body.scrollTo({top: e, left: i, behavior: "auto"})
          }
        } catch (t) {
        }
      }
    },
    et = '<div class="f-spinner"><svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="20"></circle><circle cx="25" cy="25" r="20"></circle></svg></div>',
    it = {
      PANUP: "Move up",
      PANDOWN: "Move down",
      PANLEFT: "Move left",
      PANRIGHT: "Move right",
      ZOOMIN: "Zoom in",
      ZOOMOUT: "Zoom out",
      TOGGLEZOOM: "Toggle zoom level",
      TOGGLE1TO1: "Toggle zoom level",
      ITERATEZOOM: "Toggle zoom level",
      ROTATECCW: "Rotate counterclockwise",
      ROTATECW: "Rotate clockwise",
      FLIPX: "Flip horizontally",
      FLIPY: "Flip vertically",
      FITX: "Fit horizontally",
      FITY: "Fit vertically",
      RESET: "Reset",
      TOGGLEFS: "Toggle fullscreen"
    }, st = {
      dragToClose: !0,
      hideScrollbar: !0,
      Carousel: {
        classes: {
          container: "fancybox__carousel",
          viewport: "fancybox__viewport",
          track: "fancybox__track",
          slide: "fancybox__slide"
        }
      },
      contentClick: "toggleZoom",
      contentDblClick: !1,
      backdropClick: "close",
      animated: !0,
      idle: 3500,
      showClass: "f-zoomInUp",
      hideClass: "f-fadeOut",
      commonCaption: !1,
      parentEl: null,
      startIndex: 0,
      l10n: Object.assign(Object.assign({}, it), {
        CLOSE: "Close",
        NEXT: "Next",
        PREV: "Previous",
        MODAL: "You can close this modal content with the ESC key",
        ERROR: "Something Went Wrong, Please Try Again Later",
        IMAGE_ERROR: "Image Not Found",
        ELEMENT_NOT_FOUND: "HTML Element Not Found",
        AJAX_NOT_FOUND: "Error Loading AJAX : Not Found",
        AJAX_FORBIDDEN: "Error Loading AJAX : Forbidden",
        IFRAME_ERROR: "Error Loading Page",
        TOGGLE_ZOOM: "Toggle zoom level",
        TOGGLE_THUMBS: "Toggle thumbnails",
        TOGGLE_SLIDESHOW: "Toggle slideshow",
        TOGGLE_FULLSCREEN: "Toggle full-screen mode",
        DOWNLOAD: "Download"
      }),
      tpl: {
        closeButton: '<button data-fancybox-close class="f-button is-close-btn" title="{{CLOSE}}"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M20 20L4 4m16 0L4 20"/></svg></button>',
        main: '<div class="fancybox__container" role="dialog" aria-modal="true" aria-label="{{MODAL}}" tabindex="-1">\n    <div class="fancybox__backdrop"></div>\n    <div class="fancybox__carousel"></div>\n    <div class="fancybox__footer"></div>\n  </div>'
      },
      groupAll: !1,
      groupAttr: "data-fancybox",
      defaultType: "image",
      defaultDisplay: "block",
      autoFocus: !0,
      trapFocus: !0,
      placeFocusBack: !0,
      closeButton: "auto",
      keyboard: {
        Escape: "close",
        Delete: "close",
        Backspace: "close",
        PageUp: "next",
        PageDown: "prev",
        ArrowUp: "prev",
        ArrowDown: "next",
        ArrowRight: "next",
        ArrowLeft: "prev"
      },
      Fullscreen: {autoStart: !1},
      compact: () => window.matchMedia("(max-width: 578px), (max-height: 578px)").matches,
      wheel: "zoom"
    };
  var nt, ot;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Closing = 2] = "Closing", t[t.CustomClosing = 3] = "CustomClosing", t[t.Destroy = 4] = "Destroy"
  }(nt || (nt = {})), function (t) {
    t[t.Loading = 0] = "Loading", t[t.Opening = 1] = "Opening", t[t.Ready = 2] = "Ready", t[t.Closing = 3] = "Closing"
  }(ot || (ot = {}));
  const at = function (t, e) {
    return t.split(".").reduce((t, e) => "object" == typeof t ? t[e] : void 0, e)
  };

  class rt {
    constructor(t = {}) {
      Object.defineProperty(this, "options", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: t
      }), Object.defineProperty(this, "events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Map
      }), this.setOptions(t);
      for (const t of Object.getOwnPropertyNames(Object.getPrototypeOf(this))) t.startsWith("on") && "function" == typeof this[t] && (this[t] = this[t].bind(this))
    }

    setOptions(t) {
      this.options = t ? V({}, this.constructor.defaults, t) : {};
      for (const [t, e] of Object.entries(this.option("on") || {})) this.on(t, e)
    }

    option(t, ...e) {
      let i = at(t, this.options);
      return i && "function" == typeof i && (i = i.call(this, this, ...e)), i
    }

    optionFor(t, e, i, ...s) {
      let n = at(e, t);
      var o;
      "string" != typeof (o = n) || isNaN(o) || isNaN(parseFloat(o)) || (n = parseFloat(n)), "true" === n && (n = !0), "false" === n && (n = !1), n && "function" == typeof n && (n = n.call(this, this, t, ...s));
      let a = at(e, this.options);
      return a && "function" == typeof a ? n = a.call(this, this, t, ...s, n) : void 0 === n && (n = a), void 0 === n ? i : n
    }

    cn(t) {
      const e = this.options.classes;
      return e && e[t] || ""
    }

    localize(t, e = []) {
      t = String(t).replace(/\{\{(\w+).?(\w+)?\}\}/g, (t, e, i) => {
        let s = "";
        return i ? s = this.option(`${e[0] + e.toLowerCase().substring(1)}.l10n.${i}`) : e && (s = this.option("l10n." + e)), s || (s = t), s
      });
      for (let i = 0; i < e.length; i++) t = t.split(e[i][0]).join(e[i][1]);
      return t.replace(/\{\{(.*)\}\}/, (t, e) => e)
    }

    on(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), this.events || (this.events = new Map), i.forEach(t => {
        let i = this.events.get(t);
        i || (this.events.set(t, []), i = []), i.includes(e) || i.push(e), this.events.set(t, i)
      })
    }

    off(t, e) {
      let i = [];
      "string" == typeof t ? i = t.split(" ") : Array.isArray(t) && (i = t), i.forEach(t => {
        const i = this.events.get(t);
        if (Array.isArray(i)) {
          const t = i.indexOf(e);
          t > -1 && i.splice(t, 1)
        }
      })
    }

    emit(t, ...e) {
      [...this.events.get(t) || []].forEach(t => t(this, ...e)), "*" !== t && this.emit("*", t, ...e)
    }
  }

  Object.defineProperty(rt, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.8"
  }), Object.defineProperty(rt, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: {}});

  class lt extends rt {
    constructor(t = {}) {
      super(t), Object.defineProperty(this, "plugins", {enumerable: !0, configurable: !0, writable: !0, value: {}})
    }

    attachPlugins(t = {}) {
      const e = new Map;
      for (const [i, s] of Object.entries(t)) {
        const t = this.option(i), n = this.plugins[i];
        n || !1 === t ? n && !1 === t && (n.detach(), delete this.plugins[i]) : e.set(i, new s(this, t || {}))
      }
      for (const [t, i] of e) this.plugins[t] = i, i.attach();
      this.emit("attachPlugins")
    }

    detachPlugins() {
      for (const t of Object.values(this.plugins)) t.detach();
      return this.plugins = {}, this.emit("detachPlugins"), this
    }
  }

  class ht extends rt {
    constructor(t, e) {
      super(e), Object.defineProperty(this, "instance", {enumerable: !0, configurable: !0, writable: !0, value: t})
    }

    attach() {
    }

    detach() {
    }
  }

  const ct = () => {
    queueMicrotask(() => {
      (() => {
        const {slug: t, index: e} = dt.parseURL(), i = le.getInstance();
        if (i && !1 !== i.option("Hash")) {
          const s = i.carousel;
          if (t && s) {
            for (let e of s.slides) if (e.slug && e.slug === t) return s.slideTo(e.index);
            if (t === i.option("slug")) return s.slideTo(e - 1);
            const n = i.getSlide(), o = n && n.triggerEl && n.triggerEl.dataset;
            if (o && o.fancybox === t) return s.slideTo(e - 1)
          }
          dt.hasSilentClose = !0, i.close()
        }
        dt.startFromUrl()
      })()
    })
  };

  class dt extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "origHash", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ""
      }), Object.defineProperty(this, "timer", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onChange() {
      const t = this.instance, e = t.carousel;
      this.timer && clearTimeout(this.timer);
      const i = t.getSlide();
      if (!e || !i) return;
      const s = t.isOpeningSlide(i), n = new URL(document.URL).hash;
      let o, a = i.slug || void 0;
      o = a || this.instance.option("slug"), !o && i.triggerEl && i.triggerEl.dataset && (o = i.triggerEl.dataset.fancybox);
      let r = "";
      o && "true" !== o && (r = "#" + o + (!a && e.slides.length > 1 ? "-" + (i.index + 1) : "")), s && (this.origHash = n !== r ? n : ""), r && n !== r && (this.timer = setTimeout(() => {
        try {
          window.history[s ? "pushState" : "replaceState"]({}, document.title, window.location.pathname + window.location.search + r)
        } catch (t) {
        }
      }, 300))
    }

    onClose() {
      if (this.timer && clearTimeout(this.timer), !0 !== dt.hasSilentClose) try {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search + (this.origHash || ""))
      } catch (t) {
      }
    }

    attach() {
      this.instance.on("Carousel.ready", this.onChange), this.instance.on("Carousel.change", this.onChange), this.instance.on("close", this.onClose)
    }

    detach() {
      this.instance.off("Carousel.ready", this.onChange), this.instance.off("Carousel.change", this.onChange), this.instance.off("close", this.onClose)
    }

    static parseURL() {
      const t = window.location.hash.slice(1), e = t.split("-"), i = e[e.length - 1],
        s = i && /^\+?\d+$/.test(i) && parseInt(e.pop() || "1", 10) || 1;
      return {hash: t, slug: e.join("-"), index: s}
    }

    static startFromUrl() {
      if (dt.hasSilentClose = !1, le.getInstance() || !1 === le.defaults.Hash) return;
      const {hash: t, slug: e, index: i} = dt.parseURL();
      if (!e) return;
      let s = document.querySelector(`[data-slug="${t}"]`);
      if (s && s.dispatchEvent(new CustomEvent("click", {bubbles: !0, cancelable: !0})), le.getInstance()) return;
      const n = document.querySelectorAll(`[data-fancybox="${e}"]`);
      n.length && (s = n[i - 1], s && s.dispatchEvent(new CustomEvent("click", {bubbles: !0, cancelable: !0})))
    }

    static destroy() {
      window.removeEventListener("hashchange", ct, !1)
    }
  }

  function ut() {
    window.addEventListener("hashchange", ct, !1), setTimeout(() => {
      dt.startFromUrl()
    }, 500)
  }

  Object.defineProperty(dt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {}
  }), Object.defineProperty(dt, "hasSilentClose", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: !1
  }), K && (/complete|interactive|loaded/.test(document.readyState) ? ut() : document.addEventListener("DOMContentLoaded", ut));
  const pt = (t, e = 1e4) => (t = parseFloat(t + "") || 0, Math.round((t + Number.EPSILON) * e) / e),
    gt = function (t, e) {
      return !(!t || t === document.body || e && t === e) && (function (t) {
        if (!(t && t instanceof Element && t.offsetParent)) return !1;
        const e = t.scrollHeight > t.clientHeight, i = window.getComputedStyle(t).overflowY,
          s = -1 !== i.indexOf("hidden"), n = -1 !== i.indexOf("visible");
        return e && !s && !n
      }(t) ? t : gt(t.parentElement, e))
    }, mt = t => ("" + (t || "")).split(" ").filter(t => !!t), ft = (t, e, i) => {
      mt(e).forEach(e => {
        t && t.classList.toggle(e, i || !1)
      })
    };

  class bt {
    constructor(t) {
      Object.defineProperty(this, "pageX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "pageY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "clientX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "clientY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "time", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "nativePointer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.nativePointer = t, this.pageX = t.pageX, this.pageY = t.pageY, this.clientX = t.clientX, this.clientY = t.clientY, this.id = self.Touch && t instanceof Touch ? t.identifier : -1, this.time = Date.now()
    }
  }

  const vt = {passive: !1};

  class yt {
    constructor(t, {
      start: e = (() => !0), move: i = (() => {
      }), end: s = (() => {
      })
    }) {
      Object.defineProperty(this, "element", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "startCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "moveCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "endCallback", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "currentPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "startPointers", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), this.element = t, this.startCallback = e, this.moveCallback = i, this.endCallback = s;
      for (const t of ["onPointerStart", "onTouchStart", "onMove", "onTouchEnd", "onPointerEnd", "onWindowBlur"]) this[t] = this[t].bind(this);
      this.element.addEventListener("mousedown", this.onPointerStart, vt), this.element.addEventListener("touchstart", this.onTouchStart, vt), this.element.addEventListener("touchmove", this.onMove, vt), this.element.addEventListener("touchend", this.onTouchEnd), this.element.addEventListener("touchcancel", this.onTouchEnd)
    }

    onPointerStart(t) {
      if (!t.buttons || 0 !== t.button) return;
      const e = new bt(t);
      this.currentPointers.some(t => t.id === e.id) || this.triggerPointerStart(e, t) && (window.addEventListener("mousemove", this.onMove), window.addEventListener("mouseup", this.onPointerEnd), window.addEventListener("blur", this.onWindowBlur))
    }

    onTouchStart(t) {
      for (const e of Array.from(t.changedTouches || [])) this.triggerPointerStart(new bt(e), t);
      window.addEventListener("blur", this.onWindowBlur)
    }

    onMove(t) {
      const e = this.currentPointers.slice(),
        i = "changedTouches" in t ? Array.from(t.changedTouches || []).map(t => new bt(t)) : [new bt(t)], s = [];
      for (const t of i) {
        const e = this.currentPointers.findIndex(e => e.id === t.id);
        e < 0 || (s.push(t), this.currentPointers[e] = t)
      }
      s.length && this.moveCallback(t, this.currentPointers.slice(), e)
    }

    onPointerEnd(t) {
      t.buttons > 0 && 0 !== t.button || (this.triggerPointerEnd(t, new bt(t)), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur))
    }

    onTouchEnd(t) {
      for (const e of Array.from(t.changedTouches || [])) this.triggerPointerEnd(t, new bt(e))
    }

    triggerPointerStart(t, e) {
      return !!this.startCallback(e, t, this.currentPointers.slice()) && (this.currentPointers.push(t), this.startPointers.push(t), !0)
    }

    triggerPointerEnd(t, e) {
      const i = this.currentPointers.findIndex(t => t.id === e.id);
      i < 0 || (this.currentPointers.splice(i, 1), this.startPointers.splice(i, 1), this.endCallback(t, e, this.currentPointers.slice()))
    }

    onWindowBlur() {
      this.clear()
    }

    clear() {
      for (; this.currentPointers.length;) {
        const t = this.currentPointers[this.currentPointers.length - 1];
        this.currentPointers.splice(this.currentPointers.length - 1, 1), this.startPointers.splice(this.currentPointers.length - 1, 1), this.endCallback(new Event("touchend", {
          bubbles: !0,
          cancelable: !0,
          clientX: t.clientX,
          clientY: t.clientY
        }), t, this.currentPointers.slice())
      }
    }

    stop() {
      this.element.removeEventListener("mousedown", this.onPointerStart, vt), this.element.removeEventListener("touchstart", this.onTouchStart, vt), this.element.removeEventListener("touchmove", this.onMove, vt), this.element.removeEventListener("touchend", this.onTouchEnd), this.element.removeEventListener("touchcancel", this.onTouchEnd), window.removeEventListener("mousemove", this.onMove), window.removeEventListener("mouseup", this.onPointerEnd), window.removeEventListener("blur", this.onWindowBlur)
    }
  }

  function wt(t, e) {
    return e ? Math.sqrt(Math.pow(e.clientX - t.clientX, 2) + Math.pow(e.clientY - t.clientY, 2)) : 0
  }

  function xt(t, e) {
    return e ? {clientX: (t.clientX + e.clientX) / 2, clientY: (t.clientY + e.clientY) / 2} : t
  }

  var St;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Error = 1] = "Error", t[t.Ready = 2] = "Ready", t[t.Panning = 3] = "Panning", t[t.Mousemove = 4] = "Mousemove", t[t.Destroy = 5] = "Destroy"
  }(St || (St = {}));
  const Pt = ["a", "b", "c", "d", "e", "f"], Et = {
    content: null,
    width: "auto",
    height: "auto",
    panMode: "drag",
    touch: !0,
    dragMinThreshold: 3,
    lockAxis: !1,
    mouseMoveFactor: 1,
    mouseMoveFriction: .12,
    zoom: !0,
    pinchToZoom: !0,
    panOnlyZoomed: "auto",
    minScale: 1,
    maxScale: 2,
    friction: .25,
    dragFriction: .35,
    decelFriction: .05,
    click: "toggleZoom",
    dblClick: !1,
    wheel: "zoom",
    wheelLimit: 7,
    spinner: !0,
    bounds: "auto",
    infinite: !1,
    rubberband: !0,
    bounce: !0,
    maxVelocity: 75,
    transformParent: !1,
    classes: {
      content: "f-panzoom__content",
      isLoading: "is-loading",
      canZoomIn: "can-zoom_in",
      canZoomOut: "can-zoom_out",
      isDraggable: "is-draggable",
      isDragging: "is-dragging",
      inFullscreen: "in-fullscreen",
      htmlHasFullscreen: "with-panzoom-in-fullscreen"
    },
    l10n: it
  }, Tt = (t, e) => {
    mt(e).forEach(e => {
      t && t.classList.remove(e)
    })
  }, Mt = (t, e) => {
    mt(e).forEach(e => {
      t && t.classList.add(e)
    })
  }, Ot = {a: 1, b: 0, c: 0, d: 1, e: 0, f: 0};
  let Ct = null, zt = null;

  class At extends lt {
    get isTouchDevice() {
      return null === zt && (zt = window.matchMedia("(hover: none)").matches), zt
    }

    get isMobile() {
      return null === Ct && (Ct = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)), Ct
    }

    get panMode() {
      return "mousemove" !== this.options.panMode || this.isTouchDevice ? "drag" : "mousemove"
    }

    get panOnlyZoomed() {
      const t = this.options.panOnlyZoomed;
      return "auto" === t ? this.isTouchDevice : t
    }

    get isInfinite() {
      return this.option("infinite")
    }

    get angle() {
      return 180 * Math.atan2(this.current.b, this.current.a) / Math.PI || 0
    }

    get targetAngle() {
      return 180 * Math.atan2(this.target.b, this.target.a) / Math.PI || 0
    }

    get scale() {
      const {a: t, b: e} = this.current;
      return Math.sqrt(t * t + e * e) || 1
    }

    get targetScale() {
      const {a: t, b: e} = this.target;
      return Math.sqrt(t * t + e * e) || 1
    }

    get minScale() {
      return this.option("minScale") || 1
    }

    get fullScale() {
      const {contentRect: t} = this;
      return t.fullWidth / t.fitWidth || 1
    }

    get maxScale() {
      return this.fullScale * (this.option("maxScale") || 1) || 1
    }

    get coverScale() {
      const {containerRect: t, contentRect: e} = this, i = Math.max(t.height / e.fitHeight, t.width / e.fitWidth) || 1;
      return Math.min(this.fullScale, i)
    }

    get isScaling() {
      return Math.abs(this.targetScale - this.scale) > 1e-5 && !this.isResting
    }

    get isContentLoading() {
      const t = this.content;
      return !!(t && t instanceof HTMLImageElement) && !t.complete
    }

    get isResting() {
      if (this.isBouncingX || this.isBouncingY) return !1;
      for (const t of Pt) {
        const e = "e" == t || "f" === t ? .001 : 1e-5;
        if (Math.abs(this.target[t] - this.current[t]) > e) return !1
      }
      return !(!this.ignoreBounds && !this.checkBounds().inBounds)
    }

    constructor(t, e = {}, i = {}) {
      var s;
      if (super(e), Object.defineProperty(this, "pointerTracker", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "resizeObserver", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "updateTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "rAF", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "isTicking", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "friction", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "ignoreBounds", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "isBouncingX", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "isBouncingY", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "clicks", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "trackingPoints", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "wheelDelta", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevWheelDelta", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevWheelTime", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevMouseMoveEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: St.Init
      }), Object.defineProperty(this, "isDragging", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "content", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "spinner", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "containerRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {width: 0, height: 0, innerWidth: 0, innerHeight: 0}
      }), Object.defineProperty(this, "contentRect", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          fullWidth: 0,
          fullHeight: 0,
          fitWidth: 0,
          fitHeight: 0,
          width: 0,
          height: 0
        }
      }), Object.defineProperty(this, "dragStart", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {x: 0, y: 0, top: 0, left: 0, time: 0}
      }), Object.defineProperty(this, "dragOffset", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {x: 0, y: 0, time: 0}
      }), Object.defineProperty(this, "current", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, Ot)
      }), Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Object.assign({}, Ot)
      }), Object.defineProperty(this, "velocity", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {a: 0, b: 0, c: 0, d: 0, e: 0, f: 0}
      }), Object.defineProperty(this, "lockedAxis", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), !t) throw new Error("No Element found");
      if (this.container = t, this.initContent(), this.attachPlugins(Object.assign(Object.assign({}, At.Plugins), i)), this.emit("init"), this.isContentLoading) {
        const e = this.content;
        if (this.option("spinner")) {
          t.classList.add(this.cn("isLoading"));
          const i = $(et);
          t.contains(e) ? this.spinner = (null === (s = e.parentElement) || void 0 === s ? void 0 : s.insertBefore(i, e)) || null : this.spinner = t.appendChild(i)
        }
        this.emit("beforeLoad"), e.addEventListener("load", this.onLoad), e.addEventListener("error", this.onError)
      } else queueMicrotask(() => {
        this.enable()
      })
    }

    initContent() {
      const {container: t} = this;
      let e = this.option("content") || t.querySelector("." + this.cn("content"));
      if (e || (e = t.querySelector("img") || t.firstElementChild, e && e.classList.add(this.cn("content"))), !e) throw new Error("No content found");
      this.content = e
    }

    onLoad() {
      this.spinner && (this.spinner.remove(), this.spinner = null), this.option("spinner") && this.container.classList.remove(this.cn("isLoading")), this.emit("afterLoad"), this.state === St.Init && this.enable()
    }

    onError() {
      this.state !== St.Destroy && (this.spinner && (this.spinner.remove(), this.spinner = null), this.stop(), this.detachEvents(), this.state = St.Error, this.emit("error"))
    }

    attachObserver() {
      var t;
      const e = () => Math.abs(this.containerRect.width - this.container.getBoundingClientRect().width) > .1 || Math.abs(this.containerRect.height - this.container.getBoundingClientRect().height) > .1;
      this.resizeObserver || void 0 === window.ResizeObserver || (this.resizeObserver = new ResizeObserver(() => {
        this.updateTimer || (e() ? (this.onResize(), this.isMobile && (this.updateTimer = setTimeout(() => {
          e() && this.onResize(), this.updateTimer = null
        }, 500))) : this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null))
      })), null === (t = this.resizeObserver) || void 0 === t || t.observe(this.container)
    }

    detachObserver() {
      var t;
      null === (t = this.resizeObserver) || void 0 === t || t.disconnect()
    }

    attachEvents() {
      const {container: t} = this;
      t.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.addEventListener("wheel", this.onWheel, {passive: !1}), this.pointerTracker = new yt(t, {
        start: this.onPointerDown,
        move: this.onPointerMove,
        end: this.onPointerUp
      }), document.addEventListener("mousemove", this.onMouseMove)
    }

    detachEvents() {
      var t;
      const {container: e} = this;
      e.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), e.removeEventListener("wheel", this.onWheel, {passive: !1}), null === (t = this.pointerTracker) || void 0 === t || t.stop(), this.pointerTracker = null, document.removeEventListener("mousemove", this.onMouseMove), document.removeEventListener("keydown", this.onKeydown, !0), this.clickTimer && (clearTimeout(this.clickTimer), this.clickTimer = null), this.updateTimer && (clearTimeout(this.updateTimer), this.updateTimer = null)
    }

    animate() {
      this.setTargetForce();
      const t = this.option("maxVelocity");
      for (const e of Pt) this.friction ? (this.velocity[e] *= 1 - this.friction, t && !this.isScaling && (this.velocity[e] = Math.max(Math.min(this.velocity[e], t), -1 * t)), this.current[e] += this.velocity[e]) : this.current[e] = this.target[e];
      this.setTransform(), this.setEdgeForce(), !this.isResting || this.isDragging ? this.rAF = requestAnimationFrame(() => this.animate()) : this.stop("current")
    }

    setTargetForce() {
      for (const t of Pt) "e" === t && this.isBouncingX || "f" === t && this.isBouncingY || (this.velocity[t] = (1 / (1 - this.friction) - 1) * (this.target[t] - this.current[t]))
    }

    checkBounds(t = 0, e = 0) {
      const {current: i} = this, s = i.e + t, n = i.f + e, o = this.getBounds(), {x: a, y: r} = o, l = a.min, h = a.max,
        c = r.min, d = r.max;
      let u = 0, p = 0;
      return l !== 1 / 0 && s < l ? u = l - s : h !== 1 / 0 && s > h && (u = h - s), c !== 1 / 0 && n < c ? p = c - n : d !== 1 / 0 && n > d && (p = d - n), Math.abs(u) < .001 && (u = 0), Math.abs(p) < .001 && (p = 0), Object.assign(Object.assign({}, o), {
        xDiff: u,
        yDiff: p,
        inBounds: !u && !p
      })
    }

    clampTargetBounds() {
      const {target: t} = this, {x: e, y: i} = this.getBounds();
      e.min !== 1 / 0 && (t.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (t.e = Math.min(t.e, e.max)), i.min !== 1 / 0 && (t.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (t.f = Math.min(t.f, i.max))
    }

    calculateContentDim(t = this.current) {
      const {content: e, contentRect: i} = this, {fitWidth: s, fitHeight: n, fullWidth: o, fullHeight: a} = i;
      let r = o, l = a;
      if (this.option("zoom") || 0 !== this.angle) {
        const i = !(e instanceof HTMLImageElement || "none" !== window.getComputedStyle(e).maxWidth && "none" !== window.getComputedStyle(e).maxHeight),
          h = i ? o : s, c = i ? a : n, d = this.getMatrix(t), u = new DOMPoint(0, 0).matrixTransform(d),
          p = new DOMPoint(0 + h, 0).matrixTransform(d), g = new DOMPoint(0 + h, 0 + c).matrixTransform(d),
          m = new DOMPoint(0, 0 + c).matrixTransform(d), f = Math.abs(g.x - u.x), b = Math.abs(g.y - u.y),
          v = Math.abs(m.x - p.x), y = Math.abs(m.y - p.y);
        r = Math.max(f, v), l = Math.max(b, y)
      }
      return {contentWidth: r, contentHeight: l}
    }

    setEdgeForce() {
      if (this.ignoreBounds || this.isDragging || "mousemove" === this.panMode || this.targetScale < this.scale) return this.isBouncingX = !1, void (this.isBouncingY = !1);
      const {target: t} = this, {x: e, y: i, xDiff: s, yDiff: n} = this.checkBounds(), o = this.option("maxVelocity");
      let a = this.velocity.e, r = this.velocity.f;
      0 !== s ? (this.isBouncingX = !0, s * a <= 0 ? a += .14 * s : (a = .14 * s, e.min !== 1 / 0 && (this.target.e = Math.max(t.e, e.min)), e.max !== 1 / 0 && (this.target.e = Math.min(t.e, e.max))), o && (a = Math.max(Math.min(a, o), -1 * o))) : this.isBouncingX = !1, 0 !== n ? (this.isBouncingY = !0, n * r <= 0 ? r += .14 * n : (r = .14 * n, i.min !== 1 / 0 && (this.target.f = Math.max(t.f, i.min)), i.max !== 1 / 0 && (this.target.f = Math.min(t.f, i.max))), o && (r = Math.max(Math.min(r, o), -1 * o))) : this.isBouncingY = !1, this.isBouncingX && (this.velocity.e = a), this.isBouncingY && (this.velocity.f = r)
    }

    enable() {
      const {content: t} = this, e = new DOMMatrixReadOnly(window.getComputedStyle(t).transform);
      for (const t of Pt) this.current[t] = this.target[t] = e[t];
      this.updateMetrics(), this.attachObserver(), this.attachEvents(), this.state = St.Ready, this.emit("ready")
    }

    onClick(t) {
      var e;
      this.isDragging && (null === (e = this.pointerTracker) || void 0 === e || e.clear(), this.trackingPoints = [], this.startDecelAnim());
      const i = t.target;
      if (!i || t.defaultPrevented) return;
      if (i && i.hasAttribute("disabled")) return t.preventDefault(), void t.stopPropagation();
      if ((() => {
        const t = window.getSelection();
        return t && "Range" === t.type
      })() && !i.closest("button")) return;
      const s = i.closest("[data-panzoom-action]"), n = i.closest("[data-panzoom-change]"), o = s || n,
        a = o && G(o) ? o.dataset : null;
      if (a) {
        const e = a.panzoomChange, i = a.panzoomAction;
        if ((e || i) && t.preventDefault(), e) {
          let i = {};
          try {
            i = JSON.parse(e)
          } catch (t) {
            console && console.warn("The given data was not valid JSON")
          }
          return void this.applyChange(i)
        }
        if (i) return void (this[i] && this[i]())
      }
      if (Math.abs(this.dragOffset.x) > 3 || Math.abs(this.dragOffset.y) > 3) return t.preventDefault(), void t.stopPropagation();
      const r = this.content.getBoundingClientRect();
      if (this.dragStart.time && !this.canZoomOut() && (Math.abs(r.x - this.dragStart.x) > 2 || Math.abs(r.y - this.dragStart.y) > 2)) return;
      this.dragStart.time = 0;
      const l = e => {
        !this.option("zoom") || Math.abs(this.velocity.a) > .3 || e && "string" == typeof e && /(iterateZoom)|(toggle(Zoom|Full|Cover|Max)|(zoomTo(Fit|Cover|Max)))/.test(e) && "function" == typeof this[e] && (t.preventDefault(), this[e]({event: t}))
      }, h = this.option("click", t), c = this.option("dblClick", t);
      c ? (this.clicks++, 1 == this.clicks && (this.clickTimer = setTimeout(() => {
        1 === this.clicks ? (this.emit("click", t), !t.defaultPrevented && h && l(h)) : (this.emit("dblClick", t), t.defaultPrevented || l(c)), this.clicks = 0, this.clickTimer = null
      }, 350))) : (this.emit("click", t), !t.defaultPrevented && h && l(h))
    }

    addTrackingPoint(t) {
      const e = this.trackingPoints.filter(t => t.time > Date.now() - 100);
      e.push(t), this.trackingPoints = e
    }

    onPointerDown(t, e, i) {
      var s;
      this.dragOffset = {x: 0, y: 0, time: 0}, this.trackingPoints = [];
      const n = this.content.getBoundingClientRect();
      if (this.dragStart = {x: n.x, y: n.y, top: n.top, left: n.left, time: Date.now()}, this.clickTimer) return !1;
      if ("mousemove" === this.panMode && this.targetScale > 1) return t.preventDefault(), t.stopPropagation(), !1;
      if (!i.length) {
        const e = t.composedPath()[0];
        if (["A", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].includes(e.nodeName) || e.closest("[contenteditable]") || e.closest("[data-selectable]") || e.closest("[data-panzoom-change]") || e.closest("[data-panzoom-action]")) return !1;
        null === (s = window.getSelection()) || void 0 === s || s.removeAllRanges()
      }
      return "mousedown" === t.type && t.preventDefault(), pt(this.targetScale, 1e3) === pt(this.minScale, 1e3) ? (this.stop(), this.target.e = this.current.e, this.target.f = this.current.f) : this.stop("target"), this.isDragging = !0, this.addTrackingPoint(e), this.emit("touchStart", t), !0
    }

    onPointerMove(t, e, i) {
      if (!1 === this.option("touch", t)) return;
      if (!this.isDragging) return;
      if (e.length < 2 && this.panOnlyZoomed && pt(this.targetScale) <= pt(this.minScale)) return;
      if (this.emit("touchMove", t), t.defaultPrevented) return;
      this.addTrackingPoint(e[0]);
      const {content: s} = this, n = xt(i[0], i[1]), o = xt(e[0], e[1]);
      let a = 0, r = 0;
      if (e.length > 1) {
        const t = s.getBoundingClientRect();
        a = n.clientX - t.left - .5 * t.width, r = n.clientY - t.top - .5 * t.height
      }
      const l = wt(i[0], i[1]), h = wt(e[0], e[1]);
      let c = l ? h / l : 1, d = o.clientX - n.clientX, u = o.clientY - n.clientY;
      this.dragOffset.x += d, this.dragOffset.y += u, this.dragOffset.time = Date.now() - this.dragStart.time;
      let p = pt(this.targetScale) === pt(this.minScale) && this.option("lockAxis");
      if (p && !this.lockedAxis) if ("xy" === p || "y" === p || "touchmove" === t.type) {
        if (Math.abs(this.dragOffset.x) < 6 && Math.abs(this.dragOffset.y) < 6) return void t.preventDefault();
        const e = Math.abs(180 * Math.atan2(this.dragOffset.y, this.dragOffset.x) / Math.PI);
        this.lockedAxis = e > 45 && e < 135 ? "y" : "x", this.dragOffset.x = 0, this.dragOffset.y = 0, d = 0, u = 0
      } else this.lockedAxis = p;
      if (gt(t.target, this.content) && (p = "x", this.dragOffset.y = 0), p && "xy" !== p && this.lockedAxis !== p && pt(this.targetScale) === pt(this.minScale)) return;
      t.cancelable && t.preventDefault(), this.container.classList.add(this.cn("isDragging"));
      const g = this.checkBounds(d, u);
      this.option("rubberband") ? ("x" !== this.isInfinite && (g.xDiff > 0 && d < 0 || g.xDiff < 0 && d > 0) && (d *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitWidth * g.xDiff))), "y" !== this.isInfinite && (g.yDiff > 0 && u < 0 || g.yDiff < 0 && u > 0) && (u *= Math.max(0, .5 - Math.abs(.75 / this.contentRect.fitHeight * g.yDiff)))) : (g.xDiff && (d = 0), g.yDiff && (u = 0));
      const m = this.targetScale, f = this.minScale, b = this.maxScale;
      m < .5 * f && (c = Math.max(c, f)), m > 1.5 * b && (c = Math.min(c, b)), "y" === this.lockedAxis && pt(m) === pt(f) && (d = 0), "x" === this.lockedAxis && pt(m) === pt(f) && (u = 0), this.applyChange({
        originX: a,
        originY: r,
        panX: d,
        panY: u,
        scale: c,
        friction: this.option("dragFriction"),
        ignoreBounds: !0
      })
    }

    onPointerUp(t, e, i) {
      if (i.length) return this.dragOffset.x = 0, this.dragOffset.y = 0, void (this.trackingPoints = []);
      this.container.classList.remove(this.cn("isDragging")), this.isDragging && (this.addTrackingPoint(e), this.panOnlyZoomed && this.contentRect.width - this.contentRect.fitWidth < 1 && this.contentRect.height - this.contentRect.fitHeight < 1 && (this.trackingPoints = []), gt(t.target, this.content) && "y" === this.lockedAxis && (this.trackingPoints = []), this.emit("touchEnd", t), this.isDragging = !1, this.lockedAxis = !1, this.state !== St.Destroy && (t.defaultPrevented || this.startDecelAnim()))
    }

    startDecelAnim() {
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const t of Pt) this.velocity[t] = 0, this.target[t] = this.current[t];
      Tt(this.container, "is-scaling"), Tt(this.container, "is-animating"), this.isTicking = !1;
      const {trackingPoints: t} = this, e = t[0], i = t[t.length - 1];
      let s = 0, n = 0, o = 0;
      i && e && (s = i.clientX - e.clientX, n = i.clientY - e.clientY, o = i.time - e.time);
      let a = 0, r = 0, l = 0, h = 0, c = this.option("decelFriction");
      const d = this.targetScale;
      if ((d < this.minScale - 1e-5 || d > this.maxScale + 1e-5) && (c = .35), o > 0) {
        l = Math.abs(s) > 3 ? s / (o / 30) : 0, h = Math.abs(n) > 3 ? n / (o / 30) : 0;
        const t = this.option("maxVelocity");
        t && (l = Math.max(Math.min(l, t), -1 * t), h = Math.max(Math.min(h, t), -1 * t))
      }
      l && (a = l / (1 / (1 - c) - 1)), h && (r = h / (1 / (1 - c) - 1)), ("y" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "y" === this.lockedAxis && pt(d) === this.minScale) && (a = l = 0), ("x" === this.option("lockAxis") || "xy" === this.option("lockAxis") && "x" === this.lockedAxis && pt(d) === this.minScale) && (r = h = 0);
      const u = this.dragOffset.x, p = this.dragOffset.y, g = this.option("dragMinThreshold") || 0;
      Math.abs(u) < g && Math.abs(p) < g && (a = r = 0, l = h = 0), this.applyChange({
        panX: a,
        panY: r,
        friction: c
      }), this.emit("decel", l, h, u, p)
    }

    onWheel(t) {
      const e = Date.now(), i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail));
      if (this.prevWheelTime && e - this.prevWheelTime < 200 && this.prevWheelDelta !== i) return void t.preventDefault();
      if (this.prevWheelDelta = i, this.prevWheelTime = e, this.emit("wheel", t, i), "mousemove" === this.panMode) return;
      if (t.defaultPrevented) return;
      const s = this.option("wheel");
      "pan" === s ? (t.preventDefault(), this.panOnlyZoomed && !this.canZoomOut() || this.applyChange({
        panY: 100 * i,
        bounce: !1
      })) : "zoom" === s && !1 !== this.option("zoom") && this.zoomWithWheel(t)
    }

    onMouseMove(t) {
      this.panWithMouse(t)
    }

    onKeydown(t) {
      "Escape" === t.key && this.toggleFS()
    }

    onResize() {
      this.updateMetrics(), this.checkBounds().inBounds || this.requestTick()
    }

    setTransform() {
      this.emit("beforeTransform");
      const {current: t, target: e, content: i, contentRect: s} = this, n = Object.assign({}, Ot);
      for (const i of Pt) {
        const s = "e" == i || "f" === i ? 1e3 : 1e5;
        n[i] = pt(t[i], s), Math.abs(e[i] - t[i]) < ("e" == i || "f" === i ? .51 : .001) && (this.current[i] = e[i])
      }
      const {a: o, b: a, c: r, d: l, e: h, f: c} = n, d = `matrix(${o}, ${a}, ${r}, ${l}, ${h}, ${c})`,
        u = (this.option("transformParent") ? i.parentElement : null) || i;
      if (u.style.transform === d) return;
      u.style.transform = d;
      const {contentWidth: p, contentHeight: g} = this.calculateContentDim();
      s.width = p, s.height = g, this.emit("afterTransform")
    }

    updateMetrics(t = !1) {
      if (!this || this.state === St.Destroy) return;
      const {container: e, containerRect: i, content: s} = this, n = i.innerWidth, o = i.innerHeight,
        a = e.getBoundingClientRect(), r = getComputedStyle(this.container), l = a.width, h = a.height,
        c = parseFloat(r.paddingTop) + parseFloat(r.paddingBottom),
        d = parseFloat(r.paddingLeft) + parseFloat(r.paddingRight);
      this.containerRect = {width: l, height: h, innerWidth: l - d, innerHeight: h - c};
      let u = this.option("width") || "auto", p = this.option("height") || "auto";
      "auto" === u && (u = parseFloat(s.dataset.width || "") || (t => {
        let e = 0;
        return e = t instanceof HTMLImageElement ? t.naturalWidth : t instanceof SVGElement ? t.width.baseVal.value : t.offsetWidth, Math.max(e, t.scrollWidth)
      })(s)), "auto" === p && (p = parseFloat(s.dataset.height || "") || (t => {
        let e = 0;
        return e = t instanceof HTMLImageElement ? t.naturalHeight : t instanceof SVGElement ? t.height.baseVal.value : t.offsetHeight, Math.max(e, t.scrollHeight)
      })(s));
      const g = (this.option("transformParent") ? s.parentElement : null) || s, m = g.getAttribute("style") || "";
      g.style.setProperty("transform", "none", "important"), s instanceof HTMLImageElement && (g.style.width = "", g.style.height = ""), g.offsetHeight;
      const f = s.getBoundingClientRect();
      let b = f.width, v = f.height, y = 0, w = 0;
      if (s instanceof HTMLImageElement && ({width: b, height: v, top: y, left: w} = ((t, e, i, s) => {
        const n = i / s;
        return n > t / e ? (i = t, s = t / n) : (i = e * n, s = e), {
          width: i,
          height: s,
          top: .5 * (e - s),
          left: .5 * (t - i)
        }
      })(f.width, f.height, u, p)), this.contentRect = Object.assign(Object.assign({}, this.contentRect), {
        top: f.top - a.top + y,
        bottom: a.bottom - f.bottom + y,
        left: f.left - a.left + w,
        right: a.right - f.right + w,
        fitWidth: b,
        fitHeight: v,
        width: b,
        height: v,
        fullWidth: u,
        fullHeight: p
      }), g.style.cssText = m, s instanceof HTMLImageElement && (g.style.width = b + "px", g.style.height = v + "px"), this.setTransform(), !0 !== t) {
        let t = "";
        Math.abs(l - n) > 1 && (t += "x"), Math.abs(h - o) > 1 && (t += "y"), t && this.emit("refresh", t)
      }
      this.ignoreBounds || (pt(this.targetScale) < pt(this.minScale) ? this.zoomTo(this.minScale, {friction: 0}) : this.targetScale > this.maxScale ? this.zoomTo(this.maxScale, {friction: 0}) : this.state === St.Init || this.checkBounds().inBounds || this.requestTick()), this.updateControls()
    }

    getBounds() {
      const t = this.option("bounds");
      if ("auto" !== t) return t;
      const {contentWidth: e, contentHeight: i} = this.calculateContentDim(this.target);
      let s = 0, n = 0, o = 0, a = 0;
      const r = this.option("infinite");
      if (!0 === r || this.lockedAxis && r === this.lockedAxis) s = -1 / 0, o = 1 / 0, n = -1 / 0, a = 1 / 0; else {
        let {containerRect: t, contentRect: r} = this, l = pt(this.contentRect.fitWidth * this.targetScale, 1e3),
          h = pt(this.contentRect.fitHeight * this.targetScale, 1e3), {innerWidth: c, innerHeight: d} = t;
        if (this.containerRect.width === l && (c = t.width), this.containerRect.width === h && (d = t.height), e > c) {
          o = .5 * (e - c), s = -1 * o;
          let t = .5 * (r.right - r.left);
          s += t, o += t
        }
        if (this.contentRect.fitWidth > c && e < c && (s -= .5 * (this.contentRect.fitWidth - c), o -= .5 * (this.contentRect.fitWidth - c)), i > d) {
          a = .5 * (i - d), n = -1 * a;
          let t = .5 * (r.bottom - r.top);
          n += t, a += t
        }
        this.contentRect.fitHeight > d && i < d && (s -= .5 * (this.contentRect.fitHeight - d), o -= .5 * (this.contentRect.fitHeight - d))
      }
      return {x: {min: s, max: o}, y: {min: n, max: a}}
    }

    updateControls() {
      const t = this, e = t.container;
      let i = {
          toggleMax: this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? this.maxScale : this.minScale,
          toggleCover: this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? this.coverScale : this.minScale,
          toggleZoom: this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? this.fullScale : this.minScale
        }[this.option("click") || ""] || this.minScale, s = t.canZoomIn(), n = t.canZoomOut(),
        o = "drag" === this.panMode, a = n && o;
      this.targetScale <= this.minScale && !this.panOnlyZoomed && (a = !0), (this.contentRect.width - this.contentRect.fitWidth > -1 || this.contentRect.height - this.contentRect.fitHeight > -1) && (a = !0), this.contentRect.width * this.targetScale < this.contentRect.fitWidth && (a = !1), "mousemove" === this.panMode && (a = !1);
      let r = s && pt(i) > pt(this.targetScale), l = !r && !a && n && pt(i) < pt(this.targetScale);
      ft(e, this.cn("canZoomIn"), r), ft(e, this.cn("canZoomOut"), l), ft(e, this.cn("isDraggable"), a);
      for (const t of e.querySelectorAll('[data-panzoom-action="zoomIn"]')) s ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
      for (const t of e.querySelectorAll('[data-panzoom-action="zoomOut"]')) n ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"));
      for (const i of e.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
        s = t.targetScale < t.fullScale - .1, s || n ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"));
        const e = i.querySelector("g");
        e && (e.style.display = t.targetScale > .9 * t.fullScale ? "none" : "")
      }
    }

    panTo({x: t = this.target.e, y: e = this.target.f, scale: i = this.targetScale, friction: s = this.option("friction"), angle: n = 0, originX: o = 0, originY: a = 0, flipX: r = !1, flipY: l = !1, ignoreBounds: h = !1}) {
      this.state !== St.Destroy && this.applyChange({
        panX: t - this.target.e,
        panY: e - this.target.f,
        scale: i / this.targetScale,
        angle: n,
        originX: o,
        originY: a,
        friction: s,
        flipX: r,
        flipY: l,
        ignoreBounds: h
      })
    }

    applyChange({panX: t = 0, panY: e = 0, scale: i = 1, angle: s = 0, originX: n = -this.current.e, originY: o = -this.current.f, friction: a = this.option("friction"), flipX: r = !1, flipY: l = !1, ignoreBounds: h = !1, bounce: c = this.option("bounce")}) {
      const d = this.state;
      if (d === St.Init || d === St.Destroy) return;
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const t of Pt) this.velocity[t] = 0;
      this.friction = a || 0, this.ignoreBounds = h;
      const {current: u} = this, p = u.e, g = u.f, m = this.getMatrix(this.target);
      let f = (new DOMMatrix).translate(p, g).translate(n, o).translate(t, e);
      if (this.option("zoom")) {
        if (!h) {
          const t = this.targetScale, e = this.minScale, s = this.maxScale;
          t * i < e && (i = e / t), t * i > s && (i = s / t)
        }
        f = f.scale(i)
      }
      f = f.translate(-n, -o).translate(-p, -g).multiply(m), s && (f = f.rotate(s)), r && (f = f.scale(-1, 1)), l && (f = f.scale(1, -1));
      for (const t of Pt) "a" != t && "d" != t || !(f[t] > this.minScale + 1e-5 || f[t] < this.minScale - 1e-5) ? this.target[t] = pt(f[t], 1e3) : this.target[t] = f[t];
      (this.targetScale < this.scale || Math.abs(i - 1) > .1 || "mousemove" === this.panMode || !1 === c) && !h && this.clampTargetBounds(), this.isResting || (this.state = St.Panning, this.requestTick())
    }

    stop(t = !1) {
      if (this.state === St.Init || this.state === St.Destroy) return;
      const e = this.isTicking;
      this.rAF && (cancelAnimationFrame(this.rAF), this.rAF = null), this.isBouncingX = !1, this.isBouncingY = !1;
      for (const e of Pt) this.velocity[e] = 0, "current" === t ? this.current[e] = this.target[e] : "target" === t && (this.target[e] = this.current[e]);
      this.setTransform(), Tt(this.container, "is-scaling"), Tt(this.container, "is-animating"), this.isTicking = !1, this.state = St.Ready, e && (this.emit("endAnimation"), this.updateControls())
    }

    requestTick() {
      this.isTicking || (this.emit("startAnimation"), this.updateControls(), Mt(this.container, "is-animating"), this.isScaling && Mt(this.container, "is-scaling")), this.isTicking = !0, this.rAF || (this.rAF = requestAnimationFrame(() => this.animate()))
    }

    panWithMouse(t, e = this.option("mouseMoveFriction")) {
      if (this.prevMouseMoveEvent = t, "mousemove" !== this.panMode || !t) return;
      if (pt(this.targetScale) <= pt(this.minScale)) return;
      this.emit("mouseMove", t);
      const {container: i, containerRect: s, contentRect: n} = this, o = s.width, a = s.height,
        r = i.getBoundingClientRect(), l = (t.clientX || 0) - r.left, h = (t.clientY || 0) - r.top;
      let {contentWidth: c, contentHeight: d} = this.calculateContentDim(this.target);
      const u = this.option("mouseMoveFactor");
      u > 1 && (c !== o && (c *= u), d !== a && (d *= u));
      let p = .5 * (c - o) - l / o * 100 / 100 * (c - o);
      p += .5 * (n.right - n.left);
      let g = .5 * (d - a) - h / a * 100 / 100 * (d - a);
      g += .5 * (n.bottom - n.top), this.applyChange({panX: p - this.target.e, panY: g - this.target.f, friction: e})
    }

    zoomWithWheel(t) {
      if (this.state === St.Destroy || this.state === St.Init) return;
      const e = Math.abs(t.deltaY) < 100 && Math.abs(t.deltaX) < 100 ? 25 : 50,
        i = Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail)), s = this.targetScale, n = this.maxScale,
        o = this.minScale;
      let a = s * (100 + i * e) / 100;
      a < o && s <= o ? (this.wheelDelta += Math.abs(i), a = o) : a > n && s >= n ? (this.wheelDelta += Math.abs(i), a = n) : (this.wheelDelta = 0, a = Math.max(Math.min(a, n), o)), this.wheelDelta > this.option("wheelLimit") || (t.preventDefault(), a !== s && this.zoomTo(a, {event: t}))
    }

    canZoomIn() {
      return this.option("zoom") && (this.contentRect.width < this.contentRect.fitWidth || this.targetScale < this.maxScale - 1e-5)
    }

    canZoomOut() {
      return this.option("zoom") && this.targetScale > this.minScale + 1e-5
    }

    zoomIn(t = 1.25, e) {
      this.zoomTo(this.targetScale * t, e)
    }

    zoomOut(t = .8, e) {
      this.zoomTo(this.targetScale * t, e)
    }

    zoomToFit(t) {
      this.zoomTo("fit", t)
    }

    zoomToCover(t) {
      this.zoomTo("cover", t)
    }

    zoomToFull(t) {
      this.zoomTo("full", t)
    }

    zoomToMax(t) {
      this.zoomTo("max", t)
    }

    toggleZoom(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.fullScale - this.minScale) ? "full" : "fit", t)
    }

    toggleMax(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.maxScale - this.minScale) ? "max" : "fit", t)
    }

    toggleCover(t) {
      this.zoomTo(this.targetScale - this.minScale < .5 * (this.coverScale - this.minScale) ? "cover" : "fit", t)
    }

    iterateZoom(t) {
      this.zoomTo("next", t)
    }

    zoomTo(t = 1, {friction: e = "auto", originX: i = 0, originY: s = 0, event: n} = {}) {
      if (this.isContentLoading || this.state === St.Destroy) return;
      this.stop();
      const {targetScale: o} = this;
      let a = 1;
      if ("mousemove" === this.panMode && (n = this.prevMouseMoveEvent || n), n) {
        const t = this.content.getBoundingClientRect(), e = n.clientX || 0, o = n.clientY || 0;
        i = e - t.left - .5 * t.width, s = o - t.top - .5 * t.height
      }
      const r = this.fullScale, l = this.maxScale;
      let h = this.coverScale;
      "number" == typeof t ? a = t / o : ("next" === t && (r - h < .2 && (h = r), t = o < r - 1e-5 ? "full" : o < l - 1e-5 ? "max" : "fit"), a = "full" === t ? r / o || 1 : "cover" === t ? h / o || 1 : "max" === t ? l / o || 1 : 1 / o || 1), e = "auto" === e ? a > 1 ? .15 : .25 : e, this.applyChange({
        scale: a,
        originX: i,
        originY: s,
        friction: e
      }), n && "mousemove" === this.panMode && this.panWithMouse(n, e)
    }

    rotateCCW() {
      this.applyChange({angle: -90})
    }

    rotateCW() {
      this.applyChange({angle: 90})
    }

    flipX() {
      this.applyChange({flipX: !0})
    }

    flipY() {
      this.applyChange({flipY: !0})
    }

    fitX() {
      this.stop("target");
      const {containerRect: t, contentRect: e, target: i} = this;
      this.applyChange({
        panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
        panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
        scale: t.width / e.fitWidth / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0
      })
    }

    fitY() {
      this.stop("target");
      const {containerRect: t, contentRect: e, target: i} = this;
      this.applyChange({
        panX: .5 * t.width - (e.left + .5 * e.fitWidth) - i.e,
        panY: .5 * t.height - (e.top + .5 * e.fitHeight) - i.f,
        scale: t.height / e.fitHeight / this.targetScale,
        originX: 0,
        originY: 0,
        ignoreBounds: !0
      })
    }

    toggleFS() {
      const {container: t} = this, e = this.cn("inFullscreen"), i = this.cn("htmlHasFullscreen");
      t.classList.toggle(e);
      const s = t.classList.contains(e);
      s ? (document.documentElement.classList.add(i), document.addEventListener("keydown", this.onKeydown, !0)) : (document.documentElement.classList.remove(i), document.removeEventListener("keydown", this.onKeydown, !0)), this.updateMetrics(), this.emit(s ? "enterFS" : "exitFS")
    }

    getMatrix(t = this.current) {
      const {a: e, b: i, c: s, d: n, e: o, f: a} = t;
      return new DOMMatrix([e, i, s, n, o, a])
    }

    reset(t) {
      if (this.state !== St.Init && this.state !== St.Destroy) {
        this.stop("current");
        for (const t of Pt) this.target[t] = Ot[t];
        this.target.a = this.minScale, this.target.d = this.minScale, this.isResting || (this.friction = void 0 === t ? this.option("friction") : t, this.state = St.Panning, this.requestTick())
      }
    }

    destroy() {
      this.stop(), this.state = St.Destroy, this.detachEvents(), this.detachObserver();
      const {container: t, content: e} = this, i = this.option("classes") || {};
      for (const e of Object.values(i)) t.classList.remove(e + "");
      e && (e.removeEventListener("load", this.onLoad), e.removeEventListener("error", this.onError)), this.detachPlugins()
    }
  }

  Object.defineProperty(At, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Et
  }), Object.defineProperty(At, "Plugins", {enumerable: !0, configurable: !0, writable: !0, value: {}});
  const Lt = t => new Promise((e, i) => {
    const s = new Image;
    s.onload = e, s.onerror = i, s.src = t
  });

  class Rt extends ht {
    onCreateSlide(t, e, i) {
      const s = this.instance, n = s.optionFor(i, "src") || "", {el: o, type: a} = i;
      o && "image" === a && "string" == typeof n && this.setContent(i, n).then(t => {
        if (s.isClosing()) return;
        const e = i.contentEl, n = i.imageEl, o = i.thumbElSrc, a = this.optionFor(i, "initialSize"),
          r = this.optionFor(i, "zoom"), l = {event: s.prevMouseMoveEvent || s.options.event, friction: r ? .12 : 0};
        if (e && n && o && s.isOpeningSlide(i) && this.getZoomInfo(i)) {
          let t = document.createElement("img");
          Mt(t, "fancybox-ghost"), e.appendChild(t), t.src = o, setTimeout(() => {
            s.animate(t, "f-fadeFastOut", () => {
              t && (t.remove(), t = null)
            })
          }, 333), Lt(o).then(() => {
            i.state = ot.Opening, this.instance.emit("reveal", i), this.zoomIn(i).then(() => {
              this.instance.done(i)
            }, () => {
              s.hideLoading(i)
            })
          }, () => {
            s.hideLoading(i), s.revealContent(i)
          })
        } else {
          let e = s.optionFor(i, "showClass") || void 0, n = !0;
          s.isOpeningSlide(i) && ("full" === a ? t.zoomToFull(l) : "cover" === a ? t.zoomToCover(l) : "max" === a ? t.zoomToMax(l) : n = !1, t.stop("current")), n && e && (e = "f-fadeIn"), s.revealContent(i, e)
        }
      }, () => {
        s.setError(i, "{{IMAGE_ERROR}}")
      })
    }

    onRemoveSlide(t, e, i) {
      i.panzoom && i.panzoom.destroy(), i.panzoom = void 0, i.imageEl = void 0
    }

    onChange(t, e, i, s) {
      for (const t of e.slides) {
        const e = t.panzoom;
        e && t.index !== i && e.reset(.35)
      }
    }

    onClose() {
      const t = this.instance, e = t.container, i = t.getSlide();
      if (!e || !e.parentElement || !i) return;
      const {el: s, contentEl: n, panzoom: o} = i, a = i.thumbElSrc;
      if (!s || !a || !n || !o || o.isContentLoading || o.state === St.Init || o.state === St.Destroy) return;
      o.updateMetrics();
      let r = this.getZoomInfo(i);
      if (!r) return;
      this.instance.state = nt.CustomClosing, s.classList.remove("is-zooming-in"), s.classList.add("is-zooming-out"), n.style.backgroundImage = `url('${a}')`, Lt(a).then(() => {
        s.classList.add("hide-image")
      }, () => {
      });
      const l = e.getBoundingClientRect();
      Object.assign(e.style, {
        position: "absolute",
        top: window.pageYOffset + "px",
        left: window.pageXOffset + "px",
        bottom: "auto",
        right: "auto",
        width: l.width + "px",
        height: l.height + "px",
        overflow: "hidden"
      });
      const {x: h, y: c, scale: d, opacity: u} = r;
      if (u) {
        const t = ((t, e, i, s) => {
          const n = e - t;
          return e => 1 + ((e - t) / n * -1 || 0)
        })(o.scale, d);
        o.on("afterTransform", () => {
          n.style.opacity = t(o.scale) + ""
        })
      }
      o.on("endAnimation", () => {
        t.destroy()
      }), o.target.a = d, o.target.b = 0, o.target.c = 0, o.target.d = d, o.panTo({
        x: h,
        y: c,
        scale: d,
        friction: u ? .2 : .33,
        ignoreBounds: !0
      }), o.isResting && t.destroy()
    }

    setContent(t, e) {
      return new Promise((i, s) => {
        var n, o;
        const a = this.instance, r = t.el;
        if (!r) return void s();
        a.showLoading(t);
        const l = document.createElement("img");
        if (l.classList.add("fancybox-image"), l.src = e || "", l.alt = (null === (n = t.caption) || void 0 === n ? void 0 : n.replace(/<[^>]+>/gi, "").substring(0, 1e3)) || `Image ${t.index + 1} of ${null === (o = a.carousel) || void 0 === o ? void 0 : o.pages.length}`, l.draggable = !1, t.srcset && l.setAttribute("srcset", t.srcset), t.sizes && l.setAttribute("sizes", t.sizes), t.imageEl = l, a.setContent(t, l, !1), this.option("protected")) {
          r.addEventListener("contextmenu", t => {
            t.preventDefault()
          });
          const e = t.contentEl;
          if (e) {
            const t = document.createElement("div");
            Mt(t, "fancybox-protected"), e.append(t)
          }
        }
        t.panzoom = new At(r, V({}, this.option("Panzoom") || {}, {
          content: l,
          width: a.optionFor(t, "width", "auto"),
          height: a.optionFor(t, "height", "auto"),
          wheel: () => {
            const t = a.option("wheel");
            return ("zoom" === t || "pan" == t) && t
          },
          click: (e, i) => {
            var s;
            if (a.isCompact || a.isClosing()) return !1;
            let n = !i || i.target && (null === (s = t.contentEl) || void 0 === s ? void 0 : s.contains(i.target));
            return a.option(n ? "contentClick" : "backdropClick") || !1
          },
          dblClick: () => a.isCompact ? "toggleZoom" : a.option("contentDblClick") || !1,
          spinner: !1,
          panOnlyZoomed: !0,
          wheelLimit: 1 / 0,
          transformParent: !0,
          on: {
            ready: t => {
              i(t)
            }, error: () => {
              s()
            }, destroy: () => {
              s()
            }
          }
        }))
      })
    }

    zoomIn(t) {
      return new Promise((e, i) => {
        const {panzoom: s, contentEl: n, el: o} = t;
        s && s.updateMetrics();
        const a = this.getZoomInfo(t);
        if (!(a && o && n && s)) return void i();
        const {x: r, y: l, scale: h, opacity: c} = a, d = () => {
          t.state !== ot.Closing && (c && (n.style.opacity = Math.max(Math.min(1, 1 - (1 - s.scale) / (1 - h)), 0) + ""), s.scale >= 1 && s.scale > s.targetScale - .1 && e(s))
        }, u = t => {
          t.scale < .99 || t.scale > 1.01 || (n.style.opacity = "", o.classList.remove("is-zooming-in"), t.off("endAnimation", u), t.off("touchStart", u), t.off("afterTransform", d), e(t))
        };
        s.on("endAnimation", u), s.on("touchStart", u), s.on("afterTransform", d), s.on(["error", "destroy"], () => {
          i()
        }), s.panTo({x: r, y: l, scale: h, friction: 0, ignoreBounds: !0}), s.stop("current");
        const p = this.instance,
          g = {event: "mousemove" === s.panMode ? p.prevMouseMoveEvent || p.options.event : void 0},
          m = this.optionFor(t, "initialSize");
        Mt(o, "is-zooming-in"), p.hideLoading(t), "full" === m ? s.zoomToFull(g) : "cover" === m ? s.zoomToCover(g) : "max" === m ? s.zoomToMax(g) : s.reset(.165)
      })
    }

    getZoomInfo(t) {
      const {el: e, imageEl: i, thumbEl: s, panzoom: n} = t;
      if (!e || !i || !s || !n || U(s) < 3 || !this.optionFor(t, "zoom") || this.instance.state === nt.Destroy) return !1;
      const {top: o, left: a, width: r, height: l} = s.getBoundingClientRect();
      let {top: h, left: c, fitWidth: d, fitHeight: u} = n.contentRect;
      if (!(r && l && d && u)) return !1;
      const p = r / d, g = n.container.getBoundingClientRect();
      h += g.top, c += g.left;
      const m = -1 * (c + .5 * d - (a + .5 * r)), f = -1 * (h + .5 * u - (o + .5 * l));
      let b = this.option("zoomOpacity") || !1;
      return "auto" === b && (b = Math.abs(r / l - d / u) > .1), {x: m, y: f, scale: p, opacity: b}
    }

    attach() {
      this.instance.on("Carousel.change", this.onChange), this.instance.on("Carousel.createSlide", this.onCreateSlide), this.instance.on("Carousel.removeSlide", this.onRemoveSlide), this.instance.on("close", this.onClose)
    }

    detach() {
      this.instance.off("Carousel.change", this.onChange), this.instance.off("Carousel.createSlide", this.onCreateSlide), this.instance.off("Carousel.removeSlide", this.onRemoveSlide), this.instance.off("close", this.onClose)
    }
  }

  Object.defineProperty(Rt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {initialSize: "fit", Panzoom: {maxScale: 1}, protected: !1, zoom: !0, zoomOpacity: "auto"}
  });
  const kt = (t, e = {}) => {
      const i = new URL(t), s = new URLSearchParams(i.search), n = new URLSearchParams;
      for (const [t, i] of [...s, ...Object.entries(e)]) {
        let e = i.toString();
        "t" === t ? n.set("start", parseInt(e).toString()) : n.set(t, e)
      }
      let o = n.toString(), a = t.match(/#t=((.*)?\d+s)/);
      return a && (o += "#t=" + a[1]), o
    },
    Dt = ["image", "html", "ajax", "inline", "clone", "iframe", "map", "pdf", "html5video", "youtube", "vimeo", "video"];

  class It extends ht {
    onInitSlide(t, e, i) {
      this.processType(i)
    }

    onCreateSlide(t, e, i) {
      this.setContent(i)
    }

    onRemoveSlide(t, e, i) {
      i.closeBtnEl && (i.closeBtnEl.remove(), i.closeBtnEl = void 0), i.xhr && (i.xhr.abort(), i.xhr = null), i.iframeEl && (i.iframeEl.onload = i.iframeEl.onerror = null, i.iframeEl.src = "//about:blank", i.iframeEl = null);
      const s = i.contentEl, n = i.placeholderEl;
      if ("inline" === i.type && s && n) s.classList.remove("fancybox__content"), "none" !== s.style.display && (s.style.display = "none"), n.parentNode && n.parentNode.insertBefore(s, n), n.remove(), i.placeholderEl = null; else for (; i.el && i.el.firstChild;) i.el.removeChild(i.el.firstChild)
    }

    onSelectSlide(t, e, i) {
      i.state === ot.Ready && this.playVideo()
    }

    onUnselectSlide(t, e, i) {
      var s, n;
      if ("html5video" === i.type) {
        try {
          null === (n = null === (s = i.el) || void 0 === s ? void 0 : s.querySelector("video")) || void 0 === n || n.pause()
        } catch (t) {
        }
        return
      }
      let o;
      "vimeo" === i.type ? o = {method: "pause", value: "true"} : "youtube" === i.type && (o = {
        event: "command",
        func: "pauseVideo"
      }), o && i.iframeEl && i.iframeEl.contentWindow && i.iframeEl.contentWindow.postMessage(JSON.stringify(o), "*"), i.poller && clearTimeout(i.poller)
    }

    onDone(t, e) {
      t.isCurrentSlide(e) && !t.isClosing() && this.playVideo()
    }

    onRefresh(t, e) {
      e.slides.forEach(t => {
        t.el && (this.setAspectRatio(t), this.resizeIframe(t))
      })
    }

    onMessage(t) {
      try {
        let e = JSON.parse(t.data);
        if ("https://player.vimeo.com" === t.origin) {
          if ("ready" === e.event) for (let e of Array.from(document.getElementsByClassName("fancybox__iframe"))) e instanceof HTMLIFrameElement && e.contentWindow === t.source && (e.dataset.ready = "true")
        } else if ("https://www.youtube-nocookie.com" === t.origin && "onReady" === e.event) {
          const t = document.getElementById(e.id);
          t && (t.dataset.ready = "true")
        }
      } catch (t) {
      }
    }

    loadAjaxContent(t) {
      const e = this.instance.optionFor(t, "src") || "";
      this.instance.showLoading(t);
      const i = this.instance, s = new XMLHttpRequest;
      i.showLoading(t), s.onreadystatechange = function () {
        s.readyState === XMLHttpRequest.DONE && i.state === nt.Ready && (i.hideLoading(t), 200 === s.status ? i.setContent(t, s.responseText) : i.setError(t, 404 === s.status ? "{{AJAX_NOT_FOUND}}" : "{{AJAX_FORBIDDEN}}"))
      };
      const n = t.ajax || null;
      s.open(n ? "POST" : "GET", e + ""), s.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), s.setRequestHeader("X-Requested-With", "XMLHttpRequest"), s.send(n), t.xhr = s
    }

    setInlineContent(t) {
      let e = null;
      if (G(t.src)) e = t.src; else if ("string" == typeof t.src) {
        const i = t.src.split("#", 2).pop();
        e = i ? document.getElementById(i) : null
      }
      if (e) {
        if ("clone" === t.type || e.dataset.placeholderId) {
          e = e.cloneNode(!0);
          const i = e.dataset.animationName;
          i && (e.classList.remove(i), delete e.dataset.animationName), delete e.dataset.placeholderId;
          let s = e.getAttribute("id");
          s = s ? s + "--clone" : `clone-${this.instance.id}-${t.index}`, e.setAttribute("id", s)
        } else if (e.parentNode) {
          const i = document.createElement("div");
          i.classList.add("fancybox-placeholder"), e.parentNode.insertBefore(i, e), t.placeholderEl = i
        }
        this.instance.setContent(t, e)
      } else this.instance.setError(t, "{{ELEMENT_NOT_FOUND}}")
    }

    setIframeContent(t) {
      const {src: e, el: i} = t;
      if (!e || "string" != typeof e || !i) return;
      const s = this.instance, n = document.createElement("iframe");
      n.className = "fancybox__iframe", n.setAttribute("id", `fancybox__iframe_${s.id}_${t.index}`), n.setAttribute("allow", "autoplay; fullscreen"), n.setAttribute("scrolling", "auto"), n.onerror = () => {
        s.setError(t, "{{IFRAME_ERROR}}")
      }, t.iframeEl = n;
      const o = this.optionFor(t, "preload");
      if (i.classList.add("is-loading"), "iframe" !== t.type || !1 === o) return n.setAttribute("src", t.src + ""), this.resizeIframe(t), void s.setContent(t, n);
      s.showLoading(t), n.onload = () => {
        if (!n.src.length) return;
        const e = "true" !== n.dataset.ready;
        n.dataset.ready = "true", this.resizeIframe(t), e ? s.revealContent(t) : s.hideLoading(t)
      }, n.setAttribute("src", e), s.setContent(t, n, !1)
    }

    resizeIframe(t) {
      const e = t.iframeEl, i = null == e ? void 0 : e.parentElement;
      if (!e || !i) return;
      let s = t.autoSize, n = t.width || 0, o = t.height || 0;
      n && o && (s = !1);
      const a = i && i.style;
      if (!1 !== t.preload && !1 !== s && a) try {
        const t = window.getComputedStyle(i), s = parseFloat(t.paddingLeft) + parseFloat(t.paddingRight),
          r = parseFloat(t.paddingTop) + parseFloat(t.paddingBottom), l = e.contentWindow;
        if (l) {
          const t = l.document, e = t.getElementsByTagName("html")[0], i = t.body;
          a.width = "", i.style.overflow = "hidden", n = n || e.scrollWidth + s, a.width = n + "px", i.style.overflow = "", a.flex = "0 0 auto", a.height = i.scrollHeight + "px", o = e.scrollHeight + r
        }
      } catch (t) {
      }
      if (n || o) {
        const t = {flex: "0 1 auto", width: "", height: ""};
        n && (t.width = n + "px"), o && (t.height = o + "px"), Object.assign(a, t)
      }
    }

    playVideo() {
      const t = this.instance.getSlide();
      if (!t) return;
      const {el: e} = t;
      if (!e || !e.offsetParent) return;
      if (!this.optionFor(t, "videoAutoplay")) return;
      if ("html5video" === t.type) try {
        const t = e.querySelector("video");
        if (t) {
          const e = t.play();
          void 0 !== e && e.then(() => {
          }).catch(e => {
            t.muted = !0, t.play()
          })
        }
      } catch (t) {
      }
      if ("youtube" !== t.type && "vimeo" !== t.type) return;
      const i = () => {
        if (t.iframeEl && t.iframeEl.contentWindow) {
          let e;
          if ("true" === t.iframeEl.dataset.ready) return e = "youtube" === t.type ? {
            event: "command",
            func: "playVideo"
          } : {
            method: "play",
            value: "true"
          }, e && t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"), void (t.poller = void 0);
          "youtube" === t.type && (e = {
            event: "listening",
            id: t.iframeEl.getAttribute("id")
          }, t.iframeEl.contentWindow.postMessage(JSON.stringify(e), "*"))
        }
        t.poller = setTimeout(i, 250)
      };
      i()
    }

    processType(t) {
      if (t.html) return t.type = "html", t.src = t.html, void (t.html = "");
      const e = this.instance.optionFor(t, "src", "");
      if (!e || "string" != typeof e) return;
      let i = t.type, s = null;
      if (s = e.match(/(?:youtube\.com|youtu\.be|youtube\-nocookie\.com)\/(?:watch\?(?:.*&)?v=|v\/|u\/|embed\/?)?(videoseries\?list=(?:.*)|[\w-]{11}|\?listType=(?:.*)&list=(?:.*))(?:.*)/i)) {
        const n = kt(e, this.optionFor(t, "youtube")), o = encodeURIComponent(s[1]);
        t.videoId = o, t.src = `https://www.youtube-nocookie.com/embed/${o}?${n}`, t.thumbSrc = t.thumbSrc || `https://i.ytimg.com/vi/${o}/mqdefault.jpg`, i = "youtube"
      } else if (s = e.match(/^.+vimeo.com\/(?:\/)?([\d]+)((\/|\?h=)([a-z0-9]+))?(.*)?/)) {
        const n = kt(e, this.optionFor(t, "vimeo")), o = encodeURIComponent(s[1]), a = s[4] || "";
        t.videoId = o, t.src = `https://player.vimeo.com/video/${o}?${a ? `h=${a}${n ? "&" : ""}` : ""}${n}`, i = "vimeo"
      }
      if (!i && t.triggerEl) {
        const e = t.triggerEl.dataset.type;
        Dt.includes(e) && (i = e)
      }
      i || "string" == typeof e && ("#" === e.charAt(0) ? i = "inline" : (s = e.match(/\.(mp4|mov|ogv|webm)((\?|#).*)?$/i)) ? (i = "html5video", t.videoFormat = t.videoFormat || "video/" + ("ogv" === s[1] ? "ogg" : s[1])) : e.match(/(^data:image\/[a-z0-9+\/=]*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg|ico)((\?|#).*)?$)/i) ? i = "image" : e.match(/\.(pdf)((\?|#).*)?$/i) ? i = "pdf" : (s = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:(?:(?:maps\/(?:place\/(?:.*)\/)?\@(.*),(\d+.?\d+?)z))|(?:\?ll=))(.*)?/i)) ? (t.src = `https://maps.google.${s[1]}/?ll=${(s[2] ? s[2] + "&z=" + Math.floor(parseFloat(s[3])) + (s[4] ? s[4].replace(/^\//, "&") : "") : s[4] + "").replace(/\?/, "&")}&output=${s[4] && s[4].indexOf("layer=c") > 0 ? "svembed" : "embed"}`, i = "map") : (s = e.match(/(?:maps\.)?google\.([a-z]{2,3}(?:\.[a-z]{2})?)\/(?:maps\/search\/)(.*)/i)) && (t.src = `https://maps.google.${s[1]}/maps?q=${s[2].replace("query=", "q=").replace("api=1", "")}&output=embed`, i = "map")), i = i || this.instance.option("defaultType"), t.type = i, "image" === i && (t.thumbSrc = t.thumbSrc || t.src)
    }

    setContent(t) {
      const e = this.instance.optionFor(t, "src") || "";
      if (t && t.type && e) {
        switch (t.type) {
          case"html":
            this.instance.setContent(t, e);
            break;
          case"html5video":
            const i = this.option("videoTpl");
            i && this.instance.setContent(t, i.replace(/\{\{src\}\}/gi, e + "").replace(/\{\{format\}\}/gi, this.optionFor(t, "videoFormat") || "").replace(/\{\{poster\}\}/gi, t.poster || t.thumbSrc || ""));
            break;
          case"inline":
          case"clone":
            this.setInlineContent(t);
            break;
          case"ajax":
            this.loadAjaxContent(t);
            break;
          case"pdf":
          case"map":
          case"youtube":
          case"vimeo":
            t.preload = !1;
          case"iframe":
            this.setIframeContent(t)
        }
        this.setAspectRatio(t)
      }
    }

    setAspectRatio(t) {
      var e;
      const i = t.contentEl, s = this.optionFor(t, "videoRatio"),
        n = null === (e = t.el) || void 0 === e ? void 0 : e.getBoundingClientRect();
      if (!(i && n && s && 1 !== s && t.type && ["video", "youtube", "vimeo", "html5video"].includes(t.type))) return;
      const o = n.width, a = n.height;
      i.style.aspectRatio = s + "", i.style.width = o / a > s ? "auto" : "", i.style.height = o / a > s ? "" : "auto"
    }

    attach() {
      this.instance.on("Carousel.initSlide", this.onInitSlide), this.instance.on("Carousel.createSlide", this.onCreateSlide), this.instance.on("Carousel.removeSlide", this.onRemoveSlide), this.instance.on("Carousel.selectSlide", this.onSelectSlide), this.instance.on("Carousel.unselectSlide", this.onUnselectSlide), this.instance.on("Carousel.Panzoom.refresh", this.onRefresh), this.instance.on("done", this.onDone), window.addEventListener("message", this.onMessage)
    }

    detach() {
      this.instance.off("Carousel.initSlide", this.onInitSlide), this.instance.off("Carousel.createSlide", this.onCreateSlide), this.instance.off("Carousel.removeSlide", this.onRemoveSlide), this.instance.off("Carousel.selectSlide", this.onSelectSlide), this.instance.off("Carousel.unselectSlide", this.onUnselectSlide), this.instance.off("Carousel.Panzoom.refresh", this.onRefresh), this.instance.off("done", this.onDone), window.removeEventListener("message", this.onMessage)
    }
  }

  Object.defineProperty(It, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      ajax: null,
      autoSize: !0,
      preload: !0,
      videoAutoplay: !0,
      videoRatio: 16 / 9,
      videoTpl: '<video class="fancybox__html5video" playsinline controls controlsList="nodownload" poster="{{poster}}">\n  <source src="{{src}}" type="{{format}}" />Sorry, your browser doesn\'t support embedded videos.</video>',
      videoFormat: "",
      vimeo: {byline: 1, color: "00adef", controls: 1, dnt: 1, muted: 0},
      youtube: {controls: 1, enablejsapi: 1, rel: 0, fs: 1}
    }
  });

  class jt extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "ready"
      }), Object.defineProperty(this, "inHover", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "timer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "progressBar", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    get isActive() {
      return "ready" !== this.state
    }

    onReady(t) {
      this.option("autoStart") && (t.isInfinite || t.page < t.pages.length - 1) && this.start()
    }

    onChange() {
      var t;
      (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) || (this.removeProgressBar(), this.pause())
    }

    onSettle() {
      this.resume()
    }

    onVisibilityChange() {
      "visible" === document.visibilityState ? this.resume() : this.pause()
    }

    onMouseEnter() {
      this.inHover = !0, this.pause()
    }

    onMouseLeave() {
      var t;
      this.inHover = !1, (null === (t = this.instance.panzoom) || void 0 === t ? void 0 : t.isResting) && this.resume()
    }

    onTimerEnd() {
      "play" === this.state && (this.instance.isInfinite || this.instance.page !== this.instance.pages.length - 1 ? this.instance.slideNext() : this.instance.slideTo(0))
    }

    removeProgressBar() {
      this.progressBar && (this.progressBar.remove(), this.progressBar = null)
    }

    createProgressBar() {
      var t;
      if (!this.option("showProgress")) return null;
      this.removeProgressBar();
      const e = this.instance, i = (null === (t = e.pages[e.page]) || void 0 === t ? void 0 : t.slides) || [];
      let s = this.option("progressParentEl");
      if (s || (s = (1 === i.length ? i[0].el : null) || e.viewport), !s) return null;
      const n = document.createElement("div");
      return Mt(n, "f-progress"), s.prepend(n), this.progressBar = n, n.offsetHeight, n
    }

    set() {
      if (this.instance.pages.length < 2) return;
      if (this.progressBar) return;
      const t = this.option("timeout");
      this.state = "play", Mt(this.instance.container, "has-autoplay");
      let e = this.createProgressBar();
      e && (e.style.transitionDuration = t + "ms", e.style.transform = "scaleX(1)"), this.timer = setTimeout(() => {
        this.timer = null, this.inHover || this.onTimerEnd()
      }, t), this.emit("set")
    }

    clear() {
      this.timer && (clearTimeout(this.timer), this.timer = null), this.removeProgressBar()
    }

    start() {
      if (this.set(), this.option("pauseOnHover")) {
        const t = this.instance.container;
        t.addEventListener("mouseenter", this.onMouseEnter, !1), t.addEventListener("mouseleave", this.onMouseLeave, !1)
      }
      document.addEventListener("visibilitychange", this.onVisibilityChange, !1)
    }

    stop() {
      const t = this.instance.container;
      this.clear(), this.state = "ready", t.removeEventListener("mouseenter", this.onMouseEnter, !1), t.removeEventListener("mouseleave", this.onMouseLeave, !1), document.removeEventListener("visibilitychange", this.onVisibilityChange, !1), Tt(t, "has-autoplay"), this.emit("stop")
    }

    pause() {
      "play" === this.state && (this.state = "pause", this.clear(), this.emit("pause"))
    }

    resume() {
      const t = this.instance;
      if (t.isInfinite || t.page !== t.pages.length - 1) if ("play" !== this.state) {
        if ("pause" === this.state && !this.inHover) {
          const t = new Event("resume", {bubbles: !0, cancelable: !0});
          this.emit("resume", event), t.defaultPrevented || this.set()
        }
      } else this.set(); else this.stop()
    }

    toggle() {
      "play" === this.state || "pause" === this.state ? this.stop() : this.set()
    }

    attach() {
      this.instance.on("ready", this.onReady), this.instance.on("Panzoom.startAnimation", this.onChange), this.instance.on("Panzoom.endAnimation", this.onSettle), this.instance.on("Panzoom.touchMove", this.onChange)
    }

    detach() {
      this.instance.off("ready", this.onReady), this.instance.off("Panzoom.startAnimation", this.onChange), this.instance.off("Panzoom.endAnimation", this.onSettle), this.instance.off("Panzoom.touchMove", this.onChange), this.stop()
    }
  }

  Object.defineProperty(jt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {autoStart: !0, pauseOnHover: !0, progressParentEl: null, showProgress: !0, timeout: 3e3}
  });

  class Ft extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      })
    }

    onPrepare(t) {
      const e = t.carousel;
      if (!e) return;
      const i = t.container;
      i && (e.options.Autoplay = V(this.option("Autoplay") || {}, {
        pauseOnHover: !1,
        autoStart: !1,
        timeout: this.option("timeout"),
        progressParentEl: () => i.querySelector(".fancybox__toolbar [data-fancybox-toggle-slideshow]") || i,
        on: {
          set: e => {
            var s;
            i.classList.add("has-slideshow"), (null === (s = t.getSlide()) || void 0 === s ? void 0 : s.state) !== ot.Ready && e.pause()
          }, stop: () => {
            i.classList.remove("has-slideshow"), t.isCompact || t.endIdle()
          }, resume: (e, i) => {
            var s, n, o;
            !i || !i.cancelable || (null === (s = t.getSlide()) || void 0 === s ? void 0 : s.state) === ot.Ready && (null === (o = null === (n = t.carousel) || void 0 === n ? void 0 : n.panzoom) || void 0 === o ? void 0 : o.isResting) || i.preventDefault()
          }
        }
      }), e.attachPlugins({Autoplay: jt}), this.ref = e.plugins.Autoplay)
    }

    onReady(t) {
      const e = t.carousel, i = this.ref;
      e && i && this.option("playOnStart") && (e.isInfinite || e.page < e.pages.length - 1) && i.start()
    }

    onDone(t, e) {
      const i = this.ref;
      if (!i) return;
      const s = e.panzoom;
      s && s.on("startAnimation", () => {
        t.isCurrentSlide(e) && i.stop()
      }), t.isCurrentSlide(e) && i.resume()
    }

    onKeydown(t, e) {
      var i;
      const s = this.ref;
      s && e === this.option("key") && "BUTTON" !== (null === (i = document.activeElement) || void 0 === i ? void 0 : i.nodeName) && s.toggle()
    }

    attach() {
      this.instance.on("Carousel.init", this.onPrepare), this.instance.on("Carousel.ready", this.onReady), this.instance.on("done", this.onDone), this.instance.on("keydown", this.onKeydown)
    }

    detach() {
      this.instance.off("Carousel.init", this.onPrepare), this.instance.off("Carousel.ready", this.onReady), this.instance.off("done", this.onDone), this.instance.off("keydown", this.onKeydown)
    }
  }

  Object.defineProperty(Ft, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {key: " ", playOnStart: !1, timeout: 3e3}
  });
  const Ht = {
    classes: {
      container: "f-thumbs f-carousel__thumbs",
      viewport: "f-thumbs__viewport",
      track: "f-thumbs__track",
      slide: "f-thumbs__slide",
      isResting: "is-resting",
      isSelected: "is-selected",
      isLoading: "is-loading",
      hasThumbs: "has-thumbs"
    },
    minCount: 2,
    parentEl: null,
    thumbTpl: '<button class="f-thumbs__slide__button" tabindex="0" type="button" aria-label="{{GOTO}}" data-carousel-index="%i"><img class="f-thumbs__slide__img" data-lazy-src="{{%s}}" alt="" /></button>',
    type: "modern"
  };
  var Bt;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Hidden = 2] = "Hidden", t[t.Disabled = 3] = "Disabled"
  }(Bt || (Bt = {}));
  let Nt = class extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "type", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: "modern"
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "thumbWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "thumbClipWidth", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "thumbHeight", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "thumbGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "thumbExtraGap", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "shouldCenter", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !0
      }), Object.defineProperty(this, "state", {enumerable: !0, configurable: !0, writable: !0, value: Bt.Init})
    }

    formatThumb(t, e) {
      return this.instance.localize(e, [["%i", t.index], ["%d", t.index + 1], ["%s", t.thumbSrc || "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"]])
    }

    getSlides() {
      const t = [], e = this.option("thumbTpl") || "";
      if (e) for (const i of this.instance.slides || []) {
        let s = "";
        i.type && (s = "for-" + i.type, i.type && ["video", "youtube", "vimeo", "html5video"].includes(i.type) && (s += " for-video")), t.push({
          html: this.formatThumb(i, e),
          customClass: s
        })
      }
      return t
    }

    onInitSlide(t, e) {
      const i = e.el;
      i && (e.thumbSrc = i.dataset.thumbSrc || e.thumbSrc || "", e.thumbClipWidth = parseFloat(i.dataset.thumbClipWidth || "") || e.thumbClipWidth || 0, e.thumbHeight = parseFloat(i.dataset.thumbHeight || "") || e.thumbHeight || 0)
    }

    onInitSlides() {
      this.state === Bt.Init && this.build()
    }

    onRefreshM() {
      this.refreshModern()
    }

    onChangeM() {
      "modern" === this.type && (this.shouldCenter = !0, this.centerModern())
    }

    onClickModern(t) {
      t.preventDefault(), t.stopPropagation();
      const e = this.instance, i = e.page, s = t => {
        if (t) {
          const e = t.closest("[data-carousel-index]");
          if (e) return parseInt(e.dataset.carouselIndex || "", 10) || 0
        }
        return -1
      }, n = (t, e) => {
        const i = document.elementFromPoint(t, e);
        return i ? s(i) : -1
      };
      let o = s(t.target);
      o < 0 && (o = n(t.clientX + this.thumbGap, t.clientY), o === i && (o = i - 1)), o < 0 && (o = n(t.clientX - this.thumbGap, t.clientY), o === i && (o = i + 1)), o < 0 && (o = (e => {
        let s = n(t.clientX - e, t.clientY), a = n(t.clientX + e, t.clientY);
        return o < 0 && s === i && (o = i + 1), o < 0 && a === i && (o = i - 1), o
      })(this.thumbExtraGap)), o === i ? this.centerModern() : o > -1 && o < e.pages.length && e.slideTo(o)
    }

    onTransformM() {
      if ("modern" !== this.type) return;
      const {instance: t, container: e, track: i} = this, s = t.panzoom;
      if (!(e && i && s && this.panzoom)) return;
      ft(e, this.cn("isResting"), s.state !== St.Init && s.isResting);
      const n = this.thumbGap, o = this.thumbExtraGap, a = this.thumbClipWidth;
      let r = 0, l = 0, h = 0;
      for (const e of t.slides) {
        let i = e.index, s = e.thumbSlideEl;
        if (!s) continue;
        ft(s, this.cn("isSelected"), i === t.page), l = 1 - Math.abs(t.getProgress(i)), s.style.setProperty("--progress", l ? l + "" : "");
        const c = .5 * ((e.thumbWidth || 0) - a);
        r += n, r += c, l && (r -= l * (c + o)), s.style.setProperty("--shift", r - n + ""), r += c, l && (r -= l * (c + o)), r -= n, 0 === i && (h = o * l)
      }
      i && (i.style.setProperty("--left", h + ""), i.style.setProperty("--width", r + h + n + o * l + "")), this.shouldCenter && this.centerModern()
    }

    buildClassic() {
      const {container: t, track: e} = this, i = this.getSlides();
      if (!t || !e || !i) return;
      const s = new this.instance.constructor(t, V({
        track: e,
        infinite: !1,
        center: !0,
        fill: !0,
        dragFree: !0,
        slidesPerPage: 1,
        transition: !1,
        Dots: !1,
        Navigation: !1,
        Sync: {},
        classes: {
          container: "f-thumbs",
          viewport: "f-thumbs__viewport",
          track: "f-thumbs__track",
          slide: "f-thumbs__slide"
        }
      }, this.option("Carousel") || {}, {Sync: {target: this.instance}, slides: i}));
      this.carousel = s, this.track = e, s.on("ready", () => {
        this.emit("ready")
      })
    }

    buildModern() {
      if ("modern" !== this.type) return;
      const {container: t, track: e, instance: i} = this, s = this.option("thumbTpl") || "";
      if (!t || !e || !s) return;
      Mt(t, "is-horizontal"), this.updateModern();
      for (const t of i.slides || []) {
        const i = document.createElement("div");
        if (Mt(i, this.cn("slide")), t.type) {
          let e = "for-" + t.type;
          ["video", "youtube", "vimeo", "html5video"].includes(t.type) && (e += " for-video"), Mt(i, e)
        }
        i.appendChild($(this.formatThumb(t, s))), t.thumbSlideEl = i, e.appendChild(i), this.resizeModernSlide(t)
      }
      const n = new i.constructor.Panzoom(t, {
        content: e, lockAxis: "x", zoom: !1, panOnlyZoomed: !1, bounds: () => {
          let t = 0, e = 0, s = i.slides[0], n = i.slides[i.slides.length - 1], o = i.slides[i.page];
          return s && n && o && (e = -1 * this.getModernThumbPos(0), 0 !== i.page && (e += .5 * (s.thumbWidth || 0)), t = -1 * this.getModernThumbPos(i.slides.length - 1), i.page !== i.slides.length - 1 && (t += (n.thumbWidth || 0) - (o.thumbWidth || 0) - .5 * (n.thumbWidth || 0))), {
            x: {
              min: t,
              max: e
            }, y: {min: 0, max: 0}
          }
        }
      });
      n.on("touchStart", (t, e) => {
        this.shouldCenter = !1
      }), n.on("click", (t, e) => this.onClickModern(e)), n.on("ready", () => {
        this.centerModern(), this.emit("ready")
      }), n.on(["afterTransform", "refresh"], t => {
        this.lazyLoadModern()
      }), this.panzoom = n, this.refreshModern()
    }

    updateModern() {
      if ("modern" !== this.type) return;
      const {container: t} = this;
      t && (this.thumbGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-gap")) || 0, this.thumbExtraGap = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-extra-gap")) || 0, this.thumbWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-width")) || 40, this.thumbClipWidth = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-clip-width")) || 40, this.thumbHeight = parseFloat(getComputedStyle(t).getPropertyValue("--f-thumb-height")) || 40)
    }

    refreshModern() {
      var t;
      if ("modern" === this.type) {
        this.updateModern();
        for (const t of this.instance.slides || []) this.resizeModernSlide(t);
        this.onTransformM(), null === (t = this.panzoom) || void 0 === t || t.updateMetrics(!0), this.centerModern(0)
      }
    }

    centerModern(t) {
      const e = this.instance, {container: i, panzoom: s} = this;
      if (!i || !s || s.state === St.Init) return;
      const n = e.page;
      let o = this.getModernThumbPos(n), a = o;
      for (let t = e.page - 3; t < e.page + 3; t++) {
        if (t < 0 || t > e.pages.length - 1 || t === e.page) continue;
        const i = 1 - Math.abs(e.getProgress(t));
        i > 0 && i < 1 && (a += i * (this.getModernThumbPos(t) - o))
      }
      let r = 100;
      void 0 === t && (t = .2, e.inTransition.size > 0 && (t = .12), Math.abs(-1 * s.current.e - a) > s.containerRect.width && (t = .5, r = 0)), s.options.maxVelocity = r, s.applyChange({
        panX: pt(-1 * a - s.target.e, 1e3),
        friction: null === e.prevPage ? 0 : t
      })
    }

    lazyLoadModern() {
      const {instance: t, panzoom: e} = this;
      if (!e) return;
      const i = -1 * e.current.e || 0;
      let s = this.getModernThumbPos(t.page);
      if (e.state !== St.Init || 0 === s) for (const s of t.slides || []) {
        const t = s.thumbSlideEl;
        if (!t) continue;
        const n = t.querySelector("img[data-lazy-src]"), o = s.index, a = this.getModernThumbPos(o),
          r = i - .5 * e.containerRect.innerWidth, l = r + e.containerRect.innerWidth;
        if (!n || a < r || a > l) continue;
        let h = n.dataset.lazySrc;
        if (!h || !h.length) continue;
        if (delete n.dataset.lazySrc, n.src = h, n.complete) continue;
        Mt(t, this.cn("isLoading"));
        const c = $(et);
        t.appendChild(c), n.addEventListener("load", () => {
          t.offsetParent && (t.classList.remove(this.cn("isLoading")), c.remove())
        }, !1)
      }
    }

    resizeModernSlide(t) {
      if ("modern" !== this.type) return;
      if (!t.thumbSlideEl) return;
      const e = t.thumbClipWidth && t.thumbHeight ? Math.round(this.thumbHeight * (t.thumbClipWidth / t.thumbHeight)) : this.thumbWidth;
      t.thumbWidth = e
    }

    getModernThumbPos(t) {
      const e = this.instance.slides[t], i = this.panzoom;
      if (!i || !i.contentRect.fitWidth) return 0;
      let s = i.containerRect.innerWidth, n = i.contentRect.width;
      2 === this.instance.slides.length && (t -= 1, n = 2 * this.thumbClipWidth);
      let o = t * (this.thumbClipWidth + this.thumbGap) + this.thumbExtraGap + .5 * (e.thumbWidth || 0);
      return o -= n > s ? .5 * s : .5 * n, pt(o || 0, 1)
    }

    build() {
      const t = this.instance, e = t.container, i = this.option("minCount") || 0;
      if (i) {
        let e = 0;
        for (const i of t.slides || []) i.thumbSrc && e++;
        if (e < i) return this.cleanup(), void (this.state = Bt.Disabled)
      }
      const s = this.option("type");
      if (["modern", "classic"].indexOf(s) < 0) return void (this.state = Bt.Disabled);
      this.type = s;
      const n = document.createElement("div");
      Mt(n, this.cn("container")), Mt(n, "is-" + s);
      const o = this.option("parentEl");
      o ? o.appendChild(n) : e.after(n), this.container = n, Mt(e, this.cn("hasThumbs"));
      const a = document.createElement("div");
      Mt(a, this.cn("track")), n.appendChild(a), this.track = a, "classic" === s ? this.buildClassic() : this.buildModern(), this.state = Bt.Ready, n.addEventListener("click", e => {
        setTimeout(() => {
          var e;
          null === (e = null == n ? void 0 : n.querySelector(`[data-carousel-index="${t.page}"]`)) || void 0 === e || e.focus()
        }, 100)
      })
    }

    cleanup() {
      this.carousel && this.carousel.destroy(), this.carousel = null, this.panzoom && this.panzoom.destroy(), this.panzoom = null, this.container && this.container.remove(), this.container = null, this.track = null, this.state = Bt.Init, Tt(this.instance.container, this.cn("hasThumbs"))
    }

    attach() {
      this.instance.on("initSlide", this.onInitSlide), this.instance.on("initSlides", this.onInitSlides), this.instance.on("Panzoom.afterTransform", this.onTransformM), this.instance.on("Panzoom.refresh", this.onRefreshM), this.instance.on("change", this.onChangeM)
    }

    detach() {
      this.instance.off("initSlide", this.onInitSlide), this.instance.off("initSlides", this.onInitSlides), this.instance.off("Panzoom.afterTransform", this.onTransformM), this.instance.off("Panzoom.refresh", this.onRefreshM), this.instance.off("change", this.onChangeM), this.cleanup()
    }
  };
  Object.defineProperty(Nt, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: Ht});
  const Wt = Object.assign(Object.assign({}, Ht), {key: "t", showOnStart: !0, parentEl: null});

  class _t extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "ref", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "hidden", {enumerable: !0, configurable: !0, writable: !0, value: !1})
    }

    get isEnabled() {
      const t = this.ref;
      return t && t.state !== Bt.Disabled
    }

    get isHidden() {
      return this.hidden
    }

    onInit() {
      const t = this.instance, e = t.carousel;
      if (!e) return;
      const i = this.option("parentEl") || t.footer || t.container;
      i && (e.options.Thumbs = V({}, this.options, {
        parentEl: i,
        classes: {container: "f-thumbs fancybox__thumbs"},
        Carousel: {
          Sync: {friction: t.option("Carousel.friction")}, on: {
            click: (t, e) => {
              e.stopPropagation()
            }
          }
        },
        on: {
          ready: t => {
            const e = t.container;
            e && this.hidden && (this.refresh(), e.style.transition = "none", this.hide(), e.offsetHeight, queueMicrotask(() => {
              e.style.transition = "", this.show()
            }))
          }
        }
      }), e.attachPlugins({Thumbs: Nt}), this.ref = e.plugins.Thumbs, this.option("showOnStart") || (this.ref.state = Bt.Hidden, this.hidden = !0))
    }

    onResize() {
      var t;
      const e = null === (t = this.ref) || void 0 === t ? void 0 : t.container;
      e && (e.style.maxHeight = "")
    }

    onKeydown(t, e) {
      const i = this.option("key");
      i && i === e && this.toggle()
    }

    toggle() {
      const t = this.ref;
      t && t.state !== Bt.Disabled && (t.state !== Bt.Hidden ? this.hidden ? this.show() : this.hide() : t.build())
    }

    show() {
      const t = this.ref, e = t && t.state !== Bt.Disabled && t.container;
      e && (this.refresh(), e.offsetHeight, e.removeAttribute("aria-hidden"), e.classList.remove("is-hidden"), this.hidden = !1)
    }

    hide() {
      const t = this.ref, e = t && t.container;
      e && (this.refresh(), e.offsetHeight, e.classList.add("is-hidden"), e.setAttribute("aria-hidden", "true")), this.hidden = !0
    }

    refresh() {
      const t = this.ref;
      if (!t || t.state === Bt.Disabled) return;
      const e = t.container, i = (null == e ? void 0 : e.firstChild) || null;
      e && i && i.childNodes.length && (e.style.maxHeight = i.getBoundingClientRect().height + "px")
    }

    attach() {
      this.instance.on("Carousel.init", this.onInit), this.instance.on("resize", this.onResize), this.instance.on("keydown", this.onKeydown)
    }

    detach() {
      this.instance.off("Carousel.init", this.onInit), this.instance.off("resize", this.onResize), this.instance.off("keydown", this.onKeydown)
    }
  }

  Object.defineProperty(_t, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: Wt});
  const Xt = {
    panLeft: {icon: '<svg><path d="M5 12h14M5 12l6 6M5 12l6-6"/></svg>', change: {panX: -100}},
    panRight: {icon: '<svg><path d="M5 12h14M13 18l6-6M13 6l6 6"/></svg>', change: {panX: 100}},
    panUp: {icon: '<svg><path d="M12 5v14M18 11l-6-6M6 11l6-6"/></svg>', change: {panY: -100}},
    panDown: {icon: '<svg><path d="M12 5v14M18 13l-6 6M6 13l6 6"/></svg>', change: {panY: 100}},
    zoomIn: {
      icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M11 8v6M8 11h6"/></svg>',
      action: "zoomIn"
    },
    zoomOut: {
      icon: '<svg><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "zoomOut"
    },
    toggle1to1: {
      icon: '<svg><path d="M3.51 3.07c5.74.02 11.48-.02 17.22.02 1.37.1 2.34 1.64 2.18 3.13 0 4.08.02 8.16 0 12.23-.1 1.54-1.47 2.64-2.79 2.46-5.61-.01-11.24.02-16.86-.01-1.36-.12-2.33-1.65-2.17-3.14 0-4.07-.02-8.16 0-12.23.1-1.36 1.22-2.48 2.42-2.46Z"/><path d="M5.65 8.54h1.49v6.92m8.94-6.92h1.49v6.92M11.5 9.4v.02m0 5.18v0"/></svg>',
      action: "toggleZoom"
    },
    toggleZoom: {
      icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "toggleZoom"
    },
    iterateZoom: {
      icon: '<svg><g><line x1="11" y1="8" x2="11" y2="14"></line></g><circle cx="11" cy="11" r="7.5"/><path d="m21 21-4.35-4.35M8 11h6"/></svg>',
      action: "iterateZoom"
    },
    rotateCCW: {
      icon: '<svg><path d="M15 4.55a8 8 0 0 0-6 14.9M9 15v5H4M18.37 7.16v.01M13 19.94v.01M16.84 18.37v.01M19.37 15.1v.01M19.94 11v.01"/></svg>',
      action: "rotateCCW"
    },
    rotateCW: {
      icon: '<svg><path d="M9 4.55a8 8 0 0 1 6 14.9M15 15v5h5M5.63 7.16v.01M4.06 11v.01M4.63 15.1v.01M7.16 18.37v.01M11 19.94v.01"/></svg>',
      action: "rotateCW"
    },
    flipX: {
      icon: '<svg style="stroke-width: 1.3"><path d="M12 3v18M16 7v10h5L16 7M8 7v10H3L8 7"/></svg>',
      action: "flipX"
    },
    flipY: {
      icon: '<svg style="stroke-width: 1.3"><path d="M3 12h18M7 16h10L7 21v-5M7 8h10L7 3v5"/></svg>',
      action: "flipY"
    },
    fitX: {
      icon: '<svg><path d="M4 12V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v6M10 18H3M21 18h-7M6 15l-3 3 3 3M18 15l3 3-3 3"/></svg>',
      action: "fitX"
    },
    fitY: {
      icon: '<svg><path d="M12 20H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6M18 14v7M18 3v7M15 18l3 3 3-3M15 6l3-3 3 3"/></svg>',
      action: "fitY"
    },
    reset: {
      icon: '<svg><path d="M20 11A8.1 8.1 0 0 0 4.5 9M4 5v4h4M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/></svg>',
      action: "reset"
    },
    toggleFS: {
      icon: '<svg><g><path d="M14.5 9.5 21 3m0 0h-6m6 0v6M3 21l6.5-6.5M3 21v-6m0 6h6"/></g><g><path d="m14 10 7-7m-7 7h6m-6 0V4M3 21l7-7m0 0v6m0-6H4"/></g></svg>',
      action: "toggleFS"
    }
  };
  var Yt;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Disabled = 2] = "Disabled"
  }(Yt || (Yt = {}));
  const qt = {tabindex: "-1", width: "24", height: "24", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg"};

  class Zt extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Yt.Init
      }), Object.defineProperty(this, "container", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onReady(t) {
      var e;
      if (!t.carousel) return;
      let i = this.option("display"), s = this.option("absolute"), n = this.option("enabled");
      if ("auto" === n) {
        const t = this.instance.carousel;
        let e = 0;
        if (t) for (const i of t.slides) (i.panzoom || "image" === i.type) && e++;
        e || (n = !1)
      }
      n || (i = void 0);
      let o = 0;
      const a = {left: [], middle: [], right: []};
      if (i) for (const t of ["left", "middle", "right"]) for (const s of i[t]) {
        const i = this.createEl(s);
        i && (null === (e = a[t]) || void 0 === e || e.push(i), o++)
      }
      let r = null;
      if (o && (r = this.createContainer()), r) {
        for (const [t, e] of Object.entries(a)) {
          const i = document.createElement("div");
          Mt(i, "fancybox__toolbar__column is-" + t);
          for (const t of e) i.appendChild(t);
          "auto" !== s || "middle" !== t || e.length || (s = !0), r.appendChild(i)
        }
        !0 === s && Mt(r, "is-absolute"), this.state = Yt.Ready, this.onRefresh()
      } else this.state = Yt.Disabled
    }

    onClick(t) {
      var e, i;
      const s = this.instance, n = s.getSlide(), o = null == n ? void 0 : n.panzoom, a = t.target,
        r = a && G(a) ? a.dataset : null;
      if (!r) return;
      if (void 0 !== r.fancyboxToggleThumbs) return t.preventDefault(), t.stopPropagation(), void (null === (e = s.plugins.Thumbs) || void 0 === e || e.toggle());
      if (void 0 !== r.fancyboxToggleFullscreen) return t.preventDefault(), t.stopPropagation(), void this.instance.toggleFullscreen();
      if (void 0 !== r.fancyboxToggleSlideshow) {
        t.preventDefault(), t.stopPropagation();
        const e = null === (i = s.carousel) || void 0 === i ? void 0 : i.plugins.Autoplay;
        let n = e.isActive;
        return o && "mousemove" === o.panMode && !n && o.reset(), void (n ? e.stop() : e.start())
      }
      const l = r.panzoomAction, h = r.panzoomChange;
      if ((h || l) && (t.preventDefault(), t.stopPropagation()), h) {
        let e = {};
        try {
          e = JSON.parse(h)
        } catch (t) {
        }
        o && o.applyChange(e)
      } else l && o && o[l] && o[l]()
    }

    onChange() {
      this.onRefresh()
    }

    onRefresh() {
      if (this.instance.isClosing()) return;
      const t = this.container;
      if (!t) return;
      const e = this.instance.getSlide();
      if (!e || e.state !== ot.Ready) return;
      const i = e && !e.error && e.panzoom;
      for (const e of t.querySelectorAll("[data-panzoom-action]")) i ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      let s = i && i.canZoomIn(), n = i && i.canZoomOut();
      for (const e of t.querySelectorAll('[data-panzoom-action="zoomIn"]')) s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      for (const e of t.querySelectorAll('[data-panzoom-action="zoomOut"]')) n ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
      for (const e of t.querySelectorAll('[data-panzoom-action="toggleZoom"],[data-panzoom-action="iterateZoom"]')) {
        n || s ? (e.removeAttribute("disabled"), e.removeAttribute("tabindex")) : (e.setAttribute("disabled", ""), e.setAttribute("tabindex", "-1"));
        const t = e.querySelector("g");
        t && (t.style.display = s ? "" : "none")
      }
    }

    onDone(t, e) {
      var i;
      null === (i = e.panzoom) || void 0 === i || i.on("afterTransform", () => {
        this.instance.isCurrentSlide(e) && this.onRefresh()
      }), this.instance.isCurrentSlide(e) && this.onRefresh()
    }

    createContainer() {
      const t = this.instance.container;
      if (!t) return null;
      const e = this.option("parentEl") || t, i = document.createElement("div");
      return Mt(i, "fancybox__toolbar"), e.prepend(i), i.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !0
      }), t && Mt(t, "has-toolbar"), this.container = i, i
    }

    createEl(t) {
      var e;
      const i = this.instance.carousel;
      if (!i) return null;
      if ("toggleFS" === t) return null;
      if ("fullscreen" === t && !this.instance.fsAPI) return null;
      let s = null;
      const n = i.slides.length || 0;
      let o = 0, a = 0;
      for (const t of i.slides) (t.panzoom || "image" === t.type) && o++, ("image" === t.type || t.downloadSrc) && a++;
      if (n < 2 && ["infobar", "prev", "next"].includes(t)) return s;
      if (void 0 !== Xt[t] && !o) return null;
      if ("download" === t && !a) return null;
      if ("thumbs" === t) {
        const t = this.instance.plugins.Thumbs;
        if (!t || !t.isEnabled) return null
      }
      if ("slideshow" === t && (!(null === (e = this.instance.carousel) || void 0 === e ? void 0 : e.plugins.Autoplay) || n < 2)) return null;
      if (void 0 !== Xt[t]) {
        const e = Xt[t];
        s = document.createElement("button"), s.setAttribute("title", this.instance.localize(`{{${t.toUpperCase()}}}`)), Mt(s, "f-button"), e.action && (s.dataset.panzoomAction = e.action), e.change && (s.dataset.panzoomChange = JSON.stringify(e.change)), s.appendChild($(this.instance.localize(e.icon)))
      } else {
        const e = (this.option("items") || [])[t];
        e && (s = $(this.instance.localize(e.tpl)), "function" == typeof e.click && s.addEventListener("click", t => {
          t.preventDefault(), t.stopPropagation(), "function" == typeof e.click && e.click.call(this, this, t)
        }))
      }
      const r = null == s ? void 0 : s.querySelector("svg");
      if (r) for (const [t, e] of Object.entries(qt)) r.getAttribute(t) || r.setAttribute(t, String(e));
      return s
    }

    removeContainer() {
      var t;
      const e = this.container;
      e && e.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !0
      }), null === (t = this.container) || void 0 === t || t.remove(), this.container = null, this.state = Yt.Disabled;
      const i = this.instance.container;
      i && Tt(i, "has-toolbar")
    }

    attach() {
      this.instance.on("Carousel.initSlides", this.onReady), this.instance.on("done", this.onDone), this.instance.on("reveal", this.onChange), this.instance.on("Carousel.change", this.onChange), this.onReady(this.instance)
    }

    detach() {
      this.instance.off("Carousel.initSlides", this.onReady), this.instance.off("done", this.onDone), this.instance.off("reveal", this.onChange), this.instance.off("Carousel.change", this.onChange), this.removeContainer()
    }
  }

  Object.defineProperty(Zt, "defaults", {
    enumerable: !0, configurable: !0, writable: !0, value: {
      absolute: "auto",
      display: {left: ["infobar"], middle: [], right: ["iterateZoom", "slideshow", "fullscreen", "thumbs", "close"]},
      enabled: "auto",
      items: {
        infobar: {tpl: '<div class="fancybox__infobar" tabindex="-1"><span data-fancybox-current-index></span>/<span data-fancybox-count></span></div>'},
        download: {tpl: '<a class="f-button" title="{{DOWNLOAD}}" data-fancybox-download href="javasript:;"><svg><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 11l5 5 5-5M12 4v12"/></svg></a>'},
        prev: {tpl: '<button class="f-button" title="{{PREV}}" data-fancybox-prev><svg><path d="m15 6-6 6 6 6"/></svg></button>'},
        next: {tpl: '<button class="f-button" title="{{NEXT}}" data-fancybox-next><svg><path d="m9 6 6 6-6 6"/></svg></button>'},
        slideshow: {tpl: '<button class="f-button" title="{{TOGGLE_SLIDESHOW}}" data-fancybox-toggle-slideshow><svg><g><path d="M8 4v16l13 -8z"></path></g><g><path d="M8 4v15M17 4v15"/></g></svg></button>'},
        fullscreen: {tpl: '<button class="f-button" title="{{TOGGLE_FULLSCREEN}}" data-fancybox-toggle-fullscreen><svg><g><path d="M4 8V6a2 2 0 0 1 2-2h2M4 16v2a2 2 0 0 0 2 2h2M16 4h2a2 2 0 0 1 2 2v2M16 20h2a2 2 0 0 0 2-2v-2"/></g><g><path d="M15 19v-2a2 2 0 0 1 2-2h2M15 5v2a2 2 0 0 0 2 2h2M5 15h2a2 2 0 0 1 2 2v2M5 9h2a2 2 0 0 0 2-2V5"/></g></svg></button>'},
        thumbs: {tpl: '<button class="f-button" title="{{TOGGLE_THUMBS}}" data-fancybox-toggle-thumbs><svg><circle cx="5.5" cy="5.5" r="1"/><circle cx="12" cy="5.5" r="1"/><circle cx="18.5" cy="5.5" r="1"/><circle cx="5.5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="18.5" cy="12" r="1"/><circle cx="5.5" cy="18.5" r="1"/><circle cx="12" cy="18.5" r="1"/><circle cx="18.5" cy="18.5" r="1"/></svg></button>'},
        close: {tpl: '<button class="f-button" title="{{CLOSE}}" data-fancybox-close><svg><path d="m19.5 4.5-15 15M4.5 4.5l15 15"/></svg></button>'}
      },
      parentEl: null
    }
  });
  const Vt = {Hash: dt, Html: It, Images: Rt, Slideshow: Ft, Thumbs: _t, Toolbar: Zt}, $t = function (t, e) {
    let i = !0;
    return (...s) => {
      i && (i = !1, t(...s), setTimeout(() => {
        i = !0
      }, e))
    }
  }, Gt = (t, e) => {
    let i = [];
    return t.childNodes.forEach(t => {
      t.nodeType !== Node.ELEMENT_NODE || e && !t.matches(e) || i.push(t)
    }), i
  };
  var Ut;
  !function (t) {
    t[t.Init = 0] = "Init", t[t.Ready = 1] = "Ready", t[t.Destroy = 2] = "Destroy"
  }(Ut || (Ut = {}));
  const Kt = t => {
    if ("string" == typeof t && (t = {html: t}), !(t instanceof String || t instanceof HTMLElement)) {
      const e = t.thumb;
      void 0 !== e && ("string" == typeof e && (t.thumbSrc = e), e instanceof HTMLImageElement && (t.thumbEl = e, t.thumbElSrc = e.src, t.thumbSrc = e.src), delete t.thumb)
    }
    return Object.assign({
      html: "",
      el: null,
      isDom: !1,
      class: "",
      index: -1,
      dim: 0,
      gap: 0,
      pos: 0,
      transition: !1
    }, t)
  }, Jt = (t = {}) => Object.assign({index: -1, slides: [], dim: 0, pos: -1}, t);

  class Qt extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "isDynamic", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "list", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onRefresh() {
      this.refresh()
    }

    build() {
      let t = this.list;
      return t || (t = document.createElement("ul"), Mt(t, this.cn("list")), t.setAttribute("role", "tablist"), this.instance.container.appendChild(t), Mt(this.instance.container, this.cn("hasDots")), this.list = t), t
    }

    refresh() {
      var t;
      const e = this.instance.pages.length, i = Math.min(2, this.option("minCount")),
        s = Math.max(2e3, this.option("maxCount")), n = this.option("dynamicFrom");
      if (e < i || e > s) return void this.cleanup();
      const o = "number" == typeof n && e > 5 && e >= n,
        a = !this.list || this.isDynamic !== o || this.list.children.length !== e;
      a && this.cleanup();
      const r = this.build();
      if (ft(r, this.cn("isDynamic"), !!o), a) for (let t = 0; t < e; t++) r.append(this.createItem(t));
      let l, h = 0;
      for (const e of [...r.children]) {
        const i = h === this.instance.page;
        i && (l = e), ft(e, this.cn("isCurrent"), i), null === (t = e.children[0]) || void 0 === t || t.setAttribute("aria-selected", i ? "true" : "false");
        for (const t of ["isBeforePrev", "isPrev", "isNext", "isAfterNext"]) Tt(e, this.cn(t));
        h++
      }
      if (l = l || r.firstChild, o && l) {
        const t = l.previousElementSibling, e = t && t.previousElementSibling;
        Mt(t, this.cn("isPrev")), Mt(e, this.cn("isBeforePrev"));
        const i = l.nextElementSibling, s = i && i.nextElementSibling;
        Mt(i, this.cn("isNext")), Mt(s, this.cn("isAfterNext"))
      }
      this.isDynamic = o
    }

    createItem(t = 0) {
      var e;
      const i = document.createElement("li");
      i.setAttribute("role", "presentation");
      const s = $(this.instance.localize(this.option("dotTpl"), [["%d", t + 1]]).replace(/\%i/g, t + ""));
      return i.appendChild(s), null === (e = i.children[0]) || void 0 === e || e.setAttribute("role", "tab"), i
    }

    cleanup() {
      this.list && (this.list.remove(), this.list = null), this.isDynamic = !1, Tt(this.instance.container, this.cn("hasDots"))
    }

    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh)
    }

    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
    }
  }

  Object.defineProperty(Qt, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      classes: {
        list: "f-carousel__dots",
        isDynamic: "is-dynamic",
        hasDots: "has-dots",
        dot: "f-carousel__dot",
        isBeforePrev: "is-before-prev",
        isPrev: "is-prev",
        isCurrent: "is-current",
        isNext: "is-next",
        isAfterNext: "is-after-next"
      },
      dotTpl: '<button type="button" data-carousel-page="%i" aria-label="{{GOTO}}"><span class="f-carousel__dot" aria-hidden="true"></span></button>',
      dynamicFrom: 11,
      maxCount: 1 / 0,
      minCount: 2
    }
  });

  class te extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "prev", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "next", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    onRefresh() {
      const t = this.instance, e = t.pages.length, i = t.page;
      if (e < 2) return void this.cleanup();
      this.build();
      let s = this.prev, n = this.next;
      s && n && (s.removeAttribute("disabled"), n.removeAttribute("disabled"), t.isInfinite || (i <= 0 && s.setAttribute("disabled", ""), i >= e - 1 && n.setAttribute("disabled", "")))
    }

    createButton(t) {
      const e = this.instance, i = document.createElement("button");
      i.setAttribute("tabindex", "0"), i.setAttribute("title", e.localize(`{{${t.toUpperCase()}}}`)), Mt(i, this.cn("button") + " " + this.cn("next" === t ? "isNext" : "isPrev"));
      const s = e.isRTL ? "next" === t ? "prev" : "next" : t;
      var n;
      return i.innerHTML = e.localize(this.option(s + "Tpl")), i.dataset["carousel" + (n = t, n ? n.match("^[a-z]") ? n.charAt(0).toUpperCase() + n.substring(1) : n : "")] = "true", i
    }

    build() {
      let t = this.container;
      t || (this.container = t = document.createElement("div"), Mt(t, this.cn("container")), this.instance.container.appendChild(t)), this.next || (this.next = t.appendChild(this.createButton("next"))), this.prev || (this.prev = t.appendChild(this.createButton("prev")))
    }

    cleanup() {
      this.prev && this.prev.remove(), this.next && this.next.remove(), this.container && this.container.remove(), this.prev = null, this.next = null, this.container = null
    }

    attach() {
      this.instance.on(["refresh", "change"], this.onRefresh)
    }

    detach() {
      this.instance.off(["refresh", "change"], this.onRefresh), this.cleanup()
    }
  }

  Object.defineProperty(te, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      classes: {container: "f-carousel__nav", button: "f-button", isNext: "is-next", isPrev: "is-prev"},
      nextTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M9 3l9 9-9 9"/></svg>',
      prevTpl: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" tabindex="-1"><path d="M15 3l-9 9 9 9"/></svg>'
    }
  });

  class ee extends ht {
    constructor() {
      super(...arguments), Object.defineProperty(this, "selectedIndex", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "target", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "nav", {enumerable: !0, configurable: !0, writable: !0, value: null})
    }

    addAsTargetFor(t) {
      this.target = this.instance, this.nav = t, this.attachEvents()
    }

    addAsNavFor(t) {
      this.nav = this.instance, this.target = t, this.attachEvents()
    }

    attachEvents() {
      this.nav && this.target && (this.nav.options.initialSlide = this.target.options.initialPage, this.nav.on("ready", this.onNavReady), this.nav.state === Ut.Ready && this.onNavReady(this.nav), this.target.on("ready", this.onTargetReady), this.target.state === Ut.Ready && this.onTargetReady(this.target))
    }

    onNavReady(t) {
      t.on("createSlide", this.onNavCreateSlide), t.on("Panzoom.click", this.onNavClick), t.on("Panzoom.touchEnd", this.onNavTouch), this.onTargetChange()
    }

    onTargetReady(t) {
      t.on("change", this.onTargetChange), t.on("Panzoom.refresh", this.onTargetChange), this.onTargetChange()
    }

    onNavClick(t, e, i) {
      i.pointerType || this.onNavTouch(t, t.panzoom, i)
    }

    onNavTouch(t, e, i) {
      var s, n;
      if (Math.abs(e.dragOffset.x) > 3 || Math.abs(e.dragOffset.y) > 3) return;
      const o = i.target, {nav: a, target: r} = this;
      if (!a || !r || !o) return;
      const l = o.closest("[data-index]");
      if (i.stopPropagation(), i.preventDefault(), !l) return;
      const h = parseInt(l.dataset.index || "", 10) || 0, c = r.getPageForSlide(h), d = a.getPageForSlide(h);
      a.slideTo(d), r.slideTo(c, {friction: null === (n = null === (s = this.nav) || void 0 === s ? void 0 : s.plugins) || void 0 === n ? void 0 : n.Sync.option("friction")}), this.markSelectedSlide(h)
    }

    onNavCreateSlide(t, e) {
      e.index === this.selectedIndex && this.markSelectedSlide(e.index)
    }

    onTargetChange() {
      const {target: t, nav: e} = this;
      if (!t || !e) return;
      if (e.state !== Ut.Ready || t.state !== Ut.Ready) return;
      const i = t.pages[t.page].slides[0].index, s = e.getPageForSlide(i);
      this.markSelectedSlide(i), e.slideTo(s)
    }

    markSelectedSlide(t) {
      const {nav: e} = this;
      e && e.state === Ut.Ready && (this.selectedIndex = t, [...e.slides].map(e => {
        e.el && e.el.classList[e.index === t ? "add" : "remove"]("is-nav-selected")
      }))
    }

    attach() {
      let t = this.options.target, e = this.options.nav;
      t ? this.addAsNavFor(t) : e && this.addAsTargetFor(e)
    }

    detach() {
      this.nav && (this.nav.off("ready", this.onNavReady), this.nav.off("createSlide", this.onNavCreateSlide), this.nav.off("Panzoom.click", this.onNavClick), this.nav.off("Panzoom.touchEnd", this.onNavTouch)), this.nav = null, this.target && (this.target.off("ready", this.onTargetReady), this.target.off("refresh", this.onTargetChange), this.target.off("change", this.onTargetChange)), this.target = null
    }
  }

  Object.defineProperty(ee, "defaults", {enumerable: !0, configurable: !0, writable: !0, value: {friction: .35}});
  const ie = {Navigation: te, Dots: Qt, Sync: ee};

  class se extends lt {
    get axis() {
      return this.isHorizontal ? "e" : "f"
    }

    get isEnabled() {
      return this.state === Ut.Ready
    }

    get isInfinite() {
      let t = !1;
      const e = this.contentDim, i = this.viewportDim;
      return this.pages.length >= 2 && e > 1.5 * i && (t = this.option("infinite")), t
    }

    get isRTL() {
      return "rtl" === this.option("direction")
    }

    get isHorizontal() {
      return "x" === this.option("axis")
    }

    constructor(t, e = {}, i = {}) {
      if (super(), Object.defineProperty(this, "userOptions", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
      }), Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
      }), Object.defineProperty(this, "bp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: ""
      }), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: Ut.Init
      }), Object.defineProperty(this, "page", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "prevPage", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "viewport", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "track", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "slides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "pages", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "panzoom", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "inTransition", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: new Set
      }), Object.defineProperty(this, "contentDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "viewportDim", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), "string" == typeof t && (t = document.querySelector(t)), !t || !G(t)) throw new Error("No Element found");
      this.container = t, this.slideNext = $t(this.slideNext.bind(this), 150), this.slidePrev = $t(this.slidePrev.bind(this), 150), this.userOptions = e, this.userPlugins = i, queueMicrotask(() => {
        this.processOptions()
      })
    }

    processOptions() {
      const t = V({}, se.defaults, this.userOptions);
      let e = "";
      const i = t.breakpoints;
      if (i && Z(i)) for (const [s, n] of Object.entries(i)) window.matchMedia(s).matches && Z(n) && (e += s, V(t, n));
      e === this.bp && this.state !== Ut.Init || (this.bp = e, this.state === Ut.Ready && (t.initialSlide = this.pages[this.page].slides[0].index), this.state !== Ut.Init && this.destroy(), super.setOptions(t), !1 === this.option("enabled") ? this.attachEvents() : setTimeout(() => {
        this.init()
      }, 0))
    }

    init() {
      this.state = Ut.Init, this.emit("init"), this.attachPlugins(Object.assign(Object.assign({}, se.Plugins), this.userPlugins)), this.initLayout(), this.initSlides(), this.updateMetrics(), this.setInitialPosition(), this.initPanzoom(), this.attachEvents(), this.state = Ut.Ready, this.emit("ready")
    }

    initLayout() {
      const {container: t} = this, e = this.option("classes");
      Mt(t, this.cn("container")), ft(t, e.isLTR, !this.isRTL), ft(t, e.isRTL, this.isRTL), ft(t, e.isVertical, !this.isHorizontal), ft(t, e.isHorizontal, this.isHorizontal);
      let i = this.option("viewport") || t.querySelector("." + e.viewport);
      i || (i = document.createElement("div"), Mt(i, e.viewport), i.append(...Gt(t, "." + e.slide)), t.prepend(i));
      let s = this.option("track") || t.querySelector("." + e.track);
      s || (s = document.createElement("div"), Mt(s, e.track), s.append(...Array.from(i.childNodes))), s.setAttribute("aria-live", "polite"), i.contains(s) || i.prepend(s), this.viewport = i, this.track = s, this.emit("initLayout")
    }

    initSlides() {
      const {track: t} = this;
      if (t) {
        this.slides = [], [...Gt(t, "." + this.cn("slide"))].forEach(t => {
          if (G(t)) {
            const e = Kt({el: t, isDom: !0, index: this.slides.length});
            this.slides.push(e), this.emit("initSlide", e, this.slides.length)
          }
        });
        for (let t of this.option("slides", [])) {
          const e = Kt(t);
          e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", e, this.slides.length)
        }
        this.emit("initSlides")
      }
    }

    setInitialPage() {
      let t = 0;
      const e = this.option("initialSlide");
      t = "number" == typeof e ? this.getPageForSlide(e) : parseInt(this.option("initialPage", 0) + "", 10) || 0, this.page = t
    }

    setInitialPosition() {
      if (!this.track || !this.pages.length) return;
      const t = this.isHorizontal;
      let e = this.page;
      this.pages[e] || (this.page = e = 0);
      const i = this.pages[e].pos * (this.isRTL && t ? 1 : -1), s = t ? i + "px" : "0", n = t ? "0" : i + "px";
      this.track.style.transform = `translate3d(${s}, ${n}, 0) scale(1)`, this.option("adaptiveHeight") && this.setViewportHeight()
    }

    initPanzoom() {
      this.panzoom && (this.panzoom.destroy(), this.panzoom = null);
      const t = this.option("Panzoom") || {};
      this.panzoom = new At(this.viewport, V({}, {
        content: this.track,
        zoom: !1,
        panOnlyZoomed: !1,
        lockAxis: this.isHorizontal ? "x" : "y",
        infinite: this.isInfinite,
        click: !1,
        dblClick: !1,
        touch: t => !(this.pages.length < 2 && !t.options.infinite),
        bounds: () => this.getBounds(),
        maxVelocity: t => Math.abs(t.target[this.axis] - t.current[this.axis]) < 2 * this.viewportDim ? 100 : 0
      }, t)), this.panzoom.on("*", (t, e, ...i) => {
        this.emit("Panzoom." + e, t, ...i)
      }), this.panzoom.on("decel", this.onDecel), this.panzoom.on("refresh", this.onRefresh), this.panzoom.on("beforeTransform", this.onBeforeTransform), this.panzoom.on("endAnimation", this.onEndAnimation)
    }

    attachEvents() {
      const t = this.container;
      t && (t.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.addEventListener("slideTo", this.onSlideTo)), window.addEventListener("resize", this.onResize)
    }

    createPages() {
      let t = [];
      const {contentDim: e, viewportDim: i} = this, s = this.option("slidesPerPage");
      if ("number" == typeof s && e > i) {
        for (let e = 0; e < this.slides.length; e += s) t.push(Jt({index: e, slides: this.slides.slice(e, e + s)}));
        return t
      }
      let n = 0, o = 0;
      for (const e of this.slides) (!t.length || o + e.dim > i) && (t.push(Jt()), n = t.length - 1, o = 0), o += e.dim + e.gap, t[n].slides.push(e);
      return t
    }

    processPages() {
      const t = this.pages, {contentDim: e, viewportDim: i} = this, s = this.option("center"), n = this.option("fill"),
        o = n && s && e > i && !this.isInfinite;
      if (t.forEach((t, n) => {
        t.index = n, t.pos = t.slides[0].pos, t.dim = 0;
        for (const [e, i] of t.slides.entries()) t.dim += i.dim, e < t.slides.length - 1 && (t.dim += i.gap);
        o && t.pos + .5 * t.dim < .5 * i ? t.pos = 0 : o && t.pos + .5 * t.dim >= e - .5 * i ? t.pos = e - i : s && (t.pos += -.5 * (i - t.dim))
      }), t.forEach((t, s) => {
        n && !this.isInfinite && e > i && (t.pos = Math.max(t.pos, 0), t.pos = Math.min(t.pos, e - i)), t.pos = pt(t.pos, 1e3), t.dim = pt(t.dim, 1e3), t.pos < .1 && t.pos > -.1 && (t.pos = 0)
      }), this.isInfinite) return t;
      const a = [];
      let r;
      return t.forEach(t => {
        const e = Object.assign({}, t);
        r && e.pos === r.pos ? (r.dim += e.dim, r.slides = [...r.slides, ...e.slides]) : (e.index = a.length, r = e, a.push(e))
      }), a
    }

    getPageFromIndex(t = 0) {
      const e = this.pages.length;
      let i;
      return t = parseInt((t || 0).toString()) || 0, i = this.isInfinite ? (t % e + e) % e : Math.max(Math.min(t, this.pages.length - 1), 0), i
    }

    getSlideMetrics(t) {
      const e = this.isHorizontal ? "width" : "height";
      let i = 0, s = 0, n = t.el;
      n ? i = parseFloat(n.dataset[e] || "") || 0 : (n = document.createElement("div"), n.style.visibility = "hidden", Mt(n, this.cn("slide") + " " + t.class), (this.track || document.body).prepend(n)), i ? (n.style[e] = i + "px", n.style["width" === e ? "height" : "width"] = "") : i = n.getBoundingClientRect()[e];
      const o = getComputedStyle(n);
      return "content-box" === o.boxSizing && (this.isHorizontal ? (i += parseFloat(o.paddingLeft) || 0, i += parseFloat(o.paddingRight) || 0) : (i += parseFloat(o.paddingTop) || 0, i += parseFloat(o.paddingBottom) || 0)), s = parseFloat(o[this.isHorizontal ? "marginRight" : "marginBottom"]) || 0, this.isHorizontal, t.el || n.remove(), {
        dim: pt(i, 1e3),
        gap: pt(s, 1e3)
      }
    }

    getBounds() {
      let t = {min: 0, max: 0};
      if (this.isInfinite) t = {min: -1 / 0, max: 1 / 0}; else if (this.pages.length) {
        const e = this.pages[0].pos, i = this.pages[this.pages.length - 1].pos;
        t = this.isRTL && this.isHorizontal ? {min: e, max: i} : {min: -1 * i, max: -1 * e}
      }
      return {x: this.isHorizontal ? t : {min: 0, max: 0}, y: this.isHorizontal ? {min: 0, max: 0} : t}
    }

    repositionSlides() {
      const {viewportDim: t, contentDim: e, page: i, pages: s} = this;
      let n, o = 0, a = 0, r = 0, l = 0;
      this.panzoom ? l = -1 * this.panzoom.current[this.isHorizontal ? "e" : "f"] : s[i] && (l = s[i].pos || 0), n = this.isHorizontal ? this.isRTL ? "right" : "left" : "top", this.isRTL && this.isHorizontal && (l *= -1);
      for (const t of this.slides) t.el ? ("top" === n ? (t.el.style.right = "", t.el.style.left = "") : t.el.style.top = "", t.index !== o ? t.el.style[n] = 0 === a ? "" : pt(a, 1e3) + "px" : t.el.style[n] = "", r += t.dim + t.gap, o++) : a += t.dim + t.gap;
      if (this.isInfinite && r) for (const i of this.slides) i.el && (pt(i.pos) < pt(t) && pt(i.pos + i.dim + i.gap) < pt(l) && pt(l) > pt(e - t) && (i.el.style[n] = pt(a + r, 1e3) + "px"), pt(i.pos + i.gap) >= pt(e - t) && pt(i.pos) > pt(l + t) && pt(l) < pt(t) && (i.el.style[n] = `-${pt(r, 1e3)}px`));
      let h, c, d = [...this.inTransition];
      if (d.length > 1 && (h = this.pages[d[0]], c = this.pages[d[1]]), h && c) {
        let t = 0;
        for (const e of this.slides) e.el ? this.inTransition.has(e.index) && h.slides.indexOf(e) < 0 && (e.el.style[n] = pt(t + (h.pos - c.pos), 1e3) + "px") : t += e.dim + e.gap
      }
    }

    createSlideEl(t) {
      if (!this.track || !t) return;
      if (t.el) return;
      const e = document.createElement("div");
      Mt(e, this.cn("slide")), Mt(e, t.class), Mt(e, t.customClass), t.html && (e.innerHTML = t.html);
      const i = [];
      this.slides.forEach((t, e) => {
        t.el && i.push(e)
      });
      const s = t.index;
      let n = null;
      if (i.length) {
        let t = i.reduce((t, e) => Math.abs(e - s) < Math.abs(t - s) ? e : t);
        n = this.slides[t]
      }
      const o = n && n.el ? n.index < t.index ? n.el.nextSibling : n.el : null;
      this.track.insertBefore(e, this.track.contains(o) ? o : null), t.el = e, this.emit("createSlide", t)
    }

    removeSlideEl(t, e = !1) {
      const i = t.el;
      if (!i) return;
      if (Tt(i, this.cn("isSelected")), t.isDom && !e) return i.removeAttribute("aria-hidden"), i.removeAttribute("data-index"), Tt(i, this.cn("isSelected")), void (i.style.left = "");
      this.emit("removeSlide", t);
      const s = new CustomEvent("animationend");
      i.dispatchEvent(s), t.el && t.el.remove(), t.el = null
    }

    transitionTo(t = 0, e = this.option("transition")) {
      if (!e) return !1;
      const {pages: i, panzoom: s} = this;
      t = parseInt((t || 0).toString()) || 0;
      const n = this.getPageFromIndex(t);
      if (!s || !i[n] || i.length < 2 || i[this.page].slides[0].dim < this.viewportDim) return !1;
      const o = t > this.page ? 1 : -1, a = this.pages[n].pos * (this.isRTL ? 1 : -1);
      if (this.page === n && pt(a, 1e3) === pt(s.target[this.axis], 1e3)) return !1;
      this.clearTransitions();
      const r = s.isResting;
      Mt(this.container, this.cn("inTransition"));
      const l = this.pages[this.page].slides[0], h = this.pages[n].slides[0];
      this.inTransition.add(h.index), this.createSlideEl(h);
      let c = l.el, d = h.el;
      r || "slide" === e || (e = "fadeFast", c = null);
      const u = this.isRTL ? "next" : "prev", p = this.isRTL ? "prev" : "next";
      return c && (this.inTransition.add(l.index), l.transition = e, c.addEventListener("animationend", this.onAnimationEnd), c.classList.add(`f-${e}Out`, "to-" + (o > 0 ? p : u))), d && (h.transition = e, d.addEventListener("animationend", this.onAnimationEnd), d.classList.add(`f-${e}In`, "from-" + (o > 0 ? u : p))), s.panTo({
        x: this.isHorizontal ? a : 0,
        y: this.isHorizontal ? 0 : a,
        friction: 0
      }), this.onChange(n), !0
    }

    manageSlideVisiblity() {
      const t = new Set, e = new Set, i = this.getVisibleSlides(parseFloat(this.option("preload", 0) + "") || 0);
      for (const s of this.slides) i.has(s) ? t.add(s) : e.add(s);
      for (const e of this.inTransition) t.add(this.slides[e]);
      for (const e of t) this.createSlideEl(e), this.lazyLoadSlide(e);
      for (const i of e) t.has(i) || this.removeSlideEl(i);
      this.markSelectedSlides(), this.repositionSlides()
    }

    markSelectedSlides() {
      if (!this.pages[this.page] || !this.pages[this.page].slides) return;
      const t = "aria-hidden";
      let e = this.cn("isSelected");
      if (e) for (const i of this.slides) i.el && (i.el.dataset.index = "" + i.index, this.pages[this.page].slides.includes(i) ? (i.el.classList.contains(e) || (Mt(i.el, e), this.emit("selectSlide", i)), i.el.removeAttribute(t)) : (i.el.classList.contains(e) && (Tt(i.el, e), this.emit("unselectSlide", i)), i.el.setAttribute(t, "true")))
    }

    flipInfiniteTrack() {
      const t = this.panzoom;
      if (!t || !this.isInfinite) return;
      const e = "x" === this.option("axis") ? "e" : "f", {viewportDim: i, contentDim: s} = this;
      let n = t.current[e], o = t.target[e] - n, a = 0, r = .5 * i, l = s;
      this.isRTL && this.isHorizontal ? (n < -r && (a = -1, n += l), n > l - r && (a = 1, n -= l)) : (n > r && (a = 1, n -= l), n < -l + r && (a = -1, n += l)), a && (t.current[e] = n, t.target[e] = n + o)
    }

    lazyLoadSlide(t) {
      const e = this, i = t && t.el;
      if (!i) return;
      const s = new Set, n = "f-fadeIn";
      i.querySelectorAll("[data-lazy-srcset]").forEach(t => {
        t instanceof HTMLImageElement && s.add(t)
      }), i.querySelectorAll("[data-lazy-src]").forEach(t => {
        t instanceof HTMLImageElement ? s.add(t) : G(t) && (t.style.backgroundImage = `url('${t.dataset.lazySrc || ""}')`)
      });
      const o = (t, i, s) => {
        s && (s.remove(), s = null), i.complete && (i.classList.add(n), setTimeout(() => {
          i.classList.remove(n)
        }, 350), i.style.display = ""), this.option("adaptiveHeight") && t.el && this.pages[this.page].slides.indexOf(t) > -1 && e.setViewportHeight()
      };
      for (const e of s) {
        let i = null;
        e.src = e.dataset.lazySrcset || e.dataset.lazySrc || "", delete e.dataset.lazySrc, delete e.dataset.lazySrcset, e.style.display = "none", e.addEventListener("error", () => {
          o(t, e, i)
        }), e.addEventListener("load", () => {
          o(t, e, i)
        }), setTimeout(() => {
          e.parentNode && t.el && (e.complete ? o(t, e, i) : (i = $(et), e.parentNode.insertBefore(i, e)))
        }, 300)
      }
      let a = i.dataset.lazySrc;
      a && a.length && (i.style.backgroundImage = `url('${a}')`)
    }

    onAnimationEnd(t) {
      var e;
      const i = t.target, s = i ? parseInt(i.dataset.index || "", 10) || 0 : -1, n = this.slides[s],
        o = t.animationName;
      if (!i || !n || !o) return;
      const a = !!this.inTransition.has(s) && n.transition;
      a && o.substring(0, a.length + 2) === "f-" + a && this.inTransition.delete(s), this.inTransition.size || this.clearTransitions(), s === this.page && (null === (e = this.panzoom) || void 0 === e ? void 0 : e.isResting) && this.emit("settle")
    }

    onDecel(t, e = 0, i = 0, s = 0, n = 0) {
      const o = this.isRTL, a = this.isHorizontal, r = this.axis, l = this.pages.length,
        h = Math.abs(Math.atan2(i, e) / (Math.PI / 180));
      let c = 0;
      if (c = h > 45 && h < 135 ? a ? 0 : i : a ? e : 0, !l) return;
      const d = this.option("dragFree");
      let u = this.page;
      const p = t.target[r] * (this.isRTL && a ? 1 : -1), {pageIndex: g} = this.getPageFromPosition(p),
        m = t.current[r] * (o && a ? 1 : -1);
      let {page: f} = this.getPageFromPosition(m);
      d ? this.onChange(g) : (Math.abs(c) > 5 ? ((this.pages.length < 3 || Math.max(Math.abs(s), Math.abs(n)) > this.pages[u].slides[0].dim) && (u = f), u = o && a ? c < 0 ? u - 1 : u + 1 : c < 0 ? u + 1 : u - 1) : u = f, this.slideTo(u, {
        transition: !1,
        friction: t.option("decelFriction")
      }))
    }

    onClick(t) {
      const e = t.target, i = e && G(e) ? e.dataset : null;
      let s, n;
      i && (void 0 !== i.carouselPage ? (n = "slideTo", s = i.carouselPage) : void 0 !== i.carouselNext ? n = "slideNext" : void 0 !== i.carouselPrev && (n = "slidePrev")), n ? (t.preventDefault(), t.stopPropagation(), e && !e.hasAttribute("disabled") && this[n](s)) : this.emit("click", t)
    }

    onSlideTo(t) {
      const e = t.detail || 0;
      this.slideTo(this.getPageForSlide(e), {friction: 0})
    }

    onChange(t, e = 0) {
      const i = this.page;
      this.prevPage = i, this.page = t, this.option("adaptiveHeight") && this.setViewportHeight(), t !== i && (this.markSelectedSlides(), this.emit("change", t, i, e))
    }

    onRefresh(t, e = "") {
      let i = this.contentDim, s = this.viewportDim;
      this.updateMetrics(), this.contentDim === i && this.viewportDim === s || this.slideTo(this.page, {
        friction: 0,
        transition: !1
      })
    }

    onResize() {
      this.option("breakpoints") && this.processOptions()
    }

    onBeforeTransform() {
      this.flipInfiniteTrack(), this.manageSlideVisiblity()
    }

    onEndAnimation() {
      this.emit("settle")
    }

    reInit(t = null, e = null) {
      this.destroy(), this.state = Ut.Init, this.userOptions = t || this.userOptions, this.userPlugins = e || this.userPlugins, this.processOptions()
    }

    slideTo(t = 0, {friction: e = this.option("friction"), transition: i = this.option("transition")} = {}) {
      if (this.state === Ut.Destroy) return;
      const s = this.panzoom, n = this.pages.length;
      if (!s || !n) return;
      if (this.transitionTo(t, i)) return;
      const o = this.axis, a = this.getPageFromIndex(t);
      let r = this.pages[a].pos, l = 0;
      if (this.isInfinite) {
        const t = s.current[o] * (this.isRTL && this.isHorizontal ? 1 : -1), e = this.contentDim, i = r + e, n = r - e;
        Math.abs(t - i) < Math.abs(t - r) && (r = i, l = 1), Math.abs(t - n) < Math.abs(t - r) && (r = n, l = -1)
      }
      r *= this.isRTL && this.isHorizontal ? 1 : -1, Math.abs(s.target[o] - r) < .1 || (s.panTo({
        x: this.isHorizontal ? r : 0,
        y: this.isHorizontal ? 0 : r,
        friction: e
      }), this.onChange(a, l))
    }

    slideToClosest(t) {
      if (this.panzoom) {
        const {pageIndex: e} = this.getPageFromPosition(this.panzoom.current[this.isHorizontal ? "e" : "f"]);
        this.slideTo(e, t)
      }
    }

    slideNext() {
      this.slideTo(this.page + 1)
    }

    slidePrev() {
      this.slideTo(this.page - 1)
    }

    clearTransitions() {
      this.inTransition.clear(), Tt(this.container, this.cn("inTransition"));
      const t = ["to-prev", "to-next", "from-prev", "from-next"];
      for (const e of this.slides) {
        const i = e.el;
        if (i) {
          i.removeEventListener("animationend", this.onAnimationEnd), i.classList.remove(...t);
          const s = e.transition;
          s && i.classList.remove(`f-${s}Out`, `f-${s}In`)
        }
      }
      this.manageSlideVisiblity()
    }

    prependSlide(t) {
      var e, i;
      let s = Array.isArray(t) ? t : [t];
      for (const t of s.reverse()) this.slides.unshift(Kt(t));
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      const n = (null === (e = this.pages[this.page]) || void 0 === e ? void 0 : e.pos) || 0;
      this.page += s.length, this.updateMetrics();
      const o = (null === (i = this.pages[this.page]) || void 0 === i ? void 0 : i.pos) || 0;
      if (this.panzoom) {
        const t = this.isRTL ? n - o : o - n;
        this.panzoom.target.e -= t, this.panzoom.current.e -= t, this.panzoom.requestTick()
      }
    }

    appendSlide(t) {
      let e = Array.isArray(t) ? t : [t];
      for (const t of e) {
        const e = Kt(t);
        e.index = this.slides.length, this.slides.push(e), this.emit("initSlide", t, this.slides.length)
      }
      this.updateMetrics()
    }

    removeSlide(t) {
      const e = this.slides.length;
      t = (t % e + e) % e, this.removeSlideEl(this.slides[t], !0), this.slides.splice(t, 1);
      for (let t = 0; t < this.slides.length; t++) this.slides[t].index = t;
      this.updateMetrics(), this.slideTo(this.page, {friction: 0, transition: !1})
    }

    updateMetrics() {
      const t = this.panzoom;
      if (!this.track) return;
      const e = "e" === this.axis ? "width" : "height";
      let i, s = this.pages.length, n = 0;
      for (const [t, e] of this.slides.entries()) {
        let s = 0, o = 0;
        !e.el && i ? (s = i.dim, o = i.gap) : (({
          dim: s,
          gap: o
        } = this.getSlideMetrics(e)), i = e), s = pt(s, 1e3), o = pt(o, 1e3), e.dim = s, e.gap = o, e.pos = n, n += s, (this.isInfinite || t < this.slides.length - 1) && (n += o)
      }
      this.viewport && (this.viewportDim = pt(this.viewport.getBoundingClientRect()[e], 1e3));
      const o = this.contentDim;
      this.contentDim = n, t && (t.contentRect[e] = n, t.contentRect["e" === this.axis ? "fullWidth" : "fullHeight"] = n), this.pages = this.createPages(), this.pages = this.processPages(), this.state === Ut.Init && this.setInitialPage(), this.page = Math.max(0, Math.min(this.page, this.pages.length - 1)), t && s === this.pages.length && n !== o && (t.target[this.axis] = -1 * this.pages[this.page].pos, t.current[this.axis] = -1 * this.pages[this.page].pos, t.stop()), this.manageSlideVisiblity(), this.emit("refresh")
    }

    getProgress(t) {
      void 0 === t && (t = this.page);
      const e = this, i = e.panzoom, s = e.pages[t] || 0;
      if (!s || !i) return 0;
      let n = -1 * i.current.e, o = e.contentDim;
      var a = [pt((n - s.pos) / (1 * s.dim), 1e3), pt((n + o - s.pos) / (1 * s.dim), 1e3), pt((n - o - s.pos) / (1 * s.dim), 1e3)].reduce((function (t, e) {
        return Math.abs(e - 0) < Math.abs(t - 0) ? e : t
      }));
      return Math.max(-1, Math.min(1, a))
    }

    setViewportHeight() {
      const {page: t, pages: e, viewport: i, isHorizontal: s} = this;
      if (!i || !e[t]) return;
      let n = 0;
      s && this.track && (this.track.style.height = "auto", e[t].slides.forEach(t => {
        t.el && (n = Math.max(n, t.el.offsetHeight))
      })), i.style.height = n ? n + "px" : ""
    }

    getPageForSlide(t) {
      for (const e of this.pages) for (const i of e.slides) if (i.index === t) return e.index;
      return -1
    }

    getVisibleSlides(t = 0) {
      var e;
      const i = new Set;
      let {contentDim: s, viewportDim: n, pages: o, page: a} = this;
      s = s + (null === (e = this.slides[this.slides.length - 1]) || void 0 === e ? void 0 : e.gap) || 0;
      let r = 0;
      r = this.panzoom ? -1 * this.panzoom.current[this.axis] : o[a] && o[a].pos || 0, this.isInfinite && (r -= Math.floor(r / s) * s), this.isRTL && this.isHorizontal && (r *= -1);
      const l = r - n * t, h = r + n * (t + 1), c = this.isInfinite ? [-1, 0, 1] : [0];
      for (const t of this.slides) for (const e of c) {
        const n = t.pos + e * s, o = t.pos + t.dim + t.gap + e * s;
        n < h && o > l && i.add(t)
      }
      return i
    }

    getPageFromPosition(t) {
      const {viewportDim: e, contentDim: i} = this, s = this.pages.length, n = this.slides.length,
        o = this.slides[n - 1];
      let a = 0, r = 0, l = 0;
      const h = this.option("center");
      h && (t += .5 * e), this.isInfinite || (t = Math.max(this.slides[0].pos, Math.min(t, o.pos)));
      const c = i + o.gap;
      l = Math.floor(t / c) || 0, t -= l * c;
      let d = o, u = this.slides.find(e => {
        const i = t + (d && !h ? .5 * d.dim : 0);
        return d = e, e.pos <= i && e.pos + e.dim + e.gap > i
      });
      return u || (u = o), r = this.getPageForSlide(u.index), a = r + l * s, {page: a, pageIndex: r}
    }

    destroy() {
      if ([Ut.Destroy].includes(this.state)) return;
      this.state = Ut.Destroy;
      const {container: t, viewport: e, track: i, slides: s, panzoom: n} = this, o = this.option("classes");
      t.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.removeEventListener("slideTo", this.onSlideTo), window.removeEventListener("resize", this.onResize), n && (n.destroy(), this.panzoom = null), s && s.forEach(t => {
        this.removeSlideEl(t)
      }), this.detachPlugins(), this.track = null, this.viewport = null, this.page = 0, e && i && e.replaceWith(...i.childNodes);
      for (const [e, i] of Object.entries(o)) "container" !== e && i && t.classList.remove(i);
      this.slides = [];
      const a = this.events.get("ready");
      this.events = new Map, a && this.events.set("ready", a)
    }
  }

  Object.defineProperty(se, "Panzoom", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: At
  }), Object.defineProperty(se, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: {
      viewport: null,
      track: null,
      enabled: !0,
      slides: [],
      axis: "x",
      transition: "fade",
      preload: 1,
      slidesPerPage: "auto",
      initialPage: 0,
      friction: .12,
      Panzoom: {decelFriction: .12},
      center: !0,
      infinite: !0,
      fill: !0,
      dragFree: !1,
      adaptiveHeight: !1,
      direction: "ltr",
      classes: {
        container: "f-carousel",
        viewport: "f-carousel__viewport",
        track: "f-carousel__track",
        slide: "f-carousel__slide",
        isLTR: "is-ltr",
        isRTL: "is-rtl",
        isHorizontal: "is-horizontal",
        isVertical: "is-vertical",
        inTransition: "in-transition",
        isSelected: "is-selected"
      },
      l10n: {NEXT: "Next slide", PREV: "Previous slide", GOTO: "Go to slide #%d"}
    }
  }), Object.defineProperty(se, "Plugins", {enumerable: !0, configurable: !0, writable: !0, value: ie});
  let ne = null, oe = null;
  const ae = new Map;
  let re = 0;

  class le extends lt {
    get isIdle() {
      return this.idle
    }

    get isCompact() {
      return this.option("compact")
    }

    constructor(t = [], e = {}, i = {}) {
      super(e), Object.defineProperty(this, "userSlides", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: []
      }), Object.defineProperty(this, "userPlugins", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: {}
      }), Object.defineProperty(this, "idle", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "idleTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "clickTimer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "prevWheelTime", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "ignoreFocusChange", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: !1
      }), Object.defineProperty(this, "state", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: nt.Init
      }), Object.defineProperty(this, "id", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: 0
      }), Object.defineProperty(this, "container", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "footer", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "caption", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "carousel", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "lastFocus", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: null
      }), Object.defineProperty(this, "prevMouseMoveEvent", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "fsAPI", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this.fsAPI = (() => {
        let t, e = "", i = "", s = "";
        return document.fullscreenEnabled ? (e = "requestFullscreen", i = "exitFullscreen", s = "fullscreenElement") : document.webkitFullscreenEnabled && (e = "webkitRequestFullscreen", i = "webkitExitFullscreen", s = "webkitFullscreenElement"), e && (t = {
          request: function (t) {
            return "webkitRequestFullscreen" === e ? t[e](Element.ALLOW_KEYBOARD_INPUT) : t[e]()
          }, exit: function () {
            return document[s] && document[i]()
          }, isFullscreen: function () {
            return document[s]
          }
        }), t
      })(), this.id = e.id || ++re, ae.set(this.id, this), this.userSlides = t, this.userPlugins = i, queueMicrotask(() => {
        this.init()
      })
    }

    init() {
      this.state = nt.Init, this.attachPlugins(Object.assign(Object.assign({}, le.Plugins), this.userPlugins)), this.emit("init"), !0 === this.option("hideScrollbar") && (() => {
        if (!K) return;
        if (document.body.classList.contains("compensate-for-scrollbar")) return;
        const t = window.innerWidth - document.documentElement.getBoundingClientRect().width;
        t > 1 && (document.documentElement.style.setProperty("--fancybox-scrollbar-compensate", t + "px"), document.body.classList.add("compensate-for-scrollbar"))
      })(), this.initLayout();
      const t = () => {
        this.initCarousel(this.userSlides), this.state = nt.Ready, this.attachEvents(), this.emit("ready"), setTimeout(() => {
          this.container && this.container.setAttribute("aria-hidden", "false")
        }, 16)
      };
      this.option("Fullscreen.autoStart") && this.fsAPI && !this.fsAPI.isFullscreen() ? this.fsAPI.request(this.container).then(() => t()).catch(() => t()) : t()
    }

    initLayout() {
      const t = this.option("parentEl") || document.body, e = $(this.localize(this.option("tpl.main") || ""));
      e && (e.setAttribute("id", "fancybox-" + this.id), e.setAttribute("aria-label", this.localize("{{MODAL}}")), e.classList.toggle("is-compact", this.isCompact), Mt(e, this.option("mainClass") || ""), this.container = e, this.footer = e.querySelector(".fancybox__footer"), t.appendChild(e), document.documentElement.classList.add("with-fancybox"), ne && oe || (ne = document.createElement("button"), ne.classList.add("fancybox-focus-guard"), ne.setAttribute("aria-hidden", "true"), ne.setAttribute("aria-label", "Focus guard"), ne.setAttribute("type", "button"), oe = ne.cloneNode(), document.body.insertBefore(ne, e), document.body.append(oe)), this.option("animated") && (e.classList.add("is-animated"), setTimeout(() => {
        this.isClosing() || e.classList.remove("is-animated")
      }, 350)), this.emit("initLayout"))
    }

    initCarousel(t) {
      const e = this.container;
      if (!e) return;
      const i = e.querySelector(".fancybox__carousel");
      if (!i) return;
      const s = this.carousel = new se(i, V({}, {
        slides: t,
        transition: "fade",
        Panzoom: {lockAxis: this.option("dragToClose") ? "xy" : "x", infinite: !!this.option("dragToClose") && "y"},
        Dots: !1,
        Navigation: {classes: {container: "fancybox__nav", button: "f-button", isNext: "is-next", isPrev: "is-prev"}},
        initialPage: this.option("startIndex"),
        l10n: this.option("l10n")
      }, this.option("Carousel") || {}));
      s.on("*", (t, e, ...i) => {
        this.emit("Carousel." + e, t, ...i)
      }), s.on(["ready", "change"], () => {
        this.manageCaption(this.getSlide())
      }), s.on("removeSlide", (t, e) => {
        e.closeBtnEl && e.closeBtnEl.remove(), e.closeBtnEl = void 0, e.captionEl && e.captionEl.remove(), e.captionEl = void 0, e.spinnerEl && e.spinnerEl.remove(), e.spinnerEl = void 0, e.state = void 0
      }), s.on("Panzoom.touchStart", () => {
        this.isCompact || this.endIdle()
      }), s.on("settle", () => {
        this.idleTimer || this.isCompact || !this.option("idle") || this.setIdle(), this.option("autoFocus") && this.checkFocus()
      }), this.option("dragToClose") && (s.on("Panzoom.afterTransform", (t, e) => {
        const i = this.container;
        if (i) {
          const t = Math.abs(e.current.f),
            s = t < 1 ? "" : Math.max(.5, Math.min(1, 1 - t / e.contentRect.fitHeight * 1.5));
          i.style.setProperty("--fancybox-ts", s ? "0s" : ""), i.style.setProperty("--fancybox-opacity", s + "")
        }
      }), s.on("Panzoom.touchEnd", (t, e, i) => {
        var s;
        if (e.isMobile && document.activeElement && -1 !== ["TEXTAREA", "INPUT", "SELECT"].indexOf(null === (s = document.activeElement) || void 0 === s ? void 0 : s.nodeName)) return;
        const n = this.getSlide();
        if (n && n.el && n.el.scrollHeight > n.el.clientHeight) return;
        const o = Math.abs(e.dragOffset.y);
        "y" === e.lockedAxis && (o >= 200 || o >= 50 && e.dragOffset.time < 300) && (i && i.cancelable && i.preventDefault(), this.close(i, "f-throwOut" + (e.current.f < 0 ? "Up" : "Down")))
      })), s.on(["change"], t => {
        var e;
        let i = null === (e = this.getSlide()) || void 0 === e ? void 0 : e.triggerEl;
        if (i) {
          const e = new CustomEvent("slideTo", {bubbles: !0, cancelable: !0, detail: t.page});
          i.dispatchEvent(e)
        }
      }), s.on(["refresh", "change"], t => {
        const e = this.container;
        if (!e) return;
        for (const i of e.querySelectorAll("[data-fancybox-current-index]")) i.innerHTML = t.page + 1;
        for (const i of e.querySelectorAll("[data-fancybox-count]")) i.innerHTML = t.pages.length;
        if (!t.isInfinite) {
          for (const i of e.querySelectorAll("[data-fancybox-next]")) t.page < t.pages.length - 1 ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"));
          for (const i of e.querySelectorAll("[data-fancybox-prev]")) t.page > 0 ? (i.removeAttribute("disabled"), i.removeAttribute("tabindex")) : (i.setAttribute("disabled", ""), i.setAttribute("tabindex", "-1"))
        }
        const i = this.getSlide();
        let s = (null == i ? void 0 : i.downloadSrc) || "";
        s || !i || "image" !== i.type || i.error || "string" != typeof i.src || (s = i.src);
        for (const t of e.querySelectorAll("[data-fancybox-download]")) s ? (t.removeAttribute("disabled"), t.removeAttribute("tabindex"), t.setAttribute("href", s), t.setAttribute("download", s), t.setAttribute("target", "_blank")) : (t.setAttribute("disabled", ""), t.setAttribute("tabindex", "-1"), t.removeAttribute("href"), t.removeAttribute("download"))
      }), this.emit("initCarousel")
    }

    attachEvents() {
      const t = this.container;
      t && (t.addEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), t.addEventListener("wheel", this.onWheel, {
        passive: !1,
        capture: !1
      }), document.addEventListener("keydown", this.onKeydown, {
        passive: !1,
        capture: !0
      }), document.addEventListener("visibilitychange", this.onVisibilityChange, !1), document.addEventListener("mousemove", this.onMousemove), this.option("trapFocus") && document.addEventListener("focus", this.onFocus, !0), window.addEventListener("resize", this.onResize))
    }

    detachEvents() {
      const t = this.container;
      t && (document.removeEventListener("keydown", this.onKeydown, {
        passive: !1,
        capture: !0
      }), t.removeEventListener("wheel", this.onWheel, {
        passive: !1,
        capture: !1
      }), t.removeEventListener("click", this.onClick, {
        passive: !1,
        capture: !1
      }), document.removeEventListener("mousemove", this.onMousemove), window.removeEventListener("resize", this.onResize), document.removeEventListener("visibilitychange", this.onVisibilityChange, !1), document.removeEventListener("focus", this.onFocus, !0))
    }

    onClick(t) {
      var e, i;
      if (this.isClosing()) return;
      !this.isCompact && this.option("idle") && this.resetIdle();
      const s = t.composedPath()[0];
      if (s === (null === (e = this.carousel) || void 0 === e ? void 0 : e.container)) return;
      if (s.closest(".f-spinner") || s.closest("[data-fancybox-close]")) return t.preventDefault(), void this.close(t);
      if (s.closest("[data-fancybox-prev]")) return t.preventDefault(), void this.prev();
      if (s.closest("[data-fancybox-next]")) return t.preventDefault(), void this.next();
      if (this.isCompact && "image" === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.type)) return void (this.clickTimer ? (clearTimeout(this.clickTimer), this.clickTimer = null) : this.clickTimer = setTimeout(() => {
        this.toggleIdle(), this.clickTimer = null
      }, 350));
      if (this.emit("click", t), t.defaultPrevented) return;
      let n = !1;
      const o = document.activeElement;
      if (s.closest(".fancybox__content")) {
        if (o) {
          if (o.closest("[contenteditable]")) return;
          s.matches(Q) || o.blur()
        }
        if ((a = window.getSelection()) && "Range" === a.type) return;
        n = this.option("contentClick")
      } else s.closest(".fancybox__carousel") && !s.matches(Q) && (n = this.option("backdropClick"));
      var a;
      "close" === n ? (t.preventDefault(), this.close(t)) : "next" === n ? (t.preventDefault(), this.next()) : "prev" === n && (t.preventDefault(), this.prev())
    }

    onWheel(t) {
      const e = t.wheelDeltaY ? t.wheelDeltaY === -3 * t.deltaY : 0 === t.deltaMode, i = Date.now();
      if (this.prevWheelTime && i - this.prevWheelTime < (e ? 600 : 300)) return void t.preventDefault();
      if (this.prevWheelTime = i, this.emit("wheel", t), t.defaultPrevented) return;
      const s = this.option("wheel", t);
      "close" === s ? (t.preventDefault(), this.close(t)) : "slide" === s && (t.preventDefault(), this[Math.max(-1, Math.min(1, -t.deltaY || -t.deltaX || -t.detail)) > 0 ? "prev" : "next"]())
    }

    onKeydown(t) {
      if (!this.isTopmost()) return;
      this.isCompact || !this.option("idle") || this.isClosing() || this.resetIdle();
      const e = t.key, i = this.option("keyboard");
      if (!i || t.ctrlKey || t.altKey || t.shiftKey) return;
      const s = t.composedPath()[0], n = document.activeElement && document.activeElement.classList,
        o = n && n.contains("f-button") || s.dataset.carouselPage || s.dataset.carouselIndex;
      if ("Escape" !== e && !o && G(s) && (s.isContentEditable || -1 !== ["BUTTON", "TEXTAREA", "OPTION", "INPUT", "SELECT", "VIDEO"].indexOf(s.nodeName))) return;
      this.emit("keydown", e, t);
      const a = i[e];
      "function" == typeof this[a] && (t.preventDefault(), this[a]())
    }

    onResize() {
      const t = this.container;
      if (!t) return;
      const e = this.isCompact;
      t.classList.toggle("is-compact", e), this.manageCaption(this.getSlide()), this.isCompact ? this.clearIdle() : this.endIdle(), this.emit("resize")
    }

    onFocus(t) {
      this.isTopmost() && this.checkFocus(t)
    }

    onMousemove(t) {
      this.prevMouseMoveEvent = t, !this.isCompact && this.option("idle") && this.resetIdle()
    }

    onVisibilityChange() {
      "visible" === document.visibilityState ? this.checkFocus() : this.endIdle()
    }

    manageCloseBtn(t) {
      const e = this.optionFor(t, "closeButton") || !1;
      if ("auto" === e) {
        const t = this.plugins.Toolbar;
        if (t && t.state === Yt.Ready) return
      }
      if (!e) return;
      if (!t.contentEl || t.closeBtnEl) return;
      const i = this.option("tpl.closeButton");
      if (i) {
        const e = $(this.localize(i));
        t.closeBtnEl = t.contentEl.appendChild(e), t.el && Mt(t.el, "has-close-btn")
      }
    }

    manageCaption(t) {
      var e, i, s;
      const n = this.container;
      if (!n) return;
      const o = this.isCompact || this.option("commonCaption"), a = !o;
      if (this.caption && this.stop(this.caption), a && this.caption && (this.caption.remove(), this.caption = null), o && !this.caption) for (const t of (null === (e = this.carousel) || void 0 === e ? void 0 : e.slides) || []) t.captionEl && (t.captionEl.remove(), t.captionEl = void 0, null === (i = t.el) || void 0 === i || i.classList.remove("has-caption"), null === (s = t.el) || void 0 === s || s.removeAttribute("aria-labelledby"));
      if (t || (t = this.getSlide()), !t || o && !this.isCurrentSlide(t)) return;
      const r = t.el;
      let l = this.optionFor(t, "caption", "");
      if ("string" != typeof l || !l.length) return void (o && this.caption && this.animate(this.caption, "f-fadeOut", () => {
        var t;
        null === (t = this.caption) || void 0 === t || t.remove(), this.caption = null
      }));
      let h = null;
      if (a) {
        if (h = t.captionEl || null, r && !h) {
          const e = `fancybox__caption_${this.id}_${t.index}`;
          h = document.createElement("div"), h.className = "fancybox__caption", h.setAttribute("id", e), t.captionEl = r.appendChild(h), r.classList.add("has-caption"), r.setAttribute("aria-labelledby", e)
        }
      } else h = this.caption, h || (h = n.querySelector(".fancybox__caption")), h || (h = document.createElement("div"), h.dataset.fancyboxCaption = "", h.className = "fancybox__caption", h.innerHTML = l, (this.footer || n).prepend(h)), n.classList.add("has-caption"), this.caption = h;
      h && (h.innerHTML = l)
    }

    checkFocus(t) {
      var e;
      const i = document.activeElement || null;
      i && (null === (e = this.container) || void 0 === e ? void 0 : e.contains(i)) || this.focus(t)
    }

    focus(t) {
      var e;
      if (this.ignoreFocusChange) return;
      const i = document.activeElement || null, s = (null == t ? void 0 : t.target) || null, n = this.container,
        o = this.getSlide();
      if (!n || !(null === (e = this.carousel) || void 0 === e ? void 0 : e.viewport)) return;
      if (!t && i && n.contains(i)) return;
      const a = o && o.state === ot.Ready ? o.el : null;
      if (!a || a.contains(i) || n === i) return;
      t && t.cancelable && t.preventDefault(), this.ignoreFocusChange = !0;
      const r = Array.from(n.querySelectorAll(Q));
      let l = [], h = null;
      for (let t of r) {
        const e = !t.offsetParent || t.closest('[aria-hidden="true"]'), i = a && a.contains(t),
          s = !this.carousel.viewport.contains(t);
        t === n || (i || s) && !e ? (l.push(t), void 0 !== t.dataset.origTabindex && (t.tabIndex = parseFloat(t.dataset.origTabindex)), t.removeAttribute("data-orig-tabindex"), !t.hasAttribute("autoFocus") && h || (h = t)) : (t.dataset.origTabindex = void 0 === t.dataset.origTabindex ? t.getAttribute("tabindex") || void 0 : t.dataset.origTabindex, t.tabIndex = -1)
      }
      let c = null;
      t ? (!s || l.indexOf(s) < 0) && (c = h || n, l.length && (i === oe ? c = l[0] : this.lastFocus !== n && i !== ne || (c = l[l.length - 1]))) : c = o && "image" === o.type ? n : h || n, c && tt(c), this.lastFocus = document.activeElement, this.ignoreFocusChange = !1
    }

    next() {
      const t = this.carousel;
      t && t.pages.length > 1 && t.slideNext()
    }

    prev() {
      const t = this.carousel;
      t && t.pages.length > 1 && t.slidePrev()
    }

    jumpTo(...t) {
      this.carousel && this.carousel.slideTo(...t)
    }

    isTopmost() {
      var t;
      return (null === (t = le.getInstance()) || void 0 === t ? void 0 : t.id) == this.id
    }

    animate(t = null, e = "", i) {
      if (!t || !e) return void (i && i());
      this.stop(t);
      const s = n => {
        n.target === t && t.dataset.animationName && (t.removeEventListener("animationend", s), delete t.dataset.animationName, i && i(), t.classList.remove(e))
      };
      t.dataset.animationName = e, t.addEventListener("animationend", s), t.classList.add(e)
    }

    stop(t) {
      t && t.dispatchEvent(new CustomEvent("animationend", {bubbles: !1, cancelable: !0, currentTarget: t}))
    }

    setContent(t, e = "", i = !0) {
      if (this.isClosing()) return;
      const s = t.el;
      if (!s) return;
      let n = null;
      if (G(e)) ["img", "iframe", "video", "audio"].includes(e.nodeName.toLowerCase()) ? (n = document.createElement("div"), n.appendChild(e)) : n = e; else {
        const t = document.createRange().createContextualFragment(e);
        n = document.createElement("div"), n.appendChild(t)
      }
      n instanceof Element && t.filter && !t.error && (n = n.querySelector(t.filter)), n instanceof Element ? (n.classList.add("fancybox__content"), t.id && n.setAttribute("id", t.id), "none" !== n.style.display && "none" !== getComputedStyle(n).getPropertyValue("display") || (n.style.display = t.display || this.option("defaultDisplay") || "flex"), s.classList.add("has-" + (t.error ? "error" : t.type || "unknown")), s.prepend(n), t.contentEl = n, i && this.revealContent(t), this.manageCloseBtn(t), this.manageCaption(t)) : this.setError(t, "{{ELEMENT_NOT_FOUND}}")
    }

    revealContent(t, e) {
      const i = t.el, s = t.contentEl;
      i && s && (this.emit("reveal", t), this.hideLoading(t), t.state = ot.Opening, (e = this.isOpeningSlide(t) ? void 0 === e ? this.optionFor(t, "showClass") : e : "f-fadeIn") ? this.animate(s, e, () => {
        this.done(t)
      }) : this.done(t))
    }

    done(t) {
      var e;
      this.isClosing() || (t.state = ot.Ready, this.emit("done", t), null === (e = t.el) || void 0 === e || e.classList.add("is-done"), this.isCurrentSlide(t) && this.option("autoFocus") && queueMicrotask(() => {
        this.option("autoFocus") && (this.option("autoFocus") ? this.focus() : this.checkFocus())
      }), this.isOpeningSlide(t) && !this.isCompact && this.option("idle") && this.setIdle())
    }

    isCurrentSlide(t) {
      const e = this.getSlide();
      return !(!t || !e) && e.index === t.index
    }

    isOpeningSlide(t) {
      var e, i;
      return null === (null === (e = this.carousel) || void 0 === e ? void 0 : e.prevPage) && t.index === (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.index)
    }

    showLoading(t) {
      t.state = ot.Loading;
      const e = t.el;
      e && (e.classList.add("is-loading"), this.emit("loading", t), t.spinnerEl || setTimeout(() => {
        if (!this.isClosing() && !t.spinnerEl && t.state === ot.Loading) {
          let i = $(et);
          t.spinnerEl = i, e.prepend(i), this.animate(i, "f-fadeIn")
        }
      }, 250))
    }

    hideLoading(t) {
      const e = t.el;
      if (!e) return;
      const i = t.spinnerEl;
      this.isClosing() ? null == i || i.remove() : (e.classList.remove("is-loading"), i && this.animate(i, "f-fadeOut", () => {
        i.remove()
      }), t.state === ot.Loading && (this.emit("loaded", t), t.state = ot.Ready))
    }

    setError(t, e) {
      if (this.isClosing()) return;
      this.emit("error"), t.error = e, this.hideLoading(t), this.clearContent(t);
      const i = document.createElement("div");
      i.classList.add("fancybox-error"), i.innerHTML = this.localize(e || "<p>{{ERROR}}</p>"), this.setContent(t, i)
    }

    clearContent(t) {
      var e;
      null === (e = this.carousel) || void 0 === e || e.emit("removeSlide", t), t.contentEl && (t.contentEl.remove(), t.contentEl = void 0), t.closeBtnEl && (t.closeBtnEl.remove(), t.closeBtnEl = void 0);
      const i = t.el;
      i && (Tt(i, "is-loading"), Tt(i, "has-error"), Tt(i, "has-unknown"), Tt(i, "has-" + (t.type || "unknown")))
    }

    getSlide() {
      var t;
      const e = this.carousel;
      return (null === (t = null == e ? void 0 : e.pages[null == e ? void 0 : e.page]) || void 0 === t ? void 0 : t.slides[0]) || void 0
    }

    close(t, e) {
      if (this.isClosing()) return;
      const i = new Event("shouldClose", {bubbles: !0, cancelable: !0});
      if (this.emit("shouldClose", i, t), i.defaultPrevented) return;
      t && t.cancelable && (t.preventDefault(), t.stopPropagation());
      const s = this.fsAPI, n = () => {
        this.proceedClose(t, e)
      };
      s && s.isFullscreen() ? Promise.resolve(s.exit()).then(() => n()) : n()
    }

    clearIdle() {
      this.idleTimer && clearTimeout(this.idleTimer), this.idleTimer = null
    }

    setIdle(t = !1) {
      const e = () => {
        var t;
        this.clearIdle(), this.idle = !0, null === (t = this.container) || void 0 === t || t.classList.add("is-idle"), this.emit("setIdle")
      };
      if (this.clearIdle(), !this.isClosing()) if (t) e(); else {
        const t = this.option("idle");
        t && (this.idleTimer = setTimeout(e, t))
      }
    }

    endIdle() {
      var t;
      this.clearIdle(), this.idle && !this.isClosing() && (this.idle = !1, null === (t = this.container) || void 0 === t || t.classList.remove("is-idle"), this.emit("endIdle"))
    }

    resetIdle() {
      this.endIdle(), this.setIdle()
    }

    toggleIdle() {
      this.idle ? this.endIdle() : this.setIdle(!0)
    }

    toggleFullscreen() {
      const t = this.fsAPI;
      t && (t.isFullscreen() ? t.exit() : this.container && t.request(this.container))
    }

    isClosing() {
      return [nt.Closing, nt.CustomClosing, nt.Destroy].includes(this.state)
    }

    proceedClose(t, e) {
      var i, s;
      this.state = nt.Closing, this.clearIdle(), this.detachEvents();
      const n = this.container, o = this.carousel, a = this.getSlide();
      if (a) {
        const t = this.option("placeFocusBack") ? (null === (i = this.getSlide()) || void 0 === i ? void 0 : i.triggerEl) || this.option("trigger") : null;
        t && (U(t) ? tt(t) : t.focus())
      }
      if (n && (Mt(n, "is-closing"), n.setAttribute("aria-hidden", "true"), this.option("animated") && Mt(n, "is-animated"), n.style.pointerEvents = "none"), o) {
        o.clearTransitions(), null === (s = o.panzoom) || void 0 === s || s.destroy();
        for (const t of o.slides) {
          t.state = ot.Closing, this.hideLoading(t);
          const e = t.contentEl;
          e && this.stop(e);
          const i = null == t ? void 0 : t.panzoom;
          i && (i.stop(), i.detachEvents(), i.detachObserver()), this.isCurrentSlide(t) || o.emit("removeSlide", t)
        }
      }
      this.emit("close", t), this.state !== nt.CustomClosing ? (void 0 === e && a && (e = this.optionFor(a, "hideClass")), e && a ? (this.animate(a.contentEl, e, () => {
        o && o.emit("removeSlide", a)
      }), setTimeout(() => {
        this.destroy()
      }, 350)) : this.destroy()) : setTimeout(() => {
        this.destroy()
      }, 350)
    }

    destroy() {
      var t;
      if (this.state === nt.Destroy) return;
      this.state = nt.Destroy, null === (t = this.carousel) || void 0 === t || t.destroy();
      const e = this.container;
      e && e.remove(), ae.delete(this.id);
      const i = le.getInstance();
      i ? i.focus() : (ne && (ne.remove(), ne = null), oe && (oe.remove(), oe = null), document.documentElement.classList.remove("with-fancybox"), K && (document.documentElement.style.setProperty("--fancybox-scrollbar-compensate", ""), document.body.classList.remove("compensate-for-scrollbar")))
    }

    static bind(t, e, i) {
      if (!K) return;
      let s, n = "", o = {};
      if ("string" == typeof t ? (s = document.body, n = t, "object" == typeof e && (o = e || {})) : (s = t, "string" == typeof e && (n = e), "object" == typeof i && (o = i || {})), !s) return;
      n = n || "[data-fancybox]";
      const a = le.openers.get(s) || new Map;
      a.set(n, o), le.openers.set(s, a), 1 === a.size && s.addEventListener("click", le.fromEvent)
    }

    static unbind(t, e) {
      let i, s = "";
      if ("string" == typeof t ? (i = document.body, s = t) : (i = t, "string" == typeof e && (s = e)), !i) return;
      const n = le.openers.get(i);
      n && s && n.delete(s), s && n || (le.openers.delete(i), i.removeEventListener("click", le.fromEvent))
    }

    static destroy() {
      let t;
      for (; t = le.getInstance();) t.destroy();
      for (const t of le.openers.keys()) t.removeEventListener("click", le.fromEvent);
      le.openers = new Map
    }

    static fromEvent(t) {
      if (t.defaultPrevented) return;
      if (t.button && 0 !== t.button) return;
      if (t.ctrlKey || t.metaKey || t.shiftKey) return;
      let e = t.composedPath()[0];
      const i = e.closest("[data-fancybox-trigger]");
      if (i) {
        const t = i.dataset.fancyboxTrigger || "", s = document.querySelectorAll(`[data-fancybox="${t}"]`),
          n = parseInt(i.dataset.fancyboxIndex || "", 10) || 0;
        e = s[n] || e
      }
      if (!(e && e instanceof Element)) return;
      let s, n, o, a;
      if ([...le.openers].reverse().find(([t, i]) => !(!t.contains(e) || ![...i].reverse().find(([i, r]) => {
        let l = e.closest(i);
        return !!l && (s = t, n = i, o = l, a = r, !0)
      }))), !s || !n || !o) return;
      a = a || {}, t.preventDefault(), e = o;
      let r = [], l = V({}, st, a);
      l.event = t, l.trigger = e, l.delegate = i;
      const h = l.groupAll, c = l.groupAttr, d = c && e ? e.getAttribute("" + c) : "";
      if ((!e || d || h) && (r = [].slice.call(s.querySelectorAll(n))), e && !h && (r = d ? r.filter(t => t.getAttribute("" + c) === d) : [e]), !r.length) return;
      const u = le.getInstance();
      return u && u.options.trigger && r.indexOf(u.options.trigger) > -1 ? void 0 : (e && (l.startIndex = r.indexOf(e)), le.fromNodes(r, l))
    }

    static fromNodes(t, e) {
      e = V({}, st, e);
      const i = [];
      for (const s of t) {
        const t = s.dataset || {},
          n = t.src || s.getAttribute("href") || s.getAttribute("currentSrc") || s.getAttribute("src") || void 0;
        let o;
        const a = e.delegate;
        let r;
        a && i.length === e.startIndex && (o = a instanceof HTMLImageElement ? a : a.querySelector("img:not([aria-hidden])")), o || (o = s instanceof HTMLImageElement ? s : s.querySelector("img:not([aria-hidden])")), o && (r = o.currentSrc || o.src || void 0, !r && o.dataset && (r = o.dataset.lazySrc || o.dataset.src || void 0));
        const l = {src: n, triggerEl: s, thumbEl: o, thumbElSrc: r, thumbSrc: r};
        for (const e in t) "fancybox" !== e && (l[e] = t[e] + "");
        i.push(l)
      }
      return new le(i, e)
    }

    static getInstance(t) {
      return t ? ae.get(t) : Array.from(ae.values()).reverse().find(t => !t.isClosing() && t) || null
    }

    static getSlide() {
      var t;
      return (null === (t = le.getInstance()) || void 0 === t ? void 0 : t.getSlide()) || null
    }

    static show(t = [], e = {}) {
      return new le(t, e)
    }

    static next() {
      const t = le.getInstance();
      t && t.next()
    }

    static prev() {
      const t = le.getInstance();
      t && t.prev()
    }

    static close(t = !0, ...e) {
      if (t) for (const t of ae.values()) t.close(...e); else {
        const t = le.getInstance();
        t && t.close(...e)
      }
    }
  }

  Object.defineProperty(le, "version", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: "5.0.8"
  }), Object.defineProperty(le, "defaults", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: st
  }), Object.defineProperty(le, "Plugins", {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Vt
  }), Object.defineProperty(le, "openers", {enumerable: !0, configurable: !0, writable: !0, value: new Map});
  var he = document.getElementById("Carousel-1"), ce = document.getElementById("Carousel-2"),
    de = document.getElementById("Carousel-3"), ue = {
      infinite: !0,
      Dots: !1,
      Thumbs: !1,
      Fancybox: !0,
      Center: !0,
      Navigation: !1,
      autoStart: !0,
      transition: "slide",
      Autoplay: {timeout: 3e3, showProgress: !1}
    };
  new H(he, ue, {Autoplay: q}), new H(ce, ue, {Autoplay: q}), new H(de, ue, {Autoplay: q}), le.bind("[data-fancybox]", {
    hideScrollbar: !1,
    Thumbs: !1,
    autoStart: !1,
    compact: !0
  });
  i(4)
}]);