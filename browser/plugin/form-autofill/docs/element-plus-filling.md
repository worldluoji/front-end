# 如何支持填充 Element UI / Element Plus 组件

## 总览

`src/fillers/element-plus.js` 是一个独立的填充器，覆盖 Element Plus / Element UI 的所有表单组件；它和 `src/fillers/native.js`（原生表单）并列存在，由 `src/fillers/index.js` 统一调度。

```js
// src/fillers/index.js
import { nativeFiller } from './native.js';
import { elementPlusFiller } from './element-plus.js';

export const fillers = [elementPlusFiller, nativeFiller];
```

每个 filler 实现同一个接口：

```js
{
  name: 'element-plus',          // 名称（日志用）
  match(el, item) { ... },       // 判断这个 filler 能否填这个元素
  fill(el, value, item) { ... }  // 执行填充；返回 true/false
}
```

`core.js` 的 `tryFill` 遍历 `fillers`，找到第一个 `match === true` 的 filler 调它的 `fill`。**顺序很关键 —— EP 在前，原生在后**：

- EP 的 `match` 比 `native` 更"严格"（要求元素在 `.el-select` / `.el-cascader` 等容器内），但更精确
- 原生 filler 是兜底 —— EP 没接管（type 是 `input` / `select` 但其实是原生 `<input>` / `<select>`）时它接手

加新库（Ant Design / Naive UI / TDesign 等）只要按这个接口加一个新 filler、放进数组，core.js 不用动。

## 核心原理 1：绕过 v-model 的 setter 拦截

Vue / React 的 v-model 不是监听 `el.value` 的变化，而是**直接替换 `value` 的 setter**。所以这种代码在 Vue 组件里无效：

```js
el.value = 'xxx';          // 走的是被 Vue 替换过的 setter，监听不到
```

解法：拿到**原始的、原版** setter，再 `.call(el, value)`：

```js
// src/dom-utils.js:8-11
const inputValueSetter = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value'
)?.set;

// src/dom-utils.js:23
export function setNativeValue(el, value) {
  const setter = el.tagName === 'TEXTAREA' ? textareaValueSetter : inputValueSetter;
  if (setter) {
    setter.call(el, value);
  } else {
    el.value = value;     // 兜底（无 setter 时）
  }
}
```

绕过了拦截后，还要主动派 `input` + `change` 事件让 `@input` / `@change` 监听器跑：

```js
// src/dom-utils.js:36
export function triggerInputEvents(el) {
  el.dispatchEvent(new Event('input',  { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}
```

`fillInput` 是 `focus + setNativeValue + triggerInputEvents` 的标准组合，el-input / el-input-number / el-slider 都用它。

## 核心原理 2：popup 组件用 click 模拟 + 异步等待

el-select / el-cascader / el-date-picker 这类组件的值不在 input 上，而在**异步渲染的 popper panel 里**。改 input 的值没用，必须走"模拟用户操作"：

1. 点 wrapper 打开面板
2. 等面板出现（异步 + 渲染时序）
3. 在面板里匹配选项 / 节点
4. 点选项 / 节点

代码模式（`fillElSelect`）：

```js
// src/fillers/element-plus.js:134-181
async function fillElSelect(el, value) {
  const container = findElSelectContainer(el);     // 找最近的 .el-select
  const input = container.querySelector(SELECTOR.elSelectInput);
  if (input.value === strValue) return true;       // 已是目标值就跳过

  // 0. 清理上一个 select 留下的可见 panel（详见下文"race fix"）
  if (closeOpenSelectDropdowns()) await wait(10);

  // 1. 打开下拉：派 mousedown / mouseup / click
  const wrapper = container.querySelector(SELECTOR.elSelectWrapper) || input;
  wrapper.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  wrapper.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  wrapper.click();

  // 2. 等面板出现（最长 2 秒）
  const dropdown = await observeUntil(getVisibleDropdown, 2000);
  if (!dropdown) {
    closeOpenSelectDropdowns();          // 失败路径 1：面板没出来
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }
  await wait(30);                        // 等渲染稳定

  // 3. 匹配选项（先按 data-value 精确，再按 label 文本）
  const option = findOption(dropdown, value);
  if (!option) {
    closeOpenSelectDropdowns();          // 失败路径 2：选项找不到
    input.dispatchEvent(new Event('blur', { bubbles: true }));
    return false;
  }

  // 4. 点选项
  option.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  option.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
  option.click();
  await wait(30);
  input.dispatchEvent(new Event('change', { bubbles: true }));
  return true;
}
```

**关键工具**：

- `observeUntil(predicate, timeout)`（src/dom-utils.js:80）—— 用 `MutationObserver` 监听 body，等 `predicate` 返回真值（找到可见 panel），超时后强制 resolve
- `wait(10)` / `wait(30)` —— 等 EP 内部的 Vue 异步更新跑完 + CSS 过渡
- 派 `mousedown` 而不是只点 `click` —— EP 的 clickoutside 指令只听 mousedown，缺它面板不会关

el-cascader 是同一个模式的应用：依次点多层菜单的面板节点；el-date-picker 是点 wrapper 等 `.el-date-table` 出现再点 `.available` / `.today` cell。

## 核心原理 3：match 阶段的精确分流

EP 的 `match`（src/fillers/element-plus.js:496）按 `type` + 容器精确判断：

```js
match(el, item) {
  const type = (item && item.type) || '';
  const inElSelect = !!findElSelectContainer(el);
  // ...

  if (type === 'select')    return inElSelect;       // 只接管 el-select
  if (type === 'cascader')  return inElCascader;     // 只接管 el-cascader
  if (type === 'input-number') return NumberContainer; // 只接管 el-input-number
  if (type === 'checkbox') {
    // 单元素 + group 都接管，由 fill 阶段按 closest('.el-checkbox-group') 自动分发
    return inElCheckbox || inElCheckboxGroup || el.tagName === 'INPUT' || el.tagName === 'LABEL';
  }
  // ...

  // 无 type 时按容器猜（自动探测）
  return inElSelect || inElCascader || inElInputNumber || ...;
}
```

**典型陷阱**：selector 写的是 `<input>`，但外层有 `.el-select`。`nativeFiller.match` 也会返回 true（它只看 `tagName === 'INPUT'`）。但因为 `fillers = [elementPlusFiller, nativeFiller]`，**EP 先匹配上**就交给 EP 填。所以：

- 同一个 selector 给两种类型组件时，`type: 'select'` 强制走 EP 容器分支
- 写 `<input>` selector 不带 type、外面又裹了 `.el-select`，会自动走 EP（EP 的"无 type 探测"覆盖了 input 标签）

## 核心原理 4：版本差异 + 选择器兼容

Element Plus 在 2.6 重构了大量 class 名（从 `el-input__inner` 到 `el-select__wrapper` 等）。脚本里用**复合选择器**同时覆盖两个版本：

```js
// src/fillers/element-plus.js:17-22
const SELECTOR = {
  elSelect:        '.el-select',
  elSelectInput:   '.el-input__inner, .el-select__input',   // 2.5- / 2.6+
  elSelectWrapper: '.el-input, .el-select__wrapper',         // 2.5- / 2.6+
  elSelectDropdown: '.el-select-dropdown',
  elSelectItem:    '.el-select-dropdown__item, .el-select-v2__list-item, li.el-vl__item',
  // ...
};
```

加新 EP 组件遇到 selector 不匹配时，先看 EP 版本（DevTools 看 class 名），再补复合选择器 —— 不要假设所有用户都是最新版本。

## 核心原理 5：dropdown race 的主动清理（最近一次修复）

填充失败时，原脚本只派 blur 就 return —— 面板**仍然 visible**。下一次填充走 `getVisibleDropdown` 时，它按 DOM 顺序返回**第一个可见 panel**，可能拿到错的：

```js
// src/fillers/element-plus.js:63
function getVisibleDropdown() {
  const dropdowns = document.querySelectorAll(SELECTOR.elSelectDropdown);
  for (const d of dropdowns) {
    if (d.style.display === 'none') continue;
    if (d.classList.contains('is-hidden')) continue;
    return d;          // <-- 拿到的可能是上一个 select 留下的
  }
  return null;
}
```

修复（`closeOpenSelectDropdowns` / `closeOpenCascaderPanels`，src/fillers/element-plus.js:99 / 120）：在 body 上派 mousedown + click 触发 EP 内部的 clickoutside 关闭逻辑。

两处调用：

1. **fill 函数开头**（清理前一个留下的）
2. **每条失败路径 return 前**（清理当前留下的）

并行组里多个 el-select 同时打开时，EP 的 clickoutside 是单实例互斥的 —— 同一 tick 派多次 click 可能只有一个生效。这就是 README 警告"不建议把多个 el-select / el-cascader 放进同一并行组"的根因。

## 调试 tips

- **el-select 填不上**：DevTools Console 看 `[自动填充] el-select 失败：找不到选项 value=xxx`，把 value 换成选项的 label 文本试试（脚本两种匹配都做）
- **面板不出现**：`wrapper` selector 是否在 EP 版本里存在；可以手动在 Console 跑 `document.querySelector('.el-select').click()` 看是否展开
- **开了 panel 但填错选项**：`closeOpenSelectDropdowns` 是否清理掉 —— 并行组里 EP select 容易出现这个
- **看 raw 结构**：脚本用 `Object.getOwnPropertyDescriptor` 拿原生 setter；Vue / React / EP 都不会拦截这个调用

## 相关文件

- `src/dom-utils.js` — 原生 setter + `waitFor` / `observeUntil`
- `src/fillers/element-plus.js` — EP/EUI 所有组件的填充器 + close helpers
- `src/fillers/native.js` — 原生表单兜底
- `src/fillers/index.js` — 填充器注册表（顺序：EP → native）
- `src/core.js` — `tryFill` 调度
- `test/element-plus.test.js` — 12 个组件的填充 + close helpers 测试
- `test/core.test.js` — filler 调度顺序测试
- `README.md` "原理" 段 — 用户视角的简短说明