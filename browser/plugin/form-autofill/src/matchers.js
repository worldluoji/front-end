/**
 * URL 匹配工具
 */

/**
 * 判断当前 URL 是否匹配配置的 urlPattern
 * @param {string|RegExp|null|undefined} pattern
 * @param {string} currentUrl
 * @returns {boolean}
 */
export function isUrlMatch(pattern, currentUrl) {
  if (pattern == null) return false;
  if (pattern instanceof RegExp) return pattern.test(currentUrl);
  if (typeof pattern === 'string') return currentUrl.includes(pattern);
  return false;
}

/**
 * 在配置列表中按顺序找出第一个 URL 匹配的项
 * @param {Array} configs
 * @param {string} currentUrl
 * @returns {object|null}
 */
export function findMatchingConfig(configs, currentUrl) {
  if (!Array.isArray(configs)) return null;
  for (const config of configs) {
    if (isUrlMatch(config?.urlPattern, currentUrl)) return config;
  }
  return null;
}
