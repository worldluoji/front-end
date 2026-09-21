/**
 * 配置存储（localStorage）
 */

import { DEFAULT_CONFIG } from './config.js';

export const STORAGE_KEY = 'form_autofill_config_v3';

function hasLocalStorage() {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

/**
 * 从 localStorage 加载保存的配置（不含 window override）
 * @returns {object|null}
 */
export function loadStoredConfig() {
  if (!hasLocalStorage()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return null;
    return parsed;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[自动填充] 读取配置失败：', e);
    return null;
  }
}

/**
 * 保存配置到 localStorage
 * @param {object} config
 * @returns {boolean} 是否保存成功
 */
export function saveStoredConfig(config) {
  if (!hasLocalStorage()) return false;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
    return true;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('[自动填充] 保存配置失败：', e);
    return false;
  }
}

export function clearStoredConfig() {
  if (!hasLocalStorage()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

/**
 * 校验并规范化配置（确保所有必要字段存在）
 * @param {object} raw
 * @returns {object}
 */
export function normalizeConfig(raw) {
  const base = DEFAULT_CONFIG;
  if (!raw || typeof raw !== 'object') return structuredClone(base);
  return {
    AUTO_FILL_ON_LOAD:
      typeof raw.AUTO_FILL_ON_LOAD === 'boolean'
        ? raw.AUTO_FILL_ON_LOAD
        : base.AUTO_FILL_ON_LOAD,
    SHORTCUT: { ...base.SHORTCUT, ...(raw.SHORTCUT || {}) },
    PAGE_CONFIGS: Array.isArray(raw.PAGE_CONFIGS)
      ? raw.PAGE_CONFIGS.map((p) => ({
          name: typeof p?.name === 'string' ? p.name : '未命名',
          urlPattern: p?.urlPattern ?? '',
          fields: Array.isArray(p?.fields)
            ? p.fields.map((f) => ({
                selector: typeof f?.selector === 'string' ? f.selector : '',
                value: f?.value ?? '',
                type: typeof f?.type === 'string' ? f.type : 'input',
              }))
            : [],
        }))
      : [],
  };
}

/**
 * 导出为 JSON 字符串
 */
export function exportConfigJson(config) {
  return JSON.stringify(config, null, 2);
}

/**
 * 从 JSON 字符串导入
 */
export function importConfigJson(json) {
  const parsed = JSON.parse(json);
  return normalizeConfig(parsed);
}
