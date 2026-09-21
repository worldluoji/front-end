/**
 * 核心流程：单条填充 / 整页填充 / 自动观察 / 快捷键
 */

import { fillers } from './fillers/index.js';
import { findMatchingConfig } from './matchers.js';
import { resolveConfig } from './config.js';

// 不污染 DOM 的填充标记
const filledSet = new WeakSet();

function isFilled(el) {
  return filledSet.has(el);
}

function markFilled(el) {
  filledSet.add(el);
}

function clearFilled(el) {
  filledSet.delete(el);
}

/**
 * 尝试填充单条配置项
 * @param {object} item
 * @returns {Promise<boolean>}
 */
export async function tryFill(item) {
  const el = document.querySelector(item.selector);
  if (!el) return false;
  if (isFilled(el)) return false;

  for (const filler of fillers) {
    if (!filler.match(el, item)) continue;
    const ok = await filler.fill(el, item.value, item);
    if (ok === true) {
      markFilled(el);
      // eslint-disable-next-line no-console
      console.log(`[自动填充] ${item.selector} 填充完成 (${filler.name})`);
      return true;
    }
  }

  // eslint-disable-next-line no-console
  console.warn(`[自动填充] ${item.selector} 没有可用的填充器`);
  return false;
}

/**
 * 根据当前 URL 找到的页面配置；找不到则 null
 */
export function getCurrentConfig() {
  const cfg = resolveConfig();
  const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
  if (config) {
    // eslint-disable-next-line no-console
    console.log(`[自动填充] 匹配到页面配置：${config.name}`);
  } else {
    // eslint-disable-next-line no-console
    console.log('[自动填充] 未匹配到任何页面配置');
  }
  return config;
}

/**
 * 执行一次完整填充（手动触发或自动模式首次）
 */
export async function executeFill() {
  const cfg = resolveConfig();
  const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
  if (!config) return;

  const fields = config.fields || [];
  if (fields.length === 0) return;

  // 手动触发时，先清标记允许重新填充
  if (!cfg.AUTO_FILL_ON_LOAD) {
    fields.forEach((item) => {
      const el = document.querySelector(item.selector);
      if (el) clearFilled(el);
    });
  }

  for (const item of fields) {
    await tryFill(item);
  }
}

/**
 * 自动模式：MutationObserver 监听 DOM，等元素出现后填充
 */
export function autoFillIfEnabled() {
  const cfg = resolveConfig();
  if (!cfg.AUTO_FILL_ON_LOAD) return;

  const observer = new MutationObserver(() => {
    const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
    if (!config) return;

    const fields = config.fields || [];
    if (fields.length === 0) return;

    let allReady = true;
    for (const item of fields) {
      const el = document.querySelector(item.selector);
      if (!el || !isFilled(el)) {
        allReady = false;
        break;
      }
    }
    if (allReady) {
      observer.disconnect();
      // eslint-disable-next-line no-console
      console.log('[自动填充] 所有表单项已填充完毕');
      return;
    }

    (async () => {
      for (const item of fields) {
        await tryFill(item);
      }
    })();
  });

  if (document.body) {
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    document.addEventListener(
      'DOMContentLoaded',
      () => observer.observe(document.body, { childList: true, subtree: true }),
      { once: true }
    );
  }
}

/**
 * 设置快捷键监听（多次调用会替换旧的）
 */
let shortcutHandler = null;
let shortcutLoggedKey = null;

export function setupShortcut() {
  if (shortcutHandler) {
    window.removeEventListener('keydown', shortcutHandler);
    shortcutHandler = null;
  }
  const { SHORTCUT } = resolveConfig();
  const { key, ctrl, alt, shift, meta } = SHORTCUT;
  const targetKey = (key || '').toUpperCase();

  shortcutHandler = (e) => {
    if ((e.key || '').toUpperCase() !== targetKey) return;
    if (!!e.ctrlKey !== !!ctrl) return;
    if (!!e.altKey !== !!alt) return;
    if (!!e.shiftKey !== !!shift) return;
    if (!!e.metaKey !== !!meta) return;

    // 在可编辑元素中不触发，避免误触
    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    // eslint-disable-next-line no-console
    console.log('[自动填充] 快捷键触发填充');
    executeFill();
  };
  window.addEventListener('keydown', shortcutHandler);

  const comboKey = [
    ctrl && 'Ctrl',
    alt && 'Alt',
    shift && 'Shift',
    meta && 'Meta',
    targetKey,
  ]
    .filter(Boolean)
    .join('+');
  if (comboKey !== shortcutLoggedKey) {
    // eslint-disable-next-line no-console
    console.log(`[自动填充] 快捷键已启用：${comboKey}`);
    shortcutLoggedKey = comboKey;
  }
}

/**
 * 暴露给测试：清理当前所有标记（慎用）
 */
export function _resetForTest() {
  // WeakSet 没有 clear，只能重新创建
  // 这里仅暴露 API 给单测
}
