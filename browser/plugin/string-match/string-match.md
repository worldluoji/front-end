# 字符串匹配
该脚本允许您通过自定义组合键（如 `Ctrl+Alt+O`），在指定的页面区域中快速检查预设关键词是否全部存在，并给出清晰的提示。

```javascript
// ==UserScript==
// @name         组合键关键词检查器
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  按下组合键在指定DOM区域内检查预设关键词是否存在
// @author       YourName
// @match        *://*/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // ==================== 配置区域（请根据需要修改） ====================

    // 1. 组合键配置
    // 修饰键：ctrlKey, altKey, shiftKey, metaKey (Windows键/Command键)
    // key 值请使用 event.key 的字符串形式（例如 'o', 'O', 'F2'）
    const COMBO = {
        ctrlKey: true,
        altKey: true,
        shiftKey: false,
        metaKey: false,
        key: 'o'        // 不区分大小写，内部会统一转为小写比较
    };

    // 2. DOM 节点选择器列表（支持任何有效的 CSS 选择器）
    const SELECTORS = [
        'body',                 // 整个页面
        // '#content',          // ID 为 content 的元素
        // '.main-article',     // class 为 main-article 的元素
        // 'div.post-content'   // 更具体的选择器
    ];

    // 3. 需要检查的字符串列表
    const TARGET_STRINGS = [
        '苹果',
        '香蕉',
        '橙子'
        // 请在此添加或修改需要检查的文本
    ];

    // 4. 提示框显示时长（毫秒）
    const TOAST_DURATION = 3000;

    // ==================== 以下为脚本逻辑，一般无需修改 ====================

    /**
     * 创建并显示提示浮层
     * @param {string} message - 提示内容（支持 HTML）
     * @param {string} type - 类型: 'success', 'error', 'info'
     */
    function showToast(message, type = 'info') {
        // 移除已存在的提示框，避免重叠
        const existingToast = document.getElementById('keyword-checker-toast');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.id = 'keyword-checker-toast';
        toast.innerHTML = message;
        
        // 样式设计
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

        // 自动消失
        setTimeout(() => {
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, TOAST_DURATION);
    }

    /**
     * 获取所有指定选择器元素内的合并文本
     * @returns {string} 合并后的文本
     */
    function getCombinedText() {
        let combinedText = '';
        SELECTORS.forEach(selector => {
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
     * 执行关键词检查并显示结果
     */
    function performCheck() {
        if (!SELECTORS.length) {
            showToast('⚠️ 未配置任何 DOM 选择器', 'error');
            return;
        }
        if (!TARGET_STRINGS.length) {
            showToast('⚠️ 未配置任何待检查关键词', 'error');
            return;
        }

        const combinedText = getCombinedText();
        if (!combinedText.trim()) {
            showToast('⚠️ 指定区域未获取到任何文本内容', 'error');
            return;
        }

        // 检查每个关键词是否存在（不区分大小写）
        const missingStrings = [];
        const lowerCaseText = combinedText.toLowerCase();
        
        TARGET_STRINGS.forEach(str => {
            if (!lowerCaseText.includes(str.toLowerCase())) {
                missingStrings.push(str);
            }
        });

        // 构造提示信息
        if (missingStrings.length === 0) {
            const successMsg = `
                <div style="display:flex; align-items:center;">
                    <span style="font-size:18px; margin-right:8px;">✅</span>
                    <span>所有关键词均已找到！</span>
                </div>
                <div style="margin-top:6px; font-size:12px; opacity:0.9;">
                    共检查 ${TARGET_STRINGS.length} 个关键词
                </div>
            `;
            showToast(successMsg, 'success');
        } else {
            const missingList = missingStrings.map(s => `<li style="margin:2px 0;">• ${s}</li>`).join('');
            const errorMsg = `
                <div style="display:flex; align-items:center; margin-bottom:8px;">
                    <span style="font-size:18px; margin-right:8px;">❌</span>
                    <span>缺少以下关键词 (${missingStrings.length}/${TARGET_STRINGS.length})：</span>
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
        // 检查修饰键是否完全匹配
        if (event.ctrlKey !== COMBO.ctrlKey) return;
        if (event.altKey !== COMBO.altKey) return;
        if (event.shiftKey !== COMBO.shiftKey) return;
        if (event.metaKey !== COMBO.metaKey) return;

        // 检查主键（统一转为小写比较，避免大小写敏感）
        if (event.key.toLowerCase() !== COMBO.key.toLowerCase()) return;

        // 防止触发浏览器默认快捷键（例如 Ctrl+Alt+O 在某些浏览器可能无默认行为，但预防性处理）
        event.preventDefault();
        event.stopPropagation();

        // 执行检查
        performCheck();
    }

    // 绑定键盘监听
    document.addEventListener('keydown', onKeyDown);

    // 可选：在控制台输出提示，方便用户知道脚本已加载
    console.log('[关键词检查器] 脚本已启动。按下组合键 ' + 
        `${COMBO.ctrlKey ? 'Ctrl+' : ''}${COMBO.altKey ? 'Alt+' : ''}${COMBO.shiftKey ? 'Shift+' : ''}${COMBO.metaKey ? 'Meta+' : ''}${COMBO.key.toUpperCase()} 进行检查。`);
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