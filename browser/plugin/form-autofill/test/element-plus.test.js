import { describe, it, expect, beforeEach, vi } from 'vitest';
import { elementPlusFiller } from '../src/fillers/element-plus.js';

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

  it('el-checkbox-group + type=checkbox-group 匹配', () => {
    const group = document.createElement('div');
    group.className = 'el-checkbox-group';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    group.appendChild(cb);
    expect(elementPlusFiller.match(cb, { type: 'checkbox-group' })).toBe(true);
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
});

describe('elementPlusFiller.fill - el-checkbox-group', () => {
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
      type: 'checkbox-group',
    });
    expect(ok).toBe(true);
    expect(group.querySelectorAll('input[type=checkbox]:checked').length).toBe(2);
  });

  it('按 input.value 匹配', () => {
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

    elementPlusFiller.fill(group, '2', { type: 'checkbox-group' });
    const checked = group.querySelector('input[value="2"]');
    expect(checked.checked).toBe(true);
  });
});

describe('elementPlusFiller.fill - el-radio-group', () => {
  it('选中匹配 label 的项', () => {
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

    const ok = elementPlusFiller.fill(group, '女', { type: 'radio-group' });
    expect(ok).toBe(true);
    expect(group.querySelector('input[value="女"]').checked).toBe(true);
    expect(group.querySelector('input[value="男"]').checked).toBe(false);
  });
});

describe('elementPlusFiller.fill - el-switch', () => {
  it('开关切换', () => {
    const sw = document.createElement('div');
    sw.className = 'el-switch';
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    sw.appendChild(cb);
    document.body.appendChild(sw);

    const ok = elementPlusFiller.fill(cb, true, { type: 'switch' });
    expect(ok).toBe(true);
    expect(cb.checked).toBe(true);
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
});
