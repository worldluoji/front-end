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
});
