// ==UserScript==
// @name         通用表单自动填充（多页面+快捷键版 · Element UI / Plus）
// @namespace    http://tampermonkey.net/
// @version      3.1.2
// @description  支持多页面配置 + Element UI / Element Plus 组件 + 原生表单，含可视化配置页（右下角浮动按钮 / Ctrl+Alt+C）
// @author       You
// @match        *://*/*
// @grant        none
// @run-at       document-end
// ==/UserScript==


(() => {
  // src/dom-utils.js
  var _a;
  var inputValueSetter = (_a = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    "value"
  )) == null ? void 0 : _a.set;
  var _a2;
  var textareaValueSetter = (_a2 = Object.getOwnPropertyDescriptor(
    HTMLTextAreaElement.prototype,
    "value"
  )) == null ? void 0 : _a2.set;
  function setNativeValue(el, value) {
    if (!el) return;
    const setter = el.tagName === "TEXTAREA" ? textareaValueSetter : inputValueSetter;
    if (setter) {
      setter.call(el, value);
    } else {
      el.value = value;
    }
  }
  function triggerInputEvents(el) {
    if (!el) return;
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }
  function fillInput(el, value) {
    if (!el) return false;
    if (el.tagName !== "INPUT" && el.tagName !== "TEXTAREA") return false;
    el.focus();
    setNativeValue(el, value);
    triggerInputEvents(el);
    return true;
  }
  var wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  async function waitFor(predicate, timeout = 2e3, interval = 50) {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      const result = predicate();
      if (result) return result;
      await wait(interval);
    }
    return predicate();
  }
  function observeUntil(visibleCheck, timeout = 2e3) {
    return new Promise((resolve) => {
      let resolved = false;
      const finish = (value) => {
        if (resolved) return;
        resolved = true;
        observer.disconnect();
        resolve(value);
      };
      const observer = new MutationObserver(() => {
        const v = visibleCheck();
        if (v) finish(v);
      });
      observer.observe(document.body, { childList: true, subtree: true });
      const immediate = visibleCheck();
      if (immediate) {
        finish(immediate);
        return;
      }
      setTimeout(() => finish(visibleCheck()), timeout);
    });
  }

  // src/fillers/native.js
  function fillCheckbox(el, value) {
    if (el.type !== "checkbox") return false;
    const desired = !!value;
    if (el.checked === desired) return true;
    el.click();
    if (el.checked !== desired) {
      el.checked = desired;
    }
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return el.checked === desired;
  }
  function fillRadio(el, value) {
    if (el.type !== "radio") return false;
    if (value !== true && (value == null || el.value !== String(value))) {
      return false;
    }
    if (el.checked) return true;
    el.click();
    if (!el.checked) el.checked = true;
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return el.checked;
  }
  function fillRange(el, value) {
    if (el.type !== "range") return false;
    setNativeValue(el, value);
    triggerInputEvents(el);
    return true;
  }
  function fillSelect(el, value) {
    if (el.tagName !== "SELECT") return false;
    el.value = value == null ? "" : String(value);
    el.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  var nativeFiller = {
    name: "native",
    match(el) {
      if (!el) return false;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
      return false;
    },
    fill(el, value, item) {
      if (!el) return false;
      const type = item && item.type || (el.type || el.tagName).toLowerCase();
      switch (type) {
        case "input":
        case "textarea":
        case "text":
        case "number":
        case "password":
        case "email":
          return fillInput(el, value);
        case "checkbox":
        case "switch":
          return fillCheckbox(el, value);
        case "radio":
          return fillRadio(el, value);
        case "range":
        case "slider":
          return fillRange(el, value);
        case "select":
          return fillSelect(el, value);
        default: {
          if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
            return fillInput(el, value);
          }
          return false;
        }
      }
    }
  };

  // src/fillers/element-plus.js
  var SELECTOR = {
    // 兼容 Element Plus 2.5 及更早（.el-input__inner）与 2.6+（.el-select__input）
    elSelect: ".el-select",
    elSelectInput: ".el-input__inner, .el-select__input",
    elSelectWrapper: ".el-input, .el-select__wrapper",
    elSelectDropdown: ".el-select-dropdown",
    elSelectItem: ".el-select-dropdown__item, .el-select-v2__list-item, li.el-vl__item",
    elCascader: ".el-cascader",
    elCascaderPanel: ".el-cascader-panel",
    elCascaderMenu: ".el-cascader-menu",
    elCascaderNode: ".el-cascader-node",
    elCascaderSuggestionItem: ".el-cascader-suggestion__item",
    // el-date-editor 在 2.6+ 也改为 .el-input 容器，但内部 input 仍然可能是 .el-input__inner
    elDatePicker: ".el-date-editor, .el-date-editor.el-input, .el-date-editor.el-input__wrapper",
    elDatePickerInput: "input.el-input__inner, input.el-date-editor-input, .el-input__inner, .el-range-input",
    elInputNumber: ".el-input-number",
    elInputNumberInput: "input.el-input-number__input",
    elInputNumberDecrease: ".el-input-number__decrease",
    elInputNumberIncrease: ".el-input-number__increase",
    elSwitch: ".el-switch",
    elSwitchInput: 'input[type="checkbox"]',
    elSlider: ".el-slider",
    elSliderInput: 'input[type="range"]',
    elCheckboxGroup: ".el-checkbox-group",
    elCheckbox: ".el-checkbox",
    elCheckboxInput: 'input[type="checkbox"]',
    elCheckboxOriginal: ".el-checkbox__original",
    elRadioGroup: ".el-radio-group",
    elRadio: ".el-radio",
    elRadioInput: 'input[type="radio"]'
  };
  function findElSelectContainer(el) {
    return el.closest(SELECTOR.elSelect);
  }
  function getVisibleDropdown() {
    const dropdowns = document.querySelectorAll(SELECTOR.elSelectDropdown);
    for (const d of dropdowns) {
      if (d.style.display === "none") continue;
      if (d.classList.contains("is-hidden")) continue;
      return d;
    }
    return null;
  }
  function findOption(dropdown, value) {
    const strValue = value == null ? "" : String(value);
    const items = dropdown.querySelectorAll(SELECTOR.elSelectItem);
    for (const opt of items) {
      if (opt.getAttribute("disabled") !== null) continue;
      const dv = opt.getAttribute("data-value");
      if (dv != null && dv === strValue) return opt;
    }
    for (const opt of items) {
      if (opt.getAttribute("disabled") !== null) continue;
      const txt = (opt.textContent || "").trim();
      if (txt === strValue) return opt;
    }
    return null;
  }
  async function fillElSelect(el, value) {
    const container = findElSelectContainer(el);
    if (!container) return false;
    const input = container.querySelector(SELECTOR.elSelectInput);
    if (!input) return false;
    const strValue = value == null ? "" : String(value);
    if (input.value === strValue) return true;
    const wrapper = container.querySelector(SELECTOR.elSelectWrapper) || input;
    wrapper.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    wrapper.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    wrapper.click();
    input.dispatchEvent(new Event("focus", { bubbles: true }));
    const dropdown = await observeUntil(getVisibleDropdown, 2e3);
    if (!dropdown) {
      input.dispatchEvent(new Event("blur", { bubbles: true }));
      return false;
    }
    await wait(30);
    const option = findOption(dropdown, value);
    if (!option) {
      input.dispatchEvent(new Event("blur", { bubbles: true }));
      return false;
    }
    option.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    option.dispatchEvent(new MouseEvent("mouseup", { bubbles: true }));
    option.click();
    await wait(30);
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  function fillElInputNumber(el, value) {
    const container = el.closest(SELECTOR.elInputNumber) || el.parentElement;
    const input = container && container.querySelector(SELECTOR.elInputNumberInput) || el;
    if (!input || input.tagName !== "INPUT") return false;
    input.focus();
    setNativeValue(input, value);
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  function getCascaderPanel(container) {
    return container.querySelector(SELECTOR.elCascaderPanel);
  }
  function getCascaderMenus(container) {
    const panel = getCascaderPanel(container);
    if (!panel) return [];
    return Array.from(panel.querySelectorAll(SELECTOR.elCascaderMenu));
  }
  async function fillElCascader(el, value) {
    const container = el.closest(SELECTOR.elCascader);
    if (!container) return false;
    const input = container.querySelector(SELECTOR.elSelectInput);
    if (!input) return false;
    const path = Array.isArray(value) ? value.map(String) : [String(value)];
    input.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    input.click();
    input.dispatchEvent(new Event("focus", { bubbles: true }));
    const panel = await observeUntil(() => getCascaderPanel(container), 2e3);
    if (!panel) {
      input.dispatchEvent(new Event("blur", { bubbles: true }));
      return false;
    }
    await wait(50);
    for (let i = 0; i < path.length; i++) {
      const target = path[i];
      const menus = getCascaderMenus(container);
      const menu = menus[i];
      if (!menu) {
        input.dispatchEvent(new Event("blur", { bubbles: true }));
        return false;
      }
      const nodes = menu.querySelectorAll(SELECTOR.elCascaderNode);
      let matched = null;
      for (const node of nodes) {
        if (node.classList.contains("is-disabled")) continue;
        const dv = node.getAttribute("data-value");
        if (dv != null && dv === target) {
          matched = node;
          break;
        }
      }
      if (!matched) {
        input.dispatchEvent(new Event("blur", { bubbles: true }));
        return false;
      }
      matched.click();
      await wait(60);
    }
    await wait(30);
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return true;
  }
  function fillElDatePicker(el, value) {
    const container = el.closest(SELECTOR.elDatePicker) || el.parentElement;
    if (!container) return false;
    const rangeInputs = Array.from(
      container.querySelectorAll(".el-range-input")
    );
    if (rangeInputs.length >= 2) {
      if (Array.isArray(value) && value.length >= 2) {
        const ok1 = fillInput(rangeInputs[0], value[0]);
        const ok2 = fillInput(rangeInputs[1], value[1]);
        return ok1 || ok2;
      }
      return fillInput(rangeInputs[0], value);
    }
    const input = container && container.querySelector(SELECTOR.elDatePickerInput) || el;
    if (!input || input.tagName !== "INPUT") return false;
    return fillInput(input, value);
  }
  async function fillElCheckbox(el, value) {
    const input = el.tagName === "INPUT" && el.type === "checkbox" ? el : el.querySelector(SELECTOR.elCheckboxInput);
    if (!input) return false;
    const desired = !!value;
    if (input.checked === desired) return true;
    input.click();
    if (input.checked !== desired) {
      input.checked = desired;
    }
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return input.checked === desired;
  }
  function logGroupCandidates(kind, container, inputs, labelSelector, configured) {
    const candidates = inputs.map((input) => {
      const wrapper = input.closest(`.el-${kind}`);
      const labelEl = wrapper ? wrapper.querySelector(labelSelector) : null;
      return {
        value: input.value,
        label: labelEl ? (labelEl.textContent || "").trim() : ""
      };
    });
    console.warn(
      `[\u81EA\u52A8\u586B\u5145] el-${kind}-group \u672A\u5339\u914D\u5230\u4EFB\u4F55\u5019\u9009\uFF1A
  \u914D\u7F6E value: ${JSON.stringify(configured)}
  \u5019\u9009 (${candidates.length}):
` + candidates.map((c, i) => `    [${i}] value=${JSON.stringify(c.value)} label=${JSON.stringify(c.label)}`).join("\n")
    );
  }
  async function fillElCheckboxGroup(el, value) {
    const container = el.closest(SELECTOR.elCheckboxGroup);
    if (!container) return false;
    const values = Array.isArray(value) ? value.map(String) : [String(value)];
    const inputs = Array.from(
      container.querySelectorAll(SELECTOR.elCheckboxInput)
    );
    let any = false;
    for (const input of inputs) {
      const wrapper = input.closest(SELECTOR.elCheckbox);
      const labelEl = wrapper ? wrapper.querySelector(".el-checkbox__label") : null;
      const labelText = labelEl ? (labelEl.textContent || "").trim() : "";
      const nativeValue = input.value;
      const matched = values.includes(nativeValue) || values.includes(labelText);
      if (matched && !input.checked) {
        input.click();
        if (!input.checked) input.checked = true;
        input.dispatchEvent(new Event("change", { bubbles: true }));
        any = true;
      } else if (matched) {
        any = true;
      }
    }
    if (!any) {
      logGroupCandidates("checkbox", container, inputs, ".el-checkbox__label", values);
    }
    return any;
  }
  async function fillElRadio(el, value) {
    const input = el.tagName === "INPUT" && el.type === "radio" ? el : el.querySelector(SELECTOR.elRadioInput);
    if (!input) return false;
    const strValue = value == null ? "" : String(value);
    if (input.value !== strValue) return false;
    if (input.checked) return true;
    input.focus();
    input.click();
    if (!input.checked) input.checked = true;
    input.dispatchEvent(new Event("change", { bubbles: true }));
    await wait(0);
    return input.checked;
  }
  async function fillElRadioGroup(el, value) {
    const container = el.closest(SELECTOR.elRadioGroup);
    if (!container) return false;
    const strValue = value == null ? "" : String(value);
    const inputs = Array.from(
      container.querySelectorAll(SELECTOR.elRadioInput)
    );
    for (const input of inputs) {
      const wrapper = input.closest(SELECTOR.elRadio);
      const labelEl = wrapper ? wrapper.querySelector(".el-radio__label") : null;
      const labelText = labelEl ? (labelEl.textContent || "").trim() : "";
      if (input.value === strValue || labelText === strValue) {
        if (!input.checked) {
          input.focus();
          input.click();
          if (!input.checked) input.checked = true;
          input.dispatchEvent(new Event("change", { bubbles: true }));
          await wait(0);
        }
        return true;
      }
    }
    logGroupCandidates("radio", container, inputs, ".el-radio__label", strValue);
    return false;
  }
  async function fillElSwitch(el, value) {
    const container = el.closest(SELECTOR.elSwitch);
    if (!container) return false;
    const input = container.querySelector(SELECTOR.elSwitchInput);
    if (!input) return false;
    const desired = !!value;
    if (input.checked === desired) return true;
    input.click();
    if (input.checked !== desired) {
      input.checked = desired;
    }
    input.dispatchEvent(new Event("change", { bubbles: true }));
    return input.checked === desired;
  }
  function fillElSlider(el, value) {
    const container = el.closest(SELECTOR.elSlider);
    if (!container) return false;
    const input = container.querySelector(SELECTOR.elSliderInput) || el;
    if (!input || input.type !== "range") return false;
    setNativeValue(input, value);
    triggerInputEvents(input);
    return true;
  }
  var elementPlusFiller = {
    name: "element-plus",
    match(el, item) {
      if (!el) return false;
      const type = item && item.type || "";
      const inElSelect = !!findElSelectContainer(el);
      const inElCascader = !!el.closest(SELECTOR.elCascader);
      const inElDatePicker = !!el.closest(SELECTOR.elDatePicker);
      const inElInputNumber = !!el.closest(SELECTOR.elInputNumber);
      const inElSwitch = !!el.closest(SELECTOR.elSwitch);
      const inElSlider = !!el.closest(SELECTOR.elSlider);
      const inElCheckboxGroup = !!el.closest(SELECTOR.elCheckboxGroup);
      const inElCheckbox = !!el.closest(SELECTOR.elCheckbox);
      const inElRadioGroup = !!el.closest(SELECTOR.elRadioGroup);
      const inElRadio = !!el.closest(SELECTOR.elRadio);
      if (type === "select") return inElSelect;
      if (type === "cascader") return inElCascader;
      if (type === "input-number" || type === "number-input")
        return inElInputNumber;
      if (type === "date" || type === "datetime" || type === "time")
        return inElDatePicker;
      if (type === "checkbox") {
        return inElCheckbox || inElCheckboxGroup || el.tagName === "INPUT" || el.tagName === "LABEL";
      }
      if (type === "radio") {
        return inElRadio || inElRadioGroup || el.tagName === "INPUT" || el.tagName === "LABEL";
      }
      if (type === "switch") return inElSwitch;
      if (type === "slider") return inElSlider;
      return inElSelect || inElCascader || inElInputNumber || inElDatePicker || inElSwitch || inElSlider || inElCheckboxGroup || inElCheckbox || inElRadioGroup || inElRadio;
    },
    fill(el, value, item) {
      const type = item && item.type || "";
      if (type === "select" && findElSelectContainer(el)) {
        return fillElSelect(el, value);
      }
      if (type === "cascader" && el.closest(SELECTOR.elCascader)) {
        return fillElCascader(el, value);
      }
      if ((type === "input-number" || type === "number-input") && el.closest(SELECTOR.elInputNumber)) {
        return fillElInputNumber(el, value);
      }
      if ((type === "date" || type === "datetime" || type === "time") && el.closest(SELECTOR.elDatePicker)) {
        return fillElDatePicker(el, value);
      }
      if (type === "checkbox") {
        const group = el.closest(SELECTOR.elCheckboxGroup);
        if (Array.isArray(value) || group) {
          return fillElCheckboxGroup(el, value);
        }
        if (el.closest(SELECTOR.elCheckbox) || el.tagName === "INPUT" || el.tagName === "LABEL") {
          return fillElCheckbox(el, value);
        }
        return false;
      }
      if (type === "radio") {
        if (el.closest(SELECTOR.elRadioGroup)) {
          return fillElRadioGroup(el, value);
        }
        if (el.closest(SELECTOR.elRadio) || el.tagName === "INPUT" || el.tagName === "LABEL") {
          return fillElRadio(el, value);
        }
        return false;
      }
      if (type === "switch" && el.closest(SELECTOR.elSwitch)) {
        return fillElSwitch(el, value);
      }
      if (type === "slider" && el.closest(SELECTOR.elSlider)) {
        return fillElSlider(el, value);
      }
      if (findElSelectContainer(el)) return fillElSelect(el, value);
      if (el.closest(SELECTOR.elCascader)) return fillElCascader(el, value);
      if (el.closest(SELECTOR.elInputNumber)) return fillElInputNumber(el, value);
      if (el.closest(SELECTOR.elDatePicker)) return fillElDatePicker(el, value);
      if (el.closest(SELECTOR.elSwitch)) return fillElSwitch(el, value);
      if (el.closest(SELECTOR.elSlider)) return fillElSlider(el, value);
      if (el.closest(SELECTOR.elCheckboxGroup))
        return fillElCheckboxGroup(el, value);
      if (el.closest(SELECTOR.elCheckbox))
        return fillElCheckbox(el, value);
      if (el.closest(SELECTOR.elRadio))
        return fillElRadio(el, value);
      if (el.closest(SELECTOR.elRadioGroup))
        return fillElRadioGroup(el, value);
      return false;
    }
  };

  // src/fillers/index.js
  var fillers = [elementPlusFiller, nativeFiller];

  // src/matchers.js
  function isUrlMatch(pattern, currentUrl) {
    if (pattern == null) return false;
    if (pattern instanceof RegExp) return pattern.test(currentUrl);
    if (typeof pattern === "string") return currentUrl.includes(pattern);
    return false;
  }
  function findMatchingConfig(configs, currentUrl) {
    if (!Array.isArray(configs)) return null;
    for (const config of configs) {
      if (isUrlMatch(config == null ? void 0 : config.urlPattern, currentUrl)) return config;
    }
    return null;
  }

  // src/config.js
  var DEFAULT_CONFIG = {
    AUTO_FILL_ON_LOAD: false,
    SHORTCUT: {
      key: "O",
      ctrl: false,
      alt: false,
      shift: true,
      meta: true
    },
    SHORTCUT_PROFILE_SWITCH: {
      key: "P",
      ctrl: false,
      alt: false,
      shift: true,
      meta: true
    },
    PAGE_CONFIGS: [
      {
        name: "\u7528\u6237\u4FE1\u606F\u9875\uFF08\u793A\u4F8B\uFF09",
        urlPattern: /\/user\/(profile|edit)/,
        profiles: {
          default: {
            fields: [
              { selector: "#userid", value: "123456", type: "input" },
              { selector: "input[name='username']", value: "\u5F20\u4E09", type: "input" },
              { selector: ".department-select .el-input__inner", value: "tech", type: "select" }
            ]
          }
        }
      },
      {
        name: "\u8BA2\u5355\u7533\u8BF7\u9875\uFF08\u793A\u4F8B\uFF09",
        urlPattern: "/order/apply",
        profiles: {
          default: {
            fields: [
              { selector: "#orderId", value: "ORD-2025001", type: "input" },
              { selector: "input[name='quantity']", value: "10", type: "input" },
              { selector: "#agreeTerms", value: true, type: "checkbox" }
            ]
          }
        }
      }
    ]
  };
  function resolveConfig() {
    var _a3;
    if (typeof window === "undefined") return DEFAULT_CONFIG;
    const winOverride = window.__AUTOFILL_CONFIG__;
    let stored = null;
    try {
      const raw = (_a3 = window.localStorage) == null ? void 0 : _a3.getItem("form_autofill_config_v3");
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === "object") stored = parsed;
      }
    } catch (e) {
    }
    const merged = { ...DEFAULT_CONFIG, ...stored || {}, ...winOverride || {} };
    return {
      AUTO_FILL_ON_LOAD: typeof merged.AUTO_FILL_ON_LOAD === "boolean" ? merged.AUTO_FILL_ON_LOAD : DEFAULT_CONFIG.AUTO_FILL_ON_LOAD,
      SHORTCUT: { ...DEFAULT_CONFIG.SHORTCUT, ...merged.SHORTCUT || {} },
      SHORTCUT_PROFILE_SWITCH: {
        ...DEFAULT_CONFIG.SHORTCUT_PROFILE_SWITCH,
        ...merged.SHORTCUT_PROFILE_SWITCH || {}
      },
      PAGE_CONFIGS: Array.isArray(merged.PAGE_CONFIGS) ? merged.PAGE_CONFIGS : DEFAULT_CONFIG.PAGE_CONFIGS
    };
  }

  // src/config-storage.js
  var STORAGE_KEY = "form_autofill_config_v3";
  var PROFILE_STORAGE_KEY = "form_autofill_active_profiles";
  function hasLocalStorage() {
    try {
      return typeof localStorage !== "undefined";
    } catch (e) {
      return false;
    }
  }
  function readProfileMap() {
    if (!hasLocalStorage()) return {};
    try {
      const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) {
      return {};
    }
  }
  function writeProfileMap(map) {
    if (!hasLocalStorage()) return;
    try {
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(map));
    } catch (e) {
    }
  }
  function loadStoredConfig() {
    if (!hasLocalStorage()) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      return parsed;
    } catch (e) {
      console.warn("[\u81EA\u52A8\u586B\u5145] \u8BFB\u53D6\u914D\u7F6E\u5931\u8D25\uFF1A", e);
      return null;
    }
  }
  function saveStoredConfig(config) {
    if (!hasLocalStorage()) return false;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (e) {
      console.warn("[\u81EA\u52A8\u586B\u5145] \u4FDD\u5B58\u914D\u7F6E\u5931\u8D25\uFF1A", e);
      return false;
    }
  }
  function clearStoredConfig() {
    if (!hasLocalStorage()) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
    }
  }
  function normalizeConfig(raw) {
    const base = DEFAULT_CONFIG;
    if (!raw || typeof raw !== "object") return structuredClone(base);
    return {
      AUTO_FILL_ON_LOAD: typeof raw.AUTO_FILL_ON_LOAD === "boolean" ? raw.AUTO_FILL_ON_LOAD : base.AUTO_FILL_ON_LOAD,
      SHORTCUT: { ...base.SHORTCUT, ...raw.SHORTCUT || {} },
      SHORTCUT_PROFILE_SWITCH: {
        ...base.SHORTCUT_PROFILE_SWITCH,
        ...raw.SHORTCUT_PROFILE_SWITCH || {}
      },
      PAGE_CONFIGS: Array.isArray(raw.PAGE_CONFIGS) ? raw.PAGE_CONFIGS.map((p) => normalizePage(p)) : []
    };
  }
  function normalizeField(f) {
    var _a3;
    let t = typeof (f == null ? void 0 : f.type) === "string" ? f.type : "input";
    if (t === "checkbox-group") t = "checkbox";
    if (t === "radio-group") t = "radio";
    return {
      selector: typeof (f == null ? void 0 : f.selector) === "string" ? f.selector : "",
      value: (_a3 = f == null ? void 0 : f.value) != null ? _a3 : "",
      type: t
    };
  }
  function normalizeProfile(prof) {
    if (!prof || typeof prof !== "object") return { fields: [] };
    return {
      fields: Array.isArray(prof.fields) ? prof.fields.map(normalizeField) : []
    };
  }
  function normalizePage(p) {
    var _a3;
    const name = typeof (p == null ? void 0 : p.name) === "string" ? p.name : "\u672A\u547D\u540D";
    const urlPattern = (_a3 = p == null ? void 0 : p.urlPattern) != null ? _a3 : "";
    let profiles;
    if ((p == null ? void 0 : p.profiles) && typeof p.profiles === "object" && Object.keys(p.profiles).length > 0) {
      profiles = {};
      for (const [k, v] of Object.entries(p.profiles)) {
        profiles[k] = normalizeProfile(v);
      }
    } else {
      profiles = {
        default: {
          fields: Array.isArray(p == null ? void 0 : p.fields) ? p.fields.map(normalizeField) : []
        }
      };
    }
    if (Object.keys(profiles).length === 0) {
      profiles = { default: { fields: [] } };
    }
    return { name, urlPattern, profiles };
  }
  function getActiveProfile(pageConfig) {
    if (!pageConfig || !pageConfig.profiles) return null;
    const keys = Object.keys(pageConfig.profiles);
    if (keys.length === 0) return null;
    const map = readProfileMap();
    const stored = map[pageConfig.name];
    if (stored && pageConfig.profiles[stored]) return stored;
    if (pageConfig.profiles.default) return "default";
    return keys[0];
  }
  function setActiveProfile(pageConfig, profileName) {
    if (!pageConfig || !pageConfig.profiles) return false;
    if (!pageConfig.profiles[profileName]) return false;
    const map = readProfileMap();
    map[pageConfig.name] = profileName;
    writeProfileMap(map);
    return true;
  }
  function listProfiles(pageConfig) {
    if (!pageConfig || !pageConfig.profiles) return [];
    return Object.keys(pageConfig.profiles);
  }
  function exportConfigJson(config) {
    return JSON.stringify(config, null, 2);
  }
  function importConfigJson(json) {
    const parsed = JSON.parse(json);
    return normalizeConfig(parsed);
  }

  // src/core.js
  var filledSet = /* @__PURE__ */ new WeakSet();
  function isFilled(el) {
    return filledSet.has(el);
  }
  function markFilled(el) {
    filledSet.add(el);
  }
  function clearFilled(el) {
    filledSet.delete(el);
  }
  function ensureProfiles(page) {
    if (!page) return null;
    if (!page.profiles || Object.keys(page.profiles).length === 0) {
      const legacy = Array.isArray(page.fields) ? page.fields : [];
      page.profiles = { default: { fields: legacy } };
    }
    return page;
  }
  function getActiveFields(page) {
    var _a3;
    if (!page) return [];
    ensureProfiles(page);
    const name = getActiveProfile(page);
    if (!name) return [];
    return ((_a3 = page.profiles[name]) == null ? void 0 : _a3.fields) || [];
  }
  async function tryFill(item) {
    const el = document.querySelector(item.selector);
    if (!el) return false;
    if (isFilled(el)) return false;
    for (const filler of fillers) {
      if (!filler.match(el, item)) continue;
      const ok = await filler.fill(el, item.value, item);
      if (ok === true) {
        markFilled(el);
        console.log(`[\u81EA\u52A8\u586B\u5145] ${item.selector} \u586B\u5145\u5B8C\u6210 (${filler.name})`);
        return true;
      }
    }
    console.warn(`[\u81EA\u52A8\u586B\u5145] ${item.selector} \u6CA1\u6709\u53EF\u7528\u7684\u586B\u5145\u5668`);
    return false;
  }
  async function executeFill(profileOverride) {
    var _a3;
    const cfg = resolveConfig();
    const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
    if (!config) return;
    ensureProfiles(config);
    const profileName = profileOverride && config.profiles[profileOverride] ? profileOverride : getActiveProfile(config);
    const fields = ((_a3 = config.profiles[profileName]) == null ? void 0 : _a3.fields) || [];
    if (fields.length === 0) return;
    if (!cfg.AUTO_FILL_ON_LOAD) {
      fields.forEach((item) => {
        const el = document.querySelector(item.selector);
        if (el) clearFilled(el);
      });
    }
    for (const item of fields) {
      await tryFill(item);
    }
  }
  function autoFillIfEnabled() {
    const cfg = resolveConfig();
    if (!cfg.AUTO_FILL_ON_LOAD) return;
    const observer = new MutationObserver(() => {
      const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
      if (!config) return;
      ensureProfiles(config);
      const fields = getActiveFields(config);
      if (fields.length === 0) return;
      let allReady = true;
      for (const item of fields) {
        const el = document.querySelector(item.selector);
        if (!el || !isFilled(el)) {
          allReady = false;
          break;
        }
      }
      if (allReady) {
        observer.disconnect();
        console.log("[\u81EA\u52A8\u586B\u5145] \u6240\u6709\u8868\u5355\u9879\u5DF2\u586B\u5145\u5B8C\u6BD5");
        return;
      }
      (async () => {
        for (const item of fields) {
          await tryFill(item);
        }
      })();
    });
    if (document.body) {
      observer.observe(document.body, { childList: true, subtree: true });
    } else {
      document.addEventListener(
        "DOMContentLoaded",
        () => observer.observe(document.body, { childList: true, subtree: true }),
        { once: true }
      );
    }
  }
  var shortcutHandler = null;
  var shortcutLoggedKey = null;
  function setupShortcut() {
    if (shortcutHandler) {
      window.removeEventListener("keydown", shortcutHandler);
      shortcutHandler = null;
    }
    const { SHORTCUT } = resolveConfig();
    const { key, ctrl, alt, shift, meta } = SHORTCUT;
    const targetKey = (key || "").toUpperCase();
    shortcutHandler = (e) => {
      var _a3;
      if ((e.key || "").toUpperCase() !== targetKey) return;
      if (!!e.ctrlKey !== !!ctrl) return;
      if (!!e.altKey !== !!alt) return;
      if (!!e.shiftKey !== !!shift) return;
      if (!!e.metaKey !== !!meta) return;
      const tag = e.target && e.target.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || ((_a3 = e.target) == null ? void 0 : _a3.isContentEditable)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      console.log("[\u81EA\u52A8\u586B\u5145] \u5FEB\u6377\u952E\u89E6\u53D1\u586B\u5145");
      executeFill();
    };
    window.addEventListener("keydown", shortcutHandler);
    const comboKey = [
      ctrl && "Ctrl",
      alt && "Alt",
      shift && "Shift",
      meta && "Meta",
      targetKey
    ].filter(Boolean).join("+");
    if (comboKey !== shortcutLoggedKey) {
      console.log(`[\u81EA\u52A8\u586B\u5145] \u5FEB\u6377\u952E\u5DF2\u542F\u7528\uFF1A${comboKey}`);
      shortcutLoggedKey = comboKey;
    }
  }
  var profileSwitchLoggedKey = null;
  function setupProfileSwitchShortcut() {
    const { SHORTCUT_PROFILE_SWITCH } = resolveConfig();
    if (!SHORTCUT_PROFILE_SWITCH || !SHORTCUT_PROFILE_SWITCH.key) return;
    const { key, ctrl, alt, shift, meta } = SHORTCUT_PROFILE_SWITCH;
    const targetKey = (key || "").toUpperCase();
    const handler = (e) => {
      var _a3;
      if ((e.key || "").toUpperCase() !== targetKey) return;
      if (!!e.ctrlKey !== !!ctrl) return;
      if (!!e.altKey !== !!alt) return;
      if (!!e.shiftKey !== !!shift) return;
      if (!!e.metaKey !== !!meta) return;
      const tag = e.target && e.target.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || ((_a3 = e.target) == null ? void 0 : _a3.isContentEditable)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      cycleProfile();
    };
    window.addEventListener("keydown", handler);
    const comboKey = [
      ctrl && "Ctrl",
      alt && "Alt",
      shift && "Shift",
      meta && "Meta",
      targetKey
    ].filter(Boolean).join("+");
    if (comboKey !== profileSwitchLoggedKey) {
      console.log(`[\u81EA\u52A8\u586B\u5145] profile \u5207\u6362\u5FEB\u6377\u952E\u5DF2\u542F\u7528\uFF1A${comboKey}`);
      profileSwitchLoggedKey = comboKey;
    }
  }
  function cycleProfile() {
    var _a3;
    const config = findMatchingConfig(
      resolveConfig().PAGE_CONFIGS,
      window.location.href
    );
    if (!config) {
      console.log("[\u81EA\u52A8\u586B\u5145] \u5F53\u524D\u9875\u9762\u6CA1\u6709\u5339\u914D\u7684\u914D\u7F6E\uFF0C\u65E0\u6CD5\u5207\u6362 profile");
      return null;
    }
    ensureProfiles(config);
    const profiles = listProfiles(config);
    if (profiles.length <= 1) {
      console.log(`[\u81EA\u52A8\u586B\u5145] ${config.name} \u53EA\u6709 1 \u4E2A profile\uFF0C\u65E0\u9700\u5207\u6362`);
      return null;
    }
    const current = getActiveProfile(config);
    const idx = Math.max(0, profiles.indexOf(current));
    const next = profiles[(idx + 1) % profiles.length];
    setActiveProfile(config, next);
    const nextFields = ((_a3 = config.profiles[next]) == null ? void 0 : _a3.fields) || [];
    nextFields.forEach((item) => {
      const el = document.querySelector(item.selector);
      if (el) clearFilled(el);
    });
    console.log(`[\u81EA\u52A8\u586B\u5145] \u5207\u6362 profile: ${config.name} \u2192 ${next}`);
    return { configName: config.name, profile: next };
  }

  // src/config-types.js
  var FIELD_TYPES = [
    { value: "input", label: "input (\u6587\u672C\u8F93\u5165\u6846)", defaultValue: "" },
    { value: "select", label: "select (\u4E0B\u62C9\u9009\u62E9)", defaultValue: "" },
    { value: "checkbox", label: "checkbox (\u590D\u9009\u6846)", defaultValue: false },
    { value: "radio", label: "radio (\u5355\u9009)", defaultValue: "" },
    { value: "range", label: "range (\u6ED1\u5757)", defaultValue: 0 },
    { value: "slider", label: "slider (\u6ED1\u5757)", defaultValue: 0 },
    { value: "switch", label: "switch (\u5F00\u5173)", defaultValue: false },
    { value: "input-number", label: "input-number (\u6570\u5B57\u8F93\u5165)", defaultValue: 0 },
    { value: "date", label: "date (\u65E5\u671F\u9009\u62E9\u5668)", defaultValue: "" },
    { value: "datetime", label: "datetime (\u65E5\u671F\u65F6\u95F4)", defaultValue: "" },
    { value: "time", label: "time (\u65F6\u95F4\u9009\u62E9\u5668)", defaultValue: "" },
    { value: "cascader", label: "cascader (\u7EA7\u8054\u9009\u62E9)", defaultValue: [] }
  ];
  var DEFAULT_BY_TYPE = Object.fromEntries(
    FIELD_TYPES.map((t) => [t.value, t.defaultValue])
  );
  function getDefaultValueByType(type) {
    return DEFAULT_BY_TYPE[type] !== void 0 ? structuredClone(DEFAULT_BY_TYPE[type]) : "";
  }
  function getFieldTypeLabel(type) {
    const t = FIELD_TYPES.find((x) => x.value === type);
    return t ? t.label : type;
  }

  // src/config-ui.js
  var STYLES = `
* { box-sizing: border-box; }
:root, :host { all: initial; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

.backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2147483646;
  display: flex; align-items: center; justify-content: center;
}
.modal {
  width: 880px; max-width: 95vw; max-height: 90vh;
  background: #fff; color: #222;
  border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,.3);
  display: flex; flex-direction: column; overflow: hidden;
  font-size: 14px;
}
.header {
  padding: 12px 16px; background: #409eff; color: #fff;
  display: flex; justify-content: space-between; align-items: center;
}
.header h2 { margin: 0; font-size: 16px; font-weight: 600; }
.header button {
  background: transparent; color: #fff; border: 0; cursor: pointer;
  font-size: 20px; line-height: 1;
}
.tabs {
  display: flex; border-bottom: 1px solid #eee; background: #fafafa;
}
.tabs button {
  flex: 1; padding: 10px; border: 0; background: transparent; cursor: pointer;
  font-size: 14px; color: #606266;
}
.tabs button.active { background: #fff; color: #409eff; border-bottom: 2px solid #409eff; }
.body { flex: 1; overflow: auto; padding: 16px; }
.footer {
  padding: 12px 16px; border-top: 1px solid #eee; background: #fafafa;
  display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;
}
.btn {
  padding: 6px 14px; border: 1px solid #dcdfe6; background: #fff; border-radius: 4px;
  cursor: pointer; font-size: 13px; color: #606266;
}
.btn:hover { border-color: #409eff; color: #409eff; }
.btn.primary { background: #409eff; color: #fff; border-color: #409eff; }
.btn.primary:hover { background: #66b1ff; color: #fff; }
.btn.danger { color: #f56c6c; border-color: #fbc4c4; }
.btn.danger:hover { background: #f56c6c; color: #fff; }
.btn.sm { padding: 3px 8px; font-size: 12px; }

.form-row { display: flex; align-items: center; margin-bottom: 12px; gap: 8px; }
.form-row label { width: 110px; color: #606266; flex-shrink: 0; }
.form-row input[type=text], .form-row input[type=number], .form-row select, .form-row textarea {
  flex: 1; padding: 6px 10px; border: 1px solid #dcdfe6; border-radius: 4px;
  font-size: 13px;
}
.form-row textarea { min-height: 60px; resize: vertical; font-family: inherit; }
.form-row .hint { color: #909399; font-size: 12px; }

.split { display: flex; gap: 16px; height: 100%; }
.list-pane { width: 240px; border-right: 1px solid #eee; padding-right: 12px; display: flex; flex-direction: column; }
.list-pane .list { flex: 1; overflow: auto; margin-bottom: 8px; }
.list-item {
  padding: 8px 10px; border-radius: 4px; cursor: pointer; margin-bottom: 4px;
  border: 1px solid transparent;
}
.list-item:hover { background: #f5f7fa; }
.list-item.active { background: #ecf5ff; border-color: #b3d8ff; color: #409eff; }
.list-item .name { font-weight: 500; }
.list-item .url { font-size: 11px; color: #909399; margin-top: 2px; word-break: break-all; }
.detail-pane { flex: 1; overflow: auto; }

.fields-table { width: 100%; border-collapse: collapse; margin-top: 8px; table-layout: fixed; }
.fields-table th { text-align: left; padding: 6px; background: #f5f7fa; font-size: 12px; color: #606266; font-weight: 600; }
.fields-table td { padding: 4px; border-bottom: 1px solid #eee; vertical-align: top; }
.fields-table input, .fields-table select {
  width: 100%; padding: 4px 6px; border: 1px solid #dcdfe6; border-radius: 3px; font-size: 12px;
  box-sizing: border-box; min-width: 0;
}
.fields-table input[data-field="selector"] {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}
.fields-table .type-col { width: 140px; }
.fields-table .selector-col { width: auto; }
.fields-table .value-col { width: 200px; }
.fields-table .act-col { width: 70px; text-align: center; }
.fields-table .hint { color: #909399; font-size: 11px; margin-top: 2px; word-wrap: break-word; }
.fields-table .value-col .hint { white-space: normal; }

.empty { color: #909399; text-align: center; padding: 40px 0; font-size: 13px; }

.profile-tabs {
  display: flex; gap: 6px; align-items: center;
  margin: 0 0 8px 0; flex-wrap: wrap;
}
.profile-tab {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border: 1px solid #dcdfe6; background: #fff; border-radius: 14px;
  cursor: pointer; font-size: 12px; color: #606266;
  user-select: none;
}
.profile-tab:hover { border-color: #409eff; color: #409eff; }
.profile-tab.active { background: #409eff; color: #fff; border-color: #409eff; }
.profile-tab .badge {
  font-size: 10px; padding: 1px 5px; border-radius: 8px;
  background: #67c23a; color: #fff;
}
.profile-tab.active .badge { background: rgba(255,255,255,.3); }
.profile-tab .x {
  margin-left: 2px; color: #f56c6c; font-weight: 700; opacity: 0.6;
}
.profile-tab.active .x { color: #fff; opacity: 0.8; }
.profile-tab .x:hover { opacity: 1; }
.profile-tabs .add-btn {
  border-style: dashed; background: transparent;
}
.profile-hint { color: #909399; font-size: 11px; margin-bottom: 8px; }

.shortcut-group { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.shortcut-group label { width: auto; display: inline-flex; align-items: center; gap: 4px; }

.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,.8); color: #fff; padding: 8px 16px; border-radius: 4px;
  font-size: 13px; z-index: 2147483647;
}
.toast.error { background: #f56c6c; }
.toast.success { background: #67c23a; }
`;
  var activeHost = null;
  function openConfigUI() {
    if (activeHost) {
      activeHost.remove();
      activeHost = null;
    }
    const initial = loadStoredConfig() ? normalizeConfig(loadStoredConfig()) : structuredClone(DEFAULT_CONFIG);
    const state = {
      config: initial,
      activePageIndex: 0,
      activeTab: "global",
      // UI 当前编辑的 profile 索引（按对象 key 顺序），按 pageIdx 缓存
      activeProfileIndexByPage: {}
    };
    function getPageProfileKeys(page) {
      if (!page || !page.profiles) return [];
      return Object.keys(page.profiles);
    }
    function getEditingProfileKey(pageIdx) {
      const page = state.config.PAGE_CONFIGS[pageIdx];
      if (!page) return null;
      const keys = getPageProfileKeys(page);
      if (keys.length === 0) return null;
      let idx = state.activeProfileIndexByPage[pageIdx];
      if (!Number.isInteger(idx) || idx < 0 || idx >= keys.length) {
        idx = 0;
        state.activeProfileIndexByPage[pageIdx] = idx;
      }
      return keys[idx];
    }
    function setEditingProfileIndex(pageIdx, idx) {
      state.activeProfileIndexByPage[pageIdx] = idx;
    }
    const host = document.createElement("div");
    host.setAttribute("data-autofill-config-ui", "");
    const shadow = host.attachShadow({ mode: "open" });
    const style = document.createElement("style");
    style.textContent = STYLES;
    shadow.appendChild(style);
    const root = document.createElement("div");
    root.className = "backdrop";
    shadow.appendChild(root);
    function render() {
      root.innerHTML = `
      <div class="modal" role="dialog" aria-label="\u81EA\u52A8\u586B\u5145\u914D\u7F6E">
        <div class="header">
          <h2>\u2699 \u81EA\u52A8\u586B\u5145\u914D\u7F6E</h2>
          <button type="button" data-act="close" aria-label="\u5173\u95ED">\xD7</button>
        </div>
        <div class="tabs">
          <button type="button" data-tab="global">\u5168\u5C40\u8BBE\u7F6E</button>
          <button type="button" data-tab="pages">\u9875\u9762\u914D\u7F6E</button>
        </div>
        <div class="body"></div>
        <div class="footer">
          <button type="button" class="btn" data-act="import">\u5BFC\u5165 JSON</button>
          <button type="button" class="btn" data-act="export">\u5BFC\u51FA JSON</button>
          <button type="button" class="btn danger" data-act="reset">\u6062\u590D\u9ED8\u8BA4</button>
          <span style="flex:1"></span>
          <button type="button" class="btn" data-act="test">\u6D4B\u8BD5\u586B\u5145</button>
          <button type="button" class="btn" data-act="cancel">\u53D6\u6D88</button>
          <button type="button" class="btn primary" data-act="save">\u4FDD\u5B58</button>
        </div>
      </div>
    `;
      root.querySelectorAll(".tabs button").forEach(
        (b) => b.classList.toggle("active", b.dataset.tab === state.activeTab)
      );
      const body = root.querySelector(".body");
      if (state.activeTab === "global") {
        body.innerHTML = renderGlobal(state.config);
      } else {
        body.innerHTML = renderPages(state.config, state.activePageIndex);
      }
    }
    function renderGlobal(cfg) {
      const s = cfg.SHORTCUT || {};
      return `
      <div class="form-row">
        <label>\u9875\u9762\u52A0\u8F7D\u81EA\u52A8\u586B\u5145</label>
        <label style="width:auto"><input type="checkbox" data-bind="AUTO_FILL_ON_LOAD" ${cfg.AUTO_FILL_ON_LOAD ? "checked" : ""}/> \u5F00\u542F\u540E\u7B49\u5F85\u5143\u7D20\u51FA\u73B0\u81EA\u52A8\u586B</label>
      </div>
      <div class="form-row">
        <label>\u5FEB\u6377\u952E\u89E6\u53D1\u952E</label>
        <input type="text" data-bind="SHORTCUT.key" value="${escapeAttr(s.key || "")}" maxlength="1" style="width:60px;text-transform:uppercase"/>
        <span class="hint">\u5355\u4E2A\u5B57\u6BCD\uFF08A-Z\uFF09</span>
      </div>
      <div class="form-row">
        <label>\u4FEE\u9970\u952E</label>
        <div class="shortcut-group">
          <label><input type="checkbox" data-bind="SHORTCUT.ctrl" ${s.ctrl ? "checked" : ""}/> Ctrl</label>
          <label><input type="checkbox" data-bind="SHORTCUT.alt" ${s.alt ? "checked" : ""}/> Alt</label>
          <label><input type="checkbox" data-bind="SHORTCUT.shift" ${s.shift ? "checked" : ""}/> Shift</label>
          <label><input type="checkbox" data-bind="SHORTCUT.meta" ${s.meta ? "checked" : ""}/> Meta (Cmd/Win)</label>
        </div>
      </div>
      <div class="form-row">
        <label>\u8BF4\u660E</label>
        <span class="hint">\u5FEB\u6377\u952E\u5728\u8F93\u5165\u6846\u805A\u7126\u65F6\u4E0D\u89E6\u53D1\uFF0C\u907F\u514D\u8BEF\u89E6\u3002</span>
      </div>
    `;
    }
    function renderPages(cfg, activeIdx) {
      const pages = cfg.PAGE_CONFIGS || [];
      const active = pages[activeIdx];
      return `
      <div class="split">
        <div class="list-pane">
          <div class="list">
            ${pages.length === 0 ? '<div class="empty">\u8FD8\u6CA1\u6709\u914D\u7F6E\uFF0C\u70B9\u51FB\u4E0B\u65B9\u65B0\u589E</div>' : pages.map(
        (p, i) => {
          var _a3;
          return `
                <div class="list-item ${i === activeIdx ? "active" : ""}" data-page="${i}">
                  <div class="name">${escapeHtml(p.name || "(\u672A\u547D\u540D)")}</div>
                  <div class="url">${escapeHtml(String((_a3 = p.urlPattern) != null ? _a3 : ""))}</div>
                </div>
              `;
        }
      ).join("")}
          </div>
          <button type="button" class="btn primary sm" data-act="add-page">+ \u65B0\u589E\u9875\u9762</button>
        </div>
        <div class="detail-pane">
          ${active ? renderPageDetail(active, activeIdx) : '<div class="empty">\u8BF7\u9009\u62E9\u5DE6\u4FA7\u4E00\u4E2A\u9875\u9762\u8FDB\u884C\u7F16\u8F91</div>'}
        </div>
      </div>
    `;
    }
    function renderPageDetail(page, idx) {
      var _a3;
      const profileKeys = getPageProfileKeys(page);
      const editingKey = getEditingProfileKey(idx);
      const editingIdx = state.activeProfileIndexByPage[idx] || 0;
      const profile = editingKey ? page.profiles[editingKey] : null;
      const fields = (profile == null ? void 0 : profile.fields) || [];
      const persistedActive = getActiveProfile(page);
      const tabs = profileKeys.map((k, ki) => {
        const isEditing = ki === editingIdx;
        const isPersisted = k === persistedActive;
        const canDel = profileKeys.length > 1;
        return `
          <span class="profile-tab ${isEditing ? "active" : ""}" data-act="select-profile" data-idx="${idx}" data-pi="${ki}" title="${escapeAttr(k)}${isPersisted ? "\uFF08\u8FD0\u884C\u65F6\u6FC0\u6D3B\uFF09" : ""}">
            <span class="name">${escapeHtml(k)}</span>
            ${isPersisted ? '<span class="badge">\u6FC0\u6D3B</span>' : ""}
            ${canDel ? `<span class="x" data-act="del-profile" data-idx="${idx}" data-pi="${ki}" title="\u5220\u9664\u6B64 profile">\xD7</span>` : ""}
          </span>
        `;
      }).join("");
      return `
      <div class="form-row">
        <label>\u9875\u9762\u540D\u79F0</label>
        <input type="text" data-page-field="name" data-idx="${idx}" value="${escapeAttr(page.name || "")}"/>
      </div>
      <div class="form-row">
        <label>URL \u5339\u914D</label>
        <input type="text" data-page-field="urlPattern" data-idx="${idx}" value="${escapeAttr(String((_a3 = page.urlPattern) != null ? _a3 : ""))}"/>
        <span class="hint">\u5B57\u7B26\u4E32\u5305\u542B\u5339\u914D\uFF0C\u6216 <code>/regex/</code></span>
      </div>
      <div class="form-row" style="align-items:flex-start">
        <label>Profiles</label>
        <div style="flex:1">
          <div class="profile-tabs">
            ${tabs}
            <span class="profile-tab add-btn" data-act="add-profile" data-idx="${idx}" title="\u65B0\u5EFA profile">+ \u65B0\u5EFA</span>
          </div>
          <div class="profile-hint">\u7F16\u8F91\u4E2D\u7684 profile\uFF1A<b>${escapeHtml(editingKey || "")}</b>\u3002\u8FD0\u884C\u65F6\u6FC0\u6D3B\u6001\uFF08\u6301\u4E45\u5316\uFF09\u4EE5 <span style="color:#67c23a">\u6FC0\u6D3B</span> \u6807\u8BB0\u4E3A\u51C6\uFF0C\u53EF\u7531\u5FEB\u6377\u952E\u5FAA\u73AF\u5207\u6362\u3002</div>
          <table class="fields-table">
            <colgroup>
              <col class="type-col"><col class="selector-col"><col class="value-col"><col class="act-col">
            </colgroup>
            <thead>
              <tr><th class="type-col">\u7C7B\u578B</th><th class="selector-col">\u9009\u62E9\u5668 (CSS)</th><th class="value-col">\u503C</th><th class="act-col">\u64CD\u4F5C</th></tr>
            </thead>
            <tbody>
              ${fields.map((f, fi) => renderFieldRow(f, idx, fi)).join("")}
              ${fields.length === 0 ? '<tr><td colspan="4" class="empty" style="padding:16px">\u5F53\u524D profile \u8FD8\u6CA1\u6709\u5B57\u6BB5\uFF0C\u70B9\u51FB\u4E0B\u65B9\u65B0\u589E</td></tr>' : ""}
            </tbody>
          </table>
          <button type="button" class="btn sm" data-act="add-field" data-idx="${idx}" style="margin-top:8px">+ \u65B0\u589E\u5B57\u6BB5</button>
          <button type="button" class="btn danger sm" data-act="del-page" data-idx="${idx}" style="margin-top:8px;float:right">\u5220\u9664\u6B64\u9875\u9762</button>
        </div>
      </div>
    `;
    }
    function renderFieldRow(field, pageIdx, fieldIdx) {
      const type = field.type || "input";
      const opts = FIELD_TYPES.map(
        (t) => `<option value="${t.value}" ${t.value === type ? "selected" : ""}>${escapeHtml(t.label)}</option>`
      ).join("");
      return `
      <tr data-field-row="${fieldIdx}">
        <td class="type-col">
          <select data-field="type" data-pi="${pageIdx}" data-fi="${fieldIdx}">${opts}</select>
        </td>
        <td class="selector-col">
          <input type="text" data-field="selector" data-pi="${pageIdx}" data-fi="${fieldIdx}" value="${escapeAttr(field.selector || "")}" placeholder="#id / .class / [name=...]"/>
          <div class="hint">${escapeHtml(valueHint(type))}</div>
        </td>
        <td class="value-col">
          ${renderValueInput(field, pageIdx, fieldIdx)}
        </td>
        <td class="act-col">
          <button type="button" class="btn danger sm" data-act="del-field" data-pi="${pageIdx}" data-fi="${fieldIdx}">\u5220\u9664</button>
        </td>
      </tr>
    `;
    }
    function renderValueInput(field, pageIdx, fieldIdx) {
      const v = field.value;
      const t = field.type || "input";
      const baseAttrs = `data-field="value" data-pi="${pageIdx}" data-fi="${fieldIdx}"`;
      if (t === "switch") {
        const checked = !!v ? "checked" : "";
        return `<label style="display:flex;align-items:center;gap:6px;padding-top:6px"><input type="checkbox" ${baseAttrs} ${checked}/> ${escapeHtml(getFieldTypeLabel(t))}</label>`;
      }
      if (t === "checkbox") {
        let displayValue;
        if (typeof v === "boolean") displayValue = v ? "true" : "false";
        else if (Array.isArray(v)) displayValue = JSON.stringify(v);
        else displayValue = String(v != null ? v : "");
        return `<input type="text" ${baseAttrs} value="${escapeAttr(displayValue)}" placeholder="true / false  \u6216  [&quot;a&quot;,&quot;b&quot;]"/>`;
      }
      if (t === "radio") {
        let displayValue;
        if (typeof v === "boolean") displayValue = v ? "true" : "false";
        else displayValue = String(v != null ? v : "");
        return `<input type="text" ${baseAttrs} value="${escapeAttr(displayValue)}" placeholder="true \u6216 radio \u7684 value"/>`;
      }
      if (t === "range" || t === "slider" || t === "input-number") {
        return `<input type="number" ${baseAttrs} value="${escapeAttr(String(v != null ? v : 0))}"/>`;
      }
      if (t === "cascader") {
        const arrStr = JSON.stringify(v || []);
        return `<input type="text" ${baseAttrs} value='${escapeAttr(arrStr)}' placeholder='["level1","level2"]'/><div class="hint">\u5B57\u7B26\u4E32\uFF08\u5355\u503C\u8DEF\u5F84\uFF09\u6216 JSON \u6570\u7EC4</div>`;
      }
      return `<input type="text" ${baseAttrs} value="${escapeAttr(String(v != null ? v : ""))}"/>`;
    }
    function valueHint(type) {
      switch (type) {
        case "select":
          return "value \u5339\u914D data-value \u6216\u9009\u9879\u6587\u672C";
        case "radio":
          return "true \u9009\u4E2D\u8BE5 radio\uFF1B\u5176\u4ED6\u503C\u5339\u914D input.value\uFF1B\u7EC4\u5185\u6309 value/label";
        case "checkbox":
          return "true / false \u5207\u6362\uFF1BJSON \u6570\u7EC4\u52FE\u9009\u590D\u9009\u6846\u7EC4";
        case "switch":
          return "true / false";
        case "range":
        case "slider":
        case "input-number":
          return "\u6570\u5B57";
        case "cascader":
          return '\u5B57\u7B26\u4E32\uFF08\u53D6\u5339\u914D\u8DEF\u5F84\uFF09\u6216 ["level1","level2"]';
        case "date":
        case "datetime":
        case "time":
          return "\u5B57\u7B26\u4E32\uFF0C\u5982 2026-09-21 / 12:30:00";
        default:
          return "";
      }
    }
    function showToast(text, type = "") {
      const t = document.createElement("div");
      t.className = `toast ${type}`;
      t.textContent = text;
      shadow.appendChild(t);
      setTimeout(() => t.remove(), 2200);
    }
    function bindGlobal() {
      shadow.addEventListener("input", (e) => {
        const t = e.target;
        const bind = t.dataset.bind;
        if (!bind) return;
        if (t.type === "checkbox") {
          setPath(state.config, bind, t.checked);
        } else if (t.type === "number") {
          setPath(state.config, bind, Number(t.value));
        } else {
          setPath(state.config, bind, t.value);
        }
      });
    }
    function bindTabs() {
      root.querySelectorAll(".tabs button").forEach((btn) => {
        btn.addEventListener("click", () => {
          state.activeTab = btn.dataset.tab;
          render();
        });
      });
    }
    function bindActions() {
      shadow.addEventListener("click", (e) => {
        const btn = e.target.closest("[data-act]");
        if (!btn) return;
        const act = btn.dataset.act;
        switch (act) {
          case "close":
          case "cancel":
            closeUI();
            return;
          case "save":
            onSave();
            return;
          case "test":
            onTest();
            return;
          case "reset":
            if (confirm("\u6062\u590D\u9ED8\u8BA4\u914D\u7F6E\uFF1F\u5F53\u524D\u4FDD\u5B58\u7684\u914D\u7F6E\u4F1A\u88AB\u8986\u76D6\u3002")) {
              state.config = structuredClone(DEFAULT_CONFIG);
              state.activePageIndex = 0;
              render();
              showToast("\u5DF2\u6062\u590D\u9ED8\u8BA4\uFF08\u672A\u4FDD\u5B58\uFF09", "success");
            }
            return;
          case "export":
            onExport();
            return;
          case "import":
            onImport();
            return;
          case "add-page":
            state.config.PAGE_CONFIGS.push({
              name: `\u65B0\u9875\u9762 ${state.config.PAGE_CONFIGS.length + 1}`,
              urlPattern: "",
              fields: []
            });
            state.activePageIndex = state.config.PAGE_CONFIGS.length - 1;
            render();
            return;
          case "del-page": {
            const idx = Number(btn.dataset.idx);
            if (confirm("\u5220\u9664\u6B64\u9875\u9762\uFF1F")) {
              state.config.PAGE_CONFIGS.splice(idx, 1);
              state.activePageIndex = Math.max(0, idx - 1);
              render();
            }
            return;
          }
          case "add-field": {
            const idx = Number(btn.dataset.idx);
            const page = state.config.PAGE_CONFIGS[idx];
            if (!page) return;
            const k = getEditingProfileKey(idx);
            if (!k) return;
            page.profiles[k].fields = page.profiles[k].fields || [];
            page.profiles[k].fields.push({
              selector: "",
              value: getDefaultValueByType("input"),
              type: "input"
            });
            render();
            return;
          }
          case "del-field": {
            const pi = Number(btn.dataset.pi);
            const fi = Number(btn.dataset.fi);
            const page = state.config.PAGE_CONFIGS[pi];
            if (!page) return;
            const k = getEditingProfileKey(pi);
            if (!k || !page.profiles[k].fields) return;
            page.profiles[k].fields.splice(fi, 1);
            render();
            return;
          }
          case "add-profile": {
            const idx = Number(btn.dataset.idx);
            const page = state.config.PAGE_CONFIGS[idx];
            if (!page) return;
            const baseName = "profile";
            let name = baseName;
            let i = 1;
            while (page.profiles[name]) {
              i += 1;
              name = `${baseName}${i}`;
            }
            page.profiles[name] = { fields: [] };
            const keys = getPageProfileKeys(page);
            setEditingProfileIndex(idx, keys.length - 1);
            render();
            return;
          }
          case "del-profile": {
            e.stopPropagation();
            const idx = Number(btn.dataset.idx);
            const pi = Number(btn.dataset.pi);
            const page = state.config.PAGE_CONFIGS[idx];
            if (!page) return;
            const keys = getPageProfileKeys(page);
            if (keys.length <= 1) return;
            const removeKey = keys[pi];
            if (!confirm(`\u5220\u9664 profile \u201C${removeKey}\u201D\uFF1F\u5176\u6240\u6709\u5B57\u6BB5\u4F1A\u4E22\u5931\u3002`)) return;
            delete page.profiles[removeKey];
            const cur = state.activeProfileIndexByPage[idx] || 0;
            if (cur >= pi) {
              setEditingProfileIndex(idx, Math.max(0, cur - 1));
            }
            render();
            return;
          }
        }
      });
      shadow.addEventListener("click", (e) => {
        const item = e.target.closest("[data-page]");
        if (item && !e.target.closest('[data-act="select-profile"]') && !e.target.closest('[data-act="del-profile"]')) {
          const idx = Number(item.dataset.page);
          if (Number.isFinite(idx) && idx !== state.activePageIndex) {
            state.activePageIndex = idx;
            render();
          }
        }
        const selectTab = e.target.closest('[data-act="select-profile"]');
        if (selectTab) {
          const idx = Number(selectTab.dataset.idx);
          const pi = Number(selectTab.dataset.pi);
          if (Number.isFinite(idx) && Number.isFinite(pi)) {
            setEditingProfileIndex(idx, pi);
            render();
          }
        }
      });
      shadow.addEventListener("input", (e) => {
        const t = e.target;
        if (t.dataset.pageField) {
          const idx = Number(t.dataset.idx);
          const page = state.config.PAGE_CONFIGS[idx];
          if (!page) return;
          page[t.dataset.pageField] = t.value;
          if (t.dataset.pageField === "urlPattern" || t.dataset.pageField === "name") {
            const listItem = root.querySelector(`[data-page="${idx}"] .${t.dataset.pageField === "name" ? "name" : "url"}`);
            if (listItem) listItem.textContent = t.value;
          }
          return;
        }
        if (t.dataset.field) {
          const pi = Number(t.dataset.pi);
          const fi = Number(t.dataset.fi);
          const page = state.config.PAGE_CONFIGS[pi];
          if (!page) return;
          const k = getEditingProfileKey(pi);
          if (!k || !page.profiles[k] || !page.profiles[k].fields[fi]) return;
          const f = page.profiles[k].fields[fi];
          const key = t.dataset.field;
          if (key === "type") {
            f.type = t.value;
            f.value = getDefaultValueByType(t.value);
            render();
            return;
          }
          if (key === "value") {
            if (t.type === "checkbox") {
              f.value = t.checked;
            } else if (t.type === "number") {
              f.value = t.value === "" ? 0 : Number(t.value);
            } else if (f.type === "cascader") {
              try {
                f.value = JSON.parse(t.value);
              } catch (e2) {
                return;
              }
            } else if (f.type === "checkbox") {
              const raw = (t.value || "").trim();
              if (raw === "true") f.value = true;
              else if (raw === "false") f.value = false;
              else if (raw === "") f.value = false;
              else if (raw.startsWith("[")) {
                try {
                  const parsed = JSON.parse(raw);
                  if (Array.isArray(parsed)) {
                    f.value = parsed;
                  } else {
                    f.value = raw;
                  }
                } catch (e2) {
                  f.value = raw;
                }
              } else {
                f.value = raw;
              }
            } else {
              f.value = t.value;
            }
            return;
          }
          f[key] = t.value;
        }
      });
    }
    function onSave() {
      if (saveStoredConfig(state.config)) {
        window.dispatchEvent(new CustomEvent("autofill:config-updated"));
        showToast("\u5DF2\u4FDD\u5B58", "success");
      } else {
        showToast("\u4FDD\u5B58\u5931\u8D25", "error");
      }
    }
    function onTest() {
      window.__AUTOFILL_CONFIG__ = state.config;
      const editingKey = getEditingProfileKey(state.activePageIndex);
      window.dispatchEvent(
        new CustomEvent("autofill:execute-fill", { detail: { profile: editingKey } })
      );
    }
    function onExport() {
      const json = exportConfigJson(state.config);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `autofill-config-${Date.now()}.json`;
      shadow.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
      showToast("\u5DF2\u5BFC\u51FA", "success");
    }
    function onImport() {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "application/json,.json";
      input.addEventListener("change", () => {
        const file = input.files && input.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const imported = importConfigJson(reader.result);
            state.config = imported;
            state.activePageIndex = 0;
            render();
            showToast("\u5DF2\u5BFC\u5165\uFF08\u672A\u4FDD\u5B58\uFF09", "success");
          } catch (e) {
            showToast(`\u5BFC\u5165\u5931\u8D25\uFF1A${e.message}`, "error");
          }
        };
        reader.readAsText(file);
      });
      shadow.appendChild(input);
      input.click();
    }
    function closeUI() {
      host.remove();
      if (activeHost === host) activeHost = null;
    }
    function setPath(obj, path, value) {
      const keys = path.split(".");
      let cur = obj;
      for (let i = 0; i < keys.length - 1; i++) {
        if (cur[keys[i]] == null || typeof cur[keys[i]] !== "object") cur[keys[i]] = {};
        cur = cur[keys[i]];
      }
      cur[keys[keys.length - 1]] = value;
    }
    function escapeHtml(s) {
      return String(s != null ? s : "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
    }
    function escapeAttr(s) {
      return escapeHtml(s);
    }
    render();
    bindTabs();
    bindGlobal();
    bindActions();
    document.body.appendChild(host);
    activeHost = host;
  }
  function mountFloatingButton() {
    if (!document.body) return;
    if (document.querySelector("[data-autofill-fab]")) return;
    const btn = document.createElement("button");
    btn.setAttribute("data-autofill-fab", "");
    btn.textContent = "\u2699 \u81EA\u52A8\u586B\u5145\u914D\u7F6E";
    btn.title = "Cmd+Ctrl+Shift+K (Win: Win+Ctrl+Shift+K)";
    btn.style.cssText = [
      "position:fixed",
      "bottom:24px",
      "right:24px",
      "z-index:2147483647",
      "padding:10px 18px",
      "border:0",
      "border-radius:24px",
      "background:#409eff",
      "color:#fff",
      "cursor:pointer",
      "box-shadow:0 4px 16px rgba(64,158,255,.5)",
      "font:600 13px/1 -apple-system,BlinkMacSystemFont,sans-serif",
      "transition:transform .15s"
    ].join(";");
    btn.addEventListener("mouseenter", () => {
      btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "scale(1)";
    });
    btn.addEventListener("click", () => openConfigUI());
    document.body.appendChild(btn);
  }

  // src/index.js
  if (typeof window !== "undefined") {
    const start = () => {
      setupShortcut();
      setupProfileSwitchShortcut();
      autoFillIfEnabled();
      mountFloatingButton();
      setupConfigShortcut();
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", start, { once: true });
    } else {
      start();
    }
    window.addEventListener("autofill:open-config", () => openConfigUI());
    window.addEventListener("autofill:execute-fill", (e) => {
      var _a3;
      return executeFill((_a3 = e == null ? void 0 : e.detail) == null ? void 0 : _a3.profile);
    });
    window.addEventListener("autofill:config-updated", () => {
      setupShortcut();
      setupProfileSwitchShortcut();
    });
    window.__AUTOFILL__ = {
      executeFill,
      cycleProfile,
      openConfig: openConfigUI,
      getConfig: resolveConfig
    };
  }
  function setupConfigShortcut() {
    window.addEventListener("keydown", (e) => {
      var _a3;
      if (!e.metaKey || !e.ctrlKey || !e.shiftKey) return;
      if (e.altKey) return;
      if ((e.key || "").toLowerCase() !== "k") return;
      const tag = e.target && e.target.tagName || "";
      if (tag === "INPUT" || tag === "TEXTAREA" || ((_a3 = e.target) == null ? void 0 : _a3.isContentEditable)) {
        return;
      }
      e.preventDefault();
      e.stopPropagation();
      openConfigUI();
    });
  }
})();
