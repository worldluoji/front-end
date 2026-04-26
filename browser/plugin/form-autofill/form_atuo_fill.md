# 自动填充表单
下面是一个通用的油猴脚本模板，你可以通过修改脚本开头的 CONFIG 对象来定义要填充的表单项，无需改动核心逻辑。

脚本会监听页面变化，当配置中的选择器对应的元素出现时，自动填充指定的值，并触发相应的事件（input、change 等），确保 React/Vue 等框架能感知到变化。

快捷键默认为 `Command+Shift+O`（较为冷门，不易与常用组合冲突），你也可以自行修改。

---

```javascript
// ==UserScript==
// @name         通用表单自动填充（多页面+快捷键版）
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  支持多页面配置，可通过快捷键手动触发填充
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ================= 全局设置 =================
    // 是否启用自动填充（页面加载时自动填充匹配的表单）
    const AUTO_FILL_ON_LOAD = false;   // 改为 true 则自动填充

    // 快捷键组合（建议避开常用快捷键）
    // 格式：{ key: 'F', ctrl: false, alt: true, shift: true, meta: false }
    const SHORTCUT = {
        key: 'O',           // 触发键（大写字母）
        ctrl: false,
        alt: false,
        shift: true,
        meta: true         // Windows 键 / Command 键
    };
    // ===========================================


    // ================= 多页面配置 =================
    // 每个配置项包含：
    //   name:       配置名称（仅用于识别）
    //   urlPattern: 匹配当前URL的模式（字符串或正则表达式）
    //               字符串会进行 includes 匹配，正则使用 test 方法
    //   fields:     表单项配置数组，格式同之前的 CONFIG
    const PAGE_CONFIGS = [
        {
            name: '用户信息页',
            // 匹配URL包含 "/user/profile" 或 "/user/edit"
            urlPattern: /\/user\/(profile|edit)/,
            fields: [
                { selector: "#userid", value: "123456", type: "input" },
                { selector: "input[name='username']", value: "张三", type: "input" },
                { selector: "select.department", value: "tech", type: "select" }
            ]
        },
        {
            name: '订单申请页',
            // 匹配URL包含 "/order/apply"
            urlPattern: "/order/apply",
            fields: [
                { selector: "#orderId", value: "ORD-2025001", type: "input" },
                { selector: "input[name='quantity']", value: "10", type: "input" },
                { selector: "#agreeTerms", value: true, type: "checkbox" }
            ]
        },
        // 你可以在这里继续添加更多页面配置
    ];
    // =============================================


    /**
     * 判断当前URL是否匹配某个配置的urlPattern
     * @param {object} config - 页面配置对象
     * @returns {boolean}
     */
    function isUrlMatch(config) {
        const currentUrl = window.location.href;
        const pattern = config.urlPattern;
        if (pattern instanceof RegExp) {
            return pattern.test(currentUrl);
        } else if (typeof pattern === 'string') {
            return currentUrl.includes(pattern);
        }
        return false;
    }

    /**
     * 获取当前页面匹配的配置（按顺序返回第一个匹配的）
     * @returns {object|null}
     */
    function getCurrentConfig() {
        for (const config of PAGE_CONFIGS) {
            if (isUrlMatch(config)) {
                console.log(`[自动填充] 匹配到页面配置：${config.name}`);
                return config;
            }
        }
        console.log('[自动填充] 未匹配到任何页面配置');
        return null;
    }

    /**
     * 为元素填充值并触发必要事件
     * @param {Element} el - 目标DOM元素
     * @param {*} value - 要填充的值
     * @param {string} type - 元素类型（input/select/radio/checkbox）
     */
    function fillElement(el, value, type) {
        if (!el) return;

        switch (type) {
            case 'input':
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = value;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
                break;
            case 'select':
                if (el.tagName === 'SELECT') {
                    el.value = value;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
                break;
            case 'radio':
                if (el.type === 'radio') {
                    if (value === true || (value && el.value === value)) {
                        el.checked = true;
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                    }
                }
                break;
            case 'checkbox':
                if (el.type === 'checkbox') {
                    el.checked = !!value;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
                break;
            default:
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = value;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                }
                break;
        }
    }

    /**
     * 尝试填充单个配置项
     * @param {object} item - 表单项配置
     * @returns {boolean} 是否填充成功（元素存在且未填充过）
     */
    function tryFill(item) {
        const el = document.querySelector(item.selector);
        if (!el) return false;

        const filledFlag = `__autofilled_${item.selector}`;
        if (el[filledFlag]) return false;

        fillElement(el, item.value, item.type || 'input');
        el[filledFlag] = true;
        console.log(`[自动填充] ${item.selector} 已填充值: ${item.value}`);
        return true;
    }

    /**
     * 执行填充（根据当前匹配的配置）
     * @returns {Promise<void>}
     */
    async function executeFill() {
        const config = getCurrentConfig();
        if (!config) {
            console.log('[自动填充] 当前页面无匹配配置，跳过');
            return;
        }

        const fields = config.fields;
        if (!fields || fields.length === 0) {
            console.log('[自动填充] 当前配置无表单项');
            return;
        }

        // 如果有自动填充标记，先清除（因为手动触发可能想重新填充）
        // 但我们采用标记策略防止重复填充，如果需要重新填充，需要清除标记
        // 这里简单处理：手动触发时，先清除当前页面所有元素的填充标记，以便重新填充
        if (!AUTO_FILL_ON_LOAD) {
            // 清除所有填充标记，允许重新填充
            fields.forEach(item => {
                const el = document.querySelector(item.selector);
                if (el) {
                    const flag = `__autofilled_${item.selector}`;
                    delete el[flag];
                }
            });
        }

        // 尝试填充所有字段
        for (const item of fields) {
            tryFill(item);
        }
    }

    /**
     * 自动填充（如果开启）
     */
    function autoFillIfEnabled() {
        if (!AUTO_FILL_ON_LOAD) return;

        // 等待页面稳定后开始填充（类似之前的MutationObserver方式）
        const observer = new MutationObserver(() => {
            const config = getCurrentConfig();
            if (!config) return;

            const fields = config.fields;
            if (!fields || fields.length === 0) return;

            // 检查是否所有字段都已填充
            let allFilled = true;
            for (const item of fields) {
                const el = document.querySelector(item.selector);
                if (!el) {
                    allFilled = false;
                    break;
                }
                const flag = `__autofilled_${item.selector}`;
                if (!el[flag]) {
                    allFilled = false;
                    break;
                }
            }
            if (allFilled) {
                observer.disconnect();
                console.log('[自动填充] 所有表单项已填充完毕');
                return;
            }

            // 尝试填充未填充的字段
            for (const item of fields) {
                tryFill(item);
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * 设置快捷键监听
     */
    function setupShortcut() {
        const { key, ctrl, alt, shift, meta } = SHORTCUT;
        window.addEventListener('keydown', (e) => {
            // 检查按键是否匹配
            if (e.key.toUpperCase() !== key.toUpperCase()) return;
            if (e.ctrlKey !== ctrl) return;
            if (e.altKey !== alt) return;
            if (e.shiftKey !== shift) return;
            if (e.metaKey !== meta) return;

            // 防止触发浏览器默认行为
            e.preventDefault();
            e.stopPropagation();

            console.log('[自动填充] 快捷键触发填充');
            executeFill();
        });
        console.log(`[自动填充] 快捷键已启用：${ctrl ? 'Ctrl+' : ''}${alt ? 'Alt+' : ''}${shift ? 'Shift+' : ''}${meta ? 'Meta+' : ''}${key}`);
    }

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupShortcut();
            autoFillIfEnabled();
        });
    } else {
        setupShortcut();
        autoFillIfEnabled();
    }
})();
```

---

## 主要改进说明

### 1. 多页面支持
- 在 `PAGE_CONFIGS` 数组中定义多个页面配置，每个配置包含：
  - `name`：配置名称（方便识别）
  - `urlPattern`：匹配当前URL的模式，可以是**字符串**（URL包含该字符串）或**正则表达式**
  - `fields`：表单项配置（与之前完全相同）
- 脚本会按顺序检查当前URL是否匹配某个配置，匹配到第一个即停止，并使用该配置的字段进行填充。

### 2. 快捷键触发
- 在 `SHORTCUT` 对象中定义快捷键组合，默认 `Alt+Shift+F`（较为冷门，不易与系统快捷键冲突）。
- 你可以随意修改 `key`（字母键）以及 `ctrl`、`alt`、`shift`、`meta` 的布尔值来组合任意快捷键。
- 按下快捷键后，会立即执行 `executeFill()`，根据当前页面匹配的配置进行填充。
- **注意**：手动触发时会**清除**当前页面之前可能存在的填充标记，从而允许重新填充（适合需要多次调整的场景）。如果你希望保留标记（避免重复填充），可以修改代码中清除标记的部分。

### 3. 自动填充开关
- 通过 `AUTO_FILL_ON_LOAD` 变量控制是否在页面加载时自动填充。
- 默认 `false`（仅快捷键触发）。若设为 `true`，脚本会使用 `MutationObserver` 监听DOM变化，自动填充匹配的表单。

### 4. 兼容性
- 脚本仍使用纯DOM操作和事件触发，支持 React/Vue 等现代框架。
- 填充标记机制确保同一个表单项不会重复填充（自动模式下），手动模式下则会清除标记以便再次填充。

---

## 使用建议

1. **修改 `@match`**：如果你希望脚本只在特定域名生效，请将 `@match *://*/*` 改为你的内网域名，例如 `@match *://your-company.com/*`。

2. **添加更多页面配置**：复制 `PAGE_CONFIGS` 中的示例，按需修改 `urlPattern` 和 `fields`。  
   - 如果某个页面URL特征是 `/admin/*`，可以使用正则 `/\/admin\//` 匹配。  
   - 如果多个页面共享同一套配置，可以共用一个配置项，只需将 `urlPattern` 设为一个能匹配所有这些页面的模式。

3. **调整快捷键**：如果你想使用 `Ctrl+Shift+E`，可设置：
   ```javascript
   const SHORTCUT = {
       key: 'E',
       ctrl: true,
       alt: false,
       shift: true,
       meta: false
   };
   ```

4. **测试**：安装脚本后，访问匹配的页面，按快捷键即可看到控制台输出填充日志。

---

## 增强版
下面是优化后的油猴脚本，主要针对 **Vue + ElementUI 页面中 el-select 组件无法正确填充、Vue 响应式数据不更新** 的问题进行了增强。同时保留了原有的快捷键、多页面配置、原生表单填充等功能。

```javascript
// ==UserScript==
// @name         通用表单自动填充（多页面+快捷键版）
// @namespace    http://tampermonkey.net/
// @version      2.1
// @description  支持多页面配置，兼容 Vue/ElementUI 组件，可通过快捷键手动触发填充
// @author       You
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ================= 全局设置 =================
    // 是否启用页面加载时自动填充（开启后页面一出现表单项就自动填）
    const AUTO_FILL_ON_LOAD = false;

    // 快捷键组合（建议避开常用快捷键）
    // 格式：{ key: 'O', ctrl: false, alt: false, shift: true, meta: true }
    const SHORTCUT = {
        key: 'O',           // 触发键（大写字母）
        ctrl: false,
        alt: false,
        shift: true,
        meta: true          // Windows 键 / Command 键
    };
    // ===========================================


    // ================= 多页面配置 =================
    const PAGE_CONFIGS = [
        {
            name: '用户信息页',
            // 匹配URL包含 "/user/profile" 或 "/user/edit"
            urlPattern: /\/user\/(profile|edit)/,
            fields: [
                { selector: "#userid", value: "123456", type: "input" },
                { selector: "input[name='username']", value: "张三", type: "input" },
                // ElSelect 示例：当 type 为 "select" 但实际不是原生 <select> 时，脚本会自动按 el‑select 处理
                { selector: ".department-select .el-input__inner", value: "tech", type: "select" }
            ]
        },
        {
            name: '订单申请页',
            // 匹配URL包含 "/order/apply"
            urlPattern: "/order/apply",
            fields: [
                { selector: "#orderId", value: "ORD-2025001", type: "input" },
                { selector: "input[name='quantity']", value: "10", type: "input" },
                { selector: "#agreeTerms", value: true, type: "checkbox" }
            ]
        }
    ];
    // =============================================


    /**
     * 判断当前 URL 是否匹配某个配置的 urlPattern
     */
    function isUrlMatch(config) {
        const currentUrl = window.location.href;
        const pattern = config.urlPattern;
        if (pattern instanceof RegExp) {
            return pattern.test(currentUrl);
        } else if (typeof pattern === 'string') {
            return currentUrl.includes(pattern);
        }
        return false;
    }

    /**
     * 获取当前页面匹配的配置（按顺序返回第一个匹配）
     */
    function getCurrentConfig() {
        for (const config of PAGE_CONFIGS) {
            if (isUrlMatch(config)) {
                console.log(`[自动填充] 匹配到页面配置：${config.name}`);
                return config;
            }
        }
        console.log('[自动填充] 未匹配到任何页面配置');
        return null;
    }

    /**
     * 等待一段时间（用于下拉菜单等延迟出现的元素）
     */
    const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    /**
     * 获取与 el-select 容器关联的可见下拉菜单
     */
    function getVisibleDropdownForSelect(selectContainer) {
        // 尝试通过 aria-owns 关联获取（兼容 ElementUI / Element Plus）
        const input = selectContainer.querySelector('.el-input__inner');
        const ownsId = input?.getAttribute('aria-owns') || selectContainer.getAttribute('aria-owns');
        if (ownsId) {
            const dropdown = document.getElementById(ownsId);
            if (dropdown && dropdown.style.display !== 'none' && !dropdown.classList.contains('is-hidden')) {
                return dropdown;
            }
        }
        // 回退：直接查找第一个可见的下拉（一般同一时间只有一个 el-select 打开）
        const visibleDropdowns = document.querySelectorAll('.el-select-dropdown:not(.is-hidden)');
        for (const d of visibleDropdowns) {
            if (d.style.display !== 'none') return d;
        }
        return null;
    }

    /**
     * 填充 el-select 组件（异步，会打开下拉并模拟点击选项）
     * @param {Element} el - 选择器选中的元素（通常是 input 或包含 el-select 的元素）
     * @param {*} value - 目标值
     * @returns {Promise<boolean>} 是否填充成功
     */
    async function fillElSelect(el, value) {
        const selectContainer = el.closest('.el-select');
        if (!selectContainer) {
            console.warn('[自动填充] 未找到 el-select 容器');
            return false;
        }

        const input = selectContainer.querySelector('.el-input__inner');
        if (!input) {
            console.warn('[自动填充] 未找到 el-select 的 input');
            return false;
        }

        // 如果当前值已经是目标值，直接返回成功
        if (input.value === String(value)) {
            console.log('[自动填充] el-select 当前值已匹配，跳过');
            return true;
        }

        // 打开下拉（通过点击输入框）
        input.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        input.dispatchEvent(new MouseEvent('focus', { bubbles: true }));
        input.click();

        // 等待下拉菜单出现（最多 2 秒）
        let dropdown = getVisibleDropdownForSelect(selectContainer);
        if (!dropdown) {
            // 使用 MutationObserver 监听下拉的添加
            dropdown = await new Promise((resolve) => {
                let resolved = false;
                const observer = new MutationObserver(() => {
                    const dd = getVisibleDropdownForSelect(selectContainer);
                    if (dd) {
                        resolved = true;
                        observer.disconnect();
                        resolve(dd);
                    }
                });
                observer.observe(document.body, { childList: true, subtree: true });
                // 超时保护
                setTimeout(() => {
                    if (!resolved) {
                        observer.disconnect();
                        resolve(null);
                    }
                }, 2000);
            });
        } else {
            // 已经打开，稍微等一下渲染
            await wait(100);
        }

        if (!dropdown) {
            console.warn('[自动填充] 未找到 el-select 的下拉菜单');
            // 尝试关闭下拉
            input.blur();
            return false;
        }

        // 在选项中查找匹配 value 的项（优先 data-value，其次文本内容）
        const options = dropdown.querySelectorAll('.el-select-dropdown__item');
        let targetOption = null;
        const strValue = String(value);
        for (const opt of options) {
            const optValue = opt.getAttribute('data-value') || opt.getAttribute('value');
            if (optValue !== null && optValue === strValue) {
                targetOption = opt;
                break;
            }
            if (opt.textContent.trim() === strValue) {
                targetOption = opt;
                // 不 break，继续找更精确的 data-value 匹配（但这里已经足够）
                break;
            }
        }

        if (!targetOption) {
            console.warn(`[自动填充] 未在下拉中找到值为 ${value} 的选项`);
            input.blur();
            return false;
        }

        // 模拟点击选项
        targetOption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        targetOption.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        targetOption.click();

        // 等待 Vue 响应式更新
        await wait(50);

        // 额外触发 change 事件，确保某些监听被通知
        input.dispatchEvent(new Event('change', { bubbles: true }));
        console.log(`[自动填充] el-select 已填充值: ${value}`);
        return true;
    }

    /**
     * 通用元素填充函数 (支持异步的 el-select)
     * @param {Element} el - DOM 元素
     * @param {*} value - 填充值
     * @param {string} type - 类型 (input/select/checkbox/radio)
     * @returns {Promise<boolean>} 是否填充成功
     */
    async function fillElement(el, value, type) {
        if (!el) return false;

        // ---- 特殊处理：type 为 select 但元素不是原生 <select>，视为 el-select ----
        if (type === 'select' && el.tagName !== 'SELECT') {
            return await fillElSelect(el, value);
        }

        // ---- 原生表单处理 ----
        switch (type) {
            case 'input':
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    // 对于 Vue 的 input，可能需要先清空再赋值，并触发多个事件
                    el.focus();
                    el.value = '';          // 清空
                    el.value = value;       // 赋值
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    // 对于有 composition 输入法的场景，可额外触发 compositionend
                    return true;
                }
                break;
            case 'select':
                if (el.tagName === 'SELECT') {
                    el.value = value;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                }
                break;
            case 'radio':
                if (el.type === 'radio') {
                    if (value === true || (value && el.value === value)) {
                        el.checked = true;
                        el.dispatchEvent(new Event('change', { bubbles: true }));
                        return true;
                    }
                }
                break;
            case 'checkbox':
                if (el.type === 'checkbox') {
                    el.checked = !!value;
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                }
                break;
            default:
                // 未知类型，尝试当作普通 input 处理
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.value = value;
                    el.dispatchEvent(new Event('input', { bubbles: true }));
                    el.dispatchEvent(new Event('change', { bubbles: true }));
                    return true;
                }
                break;
        }
        return false;
    }

    /**
     * 尝试填充单条配置（异步），并返回是否成功
     * @param {object} item - 字段配置
     * @returns {Promise<boolean>}
     */
    async function tryFill(item) {
        const el = document.querySelector(item.selector);
        if (!el) return false;

        const filledFlag = `__autofilled_${item.selector}`;
        if (el[filledFlag]) return false;  // 已填充，跳过

        const success = await fillElement(el, item.value, item.type || 'input');
        if (success) {
            el[filledFlag] = true;   // 标记已填充
            console.log(`[自动填充] ${item.selector} 填充完成`);
        } else {
            console.warn(`[自动填充] ${item.selector} 填充失败`);
        }
        return success;
    }

    /**
     * 执行填充（根据当前匹配的配置）
     */
    async function executeFill() {
        const config = getCurrentConfig();
        if (!config) {
            console.log('[自动填充] 当前页面无匹配配置，跳过');
            return;
        }

        const fields = config.fields;
        if (!fields || fields.length === 0) {
            console.log('[自动填充] 当前配置无表单项');
            return;
        }

        // 手动触发时，清除已有的填充标记，允许重新填充
        if (!AUTO_FILL_ON_LOAD) {
            fields.forEach(item => {
                const el = document.querySelector(item.selector);
                if (el) {
                    const flag = `__autofilled_${item.selector}`;
                    delete el[flag];
                }
            });
        }

        // 逐个填充（el-select 是异步的，所以需要 await）
        for (const item of fields) {
            await tryFill(item);
        }
    }

    /**
     * 自动填充（如果开启），使用 MutationObserver 等待元素出现
     */
    function autoFillIfEnabled() {
        if (!AUTO_FILL_ON_LOAD) return;

        const observer = new MutationObserver(() => {
            const config = getCurrentConfig();
            if (!config) return;

            const fields = config.fields;
            if (!fields || fields.length === 0) return;

            // 检查是否全部填充完毕
            let allFilled = true;
            for (const item of fields) {
                const el = document.querySelector(item.selector);
                if (!el) {
                    allFilled = false;
                    break;
                }
                const flag = `__autofilled_${item.selector}`;
                if (!el[flag]) {
                    allFilled = false;
                    break;
                }
            }
            if (allFilled) {
                observer.disconnect();
                console.log('[自动填充] 所有表单项已填充完毕');
                return;
            }

            // 逐个尝试填充（异步）
            (async () => {
                for (const item of fields) {
                    await tryFill(item);
                }
            })();
        });

        observer.observe(document.body, { childList: true, subtree: true });
    }

    /**
     * 设置快捷键监听
     */
    function setupShortcut() {
        const { key, ctrl, alt, shift, meta } = SHORTCUT;
        window.addEventListener('keydown', (e) => {
            if (e.key.toUpperCase() !== key.toUpperCase()) return;
            if (e.ctrlKey !== ctrl) return;
            if (e.altKey !== alt) return;
            if (e.shiftKey !== shift) return;
            if (e.metaKey !== meta) return;

            e.preventDefault();
            e.stopPropagation();
            console.log('[自动填充] 快捷键触发填充');
            executeFill();
        });
        const combo = [];
        if (ctrl) combo.push('Ctrl');
        if (alt) combo.push('Alt');
        if (shift) combo.push('Shift');
        if (meta) combo.push('Meta');
        combo.push(key.toUpperCase());
        console.log(`[自动填充] 快捷键已启用：${combo.join('+')}`);
    }

    // ================= 启动 =================
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setupShortcut();
            autoFillIfEnabled();
        });
    } else {
        setupShortcut();
        autoFillIfEnabled();
    }
})();
```

### ✨ 优化要点说明

1. **完美支持 ElementUI（及 Element Plus）的 `el-select`**  
   - 自动识别 `type: "select"` 但非原生 `<select>` 的元素，进入 `el-select` 专用处理逻辑。  
   - 异步打开下拉菜单，等待渲染后通过模拟点击选项完成选中，触发 Vue 内部的数据更新。  
   - 通过 `aria-owns` 关联或可见性检测精准定位对应下拉，避免误操作其他下拉。

2. **增强 Vue 响应式触发**  
   - 原生输入框填充时不仅触发 `input` 和 `change` 事件，还先 `focus`、清空再赋值，确保 `v-model` 双向绑定更新。  
   - `el-select` 赋值后额外触发 `change` 事件，兼容某些自定义监听器。

3. **保持原有架构不变**  
   - 多页面配置、快捷键触发、自动填充标记、MutationObserver 等全部保留。  
   - `type` 依然可以使用 `"input"`, `"select"`, `"checkbox"`, `"radio"`，无需更改已有配置（只需确保选择器指向 `el-select` 内部的 `input` 或外层容器）。

4. **兼容性与稳健性**  
   - 下拉菜单等待最多 2 秒，并有超时保护，防止页面卡死。  
   - 填充前会检查当前值是否已是目标值，避免重复操作。

---

将脚本复制到 Tampermonkey 中即可开始使用。如果页面使用了其他 UI 库（如 Ant Design），需要类似地增加对应的处理函数，可参照 `fillElSelect` 的模式进行扩展。