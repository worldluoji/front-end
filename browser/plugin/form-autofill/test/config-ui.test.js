import { describe, it, expect, beforeEach } from 'vitest';
import { openConfigUI, mountFloatingButton } from '../src/config-ui.js';

beforeEach(() => {
  document.body.innerHTML = '';
  localStorage.clear();
  window.__AUTOFILL_CONFIG__ = undefined;
});

function getUiRoot() {
  const host = document.querySelector('[data-autofill-config-ui]');
  return host && host.shadowRoot;
}

describe('mountFloatingButton', () => {
  it('在 body 添加一个按钮', () => {
    mountFloatingButton();
    const btn = document.querySelector('[data-autofill-fab]');
    expect(btn).not.toBeNull();
    // 小尺寸 + 拖动：内容只有图标，语义走 aria-label/title
    expect(btn.getAttribute('aria-label')).toMatch(/自动填充/);
    expect(btn.title).toMatch(/自动填充/);
    expect(btn.title).toMatch(/可拖动/);
  });

  it('默认位置在视口右下角附近', () => {
    mountFloatingButton();
    const btn = document.querySelector('[data-autofill-fab]');
    // happy-dom 默认 viewport 1024x768，按钮 40x40，距右下 24px
    expect(parseInt(btn.style.left, 10)).toBeGreaterThan(800);
    expect(parseInt(btn.style.top, 10)).toBeGreaterThan(600);
    expect(btn.style.borderRadius).toBe('50%');
  });

  it('多次调用不会重复添加', () => {
    mountFloatingButton();
    mountFloatingButton();
    expect(document.querySelectorAll('[data-autofill-fab]').length).toBe(1);
  });

  it('拖动后位置持久化到 localStorage', () => {
    mountFloatingButton();
    const btn = document.querySelector('[data-autofill-fab]');

    // 模拟拖动
    const startX = 500;
    const startY = 400;
    btn.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: startX,
        clientY: startY,
        button: 0,
        pointerId: 1,
      })
    );
    btn.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: startX + 100,
        clientY: startY + 50,
        pointerId: 1,
      })
    );
    btn.dispatchEvent(
      new PointerEvent('pointerup', {
        bubbles: true,
        clientX: startX + 100,
        clientY: startY + 50,
        pointerId: 1,
      })
    );

    const raw = localStorage.getItem('form_autofill_fab_position');
    expect(raw).toBeTruthy();
    const saved = JSON.parse(raw);
    expect(saved.left).toBeGreaterThan(0);
    expect(saved.top).toBeGreaterThan(0);
  });

  it('读已保存的位置而不是默认位置', () => {
    localStorage.setItem(
      'form_autofill_fab_position',
      JSON.stringify({ left: 100, top: 80 })
    );
    mountFloatingButton();
    const btn = document.querySelector('[data-autofill-fab]');
    expect(btn.style.left).toBe('100px');
    expect(btn.style.top).toBe('80px');
  });
});

describe('openConfigUI', () => {
  it('创建 shadow DOM 容器', () => {
    openConfigUI();
    const host = document.querySelector('[data-autofill-config-ui]');
    expect(host).not.toBeNull();
    const root = getUiRoot();
    expect(root).toBeTruthy();
  });

  it('包含 tab 按钮', () => {
    openConfigUI();
    const root = getUiRoot();
    const tabs = root.querySelectorAll('.tabs button');
    expect(tabs.length).toBe(2);
    expect(tabs[0].dataset.tab).toBe('global');
    expect(tabs[1].dataset.tab).toBe('pages');
  });

  it('默认显示全局设置 tab', () => {
    openConfigUI();
    const root = getUiRoot();
    const body = root.querySelector('.body');
    expect(body.textContent).toMatch(/快捷键/);
  });

  it('点击 pages tab 切换到页面配置', () => {
    openConfigUI();
    const root = getUiRoot();
    const tabs = root.querySelectorAll('.tabs button');
    tabs[1].click();
    const body = root.querySelector('.body');
    expect(body.textContent).toMatch(/页面名称|列表/);
  });

  it('re-render 后 tab 按钮仍能切换（修复逐按钮绑定的 bug）', () => {
    openConfigUI();
    const root = getUiRoot();
    // 先切到 pages tab，才能触发 add-page 按钮
    root.querySelectorAll('.tabs button')[1].click();
    // 触发一次 re-render（add-page 会调用 render()，重置 innerHTML）
    root.querySelector('[data-act="add-page"]').click();
    // 旧实现：tab 按钮 innerHTML 被替换，新按钮无 click 监听 → 点击无效
    const tabs = root.querySelectorAll('.tabs button');
    tabs[0].click(); // 切回 global
    const body = root.querySelector('.body');
    expect(body.textContent).toMatch(/页面加载自动填充/);
  });

  it('close 按钮移除 host', () => {
    openConfigUI();
    const root = getUiRoot();
    const closeBtn = root.querySelector('[data-act="close"]');
    closeBtn.click();
    expect(document.querySelector('[data-autofill-config-ui]')).toBeNull();
  });

  it('默认配置页面有示例页面', () => {
    openConfigUI();
    const root = getUiRoot();
    // 切到 pages tab
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    expect(items.length).toBeGreaterThan(0);
  });
});

describe('openConfigUI - 字段编辑', () => {
  it('切换 field type 时重置 value', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    expect(items.length).toBeGreaterThan(0);
    items[0].click();

    // 找第一个 field 的 type select
    const typeSelect = root.querySelector('select[data-field="type"]');
    expect(typeSelect).toBeTruthy();
    typeSelect.value = 'checkbox';
    typeSelect.dispatchEvent(new Event('input', { bubbles: true }));

    // checkbox 合并后 value 是文本输入框（接受 true/false 或 JSON 数组）
    const valInput = root.querySelector('input[data-field="value"]');
    expect(valInput).toBeTruthy();
    expect(valInput.type).toBe('text');
  });
});

describe('openConfigUI - selector 编辑器', () => {
  it('selector 输入框带 clickable 类和提示', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    expect(sel).toBeTruthy();
    expect(sel.classList.contains('selector-clickable')).toBe(true);
    expect(sel.title).toMatch(/点击展开/);
  });

  it('点击 selector 打开编辑器，写回后触发 input 事件更新 state', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    const original = sel.value;
    sel.click();

    const selModal = root.querySelector('.selector-modal');
    expect(selModal).toBeTruthy();
    const ta = root.querySelector('[data-role="selector-textarea"]');
    expect(ta).toBeTruthy();
    expect(ta.value).toBe(original);

    // 改值 → 保存
    ta.value = '#new-selector';
    root.querySelector('[data-role="save"]').click();

    // 编辑器关掉 + 表格行新值
    expect(root.querySelector('.selector-modal')).toBeNull();
    const selAfter = root.querySelector('input[data-field="selector"]');
    expect(selAfter.value).toBe('#new-selector');
  });

  it('取消按钮关闭编辑器但不修改原值', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    const original = sel.value;
    sel.click();
    const ta = root.querySelector('[data-role="selector-textarea"]');
    ta.value = '#different';
    root.querySelector('[data-role="cancel"]').click();

    expect(root.querySelector('.selector-modal')).toBeNull();
    expect(root.querySelector('input[data-field="selector"]').value).toBe(original);
  });

  it('粘贴 HTML 片段时显示警告 toast + 输入框标红', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    // 模拟用户粘贴 outerHTML 进来
    sel.value = '<div class="el-select" style="width:240px;"><!--[-->...</div>';
    sel.dispatchEvent(new Event('input', { bubbles: true }));

    expect(sel.classList.contains('field-invalid')).toBe(true);
    expect(root.querySelector('.toast.warn')).toBeTruthy();
    expect(root.querySelector('.toast.warn').textContent).toMatch(/HTML/);
  });

  it('合法 CSS selector 输入不触发警告 / 不标红', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    sel.value = 'div.el-select__selection > div.el-select__placeholder';
    sel.dispatchEvent(new Event('input', { bubbles: true }));

    expect(sel.classList.contains('field-invalid')).toBe(false);
    expect(root.querySelector('.toast.warn')).toBeFalsy();
  });

  it('点击遮罩关闭编辑器', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();
    root.querySelector('input[data-field="selector"]').click();
    expect(root.querySelector('.selector-modal')).toBeTruthy();

    const overlay = root.querySelector('.selector-overlay');
    overlay.click(); // 点击遮罩本身
    expect(root.querySelector('.selector-modal')).toBeNull();
  });

  it('Tab 焦点陷阱：从最后一个按钮按 Tab 应 preventDefault', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();
    root.querySelector('input[data-field="selector"]').click();

    const saveBtn = root.querySelector('[data-role="save"]');
    saveBtn.focus();

    // 在最后一个按钮上按 Tab（不按 Shift）应被 preventDefault 阻止默认焦点切换
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    saveBtn.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('Shift+Tab 焦点陷阱：从第一个按 Shift+Tab 应 preventDefault', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();
    root.querySelector('input[data-field="selector"]').click();

    const ta = root.querySelector('[data-role="selector-textarea"]');
    ta.focus();

    // 在第一个 focusable（textarea）按 Shift+Tab 应被拦截
    const ev = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    ta.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(true);
  });

  it('焦点在中间元素（cancel 按钮）按 Tab 不应被陷阱拦截', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();
    root.querySelector('input[data-field="selector"]').click();

    const cancelBtn = root.querySelector('[data-role="cancel"]');
    cancelBtn.focus();

    // cancel 不是首尾焦点，Tab 不应被陷阱拦截 —— 浏览器正常切换
    const ev = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    cancelBtn.dispatchEvent(ev);
    expect(ev.defaultPrevented).toBe(false);
  });
});

describe('openConfigUI - 保存', () => {
  it('保存按钮写入 localStorage', () => {
    openConfigUI();
    const root = getUiRoot();
    const saveBtn = root.querySelector('[data-act="save"]');
    saveBtn.click();
    const raw = localStorage.getItem('form_autofill_config_v3');
    expect(raw).toBeTruthy();
    const parsed = JSON.parse(raw);
    expect(parsed.PAGE_CONFIGS).toBeDefined();
  });

  it('保存后触发 autofill:config-updated 事件', () => {
    openConfigUI();
    const root = getUiRoot();
    let fired = false;
    window.addEventListener('autofill:config-updated', () => {
      fired = true;
    });
    root.querySelector('[data-act="save"]').click();
    expect(fired).toBe(true);
  });
});

describe('openConfigUI - 测试填充', () => {
  it('测试按钮设置 window.__AUTOFILL_CONFIG__ 并触发 execute-fill 事件', () => {
    openConfigUI();
    const root = getUiRoot();
    let fired = false;
    window.addEventListener('autofill:execute-fill', () => {
      fired = true;
    });
    root.querySelector('[data-act="test"]').click();
    expect(window.__AUTOFILL_CONFIG__).toBeDefined();
    expect(fired).toBe(true);
  });
});

describe('openConfigUI - profile 切换按钮', () => {
  it('切到下一激活 profile 写入 localStorage 并移动徽章', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click(); // pages tab
    const items = root.querySelectorAll('.list-item');
    items[0].click(); // 选第一个页面（默认配置：用户信息页，单 profile）

    // 给它加一个 demo profile 才能显示切换按钮
    const addBtn = root.querySelector('[data-act="add-profile"]');
    addBtn.click();
    const cycleBtn = root.querySelector('[data-act="cycle-active-profile"]');
    expect(cycleBtn).toBeTruthy();

    cycleBtn.click();
    // 当前激活应该从 default 切到新加的 profile2 / profile 等
    const map = JSON.parse(
      localStorage.getItem('form_autofill_active_profiles') || '{}'
    );
    expect(Object.values(map)).toHaveLength(1);
    expect(Object.values(map)[0]).not.toBe('default');
  });

  it('只有 1 个 profile 时不显示切换按钮', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    const items = root.querySelectorAll('.list-item');
    items[0].click();
    expect(
      root.querySelector('[data-act="cycle-active-profile"]')
    ).toBeNull();
  });
});

describe('openConfigUI - 全局设置显示 profile 切换快捷键', () => {
  it('显示当前 SHORTCUT_PROFILE_SWITCH 组合', () => {
    openConfigUI();
    const root = getUiRoot();
    // 默认在 global tab
    const body = root.querySelector('.body');
    expect(body.textContent).toMatch(/切换 profile 快捷键/);
    // DEFAULT_CONFIG.SHORTCUT_PROFILE_SWITCH 是 shift+meta+P，platform 非 Mac 时显示 "Meta+Shift+P"
    expect(body.textContent).toMatch(/Shift\+P|Ctrl|Alt|Meta|Cmd/);
  });
});

describe('openConfigUI - 重新打开', () => {
  it('同一时间只允许一个实例', () => {
    openConfigUI();
    openConfigUI();
    expect(document.querySelectorAll('[data-autofill-config-ui]').length).toBe(1);
  });
});

describe('openConfigUI - 并行组列', () => {
  it('表头包含 "并行组" 列', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const ths = root.querySelectorAll('.fields-table thead th');
    const labels = Array.from(ths).map((t) => t.textContent.trim());
    expect(labels).toContain('并行组');
  });

  it('每行有 parallelGroup 输入框，默认空值', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const inputs = root.querySelectorAll('input[data-field="parallelGroup"]');
    expect(inputs.length).toBeGreaterThan(0);
    inputs.forEach((inp) => {
      expect(inp.value).toBe('');
      expect(inp.placeholder).toBe('(顺序)');
    });
  });

  it('编辑 parallelGroup 输入后，保存到 localStorage 时被保留', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    // 给第一个 page 新增一个字段，编辑它的 parallelGroup
    const addBtn = root.querySelector('[data-act="add-field"]');
    addBtn.click();

    const pgInput = root.querySelectorAll('input[data-field="parallelGroup"]');
    const last = pgInput[pgInput.length - 1];
    expect(last).toBeTruthy();
    last.value = 'contacts';
    last.dispatchEvent(new Event('input', { bubbles: true }));

    // 保存
    root.querySelector('[data-act="save"]').click();
    const saved = JSON.parse(localStorage.getItem('form_autofill_config_v3'));
    const pageFields =
      saved.PAGE_CONFIGS[0].profiles[saved.PAGE_CONFIGS[0].profiles.default ? 'default' : Object.keys(saved.PAGE_CONFIGS[0].profiles)[0]].fields;
    const lastSaved = pageFields[pageFields.length - 1];
    expect(lastSaved.parallelGroup).toBe('contacts');
  });

  it('清空 parallelGroup 输入后，导出 JSON 中不出现空字符串字段', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    // 新增字段，先填一个值再清空
    root.querySelector('[data-act="add-field"]').click();
    const inputs = root.querySelectorAll('input[data-field="parallelGroup"]');
    const last = inputs[inputs.length - 1];
    last.value = 'g';
    last.dispatchEvent(new Event('input', { bubbles: true }));
    last.value = '';
    last.dispatchEvent(new Event('input', { bubbles: true }));

    // 导出 JSON
    root.querySelector('[data-act="export"]').click();
    // 直接读 state 不行；从保存路径读
    root.querySelector('[data-act="save"]').click();
    const saved = JSON.parse(localStorage.getItem('form_autofill_config_v3'));
    const profile = saved.PAGE_CONFIGS[0].profiles.default || saved.PAGE_CONFIGS[0].profiles[Object.keys(saved.PAGE_CONFIGS[0].profiles)[0]];
    const lastSaved = profile.fields[profile.fields.length - 1];
    expect('parallelGroup' in lastSaved).toBe(false);
  });

  it('已有 parallelGroup 的 field 在渲染时正确显示', () => {
    // 准备一个带 parallelGroup 的配置
    localStorage.setItem(
      'form_autofill_config_v3',
      JSON.stringify({
        AUTO_FILL_ON_LOAD: false,
        SHORTCUT: { key: 'O', ctrl: false, alt: false, shift: true, meta: true },
        PAGE_CONFIGS: [
          {
            name: 'PG',
            urlPattern: '/',
            profiles: {
              default: {
                fields: [
                  { selector: '#a', value: 'A', type: 'input', parallelGroup: 'g1' },
                  { selector: '#b', value: 'B', type: 'input' },
                ],
              },
            },
          },
        ],
      })
    );
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const inputs = root.querySelectorAll('input[data-field="parallelGroup"]');
    expect(inputs[0].value).toBe('g1');
    expect(inputs[1].value).toBe('');
  });
});

describe('openConfigUI - 行内 hint 搬到 title', () => {
  // 上一轮加并行组后，5 列表格挤压了 selector 列；.hint 行内 div 多行换行又挤
  // 掉 selector 高度。修复方案：去掉行内 .hint div，把信息搬到 input 的 title 属性
  // （hover 显示浏览器原生 tooltip），行高恢复正常。

  it('selector 单元格内不再渲染 .hint div', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    // 选 td.selector-col，跳过 colgroup 里的 <col class="selector-col">
    const selectorCell = root.querySelector('td.selector-col');
    expect(selectorCell).not.toBeNull();
    expect(selectorCell.querySelector('.hint')).toBeNull();
    // 仅剩 input 本身
    expect(selectorCell.querySelectorAll('input[data-field="selector"]').length).toBe(1);
  });

  it('selector input 的 title 属性携带 type 提示（如 type=select）', () => {
    // 准备：select 类型字段
    localStorage.setItem(
      'form_autofill_config_v3',
      JSON.stringify({
        AUTO_FILL_ON_LOAD: false,
        SHORTCUT: { key: 'O', ctrl: false, alt: false, shift: true, meta: true },
        PAGE_CONFIGS: [
          {
            name: 'S',
            urlPattern: '/',
            profiles: {
              default: {
                fields: [{ selector: '#s', value: 'tech', type: 'select' }],
              },
            },
          },
        ],
      })
    );
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    expect(sel.title).toMatch(/data-value/);
  });

  it('type=input（无特殊 hint）时 selector title 回退到 "点击展开编辑"', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const sel = root.querySelector('input[data-field="selector"]');
    // input 类型 valueHint 返回 '' → 回退默认文案
    expect(sel.title).toBe('点击展开编辑');
  });

  it('group 单元格内不再渲染 .hint div（"同名 = 并行" 已搬走）', () => {
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const groupCell = root.querySelector('td.group-col');
    expect(groupCell).not.toBeNull();
    expect(groupCell.querySelector('.hint')).toBeNull();
  });

  it('cascader value input 的 title 携带 "JSON 数组" 提示', () => {
    localStorage.setItem(
      'form_autofill_config_v3',
      JSON.stringify({
        AUTO_FILL_ON_LOAD: false,
        SHORTCUT: { key: 'O', ctrl: false, alt: false, shift: true, meta: true },
        PAGE_CONFIGS: [
          {
            name: 'C',
            urlPattern: '/',
            profiles: {
              default: {
                fields: [{ selector: '#c', value: [], type: 'cascader' }],
              },
            },
          },
        ],
      })
    );
    openConfigUI();
    const root = getUiRoot();
    root.querySelectorAll('.tabs button')[1].click();
    root.querySelectorAll('.list-item')[0].click();

    const valueInput = root.querySelector('input[data-field="value"]');
    expect(valueInput.title).toMatch(/JSON 数组/);
    // cascader value cell 内也不再有 .hint
    const valueCell = root.querySelector('td.value-col');
    expect(valueCell).not.toBeNull();
    expect(valueCell.querySelector('.hint')).toBeNull();
  });
});
