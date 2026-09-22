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
