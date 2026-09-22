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

describe('openConfigUI - 重新打开', () => {
  it('同一时间只允许一个实例', () => {
    openConfigUI();
    openConfigUI();
    expect(document.querySelectorAll('[data-autofill-config-ui]').length).toBe(1);
  });
});
