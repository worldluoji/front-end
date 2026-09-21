/**
 * 默认配置 + 用户覆盖逻辑
 */

/**
 * @typedef {Object} FieldConfig
 * @property {string} selector
 * @property {*} value
 * @property {string} [type] - input|select|checkbox|radio|switch|slider|...
 *
 * @typedef {Object} PageConfig
 * @property {string} name
 * @property {string|RegExp} urlPattern
 * @property {FieldConfig[]} fields
 *
 * @typedef {Object} RuntimeConfig
 * @property {boolean} AUTO_FILL_ON_LOAD
 * @property {{ key: string, ctrl: boolean, alt: boolean, shift: boolean, meta: boolean }} SHORTCUT
 * @property {PageConfig[]} PAGE_CONFIGS
 */

export const DEFAULT_CONFIG = {
  AUTO_FILL_ON_LOAD: false,
  SHORTCUT: {
    key: 'O',
    ctrl: false,
    alt: false,
    shift: true,
    meta: true,
  },
  PAGE_CONFIGS: [
    {
      name: '用户信息页（示例）',
      urlPattern: /\/user\/(profile|edit)/,
      fields: [
        { selector: '#userid', value: '123456', type: 'input' },
        { selector: "input[name='username']", value: '张三', type: 'input' },
        { selector: '.department-select .el-input__inner', value: 'tech', type: 'select' },
      ],
    },
    {
      name: '订单申请页（示例）',
      urlPattern: '/order/apply',
      fields: [
        { selector: '#orderId', value: 'ORD-2025001', type: 'input' },
        { selector: "input[name='quantity']", value: '10', type: 'input' },
        { selector: '#agreeTerms', value: true, type: 'checkbox' },
      ],
    },
  ],
};

/**
 * 解析运行时配置：优先级
 *   window.__AUTOFILL_CONFIG__ > localStorage(form_autofill_config_v3) > DEFAULT_CONFIG
 */
export function resolveConfig() {
  if (typeof window === 'undefined') return DEFAULT_CONFIG;
  const winOverride = window.__AUTOFILL_CONFIG__;

  // 同步读取 localStorage（避免循环依赖：直接在 resolveConfig 内处理，不引入 storage 模块）
  let stored = null;
  try {
    const raw = window.localStorage?.getItem('form_autofill_config_v3');
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === 'object') stored = parsed;
    }
  } catch {
    // ignore
  }

  const merged = { ...DEFAULT_CONFIG, ...(stored || {}), ...(winOverride || {}) };
  return {
    AUTO_FILL_ON_LOAD:
      typeof merged.AUTO_FILL_ON_LOAD === 'boolean'
        ? merged.AUTO_FILL_ON_LOAD
        : DEFAULT_CONFIG.AUTO_FILL_ON_LOAD,
    SHORTCUT: { ...DEFAULT_CONFIG.SHORTCUT, ...(merged.SHORTCUT || {}) },
    PAGE_CONFIGS: Array.isArray(merged.PAGE_CONFIGS)
      ? merged.PAGE_CONFIGS
      : DEFAULT_CONFIG.PAGE_CONFIGS,
  };
}
