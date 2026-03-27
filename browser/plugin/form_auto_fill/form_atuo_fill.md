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

如果需要更高级的功能（如动态读取配置、循环处理、多表单自动提交等），可以在此基础上继续扩展。