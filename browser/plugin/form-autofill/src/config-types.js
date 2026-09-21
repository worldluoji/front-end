/**
 * 字段 type 列表与默认值
 */

export const FIELD_TYPES = [
  { value: 'input', label: 'input (文本输入框)', defaultValue: '' },
  { value: 'select', label: 'select (下拉选择)', defaultValue: '' },
  { value: 'checkbox', label: 'checkbox (复选框)', defaultValue: false },
  { value: 'radio', label: 'radio (单选)', defaultValue: '' },
  { value: 'range', label: 'range (滑块)', defaultValue: 0 },
  { value: 'slider', label: 'slider (滑块)', defaultValue: 0 },
  { value: 'switch', label: 'switch (开关)', defaultValue: false },
  { value: 'input-number', label: 'input-number (数字输入)', defaultValue: 0 },
  { value: 'date', label: 'date (日期选择器)', defaultValue: '' },
  { value: 'datetime', label: 'datetime (日期时间)', defaultValue: '' },
  { value: 'time', label: 'time (时间选择器)', defaultValue: '' },
  { value: 'cascader', label: 'cascader (级联选择)', defaultValue: [] },
];

const DEFAULT_BY_TYPE = Object.fromEntries(
  FIELD_TYPES.map((t) => [t.value, t.defaultValue])
);

export function getDefaultValueByType(type) {
  return DEFAULT_BY_TYPE[type] !== undefined
    ? structuredClone(DEFAULT_BY_TYPE[type])
    : '';
}

export function getFieldTypeLabel(type) {
  const t = FIELD_TYPES.find((x) => x.value === type);
  return t ? t.label : type;
}
