import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  elementPlusFiller,
  closeOpenSelectDropdowns,
  closeOpenCascaderPanels,
} from '../src/fillers/element-plus.js';

/**
 * 在 happy-dom 里手动构造一个最小可用的 .el-select。
 * 当 wrapper 被 click 时，同步把 dropdown 挂到 body，模拟 Element Plus 的弹层。
 * @param {'legacy' | 'v26'} version
 */
function buildMockElSelect({ value, label, withValue = true, version = 'legacy' } = {}) {
  const select = document.createElement('div');
  select.className = 'el-select';

  let wrapper;
  let input;
  if (version === 'v26') {
    wrapper = document.createElement('div');
    wrapper.className = 'el-select__wrapper';
    wrapper.tabIndex = -1;

    const selection = document.createElement('div');
    selection.className = 'el-select__selection';

    const inputWrap = document.createElement('div');
    inputWrap.className = 'el-select__selected-item el-select__input-wrapper';

    input = document.createElement('input');
    input.className = 'el-select__input';
    input.type = 'text';
    input.readOnly = true;

    inputWrap.appendChild(input);
    selection.appendChild(inputWrap);
    wrapper.appendChild(selection);
    select.appendChild(wrapper);
  } else {
    wrapper = document.createElement('div');
    wrapper.className = 'el-input';

    input = document.createElement('input');
    input.className = 'el-input__inner';
    input.type = 'text';

    wrapper.appendChild(input);
    select.appendChild(wrapper);
  }

  if (withValue) {
    const dropdown = document.createElement('div');
    dropdown.className = 'el-select-dropdown';
    dropdown.style.display = '';

    const item = document.createElement('li');
    item.className = 'el-select-dropdown__item';
    item.setAttribute('data-value', value);
    item.textContent = label;
    dropdown.appendChild(item);

    // 模拟 Element Plus：点 wrapper 挂上 dropdown
    wrapper.addEventListener('click', () => {
      if (!dropdown.isConnected) document.body.appendChild(dropdown);
    });

    // 模拟 Element Plus 在点击 option 后更新 input.value 并隐藏下拉
    item.addEventListener('click', () => {
      input.value = label;
      dropdown.style.display = 'none';
    });
  }

  return { select, wrapper, input, dropdown: null };
}

/**
 * 可过滤 el-select（2.6+，is-filterable）：input 是真实可输入框，
 * 模拟 EP 的 filterMethod 行为 —— input.input 事件触发后，按 input.value
 * 过滤 options 列表（hidden class 隐藏不匹配的），点击匹配项后把
 * input.value 设为选项 label 并隐藏 dropdown。
 */
function buildMockElSelectFilterable({ options, selected }) {
  const select = document.createElement('div');
  select.className = 'el-select is-filterable';

  const wrapper = document.createElement('div');
  wrapper.className = 'el-select__wrapper';
  wrapper.tabIndex = -1;

  const selection = document.createElement('div');
  selection.className = 'el-select__selection';

  const inputWrap = document.createElement('div');
  inputWrap.className = 'el-select__selected-item el-select__input-wrapper';

  const input = document.createElement('input');
  input.className = 'el-select__input';
  input.type = 'text';
  // 不设 readOnly —— 可过滤 select 的 input 真实可输入
  input.tabIndex = 0;
  inputWrap.appendChild(input);
  selection.appendChild(inputWrap);
  wrapper.appendChild(selection);
  select.appendChild(wrapper);

  const dropdown = document.createElement('div');
  dropdown.className = 'el-select-dropdown';
  dropdown.style.display = 'none';

  const items = options.map((o) => {
    const li = document.createElement('li');
    li.className = 'el-select-dropdown__item';
    li.setAttribute('data-value', String(o.value));
    li.textContent = o.label;
    dropdown.appendChild(li);
    return li;
  });

  // 模拟 EP 的 filterMethod：input 事件后按输入文本过滤
  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    items.forEach((li) => {
      const label = (li.textContent || '').trim().toLowerCase();
      li.style.display = q === '' || label.includes(q) ? '' : 'none';
    });
    if (!dropdown.isConnected) document.body.appendChild(dropdown);
    dropdown.style.display = '';
  });

  // 模拟 EP：focus input 时挂 dropdown
  input.addEventListener('focus', () => {
    if (!dropdown.isConnected) document.body.appendChild(dropdown);
    dropdown.style.display = '';
  });

  // 模拟 EP：点 option 后更新 input.value 并隐藏 dropdown
  items.forEach((li) => {
    li.addEventListener('click', () => {
      input.value = li.textContent || '';
      dropdown.style.display = 'none';
    });
  });

  if (selected) {
    input.value = selected;
  }

  return { select, wrapper, input, dropdown, items };
}

beforeEach(() => {
  document.body.innerHTML = '';
});

describe('elementPlusFiller.match', () => {
  it('el-select 容器内的 input 在 type=select 时匹配', () => {
    const { input } = buildMockElSelect({ value: 'a', label: 'A' });
    expect(elementPlusFiller.match(input, { type: 'select' })).toBe(true);
  });

  it('普通 input + type=select 不匹配', () => {
    const input = document.createElement('input');
    expect(elementPlusFiller.match(input, { type: 'select' })).toBe(false);
  });

  it('el-cascader 容器内的元素 + type=cascader 匹配', () => {
    const container = document.createElement('div');
    container.className = 'el-cascader';
    const inner = document.createElement('div');
    container.appendChild(inner);
    expect(elementPlusFiller.match(inner, { type: 'cascader' })).toBe(true);
  });

  it('el-checkbox-group + type=checkbox 匹配', () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    group.appendChild(cb);
    // 合并后 type='checkbox' 同时匹配单个和组
    expect(elementPlusFiller.match(cb, { type: 'checkbox' })).toBe(true);
    // 容器本身也匹配
    expect(elementPlusFiller.match(group, { type: 'checkbox' })).toBe(true);
  });

  it('el-switch + type=switch 匹配', () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    sw.appendChild(cb);
    expect(elementPlusFiller.match(cb, { type: 'switch' })).toBe(true);
  });

  it('el-slider + type=slider 匹配', () => {
    const slider = document.createElement('div');
    slider.className = 'el-slider';
    const range = document.createElement('input');
    range.type = 'range';
    slider.appendChild(range);
    expect(elementPlusFiller.match(range, { type: 'slider' })).toBe(true);
  });

  it('无 type 时按容器自动探测', () => {
    const { input } = buildMockElSelect({ value: 'a', label: 'A' });
    expect(elementPlusFiller.match(input, {})).toBe(true);
  });

  it('普通 input + 无 type 不匹配（交给 native filler）', () => {
    const input = document.createElement('input');
    expect(elementPlusFiller.match(input, {})).toBe(false);
  });
});

describe('elementPlusFiller.fill - el-select', () => {
  it('点击选项后 input.value 已更新', async () => {
    const { select, input } = buildMockElSelect({ value: 'tech', label: '技术部' });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, '技术部', { type: 'select' });
    expect(ok).toBe(true);
    expect(input.value).toBe('技术部');
  });

  it('value 已匹配时直接返回 true', async () => {
    const { select, input } = buildMockElSelect({ value: 'tech', label: 'tech' });
    document.body.appendChild(select);
    input.value = 'tech';

    const ok = await elementPlusFiller.fill(input, 'tech', { type: 'select' });
    expect(ok).toBe(true);
  });

  it('找不到匹配选项时返回 false', async () => {
    const { select, input } = buildMockElSelect({ value: 'tech', label: 'tech' });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, 'not-exists', { type: 'select' });
    expect(ok).toBe(false);
  });

  it('选项文本含 NBSP（折叠空白）时，按规范化文本匹配', async () => {
    // 选项 label 含 NBSP（U+00A0），配置 value 是普通空格 —— 旧实现会因
    // textContent 严格不等匹配失败；新实现折叠所有空白后相等 → 匹配
    const { select, input } = buildMockElSelect({
      value: 'zhangsan',
      label: '张三 (销售)',
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, '张三 (销售)', { type: 'select' });
    expect(ok).toBe(true);
    expect(input.value).toBe('张三 (销售)');
  });

  it('可过滤 select（is-filterable）：input 输入 value，EP 过滤后点匹配项', async () => {
    // 模拟真实场景：标签多选下拉，输入 "Vue" 过滤出包含 Vue 的项
    const { select, input, items } = buildMockElSelectFilterable({
      options: [
        { value: 'js', label: 'JavaScript' },
        { value: 'ts', label: 'TypeScript' },
        { value: 'vue', label: 'Vue' },
        { value: 'react', label: 'React' },
      ],
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, 'Vue', { type: 'select' });
    expect(ok).toBe(true);
    // 点中 Vue 项后，input.value 应为选中项的 label
    expect(input.value).toBe('Vue');
    // 不匹配的项被 mock 设为 display:none
    expect(items[0].style.display).toBe('none'); // JavaScript
    expect(items[2].style.display).toBe(''); // Vue
  });

  it('可过滤 select：filter 后无匹配时返回 false', async () => {
    const { select, input } = buildMockElSelectFilterable({
      options: [
        { value: 'a', label: 'Apple' },
        { value: 'b', label: 'Banana' },
      ],
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, 'zzz', { type: 'select' });
    expect(ok).toBe(false);
  });

  it('可过滤 select：input 已匹配时直接返回 true', async () => {
    const { select, input } = buildMockElSelectFilterable({
      options: [{ value: 'vue', label: 'Vue' }],
      selected: 'Vue',
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, 'Vue', { type: 'select' });
    expect(ok).toBe(true);
    // 没动 input
    expect(input.value).toBe('Vue');
  });

  it('普通非可过滤 select（含 el-tooltip__trigger / placeholder）：走 wrapper.click 路径', async () => {
    // 复刻用户实际 HTML：container class="el-select"，wrapper 多个 el-tooltip__trigger，
    // input readonly=""，含 placeholder 兄弟节点。dropdown 由 teleport 挂到 body。
    const select = document.createElement('div');
    select.className = 'el-select';
    select.style.width = '240px';

    const wrapper = document.createElement('div');
    wrapper.className = 'el-select__wrapper el-tooltip__trigger el-tooltip__trigger';
    wrapper.tabIndex = -1;

    const selection = document.createElement('div');
    selection.className = 'el-select__selection';

    const inputWrap = document.createElement('div');
    inputWrap.className = 'el-select__selected-item el-select__input-wrapper is-hidden';
    const input = document.createElement('input');
    input.className = 'el-select__input';
    input.type = 'text';
    input.tabIndex = 0;
    input.setAttribute('readonly', '');
    inputWrap.appendChild(input);
    selection.appendChild(inputWrap);

    const placeholder = document.createElement('div');
    placeholder.className = 'el-select__selected-item el-select__placeholder';
    const placeholderSpan = document.createElement('span');
    placeholderSpan.textContent = 'Option C';
    placeholder.appendChild(placeholderSpan);
    selection.appendChild(placeholder);

    wrapper.appendChild(selection);
    select.appendChild(wrapper);

    // dropdown 在 body 上（teleport 出来的）
    const dropdown = document.createElement('div');
    dropdown.className = 'el-select-dropdown';
    dropdown.style.display = 'none';
    const items = [
      { value: 'a', label: 'Option A' },
      { value: 'b', label: 'Option B' },
      { value: 'c', label: 'Option C' },
    ].map((o) => {
      const li = document.createElement('li');
      li.className = 'el-select-dropdown__item';
      li.setAttribute('data-value', o.value);
      li.textContent = o.label;
      dropdown.appendChild(li);
      return li;
    });
    document.body.appendChild(select);

    // 模拟 EP：点 wrapper 挂 dropdown
    wrapper.addEventListener('click', () => {
      if (!dropdown.isConnected) document.body.appendChild(dropdown);
      dropdown.style.display = '';
    });
    // 模拟 EP：点 option 后更新 input.value
    items.forEach((li) => {
      li.addEventListener('click', () => {
        input.value = li.textContent || '';
        dropdown.style.display = 'none';
      });
    });

    const ok = await elementPlusFiller.fill(placeholder, 'Option B', { type: 'select' });
    expect(ok).toBe(true);
    expect(input.value).toBe('Option B');
  });

  it('选中 .el-select__placeholder（不在 .el-select 内）也能填充', async () => {
    // 模拟 element-plus.org 实际 DOM：用户的 DevTools 路径显示
    // `.el-select__placeholder` 不在 .el-select 容器内（可能是 docs 站非标准结构，
    // 或 .el-select 被替换渲染）。但 .el-select__selection 在，所以兜底匹配。
    const select = document.createElement('div');
    select.className = 'el-select-v2';
    select.style.width = '240px';

    const wrapper = document.createElement('div');
    wrapper.className = 'el-select-v2__wrapper';
    wrapper.tabIndex = -1;

    const selection = document.createElement('div');
    selection.className = 'el-select-v2__selection';

    const inputWrap = document.createElement('div');
    inputWrap.className = 'el-select-v2__input-wrapper';
    const input = document.createElement('input');
    input.className = 'el-select-v2__input';
    input.type = 'text';
    inputWrap.appendChild(input);
    selection.appendChild(inputWrap);

    const placeholder = document.createElement('div');
    placeholder.className = 'el-select-v2__placeholder';
    const span = document.createElement('span');
    span.textContent = '请选择';
    placeholder.appendChild(span);
    selection.appendChild(placeholder);

    wrapper.appendChild(selection);
    select.appendChild(wrapper);
    document.body.appendChild(select);

    // 模拟 EP：点 wrapper 打开下拉（这里用 popper）
    const popper = document.createElement('div');
    popper.className = 'el-select-v2__popper';
    popper.style.display = 'none';
    const items = ['A', 'B', 'C'].map((v) => {
      const li = document.createElement('li');
      li.className = 'el-select-v2__list-item';
      li.setAttribute('data-value', v);
      li.textContent = v;
      popper.appendChild(li);
      return li;
    });
    wrapper.addEventListener('click', () => {
      if (!popper.isConnected) document.body.appendChild(popper);
      popper.style.display = '';
    });
    items.forEach((li) => {
      li.addEventListener('click', () => {
        input.value = li.textContent || '';
        popper.style.display = 'none';
      });
    });

    const ok = await elementPlusFiller.fill(placeholder, 'B', { type: 'select' });
    expect(ok).toBe(true);
    expect(input.value).toBe('B');
  });

});
describe('closeOpenSelectDropdowns', () => {
  it('没有可见 dropdown 时返回 false', () => {
    expect(closeOpenSelectDropdowns()).toBe(false);
  });

  it('有可见 dropdown 时在 document 上派 mousedown + 返回 true', () => {
    const dropdown = document.createElement('div');
    dropdown.className = 'el-select-dropdown';
    document.body.appendChild(dropdown);

    let mouseDownDoc = 0;
    let mouseDownBody = 0;
    document.addEventListener('mousedown', () => mouseDownDoc++);
    document.body.addEventListener('mousedown', () => mouseDownBody++);

    expect(closeOpenSelectDropdowns()).toBe(true);
    // Element Plus 的 clickoutside 在 document 上监听，所以必须派到 document
    expect(mouseDownDoc).toBeGreaterThan(0);
    // 不应在 body 上派 —— EP 内部 listener 看不到
    expect(mouseDownBody).toBe(0);
  });

  it('display:none 的 dropdown 跳过', () => {
    const dropdown = document.createElement('div');
    dropdown.className = 'el-select-dropdown';
    dropdown.style.display = 'none';
    document.body.appendChild(dropdown);

    expect(closeOpenSelectDropdowns()).toBe(false);
  });

  it('is-hidden class 的 dropdown 跳过', () => {
    const dropdown = document.createElement('div');
    dropdown.className = 'el-select-dropdown is-hidden';
    document.body.appendChild(dropdown);

    expect(closeOpenSelectDropdowns()).toBe(false);
  });

  it('第一个可见 dropdown 触发后即停（一次外部 mousedown 应该能关掉所有）', () => {
    for (let i = 0; i < 3; i++) {
      const d = document.createElement('div');
      d.className = 'el-select-dropdown';
      document.body.appendChild(d);
    }
    let calls = 0;
    document.addEventListener('mousedown', () => calls++);
    closeOpenSelectDropdowns();
    expect(calls).toBe(1);
  });
});

describe('closeOpenCascaderPanels', () => {
  it('没有可见 panel 时返回 false', () => {
    expect(closeOpenCascaderPanels()).toBe(false);
  });

  it('有可见 panel 时在 document 上派 mousedown + 返回 true', () => {
    const panel = document.createElement('div');
    panel.className = 'el-cascader-panel';
    document.body.appendChild(panel);

    let mouseDownDoc = 0;
    let mouseDownBody = 0;
    document.addEventListener('mousedown', () => mouseDownDoc++);
    document.body.addEventListener('mousedown', () => mouseDownBody++);

    expect(closeOpenCascaderPanels()).toBe(true);
    expect(mouseDownDoc).toBeGreaterThan(0);
    expect(mouseDownBody).toBe(0);
  });
});

describe('fillElSelect - 清理残留', () => {
  // 跟踪 close helper 的副作用：closeOpenSelectDropdowns 现在在 document 上派 mousedown
  function trackBodyEvents() {
    const counter = { mousedown: 0 };
    document.addEventListener('mousedown', () => counter.mousedown++);
    return counter;
  }

it('找不到选项的失败路径会派 document 事件清理', async () => {
    const counter = trackBodyEvents();
    const { select, input } = buildMockElSelect({ value: 'tech', label: 'tech' });
    document.body.appendChild(select);
    await elementPlusFiller.fill(input, 'not-exists', { type: 'select' });

    // 失败路径里 closeOpenSelectDropdowns 派 document.mousedown
    expect(counter.mousedown).toBeGreaterThanOrEqual(1);
  });

  it('上一个 dropdown 残留时填下一个 select，cleanup 后能找到正确的面板', async () => {
    // "智能 mock"：点 wrapper 时挂 dropdown 到 body；document mousedown 时自动隐藏（模拟 EP clickoutside）
    function buildSmartMockElSelect({ value, label }) {
      const select = document.createElement('div');
      select.className = 'el-select';
      const wrapper = document.createElement('div');
      wrapper.className = 'el-input';
      const input = document.createElement('input');
      input.className = 'el-input__inner';
      input.type = 'text';
      wrapper.appendChild(input);
      select.appendChild(wrapper);

      const dropdown = document.createElement('div');
      dropdown.className = 'el-select-dropdown';
      const item = document.createElement('li');
      item.className = 'el-select-dropdown__item';
      item.setAttribute('data-value', value);
      item.textContent = label;
      dropdown.appendChild(item);

      wrapper.addEventListener('click', () => {
        dropdown.style.display = '';
        if (!dropdown.isConnected) document.body.appendChild(dropdown);
      });
      item.addEventListener('click', () => {
        input.value = label;
        dropdown.style.display = 'none';
      });

      // 模拟 EP clickoutside：body mousedown 时，若 target 不在 dropdown 内就隐藏
      const handler = (e) => {
        if (!dropdown.isConnected) return;
        if (!dropdown.contains(e.target)) {
          dropdown.style.display = 'none';
        }
      };
      // 与 EP 真实行为一致：clickoutside 在 document 上监听
      document.addEventListener('mousedown', handler);

      return {
        select,
        wrapper,
        input,
        cleanup: () => document.removeEventListener('mousedown', handler),
      };
    }

    const aMock = buildSmartMockElSelect({ value: 'a', label: 'A' });
    document.body.appendChild(aMock.select);
    aMock.wrapper.click();
    expect(aMock.input.value).toBe(''); // select-A 还开着没填

    const bMock = buildSmartMockElSelect({ value: 'b', label: 'B' });
    document.body.appendChild(bMock.select);

    const ok = await elementPlusFiller.fill(bMock.input, 'B', { type: 'select' });
    expect(ok).toBe(true);
    expect(bMock.input.value).toBe('B');
    // select-A 不应被错误填上
    expect(aMock.input.value).toBe('');

    aMock.cleanup();
    bMock.cleanup();
  });
});

describe('fillElCascader - 清理残留', () => {
  // panel 放在 container 内部（与 fillElCascader 中 getCascaderPanel 一致）
  function buildMockElCascader({ levels }) {
    const container = document.createElement('div');
    container.className = 'el-cascader';

    const wrap = document.createElement('div');
    wrap.className = 'el-input';
    const input = document.createElement('input');
    input.className = 'el-input__inner';
    wrap.appendChild(input);
    container.appendChild(wrap);

    const panel = document.createElement('div');
    panel.className = 'el-cascader-panel';
    levels.forEach((nodes) => {
      const menu = document.createElement('div');
      menu.className = 'el-cascader-menu';
      nodes.forEach((n) => {
        const node = document.createElement('div');
        node.className = 'el-cascader-node';
        node.setAttribute('data-value', n.value);
        node.textContent = n.label;
        node.addEventListener('click', () => {
          input.value = (input.value ? input.value + '/' : '') + n.label;
        });
        menu.appendChild(node);
      });
      panel.appendChild(menu);
    });
    container.appendChild(panel);

    return { container, input, panel };
  }

  function trackBodyEvents() {
    const counter = { mousedown: 0 };
    document.addEventListener('mousedown', () => counter.mousedown++);
    return counter;
  }

  it('找不到节点的失败路径会派 document 事件清理', async () => {
    const counter = trackBodyEvents();
    const { container, input } = buildMockElCascader({
      levels: [[{ value: 'a', label: 'A' }]],
    });
    document.body.appendChild(container);
    await elementPlusFiller.fill(input, 'not-exists', { type: 'cascader' });

    expect(counter.mousedown).toBeGreaterThanOrEqual(1);
  });

  it('前一个 cascader 失败后填下一个 cascader 仍能正确点选', async () => {
    const aMock = buildMockElCascader({
      levels: [[{ value: 'a', label: 'A' }]],
    });
    document.body.appendChild(aMock.container);
    await elementPlusFiller.fill(aMock.input, 'wrong', { type: 'cascader' });
    expect(aMock.input.value).toBe(''); // 失败没填上

    const bMock = buildMockElCascader({
      levels: [[{ value: 'b', label: 'B' }]],
    });
    document.body.appendChild(bMock.container);

    const ok = await elementPlusFiller.fill(bMock.input, 'b', { type: 'cascader' });
    expect(ok).toBe(true);
    expect(bMock.input.value).toBe('B');
  });
});

describe('elementPlusFiller.fill - el-select (Element Plus 2.6+ 新结构)', () => {
  it('新结构 .el-select__wrapper + .el-select__input 能点击选项', async () => {
    const { select, input } = buildMockElSelect({
      value: 'tech',
      label: '技术部',
      version: 'v26',
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, '技术部', { type: 'select' });
    expect(ok).toBe(true);
    expect(input.value).toBe('技术部');
  });

  it('新结构：value 已匹配直接返回 true', async () => {
    const { select, input } = buildMockElSelect({
      value: 'tech',
      label: 'tech',
      version: 'v26',
    });
    document.body.appendChild(select);
    input.value = 'tech';

    const ok = await elementPlusFiller.fill(input, 'tech', { type: 'select' });
    expect(ok).toBe(true);
  });

  it('新结构：找不到选项返回 false', async () => {
    const { select, input } = buildMockElSelect({
      value: 'tech',
      label: 'tech',
      version: 'v26',
    });
    document.body.appendChild(select);

    const ok = await elementPlusFiller.fill(input, 'not-exists', { type: 'select' });
    expect(ok).toBe(false);
  });
});

describe('elementPlusFiller.fill - el-input-number', () => {
  it('设置数字值并触发 input 事件', () => {
    const wrap = document.createElement('div');
    wrap.className = 'el-input-number';
    const input = document.createElement('input');
    input.className = 'el-input-number__input';
    input.type = 'text';
    wrap.appendChild(input);
    document.body.appendChild(wrap);

    const handler = vi.fn();
    input.addEventListener('input', handler);

    const ok = elementPlusFiller.fill(input, 42, { type: 'input-number' });
    expect(ok).toBe(true);
    expect(input.value).toBe('42');
    expect(handler).toHaveBeenCalled();
  });

  it('模拟 Element Plus 内部 clamp：input 事件被监听并解析为数字', () => {
    // Element Plus el-input-number 监听 input 事件做 parse / clamp / update
    const wrap = document.createElement('div');
    wrap.className = 'el-input-number';
    const input = document.createElement('input');
    input.className = 'el-input-number__input';
    input.type = 'text';
    wrap.appendChild(input);
    document.body.appendChild(wrap);

    let parsedValue = 0;
    input.addEventListener('input', () => {
      const n = Number(input.value);
      if (!Number.isNaN(n)) parsedValue = n;
    });

    elementPlusFiller.fill(input, 99, { type: 'input-number' });
    expect(parsedValue).toBe(99);
  });
});

describe('elementPlusFiller.fill - el-checkbox (单个，不在 group 内)', () => {
  /** 模拟 Element Plus 实际 DOM：label > span.input > input.el-checkbox__original */
  function buildMockElCheckbox(label = 'Option 2') {
    const wrap = document.createElement('label');
    wrap.className = 'el-checkbox el-checkbox--large';

    const inputWrap = document.createElement('span');
    inputWrap.className = 'el-checkbox__input';

    const input = document.createElement('input');
    input.className = 'el-checkbox__original';
    input.type = 'checkbox';
    input.value = label;

    const inner = document.createElement('span');
    inner.className = 'el-checkbox__inner';

    inputWrap.appendChild(input);
    inputWrap.appendChild(inner);
    wrap.appendChild(inputWrap);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'el-checkbox__label';
    labelSpan.textContent = label;
    wrap.appendChild(labelSpan);

    return { wrap, input };
  }

  it('selector 指向 label 时勾选并触发 change', async () => {
    const { wrap, input } = buildMockElCheckbox('Option 2');
    document.body.appendChild(wrap);

    const handler = vi.fn();
    input.addEventListener('change', handler);

    const ok = await elementPlusFiller.fill(wrap, true, { type: 'checkbox' });
    expect(ok).toBe(true);
    expect(input.checked).toBe(true);
    expect(handler).toHaveBeenCalled();
  });

  it('selector 指向 input.el-checkbox__original 时也工作', async () => {
    const { wrap, input } = buildMockElCheckbox('Option 2');
    document.body.appendChild(wrap);

    const ok = await elementPlusFiller.fill(input, true, { type: 'checkbox' });
    expect(ok).toBe(true);
    expect(input.checked).toBe(true);
  });

  it('value=false 取消勾选', async () => {
    const { wrap, input } = buildMockElCheckbox('Option 2');
    input.checked = true;
    document.body.appendChild(wrap);

    const ok = await elementPlusFiller.fill(wrap, false, { type: 'checkbox' });
    expect(ok).toBe(true);
    expect(input.checked).toBe(false);
  });

  it('match 在 type=checkbox 时对 .el-checkbox 容器返回 true', () => {
    const { wrap } = buildMockElCheckbox();
    document.body.appendChild(wrap);
    expect(elementPlusFiller.match(wrap, { type: 'checkbox' })).toBe(true);
  });
});

describe('elementPlusFiller.fill - el-checkbox-group（合并到 type=checkbox）', () => {
  it('勾选匹配 label 的项', async () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    ['苹果', '香蕉', '橘子'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = label;
      const span = document.createElement('span');
      span.className = 'el-checkbox__label';
      span.textContent = label;
      wrap.appendChild(cb);
      wrap.appendChild(span);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const ok = await elementPlusFiller.fill(group, ['苹果', '橘子'], {
      type: 'checkbox',
    });
    expect(ok).toBe(true);
    expect(group.querySelectorAll('input[type=checkbox]:checked').length).toBe(2);
  });

  it('按 input.value 匹配', async () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    ['1', '2', '3'].forEach((v) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = v;
      wrap.appendChild(cb);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const ok = await elementPlusFiller.fill(group, '2', {
      type: 'checkbox',
    });
    expect(ok).toBe(true);
    const checked = group.querySelector('input[value="2"]');
    expect(checked.checked).toBe(true);
  });

  it('子元素（label）作为 selector 时也走 group 逻辑', async () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    ['a', 'b'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = label;
      wrap.appendChild(cb);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);
    const child = group.querySelectorAll('label')[0];

    const ok = await elementPlusFiller.fill(child, ['a', 'b'], {
      type: 'checkbox',
    });
    expect(ok).toBe(true);
    expect(group.querySelectorAll('input[type=checkbox]:checked').length).toBe(2);
  });

  it('value 全不匹配时打印候选（调试模式）', async () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    ['北京', '上海'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-checkbox';
      const cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = label;
      const span = document.createElement('span');
      span.className = 'el-checkbox__label';
      span.textContent = label;
      wrap.appendChild(cb);
      wrap.appendChild(span);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const ok = await elementPlusFiller.fill(group, ['广州'], {
        type: 'checkbox',
      });
      expect(ok).toBe(false);
      const candidateLog = warnSpy.mock.calls.find(
        (args) =>
          typeof args[0] === 'string' &&
          args[0].includes('el-checkbox-group 未匹配到任何候选')
      );
      expect(candidateLog).toBeDefined();
      expect(candidateLog[0]).toContain('北京');
      expect(candidateLog[0]).toContain('上海');
      expect(candidateLog[0]).toContain('广州');
    } finally {
      warnSpy.mockRestore();
    }
  });
});

describe('elementPlusFiller.fill - el-radio-group（合并到 type=radio）', () => {
  it('选中匹配 label 的项', async () => {
    const group = document.createElement('div');
    group.className = 'el-radio-group';
    ['男', '女'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-radio';
      const r = document.createElement('input');
      r.type = 'radio';
      r.value = label;
      const span = document.createElement('span');
      span.className = 'el-radio__label';
      span.textContent = label;
      wrap.appendChild(r);
      wrap.appendChild(span);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const ok = await elementPlusFiller.fill(group, '女', { type: 'radio' });
    expect(ok).toBe(true);
    expect(group.querySelector('input[value="女"]').checked).toBe(true);
    expect(group.querySelector('input[value="男"]').checked).toBe(false);
  });

  it('模拟 Element Plus 真实 DOM 结构：选中 value=2 触发 change', async () => {
    const group = document.createElement('div');
    group.className = 'el-radio-group';
    group.setAttribute('role', 'radiogroup');

    const makeRadio = (value, checked = false) => {
      const label = document.createElement('label');
      label.className = 'el-radio' + (checked ? ' is-checked' : '');

      const inputSpan = document.createElement('span');
      inputSpan.className = 'el-radio__input' + (checked ? ' is-checked' : '');

      const input = document.createElement('input');
      input.className = 'el-radio__original';
      input.type = 'radio';
      input.value = value;
      if (checked) input.checked = true;

      const inner = document.createElement('span');
      inner.className = 'el-radio__inner';

      inputSpan.appendChild(input);
      inputSpan.appendChild(inner);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'el-radio__label';
      labelSpan.textContent = `Option ${value}`;

      label.appendChild(inputSpan);
      label.appendChild(labelSpan);
      return { label, input };
    };

    const { input: r1 } = makeRadio('1', true);
    const { input: r2 } = makeRadio('2', false);
    group.appendChild(r1.closest('label'));
    group.appendChild(r2.closest('label'));
    document.body.appendChild(group);

    const changeHandler = vi.fn();
    r2.addEventListener('change', changeHandler);

    const ok = await elementPlusFiller.fill(group, '2', { type: 'radio' });
    expect(ok).toBe(true);
    expect(r2.checked).toBe(true);
    expect(changeHandler).toHaveBeenCalled();
  });

  it('按 input.value 而非 label 文本匹配', async () => {
    const group = document.createElement('div');
    group.className = 'el-radio-group';
    ['北京', '上海', '广州'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-radio';
      const r = document.createElement('input');
      r.type = 'radio';
      r.value = `city-${label}`;
      const span = document.createElement('span');
      span.className = 'el-radio__label';
      span.textContent = label;
      wrap.appendChild(r);
      wrap.appendChild(span);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const ok = await elementPlusFiller.fill(group, 'city-上海', {
      type: 'radio',
    });
    expect(ok).toBe(true);
    expect(group.querySelector('input[value="city-上海"]').checked).toBe(true);
  });

  it('用户场景重现：selector 指向 label（含 Vue fragment 注释）', async () => {
    // 用户 DOM：
    // <div class="el-radio-group">
    //   <label class="el-radio el-radio--large">
    //     <span class="el-radio__input">
    //       <input class="el-radio__original" value="1" name="x" type="radio">
    //     </span>
    //     <span class="el-radio__label"><!--[-->Option 1<!--]--></span>
    //   </label>
    //   ...
    // </div>
    //
    // 用户配置 selector 指向 <label>，type='radio'，value='1'
    const group = document.createElement('div');
    group.className = 'el-radio-group';
    group.setAttribute('role', 'radiogroup');

    function makeLabel(value, checked) {
      const lbl = document.createElement('label');
      lbl.className =
        'el-radio' + (checked ? ' is-checked' : '') + ' el-radio--large';

      const inputSpan = document.createElement('span');
      inputSpan.className =
        'el-radio__input' + (checked ? ' is-checked' : '');

      const input = document.createElement('input');
      input.className = 'el-radio__original';
      input.type = 'radio';
      input.value = value;
      input.name = 'el-id-1024-0';
      if (checked) input.checked = true;

      const inner = document.createElement('span');
      inner.className = 'el-radio__inner';

      inputSpan.appendChild(input);
      inputSpan.appendChild(inner);

      const labelSpan = document.createElement('span');
      labelSpan.className = 'el-radio__label';
      // 模拟 Vue 3 fragment 注释 <!--[--> xxx <!--]-->
      labelSpan.appendChild(document.createComment('['));
      labelSpan.appendChild(document.createTextNode(`Option ${value}`));
      labelSpan.appendChild(document.createComment(']'));

      lbl.appendChild(inputSpan);
      lbl.appendChild(labelSpan);
      return { lbl, input };
    }

    const { lbl: l1, input: r1 } = makeLabel('1', false);
    const { lbl: l2, input: r2 } = makeLabel('2', true);
    group.appendChild(l1);
    group.appendChild(l2);
    document.body.appendChild(group);

    const handler = vi.fn();
    r1.addEventListener('change', handler);

    // 用户场景：el = label(option 1)，value = '1'
    const ok = await elementPlusFiller.fill(l1, '1', { type: 'radio' });
    expect(ok).toBe(true);
    expect(r1.checked).toBe(true);
    expect(handler).toHaveBeenCalled();
  });

  it('value 不匹配时打印候选（调试模式）', async () => {
    const group = document.createElement('div');
    group.className = 'el-radio-group';
    ['北京', '上海'].forEach((label) => {
      const wrap = document.createElement('label');
      wrap.className = 'el-radio';
      const r = document.createElement('input');
      r.type = 'radio';
      r.value = label;
      const span = document.createElement('span');
      span.className = 'el-radio__label';
      span.textContent = label;
      wrap.appendChild(r);
      wrap.appendChild(span);
      group.appendChild(wrap);
    });
    document.body.appendChild(group);

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    try {
      const ok = await elementPlusFiller.fill(group, '广州', { type: 'radio' });
      expect(ok).toBe(false);
      // 应该打一条包含候选 value/label 的 warning
      const candidateLog = warnSpy.mock.calls.find(
        (args) =>
          typeof args[0] === 'string' &&
          args[0].includes('el-radio-group 未匹配到任何候选')
      );
      expect(candidateLog).toBeDefined();
      expect(candidateLog[0]).toContain('北京');
      expect(candidateLog[0]).toContain('上海');
      expect(candidateLog[0]).toContain('广州');
    } finally {
      warnSpy.mockRestore();
    }
  });
});

describe('elementPlusFiller.fill - el-radio (单个，不在 group 内)', () => {
  /** 模拟 Element Plus 真实 DOM：label > span.input > input.el-radio__original */
  function buildMockElRadio(label = 'Option 1', value = '1', checked = false) {
    const wrap = document.createElement('label');
    wrap.className = 'el-radio' + (checked ? ' is-checked' : '');

    const inputSpan = document.createElement('span');
    inputSpan.className = 'el-radio__input' + (checked ? ' is-checked' : '');

    const input = document.createElement('input');
    input.className = 'el-radio__original';
    input.type = 'radio';
    input.value = value;
    if (checked) input.checked = true;

    const inner = document.createElement('span');
    inner.className = 'el-radio__inner';

    inputSpan.appendChild(input);
    inputSpan.appendChild(inner);

    const labelSpan = document.createElement('span');
    labelSpan.className = 'el-radio__label';
    labelSpan.textContent = label;

    wrap.appendChild(inputSpan);
    wrap.appendChild(labelSpan);

    return { wrap, input };
  }

  it('selector 指向 label 时按 value 匹配并触发 change', async () => {
    const { wrap, input } = buildMockElRadio('Option 1', '1');
    document.body.appendChild(wrap);

    const handler = vi.fn();
    input.addEventListener('change', handler);

    const ok = await elementPlusFiller.fill(wrap, '1', { type: 'radio' });
    expect(ok).toBe(true);
    expect(input.checked).toBe(true);
    expect(handler).toHaveBeenCalled();
  });

  it('selector 指向 input.el-radio__original 时也工作', async () => {
    const { wrap, input } = buildMockElRadio('Option 1', '1');
    document.body.appendChild(wrap);

    const ok = await elementPlusFiller.fill(input, '1', { type: 'radio' });
    expect(ok).toBe(true);
    expect(input.checked).toBe(true);
  });

  it('value 不匹配 input.value 时返回 false（不误操作）', async () => {
    const { wrap, input } = buildMockElRadio('Option 1', '1');
    document.body.appendChild(wrap);

    const ok = await elementPlusFiller.fill(wrap, '2', { type: 'radio' });
    expect(ok).toBe(false);
    expect(input.checked).toBe(false);
  });

  it('已勾选时直接返回 true，不重复触发', async () => {
    const { wrap, input } = buildMockElRadio('Option 1', '1', true);
    document.body.appendChild(wrap);

    const handler = vi.fn();
    input.addEventListener('change', handler);

    const ok = await elementPlusFiller.fill(wrap, '1', { type: 'radio' });
    expect(ok).toBe(true);
    expect(handler).not.toHaveBeenCalled();
  });

  it('match 在 type=radio 时对 .el-radio 容器返回 true', () => {
    const { wrap } = buildMockElRadio();
    document.body.appendChild(wrap);
    expect(elementPlusFiller.match(wrap, { type: 'radio' })).toBe(true);
  });
});

describe('elementPlusFiller.fill - el-switch', () => {
  it('开关切换', async () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    sw.appendChild(cb);
    document.body.appendChild(sw);

    const ok = await elementPlusFiller.fill(cb, true, { type: 'switch' });
    expect(ok).toBe(true);
    expect(cb.checked).toBe(true);
  });

  it('模拟 Element Plus el-switch：触发 change 以更新 v-model', async () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';

    const inner = document.createElement('span');
    inner.className = 'el-switch__core';

    const cb = document.createElement('input');
    cb.className = 'el-switch__input';
    cb.type = 'checkbox';

    inner.appendChild(cb);
    sw.appendChild(inner);
    document.body.appendChild(sw);

    const changeHandler = vi.fn();
    cb.addEventListener('change', changeHandler);

    const ok = await elementPlusFiller.fill(cb, true, { type: 'switch' });
    expect(ok).toBe(true);
    expect(cb.checked).toBe(true);
    expect(changeHandler).toHaveBeenCalled();
  });

  it('value=false 关闭开关并触发 change', async () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = true;
    sw.appendChild(cb);
    document.body.appendChild(sw);

    const handler = vi.fn();
    cb.addEventListener('change', handler);

    const ok = await elementPlusFiller.fill(cb, false, { type: 'switch' });
    expect(ok).toBe(true);
    expect(cb.checked).toBe(false);
    expect(handler).toHaveBeenCalled();
  });

  it('已为目标状态时直接返回 true，不重复触发事件', async () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = true;
    sw.appendChild(cb);
    document.body.appendChild(sw);

    const handler = vi.fn();
    cb.addEventListener('change', handler);

    const ok = await elementPlusFiller.fill(cb, true, { type: 'switch' });
    expect(ok).toBe(true);
    expect(handler).not.toHaveBeenCalled();
  });
});

describe('elementPlusFiller.fill - el-slider', () => {
  it('设置 range 值', () => {
    const slider = document.createElement('div');
    slider.className = 'el-slider';
    const range = document.createElement('input');
    range.type = 'range';
    slider.appendChild(range);
    document.body.appendChild(slider);

    const handler = vi.fn();
    range.addEventListener('input', handler);

    const ok = elementPlusFiller.fill(range, 75, { type: 'slider' });
    expect(ok).toBe(true);
    expect(range.value).toBe('75');
    expect(handler).toHaveBeenCalled();
  });

  it('模拟 Element Plus v-model：input 事件应触发更新', () => {
    // Element Plus el-slider 通过原生 input 事件把 modelValue 同步出去
    const slider = document.createElement('div');
    slider.className = 'el-slider';
    const range = document.createElement('input');
    range.type = 'range';
    slider.appendChild(range);
    document.body.appendChild(slider);

    let modelValue = 0;
    range.addEventListener('input', () => {
      modelValue = Number(range.value);
    });

    elementPlusFiller.fill(range, 80, { type: 'slider' });
    expect(modelValue).toBe(80);
  });
});

describe('elementPlusFiller.fill - el-date-picker', () => {
  it('通过 input 走 fillInput', () => {
    const editor = document.createElement('div');
    editor.className = 'el-date-editor el-input';
    const input = document.createElement('input');
    input.className = 'el-input__inner';
    editor.appendChild(input);
    document.body.appendChild(editor);

    const ok = elementPlusFiller.fill(input, '2026-09-21', { type: 'date' });
    expect(ok).toBe(true);
    expect(input.value).toBe('2026-09-21');
  });

  it('daterange：数组 value 分两个 .el-range-input 填', () => {
    const editor = document.createElement('div');
    editor.className = 'el-date-editor el-range-editor';
    const start = document.createElement('input');
    start.className = 'el-range-input';
    const sep = document.createElement('span');
    sep.className = 'el-range-separator';
    sep.textContent = '至';
    const end = document.createElement('input');
    end.className = 'el-range-input';
    editor.appendChild(start);
    editor.appendChild(sep);
    editor.appendChild(end);
    document.body.appendChild(editor);

    const ok = elementPlusFiller.fill(editor, ['2026-09-01', '2026-09-30'], {
      type: 'daterange',
    });
    // Element Plus 的 type 实际是 'date' / 'datetime'，但用 'daterange' 也只是验证 fill 路径
    expect(ok).toBe(true);
    expect(start.value).toBe('2026-09-01');
    expect(end.value).toBe('2026-09-30');
  });

  it('daterange：单值字符串默认填开始日期', () => {
    const editor = document.createElement('div');
    editor.className = 'el-date-editor el-range-editor';
    const start = document.createElement('input');
    start.className = 'el-range-input';
    const end = document.createElement('input');
    end.className = 'el-range-input';
    editor.appendChild(start);
    editor.appendChild(end);
    document.body.appendChild(editor);

    const ok = elementPlusFiller.fill(editor, '2026-09-01', { type: 'date' });
    expect(ok).toBe(true);
    expect(start.value).toBe('2026-09-01');
    expect(end.value).toBe('');
  });

  it('Element UI daterange 同样用 .el-range-input（EU/EP 通用 class）', () => {
    // Element UI 2.x 的 daterange 与 Element Plus 2.6+ 同样使用 .el-range-input
    // class 拼写：el-date-editor el-range-editor el-input
    const editor = document.createElement('div');
    editor.className = 'el-date-editor el-range-editor el-input';
    const start = document.createElement('input');
    start.className = 'el-range-input';
    const end = document.createElement('input');
    end.className = 'el-range-input';
    editor.appendChild(start);
    editor.appendChild(end);
    document.body.appendChild(editor);

    const ok = elementPlusFiller.fill(editor, ['2026-09-01', '2026-09-30'], {
      type: 'date',
    });
    expect(ok).toBe(true);
    expect(start.value).toBe('2026-09-01');
    expect(end.value).toBe('2026-09-30');
  });
});
