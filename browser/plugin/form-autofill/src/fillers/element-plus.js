/**
 * Element UI / Element Plus 组件填充器
 *
 * 支持：el-input / el-input-number / el-select / el-cascader /
 *       el-date-picker / el-time-picker / el-checkbox(-group) /
 *       el-radio(-group) / el-switch / el-slider
 */

import {
  setNativeValue,
  triggerInputEvents,
  wait,
  observeUntil,
  fillInput,
} from '../dom-utils.js';

const SELECTOR = {
  // 兼容 Element Plus 2.5 及更早（.el-input__inner）与 2.6+（.el-select__input）
  elSelect: '.el-select',
  elSelectInput: '.el-input__inner, .el-select__input',
  elSelectWrapper: '.el-input, .el-select__wrapper',
  elSelectDropdown: '.el-select-dropdown',
  elSelectItem: '.el-select-dropdown__item, .el-select-v2__list-item, li.el-vl__item',

  elCascader: '.el-cascader',
  elCascaderPanel: '.el-cascader-panel',
  elCascaderMenu: '.el-cascader-menu',
  elCascaderNode: '.el-cascader-node',
  elCascaderSuggestionItem: '.el-cascader-suggestion__item',

  // el-date-editor 在 2.6+ 也改为 .el-input 容器，但内部 input 仍然可能是 .el-input__inner
  elDatePicker: '.el-date-editor, .el-date-editor.el-input, .el-date-editor.el-input__wrapper',
  elDatePickerInput: 'input.el-input__inner, input.el-date-editor-input, .el-input__inner',

  elInputNumber: '.el-input-number',
  elInputNumberInput: 'input.el-input-number__input',
  elInputNumberDecrease: '.el-input-number__decrease',
  elInputNumberIncrease: '.el-input-number__increase',

  elSwitch: '.el-switch',
  elSwitchInput: 'input[type="checkbox"]',

  elSlider: '.el-slider',
  elSliderInput: 'input[type="range"]',

  elCheckboxGroup: '.el-checkbox-group',
  elCheckbox: '.el-checkbox',
  elCheckboxInput: 'input[type="checkbox"]',
  elCheckboxOriginal: '.el-checkbox__original',

  elRadioGroup: '.el-radio-group',
  elRadio: '.el-radio',
  elRadioInput: 'input[type="radio"]',
};

// ===================== el-select =====================

function findElSelectContainer(el) {
  return el.closest(SELECTOR.elSelect);
}

function getVisibleDropdown() {
  const dropdowns = document.querySelectorAll(SELECTOR.elSelectDropdown);
  for (const d of dropdowns) {
    if (d.style.display === 'none') continue;
    if (d.classList.contains('is-hidden')) continue;
    return d;
  }
  return null;
}

function findOption(dropdown, value) {
  const strValue = value == null ? '' : String(value);
  const items = dropdown.querySelectorAll(SELECTOR.elSelectItem);
  // 1) 按 data-value 精确匹配
  for (const opt of items) {
    if (opt.getAttribute('disabled') !== null) continue;
    const dv = opt.getAttribute('data-value');
    if (dv != null && dv === strValue) return opt;
  }
  // 2) 按 label（slot 文本）匹配
  for (const opt of items) {
    if (opt.getAttribute('disabled') !== null) continue;
    const txt = (opt.textContent || '').trim();
    if (txt === strValue) return opt;
  }
  return null;
}

async function fillElSelect(el, value) {
  const container = findElSelectContainer(el);
  if (!container) return false;

  const input = container.querySelector(SELECTOR.elSelectInput);
  if (!input) return false;

  const strValue = value == null ? '' : String(value);
  if (input.value === strValue) return true;

  // 打开下拉：Element Plus 2.6+ 的 input 是 readonly，点 wrapper 才能展开；
  // 旧版本直接点 input 也可以
  const wrapper = container.querySelector(SELECTOR.elSelectWrapper) || input;
  wrapper.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  wrapper.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  wrapper.click();
  input.dispatchEvent(new Event('focus', { bubbles: true }));

  // 等待面板
  const dropdown = await observeUntil(getVisibleDropdown, 2000);
  if (!dropdown) {
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }
  await wait(30); // 等渲染稳定

  const option = findOption(dropdown, value);
  if (!option) {
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }

  option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  option.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  option.click();

  await wait(30);
  // 兜底：有些业务监听 input.change
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

// ===================== el-input-number =====================

function fillElInputNumber(el, value) {
  const container = el.closest(SELECTOR.elInputNumber) || el.parentElement;
  const input =
    (container && container.querySelector(SELECTOR.elInputNumberInput)) || el;
  if (!input || input.tagName !== 'INPUT') return false;

  input.focus();
  setNativeValue(input, value);
  // Element Plus 监听 input + change；input 事件会触发 clamp 逻辑
  input.dispatchEvent(new Event('input', { bubbles: true }));
  // blur 触发 change
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

// ===================== el-cascader =====================

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

  // value 支持：字符串（取第一个匹配路径）或数组（依次点）
  const path = Array.isArray(value)
    ? value.map(String)
    : [String(value)];

  // 打开面板
  input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  input.click();
  input.dispatchEvent(new Event('focus', { bubbles: true }));

  const panel = await observeUntil(() => getCascaderPanel(container), 2000);
  if (!panel) {
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }
  await wait(50);

  // 逐级点击
  for (let i = 0; i < path.length; i++) {
    const target = path[i];
    const menus = getCascaderMenus(container);
    const menu = menus[i];
    if (!menu) {
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      return false;
    }
    const nodes = menu.querySelectorAll(SELECTOR.elCascaderNode);
    let matched = null;
    for (const node of nodes) {
      if (node.classList.contains('is-disabled')) continue;
      const dv = node.getAttribute('data-value');
      if (dv != null && dv === target) {
        matched = node;
        break;
      }
    }
    if (!matched) {
      input.dispatchEvent(new Event('blur', { bubbles: true }));
      return false;
    }
    matched.click();
    await wait(60); // 下一级渲染
  }

  await wait(30);
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}

// ===================== el-date-picker / el-time-picker =====================

function fillElDatePicker(el, value) {
  const container = el.closest(SELECTOR.elDatePicker) || el.parentElement;
  const input =
    (container && container.querySelector(SELECTOR.elDatePickerInput)) || el;
  if (!input || input.tagName !== 'INPUT') return false;
  return fillInput(input, value);
}

// ===================== el-checkbox (单个) =====================

async function fillElCheckbox(el, value) {
  // 兼容 selector 指向 label / span / input 的情况
  const input =
    el.tagName === 'INPUT' && el.type === 'checkbox'
      ? el
      : el.querySelector(SELECTOR.elCheckboxInput);
  if (!input) return false;

  const desired = !!value;
  if (input.checked === desired) return true;

  // 用 click() 模拟用户操作：浏览器会切换 checked + 触发原生 change/input 事件，
  // Vue / Element Plus 的 @change 监听器能收到。这是 Element Plus 期望的交互路径。
  input.click();

  // 兜底：某些 happy-dom / jsdom 环境下 click() 不会切换 checked，需手动设置并 dispatch
  if (input.checked !== desired) {
    input.checked = desired;
    input.dispatchEvent(new Event('change', { bubbles: true }));
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
  return input.checked === desired;
}

// ===================== el-checkbox-group =====================

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
    const labelEl = wrapper
      ? wrapper.querySelector('.el-checkbox__label')
      : null;
    const labelText = labelEl ? (labelEl.textContent || '').trim() : '';
    const nativeValue = input.value;
    const matched =
      values.includes(nativeValue) || values.includes(labelText);
    if (matched && !input.checked) {
      // 同单 el-checkbox：让浏览器原生 click 触发完整事件链
      input.click();
      if (input.checked !== true) {
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      any = true;
    } else if (matched) {
      any = true;
    }
  }
  return any;
}

// ===================== el-radio-group =====================

function fillElRadioGroup(el, value) {
  const container = el.closest(SELECTOR.elRadioGroup);
  if (!container) return false;
  const strValue = value == null ? '' : String(value);

  const inputs = Array.from(
    container.querySelectorAll(SELECTOR.elRadioInput)
  );
  for (const input of inputs) {
    const wrapper = input.closest(SELECTOR.elRadio);
    const labelEl = wrapper
      ? wrapper.querySelector('.el-radio__label')
      : null;
    const labelText = labelEl ? (labelEl.textContent || '').trim() : '';
    if (input.value === strValue || labelText === strValue) {
      input.checked = true;
      triggerInputEvents(input);
      return true;
    }
  }
  return false;
}

// ===================== el-switch =====================

function fillElSwitch(el, value) {
  const container = el.closest(SELECTOR.elSwitch);
  if (!container) return false;
  const input = container.querySelector(SELECTOR.elSwitchInput);
  if (!input) return false;
  input.checked = !!value;
  triggerInputEvents(input);
  return true;
}

// ===================== el-slider =====================

function fillElSlider(el, value) {
  const container = el.closest(SELECTOR.elSlider);
  if (!container) return false;
  const input = container.querySelector(SELECTOR.elSliderInput) || el;
  if (!input || input.type !== 'range') return false;
  setNativeValue(input, value);
  triggerInputEvents(input);
  return true;
}

// ===================== 注册 =====================

export const elementPlusFiller = {
  name: 'element-plus',
  match(el, item) {
    if (!el) return false;
    const type = (item && item.type) || '';
    const inElSelect = !!findElSelectContainer(el);
    const inElCascader = !!el.closest(SELECTOR.elCascader);
    const inElDatePicker = !!el.closest(SELECTOR.elDatePicker);
    const inElInputNumber = !!el.closest(SELECTOR.elInputNumber);
    const inElSwitch = !!el.closest(SELECTOR.elSwitch);
    const inElSlider = !!el.closest(SELECTOR.elSlider);
    const inElCheckboxGroup = !!el.closest(SELECTOR.elCheckboxGroup);
    const inElCheckbox = !!el.closest(SELECTOR.elCheckbox);
    const inElRadioGroup = !!el.closest(SELECTOR.elRadioGroup);

    if (type === 'select') return inElSelect;
    if (type === 'cascader') return inElCascader;
    if (type === 'input-number' || type === 'number-input')
      return inElInputNumber;
    if (type === 'date' || type === 'datetime' || type === 'time')
      return inElDatePicker;
    if (type === 'checkbox-group') return inElCheckboxGroup;
    if (type === 'radio-group') return inElRadioGroup;
    if (type === 'switch') return inElSwitch;
    if (type === 'slider') return inElSlider;
    if (type === 'checkbox') {
      // 单个 el-checkbox（不在 group 内）或原生 checkbox 都接管
      return inElCheckbox || el.tagName === 'INPUT' || el.tagName === 'LABEL';
    }

    // 无 type 时按容器猜
    return (
      inElSelect ||
      inElCascader ||
      inElInputNumber ||
      inElDatePicker ||
      inElSwitch ||
      inElSlider ||
      inElCheckboxGroup ||
      inElCheckbox ||
      inElRadioGroup
    );
  },

  fill(el, value, item) {
    const type = (item && item.type) || '';
    if (type === 'select' && findElSelectContainer(el)) {
      return fillElSelect(el, value);
    }
    if (type === 'cascader' && el.closest(SELECTOR.elCascader)) {
      return fillElCascader(el, value);
    }
    if (
      (type === 'input-number' || type === 'number-input') &&
      el.closest(SELECTOR.elInputNumber)
    ) {
      return fillElInputNumber(el, value);
    }
    if (
      (type === 'date' || type === 'datetime' || type === 'time') &&
      el.closest(SELECTOR.elDatePicker)
    ) {
      return fillElDatePicker(el, value);
    }
    if (type === 'checkbox-group' && el.closest(SELECTOR.elCheckboxGroup)) {
      return fillElCheckboxGroup(el, value);
    }
    if (type === 'checkbox' && el.closest(SELECTOR.elCheckbox)) {
      return fillElCheckbox(el, value);
    }
    if (type === 'radio-group' && el.closest(SELECTOR.elRadioGroup)) {
      return fillElRadioGroup(el, value);
    }
    if (type === 'switch' && el.closest(SELECTOR.elSwitch)) {
      return fillElSwitch(el, value);
    }
    if (type === 'slider' && el.closest(SELECTOR.elSlider)) {
      return fillElSlider(el, value);
    }

    // 自动探测（无 type）
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
    if (el.closest(SELECTOR.elRadioGroup))
      return fillElRadioGroup(el, value);

    return false;
  },
};
