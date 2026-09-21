import { describe, it, expect } from 'vitest';
import {
  FIELD_TYPES,
  getDefaultValueByType,
  getFieldTypeLabel,
} from '../src/config-types.js';

describe('FIELD_TYPES', () => {
  it('包含所有预期 type', () => {
    const values = FIELD_TYPES.map((t) => t.value);
    expect(values).toEqual(
      expect.arrayContaining([
        'input',
        'select',
        'checkbox',
        'radio',
        'range',
        'slider',
        'switch',
        'input-number',
        'date',
        'datetime',
        'time',
        'cascader',
        'checkbox-group',
        'radio-group',
      ])
    );
  });

  it('每项都有 value / label / defaultValue', () => {
    for (const t of FIELD_TYPES) {
      expect(t.value).toBeTruthy();
      expect(t.label).toBeTruthy();
      expect('defaultValue' in t).toBe(true);
    }
  });
});

describe('getDefaultValueByType', () => {
  it('已知 type 返回对应默认值', () => {
    expect(getDefaultValueByType('input')).toBe('');
    expect(getDefaultValueByType('checkbox')).toBe(false);
    expect(getDefaultValueByType('switch')).toBe(false);
    expect(getDefaultValueByType('range')).toBe(0);
    expect(getDefaultValueByType('cascader')).toEqual([]);
    expect(getDefaultValueByType('checkbox-group')).toEqual([]);
  });

  it('未知 type 返回空字符串', () => {
    expect(getDefaultValueByType('unknown-type')).toBe('');
  });

  it('数组默认值返回新数组（深拷贝）', () => {
    const a = getDefaultValueByType('cascader');
    const b = getDefaultValueByType('cascader');
    expect(a).not.toBe(b);
  });
});

describe('getFieldTypeLabel', () => {
  it('已知 type 返回 label', () => {
    expect(getFieldTypeLabel('input')).toMatch(/input/);
  });
  it('未知 type 返回原 type 字符串', () => {
    expect(getFieldTypeLabel('unknown')).toBe('unknown');
  });
});
