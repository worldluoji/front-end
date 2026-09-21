import { describe, it, expect } from 'vitest';
import { isUrlMatch, findMatchingConfig } from '../src/matchers.js';

describe('isUrlMatch', () => {
  it('字符串 pattern 用 includes 匹配', () => {
    expect(isUrlMatch('/order/apply', 'https://x.com/order/apply?id=1')).toBe(true);
    expect(isUrlMatch('order', 'https://x.com/user/profile')).toBe(false);
  });

  it('RegExp pattern 用 test 匹配', () => {
    expect(isUrlMatch(/\/user\/(profile|edit)/, 'https://x.com/user/edit')).toBe(
      true
    );
    expect(isUrlMatch(/\/admin\//, 'https://x.com/order/apply')).toBe(false);
  });

  it('null / undefined 返回 false', () => {
    expect(isUrlMatch(null, 'https://x.com')).toBe(false);
    expect(isUrlMatch(undefined, 'https://x.com')).toBe(false);
  });

  it('非法类型（数字、布尔）返回 false', () => {
    expect(isUrlMatch(123, 'https://x.com')).toBe(false);
    expect(isUrlMatch(true, 'https://x.com')).toBe(false);
  });
});

describe('findMatchingConfig', () => {
  const cfgs = [
    { name: 'A', urlPattern: '/a', fields: [] },
    { name: 'B', urlPattern: /\/b\/\d+/, fields: [] },
    { name: 'C', urlPattern: '/c' },
  ];

  it('返回第一个匹配的', () => {
    expect(findMatchingConfig(cfgs, 'https://x.com/a/1').name).toBe('A');
    expect(findMatchingConfig(cfgs, 'https://x.com/b/123').name).toBe('B');
  });

  it('没有匹配返回 null', () => {
    expect(findMatchingConfig(cfgs, 'https://x.com/none')).toBeNull();
  });

  it('非数组返回 null', () => {
    expect(findMatchingConfig(null, 'https://x.com')).toBeNull();
    expect(findMatchingConfig(undefined, 'https://x.com')).toBeNull();
  });

  it('配置项缺 urlPattern 不会 crash', () => {
    expect(findMatchingConfig([{}], 'https://x.com')).toBeNull();
  });
});
