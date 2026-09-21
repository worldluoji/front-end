import { describe, it, expect, beforeEach, vi } from 'vitest';
import { nativeFiller } from '../src/fillers/native.js';

describe('nativeFiller.match', () => {
  it('input/textarea/select 标签匹配', () => {
    expect(nativeFiller.match(document.createElement('input'))).toBe(true);
    expect(nativeFiller.match(document.createElement('textarea'))).toBe(true);
    expect(nativeFiller.match(document.createElement('select'))).toBe(true);
  });

  it('div 不匹配', () => {
    expect(nativeFiller.match(document.createElement('div'))).toBe(false);
  });
});

describe('nativeFiller.fill - input/textarea', () => {
  it('input[type=text] 走 fillInput', () => {
    const input = document.createElement('input');
    input.type = 'text';
    const handler = vi.fn();
    input.addEventListener('input', handler);

    expect(nativeFiller.fill(input, 'hello', { type: 'input' })).toBe(true);
    expect(input.value).toBe('hello');
    expect(handler).toHaveBeenCalled();
  });

  it('textarea 同样工作', () => {
    const ta = document.createElement('textarea');
    const handler = vi.fn();
    ta.addEventListener('input', handler);

    expect(nativeFiller.fill(ta, 'body', { type: 'textarea' })).toBe(true);
    expect(ta.value).toBe('body');
    expect(handler).toHaveBeenCalled();
  });

  it('未指定 type 且元素是 input 也按 input 处理', () => {
    const input = document.createElement('input');
    input.type = 'text';
    expect(nativeFiller.fill(input, 'x', {})).toBe(true);
    expect(input.value).toBe('x');
  });
});

describe('nativeFiller.fill - checkbox', () => {
  it('勾选/取消', () => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    const handler = vi.fn();
    cb.addEventListener('change', handler);

    expect(nativeFiller.fill(cb, true, { type: 'checkbox' })).toBe(true);
    expect(cb.checked).toBe(true);
    expect(handler).toHaveBeenCalled();
  });

  it('value=false 取消勾选', () => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = true;

    nativeFiller.fill(cb, false, { type: 'checkbox' });
    expect(cb.checked).toBe(false);
  });

  it('type=switch 走同一逻辑', () => {
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    nativeFiller.fill(cb, true, { type: 'switch' });
    expect(cb.checked).toBe(true);
  });
});

describe('nativeFiller.fill - radio', () => {
  it('value=true 选中', () => {
    const r = document.createElement('input');
    r.type = 'radio';
    r.value = 'A';

    expect(nativeFiller.fill(r, true, { type: 'radio' })).toBe(true);
    expect(r.checked).toBe(true);
  });

  it('按 value 匹配', () => {
    const r = document.createElement('input');
    r.type = 'radio';
    r.value = 'B';

    expect(nativeFiller.fill(r, 'B', { type: 'radio' })).toBe(true);
    expect(r.checked).toBe(true);
  });

  it('value 不匹配时不选中', () => {
    const r = document.createElement('input');
    r.type = 'radio';
    r.value = 'B';

    expect(nativeFiller.fill(r, 'X', { type: 'radio' })).toBe(false);
    expect(r.checked).toBe(false);
  });
});

describe('nativeFiller.fill - range', () => {
  it('设置滑块值', () => {
    const r = document.createElement('input');
    r.type = 'range';
    const handler = vi.fn();
    r.addEventListener('input', handler);

    expect(nativeFiller.fill(r, 50, { type: 'range' })).toBe(true);
    expect(r.value).toBe('50');
    expect(handler).toHaveBeenCalled();
  });
});

describe('nativeFiller.fill - select', () => {
  it('设置值并触发 change', () => {
    const select = document.createElement('select');
    const opt1 = document.createElement('option');
    opt1.value = 'a';
    const opt2 = document.createElement('option');
    opt2.value = 'b';
    select.appendChild(opt1);
    select.appendChild(opt2);

    const handler = vi.fn();
    select.addEventListener('change', handler);

    expect(nativeFiller.fill(select, 'b', { type: 'select' })).toBe(true);
    expect(select.value).toBe('b');
    expect(handler).toHaveBeenCalled();
  });
});
