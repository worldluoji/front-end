# happy-dom

## 是什么

[happy-dom](https://github.com/capricorn86/happy-dom) 是一个用 JavaScript 实现的**轻量级浏览器环境**（DOM、Window、Document、Element、Event、MutationObserver 等 Web API），不依赖真实浏览器进程，启动快、单测跑得快。**

和 jsdom 同类，但 happy-dom 更快、对现代 Web API 支持更全、对 ESM 友好。代价是覆盖率略低 —— 少数边角 API 行为和真实浏览器不完全一致。

## 在本项目的使用场景

仅一处：单测的 environment。

**`vitest.config.js`**
```js
test: {
  environment: 'happy-dom',
}
```

**为什么需要它：** 本项目源码（`src/`）依赖大量 Web API —— `document.querySelector`、`MutationObserver`、DOM 事件派发、`el.value = x` 这种 setter patch 拦截。Vitest 跑 Node，本身没有这些 API，必须选一个 DOM 环境。happy-dom 比 jsdom 快，比真实浏览器（Playwright/Puppeteer）轻量，对纯逻辑测试刚好够用。

**`package.json`**
```json
"devDependencies": {
  "happy-dom": "^15.11.0",
  ...
}
```

## 跟真实浏览器的差异（项目里踩过的坑）

测试代码遇到 happy-dom 与真实浏览器行为不同时，会加 `"happy-dom"` 关键字注释，便于识别。已知的几个：

| 场景 | 真实浏览器 | happy-dom | 项目里怎么处理 |
|---|---|---|---|
| `input.click()` 切 checkbox.checked | 同时派 `change` | 切 checked 但不派 change | `fillElCheckbox` 里手动 `dispatchEvent(new Event('change', ...))` 兜底 |
| `MutationObserver` 回调 | 微任务异步 | 微任务异步 | `wait(0)` / `await wait(interval)` 等回调跑完 |
| 默认 location | 当前 URL | `about:blank` | `core.test.js` 里 `beforeEach` 调 `replaceState({}, '', '/')` 重置 |
| 默认 viewport | 视口尺寸 | 1024x768 | `config-ui.test.js` 用 `parseInt(btn.style.left) > 800` 这种绝对值断言 |
| `dispatchEvent` 触发 `clickoutside` 等指令 | Element Plus 内部监听 | 不一定完整复刻 EP 的 clickoutside 行为 | `element-plus.test.js` 里用"智能 mock"自己挂监听模拟 EP 行为 |

## 不适用场景

需要真实浏览器特性的测试不能用 happy-dom：

- 跨 iframe 通信
- WebGL / Canvas 渲染
- 真实键盘 / 鼠标 / 触摸事件链路（happy-dom 只支持 `dispatchEvent` 模拟）
- 真实 EP / Vue / React 在浏览器里的生命周期和 ref 行为

如果哪天需要这类测试，加 Playwright 作为 Vitest 的另一个 environment；happy-dom 跑逻辑测试，Playwright 跑端到端。

## 相关文件

- `vitest.config.js` — 配置 environment
- `package.json` — devDependency
- `src/fillers/native.js`、`src/fillers/element-plus.js` — `// happy-dom：...` 注释的位置
- `test/*.test.js` — 所有测试都跑在 happy-dom 下