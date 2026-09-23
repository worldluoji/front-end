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
  // 同时兼容 .el-select-v2（虚拟列表 select）/ .el-tree-select —— 用户可能选中
  // placeholder / suffix / dropdown-item 等非输入元素，只要祖先里有 EP select 容器就算
  elSelect: '.el-select, .el-select-v2, .el-tree-select',
  elSelectInput: '.el-input__inner, .el-select__input, .el-select-v2__input, .el-tree-select__input',
  elSelectWrapper: '.el-input, .el-select__wrapper, .el-select-v2__wrapper, .el-tree-select__wrapper',
  elSelectDropdown: '.el-select-dropdown, .el-select-v2__popper, .el-tree-select__popper',
  elSelectItem: '.el-select-dropdown__item, .el-select-v2__list-item, li.el-vl__item',
  // 可过滤 select：EP 在容器上加 is-filterable class（或 input 上有 el-select__input 而非 readonly）
  elSelectFilterable: '.el-select.is-filterable, .el-select.is-searchable',

  elCascader: '.el-cascader',
  elCascaderPanel: '.el-cascader-panel',
  elCascaderMenu: '.el-cascader-menu',
  elCascaderNode: '.el-cascader-node',
  elCascaderSuggestionItem: '.el-cascader-suggestion__item',

  // el-date-editor 在 2.6+ 也改为 .el-input 容器，但内部 input 仍然可能是 .el-input__inner
  elDatePicker: '.el-date-editor, .el-date-editor.el-input, .el-date-editor.el-input__wrapper',
  elDatePickerInput:
    'input.el-input__inner, input.el-date-editor-input, .el-input__inner, .el-range-input',

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
  // 优先查 .el-select / .el-select-v2 / .el-tree-select（标准容器）
  const container = el.closest(SELECTOR.elSelect);
  if (container) return container;
  // 兜底：closest 包含自身，所以 el 自己带 el-select__ 前缀时（如
  // .el-select__placeholder / .el-select__suffix）会匹配到自己；
  // 必须跳过 self，从 parentElement 开始查祖先中第一个带 el-select__ 前缀的元素
  let p = el.parentElement;
  while (p) {
    if (p.matches('[class*="el-select__"], [class*="el-select-v2__"], [class*="el-tree-select__"]')) {
      return p;
    }
    p = p.parentElement;
  }
  return null;
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
  // 2) 按 label（slot 文本）匹配 —— 折叠空白与 &nbsp;，对嵌套 span/i 图标宽容
  const normalize = (s) => (s || '').replace(/\s+/g, ' ').replace(/ /g, ' ').trim();
  const target = normalize(strValue);
  for (const opt of items) {
    if (opt.getAttribute('disabled') !== null) continue;
    if (normalize(opt.textContent) === target) return opt;
  }
  return null;
}

/**
 * 关闭所有可见的 el-select-dropdown。
 * 通过在 document 上派 mousedown 触发 Element Plus clickoutside 关闭逻辑（EP 在
 * document 上挂监听，不是 body；body 上的 dispatchEvent 在真实浏览器里不会被
 * document 上的监听器看到）。
 * 用于：
 *   1) 上一个 select 失败（找不到选项 / 找不到 dropdown）后面板未关，会让后续 select 的 getVisibleDropdown 拿到错的 panel
 *   2) 并行组里多个 select 同时打开时的清理
 * 返回是否真的派了事件（用于测试 / 决定要不要 await）。
 */
export function closeOpenSelectDropdowns() {
  const dropdowns = document.querySelectorAll(SELECTOR.elSelectDropdown);
  for (const d of dropdowns) {
    if (d.style.display === 'none') continue;
    if (d.classList.contains('is-hidden')) continue;
    document.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    );
    return true;
  }
  return false;
}

/**
 * 关闭所有可见的 el-cascader-panel。
 * 同 closeOpenSelectDropdowns 的目的。
 */
export function closeOpenCascaderPanels() {
  const panels = document.querySelectorAll(SELECTOR.elCascaderPanel);
  for (const p of panels) {
    if (p.style.display === 'none') continue;
    if (p.classList.contains('is-hidden')) continue;
    document.dispatchEvent(
      new MouseEvent('mousedown', { bubbles: true, cancelable: true })
    );
    return true;
  }
  return false;
}

async function fillElSelect(el, value) {
  const container = findElSelectContainer(el);
  if (!container) return false;

  const input = container.querySelector(SELECTOR.elSelectInput);
  if (!input) return false;

  const strValue = value == null ? '' : String(value);
  if (input.value === strValue) return true;

  // 清理：上一个失败留下的面板 / 并行组里别的 select 的面板
  if (closeOpenSelectDropdowns()) {
    await wait(10);
  }

  // 可过滤 select（is-filterable / is-searchable）：input 是真实可输入文本框，
  // EP 会根据输入实时过滤 options。这里走"输入文本 + 等过滤 + 点第一个匹配"的路径，
  // 比 click wrapper + 整列表找匹配更鲁棒（特别是 options 多且 value 是中文长文本时）。
  // querySelector 只查后代，而 is-filterable / is-searchable 加在容器本身，
  // 所以也要 matches 容器自身；兜底时 container 可能只是 .el-select__selection，
  // 这种情况下用 closest 查祖先中带 is-filterable 的元素
  const isFilterable =
    container.matches(SELECTOR.elSelectFilterable)
    || !!container.querySelector(SELECTOR.elSelectFilterable)
    || !!container.closest(SELECTOR.elSelectFilterable);
  if (isFilterable && !input.readOnly) {
    return fillElSelectFilterable(container, input, value, strValue);
  }

  // 打开下拉：Element Plus 2.6+ 的 input 是 readonly，点 wrapper 才能展开；
  // 旧版本直接点 input 也可以
  // container 可能是 .el-select 也可能是 .el-select__selection 锚点（兜底）
  // —— 后者的话 querySelector 找不到 wrapper（wrapper 是父），所以也查一下祖先
  const wrapper =
    container.querySelector(SELECTOR.elSelectWrapper)
    || container.closest(SELECTOR.elSelectWrapper)
    || input;
  wrapper.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  wrapper.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  wrapper.click();
  input.dispatchEvent(new Event('focus', { bubbles: true }));

  // 等待面板
  const dropdown = await observeUntil(getVisibleDropdown, 2000);
  if (!dropdown) {
    closeOpenSelectDropdowns();
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }
  await wait(30); // 等渲染稳定

  const option = findOption(dropdown, value);
  if (!option) {
    closeOpenSelectDropdowns();
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

/**
 * 可过滤 el-select 的填充：focus → input 输入 value → 等 EP 过滤 → 点第一个匹配项
 * EP 在容器加 is-filterable（或 is-searchable）class 且 input 非 readonly 时走此路径。
 */
async function fillElSelectFilterable(container, input, value, strValue) {
  input.focus();
  // 清掉 input 已有内容（否则 EP 会在旧内容后追加）
  setNativeValue(input, '');
  triggerInputEvents(input);

  // 用原生 setter 写入 value + 派 input，让 EP 的 filterMethod / remoteMethod 跑
  setNativeValue(input, strValue);
  input.dispatchEvent(new Event('input', { bubbles: true }));

  // 等 EP 完成过滤 + 重渲染 dropdown
  const dropdown = await observeUntil(getVisibleDropdown, 2000);
  if (!dropdown) {
    closeOpenSelectDropdowns();
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }
  // 给 filterMethod 一个完整 tick（EP 用 nextTick + 可能的防抖）
  await wait(80);

  const option = findOption(dropdown, value);
  if (!option) {
    closeOpenSelectDropdowns();
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }

  option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  option.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  option.click();

  await wait(30);
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

  // 清理：上一个失败 / 并行组里别的 cascader 留下的面板
  if (closeOpenCascaderPanels()) {
    await wait(10);
  }

  // 打开面板
  input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  input.click();
  input.dispatchEvent(new Event('focus', { bubbles: true }));

  const panel = await observeUntil(() => getCascaderPanel(container), 2000);
  if (!panel) {
    closeOpenCascaderPanels();
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
      closeOpenCascaderPanels();
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
      closeOpenCascaderPanels();
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
  if (!container) return false;

  // daterange / datetimerange / monthrange：容器内有 2 个 .el-range-input
  // Element UI / Plus 通用（class 名一致）
  const rangeInputs = Array.from(
    container.querySelectorAll('.el-range-input')
  );
  if (rangeInputs.length >= 2) {
    if (Array.isArray(value) && value.length >= 2) {
      const ok1 = fillInput(rangeInputs[0], value[0]);
      const ok2 = fillInput(rangeInputs[1], value[1]);
      return ok1 || ok2;
    }
    // 单值：默认填开始日期
    return fillInput(rangeInputs[0], value);
  }

  // 单日期 / 单时间：原逻辑
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

  // 兜底：
  // - real browser：click 切 checked + 派 change，幂等
  // - happy-dom：click 切 checked 但不一定派 change，需手动补
  if (input.checked !== desired) {
    input.checked = desired;
  }
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return input.checked === desired;
}

// ===================== el-checkbox-group =====================

function logGroupCandidates(kind, container, inputs, labelSelector, configured) {
  const candidates = inputs.map((input) => {
    const wrapper = input.closest(`.el-${kind}`);
    const labelEl = wrapper ? wrapper.querySelector(labelSelector) : null;
    return {
      value: input.value,
      label: labelEl ? (labelEl.textContent || '').trim() : '',
    };
  });
  // eslint-disable-next-line no-console
  console.warn(
    `[自动填充] el-${kind}-group 未匹配到任何候选：\n` +
      `  配置 value: ${JSON.stringify(configured)}\n` +
      `  候选 (${candidates.length}):\n` +
      candidates.map((c, i) => `    [${i}] value=${JSON.stringify(c.value)} label=${JSON.stringify(c.label)}`).join('\n')
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
      if (!input.checked) input.checked = true;
      input.dispatchEvent(new Event('change', { bubbles: true }));
      any = true;
    } else if (matched) {
      any = true;
    }
  }
  if (!any) {
    logGroupCandidates('checkbox', container, inputs, '.el-checkbox__label', values);
  }
  return any;
}

// ===================== el-radio (单个) =====================

async function fillElRadio(el, value) {
  // 兼容 selector 指向 label / span / input 的情况
  const input =
    el.tagName === 'INPUT' && el.type === 'radio'
      ? el
      : el.querySelector(SELECTOR.elRadioInput);
  if (!input) return false;

  const strValue = value == null ? '' : String(value);
  // 按 input.value 匹配，不匹配不操作
  if (input.value !== strValue) return false;

  if (input.checked) return true;

  // 与 fillElRadioGroup 一致：focus + click + 兜底 change，等一个 microtask
  // 让 Element Plus handleChange 的 nextTick emit 跑完
  input.focus();
  input.click();
  if (!input.checked) input.checked = true;
  input.dispatchEvent(new Event('change', { bubbles: true }));
  await wait(0);
  return input.checked;
}

// ===================== el-radio-group =====================

async function fillElRadioGroup(el, value) {
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
      if (!input.checked) {
        // Element Plus 2.x radio:
        //   <input v-model="modelValue" :checked="modelValue === actualValue"
        //          @focus="focus=true" @change="handleChange" @click.stop />
        // handleChange 内用 nextTick(() => emit(CHANGE_EVENT, modelValue.value))
        // 触发链路：click → browser 切 checked → change → v-model 写回 modelValue
        //        → handleChange nextTick 派 CHANGE_EVENT → RadioGroup 派
        //        UPDATE_MODEL_EVENT → 父 v-model 同步。
        // 我们要保证：
        //   1) focus 触发，这样 Element Plus 的 focus state 正确（@focus 更新），
        //      部分校验会读 isFocused
        //   2) click 让浏览器做真实切 checked + dispatch change
        //   3) 兜底：hidden input（opacity:0）上某些环境 click 不触发 change
        //   4) 等下一个 microtask，让 Element Plus handleChange 的 nextTick 跑完
        input.focus();
        input.click();
        if (!input.checked) input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
        await wait(0);
      }
      return true;
    }
  }
  logGroupCandidates('radio', container, inputs, '.el-radio__label', strValue);
  return false;
}

// ===================== el-switch =====================

async function fillElSwitch(el, value) {
  const container = el.closest(SELECTOR.elSwitch);
  if (!container) return false;
  const input = container.querySelector(SELECTOR.elSwitchInput);
  if (!input) return false;

  const desired = !!value;
  if (input.checked === desired) return true;

  // 用 click() 模拟用户操作：浏览器会切换 checked + 触发原生 change/input 事件，
  // Element Plus 的 @change 监听器能收到。这与 el-checkbox 的修复一致。
  input.click();

  // 兜底：
  // - real browser：click 切 checked + 派 change，幂等
  // - happy-dom：click 切 checked 但不一定派 change，需手动补
  if (input.checked !== desired) {
    input.checked = desired;
  }
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return input.checked === desired;
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
    const inElRadio = !!el.closest(SELECTOR.elRadio);

    if (type === 'select') return inElSelect;
    if (type === 'cascader') return inElCascader;
    if (type === 'input-number' || type === 'number-input')
      return inElInputNumber;
    if (type === 'date' || type === 'datetime' || type === 'time')
      return inElDatePicker;
    if (type === 'checkbox') {
      // checkbox 接管：单个 .el-checkbox / .el-checkbox-group / 原生 checkbox / <label>。
      // group vs 单元素由 fill 阶段按 closest(.el-checkbox-group) 自动分发。
      return (
        inElCheckbox ||
        inElCheckboxGroup ||
        el.tagName === 'INPUT' ||
        el.tagName === 'LABEL'
      );
    }
    if (type === 'radio') {
      // radio 接管：单个 .el-radio / .el-radio-group / 原生 radio / <label>。
      return (
        inElRadio ||
        inElRadioGroup ||
        el.tagName === 'INPUT' ||
        el.tagName === 'LABEL'
      );
    }
    if (type === 'switch') return inElSwitch;
    if (type === 'slider') return inElSlider;

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
      inElRadioGroup ||
      inElRadio
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
    if (type === 'checkbox') {
      // value 是数组 OR el 在 .el-checkbox-group 容器内 → 走 group 逻辑（可多选）
      const group = el.closest(SELECTOR.elCheckboxGroup);
      if (Array.isArray(value) || group) {
        return fillElCheckboxGroup(el, value);
      }
      // 否则单元素
      if (el.closest(SELECTOR.elCheckbox) || el.tagName === 'INPUT' || el.tagName === 'LABEL') {
        return fillElCheckbox(el, value);
      }
      return false;
    }
    if (type === 'radio') {
      // el 在 .el-radio-group 容器内 → 走 group 逻辑（按 value 匹配）
      if (el.closest(SELECTOR.elRadioGroup)) {
        return fillElRadioGroup(el, value);
      }
      // 否则单元素（按 value 匹配 / true 直接勾选）
      if (el.closest(SELECTOR.elRadio) || el.tagName === 'INPUT' || el.tagName === 'LABEL') {
        return fillElRadio(el, value);
      }
      return false;
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
    if (el.closest(SELECTOR.elRadio))
      return fillElRadio(el, value);
    if (el.closest(SELECTOR.elRadioGroup))
      return fillElRadioGroup(el, value);

    return false;
  },
};
