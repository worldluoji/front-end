# form-autofill

通用表单自动填充油猴脚本。支持原生表单（input / textarea / select / checkbox / radio / range）和 Element UI / Element Plus 组件（el-input / el-select / el-cascader / el-date-picker / el-checkbox / el-radio / el-switch / el-slider 等）。

- **可视化配置页** — 右下角浮动按钮 / `Ctrl+Alt+C` 快捷键打开，所见即所得编辑
- **快捷键手动触发**（默认 `Cmd/Ctrl + Shift + O`），或开启页面加载自动填充
- **多页面配置**，按 URL pattern 匹配（支持字符串包含 / 正则）
- 配置保存到 localStorage，跨设备可导入导出 JSON
- 走"原生 setter + 触发 input 事件"机制，Vue 2 / Vue 3 / React 的 v-model 都能感知

## 快速开始

```bash
npm install
npm run build
```

把 `form-auto-fill.user.js` 拖到 Tampermonkey（或 Violentmonkey / Greasemonkey）即可。

## 安装油猴脚本

1. 安装浏览器扩展：[Tampermonkey](https://www.tampermonkey.net/)
2. 打开 Tampermonkey 控制面板 → 实用工具 → 把 `form-auto-fill.user.js` 拖入页面
3. 顶部菜单确认脚本已启用
4. 访问任意页面，按 `Cmd+Shift+O`（Mac）或 `Ctrl+Shift+O`（Windows），控制台会输出填充日志

## 配置 — 三种方式

按推荐顺序：

### 方式 1：可视化配置页（推荐）

两种入口：

- **页面右下角浮动按钮** "⚙ 自动填充配置"
- **快捷键 `Ctrl+Alt+C`**（与填充快捷键分离，专注于打开配置）

打开后是 Shadow DOM 隔离的弹窗，不受页面 CSS 影响。

**全局设置 Tab**
- 页面加载自动填充开关
- 快捷键：触发字母 + 4 个修饰键（Ctrl / Alt / Shift / Meta）

**页面配置 Tab**
- 左侧：页面列表（含 name / urlPattern 预览），可增删
- 右侧：当前页面的 name / urlPattern / 字段表格
  - 每行字段：type 下拉（14 种）/ selector / value / 删除按钮
  - value 输入框按 type 自动切换（checkbox 切换、数字 input、JSON 数组等）
  - 切换 type 自动重置 value 为该类型默认值

**底部按钮**
- 导入 JSON / 导出 JSON / 恢复默认 / 测试填充 / 取消 / 保存

配置保存到 `localStorage.form_autofill_config_v3`，下次打开页面直接生效，无需重新打包。

> 测试填充按钮会用当前 UI 内的配置（不保存也生效），方便边改边试。

### 方式 2：运行时注入（控制台 / DevTools）

在浏览器控制台执行一次，或在 Tampermonkey 里写一个先执行的脚本注入：

```js
window.__AUTOFILL_CONFIG__ = {
  PAGE_CONFIGS: [
    {
      name: '订单申请页',
      urlPattern: '/order/apply',
      fields: [
        { selector: '#orderId', value: 'ORD-001', type: 'input' },
        { selector: '.department .el-input__inner', value: 'tech', type: 'select' },
        { selector: '#agreeTerms', value: true, type: 'checkbox' },
      ],
    },
  ],
};
```

### 方式 3：修改源码（永久 + 默认值）

编辑 `src/config.js` 的 `DEFAULT_CONFIG`，然后 `npm run build` 重新打包。这个改的是默认值，用户配置页/注入的配置会覆盖它。

## 配置优先级链

```
window.__AUTOFILL_CONFIG__  >  localStorage(form_autofill_config_v3)  >  DEFAULT_CONFIG
```

逐级覆盖：注入 > 页面保存 > 源码默认值。

## 页面配置

```js
{
  name: '识别名（仅日志显示用）',
  urlPattern: '/order/apply',     // 字符串：URL includes 匹配
  // urlPattern: /\/order\/(apply|edit)/,  // 也支持正则（注意：localStorage / 导出会退化为空对象）
  fields: [
    { selector: '#orderId', value: 'ORD-001', type: 'input' },
    // ...
  ],
}
```

`urlPattern`：
- **字符串**：`window.location.href.includes(pattern)`
- **正则**：用 `pattern.test(currentUrl)` 测试
- ⚠️ 正则不会被 JSON 序列化，导出 / 保存到 localStorage 会丢失。配置页会自动转回字符串

## 字段配置

每条 field 由 `selector` + `value` + `type` 组成。

### type 类型一览

| type | 适用组件 | value 格式 |
|---|---|---|
| `input` | `<input>` / `<textarea>` / el-input | 字符串 |
| `select` | `<select>` 或 el-select | 选项的 value 或文本 |
| `checkbox` | `<input type=checkbox>` / el-checkbox | `true` / `false` |
| `radio` | `<input type=radio>` / el-radio | 该 radio 的 value，或 `true` 表示选中 |
| `range` / `slider` | `<input type=range>` / el-slider | 数字 |
| `switch` | el-switch | `true` / `false` |
| `input-number` | el-input-number | 数字 |
| `date` / `datetime` / `time` | el-date-picker / el-time-picker | 字符串（如 `'2026-09-21'`） |
| `cascader` | el-cascader | 字符串（单值）或数组（路径） |
| `checkbox-group` | el-checkbox-group | 字符串数组（多选），或单个字符串 |
| `radio-group` | el-radio-group | 单个字符串 |

### selector 怎么写

CSS 选择器，写到目标元素即可。对于 Element 组件，写**输入框本身**最简单：

```js
// el-input   → 直接用内部 input
{ selector: '.my-input .el-input__inner', type: 'input', value: '张三' }

// el-select → 也用内部 input，type: 'select' 会自动找 .el-select 容器
{ selector: '.my-select .el-input__inner', type: 'select', value: 'tech' }

// el-checkbox-group → 用容器
{ selector: '.fruits-group', type: 'checkbox-group', value: ['苹果', '橘子'] }

// el-date-picker → 用内部 input，type: 'date' 自动找 .el-date-editor 容器
{ selector: '.my-date .el-input__inner', type: 'date', value: '2026-09-21' }
```

### 完整示例

```js
PAGE_CONFIGS: [
  {
    name: '员工档案',
    urlPattern: /\/employee\/(edit|new)/,
    fields: [
      { selector: '#name', type: 'input', value: '张三' },
      { selector: '#email', type: 'input', value: 'zhangsan@example.com' },
      { selector: '#age', type: 'input-number', value: 28 },
      { selector: '.dept-select .el-input__inner', type: 'select', value: 'tech' },
      { selector: '.region-select .el-input__inner', type: 'cascader', value: ['浙江', '杭州'] },
      { selector: '.skills-group', type: 'checkbox-group', value: ['JS', 'Vue'] },
      { selector: '.gender-group', type: 'radio-group', value: '女' },
      { selector: '.hire-date .el-input__inner', type: 'date', value: '2026-09-21' },
      { selector: '.active-switch', type: 'switch', value: true },
      { selector: '.level-slider', type: 'slider', value: 75 },
      { selector: '#agreeTerms', type: 'checkbox', value: true },
    ],
  },
],
```

## 快捷键

`SHORTCUT` 对象定义触发组合：

```js
SHORTCUT: {
  key: 'O',         // 触发字母（大写）
  ctrl: false,
  alt: false,
  shift: true,
  meta: true,       // Mac 的 Cmd / Windows 的 Win
}
```

可在配置页的"全局设置" Tab 直接改，改完保存即生效。

> 默认在 `<input>` / `<textarea>` / contenteditable 元素聚焦时**不触发**，避免误触。

## 自动填充

配置页"全局设置" → 勾选"页面加载自动填充"，或源码：

```js
AUTO_FILL_ON_LOAD: true
```

开启后脚本用 `MutationObserver` 监听 DOM，等所有目标元素出现后逐个填充。每个元素只填充一次（WeakSet 标记），不会重复。

## 备份与迁移

**导出**：配置页 → "导出 JSON" → 下载 `.json` 文件

**导入**：配置页 → "导入 JSON" → 选择文件；或编辑 JSON 后粘贴到控制台：

```js
window.__AUTOFILL_CONFIG__ = /* 粘贴 JSON 对象 */;
location.reload();
```

**跨设备同步**：因 localStorage 不跨设备，推荐用 export/import JSON 在多设备间搬运。

## 开发

```bash
npm install          # 装依赖
npm test             # 跑测试（Vitest + happy-dom）
npm run test:watch   # watch 模式
npm run test:coverage
npm run build        # 重新打包 form-auto-fill.user.js
```

修改 `src/` 下任何文件后必须 `npm run build` 才能让油猴脚本生效。配置页改动保存到 localStorage 即可，无需打包。

## 项目结构

```
src/
  matchers.js              URL 匹配（字符串 / 正则）
  dom-utils.js             原生 setter + wait / observeUntil
  config.js                DEFAULT_CONFIG + resolveConfig()（三级合并）
  config-storage.js        localStorage 读写 + import/export + normalize
  config-types.js          14 种字段 type + 默认值
  config-ui.js             可视化配置页（Shadow DOM 隔离）
  fillers/
    native.js              原生表单填充
    element-plus.js        Element UI / Plus 组件填充
    index.js               注册表（按顺序匹配）
  core.js                  tryFill / executeFill / autoFillIfEnabled / setupShortcut
  index.js                 入口：装配、浮动按钮、油猴菜单命令、window.__AUTOFILL__
test/                      Vitest 单测（92 个）
build.js                   esbuild 打包脚本
form-auto-fill.user.js     打包产物（直接给油猴用）
user-script-header.txt     油猴 metadata header
```

## 原理（为什么会触发 Vue/React 更新）

直接 `el.value = 'x'` 在 Vue / React 中无效，因为它们 patch 了原生 setter 来追踪变化。本脚本通过 `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 拿到原生 setter，再 `setter.call(el, value)`，随后 dispatch `input` + `change` 事件 —— 这样 Vue 的 `@input` 监听、Element Plus 的内部状态、React 的 onChange 都会被触发。

el-select / el-cascader 因为下拉是异步渲染的面板，没法直接改值，所以走"click → 等面板出现 → 匹配 data-value / 文本 → click 选项"的链路，并带 2 秒超时保护。

## 限制

- 不支持 IE
- el-cascader / el-select 的异步面板依赖渲染时序，偶尔失败时再按一次快捷键即可
- 正则 urlPattern 无法被 JSON 序列化（配置页会自动转回字符串，需用源码方式保留）
- 不支持 Ant Design / Naive UI / TDesign 等其他 UI 库（要扩展时，参考 `src/fillers/element-plus.js` 加一个新 filler 即可，core.js 无需改动）

## 故障排查

**看不到右下角的"⚙ 自动填充配置"按钮？**

- 检查浏览器控制台：是否有 `[自动填充] 快捷键已启用：...` 日志
- 按 `Ctrl+Alt+C`（Mac 也可）打开配置页试试
- 确认脚本已启用：油猴图标 → 已安装脚本 → 通用表单自动填充（确认开关打开）
- 极少数站点会把 body 上的元素清掉。可以用 `document.body.appendChild(document.createElement('div'))` 验证 body 还在，然后查 `[data-autofill-fab]`
