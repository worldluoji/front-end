function ud(e, t) {
  const n = /* @__PURE__ */ Object.create(null), r = e.split(",");
  for (let o = 0; o < r.length; o++)
    n[r[o]] = !0;
  return t ? (o) => !!n[o.toLowerCase()] : (o) => !!n[o];
}
function De(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const r = e[n], o = ve(r) ? pd(r) : De(r);
      if (o)
        for (const s in o)
          t[s] = o[s];
    }
    return t;
  } else {
    if (ve(e))
      return e;
    if (ae(e))
      return e;
  }
}
const cd = /;(?![^(]*\))/g, dd = /:([^]+)/, fd = /\/\*.*?\*\//gs;
function pd(e) {
  const t = {};
  return e.replace(fd, "").split(cd).forEach((n) => {
    if (n) {
      const r = n.split(dd);
      r.length > 1 && (t[r[0].trim()] = r[1].trim());
    }
  }), t;
}
function j(e) {
  let t = "";
  if (ve(e))
    t = e;
  else if (W(e))
    for (let n = 0; n < e.length; n++) {
      const r = j(e[n]);
      r && (t += r + " ");
    }
  else if (ae(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function hd(e, t) {
  if (e.length !== t.length)
    return !1;
  let n = !0;
  for (let r = 0; n && r < e.length; r++)
    n = ho(e[r], t[r]);
  return n;
}
function ho(e, t) {
  if (e === t)
    return !0;
  let n = Ma(e), r = Ma(t);
  if (n || r)
    return n && r ? e.getTime() === t.getTime() : !1;
  if (n = tr(e), r = tr(t), n || r)
    return e === t;
  if (n = W(e), r = W(t), n || r)
    return n && r ? hd(e, t) : !1;
  if (n = ae(e), r = ae(t), n || r) {
    if (!n || !r)
      return !1;
    const o = Object.keys(e).length, s = Object.keys(t).length;
    if (o !== s)
      return !1;
    for (const a in e) {
      const l = e.hasOwnProperty(a), i = t.hasOwnProperty(a);
      if (l && !i || !l && i || !ho(e[a], t[a]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function Ni(e, t) {
  return e.findIndex((n) => ho(n, t));
}
const mt = (e) => ve(e) ? e : e == null ? "" : W(e) || ae(e) && (e.toString === Pi || !ue(e.toString)) ? JSON.stringify(e, $i, 2) : String(e), $i = (e, t) => t && t.__v_isRef ? $i(e, t.value) : en(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce((n, [r, o]) => (n[`${r} =>`] = o, n), {})
} : vo(t) ? {
  [`Set(${t.size})`]: [...t.values()]
} : ae(t) && !W(t) && !Ii(t) ? String(t) : t, Je = process.env.NODE_ENV !== "production" ? Object.freeze({}) : {}, vd = process.env.NODE_ENV !== "production" ? Object.freeze([]) : [], wt = () => {
}, gd = () => !1, md = /^on[^a-z]/, bd = (e) => md.test(e), ze = Object.assign, Ai = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, yd = Object.prototype.hasOwnProperty, re = (e, t) => yd.call(e, t), W = Array.isArray, en = (e) => gr(e) === "[object Map]", vo = (e) => gr(e) === "[object Set]", Ma = (e) => gr(e) === "[object Date]", ue = (e) => typeof e == "function", ve = (e) => typeof e == "string", tr = (e) => typeof e == "symbol", ae = (e) => e !== null && typeof e == "object", wd = (e) => ae(e) && ue(e.then) && ue(e.catch), Pi = Object.prototype.toString, gr = (e) => Pi.call(e), Ri = (e) => gr(e).slice(8, -1), Ii = (e) => gr(e) === "[object Object]", Rs = (e) => ve(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Is = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, _d = /-(\w)/g, nr = Is((e) => e.replace(_d, (t, n) => n ? n.toUpperCase() : "")), rr = Is((e) => e.charAt(0).toUpperCase() + e.slice(1)), Ed = Is((e) => e ? `on${rr(e)}` : ""), or = (e, t) => !Object.is(e, t), Cd = (e, t) => {
  for (let n = 0; n < e.length; n++)
    e[n](t);
}, Sd = (e, t, n) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    value: n
  });
}, Li = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let Da;
const xd = () => Da || (Da = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function ka(e, ...t) {
  console.warn(`[Vue warn] ${e}`, ...t);
}
let Od;
function Td(e, t = Od) {
  t && t.active && t.effects.push(e);
}
const sr = (e) => {
  const t = new Set(e);
  return t.w = 0, t.n = 0, t;
}, Fi = (e) => (e.w & Bt) > 0, Mi = (e) => (e.n & Bt) > 0, Nd = ({ deps: e }) => {
  if (e.length)
    for (let t = 0; t < e.length; t++)
      e[t].w |= Bt;
}, $d = (e) => {
  const { deps: t } = e;
  if (t.length) {
    let n = 0;
    for (let r = 0; r < t.length; r++) {
      const o = t[r];
      Fi(o) && !Mi(o) ? o.delete(e) : t[n++] = o, o.w &= ~Bt, o.n &= ~Bt;
    }
    t.length = n;
  }
}, qo = /* @__PURE__ */ new WeakMap();
let Un = 0, Bt = 1;
const Xo = 30;
let Ie;
const tn = Symbol(process.env.NODE_ENV !== "production" ? "iterate" : ""), Jo = Symbol(process.env.NODE_ENV !== "production" ? "Map key iterate" : "");
class Di {
  constructor(t, n = null, r) {
    this.fn = t, this.scheduler = n, this.active = !0, this.deps = [], this.parent = void 0, Td(this, r);
  }
  run() {
    if (!this.active)
      return this.fn();
    let t = Ie, n = Ft;
    for (; t; ) {
      if (t === this)
        return;
      t = t.parent;
    }
    try {
      return this.parent = Ie, Ie = this, Ft = !0, Bt = 1 << ++Un, Un <= Xo ? Nd(this) : Ba(this), this.fn();
    } finally {
      Un <= Xo && $d(this), Bt = 1 << --Un, Ie = this.parent, Ft = n, this.parent = void 0, this.deferStop && this.stop();
    }
  }
  stop() {
    Ie === this ? this.deferStop = !0 : this.active && (Ba(this), this.onStop && this.onStop(), this.active = !1);
  }
}
function Ba(e) {
  const { deps: t } = e;
  if (t.length) {
    for (let n = 0; n < t.length; n++)
      t[n].delete(e);
    t.length = 0;
  }
}
let Ft = !0;
const ki = [];
function Ls() {
  ki.push(Ft), Ft = !1;
}
function Fs() {
  const e = ki.pop();
  Ft = e === void 0 ? !0 : e;
}
function He(e, t, n) {
  if (Ft && Ie) {
    let r = qo.get(e);
    r || qo.set(e, r = /* @__PURE__ */ new Map());
    let o = r.get(n);
    o || r.set(n, o = sr());
    const s = process.env.NODE_ENV !== "production" ? { effect: Ie, target: e, type: t, key: n } : void 0;
    Zo(o, s);
  }
}
function Zo(e, t) {
  let n = !1;
  Un <= Xo ? Mi(e) || (e.n |= Bt, n = !Fi(e)) : n = !e.has(Ie), n && (e.add(Ie), Ie.deps.push(e), process.env.NODE_ENV !== "production" && Ie.onTrack && Ie.onTrack(Object.assign({ effect: Ie }, t)));
}
function Ht(e, t, n, r, o, s) {
  const a = qo.get(e);
  if (!a)
    return;
  let l = [];
  if (t === "clear")
    l = [...a.values()];
  else if (n === "length" && W(e)) {
    const u = Li(r);
    a.forEach((d, c) => {
      (c === "length" || c >= u) && l.push(d);
    });
  } else
    switch (n !== void 0 && l.push(a.get(n)), t) {
      case "add":
        W(e) ? Rs(n) && l.push(a.get("length")) : (l.push(a.get(tn)), en(e) && l.push(a.get(Jo)));
        break;
      case "delete":
        W(e) || (l.push(a.get(tn)), en(e) && l.push(a.get(Jo)));
        break;
      case "set":
        en(e) && l.push(a.get(tn));
        break;
    }
  const i = process.env.NODE_ENV !== "production" ? { target: e, type: t, key: n, newValue: r, oldValue: o, oldTarget: s } : void 0;
  if (l.length === 1)
    l[0] && (process.env.NODE_ENV !== "production" ? yn(l[0], i) : yn(l[0]));
  else {
    const u = [];
    for (const d of l)
      d && u.push(...d);
    process.env.NODE_ENV !== "production" ? yn(sr(u), i) : yn(sr(u));
  }
}
function yn(e, t) {
  const n = W(e) ? e : [...e];
  for (const r of n)
    r.computed && Ha(r, t);
  for (const r of n)
    r.computed || Ha(r, t);
}
function Ha(e, t) {
  (e !== Ie || e.allowRecurse) && (process.env.NODE_ENV !== "production" && e.onTrigger && e.onTrigger(ze({ effect: e }, t)), e.scheduler ? e.scheduler() : e.run());
}
const Ad = /* @__PURE__ */ ud("__proto__,__v_isRef,__isVue"), Bi = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(tr)
), Pd = /* @__PURE__ */ Ms(), Rd = /* @__PURE__ */ Ms(!0), Id = /* @__PURE__ */ Ms(!0, !0), Va = /* @__PURE__ */ Ld();
function Ld() {
  const e = {};
  return ["includes", "indexOf", "lastIndexOf"].forEach((t) => {
    e[t] = function(...n) {
      const r = X(this);
      for (let s = 0, a = this.length; s < a; s++)
        He(r, "get", s + "");
      const o = r[t](...n);
      return o === -1 || o === !1 ? r[t](...n.map(X)) : o;
    };
  }), ["push", "pop", "shift", "unshift", "splice"].forEach((t) => {
    e[t] = function(...n) {
      Ls();
      const r = X(this)[t].apply(this, n);
      return Fs(), r;
    };
  }), e;
}
function Ms(e = !1, t = !1) {
  return function(r, o, s) {
    if (o === "__v_isReactive")
      return !e;
    if (o === "__v_isReadonly")
      return e;
    if (o === "__v_isShallow")
      return t;
    if (o === "__v_raw" && s === (e ? t ? ji : Wi : t ? Xd : zi).get(r))
      return r;
    const a = W(r);
    if (!e && a && re(Va, o))
      return Reflect.get(Va, o, s);
    const l = Reflect.get(r, o, s);
    return (tr(o) ? Bi.has(o) : Ad(o)) || (e || He(r, "get", o), t) ? l : he(l) ? a && Rs(o) ? l : l.value : ae(l) ? e ? Bs(l) : mo(l) : l;
  };
}
const Fd = /* @__PURE__ */ Md();
function Md(e = !1) {
  return function(n, r, o, s) {
    let a = n[r];
    if (Vt(a) && he(a) && !he(o))
      return !1;
    if (!e && (!Jr(o) && !Vt(o) && (a = X(a), o = X(o)), !W(n) && he(a) && !he(o)))
      return a.value = o, !0;
    const l = W(n) && Rs(r) ? Number(r) < n.length : re(n, r), i = Reflect.set(n, r, o, s);
    return n === X(s) && (l ? or(o, a) && Ht(n, "set", r, o, a) : Ht(n, "add", r, o)), i;
  };
}
function Dd(e, t) {
  const n = re(e, t), r = e[t], o = Reflect.deleteProperty(e, t);
  return o && n && Ht(e, "delete", t, void 0, r), o;
}
function kd(e, t) {
  const n = Reflect.has(e, t);
  return (!tr(t) || !Bi.has(t)) && He(e, "has", t), n;
}
function Bd(e) {
  return He(e, "iterate", W(e) ? "length" : tn), Reflect.ownKeys(e);
}
const Hd = {
  get: Pd,
  set: Fd,
  deleteProperty: Dd,
  has: kd,
  ownKeys: Bd
}, Hi = {
  get: Rd,
  set(e, t) {
    return process.env.NODE_ENV !== "production" && ka(`Set operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  },
  deleteProperty(e, t) {
    return process.env.NODE_ENV !== "production" && ka(`Delete operation on key "${String(t)}" failed: target is readonly.`, e), !0;
  }
}, Vd = /* @__PURE__ */ ze({}, Hi, {
  get: Id
}), Ds = (e) => e, go = (e) => Reflect.getPrototypeOf(e);
function Ar(e, t, n = !1, r = !1) {
  e = e.__v_raw;
  const o = X(e), s = X(t);
  n || (t !== s && He(o, "get", t), He(o, "get", s));
  const { has: a } = go(o), l = r ? Ds : n ? Vs : ar;
  if (a.call(o, t))
    return l(e.get(t));
  if (a.call(o, s))
    return l(e.get(s));
  e !== o && e.get(t);
}
function Pr(e, t = !1) {
  const n = this.__v_raw, r = X(n), o = X(e);
  return t || (e !== o && He(r, "has", e), He(r, "has", o)), e === o ? n.has(e) : n.has(e) || n.has(o);
}
function Rr(e, t = !1) {
  return e = e.__v_raw, !t && He(X(e), "iterate", tn), Reflect.get(e, "size", e);
}
function za(e) {
  e = X(e);
  const t = X(this);
  return go(t).has.call(t, e) || (t.add(e), Ht(t, "add", e, e)), this;
}
function Wa(e, t) {
  t = X(t);
  const n = X(this), { has: r, get: o } = go(n);
  let s = r.call(n, e);
  s ? process.env.NODE_ENV !== "production" && Vi(n, r, e) : (e = X(e), s = r.call(n, e));
  const a = o.call(n, e);
  return n.set(e, t), s ? or(t, a) && Ht(n, "set", e, t, a) : Ht(n, "add", e, t), this;
}
function ja(e) {
  const t = X(this), { has: n, get: r } = go(t);
  let o = n.call(t, e);
  o ? process.env.NODE_ENV !== "production" && Vi(t, n, e) : (e = X(e), o = n.call(t, e));
  const s = r ? r.call(t, e) : void 0, a = t.delete(e);
  return o && Ht(t, "delete", e, void 0, s), a;
}
function Ka() {
  const e = X(this), t = e.size !== 0, n = process.env.NODE_ENV !== "production" ? en(e) ? new Map(e) : new Set(e) : void 0, r = e.clear();
  return t && Ht(e, "clear", void 0, void 0, n), r;
}
function Ir(e, t) {
  return function(r, o) {
    const s = this, a = s.__v_raw, l = X(a), i = t ? Ds : e ? Vs : ar;
    return !e && He(l, "iterate", tn), a.forEach((u, d) => r.call(o, i(u), i(d), s));
  };
}
function Lr(e, t, n) {
  return function(...r) {
    const o = this.__v_raw, s = X(o), a = en(s), l = e === "entries" || e === Symbol.iterator && a, i = e === "keys" && a, u = o[e](...r), d = n ? Ds : t ? Vs : ar;
    return !t && He(s, "iterate", i ? Jo : tn), {
      next() {
        const { value: c, done: p } = u.next();
        return p ? { value: c, done: p } : {
          value: l ? [d(c[0]), d(c[1])] : d(c),
          done: p
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ot(e) {
  return function(...t) {
    if (process.env.NODE_ENV !== "production") {
      const n = t[0] ? `on key "${t[0]}" ` : "";
      console.warn(`${rr(e)} operation ${n}failed: target is readonly.`, X(this));
    }
    return e === "delete" ? !1 : this;
  };
}
function zd() {
  const e = {
    get(s) {
      return Ar(this, s);
    },
    get size() {
      return Rr(this);
    },
    has: Pr,
    add: za,
    set: Wa,
    delete: ja,
    clear: Ka,
    forEach: Ir(!1, !1)
  }, t = {
    get(s) {
      return Ar(this, s, !1, !0);
    },
    get size() {
      return Rr(this);
    },
    has: Pr,
    add: za,
    set: Wa,
    delete: ja,
    clear: Ka,
    forEach: Ir(!1, !0)
  }, n = {
    get(s) {
      return Ar(this, s, !0);
    },
    get size() {
      return Rr(this, !0);
    },
    has(s) {
      return Pr.call(this, s, !0);
    },
    add: Ot("add"),
    set: Ot("set"),
    delete: Ot("delete"),
    clear: Ot("clear"),
    forEach: Ir(!0, !1)
  }, r = {
    get(s) {
      return Ar(this, s, !0, !0);
    },
    get size() {
      return Rr(this, !0);
    },
    has(s) {
      return Pr.call(this, s, !0);
    },
    add: Ot("add"),
    set: Ot("set"),
    delete: Ot("delete"),
    clear: Ot("clear"),
    forEach: Ir(!0, !0)
  };
  return ["keys", "values", "entries", Symbol.iterator].forEach((s) => {
    e[s] = Lr(s, !1, !1), n[s] = Lr(s, !0, !1), t[s] = Lr(s, !1, !0), r[s] = Lr(s, !0, !0);
  }), [
    e,
    n,
    t,
    r
  ];
}
const [Wd, jd, Kd, Ud] = /* @__PURE__ */ zd();
function ks(e, t) {
  const n = t ? e ? Ud : Kd : e ? jd : Wd;
  return (r, o, s) => o === "__v_isReactive" ? !e : o === "__v_isReadonly" ? e : o === "__v_raw" ? r : Reflect.get(re(n, o) && o in r ? n : r, o, s);
}
const Gd = {
  get: /* @__PURE__ */ ks(!1, !1)
}, Yd = {
  get: /* @__PURE__ */ ks(!0, !1)
}, qd = {
  get: /* @__PURE__ */ ks(!0, !0)
};
function Vi(e, t, n) {
  const r = X(n);
  if (r !== n && t.call(e, r)) {
    const o = Ri(e);
    console.warn(`Reactive ${o} contains both the raw and reactive versions of the same object${o === "Map" ? " as keys" : ""}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const zi = /* @__PURE__ */ new WeakMap(), Xd = /* @__PURE__ */ new WeakMap(), Wi = /* @__PURE__ */ new WeakMap(), ji = /* @__PURE__ */ new WeakMap();
function Jd(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function Zd(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : Jd(Ri(e));
}
function mo(e) {
  return Vt(e) ? e : Hs(e, !1, Hd, Gd, zi);
}
function Bs(e) {
  return Hs(e, !0, Hi, Yd, Wi);
}
function Gn(e) {
  return Hs(e, !0, Vd, qd, ji);
}
function Hs(e, t, n, r, o) {
  if (!ae(e))
    return process.env.NODE_ENV !== "production" && console.warn(`value cannot be made reactive: ${String(e)}`), e;
  if (e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const s = o.get(e);
  if (s)
    return s;
  const a = Zd(e);
  if (a === 0)
    return e;
  const l = new Proxy(e, a === 2 ? r : n);
  return o.set(e, l), l;
}
function nn(e) {
  return Vt(e) ? nn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function Vt(e) {
  return !!(e && e.__v_isReadonly);
}
function Jr(e) {
  return !!(e && e.__v_isShallow);
}
function Zr(e) {
  return nn(e) || Vt(e);
}
function X(e) {
  const t = e && e.__v_raw;
  return t ? X(t) : e;
}
function Qd(e) {
  return Sd(e, "__v_skip", !0), e;
}
const ar = (e) => ae(e) ? mo(e) : e, Vs = (e) => ae(e) ? Bs(e) : e;
function Ki(e) {
  Ft && Ie && (e = X(e), process.env.NODE_ENV !== "production" ? Zo(e.dep || (e.dep = sr()), {
    target: e,
    type: "get",
    key: "value"
  }) : Zo(e.dep || (e.dep = sr())));
}
function Ui(e, t) {
  e = X(e), e.dep && (process.env.NODE_ENV !== "production" ? yn(e.dep, {
    target: e,
    type: "set",
    key: "value",
    newValue: t
  }) : yn(e.dep));
}
function he(e) {
  return !!(e && e.__v_isRef === !0);
}
function O(e) {
  return ef(e, !1);
}
function ef(e, t) {
  return he(e) ? e : new tf(e, t);
}
class tf {
  constructor(t, n) {
    this.__v_isShallow = n, this.dep = void 0, this.__v_isRef = !0, this._rawValue = n ? t : X(t), this._value = n ? t : ar(t);
  }
  get value() {
    return Ki(this), this._value;
  }
  set value(t) {
    const n = this.__v_isShallow || Jr(t) || Vt(t);
    t = n ? t : X(t), or(t, this._rawValue) && (this._rawValue = t, this._value = n ? t : ar(t), Ui(this, t));
  }
}
function E(e) {
  return he(e) ? e.value : e;
}
const nf = {
  get: (e, t, n) => E(Reflect.get(e, t, n)),
  set: (e, t, n, r) => {
    const o = e[t];
    return he(o) && !he(n) ? (o.value = n, !0) : Reflect.set(e, t, n, r);
  }
};
function rf(e) {
  return nn(e) ? e : new Proxy(e, nf);
}
function Gi(e) {
  process.env.NODE_ENV !== "production" && !Zr(e) && console.warn("toRefs() expects a reactive object but received a plain one.");
  const t = W(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = Mt(e, n);
  return t;
}
class of {
  constructor(t, n, r) {
    this._object = t, this._key = n, this._defaultValue = r, this.__v_isRef = !0;
  }
  get value() {
    const t = this._object[this._key];
    return t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
}
function Mt(e, t, n) {
  const r = e[t];
  return he(r) ? r : new of(e, t, n);
}
var Yi;
class sf {
  constructor(t, n, r, o) {
    this._setter = n, this.dep = void 0, this.__v_isRef = !0, this[Yi] = !1, this._dirty = !0, this.effect = new Di(t, () => {
      this._dirty || (this._dirty = !0, Ui(this));
    }), this.effect.computed = this, this.effect.active = this._cacheable = !o, this.__v_isReadonly = r;
  }
  get value() {
    const t = X(this);
    return Ki(t), (t._dirty || !t._cacheable) && (t._dirty = !1, t._value = t.effect.run()), t._value;
  }
  set value(t) {
    this._setter(t);
  }
}
Yi = "__v_isReadonly";
function af(e, t, n = !1) {
  let r, o;
  const s = ue(e);
  s ? (r = e, o = process.env.NODE_ENV !== "production" ? () => {
    console.warn("Write operation failed: computed value is readonly");
  } : wt) : (r = e.get, o = e.set);
  const a = new sf(r, o, s || !o, n);
  return process.env.NODE_ENV !== "production" && t && !n && (a.effect.onTrack = t.onTrack, a.effect.onTrigger = t.onTrigger), a;
}
const rn = [];
function lf(e) {
  rn.push(e);
}
function uf() {
  rn.pop();
}
function G(e, ...t) {
  if (process.env.NODE_ENV === "production")
    return;
  Ls();
  const n = rn.length ? rn[rn.length - 1].component : null, r = n && n.appContext.config.warnHandler, o = cf();
  if (r)
    on(r, n, 11, [
      e + t.join(""),
      n && n.proxy,
      o.map(({ vnode: s }) => `at <${wu(n, s.type)}>`).join(`
`),
      o
    ]);
  else {
    const s = [`[Vue warn]: ${e}`, ...t];
    o.length && s.push(`
`, ...df(o)), console.warn(...s);
  }
  Fs();
}
function cf() {
  let e = rn[rn.length - 1];
  if (!e)
    return [];
  const t = [];
  for (; e; ) {
    const n = t[0];
    n && n.vnode === e ? n.recurseCount++ : t.push({
      vnode: e,
      recurseCount: 0
    });
    const r = e.component && e.component.parent;
    e = r && r.vnode;
  }
  return t;
}
function df(e) {
  const t = [];
  return e.forEach((n, r) => {
    t.push(...r === 0 ? [] : [`
`], ...ff(n));
  }), t;
}
function ff({ vnode: e, recurseCount: t }) {
  const n = t > 0 ? `... (${t} recursive calls)` : "", r = e.component ? e.component.parent == null : !1, o = ` at <${wu(e.component, e.type, r)}`, s = ">" + n;
  return e.props ? [o, ...pf(e.props), s] : [o + s];
}
function pf(e) {
  const t = [], n = Object.keys(e);
  return n.slice(0, 3).forEach((r) => {
    t.push(...qi(r, e[r]));
  }), n.length > 3 && t.push(" ..."), t;
}
function qi(e, t, n) {
  return ve(t) ? (t = JSON.stringify(t), n ? t : [`${e}=${t}`]) : typeof t == "number" || typeof t == "boolean" || t == null ? n ? t : [`${e}=${t}`] : he(t) ? (t = qi(e, X(t.value), !0), n ? t : [`${e}=Ref<`, t, ">"]) : ue(t) ? [`${e}=fn${t.name ? `<${t.name}>` : ""}`] : (t = X(t), n ? t : [`${e}=`, t]);
}
const zs = {
  sp: "serverPrefetch hook",
  bc: "beforeCreate hook",
  c: "created hook",
  bm: "beforeMount hook",
  m: "mounted hook",
  bu: "beforeUpdate hook",
  u: "updated",
  bum: "beforeUnmount hook",
  um: "unmounted hook",
  a: "activated hook",
  da: "deactivated hook",
  ec: "errorCaptured hook",
  rtc: "renderTracked hook",
  rtg: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function on(e, t, n, r) {
  let o;
  try {
    o = r ? e(...r) : e();
  } catch (s) {
    Xi(s, t, n);
  }
  return o;
}
function _n(e, t, n, r) {
  if (ue(e)) {
    const s = on(e, t, n, r);
    return s && wd(s) && s.catch((a) => {
      Xi(a, t, n);
    }), s;
  }
  const o = [];
  for (let s = 0; s < e.length; s++)
    o.push(_n(e[s], t, n, r));
  return o;
}
function Xi(e, t, n, r = !0) {
  const o = t ? t.vnode : null;
  if (t) {
    let s = t.parent;
    const a = t.proxy, l = process.env.NODE_ENV !== "production" ? zs[n] : n;
    for (; s; ) {
      const u = s.ec;
      if (u) {
        for (let d = 0; d < u.length; d++)
          if (u[d](e, a, l) === !1)
            return;
      }
      s = s.parent;
    }
    const i = t.appContext.config.errorHandler;
    if (i) {
      on(i, null, 10, [e, a, l]);
      return;
    }
  }
  hf(e, n, o, r);
}
function hf(e, t, n, r = !0) {
  if (process.env.NODE_ENV !== "production") {
    const o = zs[t];
    if (n && lf(n), G(`Unhandled error${o ? ` during execution of ${o}` : ""}`), n && uf(), r)
      throw e;
    console.error(e);
  } else
    console.error(e);
}
let Qr = !1, Qo = !1;
const Ze = [];
let Rt = 0;
const En = [];
let ot = null, Pt = 0;
const Ji = /* @__PURE__ */ Promise.resolve();
let Ws = null;
const vf = 100;
function xe(e) {
  const t = Ws || Ji;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function gf(e) {
  let t = Rt + 1, n = Ze.length;
  for (; t < n; ) {
    const r = t + n >>> 1;
    lr(Ze[r]) < e ? t = r + 1 : n = r;
  }
  return t;
}
function js(e) {
  (!Ze.length || !Ze.includes(e, Qr && e.allowRecurse ? Rt + 1 : Rt)) && (e.id == null ? Ze.push(e) : Ze.splice(gf(e.id), 0, e), Zi());
}
function Zi() {
  !Qr && !Qo && (Qo = !0, Ws = Ji.then(eu));
}
function Qi(e) {
  W(e) ? En.push(...e) : (!ot || !ot.includes(e, e.allowRecurse ? Pt + 1 : Pt)) && En.push(e), Zi();
}
function mf(e) {
  if (En.length) {
    const t = [...new Set(En)];
    if (En.length = 0, ot) {
      ot.push(...t);
      return;
    }
    for (ot = t, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), ot.sort((n, r) => lr(n) - lr(r)), Pt = 0; Pt < ot.length; Pt++)
      process.env.NODE_ENV !== "production" && tu(e, ot[Pt]) || ot[Pt]();
    ot = null, Pt = 0;
  }
}
const lr = (e) => e.id == null ? 1 / 0 : e.id, bf = (e, t) => {
  const n = lr(e) - lr(t);
  if (n === 0) {
    if (e.pre && !t.pre)
      return -1;
    if (t.pre && !e.pre)
      return 1;
  }
  return n;
};
function eu(e) {
  Qo = !1, Qr = !0, process.env.NODE_ENV !== "production" && (e = e || /* @__PURE__ */ new Map()), Ze.sort(bf);
  const t = process.env.NODE_ENV !== "production" ? (n) => tu(e, n) : wt;
  try {
    for (Rt = 0; Rt < Ze.length; Rt++) {
      const n = Ze[Rt];
      if (n && n.active !== !1) {
        if (process.env.NODE_ENV !== "production" && t(n))
          continue;
        on(n, null, 14);
      }
    }
  } finally {
    Rt = 0, Ze.length = 0, mf(e), Qr = !1, Ws = null, (Ze.length || En.length) && eu(e);
  }
}
function tu(e, t) {
  if (!e.has(t))
    e.set(t, 1);
  else {
    const n = e.get(t);
    if (n > vf) {
      const r = t.ownerInstance, o = r && Qs(r.type);
      return G(`Maximum recursive updates exceeded${o ? ` in component <${o}>` : ""}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`), !0;
    } else
      e.set(t, n + 1);
  }
}
let es = !1;
const mn = /* @__PURE__ */ new Set();
process.env.NODE_ENV !== "production" && (xd().__VUE_HMR_RUNTIME__ = {
  createRecord: Mo(yf),
  rerender: Mo(wf),
  reload: Mo(_f)
});
const eo = /* @__PURE__ */ new Map();
function yf(e, t) {
  return eo.has(e) ? !1 : (eo.set(e, {
    initialDef: Yn(t),
    instances: /* @__PURE__ */ new Set()
  }), !0);
}
function Yn(e) {
  return _u(e) ? e.__vccOpts : e;
}
function wf(e, t) {
  const n = eo.get(e);
  n && (n.initialDef.render = t, [...n.instances].forEach((r) => {
    t && (r.render = t, Yn(r.type).render = t), r.renderCache = [], es = !0, r.update(), es = !1;
  }));
}
function _f(e, t) {
  const n = eo.get(e);
  if (!n)
    return;
  t = Yn(t), Ua(n.initialDef, t);
  const r = [...n.instances];
  for (const o of r) {
    const s = Yn(o.type);
    mn.has(s) || (s !== n.initialDef && Ua(s, t), mn.add(s)), o.appContext.optionsCache.delete(o.type), o.ceReload ? (mn.add(s), o.ceReload(t.styles), mn.delete(s)) : o.parent ? js(o.parent.update) : o.appContext.reload ? o.appContext.reload() : typeof window < "u" ? window.location.reload() : console.warn("[HMR] Root or manually mounted instance modified. Full reload required.");
  }
  Qi(() => {
    for (const o of r)
      mn.delete(Yn(o.type));
  });
}
function Ua(e, t) {
  ze(e, t);
  for (const n in e)
    n !== "__file" && !(n in t) && delete e[n];
}
function Mo(e) {
  return (t, n) => {
    try {
      return e(t, n);
    } catch (r) {
      console.error(r), console.warn("[HMR] Something went wrong during Vue component hot-reload. Full reload required.");
    }
  };
}
function Ef(e, ...t) {
}
const Cf = /* @__PURE__ */ Sf("component:updated");
function Sf(e) {
  return (t) => {
    Ef(e, t.appContext.app, t.uid, t.parent ? t.parent.uid : void 0, t);
  };
}
let ye = null, nu = null;
function Ga(e) {
  const t = ye;
  return ye = e, nu = e && e.type.__scopeId || null, t;
}
function me(e, t = ye, n) {
  if (!t || e._n)
    return e;
  const r = (...o) => {
    r._d && el(-1);
    const s = Ga(t);
    let a;
    try {
      a = e(...o);
    } finally {
      Ga(s), r._d && el(1);
    }
    return process.env.NODE_ENV !== "production" && Cf(t), a;
  };
  return r._n = !0, r._c = !0, r._d = !0, r;
}
const xf = (e) => e.__isSuspense;
function Of(e, t) {
  t && t.pendingBranch ? W(e) ? t.effects.push(...e) : t.effects.push(e) : Qi(e);
}
function at(e, t) {
  if (!Ce)
    process.env.NODE_ENV !== "production" && G("provide() can only be used inside setup().");
  else {
    let n = Ce.provides;
    const r = Ce.parent && Ce.parent.provides;
    r === n && (n = Ce.provides = Object.create(r)), n[e] = t;
  }
}
function Q(e, t, n = !1) {
  const r = Ce || ye;
  if (r) {
    const o = r.parent == null ? r.vnode.appContext && r.vnode.appContext.provides : r.parent.provides;
    if (o && e in o)
      return o[e];
    if (arguments.length > 1)
      return n && ue(t) ? t.call(r.proxy) : t;
    process.env.NODE_ENV !== "production" && G(`injection "${String(e)}" not found.`);
  } else
    process.env.NODE_ENV !== "production" && G("inject() can only be used inside setup() or functional components.");
}
function Dt(e, t) {
  return Ks(e, null, t);
}
const Fr = {};
function q(e, t, n) {
  return process.env.NODE_ENV !== "production" && !ue(t) && G("`watch(fn, options?)` signature has been moved to a separate API. Use `watchEffect(fn, options?)` instead. `watch` now only supports `watch(source, cb, options?) signature."), Ks(e, t, n);
}
function Ks(e, t, { immediate: n, deep: r, flush: o, onTrack: s, onTrigger: a } = Je) {
  process.env.NODE_ENV !== "production" && !t && (n !== void 0 && G('watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.'), r !== void 0 && G('watch() "deep" option is only respected when using the watch(source, callback, options?) signature.'));
  const l = (b) => {
    G("Invalid watch source: ", b, "A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.");
  }, i = Ce;
  let u, d = !1, c = !1;
  if (he(e) ? (u = () => e.value, d = Jr(e)) : nn(e) ? (u = () => e, r = !0) : W(e) ? (c = !0, d = e.some((b) => nn(b) || Jr(b)), u = () => e.map((b) => {
    if (he(b))
      return b.value;
    if (nn(b))
      return Zt(b);
    if (ue(b))
      return on(b, i, 2);
    process.env.NODE_ENV !== "production" && l(b);
  })) : ue(e) ? t ? u = () => on(e, i, 2) : u = () => {
    if (!(i && i.isUnmounted))
      return p && p(), _n(e, i, 3, [v]);
  } : (u = wt, process.env.NODE_ENV !== "production" && l(e)), t && r) {
    const b = u;
    u = () => Zt(b());
  }
  let p, v = (b) => {
    p = y.onStop = () => {
      on(b, i, 4);
    };
  }, f;
  if (bu)
    if (v = wt, t ? n && _n(t, i, 3, [
      u(),
      c ? [] : void 0,
      v
    ]) : u(), o === "sync") {
      const b = rp();
      f = b.__watcherHandles || (b.__watcherHandles = []);
    } else
      return wt;
  let h = c ? new Array(e.length).fill(Fr) : Fr;
  const g = () => {
    if (y.active)
      if (t) {
        const b = y.run();
        (r || d || (c ? b.some((S, x) => or(S, h[x])) : or(b, h))) && (p && p(), _n(t, i, 3, [
          b,
          h === Fr ? void 0 : c && h[0] === Fr ? [] : h,
          v
        ]), h = b);
      } else
        y.run();
  };
  g.allowRecurse = !!t;
  let m;
  o === "sync" ? m = g : o === "post" ? m = () => Za(g, i && i.suspense) : (g.pre = !0, i && (g.id = i.uid), m = () => js(g));
  const y = new Di(u, m);
  process.env.NODE_ENV !== "production" && (y.onTrack = s, y.onTrigger = a), t ? n ? g() : h = y.run() : o === "post" ? Za(y.run.bind(y), i && i.suspense) : y.run();
  const w = () => {
    y.stop(), i && i.scope && Ai(i.scope.effects, y);
  };
  return f && f.push(w), w;
}
function Tf(e, t, n) {
  const r = this.proxy, o = ve(e) ? e.includes(".") ? Nf(r, e) : () => r[e] : e.bind(r, r);
  let s;
  ue(t) ? s = t : (s = t.handler, n = t);
  const a = Ce;
  as(this);
  const l = Ks(o, s.bind(r), n);
  return a ? as(a) : mu(), l;
}
function Nf(e, t) {
  const n = t.split(".");
  return () => {
    let r = e;
    for (let o = 0; o < n.length && r; o++)
      r = r[n[o]];
    return r;
  };
}
function Zt(e, t) {
  if (!ae(e) || e.__v_skip || (t = t || /* @__PURE__ */ new Set(), t.has(e)))
    return e;
  if (t.add(e), he(e))
    Zt(e.value, t);
  else if (W(e))
    for (let n = 0; n < e.length; n++)
      Zt(e[n], t);
  else if (vo(e) || en(e))
    e.forEach((n) => {
      Zt(n, t);
    });
  else if (Ii(e))
    for (const n in e)
      Zt(e[n], t);
  return e;
}
function $f() {
  const e = {
    isMounted: !1,
    isLeaving: !1,
    isUnmounting: !1,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  return Fe(() => {
    e.isMounted = !0;
  }), nt(() => {
    e.isUnmounting = !0;
  }), e;
}
const je = [Function, Array], Af = {
  name: "BaseTransition",
  props: {
    mode: String,
    appear: Boolean,
    persisted: Boolean,
    onBeforeEnter: je,
    onEnter: je,
    onAfterEnter: je,
    onEnterCancelled: je,
    onBeforeLeave: je,
    onLeave: je,
    onAfterLeave: je,
    onLeaveCancelled: je,
    onBeforeAppear: je,
    onAppear: je,
    onAfterAppear: je,
    onAppearCancelled: je
  },
  setup(e, { slots: t }) {
    const n = ce(), r = $f();
    let o;
    return () => {
      const s = t.default && su(t.default(), !0);
      if (!s || !s.length)
        return;
      let a = s[0];
      if (s.length > 1) {
        let h = !1;
        for (const g of s)
          if (g.type !== et) {
            if (process.env.NODE_ENV !== "production" && h) {
              G("<transition> can only be used on a single element or component. Use <transition-group> for lists.");
              break;
            }
            if (a = g, h = !0, process.env.NODE_ENV === "production")
              break;
          }
      }
      const l = X(e), { mode: i } = l;
      if (process.env.NODE_ENV !== "production" && i && i !== "in-out" && i !== "out-in" && i !== "default" && G(`invalid <transition> mode: ${i}`), r.isLeaving)
        return Do(a);
      const u = Ya(a);
      if (!u)
        return Do(a);
      const d = ts(u, l, r, n);
      ns(u, d);
      const c = n.subTree, p = c && Ya(c);
      let v = !1;
      const { getTransitionKey: f } = u.type;
      if (f) {
        const h = f();
        o === void 0 ? o = h : h !== o && (o = h, v = !0);
      }
      if (p && p.type !== et && (!fu(u, p) || v)) {
        const h = ts(p, l, r, n);
        if (ns(p, h), i === "out-in")
          return r.isLeaving = !0, h.afterLeave = () => {
            r.isLeaving = !1, n.update.active !== !1 && n.update();
          }, Do(a);
        i === "in-out" && u.type !== et && (h.delayLeave = (g, m, y) => {
          const w = ou(r, p);
          w[String(p.key)] = p, g._leaveCb = () => {
            m(), g._leaveCb = void 0, delete d.delayedLeave;
          }, d.delayedLeave = y;
        });
      }
      return a;
    };
  }
}, ru = Af;
function ou(e, t) {
  const { leavingVNodes: n } = e;
  let r = n.get(t.type);
  return r || (r = /* @__PURE__ */ Object.create(null), n.set(t.type, r)), r;
}
function ts(e, t, n, r) {
  const { appear: o, mode: s, persisted: a = !1, onBeforeEnter: l, onEnter: i, onAfterEnter: u, onEnterCancelled: d, onBeforeLeave: c, onLeave: p, onAfterLeave: v, onLeaveCancelled: f, onBeforeAppear: h, onAppear: g, onAfterAppear: m, onAppearCancelled: y } = t, w = String(e.key), b = ou(n, e), S = (C, N) => {
    C && _n(C, r, 9, N);
  }, x = (C, N) => {
    const I = N[1];
    S(C, N), W(C) ? C.every((M) => M.length <= 1) && I() : C.length <= 1 && I();
  }, _ = {
    mode: s,
    persisted: a,
    beforeEnter(C) {
      let N = l;
      if (!n.isMounted)
        if (o)
          N = h || l;
        else
          return;
      C._leaveCb && C._leaveCb(!0);
      const I = b[w];
      I && fu(e, I) && I.el._leaveCb && I.el._leaveCb(), S(N, [C]);
    },
    enter(C) {
      let N = i, I = u, M = d;
      if (!n.isMounted)
        if (o)
          N = g || i, I = m || u, M = y || d;
        else
          return;
      let T = !1;
      const k = C._enterCb = (F) => {
        T || (T = !0, F ? S(M, [C]) : S(I, [C]), _.delayedLeave && _.delayedLeave(), C._enterCb = void 0);
      };
      N ? x(N, [C, k]) : k();
    },
    leave(C, N) {
      const I = String(e.key);
      if (C._enterCb && C._enterCb(!0), n.isUnmounting)
        return N();
      S(c, [C]);
      let M = !1;
      const T = C._leaveCb = (k) => {
        M || (M = !0, N(), k ? S(f, [C]) : S(v, [C]), C._leaveCb = void 0, b[I] === e && delete b[I]);
      };
      b[I] = e, p ? x(p, [C, T]) : T();
    },
    clone(C) {
      return ts(C, t, n, r);
    }
  };
  return _;
}
function Do(e) {
  if (Us(e))
    return e = zt(e), e.children = null, e;
}
function Ya(e) {
  return Us(e) ? e.children ? e.children[0] : void 0 : e;
}
function ns(e, t) {
  e.shapeFlag & 6 && e.component ? ns(e.component.subTree, t) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
function su(e, t = !1, n) {
  let r = [], o = 0;
  for (let s = 0; s < e.length; s++) {
    let a = e[s];
    const l = n == null ? a.key : String(n) + String(a.key != null ? a.key : s);
    a.type === Ye ? (a.patchFlag & 128 && o++, r = r.concat(su(a.children, t, l))) : (t || a.type !== et) && r.push(l != null ? zt(a, { key: l }) : a);
  }
  if (o > 1)
    for (let s = 0; s < r.length; s++)
      r[s].patchFlag = -2;
  return r;
}
function U(e) {
  return ue(e) ? { setup: e, name: e.name } : e;
}
const Pf = (e) => !!e.type.__asyncLoader, Us = (e) => e.type.__isKeepAlive;
function Rf(e, t) {
  If(e, "da", t);
}
function If(e, t, n = Ce) {
  const r = e.__wdc || (e.__wdc = () => {
    let o = n;
    for (; o; ) {
      if (o.isDeactivated)
        return;
      o = o.parent;
    }
    return e();
  });
  if (Gs(t, r, n), n) {
    let o = n.parent;
    for (; o && o.parent; )
      Us(o.parent.vnode) && Lf(r, t, n, o), o = o.parent;
  }
}
function Lf(e, t, n, r) {
  const o = Gs(t, e, r, !0);
  bo(() => {
    Ai(r[t], o);
  }, n);
}
function Gs(e, t, n = Ce, r = !1) {
  if (n) {
    const o = n[e] || (n[e] = []), s = t.__weh || (t.__weh = (...a) => {
      if (n.isUnmounted)
        return;
      Ls(), as(n);
      const l = _n(t, n, e, a);
      return mu(), Fs(), l;
    });
    return r ? o.unshift(s) : o.push(s), s;
  } else if (process.env.NODE_ENV !== "production") {
    const o = Ed(zs[e].replace(/ hook$/, ""));
    G(`${o} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup(). If you are using async setup(), make sure to register lifecycle hooks before the first await statement.`);
  }
}
const mr = (e) => (t, n = Ce) => Gs(e, (...r) => t(...r), n), Ys = mr("bm"), Fe = mr("m"), au = mr("u"), nt = mr("bum"), bo = mr("um");
function $e(e, t) {
  const n = ye;
  if (n === null)
    return process.env.NODE_ENV !== "production" && G("withDirectives can only be used inside render functions."), e;
  const r = yu(n) || n.proxy, o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [a, l, i, u = Je] = t[s];
    a && (ue(a) && (a = {
      mounted: a,
      updated: a
    }), a.deep && Zt(l), o.push({
      dir: a,
      instance: r,
      value: l,
      oldValue: void 0,
      arg: i,
      modifiers: u
    }));
  }
  return e;
}
const to = "components", Ff = "directives";
function Ke(e, t) {
  return Xs(to, e, !0, t) || e;
}
const lu = Symbol();
function qs(e) {
  return ve(e) ? Xs(to, e, !1) || e : e || lu;
}
function un(e) {
  return Xs(Ff, e);
}
function Xs(e, t, n = !0, r = !1) {
  const o = ye || Ce;
  if (o) {
    const s = o.type;
    if (e === to) {
      const l = Qs(s, !1);
      if (l && (l === t || l === nr(t) || l === rr(nr(t))))
        return s;
    }
    const a = qa(o[e] || s[e], t) || qa(o.appContext[e], t);
    if (!a && r)
      return s;
    if (process.env.NODE_ENV !== "production" && n && !a) {
      const l = e === to ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : "";
      G(`Failed to resolve ${e.slice(0, -1)}: ${t}${l}`);
    }
    return a;
  } else
    process.env.NODE_ENV !== "production" && G(`resolve${rr(e.slice(0, -1))} can only be used in render() or setup().`);
}
function qa(e, t) {
  return e && (e[t] || e[nr(t)] || e[rr(nr(t))]);
}
function rs(e, t, n, r) {
  let o;
  const s = n && n[r];
  if (W(e) || ve(e)) {
    o = new Array(e.length);
    for (let a = 0, l = e.length; a < l; a++)
      o[a] = t(e[a], a, void 0, s && s[a]);
  } else if (typeof e == "number") {
    process.env.NODE_ENV !== "production" && !Number.isInteger(e) && G(`The v-for range expect an integer value but got ${e}.`), o = new Array(e);
    for (let a = 0; a < e; a++)
      o[a] = t(a + 1, a, void 0, s && s[a]);
  } else if (ae(e))
    if (e[Symbol.iterator])
      o = Array.from(e, (a, l) => t(a, l, void 0, s && s[l]));
    else {
      const a = Object.keys(e);
      o = new Array(a.length);
      for (let l = 0, i = a.length; l < i; l++) {
        const u = a[l];
        o[l] = t(e[u], u, l, s && s[l]);
      }
    }
  else
    o = [];
  return n && (n[r] = o), o;
}
function Ae(e, t, n = {}, r, o) {
  if (ye.isCE || ye.parent && Pf(ye.parent) && ye.parent.isCE)
    return t !== "default" && (n.name = t), L("slot", n, r && r());
  let s = e[t];
  process.env.NODE_ENV !== "production" && s && s.length > 1 && (G("SSR-optimized slot function detected in a non-SSR-optimized render function. You need to mark this component with $dynamic-slots in the parent template."), s = () => []), s && s._c && (s._d = !1), D();
  const a = s && iu(s(n)), l = we(Ye, {
    key: n.key || a && a.key || `_${t}`
  }, a || (r ? r() : []), a && e._ === 1 ? 64 : -2);
  return !o && l.scopeId && (l.slotScopeIds = [l.scopeId + "-s"]), s && s._c && (s._d = !0), l;
}
function iu(e) {
  return e.some((t) => ro(t) ? !(t.type === et || t.type === Ye && !iu(t.children)) : !0) ? e : null;
}
const os = (e) => e ? Jf(e) ? yu(e) || e.proxy : os(e.parent) : null, qn = /* @__PURE__ */ ze(/* @__PURE__ */ Object.create(null), {
  $: (e) => e,
  $el: (e) => e.vnode.el,
  $data: (e) => e.data,
  $props: (e) => process.env.NODE_ENV !== "production" ? Gn(e.props) : e.props,
  $attrs: (e) => process.env.NODE_ENV !== "production" ? Gn(e.attrs) : e.attrs,
  $slots: (e) => process.env.NODE_ENV !== "production" ? Gn(e.slots) : e.slots,
  $refs: (e) => process.env.NODE_ENV !== "production" ? Gn(e.refs) : e.refs,
  $parent: (e) => os(e.parent),
  $root: (e) => os(e.root),
  $emit: (e) => e.emit,
  $options: (e) => kf(e),
  $forceUpdate: (e) => e.f || (e.f = () => js(e.update)),
  $nextTick: (e) => e.n || (e.n = xe.bind(e.proxy)),
  $watch: (e) => Tf.bind(e)
}), Mf = (e) => e === "_" || e === "$", ko = (e, t) => e !== Je && !e.__isScriptSetup && re(e, t), Df = {
  get({ _: e }, t) {
    const { ctx: n, setupState: r, data: o, props: s, accessCache: a, type: l, appContext: i } = e;
    if (process.env.NODE_ENV !== "production" && t === "__isVue")
      return !0;
    let u;
    if (t[0] !== "$") {
      const v = a[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return r[t];
          case 2:
            return o[t];
          case 4:
            return n[t];
          case 3:
            return s[t];
        }
      else {
        if (ko(r, t))
          return a[t] = 1, r[t];
        if (o !== Je && re(o, t))
          return a[t] = 2, o[t];
        if ((u = e.propsOptions[0]) && re(u, t))
          return a[t] = 3, s[t];
        if (n !== Je && re(n, t))
          return a[t] = 4, n[t];
        a[t] = 0;
      }
    }
    const d = qn[t];
    let c, p;
    if (d)
      return t === "$attrs" && (He(e, "get", t), process.env.NODE_ENV !== "production" && void 0), d(e);
    if ((c = l.__cssModules) && (c = c[t]))
      return c;
    if (n !== Je && re(n, t))
      return a[t] = 4, n[t];
    if (p = i.config.globalProperties, re(p, t))
      return p[t];
    process.env.NODE_ENV !== "production" && ye && (!ve(t) || t.indexOf("__v") !== 0) && (o !== Je && Mf(t[0]) && re(o, t) ? G(`Property ${JSON.stringify(t)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`) : e === ye && G(`Property ${JSON.stringify(t)} was accessed during render but is not defined on instance.`));
  },
  set({ _: e }, t, n) {
    const { data: r, setupState: o, ctx: s } = e;
    return ko(o, t) ? (o[t] = n, !0) : process.env.NODE_ENV !== "production" && o.__isScriptSetup && re(o, t) ? (G(`Cannot mutate <script setup> binding "${t}" from Options API.`), !1) : r !== Je && re(r, t) ? (r[t] = n, !0) : re(e.props, t) ? (process.env.NODE_ENV !== "production" && G(`Attempting to mutate prop "${t}". Props are readonly.`), !1) : t[0] === "$" && t.slice(1) in e ? (process.env.NODE_ENV !== "production" && G(`Attempting to mutate public property "${t}". Properties starting with $ are reserved and readonly.`), !1) : (process.env.NODE_ENV !== "production" && t in e.appContext.config.globalProperties ? Object.defineProperty(s, t, {
      enumerable: !0,
      configurable: !0,
      value: n
    }) : s[t] = n, !0);
  },
  has({ _: { data: e, setupState: t, accessCache: n, ctx: r, appContext: o, propsOptions: s } }, a) {
    let l;
    return !!n[a] || e !== Je && re(e, a) || ko(t, a) || (l = s[0]) && re(l, a) || re(r, a) || re(qn, a) || re(o.config.globalProperties, a);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : re(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
process.env.NODE_ENV !== "production" && (Df.ownKeys = (e) => (G("Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead."), Reflect.ownKeys(e)));
function kf(e) {
  const t = e.type, { mixins: n, extends: r } = t, { mixins: o, optionsCache: s, config: { optionMergeStrategies: a } } = e.appContext, l = s.get(t);
  let i;
  return l ? i = l : !o.length && !n && !r ? i = t : (i = {}, o.length && o.forEach((u) => no(i, u, a, !0)), no(i, t, a)), ae(t) && s.set(t, i), i;
}
function no(e, t, n, r = !1) {
  const { mixins: o, extends: s } = t;
  s && no(e, s, n, !0), o && o.forEach((a) => no(e, a, n, !0));
  for (const a in t)
    if (r && a === "expose")
      process.env.NODE_ENV !== "production" && G('"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.');
    else {
      const l = Bf[a] || n && n[a];
      e[a] = l ? l(e[a], t[a]) : t[a];
    }
  return e;
}
const Bf = {
  data: Xa,
  props: qt,
  emits: qt,
  methods: qt,
  computed: qt,
  beforeCreate: Re,
  created: Re,
  beforeMount: Re,
  mounted: Re,
  beforeUpdate: Re,
  updated: Re,
  beforeDestroy: Re,
  beforeUnmount: Re,
  destroyed: Re,
  unmounted: Re,
  activated: Re,
  deactivated: Re,
  errorCaptured: Re,
  serverPrefetch: Re,
  components: qt,
  directives: qt,
  watch: Vf,
  provide: Xa,
  inject: Hf
};
function Xa(e, t) {
  return t ? e ? function() {
    return ze(ue(e) ? e.call(this, this) : e, ue(t) ? t.call(this, this) : t);
  } : t : e;
}
function Hf(e, t) {
  return qt(Ja(e), Ja(t));
}
function Ja(e) {
  if (W(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Re(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function qt(e, t) {
  return e ? ze(ze(/* @__PURE__ */ Object.create(null), e), t) : t;
}
function Vf(e, t) {
  if (!e)
    return t;
  if (!t)
    return e;
  const n = ze(/* @__PURE__ */ Object.create(null), e);
  for (const r in t)
    n[r] = Re(e[r], t[r]);
  return n;
}
function zf() {
  return {
    app: null,
    config: {
      isNativeTag: gd,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
const Za = Of;
function uu(e, t, n = !1) {
  const r = e.children, o = t.children;
  if (W(r) && W(o))
    for (let s = 0; s < r.length; s++) {
      const a = r[s];
      let l = o[s];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = o[s] = Xf(o[s]), l.el = a.el), n || uu(a, l)), l.type === Js && (l.el = a.el), process.env.NODE_ENV !== "production" && l.type === et && !l.el && (l.el = a.el);
    }
}
const Wf = (e) => e.__isTeleport, Cn = (e) => e && (e.disabled || e.disabled === ""), Qa = (e) => typeof SVGElement < "u" && e instanceof SVGElement, ss = (e, t) => {
  const n = e && e.to;
  if (ve(n))
    if (t) {
      const r = t(n);
      return r || process.env.NODE_ENV !== "production" && G(`Failed to locate Teleport target with selector "${n}". Note the target element must exist before the component is mounted - i.e. the target cannot be rendered by the component itself, and ideally should be outside of the entire Vue component tree.`), r;
    } else
      return process.env.NODE_ENV !== "production" && G("Current renderer does not support string target for Teleports. (missing querySelector renderer option)"), null;
  else
    return process.env.NODE_ENV !== "production" && !n && !Cn(e) && G(`Invalid Teleport target: ${n}`), n;
}, jf = {
  __isTeleport: !0,
  process(e, t, n, r, o, s, a, l, i, u) {
    const { mc: d, pc: c, pbc: p, o: { insert: v, querySelector: f, createText: h, createComment: g } } = u, m = Cn(t.props);
    let { shapeFlag: y, children: w, dynamicChildren: b } = t;
    if (process.env.NODE_ENV !== "production" && es && (i = !1, b = null), e == null) {
      const S = t.el = process.env.NODE_ENV !== "production" ? g("teleport start") : h(""), x = t.anchor = process.env.NODE_ENV !== "production" ? g("teleport end") : h("");
      v(S, n, r), v(x, n, r);
      const _ = t.target = ss(t.props, f), C = t.targetAnchor = h("");
      _ ? (v(C, _), a = a || Qa(_)) : process.env.NODE_ENV !== "production" && !m && G("Invalid Teleport target on mount:", _, `(${typeof _})`);
      const N = (I, M) => {
        y & 16 && d(w, I, M, o, s, a, l, i);
      };
      m ? N(n, x) : _ && N(_, C);
    } else {
      t.el = e.el;
      const S = t.anchor = e.anchor, x = t.target = e.target, _ = t.targetAnchor = e.targetAnchor, C = Cn(e.props), N = C ? n : x, I = C ? S : _;
      if (a = a || Qa(x), b ? (p(e.dynamicChildren, b, N, o, s, a, l), uu(e, t, !0)) : i || c(e, t, N, I, o, s, a, l, !1), m)
        C || Mr(t, n, S, u, 1);
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const M = t.target = ss(t.props, f);
        M ? Mr(t, M, null, u, 0) : process.env.NODE_ENV !== "production" && G("Invalid Teleport target on update:", x, `(${typeof x})`);
      } else
        C && Mr(t, x, _, u, 1);
    }
    cu(t);
  },
  remove(e, t, n, r, { um: o, o: { remove: s } }, a) {
    const { shapeFlag: l, children: i, anchor: u, targetAnchor: d, target: c, props: p } = e;
    if (c && s(d), (a || !Cn(p)) && (s(u), l & 16))
      for (let v = 0; v < i.length; v++) {
        const f = i[v];
        o(f, t, n, !0, !!f.dynamicChildren);
      }
  },
  move: Mr,
  hydrate: Kf
};
function Mr(e, t, n, { o: { insert: r }, m: o }, s = 2) {
  s === 0 && r(e.targetAnchor, t, n);
  const { el: a, anchor: l, shapeFlag: i, children: u, props: d } = e, c = s === 2;
  if (c && r(a, t, n), (!c || Cn(d)) && i & 16)
    for (let p = 0; p < u.length; p++)
      o(u[p], t, n, 2);
  c && r(l, t, n);
}
function Kf(e, t, n, r, o, s, { o: { nextSibling: a, parentNode: l, querySelector: i } }, u) {
  const d = t.target = ss(t.props, i);
  if (d) {
    const c = d._lpa || d.firstChild;
    if (t.shapeFlag & 16)
      if (Cn(t.props))
        t.anchor = u(a(e), t, l(e), n, r, o, s), t.targetAnchor = c;
      else {
        t.anchor = a(e);
        let p = c;
        for (; p; )
          if (p = a(p), p && p.nodeType === 8 && p.data === "teleport anchor") {
            t.targetAnchor = p, d._lpa = t.targetAnchor && a(t.targetAnchor);
            break;
          }
        u(c, t, d, n, r, o, s);
      }
    cu(t);
  }
  return t.anchor && a(t.anchor);
}
const Uf = jf;
function cu(e) {
  const t = e.ctx;
  if (t && t.ut) {
    let n = e.children[0].el;
    for (; n !== e.targetAnchor; )
      n.nodeType === 1 && n.setAttribute("data-v-owner", t.uid), n = n.nextSibling;
    t.ut();
  }
}
const Ye = Symbol(process.env.NODE_ENV !== "production" ? "Fragment" : void 0), Js = Symbol(process.env.NODE_ENV !== "production" ? "Text" : void 0), et = Symbol(process.env.NODE_ENV !== "production" ? "Comment" : void 0);
Symbol(process.env.NODE_ENV !== "production" ? "Static" : void 0);
const Wr = [];
let Qe = null;
function D(e = !1) {
  Wr.push(Qe = e ? null : []);
}
function Gf() {
  Wr.pop(), Qe = Wr[Wr.length - 1] || null;
}
let ir = 1;
function el(e) {
  ir += e;
}
function du(e) {
  return e.dynamicChildren = ir > 0 ? Qe || vd : null, Gf(), ir > 0 && Qe && Qe.push(e), e;
}
function K(e, t, n, r, o, s) {
  return du(pe(e, t, n, r, o, s, !0));
}
function we(e, t, n, r, o) {
  return du(L(e, t, n, r, o, !0));
}
function ro(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function fu(e, t) {
  return process.env.NODE_ENV !== "production" && t.shapeFlag & 6 && mn.has(t.type) ? (e.shapeFlag &= -257, t.shapeFlag &= -513, !1) : e.type === t.type && e.key === t.key;
}
const Yf = (...e) => vu(...e), pu = "__vInternal", hu = ({ key: e }) => e ?? null, jr = ({ ref: e, ref_key: t, ref_for: n }) => e != null ? ve(e) || he(e) || ue(e) ? { i: ye, r: e, k: t, f: !!n } : e : null;
function pe(e, t = null, n = null, r = 0, o = null, s = e === Ye ? 0 : 1, a = !1, l = !1) {
  const i = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && hu(t),
    ref: t && jr(t),
    scopeId: nu,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: s,
    patchFlag: r,
    dynamicProps: o,
    dynamicChildren: null,
    appContext: null,
    ctx: ye
  };
  return l ? (Zs(i, n), s & 128 && e.normalize(i)) : n && (i.shapeFlag |= ve(n) ? 8 : 16), process.env.NODE_ENV !== "production" && i.key !== i.key && G("VNode created with invalid key (NaN). VNode type:", i.type), ir > 0 && !a && Qe && (i.patchFlag > 0 || s & 6) && i.patchFlag !== 32 && Qe.push(i), i;
}
const L = process.env.NODE_ENV !== "production" ? Yf : vu;
function vu(e, t = null, n = null, r = 0, o = null, s = !1) {
  if ((!e || e === lu) && (process.env.NODE_ENV !== "production" && !e && G(`Invalid vnode type when creating vnode: ${e}.`), e = et), ro(e)) {
    const l = zt(e, t, !0);
    return n && Zs(l, n), ir > 0 && !s && Qe && (l.shapeFlag & 6 ? Qe[Qe.indexOf(e)] = l : Qe.push(l)), l.patchFlag |= -2, l;
  }
  if (_u(e) && (e = e.__vccOpts), t) {
    t = qf(t);
    let { class: l, style: i } = t;
    l && !ve(l) && (t.class = j(l)), ae(i) && (Zr(i) && !W(i) && (i = ze({}, i)), t.style = De(i));
  }
  const a = ve(e) ? 1 : xf(e) ? 128 : Wf(e) ? 64 : ae(e) ? 4 : ue(e) ? 2 : 0;
  return process.env.NODE_ENV !== "production" && a & 4 && Zr(e) && (e = X(e), G("Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.", `
Component that was made reactive: `, e)), pe(e, t, n, r, o, a, s, !0);
}
function qf(e) {
  return e ? Zr(e) || pu in e ? ze({}, e) : e : null;
}
function zt(e, t, n = !1) {
  const { props: r, ref: o, patchFlag: s, children: a } = e, l = t ? an(r || {}, t) : r;
  return {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: l,
    key: l && hu(l),
    ref: t && t.ref ? n && o ? W(o) ? o.concat(jr(t)) : [o, jr(t)] : jr(t) : o,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: process.env.NODE_ENV !== "production" && s === -1 && W(a) ? a.map(gu) : a,
    target: e.target,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    patchFlag: t && e.type !== Ye ? s === -1 ? 16 : s | 16 : s,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: e.transition,
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && zt(e.ssContent),
    ssFallback: e.ssFallback && zt(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx
  };
}
function gu(e) {
  const t = zt(e);
  return W(e.children) && (t.children = e.children.map(gu)), t;
}
function In(e = " ", t = 0) {
  return L(Js, null, e, t);
}
function Le(e = "", t = !1) {
  return t ? (D(), we(et, null, e)) : L(et, null, e);
}
function Xf(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : zt(e);
}
function Zs(e, t) {
  let n = 0;
  const { shapeFlag: r } = e;
  if (t == null)
    t = null;
  else if (W(t))
    n = 16;
  else if (typeof t == "object")
    if (r & 65) {
      const o = t.default;
      o && (o._c && (o._d = !1), Zs(e, o()), o._c && (o._d = !0));
      return;
    } else {
      n = 32;
      const o = t._;
      !o && !(pu in t) ? t._ctx = ye : o === 3 && ye && (ye.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else
    ue(t) ? (t = { default: t, _ctx: ye }, n = 32) : (t = String(t), r & 64 ? (n = 16, t = [In(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function an(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const r = e[n];
    for (const o in r)
      if (o === "class")
        t.class !== r.class && (t.class = j([t.class, r.class]));
      else if (o === "style")
        t.style = De([t.style, r.style]);
      else if (bd(o)) {
        const s = t[o], a = r[o];
        a && s !== a && !(W(s) && s.includes(a)) && (t[o] = s ? [].concat(s, a) : a);
      } else
        o !== "" && (t[o] = r[o]);
  }
  return t;
}
zf();
let Ce = null;
const ce = () => Ce || ye, as = (e) => {
  Ce = e, e.scope.on();
}, mu = () => {
  Ce && Ce.scope.off(), Ce = null;
};
function Jf(e) {
  return e.vnode.shapeFlag & 4;
}
let bu = !1;
function tl(e) {
  return new Proxy(e.attrs, process.env.NODE_ENV !== "production" ? {
    get(t, n) {
      return He(e, "get", "$attrs"), t[n];
    },
    set() {
      return G("setupContext.attrs is readonly."), !1;
    },
    deleteProperty() {
      return G("setupContext.attrs is readonly."), !1;
    }
  } : {
    get(t, n) {
      return He(e, "get", "$attrs"), t[n];
    }
  });
}
function Zf(e) {
  const t = (r) => {
    process.env.NODE_ENV !== "production" && e.exposed && G("expose() should be called only once per setup()."), e.exposed = r || {};
  };
  let n;
  return process.env.NODE_ENV !== "production" ? Object.freeze({
    get attrs() {
      return n || (n = tl(e));
    },
    get slots() {
      return Gn(e.slots);
    },
    get emit() {
      return (r, ...o) => e.emit(r, ...o);
    },
    expose: t
  }) : {
    get attrs() {
      return n || (n = tl(e));
    },
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function yu(e) {
  if (e.exposed)
    return e.exposeProxy || (e.exposeProxy = new Proxy(rf(Qd(e.exposed)), {
      get(t, n) {
        if (n in t)
          return t[n];
        if (n in qn)
          return qn[n](e);
      },
      has(t, n) {
        return n in t || n in qn;
      }
    }));
}
const Qf = /(?:^|[-_])(\w)/g, ep = (e) => e.replace(Qf, (t) => t.toUpperCase()).replace(/[-_]/g, "");
function Qs(e, t = !0) {
  return ue(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function wu(e, t, n = !1) {
  let r = Qs(t);
  if (!r && t.__file) {
    const o = t.__file.match(/([^/\\]+)\.\w+$/);
    o && (r = o[1]);
  }
  if (!r && e && e.parent) {
    const o = (s) => {
      for (const a in s)
        if (s[a] === t)
          return a;
    };
    r = o(e.components || e.parent.type.components) || o(e.appContext.components);
  }
  return r ? ep(r) : n ? "App" : "Anonymous";
}
function _u(e) {
  return ue(e) && "__vccOpts" in e;
}
const P = (e, t) => af(e, t, bu);
function Eu() {
  return tp().slots;
}
function tp() {
  const e = ce();
  return process.env.NODE_ENV !== "production" && !e && G("useContext() called without active instance."), e.setupContext || (e.setupContext = Zf(e));
}
function Y(e, t, n) {
  const r = arguments.length;
  return r === 2 ? ae(t) && !W(t) ? ro(t) ? L(e, null, [t]) : L(e, t) : L(e, null, t) : (r > 3 ? n = Array.prototype.slice.call(arguments, 2) : r === 3 && ro(n) && (n = [n]), L(e, t, n));
}
const np = Symbol(process.env.NODE_ENV !== "production" ? "ssrContext" : ""), rp = () => {
  {
    const e = Q(np);
    return e || process.env.NODE_ENV !== "production" && G("Server rendering context not provided. Make sure to only call useSSRContext() conditionally in the server build."), e;
  }
};
function Bo(e) {
  return !!(e && e.__v_isShallow);
}
function op() {
  if (process.env.NODE_ENV === "production" || typeof window > "u")
    return;
  const e = { style: "color:#3ba776" }, t = { style: "color:#0b1bc9" }, n = { style: "color:#b62e24" }, r = { style: "color:#9d288c" }, o = {
    header(c) {
      return ae(c) ? c.__isVue ? ["div", e, "VueInstance"] : he(c) ? [
        "div",
        {},
        ["span", e, d(c)],
        "<",
        l(c.value),
        ">"
      ] : nn(c) ? [
        "div",
        {},
        ["span", e, Bo(c) ? "ShallowReactive" : "Reactive"],
        "<",
        l(c),
        `>${Vt(c) ? " (readonly)" : ""}`
      ] : Vt(c) ? [
        "div",
        {},
        ["span", e, Bo(c) ? "ShallowReadonly" : "Readonly"],
        "<",
        l(c),
        ">"
      ] : null : null;
    },
    hasBody(c) {
      return c && c.__isVue;
    },
    body(c) {
      if (c && c.__isVue)
        return [
          "div",
          {},
          ...s(c.$)
        ];
    }
  };
  function s(c) {
    const p = [];
    c.type.props && c.props && p.push(a("props", X(c.props))), c.setupState !== Je && p.push(a("setup", c.setupState)), c.data !== Je && p.push(a("data", X(c.data)));
    const v = i(c, "computed");
    v && p.push(a("computed", v));
    const f = i(c, "inject");
    return f && p.push(a("injected", f)), p.push([
      "div",
      {},
      [
        "span",
        {
          style: r.style + ";opacity:0.66"
        },
        "$ (internal): "
      ],
      ["object", { object: c }]
    ]), p;
  }
  function a(c, p) {
    return p = ze({}, p), Object.keys(p).length ? [
      "div",
      { style: "line-height:1.25em;margin-bottom:0.6em" },
      [
        "div",
        {
          style: "color:#476582"
        },
        c
      ],
      [
        "div",
        {
          style: "padding-left:1.25em"
        },
        ...Object.keys(p).map((v) => [
          "div",
          {},
          ["span", r, v + ": "],
          l(p[v], !1)
        ])
      ]
    ] : ["span", {}];
  }
  function l(c, p = !0) {
    return typeof c == "number" ? ["span", t, c] : typeof c == "string" ? ["span", n, JSON.stringify(c)] : typeof c == "boolean" ? ["span", r, c] : ae(c) ? ["object", { object: p ? X(c) : c }] : ["span", n, String(c)];
  }
  function i(c, p) {
    const v = c.type;
    if (ue(v))
      return;
    const f = {};
    for (const h in c.ctx)
      u(v, h, p) && (f[h] = c.ctx[h]);
    return f;
  }
  function u(c, p, v) {
    const f = c[v];
    if (W(f) && f.includes(p) || ae(f) && p in f || c.extends && u(c.extends, p, v) || c.mixins && c.mixins.some((h) => u(h, p, v)))
      return !0;
  }
  function d(c) {
    return Bo(c) ? "ShallowRef" : c.effect ? "ComputedRef" : "Ref";
  }
  window.devtoolsFormatters ? window.devtoolsFormatters.push(o) : window.devtoolsFormatters = [o];
}
function sp(e, t, n, r) {
  e.addEventListener(t, n, r);
}
const Tt = "transition", zn = "animation", br = (e, { slots: t }) => Y(ru, ap(e), t);
br.displayName = "Transition";
const Cu = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: !0
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
br.props = /* @__PURE__ */ ze({}, ru.props, Cu);
const Ut = (e, t = []) => {
  W(e) ? e.forEach((n) => n(...t)) : e && e(...t);
}, nl = (e) => e ? W(e) ? e.some((t) => t.length > 1) : e.length > 1 : !1;
function ap(e) {
  const t = {};
  for (const T in e)
    T in Cu || (t[T] = e[T]);
  if (e.css === !1)
    return t;
  const { name: n = "v", type: r, duration: o, enterFromClass: s = `${n}-enter-from`, enterActiveClass: a = `${n}-enter-active`, enterToClass: l = `${n}-enter-to`, appearFromClass: i = s, appearActiveClass: u = a, appearToClass: d = l, leaveFromClass: c = `${n}-leave-from`, leaveActiveClass: p = `${n}-leave-active`, leaveToClass: v = `${n}-leave-to` } = e, f = lp(o), h = f && f[0], g = f && f[1], { onBeforeEnter: m, onEnter: y, onEnterCancelled: w, onLeave: b, onLeaveCancelled: S, onBeforeAppear: x = m, onAppear: _ = y, onAppearCancelled: C = w } = t, N = (T, k, F) => {
    Gt(T, k ? d : l), Gt(T, k ? u : a), F && F();
  }, I = (T, k) => {
    T._isLeaving = !1, Gt(T, c), Gt(T, v), Gt(T, p), k && k();
  }, M = (T) => (k, F) => {
    const A = T ? _ : y, B = () => N(k, T, F);
    Ut(A, [k, B]), rl(() => {
      Gt(k, T ? i : s), Nt(k, T ? d : l), nl(A) || ol(k, r, h, B);
    });
  };
  return ze(t, {
    onBeforeEnter(T) {
      Ut(m, [T]), Nt(T, s), Nt(T, a);
    },
    onBeforeAppear(T) {
      Ut(x, [T]), Nt(T, i), Nt(T, u);
    },
    onEnter: M(!1),
    onAppear: M(!0),
    onLeave(T, k) {
      T._isLeaving = !0;
      const F = () => I(T, k);
      Nt(T, c), dp(), Nt(T, p), rl(() => {
        T._isLeaving && (Gt(T, c), Nt(T, v), nl(b) || ol(T, r, g, F));
      }), Ut(b, [T, F]);
    },
    onEnterCancelled(T) {
      N(T, !1), Ut(w, [T]);
    },
    onAppearCancelled(T) {
      N(T, !0), Ut(C, [T]);
    },
    onLeaveCancelled(T) {
      I(T), Ut(S, [T]);
    }
  });
}
function lp(e) {
  if (e == null)
    return null;
  if (ae(e))
    return [Ho(e.enter), Ho(e.leave)];
  {
    const t = Ho(e);
    return [t, t];
  }
}
function Ho(e) {
  const t = Li(e);
  return process.env.NODE_ENV !== "production" && ip(t), t;
}
function ip(e) {
  typeof e != "number" ? G(`<transition> explicit duration is not a valid number - got ${JSON.stringify(e)}.`) : isNaN(e) && G("<transition> explicit duration is NaN - the duration expression might be incorrect.");
}
function Nt(e, t) {
  t.split(/\s+/).forEach((n) => n && e.classList.add(n)), (e._vtc || (e._vtc = /* @__PURE__ */ new Set())).add(t);
}
function Gt(e, t) {
  t.split(/\s+/).forEach((r) => r && e.classList.remove(r));
  const { _vtc: n } = e;
  n && (n.delete(t), n.size || (e._vtc = void 0));
}
function rl(e) {
  requestAnimationFrame(() => {
    requestAnimationFrame(e);
  });
}
let up = 0;
function ol(e, t, n, r) {
  const o = e._endId = ++up, s = () => {
    o === e._endId && r();
  };
  if (n)
    return setTimeout(s, n);
  const { type: a, timeout: l, propCount: i } = cp(e, t);
  if (!a)
    return r();
  const u = a + "end";
  let d = 0;
  const c = () => {
    e.removeEventListener(u, p), s();
  }, p = (v) => {
    v.target === e && ++d >= i && c();
  };
  setTimeout(() => {
    d < i && c();
  }, l + 1), e.addEventListener(u, p);
}
function cp(e, t) {
  const n = window.getComputedStyle(e), r = (f) => (n[f] || "").split(", "), o = r(`${Tt}Delay`), s = r(`${Tt}Duration`), a = sl(o, s), l = r(`${zn}Delay`), i = r(`${zn}Duration`), u = sl(l, i);
  let d = null, c = 0, p = 0;
  t === Tt ? a > 0 && (d = Tt, c = a, p = s.length) : t === zn ? u > 0 && (d = zn, c = u, p = i.length) : (c = Math.max(a, u), d = c > 0 ? a > u ? Tt : zn : null, p = d ? d === Tt ? s.length : i.length : 0);
  const v = d === Tt && /\b(transform|all)(,|$)/.test(r(`${Tt}Property`).toString());
  return {
    type: d,
    timeout: c,
    propCount: p,
    hasTransform: v
  };
}
function sl(e, t) {
  for (; e.length < t.length; )
    e = e.concat(e);
  return Math.max(...t.map((n, r) => al(n) + al(e[r])));
}
function al(e) {
  return Number(e.slice(0, -1).replace(",", ".")) * 1e3;
}
function dp() {
  return document.body.offsetHeight;
}
const ll = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return W(t) ? (n) => Cd(t, n) : t;
}, oo = {
  deep: !0,
  created(e, t, n) {
    e._assign = ll(n), sp(e, "change", () => {
      const r = e._modelValue, o = fp(e), s = e.checked, a = e._assign;
      if (W(r)) {
        const l = Ni(r, o), i = l !== -1;
        if (s && !i)
          a(r.concat(o));
        else if (!s && i) {
          const u = [...r];
          u.splice(l, 1), a(u);
        }
      } else if (vo(r)) {
        const l = new Set(r);
        s ? l.add(o) : l.delete(o), a(l);
      } else
        a(Su(e, s));
    });
  },
  mounted: il,
  beforeUpdate(e, t, n) {
    e._assign = ll(n), il(e, t, n);
  }
};
function il(e, { value: t, oldValue: n }, r) {
  e._modelValue = t, W(t) ? e.checked = Ni(t, r.props.value) > -1 : vo(t) ? e.checked = t.has(r.props.value) : t !== n && (e.checked = ho(t, Su(e, !0)));
}
function fp(e) {
  return "_value" in e ? e._value : e.value;
}
function Su(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const so = {
  beforeMount(e, { value: t }, { transition: n }) {
    e._vod = e.style.display === "none" ? "" : e.style.display, n && t ? n.beforeEnter(e) : Wn(e, t);
  },
  mounted(e, { value: t }, { transition: n }) {
    n && t && n.enter(e);
  },
  updated(e, { value: t, oldValue: n }, { transition: r }) {
    !t != !n && (r ? t ? (r.beforeEnter(e), Wn(e, !0), r.enter(e)) : r.leave(e, () => {
      Wn(e, !1);
    }) : Wn(e, t));
  },
  beforeUnmount(e, { value: t }) {
    Wn(e, t);
  }
};
function Wn(e, t) {
  e.style.display = t ? e._vod : "none";
}
function pp() {
  op();
}
process.env.NODE_ENV !== "production" && pp();
var hp = typeof global == "object" && global && global.Object === Object && global;
const xu = hp;
var vp = typeof self == "object" && self && self.Object === Object && self, gp = xu || vp || Function("return this")();
const ut = gp;
var mp = ut.Symbol;
const lt = mp;
var Ou = Object.prototype, bp = Ou.hasOwnProperty, yp = Ou.toString, jn = lt ? lt.toStringTag : void 0;
function wp(e) {
  var t = bp.call(e, jn), n = e[jn];
  try {
    e[jn] = void 0;
    var r = !0;
  } catch {
  }
  var o = yp.call(e);
  return r && (t ? e[jn] = n : delete e[jn]), o;
}
var _p = Object.prototype, Ep = _p.toString;
function Cp(e) {
  return Ep.call(e);
}
var Sp = "[object Null]", xp = "[object Undefined]", ul = lt ? lt.toStringTag : void 0;
function Ln(e) {
  return e == null ? e === void 0 ? xp : Sp : ul && ul in Object(e) ? wp(e) : Cp(e);
}
function Sn(e) {
  return e != null && typeof e == "object";
}
var Op = "[object Symbol]";
function yo(e) {
  return typeof e == "symbol" || Sn(e) && Ln(e) == Op;
}
function Tu(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = Array(r); ++n < r; )
    o[n] = t(e[n], n, e);
  return o;
}
var Tp = Array.isArray;
const tt = Tp;
var Np = 1 / 0, cl = lt ? lt.prototype : void 0, dl = cl ? cl.toString : void 0;
function Nu(e) {
  if (typeof e == "string")
    return e;
  if (tt(e))
    return Tu(e, Nu) + "";
  if (yo(e))
    return dl ? dl.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -Np ? "-0" : t;
}
var $p = /\s/;
function Ap(e) {
  for (var t = e.length; t-- && $p.test(e.charAt(t)); )
    ;
  return t;
}
var Pp = /^\s+/;
function Rp(e) {
  return e && e.slice(0, Ap(e) + 1).replace(Pp, "");
}
function Wt(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var fl = 0 / 0, Ip = /^[-+]0x[0-9a-f]+$/i, Lp = /^0b[01]+$/i, Fp = /^0o[0-7]+$/i, Mp = parseInt;
function pl(e) {
  if (typeof e == "number")
    return e;
  if (yo(e))
    return fl;
  if (Wt(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Wt(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = Rp(e);
  var n = Lp.test(e);
  return n || Fp.test(e) ? Mp(e.slice(2), n ? 2 : 8) : Ip.test(e) ? fl : +e;
}
function $u(e) {
  return e;
}
var Dp = "[object AsyncFunction]", kp = "[object Function]", Bp = "[object GeneratorFunction]", Hp = "[object Proxy]";
function Au(e) {
  if (!Wt(e))
    return !1;
  var t = Ln(e);
  return t == kp || t == Bp || t == Dp || t == Hp;
}
var Vp = ut["__core-js_shared__"];
const Vo = Vp;
var hl = function() {
  var e = /[^.]+$/.exec(Vo && Vo.keys && Vo.keys.IE_PROTO || "");
  return e ? "Symbol(src)_1." + e : "";
}();
function zp(e) {
  return !!hl && hl in e;
}
var Wp = Function.prototype, jp = Wp.toString;
function cn(e) {
  if (e != null) {
    try {
      return jp.call(e);
    } catch {
    }
    try {
      return e + "";
    } catch {
    }
  }
  return "";
}
var Kp = /[\\^$.*+?()[\]{}|]/g, Up = /^\[object .+?Constructor\]$/, Gp = Function.prototype, Yp = Object.prototype, qp = Gp.toString, Xp = Yp.hasOwnProperty, Jp = RegExp(
  "^" + qp.call(Xp).replace(Kp, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
);
function Zp(e) {
  if (!Wt(e) || zp(e))
    return !1;
  var t = Au(e) ? Jp : Up;
  return t.test(cn(e));
}
function Qp(e, t) {
  return e == null ? void 0 : e[t];
}
function dn(e, t) {
  var n = Qp(e, t);
  return Zp(n) ? n : void 0;
}
var eh = dn(ut, "WeakMap");
const ls = eh;
function th(e, t, n) {
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
var nh = 800, rh = 16, oh = Date.now;
function sh(e) {
  var t = 0, n = 0;
  return function() {
    var r = oh(), o = rh - (r - n);
    if (n = r, o > 0) {
      if (++t >= nh)
        return arguments[0];
    } else
      t = 0;
    return e.apply(void 0, arguments);
  };
}
function ah(e) {
  return function() {
    return e;
  };
}
var lh = function() {
  try {
    var e = dn(Object, "defineProperty");
    return e({}, "", {}), e;
  } catch {
  }
}();
const ao = lh;
var ih = ao ? function(e, t) {
  return ao(e, "toString", {
    configurable: !0,
    enumerable: !1,
    value: ah(t),
    writable: !0
  });
} : $u;
const uh = ih;
var ch = sh(uh);
const dh = ch;
var fh = 9007199254740991, ph = /^(?:0|[1-9]\d*)$/;
function ea(e, t) {
  var n = typeof e;
  return t = t ?? fh, !!t && (n == "number" || n != "symbol" && ph.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
function hh(e, t, n) {
  t == "__proto__" && ao ? ao(e, t, {
    configurable: !0,
    enumerable: !0,
    value: n,
    writable: !0
  }) : e[t] = n;
}
function ta(e, t) {
  return e === t || e !== e && t !== t;
}
var vh = Object.prototype, gh = vh.hasOwnProperty;
function mh(e, t, n) {
  var r = e[t];
  (!(gh.call(e, t) && ta(r, n)) || n === void 0 && !(t in e)) && hh(e, t, n);
}
var vl = Math.max;
function bh(e, t, n) {
  return t = vl(t === void 0 ? e.length - 1 : t, 0), function() {
    for (var r = arguments, o = -1, s = vl(r.length - t, 0), a = Array(s); ++o < s; )
      a[o] = r[t + o];
    o = -1;
    for (var l = Array(t + 1); ++o < t; )
      l[o] = r[o];
    return l[t] = n(a), th(e, this, l);
  };
}
var yh = 9007199254740991;
function na(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= yh;
}
function ra(e) {
  return e != null && na(e.length) && !Au(e);
}
var wh = Object.prototype;
function _h(e) {
  var t = e && e.constructor, n = typeof t == "function" && t.prototype || wh;
  return e === n;
}
function Eh(e, t) {
  for (var n = -1, r = Array(e); ++n < e; )
    r[n] = t(n);
  return r;
}
var Ch = "[object Arguments]";
function gl(e) {
  return Sn(e) && Ln(e) == Ch;
}
var Pu = Object.prototype, Sh = Pu.hasOwnProperty, xh = Pu.propertyIsEnumerable, Oh = gl(function() {
  return arguments;
}()) ? gl : function(e) {
  return Sn(e) && Sh.call(e, "callee") && !xh.call(e, "callee");
};
const oa = Oh;
function Th() {
  return !1;
}
var Ru = typeof exports == "object" && exports && !exports.nodeType && exports, ml = Ru && typeof module == "object" && module && !module.nodeType && module, Nh = ml && ml.exports === Ru, bl = Nh ? ut.Buffer : void 0, $h = bl ? bl.isBuffer : void 0, Ah = $h || Th;
const is = Ah;
var Ph = "[object Arguments]", Rh = "[object Array]", Ih = "[object Boolean]", Lh = "[object Date]", Fh = "[object Error]", Mh = "[object Function]", Dh = "[object Map]", kh = "[object Number]", Bh = "[object Object]", Hh = "[object RegExp]", Vh = "[object Set]", zh = "[object String]", Wh = "[object WeakMap]", jh = "[object ArrayBuffer]", Kh = "[object DataView]", Uh = "[object Float32Array]", Gh = "[object Float64Array]", Yh = "[object Int8Array]", qh = "[object Int16Array]", Xh = "[object Int32Array]", Jh = "[object Uint8Array]", Zh = "[object Uint8ClampedArray]", Qh = "[object Uint16Array]", ev = "[object Uint32Array]", le = {};
le[Uh] = le[Gh] = le[Yh] = le[qh] = le[Xh] = le[Jh] = le[Zh] = le[Qh] = le[ev] = !0;
le[Ph] = le[Rh] = le[jh] = le[Ih] = le[Kh] = le[Lh] = le[Fh] = le[Mh] = le[Dh] = le[kh] = le[Bh] = le[Hh] = le[Vh] = le[zh] = le[Wh] = !1;
function tv(e) {
  return Sn(e) && na(e.length) && !!le[Ln(e)];
}
function nv(e) {
  return function(t) {
    return e(t);
  };
}
var Iu = typeof exports == "object" && exports && !exports.nodeType && exports, Xn = Iu && typeof module == "object" && module && !module.nodeType && module, rv = Xn && Xn.exports === Iu, zo = rv && xu.process, ov = function() {
  try {
    var e = Xn && Xn.require && Xn.require("util").types;
    return e || zo && zo.binding && zo.binding("util");
  } catch {
  }
}();
const yl = ov;
var wl = yl && yl.isTypedArray, sv = wl ? nv(wl) : tv;
const Lu = sv;
var av = Object.prototype, lv = av.hasOwnProperty;
function iv(e, t) {
  var n = tt(e), r = !n && oa(e), o = !n && !r && is(e), s = !n && !r && !o && Lu(e), a = n || r || o || s, l = a ? Eh(e.length, String) : [], i = l.length;
  for (var u in e)
    (t || lv.call(e, u)) && !(a && (u == "length" || o && (u == "offset" || u == "parent") || s && (u == "buffer" || u == "byteLength" || u == "byteOffset") || ea(u, i))) && l.push(u);
  return l;
}
function uv(e, t) {
  return function(n) {
    return e(t(n));
  };
}
var cv = uv(Object.keys, Object);
const dv = cv;
var fv = Object.prototype, pv = fv.hasOwnProperty;
function hv(e) {
  if (!_h(e))
    return dv(e);
  var t = [];
  for (var n in Object(e))
    pv.call(e, n) && n != "constructor" && t.push(n);
  return t;
}
function sa(e) {
  return ra(e) ? iv(e) : hv(e);
}
var vv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, gv = /^\w*$/;
function aa(e, t) {
  if (tt(e))
    return !1;
  var n = typeof e;
  return n == "number" || n == "symbol" || n == "boolean" || e == null || yo(e) ? !0 : gv.test(e) || !vv.test(e) || t != null && e in Object(t);
}
var mv = dn(Object, "create");
const ur = mv;
function bv() {
  this.__data__ = ur ? ur(null) : {}, this.size = 0;
}
function yv(e) {
  var t = this.has(e) && delete this.__data__[e];
  return this.size -= t ? 1 : 0, t;
}
var wv = "__lodash_hash_undefined__", _v = Object.prototype, Ev = _v.hasOwnProperty;
function Cv(e) {
  var t = this.__data__;
  if (ur) {
    var n = t[e];
    return n === wv ? void 0 : n;
  }
  return Ev.call(t, e) ? t[e] : void 0;
}
var Sv = Object.prototype, xv = Sv.hasOwnProperty;
function Ov(e) {
  var t = this.__data__;
  return ur ? t[e] !== void 0 : xv.call(t, e);
}
var Tv = "__lodash_hash_undefined__";
function Nv(e, t) {
  var n = this.__data__;
  return this.size += this.has(e) ? 0 : 1, n[e] = ur && t === void 0 ? Tv : t, this;
}
function ln(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
ln.prototype.clear = bv;
ln.prototype.delete = yv;
ln.prototype.get = Cv;
ln.prototype.has = Ov;
ln.prototype.set = Nv;
function $v() {
  this.__data__ = [], this.size = 0;
}
function wo(e, t) {
  for (var n = e.length; n--; )
    if (ta(e[n][0], t))
      return n;
  return -1;
}
var Av = Array.prototype, Pv = Av.splice;
function Rv(e) {
  var t = this.__data__, n = wo(t, e);
  if (n < 0)
    return !1;
  var r = t.length - 1;
  return n == r ? t.pop() : Pv.call(t, n, 1), --this.size, !0;
}
function Iv(e) {
  var t = this.__data__, n = wo(t, e);
  return n < 0 ? void 0 : t[n][1];
}
function Lv(e) {
  return wo(this.__data__, e) > -1;
}
function Fv(e, t) {
  var n = this.__data__, r = wo(n, e);
  return r < 0 ? (++this.size, n.push([e, t])) : n[r][1] = t, this;
}
function St(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
St.prototype.clear = $v;
St.prototype.delete = Rv;
St.prototype.get = Iv;
St.prototype.has = Lv;
St.prototype.set = Fv;
var Mv = dn(ut, "Map");
const cr = Mv;
function Dv() {
  this.size = 0, this.__data__ = {
    hash: new ln(),
    map: new (cr || St)(),
    string: new ln()
  };
}
function kv(e) {
  var t = typeof e;
  return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? e !== "__proto__" : e === null;
}
function _o(e, t) {
  var n = e.__data__;
  return kv(t) ? n[typeof t == "string" ? "string" : "hash"] : n.map;
}
function Bv(e) {
  var t = _o(this, e).delete(e);
  return this.size -= t ? 1 : 0, t;
}
function Hv(e) {
  return _o(this, e).get(e);
}
function Vv(e) {
  return _o(this, e).has(e);
}
function zv(e, t) {
  var n = _o(this, e), r = n.size;
  return n.set(e, t), this.size += n.size == r ? 0 : 1, this;
}
function xt(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.clear(); ++t < n; ) {
    var r = e[t];
    this.set(r[0], r[1]);
  }
}
xt.prototype.clear = Dv;
xt.prototype.delete = Bv;
xt.prototype.get = Hv;
xt.prototype.has = Vv;
xt.prototype.set = zv;
var Wv = "Expected a function";
function la(e, t) {
  if (typeof e != "function" || t != null && typeof t != "function")
    throw new TypeError(Wv);
  var n = function() {
    var r = arguments, o = t ? t.apply(this, r) : r[0], s = n.cache;
    if (s.has(o))
      return s.get(o);
    var a = e.apply(this, r);
    return n.cache = s.set(o, a) || s, a;
  };
  return n.cache = new (la.Cache || xt)(), n;
}
la.Cache = xt;
var jv = 500;
function Kv(e) {
  var t = la(e, function(r) {
    return n.size === jv && n.clear(), r;
  }), n = t.cache;
  return t;
}
var Uv = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Gv = /\\(\\)?/g, Yv = Kv(function(e) {
  var t = [];
  return e.charCodeAt(0) === 46 && t.push(""), e.replace(Uv, function(n, r, o, s) {
    t.push(o ? s.replace(Gv, "$1") : r || n);
  }), t;
});
const qv = Yv;
function Xv(e) {
  return e == null ? "" : Nu(e);
}
function Eo(e, t) {
  return tt(e) ? e : aa(e, t) ? [e] : qv(Xv(e));
}
var Jv = 1 / 0;
function yr(e) {
  if (typeof e == "string" || yo(e))
    return e;
  var t = e + "";
  return t == "0" && 1 / e == -Jv ? "-0" : t;
}
function ia(e, t) {
  t = Eo(t, e);
  for (var n = 0, r = t.length; e != null && n < r; )
    e = e[yr(t[n++])];
  return n && n == r ? e : void 0;
}
function dr(e, t, n) {
  var r = e == null ? void 0 : ia(e, t);
  return r === void 0 ? n : r;
}
function Fu(e, t) {
  for (var n = -1, r = t.length, o = e.length; ++n < r; )
    e[o + n] = t[n];
  return e;
}
var _l = lt ? lt.isConcatSpreadable : void 0;
function Zv(e) {
  return tt(e) || oa(e) || !!(_l && e && e[_l]);
}
function ua(e, t, n, r, o) {
  var s = -1, a = e.length;
  for (n || (n = Zv), o || (o = []); ++s < a; ) {
    var l = e[s];
    t > 0 && n(l) ? t > 1 ? ua(l, t - 1, n, r, o) : Fu(o, l) : r || (o[o.length] = l);
  }
  return o;
}
function Qv(e) {
  var t = e == null ? 0 : e.length;
  return t ? ua(e, 1) : [];
}
function eg(e) {
  return dh(bh(e, void 0, Qv), e + "");
}
function tg() {
  this.__data__ = new St(), this.size = 0;
}
function ng(e) {
  var t = this.__data__, n = t.delete(e);
  return this.size = t.size, n;
}
function rg(e) {
  return this.__data__.get(e);
}
function og(e) {
  return this.__data__.has(e);
}
var sg = 200;
function ag(e, t) {
  var n = this.__data__;
  if (n instanceof St) {
    var r = n.__data__;
    if (!cr || r.length < sg - 1)
      return r.push([e, t]), this.size = ++n.size, this;
    n = this.__data__ = new xt(r);
  }
  return n.set(e, t), this.size = n.size, this;
}
function _t(e) {
  var t = this.__data__ = new St(e);
  this.size = t.size;
}
_t.prototype.clear = tg;
_t.prototype.delete = ng;
_t.prototype.get = rg;
_t.prototype.has = og;
_t.prototype.set = ag;
function lg(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length, o = 0, s = []; ++n < r; ) {
    var a = e[n];
    t(a, n, e) && (s[o++] = a);
  }
  return s;
}
function ig() {
  return [];
}
var ug = Object.prototype, cg = ug.propertyIsEnumerable, El = Object.getOwnPropertySymbols, dg = El ? function(e) {
  return e == null ? [] : (e = Object(e), lg(El(e), function(t) {
    return cg.call(e, t);
  }));
} : ig;
const fg = dg;
function pg(e, t, n) {
  var r = t(e);
  return tt(e) ? r : Fu(r, n(e));
}
function Cl(e) {
  return pg(e, sa, fg);
}
var hg = dn(ut, "DataView");
const us = hg;
var vg = dn(ut, "Promise");
const cs = vg;
var gg = dn(ut, "Set");
const ds = gg;
var Sl = "[object Map]", mg = "[object Object]", xl = "[object Promise]", Ol = "[object Set]", Tl = "[object WeakMap]", Nl = "[object DataView]", bg = cn(us), yg = cn(cr), wg = cn(cs), _g = cn(ds), Eg = cn(ls), Xt = Ln;
(us && Xt(new us(new ArrayBuffer(1))) != Nl || cr && Xt(new cr()) != Sl || cs && Xt(cs.resolve()) != xl || ds && Xt(new ds()) != Ol || ls && Xt(new ls()) != Tl) && (Xt = function(e) {
  var t = Ln(e), n = t == mg ? e.constructor : void 0, r = n ? cn(n) : "";
  if (r)
    switch (r) {
      case bg:
        return Nl;
      case yg:
        return Sl;
      case wg:
        return xl;
      case _g:
        return Ol;
      case Eg:
        return Tl;
    }
  return t;
});
const $l = Xt;
var Cg = ut.Uint8Array;
const Al = Cg;
var Sg = "__lodash_hash_undefined__";
function xg(e) {
  return this.__data__.set(e, Sg), this;
}
function Og(e) {
  return this.__data__.has(e);
}
function lo(e) {
  var t = -1, n = e == null ? 0 : e.length;
  for (this.__data__ = new xt(); ++t < n; )
    this.add(e[t]);
}
lo.prototype.add = lo.prototype.push = xg;
lo.prototype.has = Og;
function Tg(e, t) {
  for (var n = -1, r = e == null ? 0 : e.length; ++n < r; )
    if (t(e[n], n, e))
      return !0;
  return !1;
}
function Ng(e, t) {
  return e.has(t);
}
var $g = 1, Ag = 2;
function Mu(e, t, n, r, o, s) {
  var a = n & $g, l = e.length, i = t.length;
  if (l != i && !(a && i > l))
    return !1;
  var u = s.get(e), d = s.get(t);
  if (u && d)
    return u == t && d == e;
  var c = -1, p = !0, v = n & Ag ? new lo() : void 0;
  for (s.set(e, t), s.set(t, e); ++c < l; ) {
    var f = e[c], h = t[c];
    if (r)
      var g = a ? r(h, f, c, t, e, s) : r(f, h, c, e, t, s);
    if (g !== void 0) {
      if (g)
        continue;
      p = !1;
      break;
    }
    if (v) {
      if (!Tg(t, function(m, y) {
        if (!Ng(v, y) && (f === m || o(f, m, n, r, s)))
          return v.push(y);
      })) {
        p = !1;
        break;
      }
    } else if (!(f === h || o(f, h, n, r, s))) {
      p = !1;
      break;
    }
  }
  return s.delete(e), s.delete(t), p;
}
function Pg(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r, o) {
    n[++t] = [o, r];
  }), n;
}
function Rg(e) {
  var t = -1, n = Array(e.size);
  return e.forEach(function(r) {
    n[++t] = r;
  }), n;
}
var Ig = 1, Lg = 2, Fg = "[object Boolean]", Mg = "[object Date]", Dg = "[object Error]", kg = "[object Map]", Bg = "[object Number]", Hg = "[object RegExp]", Vg = "[object Set]", zg = "[object String]", Wg = "[object Symbol]", jg = "[object ArrayBuffer]", Kg = "[object DataView]", Pl = lt ? lt.prototype : void 0, Wo = Pl ? Pl.valueOf : void 0;
function Ug(e, t, n, r, o, s, a) {
  switch (n) {
    case Kg:
      if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
        return !1;
      e = e.buffer, t = t.buffer;
    case jg:
      return !(e.byteLength != t.byteLength || !s(new Al(e), new Al(t)));
    case Fg:
    case Mg:
    case Bg:
      return ta(+e, +t);
    case Dg:
      return e.name == t.name && e.message == t.message;
    case Hg:
    case zg:
      return e == t + "";
    case kg:
      var l = Pg;
    case Vg:
      var i = r & Ig;
      if (l || (l = Rg), e.size != t.size && !i)
        return !1;
      var u = a.get(e);
      if (u)
        return u == t;
      r |= Lg, a.set(e, t);
      var d = Mu(l(e), l(t), r, o, s, a);
      return a.delete(e), d;
    case Wg:
      if (Wo)
        return Wo.call(e) == Wo.call(t);
  }
  return !1;
}
var Gg = 1, Yg = Object.prototype, qg = Yg.hasOwnProperty;
function Xg(e, t, n, r, o, s) {
  var a = n & Gg, l = Cl(e), i = l.length, u = Cl(t), d = u.length;
  if (i != d && !a)
    return !1;
  for (var c = i; c--; ) {
    var p = l[c];
    if (!(a ? p in t : qg.call(t, p)))
      return !1;
  }
  var v = s.get(e), f = s.get(t);
  if (v && f)
    return v == t && f == e;
  var h = !0;
  s.set(e, t), s.set(t, e);
  for (var g = a; ++c < i; ) {
    p = l[c];
    var m = e[p], y = t[p];
    if (r)
      var w = a ? r(y, m, p, t, e, s) : r(m, y, p, e, t, s);
    if (!(w === void 0 ? m === y || o(m, y, n, r, s) : w)) {
      h = !1;
      break;
    }
    g || (g = p == "constructor");
  }
  if (h && !g) {
    var b = e.constructor, S = t.constructor;
    b != S && "constructor" in e && "constructor" in t && !(typeof b == "function" && b instanceof b && typeof S == "function" && S instanceof S) && (h = !1);
  }
  return s.delete(e), s.delete(t), h;
}
var Jg = 1, Rl = "[object Arguments]", Il = "[object Array]", Dr = "[object Object]", Zg = Object.prototype, Ll = Zg.hasOwnProperty;
function Qg(e, t, n, r, o, s) {
  var a = tt(e), l = tt(t), i = a ? Il : $l(e), u = l ? Il : $l(t);
  i = i == Rl ? Dr : i, u = u == Rl ? Dr : u;
  var d = i == Dr, c = u == Dr, p = i == u;
  if (p && is(e)) {
    if (!is(t))
      return !1;
    a = !0, d = !1;
  }
  if (p && !d)
    return s || (s = new _t()), a || Lu(e) ? Mu(e, t, n, r, o, s) : Ug(e, t, i, n, r, o, s);
  if (!(n & Jg)) {
    var v = d && Ll.call(e, "__wrapped__"), f = c && Ll.call(t, "__wrapped__");
    if (v || f) {
      var h = v ? e.value() : e, g = f ? t.value() : t;
      return s || (s = new _t()), o(h, g, n, r, s);
    }
  }
  return p ? (s || (s = new _t()), Xg(e, t, n, r, o, s)) : !1;
}
function Co(e, t, n, r, o) {
  return e === t ? !0 : e == null || t == null || !Sn(e) && !Sn(t) ? e !== e && t !== t : Qg(e, t, n, r, Co, o);
}
var em = 1, tm = 2;
function nm(e, t, n, r) {
  var o = n.length, s = o, a = !r;
  if (e == null)
    return !s;
  for (e = Object(e); o--; ) {
    var l = n[o];
    if (a && l[2] ? l[1] !== e[l[0]] : !(l[0] in e))
      return !1;
  }
  for (; ++o < s; ) {
    l = n[o];
    var i = l[0], u = e[i], d = l[1];
    if (a && l[2]) {
      if (u === void 0 && !(i in e))
        return !1;
    } else {
      var c = new _t();
      if (r)
        var p = r(u, d, i, e, t, c);
      if (!(p === void 0 ? Co(d, u, em | tm, r, c) : p))
        return !1;
    }
  }
  return !0;
}
function Du(e) {
  return e === e && !Wt(e);
}
function rm(e) {
  for (var t = sa(e), n = t.length; n--; ) {
    var r = t[n], o = e[r];
    t[n] = [r, o, Du(o)];
  }
  return t;
}
function ku(e, t) {
  return function(n) {
    return n == null ? !1 : n[e] === t && (t !== void 0 || e in Object(n));
  };
}
function om(e) {
  var t = rm(e);
  return t.length == 1 && t[0][2] ? ku(t[0][0], t[0][1]) : function(n) {
    return n === e || nm(n, e, t);
  };
}
function sm(e, t) {
  return e != null && t in Object(e);
}
function am(e, t, n) {
  t = Eo(t, e);
  for (var r = -1, o = t.length, s = !1; ++r < o; ) {
    var a = yr(t[r]);
    if (!(s = e != null && n(e, a)))
      break;
    e = e[a];
  }
  return s || ++r != o ? s : (o = e == null ? 0 : e.length, !!o && na(o) && ea(a, o) && (tt(e) || oa(e)));
}
function Bu(e, t) {
  return e != null && am(e, t, sm);
}
var lm = 1, im = 2;
function um(e, t) {
  return aa(e) && Du(t) ? ku(yr(e), t) : function(n) {
    var r = dr(n, e);
    return r === void 0 && r === t ? Bu(n, e) : Co(t, r, lm | im);
  };
}
function cm(e) {
  return function(t) {
    return t == null ? void 0 : t[e];
  };
}
function dm(e) {
  return function(t) {
    return ia(t, e);
  };
}
function fm(e) {
  return aa(e) ? cm(yr(e)) : dm(e);
}
function pm(e) {
  return typeof e == "function" ? e : e == null ? $u : typeof e == "object" ? tt(e) ? um(e[0], e[1]) : om(e) : fm(e);
}
function hm(e) {
  return function(t, n, r) {
    for (var o = -1, s = Object(t), a = r(t), l = a.length; l--; ) {
      var i = a[e ? l : ++o];
      if (n(s[i], i, s) === !1)
        break;
    }
    return t;
  };
}
var vm = hm();
const gm = vm;
function mm(e, t) {
  return e && gm(e, t, sa);
}
function bm(e, t) {
  return function(n, r) {
    if (n == null)
      return n;
    if (!ra(n))
      return e(n, r);
    for (var o = n.length, s = t ? o : -1, a = Object(n); (t ? s-- : ++s < o) && r(a[s], s, a) !== !1; )
      ;
    return n;
  };
}
var ym = bm(mm);
const wm = ym;
var _m = function() {
  return ut.Date.now();
};
const jo = _m;
var Em = "Expected a function", Cm = Math.max, Sm = Math.min;
function io(e, t, n) {
  var r, o, s, a, l, i, u = 0, d = !1, c = !1, p = !0;
  if (typeof e != "function")
    throw new TypeError(Em);
  t = pl(t) || 0, Wt(n) && (d = !!n.leading, c = "maxWait" in n, s = c ? Cm(pl(n.maxWait) || 0, t) : s, p = "trailing" in n ? !!n.trailing : p);
  function v(x) {
    var _ = r, C = o;
    return r = o = void 0, u = x, a = e.apply(C, _), a;
  }
  function f(x) {
    return u = x, l = setTimeout(m, t), d ? v(x) : a;
  }
  function h(x) {
    var _ = x - i, C = x - u, N = t - _;
    return c ? Sm(N, s - C) : N;
  }
  function g(x) {
    var _ = x - i, C = x - u;
    return i === void 0 || _ >= t || _ < 0 || c && C >= s;
  }
  function m() {
    var x = jo();
    if (g(x))
      return y(x);
    l = setTimeout(m, h(x));
  }
  function y(x) {
    return l = void 0, p && r ? v(x) : (r = o = void 0, a);
  }
  function w() {
    l !== void 0 && clearTimeout(l), u = 0, r = i = o = l = void 0;
  }
  function b() {
    return l === void 0 ? a : y(jo());
  }
  function S() {
    var x = jo(), _ = g(x);
    if (r = arguments, o = this, i = x, _) {
      if (l === void 0)
        return f(i);
      if (c)
        return clearTimeout(l), l = setTimeout(m, t), v(i);
    }
    return l === void 0 && (l = setTimeout(m, t)), a;
  }
  return S.cancel = w, S.flush = b, S;
}
function xm(e, t) {
  var n = -1, r = ra(e) ? Array(e.length) : [];
  return wm(e, function(o, s, a) {
    r[++n] = t(o, s, a);
  }), r;
}
function Om(e, t) {
  var n = tt(e) ? Tu : xm;
  return n(e, pm(t));
}
function Tm(e, t) {
  return ua(Om(e, t), 1);
}
function Nm(e) {
  for (var t = -1, n = e == null ? 0 : e.length, r = {}; ++t < n; ) {
    var o = e[t];
    r[o[0]] = o[1];
  }
  return r;
}
function $m(e, t) {
  return Co(e, t);
}
function ca(e) {
  return e == null;
}
function Hu(e, t, n, r) {
  if (!Wt(e))
    return e;
  t = Eo(t, e);
  for (var o = -1, s = t.length, a = s - 1, l = e; l != null && ++o < s; ) {
    var i = yr(t[o]), u = n;
    if (i === "__proto__" || i === "constructor" || i === "prototype")
      return e;
    if (o != a) {
      var d = l[i];
      u = r ? r(d, i, l) : void 0, u === void 0 && (u = Wt(d) ? d : ea(t[o + 1]) ? [] : {});
    }
    mh(l, i, u), l = l[i];
  }
  return e;
}
function Am(e, t, n) {
  for (var r = -1, o = t.length, s = {}; ++r < o; ) {
    var a = t[r], l = ia(e, a);
    n(l, a) && Hu(s, Eo(a, e), l);
  }
  return s;
}
function Pm(e, t) {
  return Am(e, t, function(n, r) {
    return Bu(e, r);
  });
}
var Rm = eg(function(e, t) {
  return e == null ? {} : Pm(e, t);
});
const Im = Rm;
function Lm(e, t, n) {
  return e == null ? e : Hu(e, t, n);
}
const gt = (e, t, { checkForDefaultPrevented: n = !0 } = {}) => (o) => {
  const s = e == null ? void 0 : e(o);
  if (n === !1 || !s)
    return t == null ? void 0 : t(o);
};
var Fl;
const _e = typeof window < "u", xn = (e) => typeof e == "boolean", bt = (e) => typeof e == "number", Fm = (e) => typeof e == "string", Mm = () => {
};
_e && ((Fl = window == null ? void 0 : window.navigator) != null && Fl.userAgent) && /iP(ad|hone|od)/.test(window.navigator.userAgent);
function Dm(e) {
  return typeof e == "function" ? e() : E(e);
}
function km(e) {
  return e;
}
function Bm(e, t = !0) {
  ce() ? Fe(e) : t ? e() : xe(e);
}
function It(e) {
  var t;
  const n = Dm(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const da = _e ? window : void 0;
function yt(...e) {
  let t, n, r, o;
  if (Fm(e[0]) || Array.isArray(e[0]) ? ([n, r, o] = e, t = da) : [t, n, r, o] = e, !t)
    return Mm;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((d) => d()), s.length = 0;
  }, l = (d, c, p) => (d.addEventListener(c, p, o), () => d.removeEventListener(c, p, o)), i = q(() => It(t), (d) => {
    a(), d && s.push(...n.flatMap((c) => r.map((p) => l(d, c, p))));
  }, { immediate: !0, flush: "post" });
  return () => {
    i(), a();
  };
}
function Hm(e, t, n = {}) {
  const { window: r = da, ignore: o, capture: s = !0, detectIframe: a = !1 } = n;
  if (!r)
    return;
  let l = !0, i;
  const u = (v) => {
    r.clearTimeout(i);
    const f = It(e);
    if (!(!f || f === v.target || v.composedPath().includes(f))) {
      if (!l) {
        l = !0;
        return;
      }
      t(v);
    }
  }, d = (v) => o && o.some((f) => {
    const h = It(f);
    return h && (v.target === h || v.composedPath().includes(h));
  }), c = [
    yt(r, "click", u, { passive: !0, capture: s }),
    yt(r, "pointerdown", (v) => {
      const f = It(e);
      f && (l = !v.composedPath().includes(f) && !d(v));
    }, { passive: !0 }),
    yt(r, "pointerup", (v) => {
      if (v.button === 0) {
        const f = v.composedPath();
        v.composedPath = () => f, i = r.setTimeout(() => u(v), 50);
      }
    }, { passive: !0 }),
    a && yt(r, "blur", (v) => {
      var f;
      const h = It(e);
      ((f = r.document.activeElement) == null ? void 0 : f.tagName) === "IFRAME" && !(h != null && h.contains(r.document.activeElement)) && t(v);
    })
  ].filter(Boolean);
  return () => c.forEach((v) => v());
}
function Vm(e, t = !1) {
  const n = O(), r = () => n.value = Boolean(e());
  return r(), Bm(r, t), n;
}
const fs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, ps = "__vueuse_ssr_handlers__";
fs[ps] = fs[ps] || {};
fs[ps];
var Ml = Object.getOwnPropertySymbols, zm = Object.prototype.hasOwnProperty, Wm = Object.prototype.propertyIsEnumerable, jm = (e, t) => {
  var n = {};
  for (var r in e)
    zm.call(e, r) && t.indexOf(r) < 0 && (n[r] = e[r]);
  if (e != null && Ml)
    for (var r of Ml(e))
      t.indexOf(r) < 0 && Wm.call(e, r) && (n[r] = e[r]);
  return n;
};
function hs(e, t, n = {}) {
  const r = n, { window: o = da } = r, s = jm(r, ["window"]);
  let a;
  const l = Vm(() => o && "ResizeObserver" in o), i = () => {
    a && (a.disconnect(), a = void 0);
  }, u = q(() => It(e), (c) => {
    i(), l.value && o && c && (a = new ResizeObserver(t), a.observe(c, s));
  }, { immediate: !0, flush: "post" });
  return {
    isSupported: l,
    stop: () => {
      i(), u();
    }
  };
}
var Dl;
(function(e) {
  e.UP = "UP", e.RIGHT = "RIGHT", e.DOWN = "DOWN", e.LEFT = "LEFT", e.NONE = "NONE";
})(Dl || (Dl = {}));
var Km = Object.defineProperty, kl = Object.getOwnPropertySymbols, Um = Object.prototype.hasOwnProperty, Gm = Object.prototype.propertyIsEnumerable, Bl = (e, t, n) => t in e ? Km(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Ym = (e, t) => {
  for (var n in t || (t = {}))
    Um.call(t, n) && Bl(e, n, t[n]);
  if (kl)
    for (var n of kl(t))
      Gm.call(t, n) && Bl(e, n, t[n]);
  return e;
};
const qm = {
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
Ym({
  linear: km
}, qm);
const uo = (e) => e === void 0, fr = (e) => typeof Element > "u" ? !1 : e instanceof Element, Xm = (e) => ve(e) ? !Number.isNaN(Number(e)) : !1, Jm = (e, t, n) => ({
  get value() {
    return dr(e, t, n);
  },
  set value(r) {
    Lm(e, t, r);
  }
});
class Vu extends Error {
  constructor(t) {
    super(t), this.name = "ElementPlusError";
  }
}
function zu(e, t) {
  throw new Vu(`[${e}] ${t}`);
}
function Et(e, t) {
  if (process.env.NODE_ENV !== "production") {
    const n = ve(e) ? new Vu(`[${e}] ${t}`) : e;
    console.warn(n);
  }
}
const Zm = "utils/dom/style", Wu = (e = "") => e.split(" ").filter((t) => !!t.trim()), Kr = (e, t) => {
  if (!e || !t)
    return !1;
  if (t.includes(" "))
    throw new Error("className should not contain space.");
  return e.classList.contains(t);
}, ju = (e, t) => {
  !e || !t.trim() || e.classList.add(...Wu(t));
}, vs = (e, t) => {
  !e || !t.trim() || e.classList.remove(...Wu(t));
}, Hl = (e, t) => {
  var n;
  if (!_e || !e || !t)
    return "";
  let r = nr(t);
  r === "float" && (r = "cssFloat");
  try {
    const o = e.style[r];
    if (o)
      return o;
    const s = (n = document.defaultView) == null ? void 0 : n.getComputedStyle(e, "");
    return s ? s[r] : "";
  } catch {
    return e.style[r];
  }
};
function gs(e, t = "px") {
  if (!e)
    return "";
  if (bt(e) || Xm(e))
    return `${e}${t}`;
  if (ve(e))
    return e;
  Et(Zm, "binding value must be a string or number");
}
var So = (e, t) => {
  let n = e.__vccOpts || e;
  for (let [r, o] of t)
    n[r] = o;
  return n;
}, Qm = {
  name: "ArrowDown"
}, eb = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, tb = /* @__PURE__ */ pe("path", {
  fill: "currentColor",
  d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
}, null, -1), nb = [
  tb
];
function rb(e, t, n, r, o, s) {
  return D(), K("svg", eb, nb);
}
var ob = /* @__PURE__ */ So(Qm, [["render", rb], ["__file", "arrow-down.vue"]]), sb = {
  name: "ArrowRight"
}, ab = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, lb = /* @__PURE__ */ pe("path", {
  fill: "currentColor",
  d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
}, null, -1), ib = [
  lb
];
function ub(e, t, n, r, o, s) {
  return D(), K("svg", ab, ib);
}
var Ku = /* @__PURE__ */ So(sb, [["render", ub], ["__file", "arrow-right.vue"]]), cb = {
  name: "ArrowUp"
}, db = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, fb = /* @__PURE__ */ pe("path", {
  fill: "currentColor",
  d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
}, null, -1), pb = [
  fb
];
function hb(e, t, n, r, o, s) {
  return D(), K("svg", db, pb);
}
var vb = /* @__PURE__ */ So(cb, [["render", hb], ["__file", "arrow-up.vue"]]), gb = {
  name: "Loading"
}, mb = {
  viewBox: "0 0 1024 1024",
  xmlns: "http://www.w3.org/2000/svg"
}, bb = /* @__PURE__ */ pe("path", {
  fill: "currentColor",
  d: "M512 64a32 32 0 0 1 32 32v192a32 32 0 0 1-64 0V96a32 32 0 0 1 32-32zm0 640a32 32 0 0 1 32 32v192a32 32 0 1 1-64 0V736a32 32 0 0 1 32-32zm448-192a32 32 0 0 1-32 32H736a32 32 0 1 1 0-64h192a32 32 0 0 1 32 32zm-640 0a32 32 0 0 1-32 32H96a32 32 0 0 1 0-64h192a32 32 0 0 1 32 32zM195.2 195.2a32 32 0 0 1 45.248 0L376.32 331.008a32 32 0 0 1-45.248 45.248L195.2 240.448a32 32 0 0 1 0-45.248zm452.544 452.544a32 32 0 0 1 45.248 0L828.8 783.552a32 32 0 0 1-45.248 45.248L647.744 692.992a32 32 0 0 1 0-45.248zM828.8 195.264a32 32 0 0 1 0 45.184L692.992 376.32a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0zm-452.544 452.48a32 32 0 0 1 0 45.248L240.448 828.8a32 32 0 0 1-45.248-45.248l135.808-135.808a32 32 0 0 1 45.248 0z"
}, null, -1), yb = [
  bb
];
function wb(e, t, n, r, o, s) {
  return D(), K("svg", mb, yb);
}
var _b = /* @__PURE__ */ So(gb, [["render", wb], ["__file", "loading.vue"]]);
const Uu = "__epPropKey", ie = (e) => e, Eb = (e) => ae(e) && !!e[Uu], xo = (e, t) => {
  if (!ae(e) || Eb(e))
    return e;
  const { values: n, required: r, default: o, type: s, validator: a } = e, i = {
    type: s,
    required: !!r,
    validator: n || a ? (u) => {
      let d = !1, c = [];
      if (n && (c = Array.from(n), re(e, "default") && c.push(o), d || (d = c.includes(u))), a && (d || (d = a(u))), !d && c.length > 0) {
        const p = [...new Set(c)].map((v) => JSON.stringify(v)).join(", ");
        G(`Invalid prop: validation failed${t ? ` for prop "${t}"` : ""}. Expected one of [${p}], got value ${JSON.stringify(u)}.`);
      }
      return d;
    } : void 0,
    [Uu]: !0
  };
  return re(e, "default") && (i.default = o), i;
}, Ve = (e) => Nm(Object.entries(e).map(([t, n]) => [
  t,
  xo(n, t)
])), Fn = (e, t) => {
  if (e.install = (n) => {
    for (const r of [e, ...Object.values(t ?? {})])
      n.component(r.name, r);
  }, t)
    for (const [n, r] of Object.entries(t))
      e[n] = r;
  return e;
}, fa = (e) => (e.install = wt, e), co = {
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
}, Oo = "update:modelValue", Cb = ["", "default", "small", "large"], Mn = Symbol("checkboxGroupContextKey"), Sb = Symbol(), pa = Symbol("formContextKey"), fo = Symbol("formItemContextKey"), Gu = Symbol("scrollbarContextKey"), ha = Symbol("popper"), Yu = Symbol("popperContent"), va = Symbol("elTooltip"), qu = (e) => {
  const t = ce();
  return P(() => {
    var n, r;
    return (r = ((n = t.proxy) == null ? void 0 : n.$props)[e]) != null ? r : void 0;
  });
}, Vl = O();
function Dn(e, t = void 0) {
  const n = ce() ? Q(Sb, Vl) : Vl;
  return e ? P(() => {
    var r, o;
    return (o = (r = n.value) == null ? void 0 : r[e]) != null ? o : t;
  }) : n;
}
const Xu = xo({
  type: String,
  values: Cb,
  required: !1
}), ms = (e, t = {}) => {
  const n = O(void 0), r = t.prop ? n : qu("size"), o = t.global ? n : Dn("size"), s = t.form ? { size: void 0 } : Q(pa, void 0), a = t.formItem ? { size: void 0 } : Q(fo, void 0);
  return P(() => r.value || E(e) || (a == null ? void 0 : a.size) || (s == null ? void 0 : s.size) || o.value || "");
}, xb = (e) => {
  const t = qu("disabled"), n = Q(pa, void 0);
  return P(() => t.value || E(e) || (n == null ? void 0 : n.disabled) || !1);
}, ga = "el", Ob = "is-", Yt = (e, t, n, r, o) => {
  let s = `${e}-${t}`;
  return n && (s += `-${n}`), r && (s += `__${r}`), o && (s += `--${o}`), s;
}, ge = (e) => {
  const t = Dn("namespace", ga);
  return {
    namespace: t,
    b: (f = "") => Yt(t.value, e, f, "", ""),
    e: (f) => f ? Yt(t.value, e, "", f, "") : "",
    m: (f) => f ? Yt(t.value, e, "", "", f) : "",
    be: (f, h) => f && h ? Yt(t.value, e, f, h, "") : "",
    em: (f, h) => f && h ? Yt(t.value, e, "", f, h) : "",
    bm: (f, h) => f && h ? Yt(t.value, e, f, "", h) : "",
    bem: (f, h, g) => f && h && g ? Yt(t.value, e, f, h, g) : "",
    is: (f, ...h) => {
      const g = h.length >= 1 ? h[0] : !0;
      return f && g ? `${Ob}${f}` : "";
    },
    cssVar: (f) => {
      const h = {};
      for (const g in f)
        f[g] && (h[`--${t.value}-${g}`] = f[g]);
      return h;
    },
    cssVarName: (f) => `--${t.value}-${f}`,
    cssVarBlock: (f) => {
      const h = {};
      for (const g in f)
        f[g] && (h[`--${t.value}-${e}-${g}`] = f[g]);
      return h;
    },
    cssVarBlockName: (f) => `--${t.value}-${e}-${f}`
  };
}, bs = {
  prefix: Math.floor(Math.random() * 1e4),
  current: 0
}, Tb = Symbol("elIdInjection"), Ju = () => ce() ? Q(Tb, bs) : bs, Zu = (e) => {
  const t = Ju();
  !_e && t === bs && Et("IdInjection", `Looks like you are using server rendering, you must provide a id provider to ensure the hydration process to be succeed
usage: app.provide(ID_INJECTION_KEY, {
  prefix: number,
  current: number,
})`);
  const n = Dn("namespace", ga);
  return P(() => E(e) || `${n.value}-id-${t.prefix}-${t.current++}`);
}, ma = () => {
  const e = Q(pa, void 0), t = Q(fo, void 0);
  return {
    form: e,
    formItem: t
  };
}, Qu = (e, {
  formItemContext: t,
  disableIdGeneration: n,
  disableIdManagement: r
}) => {
  n || (n = O(!1)), r || (r = O(!1));
  const o = O();
  let s;
  const a = P(() => {
    var l;
    return !!(!e.label && t && t.inputIds && ((l = t.inputIds) == null ? void 0 : l.length) <= 1);
  });
  return Fe(() => {
    s = q([Mt(e, "id"), n], ([l, i]) => {
      const u = l ?? (i ? void 0 : Zu().value);
      u !== o.value && (t != null && t.removeInputId && (o.value && t.removeInputId(o.value), !(r != null && r.value) && !i && u && t.addInputId(u)), o.value = u);
    }, { immediate: !0 });
  }), bo(() => {
    s && s(), t != null && t.removeInputId && o.value && t.removeInputId(o.value);
  }), {
    isLabeledByFormItem: a,
    inputId: o
  };
};
var Nb = {
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
const $b = (e) => (t, n) => Ab(t, n, E(e)), Ab = (e, t, n) => dr(n, e, e).replace(/\{(\w+)\}/g, (r, o) => {
  var s;
  return `${(s = t == null ? void 0 : t[o]) != null ? s : `{${o}}`}`;
}), Pb = (e) => {
  const t = P(() => E(e).name), n = he(e) ? e : O(e);
  return {
    lang: t,
    locale: n,
    t: $b(e)
  };
}, ec = () => {
  const e = Dn("locale");
  return Pb(P(() => e.value || Nb));
}, Rb = xo({
  type: ie(Boolean),
  default: null
}), Ib = xo({
  type: ie(Function)
}), Lb = (e) => {
  const t = `update:${e}`, n = `onUpdate:${e}`, r = [t], o = {
    [e]: Rb,
    [n]: Ib
  };
  return {
    useModelToggle: ({
      indicator: a,
      toggleReason: l,
      shouldHideWhenRouteChanges: i,
      shouldProceed: u,
      onShow: d,
      onHide: c
    }) => {
      const p = ce(), { emit: v } = p, f = p.props, h = P(() => ue(f[n])), g = P(() => f[e] === null), m = (_) => {
        a.value !== !0 && (a.value = !0, l && (l.value = _), ue(d) && d(_));
      }, y = (_) => {
        a.value !== !1 && (a.value = !1, l && (l.value = _), ue(c) && c(_));
      }, w = (_) => {
        if (f.disabled === !0 || ue(u) && !u())
          return;
        const C = h.value && _e;
        C && v(t, !0), (g.value || !C) && m(_);
      }, b = (_) => {
        if (f.disabled === !0 || !_e)
          return;
        const C = h.value && _e;
        C && v(t, !1), (g.value || !C) && y(_);
      }, S = (_) => {
        xn(_) && (f.disabled && _ ? h.value && v(t, !1) : a.value !== _ && (_ ? m() : y()));
      }, x = () => {
        a.value ? b() : w();
      };
      return q(() => f[e], S), i && p.appContext.config.globalProperties.$route !== void 0 && q(() => ({
        ...p.proxy.$route
      }), () => {
        i.value && a.value && b();
      }), Fe(() => {
        S(f[e]);
      }), {
        hide: b,
        show: w,
        toggle: x,
        hasUpdateHandler: h
      };
    },
    useModelToggleProps: o,
    useModelToggleEmits: r
  };
};
function Fb() {
  let e;
  const t = (r, o) => {
    n(), e = window.setTimeout(r, o);
  }, n = () => window.clearTimeout(e);
  return {
    registerTimeout: t,
    cancelTimeout: n
  };
}
let bn = [];
const zl = (e) => {
  const t = e;
  t.key === co.esc && bn.forEach((n) => n(t));
}, Mb = (e) => {
  Fe(() => {
    bn.length === 0 && document.addEventListener("keydown", zl), _e && bn.push(e);
  }), nt(() => {
    bn = bn.filter((t) => t !== e), bn.length === 0 && _e && document.removeEventListener("keydown", zl);
  });
};
let Wl;
const tc = () => {
  const e = Dn("namespace", ga), t = Ju(), n = P(() => `${e.value}-popper-container-${t.prefix}`), r = P(() => `#${n.value}`);
  return {
    id: n,
    selector: r
  };
}, Db = (e) => {
  const t = document.createElement("div");
  return t.id = e, document.body.appendChild(t), t;
}, kb = () => {
  Ys(() => {
    if (!_e)
      return;
    const { id: e, selector: t } = tc();
    (process.env.NODE_ENV === "test" || !Wl && !document.body.querySelector(t.value)) && (Wl = Db(e.value));
  });
}, Bb = Ve({
  showAfter: {
    type: Number,
    default: 0
  },
  hideAfter: {
    type: Number,
    default: 200
  }
}), Hb = ({
  showAfter: e,
  hideAfter: t,
  open: n,
  close: r
}) => {
  const { registerTimeout: o } = Fb();
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
}, nc = Symbol("elForwardRef"), Vb = (e) => {
  at(nc, {
    setForwardRef: (n) => {
      e.value = n;
    }
  });
}, zb = (e) => ({
  mounted(t) {
    e(t);
  },
  updated(t) {
    e(t);
  },
  unmounted() {
    e(null);
  }
}), jl = O(0), rc = () => {
  const e = Dn("zIndex", 2e3), t = P(() => e.value + jl.value);
  return {
    initialZIndex: e,
    currentZIndex: t,
    nextZIndex: () => (jl.value++, t.value)
  };
};
var Oe = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
};
const Wb = Ve({
  size: {
    type: ie([Number, String])
  },
  color: {
    type: String
  }
}), jb = U({
  name: "ElIcon",
  inheritAttrs: !1
}), Kb = /* @__PURE__ */ U({
  ...jb,
  props: Wb,
  setup(e) {
    const t = e, n = ge("icon"), r = P(() => {
      const { size: o, color: s } = t;
      return !o && !s ? {} : {
        fontSize: uo(o) ? void 0 : gs(o),
        "--color": s
      };
    });
    return (o, s) => (D(), K("i", an({
      class: E(n).b(),
      style: E(r)
    }, o.$attrs), [
      Ae(o.$slots, "default")
    ], 16));
  }
});
var Ub = /* @__PURE__ */ Oe(Kb, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/icon/src/icon.vue"]]);
const ba = Fn(Ub), wn = 4, Gb = {
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
}, Yb = ({
  move: e,
  size: t,
  bar: n
}) => ({
  [n.size]: t,
  transform: `translate${n.axis}(${e}%)`
}), qb = Ve({
  vertical: Boolean,
  size: String,
  move: Number,
  ratio: {
    type: Number,
    required: !0
  },
  always: Boolean
}), Xb = "Thumb", Jb = /* @__PURE__ */ U({
  __name: "thumb",
  props: qb,
  setup(e) {
    const t = e, n = Q(Gu), r = ge("scrollbar");
    n || zu(Xb, "can not inject scrollbar context");
    const o = O(), s = O(), a = O({}), l = O(!1);
    let i = !1, u = !1, d = _e ? document.onselectstart : null;
    const c = P(() => Gb[t.vertical ? "vertical" : "horizontal"]), p = P(() => Yb({
      size: t.size,
      move: t.move,
      bar: c.value
    })), v = P(() => o.value[c.value.offset] ** 2 / n.wrapElement[c.value.scrollSize] / t.ratio / s.value[c.value.offset]), f = (x) => {
      var _;
      if (x.stopPropagation(), x.ctrlKey || [1, 2].includes(x.button))
        return;
      (_ = window.getSelection()) == null || _.removeAllRanges(), g(x);
      const C = x.currentTarget;
      C && (a.value[c.value.axis] = C[c.value.offset] - (x[c.value.client] - C.getBoundingClientRect()[c.value.direction]));
    }, h = (x) => {
      if (!s.value || !o.value || !n.wrapElement)
        return;
      const _ = Math.abs(x.target.getBoundingClientRect()[c.value.direction] - x[c.value.client]), C = s.value[c.value.offset] / 2, N = (_ - C) * 100 * v.value / o.value[c.value.offset];
      n.wrapElement[c.value.scroll] = N * n.wrapElement[c.value.scrollSize] / 100;
    }, g = (x) => {
      x.stopImmediatePropagation(), i = !0, document.addEventListener("mousemove", m), document.addEventListener("mouseup", y), d = document.onselectstart, document.onselectstart = () => !1;
    }, m = (x) => {
      if (!o.value || !s.value || i === !1)
        return;
      const _ = a.value[c.value.axis];
      if (!_)
        return;
      const C = (o.value.getBoundingClientRect()[c.value.direction] - x[c.value.client]) * -1, N = s.value[c.value.offset] - _, I = (C - N) * 100 * v.value / o.value[c.value.offset];
      n.wrapElement[c.value.scroll] = I * n.wrapElement[c.value.scrollSize] / 100;
    }, y = () => {
      i = !1, a.value[c.value.axis] = 0, document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", y), S(), u && (l.value = !1);
    }, w = () => {
      u = !1, l.value = !!t.size;
    }, b = () => {
      u = !0, l.value = i;
    };
    nt(() => {
      S(), document.removeEventListener("mouseup", y);
    });
    const S = () => {
      document.onselectstart !== d && (document.onselectstart = d);
    };
    return yt(Mt(n, "scrollbarElement"), "mousemove", w), yt(Mt(n, "scrollbarElement"), "mouseleave", b), (x, _) => (D(), we(br, {
      name: E(r).b("fade"),
      persisted: ""
    }, {
      default: me(() => [
        $e(pe("div", {
          ref_key: "instance",
          ref: o,
          class: j([E(r).e("bar"), E(r).is(E(c).key)]),
          onMousedown: h
        }, [
          pe("div", {
            ref_key: "thumb",
            ref: s,
            class: j(E(r).e("thumb")),
            style: De(E(p)),
            onMousedown: f
          }, null, 38)
        ], 34), [
          [so, x.always || l.value]
        ])
      ]),
      _: 1
    }, 8, ["name"]));
  }
});
var Kl = /* @__PURE__ */ Oe(Jb, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/thumb.vue"]]);
const Zb = Ve({
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
}), Qb = /* @__PURE__ */ U({
  __name: "bar",
  props: Zb,
  setup(e, { expose: t }) {
    const n = e, r = O(0), o = O(0);
    return t({
      handleScroll: (a) => {
        if (a) {
          const l = a.offsetHeight - wn, i = a.offsetWidth - wn;
          o.value = a.scrollTop * 100 / l * n.ratioY, r.value = a.scrollLeft * 100 / i * n.ratioX;
        }
      }
    }), (a, l) => (D(), K(Ye, null, [
      L(Kl, {
        move: r.value,
        ratio: a.ratioX,
        size: a.width,
        always: a.always
      }, null, 8, ["move", "ratio", "size", "always"]),
      L(Kl, {
        move: o.value,
        ratio: a.ratioY,
        size: a.height,
        vertical: "",
        always: a.always
      }, null, 8, ["move", "ratio", "size", "always"])
    ], 64));
  }
});
var ey = /* @__PURE__ */ Oe(Qb, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/bar.vue"]]);
const ty = Ve({
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
    type: ie([String, Object, Array]),
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
}), ny = {
  scroll: ({
    scrollTop: e,
    scrollLeft: t
  }) => [e, t].every(bt)
}, ys = "ElScrollbar", ry = U({
  name: ys
}), oy = /* @__PURE__ */ U({
  ...ry,
  props: ty,
  emits: ny,
  setup(e, { expose: t, emit: n }) {
    const r = e, o = ge("scrollbar");
    let s, a;
    const l = O(), i = O(), u = O(), d = O("0"), c = O("0"), p = O(), v = O(1), f = O(1), h = P(() => {
      const _ = {};
      return r.height && (_.height = gs(r.height)), r.maxHeight && (_.maxHeight = gs(r.maxHeight)), [r.wrapStyle, _];
    }), g = P(() => [
      r.wrapClass,
      o.e("wrap"),
      { [o.em("wrap", "hidden-default")]: !r.native }
    ]), m = P(() => [o.e("view"), r.viewClass]), y = () => {
      var _;
      i.value && ((_ = p.value) == null || _.handleScroll(i.value), n("scroll", {
        scrollTop: i.value.scrollTop,
        scrollLeft: i.value.scrollLeft
      }));
    };
    function w(_, C) {
      ae(_) ? i.value.scrollTo(_) : bt(_) && bt(C) && i.value.scrollTo(_, C);
    }
    const b = (_) => {
      if (!bt(_)) {
        Et(ys, "value must be a number");
        return;
      }
      i.value.scrollTop = _;
    }, S = (_) => {
      if (!bt(_)) {
        Et(ys, "value must be a number");
        return;
      }
      i.value.scrollLeft = _;
    }, x = () => {
      if (!i.value)
        return;
      const _ = i.value.offsetHeight - wn, C = i.value.offsetWidth - wn, N = _ ** 2 / i.value.scrollHeight, I = C ** 2 / i.value.scrollWidth, M = Math.max(N, r.minSize), T = Math.max(I, r.minSize);
      v.value = N / (_ - N) / (M / (_ - M)), f.value = I / (C - I) / (T / (C - T)), c.value = M + wn < _ ? `${M}px` : "", d.value = T + wn < C ? `${T}px` : "";
    };
    return q(() => r.noresize, (_) => {
      _ ? (s == null || s(), a == null || a()) : ({ stop: s } = hs(u, x), a = yt("resize", x));
    }, { immediate: !0 }), q(() => [r.maxHeight, r.height], () => {
      r.native || xe(() => {
        var _;
        x(), i.value && ((_ = p.value) == null || _.handleScroll(i.value));
      });
    }), at(Gu, mo({
      scrollbarElement: l,
      wrapElement: i
    })), Fe(() => {
      r.native || xe(() => {
        x();
      });
    }), au(() => x()), t({
      wrapRef: i,
      update: x,
      scrollTo: w,
      setScrollTop: b,
      setScrollLeft: S,
      handleScroll: y
    }), (_, C) => (D(), K("div", {
      ref_key: "scrollbarRef",
      ref: l,
      class: j(E(o).b())
    }, [
      pe("div", {
        ref_key: "wrapRef",
        ref: i,
        class: j(E(g)),
        style: De(E(h)),
        onScroll: y
      }, [
        (D(), we(qs(_.tag), {
          ref_key: "resizeRef",
          ref: u,
          class: j(E(m)),
          style: De(_.viewStyle)
        }, {
          default: me(() => [
            Ae(_.$slots, "default")
          ]),
          _: 3
        }, 8, ["class", "style"]))
      ], 38),
      _.native ? Le("v-if", !0) : (D(), we(ey, {
        key: 0,
        ref_key: "barRef",
        ref: p,
        height: c.value,
        width: d.value,
        always: _.always,
        "ratio-x": f.value,
        "ratio-y": v.value
      }, null, 8, ["height", "width", "always", "ratio-x", "ratio-y"]))
    ], 2));
  }
});
var sy = /* @__PURE__ */ Oe(oy, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/scrollbar/src/scrollbar.vue"]]);
const oc = Fn(sy), ay = [
  "dialog",
  "grid",
  "group",
  "listbox",
  "menu",
  "navigation",
  "tooltip",
  "tree"
], sc = Ve({
  role: {
    type: String,
    values: ay,
    default: "tooltip"
  }
}), ly = U({
  name: "ElPopperRoot",
  inheritAttrs: !1
}), iy = /* @__PURE__ */ U({
  ...ly,
  props: sc,
  setup(e, { expose: t }) {
    const n = e, r = O(), o = O(), s = O(), a = O(), l = P(() => n.role), i = {
      triggerRef: r,
      popperInstanceRef: o,
      contentRef: s,
      referenceRef: a,
      role: l
    };
    return t(i), at(ha, i), (u, d) => Ae(u.$slots, "default");
  }
});
var uy = /* @__PURE__ */ Oe(iy, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/popper.vue"]]);
const ac = Ve({
  arrowOffset: {
    type: Number,
    default: 5
  }
}), cy = U({
  name: "ElPopperArrow",
  inheritAttrs: !1
}), dy = /* @__PURE__ */ U({
  ...cy,
  props: ac,
  setup(e, { expose: t }) {
    const n = e, r = ge("popper"), { arrowOffset: o, arrowRef: s } = Q(Yu, void 0);
    return q(() => n.arrowOffset, (a) => {
      o.value = a;
    }), nt(() => {
      s.value = void 0;
    }), t({
      arrowRef: s
    }), (a, l) => (D(), K("span", {
      ref_key: "arrowRef",
      ref: s,
      class: j(E(r).e("arrow")),
      "data-popper-arrow": ""
    }, null, 2));
  }
});
var fy = /* @__PURE__ */ Oe(dy, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/arrow.vue"]]);
const Ko = "ElOnlyChild", py = U({
  name: Ko,
  setup(e, {
    slots: t,
    attrs: n
  }) {
    var r;
    const o = Q(nc), s = zb((r = o == null ? void 0 : o.setForwardRef) != null ? r : wt);
    return () => {
      var a;
      const l = (a = t.default) == null ? void 0 : a.call(t, n);
      if (!l)
        return null;
      if (l.length > 1)
        return Et(Ko, "requires exact only one valid child."), null;
      const i = lc(l);
      return i ? $e(zt(i, n), [[s]]) : (Et(Ko, "no valid child node found"), null);
    };
  }
});
function lc(e) {
  if (!e)
    return null;
  const t = e;
  for (const n of t) {
    if (ae(n))
      switch (n.type) {
        case et:
          continue;
        case Js:
        case "svg":
          return Ul(n);
        case Ye:
          return lc(n.children);
        default:
          return n;
      }
    return Ul(n);
  }
  return null;
}
function Ul(e) {
  const t = ge("only-child");
  return L("span", {
    class: t.e("content")
  }, [e]);
}
const ic = Ve({
  virtualRef: {
    type: ie(Object)
  },
  virtualTriggering: Boolean,
  onMouseenter: {
    type: ie(Function)
  },
  onMouseleave: {
    type: ie(Function)
  },
  onClick: {
    type: ie(Function)
  },
  onKeydown: {
    type: ie(Function)
  },
  onFocus: {
    type: ie(Function)
  },
  onBlur: {
    type: ie(Function)
  },
  onContextmenu: {
    type: ie(Function)
  },
  id: String,
  open: Boolean
}), hy = U({
  name: "ElPopperTrigger",
  inheritAttrs: !1
}), vy = /* @__PURE__ */ U({
  ...hy,
  props: ic,
  setup(e, { expose: t }) {
    const n = e, { role: r, triggerRef: o } = Q(ha, void 0);
    Vb(o);
    const s = P(() => l.value ? n.id : void 0), a = P(() => {
      if (r && r.value === "tooltip")
        return n.open && n.id ? n.id : void 0;
    }), l = P(() => {
      if (r && r.value !== "tooltip")
        return r.value;
    }), i = P(() => l.value ? `${n.open}` : void 0);
    let u;
    return Fe(() => {
      q(() => n.virtualRef, (d) => {
        d && (o.value = It(d));
      }, {
        immediate: !0
      }), q(o, (d, c) => {
        u == null || u(), u = void 0, fr(d) && ([
          "onMouseenter",
          "onMouseleave",
          "onClick",
          "onKeydown",
          "onFocus",
          "onBlur",
          "onContextmenu"
        ].forEach((p) => {
          var v;
          const f = n[p];
          f && (d.addEventListener(p.slice(2).toLowerCase(), f), (v = c == null ? void 0 : c.removeEventListener) == null || v.call(c, p.slice(2).toLowerCase(), f));
        }), u = q([s, a, l, i], (p) => {
          [
            "aria-controls",
            "aria-describedby",
            "aria-haspopup",
            "aria-expanded"
          ].forEach((v, f) => {
            ca(p[f]) ? d.removeAttribute(v) : d.setAttribute(v, p[f]);
          });
        }, { immediate: !0 })), fr(c) && [
          "aria-controls",
          "aria-describedby",
          "aria-haspopup",
          "aria-expanded"
        ].forEach((p) => c.removeAttribute(p));
      }, {
        immediate: !0
      });
    }), nt(() => {
      u == null || u(), u = void 0;
    }), t({
      triggerRef: o
    }), (d, c) => d.virtualTriggering ? Le("v-if", !0) : (D(), we(E(py), an({ key: 0 }, d.$attrs, {
      "aria-controls": E(s),
      "aria-describedby": E(a),
      "aria-expanded": E(i),
      "aria-haspopup": E(l)
    }), {
      default: me(() => [
        Ae(d.$slots, "default")
      ]),
      _: 3
    }, 16, ["aria-controls", "aria-describedby", "aria-expanded", "aria-haspopup"]));
  }
});
var gy = /* @__PURE__ */ Oe(vy, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/trigger.vue"]]), ke = "top", qe = "bottom", Xe = "right", Be = "left", ya = "auto", wr = [ke, qe, Xe, Be], On = "start", pr = "end", my = "clippingParents", uc = "viewport", Kn = "popper", by = "reference", Gl = wr.reduce(function(e, t) {
  return e.concat([t + "-" + On, t + "-" + pr]);
}, []), wa = [].concat(wr, [ya]).reduce(function(e, t) {
  return e.concat([t, t + "-" + On, t + "-" + pr]);
}, []), yy = "beforeRead", wy = "read", _y = "afterRead", Ey = "beforeMain", Cy = "main", Sy = "afterMain", xy = "beforeWrite", Oy = "write", Ty = "afterWrite", Ny = [yy, wy, _y, Ey, Cy, Sy, xy, Oy, Ty];
function it(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function rt(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Tn(e) {
  var t = rt(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ge(e) {
  var t = rt(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function _a(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = rt(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function $y(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, s = t.elements[n];
    !Ge(s) || !it(s) || (Object.assign(s.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? s.removeAttribute(a) : s.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function Ay(e) {
  var t = e.state, n = { popper: { position: t.options.strategy, left: "0", top: "0", margin: "0" }, arrow: { position: "absolute" }, reference: {} };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], s = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = a.reduce(function(i, u) {
        return i[u] = "", i;
      }, {});
      !Ge(o) || !it(o) || (Object.assign(o.style, l), Object.keys(s).forEach(function(i) {
        o.removeAttribute(i);
      }));
    });
  };
}
var cc = { name: "applyStyles", enabled: !0, phase: "write", fn: $y, effect: Ay, requires: ["computeStyles"] };
function st(e) {
  return e.split("-")[0];
}
var sn = Math.max, po = Math.min, Nn = Math.round;
function $n(e, t) {
  t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), r = 1, o = 1;
  if (Ge(e) && t) {
    var s = e.offsetHeight, a = e.offsetWidth;
    a > 0 && (r = Nn(n.width) / a || 1), s > 0 && (o = Nn(n.height) / s || 1);
  }
  return { width: n.width / r, height: n.height / o, top: n.top / o, right: n.right / r, bottom: n.bottom / o, left: n.left / r, x: n.left / r, y: n.top / o };
}
function Ea(e) {
  var t = $n(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), { x: e.offsetLeft, y: e.offsetTop, width: n, height: r };
}
function dc(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && _a(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ct(e) {
  return rt(e).getComputedStyle(e);
}
function Py(e) {
  return ["table", "td", "th"].indexOf(it(e)) >= 0;
}
function Kt(e) {
  return ((Tn(e) ? e.ownerDocument : e.document) || window.document).documentElement;
}
function To(e) {
  return it(e) === "html" ? e : e.assignedSlot || e.parentNode || (_a(e) ? e.host : null) || Kt(e);
}
function Yl(e) {
  return !Ge(e) || Ct(e).position === "fixed" ? null : e.offsetParent;
}
function Ry(e) {
  var t = navigator.userAgent.toLowerCase().indexOf("firefox") !== -1, n = navigator.userAgent.indexOf("Trident") !== -1;
  if (n && Ge(e)) {
    var r = Ct(e);
    if (r.position === "fixed")
      return null;
  }
  var o = To(e);
  for (_a(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(it(o)) < 0; ) {
    var s = Ct(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || t && s.willChange === "filter" || t && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function _r(e) {
  for (var t = rt(e), n = Yl(e); n && Py(n) && Ct(n).position === "static"; )
    n = Yl(n);
  return n && (it(n) === "html" || it(n) === "body" && Ct(n).position === "static") ? t : n || Ry(e) || t;
}
function Ca(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Jn(e, t, n) {
  return sn(e, po(t, n));
}
function Iy(e, t, n) {
  var r = Jn(e, t, n);
  return r > n ? n : r;
}
function fc() {
  return { top: 0, right: 0, bottom: 0, left: 0 };
}
function pc(e) {
  return Object.assign({}, fc(), e);
}
function hc(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ly = function(e, t) {
  return e = typeof e == "function" ? e(Object.assign({}, t.rects, { placement: t.placement })) : e, pc(typeof e != "number" ? e : hc(e, wr));
};
function Fy(e) {
  var t, n = e.state, r = e.name, o = e.options, s = n.elements.arrow, a = n.modifiersData.popperOffsets, l = st(n.placement), i = Ca(l), u = [Be, Xe].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!s || !a)) {
    var c = Ly(o.padding, n), p = Ea(s), v = i === "y" ? ke : Be, f = i === "y" ? qe : Xe, h = n.rects.reference[d] + n.rects.reference[i] - a[i] - n.rects.popper[d], g = a[i] - n.rects.reference[i], m = _r(s), y = m ? i === "y" ? m.clientHeight || 0 : m.clientWidth || 0 : 0, w = h / 2 - g / 2, b = c[v], S = y - p[d] - c[f], x = y / 2 - p[d] / 2 + w, _ = Jn(b, x, S), C = i;
    n.modifiersData[r] = (t = {}, t[C] = _, t.centerOffset = _ - x, t);
  }
}
function My(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || !dc(t.elements.popper, o) || (t.elements.arrow = o));
}
var Dy = { name: "arrow", enabled: !0, phase: "main", fn: Fy, effect: My, requires: ["popperOffsets"], requiresIfExists: ["preventOverflow"] };
function An(e) {
  return e.split("-")[1];
}
var ky = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
function By(e) {
  var t = e.x, n = e.y, r = window, o = r.devicePixelRatio || 1;
  return { x: Nn(t * o) / o || 0, y: Nn(n * o) / o || 0 };
}
function ql(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, s = e.variation, a = e.offsets, l = e.position, i = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, c = e.isFixed, p = a.x, v = p === void 0 ? 0 : p, f = a.y, h = f === void 0 ? 0 : f, g = typeof d == "function" ? d({ x: v, y: h }) : { x: v, y: h };
  v = g.x, h = g.y;
  var m = a.hasOwnProperty("x"), y = a.hasOwnProperty("y"), w = Be, b = ke, S = window;
  if (u) {
    var x = _r(n), _ = "clientHeight", C = "clientWidth";
    if (x === rt(n) && (x = Kt(n), Ct(x).position !== "static" && l === "absolute" && (_ = "scrollHeight", C = "scrollWidth")), x = x, o === ke || (o === Be || o === Xe) && s === pr) {
      b = qe;
      var N = c && x === S && S.visualViewport ? S.visualViewport.height : x[_];
      h -= N - r.height, h *= i ? 1 : -1;
    }
    if (o === Be || (o === ke || o === qe) && s === pr) {
      w = Xe;
      var I = c && x === S && S.visualViewport ? S.visualViewport.width : x[C];
      v -= I - r.width, v *= i ? 1 : -1;
    }
  }
  var M = Object.assign({ position: l }, u && ky), T = d === !0 ? By({ x: v, y: h }) : { x: v, y: h };
  if (v = T.x, h = T.y, i) {
    var k;
    return Object.assign({}, M, (k = {}, k[b] = y ? "0" : "", k[w] = m ? "0" : "", k.transform = (S.devicePixelRatio || 1) <= 1 ? "translate(" + v + "px, " + h + "px)" : "translate3d(" + v + "px, " + h + "px, 0)", k));
  }
  return Object.assign({}, M, (t = {}, t[b] = y ? h + "px" : "", t[w] = m ? v + "px" : "", t.transform = "", t));
}
function Hy(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, s = n.adaptive, a = s === void 0 ? !0 : s, l = n.roundOffsets, i = l === void 0 ? !0 : l, u = { placement: st(t.placement), variation: An(t.placement), popper: t.elements.popper, popperRect: t.rects.popper, gpuAcceleration: o, isFixed: t.options.strategy === "fixed" };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ql(Object.assign({}, u, { offsets: t.modifiersData.popperOffsets, position: t.options.strategy, adaptive: a, roundOffsets: i })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ql(Object.assign({}, u, { offsets: t.modifiersData.arrow, position: "absolute", adaptive: !1, roundOffsets: i })))), t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-placement": t.placement });
}
var vc = { name: "computeStyles", enabled: !0, phase: "beforeWrite", fn: Hy, data: {} }, kr = { passive: !0 };
function Vy(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, s = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, i = rt(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return s && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, kr);
  }), l && i.addEventListener("resize", n.update, kr), function() {
    s && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, kr);
    }), l && i.removeEventListener("resize", n.update, kr);
  };
}
var gc = { name: "eventListeners", enabled: !0, phase: "write", fn: function() {
}, effect: Vy, data: {} }, zy = { left: "right", right: "left", bottom: "top", top: "bottom" };
function Ur(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return zy[t];
  });
}
var Wy = { start: "end", end: "start" };
function Xl(e) {
  return e.replace(/start|end/g, function(t) {
    return Wy[t];
  });
}
function Sa(e) {
  var t = rt(e), n = t.pageXOffset, r = t.pageYOffset;
  return { scrollLeft: n, scrollTop: r };
}
function xa(e) {
  return $n(Kt(e)).left + Sa(e).scrollLeft;
}
function jy(e) {
  var t = rt(e), n = Kt(e), r = t.visualViewport, o = n.clientWidth, s = n.clientHeight, a = 0, l = 0;
  return r && (o = r.width, s = r.height, /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || (a = r.offsetLeft, l = r.offsetTop)), { width: o, height: s, x: a + xa(e), y: l };
}
function Ky(e) {
  var t, n = Kt(e), r = Sa(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, s = sn(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = sn(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + xa(e), i = -r.scrollTop;
  return Ct(o || n).direction === "rtl" && (l += sn(n.clientWidth, o ? o.clientWidth : 0) - s), { width: s, height: a, x: l, y: i };
}
function Oa(e) {
  var t = Ct(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function mc(e) {
  return ["html", "body", "#document"].indexOf(it(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Oa(e) ? e : mc(To(e));
}
function Zn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = mc(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), s = rt(r), a = o ? [s].concat(s.visualViewport || [], Oa(r) ? r : []) : r, l = t.concat(a);
  return o ? l : l.concat(Zn(To(a)));
}
function ws(e) {
  return Object.assign({}, e, { left: e.x, top: e.y, right: e.x + e.width, bottom: e.y + e.height });
}
function Uy(e) {
  var t = $n(e);
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Jl(e, t) {
  return t === uc ? ws(jy(e)) : Tn(t) ? Uy(t) : ws(Ky(Kt(e)));
}
function Gy(e) {
  var t = Zn(To(e)), n = ["absolute", "fixed"].indexOf(Ct(e).position) >= 0, r = n && Ge(e) ? _r(e) : e;
  return Tn(r) ? t.filter(function(o) {
    return Tn(o) && dc(o, r) && it(o) !== "body";
  }) : [];
}
function Yy(e, t, n) {
  var r = t === "clippingParents" ? Gy(e) : [].concat(t), o = [].concat(r, [n]), s = o[0], a = o.reduce(function(l, i) {
    var u = Jl(e, i);
    return l.top = sn(u.top, l.top), l.right = po(u.right, l.right), l.bottom = po(u.bottom, l.bottom), l.left = sn(u.left, l.left), l;
  }, Jl(e, s));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function bc(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? st(r) : null, s = r ? An(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, i;
  switch (o) {
    case ke:
      i = { x: a, y: t.y - n.height };
      break;
    case qe:
      i = { x: a, y: t.y + t.height };
      break;
    case Xe:
      i = { x: t.x + t.width, y: l };
      break;
    case Be:
      i = { x: t.x - n.width, y: l };
      break;
    default:
      i = { x: t.x, y: t.y };
  }
  var u = o ? Ca(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (s) {
      case On:
        i[u] = i[u] - (t[d] / 2 - n[d] / 2);
        break;
      case pr:
        i[u] = i[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return i;
}
function hr(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, s = n.boundary, a = s === void 0 ? my : s, l = n.rootBoundary, i = l === void 0 ? uc : l, u = n.elementContext, d = u === void 0 ? Kn : u, c = n.altBoundary, p = c === void 0 ? !1 : c, v = n.padding, f = v === void 0 ? 0 : v, h = pc(typeof f != "number" ? f : hc(f, wr)), g = d === Kn ? by : Kn, m = e.rects.popper, y = e.elements[p ? g : d], w = Yy(Tn(y) ? y : y.contextElement || Kt(e.elements.popper), a, i), b = $n(e.elements.reference), S = bc({ reference: b, element: m, strategy: "absolute", placement: o }), x = ws(Object.assign({}, m, S)), _ = d === Kn ? x : b, C = { top: w.top - _.top + h.top, bottom: _.bottom - w.bottom + h.bottom, left: w.left - _.left + h.left, right: _.right - w.right + h.right }, N = e.modifiersData.offset;
  if (d === Kn && N) {
    var I = N[o];
    Object.keys(C).forEach(function(M) {
      var T = [Xe, qe].indexOf(M) >= 0 ? 1 : -1, k = [ke, qe].indexOf(M) >= 0 ? "y" : "x";
      C[M] += I[k] * T;
    });
  }
  return C;
}
function qy(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, s = n.rootBoundary, a = n.padding, l = n.flipVariations, i = n.allowedAutoPlacements, u = i === void 0 ? wa : i, d = An(r), c = d ? l ? Gl : Gl.filter(function(f) {
    return An(f) === d;
  }) : wr, p = c.filter(function(f) {
    return u.indexOf(f) >= 0;
  });
  p.length === 0 && (p = c);
  var v = p.reduce(function(f, h) {
    return f[h] = hr(e, { placement: h, boundary: o, rootBoundary: s, padding: a })[st(h)], f;
  }, {});
  return Object.keys(v).sort(function(f, h) {
    return v[f] - v[h];
  });
}
function Xy(e) {
  if (st(e) === ya)
    return [];
  var t = Ur(e);
  return [Xl(e), t, Xl(t)];
}
function Jy(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, s = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, i = n.fallbackPlacements, u = n.padding, d = n.boundary, c = n.rootBoundary, p = n.altBoundary, v = n.flipVariations, f = v === void 0 ? !0 : v, h = n.allowedAutoPlacements, g = t.options.placement, m = st(g), y = m === g, w = i || (y || !f ? [Ur(g)] : Xy(g)), b = [g].concat(w).reduce(function(be, se) {
      return be.concat(st(se) === ya ? qy(t, { placement: se, boundary: d, rootBoundary: c, padding: u, flipVariations: f, allowedAutoPlacements: h }) : se);
    }, []), S = t.rects.reference, x = t.rects.popper, _ = /* @__PURE__ */ new Map(), C = !0, N = b[0], I = 0; I < b.length; I++) {
      var M = b[I], T = st(M), k = An(M) === On, F = [ke, qe].indexOf(T) >= 0, A = F ? "width" : "height", B = hr(t, { placement: M, boundary: d, rootBoundary: c, altBoundary: p, padding: u }), ee = F ? k ? Xe : Be : k ? qe : ke;
      S[A] > x[A] && (ee = Ur(ee));
      var R = Ur(ee), $ = [];
      if (s && $.push(B[T] <= 0), l && $.push(B[ee] <= 0, B[R] <= 0), $.every(function(be) {
        return be;
      })) {
        N = M, C = !1;
        break;
      }
      _.set(M, $);
    }
    if (C)
      for (var V = f ? 3 : 1, te = function(be) {
        var se = b.find(function(Te) {
          var Ee = _.get(Te);
          if (Ee)
            return Ee.slice(0, be).every(function(fe) {
              return fe;
            });
        });
        if (se)
          return N = se, "break";
      }, oe = V; oe > 0; oe--) {
        var de = te(oe);
        if (de === "break")
          break;
      }
    t.placement !== N && (t.modifiersData[r]._skip = !0, t.placement = N, t.reset = !0);
  }
}
var Zy = { name: "flip", enabled: !0, phase: "main", fn: Jy, requiresIfExists: ["offset"], data: { _skip: !1 } };
function Zl(e, t, n) {
  return n === void 0 && (n = { x: 0, y: 0 }), { top: e.top - t.height - n.y, right: e.right - t.width + n.x, bottom: e.bottom - t.height + n.y, left: e.left - t.width - n.x };
}
function Ql(e) {
  return [ke, Xe, qe, Be].some(function(t) {
    return e[t] >= 0;
  });
}
function Qy(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, s = t.modifiersData.preventOverflow, a = hr(t, { elementContext: "reference" }), l = hr(t, { altBoundary: !0 }), i = Zl(a, r), u = Zl(l, o, s), d = Ql(i), c = Ql(u);
  t.modifiersData[n] = { referenceClippingOffsets: i, popperEscapeOffsets: u, isReferenceHidden: d, hasPopperEscaped: c }, t.attributes.popper = Object.assign({}, t.attributes.popper, { "data-popper-reference-hidden": d, "data-popper-escaped": c });
}
var e0 = { name: "hide", enabled: !0, phase: "main", requiresIfExists: ["preventOverflow"], fn: Qy };
function t0(e, t, n) {
  var r = st(e), o = [Be, ke].indexOf(r) >= 0 ? -1 : 1, s = typeof n == "function" ? n(Object.assign({}, t, { placement: e })) : n, a = s[0], l = s[1];
  return a = a || 0, l = (l || 0) * o, [Be, Xe].indexOf(r) >= 0 ? { x: l, y: a } : { x: a, y: l };
}
function n0(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, s = o === void 0 ? [0, 0] : o, a = wa.reduce(function(d, c) {
    return d[c] = t0(c, t.rects, s), d;
  }, {}), l = a[t.placement], i = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += i, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
var r0 = { name: "offset", enabled: !0, phase: "main", requires: ["popperOffsets"], fn: n0 };
function o0(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = bc({ reference: t.rects.reference, element: t.rects.popper, strategy: "absolute", placement: t.placement });
}
var yc = { name: "popperOffsets", enabled: !0, phase: "read", fn: o0, data: {} };
function s0(e) {
  return e === "x" ? "y" : "x";
}
function a0(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, s = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, i = n.boundary, u = n.rootBoundary, d = n.altBoundary, c = n.padding, p = n.tether, v = p === void 0 ? !0 : p, f = n.tetherOffset, h = f === void 0 ? 0 : f, g = hr(t, { boundary: i, rootBoundary: u, padding: c, altBoundary: d }), m = st(t.placement), y = An(t.placement), w = !y, b = Ca(m), S = s0(b), x = t.modifiersData.popperOffsets, _ = t.rects.reference, C = t.rects.popper, N = typeof h == "function" ? h(Object.assign({}, t.rects, { placement: t.placement })) : h, I = typeof N == "number" ? { mainAxis: N, altAxis: N } : Object.assign({ mainAxis: 0, altAxis: 0 }, N), M = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, T = { x: 0, y: 0 };
  if (x) {
    if (s) {
      var k, F = b === "y" ? ke : Be, A = b === "y" ? qe : Xe, B = b === "y" ? "height" : "width", ee = x[b], R = ee + g[F], $ = ee - g[A], V = v ? -C[B] / 2 : 0, te = y === On ? _[B] : C[B], oe = y === On ? -C[B] : -_[B], de = t.elements.arrow, be = v && de ? Ea(de) : { width: 0, height: 0 }, se = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : fc(), Te = se[F], Ee = se[A], fe = Jn(0, _[B], be[B]), dt = w ? _[B] / 2 - V - fe - Te - I.mainAxis : te - fe - Te - I.mainAxis, Bn = w ? -_[B] / 2 + V + fe + Ee + I.mainAxis : oe + fe + Ee + I.mainAxis, Hn = t.elements.arrow && _r(t.elements.arrow), $o = Hn ? b === "y" ? Hn.clientTop || 0 : Hn.clientLeft || 0 : 0, Er = (k = M == null ? void 0 : M[b]) != null ? k : 0, Cr = ee + dt - Er - $o, Ao = ee + Bn - Er, Sr = Jn(v ? po(R, Cr) : R, ee, v ? sn($, Ao) : $);
      x[b] = Sr, T[b] = Sr - ee;
    }
    if (l) {
      var xr, Po = b === "x" ? ke : Be, Ro = b === "x" ? qe : Xe, ft = x[S], pn = S === "y" ? "height" : "width", Or = ft + g[Po], Tr = ft - g[Ro], Vn = [ke, Be].indexOf(m) !== -1, Nr = (xr = M == null ? void 0 : M[S]) != null ? xr : 0, $r = Vn ? Or : ft - _[pn] - C[pn] - Nr + I.altAxis, Io = Vn ? ft + _[pn] + C[pn] - Nr - I.altAxis : Tr, Lo = v && Vn ? Iy($r, ft, Io) : Jn(v ? $r : Or, ft, v ? Io : Tr);
      x[S] = Lo, T[S] = Lo - ft;
    }
    t.modifiersData[r] = T;
  }
}
var l0 = { name: "preventOverflow", enabled: !0, phase: "main", fn: a0, requiresIfExists: ["offset"] };
function i0(e) {
  return { scrollLeft: e.scrollLeft, scrollTop: e.scrollTop };
}
function u0(e) {
  return e === rt(e) || !Ge(e) ? Sa(e) : i0(e);
}
function c0(e) {
  var t = e.getBoundingClientRect(), n = Nn(t.width) / e.offsetWidth || 1, r = Nn(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function d0(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ge(t), o = Ge(t) && c0(t), s = Kt(t), a = $n(e, o), l = { scrollLeft: 0, scrollTop: 0 }, i = { x: 0, y: 0 };
  return (r || !r && !n) && ((it(t) !== "body" || Oa(s)) && (l = u0(t)), Ge(t) ? (i = $n(t, !0), i.x += t.clientLeft, i.y += t.clientTop) : s && (i.x = xa(s))), { x: a.left + l.scrollLeft - i.x, y: a.top + l.scrollTop - i.y, width: a.width, height: a.height };
}
function f0(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(s) {
    t.set(s.name, s);
  });
  function o(s) {
    n.add(s.name);
    var a = [].concat(s.requires || [], s.requiresIfExists || []);
    a.forEach(function(l) {
      if (!n.has(l)) {
        var i = t.get(l);
        i && o(i);
      }
    }), r.push(s);
  }
  return e.forEach(function(s) {
    n.has(s.name) || o(s);
  }), r;
}
function p0(e) {
  var t = f0(e);
  return Ny.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function h0(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function v0(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, { options: Object.assign({}, o.options, r.options), data: Object.assign({}, o.data, r.data) }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var ei = { placement: "bottom", modifiers: [], strategy: "absolute" };
function ti() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Ta(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, s = o === void 0 ? ei : o;
  return function(a, l, i) {
    i === void 0 && (i = s);
    var u = { placement: "bottom", orderedModifiers: [], options: Object.assign({}, ei, s), modifiersData: {}, elements: { reference: a, popper: l }, attributes: {}, styles: {} }, d = [], c = !1, p = { state: u, setOptions: function(h) {
      var g = typeof h == "function" ? h(u.options) : h;
      f(), u.options = Object.assign({}, s, u.options, g), u.scrollParents = { reference: Tn(a) ? Zn(a) : a.contextElement ? Zn(a.contextElement) : [], popper: Zn(l) };
      var m = p0(v0([].concat(r, u.options.modifiers)));
      return u.orderedModifiers = m.filter(function(y) {
        return y.enabled;
      }), v(), p.update();
    }, forceUpdate: function() {
      if (!c) {
        var h = u.elements, g = h.reference, m = h.popper;
        if (ti(g, m)) {
          u.rects = { reference: d0(g, _r(m), u.options.strategy === "fixed"), popper: Ea(m) }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(C) {
            return u.modifiersData[C.name] = Object.assign({}, C.data);
          });
          for (var y = 0; y < u.orderedModifiers.length; y++) {
            if (u.reset === !0) {
              u.reset = !1, y = -1;
              continue;
            }
            var w = u.orderedModifiers[y], b = w.fn, S = w.options, x = S === void 0 ? {} : S, _ = w.name;
            typeof b == "function" && (u = b({ state: u, options: x, name: _, instance: p }) || u);
          }
        }
      }
    }, update: h0(function() {
      return new Promise(function(h) {
        p.forceUpdate(), h(u);
      });
    }), destroy: function() {
      f(), c = !0;
    } };
    if (!ti(a, l))
      return p;
    p.setOptions(i).then(function(h) {
      !c && i.onFirstUpdate && i.onFirstUpdate(h);
    });
    function v() {
      u.orderedModifiers.forEach(function(h) {
        var g = h.name, m = h.options, y = m === void 0 ? {} : m, w = h.effect;
        if (typeof w == "function") {
          var b = w({ state: u, name: g, instance: p, options: y }), S = function() {
          };
          d.push(b || S);
        }
      });
    }
    function f() {
      d.forEach(function(h) {
        return h();
      }), d = [];
    }
    return p;
  };
}
Ta();
var g0 = [gc, yc, vc, cc];
Ta({ defaultModifiers: g0 });
var m0 = [gc, yc, vc, cc, r0, Zy, l0, Dy, e0], wc = Ta({ defaultModifiers: m0 });
const Uo = "focus-trap.focus-after-trapped", Go = "focus-trap.focus-after-released", b0 = "focus-trap.focusout-prevented", ni = {
  cancelable: !0,
  bubbles: !1
}, y0 = {
  cancelable: !0,
  bubbles: !1
}, ri = "focusAfterTrapped", oi = "focusAfterReleased", w0 = Symbol("elFocusTrap"), Na = O(), No = O(0), $a = O(0);
let Br = 0;
const _c = (e) => {
  const t = [], n = document.createTreeWalker(e, NodeFilter.SHOW_ELEMENT, {
    acceptNode: (r) => {
      const o = r.tagName === "INPUT" && r.type === "hidden";
      return r.disabled || r.hidden || o ? NodeFilter.FILTER_SKIP : r.tabIndex >= 0 || r === document.activeElement ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
    }
  });
  for (; n.nextNode(); )
    t.push(n.currentNode);
  return t;
}, si = (e, t) => {
  for (const n of e)
    if (!_0(n, t))
      return n;
}, _0 = (e, t) => {
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
}, E0 = (e) => {
  const t = _c(e), n = si(t, e), r = si(t.reverse(), e);
  return [n, r];
}, C0 = (e) => e instanceof HTMLInputElement && "select" in e, $t = (e, t) => {
  if (e && e.focus) {
    const n = document.activeElement;
    if (e.focus({ preventScroll: !0 }), $a.value = window.performance.now(), e !== n && C0(e) && t) {
      if (e.tagName === "INPUT") {
        e.setSelectionRange(e.value.length, e.value.length);
        return;
      }
      e.select();
    }
  }
};
function ai(e, t) {
  const n = [...e], r = e.indexOf(t);
  return r !== -1 && n.splice(r, 1), n;
}
const S0 = () => {
  let e = [];
  return {
    push: (r) => {
      const o = e[0];
      o && r !== o && o.pause(), e = ai(e, r), e.unshift(r);
    },
    remove: (r) => {
      var o, s;
      e = ai(e, r), (s = (o = e[0]) == null ? void 0 : o.resume) == null || s.call(o);
    }
  };
}, x0 = (e, t = !1) => {
  const n = document.activeElement;
  for (const r of e)
    if ($t(r, t), document.activeElement !== n)
      return;
}, li = S0(), O0 = () => No.value > $a.value, Hr = () => {
  Na.value = "pointer", No.value = window.performance.now();
}, ii = () => {
  Na.value = "keyboard", No.value = window.performance.now();
}, T0 = () => (Fe(() => {
  Br === 0 && (document.addEventListener("mousedown", Hr), document.addEventListener("touchstart", Hr), document.addEventListener("keydown", ii)), Br++;
}), nt(() => {
  Br--, Br <= 0 && (document.removeEventListener("mousedown", Hr), document.removeEventListener("touchstart", Hr), document.removeEventListener("keydown", ii));
}), {
  focusReason: Na,
  lastUserFocusTimestamp: No,
  lastAutomatedFocusTimestamp: $a
}), Vr = (e) => new CustomEvent(b0, {
  ...y0,
  detail: e
}), N0 = U({
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
    ri,
    oi,
    "focusin",
    "focusout",
    "focusout-prevented",
    "release-requested"
  ],
  setup(e, { emit: t }) {
    const n = O();
    let r, o;
    const { focusReason: s } = T0();
    Mb((f) => {
      e.trapped && !a.paused && t("release-requested", f);
    });
    const a = {
      paused: !1,
      pause() {
        this.paused = !0;
      },
      resume() {
        this.paused = !1;
      }
    }, l = (f) => {
      if (!e.loop && !e.trapped || a.paused)
        return;
      const { key: h, altKey: g, ctrlKey: m, metaKey: y, currentTarget: w, shiftKey: b } = f, { loop: S } = e, x = h === co.tab && !g && !m && !y, _ = document.activeElement;
      if (x && _) {
        const C = w, [N, I] = E0(C);
        if (N && I) {
          if (!b && _ === I) {
            const T = Vr({
              focusReason: s.value
            });
            t("focusout-prevented", T), T.defaultPrevented || (f.preventDefault(), S && $t(N, !0));
          } else if (b && [N, C].includes(_)) {
            const T = Vr({
              focusReason: s.value
            });
            t("focusout-prevented", T), T.defaultPrevented || (f.preventDefault(), S && $t(I, !0));
          }
        } else if (_ === C) {
          const T = Vr({
            focusReason: s.value
          });
          t("focusout-prevented", T), T.defaultPrevented || f.preventDefault();
        }
      }
    };
    at(w0, {
      focusTrapRef: n,
      onKeydown: l
    }), q(() => e.focusTrapEl, (f) => {
      f && (n.value = f);
    }, { immediate: !0 }), q([n], ([f], [h]) => {
      f && (f.addEventListener("keydown", l), f.addEventListener("focusin", d), f.addEventListener("focusout", c)), h && (h.removeEventListener("keydown", l), h.removeEventListener("focusin", d), h.removeEventListener("focusout", c));
    });
    const i = (f) => {
      t(ri, f);
    }, u = (f) => t(oi, f), d = (f) => {
      const h = E(n);
      if (!h)
        return;
      const g = f.target, m = f.relatedTarget, y = g && h.contains(g);
      e.trapped || m && h.contains(m) || (r = m), y && t("focusin", f), !a.paused && e.trapped && (y ? o = g : $t(o, !0));
    }, c = (f) => {
      const h = E(n);
      if (!(a.paused || !h))
        if (e.trapped) {
          const g = f.relatedTarget;
          !ca(g) && !h.contains(g) && setTimeout(() => {
            if (!a.paused && e.trapped) {
              const m = Vr({
                focusReason: s.value
              });
              t("focusout-prevented", m), m.defaultPrevented || $t(o, !0);
            }
          }, 0);
        } else {
          const g = f.target;
          g && h.contains(g) || t("focusout", f);
        }
    };
    async function p() {
      await xe();
      const f = E(n);
      if (f) {
        li.push(a);
        const h = f.contains(document.activeElement) ? r : document.activeElement;
        if (r = h, !f.contains(h)) {
          const m = new Event(Uo, ni);
          f.addEventListener(Uo, i), f.dispatchEvent(m), m.defaultPrevented || xe(() => {
            let y = e.focusStartEl;
            ve(y) || ($t(y), document.activeElement !== y && (y = "first")), y === "first" && x0(_c(f), !0), (document.activeElement === h || y === "container") && $t(f);
          });
        }
      }
    }
    function v() {
      const f = E(n);
      if (f) {
        f.removeEventListener(Uo, i);
        const h = new CustomEvent(Go, {
          ...ni,
          detail: {
            focusReason: s.value
          }
        });
        f.addEventListener(Go, u), f.dispatchEvent(h), !h.defaultPrevented && (s.value == "keyboard" || !O0()) && $t(r ?? document.body, !0), f.removeEventListener(Go, i), li.remove(a);
      }
    }
    return Fe(() => {
      e.trapped && p(), q(() => e.trapped, (f) => {
        f ? p() : v();
      });
    }), nt(() => {
      e.trapped && v();
    }), {
      onKeydown: l
    };
  }
});
function $0(e, t, n, r, o, s) {
  return Ae(e.$slots, "default", { handleKeydown: e.onKeydown });
}
var A0 = /* @__PURE__ */ Oe(N0, [["render", $0], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/focus-trap/src/focus-trap.vue"]]);
const P0 = ["fixed", "absolute"], R0 = Ve({
  boundariesPadding: {
    type: Number,
    default: 0
  },
  fallbackPlacements: {
    type: ie(Array),
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
    values: wa,
    default: "bottom"
  },
  popperOptions: {
    type: ie(Object),
    default: () => ({})
  },
  strategy: {
    type: String,
    values: P0,
    default: "absolute"
  }
}), Ec = Ve({
  ...R0,
  id: String,
  style: {
    type: ie([String, Array, Object])
  },
  className: {
    type: ie([String, Array, Object])
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
    type: ie([String, Array, Object])
  },
  popperStyle: {
    type: ie([String, Array, Object])
  },
  referenceEl: {
    type: ie(Object)
  },
  triggerTargetEl: {
    type: ie(Object)
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
}), I0 = {
  mouseenter: (e) => e instanceof MouseEvent,
  mouseleave: (e) => e instanceof MouseEvent,
  focus: () => !0,
  blur: () => !0,
  close: () => !0
}, ui = (e, t) => {
  const { placement: n, strategy: r, popperOptions: o } = e, s = {
    placement: n,
    strategy: r,
    ...o,
    modifiers: F0(e)
  };
  return M0(s, t), D0(s, o == null ? void 0 : o.modifiers), s;
}, L0 = (e) => {
  if (_e)
    return It(e);
};
function F0(e) {
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
function M0(e, { arrowEl: t, arrowOffset: n }) {
  e.modifiers.push({
    name: "arrow",
    options: {
      element: t,
      padding: n ?? 5
    }
  });
}
function D0(e, t) {
  t && (e.modifiers = [...e.modifiers, ...t ?? []]);
}
const k0 = U({
  name: "ElPopperContent"
}), B0 = /* @__PURE__ */ U({
  ...k0,
  props: Ec,
  emits: I0,
  setup(e, { expose: t, emit: n }) {
    const r = e, { popperInstanceRef: o, contentRef: s, triggerRef: a, role: l } = Q(ha, void 0), i = Q(fo, void 0), { nextZIndex: u } = rc(), d = ge("popper"), c = O(), p = O("first"), v = O(), f = O();
    at(Yu, {
      arrowRef: v,
      arrowOffset: f
    }), i && (i.addInputId || i.removeInputId) && at(fo, {
      ...i,
      addInputId: wt,
      removeInputId: wt
    });
    const h = O(r.zIndex || u()), g = O(!1);
    let m;
    const y = P(() => L0(r.referenceEl) || E(a)), w = P(() => [{ zIndex: E(h) }, r.popperStyle]), b = P(() => [
      d.b(),
      d.is("pure", r.pure),
      d.is(r.effect),
      r.popperClass
    ]), S = P(() => l && l.value === "dialog" ? "false" : void 0), x = ({
      referenceEl: F,
      popperContentEl: A,
      arrowEl: B
    }) => {
      const ee = ui(r, {
        arrowEl: B,
        arrowOffset: E(f)
      });
      return wc(F, A, ee);
    }, _ = (F = !0) => {
      var A;
      (A = E(o)) == null || A.update(), F && (h.value = r.zIndex || u());
    }, C = () => {
      var F, A;
      const B = { name: "eventListeners", enabled: r.visible };
      (A = (F = E(o)) == null ? void 0 : F.setOptions) == null || A.call(F, (ee) => ({
        ...ee,
        modifiers: [...ee.modifiers || [], B]
      })), _(!1), r.visible && r.focusOnShow ? g.value = !0 : r.visible === !1 && (g.value = !1);
    }, N = () => {
      n("focus");
    }, I = (F) => {
      var A;
      ((A = F.detail) == null ? void 0 : A.focusReason) !== "pointer" && (p.value = "first", n("blur"));
    }, M = (F) => {
      r.visible && !g.value && (F.target && (p.value = F.target), g.value = !0);
    }, T = (F) => {
      r.trapping || (F.detail.focusReason === "pointer" && F.preventDefault(), g.value = !1);
    }, k = () => {
      g.value = !1, n("close");
    };
    return Fe(() => {
      let F;
      q(y, (A) => {
        var B;
        F == null || F();
        const ee = E(o);
        if ((B = ee == null ? void 0 : ee.destroy) == null || B.call(ee), A) {
          const R = E(c);
          s.value = R, o.value = x({
            referenceEl: A,
            popperContentEl: R,
            arrowEl: E(v)
          }), F = q(() => A.getBoundingClientRect(), () => _(), {
            immediate: !0
          });
        } else
          o.value = void 0;
      }, {
        immediate: !0
      }), q(() => r.triggerTargetEl, (A, B) => {
        m == null || m(), m = void 0;
        const ee = E(A || c.value), R = E(B || c.value);
        fr(ee) && (m = q([l, () => r.ariaLabel, S, () => r.id], ($) => {
          ["role", "aria-label", "aria-modal", "id"].forEach((V, te) => {
            ca($[te]) ? ee.removeAttribute(V) : ee.setAttribute(V, $[te]);
          });
        }, { immediate: !0 })), R !== ee && fr(R) && ["role", "aria-label", "aria-modal", "id"].forEach(($) => {
          R.removeAttribute($);
        });
      }, { immediate: !0 }), q(() => r.visible, C, { immediate: !0 }), q(() => ui(r, {
        arrowEl: E(v),
        arrowOffset: E(f)
      }), (A) => {
        var B;
        return (B = o.value) == null ? void 0 : B.setOptions(A);
      });
    }), nt(() => {
      m == null || m(), m = void 0;
    }), t({
      popperContentRef: c,
      popperInstanceRef: o,
      updatePopper: _,
      contentStyle: w
    }), (F, A) => (D(), K("div", {
      ref_key: "popperContentRef",
      ref: c,
      style: De(E(w)),
      class: j(E(b)),
      tabindex: "-1",
      onMouseenter: A[0] || (A[0] = (B) => F.$emit("mouseenter", B)),
      onMouseleave: A[1] || (A[1] = (B) => F.$emit("mouseleave", B))
    }, [
      L(E(A0), {
        trapped: g.value,
        "trap-on-focus-in": !0,
        "focus-trap-el": c.value,
        "focus-start-el": p.value,
        onFocusAfterTrapped: N,
        onFocusAfterReleased: I,
        onFocusin: M,
        onFocusoutPrevented: T,
        onReleaseRequested: k
      }, {
        default: me(() => [
          Ae(F.$slots, "default")
        ]),
        _: 3
      }, 8, ["trapped", "focus-trap-el", "focus-start-el"])
    ], 38));
  }
});
var H0 = /* @__PURE__ */ Oe(B0, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/popper/src/content.vue"]]);
const V0 = Fn(uy), z0 = ge("tooltip"), Cc = Ve({
  ...Bb,
  ...Ec,
  appendTo: {
    type: ie([String, Object])
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
    type: ie(Boolean),
    default: null
  },
  transition: {
    type: String,
    default: `${z0.namespace.value}-fade-in-linear`
  },
  teleported: {
    type: Boolean,
    default: !0
  },
  disabled: {
    type: Boolean
  }
}), Sc = Ve({
  ...ic,
  disabled: Boolean,
  trigger: {
    type: ie([String, Array]),
    default: "hover"
  },
  triggerKeys: {
    type: ie(Array),
    default: () => [co.enter, co.space]
  }
}), {
  useModelToggleProps: W0,
  useModelToggleEmits: j0,
  useModelToggle: K0
} = Lb("visible"), U0 = Ve({
  ...sc,
  ...W0,
  ...Cc,
  ...Sc,
  ...ac,
  showArrow: {
    type: Boolean,
    default: !0
  }
}), G0 = [
  ...j0,
  "before-show",
  "before-hide",
  "show",
  "hide",
  "open",
  "close"
], Y0 = (e, t) => W(e) ? e.includes(t) : e === t, vn = (e, t, n) => (r) => {
  Y0(E(e), t) && n(r);
}, q0 = U({
  name: "ElTooltipTrigger"
}), X0 = /* @__PURE__ */ U({
  ...q0,
  props: Sc,
  setup(e, { expose: t }) {
    const n = e, r = ge("tooltip"), { controlled: o, id: s, open: a, onOpen: l, onClose: i, onToggle: u } = Q(va, void 0), d = O(null), c = () => {
      if (E(o) || n.disabled)
        return !0;
    }, p = Mt(n, "trigger"), v = gt(c, vn(p, "hover", l)), f = gt(c, vn(p, "hover", i)), h = gt(c, vn(p, "click", (b) => {
      b.button === 0 && u(b);
    })), g = gt(c, vn(p, "focus", l)), m = gt(c, vn(p, "focus", i)), y = gt(c, vn(p, "contextmenu", (b) => {
      b.preventDefault(), u(b);
    })), w = gt(c, (b) => {
      const { code: S } = b;
      n.triggerKeys.includes(S) && (b.preventDefault(), u(b));
    });
    return t({
      triggerRef: d
    }), (b, S) => (D(), we(E(gy), {
      id: E(s),
      "virtual-ref": b.virtualRef,
      open: E(a),
      "virtual-triggering": b.virtualTriggering,
      class: j(E(r).e("trigger")),
      onBlur: E(m),
      onClick: E(h),
      onContextmenu: E(y),
      onFocus: E(g),
      onMouseenter: E(v),
      onMouseleave: E(f),
      onKeydown: E(w)
    }, {
      default: me(() => [
        Ae(b.$slots, "default")
      ]),
      _: 3
    }, 8, ["id", "virtual-ref", "open", "virtual-triggering", "class", "onBlur", "onClick", "onContextmenu", "onFocus", "onMouseenter", "onMouseleave", "onKeydown"]));
  }
});
var J0 = /* @__PURE__ */ Oe(X0, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/trigger.vue"]]);
const Z0 = U({
  name: "ElTooltipContent",
  inheritAttrs: !1
}), Q0 = /* @__PURE__ */ U({
  ...Z0,
  props: Cc,
  setup(e, { expose: t }) {
    const n = e, { selector: r } = tc(), o = O(null), s = O(!1), {
      controlled: a,
      id: l,
      open: i,
      trigger: u,
      onClose: d,
      onOpen: c,
      onShow: p,
      onHide: v,
      onBeforeShow: f,
      onBeforeHide: h
    } = Q(va, void 0), g = P(() => process.env.NODE_ENV === "test" ? !0 : n.persistent);
    nt(() => {
      s.value = !0;
    });
    const m = P(() => E(g) ? !0 : E(i)), y = P(() => n.disabled ? !1 : E(i)), w = P(() => n.appendTo || r.value), b = P(() => {
      var A;
      return (A = n.style) != null ? A : {};
    }), S = P(() => !E(i)), x = () => {
      v();
    }, _ = () => {
      if (E(a))
        return !0;
    }, C = gt(_, () => {
      n.enterable && E(u) === "hover" && c();
    }), N = gt(_, () => {
      E(u) === "hover" && d();
    }), I = () => {
      var A, B;
      (B = (A = o.value) == null ? void 0 : A.updatePopper) == null || B.call(A), f == null || f();
    }, M = () => {
      h == null || h();
    }, T = () => {
      p(), F = Hm(P(() => {
        var A;
        return (A = o.value) == null ? void 0 : A.popperContentRef;
      }), () => {
        if (E(a))
          return;
        E(u) !== "hover" && d();
      });
    }, k = () => {
      n.virtualTriggering || d();
    };
    let F;
    return q(() => E(i), (A) => {
      A || F == null || F();
    }, {
      flush: "post"
    }), q(() => n.content, () => {
      var A, B;
      (B = (A = o.value) == null ? void 0 : A.updatePopper) == null || B.call(A);
    }), t({
      contentRef: o
    }), (A, B) => (D(), we(Uf, {
      disabled: !A.teleported,
      to: E(w)
    }, [
      L(br, {
        name: A.transition,
        onAfterLeave: x,
        onBeforeEnter: I,
        onAfterEnter: T,
        onBeforeLeave: M
      }, {
        default: me(() => [
          E(m) ? $e((D(), we(E(H0), an({
            key: 0,
            id: E(l),
            ref_key: "contentRef",
            ref: o
          }, A.$attrs, {
            "aria-label": A.ariaLabel,
            "aria-hidden": E(S),
            "boundaries-padding": A.boundariesPadding,
            "fallback-placements": A.fallbackPlacements,
            "gpu-acceleration": A.gpuAcceleration,
            offset: A.offset,
            placement: A.placement,
            "popper-options": A.popperOptions,
            strategy: A.strategy,
            effect: A.effect,
            enterable: A.enterable,
            pure: A.pure,
            "popper-class": A.popperClass,
            "popper-style": [A.popperStyle, E(b)],
            "reference-el": A.referenceEl,
            "trigger-target-el": A.triggerTargetEl,
            visible: E(y),
            "z-index": A.zIndex,
            onMouseenter: E(C),
            onMouseleave: E(N),
            onBlur: k,
            onClose: E(d)
          }), {
            default: me(() => [
              s.value ? Le("v-if", !0) : Ae(A.$slots, "default", { key: 0 })
            ]),
            _: 3
          }, 16, ["id", "aria-label", "aria-hidden", "boundaries-padding", "fallback-placements", "gpu-acceleration", "offset", "placement", "popper-options", "strategy", "effect", "enterable", "pure", "popper-class", "popper-style", "reference-el", "trigger-target-el", "visible", "z-index", "onMouseenter", "onMouseleave", "onClose"])), [
            [so, E(y)]
          ]) : Le("v-if", !0)
        ]),
        _: 3
      }, 8, ["name"])
    ], 8, ["disabled", "to"]));
  }
});
var ew = /* @__PURE__ */ Oe(Q0, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/content.vue"]]);
const tw = ["innerHTML"], nw = { key: 1 }, rw = U({
  name: "ElTooltip"
}), ow = /* @__PURE__ */ U({
  ...rw,
  props: U0,
  emits: G0,
  setup(e, { expose: t, emit: n }) {
    const r = e;
    kb();
    const o = Zu(), s = O(), a = O(), l = () => {
      var m;
      const y = E(s);
      y && ((m = y.popperInstanceRef) == null || m.update());
    }, i = O(!1), u = O(), { show: d, hide: c, hasUpdateHandler: p } = K0({
      indicator: i,
      toggleReason: u
    }), { onOpen: v, onClose: f } = Hb({
      showAfter: Mt(r, "showAfter"),
      hideAfter: Mt(r, "hideAfter"),
      open: d,
      close: c
    }), h = P(() => xn(r.visible) && !p.value);
    at(va, {
      controlled: h,
      id: o,
      open: Bs(i),
      trigger: Mt(r, "trigger"),
      onOpen: (m) => {
        v(m);
      },
      onClose: (m) => {
        f(m);
      },
      onToggle: (m) => {
        E(i) ? f(m) : v(m);
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
    }), q(() => r.disabled, (m) => {
      m && i.value && (i.value = !1);
    });
    const g = () => {
      var m, y;
      const w = (y = (m = a.value) == null ? void 0 : m.contentRef) == null ? void 0 : y.popperContentRef;
      return w && w.contains(document.activeElement);
    };
    return Rf(() => i.value && c()), t({
      popperRef: s,
      contentRef: a,
      isFocusInsideContent: g,
      updatePopper: l,
      onOpen: v,
      onClose: f,
      hide: c
    }), (m, y) => (D(), we(E(V0), {
      ref_key: "popperRef",
      ref: s,
      role: m.role
    }, {
      default: me(() => [
        L(J0, {
          disabled: m.disabled,
          trigger: m.trigger,
          "trigger-keys": m.triggerKeys,
          "virtual-ref": m.virtualRef,
          "virtual-triggering": m.virtualTriggering
        }, {
          default: me(() => [
            m.$slots.default ? Ae(m.$slots, "default", { key: 0 }) : Le("v-if", !0)
          ]),
          _: 3
        }, 8, ["disabled", "trigger", "trigger-keys", "virtual-ref", "virtual-triggering"]),
        L(ew, {
          ref_key: "contentRef",
          ref: a,
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
          default: me(() => [
            Ae(m.$slots, "content", {}, () => [
              m.rawContent ? (D(), K("span", {
                key: 0,
                innerHTML: m.content
              }, null, 8, tw)) : (D(), K("span", nw, mt(m.content), 1))
            ]),
            m.showArrow ? (D(), we(E(fy), {
              key: 0,
              "arrow-offset": m.arrowOffset
            }, null, 8, ["arrow-offset"])) : Le("v-if", !0)
          ]),
          _: 3
        }, 8, ["aria-label", "boundaries-padding", "content", "disabled", "effect", "enterable", "fallback-placements", "hide-after", "gpu-acceleration", "offset", "persistent", "popper-class", "popper-style", "placement", "popper-options", "pure", "raw-content", "reference-el", "trigger-target-el", "show-after", "strategy", "teleported", "transition", "virtual-triggering", "z-index", "append-to"])
      ]),
      _: 3
    }, 8, ["role"]));
  }
});
var sw = /* @__PURE__ */ Oe(ow, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/tooltip/src/tooltip.vue"]]);
const aw = Fn(sw), At = /* @__PURE__ */ new Map();
let ci;
_e && (document.addEventListener("mousedown", (e) => ci = e), document.addEventListener("mouseup", (e) => {
  for (const t of At.values())
    for (const { documentHandler: n } of t)
      n(e, ci);
}));
function di(e, t) {
  let n = [];
  return Array.isArray(t.arg) ? n = t.arg : fr(t.arg) && n.push(t.arg), function(r, o) {
    const s = t.instance.popperRef, a = r.target, l = o == null ? void 0 : o.target, i = !t || !t.instance, u = !a || !l, d = e.contains(a) || e.contains(l), c = e === a, p = n.length && n.some((f) => f == null ? void 0 : f.contains(a)) || n.length && n.includes(l), v = s && (s.contains(a) || s.contains(l));
    i || u || d || c || p || v || t.value(r, o);
  };
}
const lw = {
  beforeMount(e, t) {
    At.has(e) || At.set(e, []), At.get(e).push({
      documentHandler: di(e, t),
      bindingFn: t.value
    });
  },
  updated(e, t) {
    At.has(e) || At.set(e, []);
    const n = At.get(e), r = n.findIndex((s) => s.bindingFn === t.oldValue), o = {
      documentHandler: di(e, t),
      bindingFn: t.value
    };
    r >= 0 ? n.splice(r, 1, o) : n.push(o);
  },
  unmounted(e) {
    At.delete(e);
  }
};
var fi = !1, Jt, _s, Es, Gr, Yr, xc, qr, Cs, Ss, xs, Oc, Os, Ts, Tc, Nc;
function Me() {
  if (!fi) {
    fi = !0;
    var e = navigator.userAgent, t = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(e), n = /(Mac OS X)|(Windows)|(Linux)/.exec(e);
    if (Os = /\b(iPhone|iP[ao]d)/.exec(e), Ts = /\b(iP[ao]d)/.exec(e), xs = /Android/i.exec(e), Tc = /FBAN\/\w+;/i.exec(e), Nc = /Mobile/i.exec(e), Oc = !!/Win64/.exec(e), t) {
      Jt = t[1] ? parseFloat(t[1]) : t[5] ? parseFloat(t[5]) : NaN, Jt && document && document.documentMode && (Jt = document.documentMode);
      var r = /(?:Trident\/(\d+.\d+))/.exec(e);
      xc = r ? parseFloat(r[1]) + 4 : Jt, _s = t[2] ? parseFloat(t[2]) : NaN, Es = t[3] ? parseFloat(t[3]) : NaN, Gr = t[4] ? parseFloat(t[4]) : NaN, Gr ? (t = /(?:Chrome\/(\d+\.\d+))/.exec(e), Yr = t && t[1] ? parseFloat(t[1]) : NaN) : Yr = NaN;
    } else
      Jt = _s = Es = Yr = Gr = NaN;
    if (n) {
      if (n[1]) {
        var o = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(e);
        qr = o ? parseFloat(o[1].replace("_", ".")) : !0;
      } else
        qr = !1;
      Cs = !!n[2], Ss = !!n[3];
    } else
      qr = Cs = Ss = !1;
  }
}
var Ns = { ie: function() {
  return Me() || Jt;
}, ieCompatibilityMode: function() {
  return Me() || xc > Jt;
}, ie64: function() {
  return Ns.ie() && Oc;
}, firefox: function() {
  return Me() || _s;
}, opera: function() {
  return Me() || Es;
}, webkit: function() {
  return Me() || Gr;
}, safari: function() {
  return Ns.webkit();
}, chrome: function() {
  return Me() || Yr;
}, windows: function() {
  return Me() || Cs;
}, osx: function() {
  return Me() || qr;
}, linux: function() {
  return Me() || Ss;
}, iphone: function() {
  return Me() || Os;
}, mobile: function() {
  return Me() || Os || Ts || xs || Nc;
}, nativeApp: function() {
  return Me() || Tc;
}, android: function() {
  return Me() || xs;
}, ipad: function() {
  return Me() || Ts;
} }, iw = Ns, zr = !!(typeof window < "u" && window.document && window.document.createElement), uw = { canUseDOM: zr, canUseWorkers: typeof Worker < "u", canUseEventListeners: zr && !!(window.addEventListener || window.attachEvent), canUseViewport: zr && !!window.screen, isInWorker: !zr }, $c = uw, Ac;
$c.canUseDOM && (Ac = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== !0);
function cw(e, t) {
  if (!$c.canUseDOM || t && !("addEventListener" in document))
    return !1;
  var n = "on" + e, r = n in document;
  if (!r) {
    var o = document.createElement("div");
    o.setAttribute(n, "return;"), r = typeof o[n] == "function";
  }
  return !r && Ac && e === "wheel" && (r = document.implementation.hasFeature("Events.wheel", "3.0")), r;
}
var dw = cw, pi = 10, hi = 40, vi = 800;
function Pc(e) {
  var t = 0, n = 0, r = 0, o = 0;
  return "detail" in e && (n = e.detail), "wheelDelta" in e && (n = -e.wheelDelta / 120), "wheelDeltaY" in e && (n = -e.wheelDeltaY / 120), "wheelDeltaX" in e && (t = -e.wheelDeltaX / 120), "axis" in e && e.axis === e.HORIZONTAL_AXIS && (t = n, n = 0), r = t * pi, o = n * pi, "deltaY" in e && (o = e.deltaY), "deltaX" in e && (r = e.deltaX), (r || o) && e.deltaMode && (e.deltaMode == 1 ? (r *= hi, o *= hi) : (r *= vi, o *= vi)), r && !t && (t = r < 1 ? -1 : 1), o && !n && (n = o < 1 ? -1 : 1), { spinX: t, spinY: n, pixelX: r, pixelY: o };
}
Pc.getEventType = function() {
  return iw.firefox() ? "DOMMouseScroll" : dw("wheel") ? "wheel" : "mousewheel";
};
var fw = Pc;
const pw = function(e, t) {
  if (e && e.addEventListener) {
    const n = function(r) {
      const o = fw(r);
      t && Reflect.apply(t, this, [r, o]);
    };
    e.addEventListener("wheel", n, { passive: !0 });
  }
}, hw = {
  beforeMount(e, t) {
    pw(e, t.value);
  }
}, Rc = {
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
  size: Xu,
  tabindex: [String, Number],
  validateEvent: {
    type: Boolean,
    default: !0
  }
}, Ic = {
  [Oo]: (e) => ve(e) || bt(e) || xn(e),
  change: (e) => ve(e) || bt(e) || xn(e)
}, vw = ({
  model: e,
  isChecked: t
}) => {
  const n = Q(Mn, void 0), r = P(() => {
    var s, a;
    const l = (s = n == null ? void 0 : n.max) == null ? void 0 : s.value, i = (a = n == null ? void 0 : n.min) == null ? void 0 : a.value;
    return !uo(l) && e.value.length >= l && !t.value || !uo(i) && e.value.length <= i && t.value;
  });
  return {
    isDisabled: xb(P(() => (n == null ? void 0 : n.disabled.value) || r.value)),
    isLimitDisabled: r
  };
}, gw = (e, {
  model: t,
  isLimitExceeded: n,
  hasOwnLabel: r,
  isDisabled: o,
  isLabeledByFormItem: s
}) => {
  const a = Q(Mn, void 0), { formItem: l } = ma(), { emit: i } = ce();
  function u(f) {
    var h, g;
    return f === e.trueLabel || f === !0 ? (h = e.trueLabel) != null ? h : !0 : (g = e.falseLabel) != null ? g : !1;
  }
  function d(f, h) {
    i("change", u(f), h);
  }
  function c(f) {
    if (n.value)
      return;
    const h = f.target;
    i("change", u(h.checked), f);
  }
  async function p(f) {
    n.value || !r.value && !o.value && s.value && (f.composedPath().some((m) => m.tagName === "LABEL") || (t.value = u([!1, e.falseLabel].includes(t.value)), await xe(), d(t.value, f)));
  }
  const v = P(() => (a == null ? void 0 : a.validateEvent) || e.validateEvent);
  return q(() => e.modelValue, () => {
    v.value && (l == null || l.validate("change").catch((f) => Et(f)));
  }), {
    handleChange: c,
    onClickRoot: p
  };
}, mw = (e) => {
  const t = O(!1), { emit: n } = ce(), r = Q(Mn, void 0), o = P(() => uo(r) === !1), s = O(!1);
  return {
    model: P({
      get() {
        var l, i;
        return o.value ? (l = r == null ? void 0 : r.modelValue) == null ? void 0 : l.value : (i = e.modelValue) != null ? i : t.value;
      },
      set(l) {
        var i, u;
        o.value && W(l) ? (s.value = ((i = r == null ? void 0 : r.max) == null ? void 0 : i.value) !== void 0 && l.length > (r == null ? void 0 : r.max.value), s.value === !1 && ((u = r == null ? void 0 : r.changeEvent) == null || u.call(r, l))) : (n(Oo, l), t.value = l);
      }
    }),
    isGroup: o,
    isLimitExceeded: s
  };
}, bw = (e, t, { model: n }) => {
  const r = Q(Mn, void 0), o = O(!1), s = P(() => {
    const u = n.value;
    return xn(u) ? u : W(u) ? ae(e.label) ? u.map(X).some((d) => $m(d, e.label)) : u.map(X).includes(e.label) : u != null ? u === e.trueLabel : !!u;
  }), a = ms(P(() => {
    var u;
    return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
  }), {
    prop: !0
  }), l = ms(P(() => {
    var u;
    return (u = r == null ? void 0 : r.size) == null ? void 0 : u.value;
  })), i = P(() => !!(t.default || e.label));
  return {
    checkboxButtonSize: a,
    isChecked: s,
    isFocused: o,
    checkboxSize: l,
    hasOwnLabel: i
  };
}, yw = (e, { model: t }) => {
  function n() {
    W(t.value) && !t.value.includes(e.label) ? t.value.push(e.label) : t.value = e.trueLabel || !0;
  }
  e.checked && n();
}, Lc = (e, t) => {
  const { formItem: n } = ma(), { model: r, isGroup: o, isLimitExceeded: s } = mw(e), {
    isFocused: a,
    isChecked: l,
    checkboxButtonSize: i,
    checkboxSize: u,
    hasOwnLabel: d
  } = bw(e, t, { model: r }), { isDisabled: c } = vw({ model: r, isChecked: l }), { inputId: p, isLabeledByFormItem: v } = Qu(e, {
    formItemContext: n,
    disableIdGeneration: d,
    disableIdManagement: o
  }), { handleChange: f, onClickRoot: h } = gw(e, {
    model: r,
    isLimitExceeded: s,
    hasOwnLabel: d,
    isDisabled: c,
    isLabeledByFormItem: v
  });
  return yw(e, { model: r }), {
    inputId: p,
    isLabeledByFormItem: v,
    isChecked: l,
    isDisabled: c,
    isFocused: a,
    checkboxButtonSize: i,
    checkboxSize: u,
    hasOwnLabel: d,
    model: r,
    handleChange: f,
    onClickRoot: h
  };
}, ww = ["tabindex", "role", "aria-checked"], _w = ["id", "aria-hidden", "name", "tabindex", "disabled", "true-value", "false-value"], Ew = ["id", "aria-hidden", "disabled", "value", "name", "tabindex"], Cw = U({
  name: "ElCheckbox"
}), Sw = /* @__PURE__ */ U({
  ...Cw,
  props: Rc,
  emits: Ic,
  setup(e) {
    const t = e, n = Eu(), {
      inputId: r,
      isLabeledByFormItem: o,
      isChecked: s,
      isDisabled: a,
      isFocused: l,
      checkboxSize: i,
      hasOwnLabel: u,
      model: d,
      handleChange: c,
      onClickRoot: p
    } = Lc(t, n), v = ge("checkbox");
    return (f, h) => (D(), we(qs(!E(u) && E(o) ? "span" : "label"), {
      class: j([
        E(v).b(),
        E(v).m(E(i)),
        E(v).is("disabled", E(a)),
        E(v).is("bordered", f.border),
        E(v).is("checked", E(s))
      ]),
      "aria-controls": f.indeterminate ? f.controls : null,
      onClick: E(p)
    }, {
      default: me(() => [
        pe("span", {
          class: j([
            E(v).e("input"),
            E(v).is("disabled", E(a)),
            E(v).is("checked", E(s)),
            E(v).is("indeterminate", f.indeterminate),
            E(v).is("focus", E(l))
          ]),
          tabindex: f.indeterminate ? 0 : void 0,
          role: f.indeterminate ? "checkbox" : void 0,
          "aria-checked": f.indeterminate ? "mixed" : void 0
        }, [
          f.trueLabel || f.falseLabel ? $e((D(), K("input", {
            key: 0,
            id: E(r),
            "onUpdate:modelValue": h[0] || (h[0] = (g) => he(d) ? d.value = g : null),
            class: j(E(v).e("original")),
            type: "checkbox",
            "aria-hidden": f.indeterminate ? "true" : "false",
            name: f.name,
            tabindex: f.tabindex,
            disabled: E(a),
            "true-value": f.trueLabel,
            "false-value": f.falseLabel,
            onChange: h[1] || (h[1] = (...g) => E(c) && E(c)(...g)),
            onFocus: h[2] || (h[2] = (g) => l.value = !0),
            onBlur: h[3] || (h[3] = (g) => l.value = !1)
          }, null, 42, _w)), [
            [oo, E(d)]
          ]) : $e((D(), K("input", {
            key: 1,
            id: E(r),
            "onUpdate:modelValue": h[4] || (h[4] = (g) => he(d) ? d.value = g : null),
            class: j(E(v).e("original")),
            type: "checkbox",
            "aria-hidden": f.indeterminate ? "true" : "false",
            disabled: E(a),
            value: f.label,
            name: f.name,
            tabindex: f.tabindex,
            onChange: h[5] || (h[5] = (...g) => E(c) && E(c)(...g)),
            onFocus: h[6] || (h[6] = (g) => l.value = !0),
            onBlur: h[7] || (h[7] = (g) => l.value = !1)
          }, null, 42, Ew)), [
            [oo, E(d)]
          ]),
          pe("span", {
            class: j(E(v).e("inner"))
          }, null, 2)
        ], 10, ww),
        E(u) ? (D(), K("span", {
          key: 0,
          class: j(E(v).e("label"))
        }, [
          Ae(f.$slots, "default"),
          f.$slots.default ? Le("v-if", !0) : (D(), K(Ye, { key: 0 }, [
            In(mt(f.label), 1)
          ], 64))
        ], 2)) : Le("v-if", !0)
      ]),
      _: 3
    }, 8, ["class", "aria-controls", "onClick"]));
  }
});
var xw = /* @__PURE__ */ Oe(Sw, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox.vue"]]);
const Ow = ["name", "tabindex", "disabled", "true-value", "false-value"], Tw = ["name", "tabindex", "disabled", "value"], Nw = U({
  name: "ElCheckboxButton"
}), $w = /* @__PURE__ */ U({
  ...Nw,
  props: Rc,
  emits: Ic,
  setup(e) {
    const t = e, n = Eu(), {
      isFocused: r,
      isChecked: o,
      isDisabled: s,
      checkboxButtonSize: a,
      model: l,
      handleChange: i
    } = Lc(t, n), u = Q(Mn, void 0), d = ge("checkbox"), c = P(() => {
      var p, v, f, h;
      const g = (v = (p = u == null ? void 0 : u.fill) == null ? void 0 : p.value) != null ? v : "";
      return {
        backgroundColor: g,
        borderColor: g,
        color: (h = (f = u == null ? void 0 : u.textColor) == null ? void 0 : f.value) != null ? h : "",
        boxShadow: g ? `-1px 0 0 0 ${g}` : void 0
      };
    });
    return (p, v) => (D(), K("label", {
      class: j([
        E(d).b("button"),
        E(d).bm("button", E(a)),
        E(d).is("disabled", E(s)),
        E(d).is("checked", E(o)),
        E(d).is("focus", E(r))
      ])
    }, [
      p.trueLabel || p.falseLabel ? $e((D(), K("input", {
        key: 0,
        "onUpdate:modelValue": v[0] || (v[0] = (f) => he(l) ? l.value = f : null),
        class: j(E(d).be("button", "original")),
        type: "checkbox",
        name: p.name,
        tabindex: p.tabindex,
        disabled: E(s),
        "true-value": p.trueLabel,
        "false-value": p.falseLabel,
        onChange: v[1] || (v[1] = (...f) => E(i) && E(i)(...f)),
        onFocus: v[2] || (v[2] = (f) => r.value = !0),
        onBlur: v[3] || (v[3] = (f) => r.value = !1)
      }, null, 42, Ow)), [
        [oo, E(l)]
      ]) : $e((D(), K("input", {
        key: 1,
        "onUpdate:modelValue": v[4] || (v[4] = (f) => he(l) ? l.value = f : null),
        class: j(E(d).be("button", "original")),
        type: "checkbox",
        name: p.name,
        tabindex: p.tabindex,
        disabled: E(s),
        value: p.label,
        onChange: v[5] || (v[5] = (...f) => E(i) && E(i)(...f)),
        onFocus: v[6] || (v[6] = (f) => r.value = !0),
        onBlur: v[7] || (v[7] = (f) => r.value = !1)
      }, null, 42, Tw)), [
        [oo, E(l)]
      ]),
      p.$slots.default || p.label ? (D(), K("span", {
        key: 2,
        class: j(E(d).be("button", "inner")),
        style: De(E(o) ? E(c) : void 0)
      }, [
        Ae(p.$slots, "default", {}, () => [
          In(mt(p.label), 1)
        ])
      ], 6)) : Le("v-if", !0)
    ], 2));
  }
});
var Fc = /* @__PURE__ */ Oe($w, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-button.vue"]]);
const Aw = Ve({
  modelValue: {
    type: ie(Array),
    default: () => []
  },
  disabled: Boolean,
  min: Number,
  max: Number,
  size: Xu,
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
}), Pw = {
  [Oo]: (e) => W(e),
  change: (e) => W(e)
}, Rw = U({
  name: "ElCheckboxGroup"
}), Iw = /* @__PURE__ */ U({
  ...Rw,
  props: Aw,
  emits: Pw,
  setup(e, { emit: t }) {
    const n = e, r = ge("checkbox"), { formItem: o } = ma(), { inputId: s, isLabeledByFormItem: a } = Qu(n, {
      formItemContext: o
    }), l = async (u) => {
      t(Oo, u), await xe(), t("change", u);
    }, i = P({
      get() {
        return n.modelValue;
      },
      set(u) {
        l(u);
      }
    });
    return at(Mn, {
      ...Im(Gi(n), [
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
    }), q(() => n.modelValue, () => {
      n.validateEvent && (o == null || o.validate("change").catch((u) => Et(u)));
    }), (u, d) => {
      var c;
      return D(), we(qs(u.tag), {
        id: E(s),
        class: j(E(r).b("group")),
        role: "group",
        "aria-label": E(a) ? void 0 : u.label || "checkbox-group",
        "aria-labelledby": E(a) ? (c = E(o)) == null ? void 0 : c.labelId : void 0
      }, {
        default: me(() => [
          Ae(u.$slots, "default")
        ]),
        _: 3
      }, 8, ["id", "class", "aria-label", "aria-labelledby"]);
    };
  }
});
var Mc = /* @__PURE__ */ Oe(Iw, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/checkbox/src/checkbox-group.vue"]]);
const Pn = Fn(xw, {
  CheckboxButton: Fc,
  CheckboxGroup: Mc
});
fa(Fc);
fa(Mc);
var Lw = /["'&<>]/, Fw = Mw;
function Mw(e) {
  var t = "" + e, n = Lw.exec(t);
  if (!n)
    return t;
  var r, o = "", s = 0, a = 0;
  for (s = n.index; s < t.length; s++) {
    switch (t.charCodeAt(s)) {
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
    a !== s && (o += t.substring(a, s)), a = s + 1, o += r;
  }
  return a !== s ? o + t.substring(a, s) : o;
}
const Yo = function(e) {
  var t;
  return (t = e.target) == null ? void 0 : t.closest("td");
}, gi = function(e) {
  return e !== null && typeof e == "object";
}, Dw = function(e, t, n, r, o) {
  if (!t && !r && (!o || Array.isArray(o) && !o.length))
    return e;
  typeof n == "string" ? n = n === "descending" ? -1 : 1 : n = n && n < 0 ? -1 : 1;
  const s = r ? null : function(l, i) {
    return o ? (Array.isArray(o) || (o = [o]), o.map((u) => typeof u == "string" ? dr(l, u) : u(l, i, e))) : (t !== "$key" && gi(l) && "$value" in l && (l = l.$value), [gi(l) ? dr(l, t) : l]);
  }, a = function(l, i) {
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
    key: s ? s(l, i) : null
  })).sort((l, i) => {
    let u = a(l, i);
    return u || (u = l.index - i.index), u * +n;
  }).map((l) => l.value);
}, Dc = function(e, t) {
  let n = null;
  return e.columns.forEach((r) => {
    r.id === t && (n = r);
  }), n;
}, kw = function(e, t) {
  let n = null;
  for (let r = 0; r < e.columns.length; r++) {
    const o = e.columns[r];
    if (o.columnKey === t) {
      n = o;
      break;
    }
  }
  return n || zu("ElTable", `No column matching with column-key: ${t}`), n;
}, mi = function(e, t, n) {
  const r = (t.className || "").match(new RegExp(`${n}-table_[^\\s]+`, "gm"));
  return r ? Dc(e, r[0]) : null;
}, Se = (e, t) => {
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
}, Qt = function(e, t) {
  const n = {};
  return (e || []).forEach((r, o) => {
    n[Se(r, t)] = { row: r, index: o };
  }), n;
};
function Bw(e, t) {
  const n = {};
  let r;
  for (r in e)
    n[r] = e[r];
  for (r in t)
    if (re(t, r)) {
      const o = t[r];
      typeof o < "u" && (n[r] = o);
    }
  return n;
}
function Aa(e) {
  return e === "" || e !== void 0 && (e = Number.parseInt(e, 10), Number.isNaN(e) && (e = "")), e;
}
function kc(e) {
  return e === "" || e !== void 0 && (e = Aa(e), Number.isNaN(e) && (e = 80)), e;
}
function Hw(e) {
  return typeof e == "number" ? e : typeof e == "string" ? /^\d+(?:px)?$/.test(e) ? Number.parseInt(e, 10) : e : null;
}
function Vw(...e) {
  return e.length === 0 ? (t) => t : e.length === 1 ? e[0] : e.reduce((t, n) => (...r) => t(n(...r)));
}
function Qn(e, t, n) {
  let r = !1;
  const o = e.indexOf(t), s = o !== -1, a = (l) => {
    l === "add" ? e.push(t) : e.splice(o, 1), r = !0, W(t.children) && t.children.forEach((i) => {
      Qn(e, i, n ?? !s);
    });
  };
  return xn(n) ? n && !s ? a("add") : !n && s && a("remove") : a(s ? "remove" : "add"), r;
}
function zw(e, t, n = "children", r = "hasChildren") {
  const o = (a) => !(Array.isArray(a) && a.length);
  function s(a, l, i) {
    t(a, l, i), l.forEach((u) => {
      if (u[r]) {
        t(u, null, i + 1);
        return;
      }
      const d = u[n];
      o(d) || s(u, d, i + 1);
    });
  }
  e.forEach((a) => {
    if (a[r]) {
      t(a, null, 0);
      return;
    }
    const l = a[n];
    o(l) || s(a, l, 0);
  });
}
let vt;
function Ww(e, t, n, r, o) {
  const { nextZIndex: s } = rc(), a = e == null ? void 0 : e.dataset.prefix, l = e == null ? void 0 : e.querySelector(`.${a}-scrollbar__wrap`);
  function i() {
    const f = o === "light", h = document.createElement("div");
    return h.className = `${a}-popper ${f ? "is-light" : "is-dark"}`, n = Fw(n), h.innerHTML = n, h.style.zIndex = String(s()), e == null || e.appendChild(h), h;
  }
  function u() {
    const f = document.createElement("div");
    return f.className = `${a}-popper__arrow`, f;
  }
  function d() {
    c && c.update();
  }
  vt == null || vt(), vt = () => {
    try {
      c && c.destroy(), p && (e == null || e.removeChild(p)), t.removeEventListener("mouseenter", d), t.removeEventListener("mouseleave", vt), l == null || l.removeEventListener("scroll", vt), vt = void 0;
    } catch {
    }
  };
  let c = null;
  const p = i(), v = u();
  return p.appendChild(v), c = wc(t, p, {
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
          element: v,
          padding: 10
        }
      }
    ],
    ...r
  }), t.addEventListener("mouseenter", d), t.addEventListener("mouseleave", vt), l == null || l.addEventListener("scroll", vt), c;
}
function Bc(e) {
  return e.children ? Tm(e.children, Bc) : [e];
}
function bi(e, t) {
  return e + t.colSpan;
}
const Hc = (e, t, n, r) => {
  let o = 0, s = e;
  const a = n.states.columns.value;
  if (r) {
    const i = Bc(r[e]);
    o = a.slice(0, a.indexOf(i[0])).reduce(bi, 0), s = o + i.reduce(bi, 0) - 1;
  } else
    o = e;
  let l;
  switch (t) {
    case "left":
      s < n.states.fixedLeafColumnsLength.value && (l = "left");
      break;
    case "right":
      o >= a.length - n.states.rightFixedLeafColumnsLength.value && (l = "right");
      break;
    default:
      s < n.states.fixedLeafColumnsLength.value ? l = "left" : o >= a.length - n.states.rightFixedLeafColumnsLength.value && (l = "right");
  }
  return l ? {
    direction: l,
    start: o,
    after: s
  } : {};
}, Pa = (e, t, n, r, o, s = 0) => {
  const a = [], { direction: l, start: i, after: u } = Hc(t, n, r, o);
  if (l) {
    const d = l === "left";
    a.push(`${e}-fixed-column--${l}`), d && u + s === r.states.fixedLeafColumnsLength.value - 1 ? a.push("is-last-column") : !d && i - s === r.states.columns.value.length - r.states.rightFixedLeafColumnsLength.value && a.push("is-first-column");
  }
  return a;
};
function yi(e, t) {
  return e + (t.realWidth === null || Number.isNaN(t.realWidth) ? Number(t.width) : t.realWidth);
}
const Ra = (e, t, n, r) => {
  const {
    direction: o,
    start: s = 0,
    after: a = 0
  } = Hc(e, t, n, r);
  if (!o)
    return;
  const l = {}, i = o === "left", u = n.states.columns.value;
  return i ? l.left = u.slice(0, s).reduce(yi, 0) : l.right = u.slice(a + 1).reverse().reduce(yi, 0), l;
}, Rn = (e, t) => {
  e && (Number.isNaN(e[t]) || (e[t] = `${e[t]}px`));
};
function jw(e) {
  const t = ce(), n = O(!1), r = O([]);
  return {
    updateExpandRows: () => {
      const i = e.data.value || [], u = e.rowKey.value;
      if (n.value)
        r.value = i.slice();
      else if (u) {
        const d = Qt(r.value, u);
        r.value = i.reduce((c, p) => {
          const v = Se(p, u);
          return d[v] && c.push(p), c;
        }, []);
      } else
        r.value = [];
    },
    toggleRowExpansion: (i, u) => {
      Qn(r.value, i, u) && t.emit("expand-change", i, r.value.slice());
    },
    setExpandRowKeys: (i) => {
      t.store.assertRowKey();
      const u = e.data.value || [], d = e.rowKey.value, c = Qt(u, d);
      r.value = i.reduce((p, v) => {
        const f = c[v];
        return f && p.push(f.row), p;
      }, []);
    },
    isRowExpanded: (i) => {
      const u = e.rowKey.value;
      return u ? !!Qt(r.value, u)[Se(i, u)] : r.value.includes(i);
    },
    states: {
      expandRows: r,
      defaultExpandAll: n
    }
  };
}
function Kw(e) {
  const t = ce(), n = O(null), r = O(null), o = (u) => {
    t.store.assertRowKey(), n.value = u, a(u);
  }, s = () => {
    n.value = null;
  }, a = (u) => {
    const { data: d, rowKey: c } = e;
    let p = null;
    c.value && (p = (E(d) || []).find((v) => Se(v, c.value) === u)), r.value = p, t.emit("current-change", r.value, null);
  };
  return {
    setCurrentRowKey: o,
    restoreCurrentRowKey: s,
    setCurrentRowByKey: a,
    updateCurrentRow: (u) => {
      const d = r.value;
      if (u && u !== d) {
        r.value = u, t.emit("current-change", r.value, d);
        return;
      }
      !u && d && (r.value = null, t.emit("current-change", null, d));
    },
    updateCurrentRowData: () => {
      const u = e.rowKey.value, d = e.data.value || [], c = r.value;
      if (!d.includes(c) && c) {
        if (u) {
          const p = Se(c, u);
          a(p);
        } else
          r.value = null;
        r.value === null && t.emit("current-change", null, c);
      } else
        n.value && (a(n.value), s());
    },
    states: {
      _currentRowKey: n,
      currentRow: r
    }
  };
}
function Uw(e) {
  const t = O([]), n = O({}), r = O(16), o = O(!1), s = O({}), a = O("hasChildren"), l = O("children"), i = ce(), u = P(() => {
    if (!e.rowKey.value)
      return {};
    const m = e.data.value || [];
    return c(m);
  }), d = P(() => {
    const m = e.rowKey.value, y = Object.keys(s.value), w = {};
    return y.length && y.forEach((b) => {
      if (s.value[b].length) {
        const S = { children: [] };
        s.value[b].forEach((x) => {
          const _ = Se(x, m);
          S.children.push(_), x[a.value] && !w[_] && (w[_] = { children: [] });
        }), w[b] = S;
      }
    }), w;
  }), c = (m) => {
    const y = e.rowKey.value, w = {};
    return zw(m, (b, S, x) => {
      const _ = Se(b, y);
      Array.isArray(S) ? w[_] = {
        children: S.map((C) => Se(C, y)),
        level: x
      } : o.value && (w[_] = {
        children: [],
        lazy: !0,
        level: x
      });
    }, l.value, a.value), w;
  }, p = (m = !1, y = ((w) => (w = i.store) == null ? void 0 : w.states.defaultExpandAll.value)()) => {
    var w;
    const b = u.value, S = d.value, x = Object.keys(b), _ = {};
    if (x.length) {
      const C = E(n), N = [], I = (T, k) => {
        if (m)
          return t.value ? y || t.value.includes(k) : !!(y || T != null && T.expanded);
        {
          const F = y || t.value && t.value.includes(k);
          return !!(T != null && T.expanded || F);
        }
      };
      x.forEach((T) => {
        const k = C[T], F = { ...b[T] };
        if (F.expanded = I(k, T), F.lazy) {
          const { loaded: A = !1, loading: B = !1 } = k || {};
          F.loaded = !!A, F.loading = !!B, N.push(T);
        }
        _[T] = F;
      });
      const M = Object.keys(S);
      o.value && M.length && N.length && M.forEach((T) => {
        const k = C[T], F = S[T].children;
        if (N.includes(T)) {
          if (_[T].children.length !== 0)
            throw new Error("[ElTable]children must be an empty array.");
          _[T].children = F;
        } else {
          const { loaded: A = !1, loading: B = !1 } = k || {};
          _[T] = {
            lazy: !0,
            loaded: !!A,
            loading: !!B,
            expanded: I(k, T),
            children: F,
            level: ""
          };
        }
      });
    }
    n.value = _, (w = i.store) == null || w.updateTableScrollY();
  };
  q(() => t.value, () => {
    p(!0);
  }), q(() => u.value, () => {
    p();
  }), q(() => d.value, () => {
    p();
  });
  const v = (m) => {
    t.value = m, p();
  }, f = (m, y) => {
    i.store.assertRowKey();
    const w = e.rowKey.value, b = Se(m, w), S = b && n.value[b];
    if (b && S && "expanded" in S) {
      const x = S.expanded;
      y = typeof y > "u" ? !S.expanded : y, n.value[b].expanded = y, x !== y && i.emit("expand-change", m, y), i.store.updateTableScrollY();
    }
  }, h = (m) => {
    i.store.assertRowKey();
    const y = e.rowKey.value, w = Se(m, y), b = n.value[w];
    o.value && b && "loaded" in b && !b.loaded ? g(m, w, b) : f(m, void 0);
  }, g = (m, y, w) => {
    const { load: b } = i.props;
    b && !n.value[y].loaded && (n.value[y].loading = !0, b(m, w, (S) => {
      if (!Array.isArray(S))
        throw new TypeError("[ElTable] data must be an array");
      n.value[y].loading = !1, n.value[y].loaded = !0, n.value[y].expanded = !0, S.length && (s.value[y] = S), i.emit("expand-change", m, !0);
    }));
  };
  return {
    loadData: g,
    loadOrToggle: h,
    toggleTreeExpansion: f,
    updateTreeExpandKeys: v,
    updateTreeData: p,
    normalize: c,
    states: {
      expandRowKeys: t,
      treeData: n,
      indent: r,
      lazy: o,
      lazyTreeNodeMap: s,
      lazyColumnIdentifier: a,
      childrenColumnName: l
    }
  };
}
const Gw = (e, t) => {
  const n = t.sortingColumn;
  return !n || typeof n.sortable == "string" ? e : Dw(e, t.sortProp, t.sortOrder, n.sortMethod, n.sortBy);
}, Xr = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.children ? t.push.apply(t, Xr(n.children)) : t.push(n);
  }), t;
};
function Yw() {
  var e;
  const t = ce(), { size: n } = Gi((e = t.proxy) == null ? void 0 : e.$props), r = O(null), o = O([]), s = O([]), a = O(!1), l = O([]), i = O([]), u = O([]), d = O([]), c = O([]), p = O([]), v = O([]), f = O([]), h = O(0), g = O(0), m = O(0), y = O(!1), w = O([]), b = O(!1), S = O(!1), x = O(null), _ = O({}), C = O(null), N = O(null), I = O(null), M = O(null), T = O(null);
  q(o, () => t.state && B(!1), {
    deep: !0
  });
  const k = () => {
    if (!r.value)
      throw new Error("[ElTable] prop row-key is required");
  }, F = (H) => {
    var z;
    (z = H.children) == null || z.forEach((Z) => {
      Z.fixed = H.fixed, F(Z);
    });
  }, A = () => {
    l.value.forEach((ne) => {
      F(ne);
    }), d.value = l.value.filter((ne) => ne.fixed === !0 || ne.fixed === "left"), c.value = l.value.filter((ne) => ne.fixed === "right"), d.value.length > 0 && l.value[0] && l.value[0].type === "selection" && !l.value[0].fixed && (l.value[0].fixed = !0, d.value.unshift(l.value[0]));
    const H = l.value.filter((ne) => !ne.fixed);
    i.value = [].concat(d.value).concat(H).concat(c.value);
    const z = Xr(H), Z = Xr(d.value), J = Xr(c.value);
    h.value = z.length, g.value = Z.length, m.value = J.length, u.value = [].concat(Z).concat(z).concat(J), a.value = d.value.length > 0 || c.value.length > 0;
  }, B = (H, z = !1) => {
    H && A(), z ? t.state.doLayout() : t.state.debouncedUpdateLayout();
  }, ee = (H) => w.value.includes(H), R = () => {
    y.value = !1, w.value.length && (w.value = [], t.emit("selection-change", []));
  }, $ = () => {
    let H;
    if (r.value) {
      H = [];
      const z = Qt(w.value, r.value), Z = Qt(o.value, r.value);
      for (const J in z)
        re(z, J) && !Z[J] && H.push(z[J].row);
    } else
      H = w.value.filter((z) => !o.value.includes(z));
    if (H.length) {
      const z = w.value.filter((Z) => !H.includes(Z));
      w.value = z, t.emit("selection-change", z.slice());
    }
  }, V = () => (w.value || []).slice(), te = (H, z = void 0, Z = !0) => {
    if (Qn(w.value, H, z)) {
      const ne = (w.value || []).slice();
      Z && t.emit("select", ne, H), t.emit("selection-change", ne);
    }
  }, oe = () => {
    var H, z;
    const Z = S.value ? !y.value : !(y.value || w.value.length);
    y.value = Z;
    let J = !1, ne = 0;
    const Ne = (z = (H = t == null ? void 0 : t.store) == null ? void 0 : H.states) == null ? void 0 : z.rowKey.value;
    o.value.forEach((We, hn) => {
      const pt = hn + ne;
      x.value ? x.value.call(null, We, pt) && Qn(w.value, We, Z) && (J = !0) : Qn(w.value, We, Z) && (J = !0), ne += se(Se(We, Ne));
    }), J && t.emit("selection-change", w.value ? w.value.slice() : []), t.emit("select-all", w.value);
  }, de = () => {
    const H = Qt(w.value, r.value);
    o.value.forEach((z) => {
      const Z = Se(z, r.value), J = H[Z];
      J && (w.value[J.index] = z);
    });
  }, be = () => {
    var H, z, Z;
    if (((H = o.value) == null ? void 0 : H.length) === 0) {
      y.value = !1;
      return;
    }
    let J;
    r.value && (J = Qt(w.value, r.value));
    const ne = function(pt) {
      return J ? !!J[Se(pt, r.value)] : w.value.includes(pt);
    };
    let Ne = !0, We = 0, hn = 0;
    for (let pt = 0, sd = (o.value || []).length; pt < sd; pt++) {
      const ad = (Z = (z = t == null ? void 0 : t.store) == null ? void 0 : z.states) == null ? void 0 : Z.rowKey.value, ld = pt + hn, Fo = o.value[pt], id = x.value && x.value.call(null, Fo, ld);
      if (ne(Fo))
        We++;
      else if (!x.value || id) {
        Ne = !1;
        break;
      }
      hn += se(Se(Fo, ad));
    }
    We === 0 && (Ne = !1), y.value = Ne;
  }, se = (H) => {
    var z;
    if (!t || !t.store)
      return 0;
    const { treeData: Z } = t.store.states;
    let J = 0;
    const ne = (z = Z.value[H]) == null ? void 0 : z.children;
    return ne && (J += ne.length, ne.forEach((Ne) => {
      J += se(Ne);
    })), J;
  }, Te = (H, z) => {
    Array.isArray(H) || (H = [H]);
    const Z = {};
    return H.forEach((J) => {
      _.value[J.id] = z, Z[J.columnKey || J.id] = z;
    }), Z;
  }, Ee = (H, z, Z) => {
    N.value && N.value !== H && (N.value.order = null), N.value = H, I.value = z, M.value = Z;
  }, fe = () => {
    let H = E(s);
    Object.keys(_.value).forEach((z) => {
      const Z = _.value[z];
      if (!Z || Z.length === 0)
        return;
      const J = Dc({
        columns: u.value
      }, z);
      J && J.filterMethod && (H = H.filter((ne) => Z.some((Ne) => J.filterMethod.call(null, Ne, ne, J))));
    }), C.value = H;
  }, dt = () => {
    o.value = Gw(C.value, {
      sortingColumn: N.value,
      sortProp: I.value,
      sortOrder: M.value
    });
  }, Bn = (H = void 0) => {
    H && H.filter || fe(), dt();
  }, Hn = (H) => {
    const { tableHeaderRef: z } = t.refs;
    if (!z)
      return;
    const Z = Object.assign({}, z.filterPanels), J = Object.keys(Z);
    if (J.length)
      if (typeof H == "string" && (H = [H]), Array.isArray(H)) {
        const ne = H.map((Ne) => kw({
          columns: u.value
        }, Ne));
        J.forEach((Ne) => {
          const We = ne.find((hn) => hn.id === Ne);
          We && (We.filteredValue = []);
        }), t.store.commit("filterChange", {
          column: ne,
          values: [],
          silent: !0,
          multi: !0
        });
      } else
        J.forEach((ne) => {
          const Ne = u.value.find((We) => We.id === ne);
          Ne && (Ne.filteredValue = []);
        }), _.value = {}, t.store.commit("filterChange", {
          column: {},
          values: [],
          silent: !0
        });
  }, $o = () => {
    N.value && (Ee(null, null, null), t.store.commit("changeSortCondition", {
      silent: !0
    }));
  }, {
    setExpandRowKeys: Er,
    toggleRowExpansion: Cr,
    updateExpandRows: Ao,
    states: Sr,
    isRowExpanded: xr
  } = jw({
    data: o,
    rowKey: r
  }), {
    updateTreeExpandKeys: Po,
    toggleTreeExpansion: Ro,
    updateTreeData: ft,
    loadOrToggle: pn,
    states: Or
  } = Uw({
    data: o,
    rowKey: r
  }), {
    updateCurrentRowData: Tr,
    updateCurrentRow: Vn,
    setCurrentRowKey: Nr,
    states: $r
  } = Kw({
    data: o,
    rowKey: r
  });
  return {
    assertRowKey: k,
    updateColumns: A,
    scheduleLayout: B,
    isSelected: ee,
    clearSelection: R,
    cleanSelection: $,
    getSelectionRows: V,
    toggleRowSelection: te,
    _toggleAllSelection: oe,
    toggleAllSelection: null,
    updateSelectionByRowKey: de,
    updateAllSelected: be,
    updateFilters: Te,
    updateCurrentRow: Vn,
    updateSort: Ee,
    execFilter: fe,
    execSort: dt,
    execQuery: Bn,
    clearFilter: Hn,
    clearSort: $o,
    toggleRowExpansion: Cr,
    setExpandRowKeysAdapter: (H) => {
      Er(H), Po(H);
    },
    setCurrentRowKey: Nr,
    toggleRowExpansionAdapter: (H, z) => {
      u.value.some(({ type: J }) => J === "expand") ? Cr(H, z) : Ro(H, z);
    },
    isRowExpanded: xr,
    updateExpandRows: Ao,
    updateCurrentRowData: Tr,
    loadOrToggle: pn,
    updateTreeData: ft,
    states: {
      tableSize: n,
      rowKey: r,
      data: o,
      _data: s,
      isComplex: a,
      _columns: l,
      originColumns: i,
      columns: u,
      fixedColumns: d,
      rightFixedColumns: c,
      leafColumns: p,
      fixedLeafColumns: v,
      rightFixedLeafColumns: f,
      leafColumnsLength: h,
      fixedLeafColumnsLength: g,
      rightFixedLeafColumnsLength: m,
      isAllSelected: y,
      selection: w,
      reserveSelection: b,
      selectOnIndeterminate: S,
      selectable: x,
      filters: _,
      filteredData: C,
      sortingColumn: N,
      sortProp: I,
      sortOrder: M,
      hoverRow: T,
      ...Sr,
      ...Or,
      ...$r
    }
  };
}
function $s(e, t) {
  return e.map((n) => {
    var r;
    return n.id === t.id ? t : ((r = n.children) != null && r.length && (n.children = $s(n.children, t)), n);
  });
}
function Vc(e) {
  e.forEach((t) => {
    var n, r;
    t.no = (n = t.getColumnIndex) == null ? void 0 : n.call(t), (r = t.children) != null && r.length && Vc(t.children);
  }), e.sort((t, n) => t.no - n.no);
}
function qw() {
  const e = ce(), t = Yw();
  return {
    ns: ge("table"),
    ...t,
    mutations: {
      setData(a, l) {
        const i = E(a._data) !== l;
        a.data.value = l, a._data.value = l, e.store.execQuery(), e.store.updateCurrentRowData(), e.store.updateExpandRows(), e.store.updateTreeData(e.store.states.defaultExpandAll.value), E(a.reserveSelection) ? (e.store.assertRowKey(), e.store.updateSelectionByRowKey()) : i ? e.store.clearSelection() : e.store.cleanSelection(), e.store.updateAllSelected(), e.$ready && e.store.scheduleLayout();
      },
      insertColumn(a, l, i) {
        const u = E(a._columns);
        let d = [];
        i ? (i && !i.children && (i.children = []), i.children.push(l), d = $s(u, i)) : (u.push(l), d = u), Vc(d), a._columns.value = d, l.type === "selection" && (a.selectable.value = l.selectable, a.reserveSelection.value = l.reserveSelection), e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      removeColumn(a, l, i) {
        const u = E(a._columns) || [];
        if (i)
          i.children.splice(i.children.findIndex((d) => d.id === l.id), 1), xe(() => {
            var d;
            ((d = i.children) == null ? void 0 : d.length) === 0 && delete i.children;
          }), a._columns.value = $s(u, i);
        else {
          const d = u.indexOf(l);
          d > -1 && (u.splice(d, 1), a._columns.value = u);
        }
        e.$ready && (e.store.updateColumns(), e.store.scheduleLayout());
      },
      sort(a, l) {
        const { prop: i, order: u, init: d } = l;
        if (i) {
          const c = E(a.columns).find((p) => p.property === i);
          c && (c.order = u, e.store.updateSort(c, i, u), e.store.commit("changeSortCondition", { init: d }));
        }
      },
      changeSortCondition(a, l) {
        const { sortingColumn: i, sortProp: u, sortOrder: d } = a, c = E(i), p = E(u), v = E(d);
        v === null && (a.sortingColumn.value = null, a.sortProp.value = null);
        const f = { filter: !0 };
        e.store.execQuery(f), (!l || !(l.silent || l.init)) && e.emit("sort-change", {
          column: c,
          prop: p,
          order: v
        }), e.store.updateTableScrollY();
      },
      filterChange(a, l) {
        const { column: i, values: u, silent: d } = l, c = e.store.updateFilters(i, u);
        e.store.execQuery(), d || e.emit("filter-change", c), e.store.updateTableScrollY();
      },
      toggleAllSelection() {
        e.store.toggleAllSelection();
      },
      rowSelectedChanged(a, l) {
        e.store.toggleRowSelection(l), e.store.updateAllSelected();
      },
      setHoverRow(a, l) {
        a.hoverRow.value = l;
      },
      setCurrentRow(a, l) {
        e.store.updateCurrentRow(l);
      }
    },
    commit: function(a, ...l) {
      const i = e.store.mutations;
      if (i[a])
        i[a].apply(e, [e.store.states].concat(l));
      else
        throw new Error(`Action not found: ${a}`);
    },
    updateTableScrollY: function() {
      xe(() => e.layout.updateScrollY.apply(e.layout));
    }
  };
}
const er = {
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
function Xw(e, t) {
  if (!e)
    throw new Error("Table is required.");
  const n = qw();
  return n.toggleAllSelection = io(n._toggleAllSelection, 10), Object.keys(er).forEach((r) => {
    zc(Wc(t, r), r, n);
  }), Jw(n, t), n;
}
function Jw(e, t) {
  Object.keys(er).forEach((n) => {
    q(() => Wc(t, n), (r) => {
      zc(r, n, e);
    });
  });
}
function zc(e, t, n) {
  let r = e, o = er[t];
  typeof er[t] == "object" && (o = o.key, r = r || er[t].default), n.states[o].value = r;
}
function Wc(e, t) {
  if (t.includes(".")) {
    const n = t.split(".");
    let r = e;
    return n.forEach((o) => {
      r = r[o];
    }), r;
  } else
    return e[t];
}
class Zw {
  constructor(t) {
    this.observers = [], this.table = null, this.store = null, this.columns = [], this.fit = !0, this.showHeader = !0, this.height = O(null), this.scrollX = O(!1), this.scrollY = O(!1), this.bodyWidth = O(null), this.fixedWidth = O(null), this.rightFixedWidth = O(null), this.gutterWidth = 0;
    for (const n in t)
      re(t, n) && (he(this[n]) ? this[n].value = t[n] : this[n] = t[n]);
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
    if (!_e)
      return;
    const r = this.table.vnode.el;
    if (t = Hw(t), this.height.value = Number(t), !r && (t || t === 0))
      return xe(() => this.setHeight(t, n));
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
    if (!_e)
      return;
    const t = this.fit, n = this.table.vnode.el.clientWidth;
    let r = 0;
    const o = this.getFlattenColumns(), s = o.filter((i) => typeof i.width != "number");
    if (o.forEach((i) => {
      typeof i.width == "number" && i.realWidth && (i.realWidth = null);
    }), s.length > 0 && t) {
      if (o.forEach((i) => {
        r += Number(i.width || i.minWidth || 80);
      }), r <= n) {
        this.scrollX.value = !1;
        const i = n - r;
        if (s.length === 1)
          s[0].realWidth = Number(s[0].minWidth || 80) + i;
        else {
          const u = s.reduce((p, v) => p + Number(v.minWidth || 80), 0), d = i / u;
          let c = 0;
          s.forEach((p, v) => {
            if (v === 0)
              return;
            const f = Math.floor(Number(p.minWidth || 80) * d);
            c += f, p.realWidth = Number(p.minWidth || 80) + f;
          }), s[0].realWidth = Number(s[0].minWidth || 80) + i - c;
        }
      } else
        this.scrollX.value = !0, s.forEach((i) => {
          i.realWidth = Number(i.minWidth);
        });
      this.bodyWidth.value = Math.max(r, n), this.table.state.resizeState.value.width = this.bodyWidth.value;
    } else
      o.forEach((i) => {
        !i.width && !i.minWidth ? i.realWidth = 80 : i.realWidth = Number(i.width || i.minWidth), r += i.realWidth;
      }), this.scrollX.value = r > n, this.bodyWidth.value = r;
    const a = this.store.states.fixedColumns.value;
    if (a.length > 0) {
      let i = 0;
      a.forEach((u) => {
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
      var o, s;
      switch (t) {
        case "columns":
          (o = r.state) == null || o.onColumnsChange(this);
          break;
        case "scrollable":
          (s = r.state) == null || s.onScrollableChange(this);
          break;
        default:
          throw new Error(`Table Layout don't have event ${t}.`);
      }
    });
  }
}
const { CheckboxGroup: Qw } = Pn, e_ = U({
  name: "ElTableFilterPanel",
  components: {
    ElCheckbox: Pn,
    ElCheckboxGroup: Qw,
    ElScrollbar: oc,
    ElTooltip: aw,
    ElIcon: ba,
    ArrowDown: ob,
    ArrowUp: vb
  },
  directives: { ClickOutside: lw },
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
    const t = ce(), { t: n } = ec(), r = ge("table-filter"), o = t == null ? void 0 : t.parent;
    o.filterPanels.value[e.column.id] || (o.filterPanels.value[e.column.id] = t);
    const s = O(!1), a = O(null), l = P(() => e.column && e.column.filters), i = P({
      get: () => {
        var b;
        return (((b = e.column) == null ? void 0 : b.filteredValue) || [])[0];
      },
      set: (b) => {
        u.value && (typeof b < "u" && b !== null ? u.value.splice(0, 1, b) : u.value.splice(0, 1));
      }
    }), u = P({
      get() {
        return e.column ? e.column.filteredValue || [] : [];
      },
      set(b) {
        e.column && e.upDataColumn("filteredValue", b);
      }
    }), d = P(() => e.column ? e.column.filterMultiple : !0), c = (b) => b.value === i.value, p = () => {
      s.value = !1;
    }, v = (b) => {
      b.stopPropagation(), s.value = !s.value;
    }, f = () => {
      s.value = !1;
    }, h = () => {
      y(u.value), p();
    }, g = () => {
      u.value = [], y(u.value), p();
    }, m = (b) => {
      i.value = b, y(typeof b < "u" && b !== null ? u.value : []), p();
    }, y = (b) => {
      e.store.commit("filterChange", {
        column: e.column,
        values: b
      }), e.store.updateAllSelected();
    };
    q(s, (b) => {
      e.column && e.upDataColumn("filterOpened", b);
    }, {
      immediate: !0
    });
    const w = P(() => {
      var b, S;
      return (S = (b = a.value) == null ? void 0 : b.popperRef) == null ? void 0 : S.contentRef;
    });
    return {
      tooltipVisible: s,
      multiple: d,
      filteredValue: u,
      filterValue: i,
      filters: l,
      handleConfirm: h,
      handleReset: g,
      handleSelect: m,
      isActive: c,
      t: n,
      ns: r,
      showFilterPanel: v,
      hideFilterPanel: f,
      popperPaneRef: w,
      tooltip: a
    };
  }
}), t_ = { key: 0 }, n_ = ["disabled"], r_ = ["label", "onClick"];
function o_(e, t, n, r, o, s) {
  const a = Ke("el-checkbox"), l = Ke("el-checkbox-group"), i = Ke("el-scrollbar"), u = Ke("arrow-up"), d = Ke("arrow-down"), c = Ke("el-icon"), p = Ke("el-tooltip"), v = un("click-outside");
  return D(), we(p, {
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
    content: me(() => [
      e.multiple ? (D(), K("div", t_, [
        pe("div", {
          class: j(e.ns.e("content"))
        }, [
          L(i, {
            "wrap-class": e.ns.e("wrap")
          }, {
            default: me(() => [
              L(l, {
                modelValue: e.filteredValue,
                "onUpdate:modelValue": t[0] || (t[0] = (f) => e.filteredValue = f),
                class: j(e.ns.e("checkbox-group"))
              }, {
                default: me(() => [
                  (D(!0), K(Ye, null, rs(e.filters, (f) => (D(), we(a, {
                    key: f.value,
                    label: f.value
                  }, {
                    default: me(() => [
                      In(mt(f.text), 1)
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
        pe("div", {
          class: j(e.ns.e("bottom"))
        }, [
          pe("button", {
            class: j({ [e.ns.is("disabled")]: e.filteredValue.length === 0 }),
            disabled: e.filteredValue.length === 0,
            type: "button",
            onClick: t[1] || (t[1] = (...f) => e.handleConfirm && e.handleConfirm(...f))
          }, mt(e.t("el.table.confirmFilter")), 11, n_),
          pe("button", {
            type: "button",
            onClick: t[2] || (t[2] = (...f) => e.handleReset && e.handleReset(...f))
          }, mt(e.t("el.table.resetFilter")), 1)
        ], 2)
      ])) : (D(), K("ul", {
        key: 1,
        class: j(e.ns.e("list"))
      }, [
        pe("li", {
          class: j([
            e.ns.e("list-item"),
            {
              [e.ns.is("active")]: e.filterValue === void 0 || e.filterValue === null
            }
          ]),
          onClick: t[3] || (t[3] = (f) => e.handleSelect(null))
        }, mt(e.t("el.table.clearFilter")), 3),
        (D(!0), K(Ye, null, rs(e.filters, (f) => (D(), K("li", {
          key: f.value,
          class: j([e.ns.e("list-item"), e.ns.is("active", e.isActive(f))]),
          label: f.value,
          onClick: (h) => e.handleSelect(f.value)
        }, mt(f.text), 11, r_))), 128))
      ], 2))
    ]),
    default: me(() => [
      $e((D(), K("span", {
        class: j([
          `${e.ns.namespace.value}-table__column-filter-trigger`,
          `${e.ns.namespace.value}-none-outline`
        ]),
        onClick: t[4] || (t[4] = (...f) => e.showFilterPanel && e.showFilterPanel(...f))
      }, [
        L(c, null, {
          default: me(() => [
            e.column.filterOpened ? (D(), we(u, { key: 0 })) : (D(), we(d, { key: 1 }))
          ]),
          _: 1
        })
      ], 2)), [
        [v, e.hideFilterPanel, e.popperPaneRef]
      ])
    ]),
    _: 1
  }, 8, ["visible", "placement", "popper-class"]);
}
var s_ = /* @__PURE__ */ Oe(e_, [["render", o_], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/filter-panel.vue"]]);
function jc(e) {
  const t = ce();
  Ys(() => {
    n.value.addObserver(t);
  }), Fe(() => {
    r(n.value), o(n.value);
  }), au(() => {
    r(n.value), o(n.value);
  }), bo(() => {
    n.value.removeObserver(t);
  });
  const n = P(() => {
    const s = e.layout;
    if (!s)
      throw new Error("Can not find table layout.");
    return s;
  }), r = (s) => {
    var a;
    const l = ((a = e.vnode.el) == null ? void 0 : a.querySelectorAll("colgroup > col")) || [];
    if (!l.length)
      return;
    const i = s.getFlattenColumns(), u = {};
    i.forEach((d) => {
      u[d.id] = d;
    });
    for (let d = 0, c = l.length; d < c; d++) {
      const p = l[d], v = p.getAttribute("name"), f = u[v];
      f && p.setAttribute("width", f.realWidth || f.width);
    }
  }, o = (s) => {
    var a, l;
    const i = ((a = e.vnode.el) == null ? void 0 : a.querySelectorAll("colgroup > col[name=gutter]")) || [];
    for (let d = 0, c = i.length; d < c; d++)
      i[d].setAttribute("width", s.scrollY.value ? s.gutterWidth : "0");
    const u = ((l = e.vnode.el) == null ? void 0 : l.querySelectorAll("th.gutter")) || [];
    for (let d = 0, c = u.length; d < c; d++) {
      const p = u[d];
      p.style.width = s.scrollY.value ? `${s.gutterWidth}px` : "0", p.style.display = s.scrollY.value ? "" : "none";
    }
  };
  return {
    tableLayout: n.value,
    onColumnsChange: r,
    onScrollableChange: o
  };
}
const ct = Symbol("ElTable");
function a_(e, t) {
  const n = ce(), r = Q(ct), o = (h) => {
    h.stopPropagation();
  }, s = (h, g) => {
    !g.filters && g.sortable ? f(h, g, !1) : g.filterable && !g.sortable && o(h), r == null || r.emit("header-click", g, h);
  }, a = (h, g) => {
    r == null || r.emit("header-contextmenu", g, h);
  }, l = O(null), i = O(!1), u = O({}), d = (h, g) => {
    if (_e && !(g.children && g.children.length > 0) && l.value && e.border) {
      i.value = !0;
      const m = r;
      t("set-drag-visible", !0);
      const w = (m == null ? void 0 : m.vnode.el).getBoundingClientRect().left, b = n.vnode.el.querySelector(`th.${g.id}`), S = b.getBoundingClientRect(), x = S.left - w + 30;
      ju(b, "noclick"), u.value = {
        startMouseLeft: h.clientX,
        startLeft: S.right - w,
        startColumnLeft: S.left - w,
        tableLeft: w
      };
      const _ = m == null ? void 0 : m.refs.resizeProxy;
      _.style.left = `${u.value.startLeft}px`, document.onselectstart = function() {
        return !1;
      }, document.ondragstart = function() {
        return !1;
      };
      const C = (I) => {
        const M = I.clientX - u.value.startMouseLeft, T = u.value.startLeft + M;
        _.style.left = `${Math.max(x, T)}px`;
      }, N = () => {
        if (i.value) {
          const { startColumnLeft: I, startLeft: M } = u.value, k = Number.parseInt(_.style.left, 10) - I;
          g.width = g.realWidth = k, m == null || m.emit("header-dragend", g.width, M - I, g, h), requestAnimationFrame(() => {
            e.store.scheduleLayout(!1, !0);
          }), document.body.style.cursor = "", i.value = !1, l.value = null, u.value = {}, t("set-drag-visible", !1);
        }
        document.removeEventListener("mousemove", C), document.removeEventListener("mouseup", N), document.onselectstart = null, document.ondragstart = null, setTimeout(() => {
          vs(b, "noclick");
        }, 0);
      };
      document.addEventListener("mousemove", C), document.addEventListener("mouseup", N);
    }
  }, c = (h, g) => {
    var m;
    if (g.children && g.children.length > 0)
      return;
    const y = (m = h.target) == null ? void 0 : m.closest("th");
    if (!(!g || !g.resizable) && !i.value && e.border) {
      const w = y.getBoundingClientRect(), b = document.body.style;
      w.width > 12 && w.right - h.pageX < 8 ? (b.cursor = "col-resize", Kr(y, "is-sortable") && (y.style.cursor = "col-resize"), l.value = g) : i.value || (b.cursor = "", Kr(y, "is-sortable") && (y.style.cursor = "pointer"), l.value = null);
    }
  }, p = () => {
    _e && (document.body.style.cursor = "");
  }, v = ({ order: h, sortOrders: g }) => {
    if (h === "")
      return g[0];
    const m = g.indexOf(h || null);
    return g[m > g.length - 2 ? 0 : m + 1];
  }, f = (h, g, m) => {
    var y;
    h.stopPropagation();
    const w = g.order === m ? null : m || v(g), b = (y = h.target) == null ? void 0 : y.closest("th");
    if (b && Kr(b, "noclick")) {
      vs(b, "noclick");
      return;
    }
    if (!g.sortable)
      return;
    const S = e.store.states;
    let x = S.sortProp.value, _;
    const C = S.sortingColumn.value;
    (C !== g || C === g && C.order === null) && (C && (C.order = null), S.sortingColumn.value = g, x = g.property), w ? _ = g.order = w : _ = g.order = null, S.sortProp.value = x, S.sortOrder.value = _, r == null || r.store.commit("changeSortCondition");
  };
  return {
    handleHeaderClick: s,
    handleHeaderContextMenu: a,
    handleMouseDown: d,
    handleMouseMove: c,
    handleMouseOut: p,
    handleSortClick: f,
    handleFilterClick: o
  };
}
function l_(e) {
  const t = Q(ct), n = ge("table");
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
      var c;
      let p = (c = t == null ? void 0 : t.props.headerCellStyle) != null ? c : {};
      typeof p == "function" && (p = p.call(null, {
        rowIndex: l,
        columnIndex: i,
        row: u,
        column: d
      }));
      const v = Ra(i, d.fixed, e.store, u);
      return Rn(v, "left"), Rn(v, "right"), Object.assign({}, p, v);
    },
    getHeaderCellClass: (l, i, u, d) => {
      const c = Pa(n.b(), i, d.fixed, e.store, u), p = [
        d.id,
        d.order,
        d.headerAlign,
        d.className,
        d.labelClassName,
        ...c
      ];
      d.children || p.push("is-leaf"), d.sortable && p.push("is-sortable");
      const v = t == null ? void 0 : t.props.headerCellClassName;
      return typeof v == "string" ? p.push(v) : typeof v == "function" && p.push(v.call(null, {
        rowIndex: l,
        columnIndex: i,
        row: u,
        column: d
      })), p.push(n.e("cell")), p.filter((f) => Boolean(f)).join(" ");
    }
  };
}
const Kc = (e) => {
  const t = [];
  return e.forEach((n) => {
    n.children ? (t.push(n), t.push.apply(t, Kc(n.children))) : t.push(n);
  }), t;
}, i_ = (e) => {
  let t = 1;
  const n = (s, a) => {
    if (a && (s.level = a.level + 1, t < s.level && (t = s.level)), s.children) {
      let l = 0;
      s.children.forEach((i) => {
        n(i, s), l += i.colSpan;
      }), s.colSpan = l;
    } else
      s.colSpan = 1;
  };
  e.forEach((s) => {
    s.level = 1, n(s, void 0);
  });
  const r = [];
  for (let s = 0; s < t; s++)
    r.push([]);
  return Kc(e).forEach((s) => {
    s.children ? (s.rowSpan = 1, s.children.forEach((a) => a.isSubColumn = !0)) : s.rowSpan = t - s.level + 1, r[s.level - 1].push(s);
  }), r;
};
function u_(e) {
  const t = Q(ct), n = P(() => i_(e.store.states.originColumns.value));
  return {
    isGroup: P(() => {
      const s = n.value.length > 1;
      return s && t && (t.state.isGroup.value = !0), s;
    }),
    toggleAllSelection: (s) => {
      s.stopPropagation(), t == null || t.store.commit("toggleAllSelection");
    },
    columnRows: n
  };
}
var c_ = U({
  name: "ElTableHeader",
  components: {
    ElCheckbox: Pn
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
    const n = ce(), r = Q(ct), o = ge("table"), s = O({}), { onColumnsChange: a, onScrollableChange: l } = jc(r);
    Fe(async () => {
      await xe(), await xe();
      const { prop: x, order: _ } = e.defaultSort;
      r == null || r.store.commit("sort", { prop: x, order: _, init: !0 });
    });
    const {
      handleHeaderClick: i,
      handleHeaderContextMenu: u,
      handleMouseDown: d,
      handleMouseMove: c,
      handleMouseOut: p,
      handleSortClick: v,
      handleFilterClick: f
    } = a_(e, t), {
      getHeaderRowStyle: h,
      getHeaderRowClass: g,
      getHeaderCellStyle: m,
      getHeaderCellClass: y
    } = l_(e), { isGroup: w, toggleAllSelection: b, columnRows: S } = u_(e);
    return n.state = {
      onColumnsChange: a,
      onScrollableChange: l
    }, n.filterPanels = s, {
      ns: o,
      filterPanels: s,
      onColumnsChange: a,
      onScrollableChange: l,
      columnRows: S,
      getHeaderRowClass: g,
      getHeaderRowStyle: h,
      getHeaderCellClass: y,
      getHeaderCellStyle: m,
      handleHeaderClick: i,
      handleHeaderContextMenu: u,
      handleMouseDown: d,
      handleMouseMove: c,
      handleMouseOut: p,
      handleSortClick: v,
      handleFilterClick: f,
      isGroup: w,
      toggleAllSelection: b
    };
  },
  render() {
    const {
      ns: e,
      isGroup: t,
      columnRows: n,
      getHeaderCellStyle: r,
      getHeaderCellClass: o,
      getHeaderRowClass: s,
      getHeaderRowStyle: a,
      handleHeaderClick: l,
      handleHeaderContextMenu: i,
      handleMouseDown: u,
      handleMouseMove: d,
      handleSortClick: c,
      handleMouseOut: p,
      store: v,
      $parent: f
    } = this;
    let h = 1;
    return Y("thead", {
      class: { [e.is("group")]: t }
    }, n.map((g, m) => Y("tr", {
      class: s(m),
      key: m,
      style: a(m)
    }, g.map((y, w) => (y.rowSpan > h && (h = y.rowSpan), Y("th", {
      class: o(m, w, g, y),
      colspan: y.colSpan,
      key: `${y.id}-thead`,
      rowspan: y.rowSpan,
      style: r(m, w, g, y),
      onClick: (b) => l(b, y),
      onContextmenu: (b) => i(b, y),
      onMousedown: (b) => u(b, y),
      onMousemove: (b) => d(b, y),
      onMouseout: p
    }, [
      Y("div", {
        class: [
          "cell",
          y.filteredValue && y.filteredValue.length > 0 ? "highlight" : ""
        ]
      }, [
        y.renderHeader ? y.renderHeader({
          column: y,
          $index: w,
          store: v,
          _self: f
        }) : y.label,
        y.sortable && Y("span", {
          onClick: (b) => c(b, y),
          class: "caret-wrapper"
        }, [
          Y("i", {
            onClick: (b) => c(b, y, "ascending"),
            class: "sort-caret ascending"
          }),
          Y("i", {
            onClick: (b) => c(b, y, "descending"),
            class: "sort-caret descending"
          })
        ]),
        y.filterable && Y(s_, {
          store: v,
          placement: y.filterPlacement || "bottom-start",
          column: y,
          upDataColumn: (b, S) => {
            y[b] = S;
          }
        })
      ])
    ]))))));
  }
});
function d_(e) {
  const t = Q(ct), n = O(""), r = O(Y("div")), o = (p, v, f) => {
    var h;
    const g = t, m = Yo(p);
    let y;
    const w = (h = g == null ? void 0 : g.vnode.el) == null ? void 0 : h.dataset.prefix;
    m && (y = mi({
      columns: e.store.states.columns.value
    }, m, w), y && (g == null || g.emit(`cell-${f}`, v, y, m, p))), g == null || g.emit(`row-${f}`, v, y, p);
  }, s = (p, v) => {
    o(p, v, "dblclick");
  }, a = (p, v) => {
    e.store.commit("setCurrentRow", v), o(p, v, "click");
  }, l = (p, v) => {
    o(p, v, "contextmenu");
  }, i = io((p) => {
    e.store.commit("setHoverRow", p);
  }, 30), u = io(() => {
    e.store.commit("setHoverRow", null);
  }, 30);
  return {
    handleDoubleClick: s,
    handleClick: a,
    handleContextMenu: l,
    handleMouseEnter: i,
    handleMouseLeave: u,
    handleCellMouseEnter: (p, v, f) => {
      var h;
      const g = t, m = Yo(p), y = (h = g == null ? void 0 : g.vnode.el) == null ? void 0 : h.dataset.prefix;
      if (m) {
        const _ = mi({
          columns: e.store.states.columns.value
        }, m, y), C = g.hoverState = { cell: m, column: _, row: v };
        g == null || g.emit("cell-mouse-enter", C.row, C.column, C.cell, p);
      }
      const w = p.target.querySelector(".cell");
      if (!(Kr(w, `${y}-tooltip`) && w.childNodes.length))
        return;
      const b = document.createRange();
      b.setStart(w, 0), b.setEnd(w, w.childNodes.length);
      const S = Math.round(b.getBoundingClientRect().width), x = (Number.parseInt(Hl(w, "paddingLeft"), 10) || 0) + (Number.parseInt(Hl(w, "paddingRight"), 10) || 0);
      (S + x > w.offsetWidth || w.scrollWidth > w.offsetWidth) && Ww(t == null ? void 0 : t.refs.tableWrapper, m, m.innerText || m.textContent, {
        placement: "top",
        strategy: "fixed"
      }, f);
    },
    handleCellMouseLeave: (p) => {
      if (!Yo(p))
        return;
      const f = t == null ? void 0 : t.hoverState;
      t == null || t.emit("cell-mouse-leave", f == null ? void 0 : f.row, f == null ? void 0 : f.column, f == null ? void 0 : f.cell, p);
    },
    tooltipContent: n,
    tooltipTrigger: r
  };
}
function f_(e) {
  const t = Q(ct), n = ge("table");
  return {
    getRowStyle: (u, d) => {
      const c = t == null ? void 0 : t.props.rowStyle;
      return typeof c == "function" ? c.call(null, {
        row: u,
        rowIndex: d
      }) : c || null;
    },
    getRowClass: (u, d) => {
      const c = [n.e("row")];
      t != null && t.props.highlightCurrentRow && u === e.store.states.currentRow.value && c.push("current-row"), e.stripe && d % 2 === 1 && c.push(n.em("row", "striped"));
      const p = t == null ? void 0 : t.props.rowClassName;
      return typeof p == "string" ? c.push(p) : typeof p == "function" && c.push(p.call(null, {
        row: u,
        rowIndex: d
      })), c;
    },
    getCellStyle: (u, d, c, p) => {
      const v = t == null ? void 0 : t.props.cellStyle;
      let f = v ?? {};
      typeof v == "function" && (f = v.call(null, {
        rowIndex: u,
        columnIndex: d,
        row: c,
        column: p
      }));
      const h = Ra(d, e == null ? void 0 : e.fixed, e.store);
      return Rn(h, "left"), Rn(h, "right"), Object.assign({}, f, h);
    },
    getCellClass: (u, d, c, p, v) => {
      const f = Pa(n.b(), d, e == null ? void 0 : e.fixed, e.store, void 0, v), h = [p.id, p.align, p.className, ...f], g = t == null ? void 0 : t.props.cellClassName;
      return typeof g == "string" ? h.push(g) : typeof g == "function" && h.push(g.call(null, {
        rowIndex: u,
        columnIndex: d,
        row: c,
        column: p
      })), h.push(n.e("cell")), h.filter((m) => Boolean(m)).join(" ");
    },
    getSpan: (u, d, c, p) => {
      let v = 1, f = 1;
      const h = t == null ? void 0 : t.props.spanMethod;
      if (typeof h == "function") {
        const g = h({
          row: u,
          column: d,
          rowIndex: c,
          columnIndex: p
        });
        Array.isArray(g) ? (v = g[0], f = g[1]) : typeof g == "object" && (v = g.rowspan, f = g.colspan);
      }
      return { rowspan: v, colspan: f };
    },
    getColspanRealWidth: (u, d, c) => {
      if (d < 1)
        return u[c].realWidth;
      const p = u.map(({ realWidth: v, width: f }) => v || f).slice(c, c + d);
      return Number(p.reduce((v, f) => Number(v) + Number(f), -1));
    }
  };
}
function p_(e) {
  const t = Q(ct), n = ge("table"), {
    handleDoubleClick: r,
    handleClick: o,
    handleContextMenu: s,
    handleMouseEnter: a,
    handleMouseLeave: l,
    handleCellMouseEnter: i,
    handleCellMouseLeave: u,
    tooltipContent: d,
    tooltipTrigger: c
  } = d_(e), {
    getRowStyle: p,
    getRowClass: v,
    getCellStyle: f,
    getCellClass: h,
    getSpan: g,
    getColspanRealWidth: m
  } = f_(e), y = P(() => e.store.states.columns.value.findIndex(({ type: _ }) => _ === "default")), w = (_, C) => {
    const N = t.props.rowKey;
    return N ? Se(_, N) : C;
  }, b = (_, C, N, I = !1) => {
    const { tooltipEffect: M, store: T } = e, { indent: k, columns: F } = T.states, A = v(_, C);
    let B = !0;
    return N && (A.push(n.em("row", `level-${N.level}`)), B = N.display), Y("tr", {
      style: [B ? null : {
        display: "none"
      }, p(_, C)],
      class: A,
      key: w(_, C),
      onDblclick: (R) => r(R, _),
      onClick: (R) => o(R, _),
      onContextmenu: (R) => s(R, _),
      onMouseenter: () => a(C),
      onMouseleave: l
    }, F.value.map((R, $) => {
      const { rowspan: V, colspan: te } = g(_, R, C, $);
      if (!V || !te)
        return null;
      const oe = { ...R };
      oe.realWidth = m(F.value, te, $);
      const de = {
        store: e.store,
        _self: e.context || t,
        column: oe,
        row: _,
        $index: C,
        cellIndex: $,
        expanded: I
      };
      $ === y.value && N && (de.treeNode = {
        indent: N.level * k.value,
        level: N.level
      }, typeof N.expanded == "boolean" && (de.treeNode.expanded = N.expanded, "loading" in N && (de.treeNode.loading = N.loading), "noLazyChildren" in N && (de.treeNode.noLazyChildren = N.noLazyChildren)));
      const be = `${C},${$}`, se = oe.columnKey || oe.rawColumnKey || "", Te = S($, R, de);
      return Y("td", {
        style: f(C, $, _, R),
        class: h(C, $, _, R, te - 1),
        key: `${se}${be}`,
        rowspan: V,
        colspan: te,
        onMouseenter: (Ee) => i(Ee, _, M),
        onMouseleave: u
      }, [Te]);
    }));
  }, S = (_, C, N) => C.renderCell(N);
  return {
    wrappedRowRender: (_, C) => {
      const N = e.store, { isRowExpanded: I, assertRowKey: M } = N, { treeData: T, lazyTreeNodeMap: k, childrenColumnName: F, rowKey: A } = N.states, B = N.states.columns.value;
      if (B.some(({ type: R }) => R === "expand")) {
        const R = I(_), $ = b(_, C, void 0, R), V = t.renderExpanded;
        return R ? V ? [
          [
            $,
            Y("tr", {
              key: `expanded-row__${$.key}`
            }, [
              Y("td", {
                colspan: B.length,
                class: `${n.e("cell")} ${n.e("expanded-cell")}`
              }, [V({ row: _, $index: C, store: N, expanded: R })])
            ])
          ]
        ] : (console.error("[Element Error]renderExpanded is required."), $) : [[$]];
      } else if (Object.keys(T.value).length) {
        M();
        const R = Se(_, A.value);
        let $ = T.value[R], V = null;
        $ && (V = {
          expanded: $.expanded,
          level: $.level,
          display: !0
        }, typeof $.lazy == "boolean" && (typeof $.loaded == "boolean" && $.loaded && (V.noLazyChildren = !($.children && $.children.length)), V.loading = $.loading));
        const te = [b(_, C, V)];
        if ($) {
          let oe = 0;
          const de = (se, Te) => {
            se && se.length && Te && se.forEach((Ee) => {
              const fe = {
                display: Te.display && Te.expanded,
                level: Te.level + 1,
                expanded: !1,
                noLazyChildren: !1,
                loading: !1
              }, dt = Se(Ee, A.value);
              if (dt == null)
                throw new Error("For nested data item, row-key is required.");
              if ($ = { ...T.value[dt] }, $ && (fe.expanded = $.expanded, $.level = $.level || fe.level, $.display = !!($.expanded && fe.display), typeof $.lazy == "boolean" && (typeof $.loaded == "boolean" && $.loaded && (fe.noLazyChildren = !($.children && $.children.length)), fe.loading = $.loading)), oe++, te.push(b(Ee, C + oe, fe)), $) {
                const Bn = k.value[dt] || Ee[F.value];
                de(Bn, $);
              }
            });
          };
          $.display = !0;
          const be = k.value[R] || _[F.value];
          de(be, $);
        }
        return te;
      } else
        return b(_, C, void 0);
    },
    tooltipContent: d,
    tooltipTrigger: c
  };
}
const h_ = {
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
var v_ = U({
  name: "ElTableBody",
  props: h_,
  setup(e) {
    const t = ce(), n = Q(ct), r = ge("table"), { wrappedRowRender: o, tooltipContent: s, tooltipTrigger: a } = p_(e), { onColumnsChange: l, onScrollableChange: i } = jc(n);
    return q(e.store.states.hoverRow, (u, d) => {
      if (!e.store.states.isComplex.value || !_e)
        return;
      let c = window.requestAnimationFrame;
      c || (c = (p) => window.setTimeout(p, 16)), c(() => {
        const p = t == null ? void 0 : t.vnode.el, v = Array.from((p == null ? void 0 : p.children) || []).filter((g) => g == null ? void 0 : g.classList.contains(`${r.e("row")}`)), f = v[d], h = v[u];
        f && vs(f, "hover-row"), h && ju(h, "hover-row");
      });
    }), bo(() => {
      var u;
      (u = vt) == null || u();
    }), {
      ns: r,
      onColumnsChange: l,
      onScrollableChange: i,
      wrappedRowRender: o,
      tooltipContent: s,
      tooltipTrigger: a
    };
  },
  render() {
    const { wrappedRowRender: e, store: t } = this, n = t.states.data.value || [];
    return Y("tbody", {}, [
      n.reduce((r, o) => r.concat(e(o, r.length)), [])
    ]);
  }
});
function Ia(e) {
  const t = e.tableLayout === "auto";
  let n = e.columns || [];
  t && n.every((o) => o.width === void 0) && (n = []);
  const r = (o) => {
    const s = {
      key: `${e.tableLayout}_${o.id}`,
      style: {},
      name: void 0
    };
    return t ? s.style = {
      width: `${o.width}px`
    } : s.name = o.id, s;
  };
  return Y("colgroup", {}, n.map((o) => Y("col", r(o))));
}
Ia.props = ["columns", "tableLayout"];
function g_() {
  const e = Q(ct), t = e == null ? void 0 : e.store, n = P(() => t.states.fixedLeafColumnsLength.value), r = P(() => t.states.rightFixedColumns.value.length), o = P(() => t.states.columns.value.length), s = P(() => t.states.fixedColumns.value.length), a = P(() => t.states.rightFixedColumns.value.length);
  return {
    leftFixedLeafCount: n,
    rightFixedLeafCount: r,
    columnsCount: o,
    leftFixedCount: s,
    rightFixedCount: a,
    columns: t.states.columns
  };
}
function m_(e) {
  const { columns: t } = g_(), n = ge("table");
  return {
    getCellClasses: (s, a) => {
      const l = s[a], i = [
        n.e("cell"),
        l.id,
        l.align,
        l.labelClassName,
        ...Pa(n.b(), a, l.fixed, e.store)
      ];
      return l.className && i.push(l.className), l.children || i.push(n.is("leaf")), i;
    },
    getCellStyles: (s, a) => {
      const l = Ra(a, s.fixed, e.store);
      return Rn(l, "left"), Rn(l, "right"), l;
    },
    columns: t
  };
}
var b_ = U({
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
    const { getCellClasses: t, getCellStyles: n, columns: r } = m_(e);
    return {
      ns: ge("table"),
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
      ns: s
    } = this, a = this.store.states.data.value;
    let l = [];
    return r ? l = r({
      columns: e,
      data: a
    }) : e.forEach((i, u) => {
      if (u === 0) {
        l[u] = o;
        return;
      }
      const d = a.map((f) => Number(f[i.property])), c = [];
      let p = !0;
      d.forEach((f) => {
        if (!Number.isNaN(+f)) {
          p = !1;
          const h = `${f}`.split(".")[1];
          c.push(h ? h.length : 0);
        }
      });
      const v = Math.max.apply(null, c);
      p ? l[u] = "" : l[u] = d.reduce((f, h) => {
        const g = Number(h);
        return Number.isNaN(+g) ? f : Number.parseFloat((f + h).toFixed(Math.min(v, 20)));
      }, 0);
    }), Y("table", {
      class: s.e("footer"),
      cellspacing: "0",
      cellpadding: "0",
      border: "0"
    }, [
      Ia({
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
function y_(e) {
  return {
    setCurrentRow: (d) => {
      e.commit("setCurrentRow", d);
    },
    getSelectionRows: () => e.getSelectionRows(),
    toggleRowSelection: (d, c) => {
      e.toggleRowSelection(d, c, !1), e.updateAllSelected();
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
    toggleRowExpansion: (d, c) => {
      e.toggleRowExpansionAdapter(d, c);
    },
    clearSort: () => {
      e.clearSort();
    },
    sort: (d, c) => {
      e.commit("sort", { prop: d, order: c });
    }
  };
}
function w_(e, t, n, r) {
  const o = O(!1), s = O(null), a = O(!1), l = (R) => {
    a.value = R;
  }, i = O({
    width: null,
    height: null,
    headerHeight: null
  }), u = O(!1), d = {
    display: "inline-block",
    verticalAlign: "middle"
  }, c = O(), p = O(0), v = O(0), f = O(0), h = O(0);
  Dt(() => {
    t.setHeight(e.height);
  }), Dt(() => {
    t.setMaxHeight(e.maxHeight);
  }), q(() => [e.currentRowKey, n.states.rowKey], ([R, $]) => {
    !E($) || !E(R) || n.setCurrentRowKey(`${R}`);
  }, {
    immediate: !0
  }), q(() => e.data, (R) => {
    r.store.commit("setData", R);
  }, {
    immediate: !0,
    deep: !0
  }), Dt(() => {
    e.expandRowKeys && n.setExpandRowKeysAdapter(e.expandRowKeys);
  });
  const g = () => {
    r.store.commit("setHoverRow", null), r.hoverState && (r.hoverState = null);
  }, m = (R, $) => {
    const { pixelX: V, pixelY: te } = $;
    Math.abs(V) >= Math.abs(te) && (r.refs.bodyWrapper.scrollLeft += $.pixelX / 5);
  }, y = P(() => e.height || e.maxHeight || n.states.fixedColumns.value.length > 0 || n.states.rightFixedColumns.value.length > 0), w = P(() => ({
    width: t.bodyWidth.value ? `${t.bodyWidth.value}px` : ""
  })), b = () => {
    y.value && t.updateElsHeight(), t.updateColumnsWidth(), requestAnimationFrame(C);
  };
  Fe(async () => {
    await xe(), n.updateColumns(), N(), requestAnimationFrame(b);
    const R = r.vnode.el, $ = r.refs.headerWrapper;
    e.flexible && R && R.parentElement && (R.parentElement.style.minWidth = "0"), i.value = {
      width: c.value = R.offsetWidth,
      height: R.offsetHeight,
      headerHeight: e.showHeader && $ ? $.offsetHeight : null
    }, n.states.columns.value.forEach((V) => {
      V.filteredValue && V.filteredValue.length && r.store.commit("filterChange", {
        column: V,
        values: V.filteredValue,
        silent: !0
      });
    }), r.$ready = !0;
  });
  const S = (R, $) => {
    if (!R)
      return;
    const V = Array.from(R.classList).filter((te) => !te.startsWith("is-scrolling-"));
    V.push(t.scrollX.value ? $ : "is-scrolling-none"), R.className = V.join(" ");
  }, x = (R) => {
    const { tableWrapper: $ } = r.refs;
    S($, R);
  }, _ = (R) => {
    const { tableWrapper: $ } = r.refs;
    return !!($ && $.classList.contains(R));
  }, C = function() {
    if (!r.refs.scrollBarRef)
      return;
    if (!t.scrollX.value) {
      const se = "is-scrolling-none";
      _(se) || x(se);
      return;
    }
    const R = r.refs.scrollBarRef.wrapRef;
    if (!R)
      return;
    const { scrollLeft: $, offsetWidth: V, scrollWidth: te } = R, { headerWrapper: oe, footerWrapper: de } = r.refs;
    oe && (oe.scrollLeft = $), de && (de.scrollLeft = $);
    const be = te - V - 1;
    $ >= be ? x("is-scrolling-right") : x($ === 0 ? "is-scrolling-left" : "is-scrolling-middle");
  }, N = () => {
    r.refs.scrollBarRef && (r.refs.scrollBarRef.wrapRef && yt(r.refs.scrollBarRef.wrapRef, "scroll", C, {
      passive: !0
    }), e.fit ? hs(r.vnode.el, I) : yt(window, "resize", I), hs(r.refs.bodyWrapper, () => {
      var R, $;
      I(), ($ = (R = r.refs) == null ? void 0 : R.scrollBarRef) == null || $.update();
    }));
  }, I = () => {
    var R, $, V;
    const te = r.vnode.el;
    if (!r.$ready || !te)
      return;
    let oe = !1;
    const {
      width: de,
      height: be,
      headerHeight: se
    } = i.value, Te = c.value = te.offsetWidth;
    de !== Te && (oe = !0);
    const Ee = te.offsetHeight;
    (e.height || y.value) && be !== Ee && (oe = !0);
    const fe = e.tableLayout === "fixed" ? r.refs.headerWrapper : (R = r.refs.tableHeaderRef) == null ? void 0 : R.$el;
    e.showHeader && (fe == null ? void 0 : fe.offsetHeight) !== se && (oe = !0), p.value = (($ = r.refs.tableWrapper) == null ? void 0 : $.scrollHeight) || 0, f.value = (fe == null ? void 0 : fe.scrollHeight) || 0, h.value = ((V = r.refs.footerWrapper) == null ? void 0 : V.offsetHeight) || 0, v.value = p.value - f.value - h.value, oe && (i.value = {
      width: Te,
      height: Ee,
      headerHeight: e.showHeader && (fe == null ? void 0 : fe.offsetHeight) || 0
    }, b());
  }, M = ms(), T = P(() => {
    const { bodyWidth: R, scrollY: $, gutterWidth: V } = t;
    return R.value ? `${R.value - ($.value ? V : 0)}px` : "";
  }), k = P(() => e.maxHeight ? "fixed" : e.tableLayout), F = P(() => {
    if (e.data && e.data.length)
      return null;
    let R = "100%";
    e.height && v.value && (R = `${v.value}px`);
    const $ = c.value;
    return {
      width: $ ? `${$}px` : "",
      height: R
    };
  }), A = P(() => e.height ? {
    height: Number.isNaN(Number(e.height)) ? e.height : `${e.height}px`
  } : e.maxHeight ? {
    maxHeight: Number.isNaN(Number(e.maxHeight)) ? e.maxHeight : `${e.maxHeight}px`
  } : {}), B = P(() => {
    if (e.height)
      return {
        height: "100%"
      };
    if (e.maxHeight) {
      if (Number.isNaN(Number(e.maxHeight)))
        return {
          maxHeight: `calc(${e.maxHeight} - ${f.value + h.value}px)`
        };
      {
        const R = e.maxHeight;
        if (p.value >= Number(R))
          return {
            maxHeight: `${p.value - f.value - h.value}px`
          };
      }
    }
    return {};
  });
  return {
    isHidden: o,
    renderExpanded: s,
    setDragVisible: l,
    isGroup: u,
    handleMouseLeave: g,
    handleHeaderFooterMousewheel: m,
    tableSize: M,
    emptyBlockStyle: F,
    handleFixedMousewheel: (R, $) => {
      const V = r.refs.bodyWrapper;
      if (Math.abs($.spinY) > 0) {
        const te = V.scrollTop;
        $.pixelY < 0 && te !== 0 && R.preventDefault(), $.pixelY > 0 && V.scrollHeight - V.clientHeight > te && R.preventDefault(), V.scrollTop += Math.ceil($.pixelY / 5);
      } else
        V.scrollLeft += Math.ceil($.pixelX / 5);
    },
    resizeProxyVisible: a,
    bodyWidth: T,
    resizeState: i,
    doLayout: b,
    tableBodyStyles: w,
    tableLayout: k,
    scrollbarViewStyle: d,
    tableInnerStyle: A,
    scrollbarStyle: B
  };
}
var __ = {
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
const E_ = () => {
  const e = O(), t = (s, a) => {
    const l = e.value;
    l && l.scrollTo(s, a);
  }, n = (s, a) => {
    const l = e.value;
    l && bt(a) && ["Top", "Left"].includes(s) && l[`setScroll${s}`](a);
  };
  return {
    scrollBarRef: e,
    scrollTo: t,
    setScrollTop: (s) => n("Top", s),
    setScrollLeft: (s) => n("Left", s)
  };
};
let C_ = 1;
const S_ = U({
  name: "ElTable",
  directives: {
    Mousewheel: hw
  },
  components: {
    TableHeader: c_,
    TableBody: v_,
    TableFooter: b_,
    ElScrollbar: oc,
    hColgroup: Ia
  },
  props: __,
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
    const { t } = ec(), n = ge("table"), r = ce();
    at(ct, r);
    const o = Xw(r, e);
    r.store = o;
    const s = new Zw({
      store: r.store,
      table: r,
      fit: e.fit,
      showHeader: e.showHeader
    });
    r.layout = s;
    const a = P(() => (o.states.data.value || []).length === 0), {
      setCurrentRow: l,
      getSelectionRows: i,
      toggleRowSelection: u,
      clearSelection: d,
      clearFilter: c,
      toggleAllSelection: p,
      toggleRowExpansion: v,
      clearSort: f,
      sort: h
    } = y_(o), {
      isHidden: g,
      renderExpanded: m,
      setDragVisible: y,
      isGroup: w,
      handleMouseLeave: b,
      handleHeaderFooterMousewheel: S,
      tableSize: x,
      emptyBlockStyle: _,
      handleFixedMousewheel: C,
      resizeProxyVisible: N,
      bodyWidth: I,
      resizeState: M,
      doLayout: T,
      tableBodyStyles: k,
      tableLayout: F,
      scrollbarViewStyle: A,
      tableInnerStyle: B,
      scrollbarStyle: ee
    } = w_(e, s, o, r), { scrollBarRef: R, scrollTo: $, setScrollLeft: V, setScrollTop: te } = E_(), oe = io(T, 50), de = `${n.namespace.value}-table_${C_++}`;
    r.tableId = de, r.state = {
      isGroup: w,
      resizeState: M,
      doLayout: T,
      debouncedUpdateLayout: oe
    };
    const be = P(() => e.sumText || t("el.table.sumText")), se = P(() => e.emptyText || t("el.table.emptyText"));
    return {
      ns: n,
      layout: s,
      store: o,
      handleHeaderFooterMousewheel: S,
      handleMouseLeave: b,
      tableId: de,
      tableSize: x,
      isHidden: g,
      isEmpty: a,
      renderExpanded: m,
      resizeProxyVisible: N,
      resizeState: M,
      isGroup: w,
      bodyWidth: I,
      tableBodyStyles: k,
      emptyBlockStyle: _,
      debouncedUpdateLayout: oe,
      handleFixedMousewheel: C,
      setCurrentRow: l,
      getSelectionRows: i,
      toggleRowSelection: u,
      clearSelection: d,
      clearFilter: c,
      toggleAllSelection: p,
      toggleRowExpansion: v,
      clearSort: f,
      doLayout: T,
      sort: h,
      t,
      setDragVisible: y,
      context: r,
      computedSumText: be,
      computedEmptyText: se,
      tableLayout: F,
      scrollbarViewStyle: A,
      tableInnerStyle: B,
      scrollbarStyle: ee,
      scrollBarRef: R,
      scrollTo: $,
      setScrollLeft: V,
      setScrollTop: te
    };
  }
}), x_ = ["data-prefix"], O_ = {
  ref: "hiddenColumns",
  class: "hidden-columns"
};
function T_(e, t, n, r, o, s) {
  const a = Ke("hColgroup"), l = Ke("table-header"), i = Ke("table-body"), u = Ke("el-scrollbar"), d = Ke("table-footer"), c = un("mousewheel");
  return D(), K("div", {
    ref: "tableWrapper",
    class: j([
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
    style: De(e.style),
    "data-prefix": e.ns.namespace.value,
    onMouseleave: t[0] || (t[0] = (p) => e.handleMouseLeave())
  }, [
    pe("div", {
      class: j(e.ns.e("inner-wrapper")),
      style: De(e.tableInnerStyle)
    }, [
      pe("div", O_, [
        Ae(e.$slots, "default")
      ], 512),
      e.showHeader && e.tableLayout === "fixed" ? $e((D(), K("div", {
        key: 0,
        ref: "headerWrapper",
        class: j(e.ns.e("header-wrapper"))
      }, [
        pe("table", {
          ref: "tableHeader",
          class: j(e.ns.e("header")),
          style: De(e.tableBodyStyles),
          border: "0",
          cellpadding: "0",
          cellspacing: "0"
        }, [
          L(a, {
            columns: e.store.states.columns.value,
            "table-layout": e.tableLayout
          }, null, 8, ["columns", "table-layout"]),
          L(l, {
            ref: "tableHeaderRef",
            border: e.border,
            "default-sort": e.defaultSort,
            store: e.store,
            onSetDragVisible: e.setDragVisible
          }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])
        ], 6)
      ], 2)), [
        [c, e.handleHeaderFooterMousewheel]
      ]) : Le("v-if", !0),
      pe("div", {
        ref: "bodyWrapper",
        class: j(e.ns.e("body-wrapper"))
      }, [
        L(u, {
          ref: "scrollBarRef",
          "view-style": e.scrollbarViewStyle,
          "wrap-style": e.scrollbarStyle,
          always: e.scrollbarAlwaysOn
        }, {
          default: me(() => [
            pe("table", {
              ref: "tableBody",
              class: j(e.ns.e("body")),
              cellspacing: "0",
              cellpadding: "0",
              border: "0",
              style: De({
                width: e.bodyWidth,
                tableLayout: e.tableLayout
              })
            }, [
              L(a, {
                columns: e.store.states.columns.value,
                "table-layout": e.tableLayout
              }, null, 8, ["columns", "table-layout"]),
              e.showHeader && e.tableLayout === "auto" ? (D(), we(l, {
                key: 0,
                ref: "tableHeaderRef",
                border: e.border,
                "default-sort": e.defaultSort,
                store: e.store,
                onSetDragVisible: e.setDragVisible
              }, null, 8, ["border", "default-sort", "store", "onSetDragVisible"])) : Le("v-if", !0),
              L(i, {
                context: e.context,
                highlight: e.highlightCurrentRow,
                "row-class-name": e.rowClassName,
                "tooltip-effect": e.tooltipEffect,
                "row-style": e.rowStyle,
                store: e.store,
                stripe: e.stripe
              }, null, 8, ["context", "highlight", "row-class-name", "tooltip-effect", "row-style", "store", "stripe"])
            ], 6),
            e.isEmpty ? (D(), K("div", {
              key: 0,
              ref: "emptyBlock",
              style: De(e.emptyBlockStyle),
              class: j(e.ns.e("empty-block"))
            }, [
              pe("span", {
                class: j(e.ns.e("empty-text"))
              }, [
                Ae(e.$slots, "empty", {}, () => [
                  In(mt(e.computedEmptyText), 1)
                ])
              ], 2)
            ], 6)) : Le("v-if", !0),
            e.$slots.append ? (D(), K("div", {
              key: 1,
              ref: "appendWrapper",
              class: j(e.ns.e("append-wrapper"))
            }, [
              Ae(e.$slots, "append")
            ], 2)) : Le("v-if", !0)
          ]),
          _: 3
        }, 8, ["view-style", "wrap-style", "always"])
      ], 2),
      e.showSummary ? $e((D(), K("div", {
        key: 1,
        ref: "footerWrapper",
        class: j(e.ns.e("footer-wrapper"))
      }, [
        L(d, {
          border: e.border,
          "default-sort": e.defaultSort,
          store: e.store,
          style: De(e.tableBodyStyles),
          "sum-text": e.computedSumText,
          "summary-method": e.summaryMethod
        }, null, 8, ["border", "default-sort", "store", "style", "sum-text", "summary-method"])
      ], 2)), [
        [so, !e.isEmpty],
        [c, e.handleHeaderFooterMousewheel]
      ]) : Le("v-if", !0),
      e.border || e.isGroup ? (D(), K("div", {
        key: 2,
        class: j(e.ns.e("border-left-patch"))
      }, null, 2)) : Le("v-if", !0)
    ], 6),
    $e(pe("div", {
      ref: "resizeProxy",
      class: j(e.ns.e("column-resize-proxy"))
    }, null, 2), [
      [so, e.resizeProxyVisible]
    ])
  ], 46, x_);
}
var N_ = /* @__PURE__ */ Oe(S_, [["render", T_], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/table/src/table.vue"]]);
const $_ = {
  selection: "table-column--selection",
  expand: "table__expand-column"
}, A_ = {
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
}, P_ = (e) => $_[e] || "", R_ = {
  selection: {
    renderHeader({ store: e }) {
      function t() {
        return e.states.data.value && e.states.data.value.length === 0;
      }
      return Y(Pn, {
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
      return Y(Pn, {
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
        onClick: function(a) {
          a.stopPropagation(), t.toggleRowExpansion(e);
        }
      }, {
        default: () => [
          Y(ba, null, {
            default: () => [Y(Ku)]
          })
        ]
      });
    },
    sortable: !1,
    resizable: !1
  }
};
function I_({
  row: e,
  column: t,
  $index: n
}) {
  var r;
  const o = t.property, s = o && Jm(e, o).value;
  return t && t.formatter ? t.formatter(e, t, s, n) : ((r = s == null ? void 0 : s.toString) == null ? void 0 : r.call(s)) || "";
}
function L_({
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
  const s = [], a = function(l) {
    l.stopPropagation(), !t.loading && n.loadOrToggle(e);
  };
  if (t.indent && s.push(Y("span", {
    class: o.e("indent"),
    style: { "padding-left": `${t.indent}px` }
  })), typeof t.expanded == "boolean" && !t.noLazyChildren) {
    const l = [
      o.e("expand-icon"),
      t.expanded ? o.em("expand-icon", "expanded") : ""
    ];
    let i = Ku;
    t.loading && (i = _b), s.push(Y("div", {
      class: l,
      onClick: a
    }, {
      default: () => [
        Y(ba, { class: { [o.is("loading")]: t.loading } }, {
          default: () => [Y(i)]
        })
      ]
    }));
  } else
    s.push(Y("span", {
      class: o.e("placeholder")
    }));
  return s;
}
function wi(e, t) {
  return e.reduce((n, r) => (n[r] = r, n), t);
}
function F_(e, t) {
  const n = ce();
  return {
    registerComplexWatchers: () => {
      const s = ["fixed"], a = {
        realWidth: "width",
        realMinWidth: "minWidth"
      }, l = wi(s, a);
      Object.keys(l).forEach((i) => {
        const u = a[i];
        re(t, u) && q(() => t[u], (d) => {
          let c = d;
          u === "width" && i === "realWidth" && (c = Aa(d)), u === "minWidth" && i === "realMinWidth" && (c = kc(d)), n.columnConfig.value[u] = c, n.columnConfig.value[i] = c;
          const p = u === "fixed";
          e.value.store.scheduleLayout(p);
        });
      });
    },
    registerNormalWatchers: () => {
      const s = [
        "label",
        "filters",
        "filterMultiple",
        "sortable",
        "index",
        "formatter",
        "className",
        "labelClassName",
        "showOverflowTooltip"
      ], a = {
        property: "prop",
        align: "realAlign",
        headerAlign: "realHeaderAlign"
      }, l = wi(s, a);
      Object.keys(l).forEach((i) => {
        const u = a[i];
        re(t, u) && q(() => t[u], (d) => {
          n.columnConfig.value[i] = d;
        });
      });
    }
  };
}
function M_(e, t, n) {
  const r = ce(), o = O(""), s = O(!1), a = O(), l = O(), i = ge("table");
  Dt(() => {
    a.value = e.align ? `is-${e.align}` : null, a.value;
  }), Dt(() => {
    l.value = e.headerAlign ? `is-${e.headerAlign}` : a.value, l.value;
  });
  const u = P(() => {
    let w = r.vnode.vParent || r.parent;
    for (; w && !w.tableId && !w.columnId; )
      w = w.vnode.vParent || w.parent;
    return w;
  }), d = P(() => {
    const { store: w } = r.parent;
    if (!w)
      return !1;
    const { treeData: b } = w.states, S = b.value;
    return S && Object.keys(S).length > 0;
  }), c = O(Aa(e.width)), p = O(kc(e.minWidth)), v = (w) => (c.value && (w.width = c.value), p.value && (w.minWidth = p.value), !c.value && p.value && (w.width = void 0), w.minWidth || (w.minWidth = 80), w.realWidth = Number(w.width === void 0 ? w.minWidth : w.width), w), f = (w) => {
    const b = w.type, S = R_[b] || {};
    Object.keys(S).forEach((_) => {
      const C = S[_];
      _ !== "className" && C !== void 0 && (w[_] = C);
    });
    const x = P_(b);
    if (x) {
      const _ = `${E(i.namespace)}-${x}`;
      w.className = w.className ? `${w.className} ${_}` : _;
    }
    return w;
  }, h = (w) => {
    Array.isArray(w) ? w.forEach((S) => b(S)) : b(w);
    function b(S) {
      var x;
      ((x = S == null ? void 0 : S.type) == null ? void 0 : x.name) === "ElTableColumn" && (S.vParent = r);
    }
  };
  return {
    columnId: o,
    realAlign: a,
    isSubColumn: s,
    realHeaderAlign: l,
    columnOrTableParent: u,
    setColumnWidth: v,
    setColumnForcedProps: f,
    setColumnRenders: (w) => {
      e.renderHeader ? Et("TableColumn", "Comparing to render-header, scoped-slot header is easier to use. We recommend users to use scoped-slot header.") : w.type !== "selection" && (w.renderHeader = (S) => {
        r.columnConfig.value.label;
        const x = t.header;
        return x ? x(S) : w.label;
      });
      let b = w.renderCell;
      return w.type === "expand" ? (w.renderCell = (S) => Y("div", {
        class: "cell"
      }, [b(S)]), n.value.renderExpanded = (S) => t.default ? t.default(S) : t.default) : (b = b || I_, w.renderCell = (S) => {
        let x = null;
        if (t.default) {
          const I = t.default(S);
          x = I.some((M) => M.type !== et) ? I : b(S);
        } else
          x = b(S);
        const _ = d.value && S.cellIndex === 0 && S.column.type !== "selection", C = L_(S, _), N = {
          class: "cell",
          style: {}
        };
        return w.showOverflowTooltip && (N.class = `${N.class} ${E(i.namespace)}-tooltip`, N.style = {
          width: `${(S.column.realWidth || Number(S.column.width)) - 1}px`
        }), h(x), Y("div", N, [C, x]);
      }), w;
    },
    getPropsData: (...w) => w.reduce((b, S) => (Array.isArray(S) && S.forEach((x) => {
      b[x] = e[x];
    }), b), {}),
    getColumnElIndex: (w, b) => Array.prototype.indexOf.call(w, b)
  };
}
var D_ = {
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
let k_ = 1;
var Uc = U({
  name: "ElTableColumn",
  components: {
    ElCheckbox: Pn
  },
  props: D_,
  setup(e, { slots: t }) {
    const n = ce(), r = O({}), o = P(() => {
      let y = n.parent;
      for (; y && !y.tableId; )
        y = y.parent;
      return y;
    }), { registerNormalWatchers: s, registerComplexWatchers: a } = F_(o, e), {
      columnId: l,
      isSubColumn: i,
      realHeaderAlign: u,
      columnOrTableParent: d,
      setColumnWidth: c,
      setColumnForcedProps: p,
      setColumnRenders: v,
      getPropsData: f,
      getColumnElIndex: h,
      realAlign: g
    } = M_(e, t, o), m = d.value;
    l.value = `${m.tableId || m.columnId}_column_${k_++}`, Ys(() => {
      i.value = o.value !== m;
      const y = e.type || "default", w = e.sortable === "" ? !0 : e.sortable, b = {
        ...A_[y],
        id: l.value,
        type: y,
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
        sortable: w,
        index: e.index,
        rawColumnKey: n.vnode.key
      };
      let N = f([
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
      N = Bw(b, N), N = Vw(v, c, p)(N), r.value = N, s(), a();
    }), Fe(() => {
      var y;
      const w = d.value, b = i.value ? w.vnode.el.children : (y = w.refs.hiddenColumns) == null ? void 0 : y.children, S = () => h(b || [], n.vnode.el);
      r.value.getColumnIndex = S, S() > -1 && o.value.store.commit("insertColumn", r.value, i.value ? w.columnConfig.value : null);
    }), nt(() => {
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
        for (const a of r)
          ((n = a.type) == null ? void 0 : n.name) === "ElTableColumn" || a.shapeFlag & 2 ? o.push(a) : a.type === Ye && Array.isArray(a.children) && a.children.forEach((l) => {
            (l == null ? void 0 : l.patchFlag) !== 1024 && !ve(l == null ? void 0 : l.children) && o.push(l);
          });
      return Y("div", o);
    } catch {
      return Y("div", []);
    }
  }
});
const B_ = Fn(N_, {
  TableColumn: Uc
}), H_ = fa(Uc);
const La = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, o] of t)
    n[r] = o;
  return n;
}, V_ = { class: "simple-table" }, z_ = { key: 1 }, W_ = {
  __name: "SimpleTable",
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = Q("$request"), r = O(null), o = Object.getPrototypeOf(async function() {
    }).constructor, s = async () => t.props ? t.props.interfaceType === "ProCode" ? await async function() {
      return await new o("$request", t.props.code)(n);
    }() : await n.get(t.props.url) : [];
    return Dt(async () => {
      r.value = await s();
    }), (a, l) => {
      const i = H_, u = B_;
      return D(), K("div", V_, [
        r.value && r.value.length > 0 ? (D(), we(u, {
          key: 0,
          data: r.value,
          style: { width: "100%" }
        }, {
          default: me(() => [
            L(i, {
              prop: "date",
              label: "Date",
              width: "180"
            }),
            L(i, {
              prop: "name",
              label: "Name",
              width: "180"
            }),
            L(i, {
              prop: "address",
              label: "Address"
            })
          ]),
          _: 1
        }, 8, ["data"])) : (D(), K("p", z_, "暂无数据"))
      ]);
    };
  }
}, Gc = /* @__PURE__ */ La(W_, [["__scopeId", "data-v-be24fd09"]]), j_ = (e) => {
  e.component("SimpleTable", Gc);
}, K_ = {
  SimpleTable: Gc
};
const U_ = { class: "image-wrapper" }, G_ = ["src", "height"], Y_ = {
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
      const s = un("atomicattr");
      return $e((D(), K("div", U_, [
        t.props ? (D(), K("img", {
          key: 0,
          src: t.props.url ? t.props.url : n,
          height: t.props.height,
          draggable: "false"
        }, null, 8, G_)) : (D(), K("img", {
          key: 1,
          src: n
        }))
      ])), [
        [s, t.props.atomicAttrs]
      ]);
    };
  }
}, Yc = /* @__PURE__ */ La(Y_, [["__scopeId", "data-v-cee3d990"]]), kt = (e) => e != null, q_ = (e) => typeof e == "function", qc = (e) => e !== null && typeof e == "object", Xc = (e) => typeof e == "number" || /^\d+(\.\d+)?$/.test(e), X_ = typeof window < "u";
function _i(e, t) {
  const n = t.split(".");
  let r = e;
  return n.forEach((o) => {
    var s;
    r = qc(r) && (s = r[o]) != null ? s : "";
  }), r;
}
const Ue = [Number, String], vr = {
  type: Boolean,
  default: !0
}, jt = (e) => ({
  type: String,
  default: e
});
var J_ = (e) => e === window, Ei = (e, t) => ({
  top: 0,
  left: 0,
  right: e,
  bottom: t,
  width: e,
  height: t
}), Z_ = (e) => {
  const t = E(e);
  if (J_(t)) {
    const n = t.innerWidth, r = t.innerHeight;
    return Ei(n, r);
  }
  return t != null && t.getBoundingClientRect ? t.getBoundingClientRect() : Ei(0, 0);
};
function Lt(e) {
  if (kt(e))
    return Xc(e) ? `${e}px` : String(e);
}
function Q_(e) {
  const t = {};
  return e !== void 0 && (t.zIndex = +e), t;
}
const eE = /-(\w)/g, Jc = (e) => e.replace(eE, (t, n) => n.toUpperCase()), tE = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, ""), { hasOwnProperty: nE } = Object.prototype;
function rE(e, t, n) {
  const r = t[n];
  kt(r) && (!nE.call(e, n) || !qc(r) ? e[n] = r : e[n] = Zc(Object(e[n]), r));
}
function Zc(e, t) {
  return Object.keys(t).forEach((n) => {
    rE(e, t, n);
  }), e;
}
var oE = {
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
const Ci = O("zh-CN"), Si = mo({
  "zh-CN": oE
}), sE = {
  messages() {
    return Si[Ci.value];
  },
  use(e, t) {
    Ci.value = e, this.add({ [e]: t });
  },
  add(e = {}) {
    Zc(Si, e);
  }
};
var aE = sE;
function lE(e) {
  const t = Jc(e) + ".";
  return (n, ...r) => {
    const o = aE.messages(), s = _i(o, t + n) || _i(o, n);
    return q_(s) ? s(...r) : s;
  };
}
function As(e, t) {
  return t ? typeof t == "string" ? ` ${e}--${t}` : Array.isArray(t) ? t.reduce(
    (n, r) => n + As(e, r),
    ""
  ) : Object.keys(t).reduce(
    (n, r) => n + (t[r] ? As(e, r) : ""),
    ""
  ) : "";
}
function iE(e) {
  return (t, n) => (t && typeof t != "string" && (n = t, t = ""), t = t ? `${e}__${t}` : e, `${t}${As(t, n)}`);
}
function fn(e) {
  const t = `van-${e}`;
  return [
    t,
    iE(t),
    lE(t)
  ];
}
const uE = "van-hairline", cE = `${uE}--bottom`, Ps = "van-haptics-feedback";
function kn(e) {
  return e.install = (t) => {
    const { name: n } = e;
    n && (t.component(n, e), t.component(Jc(`-${n}`), e));
  }, e;
}
const dE = Symbol();
function fE(e) {
  const t = Q(dE, null);
  t && q(t, (n) => {
    n && e();
  });
}
const pE = (e, t) => {
  const n = O(), r = () => {
    n.value = Z_(e).height;
  };
  return Fe(() => {
    if (xe(r), t)
      for (let o = 1; o <= 3; o++)
        setTimeout(r, 100 * o);
  }), fE(() => xe(r)), n;
};
function hE(e, t) {
  const n = pE(e, !0);
  return (r) => L("div", {
    class: t("placeholder"),
    style: {
      height: n.value ? `${n.value}px` : void 0
    }
  }, [r()]);
}
const [vE, xi] = fn("badge"), gE = {
  dot: Boolean,
  max: Ue,
  tag: jt("div"),
  color: String,
  offset: Array,
  content: Ue,
  showZero: vr,
  position: jt("top-right")
};
var mE = U({
  name: vE,
  props: gE,
  setup(e, {
    slots: t
  }) {
    const n = () => {
      if (t.content)
        return !0;
      const {
        content: a,
        showZero: l
      } = e;
      return kt(a) && a !== "" && (l || a !== 0 && a !== "0");
    }, r = () => {
      const {
        dot: a,
        max: l,
        content: i
      } = e;
      if (!a && n())
        return t.content ? t.content() : kt(l) && Xc(i) && +i > l ? `${l}+` : i;
    }, o = P(() => {
      const a = {
        background: e.color
      };
      if (e.offset) {
        const [l, i] = e.offset;
        t.default ? (a.top = Lt(i), typeof l == "number" ? a.right = Lt(-l) : a.right = l.startsWith("-") ? l.replace("-", "") : `-${l}`) : (a.marginTop = Lt(i), a.marginLeft = Lt(l));
      }
      return a;
    }), s = () => {
      if (n() || e.dot)
        return L("div", {
          class: xi([e.position, {
            dot: e.dot,
            fixed: !!t.default
          }]),
          style: o.value
        }, [r()]);
    };
    return () => {
      if (t.default) {
        const {
          tag: a
        } = e;
        return L(a, {
          class: xi("wrapper")
        }, {
          default: () => [t.default(), s()]
        });
      }
      return s();
    };
  }
});
const bE = kn(mE), yE = (e) => {
}, [Qc, wE] = fn("config-provider"), ed = Symbol(Qc), _E = {
  tag: jt("div"),
  zIndex: Number,
  themeVars: Object,
  iconPrefix: String
};
function EE(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[`--van-${tE(n)}`] = e[n];
  }), t;
}
U({
  name: Qc,
  props: _E,
  setup(e, {
    slots: t
  }) {
    const n = P(() => {
      if (e.themeVars)
        return EE(e.themeVars);
    });
    return at(ed, e), Dt(() => {
      e.zIndex !== void 0 && yE(e.zIndex);
    }), () => L(e.tag, {
      class: wE(),
      style: n.value
    }, {
      default: () => {
        var r;
        return [(r = t.default) == null ? void 0 : r.call(t)];
      }
    });
  }
});
const [CE, Oi] = fn("icon"), SE = (e) => e == null ? void 0 : e.includes("/"), xE = {
  dot: Boolean,
  tag: jt("i"),
  name: String,
  size: Ue,
  badge: Ue,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var OE = U({
  name: CE,
  props: xE,
  setup(e, {
    slots: t
  }) {
    const n = Q(ed, null), r = P(() => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || Oi());
    return () => {
      const {
        tag: o,
        dot: s,
        name: a,
        size: l,
        badge: i,
        color: u
      } = e, d = SE(a);
      return L(bE, an({
        dot: s,
        tag: o,
        class: [r.value, d ? "" : `${r.value}-${a}`],
        style: {
          color: u,
          fontSize: Lt(l)
        },
        content: i
      }, e.badgeProps), {
        default: () => {
          var c;
          return [(c = t.default) == null ? void 0 : c.call(t), d && L("img", {
            class: Oi("image"),
            src: a
          }, null)];
        }
      });
    };
  }
});
const Fa = kn(OE), [TE, Ti] = fn("tag"), NE = {
  size: String,
  mark: Boolean,
  show: vr,
  type: jt("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var $E = U({
  name: TE,
  props: NE,
  emits: ["close"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = (a) => {
      a.stopPropagation(), n("close", a);
    }, o = () => e.plain ? {
      color: e.textColor || e.color,
      borderColor: e.color
    } : {
      color: e.textColor,
      background: e.color
    }, s = () => {
      var a;
      const {
        type: l,
        mark: i,
        plain: u,
        round: d,
        size: c,
        closeable: p
      } = e, v = {
        mark: i,
        plain: u,
        round: d
      };
      c && (v[c] = c);
      const f = p && L(Fa, {
        name: "cross",
        class: [Ti("close"), Ps],
        onClick: r
      }, null);
      return L("span", {
        style: o(),
        class: Ti([v, l])
      }, [(a = t.default) == null ? void 0 : a.call(t), f]);
    };
    return () => L(br, {
      name: e.closeable ? "van-fade" : void 0
    }, {
      default: () => [e.show ? s() : null]
    });
  }
});
const AE = kn($E), [PE, gn] = fn("image"), RE = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: Ue,
  height: Ue,
  radius: Ue,
  lazyLoad: Boolean,
  iconSize: Ue,
  showError: vr,
  errorIcon: jt("photo-fail"),
  iconPrefix: String,
  showLoading: vr,
  loadingIcon: jt("photo")
};
var IE = U({
  name: PE,
  props: RE,
  emits: ["load", "error"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = O(!1), o = O(!0), s = O(), {
      $Lazyload: a
    } = ce().proxy, l = P(() => {
      const h = {
        width: Lt(e.width),
        height: Lt(e.height)
      };
      return kt(e.radius) && (h.overflow = "hidden", h.borderRadius = Lt(e.radius)), h;
    });
    q(() => e.src, () => {
      r.value = !1, o.value = !0;
    });
    const i = (h) => {
      o.value = !1, t("load", h);
    }, u = (h) => {
      r.value = !0, o.value = !1, t("error", h);
    }, d = (h, g, m) => m ? m() : L(Fa, {
      name: h,
      size: e.iconSize,
      class: g,
      classPrefix: e.iconPrefix
    }, null), c = () => {
      if (o.value && e.showLoading)
        return L("div", {
          class: gn("loading")
        }, [d(e.loadingIcon, gn("loading-icon"), n.loading)]);
      if (r.value && e.showError)
        return L("div", {
          class: gn("error")
        }, [d(e.errorIcon, gn("error-icon"), n.error)]);
    }, p = () => {
      if (r.value || !e.src)
        return;
      const h = {
        alt: e.alt,
        class: gn("img"),
        style: {
          objectFit: e.fit,
          objectPosition: e.position
        }
      };
      return e.lazyLoad ? $e(L("img", an({
        ref: s
      }, h), null), [[un("lazy"), e.src]]) : L("img", an({
        src: e.src,
        onLoad: i,
        onError: u
      }, h), null);
    }, v = ({
      el: h
    }) => {
      const g = () => {
        h === s.value && o.value && i();
      };
      s.value ? g() : xe(g);
    }, f = ({
      el: h
    }) => {
      h === s.value && !r.value && u();
    };
    return a && X_ && (a.$on("loaded", v), a.$on("error", f), nt(() => {
      a.$off("loaded", v), a.$off("error", f);
    })), () => {
      var h;
      return L("div", {
        class: gn({
          round: e.round,
          block: e.block
        }),
        style: l.value
      }, [p(), c(), (h = n.default) == null ? void 0 : h.call(n)]);
    };
  }
});
const LE = kn(IE), [FE, Pe] = fn("card"), ME = {
  tag: String,
  num: Ue,
  desc: String,
  thumb: String,
  title: String,
  price: Ue,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: jt("¥"),
  thumbLink: String,
  originPrice: Ue
};
var DE = U({
  name: FE,
  props: ME,
  emits: ["click-thumb"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = () => {
      if (t.title)
        return t.title();
      if (e.title)
        return L("div", {
          class: [Pe("title"), "van-multi-ellipsis--l2"]
        }, [e.title]);
    }, o = () => {
      if (t.tag || e.tag)
        return L("div", {
          class: Pe("tag")
        }, [t.tag ? t.tag() : L(AE, {
          mark: !0,
          type: "danger"
        }, {
          default: () => [e.tag]
        })]);
    }, s = () => t.thumb ? t.thumb() : L(LE, {
      src: e.thumb,
      fit: "cover",
      width: "100%",
      height: "100%",
      lazyLoad: e.lazyLoad
    }, null), a = () => {
      if (t.thumb || e.thumb)
        return L("a", {
          href: e.thumbLink,
          class: Pe("thumb"),
          onClick: (u) => n("click-thumb", u)
        }, [s(), o()]);
    }, l = () => {
      if (t.desc)
        return t.desc();
      if (e.desc)
        return L("div", {
          class: [Pe("desc"), "van-ellipsis"]
        }, [e.desc]);
    }, i = () => {
      const u = e.price.toString().split(".");
      return L("div", null, [L("span", {
        class: Pe("price-currency")
      }, [e.currency]), L("span", {
        class: Pe("price-integer")
      }, [u[0]]), In("."), L("span", {
        class: Pe("price-decimal")
      }, [u[1]])]);
    };
    return () => {
      var u, d, c;
      const p = t.num || kt(e.num), v = t.price || kt(e.price), f = t["origin-price"] || kt(e.originPrice), h = p || v || f || t.bottom, g = v && L("div", {
        class: Pe("price")
      }, [t.price ? t.price() : i()]), m = f && L("div", {
        class: Pe("origin-price")
      }, [t["origin-price"] ? t["origin-price"]() : `${e.currency} ${e.originPrice}`]), y = p && L("div", {
        class: Pe("num")
      }, [t.num ? t.num() : `x${e.num}`]), w = t.footer && L("div", {
        class: Pe("footer")
      }, [t.footer()]), b = h && L("div", {
        class: Pe("bottom")
      }, [(u = t["price-top"]) == null ? void 0 : u.call(t), g, m, y, (d = t.bottom) == null ? void 0 : d.call(t)]);
      return L("div", {
        class: Pe()
      }, [L("div", {
        class: Pe("header")
      }, [a(), L("div", {
        class: Pe("content", {
          centered: e.centered
        })
      }, [L("div", null, [r(), l(), (c = t.tags) == null ? void 0 : c.call(t)]), b])]), w]);
    };
  }
});
const td = kn(DE), [kE, ht] = fn("nav-bar"), BE = {
  title: String,
  fixed: Boolean,
  zIndex: Ue,
  border: vr,
  leftText: String,
  rightText: String,
  leftArrow: Boolean,
  placeholder: Boolean,
  safeAreaInsetTop: Boolean
};
var HE = U({
  name: kE,
  props: BE,
  emits: ["click-left", "click-right"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = O(), o = hE(r, ht), s = (d) => t("click-left", d), a = (d) => t("click-right", d), l = () => n.left ? n.left() : [e.leftArrow && L(Fa, {
      class: ht("arrow"),
      name: "arrow-left"
    }, null), e.leftText && L("span", {
      class: ht("text")
    }, [e.leftText])], i = () => n.right ? n.right() : L("span", {
      class: ht("text")
    }, [e.rightText]), u = () => {
      const {
        title: d,
        fixed: c,
        border: p,
        zIndex: v
      } = e, f = Q_(v), h = e.leftArrow || e.leftText || n.left, g = e.rightText || n.right;
      return L("div", {
        ref: r,
        style: f,
        class: [ht({
          fixed: c
        }), {
          [cE]: p,
          "van-safe-area-top": e.safeAreaInsetTop
        }]
      }, [L("div", {
        class: ht("content")
      }, [h && L("div", {
        class: [ht("left"), Ps],
        onClick: s
      }, [l()]), L("div", {
        class: [ht("title"), "van-ellipsis"]
      }, [n.title ? n.title() : d]), g && L("div", {
        class: [ht("right"), Ps],
        onClick: a
      }, [i()])])]);
    };
    return () => e.fixed && e.placeholder ? o(u) : u();
  }
});
const VE = kn(HE);
const nd = {
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
      const o = VE, s = un("atomicattr");
      return $e((D(), K("div", null, [
        L(o, {
          title: t.props && t.props.title || "标题",
          style: { "background-color": "#ee0a24" }
        }, null, 8, ["title"])
      ])), [
        [s, t.props.atomicAttrs]
      ]);
    };
  }
};
const rd = {
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
      const o = td, s = un("atomicattr");
      return $e((D(), K("div", null, [
        L(o, {
          num: t.props.num || "1",
          price: t.props.price || "2999.00",
          desc: t.props.desc || "New IPAD 10.8inc",
          title: t.props.title || "IPAD 2022",
          thumb: t.props.pic || "https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        }, null, 8, ["num", "price", "desc", "title", "thumb"])
      ])), [
        [s, t.props.atomicAttrs]
      ]);
    };
  }
};
const zE = { class: "offerList" }, WE = {
  __name: "OfferList",
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = Q("$request"), r = {
      id: 1,
      title: "MatePad 10 Pro",
      desc: "New MatePad Pro 10.8",
      price: "2699.00",
      num: "3",
      pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1"
    }, o = async (a) => a === "PadList" ? await n.get("/v1/products/pad") : a === "PhoneList" ? await n.get("/v1/products/phone") : [r], s = O([]);
    return Dt(async () => {
      const a = t.props.condition;
      a ? s.value = await o(a) : s.value = [r];
    }), (a, l) => {
      const i = td, u = un("atomicattr");
      return $e((D(), K("div", zE, [
        (D(!0), K(Ye, null, rs(s.value, (d) => (D(), K("div", {
          key: d.id
        }, [
          L(i, {
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
}, od = /* @__PURE__ */ La(WE, [["__scopeId", "data-v-fa13870e"]]), jE = (e) => {
  e.component("SimpleImage", Yc), e.component("NavBar", nd), e.component("Offer", rd), e.component("OfferList", od);
}, KE = {
  SimpleImage: Yc,
  NavBar: nd,
  Offer: rd,
  OfferList: od
}, UE = {
  BasicWebComponentsIn: j_,
  BasicMobileComponentsIn: jE
}, GE = {
  BasicWebComponents: K_,
  BasicMobileComponents: KE
};
export {
  GE as allComponents,
  UE as default
};
