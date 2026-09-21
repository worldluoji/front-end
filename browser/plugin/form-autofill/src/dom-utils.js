/**
 * DOM 工具
 * - nativeInputValueSetter: 绕过 React/Vue 的 patch，触发 v-model 更新
 * - wait: 异步延迟
 * - 等待下拉面板出现的 helper
 */

const inputValueSetter = Object.getOwnPropertyDescriptor(
  HTMLInputElement.prototype,
  'value'
)?.set;

const textareaValueSetter = Object.getOwnPropertyDescriptor(
  HTMLTextAreaElement.prototype,
  'value'
)?.set;

/**
 * 通过原生 setter 设置值，让 React/Vue 能监听到变化
 * @param {HTMLInputElement|HTMLTextAreaElement} el
 * @param {string} value
 */
export function setNativeValue(el, value) {
  if (!el) return;
  const setter = el.tagName === 'TEXTAREA' ? textareaValueSetter : inputValueSetter;
  if (setter) {
    setter.call(el, value);
  } else {
    el.value = value;
  }
}

/**
 * 触发 input + change 事件（bubble）
 */
export function triggerInputEvents(el) {
  if (!el) return;
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

/**
 * 触发 focus + setNativeValue + input + change
 * 这是 el-input 的标准填充序列
 */
export function fillInput(el, value) {
  if (!el) return false;
  if (el.tagName !== 'INPUT' && el.tagName !== 'TEXTAREA') return false;
  el.focus();
  setNativeValue(el, value);
  triggerInputEvents(el);
  return true;
}

export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 等待直到 predicate 返回真值，或超时
 * @param {() => T} predicate
 * @param {number} timeout
 * @param {number} interval
 * @returns {Promise<T|null>}
 */
export async function waitFor(predicate, timeout = 2000, interval = 50) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const result = predicate();
    if (result) return result;
    await wait(interval);
  }
  return predicate();
}

/**
 * 监听下拉面板出现
 * @param {() => boolean} visibleCheck - 返回 truthy 表示面板已就绪
 * @param {number} timeout - 毫秒
 * @returns {Promise<any>}
 */
export function observeUntil(visibleCheck, timeout = 2000) {
  return new Promise((resolve) => {
    let resolved = false;
    const finish = (value) => {
      if (resolved) return;
      resolved = true;
      observer.disconnect();
      resolve(value);
    };

    const observer = new MutationObserver(() => {
      const v = visibleCheck();
      if (v) finish(v);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    const immediate = visibleCheck();
    if (immediate) {
      finish(immediate);
      return;
    }

    setTimeout(() => finish(visibleCheck()), timeout);
  });
}
