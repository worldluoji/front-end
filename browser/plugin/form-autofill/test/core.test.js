import { describe, it, expect, beforeEach, vi } from 'vitest';
import { tryFill, executeFill, buildSchedule, runSchedule } from '../src/core.js';

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

  it('AUTO_FILL_ON_LOAD=true 时手动 executeFill 也会清标记重新填充', async () => {
    // 修复：之前条件写反了，开了 auto-fill 的页面手动按快捷键会被 isFilled 拦下
    window.history.replaceState({}, '', '/');
    window.__AUTOFILL_CONFIG__.AUTO_FILL_ON_LOAD = true;

    await executeFill();
    const input = document.querySelector('#a');
    expect(input.value).toBe('first');

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

describe('buildSchedule / runSchedule', () => {
  it('无 parallelGroup 时全部按 single', () => {
    const fields = [
      { selector: '#a' },
      { selector: '#b' },
      { selector: '#c' },
    ];
    const schedule = buildSchedule(fields);
    expect(schedule).toHaveLength(3);
    expect(schedule.every((s) => s.kind === 'single')).toBe(true);
  });

  it('同名连续项合并为一个 group', () => {
    const fields = [
      { selector: '#a' },
      { selector: '#b', parallelGroup: 'g' },
      { selector: '#c', parallelGroup: 'g' },
      { selector: '#d' },
    ];
    const schedule = buildSchedule(fields);
    expect(schedule).toEqual([
      { kind: 'single', item: fields[0] },
      { kind: 'group', group: 'g', items: [fields[1], fields[2]] },
      { kind: 'single', item: fields[3] },
    ]);
  });

  it('同名被隔开时按位置拆为多个 group', () => {
    const fields = [
      { selector: '#a', parallelGroup: 'g' },
      { selector: '#b' },
      { selector: '#c', parallelGroup: 'g' },
    ];
    const schedule = buildSchedule(fields);
    expect(schedule).toEqual([
      { kind: 'group', group: 'g', items: [fields[0]] },
      { kind: 'single', item: fields[1] },
      { kind: 'group', group: 'g', items: [fields[2]] },
    ]);
  });

  it('空字符串 / 空白 / 非字符串 parallelGroup 视为未分组', () => {
    const fields = [
      { selector: '#a', parallelGroup: '' },
      { selector: '#b', parallelGroup: '   ' },
      { selector: '#c', parallelGroup: 42 },
      { selector: '#d', parallelGroup: null },
    ];
    const schedule = buildSchedule(fields);
    expect(schedule.every((s) => s.kind === 'single')).toBe(true);
  });
});

describe('executeFill - parallelGroup', () => {
  it('同组字段都被填上', async () => {
    const a = document.createElement('input'); a.id = 'a'; document.body.appendChild(a);
    const b = document.createElement('input'); b.id = 'b'; document.body.appendChild(b);
    const c = document.createElement('input'); c.id = 'c'; document.body.appendChild(c);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '组',
          urlPattern: '/',
          fields: [
            { selector: '#a', value: 'A', type: 'input' },
            { selector: '#b', value: 'B', type: 'input', parallelGroup: 'g' },
            { selector: '#c', value: 'C', type: 'input', parallelGroup: 'g' },
          ],
        },
      ],
    };
    await executeFill();
    expect(a.value).toBe('A');
    expect(b.value).toBe('B');
    expect(c.value).toBe('C');
  });

  it('组内缺失元素不阻塞其他组员', async () => {
    const a = document.createElement('input'); a.id = 'a'; document.body.appendChild(a);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '组',
          urlPattern: '/',
          fields: [
            { selector: '#missing', value: 'X', type: 'input', parallelGroup: 'g' },
            { selector: '#a', value: 'A', type: 'input', parallelGroup: 'g' },
          ],
        },
      ],
    };
    await executeFill();
    expect(a.value).toBe('A');
  });

  it('未分组的字段仍按数组顺序串行', async () => {
    const order = [];
    const origQuery = document.querySelector.bind(document);
    document.querySelector = (sel) => {
      const el = origQuery(sel);
      if (el) order.push(sel);
      return el;
    };

    const a = document.createElement('input'); a.id = 'a'; document.body.appendChild(a);
    const b = document.createElement('input'); b.id = 'b'; document.body.appendChild(b);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '顺',
          urlPattern: '/',
          fields: [
            { selector: '#a', value: 'A', type: 'input' },
            { selector: '#b', value: 'B', type: 'input' },
          ],
        },
      ],
    };
    await executeFill();

    // #a 必须在 #b 之前被访问
    expect(order.indexOf('#a')).toBeLessThan(order.indexOf('#b'));

    document.querySelector = origQuery;
  });

  it('未分组的字段后于分组（同组完成后才进下一步）', async () => {
    const order = [];
    const origQuery = document.querySelector.bind(document);
    document.querySelector = (sel) => {
      const el = origQuery(sel);
      if (el) order.push(sel);
      return el;
    };

    const a = document.createElement('input'); a.id = 'a'; document.body.appendChild(a);
    const b = document.createElement('input'); b.id = 'b'; document.body.appendChild(b);
    const c = document.createElement('input'); c.id = 'c'; document.body.appendChild(c);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '混合',
          urlPattern: '/',
          fields: [
            { selector: '#a', value: 'A', type: 'input', parallelGroup: 'g' },
            { selector: '#b', value: 'B', type: 'input', parallelGroup: 'g' },
            { selector: '#c', value: 'C', type: 'input' },
          ],
        },
      ],
    };
    await executeFill();

    // #c 必须在 #a 和 #b 之后
    const idxC = order.indexOf('#c');
    expect(idxC).toBeGreaterThan(order.indexOf('#a'));
    expect(idxC).toBeGreaterThan(order.indexOf('#b'));

    document.querySelector = origQuery;
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

describe('executeFill - profile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('旧 fields 写法自动归一为 profiles.default', async () => {
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          fields: [{ selector: '#a', value: 'A', type: 'input' }],
        },
      ],
    };
    await executeFill();
    expect(input.value).toBe('A');
  });

  it('有 profiles 时使用 default profile 的 fields', async () => {
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [{ selector: '#a', value: 'DEFAULT_VAL', type: 'input' }] },
            demo:    { fields: [{ selector: '#a', value: 'DEMO_VAL',    type: 'input' }] },
          },
        },
      ],
    };
    await executeFill();
    expect(input.value).toBe('DEFAULT_VAL');
  });

  it('持久化的 active profile 优先于 default', async () => {
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [{ selector: '#a', value: 'DEFAULT_VAL', type: 'input' }] },
            demo:    { fields: [{ selector: '#a', value: 'DEMO_VAL',    type: 'input' }] },
          },
        },
      ],
    };
    localStorage.setItem(
      'form_autofill_active_profiles',
      JSON.stringify({ 测试: 'demo' })
    );
    await executeFill();
    expect(input.value).toBe('DEMO_VAL');
  });

  it('executeFill(profileOverride) 用指定 profile，不动持久化', async () => {
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [{ selector: '#a', value: 'DEFAULT_VAL', type: 'input' }] },
            demo:    { fields: [{ selector: '#a', value: 'DEMO_VAL',    type: 'input' }] },
          },
        },
      ],
    };
    localStorage.setItem(
      'form_autofill_active_profiles',
      JSON.stringify({ 测试: 'default' })
    );
    await executeFill('demo');
    expect(input.value).toBe('DEMO_VAL');
    // 持久化的 active 不应被覆盖
    expect(JSON.parse(localStorage.getItem('form_autofill_active_profiles'))).toEqual({
      测试: 'default',
    });
  });
});

describe('cycleProfile', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('循环切到下一个 profile 并持久化', async () => {
    const { cycleProfile } = await import('../src/core.js');
    window.history.replaceState({}, '', '/');
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [] },
            demo: { fields: [] },
            prod: { fields: [] },
          },
        },
      ],
    };

    expect(cycleProfile()).toEqual({ configName: '测试', profile: 'demo' });
    expect(cycleProfile()).toEqual({ configName: '测试', profile: 'prod' });
    expect(cycleProfile()).toEqual({ configName: '测试', profile: 'default' });
    expect(
      JSON.parse(localStorage.getItem('form_autofill_active_profiles'))
    ).toEqual({ 测试: 'default' });
  });

  it('只有 1 个 profile 时不切换，返回 null', async () => {
    const { cycleProfile } = await import('../src/core.js');
    window.history.replaceState({}, '', '/');
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '单',
          urlPattern: '/',
          profiles: { default: { fields: [] } },
        },
      ],
    };
    expect(cycleProfile()).toBeNull();
  });

  it('URL 不匹配时返回 null', async () => {
    const { cycleProfile } = await import('../src/core.js');
    window.history.replaceState({}, '', '/other');
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/test',
          profiles: { default: { fields: [] }, demo: { fields: [] } },
        },
      ],
    };
    expect(cycleProfile()).toBeNull();
  });

  it('切换后会清掉新 profile 各字段的填充标记', async () => {
    const { cycleProfile, executeFill } = await import('../src/core.js');
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'a';
    document.body.appendChild(input);

    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [{ selector: '#a', value: 'DEFAULT_VAL', type: 'input' }] },
            demo:    { fields: [{ selector: '#a', value: 'DEMO_VAL',    type: 'input' }] },
          },
        },
      ],
    };
    // 手动模式：用 default profile 填
    await executeFill();
    expect(input.value).toBe('DEFAULT_VAL');
    // 切到 demo 后再填，应该用 demo 的值
    cycleProfile();
    await executeFill();
    expect(input.value).toBe('DEMO_VAL');
  });

  it('重复调用 setupProfileSwitchShortcut 不会累加 listener（避免按一次切换两次）', async () => {
    const { setupProfileSwitchShortcut } = await import('../src/core.js');
    window.history.replaceState({}, '', '/');
    window.__AUTOFILL_CONFIG__ = {
      PAGE_CONFIGS: [
        {
          name: '测试',
          urlPattern: '/',
          profiles: {
            default: { fields: [] },
            demo: { fields: [] },
          },
        },
      ],
    };
    // 模拟配置更新后再次注册（修复前 bug：重复注册会按一次走两次 cycleProfile → 抵消）
    setupProfileSwitchShortcut();
    setupProfileSwitchShortcut();
    setupProfileSwitchShortcut();

    const event = new KeyboardEvent('keydown', {
      key: 'P',
      shiftKey: true,
      metaKey: true,
      bubbles: true,
    });
    window.dispatchEvent(event);
    // 只该切一次：default → demo；若累加会切到 prod / 再到 demo，expect 'demo'
    expect(
      JSON.parse(localStorage.getItem('form_autofill_active_profiles') || '{}')
    ).toEqual({ 测试: 'demo' });
  });
});

describe('无效 CSS selector 的容错', () => {
  // 用户从 DevTools 复制 outerHTML 当 selector 填进来时，document.querySelector
  // 会抛 SyntaxError，导致整批 executeFill 中断。这里验证核心链路用
  // querySelectorSafe 兜底 —— 单条无效选择器只让该字段失败，不阻塞其他字段。

  beforeEach(() => {
    window.history.replaceState({}, '', '/');
    const input = document.createElement('input');
    input.id = 'valid';
    document.body.appendChild(input);
  });

  it('tryFill：selector 是 HTML 字符串时返回 false，不抛错', async () => {
    const htmlLikeSelector =
      '<input value="" type="text" class="el-select__input" id="x">';
    const ok = await tryFill({ selector: htmlLikeSelector, value: 'v', type: 'input' });
    expect(ok).toBe(false);
  });

  it('executeFill：含一个无效 selector 的字段不阻塞其他字段', async () => {
    window.__AUTOFILL_CONFIG__ = {
      AUTO_FILL_ON_LOAD: false,
      PAGE_CONFIGS: [
        {
          name: 'T',
          urlPattern: '/',
          fields: [
            { selector: '#valid', value: 'ok', type: 'input' },
            // 无效：从 DevTools 复制的 outerHTML
            { selector: '<input value="" type="text" id="bad">', value: 'x', type: 'input' },
          ],
        },
      ],
    };

    // 关键断言：executeFill 不抛错（之前会抛 SyntaxError）
    await expect(executeFill()).resolves.toBeUndefined();

    // 有效字段被填上了
    expect(document.querySelector('#valid').value).toBe('ok');
  });

  it('executeFill：clear-filled 循环里遇到无效 selector 不抛错', async () => {
    // 第一次 fill（清标记）—— 在修复前 line 880 forEach 内的 querySelector 会抛错
    window.__AUTOFILL_CONFIG__ = {
      AUTO_FILL_ON_LOAD: false,
      PAGE_CONFIGS: [
        {
          name: 'T',
          urlPattern: '/',
          fields: [
            { selector: '<input id="bad">', value: 'x', type: 'input' },
            { selector: '#valid', value: 'ok', type: 'input' },
          ],
        },
      ],
    };

    await expect(executeFill()).resolves.toBeUndefined();
    expect(document.querySelector('#valid').value).toBe('ok');
  });

  it('空 selector 不抛错', async () => {
    const ok = await tryFill({ selector: '', value: 'v', type: 'input' });
    expect(ok).toBe(false);
  });

  it('非字符串 selector 不抛错', async () => {
    const ok = await tryFill({ selector: null, value: 'v', type: 'input' });
    expect(ok).toBe(false);
  });
});
