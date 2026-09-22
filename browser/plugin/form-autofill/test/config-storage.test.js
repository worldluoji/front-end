import { describe, it, expect, beforeEach } from 'vitest';
import {
  loadStoredConfig,
  saveStoredConfig,
  clearStoredConfig,
  normalizeConfig,
  exportConfigJson,
  importConfigJson,
  getActiveProfile,
  setActiveProfile,
  listProfiles,
  STORAGE_KEY,
  PROFILE_STORAGE_KEY,
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
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].selector).toBe('');
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].type).toBe('input');
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
    // 旧 fields 自动归一为 profiles.default
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].selector).toBe('#a');
  });

  it('旧版 type=checkbox-group / radio-group 自动迁移到 checkbox / radio', () => {
    const c = normalizeConfig({
      PAGE_CONFIGS: [
        {
          name: '老配置',
          urlPattern: '/old',
          fields: [
            { selector: '.g1', value: ['a', 'b'], type: 'checkbox-group' },
            { selector: '.g2', value: '女', type: 'radio-group' },
          ],
        },
      ],
    });
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].type).toBe('checkbox');
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[1].type).toBe('radio');
    // value 原样保留
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].value).toEqual(['a', 'b']);
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[1].value).toBe('女');
  });

  it('新写法 profiles 原样保留', () => {
    const c = normalizeConfig({
      PAGE_CONFIGS: [
        {
          name: 'A',
          urlPattern: '/a',
          profiles: {
            default: { fields: [{ selector: '#a', value: '1', type: 'input' }] },
            demo:    { fields: [{ selector: '#a', value: '2', type: 'input' }] },
          },
        },
      ],
    });
    expect(Object.keys(c.PAGE_CONFIGS[0].profiles)).toEqual(['default', 'demo']);
    expect(c.PAGE_CONFIGS[0].profiles.demo.fields[0].value).toBe('2');
  });

  it('profiles 为空对象时兜底为单个 default profile', () => {
    const c = normalizeConfig({
      PAGE_CONFIGS: [{ name: 'A', urlPattern: '/a', profiles: {} }],
    });
    expect(Object.keys(c.PAGE_CONFIGS[0].profiles)).toEqual(['default']);
  });

  it('字段缺失 + 已有 profiles 时归一化每个 profile 的 fields', () => {
    const c = normalizeConfig({
      PAGE_CONFIGS: [
        {
          name: 'A',
          urlPattern: '/a',
          profiles: { default: { fields: [{}] } },
        },
      ],
    });
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].selector).toBe('');
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].type).toBe('input');
  });

  it('SHORTCUT_PROFILE_SWITCH 缺省走默认', () => {
    const c = normalizeConfig({});
    expect(c.SHORTCUT_PROFILE_SWITCH).toEqual(DEFAULT_CONFIG.SHORTCUT_PROFILE_SWITCH);
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
    expect(c.PAGE_CONFIGS[0].profiles.default.fields[0].selector).toBe('#a');
  });

  it('importConfigJson 非法 JSON 抛错', () => {
    expect(() => importConfigJson('{')).toThrow();
  });
});

describe('active profile 读写', () => {
  function makePage() {
    return {
      name: 'A',
      urlPattern: '/a',
      profiles: {
        default: { fields: [] },
        demo: { fields: [] },
      },
    };
  }

  it('未持久化时返回 default', () => {
    expect(getActiveProfile(makePage())).toBe('default');
  });

  it('没有 default 时返回第一个 key', () => {
    const p = { name: 'B', urlPattern: '/b', profiles: { alpha: {}, beta: {} } };
    expect(getActiveProfile(p)).toBe('alpha');
  });

  it('没有 profiles 时返回 null', () => {
    expect(getActiveProfile({ name: 'C', urlPattern: '/c' })).toBeNull();
  });

  it('setActiveProfile 后 getActiveProfile 读到该值', () => {
    const p = makePage();
    expect(setActiveProfile(p, 'demo')).toBe(true);
    expect(getActiveProfile(p)).toBe('demo');
  });

  it('setActiveProfile 接受无效名称返回 false', () => {
    const p = makePage();
    expect(setActiveProfile(p, 'nope')).toBe(false);
    expect(getActiveProfile(p)).toBe('default'); // 未变
  });

  it('持久化值指向已删除的 profile 时回退到 default', () => {
    const p = makePage();
    setActiveProfile(p, 'demo');
    delete p.profiles.demo;
    expect(getActiveProfile(p)).toBe('default');
  });

  it('listProfiles 按对象 key 顺序返回', () => {
    expect(listProfiles(makePage())).toEqual(['default', 'demo']);
  });

  it('不同 page name 各自独立存储', () => {
    const p1 = { name: 'X', urlPattern: '/x', profiles: { default: {}, a: {} } };
    const p2 = { name: 'Y', urlPattern: '/y', profiles: { default: {}, a: {} } };
    setActiveProfile(p1, 'a');
    expect(getActiveProfile(p1)).toBe('a');
    expect(getActiveProfile(p2)).toBe('default');
  });

  it('localStorage 中 raw 是非法 JSON 时静默回退 default', () => {
    const p = makePage();
    setActiveProfile(p, 'demo');
    localStorage.setItem(PROFILE_STORAGE_KEY, '{not-json');
    expect(getActiveProfile(p)).toBe('default');
  });
});
