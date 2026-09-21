/**
 * 填充器注册表
 * 顺序：先 Element Plus（更具体），再原生（兜底）
 */

import { nativeFiller } from './native.js';
import { elementPlusFiller } from './element-plus.js';

export { nativeFiller, elementPlusFiller };

export const fillers = [elementPlusFiller, nativeFiller];
