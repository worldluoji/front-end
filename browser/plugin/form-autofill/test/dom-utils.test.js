import { describe, it, expect, vi } from 'vitest';
import {
  setNativeValue,
  triggerInputEvents,
  fillInput,
  wait,
  waitFor,
  observeUntil,
} from '../src/dom-utils.js';

describe('setNativeValue', () => {
  it('通过原生 setter 设置值，并被监听器捕获', () => {
    const input = document.createElement('input');
    const handler = vi.fn();
    input.addEventListener('input', handler);

    setNativeValue(input, 'hello');
    expect(input.value).toBe('hello');

    triggerInputEvents(input);
    expect(handler).toHaveBeenCalledTimes(1);
  });

  it('textarea 也能用原生 setter', () => {
    const ta = document.createElement('textarea');
    const handler = vi.fn();
    ta.addEventListener('input', handler);

    setNativeValue(ta, 'multi\nline');
    expect(ta.value).toBe('multi\nline');

    triggerInputEvents(ta);
    expect(handler).toHaveBeenCalled();
  });
});

describe('fillInput', () => {
  it('对非 input/textarea 返回 false', () => {
    const div = document.createElement('div');
    expect(fillInput(div, 'x')).toBe(false);
  });

  it('对 input 返回 true 并触发 input 事件', () => {
    const input = document.createElement('input');
    const handler = vi.fn();
    input.addEventListener('input', handler);

    expect(fillInput(input, 'abc')).toBe(true);
    expect(input.value).toBe('abc');
    expect(handler).toHaveBeenCalled();
  });
});

describe('wait / waitFor', () => {
  it('wait 返回 Promise', async () => {
    const t0 = Date.now();
    await wait(50);
    expect(Date.now() - t0).toBeGreaterThanOrEqual(45);
  });

  it('waitFor 在 predicate 第一次真时立刻 resolve', async () => {
    let n = 0;
    const r = await waitFor(() => ++n === 3, 1000, 10);
    expect(r).toBe(true);
    expect(n).toBe(3);
  });

  it('waitFor 超时后返回最后一次 predicate 结果', async () => {
    const r = await waitFor(() => false, 100, 20);
    expect(r).toBe(false);
  });
});

describe('observeUntil', () => {
  it('predicate 立即为真时直接 resolve', async () => {
    const r = await observeUntil(() => 'instant', 1000);
    expect(r).toBe('instant');
  });

  it('插入新元素后 resolve', async () => {
    // happy-dom 里 MutationObserver 异步触发
    const check = () => document.querySelector('#async-target');
    const promise = observeUntil(check, 2000);

    setTimeout(() => {
      const el = document.createElement('div');
      el.id = 'async-target';
      document.body.appendChild(el);
    }, 50);

    const result = await promise;
    expect(result).not.toBeNull();
  });

  it('超时返回 predicate 当前结果', async () => {
    const r = await observeUntil(() => null, 200);
    expect(r).toBeNull();
  });
});
