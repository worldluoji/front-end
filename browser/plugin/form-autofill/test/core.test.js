import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tryFill, executeFill } from '../src/core.js';

beforeEach(() => {
  document.body.innerHTML = '';
  delete window.__AUTOFILL_CONFIG__;
  // 重置 location 以避免不同测试互相影响（happy-dom 默认 about:blank）
  window.history.replaceState({}, '', '/');
});

describe('tryFill', () => {
  it('找不到元素返回 false', async () => {
    const ok = await tryFill({ selector: '#nope', value: 'x' });
    expect(ok).toBe(false);
  });

  it('成功填充后标记已填充，第二次跳过', async () => {
    const input = document.createElement('input');
    input.id = 'userid';
    document.body.appendChild(input);

    expect(await tryFill({ selector: '#userid', value: '123', type: 'input' })).toBe(
      true
    );
    expect(input.value).toBe('123');

    // 第二次调用：标记已填充，跳过
    expect(await tryFill({ selector: '#userid', value: '456', type: 'input' })).toBe(
      false
    );
    expect(input.value).toBe('123');
  });

  it('没有匹配 filler 时返回 false', async () => {
    const div = document.createElement('div');
    div.id = 'unknown';
    document.body.appendChild(div);

    const ok = await tryFill({ selector: '#unknown', value: 'x' });
    expect(ok).toBe(false);
  });
});

describe('executeFill - URL 匹配', () => {
  it('匹配到配置时填充', async () => {
    window.__AUTOFILL_CONFIG__ = {
      AUTO_FILL_ON_LOAD: false,
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/test',
          fields: [{ selector: '#a', value: 'A', type: 'input' }],
        },
      ],
    };
    window.history.replaceState({}, '', '/test');

    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    await executeFill();
    expect(input.value).toBe('A');
  });

  it('URL 不匹配时静默跳过', async () => {
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/test',
          fields: [{ selector: '#a', value: 'A' }],
        },
      ],
    };
    window.history.replaceState({}, '', '/other');

    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    await executeFill();
    expect(input.value).toBe('');
  });

  it('fields 为空数组时 noop', async () => {
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [{ name: '空', urlPattern: '/', fields: [] }],
    };
    await executeFill(); // 不报错
  });
});

describe('executeFill - 标记管理', () => {
  beforeEach(() => {
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      AUTO_FILL_ON_LOAD: false,
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          fields: [{ selector: '#a', value: 'first', type: 'input' }],
        },
      ],
    };
  });

  it('手动模式下第二次执行会清标记并重新填充', async () => {
    window.history.replaceState({}, '', '/');

    await executeFill();
    const input = document.querySelector('#a');
    expect(input.value).toBe('first');

    // 模拟用户改了配置或想要新值
    window.__AUTOFILL_CONFIG__.PAGE_CONFIGS[0].fields[0].value = 'second';
    await executeFill();
    expect(input.value).toBe('second');
  });
});

describe('executeFill - 多字段按顺序', () => {
  it('逐个填充，不抛错', async () => {
    const a = document.createElement('input');
    a.id = 'a';
    const b = document.createElement('input');
    b.id = 'b';
    const c = document.createElement('input');
    c.type = 'checkbox';
    c.id = 'c';
    document.body.append(a, b, c);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '多字段',
          urlPattern: '/',
          fields: [
            { selector: '#a', value: 'A', type: 'input' },
            { selector: '#b', value: 'B', type: 'input' },
            { selector: '#c', value: true, type: 'checkbox' },
          ],
        },
      ],
    };

    await executeFill();
    expect(a.value).toBe('A');
    expect(b.value).toBe('B');
    expect(c.checked).toBe(true);
  });
});

describe('executeFill - 部分元素未就绪', () => {
  it('只填存在的字段，不存在的字段不阻塞后续', async () => {
    const a = document.createElement('input');
    a.id = 'a';
    document.body.appendChild(a);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '混合',
          urlPattern: '/',
          fields: [
            { selector: '#missing', value: 'X' },
            { selector: '#a', value: 'A', type: 'input' },
          ],
        },
      ],
    };

    await executeFill();
    expect(a.value).toBe('A');
  });
});

describe('快捷键 keydown', () => {
  it('正确的组合键触发填充', async () => {
    window.__AUTOFILL_CONFIG__ = {
      SHORTCUT: { key: 'O', ctrl: false, alt: false, shift: true, meta: true },
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          fields: [{ selector: '#a', value: 'A', type: 'input' }],
        },
      ],
    };

    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    // 直接导入 setupShortcut 然后触发
    const { setupShortcut } = await import('../src/core.js');
    setupShortcut();

    const event = new KeyboardEvent('keydown', {
      key: 'O',
      shiftKey: true,
      metaKey: true,
    });
    window.dispatchEvent(event);

    // executeFill 是 async，给它时间
    await new Promise((r) => setTimeout(r, 50));
    expect(input.value).toBe('A');
  });
});
