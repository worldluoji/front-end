/**
 * 核心流程：单条填充 / 整页填充 / 自动观察 / 快捷键
 */

import { fillers } from './fillers/index.js';
import { findMatchingConfig } from './matchers.js';
import { resolveConfig } from './config.js';
import { querySelectorSafe } from './dom-utils.js';
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
  const el = querySelectorSafe(document, item.selector);
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
 * 填充串行化：同一时刻只跑一个调度。运行中收到的新请求合并成最新一个，
 * 当前调度结束后尾随执行一次。
 * 不加锁时，填充引起的 DOM 变动（下拉面板挂载/卸载）会再触发 MutationObserver
 * 开启新一轮 runSchedule，多轮并发导致同一字段重复填、el-select 面板互相关闭，
 * 表现为"多个字段时有时能填有时不能"。
 */
let fillRunning = false;
let fillQueued = null; // { task, manual }

/**
 * @param {() => Promise<void>} task
 * @param {{ manual?: boolean }} [opts] - manual=true 表示重填请求（清标记），
 *   合并时优先保留：它清标记 + 填全部字段，是 auto 请求（跳过已填）的超集
 */
function enqueueFill(task, opts = {}) {
  const req = { task, manual: !!opts.manual };
  if (fillRunning) {
    if (!fillQueued || req.manual || !fillQueued.manual) fillQueued = req;
    return;
  }
  return drainFill(req);
}

async function drainFill(req) {
  fillRunning = true;
  let current = req;
  while (current) {
    try {
      await current.task();
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('[自动填充] 填充执行异常：', e);
    }
    current = fillQueued;
    fillQueued = null;
  }
  fillRunning = false;
}

/**
 * 用最新配置执行一轮填充（配置在任务执行时才解析，排队的尾随执行不会用过期配置）
 * @param {string} [profileOverride] - 临时指定 profile
 * @param {boolean} clearMarks - 填充前清除已填充标记（手动触发需要重填）
 */
async function fillOnce(profileOverride, clearMarks) {
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

  // 手动触发时，先清标记允许重新填充（不管 AUTO_FILL_ON_LOAD 是否开启 —— 手动按快捷键
  // 的目的就是再填一次当前 profile 的字段）
  if (clearMarks) {
    fields.forEach((item) => {
      const el = querySelectorSafe(document, item.selector);
      if (el) clearFilled(el);
    });
  }

  await runSchedule(buildSchedule(fields));
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
 * 并发调用时自动排队：当前调度结束后用最新配置再跑一次
 * @param {string} [profileOverride] - 临时用指定 profile 的 fields 填充（不修改持久化的 active profile）
 */
export function executeFill(profileOverride) {
  return enqueueFill(() => fillOnce(profileOverride, true), { manual: true });
}

/**
 * 自动模式：MutationObserver 监听 DOM，等元素出现后填充
 */
export function autoFillIfEnabled() {
  const cfg = resolveConfig();
  if (!cfg.AUTO_FILL_ON_LOAD) return;

  const getFields = () => {
    // 每次回调重新解析配置，避免闭包持有过期的 PAGE_CONFIGS（配置更新事件不会重建 observer）
    const config = findMatchingConfig(resolveConfig().PAGE_CONFIGS, window.location.href);
    if (!config) return null;
    ensureProfiles(config);
    return getActiveFields(config);
  };

  const isAllFilled = (fields) =>
    fields.length > 0 &&
    fields.every((item) => {
      const el = querySelectorSafe(document, item.selector);
      return !!el && isFilled(el);
    });

  let done = false;
  const finish = (observer) => {
    if (done) return;
    done = true;
    observer.disconnect();
    // eslint-disable-next-line no-console
    console.log('[自动填充] 所有表单项已填充完毕');
  };

  const observer = new MutationObserver(() => {
    if (done) return;

    const fields = getFields();
    if (!fields || fields.length === 0) return;

    if (isAllFilled(fields)) {
      finish(observer);
      return;
    }

    enqueueFill(async () => {
      await fillOnce(undefined, false);
      const latest = getFields();
      if (latest && isAllFilled(latest)) finish(observer);
    });
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
    const el = querySelectorSafe(document, item.selector);
    if (el) clearFilled(el);
  });

  // eslint-disable-next-line no-console
  console.log(`[自动填充] 切换 profile: ${config.name} → ${next}`);
  return { configName: config.name, profile: next };
}
