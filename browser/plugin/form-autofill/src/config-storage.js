/**
 * 配置存储（localStorage）
 */

import { DEFAULT_CONFIG } from './config.js';

export const STORAGE_KEY = 'form_autofill_config_v3';
export const PROFILE_STORAGE_KEY = 'form_autofill_active_profiles';

function hasLocalStorage() {
  try {
    return typeof localStorage !== 'undefined';
  } catch {
    return false;
  }
}

function readProfileMap() {
  if (!hasLocalStorage()) return {};
  try {
    const raw = localStorage.getItem(PROFILE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' ? parsed : {};
  } catch {
    return {};
  }
}

function writeProfileMap(map) {
  if (!hasLocalStorage()) return;
  try {
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(map));
  } catch {
    // ignore
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
    SHORTCUT_PROFILE_SWITCH: {
      ...base.SHORTCUT_PROFILE_SWITCH,
      ...(raw.SHORTCUT_PROFILE_SWITCH || {}),
    },
    PAGE_CONFIGS: Array.isArray(raw.PAGE_CONFIGS)
      ? raw.PAGE_CONFIGS.map((p) => normalizePage(p))
      : [],
  };
}

function normalizeField(f) {
  let t = typeof f?.type === 'string' ? f.type : 'input';
  // 兼容旧版 type：v3.1 之前有 checkbox-group / radio-group，已合并到单 type
  if (t === 'checkbox-group') t = 'checkbox';
  if (t === 'radio-group') t = 'radio';
  return {
    selector: typeof f?.selector === 'string' ? f.selector : '',
    value: f?.value ?? '',
    type: t,
  };
}

function normalizeProfile(prof) {
  if (!prof || typeof prof !== 'object') return { fields: [] };
  return {
    fields: Array.isArray(prof.fields) ? prof.fields.map(normalizeField) : [],
  };
}

function normalizePage(p) {
  const name = typeof p?.name === 'string' ? p.name : '未命名';
  const urlPattern = p?.urlPattern ?? '';
  let profiles;
  if (p?.profiles && typeof p.profiles === 'object' && Object.keys(p.profiles).length > 0) {
    profiles = {};
    for (const [k, v] of Object.entries(p.profiles)) {
      profiles[k] = normalizeProfile(v);
    }
  } else {
    // 旧写法：仅 fields → 归一为单 profile 'default'
    profiles = {
      default: {
        fields: Array.isArray(p?.fields) ? p.fields.map(normalizeField) : [],
      },
    };
  }
  // 保证至少有一个 profile
  if (Object.keys(profiles).length === 0) {
    profiles = { default: { fields: [] } };
  }
  return { name, urlPattern, profiles };
}

/**
 * 读取某个 page config 当前激活的 profile 名称
 * @param {object} pageConfig
 * @returns {string|null} 找不到匹配 profile 时返回 null
 */
export function getActiveProfile(pageConfig) {
  if (!pageConfig || !pageConfig.profiles) return null;
  const keys = Object.keys(pageConfig.profiles);
  if (keys.length === 0) return null;

  const map = readProfileMap();
  const stored = map[pageConfig.name];
  if (stored && pageConfig.profiles[stored]) return stored;

  if (pageConfig.profiles.default) return 'default';
  return keys[0];
}

/**
 * 设置某个 page config 当前激活的 profile
 * @param {object} pageConfig
 * @param {string} profileName
 * @returns {boolean} 是否成功
 */
export function setActiveProfile(pageConfig, profileName) {
  if (!pageConfig || !pageConfig.profiles) return false;
  if (!pageConfig.profiles[profileName]) return false;
  const map = readProfileMap();
  map[pageConfig.name] = profileName;
  writeProfileMap(map);
  return true;
}

/**
 * 列出 page config 下所有 profile 名称（按对象 key 顺序）
 * @param {object} pageConfig
 * @returns {string[]}
 */
export function listProfiles(pageConfig) {
  if (!pageConfig || !pageConfig.profiles) return [];
  return Object.keys(pageConfig.profiles);
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
