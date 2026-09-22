/**
 * 配置页 UI
 * - Shadow DOM 隔离页面样式
 * - 全局设置（自动填充 / 快捷键）
 * - 页面配置列表 + 字段编辑
 * - 导入 / 导出 / 恢复默认 / 保存 / 测试填充
 */

import {
  loadStoredConfig,
  saveStoredConfig,
  clearStoredConfig,
  normalizeConfig,
  exportConfigJson,
  importConfigJson,
  getActiveProfile,
} from './config-storage.js';
import { DEFAULT_CONFIG } from './config.js';
import { FIELD_TYPES, getDefaultValueByType, getFieldTypeLabel } from './config-types.js';

const STYLES = `
* { box-sizing: border-box; }
:root, :host { all: initial; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; }

.backdrop {
  position: fixed; inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 2147483646;
  display: flex; align-items: center; justify-content: center;
}
.modal {
  width: 880px; max-width: 95vw; max-height: 90vh;
  background: #fff; color: #222;
  border-radius: 8px; box-shadow: 0 10px 40px rgba(0,0,0,.3);
  display: flex; flex-direction: column; overflow: hidden;
  font-size: 14px;
}
.header {
  padding: 12px 16px; background: #409eff; color: #fff;
  display: flex; justify-content: space-between; align-items: center;
}
.header h2 { margin: 0; font-size: 16px; font-weight: 600; }
.header button {
  background: transparent; color: #fff; border: 0; cursor: pointer;
  font-size: 20px; line-height: 1;
}
.tabs {
  display: flex; border-bottom: 1px solid #eee; background: #fafafa;
}
.tabs button {
  flex: 1; padding: 10px; border: 0; background: transparent; cursor: pointer;
  font-size: 14px; color: #606266;
}
.tabs button.active { background: #fff; color: #409eff; border-bottom: 2px solid #409eff; }
.body { flex: 1; overflow: auto; padding: 16px; }
.footer {
  padding: 12px 16px; border-top: 1px solid #eee; background: #fafafa;
  display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;
}
.btn {
  padding: 6px 14px; border: 1px solid #dcdfe6; background: #fff; border-radius: 4px;
  cursor: pointer; font-size: 13px; color: #606266;
}
.btn:hover { border-color: #409eff; color: #409eff; }
.btn.primary { background: #409eff; color: #fff; border-color: #409eff; }
.btn.primary:hover { background: #66b1ff; color: #fff; }
.btn.danger { color: #f56c6c; border-color: #fbc4c4; }
.btn.danger:hover { background: #f56c6c; color: #fff; }
.btn.sm { padding: 3px 8px; font-size: 12px; }

.form-row { display: flex; align-items: center; margin-bottom: 12px; gap: 8px; }
.form-row label { width: 110px; color: #606266; flex-shrink: 0; }
.form-row input[type=text], .form-row input[type=number], .form-row select, .form-row textarea {
  flex: 1; padding: 6px 10px; border: 1px solid #dcdfe6; border-radius: 4px;
  font-size: 13px;
}
.form-row textarea { min-height: 60px; resize: vertical; font-family: inherit; }
.form-row .hint { color: #909399; font-size: 12px; }

.split { display: flex; gap: 16px; height: 100%; }
.list-pane { width: 240px; border-right: 1px solid #eee; padding-right: 12px; display: flex; flex-direction: column; }
.list-pane .list { flex: 1; overflow: auto; margin-bottom: 8px; }
.list-item {
  padding: 8px 10px; border-radius: 4px; cursor: pointer; margin-bottom: 4px;
  border: 1px solid transparent;
}
.list-item:hover { background: #f5f7fa; }
.list-item.active { background: #ecf5ff; border-color: #b3d8ff; color: #409eff; }
.list-item .name { font-weight: 500; }
.list-item .url { font-size: 11px; color: #909399; margin-top: 2px; word-break: break-all; }
.detail-pane { flex: 1; overflow: auto; }

.fields-table { width: 100%; border-collapse: collapse; margin-top: 8px; table-layout: fixed; }
.fields-table th { text-align: left; padding: 6px; background: #f5f7fa; font-size: 12px; color: #606266; font-weight: 600; }
.fields-table td { padding: 4px; border-bottom: 1px solid #eee; vertical-align: top; }
.fields-table input, .fields-table select {
  width: 100%; padding: 4px 6px; border: 1px solid #dcdfe6; border-radius: 3px; font-size: 12px;
  box-sizing: border-box; min-width: 0;
}
.fields-table input[data-field="selector"] {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 12px;
}
.fields-table .type-col { width: 140px; }
.fields-table .selector-col { width: auto; }
.fields-table .value-col { width: 200px; }
.fields-table .act-col { width: 70px; text-align: center; }
.fields-table .hint { color: #909399; font-size: 11px; margin-top: 2px; word-wrap: break-word; }
.fields-table .value-col .hint { white-space: normal; }

.empty { color: #909399; text-align: center; padding: 40px 0; font-size: 13px; }

.profile-tabs {
  display: flex; gap: 6px; align-items: center;
  margin: 0 0 8px 0; flex-wrap: wrap;
}
.profile-tab {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 10px; border: 1px solid #dcdfe6; background: #fff; border-radius: 14px;
  cursor: pointer; font-size: 12px; color: #606266;
  user-select: none;
}
.profile-tab:hover { border-color: #409eff; color: #409eff; }
.profile-tab.active { background: #409eff; color: #fff; border-color: #409eff; }
.profile-tab .badge {
  font-size: 10px; padding: 1px 5px; border-radius: 8px;
  background: #67c23a; color: #fff;
}
.profile-tab.active .badge { background: rgba(255,255,255,.3); }
.profile-tab .x {
  margin-left: 2px; color: #f56c6c; font-weight: 700; opacity: 0.6;
}
.profile-tab.active .x { color: #fff; opacity: 0.8; }
.profile-tab .x:hover { opacity: 1; }
.profile-tabs .add-btn {
  border-style: dashed; background: transparent;
}
.profile-hint { color: #909399; font-size: 11px; margin-bottom: 8px; }

.shortcut-group { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
.shortcut-group label { width: auto; display: inline-flex; align-items: center; gap: 4px; }

.toast {
  position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
  background: rgba(0,0,0,.8); color: #fff; padding: 8px 16px; border-radius: 4px;
  font-size: 13px; z-index: 2147483647;
}
.toast.error { background: #f56c6c; }
.toast.success { background: #67c23a; }
`;

/**
 * 打开配置页（同一时间只允许一个实例）
 */
let activeHost = null;

export function openConfigUI() {
  if (activeHost) {
    activeHost.remove();
    activeHost = null;
  }

  const initial = loadStoredConfig()
    ? normalizeConfig(loadStoredConfig())
    : structuredClone(DEFAULT_CONFIG);

  const state = {
    config: initial,
    activePageIndex: 0,
    activeTab: 'global',
    // UI 当前编辑的 profile 索引（按对象 key 顺序），按 pageIdx 缓存
    activeProfileIndexByPage: {},
  };

  function getPageProfileKeys(page) {
    if (!page || !page.profiles) return [];
    return Object.keys(page.profiles);
  }

  function getEditingProfileKey(pageIdx) {
    const page = state.config.PAGE_CONFIGS[pageIdx];
    if (!page) return null;
    const keys = getPageProfileKeys(page);
    if (keys.length === 0) return null;
    let idx = state.activeProfileIndexByPage[pageIdx];
    if (!Number.isInteger(idx) || idx < 0 || idx >= keys.length) {
      idx = 0;
      state.activeProfileIndexByPage[pageIdx] = idx;
    }
    return keys[idx];
  }

  function setEditingProfileIndex(pageIdx, idx) {
    state.activeProfileIndexByPage[pageIdx] = idx;
  }

  const host = document.createElement('div');
  host.setAttribute('data-autofill-config-ui', '');
  const shadow = host.attachShadow({ mode: 'open' });
  const style = document.createElement('style');
  style.textContent = STYLES;
  shadow.appendChild(style);

  const root = document.createElement('div');
  root.className = 'backdrop';
  shadow.appendChild(root);

  function render() {
    root.innerHTML = `
      <div class="modal" role="dialog" aria-label="自动填充配置">
        <div class="header">
          <h2>⚙ 自动填充配置</h2>
          <button type="button" data-act="close" aria-label="关闭">×</button>
        </div>
        <div class="tabs">
          <button type="button" data-tab="global">全局设置</button>
          <button type="button" data-tab="pages">页面配置</button>
        </div>
        <div class="body"></div>
        <div class="footer">
          <button type="button" class="btn" data-act="import">导入 JSON</button>
          <button type="button" class="btn" data-act="export">导出 JSON</button>
          <button type="button" class="btn danger" data-act="reset">恢复默认</button>
          <span style="flex:1"></span>
          <button type="button" class="btn" data-act="test">测试填充</button>
          <button type="button" class="btn" data-act="cancel">取消</button>
          <button type="button" class="btn primary" data-act="save">保存</button>
        </div>
      </div>
    `;
    // 恢复 tab 激活态
    root
      .querySelectorAll('.tabs button')
      .forEach((b) =>
        b.classList.toggle('active', b.dataset.tab === state.activeTab)
      );
    const body = root.querySelector('.body');
    if (state.activeTab === 'global') {
      body.innerHTML = renderGlobal(state.config);
    } else {
      body.innerHTML = renderPages(state.config, state.activePageIndex);
    }
  }

  function renderGlobal(cfg) {
    const s = cfg.SHORTCUT || {};
    return `
      <div class="form-row">
        <label>页面加载自动填充</label>
        <label style="width:auto"><input type="checkbox" data-bind="AUTO_FILL_ON_LOAD" ${cfg.AUTO_FILL_ON_LOAD ? 'checked' : ''}/> 开启后等待元素出现自动填</label>
      </div>
      <div class="form-row">
        <label>快捷键触发键</label>
        <input type="text" data-bind="SHORTCUT.key" value="${escapeAttr(s.key || '')}" maxlength="1" style="width:60px;text-transform:uppercase"/>
        <span class="hint">单个字母（A-Z）</span>
      </div>
      <div class="form-row">
        <label>修饰键</label>
        <div class="shortcut-group">
          <label><input type="checkbox" data-bind="SHORTCUT.ctrl" ${s.ctrl ? 'checked' : ''}/> Ctrl</label>
          <label><input type="checkbox" data-bind="SHORTCUT.alt" ${s.alt ? 'checked' : ''}/> Alt</label>
          <label><input type="checkbox" data-bind="SHORTCUT.shift" ${s.shift ? 'checked' : ''}/> Shift</label>
          <label><input type="checkbox" data-bind="SHORTCUT.meta" ${s.meta ? 'checked' : ''}/> Meta (Cmd/Win)</label>
        </div>
      </div>
      <div class="form-row">
        <label>说明</label>
        <span class="hint">快捷键在输入框聚焦时不触发，避免误触。</span>
      </div>
    `;
  }

  function renderPages(cfg, activeIdx) {
    const pages = cfg.PAGE_CONFIGS || [];
    const active = pages[activeIdx];
    return `
      <div class="split">
        <div class="list-pane">
          <div class="list">
            ${pages.length === 0
              ? '<div class="empty">还没有配置，点击下方新增</div>'
              : pages
                  .map(
                    (p, i) => `
                <div class="list-item ${i === activeIdx ? 'active' : ''}" data-page="${i}">
                  <div class="name">${escapeHtml(p.name || '(未命名)')}</div>
                  <div class="url">${escapeHtml(String(p.urlPattern ?? ''))}</div>
                </div>
              `
                  )
                  .join('')}
          </div>
          <button type="button" class="btn primary sm" data-act="add-page">+ 新增页面</button>
        </div>
        <div class="detail-pane">
          ${
            active
              ? renderPageDetail(active, activeIdx)
              : '<div class="empty">请选择左侧一个页面进行编辑</div>'
          }
        </div>
      </div>
    `;
  }

  function renderPageDetail(page, idx) {
    const profileKeys = getPageProfileKeys(page);
    const editingKey = getEditingProfileKey(idx);
    const editingIdx = state.activeProfileIndexByPage[idx] || 0;
    const profile = editingKey ? page.profiles[editingKey] : null;
    const fields = profile?.fields || [];
    const persistedActive = getActiveProfile(page);
    const tabs = profileKeys
      .map((k, ki) => {
        const isEditing = ki === editingIdx;
        const isPersisted = k === persistedActive;
        const canDel = profileKeys.length > 1;
        return `
          <span class="profile-tab ${isEditing ? 'active' : ''}" data-act="select-profile" data-idx="${idx}" data-pi="${ki}" title="${escapeAttr(k)}${isPersisted ? '（运行时激活）' : ''}">
            <span class="name">${escapeHtml(k)}</span>
            ${isPersisted ? '<span class="badge">激活</span>' : ''}
            ${canDel ? `<span class="x" data-act="del-profile" data-idx="${idx}" data-pi="${ki}" title="删除此 profile">×</span>` : ''}
          </span>
        `;
      })
      .join('');
    return `
      <div class="form-row">
        <label>页面名称</label>
        <input type="text" data-page-field="name" data-idx="${idx}" value="${escapeAttr(page.name || '')}"/>
      </div>
      <div class="form-row">
        <label>URL 匹配</label>
        <input type="text" data-page-field="urlPattern" data-idx="${idx}" value="${escapeAttr(String(page.urlPattern ?? ''))}"/>
        <span class="hint">字符串包含匹配，或 <code>/regex/</code></span>
      </div>
      <div class="form-row" style="align-items:flex-start">
        <label>Profiles</label>
        <div style="flex:1">
          <div class="profile-tabs">
            ${tabs}
            <span class="profile-tab add-btn" data-act="add-profile" data-idx="${idx}" title="新建 profile">+ 新建</span>
          </div>
          <div class="profile-hint">编辑中的 profile：<b>${escapeHtml(editingKey || '')}</b>。运行时激活态（持久化）以 <span style="color:#67c23a">激活</span> 标记为准，可由快捷键循环切换。</div>
          <table class="fields-table">
            <colgroup>
              <col class="type-col"><col class="selector-col"><col class="value-col"><col class="act-col">
            </colgroup>
            <thead>
              <tr><th class="type-col">类型</th><th class="selector-col">选择器 (CSS)</th><th class="value-col">值</th><th class="act-col">操作</th></tr>
            </thead>
            <tbody>
              ${fields.map((f, fi) => renderFieldRow(f, idx, fi)).join('')}
              ${
                fields.length === 0
                  ? '<tr><td colspan="4" class="empty" style="padding:16px">当前 profile 还没有字段，点击下方新增</td></tr>'
                  : ''
              }
            </tbody>
          </table>
          <button type="button" class="btn sm" data-act="add-field" data-idx="${idx}" style="margin-top:8px">+ 新增字段</button>
          <button type="button" class="btn danger sm" data-act="del-page" data-idx="${idx}" style="margin-top:8px;float:right">删除此页面</button>
        </div>
      </div>
    `;
  }

  function renderFieldRow(field, pageIdx, fieldIdx) {
    const type = field.type || 'input';
    const opts = FIELD_TYPES.map(
      (t) =>
        `<option value="${t.value}" ${t.value === type ? 'selected' : ''}>${escapeHtml(t.label)}</option>`
    ).join('');
    return `
      <tr data-field-row="${fieldIdx}">
        <td class="type-col">
          <select data-field="type" data-pi="${pageIdx}" data-fi="${fieldIdx}">${opts}</select>
        </td>
        <td class="selector-col">
          <input type="text" data-field="selector" data-pi="${pageIdx}" data-fi="${fieldIdx}" value="${escapeAttr(field.selector || '')}" placeholder="#id / .class / [name=...]"/>
          <div class="hint">${escapeHtml(valueHint(type))}</div>
        </td>
        <td class="value-col">
          ${renderValueInput(field, pageIdx, fieldIdx)}
        </td>
        <td class="act-col">
          <button type="button" class="btn danger sm" data-act="del-field" data-pi="${pageIdx}" data-fi="${fieldIdx}">删除</button>
        </td>
      </tr>
    `;
  }

  function renderValueInput(field, pageIdx, fieldIdx) {
    const v = field.value;
    const t = field.type || 'input';
    const baseAttrs = `data-field="value" data-pi="${pageIdx}" data-fi="${fieldIdx}"`;
    if (t === 'switch') {
      const checked = !!v ? 'checked' : '';
      return `<label style="display:flex;align-items:center;gap:6px;padding-top:6px"><input type="checkbox" ${baseAttrs} ${checked}/> ${escapeHtml(getFieldTypeLabel(t))}</label>`;
    }
    if (t === 'checkbox') {
      // 兼容 bool（单元素）和 数组（组多选）：用文本框 + 占位符提示两种用法
      let displayValue;
      if (typeof v === 'boolean') displayValue = v ? 'true' : 'false';
      else if (Array.isArray(v)) displayValue = JSON.stringify(v);
      else displayValue = String(v ?? '');
      return `<input type="text" ${baseAttrs} value="${escapeAttr(displayValue)}" placeholder="true / false  或  [&quot;a&quot;,&quot;b&quot;]"/>`;
    }
    if (t === 'radio') {
      // 单个 radio 文本框：true 或匹配 value 的字符串；组内也是字符串匹配
      let displayValue;
      if (typeof v === 'boolean') displayValue = v ? 'true' : 'false';
      else displayValue = String(v ?? '');
      return `<input type="text" ${baseAttrs} value="${escapeAttr(displayValue)}" placeholder="true 或 radio 的 value"/>`;
    }
    if (t === 'range' || t === 'slider' || t === 'input-number') {
      return `<input type="number" ${baseAttrs} value="${escapeAttr(String(v ?? 0))}"/>`;
    }
    if (t === 'cascader') {
      const arrStr = JSON.stringify(v || []);
      return `<input type="text" ${baseAttrs} value='${escapeAttr(arrStr)}' placeholder='["level1","level2"]'/><div class="hint">字符串（单值路径）或 JSON 数组</div>`;
    }
    return `<input type="text" ${baseAttrs} value="${escapeAttr(String(v ?? ''))}"/>`;
  }

  function valueHint(type) {
    switch (type) {
      case 'select':
        return 'value 匹配 data-value 或选项文本';
      case 'radio':
        return 'true 选中该 radio；其他值匹配 input.value；组内按 value/label';
      case 'checkbox':
        return 'true / false 切换；JSON 数组勾选复选框组';
      case 'switch':
        return 'true / false';
      case 'range':
      case 'slider':
      case 'input-number':
        return '数字';
      case 'cascader':
        return '字符串（取匹配路径）或 ["level1","level2"]';
      case 'date':
      case 'datetime':
      case 'time':
        return '字符串，如 2026-09-21 / 12:30:00';
      default:
        return '';
    }
  }

  // ---------- 事件绑定 ----------

  function showToast(text, type = '') {
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.textContent = text;
    shadow.appendChild(t);
    setTimeout(() => t.remove(), 2200);
  }

  function bindGlobal() {
    shadow.addEventListener('input', (e) => {
      const t = e.target;
      const bind = t.dataset.bind;
      if (!bind) return;
      if (t.type === 'checkbox') {
        setPath(state.config, bind, t.checked);
      } else if (t.type === 'number') {
        setPath(state.config, bind, Number(t.value));
      } else {
        setPath(state.config, bind, t.value);
      }
    });
  }

  function bindTabs() {
    root.querySelectorAll('.tabs button').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.activeTab = btn.dataset.tab;
        render();
      });
    });
  }

  function bindActions() {
    shadow.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-act]');
      if (!btn) return;
      const act = btn.dataset.act;
      switch (act) {
        case 'close':
        case 'cancel':
          closeUI();
          return;
        case 'save':
          onSave();
          return;
        case 'test':
          onTest();
          return;
        case 'reset':
          if (confirm('恢复默认配置？当前保存的配置会被覆盖。')) {
            state.config = structuredClone(DEFAULT_CONFIG);
            state.activePageIndex = 0;
            render();
            showToast('已恢复默认（未保存）', 'success');
          }
          return;
        case 'export':
          onExport();
          return;
        case 'import':
          onImport();
          return;
        case 'add-page':
          state.config.PAGE_CONFIGS.push({
            name: `新页面 ${state.config.PAGE_CONFIGS.length + 1}`,
            urlPattern: '',
            fields: [],
          });
          state.activePageIndex = state.config.PAGE_CONFIGS.length - 1;
          render();
          return;
        case 'del-page': {
          const idx = Number(btn.dataset.idx);
          if (confirm('删除此页面？')) {
            state.config.PAGE_CONFIGS.splice(idx, 1);
            state.activePageIndex = Math.max(0, idx - 1);
            render();
          }
          return;
        }
        case 'add-field': {
          const idx = Number(btn.dataset.idx);
          const page = state.config.PAGE_CONFIGS[idx];
          if (!page) return;
          const k = getEditingProfileKey(idx);
          if (!k) return;
          page.profiles[k].fields = page.profiles[k].fields || [];
          page.profiles[k].fields.push({
            selector: '',
            value: getDefaultValueByType('input'),
            type: 'input',
          });
          render();
          return;
        }
        case 'del-field': {
          const pi = Number(btn.dataset.pi);
          const fi = Number(btn.dataset.fi);
          const page = state.config.PAGE_CONFIGS[pi];
          if (!page) return;
          const k = getEditingProfileKey(pi);
          if (!k || !page.profiles[k].fields) return;
          page.profiles[k].fields.splice(fi, 1);
          render();
          return;
        }
        case 'add-profile': {
          const idx = Number(btn.dataset.idx);
          const page = state.config.PAGE_CONFIGS[idx];
          if (!page) return;
          const baseName = 'profile';
          let name = baseName;
          let i = 1;
          while (page.profiles[name]) {
            i += 1;
            name = `${baseName}${i}`;
          }
          page.profiles[name] = { fields: [] };
          const keys = getPageProfileKeys(page);
          setEditingProfileIndex(idx, keys.length - 1);
          render();
          return;
        }
        case 'del-profile': {
          e.stopPropagation();
          const idx = Number(btn.dataset.idx);
          const pi = Number(btn.dataset.pi);
          const page = state.config.PAGE_CONFIGS[idx];
          if (!page) return;
          const keys = getPageProfileKeys(page);
          if (keys.length <= 1) return;
          const removeKey = keys[pi];
          if (!confirm(`删除 profile “${removeKey}”？其所有字段会丢失。`)) return;
          delete page.profiles[removeKey];
          // 编辑索引回退
          const cur = state.activeProfileIndexByPage[idx] || 0;
          if (cur >= pi) {
            setEditingProfileIndex(idx, Math.max(0, cur - 1));
          }
          render();
          return;
        }
      }
    });

    // 切换选中页面 / 选中 profile
    shadow.addEventListener('click', (e) => {
      const item = e.target.closest('[data-page]');
      if (item && !e.target.closest('[data-act="select-profile"]') && !e.target.closest('[data-act="del-profile"]')) {
        const idx = Number(item.dataset.page);
        if (Number.isFinite(idx) && idx !== state.activePageIndex) {
          state.activePageIndex = idx;
          render();
        }
      }
      const selectTab = e.target.closest('[data-act="select-profile"]');
      if (selectTab) {
        const idx = Number(selectTab.dataset.idx);
        const pi = Number(selectTab.dataset.pi);
        if (Number.isFinite(idx) && Number.isFinite(pi)) {
          setEditingProfileIndex(idx, pi);
          render();
        }
      }
    });

    // 字段编辑：input / change
    shadow.addEventListener('input', (e) => {
      const t = e.target;
      if (t.dataset.pageField) {
        const idx = Number(t.dataset.idx);
        const page = state.config.PAGE_CONFIGS[idx];
        if (!page) return;
        page[t.dataset.pageField] = t.value;
        // urlPattern 变化时刷新左侧列表
        if (t.dataset.pageField === 'urlPattern' || t.dataset.pageField === 'name') {
          const listItem = root.querySelector(`[data-page="${idx}"] .${t.dataset.pageField === 'name' ? 'name' : 'url'}`);
          if (listItem) listItem.textContent = t.value;
        }
        return;
      }
      if (t.dataset.field) {
        const pi = Number(t.dataset.pi);
        const fi = Number(t.dataset.fi);
        const page = state.config.PAGE_CONFIGS[pi];
        if (!page) return;
        const k = getEditingProfileKey(pi);
        if (!k || !page.profiles[k] || !page.profiles[k].fields[fi]) return;
        const f = page.profiles[k].fields[fi];
        const key = t.dataset.field;
        if (key === 'type') {
          f.type = t.value;
          // 切换类型时，重置 value 为该类型默认值（保留用户意图：如果旧 value 是该类型的合法值，保留）
          f.value = getDefaultValueByType(t.value);
          render();
          return;
        }
        if (key === 'value') {
          if (t.type === 'checkbox') {
            f.value = t.checked;
          } else if (t.type === 'number') {
            f.value = t.value === '' ? 0 : Number(t.value);
          } else if (f.type === 'cascader') {
            try {
              f.value = JSON.parse(t.value);
            } catch {
              // 解析中时暂存原值，避免破坏
              return;
            }
          } else if (f.type === 'checkbox') {
            // 文本框：true / false（单元素）或 ["a","b"]（组多选）
            const raw = (t.value || '').trim();
            if (raw === 'true') f.value = true;
            else if (raw === 'false') f.value = false;
            else if (raw === '') f.value = false;
            else if (raw.startsWith('[')) {
              try {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed)) {
                  f.value = parsed;
                } else {
                  f.value = raw; // 非数组，留作字符串
                }
              } catch {
                f.value = raw; // JSON 未完成，暂存
              }
            } else {
              // 普通字符串：作为 group 内 label/value 匹配用
              f.value = raw;
            }
          } else {
            f.value = t.value;
          }
          return;
        }
        f[key] = t.value;
      }
    });
  }

  function onSave() {
    if (saveStoredConfig(state.config)) {
      // 通知页面重新加载配置
      window.dispatchEvent(new CustomEvent('autofill:config-updated'));
      showToast('已保存', 'success');
    } else {
      showToast('保存失败', 'error');
    }
  }

  function onTest() {
    // 临时把当前 UI 内配置应用到 window，再触发填充
    window.__AUTOFILL_CONFIG__ = state.config;
    const editingKey = getEditingProfileKey(state.activePageIndex);
    window.dispatchEvent(
      new CustomEvent('autofill:execute-fill', { detail: { profile: editingKey } })
    );
  }

  function onExport() {
    const json = exportConfigJson(state.config);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `autofill-config-${Date.now()}.json`;
    shadow.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('已导出', 'success');
  }

  function onImport() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.addEventListener('change', () => {
      const file = input.files && input.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const imported = importConfigJson(reader.result);
          state.config = imported;
          state.activePageIndex = 0;
          render();
          showToast('已导入（未保存）', 'success');
        } catch (e) {
          showToast(`导入失败：${e.message}`, 'error');
        }
      };
      reader.readAsText(file);
    });
    shadow.appendChild(input);
    input.click();
  }

  function closeUI() {
    host.remove();
    if (activeHost === host) activeHost = null;
  }

  // ---------- 工具 ----------

  function setPath(obj, path, value) {
    const keys = path.split('.');
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) {
      if (cur[keys[i]] == null || typeof cur[keys[i]] !== 'object') cur[keys[i]] = {};
      cur = cur[keys[i]];
    }
    cur[keys[keys.length - 1]] = value;
  }

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) {
    return escapeHtml(s);
  }

  // ---------- 启动 ----------

  render();
  bindTabs();
  bindGlobal();
  bindActions();

  document.body.appendChild(host);
  activeHost = host;
}

/**
 * 创建浮动按钮
 */
export function mountFloatingButton() {
  if (!document.body) return;
  if (document.querySelector('[data-autofill-fab]')) return;

  const btn = document.createElement('button');
  btn.setAttribute('data-autofill-fab', '');
  btn.textContent = '⚙ 自动填充配置';
  btn.title = 'Cmd+Ctrl+Shift+K (Win: Win+Ctrl+Shift+K)';
  btn.style.cssText = [
    'position:fixed',
    'bottom:24px',
    'right:24px',
    'z-index:2147483647',
    'padding:10px 18px',
    'border:0',
    'border-radius:24px',
    'background:#409eff',
    'color:#fff',
    'cursor:pointer',
    'box-shadow:0 4px 16px rgba(64,158,255,.5)',
    'font:600 13px/1 -apple-system,BlinkMacSystemFont,sans-serif',
    'transition:transform .15s',
  ].join(';');
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
  btn.addEventListener('click', () => openConfigUI());
  document.body.appendChild(btn);
}
