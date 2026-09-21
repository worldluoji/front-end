/**
 * 入口：注册所有填充器、初始化快捷键与自动观察、挂载浮动按钮
 */

import { setupShortcut, autoFillIfEnabled, executeFill } from './core.js';
import { resolveConfig } from './config.js';
import { openConfigUI, mountFloatingButton } from './config-ui.js';

// 仅在浏览器中执行
if (typeof window !== 'undefined') {
  const start = () => {
    setupShortcut();
    autoFillIfEnabled();
    mountFloatingButton();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  // 监听 UI / 油猴菜单发出的事件
  window.addEventListener('autofill:open-config', () => openConfigUI());
  window.addEventListener('autofill:execute-fill', () => executeFill());
  window.addEventListener('autofill:config-updated', () => {
    // 配置已更新，重新注册快捷键
    setupShortcut();
  });

  // 暴露给外部（如测试或用户控制台手动触发）
  window.__AUTOFILL__ = {
    executeFill,
    openConfig: openConfigUI,
    getConfig: resolveConfig,
  };

  // 注册油猴菜单命令（需要 @grant GM_registerMenuCommand）
  try {
    if (typeof GM_registerMenuCommand === 'function') {
      GM_registerMenuCommand('打开自动填充配置', () => openConfigUI());
      GM_registerMenuCommand('立即填充当前页面', () => executeFill());
    }
  } catch {
    // ignore
  }
}

export { setupShortcut, autoFillIfEnabled, executeFill } from './core.js';
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
