/**
 * 入口：注册所有填充器、初始化快捷键与自动观察、挂载浮动按钮
 */

import {
  setupShortcut,
  setupProfileSwitchShortcut,
  autoFillIfEnabled,
  executeFill,
  cycleProfile,
} from './core.js';
import { resolveConfig } from './config.js';
import { openConfigUI, mountFloatingButton } from './config-ui.js';

// 仅在浏览器中执行
if (typeof window !== 'undefined') {
  const start = () => {
    setupShortcut();
    setupProfileSwitchShortcut();
    autoFillIfEnabled();
    mountFloatingButton();
    setupConfigShortcut();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  // 监听 UI 发出的事件
  window.addEventListener('autofill:open-config', () => openConfigUI());
  window.addEventListener('autofill:execute-fill', (e) => executeFill(e?.detail?.profile));
  window.addEventListener('autofill:config-updated', () => {
    // 配置已更新，重新注册快捷键
    setupShortcut();
    setupProfileSwitchShortcut();
  });

  // 暴露给外部（如测试或用户控制台手动触发）
  window.__AUTOFILL__ = {
    executeFill,
    cycleProfile,
    openConfig: openConfigUI,
    getConfig: resolveConfig,
  };
}

/**
 * 配置页专用快捷键：Meta+Ctrl+Shift+K（Win 上是 Win+Ctrl+Shift+K，Mac 上是 Cmd+Ctrl+Shift+K）
 * 冷门组合，避免与浏览器/系统快捷键冲突；同时不使用 Alt，兼容 Mac 的 Option 修饰键用法
 */
function setupConfigShortcut() {
  window.addEventListener('keydown', (e) => {
    if (!e.metaKey || !e.ctrlKey || !e.shiftKey) return;
    if (e.altKey) return;
    if ((e.key || '').toLowerCase() !== 'k') return;
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    openConfigUI();
  });
}

export {
  setupShortcut,
  setupProfileSwitchShortcut,
  autoFillIfEnabled,
  executeFill,
  cycleProfile,
} from './core.js';
export { resolveConfig } from './config.js';
export { isUrlMatch, findMatchingConfig } from './matchers.js';
export { fillers, nativeFiller, elementPlusFiller } from './fillers/index.js';
export {
  setNativeValue,
  triggerInputEvents,
  fillInput,
  wait,
  waitFor,
  observeUntil,
} from './dom-utils.js';
export {
  openConfigUI,
  mountFloatingButton,
} from './config-ui.js';
export {
  FIELD_TYPES,
  getDefaultValueByType,
  getFieldTypeLabel,
} from './config-types.js';
export {
  STORAGE_KEY,
  loadStoredConfig,
  saveStoredConfig,
  clearStoredConfig,
  normalizeConfig,
  exportConfigJson,
  importConfigJson,
} from './config-storage.js';
