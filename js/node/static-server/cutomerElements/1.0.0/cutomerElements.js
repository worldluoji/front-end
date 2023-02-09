import { ref as x, reactive as ie, defineComponent as B, computed as I, createVNode as c, provide as ue, watchEffect as K, inject as U, mergeProps as O, Transition as se, getCurrentInstance as le, watch as de, onBeforeUnmount as fe, withDirectives as z, resolveDirective as Z, nextTick as me, createTextVNode as q, openBlock as F, createElementBlock as w, Fragment as ge, renderList as ve, createElementVNode as k, vModelSelect as he, pushScopeId as be, popScopeId as Ee } from "vue";
const E = (e) => e != null, _e = (e) => typeof e == "function", G = (e) => e !== null && typeof e == "object", H = (e) => typeof e == "number" || /^\d+(\.\d+)?$/.test(e), pe = typeof window < "u";
function T(e, t) {
  const n = t.split(".");
  let r = e;
  return n.forEach((i) => {
    var a;
    r = G(r) && (a = r[i]) != null ? a : "";
  }), r;
}
const v = [Number, String], D = {
  type: Boolean,
  default: !0
}, _ = (e) => ({
  type: String,
  default: e
});
function b(e) {
  if (E(e))
    return H(e) ? `${e}px` : String(e);
}
const ye = /-(\w)/g, Q = (e) => e.replace(ye, (t, n) => n.toUpperCase()), Pe = (e) => e.replace(/([A-Z])/g, "-$1").toLowerCase().replace(/^-/, ""), { hasOwnProperty: $e } = Object.prototype;
function Be(e, t, n) {
  const r = t[n];
  E(r) && (!$e.call(e, n) || !G(r) ? e[n] = r : e[n] = W(Object(e[n]), r));
}
function W(e, t) {
  return Object.keys(t).forEach((n) => {
    Be(e, t, n);
  }), e;
}
var Ce = {
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
const j = x("zh-CN"), N = ie({
  "zh-CN": Ce
}), xe = {
  messages() {
    return N[j.value];
  },
  use(e, t) {
    j.value = e, this.add({ [e]: t });
  },
  add(e = {}) {
    W(N, e);
  }
};
var Le = xe;
function Se(e) {
  const t = Q(e) + ".";
  return (n, ...r) => {
    const i = Le.messages(), a = T(i, t + n) || T(i, n);
    return _e(a) ? a(...r) : a;
  };
}
function A(e, t) {
  return t ? typeof t == "string" ? ` ${e}--${t}` : Array.isArray(t) ? t.reduce(
    (n, r) => n + A(e, r),
    ""
  ) : Object.keys(t).reduce(
    (n, r) => n + (t[r] ? A(e, r) : ""),
    ""
  ) : "";
}
function Fe(e) {
  return (t, n) => (t && typeof t != "string" && (n = t, t = ""), t = t ? `${e}__${t}` : e, `${t}${A(t, n)}`);
}
function C(e) {
  const t = `van-${e}`;
  return [
    t,
    Fe(t),
    Se(t)
  ];
}
const we = "van-haptics-feedback";
function L(e) {
  return e.install = (t) => {
    const { name: n } = e;
    n && (t.component(n, e), t.component(Q(`-${n}`), e));
  }, e;
}
const [De, V] = C("badge"), Ie = {
  dot: Boolean,
  max: v,
  tag: _("div"),
  color: String,
  offset: Array,
  content: v,
  showZero: D,
  position: _("top-right")
};
var Oe = B({
  name: De,
  props: Ie,
  setup(e, {
    slots: t
  }) {
    const n = () => {
      if (t.content)
        return !0;
      const {
        content: o,
        showZero: u
      } = e;
      return E(o) && o !== "" && (u || o !== 0 && o !== "0");
    }, r = () => {
      const {
        dot: o,
        max: u,
        content: l
      } = e;
      if (!o && n())
        return t.content ? t.content() : E(u) && H(l) && +l > u ? `${u}+` : l;
    }, i = I(() => {
      const o = {
        background: e.color
      };
      if (e.offset) {
        const [u, l] = e.offset;
        t.default ? (o.top = b(l), typeof u == "number" ? o.right = b(-u) : o.right = u.startsWith("-") ? u.replace("-", "") : `-${u}`) : (o.marginTop = b(l), o.marginLeft = b(u));
      }
      return o;
    }), a = () => {
      if (n() || e.dot)
        return c("div", {
          class: V([e.position, {
            dot: e.dot,
            fixed: !!t.default
          }]),
          style: i.value
        }, [r()]);
    };
    return () => {
      if (t.default) {
        const {
          tag: o
        } = e;
        return c(o, {
          class: V("wrapper")
        }, {
          default: () => [t.default(), a()]
        });
      }
      return a();
    };
  }
});
const Ae = L(Oe), ze = (e) => {
}, [Y, ke] = C("config-provider"), J = Symbol(Y), Te = {
  tag: _("div"),
  zIndex: Number,
  themeVars: Object,
  iconPrefix: String
};
function je(e) {
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[`--van-${Pe(n)}`] = e[n];
  }), t;
}
B({
  name: Y,
  props: Te,
  setup(e, {
    slots: t
  }) {
    const n = I(() => {
      if (e.themeVars)
        return je(e.themeVars);
    });
    return ue(J, e), K(() => {
      e.zIndex !== void 0 && ze(e.zIndex);
    }), () => c(e.tag, {
      class: ke(),
      style: n.value
    }, {
      default: () => {
        var r;
        return [(r = t.default) == null ? void 0 : r.call(t)];
      }
    });
  }
});
const [Ne, M] = C("icon"), Ve = (e) => e == null ? void 0 : e.includes("/"), Me = {
  dot: Boolean,
  tag: _("i"),
  name: String,
  size: v,
  badge: v,
  color: String,
  badgeProps: Object,
  classPrefix: String
};
var Re = B({
  name: Ne,
  props: Me,
  setup(e, {
    slots: t
  }) {
    const n = U(J, null), r = I(() => e.classPrefix || (n == null ? void 0 : n.iconPrefix) || M());
    return () => {
      const {
        tag: i,
        dot: a,
        name: o,
        size: u,
        badge: l,
        color: f
      } = e, d = Ve(o);
      return c(Ae, O({
        dot: a,
        tag: i,
        class: [r.value, d ? "" : `${r.value}-${o}`],
        style: {
          color: f,
          fontSize: b(u)
        },
        content: l
      }, e.badgeProps), {
        default: () => {
          var g;
          return [(g = t.default) == null ? void 0 : g.call(t), d && c("img", {
            class: M("image"),
            src: o
          }, null)];
        }
      });
    };
  }
});
const X = L(Re), [Ke, R] = C("tag"), Ue = {
  size: String,
  mark: Boolean,
  show: D,
  type: _("default"),
  color: String,
  plain: Boolean,
  round: Boolean,
  textColor: String,
  closeable: Boolean
};
var Ze = B({
  name: Ke,
  props: Ue,
  emits: ["close"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = (o) => {
      o.stopPropagation(), n("close", o);
    }, i = () => e.plain ? {
      color: e.textColor || e.color,
      borderColor: e.color
    } : {
      color: e.textColor,
      background: e.color
    }, a = () => {
      var o;
      const {
        type: u,
        mark: l,
        plain: f,
        round: d,
        size: g,
        closeable: y
      } = e, h = {
        mark: l,
        plain: f,
        round: d
      };
      g && (h[g] = g);
      const p = y && c(X, {
        name: "cross",
        class: [R("close"), we],
        onClick: r
      }, null);
      return c("span", {
        style: i(),
        class: R([h, u])
      }, [(o = t.default) == null ? void 0 : o.call(t), p]);
    };
    return () => c(se, {
      name: e.closeable ? "van-fade" : void 0
    }, {
      default: () => [e.show ? a() : null]
    });
  }
});
const qe = L(Ze), [Ge, $] = C("image"), He = {
  src: String,
  alt: String,
  fit: String,
  position: String,
  round: Boolean,
  block: Boolean,
  width: v,
  height: v,
  radius: v,
  lazyLoad: Boolean,
  iconSize: v,
  showError: D,
  errorIcon: _("photo-fail"),
  iconPrefix: String,
  showLoading: D,
  loadingIcon: _("photo")
};
var Qe = B({
  name: Ge,
  props: He,
  emits: ["load", "error"],
  setup(e, {
    emit: t,
    slots: n
  }) {
    const r = x(!1), i = x(!0), a = x(), {
      $Lazyload: o
    } = le().proxy, u = I(() => {
      const s = {
        width: b(e.width),
        height: b(e.height)
      };
      return E(e.radius) && (s.overflow = "hidden", s.borderRadius = b(e.radius)), s;
    });
    de(() => e.src, () => {
      r.value = !1, i.value = !0;
    });
    const l = (s) => {
      i.value = !1, t("load", s);
    }, f = (s) => {
      r.value = !0, i.value = !1, t("error", s);
    }, d = (s, P, S) => S ? S() : c(X, {
      name: s,
      size: e.iconSize,
      class: P,
      classPrefix: e.iconPrefix
    }, null), g = () => {
      if (i.value && e.showLoading)
        return c("div", {
          class: $("loading")
        }, [d(e.loadingIcon, $("loading-icon"), n.loading)]);
      if (r.value && e.showError)
        return c("div", {
          class: $("error")
        }, [d(e.errorIcon, $("error-icon"), n.error)]);
    }, y = () => {
      if (r.value || !e.src)
        return;
      const s = {
        alt: e.alt,
        class: $("img"),
        style: {
          objectFit: e.fit,
          objectPosition: e.position
        }
      };
      return e.lazyLoad ? z(c("img", O({
        ref: a
      }, s), null), [[Z("lazy"), e.src]]) : c("img", O({
        src: e.src,
        onLoad: l,
        onError: f
      }, s), null);
    }, h = ({
      el: s
    }) => {
      const P = () => {
        s === a.value && i.value && l();
      };
      a.value ? P() : me(P);
    }, p = ({
      el: s
    }) => {
      s === a.value && !r.value && f();
    };
    return o && pe && (o.$on("loaded", h), o.$on("error", p), fe(() => {
      o.$off("loaded", h), o.$off("error", p);
    })), () => {
      var s;
      return c("div", {
        class: $({
          round: e.round,
          block: e.block
        }),
        style: u.value
      }, [y(), g(), (s = n.default) == null ? void 0 : s.call(n)]);
    };
  }
});
const We = L(Qe), [Ye, m] = C("card"), Je = {
  tag: String,
  num: v,
  desc: String,
  thumb: String,
  title: String,
  price: v,
  centered: Boolean,
  lazyLoad: Boolean,
  currency: _("¥"),
  thumbLink: String,
  originPrice: v
};
var Xe = B({
  name: Ye,
  props: Je,
  emits: ["click-thumb"],
  setup(e, {
    slots: t,
    emit: n
  }) {
    const r = () => {
      if (t.title)
        return t.title();
      if (e.title)
        return c("div", {
          class: [m("title"), "van-multi-ellipsis--l2"]
        }, [e.title]);
    }, i = () => {
      if (t.tag || e.tag)
        return c("div", {
          class: m("tag")
        }, [t.tag ? t.tag() : c(qe, {
          mark: !0,
          type: "danger"
        }, {
          default: () => [e.tag]
        })]);
    }, a = () => t.thumb ? t.thumb() : c(We, {
      src: e.thumb,
      fit: "cover",
      width: "100%",
      height: "100%",
      lazyLoad: e.lazyLoad
    }, null), o = () => {
      if (t.thumb || e.thumb)
        return c("a", {
          href: e.thumbLink,
          class: m("thumb"),
          onClick: (f) => n("click-thumb", f)
        }, [a(), i()]);
    }, u = () => {
      if (t.desc)
        return t.desc();
      if (e.desc)
        return c("div", {
          class: [m("desc"), "van-ellipsis"]
        }, [e.desc]);
    }, l = () => {
      const f = e.price.toString().split(".");
      return c("div", null, [c("span", {
        class: m("price-currency")
      }, [e.currency]), c("span", {
        class: m("price-integer")
      }, [f[0]]), q("."), c("span", {
        class: m("price-decimal")
      }, [f[1]])]);
    };
    return () => {
      var f, d, g;
      const y = t.num || E(e.num), h = t.price || E(e.price), p = t["origin-price"] || E(e.originPrice), s = y || h || p || t.bottom, P = h && c("div", {
        class: m("price")
      }, [t.price ? t.price() : l()]), S = p && c("div", {
        class: m("origin-price")
      }, [t["origin-price"] ? t["origin-price"]() : `${e.currency} ${e.originPrice}`]), oe = y && c("div", {
        class: m("num")
      }, [t.num ? t.num() : `x${e.num}`]), ce = t.footer && c("div", {
        class: m("footer")
      }, [t.footer()]), ae = s && c("div", {
        class: m("bottom")
      }, [(f = t["price-top"]) == null ? void 0 : f.call(t), P, S, oe, (d = t.bottom) == null ? void 0 : d.call(t)]);
      return c("div", {
        class: m()
      }, [c("div", {
        class: m("header")
      }, [o(), c("div", {
        class: m("content", {
          centered: e.centered
        })
      }, [c("div", null, [r(), u(), (g = t.tags) == null ? void 0 : g.call(t)]), ae])]), ce]);
    };
  }
});
const et = L(Xe);
const ee = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, tt = { class: "offerList" }, nt = {
  __name: "OfferList",
  props: {
    props: {
      type: Object,
      default: () => ({})
    }
  },
  setup(e) {
    const t = e, n = U("$request"), r = {
      id: 1,
      title: "MatePad 10 Pro",
      desc: "New MatePad Pro 10.8",
      price: "2699.00",
      num: "3",
      pic: "https://tse4-mm.cn.bing.net/th/id/OIP-C.Yc1Bz6kwzPTW7MlSMdQMxQHaEK?pid=ImgDet&rs=1"
    }, i = async (o) => o === "PadList" ? await n.get("/v1/products/pad") : o === "PhoneList" ? await n.get("/v1/products/phone") : [r], a = x([]);
    return K(async () => {
      const o = t.props.condition;
      o ? a.value = await i(o) : a.value = [r];
    }), (o, u) => {
      const l = et, f = Z("atomicattr");
      return z((F(), w("div", tt, [
        (F(!0), w(ge, null, ve(a.value, (d) => (F(), w("div", {
          key: d.id
        }, [
          c(l, {
            num: d.num,
            price: d.price,
            desc: d.desc,
            title: d.title,
            thumb: d.pic
          }, null, 8, ["num", "price", "desc", "title", "thumb"])
        ]))), 128))
      ])), [
        [f, t.props.atomicAttrs]
      ]);
    };
  }
}, te = /* @__PURE__ */ ee(nt, [["__scopeId", "data-v-8a3574b1"]]), rt = "OfferList", ot = "商品列表", ct = "商品列表", at = "business", it = "", ut = [
  "mobile"
], st = {
  name: rt,
  title: ot,
  description: ct,
  type: at,
  icon: it,
  platforms: ut
}, lt = (e) => {
  e.component("OfferList", te);
}, Et = {
  OfferList: te
}, _t = {
  OfferListInfo: st
};
const ne = (e) => (be("data-v-3edec17d"), e = e(), Ee(), e), dt = { class: "OfferListPanel" }, ft = /* @__PURE__ */ ne(() => /* @__PURE__ */ k("option", { value: "PadList" }, "获取Pad数据", -1)), mt = /* @__PURE__ */ ne(() => /* @__PURE__ */ k("option", { value: "PhoneList" }, "获取Phone数据", -1)), gt = [
  ft,
  mt
], vt = {
  __name: "OfferListPanel",
  props: {
    props: {
      type: Object,
      required: !0
    }
  },
  emits: ["change"],
  setup(e, { emit: t }) {
    const n = e, r = {
      condition: n.props.condition ? n.props.condition : ""
    }, i = () => {
      console.log(r), t("change", r);
    };
    return (a, o) => (F(), w("div", dt, [
      q(" 选择数据: "),
      z(k("select", {
        "onUpdate:modelValue": o[0] || (o[0] = (u) => r.condition = u),
        onChange: i
      }, gt, 544), [
        [he, r.condition]
      ])
    ]));
  }
}, re = /* @__PURE__ */ ee(vt, [["__scopeId", "data-v-3edec17d"]]), ht = (e) => {
  e.component("OfferListPanel", re);
}, pt = {
  OfferListPanel: re
}, yt = {
  installComponents: lt,
  installComponentPanels: ht
};
export {
  pt as CustomerComponentPanels,
  Et as CustomerComponents,
  _t as CustomerComponentsInfo,
  yt as install
};
