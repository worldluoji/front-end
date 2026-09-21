import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadStoredConfig,
  saveStoredConfig,
  clearStoredConfig,
  normalizeConfig,
  exportConfigJson,
  importConfigJson,
  STORAGE_KEY,
} from '../src/config-storage.js';
import { DEFAULT_CONFIG } from '../src/config.js';

beforeEach(() => {
  localStorage.clear();
});

describe('localStorage 读写', () => {
  it('初始为空时 loadStoredConfig 返回 null', () => {
    expect(loadStoredConfig()).toBeNull();
  });

  it('saveStoredConfig → loadStoredConfig 往返一致', () => {
    const cfg = {
      AUTO_FILL_ON_LOAD: true,
      SHORTCUT: { key: 'X', ctrl: true, alt: false, shift: false, meta: false },
      PAGE_CONFIGS: [
        { name: 'A', urlPattern: '/a', fields: [{ selector: '#x', value: '1', type: 'input' }] },
      ],
    };
    expect(saveStoredConfig(cfg)).toBe(true);
    expect(loadStoredConfig()).toEqual(cfg);
  });

  it('clearStoredConfig 移除存储', () => {
    saveStoredConfig({ foo: 1 });
    clearStoredConfig();
    expect(loadStoredConfig()).toBeNull();
  });

  it('坏 JSON 不抛错，返回 null', () => {
    localStorage.setItem(STORAGE_KEY, '{not-json');
    expect(loadStoredConfig()).toBeNull();
  });

  it('非对象 JSON 返回 null', () => {
    localStorage.setItem(STORAGE_KEY, '"hello"');
    expect(loadStoredConfig()).toBeNull();
  });
});

describe('normalizeConfig', () => {
  it('空值走默认', () => {
    const c = normalizeConfig(null);
    expect(c).toEqual(DEFAULT_CONFIG);
  });

  it('缺字段用默认补齐', () => {
    const c = normalizeConfig({});
    expect(c.AUTO_FILL_ON_LOAD).toBe(DEFAULT_CONFIG.AUTO_FILL_ON_LOAD);
    expect(c.SHORTCUT).toEqual(DEFAULT_CONFIG.SHORTCUT);
    expect(c.PAGE_CONFIGS).toEqual([]);
  });

  it('字段缺失值用空字符串或空数组', () => {
    const c = normalizeConfig({
      PAGE_CONFIGS: [{ name: 'x', urlPattern: '/x', fields: [{}] }],
    });
    expect(c.PAGE_CONFIGS[0].fields[0].selector).toBe('');
    expect(c.PAGE_CONFIGS[0].fields[0].type).toBe('input');
  });

  it('保留合法值', () => {
    const c = normalizeConfig({
      AUTO_FILL_ON_LOAD: true,
      SHORTCUT: { key: 'P' },
      PAGE_CONFIGS: [
        {
          name: '订单',
          urlPattern: /\/order\//,
          fields: [{ selector: '#a', value: 'A', type: 'input' }],
        },
      ],
    });
    expect(c.AUTO_FILL_ON_LOAD).toBe(true);
    expect(c.SHORTCUT.key).toBe('P');
    // SHORTCUT 默认值合并
    expect(c.SHORTCUT.meta).toBe(DEFAULT_CONFIG.SHORTCUT.meta);
    expect(c.PAGE_CONFIGS[0].urlPattern).toBeInstanceOf(RegExp);
  });
});

describe('import / export', () => {
  it('exportConfigJson 输出格式化 JSON（无 RegExp）', () => {
    const safeConfig = {
      ...DEFAULT_CONFIG,
      PAGE_CONFIGS: DEFAULT_CONFIG.PAGE_CONFIGS.map((p) => ({
        ...p,
        urlPattern: String(p.urlPattern),
      })),
    };
    const json = exportConfigJson(safeConfig);
    expect(JSON.parse(json)).toEqual(safeConfig);
  });

  it('exportConfigJson 对 RegExp 退化为 {}', () => {
    const json = exportConfigJson(DEFAULT_CONFIG);
    const parsed = JSON.parse(json);
    // JSON 不能序列化 RegExp → 验证其他字段仍在
    expect(parsed.PAGE_CONFIGS[0].name).toBe('用户信息页（示例）');
    expect(parsed.PAGE_CONFIGS[0].urlPattern).toEqual({});
  });

  it('importConfigJson 解析并规范化', () => {
    const json = JSON.stringify({
      PAGE_CONFIGS: [
        { name: 'A', urlPattern: '/a', fields: [{ selector: '#a', value: 1, type: 'input' }] },
      ],
    });
    const c = importConfigJson(json);
    expect(c.PAGE_CONFIGS).toHaveLength(1);
    expect(c.PAGE_CONFIGS[0].fields[0].selector).toBe('#a');
  });

  it('importConfigJson 非法 JSON 抛错', () => {
    expect(() => importConfigJson('{')).toThrow();
  });
});
