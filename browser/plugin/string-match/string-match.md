# 字符串匹配
该脚本允许您通过自定义组合键（如 `Ctrl+Alt+O`），在指定的页面区域中快速检查预设关键词是否全部存在，并给出清晰的提示。

```javascript
// ==UserScript==
// @name         组合键关键词检查器 Pro
// @namespace    http://tampermonkey.net/
// @version      2.0
// @description  按下组合键在指定区域内检查关键词（支持按域名/URL多配置）
// @author       YourName
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 配置区域（请根据需要修改） ====================

    // ---------- 默认全局组合键 ----------
    // 注意：Mac 上 Command 键对应 metaKey: true
    const DEFAULT_COMBO = {
        ctrlKey: true,      // Ctrl 键
        altKey: false,      // Alt/Option 键
        shiftKey: false,    // Shift 键
        metaKey: true,      // Command 键 (Mac) / Windows 键 (Win)
        key: 'o'            // 主键（不区分大小写）
    };

    // ---------- 默认配置（当没有规则匹配时使用）----------
    const DEFAULT_SELECTORS = ['body'];
    const DEFAULT_STRINGS = ['示例关键词1', '示例关键词2'];

    // ---------- 按域名/URL 的独立配置规则 ----------
    // 每条规则包含：
    //   match    : 字符串（包含匹配）或正则表达式（匹配当前页面 URL）
    //   selectors: 在该页面下使用的 DOM 选择器数组
    //   strings  : 在该页面下需要检查的关键词数组
    //   combo    : (可选) 针对该页面的特定组合键，不填则使用 DEFAULT_COMBO
    const RULES = [
        {
            // 示例1：匹配特定域名（包含 .example.com 的网址）
            match: '.example.com',
            selectors: ['#content', '.main-area'],
            strings: ['产品详情', '价格', '库存'],
            combo: {                    // 该页面专属快捷键（可选）
                ctrlKey: true,
                altKey: true,
                shiftKey: false,
                metaKey: false,
                key: 'k'
            }
        },
        {
            // 示例2：匹配特定路径（正则）
            match: /github\.com\/.*\/issues/,
            selectors: ['.js-issue-row', '.discussion-timeline'],
            strings: ['bug', 'enhancement', 'question']
        },
        {
            // 示例3：匹配本地文件或特定完整 URL
            match: 'http://localhost:3000',
            selectors: ['#app'],
            strings: ['开发环境', '调试信息']
        }
    ];

    // ---------- 提示框显示时长（毫秒）----------
    const TOAST_DURATION = 3000;

    // ==================== 以下为脚本逻辑，一般无需修改 ====================

    /**
     * 根据当前 URL 获取匹配的配置
     */
    function getCurrentConfig() {
        const currentUrl = window.location.href;

        for (const rule of RULES) {
            let isMatch = false;
            if (typeof rule.match === 'string') {
                isMatch = currentUrl.includes(rule.match);
            } else if (rule.match instanceof RegExp) {
                isMatch = rule.match.test(currentUrl);
            }
            if (isMatch) {
                return {
                    selectors: rule.selectors || DEFAULT_SELECTORS,
                    strings: rule.strings || DEFAULT_STRINGS,
                    combo: rule.combo || DEFAULT_COMBO
                };
            }
        }

        // 没有匹配的规则，返回默认配置
        return {
            selectors: DEFAULT_SELECTORS,
            strings: DEFAULT_STRINGS,
            combo: DEFAULT_COMBO
        };
    }

    /**
     * 创建并显示提示浮层
     */
    function showToast(message, type = 'info') {
        const existingToast = document.getElementById('keyword-checker-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'keyword-checker-toast';
        toast.innerHTML = message;

        const style = toast.style;
        style.position = 'fixed';
        style.top = '20px';
        style.right = '20px';
        style.maxWidth = '400px';
        style.padding = '12px 20px';
        style.borderRadius = '8px';
        style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
        style.fontSize = '14px';
        style.fontFamily = 'system-ui, sans-serif';
        style.zIndex = '999999';
        style.transition = 'opacity 0.3s';
        style.color = '#fff';
        style.backgroundColor = type === 'success' ? '#10b981' : (type === 'error' ? '#ef4444' : '#3b82f6');

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, TOAST_DURATION);
    }

    /**
     * 获取指定选择器区域内的合并文本
     */
    function getCombinedText(selectors) {
        let combinedText = '';
        selectors.forEach(selector => {
            try {
                const elements = document.querySelectorAll(selector);
                elements.forEach(el => {
                    combinedText += ' ' + (el.innerText || el.textContent || '');
                });
            } catch (e) {
                console.warn(`[关键词检查器] 无效的选择器: "${selector}"`, e);
            }
        });
        return combinedText;
    }

    /**
     * 执行检查
     */
    function performCheck(config) {
        const { selectors, strings } = config;

        if (!selectors.length) {
            showToast('⚠️ 未配置任何 DOM 选择器', 'error');
            return;
        }
        if (!strings.length) {
            showToast('⚠️ 未配置任何待检查关键词', 'error');
            return;
        }

        const combinedText = getCombinedText(selectors);
        if (!combinedText.trim()) {
            showToast('⚠️ 指定区域未获取到任何文本内容', 'error');
            return;
        }

        const missingStrings = [];
        const lowerCaseText = combinedText.toLowerCase();

        strings.forEach(str => {
            if (!lowerCaseText.includes(str.toLowerCase())) {
                missingStrings.push(str);
            }
        });

        if (missingStrings.length === 0) {
            const successMsg = `
                <div style="display:flex; align-items:center;">
                    <span style="font-size:18px; margin-right:8px;">✅</span>
                    <span>所有关键词均已找到！</span>
                </div>
                <div style="margin-top:6px; font-size:12px; opacity:0.9;">
                    共检查 ${strings.length} 个关键词
                </div>
            `;
            showToast(successMsg, 'success');
        } else {
            const missingList = missingStrings.map(s => `<li style="margin:2px 0;">• ${s}</li>`).join('');
            const errorMsg = `
                <div style="display:flex; align-items:center; margin-bottom:8px;">
                    <span style="font-size:18px; margin-right:8px;">❌</span>
                    <span>缺少以下关键词 (${missingStrings.length}/${strings.length})：</span>
                </div>
                <ul style="margin:0; padding-left:16px; list-style-type:none;">
                    ${missingList}
                </ul>
            `;
            showToast(errorMsg, 'error');
        }
    }

    /**
     * 键盘事件监听
     */
    function onKeyDown(event) {
        const config = getCurrentConfig();
        const combo = config.combo;

        // 检查修饰键是否完全匹配（注意 metaKey 在 Mac 上即为 Command）
        if (event.ctrlKey !== combo.ctrlKey) return;
        if (event.altKey !== combo.altKey) return;
        if (event.shiftKey !== combo.shiftKey) return;
        if (event.metaKey !== combo.metaKey) return;

        // 检查主键（不区分大小写）
        if (event.key.toLowerCase() !== combo.key.toLowerCase()) return;

        // 阻止浏览器默认行为
        event.preventDefault();
        event.stopPropagation();

        // 执行检查
        performCheck(config);
    }

    // 绑定键盘监听
    document.addEventListener('keydown', onKeyDown);

    // 启动时在控制台输出当前匹配的配置，方便调试
    const currentConfig = getCurrentConfig();
    const combo = currentConfig.combo;
    const comboDesc = `${combo.ctrlKey ? 'Ctrl+' : ''}${combo.altKey ? 'Alt+' : ''}${combo.shiftKey ? 'Shift+' : ''}${combo.metaKey ? 'Command+' : ''}${combo.key.toUpperCase()}`;
    console.log(`[关键词检查器 Pro] 脚本已启动。当前页面匹配的配置：`, currentConfig);
    console.log(`[关键词检查器 Pro] 请按下组合键 ${comboDesc} 进行检查。`);
})();
```

### 使用方法与配置说明

1. **安装脚本**：在 Tampermonkey 中新建脚本，将上述代码完整粘贴并保存。
2. **修改配置**（脚本开头的“配置区域”）：
   - **组合键**：修改 `COMBO` 对象中的布尔值及 `key` 字符串即可。例如改为 `Shift+Alt+X`：`shiftKey: true, altKey: true, key: 'x'`。
   - **检查区域**：在 `SELECTORS` 数组中添加 CSS 选择器，如 `'#article-body'` 或 `'.post-content'`。
   - **关键词列表**：在 `TARGET_STRINGS` 数组中填写需要检查的文本。
3. **触发检查**：在目标网页按下您设定的组合键，页面右上角会弹出提示框，告知检查结果。

### 核心逻辑说明

- **文本聚合**：脚本会通过 `querySelectorAll` 获取所有匹配选择器的元素，并将其内部文本（`innerText`）拼接在一起进行搜索，因此关键词只要出现在任意一个指定区域内即视为存在。
- **不区分大小写**：搜索时会将文本和关键词统一转为小写进行比较。
- **提示友好**：成功时显示绿色对勾，失败时列出所有缺失的关键词，并显示缺失数量。

如果您希望支持动态加载的 DOM 内容（例如 AJAX 后出现的内容），可以在配置区添加一个 `MutationObserver` 监听，但当前版本已满足大多数静态页面的需求。