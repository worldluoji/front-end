/* eslint-disable */
import { getCurrentScope as Ks, onScopeDispose as Vs, unref as E, getCurrentInstance as le, onMounted as Te, nextTick as we, watch as U, ref as x, openBlock as k, createElementBlock as W, createElementVNode as ie, warn as Us, computed as A, inject as X, toRef as gt, onUnmounted as Gr, isRef as kt, onBeforeUnmount as ze, onBeforeMount as Yr, provide as Be, defineComponent as j, mergeProps as It, renderSlot as be, createBlock as ve, Transition as qr, withCtx as ue, withDirectives as ye, normalizeClass as V, normalizeStyle as ke, vShow as Hn, Fragment as yt, createVNode as N, reactive as tl, onUpdated as nl, resolveDynamicComponent as Xr, createCommentVNode as Ee, cloneVNode as Gs, Text as Ys, Comment as rl, Teleport as qs, readonly as Xs, onDeactivated as Js, toDisplayString as Xe, toRaw as Io, useSlots as ol, vModelCheckbox as zn, createTextVNode as vn, toRefs as al, resolveComponent as Pe, resolveDirective as _t, renderList as Cr, h as Y, watchEffect as it } from "vue";
var Zs = typeof global == "object" && global && global.Object === Object && global;
const ll = Zs;
var Qs = typeof self == "object" && self && self.Object === Object && self, ei = ll || Qs || Function("return this")();
const We = ei;
var ti = We.Symbol;
const De = ti;
var sl = Object.prototype, ni = sl.hasOwnProperty, ri = sl.toString, Qt = De ? De.toStringTag : void 0;
function oi(e) {
  var t = ni.call(e, Qt), n = e[Qt];
  try {
    e[Qt] = void 0;
    var r = !0;
  } catch {
  }
  var o = ri.call(e);
  return r && (t ? e[Qt] = n : delete e[Qt]), o;
}
var ai = Object.prototype, li = ai.toString;
function si(e) {
  return li.call(e);
}
var ii = "[object Null]", ui = "[object Undefined]", Fo = De ? De.toStringTag : void 0;
function Vt(e) {
  return e == null ? e === void 0 ? ui : ii : Fo && Fo in Object(e) ? oi(e) : si(e);
}
function Ft(e) {
  return e != null && typeof e == "object";
}
var ci = "[object Symbol]";
function Xn(e) {
  return typeof e == "symbol" || Ft(e) && Vt(e) == ci;
}
function il(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var di = Array.isArray;
const Ie = di;
var fi = 1 / 0, Mo = De ? De.prototype : void 0, Bo = Mo ? Mo.toString : void 0;
function ul(e) {
  if (typeof e == "string")
    return e;
  if (Ie(e))
    return il(e, ul) + "";
  if (Xn(e))
    return Bo ? Bo.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -fi ? "-0" : t;
}
var pi = /\s/;
function vi(e) {
  for (var t = e.length; t-- && pi.test(e.charAt(t)); )
    ;
  return t;
}
var hi = /^\s+/;
function mi(e) {
  return e && e.slice(0, vi(e) + 1).replace(hi, "");
}
function ct(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var Do = 0 / 0, gi = /^[-+]0x[0-9a-f]+$/i, bi = /^0b[01]+$/i, yi = /^0o[0-7]+$/i, wi = parseInt;
function Ho(e) {
  if (typeof e == "number")
    return e;
  if (Xn(e))
    return Do;
  if (ct(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = ct(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = mi(e);
  var n = bi.test(e);
  return n || yi.test(e) ? wi(e.slice(2), n ? 2 : 8) : gi.test(e) ? Do : +e;
}
function cl(e) {
  return e;
}
var Ci = "[object AsyncFunction]", Ei = "[object Function]", Si = "[object GeneratorFunction]", _i = "[object Proxy]";
function dl(e) {
  if (!ct(e))
    return !1;
  var t = Vt(e);
  return t == Ei || t == Si || t == Ci || t == _i;
}
var xi = We["__core-js_shared__"];
const pr = xi;
var zo = function() {
  var e = /[^.]+$/.exec(pr && pr.keys && pr.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function Ti(e) {
  return !!zo && zo in e;
}
var Oi = Function.prototype, $i = Oi.toString;
function xt(e) {
  if (e != null) {
    try {
      return $i.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Pi = /[\\^$.*+?()[\]{}|]/g, Ai = /^\[object .+?Constructor\]$/, Ri = Function.prototype, Li = Object.prototype, Ni = Ri.toString, ki = Li.hasOwnProperty, Ii = RegExp(
  "^" + Ni.call(ki).replace(Pi, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Fi(e) {
  if (!ct(e) || Ti(e))
    return !1;
  var t = dl(e) ? Ii : Ai;
  return t.test(xt(e));
}
function Mi(e, t) {
  return e == null ? void 0 : e[t];
}
function Tt(e, t) {
  var n = Mi(e, t);
  return Fi(n) ? n : void 0;
}
var Bi = Tt(We, "WeakMap");
const Er = Bi;
function Di(e, t, n) {
  switch (n.length) {
    case 0:
      return e.call(t);
    case 1:
      return e.call(t, n[0]);
    case 2:
      return e.call(t, n[0], n[1]);
    case 3:
      return e.call(t, n[0], n[1], n[2]);
  }
  return e.apply(t, n);
}
var Hi = 800, zi = 16, Wi = Date.now;
function ji(e) {
  var t = 0, n = 0;
  return function() {
    var r = Wi(), o = zi - (r - n);
    if (n = r, o > 0) {
      if (++t >= Hi)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function Ki(e) {
  return function() {
    return e;
  };
}
var Vi = function() {
  try {
    var e = Tt(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const Wn = Vi;
var Ui = Wn ? function(e, t) {
  return Wn(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: Ki(t),
    writable: !0
  });
} : cl;
const Gi = Ui;
var Yi = ji(Gi);
const qi = Yi;
var Xi = 9007199254740991, Ji = /^(?:0|[1-9]\d*)$/;
function Jr(e, t) {
  var n = typeof e;
  return t = t ?? Xi, !!t && (n == "number" || n != "symbol" && Ji.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function Zi(e, t, n) {
  t == "__proto__" && Wn ? Wn(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function Zr(e, t) {
  return e === t || e !== e && t !== t;
}
var Qi = Object.prototype, eu = Qi.hasOwnProperty;
function tu(e, t, n) {
  var r = e[t];
  (!(eu.call(e, t) && Zr(r, n)) || n === void 0 && !(t in e)) && Zi(e, t, n);
}
var Wo = Math.max;
function nu(e, t, n) {
  return t = Wo(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, a = Wo(r.length - t, 0), s = Array(a); ++o < a; )
      s[o] = r[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = r[o];
    return l[t] = n(s), Di(e, this, l);
  };
}
var ru = 9007199254740991;
function Qr(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ru;
}
function eo(e) {
  return e != null && Qr(e.length) && !dl(e);
}
var ou = Object.prototype;
function au(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || ou;
  return e === n;
}
function lu(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var su = "[object Arguments]";
function jo(e) {
  return Ft(e) && Vt(e) == su;
}
var fl = Object.prototype, iu = fl.hasOwnProperty, uu = fl.propertyIsEnumerable, cu = jo(function() {
  return arguments;
}()) ? jo : function(e) {
  return Ft(e) && iu.call(e, "callee") && !uu.call(e, "callee");
};
const to = cu;
function du() {
  return !1;
}
var pl = typeof exports == "object" && exports && !exports.nodeType && exports, Ko = pl && typeof module == "object" && module && !module.nodeType && module, fu = Ko && Ko.exports === pl, Vo = fu ? We.Buffer : void 0, pu = Vo ? Vo.isBuffer : void 0, vu = pu || du;
const Sr = vu;
var hu = "[object Arguments]", mu = "[object Array]", gu = "[object Boolean]", bu = "[object Date]", yu = "[object Error]", wu = "[object Function]", Cu = "[object Map]", Eu = "[object Number]", Su = "[object Object]", _u = "[object RegExp]", xu = "[object Set]", Tu = "[object String]", Ou = "[object WeakMap]", $u = "[object ArrayBuffer]", Pu = "[object DataView]", Au = "[object Float32Array]", Ru = "[object Float64Array]", Lu = "[object Int8Array]", Nu = "[object Int16Array]", ku = "[object Int32Array]", Iu = "[object Uint8Array]", Fu = "[object Uint8ClampedArray]", Mu = "[object Uint16Array]", Bu = "[object Uint32Array]", ne = {};
ne[Au] = ne[Ru] = ne[Lu] = ne[Nu] = ne[ku] = ne[Iu] = ne[Fu] = ne[Mu] = ne[Bu] = !0;
ne[hu] = ne[mu] = ne[$u] = ne[gu] = ne[Pu] = ne[bu] = ne[yu] = ne[wu] = ne[Cu] = ne[Eu] = ne[Su] = ne[_u] = ne[xu] = ne[Tu] = ne[Ou] = !1;
function Du(e) {
  return Ft(e) && Qr(e.length) && !!ne[Vt(e)];
}
function Hu(e) {
  return function(t) {
    return e(t);
  };
}
var vl = typeof exports == "object" && exports && !exports.nodeType && exports, tn = vl && typeof module == "object" && module && !module.nodeType && module, zu = tn && tn.exports === vl, vr = zu && ll.process, Wu = function() {
  try {
    var e = tn && tn.require && tn.require("util").types;
    return e || vr && vr.binding && vr.binding("util");
  } catch {
  }
}();
const Uo = Wu;
var Go = Uo && Uo.isTypedArray, ju = Go ? Hu(Go) : Du;
const hl = ju;
var Ku = Object.prototype, Vu = Ku.hasOwnProperty;
function Uu(e, t) {
  var n = Ie(e), r = !n && to(e), o = !n && !r && Sr(e), a = !n && !r && !o && hl(e), s = n || r || o || a, l = s ? lu(e.length, String) : [], i = l.length;
  for (var u in e)
    (t || Vu.call(e, u)) && !(s && (u == "length" || o && (u == "offset" || u == "parent") || a && (u == "buffer" || u == "byteLength" || u == "byteOffset") || Jr(u, i))) && l.push(u);
  return l;
}
function Gu(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var Yu = Gu(Object.keys, Object);
const qu = Yu;
var Xu = Object.prototype, Ju = Xu.hasOwnProperty;
function Zu(e) {
  if (!au(e))
    return qu(e);
  var t = [];
  for (var n in Object(e))
    Ju.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function no(e) {
  return eo(e) ? Uu(e) : Zu(e);
}
var Qu = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, ec = /^\w*$/;
function ro(e, t) {
  if (Ie(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || Xn(e) ? !0 : ec.test(e) || !Qu.test(e) || t != null && e in Object(t);
}
var tc = Tt(Object, "create");
const ln = tc;
function nc() {
  this.__data__ = ln ? ln(null) : {}, this.size = 0;
}
function rc(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var oc = "__lodash_hash_undefined__", ac = Object.prototype, lc = ac.hasOwnProperty;
function sc(e) {
  var t = this.__data__;
  if (ln) {
    var n = t[e];
    return n === oc ? void 0 : n;
  }
  return lc.call(t, e) ? t[e] : void 0;
}
var ic = Object.prototype, uc = ic.hasOwnProperty;
function cc(e) {
  var t = this.__data__;
  return ln ? t[e] !== void 0 : uc.call(t, e);
}
var dc = "__lodash_hash_undefined__";
function fc(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ln && t === void 0 ? dc : t, this;
}
function wt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
wt.prototype.clear = nc;
wt.prototype.delete = rc;
wt.prototype.get = sc;
wt.prototype.has = cc;
wt.prototype.set = fc;
function pc() {
  this.__data__ = [], this.size = 0;
}
function Jn(e, t) {
  for (var n = e.length; n--; )
    if (Zr(e[n][0], t))
      return n;
  return -1;
}
var vc = Array.prototype, hc = vc.splice;
function mc(e) {
  var t = this.__data__, n = Jn(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : hc.call(t, n, 1), --this.size, !0;
}
function gc(e) {
  var t = this.__data__, n = Jn(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function bc(e) {
  return Jn(this.__data__, e) > -1;
}
function yc(e, t) {
  var n = this.__data__, r = Jn(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function nt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
nt.prototype.clear = pc;
nt.prototype.delete = mc;
nt.prototype.get = gc;
nt.prototype.has = bc;
nt.prototype.set = yc;
var wc = Tt(We, "Map");
const sn = wc;
function Cc() {
  this.size = 0, this.__data__ = {
    hash: new wt(),
    map: new (sn || nt)(),
    string: new wt()
  };
}
function Ec(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function Zn(e, t) {
  var n = e.__data__;
  return Ec(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Sc(e) {
  var t = Zn(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function _c(e) {
  return Zn(this, e).get(e);
}
function xc(e) {
  return Zn(this, e).has(e);
}
function Tc(e, t) {
  var n = Zn(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function rt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
rt.prototype.clear = Cc;
rt.prototype.delete = Sc;
rt.prototype.get = _c;
rt.prototype.has = xc;
rt.prototype.set = Tc;
var Oc = "Expected a function";
function oo(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Oc);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], a = n.cache;
    if (a.has(o))
      return a.get(o);
    var s = e.apply(this, r);
    return n.cache = a.set(o, s) || a, s;
  };
  return n.cache = new (oo.Cache || rt)(), n;
}
oo.Cache = rt;
var $c = 500;
function Pc(e) {
  var t = oo(e, function(r) {
    return n.size === $c && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Ac = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Rc = /\\(\\)?/g, Lc = Pc(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Ac, function(n, r, o, a) {
    t.push(o ? a.replace(Rc, "$1") : r || n);
  }), t;
});
const Nc = Lc;
function kc(e) {
  return e == null ? "" : ul(e);
}
function Qn(e, t) {
  return Ie(e) ? e : ro(e, t) ? [e] : Nc(kc(e));
}
var Ic = 1 / 0;
function hn(e) {
  if (typeof e == "string" || Xn(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Ic ? "-0" : t;
}
function ao(e, t) {
  t = Qn(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[hn(t[n++])];
  return n && n == r ? e : void 0;
}
function un(e, t, n) {
  var r = e == null ? void 0 : ao(e, t);
  return r === void 0 ? n : r;
}
function ml(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; )
    e[o + n] = t[n];
  return e;
}
var Yo = De ? De.isConcatSpreadable : void 0;
function Fc(e) {
  return Ie(e) || to(e) || !!(Yo && e && e[Yo]);
}
function lo(e, t, n, r, o) {
  var a = -1, s = e.length;
  for (n || (n = Fc), o || (o = []); ++a < s; ) {
    var l = e[a];
    t > 0 && n(l) ? t > 1 ? lo(l, t - 1, n, r, o) : ml(o, l) : r || (o[o.length] = l);
  }
  return o;
}
function Mc(e) {
  var t = e == null ? 0 : e.length;
  return t ? lo(e, 1) : [];
}
function Bc(e) {
  return qi(nu(e, void 0, Mc), e + "");
}
function Dc() {
  this.__data__ = new nt(), this.size = 0;
}
function Hc(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function zc(e) {
  return this.__data__.get(e);
}
function Wc(e) {
  return this.__data__.has(e);
}
var jc = 200;
function Kc(e, t) {
  var n = this.__data__;
  if (n instanceof nt) {
    var r = n.__data__;
    if (!sn || r.length < jc - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new rt(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function Qe(e) {
  var t = this.__data__ = new nt(e);
  this.size = t.size;
}
Qe.prototype.clear = Dc;
Qe.prototype.delete = Hc;
Qe.prototype.get = zc;
Qe.prototype.has = Wc;
Qe.prototype.set = Kc;
function Vc(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, a = []; ++n < r; ) {
    var s = e[n];
    t(s, n, e) && (a[o++] = s);
  }
  return a;
}
function Uc() {
  return [];
}
var Gc = Object.prototype, Yc = Gc.propertyIsEnumerable, qo = Object.getOwnPropertySymbols, qc = qo ? function(e) {
  return e == null ? [] : (e = Object(e), Vc(qo(e), function(t) {
    return Yc.call(e, t);
  }));
} : Uc;
const Xc = qc;
function Jc(e, t, n) {
  var r = t(e);
  return Ie(e) ? r : ml(r, n(e));
}
function Xo(e) {
  return Jc(e, no, Xc);
}
var Zc = Tt(We, "DataView");
const _r = Zc;
var Qc = Tt(We, "Promise");
const xr = Qc;
var ed = Tt(We, "Set");
const Tr = ed;
var Jo = "[object Map]", td = "[object Object]", Zo = "[object Promise]", Qo = "[object Set]", ea = "[object WeakMap]", ta = "[object DataView]", nd = xt(_r), rd = xt(sn), od = xt(xr), ad = xt(Tr), ld = xt(Er), vt = Vt;
(_r && vt(new _r(new ArrayBuffer(1))) != ta || sn && vt(new sn()) != Jo || xr && vt(xr.resolve()) != Zo || Tr && vt(new Tr()) != Qo || Er && vt(new Er()) != ea) && (vt = function(e) {
  var t = Vt(e), n = t == td ? e.constructor : void 0, r = n ? xt(n) : "";
  if (r)
    switch (r) {
      case nd:
        return ta;
      case rd:
        return Jo;
      case od:
        return Zo;
      case ad:
        return Qo;
      case ld:
        return ea;
    }
  return t;
});
const na = vt;
var sd = We.Uint8Array;
const ra = sd;
var id = "__lodash_hash_undefined__";
function ud(e) {
  return this.__data__.set(e, id), this;
}
function cd(e) {
  return this.__data__.has(e);
}
function jn(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new rt(); ++t < n; )
    this.add(e[t]);
}
jn.prototype.add = jn.prototype.push = ud;
jn.prototype.has = cd;
function dd(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function fd(e, t) {
  return e.has(t);
}
var pd = 1, vd = 2;
function gl(e, t, n, r, o, a) {
  var s = n & pd, l = e.length, i = t.length;
  if (l != i && !(s && i > l))
    return !1;
  var u = a.get(e), d = a.get(t);
  if (u && d)
    return u == t && d == e;
  var f = -1, v = !0, h = n & vd ? new jn() : void 0;
  for (a.set(e, t), a.set(t, e); ++f < l; ) {
    var c = e[f], p = t[f];
    if (r)
      var g = s ? r(p, c, f, t, e, a) : r(c, p, f, e, t, a);
    if (g !== void 0) {
      if (g)
        continue;
      v = !1;
      break;
    }
    if (h) {
      if (!dd(t, function(m, w) {
        if (!fd(h, w) && (c === m || o(c, m, n, r, a)))
          return h.push(w);
      })) {
        v = !1;
        break;
      }
    } else if (!(c === p || o(c, p, n, r, a))) {
      v = !1;
      break;
    }
  }
  return a.delete(e), a.delete(t), v;
}
function hd(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function md(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var gd = 1, bd = 2, yd = "[object Boolean]", wd = "[object Date]", Cd = "[object Error]", Ed = "[object Map]", Sd = "[object Number]", _d = "[object RegExp]", xd = "[object Set]", Td = "[object String]", Od = "[object Symbol]", $d = "[object ArrayBuffer]", Pd = "[object DataView]", oa = De ? De.prototype : void 0, hr = oa ? oa.valueOf : void 0;
function Ad(e, t, n, r, o, a, s) {
  switch (n) {
    case Pd:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case $d:
      return !(e.byteLength != t.byteLength || !a(new ra(e), new ra(t)));
    case yd:
    case wd:
    case Sd:
      return Zr(+e, +t);
    case Cd:
      return e.name == t.name && e.message == t.message;
    case _d:
    case Td:
      return e == t + "";
    case Ed:
      var l = hd;
    case xd:
      var i = r & gd;
      if (l || (l = md), e.size != t.size && !i)
        return !1;
      var u = s.get(e);
      if (u)
        return u == t;
      r |= bd, s.set(e, t);
      var d = gl(l(e), l(t), r, o, a, s);
      return s.delete(e), d;
    case Od:
      if (hr)
        return hr.call(e) == hr.call(t);
  }
  return !1;
}
var Rd = 1, Ld = Object.prototype, Nd = Ld.hasOwnProperty;
function kd(e, t, n, r, o, a) {
  var s = n & Rd, l = Xo(e), i = l.length, u = Xo(t), d = u.length;
  if (i != d && !s)
    return !1;
  for (var f = i; f--; ) {
    var v = l[f];
    if (!(s ? v in t : Nd.call(t, v)))
      return !1;
  }
  var h = a.get(e), c = a.get(t);
  if (h && c)
    return h == t && c == e;
  var p = !0;
  a.set(e, t), a.set(t, e);
  for (var g = s; ++f < i; ) {
    v = l[f];
    var m = e[v], w = t[v];
    if (r)
      var b = s ? r(w, m, v, t, e, a) : r(m, w, v, e, t, a);
    if (!(b === void 0 ? m === w || o(m, w, n, r, a) : b)) {
      p = !1;
      break;
    }
    g || (g = v == "constructor");
  }
  if (p && !g) {
    var y = e.constructor, S = t.constructor;
    y != S && "constructor" in e && "constructor" in t && !(typeof y == "function" && y instanceof y && typeof S == "function" && S instanceof S) && (p = !1);
  }
  return a.delete(e), a.delete(t), p;
}
var Id = 1, aa = "[object Arguments]", la = "[object Array]", On = "[object Object]", Fd = Object.prototype, sa = Fd.hasOwnProperty;
function Md(e, t, n, r, o, a) {
  var s = Ie(e), l = Ie(t), i = s ? la : na(e), u = l ? la : na(t);
  i = i == aa ? On : i, u = u == aa ? On : u;
  var d = i == On, f = u == On, v = i == u;
  if (v && Sr(e)) {
    if (!Sr(t))
      return !1;
    s = !0, d = !1;
  }
  if (v && !d)
    return a || (a = new Qe()), s || hl(e) ? gl(e, t, n, r, o, a) : Ad(e, t, i, n, r, o, a);
  if (!(n & Id)) {
    var h = d && sa.call(e, "__wrapped__"), c = f && sa.call(t, "__wrapped__");
    if (h || c) {
      var p = h ? e.value() : e, g = c ? t.value() : t;
      return a || (a = new Qe()), o(p, g, n, r, a);
    }
  }
  return v ? (a || (a = new Qe()), kd(e, t, n, r, o, a)) : !1;
}
function er(e, t, n, r, o) {
  return e === t ? !0 : e == null || t == null || !Ft(e) && !Ft(t) ? e !== e && t !== t : Md(e, t, n, r, er, o);
}
var Bd = 1, Dd = 2;
function Hd(e, t, n, r) {
  var o = n.length, a = o, s = !r;
  if (e == null)
    return !a;
  for (e = Object(e); o--; ) {
    var l = n[o];
    if (s && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++o < a; ) {
    l = n[o];
    var i = l[0], u = e[i], d = l[1];
    if (s && l[2]) {
      if (u === void 0 && !(i in e))
        return !1;
    } else {
      var f = new Qe();
      if (r)
        var v = r(u, d, i, e, t, f);
      if (!(v === void 0 ? er(d, u, Bd | Dd, r, f) : v))
        return !1;
    }
  }
  return !0;
}
function bl(e) {
  return e === e && !ct(e);
}
function zd(e) {
  for (var t = no(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, bl(o)];
  }
  return t;
}
function yl(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function Wd(e) {
  var t = zd(e);
  return t.length == 1 && t[0][2] ? yl(t[0][0], t[0][1]) : function(n) {
    return n === e || Hd(n, e, t);
  };
}
function jd(e, t) {
  return e != null && t in Object(e);
}
function Kd(e, t, n) {
  t = Qn(t, e);
  for (var r = -1, o = t.length, a = !1; ++r < o; ) {
    var s = hn(t[r]);
    if (!(a = e != null && n(e, s)))
      break;
    e = e[s];
  }
  return a || ++r != o ? a : (o = e == null ? 0 : e.length, !!o && Qr(o) && Jr(s, o) && (Ie(e) || to(e)));
}
function wl(e, t) {
  return e != null && Kd(e, t, jd);
}
var Vd = 1, Ud = 2;
function Gd(e, t) {
  return ro(e) && bl(t) ? yl(hn(e), t) : function(n) {
    var r = un(n, e);
    return r === void 0 && r === t ? wl(n, e) : er(t, r, Vd | Ud);
  };
}
function Yd(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function qd(e) {
  return function(t) {
    return ao(t, e);
  };
}
function Xd(e) {
  return ro(e) ? Yd(hn(e)) : qd(e);
}
function Jd(e) {
  return typeof e == "function" ? e : e == null ? cl : typeof e == "object" ? Ie(e) ? Gd(e[0], e[1]) : Wd(e) : Xd(e);
}
function Zd(e) {
  return function(t, n, r) {
    for (var o = -1, a = Object(t), s = r(t), l = s.length; l--; ) {
      var i = s[e ? l : ++o];
      if (n(a[i], i, a) === !1)
        break;
    }
    return t;
  };
}
var Qd = Zd();
const ef = Qd;
function tf(e, t) {
  return e && ef(e, t, no);
}
function nf(e, t) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!eo(n))
      return e(n, r);
    for (var o = n.length, a = t ? o : -1, s = Object(n); (t ? a-- : ++a < o) && r(s[a], a, s) !== !1; )
      ;
    return n;
  };
}
var rf = nf(tf);
const of = rf;
var af = function() {
  return We.Date.now();
};
const mr = af;
var lf = "Expected a function", sf = Math.max, uf = Math.min;
function Kn(e, t, n) {
  var r, o, a, s, l, i, u = 0, d = !1, f = !1, v = !0;
  if (typeof e != "function")
    throw new TypeError(lf);
  t = Ho(t) || 0, ct(n) && (d = !!n.leading, f = "maxWait" in n, a = f ? sf(Ho(n.maxWait) || 0, t) : a, v = "trailing" in n ? !!n.trailing : v);
  function h(_) {
    var C = r, T = o;
    return r = o = void 0, u = _, s = e.apply(T, C), s;
  }
  function c(_) {
    return u = _, l = setTimeout(m, t), d ? h(_) : s;
  }
  function p(_) {
    var C = _ - i, T = _ - u, $ = t - C;
    return f ? uf($, a - T) : $;
  }
  function g(_) {
    var C = _ - i, T = _ - u;
    return i === void 0 || C >= t || C < 0 || f && T >= a;
  }
  function m() {
    var _ = mr();
    if (g(_))
      return w(_);
    l = setTimeout(m, p(_));
  }
  function w(_) {
    return l = void 0, v && r ? h(_) : (r = o = void 0, s);
  }
  function b() {
    l !== void 0 && clearTimeout(l), u = 0, r = i = o = l = void 0;
  }
  function y() {
    return l === void 0 ? s : w(mr());
  }
  function S() {
    var _ = mr(), C = g(_);
    if (r = arguments, o = this, i = _, C) {
      if (l === void 0)
        return c(i);
      if (f)
        return clearTimeout(l), l = setTimeout(m, t), h(i);
    }
    return l === void 0 && (l = setTimeout(m, t)), s;
  }
  return S.cancel = b, S.flush = y, S;
}
function cf(e, t) {
  var n = -1, r = eo(e) ? Array(e.length) : [];
  return of(e, function(o, a, s) {
    r[++n] = t(o, a, s);
  }), r;
}
function df(e, t) {
  var n = Ie(e) ? il : cf;
  return n(e, Jd(t));
}
function ff(e, t) {
  return lo(df(e, t), 1);
}
function pf(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
function vf(e, t) {
  return er(e, t);
}
function so(e) {
  return e == null;
}
function Cl(e, t, n, r) {
  if (!ct(e))
    return e;
  t = Qn(t, e);
  for (var o = -1, a = t.length, s = a - 1, l = e; l != null && ++o < a; ) {
    var i = hn(t[o]), u = n;
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return e;
    if (o != s) {
      var d = l[i];
      u = r ? r(d, i, l) : void 0, u === void 0 && (u = ct(d) ? d : Jr(t[o + 1]) ? [] : {});
    }
    tu(l, i, u), l = l[i];
  }
  return e;
}
function hf(e, t, n) {
  for (var r = -1, o = t.length, a = {}; ++r < o; ) {
    var s = t[r], l = ao(e, s);
    n(l, s) && Cl(a, Qn(s, e), l);
  }
  return a;
}
function mf(e, t) {
  return hf(e, t, function(n, r) {
    return wl(e, r);
  });
}
var gf = Bc(function(e, t) {
  return e == null ? {} : mf(e, t);
});
const bf = gf;
function yf(e, t, n) {
  return e == null ? e : Cl(e, t, n);
}
const qe = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => (o) => {
  const a = e == null ? void 0 : e(o);
  if (n === !1 || !a)
    return t == null ? void 0 : t(o);
};
var ia;
const de = typeof window < "u", Mt = (e) => typeof e == "boolean", Je = (e) => typeof e == "number", wf = (e) => typeof e == "string", Cf = () => {
};
de && ((ia = window == null ? void 0 : window.navigator) != null && ia.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Ef(e) {
  return typeof e == "function" ? e() : E(e);
}
function Sf(e) {
  return e;
}
function io(e) {
  return Ks() ? (Vs(e), !0) : !1;
}
function _f(e, t = !0) {
  le() ? Te(e) : t ? e() : we(e);
}
function lt(e) {
  var t;
  const n = Ef(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const uo = de ? window : void 0;
function Ze(...e) {
  let t, n, r, o;
  if (wf(e[0]) || Array.isArray(e[0]) ? ([n, r, o] = e, t = uo) : [t, n, r, o] = e, !t)
    return Cf;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const a = [], s = () => {
    a.forEach((d) => d()), a.length = 0;
  }, l = (d, f, v) => (d.addEventListener(f, v, o), () => d.removeEventListener(f, v, o)), i = U(() => lt(t), (d) => {
    s(), d && a.push(...n.flatMap((f) => r.map((v) => l(d, f, v))));
  }, { immediate: !0, flush: "post" }), u = () => {
    i(), s();
  };
  return io(u), u;
}
function xf(e, t, n = {}) {
  const { window: r = uo, ignore: o, capture: a = !0, detectIframe: s = !1 } = n;
  if (!r)
    return;
  let l = !0, i;
  const u = (h) => {
    r.clearTimeout(i);
    const c = lt(e);
    if (!(!c || c === h.target || h.composedPath().includes(c))) {
      if (!l) {
        l = !0;
        return;
      }
      t(h);
    }
  }, d = (h) => o && o.some((c) => {
    const p = lt(c);
    return p && (h.target === p || h.composedPath().includes(p));
  }), f = [
    Ze(r, "click", u, { passive: !0, capture: a }),
    Ze(r, "pointerdown", (h) => {
      const c = lt(e);
      c && (l = !h.composedPath().includes(c) && !d(h));
    }, { passive: !0 }),
    Ze(r, "pointerup", (h) => {
      if (h.button === 0) {
        const c = h.composedPath();
        h.composedPath = () => c, i = r.setTimeout(() => u(h), 50);
      }
    }, { passive: !0 }),
    s && Ze(r, "blur", (h) => {
      var c;
      const p = lt(e);
      ((c = r.document.activeElement) == null ? void 0 : c.tagName) === "IFRAME" && !(p != null && p.contains(r.document.activeElement)) && t(h);
    })
  ].filter(Boolean);
  return () => f.forEach((h) => h());
}
function Tf(e, t = !1) {
  const n = x(), r = () => n.value = Boolean(e());
  return r(), _f(r, t), n;
}
const Or = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, $r = "__vueuse_ssr_handlers__";
Or[$r] = Or[$r] || {};
Or[$r];
var ua = Object.getOwnPropertySymbols, Of = Object.prototype.hasOwnProperty, $f = Object.prototype.propertyIsEnumerable, Pf = (e, t) => {
  var n = {};
  for (var r in e)
    Of.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && ua)
    for (var r of ua(e))
      t.indexOf(r) < 0 && $f.call(e, r) && (n[r] = e[r]);
  return n;
};
function Pr(e, t, n = {}) {
  const r = n, { window: o = uo } = r, a = Pf(r, ["window"]);
  let s;
  const l = Tf(() => o && "ResizeObserver" in o), i = () => {
    s && (s.disconnect(), s = void 0);
  }, u = U(() => lt(e), (f) => {
    i(), l.value && o && f && (s = new ResizeObserver(t), s.observe(f, a));
  }, { immediate: !0, flush: "post" }), d = () => {
    i(), u();
  };
  return io(d), {
    isSupported: l,
    stop: d
  };
}
var ca;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(ca || (ca = {}));
var Af = Object.defineProperty, da = Object.getOwnPropertySymbols, Rf = Object.prototype.hasOwnProperty, Lf = Object.prototype.propertyIsEnumerable, fa = (e, t, n) => t in e ? Af(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Nf = (e, t) => {
  for (var n in t || (t = {}))
    Rf.call(t, n) && fa(e, n, t[n]);
  if (da)
    for (var n of da(t))
      Lf.call(t, n) && fa(e, n, t[n]);
  return e;
};
const kf = {
  easeInSine: [0.12, 0, 0.39, 0],
  easeOutSine: [0.61, 1, 0.88, 1],
  easeInOutSine: [0.37, 0, 0.63, 1],
  easeInQuad: [0.11, 0, 0.5, 0],
  easeOutQuad: [0.5, 1, 0.89, 1],
  easeInOutQuad: [0.45, 0, 0.55, 1],
  easeInCubic: [0.32, 0, 0.67, 0],
  easeOutCubic: [0.33, 1, 0.68, 1],
  easeInOutCubic: [0.65, 0, 0.35, 1],
  easeInQuart: [0.5, 0, 0.75, 0],
  easeOutQuart: [0.25, 1, 0.5, 1],
  easeInOutQuart: [0.76, 0, 0.24, 1],
  easeInQuint: [0.64, 0, 0.78, 0],
  easeOutQuint: [0.22, 1, 0.36, 1],
  easeInOutQuint: [0.83, 0, 0.17, 1],
  easeInExpo: [0.7, 0, 0.84, 0],
  easeOutExpo: [0.16, 1, 0.3, 1],
  easeInOutExpo: [0.87, 0, 0.13, 1],
  easeInCirc: [0.55, 0, 1, 0.45],
  easeOutCirc: [0, 0.55, 0.45, 1],
  easeInOutCirc: [0.85, 0, 0.15, 1],
  easeInBack: [0.36, 0, 0.66, -0.56],
  easeOutBack: [0.34, 1.56, 0.64, 1],
  easeInOutBack: [0.68, -0.6, 0.32, 1.6]
};
Nf({
  linear: Sf
}, kf);
process.env.NODE_ENV !== "production" && Object.freeze({});
process.env.NODE_ENV !== "production" && Object.freeze([]);
const Vn = () => {
}, If = Object.prototype.hasOwnProperty, Ct = (e, t) => If.call(e, t), Et = Array.isArray, $n = (e) => typeof e == "function", St = (e) => typeof e == "string", mn = (e) => e !== null && typeof e == "object", Ff = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Mf = /-(\w)/g, Bf = Ff((e) => e.replace(Mf, (t, n) => n ? n.toUpperCase() : "")), Un = (e) => e === void 0, cn = (e) => typeof Element > "u" ? !1 : e instanceof Element, Df = (e) => St(e) ? !Number.isNaN(Number(e)) : !1, Hf = (e, t, n) => ({
  get value() {
    return un(e, t, n);
  },
  set value(r) {
    yf(e, t, r);
  }
});
class El extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function Sl(e, t) {
  throw new El(`[${e}] ${t}`);
}
function et(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const n = St(e) ? new El(`[${e}] ${t}`) : e;
    console.warn(n);
  }
}
const zf = "utils/dom/style", _l = (e = "") => e.split(" ").filter((t) => !!t.trim()), kn = (e, t) => {
  if (!e || !t)
    return !1;
  if (t.includes(" "))
    throw new Error("className should not contain space.");
  return e.classList.contains(t);
}, xl = (e, t) => {
  !e || !t.trim() || e.classList.add(..._l(t));
}, Ar = (e, t) => {
  !e || !t.trim() || e.classList.remove(..._l(t));
}, pa = (e, t) => {
  var n;
  if (!de || !e || !t)
    return "";
  let r = Bf(t);
  r === "float" && (r = "cssFloat");
  try {
    const o = e.style[r];
    if (o)
      return o;
    const a = (n = document.defaultView) == null ? void 0 : n.getComputedStyle(e, "");
    return a ? a[r] : "";
  } catch {
    return e.style[r];
  }
};
function Rr(e, t = "px") {
  if (!e)
    return "";
  if (Je(e) || Df(e))
    return `${e}${t}`;
  if (St(e))
    return e;
  et(zf, "binding value must be a string or number");
}
var tr = (e, t) => {
  let n = e.__vccOpts || e;
  for (let [r, o] of t)
    n[r] = o;
  return n;
}, Wf = {
  name: "ArrowDown"
}, jf = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Kf = /* @__PURE__ */ ie("path", {
  fill: "currentColor",
  d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1), Vf = [
  Kf
];
function Uf(e, t, n, r, o, a) {
  return k(), W("svg", jf, Vf);
}
var Gf = /* @__PURE__ */ tr(Wf, [["render", Uf], ["__file", "arrow-down.vue"]]), Yf = {
  name: "ArrowRight"
}, qf = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, Xf = /* @__PURE__ */ ie("path", {
  fill: "currentColor",
  d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
}, null, -1), Jf = [
  Xf
];
function Zf(e, t, n, r, o, a) {
  return k(), W("svg", qf, Jf);
}
var Tl = /* @__PURE__ */ tr(Yf, [["render", Zf], ["__file", "arrow-right.vue"]]), Qf = {
  name: "ArrowUp"
}, ep = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, tp = /* @__PURE__ */ ie("path", {
  fill: "currentColor",
  d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
}, null, -1), np = [
  tp
];
function rp(e, t, n, r, o, a) {
  return k(), W("svg", ep, np);
}
var op = /* @__PURE__ */ tr(Qf, [["render", rp], ["__file", "arrow-up.vue"]]), ap = {
  name: "Loading"
}, lp = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, sp = /* @__PURE__ */ ie("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
}, null, -1), ip = [
  sp
];
function up(e, t, n, r, o, a) {
  return k(), W("svg", lp, ip);
}
var cp = /* @__PURE__ */ tr(ap, [["render", up], ["__file", "loading.vue"]]);
const Ol = "__epPropKey", re = (e) => e, dp = (e) => mn(e) && !!e[Ol], nr = (e, t) => {
  if (!mn(e) || dp(e))
    return e;
  const { values: n, required: r, default: o, type: a, validator: s } = e, i = {
    type: a,
    required: !!r,
    validator: n || s ? (u) => {
      let d = !1, f = [];
      if (n && (f = Array.from(n), Ct(e, "default") && f.push(o), d || (d = f.includes(u))), s && (d || (d = s(u))), !d && f.length > 0) {
        const v = [...new Set(f)].map((h) => JSON.stringify(h)).join(", ");
        Us(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${v}], got value ${JSON.stringify(u)}.`);
      }
      return d;
    } : void 0,
    [Ol]: !0
  };
  return Ct(e, "default") && (i.default = o), i;
}, Oe = (e) => pf(Object.entries(e).map(([t, n]) => [
  t,
  nr(n, t)
])), Ut = (e, t) => {
  if (e.install = (n) => {
    for (const r of [e, ...Object.values(t ?? {})])
      n.component(r.name, r);
  }, t)
    for (const [n, r] of Object.entries(t))
      e[n] = r;
  return e;
}, co = (e) => (e.install = Vn, e), Gn = {
  tab: "Tab",
  enter: "Enter",
  space: "Space",
  left: "ArrowLeft",
  up: "ArrowUp",
  right: "ArrowRight",
  down: "ArrowDown",
  esc: "Escape",
  delete: "Delete",
  backspace: "Backspace",
  numpadEnter: "NumpadEnter",
  pageUp: "PageUp",
  pageDown: "PageDown",
  home: "Home",
  end: "End"
}, rr = "update:modelValue", fp = ["", "default", "small", "large"], Gt = Symbol("checkboxGroupContextKey"), pp = Symbol(), fo = Symbol("formContextKey"), Yn = Symbol("formItemContextKey"), $l = Symbol("scrollbarContextKey"), po = Symbol("popper"), Pl = Symbol("popperContent"), vo = Symbol("elTooltip"), Al = (e) => {
  const t = le();
  return A(() => {
    var n, r;
    return (r = ((n = t.proxy) == null ? void 0 : n.$props)[e]) != null ? r : void 0;
  });
}, va = x();
function Yt(e, t = void 0) {
  const n = le() ? X(pp, va) : va;
  return e ? A(() => {
    var r, o;
    return (o = (r = n.value) == null ? void 0 : r[e]) != null ? o : t;
  }) : n;
}
const Rl = nr({
  type: String,
  values: fp,
  required: !1
}), Lr = (e, t = {}) => {
  const n = x(void 0), r = t.prop ? n : Al("size"), o = t.global ? n : Yt("size"), a = t.form ? { size: void 0 } : X(fo, void 0), s = t.formItem ? { size: void 0 } : X(Yn, void 0);
  return A(() => r.value || E(e) || (s == null ? void 0 : s.size) || (a == null ? void 0 : a.size) || o.value || "");
}, vp = (e) => {
  const t = Al("disabled"), n = X(fo, void 0);
  return A(() => t.value || E(e) || (n == null ? void 0 : n.disabled) || !1);
}, ho = "el", hp = "is-", pt = (e, t, n, r, o) => {
  let a = `${e}-${t}`;
  return n && (a += `-${n}`), r && (a += `__${r}`), o && (a += `--${o}`), a;
}, se = (e) => {
  const t = Yt("namespace", ho);
  return {
    namespace: t,
    b: (c = "") => pt(t.value, e, c, "", ""),
    e: (c) => c ? pt(t.value, e, "", c, "") : "",
    m: (c) => c ? pt(t.value, e, "", "", c) : "",
    be: (c, p) => c && p ? pt(t.value, e, c, p, "") : "",
    em: (c, p) => c && p ? pt(t.value, e, "", c, p) : "",
    bm: (c, p) => c && p ? pt(t.value, e, c, "", p) : "",
    bem: (c, p, g) => c && p && g ? pt(t.value, e, c, p, g) : "",
    is: (c, ...p) => {
      const g = p.length >= 1 ? p[0] : !0;
      return c && g ? `${hp}${c}` : "";
    },
    cssVar: (c) => {
      const p = {};
      for (const g in c)
        c[g] && (p[`--${t.value}-${g}`] = c[g]);
      return p;
    },
    cssVarName: (c) => `--${t.value}-${c}`,
    cssVarBlock: (c) => {
      const p = {};
      for (const g in c)
        c[g] && (p[`--${t.value}-${e}-${g}`] = c[g]);
      return p;
    },
    cssVarBlockName: (c) => `--${t.value}-${e}-${c}`
  };
}, Nr = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, mp = Symbol("elIdInjection"), Ll = () => le() ? X(mp, Nr) : Nr, Nl = (e) => {
  const t = Ll();
  !de && t === Nr && et("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const n = Yt("namespace", ho);
  return A(() => E(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
}, mo = () => {
  const e = X(fo, void 0), t = X(Yn, void 0);
  return {
    form: e,
    formItem: t
  };
}, kl = (e, {
  formItemContext: t,
  disableIdGeneration: n,
  disableIdManagement: r
}) => {
  n || (n = x(!1)), r || (r = x(!1));
  const o = x();
  let a;
  const s = A(() => {
    var l;
    return !!(!e.label && t && t.inputIds && ((l = t.inputIds) == null ? void 0 : l.length) <= 1);
  });
  return Te(() => {
    a = U([gt(e, "id"), n], ([l, i]) => {
      const u = l ?? (i ? void 0 : Nl().value);
      u !== o.value && (t != null && t.removeInputId && (o.value && t.removeInputId(o.value), !(r != null && r.value) && !i && u && t.addInputId(u)), o.value = u);
    }, { immediate: !0 });
  }), Gr(() => {
    a && a(), t != null && t.removeInputId && o.value && t.removeInputId(o.value);
  }), {
    isLabeledByFormItem: s,
    inputId: o
  };
};
var gp = {
  name: "en",
  el: {
    colorpicker: {
      confirm: "OK",
      clear: "Clear",
      defaultLabel: "color picker",
      description: "current color is {color}. press enter to select a new color."
    },
    datepicker: {
      now: "Now",
      today: "Today",
      cancel: "Cancel",
      clear: "Clear",
      confirm: "OK",
      dateTablePrompt: "Use the arrow keys and enter to select the day of the month",
      monthTablePrompt: "Use the arrow keys and enter to select the month",
      yearTablePrompt: "Use the arrow keys and enter to select the year",
      selectedDate: "Selected date",
      selectDate: "Select date",
      selectTime: "Select time",
      startDate: "Start Date",
      startTime: "Start Time",
      endDate: "End Date",
      endTime: "End Time",
      prevYear: "Previous Year",
      nextYear: "Next Year",
      prevMonth: "Previous Month",
      nextMonth: "Next Month",
      year: "",
      month1: "January",
      month2: "February",
      month3: "March",
      month4: "April",
      month5: "May",
      month6: "June",
      month7: "July",
      month8: "August",
      month9: "September",
      month10: "October",
      month11: "November",
      month12: "December",
      week: "week",
      weeks: {
        sun: "Sun",
        mon: "Mon",
        tue: "Tue",
        wed: "Wed",
        thu: "Thu",
        fri: "Fri",
        sat: "Sat"
      },
      weeksFull: {
        sun: "Sunday",
        mon: "Monday",
        tue: "Tuesday",
        wed: "Wednesday",
        thu: "Thursday",
        fri: "Friday",
        sat: "Saturday"
      },
      months: {
        jan: "Jan",
        feb: "Feb",
        mar: "Mar",
        apr: "Apr",
        may: "May",
        jun: "Jun",
        jul: "Jul",
        aug: "Aug",
        sep: "Sep",
        oct: "Oct",
        nov: "Nov",
        dec: "Dec"
      }
    },
    inputNumber: {
      decrease: "decrease number",
      increase: "increase number"
    },
    select: {
      loading: "Loading",
      noMatch: "No matching data",
      noData: "No data",
      placeholder: "Select"
    },
    dropdown: {
      toggleDropdown: "Toggle Dropdown"
    },
    cascader: {
      noMatch: "No matching data",
      loading: "Loading",
      placeholder: "Select",
      noData: "No data"
    },
    pagination: {
      goto: "Go to",
      pagesize: "/page",
      total: "Total {total}",
      pageClassifier: "",
      deprecationWarning: "Deprecated usages detected, please refer to the el-pagination documentation for more details"
    },
    dialog: {
      close: "Close this dialog"
    },
    drawer: {
      close: "Close this dialog"
    },
    messagebox: {
      title: "Message",
      confirm: "OK",
      cancel: "Cancel",
      error: "Illegal input",
      close: "Close this dialog"
    },
    upload: {
      deleteTip: "press delete to remove",
      delete: "Delete",
      preview: "Preview",
      continue: "Continue"
    },
    slider: {
      defaultLabel: "slider between {min} and {max}",
      defaultRangeStartLabel: "pick start value",
      defaultRangeEndLabel: "pick end value"
    },
    table: {
      emptyText: "No Data",
      confirmFilter: "Confirm",
      resetFilter: "Reset",
      clearFilter: "All",
      sumText: "Sum"
    },
    tree: {
      emptyText: "No Data"
    },
    transfer: {
      noMatch: "No matching data",
      noData: "No data",
      titles: ["List 1", "List 2"],
      filterPlaceholder: "Enter keyword",
      noCheckedFormat: "{total} items",
      hasCheckedFormat: "{checked}/{total} checked"
    },
    image: {
      error: "FAILED"
    },
    pageHeader: {
      title: "Back"
    },
    popconfirm: {
      confirmButtonText: "Yes",
      cancelButtonText: "No"
    }
  }
};
const bp = (e) => (t, n) => yp(t, n, E(e)), yp = (e, t, n) => un(n, e, e).replace(/\{(\w+)\}/g, (r, o) => {
  var a;
  return `${(a = t == null ? void 0 : t[o]) != null ? a : `{${o}}`}`;
}), wp = (e) => {
  const t = A(() => E(e).name), n = kt(e) ? e : x(e);
  return {
    lang: t,
    locale: n,
    t: bp(e)
  };
}, Il = () => {
  const e = Yt("locale");
  return wp(A(() => e.value || gp));
}, Cp = nr({
  type: re(Boolean),
  default: null
}), Ep = nr({
  type: re(Function)
}), Sp = (e) => {
  const t = `update:${e}`, n = `onUpdate:${e}`, r = [t], o = {
    [e]: Cp,
    [n]: Ep
  };
  return {
    useModelToggle: ({
      indicator: s,
      toggleReason: l,
      shouldHideWhenRouteChanges: i,
      shouldProceed: u,
      onShow: d,
      onHide: f
    }) => {
      const v = le(), { emit: h } = v, c = v.props, p = A(() => $n(c[n])), g = A(() => c[e] === null), m = (C) => {
        s.value !== !0 && (s.value = !0, l && (l.value = C), $n(d) && d(C));
      }, w = (C) => {
        s.value !== !1 && (s.value = !1, l && (l.value = C), $n(f) && f(C));
      }, b = (C) => {
        if (c.disabled === !0 || $n(u) && !u())
          return;
        const T = p.value && de;
        T && h(t, !0), (g.value || !T) && m(C);
      }, y = (C) => {
        if (c.disabled === !0 || !de)
          return;
        const T = p.value && de;
        T && h(t, !1), (g.value || !T) && w(C);
      }, S = (C) => {
        Mt(C) && (c.disabled && C ? p.value && h(t, !1) : s.value !== C && (C ? m() : w()));
      }, _ = () => {
        s.value ? y() : b();
      };
      return U(() => c[e], S), i && v.appContext.config.globalProperties.$route !== void 0 && U(() => ({
        ...v.proxy.$route
      }), () => {
        i.value && s.value && y();
      }), Te(() => {
        S(c[e]);
      }), {
        hide: y,
        show: b,
        toggle: _,
        hasUpdateHandler: p
      };
    },
    useModelToggleProps: o,
    useModelToggleEmits: r
  };
};
function _p() {
  let e;
  const t = (r, o) => {
    n(), e = window.setTimeout(r, o);
  }, n = () => window.clearTimeout(e);
  return io(() => n()), {
    registerTimeout: t,
    cancelTimeout: n
  };
}
let Lt = [];
const ha = (e) => {
  const t = e;
  t.key === Gn.esc && Lt.forEach((n) => n(t));
}, xp = (e) => {
  Te(() => {
    Lt.length === 0 && document.addEventListener("keydown", ha), de && Lt.push(e);
  }), ze(() => {
    Lt = Lt.filter((t) => t !== e), Lt.length === 0 && de && document.removeEventListener("keydown", ha);
  });
};
let ma;
const Fl = () => {
  const e = Yt("namespace", ho), t = Ll(), n = A(() => `${e.value}-popper-container-${t.prefix}`), r = A(() => `#${n.value}`);
  return {
    id: n,
    selector: r
  };
}, Tp = (e) => {
  const t = document.createElement("div");
  return t.id = e, document.body.appendChild(t), t;
}, Op = () => {
  Yr(() => {
    if (!de)
      return;
    const { id: e, selector: t } = Fl();
    (process.env.NODE_ENV === "test" || !ma && !document.body.querySelector(t.value)) && (ma = Tp(e.value));
  });
}, $p = Oe({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  }
}), Pp = ({
  showAfter: e,
  hideAfter: t,
  open: n,
  close: r
}) => {
  const { registerTimeout: o } = _p();
  return {
    onOpen: (l) => {
      o(() => {
        n(l);
      }, E(e));
    },
    onClose: (l) => {
      o(() => {
        r(l);
      }, E(t));
    }
  };
}, Ml = Symbol("elForwardRef"), Ap = (e) => {
  Be(Ml, {
    setForwardRef: (n) => {
      e.value = n;
    }
  });
}, Rp = (e) => ({
  mounted(t) {
    e(t);
  },
  updated(t) {
    e(t);
  },
  unmounted() {
    e(null);
  }
}), ga = x(0), Bl = () => {
  const e = Yt("zIndex", 2e3), t = A(() => e.value + ga.value);
  return {
    initialZIndex: e,
    currentZIndex: t,
    nextZIndex: () => (ga.value++, t.value)
  };
};
var he = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
};
const Lp = Oe({
  size: {
    type: re([Number, String])
  },
  color: {
    type: String
  }
}), Np = j({
  name: "ElIcon",
  inheritAttrs: !1
}), kp = /* @__PURE__ */ j({
  ...Np,
  props: Lp,
  setup(e) {
    const t = e, n = se("icon"), r = A(() => {
      const { size: o, color: a } = t;
      return !o && !a ? {} : {
        fontSize: Un(o) ? void 0 : Rr(o),
        "--color": a
      };
    });
    return (o, a) => (k(), W("i", It({
      class: E(n).b(),
      style: E(r)
    }, o.$attrs), [
      be(o.$slots, "default")
    ], 16));
  }
});
var Ip = /* @__PURE__ */ he(kp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const go = Ut(Ip), Nt = 4, Fp = {
  vertical: {
    offset: "offsetHeight",
    scroll: "scrollTop",
    scrollSize: "scrollHeight",
    size: "height",
    key: "vertical",
    axis: "Y",
    client: "clientY",
    direction: "top"
  },
  horizontal: {
    offset: "offsetWidth",
    scroll: "scrollLeft",
    scrollSize: "scrollWidth",
    size: "width",
    key: "horizontal",
    axis: "X",
    client: "clientX",
    direction: "left"
  }
}, Mp = ({
  move: e,
  size: t,
  bar: n
}) => ({
  [n.size]: t,
  transform: `translate${n.axis}(${e}%)`
}), Bp = Oe({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), Dp = "Thumb", Hp = /* @__PURE__ */ j({
  __name: "thumb",
  props: Bp,
  setup(e) {
    const t = e, n = X($l), r = se("scrollbar");
    n || Sl(Dp, "can not inject scrollbar context");
    const o = x(), a = x(), s = x({}), l = x(!1);
    let i = !1, u = !1, d = de ? document.onselectstart : null;
    const f = A(() => Fp[t.vertical ? "vertical" : "horizontal"]), v = A(() => Mp({
      size: t.size,
      move: t.move,
      bar: f.value
    })), h = A(() => o.value[f.value.offset] ** 2 / n.wrapElement[f.value.scrollSize] / t.ratio / a.value[f.value.offset]), c = (_) => {
      var C;
      if (_.stopPropagation(), _.ctrlKey || [1, 2].includes(_.button))
        return;
      (C = window.getSelection()) == null || C.removeAllRanges(), g(_);
      const T = _.currentTarget;
      T && (s.value[f.value.axis] = T[f.value.offset] - (_[f.value.client] - T.getBoundingClientRect()[f.value.direction]));
    }, p = (_) => {
      if (!a.value || !o.value || !n.wrapElement)
        return;
      const C = Math.abs(_.target.getBoundingClientRect()[f.value.direction] - _[f.value.client]), T = a.value[f.value.offset] / 2, $ = (C - T) * 100 * h.value / o.value[f.value.offset];
      n.wrapElement[f.value.scroll] = $ * n.wrapElement[f.value.scrollSize] / 100;
    }, g = (_) => {
      _.stopImmediatePropagation(), i = !0, document.addEventListener("mousemove", m), document.addEventListener("mouseup", w), d = document.onselectstart, document.onselectstart = () => !1;
    }, m = (_) => {
      if (!o.value || !a.value || i === !1)
        return;
      const C = s.value[f.value.axis];
      if (!C)
        return;
      const T = (o.value.getBoundingClientRect()[f.value.direction] - _[f.value.client]) * -1, $ = a.value[f.value.offset] - C, M = (T - $) * 100 * h.value / o.value[f.value.offset];
      n.wrapElement[f.value.scroll] = M * n.wrapElement[f.value.scrollSize] / 100;
    }, w = () => {
      i = !1, s.value[f.value.axis] = 0, document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", w), S(), u && (l.value = !1);
    }, b = () => {
      u = !1, l.value = !!t.size;
    }, y = () => {
      u = !0, l.value = i;
    };
    ze(() => {
      S(), document.removeEventListener("mouseup", w);
    });
    const S = () => {
      document.onselectstart !== d && (document.onselectstart = d);
    };
    return Ze(gt(n, "scrollbarElement"), "mousemove", b), Ze(gt(n, "scrollbarElement"), "mouseleave", y), (_, C) => (k(), ve(qr, {
      name: E(r).b("fade"),
      persisted: ""
    }, {
      default: ue(() => [
        ye(ie("div", {
          ref_key: "instance",
          ref: o,
          class: V([E(r).e("bar"), E(r).is(E(f).key)]),
          onMousedown: p
        }, [
          ie("div", {
            ref_key: "thumb",
            ref: a,
            class: V(E(r).e("thumb")),
            style: ke(E(v)),
            onMousedown: c
          }, null, 38)
        ], 34), [
          [Hn, _.always || l.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var ba = /* @__PURE__ */ he(Hp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const zp = Oe({
  always: {
    type: Boolean,
    default: !0
  },
  width: String,
  height: String,
  ratioX: {
    type: Number,
    default: 1
  },
  ratioY: {
    type: Number,
    default: 1
  }
}), Wp = /* @__PURE__ */ j({
  __name: "bar",
  props: zp,
  setup(e, { expose: t }) {
    const n = e, r = x(0), o = x(0);
    return t({
      handleScroll: (s) => {
        if (s) {
          const l = s.offsetHeight - Nt, i = s.offsetWidth - Nt;
          o.value = s.scrollTop * 100 / l * n.ratioY, r.value = s.scrollLeft * 100 / i * n.ratioX;
        }
      }
    }), (s, l) => (k(), W(yt, null, [
      N(ba, {
        move: r.value,
        ratio: s.ratioX,
        size: s.width,
        always: s.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      N(ba, {
        move: o.value,
        ratio: s.ratioY,
        size: s.height,
        vertical: "",
        always: s.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var jp = /* @__PURE__ */ he(Wp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const Kp = Oe({
  height: {
    type: [String, Number],
    default: ""
  },
  maxHeight: {
    type: [String, Number],
    default: ""
  },
  native: {
    type: Boolean,
    default: !1
  },
  wrapStyle: {
    type: re([String, Object, Array]),
    default: ""
  },
  wrapClass: {
    type: [String, Array],
    default: ""
  },
  viewClass: {
    type: [String, Array],
    default: ""
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ""
  },
  noresize: Boolean,
  tag: {
    type: String,
    default: "div"
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  }
}), Vp = {
  scroll: ({
    scrollTop: e,
    scrollLeft: t
  }) => [e, t].every(Je)
}, kr = "ElScrollbar", Up = j({
  name: kr
}), Gp = /* @__PURE__ */ j({
  ...Up,
  props: Kp,
  emits: Vp,
  setup(e, { expose: t, emit: n }) {
    const r = e, o = se("scrollbar");
    let a, s;
    const l = x(), i = x(), u = x(), d = x("0"), f = x("0"), v = x(), h = x(1), c = x(1), p = A(() => {
      const C = {};
      return r.height && (C.height = Rr(r.height)), r.maxHeight && (C.maxHeight = Rr(r.maxHeight)), [r.wrapStyle, C];
    }), g = A(() => [
      r.wrapClass,
      o.e("wrap"),
      { [o.em("wrap", "hidden-default")]: !r.native }
    ]), m = A(() => [o.e("view"), r.viewClass]), w = () => {
      var C;
      i.value && ((C = v.value) == null || C.handleScroll(i.value), n("scroll", {
        scrollTop: i.value.scrollTop,
        scrollLeft: i.value.scrollLeft
      }));
    };
    function b(C, T) {
      mn(C) ? i.value.scrollTo(C) : Je(C) && Je(T) && i.value.scrollTo(C, T);
    }
    const y = (C) => {
      if (!Je(C)) {
        et(kr, "value must be a number");
        return;
      }
      i.value.scrollTop = C;
    }, S = (C) => {
      if (!Je(C)) {
        et(kr, "value must be a number");
        return;
      }
      i.value.scrollLeft = C;
    }, _ = () => {
      if (!i.value)
        return;
      const C = i.value.offsetHeight - Nt, T = i.value.offsetWidth - Nt, $ = C ** 2 / i.value.scrollHeight, M = T ** 2 / i.value.scrollWidth, D = Math.max($, r.minSize), L = Math.max(M, r.minSize);
      h.value = $ / (C - $) / (D / (C - D)), c.value = M / (T - M) / (L / (T - L)), f.value = D + Nt < C ? `${D}px` : "", d.value = L + Nt < T ? `${L}px` : "";
    };
    return U(() => r.noresize, (C) => {
      C ? (a == null || a(), s == null || s()) : ({ stop: a } = Pr(u, _), s = Ze("resize", _));
    }, { immediate: !0 }), U(() => [r.maxHeight, r.height], () => {
      r.native || we(() => {
        var C;
        _(), i.value && ((C = v.value) == null || C.handleScroll(i.value));
      });
    }), Be($l, tl({
      scrollbarElement: l,
      wrapElement: i
    })), Te(() => {
      r.native || we(() => {
        _();
      });
    }), nl(() => _()), t({
      wrapRef: i,
      update: _,
      scrollTo: b,
      setScrollTop: y,
      setScrollLeft: S,
      handleScroll: w
    }), (C, T) => (k(), W("div", {
      ref_key: "scrollbarRef",
      ref: l,
      class: V(E(o).b())
    }, [
      ie("div", {
        ref_key: "wrapRef",
        ref: i,
        class: V(E(g)),
        style: ke(E(p)),
        onScroll: w
      }, [
        (k(), ve(Xr(C.tag), {
          ref_key: "resizeRef",
          ref: u,
          class: V(E(m)),
          style: ke(C.viewStyle)
        }, {
          default: ue(() => [
            be(C.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      C.native ? Ee("v-if", !0) : (k(), ve(jp, {
        key: 0,
        ref_key: "barRef",
        ref: v,
        height: f.value,
        width: d.value,
        always: C.always,
        "ratio-x": c.value,
        "ratio-y": h.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var Yp = /* @__PURE__ */ he(Gp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const Dl = Ut(Yp), qp = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], Hl = Oe({
  role: {
    type: String,
    values: qp,
    default: "tooltip"
  }
}), Xp = j({
  name: "ElPopperRoot",
  inheritAttrs: !1
}), Jp = /* @__PURE__ */ j({
  ...Xp,
  props: Hl,
  setup(e, { expose: t }) {
    const n = e, r = x(), o = x(), a = x(), s = x(), l = A(() => n.role), i = {
      triggerRef: r,
      popperInstanceRef: o,
      contentRef: a,
      referenceRef: s,
      role: l
    };
    return t(i), Be(po, i), (u, d) => be(u.$slots, "default");
  }
});
var Zp = /* @__PURE__ */ he(Jp, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const zl = Oe({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), Qp = j({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), ev = /* @__PURE__ */ j({
  ...Qp,
  props: zl,
  setup(e, { expose: t }) {
    const n = e, r = se("popper"), { arrowOffset: o, arrowRef: a } = X(Pl, void 0);
    return U(() => n.arrowOffset, (s) => {
      o.value = s;
    }), ze(() => {
      a.value = void 0;
    }), t({
      arrowRef: a
    }), (s, l) => (k(), W("span", {
      ref_key: "arrowRef",
      ref: a,
      class: V(E(r).e("arrow")),
      "data-popper-arrow": ""
    }, null, 2));
  }
});
var tv = /* @__PURE__ */ he(ev, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const gr = "ElOnlyChild", nv = j({
  name: gr,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    var r;
    const o = X(Ml), a = Rp((r = o == null ? void 0 : o.setForwardRef) != null ? r : Vn);
    return () => {
      var s;
      const l = (s = t.default) == null ? void 0 : s.call(t, n);
      if (!l)
        return null;
      if (l.length > 1)
        return et(gr, "requires exact only one valid child."), null;
      const i = Wl(l);
      return i ? ye(Gs(i, n), [[a]]) : (et(gr, "no valid child node found"), null);
    };
  }
});
function Wl(e) {
  if (!e)
    return null;
  const t = e;
  for (const n of t) {
    if (mn(n))
      switch (n.type) {
        case rl:
          continue;
        case Ys:
        case "svg":
          return ya(n);
        case yt:
          return Wl(n.children);
        default:
          return n;
      }
    return ya(n);
  }
  return null;
}
function ya(e) {
  const t = se("only-child");
  return N("span", {
    class: t.e("content")
  }, [e]);
}
const jl = Oe({
  virtualRef: {
    type: re(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: re(Function)
  },
  onMouseleave: {
    type: re(Function)
  },
  onClick: {
    type: re(Function)
  },
  onKeydown: {
    type: re(Function)
  },
  onFocus: {
    type: re(Function)
  },
  onBlur: {
    type: re(Function)
  },
  onContextmenu: {
    type: re(Function)
  },
  id: String,
  open: Boolean
}), rv = j({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), ov = /* @__PURE__ */ j({
  ...rv,
  props: jl,
  setup(e, { expose: t }) {
    const n = e, { role: r, triggerRef: o } = X(po, void 0);
    Ap(o);
    const a = A(() => l.value ? n.id : void 0), s = A(() => {
      if (r && r.value === "tooltip")
        return n.open && n.id ? n.id : void 0;
    }), l = A(() => {
      if (r && r.value !== "tooltip")
        return r.value;
    }), i = A(() => l.value ? `${n.open}` : void 0);
    let u;
    return Te(() => {
      U(() => n.virtualRef, (d) => {
        d && (o.value = lt(d));
      }, {
        immediate: !0
      }), U(o, (d, f) => {
        u == null || u(), u = void 0, cn(d) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((v) => {
          var h;
          const c = n[v];
          c && (d.addEventListener(v.slice(2).toLowerCase(), c), (h = f == null ? void 0 : f.removeEventListener) == null || h.call(f, v.slice(2).toLowerCase(), c));
        }), u = U([a, s, l, i], (v) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((h, c) => {
            so(v[c]) ? d.removeAttribute(h) : d.setAttribute(h, v[c]);
          });
        }, { immediate: !0 })), cn(f) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((v) => f.removeAttribute(v));
      }, {
        immediate: !0
      });
    }), ze(() => {
      u == null || u(), u = void 0;
    }), t({
      triggerRef: o
    }), (d, f) => d.virtualTriggering ? Ee("v-if", !0) : (k(), ve(E(nv), It({ key: 0 }, d.$attrs, {
      "aria-controls": E(a),
      "aria-describedby": E(s),
      "aria-expanded": E(i),
      "aria-haspopup": E(l)
    }), {
      default: ue(() => [
        be(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var av = /* @__PURE__ */ he(ov, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]), _e = "top", Le = "bottom", Ne = "right", xe = "left", bo = "auto", gn = [_e, Le, Ne, xe], Bt = "start", dn = "end", lv = "clippingParents", Kl = "viewport", en = "popper", sv = "reference", wa = gn.reduce(function(e, t) {
  return e.concat([t + "-" + Bt, t + "-" + dn]);
}, []), yo = [].concat(gn, [bo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Bt, t + "-" + dn]);
}, []), iv = "beforeRead", uv = "read", cv = "afterRead", dv = "beforeMain", fv = "main", pv = "afterMain", vv = "beforeWrite", hv = "write", mv = "afterWrite", gv = [iv, uv, cv, dv, fv, pv, vv, hv, mv];
function He(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Fe(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Dt(e) {
  var t = Fe(e).Element;
  return e instanceof t || e instanceof Element;
}
function Re(e) {
  var t = Fe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function wo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Fe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function bv(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Re(a) || !He(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function yv(e) {
  var t = e.state, n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], a = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(i, u) {
        return i[u] = "", i;
      }, {});
      !Re(o) || !He(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(i) {
        o.removeAttribute(i);
      }));
    });
  };
}
var Vl = { name: "applyStyles", enabled: !0, phase: "write", fn: bv, effect: yv, requires: ["computeStyles"] };
function Me(e) {
  return e.split("-")[0];
}
var bt = Math.max, qn = Math.min, Ht = Math.round;
function zt(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, o = 1;
  if (Re(e) && t) {
    var a = e.offsetHeight, s = e.offsetWidth;
    s > 0 && (r = Ht(n.width) / s || 1), a > 0 && (o = Ht(n.height) / a || 1);
  }
  return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
}
function Co(e) {
  var t = zt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: r };
}
function Ul(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && wo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function tt(e) {
  return Fe(e).getComputedStyle(e);
}
function wv(e) {
  return ["table", "td", "th"].indexOf(He(e)) >= 0;
}
function ft(e) {
  return ((Dt(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function or(e) {
  return He(e) === "html" ? e : e.assignedSlot || e.parentNode || (wo(e) ? e.host : null) || ft(e);
}
function Ca(e) {
  return !Re(e) || tt(e).position === "fixed" ? null : e.offsetParent;
}
function Cv(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && Re(e)) {
    var r = tt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = or(e);
  for (wo(o) && (o = o.host); Re(o) && ["html", "body"].indexOf(He(o)) < 0; ) {
    var a = tt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function bn(e) {
  for (var t = Fe(e), n = Ca(e); n && wv(n) && tt(n).position === "static"; )
    n = Ca(n);
  return n && (He(n) === "html" || He(n) === "body" && tt(n).position === "static") ? t : n || Cv(e) || t;
}
function Eo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function nn(e, t, n) {
  return bt(e, qn(t, n));
}
function Ev(e, t, n) {
  var r = nn(e, t, n);
  return r > n ? n : r;
}
function Gl() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function Yl(e) {
  return Object.assign({}, Gl(), e);
}
function ql(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Sv = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, Yl(typeof e != "number" ? e : ql(e, gn));
};
function _v(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Me(n.placement), i = Eo(l), u = [xe, Ne].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!a || !s)) {
    var f = Sv(o.padding, n), v = Co(a), h = i === "y" ? _e : xe, c = i === "y" ? Le : Ne, p = n.rects.reference[d] + n.rects.reference[i] - s[i] - n.rects.popper[d], g = s[i] - n.rects.reference[i], m = bn(a), w = m ? i === "y" ? m.clientHeight || 0 : m.clientWidth || 0 : 0, b = p / 2 - g / 2, y = f[h], S = w - v[d] - f[c], _ = w / 2 - v[d] / 2 + b, C = nn(y, _, S), T = i;
    n.modifiersData[r] = (t = {}, t[T] = C, t.centerOffset = C - _, t);
  }
}
function xv(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || !Ul(t.elements.popper, o) || (t.elements.arrow = o));
}
var Tv = { name: "arrow", enabled: !0, phase: "main", fn: _v, effect: xv, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function Wt(e) {
  return e.split("-")[1];
}
var Ov = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function $v(e) {
  var t = e.x, n = e.y, r = window, o = r.devicePixelRatio || 1;
  return { x: Ht(t * o) / o || 0, y: Ht(n * o) / o || 0 };
}
function Ea(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, l = e.position, i = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, v = s.x, h = v === void 0 ? 0 : v, c = s.y, p = c === void 0 ? 0 : c, g = typeof d == "function" ? d({ x: h, y: p }) : { x: h, y: p };
  h = g.x, p = g.y;
  var m = s.hasOwnProperty("x"), w = s.hasOwnProperty("y"), b = xe, y = _e, S = window;
  if (u) {
    var _ = bn(n), C = "clientHeight", T = "clientWidth";
    if (_ === Fe(n) && (_ = ft(n), tt(_).position !== "static" && l === "absolute" && (C = "scrollHeight", T = "scrollWidth")), _ = _, o === _e || (o === xe || o === Ne) && a === dn) {
      y = Le;
      var $ = f && _ === S && S.visualViewport ? S.visualViewport.height : _[C];
      p -= $ - r.height, p *= i ? 1 : -1;
    }
    if (o === xe || (o === _e || o === Le) && a === dn) {
      b = Ne;
      var M = f && _ === S && S.visualViewport ? S.visualViewport.width : _[T];
      h -= M - r.width, h *= i ? 1 : -1;
    }
  }
  var D = Object.assign({ position: l }, u && Ov), L = d === !0 ? $v({ x: h, y: p }) : { x: h, y: p };
  if (h = L.x, p = L.y, i) {
    var K;
    return Object.assign({}, D, (K = {}, K[y] = w ? "0" : "", K[b] = m ? "0" : "", K.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + p + "px)" : "translate3d(" + h + "px, " + p + "px, 0)", K));
  }
  return Object.assign({}, D, (t = {}, t[y] = w ? p + "px" : "", t[b] = m ? h + "px" : "", t.transform = "", t));
}
function Pv(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, i = l === void 0 ? !0 : l, u = { placement: Me(t.placement), variation: Wt(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: o, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ea(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: s, roundOffsets: i })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ea(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: i })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var Xl = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: Pv, data: {} }, Pn = { passive: !0 };
function Av(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, i = Fe(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, Pn);
  }), l && i.addEventListener("resize", n.update, Pn), function() {
    a && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Pn);
    }), l && i.removeEventListener("resize", n.update, Pn);
  };
}
var Jl = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: Av, data: {} }, Rv = { left: "right", right: "left", bottom: "top", top: "bottom" };
function In(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Rv[t];
  });
}
var Lv = { start: "end", end: "start" };
function Sa(e) {
  return e.replace(/start|end/g, function(t) {
    return Lv[t];
  });
}
function So(e) {
  var t = Fe(e), n = t.pageXOffset, r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function _o(e) {
  return zt(ft(e)).left + So(e).scrollLeft;
}
function Nv(e) {
  var t = Fe(e), n = ft(e), r = t.visualViewport, o = n.clientWidth, a = n.clientHeight, s = 0, l = 0;
  return r && (o = r.width, a = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (s = r.offsetLeft, l = r.offsetTop)), { width: o, height: a, x: s + _o(e), y: l };
}
function kv(e) {
  var t, n = ft(e), r = So(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = bt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = bt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + _o(e), i = -r.scrollTop;
  return tt(o || n).direction === "rtl" && (l += bt(n.clientWidth, o ? o.clientWidth : 0) - a), { width: a, height: s, x: l, y: i };
}
function xo(e) {
  var t = tt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Zl(e) {
  return ["html", "body", "#document"].indexOf(He(e)) >= 0 ? e.ownerDocument.body : Re(e) && xo(e) ? e : Zl(or(e));
}
function rn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Zl(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Fe(r), s = o ? [a].concat(a.visualViewport || [], xo(r) ? r : []) : r, l = t.concat(s);
  return o ? l : l.concat(rn(or(s)));
}
function Ir(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function Iv(e) {
  var t = zt(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function _a(e, t) {
  return t === Kl ? Ir(Nv(e)) : Dt(t) ? Iv(t) : Ir(kv(ft(e)));
}
function Fv(e) {
  var t = rn(or(e)), n = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, r = n && Re(e) ? bn(e) : e;
  return Dt(r) ? t.filter(function(o) {
    return Dt(o) && Ul(o, r) && He(o) !== "body";
  }) : [];
}
function Mv(e, t, n) {
  var r = t === "clippingParents" ? Fv(e) : [].concat(t), o = [].concat(r, [n]), a = o[0], s = o.reduce(function(l, i) {
    var u = _a(e, i);
    return l.top = bt(u.top, l.top), l.right = qn(u.right, l.right), l.bottom = qn(u.bottom, l.bottom), l.left = bt(u.left, l.left), l;
  }, _a(e, a));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Ql(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Me(r) : null, a = r ? Wt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, i;
  switch (o) {
    case _e:
      i = { x: s, y: t.y - n.height };
      break;
    case Le:
      i = { x: s, y: t.y + t.height };
      break;
    case Ne:
      i = { x: t.x + t.width, y: l };
      break;
    case xe:
      i = { x: t.x - n.width, y: l };
      break;
    default:
      i = { x: t.x, y: t.y };
  }
  var u = o ? Eo(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (a) {
      case Bt:
        i[u] = i[u] - (t[d] / 2 - n[d] / 2);
        break;
      case dn:
        i[u] = i[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return i;
}
function fn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.boundary, s = a === void 0 ? lv : a, l = n.rootBoundary, i = l === void 0 ? Kl : l, u = n.elementContext, d = u === void 0 ? en : u, f = n.altBoundary, v = f === void 0 ? !1 : f, h = n.padding, c = h === void 0 ? 0 : h, p = Yl(typeof c != "number" ? c : ql(c, gn)), g = d === en ? sv : en, m = e.rects.popper, w = e.elements[v ? g : d], b = Mv(Dt(w) ? w : w.contextElement || ft(e.elements.popper), s, i), y = zt(e.elements.reference), S = Ql({ reference: y, element: m, strategy: "absolute", placement: o }), _ = Ir(Object.assign({}, m, S)), C = d === en ? _ : y, T = { top: b.top - C.top + p.top, bottom: C.bottom - b.bottom + p.bottom, left: b.left - C.left + p.left, right: C.right - b.right + p.right }, $ = e.modifiersData.offset;
  if (d === en && $) {
    var M = $[o];
    Object.keys(T).forEach(function(D) {
      var L = [Ne, Le].indexOf(D) >= 0 ? 1 : -1, K = [_e, Le].indexOf(D) >= 0 ? "y" : "x";
      T[D] += M[K] * L;
    });
  }
  return T;
}
function Bv(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, i = n.allowedAutoPlacements, u = i === void 0 ? yo : i, d = Wt(r), f = d ? l ? wa : wa.filter(function(c) {
    return Wt(c) === d;
  }) : gn, v = f.filter(function(c) {
    return u.indexOf(c) >= 0;
  });
  v.length === 0 && (v = f);
  var h = v.reduce(function(c, p) {
    return c[p] = fn(e, { placement: p, boundary: o, rootBoundary: a, padding: s })[Me(p)], c;
  }, {});
  return Object.keys(h).sort(function(c, p) {
    return h[c] - h[p];
  });
}
function Dv(e) {
  if (Me(e) === bo)
    return [];
  var t = In(e);
  return [Sa(e), t, Sa(t)];
}
function Hv(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, i = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, v = n.altBoundary, h = n.flipVariations, c = h === void 0 ? !0 : h, p = n.allowedAutoPlacements, g = t.options.placement, m = Me(g), w = m === g, b = i || (w || !c ? [In(g)] : Dv(g)), y = [g].concat(b).reduce(function(ce, te) {
      return ce.concat(Me(te) === bo ? Bv(t, { placement: te, boundary: d, rootBoundary: f, padding: u, flipVariations: c, allowedAutoPlacements: p }) : te);
    }, []), S = t.rects.reference, _ = t.rects.popper, C = /* @__PURE__ */ new Map(), T = !0, $ = y[0], M = 0; M < y.length; M++) {
      var D = y[M], L = Me(D), K = Wt(D) === Bt, I = [_e, Le].indexOf(L) >= 0, P = I ? "width" : "height", B = fn(t, { placement: D, boundary: d, rootBoundary: f, altBoundary: v, padding: u }), J = I ? K ? Ne : xe : K ? Le : _e;
      S[P] > _[P] && (J = In(J));
      var R = In(J), O = [];
      if (a && O.push(B[L] <= 0), l && O.push(B[J] <= 0, B[R] <= 0), O.every(function(ce) {
        return ce;
      })) {
        $ = D, T = !1;
        break;
      }
      C.set(D, O);
    }
    if (T)
      for (var H = c ? 3 : 1, Z = function(ce) {
        var te = y.find(function(me) {
          var fe = C.get(me);
          if (fe)
            return fe.slice(0, ce).every(function(ae) {
              return ae;
            });
        });
        if (te)
          return $ = te, "break";
      }, ee = H; ee > 0; ee--) {
        var oe = Z(ee);
        if (oe === "break")
          break;
      }
    t.placement !== $ && (t.modifiersData[r]._skip = !0, t.placement = $, t.reset = !0);
  }
}
var zv = { name: "flip", enabled: !0, phase: "main", fn: Hv, requiresIfExists: ["offset"], data: { _skip: !1 } };
function xa(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function Ta(e) {
  return [_e, Ne, Le, xe].some(function(t) {
    return e[t] >= 0;
  });
}
function Wv(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = fn(t, { elementContext: "reference" }), l = fn(t, { altBoundary: !0 }), i = xa(s, r), u = xa(l, o, a), d = Ta(i), f = Ta(u);
  t.modifiersData[n] = { referenceClippingOffsets: i, popperEscapeOffsets: u, isReferenceHidden: d, hasPopperEscaped: f }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": d, "data-popper-escaped": f });
}
var jv = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Wv };
function Kv(e, t, n) {
  var r = Me(e), o = [xe, _e].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [xe, Ne].indexOf(r) >= 0 ? { x: l, y: s } : { x: s, y: l };
}
function Vv(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = yo.reduce(function(d, f) {
    return d[f] = Kv(f, t.rects, a), d;
  }, {}), l = s[t.placement], i = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
var Uv = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: Vv };
function Gv(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ql({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement });
}
var es = { name: "popperOffsets", enabled: !0, phase: "read", fn: Gv, data: {} };
function Yv(e) {
  return e === "x" ? "y" : "x";
}
function qv(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, i = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, v = n.tether, h = v === void 0 ? !0 : v, c = n.tetherOffset, p = c === void 0 ? 0 : c, g = fn(t, { boundary: i, rootBoundary: u, padding: f, altBoundary: d }), m = Me(t.placement), w = Wt(t.placement), b = !w, y = Eo(m), S = Yv(y), _ = t.modifiersData.popperOffsets, C = t.rects.reference, T = t.rects.popper, $ = typeof p == "function" ? p(Object.assign({}, t.rects, { placement: t.placement })) : p, M = typeof $ == "number" ? { mainAxis: $, altAxis: $ } : Object.assign({ mainAxis: 0, altAxis: 0 }, $), D = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, L = { x: 0, y: 0 };
  if (_) {
    if (a) {
      var K, I = y === "y" ? _e : xe, P = y === "y" ? Le : Ne, B = y === "y" ? "height" : "width", J = _[y], R = J + g[I], O = J - g[P], H = h ? -T[B] / 2 : 0, Z = w === Bt ? C[B] : T[B], ee = w === Bt ? -T[B] : -C[B], oe = t.elements.arrow, ce = h && oe ? Co(oe) : { width: 0, height: 0 }, te = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Gl(), me = te[I], fe = te[P], ae = nn(0, C[B], ce[B]), Ke = b ? C[B] / 2 - H - ae - me - M.mainAxis : Z - ae - me - M.mainAxis, Xt = b ? -C[B] / 2 + H + ae + fe + M.mainAxis : ee + ae + fe + M.mainAxis, Jt = t.elements.arrow && bn(t.elements.arrow), lr = Jt ? y === "y" ? Jt.clientTop || 0 : Jt.clientLeft || 0 : 0, yn = (K = D == null ? void 0 : D[y]) != null ? K : 0, wn = J + Ke - yn - lr, sr = J + Xt - yn, Cn = nn(h ? qn(R, wn) : R, J, h ? bt(O, sr) : O);
      _[y] = Cn, L[y] = Cn - J;
    }
    if (l) {
      var En, ir = y === "x" ? _e : xe, ur = y === "x" ? Le : Ne, Ve = _[S], $t = S === "y" ? "height" : "width", Sn = Ve + g[ir], _n = Ve - g[ur], Zt = [_e, xe].indexOf(m) !== -1, xn = (En = D == null ? void 0 : D[S]) != null ? En : 0, Tn = Zt ? Sn : Ve - C[$t] - T[$t] - xn + M.altAxis, cr = Zt ? Ve + C[$t] + T[$t] - xn - M.altAxis : _n, dr = h && Zt ? Ev(Tn, Ve, cr) : nn(h ? Tn : Sn, Ve, h ? cr : _n);
      _[S] = dr, L[S] = dr - Ve;
    }
    t.modifiersData[r] = L;
  }
}
var Xv = { name: "preventOverflow", enabled: !0, phase: "main", fn: qv, requiresIfExists: ["offset"] };
function Jv(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function Zv(e) {
  return e === Fe(e) || !Re(e) ? So(e) : Jv(e);
}
function Qv(e) {
  var t = e.getBoundingClientRect(), n = Ht(t.width) / e.offsetWidth || 1, r = Ht(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function eh(e, t, n) {
  n === void 0 && (n = !1);
  var r = Re(t), o = Re(t) && Qv(t), a = ft(t), s = zt(e, o), l = { scrollLeft: 0, scrollTop: 0 }, i = { x: 0, y: 0 };
  return (r || !r && !n) && ((He(t) !== "body" || xo(a)) && (l = Zv(t)), Re(t) ? (i = zt(t, !0), i.x += t.clientLeft, i.y += t.clientTop) : a && (i.x = _o(a))), { x: s.left + l.scrollLeft - i.x, y: s.top + l.scrollTop - i.y, width: s.width, height: s.height };
}
function th(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var i = t.get(l);
        i && o(i);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function nh(e) {
  var t = th(e);
  return gv.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function rh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function oh(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var Oa = { placement: "bottom", modifiers: [], strategy: "absolute" };
function $a() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function To(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? Oa : o;
  return function(s, l, i) {
    i === void 0 && (i = a);
    var u = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, Oa, a), modifiersData: {}, elements: { reference: s, popper: l }, attributes: {}, styles: {} }, d = [], f = !1, v = { state: u, setOptions: function(p) {
      var g = typeof p == "function" ? p(u.options) : p;
      c(), u.options = Object.assign({}, a, u.options, g), u.scrollParents = { reference: Dt(s) ? rn(s) : s.contextElement ? rn(s.contextElement) : [], popper: rn(l) };
      var m = nh(oh([].concat(r, u.options.modifiers)));
      return u.orderedModifiers = m.filter(function(w) {
        return w.enabled;
      }), h(), v.update();
    }, forceUpdate: function() {
      if (!f) {
        var p = u.elements, g = p.reference, m = p.popper;
        if ($a(g, m)) {
          u.rects = { reference: eh(g, bn(m), u.options.strategy === "fixed"), popper: Co(m) }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(T) {
            return u.modifiersData[T.name] = Object.assign({}, T.data);
          });
          for (var w = 0; w < u.orderedModifiers.length; w++) {
            if (u.reset === !0) {
              u.reset = !1, w = -1;
              continue;
            }
            var b = u.orderedModifiers[w], y = b.fn, S = b.options, _ = S === void 0 ? {} : S, C = b.name;
            typeof y == "function" && (u = y({ state: u, options: _, name: C, instance: v }) || u);
          }
        }
      }
    }, update: rh(function() {
      return new Promise(function(p) {
        v.forceUpdate(), p(u);
      });
    }), destroy: function() {
      c(), f = !0;
    } };
    if (!$a(s, l))
      return v;
    v.setOptions(i).then(function(p) {
      !f && i.onFirstUpdate && i.onFirstUpdate(p);
    });
    function h() {
      u.orderedModifiers.forEach(function(p) {
        var g = p.name, m = p.options, w = m === void 0 ? {} : m, b = p.effect;
        if (typeof b == "function") {
          var y = b({ state: u, name: g, instance: v, options: w }), S = function() {
          };
          d.push(y || S);
        }
      });
    }
    function c() {
      d.forEach(function(p) {
        return p();
      }), d = [];
    }
    return v;
  };
}
To();
var ah = [Jl, es, Xl, Vl];
To({ defaultModifiers: ah });
var lh = [Jl, es, Xl, Vl, Uv, zv, Xv, Tv, jv], ts = To({ defaultModifiers: lh });
const br = "focus-trap.focus-after-trapped", yr = "focus-trap.focus-after-released", sh = "focus-trap.focusout-prevented", Pa = {
  cancelable: !0,
  bubbles: !1
}, ih = {
  cancelable: !0,
  bubbles: !1
}, Aa = "focusAfterTrapped", Ra = "focusAfterReleased", uh = Symbol("elFocusTrap"), Oo = x(), ar = x(0), $o = x(0);
let An = 0;
const ns = (e) => {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 || r === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}, La = (e, t) => {
  for (const n of e)
    if (!ch(n, t))
      return n;
}, ch = (e, t) => {
  if (process.env.NODE_ENV === "test")
    return !1;
  if (getComputedStyle(e).visibility === "hidden")
    return !0;
  for (; e; ) {
    if (t && e === t)
      return !1;
    if (getComputedStyle(e).display === "none")
      return !0;
    e = e.parentElement;
  }
  return !1;
}, dh = (e) => {
  const t = ns(e), n = La(t, e), r = La(t.reverse(), e);
  return [n, r];
}, fh = (e) => e instanceof HTMLInputElement && "select" in e, ot = (e, t) => {
  if (e && e.focus) {
    const n = document.activeElement;
    if (e.focus({ preventScroll: !0 }), $o.value = window.performance.now(), e !== n && fh(e) && t) {
      if (e.tagName === "INPUT") {
        e.setSelectionRange(e.value.length, e.value.length);
        return;
      }
      e.select();
    }
  }
};
function Na(e, t) {
  const n = [...e], r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const ph = () => {
  let e = [];
  return {
    push: (r) => {
      const o = e[0];
      o && r !== o && o.pause(), e = Na(e, r), e.unshift(r);
    },
    remove: (r) => {
      var o, a;
      e = Na(e, r), (a = (o = e[0]) == null ? void 0 : o.resume) == null || a.call(o);
    }
  };
}, vh = (e, t = !1) => {
  const n = document.activeElement;
  for (const r of e)
    if (ot(r, t), document.activeElement !== n)
      return;
}, ka = ph(), hh = () => ar.value > $o.value, Rn = () => {
  Oo.value = "pointer", ar.value = window.performance.now();
}, Ia = () => {
  Oo.value = "keyboard", ar.value = window.performance.now();
}, mh = () => (Te(() => {
  An === 0 && (document.addEventListener("mousedown", Rn), document.addEventListener("touchstart", Rn), document.addEventListener("keydown", Ia)), An++;
}), ze(() => {
  An--, An <= 0 && (document.removeEventListener("mousedown", Rn), document.removeEventListener("touchstart", Rn), document.removeEventListener("keydown", Ia));
}), {
  focusReason: Oo,
  lastUserFocusTimestamp: ar,
  lastAutomatedFocusTimestamp: $o
}), Ln = (e) => new CustomEvent(sh, {
  ...ih,
  detail: e
}), gh = j({
  name: "ElFocusTrap",
  inheritAttrs: !1,
  props: {
    loop: Boolean,
    trapped: Boolean,
    focusTrapEl: Object,
    focusStartEl: {
      type: [Object, String],
      default: "first"
    }
  },
  emits: [
    Aa,
    Ra,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: t }) {
    const n = x();
    let r, o;
    const { focusReason: a } = mh();
    xp((c) => {
      e.trapped && !s.paused && t("release-requested", c);
    });
    const s = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, l = (c) => {
      if (!e.loop && !e.trapped || s.paused)
        return;
      const { key: p, altKey: g, ctrlKey: m, metaKey: w, currentTarget: b, shiftKey: y } = c, { loop: S } = e, _ = p === Gn.tab && !g && !m && !w, C = document.activeElement;
      if (_ && C) {
        const T = b, [$, M] = dh(T);
        if ($ && M) {
          if (!y && C === M) {
            const L = Ln({
              focusReason: a.value
            });
            t("focusout-prevented", L), L.defaultPrevented || (c.preventDefault(), S && ot($, !0));
          } else if (y && [$, T].includes(C)) {
            const L = Ln({
              focusReason: a.value
            });
            t("focusout-prevented", L), L.defaultPrevented || (c.preventDefault(), S && ot(M, !0));
          }
        } else if (C === T) {
          const L = Ln({
            focusReason: a.value
          });
          t("focusout-prevented", L), L.defaultPrevented || c.preventDefault();
        }
      }
    };
    Be(uh, {
      focusTrapRef: n,
      onKeydown: l
    }), U(() => e.focusTrapEl, (c) => {
      c && (n.value = c);
    }, { immediate: !0 }), U([n], ([c], [p]) => {
      c && (c.addEventListener("keydown", l), c.addEventListener("focusin", d), c.addEventListener("focusout", f)), p && (p.removeEventListener("keydown", l), p.removeEventListener("focusin", d), p.removeEventListener("focusout", f));
    });
    const i = (c) => {
      t(Aa, c);
    }, u = (c) => t(Ra, c), d = (c) => {
      const p = E(n);
      if (!p)
        return;
      const g = c.target, m = c.relatedTarget, w = g && p.contains(g);
      e.trapped || m && p.contains(m) || (r = m), w && t("focusin", c), !s.paused && e.trapped && (w ? o = g : ot(o, !0));
    }, f = (c) => {
      const p = E(n);
      if (!(s.paused || !p))
        if (e.trapped) {
          const g = c.relatedTarget;
          !so(g) && !p.contains(g) && setTimeout(() => {
            if (!s.paused && e.trapped) {
              const m = Ln({
                focusReason: a.value
              });
              t("focusout-prevented", m), m.defaultPrevented || ot(o, !0);
            }
          }, 0);
        } else {
          const g = c.target;
          g && p.contains(g) || t("focusout", c);
        }
    };
    async function v() {
      await we();
      const c = E(n);
      if (c) {
        ka.push(s);
        const p = c.contains(document.activeElement) ? r : document.activeElement;
        if (r = p, !c.contains(p)) {
          const m = new Event(br, Pa);
          c.addEventListener(br, i), c.dispatchEvent(m), m.defaultPrevented || we(() => {
            let w = e.focusStartEl;
            St(w) || (ot(w), document.activeElement !== w && (w = "first")), w === "first" && vh(ns(c), !0), (document.activeElement === p || w === "container") && ot(c);
          });
        }
      }
    }
    function h() {
      const c = E(n);
      if (c) {
        c.removeEventListener(br, i);
        const p = new CustomEvent(yr, {
          ...Pa,
          detail: {
            focusReason: a.value
          }
        });
        c.addEventListener(yr, u), c.dispatchEvent(p), !p.defaultPrevented && (a.value == "keyboard" || !hh()) && ot(r ?? document.body, !0), c.removeEventListener(yr, i), ka.remove(s);
      }
    }
    return Te(() => {
      e.trapped && v(), U(() => e.trapped, (c) => {
        c ? v() : h();
      });
    }), ze(() => {
      e.trapped && h();
    }), {
      onKeydown: l
    };
  }
});
function bh(e, t, n, r, o, a) {
  return be(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var yh = /* @__PURE__ */ he(gh, [["render", bh], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const wh = ["fixed", "absolute"], Ch = Oe({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: re(Array),
    default: void 0
  },
  gpuAcceleration: {
    type: Boolean,
    default: !0
  },
  offset: {
    type: Number,
    default: 12
  },
  placement: {
    type: String,
    values: yo,
    default: "bottom"
  },
  popperOptions: {
    type: re(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: wh,
    default: "absolute"
  }
}), rs = Oe({
  ...Ch,
  id: String,
  style: {
    type: re([String, Array, Object])
  },
  className: {
    type: re([String, Array, Object])
  },
  effect: {
    type: String,
    default: "dark"
  },
  visible: Boolean,
  enterable: {
    type: Boolean,
    default: !0
  },
  pure: Boolean,
  focusOnShow: {
    type: Boolean,
    default: !1
  },
  trapping: {
    type: Boolean,
    default: !1
  },
  popperClass: {
    type: re([String, Array, Object])
  },
  popperStyle: {
    type: re([String, Array, Object])
  },
  referenceEl: {
    type: re(Object)
  },
  triggerTargetEl: {
    type: re(Object)
  },
  stopPopperMouseEvent: {
    type: Boolean,
    default: !0
  },
  ariaLabel: {
    type: String,
    default: void 0
  },
  virtualTriggering: Boolean,
  zIndex: Number
}), Eh = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, Fa = (e, t) => {
  const { placement: n, strategy: r, popperOptions: o } = e, a = {
    placement: n,
    strategy: r,
    ...o,
    modifiers: _h(e)
  };
  return xh(a, t), Th(a, o == null ? void 0 : o.modifiers), a;
}, Sh = (e) => {
  if (de)
    return lt(e);
};
function _h(e) {
  const { offset: t, gpuAcceleration: n, fallbackPlacements: r } = e;
  return [
    {
      name: "offset",
      options: {
        offset: [0, t ?? 12]
      }
    },
    {
      name: "preventOverflow",
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    },
    {
      name: "flip",
      options: {
        padding: 5,
        fallbackPlacements: r
      }
    },
    {
      name: "computeStyles",
      options: {
        gpuAcceleration: n
      }
    }
  ];
}
function xh(e, { arrowEl: t, arrowOffset: n }) {
  e.modifiers.push({
    name: "arrow",
    options: {
      element: t,
      padding: n ?? 5
    }
  });
}
function Th(e, t) {
  t && (e.modifiers = [...e.modifiers, ...t ?? []]);
}
const Oh = j({
  name: "ElPopperContent"
}), $h = /* @__PURE__ */ j({
  ...Oh,
  props: rs,
  emits: Eh,
  setup(e, { expose: t, emit: n }) {
    const r = e, { popperInstanceRef: o, contentRef: a, triggerRef: s, role: l } = X(po, void 0), i = X(Yn, void 0), { nextZIndex: u } = Bl(), d = se("popper"), f = x(), v = x("first"), h = x(), c = x();
    Be(Pl, {
      arrowRef: h,
      arrowOffset: c
    }), i && (i.addInputId || i.removeInputId) && Be(Yn, {
      ...i,
      addInputId: Vn,
      removeInputId: Vn
    });
    const p = x(r.zIndex || u()), g = x(!1);
    let m;
    const w = A(() => Sh(r.referenceEl) || E(s)), b = A(() => [{ zIndex: E(p) }, r.popperStyle]), y = A(() => [
      d.b(),
      d.is("pure", r.pure),
      d.is(r.effect),
      r.popperClass
    ]), S = A(() => l && l.value === "dialog" ? "false" : void 0), _ = ({
      referenceEl: I,
      popperContentEl: P,
      arrowEl: B
    }) => {
      const J = Fa(r, {
        arrowEl: B,
        arrowOffset: E(c)
      });
      return ts(I, P, J);
    }, C = (I = !0) => {
      var P;
      (P = E(o)) == null || P.update(), I && (p.value = r.zIndex || u());
    }, T = () => {
      var I, P;
      const B = { name: "eventListeners", enabled: r.visible };
      (P = (I = E(o)) == null ? void 0 : I.setOptions) == null || P.call(I, (J) => ({
        ...J,
        modifiers: [...J.modifiers || [], B]
      })), C(!1), r.visible && r.focusOnShow ? g.value = !0 : r.visible === !1 && (g.value = !1);
    }, $ = () => {
      n("focus");
    }, M = (I) => {
      var P;
      ((P = I.detail) == null ? void 0 : P.focusReason) !== "pointer" && (v.value = "first", n("blur"));
    }, D = (I) => {
      r.visible && !g.value && (I.target && (v.value = I.target), g.value = !0);
    }, L = (I) => {
      r.trapping || (I.detail.focusReason === "pointer" && I.preventDefault(), g.value = !1);
    }, K = () => {
      g.value = !1, n("close");
    };
    return Te(() => {
      let I;
      U(w, (P) => {
        var B;
        I == null || I();
        const J = E(o);
        if ((B = J == null ? void 0 : J.destroy) == null || B.call(J), P) {
          const R = E(f);
          a.value = R, o.value = _({
            referenceEl: P,
            popperContentEl: R,
            arrowEl: E(h)
          }), I = U(() => P.getBoundingClientRect(), () => C(), {
            immediate: !0
          });
        } else
          o.value = void 0;
      }, {
        immediate: !0
      }), U(() => r.triggerTargetEl, (P, B) => {
        m == null || m(), m = void 0;
        const J = E(P || f.value), R = E(B || f.value);
        cn(J) && (m = U([l, () => r.ariaLabel, S, () => r.id], (O) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((H, Z) => {
            so(O[Z]) ? J.removeAttribute(H) : J.setAttribute(H, O[Z]);
          });
        }, { immediate: !0 })), R !== J && cn(R) && ["role", "aria-label", "aria-modal", "id"].forEach((O) => {
          R.removeAttribute(O);
        });
      }, { immediate: !0 }), U(() => r.visible, T, { immediate: !0 }), U(() => Fa(r, {
        arrowEl: E(h),
        arrowOffset: E(c)
      }), (P) => {
        var B;
        return (B = o.value) == null ? void 0 : B.setOptions(P);
      });
    }), ze(() => {
      m == null || m(), m = void 0;
    }), t({
      popperContentRef: f,
      popperInstanceRef: o,
      updatePopper: C,
      contentStyle: b
    }), (I, P) => (k(), W("div", {
      ref_key: "popperContentRef",
      ref: f,
      style: ke(E(b)),
      class: V(E(y)),
      tabindex: "-1",
      onMouseenter: P[0] || (P[0] = (B) => I.$emit("mouseenter", B)),
      onMouseleave: P[1] || (P[1] = (B) => I.$emit("mouseleave", B))
    }, [
      N(E(yh), {
        trapped: g.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": f.value,
        "focus-start-el": v.value,
        onFocusAfterTrapped: $,
        onFocusAfterReleased: M,
        onFocusin: D,
        onFocusoutPrevented: L,
        onReleaseRequested: K
      }, {
        default: ue(() => [
          be(I.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
    ], 38));
  }
});
var Ph = /* @__PURE__ */ he($h, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const Ah = Ut(Zp), Rh = se("tooltip"), os = Oe({
  ...$p,
  ...rs,
  appendTo: {
    type: re([String, Object])
  },
  content: {
    type: String,
    default: ""
  },
  rawContent: {
    type: Boolean,
    default: !1
  },
  persistent: Boolean,
  ariaLabel: String,
  visible: {
    type: re(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: `${Rh.namespace.value}-fade-in-linear`
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: {
    type: Boolean
  }
}), as = Oe({
  ...jl,
  disabled: Boolean,
  trigger: {
    type: re([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: re(Array),
    default: () => [Gn.enter, Gn.space]
  }
}), {
  useModelToggleProps: Lh,
  useModelToggleEmits: Nh,
  useModelToggle: kh
} = Sp("visible"), Ih = Oe({
  ...Hl,
  ...Lh,
  ...os,
  ...as,
  ...zl,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), Fh = [
  ...Nh,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], Mh = (e, t) => Et(e) ? e.includes(t) : e === t, At = (e, t, n) => (r) => {
  Mh(E(e), t) && n(r);
}, Bh = j({
  name: "ElTooltipTrigger"
}), Dh = /* @__PURE__ */ j({
  ...Bh,
  props: as,
  setup(e, { expose: t }) {
    const n = e, r = se("tooltip"), { controlled: o, id: a, open: s, onOpen: l, onClose: i, onToggle: u } = X(vo, void 0), d = x(null), f = () => {
      if (E(o) || n.disabled)
        return !0;
    }, v = gt(n, "trigger"), h = qe(f, At(v, "hover", l)), c = qe(f, At(v, "hover", i)), p = qe(f, At(v, "click", (y) => {
      y.button === 0 && u(y);
    })), g = qe(f, At(v, "focus", l)), m = qe(f, At(v, "focus", i)), w = qe(f, At(v, "contextmenu", (y) => {
      y.preventDefault(), u(y);
    })), b = qe(f, (y) => {
      const { code: S } = y;
      n.triggerKeys.includes(S) && (y.preventDefault(), u(y));
    });
    return t({
      triggerRef: d
    }), (y, S) => (k(), ve(E(av), {
      id: E(a),
      "virtual-ref": y.virtualRef,
      open: E(s),
      "virtual-triggering": y.virtualTriggering,
      class: V(E(r).e("trigger")),
      onBlur: E(m),
      onClick: E(p),
      onContextmenu: E(w),
      onFocus: E(g),
      onMouseenter: E(h),
      onMouseleave: E(c),
      onKeydown: E(b)
    }, {
      default: ue(() => [
        be(y.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var Hh = /* @__PURE__ */ he(Dh, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const zh = j({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), Wh = /* @__PURE__ */ j({
  ...zh,
  props: os,
  setup(e, { expose: t }) {
    const n = e, { selector: r } = Fl(), o = x(null), a = x(!1), {
      controlled: s,
      id: l,
      open: i,
      trigger: u,
      onClose: d,
      onOpen: f,
      onShow: v,
      onHide: h,
      onBeforeShow: c,
      onBeforeHide: p
    } = X(vo, void 0), g = A(() => process.env.NODE_ENV === "test" ? !0 : n.persistent);
    ze(() => {
      a.value = !0;
    });
    const m = A(() => E(g) ? !0 : E(i)), w = A(() => n.disabled ? !1 : E(i)), b = A(() => n.appendTo || r.value), y = A(() => {
      var P;
      return (P = n.style) != null ? P : {};
    }), S = A(() => !E(i)), _ = () => {
      h();
    }, C = () => {
      if (E(s))
        return !0;
    }, T = qe(C, () => {
      n.enterable && E(u) === "hover" && f();
    }), $ = qe(C, () => {
      E(u) === "hover" && d();
    }), M = () => {
      var P, B;
      (B = (P = o.value) == null ? void 0 : P.updatePopper) == null || B.call(P), c == null || c();
    }, D = () => {
      p == null || p();
    }, L = () => {
      v(), I = xf(A(() => {
        var P;
        return (P = o.value) == null ? void 0 : P.popperContentRef;
      }), () => {
        if (E(s))
          return;
        E(u) !== "hover" && d();
      });
    }, K = () => {
      n.virtualTriggering || d();
    };
    let I;
    return U(() => E(i), (P) => {
      P || I == null || I();
    }, {
      flush: "post"
    }), U(() => n.content, () => {
      var P, B;
      (B = (P = o.value) == null ? void 0 : P.updatePopper) == null || B.call(P);
    }), t({
      contentRef: o
    }), (P, B) => (k(), ve(qs, {
      disabled: !P.teleported,
      to: E(b)
    }, [
      N(qr, {
        name: P.transition,
        onAfterLeave: _,
        onBeforeEnter: M,
        onAfterEnter: L,
        onBeforeLeave: D
      }, {
        default: ue(() => [
          E(m) ? ye((k(), ve(E(Ph), It({
            key: 0,
            id: E(l),
            ref_key: "contentRef",
            ref: o
          }, P.$attrs, {
            "aria-label": P.ariaLabel,
            "aria-hidden": E(S),
            "boundaries-padding": P.boundariesPadding,
            "fallback-placements": P.fallbackPlacements,
            "gpu-acceleration": P.gpuAcceleration,
            offset: P.offset,
            placement: P.placement,
            "popper-options": P.popperOptions,
            strategy: P.strategy,
            effect: P.effect,
            enterable: P.enterable,
            pure: P.pure,
            "popper-class": P.popperClass,
            "popper-style": [P.popperStyle, E(y)],
            "reference-el": P.referenceEl,
            "trigger-target-el": P.triggerTargetEl,
            visible: E(w),
            "z-index": P.zIndex,
            onMouseenter: E(T),
            onMouseleave: E($),
            onBlur: K,
            onClose: E(d)
          }), {
            default: ue(() => [
              a.value ? Ee("v-if", !0) : be(P.$slots, "default", { key: 0 })
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
            [Hn, E(w)]
          ]) : Ee("v-if", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["disabled", "to"]));
  }
});
var jh = /* @__PURE__ */ he(Wh, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const Kh = ["innerHTML"], Vh = { key: 1 }, Uh = j({
  name: "ElTooltip"
}), Gh = /* @__PURE__ */ j({
  ...Uh,
  props: Ih,
  emits: Fh,
  setup(e, { expose: t, emit: n }) {
    const r = e;
    Op();
    const o = Nl(), a = x(), s = x(), l = () => {
      var m;
      const w = E(a);
      w && ((m = w.popperInstanceRef) == null || m.update());
    }, i = x(!1), u = x(), { show: d, hide: f, hasUpdateHandler: v } = kh({
      indicator: i,
      toggleReason: u
    }), { onOpen: h, onClose: c } = Pp({
      showAfter: gt(r, "showAfter"),
      hideAfter: gt(r, "hideAfter"),
      open: d,
      close: f
    }), p = A(() => Mt(r.visible) && !v.value);
    Be(vo, {
      controlled: p,
      id: o,
      open: Xs(i),
      trigger: gt(r, "trigger"),
      onOpen: (m) => {
        h(m);
      },
      onClose: (m) => {
        c(m);
      },
      onToggle: (m) => {
        E(i) ? c(m) : h(m);
      },
      onShow: () => {
        n("show", u.value);
      },
      onHide: () => {
        n("hide", u.value);
      },
      onBeforeShow: () => {
        n("before-show", u.value);
      },
      onBeforeHide: () => {
        n("before-hide", u.value);
      },
      updatePopper: l
    }), U(() => r.disabled, (m) => {
      m && i.value && (i.value = !1);
    });
    const g = () => {
      var m, w;
      const b = (w = (m = s.value) == null ? void 0 : m.contentRef) == null ? void 0 : w.popperContentRef;
      return b && b.contains(document.activeElement);
    };
    return Js(() => i.value && f()), t({
      popperRef: a,
      contentRef: s,
      isFocusInsideContent: g,
      updatePopper: l,
      onOpen: h,
      onClose: c,
      hide: f
    }), (m, w) => (k(), ve(E(Ah), {
      ref_key: "popperRef",
      ref: a,
      role: m.role
    }, {
      default: ue(() => [
        N(Hh, {
          disabled: m.disabled,
          trigger: m.trigger,
          "trigger-keys": m.triggerKeys,
          "virtual-ref": m.virtualRef,
          "virtual-triggering": m.virtualTriggering
        }, {
          default: ue(() => [
            m.$slots.default ? be(m.$slots, "default", { key: 0 }) : Ee("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        N(jh, {
          ref_key: "contentRef",
          ref: s,
          "aria-label": m.ariaLabel,
          "boundaries-padding": m.boundariesPadding,
          content: m.content,
          disabled: m.disabled,
          effect: m.effect,
          enterable: m.enterable,
          "fallback-placements": m.fallbackPlacements,
          "hide-after": m.hideAfter,
          "gpu-acceleration": m.gpuAcceleration,
          offset: m.offset,
          persistent: m.persistent,
          "popper-class": m.popperClass,
          "popper-style": m.popperStyle,
          placement: m.placement,
          "popper-options": m.popperOptions,
          pure: m.pure,
          "raw-content": m.rawContent,
          "reference-el": m.referenceEl,
          "trigger-target-el": m.triggerTargetEl,
          "show-after": m.showAfter,
          strategy: m.strategy,
          teleported: m.teleported,
          transition: m.transition,
          "virtual-triggering": m.virtualTriggering,
          "z-index": m.zIndex,
          "append-to": m.appendTo
        }, {
          default: ue(() => [
            be(m.$slots, "content", {}, () => [
              m.rawContent ? (k(), W("span", {
                key: 0,
                innerHTML: m.content
              }, null, 8, Kh)) : (k(), W("span", Vh, Xe(m.content), 1))
            ]),
            m.showArrow ? (k(), ve(E(tv), {
              key: 0,
              "arrow-offset": m.arrowOffset
            }, null, 8, ["arrow-offset"])) : Ee("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var Yh = /* @__PURE__ */ he(Gh, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const qh = Ut(Yh), at = /* @__PURE__ */ new Map();
let Ma;
de && (document.addEventListener("mousedown", (e) => Ma = e), document.addEventListener("mouseup", (e) => {
  for (const t of at.values())
    for (const { documentHandler: n } of t)
      n(e, Ma);
}));
function Ba(e, t) {
  let n = [];
  return Array.isArray(t.arg) ? n = t.arg : cn(t.arg) && n.push(t.arg), function(r, o) {
    const a = t.instance.popperRef, s = r.target, l = o == null ? void 0 : o.target, i = !t || !t.instance, u = !s || !l, d = e.contains(s) || e.contains(l), f = e === s, v = n.length && n.some((c) => c == null ? void 0 : c.contains(s)) || n.length && n.includes(l), h = a && (a.contains(s) || a.contains(l));
    i || u || d || f || v || h || t.value(r, o);
  };
}
const Xh = {
  beforeMount(e, t) {
    at.has(e) || at.set(e, []), at.get(e).push({
      documentHandler: Ba(e, t),
      bindingFn: t.value
    });
  },
  updated(e, t) {
    at.has(e) || at.set(e, []);
    const n = at.get(e), r = n.findIndex((a) => a.bindingFn === t.oldValue), o = {
      documentHandler: Ba(e, t),
      bindingFn: t.value
    };
    r >= 0 ? n.splice(r, 1, o) : n.push(o);
  },
  unmounted(e) {
    at.delete(e);
  }
};
var Da = !1, ht, Fr, Mr, Fn, Mn, ls, Bn, Br, Dr, Hr, ss, zr, Wr, is, us;
function Se() {
  if (!Da) {
    Da = !0;
    var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
    if (zr = /\b(iPhone|iP[ao]d)/.exec(e), Wr = /\b(iP[ao]d)/.exec(e), Hr = /Android/i.exec(e), is = /FBAN\/\w+;/i.exec(e), us = /Mobile/i.exec(e), ss = !!/Win64/.exec(e), t) {
      ht = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN, ht && document && document.documentMode && (ht = document.documentMode);
      var r = /(?:Trident\/(\d+.\d+))/.exec(e);
      ls = r ? parseFloat(r[1]) + 4 : ht, Fr = t[2] ? parseFloat(t[2]) : NaN, Mr = t[3] ? parseFloat(t[3]) : NaN, Fn = t[4] ? parseFloat(t[4]) : NaN, Fn ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), Mn = t && t[1] ? parseFloat(t[1]) : NaN) : Mn = NaN;
    } else
      ht = Fr = Mr = Mn = Fn = NaN;
    if (n) {
      if (n[1]) {
        var o = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
        Bn = o ? parseFloat(o[1].replace("_", ".")) : !0;
      } else
        Bn = !1;
      Br = !!n[2], Dr = !!n[3];
    } else
      Bn = Br = Dr = !1;
  }
}
var jr = { ie: function() {
  return Se() || ht;
}, ieCompatibilityMode: function() {
  return Se() || ls > ht;
}, ie64: function() {
  return jr.ie() && ss;
}, firefox: function() {
  return Se() || Fr;
}, opera: function() {
  return Se() || Mr;
}, webkit: function() {
  return Se() || Fn;
}, safari: function() {
  return jr.webkit();
}, chrome: function() {
  return Se() || Mn;
}, windows: function() {
  return Se() || Br;
}, osx: function() {
  return Se() || Bn;
}, linux: function() {
  return Se() || Dr;
}, iphone: function() {
  return Se() || zr;
}, mobile: function() {
  return Se() || zr || Wr || Hr || us;
}, nativeApp: function() {
  return Se() || is;
}, android: function() {
  return Se() || Hr;
}, ipad: function() {
  return Se() || Wr;
} }, Jh = jr, Nn = !!(typeof window < "u" && window.document && window.document.createElement), Zh = { canUseDOM: Nn, canUseWorkers: typeof Worker < "u", canUseEventListeners: Nn && !!(window.addEventListener || window.attachEvent), canUseViewport: Nn && !!window.screen, isInWorker: !Nn }, cs = Zh, ds;
cs.canUseDOM && (ds = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0);
function Qh(e, t) {
  if (!cs.canUseDOM || t && !("addEventListener" in document))
    return !1;
  var n = "on" + e, r = n in document;
  if (!r) {
    var o = document.createElement("div");
    o.setAttribute(n, "return;"), r = typeof o[n] == "function";
  }
  return !r && ds && e === "wheel" && (r = document.implementation.hasFeature("Events.wheel", "3.0")), r;
}
var em = Qh, Ha = 10, za = 40, Wa = 800;
function fs(e) {
  var t = 0, n = 0, r = 0, o = 0;
  return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), r = t * Ha, o = n * Ha, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (r = e.deltaX), (r || o) && e.deltaMode && (e.deltaMode == 1 ? (r *= za, o *= za) : (r *= Wa, o *= Wa)), r && !t && (t = r < 1 ? -1 : 1), o && !n && (n = o < 1 ? -1 : 1), { spinX: t, spinY: n, pixelX: r, pixelY: o };
}
fs.getEventType = function() {
  return Jh.firefox() ? "DOMMouseScroll" : em("wheel") ? "wheel" : "mousewheel";
};
var tm = fs;
const nm = function(e, t) {
  if (e && e.addEventListener) {
    const n = function(r) {
      const o = tm(r);
      t && Reflect.apply(t, this, [r, o]);
    };
    e.addEventListener("wheel", n, { passive: !0 });
  }
}, rm = {
  beforeMount(e, t) {
    nm(e, t.value);
  }
}, ps = {
  modelValue: {
    type: [Number, String, Boolean],
    default: void 0
  },
  label: {
    type: [String, Boolean, Number, Object]
  },
  indeterminate: Boolean,
  disabled: Boolean,
  checked: Boolean,
  name: {
    type: String,
    default: void 0
  },
  trueLabel: {
    type: [String, Number],
    default: void 0
  },
  falseLabel: {
    type: [String, Number],
    default: void 0
  },
  id: {
    type: String,
    default: void 0
  },
  controls: {
    type: String,
    default: void 0
  },
  border: Boolean,
  size: Rl,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: !0
  }
}, vs = {
  [rr]: (e) => St(e) || Je(e) || Mt(e),
  change: (e) => St(e) || Je(e) || Mt(e)
}, om = ({
  model: e,
  isChecked: t
}) => {
  const n = X(Gt, void 0), r = A(() => {
    var a, s;
    const l = (a = n == null ? void 0 : n.max) == null ? void 0 : a.value, i = (s = n == null ? void 0 : n.min) == null ? void 0 : s.value;
    return !Un(l) && e.value.length >= l && !t.value || !Un(i) && e.value.length <= i && t.value;
  });
  return {
    isDisabled: vp(A(() => (n == null ? void 0 : n.disabled.value) || r.value)),
    isLimitDisabled: r
  };
}, am = (e, {
  model: t,
  isLimitExceeded: n,
  hasOwnLabel: r,
  isDisabled: o,
  isLabeledByFormItem: a
}) => {
  const s = X(Gt, void 0), { formItem: l } = mo(), { emit: i } = le();
  function u(c) {
    var p, g;
    return c === e.trueLabel || c === !0 ? (p = e.trueLabel) != null ? p : !0 : (g = e.falseLabel) != null ? g : !1;
  }
  function d(c, p) {
    i("change", u(c), p);
  }
  function f(c) {
    if (n.value)
      return;
    const p = c.target;
    i("change", u(p.checked), c);
  }
  async function v(c) {
    n.value || !r.value && !o.value && a.value && (c.composedPath().some((m) => m.tagName === "LABEL") || (t.value = u([!1, e.falseLabel].includes(t.value)), await we(), d(t.value, c)));
  }
  const h = A(() => (s == null ? void 0 : s.validateEvent) || e.validateEvent);
  return U(() => e.modelValue, () => {
    h.value && (l == null || l.validate("change").catch((c) => et(c)));
  }), {
    handleChange: f,
    onClickRoot: v
  };
}, lm = (e) => {
  const t = x(!1), { emit: n } = le(), r = X(Gt, void 0), o = A(() => Un(r) === !1), a = x(!1);
  return {
    model: A({
      get() {
        var l, i;
        return o.value ? (l = r == null ? void 0 : r.modelValue) == null ? void 0 : l.value : (i = e.modelValue) != null ? i : t.value;
      },
      set(l) {
        var i, u;
        o.value && Et(l) ? (a.value = ((i = r == null ? void 0 : r.max) == null ? void 0 : i.value) !== void 0 && l.length > (r == null ? void 0 : r.max.value), a.value === !1 && ((u = r == null ? void 0 : r.changeEvent) == null || u.call(r, l))) : (n(rr, l), t.value = l);
      }
    }),
    isGroup: o,
    isLimitExceeded: a
  };
}, sm = (e, t, { model: n }) => {
  const r = X(Gt, void 0), o = x(!1), a = A(() => {
    const u = n.value;
    return Mt(u) ? u : Et(u) ? mn(e.label) ? u.map(Io).some((d) => vf(d, e.label)) : u.map(Io).includes(e.label) : u != null ? u === e.trueLabel : !!u;
  }), s = Lr(A(() => {
    var u;
    return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
  }), {
    prop: !0
  }), l = Lr(A(() => {
    var u;
    return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
  })), i = A(() => !!(t.default || e.label));
  return {
    checkboxButtonSize: s,
    isChecked: a,
    isFocused: o,
    checkboxSize: l,
    hasOwnLabel: i
  };
}, im = (e, { model: t }) => {
  function n() {
    Et(t.value) && !t.value.includes(e.label) ? t.value.push(e.label) : t.value = e.trueLabel || !0;
  }
  e.checked && n();
}, hs = (e, t) => {
  const { formItem: n } = mo(), { model: r, isGroup: o, isLimitExceeded: a } = lm(e), {
    isFocused: s,
    isChecked: l,
    checkboxButtonSize: i,
    checkboxSize: u,
    hasOwnLabel: d
  } = sm(e, t, { model: r }), { isDisabled: f } = om({ model: r, isChecked: l }), { inputId: v, isLabeledByFormItem: h } = kl(e, {
    formItemContext: n,
    disableIdGeneration: d,
    disableIdManagement: o
  }), { handleChange: c, onClickRoot: p } = am(e, {
    model: r,
    isLimitExceeded: a,
    hasOwnLabel: d,
    isDisabled: f,
    isLabeledByFormItem: h
  });
  return im(e, { model: r }), {
    inputId: v,
    isLabeledByFormItem: h,
    isChecked: l,
    isDisabled: f,
    isFocused: s,
    checkboxButtonSize: i,
    checkboxSize: u,
    hasOwnLabel: d,
    model: r,
    handleChange: c,
    onClickRoot: p
  };
}, um = ["tabindex", "role", "aria-checked"], cm = ["id", "aria-hidden", "name", "tabindex", "disabled", "true-value", "false-value"], dm = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"], fm = j({
  name: "ElCheckbox"
}), pm = /* @__PURE__ */ j({
  ...fm,
  props: ps,
  emits: vs,
  setup(e) {
    const t = e, n = ol(), {
      inputId: r,
      isLabeledByFormItem: o,
      isChecked: a,
      isDisabled: s,
      isFocused: l,
      checkboxSize: i,
      hasOwnLabel: u,
      model: d,
      handleChange: f,
      onClickRoot: v
    } = hs(t, n), h = se("checkbox");
    return (c, p) => (k(), ve(Xr(!E(u) && E(o) ? "span" : "label"), {
      class: V([
        E(h).b(),
        E(h).m(E(i)),
        E(h).is("disabled", E(s)),
        E(h).is("bordered", c.border),
        E(h).is("checked", E(a))
      ]),
      "aria-controls": c.indeterminate ? c.controls : null,
      onClick: E(v)
    }, {
      default: ue(() => [
        ie("span", {
          class: V([
            E(h).e("input"),
            E(h).is("disabled", E(s)),
            E(h).is("checked", E(a)),
            E(h).is("indeterminate", c.indeterminate),
            E(h).is("focus", E(l))
          ]),
          tabindex: c.indeterminate ? 0 : void 0,
          role: c.indeterminate ? "checkbox" : void 0,
          "aria-checked": c.indeterminate ? "mixed" : void 0
        }, [
          c.trueLabel || c.falseLabel ? ye((k(), W("input", {
            key: 0,
            id: E(r),
            "onUpdate:modelValue": p[0] || (p[0] = (g) => kt(d) ? d.value = g : null),
            class: V(E(h).e("original")),
            type: "checkbox",
            "aria-hidden": c.indeterminate ? "true" : "false",
            name: c.name,
            tabindex: c.tabindex,
            disabled: E(s),
            "true-value": c.trueLabel,
            "false-value": c.falseLabel,
            onChange: p[1] || (p[1] = (...g) => E(f) && E(f)(...g)),
            onFocus: p[2] || (p[2] = (g) => l.value = !0),
            onBlur: p[3] || (p[3] = (g) => l.value = !1)
          }, null, 42, cm)), [
            [zn, E(d)]
          ]) : ye((k(), W("input", {
            key: 1,
            id: E(r),
            "onUpdate:modelValue": p[4] || (p[4] = (g) => kt(d) ? d.value = g : null),
            class: V(E(h).e("original")),
            type: "checkbox",
            "aria-hidden": c.indeterminate ? "true" : "false",
            disabled: E(s),
            value: c.label,
            name: c.name,
            tabindex: c.tabindex,
            onChange: p[5] || (p[5] = (...g) => E(f) && E(f)(...g)),
            onFocus: p[6] || (p[6] = (g) => l.value = !0),
            onBlur: p[7] || (p[7] = (g) => l.value = !1)
          }, null, 42, dm)), [
            [zn, E(d)]
          ]),
          ie("span", {
            class: V(E(h).e("inner"))
          }, null, 2)
        ], 10, um),
        E(u) ? (k(), W("span", {
          key: 0,
          class: V(E(h).e("label"))
        }, [
          be(c.$slots, "default"),
          c.$slots.default ? Ee("v-if", !0) : (k(), W(yt, { key: 0 }, [
            vn(Xe(c.label), 1)
          ], 64))
        ], 2)) : Ee("v-if", !0)
      ]),
      _: 3
    }, 8, ["class", "aria-controls", "onClick"]));
  }
});
var vm = /* @__PURE__ */ he(pm, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
const hm = ["name", "tabindex", "disabled", "true-value", "false-value"], mm = ["name", "tabindex", "disabled", "value"], gm = j({
  name: "ElCheckboxButton"
}), bm = /* @__PURE__ */ j({
  ...gm,
  props: ps,
  emits: vs,
  setup(e) {
    const t = e, n = ol(), {
      isFocused: r,
      isChecked: o,
      isDisabled: a,
      checkboxButtonSize: s,
      model: l,
      handleChange: i
    } = hs(t, n), u = X(Gt, void 0), d = se("checkbox"), f = A(() => {
      var v, h, c, p;
      const g = (h = (v = u == null ? void 0 : u.fill) == null ? void 0 : v.value) != null ? h : "";
      return {
        backgroundColor: g,
        borderColor: g,
        color: (p = (c = u == null ? void 0 : u.textColor) == null ? void 0 : c.value) != null ? p : "",
        boxShadow: g ? `-1px 0 0 0 ${g}` : void 0
      };
    });
    return (v, h) => (k(), W("label", {
      class: V([
        E(d).b("button"),
        E(d).bm("button", E(s)),
        E(d).is("disabled", E(a)),
        E(d).is("checked", E(o)),
        E(d).is("focus", E(r))
      ])
    }, [
      v.trueLabel || v.falseLabel ? ye((k(), W("input", {
        key: 0,
        "onUpdate:modelValue": h[0] || (h[0] = (c) => kt(l) ? l.value = c : null),
        class: V(E(d).be("button", "original")),
        type: "checkbox",
        name: v.name,
        tabindex: v.tabindex,
        disabled: E(a),
        "true-value": v.trueLabel,
        "false-value": v.falseLabel,
        onChange: h[1] || (h[1] = (...c) => E(i) && E(i)(...c)),
        onFocus: h[2] || (h[2] = (c) => r.value = !0),
        onBlur: h[3] || (h[3] = (c) => r.value = !1)
      }, null, 42, hm)), [
        [zn, E(l)]
      ]) : ye((k(), W("input", {
        key: 1,
        "onUpdate:modelValue": h[4] || (h[4] = (c) => kt(l) ? l.value = c : null),
        class: V(E(d).be("button", "original")),
        type: "checkbox",
        name: v.name,
        tabindex: v.tabindex,
        disabled: E(a),
        value: v.label,
        onChange: h[5] || (h[5] = (...c) => E(i) && E(i)(...c)),
        onFocus: h[6] || (h[6] = (c) => r.value = !0),
        onBlur: h[7] || (h[7] = (c) => r.value = !1)
      }, null, 42, mm)), [
        [zn, E(l)]
      ]),
      v.$slots.default || v.label ? (k(), W("span", {
        key: 2,
        class: V(E(d).be("button", "inner")),
        style: ke(E(o) ? E(f) : void 0)
      }, [
        be(v.$slots, "default", {}, () => [
          vn(Xe(v.label), 1)
        ])
      ], 6)) : Ee("v-if", !0)
    ], 2));
  }
});
var ms = /* @__PURE__ */ he(bm, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
const ym = Oe({
  modelValue: {
    type: re(Array),
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number,
  size: Rl,
  label: String,
  fill: String,
  textColor: String,
  tag: {
    type: String,
    default: "div"
  },
  validateEvent: {
    type: Boolean,
    default: !0
  }
}), wm = {
  [rr]: (e) => Et(e),
  change: (e) => Et(e)
}, Cm = j({
  name: "ElCheckboxGroup"
}), Em = /* @__PURE__ */ j({
  ...Cm,
  props: ym,
  emits: wm,
  setup(e, { emit: t }) {
    const n = e, r = se("checkbox"), { formItem: o } = mo(), { inputId: a, isLabeledByFormItem: s } = kl(n, {
      formItemContext: o
    }), l = async (u) => {
      t(rr, u), await we(), t("change", u);
    }, i = A({
      get() {
        return n.modelValue;
      },
      set(u) {
        l(u);
      }
    });
    return Be(Gt, {
      ...bf(al(n), [
        "size",
        "min",
        "max",
        "disabled",
        "validateEvent",
        "fill",
        "textColor"
      ]),
      modelValue: i,
      changeEvent: l
    }), U(() => n.modelValue, () => {
      n.validateEvent && (o == null || o.validate("change").catch((u) => et(u)));
    }), (u, d) => {
      var f;
      return k(), ve(Xr(u.tag), {
        id: E(a),
        class: V(E(r).b("group")),
        role: "group",
        "aria-label": E(s) ? void 0 : u.label || "checkbox-group",
        "aria-labelledby": E(s) ? (f = E(o)) == null ? void 0 : f.labelId : void 0
      }, {
        default: ue(() => [
          be(u.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});
var gs = /* @__PURE__ */ he(Em, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
const jt = Ut(vm, {
  CheckboxButton: ms,
  CheckboxGroup: gs
});
co(ms);
co(gs);
var Sm = /["'&<>]/, _m = xm;
function xm(e) {
  var t = "" + e, n = Sm.exec(t);
  if (!n)
    return t;
  var r, o = "", a = 0, s = 0;
  for (a = n.index; a < t.length; a++) {
    switch (t.charCodeAt(a)) {
      case 34:
        r = "&quot;";
        break;
      case 38:
        r = "&amp;";
        break;
      case 39:
        r = "&#39;";
        break;
      case 60:
        r = "&lt;";
        break;
      case 62:
        r = "&gt;";
        break;
      default:
        continue;
    }
    s !== a && (o += t.substring(s, a)), s = a + 1, o += r;
  }
  return s !== a ? o + t.substring(s, a) : o;
}
const wr = function(e) {
  var t;
  return (t = e.target) == null ? void 0 : t.closest("td");
}, ja = function(e) {
  return e !== null && typeof e == "object";
}, Tm = function(e, t, n, r, o) {
  if (!t && !r && (!o || Array.isArray(o) && !o.length))
    return e;
  typeof n == "string" ? n = n === "descending" ? -1 : 1 : n = n && n < 0 ? -1 : 1;
  const a = r ? null : function(l, i) {
    return o ? (Array.isArray(o) || (o = [o]), o.map((u) => typeof u == "string" ? un(l, u) : u(l, i, e))) : (t !== "$key" && ja(l) && "$value" in l && (l = l.$value), [ja(l) ? un(l, t) : l]);
  }, s = function(l, i) {
    if (r)
      return r(l.value, i.value);
    for (let u = 0, d = l.key.length; u < d; u++) {
      if (l.key[u] < i.key[u])
        return -1;
      if (l.key[u] > i.key[u])
        return 1;
    }
    return 0;
  };
  return e.map((l, i) => ({
    value: l,
    index: i,
    key: a ? a(l, i) : null
  })).sort((l, i) => {
    let u = s(l, i);
    return u || (u = l.index - i.index), u * +n;
  }).map((l) => l.value);
}, bs = function(e, t) {
  let n = null;
  return e.columns.forEach((r) => {
    r.id === t && (n = r);
  }), n;
}, Om = function(e, t) {
  let n = null;
  for (let r = 0; r < e.columns.length; r++) {
    const o = e.columns[r];
    if (o.columnKey === t) {
      n = o;
      break;
    }
  }
  return n || Sl("ElTable", `No column matching with column-key: ${t}`), n;
}, Ka = function(e, t, n) {
  const r = (t.className || "").match(new RegExp(`${n}-table_[^\\s]+`, "gm"));
  return r ? bs(e, r[0]) : null;
}, pe = (e, t) => {
  if (!e)
    throw new Error("Row is required when get row identity");
  if (typeof t == "string") {
    if (!t.includes("."))
      return `${e[t]}`;
    const n = t.split(".");
    let r = e;
    for (const o of n)
      r = r[o];
    return `${r}`;
  } else if (typeof t == "function")
    return t.call(null, e);
}, mt = function(e, t) {
  const n = {};
  return (e || []).forEach((r, o) => {
    n[pe(r, t)] = { row: r, index: o };
  }), n;
};
function $m(e, t) {
  const n = {};
  let r;
  for (r in e)
    n[r] = e[r];
  for (r in t)
    if (Ct(t, r)) {
      const o = t[r];
      typeof o < "u" && (n[r] = o);
    }
  return n;
}
function Po(e) {
  return e === "" || e !== void 0 && (e = Number.parseInt(e, 10), Number.isNaN(e) && (e = "")), e;
}
function ys(e) {
  return e === "" || e !== void 0 && (e = Po(e), Number.isNaN(e) && (e = 80)), e;
}
function Pm(e) {
  return typeof e == "number" ? e : typeof e == "string" ? /^\d+(?:px)?$/.test(e) ? Number.parseInt(e, 10) : e : null;
}
function Am(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...r) => t(n(...r)));
}
function on(e, t, n) {
  let r = !1;
  const o = e.indexOf(t), a = o !== -1, s = (l) => {
    l === "add" ? e.push(t) : e.splice(o, 1), r = !0, Et(t.children) && t.children.forEach((i) => {
      on(e, i, n ?? !a);
    });
  };
  return Mt(n) ? n && !a ? s("add") : !n && a && s("remove") : s(a ? "remove" : "add"), r;
}
function Rm(e, t, n = "children", r = "hasChildren") {
  const o = (s) => !(Array.isArray(s) && s.length);
  function a(s, l, i) {
    t(s, l, i), l.forEach((u) => {
      if (u[r]) {
        t(u, null, i + 1);
        return;
      }
      const d = u[n];
      o(d) || a(u, d, i + 1);
    });
  }
  e.forEach((s) => {
    if (s[r]) {
      t(s, null, 0);
      return;
    }
    const l = s[n];
    o(l) || a(s, l, 0);
  });
}
let Ye;
function Lm(e, t, n, r, o) {
  const { nextZIndex: a } = Bl(), s = e == null ? void 0 : e.dataset.prefix, l = e == null ? void 0 : e.querySelector(`.${s}-scrollbar__wrap`);
  function i() {
    const c = o === "light", p = document.createElement("div");
    return p.className = `${s}-popper ${c ? "is-light" : "is-dark"}`, n = _m(n), p.innerHTML = n, p.style.zIndex = String(a()), e == null || e.appendChild(p), p;
  }
  function u() {
    const c = document.createElement("div");
    return c.className = `${s}-popper__arrow`, c;
  }
  function d() {
    f && f.update();
  }
  Ye == null || Ye(), Ye = () => {
    try {
      f && f.destroy(), v && (e == null || e.removeChild(v)), t.removeEventListener("mouseenter", d), t.removeEventListener("mouseleave", Ye), l == null || l.removeEventListener("scroll", Ye), Ye = void 0;
    } catch {
    }
  };
  let f = null;
  const v = i(), h = u();
  return v.appendChild(h), f = ts(t, v, {
    strategy: "absolute",
    modifiers: [
      {
        name: "offset",
        options: {
          offset: [0, 8]
        }
      },
      {
        name: "arrow",
        options: {
          element: h,
          padding: 10
        }
      }
    ],
    ...r
  }), t.addEventListener("mouseenter", d), t.addEventListener("mouseleave", Ye), l == null || l.addEventListener("scroll", Ye), f;
}
function ws(e) {
  return e.children ? ff(e.children, ws) : [e];
}
function Va(e, t) {
  return e + t.colSpan;
}
const Cs = (e, t, n, r) => {
  let o = 0, a = e;
  const s = n.states.columns.value;
  if (r) {
    const i = ws(r[e]);
    o = s.slice(0, s.indexOf(i[0])).reduce(Va, 0), a = o + i.reduce(Va, 0) - 1;
  } else
    o = e;
  let l;
  switch (t) {
    case "left":
      a < n.states.fixedLeafColumnsLength.value && (l = "left");
      break;
    case "right":
      o >= s.length - n.states.rightFixedLeafColumnsLength.value && (l = "right");
      break;
    default:
      a < n.states.fixedLeafColumnsLength.value ? l = "left" : o >= s.length - n.states.rightFixedLeafColumnsLength.value && (l = "right");
  }
  return l ? {
    direction: l,
    start: o,
    after: a
  } : {};
}, Ao = (e, t, n, r, o, a = 0) => {
  const s = [], { direction: l, start: i, after: u } = Cs(t, n, r, o);
  if (l) {
    const d = l === "left";
    s.push(`${e}-fixed-column--${l}`), d && u + a === r.states.fixedLeafColumnsLength.value - 1 ? s.push("is-last-column") : !d && i - a === r.states.columns.value.length - r.states.rightFixedLeafColumnsLength.value && s.push("is-first-column");
  }
  return s;
};
function Ua(e, t) {
  return e + (t.realWidth === null || Number.isNaN(t.realWidth) ? Number(t.width) : t.realWidth);
}
const Ro = (e, t, n, r) => {
  const {
    direction: o,
    start: a = 0,
    after: s = 0
  } = Cs(e, t, n, r);
  if (!o)
    return;
  const l = {}, i = o === "left", u = n.states.columns.value;
  return i ? l.left = u.slice(0, a).reduce(Ua, 0) : l.right = u.slice(s + 1).reverse().reduce(Ua, 0), l;
}, Kt = (e, t) => {
  e && (Number.isNaN(e[t]) || (e[t] = `${e[t]}px`));
};
function Nm(e) {
  const t = le(), n = x(!1), r = x([]);
  return {
    updateExpandRows: () => {
      const i = e.data.value || [], u = e.rowKey.value;
      if (n.value)
        r.value = i.slice();
      else if (u) {
        const d = mt(r.value, u);
        r.value = i.reduce((f, v) => {
          const h = pe(v, u);
          return d[h] && f.push(v), f;
        }, []);
      } else
        r.value = [];
    },
    toggleRowExpansion: (i, u) => {
      on(r.value, i, u) && t.emit("expand-change", i, r.value.slice());
    },
    setExpandRowKeys: (i) => {
      t.store.assertRowKey();
      const u = e.data.value || [], d = e.rowKey.value, f = mt(u, d);
      r.value = i.reduce((v, h) => {
        const c = f[h];
        return c && v.push(c.row), v;
      }, []);
    },
    isRowExpanded: (i) => {
      const u = e.rowKey.value;
      return u ? !!mt(r.value, u)[pe(i, u)] : r.value.includes(i);
    },
    states: {
      expandRows: r,
      defaultExpandAll: n
    }
  };
}
function km(e) {
  const t = le(), n = x(null), r = x(null), o = (u) => {
    t.store.assertRowKey(), n.value = u, s(u);
  }, a = () => {
    n.value = null;
  }, s = (u) => {
    const { data: d, rowKey: f } = e;
    let v = null;
    f.value && (v = (E(d) || []).find((h) => pe(h, f.value) === u)), r.value = v, t.emit("current-change", r.value, null);
  };
  return {
    setCurrentRowKey: o,
    restoreCurrentRowKey: a,
    setCurrentRowByKey: s,
    updateCurrentRow: (u) => {
      const d = r.value;
      if (u && u !== d) {
        r.value = u, t.emit("current-change", r.value, d);
        return;
      }
      !u && d && (r.value = null, t.emit("current-change", null, d));
    },
    updateCurrentRowData: () => {
      const u = e.rowKey.value, d = e.data.value || [], f = r.value;
      if (!d.includes(f) && f) {
        if (u) {
          const v = pe(f, u);
          s(v);
        } else
          r.value = null;
        r.value === null && t.emit("current-change", null, f);
      } else
        n.value && (s(n.value), a());
    },
    states: {
      _currentRowKey: n,
      currentRow: r
    }
  };
}
function Im(e) {
  const t = x([]), n = x({}), r = x(16), o = x(!1), a = x({}), s = x("hasChildren"), l = x("children"), i = le(), u = A(() => {
    if (!e.rowKey.value)
      return {};
    const m = e.data.value || [];
    return f(m);
  }), d = A(() => {
    const m = e.rowKey.value, w = Object.keys(a.value), b = {};
    return w.length && w.forEach((y) => {
      if (a.value[y].length) {
        const S = { children: [] };
        a.value[y].forEach((_) => {
          const C = pe(_, m);
          S.children.push(C), _[s.value] && !b[C] && (b[C] = { children: [] });
        }), b[y] = S;
      }
    }), b;
  }), f = (m) => {
    const w = e.rowKey.value, b = {};
    return Rm(m, (y, S, _) => {
      const C = pe(y, w);
      Array.isArray(S) ? b[C] = {
        children: S.map((T) => pe(T, w)),
        level: _
      } : o.value && (b[C] = {
        children: [],
        lazy: !0,
        level: _
      });
    }, l.value, s.value), b;
  }, v = (m = !1, w = ((b) => (b = i.store) == null ? void 0 : b.states.defaultExpandAll.value)()) => {
    var b;
    const y = u.value, S = d.value, _ = Object.keys(y), C = {};
    if (_.length) {
      const T = E(n), $ = [], M = (L, K) => {
        if (m)
          return t.value ? w || t.value.includes(K) : !!(w || L != null && L.expanded);
        {
          const I = w || t.value && t.value.includes(K);
          return !!(L != null && L.expanded || I);
        }
      };
      _.forEach((L) => {
        const K = T[L], I = { ...y[L] };
        if (I.expanded = M(K, L), I.lazy) {
          const { loaded: P = !1, loading: B = !1 } = K || {};
          I.loaded = !!P, I.loading = !!B, $.push(L);
        }
        C[L] = I;
      });
      const D = Object.keys(S);
      o.value && D.length && $.length && D.forEach((L) => {
        const K = T[L], I = S[L].children;
        if ($.includes(L)) {
          if (C[L].children.length !== 0)
            throw new Error("[ElTable]children must be an empty array.");
          C[L].children = I;
        } else {
          const { loaded: P = !1, loading: B = !1 } = K || {};
          C[L] = {
            lazy: !0,
            loaded: !!P,
            loading: !!B,
            expanded: M(K, L),
            children: I,
            level: ""
          };
        }
      });
    }
    n.value = C, (b = i.store) == null || b.updateTableScrollY();
  };
  U(() => t.value, () => {
    v(!0);
  }), U(() => u.value, () => {
    v();
  }), U(() => d.value, () => {
    v();
  });
  const h = (m) => {
    t.value = m, v();
  }, c = (m, w) => {
    i.store.assertRowKey();
    const b = e.rowKey.value, y = pe(m, b), S = y && n.value[y];
    if (y && S && "expanded" in S) {
      const _ = S.expanded;
      w = typeof w > "u" ? !S.expanded : w, n.value[y].expanded = w, _ !== w && i.emit("expand-change", m, w), i.store.updateTableScrollY();
    }
  }, p = (m) => {
    i.store.assertRowKey();
    const w = e.rowKey.value, b = pe(m, w), y = n.value[b];
    o.value && y && "loaded" in y && !y.loaded ? g(m, b, y) : c(m, void 0);
  }, g = (m, w, b) => {
    const { load: y } = i.props;
    y && !n.value[w].loaded && (n.value[w].loading = !0, y(m, b, (S) => {
      if (!Array.isArray(S))
        throw new TypeError("[ElTable] data must be an array");
      n.value[w].loading = !1, n.value[w].loaded = !0, n.value[w].expanded = !0, S.length && (a.value[w] = S), i.emit("expand-change", m, !0);
    }));
  };
  return {
    loadData: g,
    loadOrToggle: p,
    toggleTreeExpansion: c,
    updateTreeExpandKeys: h,
    updateTreeData: v,
    normalize: f,
    states: {
      expandRowKeys: t,
      treeData: n,
      indent: r,
      lazy: o,
      lazyTreeNodeMap: a,
      lazyColumnIdentifier: s,
      childrenColumnName: l
    }
  };
}
const Fm = (e, t) => {
  const n = t.sortingColumn;
  return !n || typeof n.sortable == "string" ? e : Tm(e, t.sortProp, t.sortOrder, n.sortMethod, n.sortBy);
}, Dn = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.children ? t.push.apply(t, Dn(n.children)) : t.push(n);
  }), t;
};
function Mm() {
  var e;
  const t = le(), { size: n } = al((e = t.proxy) == null ? void 0 : e.$props), r = x(null), o = x([]), a = x([]), s = x(!1), l = x([]), i = x([]), u = x([]), d = x([]), f = x([]), v = x([]), h = x([]), c = x([]), p = x(0), g = x(0), m = x(0), w = x(!1), b = x([]), y = x(!1), S = x(!1), _ = x(null), C = x({}), T = x(null), $ = x(null), M = x(null), D = x(null), L = x(null);
  U(o, () => t.state && B(!1), {
    deep: !0
  });
  const K = () => {
    if (!r.value)
      throw new Error("[ElTable] prop row-key is required");
  }, I = (F) => {
    var z;
    (z = F.children) == null || z.forEach((q) => {
      q.fixed = F.fixed, I(q);
    });
  }, P = () => {
    l.value.forEach((Q) => {
      I(Q);
    }), d.value = l.value.filter((Q) => Q.fixed === !0 || Q.fixed === "left"), f.value = l.value.filter((Q) => Q.fixed === "right"), d.value.length > 0 && l.value[0] && l.value[0].type === "selection" && !l.value[0].fixed && (l.value[0].fixed = !0, d.value.unshift(l.value[0]));
    const F = l.value.filter((Q) => !Q.fixed);
    i.value = [].concat(d.value).concat(F).concat(f.value);
    const z = Dn(F), q = Dn(d.value), G = Dn(f.value);
    p.value = z.length, g.value = q.length, m.value = G.length, u.value = [].concat(q).concat(z).concat(G), s.value = d.value.length > 0 || f.value.length > 0;
  }, B = (F, z = !1) => {
    F && P(), z ? t.state.doLayout() : t.state.debouncedUpdateLayout();
  }, J = (F) => b.value.includes(F), R = () => {
    w.value = !1, b.value.length && (b.value = [], t.emit("selection-change", []));
  }, O = () => {
    let F;
    if (r.value) {
      F = [];
      const z = mt(b.value, r.value), q = mt(o.value, r.value);
      for (const G in z)
        Ct(z, G) && !q[G] && F.push(z[G].row);
    } else
      F = b.value.filter((z) => !o.value.includes(z));
    if (F.length) {
      const z = b.value.filter((q) => !F.includes(q));
      b.value = z, t.emit("selection-change", z.slice());
    }
  }, H = () => (b.value || []).slice(), Z = (F, z = void 0, q = !0) => {
    if (on(b.value, F, z)) {
      const Q = (b.value || []).slice();
      q && t.emit("select", Q, F), t.emit("selection-change", Q);
    }
  }, ee = () => {
    var F, z;
    const q = S.value ? !w.value : !(w.value || b.value.length);
    w.value = q;
    let G = !1, Q = 0;
    const ge = (z = (F = t == null ? void 0 : t.store) == null ? void 0 : F.states) == null ? void 0 : z.rowKey.value;
    o.value.forEach(($e, Pt) => {
      const Ue = Pt + Q;
      _.value ? _.value.call(null, $e, Ue) && on(b.value, $e, q) && (G = !0) : on(b.value, $e, q) && (G = !0), Q += te(pe($e, ge));
    }), G && t.emit("selection-change", b.value ? b.value.slice() : []), t.emit("select-all", b.value);
  }, oe = () => {
    const F = mt(b.value, r.value);
    o.value.forEach((z) => {
      const q = pe(z, r.value), G = F[q];
      G && (b.value[G.index] = z);
    });
  }, ce = () => {
    var F, z, q;
    if (((F = o.value) == null ? void 0 : F.length) === 0) {
      w.value = !1;
      return;
    }
    let G;
    r.value && (G = mt(b.value, r.value));
    const Q = function(Ue) {
      return G ? !!G[pe(Ue, r.value)] : b.value.includes(Ue);
    };
    let ge = !0, $e = 0, Pt = 0;
    for (let Ue = 0, Hs = (o.value || []).length; Ue < Hs; Ue++) {
      const zs = (q = (z = t == null ? void 0 : t.store) == null ? void 0 : z.states) == null ? void 0 : q.rowKey.value, Ws = Ue + Pt, fr = o.value[Ue], js = _.value && _.value.call(null, fr, Ws);
      if (Q(fr))
        $e++;
      else if (!_.value || js) {
        ge = !1;
        break;
      }
      Pt += te(pe(fr, zs));
    }
    $e === 0 && (ge = !1), w.value = ge;
  }, te = (F) => {
    var z;
    if (!t || !t.store)
      return 0;
    const { treeData: q } = t.store.states;
    let G = 0;
    const Q = (z = q.value[F]) == null ? void 0 : z.children;
    return Q && (G += Q.length, Q.forEach((ge) => {
      G += te(ge);
    })), G;
  }, me = (F, z) => {
    Array.isArray(F) || (F = [F]);
    const q = {};
    return F.forEach((G) => {
      C.value[G.id] = z, q[G.columnKey || G.id] = z;
    }), q;
  }, fe = (F, z, q) => {
    $.value && $.value !== F && ($.value.order = null), $.value = F, M.value = z, D.value = q;
  }, ae = () => {
    let F = E(a);
    Object.keys(C.value).forEach((z) => {
      const q = C.value[z];
      if (!q || q.length === 0)
        return;
      const G = bs({
        columns: u.value
      }, z);
      G && G.filterMethod && (F = F.filter((Q) => q.some((ge) => G.filterMethod.call(null, ge, Q, G))));
    }), T.value = F;
  }, Ke = () => {
    o.value = Fm(T.value, {
      sortingColumn: $.value,
      sortProp: M.value,
      sortOrder: D.value
    });
  }, Xt = (F = void 0) => {
    F && F.filter || ae(), Ke();
  }, Jt = (F) => {
    const { tableHeaderRef: z } = t.refs;
    if (!z)
      return;
    const q = Object.assign({}, z.filterPanels), G = Object.keys(q);
    if (G.length)
      if (typeof F == "string" && (F = [F]), Array.isArray(F)) {
        const Q = F.map((ge) => Om({
          columns: u.value
        }, ge));
        G.forEach((ge) => {
          const $e = Q.find((Pt) => Pt.id === ge);
          $e && ($e.filteredValue = []);
        }), t.store.commit("filterChange", {
          column: Q,
          values: [],
          silent: !0,
          multi: !0
        });
      } else
        G.forEach((Q) => {
          const ge = u.value.find(($e) => $e.id === Q);
          ge && (ge.filteredValue = []);
        }), C.value = {}, t.store.commit("filterChange", {
          column: {},
          values: [],
          silent: !0
        });
  }, lr = () => {
    $.value && (fe(null, null, null), t.store.commit("changeSortCondition", {
      silent: !0
    }));
  }, {
    setExpandRowKeys: yn,
    toggleRowExpansion: wn,
    updateExpandRows: sr,
    states: Cn,
    isRowExpanded: En
  } = Nm({
    data: o,
    rowKey: r
  }), {
    updateTreeExpandKeys: ir,
    toggleTreeExpansion: ur,
    updateTreeData: Ve,
    loadOrToggle: $t,
    states: Sn
  } = Im({
    data: o,
    rowKey: r
  }), {
    updateCurrentRowData: _n,
    updateCurrentRow: Zt,
    setCurrentRowKey: xn,
    states: Tn
  } = km({
    data: o,
    rowKey: r
  });
  return {
    assertRowKey: K,
    updateColumns: P,
    scheduleLayout: B,
    isSelected: J,
    clearSelection: R,
    cleanSelection: O,
    getSelectionRows: H,
    toggleRowSelection: Z,
    _toggleAllSelection: ee,
    toggleAllSelection: null,
    updateSelectionByRowKey: oe,
    updateAllSelected: ce,
    updateFilters: me,
    updateCurrentRow: Zt,
    updateSort: fe,
    execFilter: ae,
    execSort: Ke,
    execQuery: Xt,
    clearFilter: Jt,
    clearSort: lr,
    toggleRowExpansion: wn,
    setExpandRowKeysAdapter: (F) => {
      yn(F), ir(F);
    },
    setCurrentRowKey: xn,
    toggleRowExpansionAdapter: (F, z) => {
      u.value.some(({ type: G }) => G === "expand") ? wn(F, z) : ur(F, z);
    },
    isRowExpanded: En,
    updateExpandRows: sr,
    updateCurrentRowData: _n,
    loadOrToggle: $t,
    updateTreeData: Ve,
    states: {
      tableSize: n,
      rowKey: r,
      data: o,
      _data: a,
      isComplex: s,
      _columns: l,
      originColumns: i,
      columns: u,
      fixedColumns: d,
      rightFixedColumns: f,
      leafColumns: v,
      fixedLeafColumns: h,
      rightFixedLeafColumns: c,
      leafColumnsLength: p,
      fixedLeafColumnsLength: g,
      rightFixedLeafColumnsLength: m,
      isAllSelected: w,
      selection: b,
      reserveSelection: y,
      selectOnIndeterminate: S,
      selectable: _,
      filters: C,
      filteredData: T,
      sortingColumn: $,
      sortProp: M,
      sortOrder: D,
      hoverRow: L,
      ...Cn,
      ...Sn,
      ...Tn
    }
  };
}
function Kr(e, t) {
  return e.map((n) => {
    var r;
    return n.id === t.id ? t : ((r = n.children) != null && r.length && (n.children = Kr(n.children, t)), n);
  });
}
function Es(e) {
  e.forEach((t) => {
    var n, r;
    t.no = (n = t.getColumnIndex) == null ? void 0 : n.call(t), (r = t.children) != null && r.length && Es(t.children);
  }), e.sort((t, n) => t.no - n.no);
}
function Bm() {
  const e = le(), t = Mm();
  return {
    ns: se("table"),
    ...t,
    mutations: {
      setData(s, l) {
        const i = E(s._data) !== l;
        s.data.value = l, s._data.value = l, e.store.execQuery(), e.store.updateCurrentRowData(), e.store.updateExpandRows(), e.store.updateTreeData(e.store.states.defaultExpandAll.value), E(s.reserveSelection) ? (e.store.assertRowKey(), e.store.updateSelectionByRowKey()) : i ? e.store.clearSelection() : e.store.cleanSelection(), e.store.updateAllSelected(), e.$ready && e.store.scheduleLayout();
      },
      insertColumn(s, l, i) {
        const u = E(s._columns);
        let d = [];
        i ? (i && !i.children && (i.children = []), i.children.push(l), d = Kr(u, i)) : (u.push(l), d = u), Es(d), s._columns.value = d, l.type === "selection" && (s.selectable.value = l.selectable, s.reserveSelection.value = l.reserveSelection), e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      removeColumn(s, l, i) {
        const u = E(s._columns) || [];
        if (i)
          i.children.splice(i.children.findIndex((d) => d.id === l.id), 1), we(() => {
            var d;
            ((d = i.children) == null ? void 0 : d.length) === 0 && delete i.children;
          }), s._columns.value = Kr(u, i);
        else {
          const d = u.indexOf(l);
          d > -1 && (u.splice(d, 1), s._columns.value = u);
        }
        e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      sort(s, l) {
        const { prop: i, order: u, init: d } = l;
        if (i) {
          const f = E(s.columns).find((v) => v.property === i);
          f && (f.order = u, e.store.updateSort(f, i, u), e.store.commit("changeSortCondition", { init: d }));
        }
      },
      changeSortCondition(s, l) {
        const { sortingColumn: i, sortProp: u, sortOrder: d } = s, f = E(i), v = E(u), h = E(d);
        h === null && (s.sortingColumn.value = null, s.sortProp.value = null);
        const c = { filter: !0 };
        e.store.execQuery(c), (!l || !(l.silent || l.init)) && e.emit("sort-change", {
          column: f,
          prop: v,
          order: h
        }), e.store.updateTableScrollY();
      },
      filterChange(s, l) {
        const { column: i, values: u, silent: d } = l, f = e.store.updateFilters(i, u);
        e.store.execQuery(), d || e.emit("filter-change", f), e.store.updateTableScrollY();
      },
      toggleAllSelection() {
        e.store.toggleAllSelection();
      },
      rowSelectedChanged(s, l) {
        e.store.toggleRowSelection(l), e.store.updateAllSelected();
      },
      setHoverRow(s, l) {
        s.hoverRow.value = l;
      },
      setCurrentRow(s, l) {
        e.store.updateCurrentRow(l);
      }
    },
    commit: function(s, ...l) {
      const i = e.store.mutations;
      if (i[s])
        i[s].apply(e, [e.store.states].concat(l));
      else
        throw new Error(`Action not found: ${s}`);
    },
    updateTableScrollY: function() {
      we(() => e.layout.updateScrollY.apply(e.layout));
    }
  };
}
const an = {
  rowKey: "rowKey",
  defaultExpandAll: "defaultExpandAll",
  selectOnIndeterminate: "selectOnIndeterminate",
  indent: "indent",
  lazy: "lazy",
  data: "data",
  ["treeProps.hasChildren"]: {
    key: "lazyColumnIdentifier",
    default: "hasChildren"
  },
  ["treeProps.children"]: {
    key: "childrenColumnName",
    default: "children"
  }
};
function Dm(e, t) {
  if (!e)
    throw new Error("Table is required.");
  const n = Bm();
  return n.toggleAllSelection = Kn(n._toggleAllSelection, 10), Object.keys(an).forEach((r) => {
    Ss(_s(t, r), r, n);
  }), Hm(n, t), n;
}
function Hm(e, t) {
  Object.keys(an).forEach((n) => {
    U(() => _s(t, n), (r) => {
      Ss(r, n, e);
    });
  });
}
function Ss(e, t, n) {
  let r = e, o = an[t];
  typeof an[t] == "object" && (o = o.key, r = r || an[t].default), n.states[o].value = r;
}
function _s(e, t) {
  if (t.includes(".")) {
    const n = t.split(".");
    let r = e;
    return n.forEach((o) => {
      r = r[o];
    }), r;
  } else
    return e[t];
}
class zm {
  constructor(t) {
    this.observers = [], this.table = null, this.store = null, this.columns = [], this.fit = !0, this.showHeader = !0, this.height = x(null), this.scrollX = x(!1), this.scrollY = x(!1), this.bodyWidth = x(null), this.fixedWidth = x(null), this.rightFixedWidth = x(null), this.gutterWidth = 0;
    for (const n in t)
      Ct(t, n) && (kt(this[n]) ? this[n].value = t[n] : this[n] = t[n]);
    if (!this.table)
      throw new Error("Table is required for Table Layout");
    if (!this.store)
      throw new Error("Store is required for Table Layout");
  }
  updateScrollY() {
    if (this.height.value === null)
      return !1;
    const n = this.table.refs.scrollBarRef;
    if (this.table.vnode.el && n) {
      let r = !0;
      const o = this.scrollY.value;
      return r = n.wrapRef.scrollHeight > n.wrapRef.clientHeight, this.scrollY.value = r, o !== r;
    }
    return !1;
  }
  setHeight(t, n = "height") {
    if (!de)
      return;
    const r = this.table.vnode.el;
    if (t = Pm(t), this.height.value = Number(t), !r && (t || t === 0))
      return we(() => this.setHeight(t, n));
    typeof t == "number" ? (r.style[n] = `${t}px`, this.updateElsHeight()) : typeof t == "string" && (r.style[n] = t, this.updateElsHeight());
  }
  setMaxHeight(t) {
    this.setHeight(t, "max-height");
  }
  getFlattenColumns() {
    const t = [];
    return this.table.store.states.columns.value.forEach((r) => {
      r.isColumnGroup ? t.push.apply(t, r.columns) : t.push(r);
    }), t;
  }
  updateElsHeight() {
    this.updateScrollY(), this.notifyObservers("scrollable");
  }
  headerDisplayNone(t) {
    if (!t)
      return !0;
    let n = t;
    for (; n.tagName !== "DIV"; ) {
      if (getComputedStyle(n).display === "none")
        return !0;
      n = n.parentElement;
    }
    return !1;
  }
  updateColumnsWidth() {
    if (!de)
      return;
    const t = this.fit, n = this.table.vnode.el.clientWidth;
    let r = 0;
    const o = this.getFlattenColumns(), a = o.filter((i) => typeof i.width != "number");
    if (o.forEach((i) => {
      typeof i.width == "number" && i.realWidth && (i.realWidth = null);
    }), a.length > 0 && t) {
      if (o.forEach((i) => {
        r += Number(i.width || i.minWidth || 80);
      }), r <= n) {
        this.scrollX.value = !1;
        const i = n - r;
        if (a.length === 1)
          a[0].realWidth = Number(a[0].minWidth || 80) + i;
        else {
          const u = a.reduce((v, h) => v + Number(h.minWidth || 80), 0), d = i / u;
          let f = 0;
          a.forEach((v, h) => {
            if (h === 0)
              return;
            const c = Math.floor(Number(v.minWidth || 80) * d);
            f += c, v.realWidth = Number(v.minWidth || 80) + c;
          }), a[0].realWidth = Number(a[0].minWidth || 80) + i - f;
        }
      } else
        this.scrollX.value = !0, a.forEach((i) => {
          i.realWidth = Number(i.minWidth);
        });
      this.bodyWidth.value = Math.max(r, n), this.table.state.resizeState.value.width = this.bodyWidth.value;
    } else
      o.forEach((i) => {
        !i.width && !i.minWidth ? i.realWidth = 80 : i.realWidth = Number(i.width || i.minWidth), r += i.realWidth;
      }), this.scrollX.value = r > n, this.bodyWidth.value = r;
    const s = this.store.states.fixedColumns.value;
    if (s.length > 0) {
      let i = 0;
      s.forEach((u) => {
        i += Number(u.realWidth || u.width);
      }), this.fixedWidth.value = i;
    }
    const l = this.store.states.rightFixedColumns.value;
    if (l.length > 0) {
      let i = 0;
      l.forEach((u) => {
        i += Number(u.realWidth || u.width);
      }), this.rightFixedWidth.value = i;
    }
    this.notifyObservers("columns");
  }
  addObserver(t) {
    this.observers.push(t);
  }
  removeObserver(t) {
    const n = this.observers.indexOf(t);
    n !== -1 && this.observers.splice(n, 1);
  }
  notifyObservers(t) {
    this.observers.forEach((r) => {
      var o, a;
      switch (t) {
        case "columns":
          (o = r.state) == null || o.onColumnsChange(this);
          break;
        case "scrollable":
          (a = r.state) == null || a.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${t}.`);
      }
    });
  }
}
const { CheckboxGroup: Wm } = jt, jm = j({
  name: "ElTableFilterPanel",
  components: {
    ElCheckbox: jt,
    ElCheckboxGroup: Wm,
    ElScrollbar: Dl,
    ElTooltip: qh,
    ElIcon: go,
    ArrowDown: Gf,
    ArrowUp: op
  },
  directives: { ClickOutside: Xh },
  props: {
    placement: {
      type: String,
      default: "bottom-start"
    },
    store: {
      type: Object
    },
    column: {
      type: Object
    },
    upDataColumn: {
      type: Function
    }
  },
  setup(e) {
    const t = le(), { t: n } = Il(), r = se("table-filter"), o = t == null ? void 0 : t.parent;
    o.filterPanels.value[e.column.id] || (o.filterPanels.value[e.column.id] = t);
    const a = x(!1), s = x(null), l = A(() => e.column && e.column.filters), i = A({
      get: () => {
        var y;
        return (((y = e.column) == null ? void 0 : y.filteredValue) || [])[0];
      },
      set: (y) => {
        u.value && (typeof y < "u" && y !== null ? u.value.splice(0, 1, y) : u.value.splice(0, 1));
      }
    }), u = A({
      get() {
        return e.column ? e.column.filteredValue || [] : [];
      },
      set(y) {
        e.column && e.upDataColumn("filteredValue", y);
      }
    }), d = A(() => e.column ? e.column.filterMultiple : !0), f = (y) => y.value === i.value, v = () => {
      a.value = !1;
    }, h = (y) => {
      y.stopPropagation(), a.value = !a.value;
    }, c = () => {
      a.value = !1;
    }, p = () => {
      w(u.value), v();
    }, g = () => {
      u.value = [], w(u.value), v();
    }, m = (y) => {
      i.value = y, w(typeof y < "u" && y !== null ? u.value : []), v();
    }, w = (y) => {
      e.store.commit("filterChange", {
        column: e.column,
        values: y
      }), e.store.updateAllSelected();
    };
    U(a, (y) => {
      e.column && e.upDataColumn("filterOpened", y);
    }, {
      immediate: !0
    });
    const b = A(() => {
      var y, S;
      return (S = (y = s.value) == null ? void 0 : y.popperRef) == null ? void 0 : S.contentRef;
    });
    return {
      tooltipVisible: a,
      multiple: d,
      filteredValue: u,
      filterValue: i,
      filters: l,
      handleConfirm: p,
      handleReset: g,
      handleSelect: m,
      isActive: f,
      t: n,
      ns: r,
      showFilterPanel: h,
      hideFilterPanel: c,
      popperPaneRef: b,
      tooltip: s
    };
  }
}), Km = { key: 0 }, Vm = ["disabled"], Um = ["label", "onClick"];
function Gm(e, t, n, r, o, a) {
  const s = Pe("el-checkbox"), l = Pe("el-checkbox-group"), i = Pe("el-scrollbar"), u = Pe("arrow-up"), d = Pe("arrow-down"), f = Pe("el-icon"), v = Pe("el-tooltip"), h = _t("click-outside");
  return k(), ve(v, {
    ref: "tooltip",
    visible: e.tooltipVisible,
    offset: 0,
    placement: e.placement,
    "show-arrow": !1,
    "stop-popper-mouse-event": !1,
    teleported: "",
    effect: "light",
    pure: "",
    "popper-class": e.ns.b(),
    persistent: ""
  }, {
    content: ue(() => [
      e.multiple ? (k(), W("div", Km, [
        ie("div", {
          class: V(e.ns.e("content"))
        }, [
          N(i, {
            "wrap-class": e.ns.e("wrap")
          }, {
            default: ue(() => [
              N(l, {
                modelValue: e.filteredValue,
                "onUpdate:modelValue": t[0] || (t[0] = (c) => e.filteredValue = c),
                class: V(e.ns.e("checkbox-group"))
              }, {
                default: ue(() => [
                  (k(!0), W(yt, null, Cr(e.filters, (c) => (k(), ve(s, {
                    key: c.value,
                    label: c.value
                  }, {
                    default: ue(() => [
                      vn(Xe(c.text), 1)
                    ]),
                    _: 2
                  }, 1032, ["label"]))), 128))
                ]),
                _: 1
              }, 8, ["modelValue", "class"])
            ]),
            _: 1
          }, 8, ["wrap-class"])
        ], 2),
        ie("div", {
          class: V(e.ns.e("bottom"))
        }, [
          ie("button", {
            class: V({ [e.ns.is("disabled")]: e.filteredValue.length === 0 }),
            disabled: e.filteredValue.length === 0,
            type: "button",
            onClick: t[1] || (t[1] = (...c) => e.handleConfirm && e.handleConfirm(...c))
          }, Xe(e.t("el.table.confirmFilter")), 11, Vm),
          ie("button", {
            type: "button",
            onClick: t[2] || (t[2] = (...c) => e.handleReset && e.handleReset(...c))
          }, Xe(e.t("el.table.resetFilter")), 1)
        ], 2)
      ])) : (k(), W("ul", {
        key: 1,
        class: V(e.ns.e("list"))
      }, [
        ie("li", {
          class: V([
            e.ns.e("list-item"),
            {
              [e.ns.is("active")]: e.filterValue === void 0 || e.filterValue === null
            }
          ]),
          onClick: t[3] || (t[3] = (c) => e.handleSelect(null))
        }, Xe(e.t("el.table.clearFilter")), 3),
        (k(!0), W(yt, null, Cr(e.filters, (c) => (k(), W("li", {
          key: c.value,
          class: V([e.ns.e("list-item"), e.ns.is("active", e.isActive(c))]),
          label: c.value,
          onClick: (p) => e.handleSelect(c.value)
        }, Xe(c.text), 11, Um))), 128))
      ], 2))
    ]),
    default: ue(() => [
      ye((k(), W("span", {
        class: V([
          `${e.ns.namespace.value}-table__column-filter-trigger`,
          `${e.ns.namespace.value}-none-outline`
        ]),
        onClick: t[4] || (t[4] = (...c) => e.showFilterPanel && e.showFilterPanel(...c))
      }, [
        N(f, null, {
          default: ue(() => [
            e.column.filterOpened ? (k(), ve(u, { key: 0 })) : (k(), ve(d, { key: 1 }))
          ]),
          _: 1
        })
      ], 2)), [
        [h, e.hideFilterPanel, e.popperPaneRef]
      ])
    ]),
    _: 1
  }, 8, ["visible", "placement", "popper-class"]);
}
var Ym = /* @__PURE__ */ he(jm, [["render", Gm], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue"]]);
function xs(e) {
  const t = le();
  Yr(() => {
    n.value.addObserver(t);
  }), Te(() => {
    r(n.value), o(n.value);
  }), nl(() => {
    r(n.value), o(n.value);
  }), Gr(() => {
    n.value.removeObserver(t);
  });
  const n = A(() => {
    const a = e.layout;
    if (!a)
      throw new Error("Can not find table layout.");
    return a;
  }), r = (a) => {
    var s;
    const l = ((s = e.vnode.el) == null ? void 0 : s.querySelectorAll("colgroup > col")) || [];
    if (!l.length)
      return;
    const i = a.getFlattenColumns(), u = {};
    i.forEach((d) => {
      u[d.id] = d;
    });
    for (let d = 0, f = l.length; d < f; d++) {
      const v = l[d], h = v.getAttribute("name"), c = u[h];
      c && v.setAttribute("width", c.realWidth || c.width);
    }
  }, o = (a) => {
    var s, l;
    const i = ((s = e.vnode.el) == null ? void 0 : s.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let d = 0, f = i.length; d < f; d++)
      i[d].setAttribute("width", a.scrollY.value ? a.gutterWidth : "0");
    const u = ((l = e.vnode.el) == null ? void 0 : l.querySelectorAll("th.gutter")) || [];
    for (let d = 0, f = u.length; d < f; d++) {
      const v = u[d];
      v.style.width = a.scrollY.value ? `${a.gutterWidth}px` : "0", v.style.display = a.scrollY.value ? "" : "none";
    }
  };
  return {
    tableLayout: n.value,
    onColumnsChange: r,
    onScrollableChange: o
  };
}
const je = Symbol("ElTable");
function qm(e, t) {
  const n = le(), r = X(je), o = (p) => {
    p.stopPropagation();
  }, a = (p, g) => {
    !g.filters && g.sortable ? c(p, g, !1) : g.filterable && !g.sortable && o(p), r == null || r.emit("header-click", g, p);
  }, s = (p, g) => {
    r == null || r.emit("header-contextmenu", g, p);
  }, l = x(null), i = x(!1), u = x({}), d = (p, g) => {
    if (de && !(g.children && g.children.length > 0) && l.value && e.border) {
      i.value = !0;
      const m = r;
      t("set-drag-visible", !0);
      const b = (m == null ? void 0 : m.vnode.el).getBoundingClientRect().left, y = n.vnode.el.querySelector(`th.${g.id}`), S = y.getBoundingClientRect(), _ = S.left - b + 30;
      xl(y, "noclick"), u.value = {
        startMouseLeft: p.clientX,
        startLeft: S.right - b,
        startColumnLeft: S.left - b,
        tableLeft: b
      };
      const C = m == null ? void 0 : m.refs.resizeProxy;
      C.style.left = `${u.value.startLeft}px`, document.onselectstart = function() {
        return !1;
      }, document.ondragstart = function() {
        return !1;
      };
      const T = (M) => {
        const D = M.clientX - u.value.startMouseLeft, L = u.value.startLeft + D;
        C.style.left = `${Math.max(_, L)}px`;
      }, $ = () => {
        if (i.value) {
          const { startColumnLeft: M, startLeft: D } = u.value, K = Number.parseInt(C.style.left, 10) - M;
          g.width = g.realWidth = K, m == null || m.emit("header-dragend", g.width, D - M, g, p), requestAnimationFrame(() => {
            e.store.scheduleLayout(!1, !0);
          }), document.body.style.cursor = "", i.value = !1, l.value = null, u.value = {}, t("set-drag-visible", !1);
        }
        document.removeEventListener("mousemove", T), document.removeEventListener("mouseup", $), document.onselectstart = null, document.ondragstart = null, setTimeout(() => {
          Ar(y, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", T), document.addEventListener("mouseup", $);
    }
  }, f = (p, g) => {
    var m;
    if (g.children && g.children.length > 0)
      return;
    const w = (m = p.target) == null ? void 0 : m.closest("th");
    if (!(!g || !g.resizable) && !i.value && e.border) {
      const b = w.getBoundingClientRect(), y = document.body.style;
      b.width > 12 && b.right - p.pageX < 8 ? (y.cursor = "col-resize", kn(w, "is-sortable") && (w.style.cursor = "col-resize"), l.value = g) : i.value || (y.cursor = "", kn(w, "is-sortable") && (w.style.cursor = "pointer"), l.value = null);
    }
  }, v = () => {
    de && (document.body.style.cursor = "");
  }, h = ({ order: p, sortOrders: g }) => {
    if (p === "")
      return g[0];
    const m = g.indexOf(p || null);
    return g[m > g.length - 2 ? 0 : m + 1];
  }, c = (p, g, m) => {
    var w;
    p.stopPropagation();
    const b = g.order === m ? null : m || h(g), y = (w = p.target) == null ? void 0 : w.closest("th");
    if (y && kn(y, "noclick")) {
      Ar(y, "noclick");
      return;
    }
    if (!g.sortable)
      return;
    const S = e.store.states;
    let _ = S.sortProp.value, C;
    const T = S.sortingColumn.value;
    (T !== g || T === g && T.order === null) && (T && (T.order = null), S.sortingColumn.value = g, _ = g.property), b ? C = g.order = b : C = g.order = null, S.sortProp.value = _, S.sortOrder.value = C, r == null || r.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick: a,
    handleHeaderContextMenu: s,
    handleMouseDown: d,
    handleMouseMove: f,
    handleMouseOut: v,
    handleSortClick: c,
    handleFilterClick: o
  };
}
function Xm(e) {
  const t = X(je), n = se("table");
  return {
    getHeaderRowStyle: (l) => {
      const i = t == null ? void 0 : t.props.headerRowStyle;
      return typeof i == "function" ? i.call(null, { rowIndex: l }) : i;
    },
    getHeaderRowClass: (l) => {
      const i = [], u = t == null ? void 0 : t.props.headerRowClassName;
      return typeof u == "string" ? i.push(u) : typeof u == "function" && i.push(u.call(null, { rowIndex: l })), i.join(" ");
    },
    getHeaderCellStyle: (l, i, u, d) => {
      var f;
      let v = (f = t == null ? void 0 : t.props.headerCellStyle) != null ? f : {};
      typeof v == "function" && (v = v.call(null, {
        rowIndex: l,
        columnIndex: i,
        row: u,
        column: d
      }));
      const h = Ro(i, d.fixed, e.store, u);
      return Kt(h, "left"), Kt(h, "right"), Object.assign({}, v, h);
    },
    getHeaderCellClass: (l, i, u, d) => {
      const f = Ao(n.b(), i, d.fixed, e.store, u), v = [
        d.id,
        d.order,
        d.headerAlign,
        d.className,
        d.labelClassName,
        ...f
      ];
      d.children || v.push("is-leaf"), d.sortable && v.push("is-sortable");
      const h = t == null ? void 0 : t.props.headerCellClassName;
      return typeof h == "string" ? v.push(h) : typeof h == "function" && v.push(h.call(null, {
        rowIndex: l,
        columnIndex: i,
        row: u,
        column: d
      })), v.push(n.e("cell")), v.filter((c) => Boolean(c)).join(" ");
    }
  };
}
const Ts = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.children ? (t.push(n), t.push.apply(t, Ts(n.children))) : t.push(n);
  }), t;
}, Jm = (e) => {
  let t = 1;
  const n = (a, s) => {
    if (s && (a.level = s.level + 1, t < a.level && (t = a.level)), a.children) {
      let l = 0;
      a.children.forEach((i) => {
        n(i, a), l += i.colSpan;
      }), a.colSpan = l;
    } else
      a.colSpan = 1;
  };
  e.forEach((a) => {
    a.level = 1, n(a, void 0);
  });
  const r = [];
  for (let a = 0; a < t; a++)
    r.push([]);
  return Ts(e).forEach((a) => {
    a.children ? (a.rowSpan = 1, a.children.forEach((s) => s.isSubColumn = !0)) : a.rowSpan = t - a.level + 1, r[a.level - 1].push(a);
  }), r;
};
function Zm(e) {
  const t = X(je), n = A(() => Jm(e.store.states.originColumns.value));
  return {
    isGroup: A(() => {
      const a = n.value.length > 1;
      return a && t && (t.state.isGroup.value = !0), a;
    }),
    toggleAllSelection: (a) => {
      a.stopPropagation(), t == null || t.store.commit("toggleAllSelection");
    },
    columnRows: n
  };
}
var Qm = j({
  name: "ElTableHeader",
  components: {
    ElCheckbox: jt
  },
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: !0,
      type: Object
    },
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => ({
        prop: "",
        order: ""
      })
    }
  },
  setup(e, { emit: t }) {
    const n = le(), r = X(je), o = se("table"), a = x({}), { onColumnsChange: s, onScrollableChange: l } = xs(r);
    Te(async () => {
      await we(), await we();
      const { prop: _, order: C } = e.defaultSort;
      r == null || r.store.commit("sort", { prop: _, order: C, init: !0 });
    });
    const {
      handleHeaderClick: i,
      handleHeaderContextMenu: u,
      handleMouseDown: d,
      handleMouseMove: f,
      handleMouseOut: v,
      handleSortClick: h,
      handleFilterClick: c
    } = qm(e, t), {
      getHeaderRowStyle: p,
      getHeaderRowClass: g,
      getHeaderCellStyle: m,
      getHeaderCellClass: w
    } = Xm(e), { isGroup: b, toggleAllSelection: y, columnRows: S } = Zm(e);
    return n.state = {
      onColumnsChange: s,
      onScrollableChange: l
    }, n.filterPanels = a, {
      ns: o,
      filterPanels: a,
      onColumnsChange: s,
      onScrollableChange: l,
      columnRows: S,
      getHeaderRowClass: g,
      getHeaderRowStyle: p,
      getHeaderCellClass: w,
      getHeaderCellStyle: m,
      handleHeaderClick: i,
      handleHeaderContextMenu: u,
      handleMouseDown: d,
      handleMouseMove: f,
      handleMouseOut: v,
      handleSortClick: h,
      handleFilterClick: c,
      isGroup: b,
      toggleAllSelection: y
    };
  },
  render() {
    const {
      ns: e,
      isGroup: t,
      columnRows: n,
      getHeaderCellStyle: r,
      getHeaderCellClass: o,
      getHeaderRowClass: a,
      getHeaderRowStyle: s,
      handleHeaderClick: l,
      handleHeaderContextMenu: i,
      handleMouseDown: u,
      handleMouseMove: d,
      handleSortClick: f,
      handleMouseOut: v,
      store: h,
      $parent: c
    } = this;
    let p = 1;
    return Y("thead", {
      class: { [e.is("group")]: t }
    }, n.map((g, m) => Y("tr", {
      class: a(m),
      key: m,
      style: s(m)
    }, g.map((w, b) => (w.rowSpan > p && (p = w.rowSpan), Y("th", {
      class: o(m, b, g, w),
      colspan: w.colSpan,
      key: `${w.id}-thead`,
      rowspan: w.rowSpan,
      style: r(m, b, g, w),
      onClick: (y) => l(y, w),
      onContextmenu: (y) => i(y, w),
      onMousedown: (y) => u(y, w),
      onMousemove: (y) => d(y, w),
      onMouseout: v
    }, [
      Y("div", {
        class: [
          "cell",
          w.filteredValue && w.filteredValue.length > 0 ? "highlight" : ""
        ]
      }, [
        w.renderHeader ? w.renderHeader({
          column: w,
          $index: b,
          store: h,
          _self: c
        }) : w.label,
        w.sortable && Y("span", {
          onClick: (y) => f(y, w),
          class: "caret-wrapper"
        }, [
          Y("i", {
            onClick: (y) => f(y, w, "ascending"),
            class: "sort-caret ascending"
          }),
          Y("i", {
            onClick: (y) => f(y, w, "descending"),
            class: "sort-caret descending"
          })
        ]),
        w.filterable && Y(Ym, {
          store: h,
          placement: w.filterPlacement || "bottom-start",
          column: w,
          upDataColumn: (y, S) => {
            w[y] = S;
          }
        })
      ])
    ]))))));
  }
});
function eg(e) {
  const t = X(je), n = x(""), r = x(Y("div")), o = (v, h, c) => {
    var p;
    const g = t, m = wr(v);
    let w;
    const b = (p = g == null ? void 0 : g.vnode.el) == null ? void 0 : p.dataset.prefix;
    m && (w = Ka({
      columns: e.store.states.columns.value
    }, m, b), w && (g == null || g.emit(`cell-${c}`, h, w, m, v))), g == null || g.emit(`row-${c}`, h, w, v);
  }, a = (v, h) => {
    o(v, h, "dblclick");
  }, s = (v, h) => {
    e.store.commit("setCurrentRow", h), o(v, h, "click");
  }, l = (v, h) => {
    o(v, h, "contextmenu");
  }, i = Kn((v) => {
    e.store.commit("setHoverRow", v);
  }, 30), u = Kn(() => {
    e.store.commit("setHoverRow", null);
  }, 30);
  return {
    handleDoubleClick: a,
    handleClick: s,
    handleContextMenu: l,
    handleMouseEnter: i,
    handleMouseLeave: u,
    handleCellMouseEnter: (v, h, c) => {
      var p;
      const g = t, m = wr(v), w = (p = g == null ? void 0 : g.vnode.el) == null ? void 0 : p.dataset.prefix;
      if (m) {
        const C = Ka({
          columns: e.store.states.columns.value
        }, m, w), T = g.hoverState = { cell: m, column: C, row: h };
        g == null || g.emit("cell-mouse-enter", T.row, T.column, T.cell, v);
      }
      const b = v.target.querySelector(".cell");
      if (!(kn(b, `${w}-tooltip`) && b.childNodes.length))
        return;
      const y = document.createRange();
      y.setStart(b, 0), y.setEnd(b, b.childNodes.length);
      const S = Math.round(y.getBoundingClientRect().width), _ = (Number.parseInt(pa(b, "paddingLeft"), 10) || 0) + (Number.parseInt(pa(b, "paddingRight"), 10) || 0);
      (S + _ > b.offsetWidth || b.scrollWidth > b.offsetWidth) && Lm(t == null ? void 0 : t.refs.tableWrapper, m, m.innerText || m.textContent, {
        placement: "top",
        strategy: "fixed"
      }, c);
    },
    handleCellMouseLeave: (v) => {
      if (!wr(v))
        return;
      const c = t == null ? void 0 : t.hoverState;
      t == null || t.emit("cell-mouse-leave", c == null ? void 0 : c.row, c == null ? void 0 : c.column, c == null ? void 0 : c.cell, v);
    },
    tooltipContent: n,
    tooltipTrigger: r
  };
}
function tg(e) {
  const t = X(je), n = se("table");
  return {
    getRowStyle: (u, d) => {
      const f = t == null ? void 0 : t.props.rowStyle;
      return typeof f == "function" ? f.call(null, {
        row: u,
        rowIndex: d
      }) : f || null;
    },
    getRowClass: (u, d) => {
      const f = [n.e("row")];
      t != null && t.props.highlightCurrentRow && u === e.store.states.currentRow.value && f.push("current-row"), e.stripe && d % 2 === 1 && f.push(n.em("row", "striped"));
      const v = t == null ? void 0 : t.props.rowClassName;
      return typeof v == "string" ? f.push(v) : typeof v == "function" && f.push(v.call(null, {
        row: u,
        rowIndex: d
      })), f;
    },
    getCellStyle: (u, d, f, v) => {
      const h = t == null ? void 0 : t.props.cellStyle;
      let c = h ?? {};
      typeof h == "function" && (c = h.call(null, {
        rowIndex: u,
        columnIndex: d,
        row: f,
        column: v
      }));
      const p = Ro(d, e == null ? void 0 : e.fixed, e.store);
      return Kt(p, "left"), Kt(p, "right"), Object.assign({}, c, p);
    },
    getCellClass: (u, d, f, v, h) => {
      const c = Ao(n.b(), d, e == null ? void 0 : e.fixed, e.store, void 0, h), p = [v.id, v.align, v.className, ...c], g = t == null ? void 0 : t.props.cellClassName;
      return typeof g == "string" ? p.push(g) : typeof g == "function" && p.push(g.call(null, {
        rowIndex: u,
        columnIndex: d,
        row: f,
        column: v
      })), p.push(n.e("cell")), p.filter((m) => Boolean(m)).join(" ");
    },
    getSpan: (u, d, f, v) => {
      let h = 1, c = 1;
      const p = t == null ? void 0 : t.props.spanMethod;
      if (typeof p == "function") {
        const g = p({
          row: u,
          column: d,
          rowIndex: f,
          columnIndex: v
        });
        Array.isArray(g) ? (h = g[0], c = g[1]) : typeof g == "object" && (h = g.rowspan, c = g.colspan);
      }
      return { rowspan: h, colspan: c };
    },
    getColspanRealWidth: (u, d, f) => {
      if (d < 1)
        return u[f].realWidth;
      const v = u.map(({ realWidth: h, width: c }) => h || c).slice(f, f + d);
      return Number(v.reduce((h, c) => Number(h) + Number(c), -1));
    }
  };
}
function ng(e) {
  const t = X(je), n = se("table"), {
    handleDoubleClick: r,
    handleClick: o,
    handleContextMenu: a,
    handleMouseEnter: s,
    handleMouseLeave: l,
    handleCellMouseEnter: i,
    handleCellMouseLeave: u,
    tooltipContent: d,
    tooltipTrigger: f
  } = eg(e), {
    getRowStyle: v,
    getRowClass: h,
    getCellStyle: c,
    getCellClass: p,
    getSpan: g,
    getColspanRealWidth: m
  } = tg(e), w = A(() => e.store.states.columns.value.findIndex(({ type: C }) => C === "default")), b = (C, T) => {
    const $ = t.props.rowKey;
    return $ ? pe(C, $) : T;
  }, y = (C, T, $, M = !1) => {
    const { tooltipEffect: D, store: L } = e, { indent: K, columns: I } = L.states, P = h(C, T);
    let B = !0;
    return $ && (P.push(n.em("row", `level-${$.level}`)), B = $.display), Y("tr", {
      style: [B ? null : {
        display: "none"
      }, v(C, T)],
      class: P,
      key: b(C, T),
      onDblclick: (R) => r(R, C),
      onClick: (R) => o(R, C),
      onContextmenu: (R) => a(R, C),
      onMouseenter: () => s(T),
      onMouseleave: l
    }, I.value.map((R, O) => {
      const { rowspan: H, colspan: Z } = g(C, R, T, O);
      if (!H || !Z)
        return null;
      const ee = { ...R };
      ee.realWidth = m(I.value, Z, O);
      const oe = {
        store: e.store,
        _self: e.context || t,
        column: ee,
        row: C,
        $index: T,
        cellIndex: O,
        expanded: M
      };
      O === w.value && $ && (oe.treeNode = {
        indent: $.level * K.value,
        level: $.level
      }, typeof $.expanded == "boolean" && (oe.treeNode.expanded = $.expanded, "loading" in $ && (oe.treeNode.loading = $.loading), "noLazyChildren" in $ && (oe.treeNode.noLazyChildren = $.noLazyChildren)));
      const ce = `${T},${O}`, te = ee.columnKey || ee.rawColumnKey || "", me = S(O, R, oe);
      return Y("td", {
        style: c(T, O, C, R),
        class: p(T, O, C, R, Z - 1),
        key: `${te}${ce}`,
        rowspan: H,
        colspan: Z,
        onMouseenter: (fe) => i(fe, C, D),
        onMouseleave: u
      }, [me]);
    }));
  }, S = (C, T, $) => T.renderCell($);
  return {
    wrappedRowRender: (C, T) => {
      const $ = e.store, { isRowExpanded: M, assertRowKey: D } = $, { treeData: L, lazyTreeNodeMap: K, childrenColumnName: I, rowKey: P } = $.states, B = $.states.columns.value;
      if (B.some(({ type: R }) => R === "expand")) {
        const R = M(C), O = y(C, T, void 0, R), H = t.renderExpanded;
        return R ? H ? [
          [
            O,
            Y("tr", {
              key: `expanded-row__${O.key}`
            }, [
              Y("td", {
                colspan: B.length,
                class: `${n.e("cell")} ${n.e("expanded-cell")}`
              }, [H({ row: C, $index: T, store: $, expanded: R })])
            ])
          ]
        ] : (console.error("[Element Error]renderExpanded is required."), O) : [[O]];
      } else if (Object.keys(L.value).length) {
        D();
        const R = pe(C, P.value);
        let O = L.value[R], H = null;
        O && (H = {
          expanded: O.expanded,
          level: O.level,
          display: !0
        }, typeof O.lazy == "boolean" && (typeof O.loaded == "boolean" && O.loaded && (H.noLazyChildren = !(O.children && O.children.length)), H.loading = O.loading));
        const Z = [y(C, T, H)];
        if (O) {
          let ee = 0;
          const oe = (te, me) => {
            te && te.length && me && te.forEach((fe) => {
              const ae = {
                display: me.display && me.expanded,
                level: me.level + 1,
                expanded: !1,
                noLazyChildren: !1,
                loading: !1
              }, Ke = pe(fe, P.value);
              if (Ke == null)
                throw new Error("For nested data item, row-key is required.");
              if (O = { ...L.value[Ke] }, O && (ae.expanded = O.expanded, O.level = O.level || ae.level, O.display = !!(O.expanded && ae.display), typeof O.lazy == "boolean" && (typeof O.loaded == "boolean" && O.loaded && (ae.noLazyChildren = !(O.children && O.children.length)), ae.loading = O.loading)), ee++, Z.push(y(fe, T + ee, ae)), O) {
                const Xt = K.value[Ke] || fe[I.value];
                oe(Xt, O);
              }
            });
          };
          O.display = !0;
          const ce = K.value[R] || C[I.value];
          oe(ce, O);
        }
        return Z;
      } else
        return y(C, T, void 0);
    },
    tooltipContent: d,
    tooltipTrigger: f
  };
}
const rg = {
  store: {
    required: !0,
    type: Object
  },
  stripe: Boolean,
  tooltipEffect: String,
  context: {
    default: () => ({}),
    type: Object
  },
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  fixed: {
    type: String,
    default: ""
  },
  highlight: Boolean
};
var og = j({
  name: "ElTableBody",
  props: rg,
  setup(e) {
    const t = le(), n = X(je), r = se("table"), { wrappedRowRender: o, tooltipContent: a, tooltipTrigger: s } = ng(e), { onColumnsChange: l, onScrollableChange: i } = xs(n);
    return U(e.store.states.hoverRow, (u, d) => {
      if (!e.store.states.isComplex.value || !de)
        return;
      let f = window.requestAnimationFrame;
      f || (f = (v) => window.setTimeout(v, 16)), f(() => {
        const v = t == null ? void 0 : t.vnode.el, h = Array.from((v == null ? void 0 : v.children) || []).filter((g) => g == null ? void 0 : g.classList.contains(`${r.e("row")}`)), c = h[d], p = h[u];
        c && Ar(c, "hover-row"), p && xl(p, "hover-row");
      });
    }), Gr(() => {
      var u;
      (u = Ye) == null || u();
    }), {
      ns: r,
      onColumnsChange: l,
      onScrollableChange: i,
      wrappedRowRender: o,
      tooltipContent: a,
      tooltipTrigger: s
    };
  },
  render() {
    const { wrappedRowRender: e, store: t } = this, n = t.states.data.value || [];
    return Y("tbody", {}, [
      n.reduce((r, o) => r.concat(e(o, r.length)), [])
    ]);
  }
});
function Lo(e) {
  const t = e.tableLayout === "auto";
  let n = e.columns || [];
  t && n.every((o) => o.width === void 0) && (n = []);
  const r = (o) => {
    const a = {
      key: `${e.tableLayout}_${o.id}`,
      style: {},
      name: void 0
    };
    return t ? a.style = {
      width: `${o.width}px`
    } : a.name = o.id, a;
  };
  return Y("colgroup", {}, n.map((o) => Y("col", r(o))));
}
Lo.props = ["columns", "tableLayout"];
function ag() {
  const e = X(je), t = e == null ? void 0 : e.store, n = A(() => t.states.fixedLeafColumnsLength.value), r = A(() => t.states.rightFixedColumns.value.length), o = A(() => t.states.columns.value.length), a = A(() => t.states.fixedColumns.value.length), s = A(() => t.states.rightFixedColumns.value.length);
  return {
    leftFixedLeafCount: n,
    rightFixedLeafCount: r,
    columnsCount: o,
    leftFixedCount: a,
    rightFixedCount: s,
    columns: t.states.columns
  };
}
function lg(e) {
  const { columns: t } = ag(), n = se("table");
  return {
    getCellClasses: (a, s) => {
      const l = a[s], i = [
        n.e("cell"),
        l.id,
        l.align,
        l.labelClassName,
        ...Ao(n.b(), s, l.fixed, e.store)
      ];
      return l.className && i.push(l.className), l.children || i.push(n.is("leaf")), i;
    },
    getCellStyles: (a, s) => {
      const l = Ro(s, a.fixed, e.store);
      return Kt(l, "left"), Kt(l, "right"), l;
    },
    columns: t
  };
}
var sg = j({
  name: "ElTableFooter",
  props: {
    fixed: {
      type: String,
      default: ""
    },
    store: {
      required: !0,
      type: Object
    },
    summaryMethod: Function,
    sumText: String,
    border: Boolean,
    defaultSort: {
      type: Object,
      default: () => ({
        prop: "",
        order: ""
      })
    }
  },
  setup(e) {
    const { getCellClasses: t, getCellStyles: n, columns: r } = lg(e);
    return {
      ns: se("table"),
      getCellClasses: t,
      getCellStyles: n,
      columns: r
    };
  },
  render() {
    const {
      columns: e,
      getCellStyles: t,
      getCellClasses: n,
      summaryMethod: r,
      sumText: o,
      ns: a
    } = this, s = this.store.states.data.value;
    let l = [];
    return r ? l = r({
      columns: e,
      data: s
    }) : e.forEach((i, u) => {
      if (u === 0) {
        l[u] = o;
        return;
      }
      const d = s.map((c) => Number(c[i.property])), f = [];
      let v = !0;
      d.forEach((c) => {
        if (!Number.isNaN(+c)) {
          v = !1;
          const p = `${c}`.split(".")[1];
          f.push(p ? p.length : 0);
        }
      });
      const h = Math.max.apply(null, f);
      v ? l[u] = "" : l[u] = d.reduce((c, p) => {
        const g = Number(p);
        return Number.isNaN(+g) ? c : Number.parseFloat((c + p).toFixed(Math.min(h, 20)));
      }, 0);
    }), Y("table", {
      class: a.e("footer"),
      cellspacing: "0",
      cellpadding: "0",
      border: "0"
    }, [
      Lo({
        columns: e
      }),
      Y("tbody", [
        Y("tr", {}, [
          ...e.map((i, u) => Y("td", {
            key: u,
            colspan: i.colSpan,
            rowspan: i.rowSpan,
            class: n(e, u),
            style: t(i, u)
          }, [
            Y("div", {
              class: ["cell", i.labelClassName]
            }, [l[u]])
          ]))
        ])
      ])
    ]);
  }
});
function ig(e) {
  return {
    setCurrentRow: (d) => {
      e.commit("setCurrentRow", d);
    },
    getSelectionRows: () => e.getSelectionRows(),
    toggleRowSelection: (d, f) => {
      e.toggleRowSelection(d, f, !1), e.updateAllSelected();
    },
    clearSelection: () => {
      e.clearSelection();
    },
    clearFilter: (d) => {
      e.clearFilter(d);
    },
    toggleAllSelection: () => {
      e.commit("toggleAllSelection");
    },
    toggleRowExpansion: (d, f) => {
      e.toggleRowExpansionAdapter(d, f);
    },
    clearSort: () => {
      e.clearSort();
    },
    sort: (d, f) => {
      e.commit("sort", { prop: d, order: f });
    }
  };
}
function ug(e, t, n, r) {
  const o = x(!1), a = x(null), s = x(!1), l = (R) => {
    s.value = R;
  }, i = x({
    width: null,
    height: null,
    headerHeight: null
  }), u = x(!1), d = {
    display: "inline-block",
    verticalAlign: "middle"
  }, f = x(), v = x(0), h = x(0), c = x(0), p = x(0);
  it(() => {
    t.setHeight(e.height);
  }), it(() => {
    t.setMaxHeight(e.maxHeight);
  }), U(() => [e.currentRowKey, n.states.rowKey], ([R, O]) => {
    !E(O) || !E(R) || n.setCurrentRowKey(`${R}`);
  }, {
    immediate: !0
  }), U(() => e.data, (R) => {
    r.store.commit("setData", R);
  }, {
    immediate: !0,
    deep: !0
  }), it(() => {
    e.expandRowKeys && n.setExpandRowKeysAdapter(e.expandRowKeys);
  });
  const g = () => {
    r.store.commit("setHoverRow", null), r.hoverState && (r.hoverState = null);
  }, m = (R, O) => {
    const { pixelX: H, pixelY: Z } = O;
    Math.abs(H) >= Math.abs(Z) && (r.refs.bodyWrapper.scrollLeft += O.pixelX / 5);
  }, w = A(() => e.height || e.maxHeight || n.states.fixedColumns.value.length > 0 || n.states.rightFixedColumns.value.length > 0), b = A(() => ({
    width: t.bodyWidth.value ? `${t.bodyWidth.value}px` : ""
  })), y = () => {
    w.value && t.updateElsHeight(), t.updateColumnsWidth(), requestAnimationFrame(T);
  };
  Te(async () => {
    await we(), n.updateColumns(), $(), requestAnimationFrame(y);
    const R = r.vnode.el, O = r.refs.headerWrapper;
    e.flexible && R && R.parentElement && (R.parentElement.style.minWidth = "0"), i.value = {
      width: f.value = R.offsetWidth,
      height: R.offsetHeight,
      headerHeight: e.showHeader && O ? O.offsetHeight : null
    }, n.states.columns.value.forEach((H) => {
      H.filteredValue && H.filteredValue.length && r.store.commit("filterChange", {
        column: H,
        values: H.filteredValue,
        silent: !0
      });
    }), r.$ready = !0;
  });
  const S = (R, O) => {
    if (!R)
      return;
    const H = Array.from(R.classList).filter((Z) => !Z.startsWith("is-scrolling-"));
    H.push(t.scrollX.value ? O : "is-scrolling-none"), R.className = H.join(" ");
  }, _ = (R) => {
    const { tableWrapper: O } = r.refs;
    S(O, R);
  }, C = (R) => {
    const { tableWrapper: O } = r.refs;
    return !!(O && O.classList.contains(R));
  }, T = function() {
    if (!r.refs.scrollBarRef)
      return;
    if (!t.scrollX.value) {
      const te = "is-scrolling-none";
      C(te) || _(te);
      return;
    }
    const R = r.refs.scrollBarRef.wrapRef;
    if (!R)
      return;
    const { scrollLeft: O, offsetWidth: H, scrollWidth: Z } = R, { headerWrapper: ee, footerWrapper: oe } = r.refs;
    ee && (ee.scrollLeft = O), oe && (oe.scrollLeft = O);
    const ce = Z - H - 1;
    O >= ce ? _("is-scrolling-right") : _(O === 0 ? "is-scrolling-left" : "is-scrolling-middle");
  }, $ = () => {
    r.refs.scrollBarRef && (r.refs.scrollBarRef.wrapRef && Ze(r.refs.scrollBarRef.wrapRef, "scroll", T, {
      passive: !0
    }), e.fit ? Pr(r.vnode.el, M) : Ze(window, "resize", M), Pr(r.refs.bodyWrapper, () => {
      var R, O;
      M(), (O = (R = r.refs) == null ? void 0 : R.scrollBarRef) == null || O.update();
    }));
  }, M = () => {
    var R, O, H;
    const Z = r.vnode.el;
    if (!r.$ready || !Z)
      return;
    let ee = !1;
    const {
      width: oe,
      height: ce,
      headerHeight: te
    } = i.value, me = f.value = Z.offsetWidth;
    oe !== me && (ee = !0);
    const fe = Z.offsetHeight;
    (e.height || w.value) && ce !== fe && (ee = !0);
    const ae = e.tableLayout === "fixed" ? r.refs.headerWrapper : (R = r.refs.tableHeaderRef) == null ? void 0 : R.$el;
    e.showHeader && (ae == null ? void 0 : ae.offsetHeight) !== te && (ee = !0), v.value = ((O = r.refs.tableWrapper) == null ? void 0 : O.scrollHeight) || 0, c.value = (ae == null ? void 0 : ae.scrollHeight) || 0, p.value = ((H = r.refs.footerWrapper) == null ? void 0 : H.offsetHeight) || 0, h.value = v.value - c.value - p.value, ee && (i.value = {
      width: me,
      height: fe,
      headerHeight: e.showHeader && (ae == null ? void 0 : ae.offsetHeight) || 0
    }, y());
  }, D = Lr(), L = A(() => {
    const { bodyWidth: R, scrollY: O, gutterWidth: H } = t;
    return R.value ? `${R.value - (O.value ? H : 0)}px` : "";
  }), K = A(() => e.maxHeight ? "fixed" : e.tableLayout), I = A(() => {
    if (e.data && e.data.length)
      return null;
    let R = "100%";
    e.height && h.value && (R = `${h.value}px`);
    const O = f.value;
    return {
      width: O ? `${O}px` : "",
      height: R
    };
  }), P = A(() => e.height ? {
    height: Number.isNaN(Number(e.height)) ? e.height : `${e.height}px`
  } : e.maxHeight ? {
    maxHeight: Number.isNaN(Number(e.maxHeight)) ? e.maxHeight : `${e.maxHeight}px`
  } : {}), B = A(() => {
    if (e.height)
      return {
        height: "100%"
      };
    if (e.maxHeight) {
      if (Number.isNaN(Number(e.maxHeight)))
        return {
          maxHeight: `calc(${e.maxHeight} - ${c.value + p.value}px)`
        };
      {
        const R = e.maxHeight;
        if (v.value >= Number(R))
          return {
            maxHeight: `${v.value - c.value - p.value}px`
          };
      }
    }
    return {};
  });
  return {
    isHidden: o,
    renderExpanded: a,
    setDragVisible: l,
    isGroup: u,
    handleMouseLeave: g,
    handleHeaderFooterMousewheel: m,
    tableSize: D,
    emptyBlockStyle: I,
    handleFixedMousewheel: (R, O) => {
      const H = r.refs.bodyWrapper;
      if (Math.abs(O.spinY) > 0) {
        const Z = H.scrollTop;
        O.pixelY < 0 && Z !== 0 && R.preventDefault(), O.pixelY > 0 && H.scrollHeight - H.clientHeight > Z && R.preventDefault(), H.scrollTop += Math.ceil(O.pixelY / 5);
      } else
        H.scrollLeft += Math.ceil(O.pixelX / 5);
    },
    resizeProxyVisible: s,
    bodyWidth: L,
    resizeState: i,
    doLayout: y,
    tableBodyStyles: b,
    tableLayout: K,
    scrollbarViewStyle: d,
    tableInnerStyle: P,
    scrollbarStyle: B
  };
}
var cg = {
  data: {
    type: Array,
    default: () => []
  },
  size: String,
  width: [String, Number],
  height: [String, Number],
  maxHeight: [String, Number],
  fit: {
    type: Boolean,
    default: !0
  },
  stripe: Boolean,
  border: Boolean,
  rowKey: [String, Function],
  showHeader: {
    type: Boolean,
    default: !0
  },
  showSummary: Boolean,
  sumText: String,
  summaryMethod: Function,
  rowClassName: [String, Function],
  rowStyle: [Object, Function],
  cellClassName: [String, Function],
  cellStyle: [Object, Function],
  headerRowClassName: [String, Function],
  headerRowStyle: [Object, Function],
  headerCellClassName: [String, Function],
  headerCellStyle: [Object, Function],
  highlightCurrentRow: Boolean,
  currentRowKey: [String, Number],
  emptyText: String,
  expandRowKeys: Array,
  defaultExpandAll: Boolean,
  defaultSort: Object,
  tooltipEffect: String,
  spanMethod: Function,
  selectOnIndeterminate: {
    type: Boolean,
    default: !0
  },
  indent: {
    type: Number,
    default: 16
  },
  treeProps: {
    type: Object,
    default: () => ({
      hasChildren: "hasChildren",
      children: "children"
    })
  },
  lazy: Boolean,
  load: Function,
  style: {
    type: Object,
    default: () => ({})
  },
  className: {
    type: String,
    default: ""
  },
  tableLayout: {
    type: String,
    default: "fixed"
  },
  scrollbarAlwaysOn: {
    type: Boolean,
    default: !1
  },
  flexible: Boolean
};
const dg = () => {
  const e = x(), t = (a, s) => {
    const l = e.value;
    l && l.scrollTo(a, s);
  }, n = (a, s) => {
    const l = e.value;
    l && Je(s) && ["Top", "Left"].includes(a) && l[`setScroll${a}`](s);
  };
  return {
    scrollBarRef: e,
    scrollTo: t,
    setScrollTop: (a) => n("Top", a),
    setScrollLeft: (a) => n("Left", a)
  };
};
let fg = 1;
const pg = j({
  name: "ElTable",
  directives: {
    Mousewheel: rm
  },
  components: {
    TableHeader: Qm,
    TableBody: og,
    TableFooter: sg,
    ElScrollbar: Dl,
    hColgroup: Lo
  },
  props: cg,
  emits: [
    "select",
    "select-all",
    "selection-change",
    "cell-mouse-enter",
    "cell-mouse-leave",
    "cell-contextmenu",
    "cell-click",
    "cell-dblclick",
    "row-click",
    "row-contextmenu",
    "row-dblclick",
    "header-click",
    "header-contextmenu",
    "sort-change",
    "filter-change",
    "current-change",
    "header-dragend",
    "expand-change"
  ],
  setup(e) {
    const { t } = Il(), n = se("table"), r = le();
    Be(je, r);
    const o = Dm(r, e);
    r.store = o;
    const a = new zm({
      store: r.store,
      table: r,
      fit: e.fit,
      showHeader: e.showHeader
    });
    r.layout = a;
    const s = A(() => (o.states.data.value || []).length === 0), {
      setCurrentRow: l,
      getSelectionRows: i,
      toggleRowSelection: u,
      clearSelection: d,
      clearFilter: f,
      toggleAllSelection: v,
      toggleRowExpansion: h,
      clearSort: c,
      sort: p
    } = ig(o), {
      isHidden: g,
      renderExpanded: m,
      setDragVisible: w,
      isGroup: b,
      handleMouseLeave: y,
      handleHeaderFooterMousewheel: S,
      tableSize: _,
      emptyBlockStyle: C,
      handleFixedMousewheel: T,
      resizeProxyVisible: $,
      bodyWidth: M,
      resizeState: D,
      doLayout: L,
      tableBodyStyles: K,
      tableLayout: I,
      scrollbarViewStyle: P,
      tableInnerStyle: B,
      scrollbarStyle: J
    } = ug(e, a, o, r), { scrollBarRef: R, scrollTo: O, setScrollLeft: H, setScrollTop: Z } = dg(), ee = Kn(L, 50), oe = `${n.namespace.value}-table_${fg++}`;
    r.tableId = oe, r.state = {
      isGroup: b,
      resizeState: D,
      doLayout: L,
      debouncedUpdateLayout: ee
    };
    const ce = A(() => e.sumText || t("el.table.sumText")), te = A(() => e.emptyText || t("el.table.emptyText"));
    return {
      ns: n,
      layout: a,
      store: o,
      handleHeaderFooterMousewheel: S,
      handleMouseLeave: y,
      tableId: oe,
      tableSize: _,
      isHidden: g,
      isEmpty: s,
      renderExpanded: m,
      resizeProxyVisible: $,
      resizeState: D,
      isGroup: b,
      bodyWidth: M,
      tableBodyStyles: K,
      emptyBlockStyle: C,
      debouncedUpdateLayout: ee,
      handleFixedMousewheel: T,
      setCurrentRow: l,
      getSelectionRows: i,
      toggleRowSelection: u,
      clearSelection: d,
      clearFilter: f,
      toggleAllSelection: v,
      toggleRowExpansion: h,
      clearSort: c,
      doLayout: L,
      sort: p,
      t,
      setDragVisible: w,
      context: r,
      computedSumText: ce,
      computedEmptyText: te,
      tableLayout: I,
      scrollbarViewStyle: P,
      tableInnerStyle: B,
      scrollbarStyle: J,
      scrollBarRef: R,
      scrollTo: O,
      setScrollLeft: H,
      setScrollTop: Z
    };
  }
}), vg = ["data-prefix"], hg = {
  ref: "hiddenColumns",
  class: "hidden-columns"
};
function mg(e, t, n, r, o, a) {
  const s = Pe("hColgroup"), l = Pe("table-header"), i = Pe("table-body"), u = Pe("el-scrollbar"), d = Pe("table-footer"), f = _t("mousewheel");
  return k(), W("div", {
    ref: "tableWrapper",
    class: V([
      {
        [e.ns.m("fit")]: e.fit,
        [e.ns.m("striped")]: e.stripe,
        [e.ns.m("border")]: e.border || e.isGroup,
        [e.ns.m("hidden")]: e.isHidden,
        [e.ns.m("group")]: e.isGroup,
        [e.ns.m("fluid-height")]: e.maxHeight,
        [e.ns.m("scrollable-x")]: e.layout.scrollX.value,
        [e.ns.m("scrollable-y")]: e.layout.scrollY.value,
        [e.ns.m("enable-row-hover")]: !e.store.states.isComplex.value,
        [e.ns.m("enable-row-transition")]: (e.store.states.data.value || []).length !== 0 && (e.store.states.data.value || []).length < 100,
        "has-footer": e.showSummary
      },
      e.ns.m(e.tableSize),
      e.className,
      e.ns.b(),
      e.ns.m(`layout-${e.tableLayout}`)
    ]),
    style: ke(e.style),
    "data-prefix": e.ns.namespace.value,
    onMouseleave: t[0] || (t[0] = (v) => e.handleMouseLeave())
  }, [
    ie("div", {
      class: V(e.ns.e("inner-wrapper")),
      style: ke(e.tableInnerStyle)
    }, [
      ie("div", hg, [
        be(e.$slots, "default")
      ], 512),
      e.showHeader && e.tableLayout === "fixed" ? ye((k(), W("div", {
        key: 0,
        ref: "headerWrapper",
        class: V(e.ns.e("header-wrapper"))
      }, [
        ie("table", {
          ref: "tableHeader",
          class: V(e.ns.e("header")),
          style: ke(e.tableBodyStyles),
          border: "0",
          cellpadding: "0",
          cellspacing: "0"
        }, [
          N(s, {
            columns: e.store.states.columns.value,
            "table-layout": e.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          N(l, {
            ref: "tableHeaderRef",
            border: e.border,
            "default-sort": e.defaultSort,
            store: e.store,
            onSetDragVisible: e.setDragVisible
          }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])
        ], 6)
      ], 2)), [
        [f, e.handleHeaderFooterMousewheel]
      ]) : Ee("v-if", !0),
      ie("div", {
        ref: "bodyWrapper",
        class: V(e.ns.e("body-wrapper"))
      }, [
        N(u, {
          ref: "scrollBarRef",
          "view-style": e.scrollbarViewStyle,
          "wrap-style": e.scrollbarStyle,
          always: e.scrollbarAlwaysOn
        }, {
          default: ue(() => [
            ie("table", {
              ref: "tableBody",
              class: V(e.ns.e("body")),
              cellspacing: "0",
              cellpadding: "0",
              border: "0",
              style: ke({
                width: e.bodyWidth,
                tableLayout: e.tableLayout
              })
            }, [
              N(s, {
                columns: e.store.states.columns.value,
                "table-layout": e.tableLayout
              }, null, 8, ["columns", "table-layout"]),
              e.showHeader && e.tableLayout === "auto" ? (k(), ve(l, {
                key: 0,
                ref: "tableHeaderRef",
                border: e.border,
                "default-sort": e.defaultSort,
                store: e.store,
                onSetDragVisible: e.setDragVisible
              }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])) : Ee("v-if", !0),
              N(i, {
                context: e.context,
                highlight: e.highlightCurrentRow,
                "row-class-name": e.rowClassName,
                "tooltip-effect": e.tooltipEffect,
                "row-style": e.rowStyle,
                store: e.store,
                stripe: e.stripe
              }, null, 8, ["context", "highlight", "row-class-name", "tooltip-effect", "row-style", "store", "stripe"])
            ], 6),
            e.isEmpty ? (k(), W("div", {
              key: 0,
              ref: "emptyBlock",
              style: ke(e.emptyBlockStyle),
              class: V(e.ns.e("empty-block"))
            }, [
              ie("span", {
                class: V(e.ns.e("empty-text"))
              }, [
                be(e.$slots, "empty", {}, () => [
                  vn(Xe(e.computedEmptyText), 1)
                ])
              ], 2)
            ], 6)) : Ee("v-if", !0),
            e.$slots.append ? (k(), W("div", {
              key: 1,
              ref: "appendWrapper",
              class: V(e.ns.e("append-wrapper"))
            }, [
              be(e.$slots, "append")
            ], 2)) : Ee("v-if", !0)
          ]),
          _: 3
        }, 8, ["view-style", "wrap-style", "always"])
      ], 2),
      e.showSummary ? ye((k(), W("div", {
        key: 1,
        ref: "footerWrapper",
        class: V(e.ns.e("footer-wrapper"))
      }, [
        N(d, {
          border: e.border,
          "default-sort": e.defaultSort,
          store: e.store,
          style: ke(e.tableBodyStyles),
          "sum-text": e.computedSumText,
          "summary-method": e.summaryMethod
        }, null, 8, ["border", "default-sort", "store", "style", "sum-text", "summary-method"])
      ], 2)), [
        [Hn, !e.isEmpty],
        [f, e.handleHeaderFooterMousewheel]
      ]) : Ee("v-if", !0),
      e.border || e.isGroup ? (k(), W("div", {
        key: 2,
        class: V(e.ns.e("border-left-patch"))
      }, null, 2)) : Ee("v-if", !0)
    ], 6),
    ye(ie("div", {
      ref: "resizeProxy",
      class: V(e.ns.e("column-resize-proxy"))
    }, null, 2), [
      [Hn, e.resizeProxyVisible]
    ])
  ], 46, vg);
}
var gg = /* @__PURE__ */ he(pg, [["render", mg], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue"]]);
const bg = {
  selection: "table-column--selection",
  expand: "table__expand-column"
}, yg = {
  default: {
    order: ""
  },
  selection: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  expand: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  },
  index: {
    width: 48,
    minWidth: 48,
    realWidth: 48,
    order: ""
  }
}, wg = (e) => bg[e] || "", Cg = {
  selection: {
    renderHeader({ store: e }) {
      function t() {
        return e.states.data.value && e.states.data.value.length === 0;
      }
      return Y(jt, {
        disabled: t(),
        size: e.states.tableSize.value,
        indeterminate: e.states.selection.value.length > 0 && !e.states.isAllSelected.value,
        "onUpdate:modelValue": e.toggleAllSelection,
        modelValue: e.states.isAllSelected.value
      });
    },
    renderCell({
      row: e,
      column: t,
      store: n,
      $index: r
    }) {
      return Y(jt, {
        disabled: t.selectable ? !t.selectable.call(null, e, r) : !1,
        size: n.states.tableSize.value,
        onChange: () => {
          n.commit("rowSelectedChanged", e);
        },
        onClick: (o) => o.stopPropagation(),
        modelValue: n.isSelected(e)
      });
    },
    sortable: !1,
    resizable: !1
  },
  index: {
    renderHeader({ column: e }) {
      return e.label || "#";
    },
    renderCell({
      column: e,
      $index: t
    }) {
      let n = t + 1;
      const r = e.index;
      return typeof r == "number" ? n = t + r : typeof r == "function" && (n = r(t)), Y("div", {}, [n]);
    },
    sortable: !1
  },
  expand: {
    renderHeader({ column: e }) {
      return e.label || "";
    },
    renderCell({
      row: e,
      store: t,
      expanded: n
    }) {
      const { ns: r } = t, o = [r.e("expand-icon")];
      return n && o.push(r.em("expand-icon", "expanded")), Y("div", {
        class: o,
        onClick: function(s) {
          s.stopPropagation(), t.toggleRowExpansion(e);
        }
      }, {
        default: () => [
          Y(go, null, {
            default: () => [Y(Tl)]
          })
        ]
      });
    },
    sortable: !1,
    resizable: !1
  }
};
function Eg({
  row: e,
  column: t,
  $index: n
}) {
  var r;
  const o = t.property, a = o && Hf(e, o).value;
  return t && t.formatter ? t.formatter(e, t, a, n) : ((r = a == null ? void 0 : a.toString) == null ? void 0 : r.call(a)) || "";
}
function Sg({
  row: e,
  treeNode: t,
  store: n
}, r = !1) {
  const { ns: o } = n;
  if (!t)
    return r ? [
      Y("span", {
        class: o.e("placeholder")
      })
    ] : null;
  const a = [], s = function(l) {
    l.stopPropagation(), !t.loading && n.loadOrToggle(e);
  };
  if (t.indent && a.push(Y("span", {
    class: o.e("indent"),
    style: { "padding-left": `${t.indent}px` }
  })), typeof t.expanded == "boolean" && !t.noLazyChildren) {
    const l = [
      o.e("expand-icon"),
      t.expanded ? o.em("expand-icon", "expanded") : ""
    ];
    let i = Tl;
    t.loading && (i = cp), a.push(Y("div", {
      class: l,
      onClick: s
    }, {
      default: () => [
        Y(go, { class: { [o.is("loading")]: t.loading } }, {
          default: () => [Y(i)]
        })
      ]
    }));
  } else
    a.push(Y("span", {
      class: o.e("placeholder")
    }));
  return a;
}
function Ga(e, t) {
  return e.reduce((n, r) => (n[r] = r, n), t);
}
function _g(e, t) {
  const n = le();
  return {
    registerComplexWatchers: () => {
      const a = ["fixed"], s = {
        realWidth: "width",
        realMinWidth: "minWidth"
      }, l = Ga(a, s);
      Object.keys(l).forEach((i) => {
        const u = s[i];
        Ct(t, u) && U(() => t[u], (d) => {
          let f = d;
          u === "width" && i === "realWidth" && (f = Po(d)), u === "minWidth" && i === "realMinWidth" && (f = ys(d)), n.columnConfig.value[u] = f, n.columnConfig.value[i] = f;
          const v = u === "fixed";
          e.value.store.scheduleLayout(v);
        });
      });
    },
    registerNormalWatchers: () => {
      const a = [
        "label",
        "filters",
        "filterMultiple",
        "sortable",
        "index",
        "formatter",
        "className",
        "labelClassName",
        "showOverflowTooltip"
      ], s = {
        property: "prop",
        align: "realAlign",
        headerAlign: "realHeaderAlign"
      }, l = Ga(a, s);
      Object.keys(l).forEach((i) => {
        const u = s[i];
        Ct(t, u) && U(() => t[u], (d) => {
          n.columnConfig.value[i] = d;
        });
      });
    }
  };
}
function xg(e, t, n) {
  const r = le(), o = x(""), a = x(!1), s = x(), l = x(), i = se("table");
  it(() => {
    s.value = e.align ? `is-${e.align}` : null, s.value;
  }), it(() => {
    l.value = e.headerAlign ? `is-${e.headerAlign}` : s.value, l.value;
  });
  const u = A(() => {
    let b = r.vnode.vParent || r.parent;
    for (; b && !b.tableId && !b.columnId; )
      b = b.vnode.vParent || b.parent;
    return b;
  }), d = A(() => {
    const { store: b } = r.parent;
    if (!b)
      return !1;
    const { treeData: y } = b.states, S = y.value;
    return S && Object.keys(S).length > 0;
  }), f = x(Po(e.width)), v = x(ys(e.minWidth)), h = (b) => (f.value && (b.width = f.value), v.value && (b.minWidth = v.value), !f.value && v.value && (b.width = void 0), b.minWidth || (b.minWidth = 80), b.realWidth = Number(b.width === void 0 ? b.minWidth : b.width), b), c = (b) => {
    const y = b.type, S = Cg[y] || {};
    Object.keys(S).forEach((C) => {
      const T = S[C];
      C !== "className" && T !== void 0 && (b[C] = T);
    });
    const _ = wg(y);
    if (_) {
      const C = `${E(i.namespace)}-${_}`;
      b.className = b.className ? `${b.className} ${C}` : C;
    }
    return b;
  }, p = (b) => {
    Array.isArray(b) ? b.forEach((S) => y(S)) : y(b);
    function y(S) {
      var _;
      ((_ = S == null ? void 0 : S.type) == null ? void 0 : _.name) === "ElTableColumn" && (S.vParent = r);
    }
  };
  return {
    columnId: o,
    realAlign: s,
    isSubColumn: a,
    realHeaderAlign: l,
    columnOrTableParent: u,
    setColumnWidth: h,
    setColumnForcedProps: c,
    setColumnRenders: (b) => {
      e.renderHeader ? et("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.") : b.type !== "selection" && (b.renderHeader = (S) => {
        r.columnConfig.value.label;
        const _ = t.header;
        return _ ? _(S) : b.label;
      });
      let y = b.renderCell;
      return b.type === "expand" ? (b.renderCell = (S) => Y("div", {
        class: "cell"
      }, [y(S)]), n.value.renderExpanded = (S) => t.default ? t.default(S) : t.default) : (y = y || Eg, b.renderCell = (S) => {
        let _ = null;
        if (t.default) {
          const M = t.default(S);
          _ = M.some((D) => D.type !== rl) ? M : y(S);
        } else
          _ = y(S);
        const C = d.value && S.cellIndex === 0 && S.column.type !== "selection", T = Sg(S, C), $ = {
          class: "cell",
          style: {}
        };
        return b.showOverflowTooltip && ($.class = `${$.class} ${E(i.namespace)}-tooltip`, $.style = {
          width: `${(S.column.realWidth || Number(S.column.width)) - 1}px`
        }), p(_), Y("div", $, [T, _]);
      }), b;
    },
    getPropsData: (...b) => b.reduce((y, S) => (Array.isArray(S) && S.forEach((_) => {
      y[_] = e[_];
    }), y), {}),
    getColumnElIndex: (b, y) => Array.prototype.indexOf.call(b, y)
  };
}
var Tg = {
  type: {
    type: String,
    default: "default"
  },
  label: String,
  className: String,
  labelClassName: String,
  property: String,
  prop: String,
  width: {
    type: [String, Number],
    default: ""
  },
  minWidth: {
    type: [String, Number],
    default: ""
  },
  renderHeader: Function,
  sortable: {
    type: [Boolean, String],
    default: !1
  },
  sortMethod: Function,
  sortBy: [String, Function, Array],
  resizable: {
    type: Boolean,
    default: !0
  },
  columnKey: String,
  align: String,
  headerAlign: String,
  showTooltipWhenOverflow: Boolean,
  showOverflowTooltip: Boolean,
  fixed: [Boolean, String],
  formatter: Function,
  selectable: Function,
  reserveSelection: Boolean,
  filterMethod: Function,
  filteredValue: Array,
  filters: Array,
  filterPlacement: String,
  filterMultiple: {
    type: Boolean,
    default: !0
  },
  index: [Number, Function],
  sortOrders: {
    type: Array,
    default: () => ["ascending", "descending", null],
    validator: (e) => e.every((t) => ["ascending", "descending", null].includes(t))
  }
};
let Og = 1;
var Os = j({
  name: "ElTableColumn",
  components: {
    ElCheckbox: jt
  },
  props: Tg,
  setup(e, { slots: t }) {
    const n = le(), r = x({}), o = A(() => {
      let w = n.parent;
      for (; w && !w.tableId; )
        w = w.parent;
      return w;
    }), { registerNormalWatchers: a, registerComplexWatchers: s } = _g(o, e), {
      columnId: l,
      isSubColumn: i,
      realHeaderAlign: u,
      columnOrTableParent: d,
      setColumnWidth: f,
      setColumnForcedProps: v,
      setColumnRenders: h,
      getPropsData: c,
      getColumnElIndex: p,
      realAlign: g
    } = xg(e, t, o), m = d.value;
    l.value = `${m.tableId || m.columnId}_column_${Og++}`, Yr(() => {
      i.value = o.value !== m;
      const w = e.type || "default", b = e.sortable === "" ? !0 : e.sortable, y = {
        ...yg[w],
        id: l.value,
        type: w,
        property: e.prop || e.property,
        align: g,
        headerAlign: u,
        showOverflowTooltip: e.showOverflowTooltip || e.showTooltipWhenOverflow,
        filterable: e.filters || e.filterMethod,
        filteredValue: [],
        filterPlacement: "",
        isColumnGroup: !1,
        isSubColumn: !1,
        filterOpened: !1,
        sortable: b,
        index: e.index,
        rawColumnKey: n.vnode.key
      };
      let $ = c([
        "columnKey",
        "label",
        "className",
        "labelClassName",
        "type",
        "renderHeader",
        "formatter",
        "fixed",
        "resizable"
      ], ["sortMethod", "sortBy", "sortOrders"], ["selectable", "reserveSelection"], [
        "filterMethod",
        "filters",
        "filterMultiple",
        "filterOpened",
        "filteredValue",
        "filterPlacement"
      ]);
      $ = $m(y, $), $ = Am(h, f, v)($), r.value = $, a(), s();
    }), Te(() => {
      var w;
      const b = d.value, y = i.value ? b.vnode.el.children : (w = b.refs.hiddenColumns) == null ? void 0 : w.children, S = () => p(y || [], n.vnode.el);
      r.value.getColumnIndex = S, S() > -1 && o.value.store.commit("insertColumn", r.value, i.value ? b.columnConfig.value : null);
    }), ze(() => {
      o.value.store.commit("removeColumn", r.value, i.value ? m.columnConfig.value : null);
    }), n.columnId = l.value, n.columnConfig = r;
  },
  render() {
    var e, t, n;
    try {
      const r = (t = (e = this.$slots).default) == null ? void 0 : t.call(e, {
        row: {},
        column: {},
        $index: -1
      }), o = [];
      if (Array.isArray(r))
        for (const s of r)
          ((n = s.type) == null ? void 0 : n.name) === "ElTableColumn" || s.shapeFlag & 2 ? o.push(s) : s.type === yt && Array.isArray(s.children) && s.children.forEach((l) => {
            (l == null ? void 0 : l.patchFlag) !== 1024 && !St(l == null ? void 0 : l.children) && o.push(l);
          });
      return Y("div", o);
    } catch {
      return Y("div", []);
    }
  }
});
const $g = Ut(gg, {
  TableColumn: Os
}), Pg = co(Os);
const No = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, Ag = { class: "simple-table" }, Rg = { key: 1 }, Lg = {
  __name: "SimpleTable",
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = X("$request"), r = x(null), o = Object.getPrototypeOf(async function() {
    }).constructor, a = async () => t.props ? t.props.interfaceType === "ProCode" ? await async function() {
      return await new o("$request", t.props.code)(n);
    }() : await n.get(t.props.url) : [];
    return it(async () => {
      r.value = await a();
    }), (s, l) => {
      const i = Pg, u = $g;
      return k(), W("div", Ag, [
        r.value && r.value.length > 0 ? (k(), ve(u, {
          key: 0,
          data: r.value,
          style: { width: "100%" }
        }, {
          default: ue(() => [
            N(i, {
              prop: "date",
              label: "Date",
              width: "180"
            }),
            N(i, {
              prop: "name",
              label: "Name",
              width: "180"
            }),
            N(i, {
              prop: "address",
              label: "Address"
            })
          ]),
          _: 1
        }, 8, ["data"])) : (k(), W("p", Rg, "暂无数据"))
      ]);
    };
  }
}, $s = /* @__PURE__ */ No(Lg, [["__scopeId", "data-v-be24fd09"]]), Ng = (e) => {
  e.component("SimpleTable", $s);
}, kg = {
  SimpleTable: $s
};
const Ig = { class: "image-wrapper" }, Fg = ["src", "height"], Mg = {
  __name: "SimpleImage",
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e, n = "https://img.tt98.com/d/file/96kaifa/20181009233732/5bbc9c7b22f00.jpg";
    return (r, o) => {
      const a = _t("atomicattr");
      return ye((k(), W("div", Ig, [
        t.props ? (k(), W("img", {
          key: 0,
          src: t.props.url ? t.props.url : n,
          height: t.props.height,
          draggable: "false"
        }, null, 8, Fg)) : (k(), W("img", {
          key: 1,
          src: n
        }))
      ])), [
        [a, t.props.atomicAttrs]
      ]);
    };
  }
}, Ps = /* @__PURE__ */ No(Mg, [["__scopeId", "data-v-cee3d990"]]), ut = (e) => e != null, Bg = (e) => typeof e == "function", As = (e) => e !== null && typeof e == "object", Rs = (e) => typeof e == "number" || /^\d+(\.\d+)?$/.test(e), Dg = typeof window < "u";
function Ya(e, t) {
  const n = t.split(".");
  let r = e;
  return n.forEach((o) => {
    var a;
    r = As(r) && (a = r[o]) != null ? a : "";
  }), r;
}
const Ae = [Number, String], pn = {
  type: Boolean,
  default: !0
}, dt = (e) => ({
  type: String,
  default: e
});
var Hg = (e) => e === window, qa = (e, t) => ({
  top: 0,
  left: 0,
  right: e,
  bottom: t,
  width: e,
  height: t
}), zg = (e) => {
  const t = E(e);
  if (Hg(t)) {
    const n = t.innerWidth, r = t.innerHeight;
    return qa(n, r);
  }
  return t != null && t.getBoundingClientRect ? t.getBoundingClientRect() : qa(0, 0);
};
function st(e) {
  if (ut(e))
    return Rs(e) ? `${e}px` : String(e);
}
function Wg(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
const jg = /-(\w)/g, Ls = (e) => e.replace(jg, (t, n) => n.toUpperCase()), Kg = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, ""), { hasOwnProperty: Vg } = Object.prototype;
function Ug(e, t, n) {
  const r = t[n];
  ut(r) && (!Vg.call(e, n) || !As(r) ? e[n] = r : e[n] = Ns(Object(e[n]), r));
}
function Ns(e, t) {
  return Object.keys(t).forEach((n) => {
    Ug(e, t, n);
  }), e;
}
var Gg = {
  name: "姓名",
  tel: "电话",
  save: "保存",
  confirm: "确认",
  cancel: "取消",
  delete: "删除",
  loading: "加载中...",
  noCoupon: "暂无优惠券",
  nameEmpty: "请填写姓名",
  addContact: "添加联系人",
  telInvalid: "请填写正确的电话",
  vanCalendar: {
    end: "结束",
    start: "开始",
    title: "日期选择",
    weekdays: ["日", "一", "二", "三", "四", "五", "六"],
    monthTitle: (e, t) => `${e}年${t}月`,
    rangePrompt: (e) => `最多选择 ${e} 天`
  },
  vanCascader: {
    select: "请选择"
  },
  vanPagination: {
    prev: "上一页",
    next: "下一页"
  },
  vanPullRefresh: {
    pulling: "下拉即可刷新...",
    loosing: "释放即可刷新..."
  },
  vanSubmitBar: {
    label: "合计:"
  },
  vanCoupon: {
    unlimited: "无门槛",
    discount: (e) => `${e}折`,
    condition: (e) => `满${e}元可用`
  },
  vanCouponCell: {
    title: "优惠券",
    count: (e) => `${e}张可用`
  },
  vanCouponList: {
    exchange: "兑换",
    close: "不使用",
    enable: "可用",
    disabled: "不可用",
    placeholder: "输入优惠码"
  },
  vanAddressEdit: {
    area: "地区",
    postal: "邮政编码",
    areaEmpty: "请选择地区",
    addressEmpty: "请填写详细地址",
    postalEmpty: "邮政编码不正确",
    addressDetail: "详细地址",
    defaultAddress: "设为默认收货地址"
  },
  vanAddressList: {
    add: "新增地址"
  }
};
const Xa = x("zh-CN"), Ja = tl({
  "zh-CN": Gg
}), Yg = {
  messages() {
    return Ja[Xa.value];
  },
  use(e, t) {
    Xa.value = e, this.add({ [e]: t });
  },
  add(e = {}) {
    Ns(Ja, e);
  }
};
var qg = Yg;
function Xg(e) {
  const t = Ls(e) + ".";
  return (n, ...r) => {
    const o = qg.messages(), a = Ya(o, t + n) || Ya(o, n);
    return Bg(a) ? a(...r) : a;
  };
}
function Vr(e, t) {
  return t ? typeof t == "string" ? ` ${e}--${t}` : Array.isArray(t) ? t.reduce(
    (n, r) => n + Vr(e, r),
    ""
  ) : Object.keys(t).reduce(
    (n, r) => n + (t[r] ? Vr(e, r) : ""),
    ""
  ) : "";
}
function Jg(e) {
  return (t, n) => (t && typeof t != "string" && (n = t, t = ""), t = t ? `${e}__${t}` : e, `${t}${Vr(t, n)}`);
}
function Ot(e) {
  const t = `van-${e}`;
  return [
    t,
    Jg(t),
    Xg(t)
  ];
}
const Zg = "van-hairline", Qg = `${Zg}--bottom`, Ur = "van-haptics-feedback";
function qt(e) {
  return e.install = (t) => {
    const { name: n } = e;
    n && (t.component(n, e), t.component(Ls(`-${n}`), e));
  }, e;
}
const eb = Symbol();
function tb(e) {
  const t = X(eb, null);
  t && U(t, (n) => {
    n && e();
  });
}
const nb = (e, t) => {
  const n = x(), r = () => {
    n.value = zg(e).height;
  };
  return Te(() => {
    if (we(r), t)
      for (let o = 1; o <= 3; o++)
        setTimeout(r, 100 * o);
  }), tb(() => we(r)), n;
};
function rb(e, t) {
  const n = nb(e, !0);
  return (r) => N("div", {
    class: t("placeholder"),
    style: {
      height: n.value ? `${n.value}px` : void 0
    }
  }, [r()]);
}
const [ob, Za] = Ot("badge"), ab = {
  dot: Boolean,
  max: Ae,
  tag: dt("div"),
  color: String,
  offset: Array,
  content: Ae,
  showZero: pn,
  position: dt("top-right")
};
var lb = j({
  name: ob,
  props: ab,
  setup(e, {
    slots: t
  }) {
    const n = () => {
      if (t.content)
        return !0;
      const {
        content: s,
        showZero: l
      } = e;
      return ut(s) && s !== "" && (l || s !== 0 && s !== "0");
    }, r = () => {
      const {
        dot: s,
        max: l,
        content: i
      } = e;
      if (!s && n())
        return t.content ? t.content() : ut(l) && Rs(i) && +i > l ? `${l}+` : i;
    }, o = A(() => {
      const s = {
        background: e.color
      };
      if (e.offset) {
        const [l, i] = e.offset;
        t.default ? (s.top = st(i), typeof l == "number" ? s.right = st(-l) : s.right = l.startsWith("-") ? l.replace("-", "") : `-${l}`) : (s.marginTop = st(i), s.marginLeft = st(l));
      }
      return s;
    }), a = () => {
      if (n() || e.dot)
        return N("div", {
          class: Za([e.position, {
            dot: e.dot,
            fixed: !!t.default
          }]),
          style: o.value
        }, [r()]);
    };
    return () => {
      if (t.default) {
        const {
          tag: s
        } = e;
        return N(s, {
          class: Za("wrapper")
        }, {
          default: () => [t.default(), a()]
        });
      }
      return a();
    };
  }
});
const sb = qt(lb), ib = (e) => {
}, [ks, ub] = Ot("config-provider"), Is = Symbol(ks), cb = {
  tag: dt("div"),
  zIndex: Number,
  themeVars: Object,
  iconPrefix: String
};
function db(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[`--van-${Kg(n)}`] = e[n];
  }), t;
}
j({
  name: ks,
  props: cb,
  setup(e, {
    slots: t
  }) {
    const n = A(() => {
      if (e.themeVars)
        return db(e.themeVars);
    });
    return Be(Is, e), it(() => {
      e.zIndex !== void 0 && ib(e.zIndex);
    }), () => N(e.tag, {
      class: ub(),
      style: n.value
    }, {
      default: () => {
        var r;
        return [(r = t.default) == null ? void 0 : r.call(t)];
      }
    });
  }
});
const [fb, Qa] = Ot("icon"), pb = (e) => e == null ? void 0 : e.includes("/"), vb = {
  dot: Boolean,
  tag: dt("i"),
  name: String,
  size: Ae,
  badge: Ae,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var hb = j({
  name: fb,
  props: vb,
  setup(e, {
    slots: t
  }) {
    const n = X(Is, null), r = A(() => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || Qa());
    return () => {
      const {
        tag: o,
        dot: a,
        name: s,
        size: l,
        badge: i,
        color: u
      } = e, d = pb(s);
      return N(sb, It({
        dot: a,
        tag: o,
        class: [r.value, d ? "" : `${r.value}-${s}`],
        style: {
          color: u,
          fontSize: st(l)
        },
        content: i
      }, e.badgeProps), {
        default: () => {
          var f;
          return [(f = t.default) == null ? void 0 : f.call(t), d && N("img", {
            class: Qa("image"),
            src: s
          }, null)];
        }
      });
    };
  }
});
const ko = qt(hb), [mb, el] = Ot("tag"), gb = {
  size: String,
  mark: Boolean,
  show: pn,
  type: dt("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var bb = j({
  name: mb,
  props: gb,
  emits: ["close"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = (s) => {
      s.stopPropagation(), n("close", s);
    }, o = () => e.plain ? {
      color: e.textColor || e.color,
      borderColor: e.color
    } : {
      color: e.textColor,
      background: e.color
    }, a = () => {
      var s;
      const {
        type: l,
        mark: i,
        plain: u,
        round: d,
        size: f,
        closeable: v
      } = e, h = {
        mark: i,
        plain: u,
        round: d
      };
      f && (h[f] = f);
      const c = v && N(ko, {
        name: "cross",
        class: [el("close"), Ur],
        onClick: r
      }, null);
      return N("span", {
        style: o(),
        class: el([h, l])
      }, [(s = t.default) == null ? void 0 : s.call(t), c]);
    };
    return () => N(qr, {
      name: e.closeable ? "van-fade" : void 0
    }, {
      default: () => [e.show ? a() : null]
    });
  }
});
const yb = qt(bb), [wb, Rt] = Ot("image"), Cb = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: Ae,
  height: Ae,
  radius: Ae,
  lazyLoad: Boolean,
  iconSize: Ae,
  showError: pn,
  errorIcon: dt("photo-fail"),
  iconPrefix: String,
  showLoading: pn,
  loadingIcon: dt("photo")
};
var Eb = j({
  name: wb,
  props: Cb,
  emits: ["load", "error"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = x(!1), o = x(!0), a = x(), {
      $Lazyload: s
    } = le().proxy, l = A(() => {
      const p = {
        width: st(e.width),
        height: st(e.height)
      };
      return ut(e.radius) && (p.overflow = "hidden", p.borderRadius = st(e.radius)), p;
    });
    U(() => e.src, () => {
      r.value = !1, o.value = !0;
    });
    const i = (p) => {
      o.value = !1, t("load", p);
    }, u = (p) => {
      r.value = !0, o.value = !1, t("error", p);
    }, d = (p, g, m) => m ? m() : N(ko, {
      name: p,
      size: e.iconSize,
      class: g,
      classPrefix: e.iconPrefix
    }, null), f = () => {
      if (o.value && e.showLoading)
        return N("div", {
          class: Rt("loading")
        }, [d(e.loadingIcon, Rt("loading-icon"), n.loading)]);
      if (r.value && e.showError)
        return N("div", {
          class: Rt("error")
        }, [d(e.errorIcon, Rt("error-icon"), n.error)]);
    }, v = () => {
      if (r.value || !e.src)
        return;
      const p = {
        alt: e.alt,
        class: Rt("img"),
        style: {
          objectFit: e.fit,
          objectPosition: e.position
        }
      };
      return e.lazyLoad ? ye(N("img", It({
        ref: a
      }, p), null), [[_t("lazy"), e.src]]) : N("img", It({
        src: e.src,
        onLoad: i,
        onError: u
      }, p), null);
    }, h = ({
      el: p
    }) => {
      const g = () => {
        p === a.value && o.value && i();
      };
      a.value ? g() : we(g);
    }, c = ({
      el: p
    }) => {
      p === a.value && !r.value && u();
    };
    return s && Dg && (s.$on("loaded", h), s.$on("error", c), ze(() => {
      s.$off("loaded", h), s.$off("error", c);
    })), () => {
      var p;
      return N("div", {
        class: Rt({
          round: e.round,
          block: e.block
        }),
        style: l.value
      }, [v(), f(), (p = n.default) == null ? void 0 : p.call(n)]);
    };
  }
});
const Sb = qt(Eb), [_b, Ce] = Ot("card"), xb = {
  tag: String,
  num: Ae,
  desc: String,
  thumb: String,
  title: String,
  price: Ae,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: dt("¥"),
  thumbLink: String,
  originPrice: Ae
};
var Tb = j({
  name: _b,
  props: xb,
  emits: ["click-thumb"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = () => {
      if (t.title)
        return t.title();
      if (e.title)
        return N("div", {
          class: [Ce("title"), "van-multi-ellipsis--l2"]
        }, [e.title]);
    }, o = () => {
      if (t.tag || e.tag)
        return N("div", {
          class: Ce("tag")
        }, [t.tag ? t.tag() : N(yb, {
          mark: !0,
          type: "danger"
        }, {
          default: () => [e.tag]
        })]);
    }, a = () => t.thumb ? t.thumb() : N(Sb, {
      src: e.thumb,
      fit: "cover",
      width: "100%",
      height: "100%",
      lazyLoad: e.lazyLoad
    }, null), s = () => {
      if (t.thumb || e.thumb)
        return N("a", {
          href: e.thumbLink,
          class: Ce("thumb"),
          onClick: (u) => n("click-thumb", u)
        }, [a(), o()]);
    }, l = () => {
      if (t.desc)
        return t.desc();
      if (e.desc)
        return N("div", {
          class: [Ce("desc"), "van-ellipsis"]
        }, [e.desc]);
    }, i = () => {
      const u = e.price.toString().split(".");
      return N("div", null, [N("span", {
        class: Ce("price-currency")
      }, [e.currency]), N("span", {
        class: Ce("price-integer")
      }, [u[0]]), vn("."), N("span", {
        class: Ce("price-decimal")
      }, [u[1]])]);
    };
    return () => {
      var u, d, f;
      const v = t.num || ut(e.num), h = t.price || ut(e.price), c = t["origin-price"] || ut(e.originPrice), p = v || h || c || t.bottom, g = h && N("div", {
        class: Ce("price")
      }, [t.price ? t.price() : i()]), m = c && N("div", {
        class: Ce("origin-price")
      }, [t["origin-price"] ? t["origin-price"]() : `${e.currency} ${e.originPrice}`]), w = v && N("div", {
        class: Ce("num")
      }, [t.num ? t.num() : `x${e.num}`]), b = t.footer && N("div", {
        class: Ce("footer")
      }, [t.footer()]), y = p && N("div", {
        class: Ce("bottom")
      }, [(u = t["price-top"]) == null ? void 0 : u.call(t), g, m, w, (d = t.bottom) == null ? void 0 : d.call(t)]);
      return N("div", {
        class: Ce()
      }, [N("div", {
        class: Ce("header")
      }, [s(), N("div", {
        class: Ce("content", {
          centered: e.centered
        })
      }, [N("div", null, [r(), l(), (f = t.tags) == null ? void 0 : f.call(t)]), y])]), b]);
    };
  }
});
const Fs = qt(Tb), [Ob, Ge] = Ot("nav-bar"), $b = {
  title: String,
  fixed: Boolean,
  zIndex: Ae,
  border: pn,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean
};
var Pb = j({
  name: Ob,
  props: $b,
  emits: ["click-left", "click-right"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = x(), o = rb(r, Ge), a = (d) => t("click-left", d), s = (d) => t("click-right", d), l = () => n.left ? n.left() : [e.leftArrow && N(ko, {
      class: Ge("arrow"),
      name: "arrow-left"
    }, null), e.leftText && N("span", {
      class: Ge("text")
    }, [e.leftText])], i = () => n.right ? n.right() : N("span", {
      class: Ge("text")
    }, [e.rightText]), u = () => {
      const {
        title: d,
        fixed: f,
        border: v,
        zIndex: h
      } = e, c = Wg(h), p = e.leftArrow || e.leftText || n.left, g = e.rightText || n.right;
      return N("div", {
        ref: r,
        style: c,
        class: [Ge({
          fixed: f
        }), {
          [Qg]: v,
          "van-safe-area-top": e.safeAreaInsetTop
        }]
      }, [N("div", {
        class: Ge("content")
      }, [p && N("div", {
        class: [Ge("left"), Ur],
        onClick: a
      }, [l()]), N("div", {
        class: [Ge("title"), "van-ellipsis"]
      }, [n.title ? n.title() : d]), g && N("div", {
        class: [Ge("right"), Ur],
        onClick: s
      }, [i()])])]);
    };
    return () => e.fixed && e.placeholder ? o(u) : u();
  }
});
const Ab = qt(Pb);
const Ms = {
  __name: "NavBar",
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e;
    return (n, r) => {
      const o = Ab, a = _t("atomicattr");
      return ye((k(), W("div", null, [
        N(o, {
          title: t.props && t.props.title || "标题",
          style: { "background-color": "#ee0a24" }
        }, null, 8, ["title"])
      ])), [
        [a, t.props.atomicAttrs]
      ]);
    };
  }
};
const Bs = {
  __name: "Offer",
  props: {
    props: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(e) {
    const t = e;
    return (n, r) => {
      const o = Fs, a = _t("atomicattr");
      return ye((k(), W("div", null, [
        N(o, {
          num: t.props.num || "1",
          price: t.props.price || "2999.00",
          desc: t.props.desc || "New IPAD 10.8inc",
          title: t.props.title || "IPAD 2022",
          thumb: t.props.pic || "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        }, null, 8, ["num", "price", "desc", "title", "thumb"])
      ])), [
        [a, t.props.atomicAttrs]
      ]);
    };
  }
};
const Rb = { class: "offerList" }, Lb = {
  __name: "OfferList",
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = X("$request"), r = {
      id: 1,
      title: "MatePad 10 Pro",
      desc: "New MatePad Pro 10.8",
      price: "2699.00",
      num: "3",
      pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1"
    }, o = async (s) => s === "PadList" ? await n.get("/v1/products/pad") : s === "PhoneList" ? await n.get("/v1/products/phone") : [r], a = x([]);
    return it(async () => {
      const s = t.props.condition;
      s ? a.value = await o(s) : a.value = [r];
    }), (s, l) => {
      const i = Fs, u = _t("atomicattr");
      return ye((k(), W("div", Rb, [
        (k(!0), W(yt, null, Cr(a.value, (d) => (k(), W("div", {
          key: d.id
        }, [
          N(i, {
            num: d.num,
            price: d.price,
            desc: d.desc,
            title: d.title,
            thumb: d.pic
          }, null, 8, ["num", "price", "desc", "title", "thumb"])
        ]))), 128))
      ])), [
        [u, t.props.atomicAttrs]
      ]);
    };
  }
}, Ds = /* @__PURE__ */ No(Lb, [["__scopeId", "data-v-fa13870e"]]), Nb = (e) => {
  e.component("SimpleImage", Ps), e.component("NavBar", Ms), e.component("Offer", Bs), e.component("OfferList", Ds);
}, kb = {
  SimpleImage: Ps,
  NavBar: Ms,
  Offer: Bs,
  OfferList: Ds
}, Fb = {
  BasicWebComponentsIn: Ng,
  BasicMobileComponentsIn: Nb
}, Mb = {
  BasicWebComponents: kg,
  BasicMobileComponents: kb
};
export {
  Mb as allComponents,
  Fb as default
};
