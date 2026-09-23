/**
 * 核心流程：单条填充 / 整页填充 / 自动观察 / 快捷键
 */

import { fillers } from './fillers/index.js';
import { findMatchingConfig } from './matchers.js';
import { resolveConfig } from './config.js';
import {
  getActiveProfile,
  setActiveProfile,
  listProfiles,
} from './config-storage.js';

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
 * 兼容旧 fields 写法：没有 profiles 就把旧 fields 归一为 profiles.default
 * 不引入 storage 的 normalize 以避免循环依赖
 */
function ensureProfiles(page) {
  if (!page) return null;
  if (!page.profiles || Object.keys(page.profiles).length === 0) {
    const legacy = Array.isArray(page.fields) ? page.fields : [];
    page.profiles = { default: { fields: legacy } };
  }
  return page;
}

/**
 * 取当前激活 profile 的 fields；profile 不存在返回空数组
 */
function getActiveFields(page) {
  if (!page) return [];
  ensureProfiles(page);
  const name = getActiveProfile(page);
  if (!name) return [];
  return page.profiles[name]?.fields || [];
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
 * 把 fields 拆成执行计划：单字段串行；同名 parallelGroup 的连续项作为一个原子单元，组内并行
 * 同名组若被其他字段隔开，按位置拆为多次执行
 * @param {Array<object>} fields
 * @returns {Array<{kind:'single',item:object}|{kind:'group',group:string,items:object[]}>}
 */
export function buildSchedule(fields) {
  const schedule2 = [];
  let i = 0;
  while (i < fields.length) {
    const cur = fields[i];
    const group = (cur && typeof cur.parallelGroup === 'string') ? cur.parallelGroup.trim() : '';
    if (!group) {
      schedule2.push({ kind: 'single', item: cur });
      i += 1;
      continue;
    }
    const members = [];
    while (
      i < fields.length
      && fields[i]
      && typeof fields[i].parallelGroup === 'string'
      && fields[i].parallelGroup.trim() === group
    ) {
      members.push(fields[i]);
      i += 1;
    }
    schedule2.push({ kind: 'group', group, items: members });
  }
  return schedule2;
}

/**
 * 按 plan 执行填充：single 顺序、group 内并行；整组完成才进下一步
 * @param {ReturnType<typeof buildSchedule>} schedule
 */
export async function runSchedule(schedule) {
  for (const step of schedule) {
    if (step.kind === 'single') {
      await tryFill(step.item);
    } else {
      await Promise.all(step.items.map((it) => tryFill(it)));
    }
  }
}

/**
 * 根据当前 URL 找到的页面配置；找不到则 null
 */
export function getCurrentConfig() {
  const cfg = resolveConfig();
  const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
  if (config) {
    ensureProfiles(config);
    const profile = getActiveProfile(config);
    // eslint-disable-next-line no-console
    console.log(`[自动填充] 匹配到页面配置：${config.name}（profile: ${profile || '?'}）`);
  } else {
    // eslint-disable-next-line no-console
    console.log('[自动填充] 未匹配到任何页面配置');
  }
  return config;
}

/**
 * 执行一次完整填充（手动触发或自动模式首次）
 * @param {string} [profileOverride] - 临时用指定 profile 的 fields 填充（不修改持久化的 active profile）
 */
export async function executeFill(profileOverride) {
  const cfg = resolveConfig();
  const config = findMatchingConfig(cfg.PAGE_CONFIGS, window.location.href);
  if (!config) return;

  ensureProfiles(config);
  const profileName =
    profileOverride && config.profiles[profileOverride]
      ? profileOverride
      : getActiveProfile(config);
  const fields = config.profiles[profileName]?.fields || [];
  if (fields.length === 0) return;

  // 手动触发时，先清标记允许重新填充
  if (!cfg.AUTO_FILL_ON_LOAD) {
    fields.forEach((item) => {
      const el = document.querySelector(item.selector);
      if (el) clearFilled(el);
    });
  }

  await runSchedule(buildSchedule(fields));
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

    ensureProfiles(config);
    const fields = getActiveFields(config);
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
      await runSchedule(buildSchedule(fields));
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

/**
 * profile 切换快捷键：循环切到下一个 profile
 * 复用填充快捷键的输入框忽略规则，避免输入时误触
 * 多次调用会替换旧的 handler（避免和配置更新后的累加触发冲突）
 */
let profileSwitchHandler = null;
let profileSwitchLoggedKey = null;

export function setupProfileSwitchShortcut() {
  if (profileSwitchHandler) {
    window.removeEventListener('keydown', profileSwitchHandler);
    profileSwitchHandler = null;
  }
  const { SHORTCUT_PROFILE_SWITCH } = resolveConfig();
  if (!SHORTCUT_PROFILE_SWITCH || !SHORTCUT_PROFILE_SWITCH.key) return;
  const { key, ctrl, alt, shift, meta } = SHORTCUT_PROFILE_SWITCH;
  const targetKey = (key || '').toUpperCase();

  profileSwitchHandler = (e) => {
    if ((e.key || '').toUpperCase() !== targetKey) return;
    if (!!e.ctrlKey !== !!ctrl) return;
    if (!!e.altKey !== !!alt) return;
    if (!!e.shiftKey !== !!shift) return;
    if (!!e.metaKey !== !!meta) return;

    const tag = (e.target && e.target.tagName) || '';
    if (tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable) {
      return;
    }

    e.preventDefault();
    e.stopPropagation();
    cycleProfile();
  };
  window.addEventListener('keydown', profileSwitchHandler);

  const comboKey = [
    ctrl && 'Ctrl',
    alt && 'Alt',
    shift && 'Shift',
    meta && 'Meta',
    targetKey,
  ]
    .filter(Boolean)
    .join('+');
  if (comboKey !== profileSwitchLoggedKey) {
    // eslint-disable-next-line no-console
    console.log(`[自动填充] profile 切换快捷键已启用：${comboKey}`);
    profileSwitchLoggedKey = comboKey;
  }
}

/**
 * 把当前匹配页面的 profile 切到下一个（按对象 key 顺序循环）
 * 同时清掉当前 profile 字段的填充标记，使新 profile 立即可填
 * @returns {{ configName: string, profile: string }|null}
 */
export function cycleProfile() {
  const config = findMatchingConfig(
    resolveConfig().PAGE_CONFIGS,
    window.location.href
  );
  if (!config) {
    // eslint-disable-next-line no-console
    console.log('[自动填充] 当前页面没有匹配的配置，无法切换 profile');
    return null;
  }
  ensureProfiles(config);
  const profiles = listProfiles(config);
  if (profiles.length <= 1) {
    // eslint-disable-next-line no-console
    console.log(`[自动填充] ${config.name} 只有 1 个 profile，无需切换`);
    return null;
  }

  const current = getActiveProfile(config);
  const idx = Math.max(0, profiles.indexOf(current));
  const next = profiles[(idx + 1) % profiles.length];
  setActiveProfile(config, next);

  // 清掉下一个 profile 各字段的填充标记，确保下次填充能应用新值
  const nextFields = config.profiles[next]?.fields || [];
  nextFields.forEach((item) => {
    const el = document.querySelector(item.selector);
    if (el) clearFilled(el);
  });

  // eslint-disable-next-line no-console
  console.log(`[自动填充] 切换 profile: ${config.name} → ${next}`);
  return { configName: config.name, profile: next };
}
