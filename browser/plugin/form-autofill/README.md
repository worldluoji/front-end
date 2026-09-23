# form-autofill

通用表单自动填充油猴脚本。支持原生表单（input / textarea / select / checkbox / radio / range）和 Element UI / Element Plus 组件（el-input / el-select / el-cascader / el-date-picker / el-checkbox / el-radio / el-switch / el-slider 等）。

- **可视化配置页** — 右下角浮动按钮（可拖动，位置持久化）/ `Cmd+Ctrl+Shift+K` 快捷键打开
- **多 profile（多套值）** — 同一页面可保存多套数据，按快捷键循环切换；适合「同一表单需要填两次、内容不一样」的场景
- **快捷键手动触发**（默认 `Cmd/Ctrl + Shift + O`），或开启页面加载自动填充
- **profile 切换快捷键**（默认 `Cmd/Ctrl + Shift + P`）
- **多页面配置**，按 URL pattern 匹配（支持字符串包含 / 正则）
- **并行组**（可选）— 显式声明同名字段并发填充，默认保持顺序以保护 select 级联 / 输入框联动等依赖
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
5. 同一个页面有多个 profile 时，按 `Cmd+Shift+P` 循环切换；当前激活的 profile 会持久化到 localStorage

## 配置 — 三种方式

按推荐顺序：

### 方式 1：可视化配置页（推荐）

两种入口：

- **页面右下角浮动按钮** ⚙（圆形按钮，40×40，可拖动到任意位置，位置持久化）
- **快捷键 `Cmd+Ctrl+Shift+K`**（Win 上是 `Win+Ctrl+Shift+K`，与填充快捷键分离，专注于打开配置）

打开后是 Shadow DOM 隔离的弹窗，不受页面 CSS 影响。

**全局设置 Tab**
- 页面加载自动填充开关
- 快捷键：触发字母 + 4 个修饰键（Ctrl / Alt / Shift / Meta），分别对应填充触发键和 profile 切换键

**页面配置 Tab**
- 左侧：页面列表（含 name / urlPattern 预览），可增删
- 右侧：当前页面的 name / urlPattern / profile tabs / 字段表格
  - **profile tabs**：每个页面可保存多套数据（`default` + 自定义名）。当前编辑的 profile 高亮；运行时激活的 profile 标记为「激活」（与持久化的 localStorage 同步）。至少保留一个 profile
  - 每行字段：type 下拉（14 种）/ selector / **并行组** / value / 删除按钮
  - **selector 输入框可点击展开**为编辑弹窗（支持多行 / 等宽字体 / Cmd+Enter 保存）
  - value 输入框按 type 自动切换（checkbox 切换、数字 input、JSON 数组等）
  - 切换 type 自动重置 value 为该类型默认值

**底部按钮**
- 导入 JSON / 导出 JSON / 恢复默认 / 测试填充 / 取消 / 保存

配置保存到 `localStorage.form_autofill_config_v3`，下次打开页面直接生效，无需重新打包。
当前激活的 profile 单独存到 `localStorage.form_autofill_active_profiles`，按页面 name 隔离。

> 测试填充按钮会用当前 UI 内的配置（不保存也生效），并按当前选中的 profile 填充，方便边改边试。

### 方式 2：运行时注入（控制台 / DevTools）

在浏览器控制台执行一次，或在 Tampermonkey 里写一个先执行的脚本注入：

```js
window.__AUTOFILL_CONFIG__ = {
  PAGE_CONFIGS: [
    {
      name: '订单申请页',
      urlPattern: '/order/apply',
      profiles: {
        default: {
          fields: [
            { selector: '#orderId', value: 'ORD-001', type: 'input' },
            { selector: '.department .el-input__inner', value: 'tech', type: 'select' },
            { selector: '#agreeTerms', value: true, type: 'checkbox' },
          ],
        },
        demo: {
          fields: [
            { selector: '#orderId', value: 'DEMO-001', type: 'input' },
            // ...
          ],
        },
      },
    },
  ],
};
```

> 旧的 `fields: [...]` 写法仍兼容，自动归一化为 `profiles.default.fields`。

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
  profiles: {
    default: {
      fields: [
        { selector: '#orderId', value: 'ORD-001', type: 'input' },
        // ...
      ],
    },
    demo: {
      fields: [
        { selector: '#orderId', value: 'DEMO-001', type: 'input' },
        // ...
      ],
    },
  },
}
```

旧写法 `fields: [...]`（顶层）仍兼容，归一化为 `profiles.default.fields`。

`urlPattern`：
- **字符串**：`window.location.href.includes(pattern)`
- **正则**：用 `pattern.test(currentUrl)` 测试
- ⚠️ 正则不会被 JSON 序列化，导出 / 保存到 localStorage 会丢失。配置页会自动转回字符串

## Profile（多套值）

一个 page config 下可保存多套 `fields`，称为 profile。运行时只有一个「激活 profile」参与填充。

- 命名：profile key 即名称（如 `default` / `demo` / `profile2`）
- 激活态：按 page name 持久化到 `localStorage.form_autofill_active_profiles`，跨刷新保留
- 切换：`SHORTCUT_PROFILE_SWITCH`（默认 `Cmd+Ctrl+Shift+P` / `Win+Ctrl+Shift+P`）循环到下一个；切换后立即清掉该 profile 字段的填充标记，下一次填充即可生效
- UI：page 详情顶部 tabs 显示所有 profile，当前活跃的标徽章；至少保留一个 profile

## 字段配置

每条 field 由 `selector` + `value` + `type` 组成，**可选** `parallelGroup` 控制是否与其他字段并行。

### 并行组（同名字段并发填充）

默认所有字段按数组顺序**串行**填充 —— 这是有意为之，避免破坏 select 级联（A 选了才出 B 的 options）和输入框联动（A 的 input 事件跑完才推算 B）。

如果某些字段互相独立、可以同时填，给它们同一个 `parallelGroup`：

```js
fields: [
  { selector: '#city',      value: '北京',     type: 'select' },                       // 顺序
  { selector: '#district',  value: '朝阳区',   type: 'select' },                       // 等 city
  { selector: '#contact1',  value: '138...',   type: 'input',  parallelGroup: 'c' },  // 并行
  { selector: '#contact2',  value: '139...',   type: 'input',  parallelGroup: 'c' },  // 并行
  { selector: '#note',      value: '...',      type: 'input' },                        // 等 c 完成
],
```

**规则：**
- 无 `parallelGroup` / 空字符串 / 纯空白 → 视为未分组
- 同名字段在数组中**连续**出现时合并为一个并行组，组内 `Promise.all` 同时启动；**整组完成**后才执行下一段
- 同名字段被其他字段隔开时，按位置拆为多次独立的并行组（方便用户精确控制执行时机）

例：`[A("c"), B, C("c")]` 拆为 `c1=[A]` → `B` → `c2=[C]`，而非合并为 `c=[A,C]`。

**写在 UI：** 字段表格的"并行组"列，文本输入框。空 = 顺序；填名字（如 `c`）即加入同名并行组。空值会从配置中删除（不会留下空字符串字段）。

### type 类型一览

| type | 适用组件 | value 格式 |
|---|---|---|
| `input` | `<input>` / `<textarea>` / el-input | 字符串 |
| `select` | `<select>` 或 el-select | 选项的 value 或文本 |
| `checkbox` | `<input type=checkbox>` / el-checkbox / el-checkbox-group | 单元素：`true`/`false`；组：`true`/`false` 或 JSON 数组（多选） |
| `radio` | `<input type=radio>` / el-radio / el-radio-group | 单元素：`true` 或匹配 value 的字符串；组：匹配 value/label 的字符串 |
| `range` / `slider` | `<input type=range>` / el-slider | 数字 |
| `switch` | el-switch | `true` / `false` |
| `input-number` | el-input-number | 数字 |
| `date` / `datetime` / `time` | el-date-picker / el-time-picker | 字符串（如 `'2026-09-21'`） |
| `cascader` | el-cascader | 字符串（单值）或数组（路径） |

> `checkbox` / `radio` 自动判定单元素还是组容器：若 selector 指向 `.el-checkbox-group` / `.el-radio-group`（或其子元素），按"按 label/value 匹配 + 可多选"处理；否则按单元素处理。

### selector 怎么写

CSS 选择器，写到目标元素即可。对于 Element 组件，写**输入框本身**最简单：

```js
// el-input   → 直接用内部 input
{ selector: '.my-input .el-input__inner', type: 'input', value: '张三' }

// el-select → 也用内部 input，type: 'select' 会自动找 .el-select 容器
{ selector: '.my-select .el-input__inner', type: 'select', value: 'tech' }

// el-checkbox-group → 用容器，type=checkbox 自动按组处理（按 label/value 匹配，可多选）
{ selector: '.fruits-group', type: 'checkbox', value: ['苹果', '橘子'] }

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
      { selector: '.skills-group', type: 'checkbox', value: ['JS', 'Vue'] },
      { selector: '.gender-group', type: 'radio', value: '女' },
      { selector: '.hire-date .el-input__inner', type: 'date', value: '2026-09-21' },
      { selector: '.active-switch', type: 'switch', value: true },
      { selector: '.level-slider', type: 'slider', value: 75 },
      { selector: '#agreeTerms', type: 'checkbox', value: true },
    ],
  },
],
```

## 快捷键

| 动作 | 默认组合 | 配置项 |
|---|---|---|
| 手动触发填充 | `Cmd+Shift+O`（Win: `Win+Shift+O`） | `SHORTCUT` |
| 切换 profile | `Cmd+Shift+P`（Win: `Win+Shift+P`） | `SHORTCUT_PROFILE_SWITCH` |
| 打开配置页 | `Cmd+Ctrl+Shift+K`（Win: `Win+Ctrl+Shift+K`） | 硬编码（避免与浏览器/系统快捷键冲突） |

`SHORTCUT` / `SHORTCUT_PROFILE_SWITCH` 对象结构：

```js
SHORTCUT: {
  key: 'O',         // 触发字母（大写）
  ctrl: false,
  alt: false,
  shift: true,
  meta: true,       // Mac 的 Cmd / Windows 的 Win
}
```

可在配置页的"全局设置" Tab 直接改 `SHORTCUT`（暂不暴露修改 profile 切换快捷键，改源码 / 注入生效）。

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
  core.js                  tryFill / executeFill / autoFillIfEnabled / setupShortcut / cycleProfile / setupProfileSwitchShortcut
  index.js                 入口：装配、浮动按钮、油猴菜单命令、window.__AUTOFILL__
test/                      Vitest 单测（168 个）
build.js                   esbuild 打包脚本
form-auto-fill.user.js     打包产物（直接给油猴用）
user-script-header.txt     油猴 metadata header
```

## 配置页浮动按钮

- 默认位置：视口右下角，距边 24px
- 大小：40×40 圆形（仅 ⚙ 图标，不挡内容）
- 可拖动：pointer 事件（鼠标 / 触屏统一），超过 3px 视为拖动，避免和点击冲突；位置持久化到 `localStorage.form_autofill_fab_position`
- 视口边界裁剪，不会拖出屏幕外

## 原理（为什么会触发 Vue/React 更新）

直接 `el.value = 'x'` 在 Vue / React 中无效，因为它们 patch 了原生 setter 来追踪变化。本脚本通过 `Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set` 拿到原生 setter，再 `setter.call(el, value)`，随后 dispatch `input` + `change` 事件 —— 这样 Vue 的 `@input` 监听、Element Plus 的内部状态、React 的 onChange 都会被触发。

el-select / el-cascader 因为下拉是异步渲染的面板，没法直接改值，所以走"click → 等面板出现 → 匹配 data-value / 文本 → click 选项"的链路，并带 2 秒超时保护。

## 限制

- 不支持 IE
- el-cascader / el-select 的异步面板依赖渲染时序，偶尔失败时再按一次快捷键即可
- 正则 urlPattern 无法被 JSON 序列化（配置页会自动转回字符串，需用源码方式保留）
- profile 切换快捷键目前需要在源码 / 注入中修改 `SHORTCUT_PROFILE_SWITCH`，配置页暂未暴露 UI（打开 issue 反馈若需要）
- 不支持 Ant Design / Naive UI / TDesign 等其他 UI 库（要扩展时，参考 `src/fillers/element-plus.js` 加一个新 filler 即可，core.js 无需改动）

## 故障排查

**看不到右下角的 ⚙ 浮动按钮？**

- 检查浏览器控制台：是否有 `[自动填充] 快捷键已启用：...` 日志
- 按 `Cmd+Ctrl+Shift+K`（Win: `Win+Ctrl+Shift+K`）打开配置页试试
- 确认脚本已启用：油猴图标 → 已安装脚本 → 通用表单自动填充（确认开关打开）
- 极少数站点会把 body 上的元素清掉。可以用 `document.body.appendChild(document.createElement('div'))` 验证 body 还在，然后查 `[data-autofill-fab]`

**profile 切换没生效？**

- 确认当前 URL 匹配了 page config（控制台应输出 `匹配到页面配置：xxx（profile: yyy）`）
- 仅 1 个 profile 时按切换快捷键会提示「无需切换」
- 配置保存的 active profile 隔离在 localStorage（按 page name），可清掉 `form_autofill_active_profiles` 复位

**selector 输入框写不下？**

- 点击输入框 → 弹出编辑器弹窗（760px 宽，支持换行）
- 编辑器内：`Cmd/Ctrl+Enter` 保存，`Esc` 取消，点击遮罩关闭
