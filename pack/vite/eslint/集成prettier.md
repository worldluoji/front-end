配置 ESLint 8.50.0 + Prettier，主要目标是：

- 使用 Prettier 进行代码格式化
- 让 ESLint 能识别 Prettier 的规则，并避免两者冲突（例如 `max-len`、`quotes` 等）

## 1. 安装必要依赖

在项目根目录执行：

```bash
npm install --save-dev prettier eslint-config-prettier eslint-plugin-prettier
```

- `prettier` – 核心格式化工具
- `eslint-config-prettier` – 关闭 ESLint 中与 Prettier 冲突的规则
- `eslint-plugin-prettier` – 将 Prettier 规则以 ESLint 规则形式运行（可选，但推荐）

## 2. 创建 Prettier 配置文件

在项目根目录新建 `.prettierrc.json`（或 `.prettierrc.js` / `.prettierrc.yaml`），示例：

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always"
}
```

可根据团队习惯调整。

## 3. 配置 ESLint（`.eslintrc.json`）

修改或创建 `.eslintrc.json`，加入 `prettier` 相关配置：

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:prettier/recommended"   // 这个组合会同时启用 eslint-plugin-prettier 和 eslint-config-prettier
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    // 你的自定义规则可以放在这里，但注意不要与 prettier 冲突
  }
}
```

`plugin:prettier/recommended` 相当于做了三件事：
- 启用 `eslint-plugin-prettier`
- 将 Prettier 规则作为 ESLint 规则（不符合 Prettier 格式的地方会报错）
- 通过 `eslint-config-prettier` 关闭所有可能与 Prettier 冲突的 ESLint 规则

## 4. 使用方式

- **单独使用 Prettier 格式化**：  
  ```bash
  npx prettier --write .
  ```
- **通过 ESLint 检查格式**：  
  ```bash
  npx eslint . --fix
  ```
  会自动修复可修复的格式问题（依赖 `eslint-plugin-prettier`）。

## 5. 解决可能的问题

### 5.1 与现有 ESLint 规则冲突
如果之前配置了 `quotes`、`semi`、`comma-dangle` 等规则，`eslint-config-prettier` 会自动禁用它们。但若你手动在 `rules` 中覆盖，可能会产生冲突。建议移除这些规则，或确保它们与 Prettier 一致。

### 5.2 编辑器集成（VS Code）
安装 Prettier 插件，并在 `.vscode/settings.json` 中设置：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": ["javascript", "javascriptreact", "typescript", "typescriptreact"],
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

这样保存时会先执行 ESLint 修复（包括 Prettier 规则），或者直接用 Prettier 格式化。

## 6. 验证配置

创建一个测试文件 `test.js`：

```javascript
const foo = "hello"
```

运行 `npx eslint test.js`，应该会报类似 `Replace "hello" with 'hello'` 或缺少分号的错误（取决于你的 Prettier 配置）。运行 `npx eslint --fix test.js` 后文件会被自动格式化。

---

**总结**：ESLint 8.50.0 集成 Prettier 的标准方案就是安装 `prettier` + `eslint-config-prettier` + `eslint-plugin-prettier`，并在 `.eslintrc.json` 的 `extends` 中加入 `"plugin:prettier/recommended"`。这样既能享受 Prettier 的格式化能力，又能保持 ESLint 检查的一致性。