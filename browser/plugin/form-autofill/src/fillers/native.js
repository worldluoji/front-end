/**
 * 原生表单填充器
 *
 * 支持：input / textarea / select / checkbox / radio
 */

import { setNativeValue, triggerInputEvents, fillInput } from '../dom-utils.js';

function fillCheckbox(el, value) {
  if (el.type !== 'checkbox') return false;

  const desired = !!value;
  if (el.checked === desired) return true;

  // 用 click() 模拟用户操作：浏览器会切换 checked + 触发原生 change/input 事件，
  // 这是 Vue 2 / Vue 3 / React v-model 都能感知的标准路径。
  el.click();

  // 兜底：
  // - real browser：click 会切 checked + 派 change，幂等
  // - happy-dom：click 切 checked 但不一定派 change，需手动补
  if (el.checked !== desired) {
    el.checked = desired;
  }
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return el.checked === desired;
}

function fillRadio(el, value) {
  if (el.type !== 'radio') return false;
  // value === true 表示"选中该 radio"，否则按 value 匹配
  if (value !== true && (value == null || el.value !== String(value))) {
    return false;
  }
  if (el.checked) return true;

  el.click();

  // 兜底：click 切 checked（real browser）或不切（happy-dom）都补一次 change
  if (!el.checked) el.checked = true;
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return el.checked;
}

function fillRange(el, value) {
  if (el.type !== 'range') return false;
  setNativeValue(el, value);
  triggerInputEvents(el);
  return true;
}

function fillSelect(el, value) {
  if (el.tagName !== 'SELECT') return false;
  el.value = value == null ? '' : String(value);
  el.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

export const nativeFiller = {
  name: 'native',
  match(el /* , item */) {
    if (!el) return false;
    const tag = el.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return true;
    return false;
  },
  fill(el, value, item) {
    if (!el) return false;

    const type = (item && item.type) || (el.type || el.tagName).toLowerCase();

    switch (type) {
      case 'input':
      case 'textarea':
      case 'text':
      case 'number':
      case 'password':
      case 'email':
        return fillInput(el, value);

      case 'checkbox':
      case 'switch':
        return fillCheckbox(el, value);

      case 'radio':
        return fillRadio(el, value);

      case 'range':
      case 'slider':
        return fillRange(el, value);

      case 'select':
        return fillSelect(el, value);

      default: {
        // 默认按 input 处理
        if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
          return fillInput(el, value);
        }
        return false;
      }
    }
  },
};
