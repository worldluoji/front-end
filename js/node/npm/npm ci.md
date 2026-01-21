# `npm ci` 和 `npm install`
`npm ci` 和 `npm install` 都是用于安装依赖的 npm 命令，但它们有**关键区别**，主要体现在安装策略、使用场景和性能上。

## 主要区别对比

| 特性 | `npm install` | `npm ci` |
|------|---------------|----------|
| **目标文件** | 读取 `package.json` | 读取 `package-lock.json` 或 `npm-shrinkwrap.json` |
| **安装策略** | 灵活解析依赖版本 | 严格锁定版本（完全匹配lock文件） |
| **Lock文件** | 会自动创建/更新 lock 文件 | 如果 lock 文件与 package.json 不一致，**会报错** |
| **Node_modules** | 增量安装/更新 | 先删除整个 node_modules 再重新安装 |
| **速度** | 相对较慢（需要解析依赖） | 通常更快（无需解析版本） |
| **适用环境** | 开发环境 | 生产/CI/CD 环境 |
| **输出日志** | 详细信息 | 更简洁的输出 |

## 详细解释

### 1. **npm install**
- **灵活安装**：根据 `package.json` 中的语义化版本范围（如 `^1.0.0`、`~2.3.0`）解析并安装最新兼容版本
- **更新 lock 文件**：安装过程中会更新 `package-lock.json` 文件
- **增量安装**：如果 node_modules 已存在，会尽量复用
- **使用场景**：
  - 本地开发时添加新包
  - 手动更新依赖版本
  - 日常开发工作

```bash
# 安装所有依赖
npm install

# 安装特定包（会更新 package.json 和 lock 文件）
npm install lodash

# 开发依赖
npm install --save-dev jest
```

### 2. **npm ci**
- **确定性安装**：严格按照 `package-lock.json` 或 `npm-shrinkwrap.json` 中的确切版本安装
- **严格检查**：如果 lock 文件与 package.json 不兼容，会报错并终止
- **清洁安装**：先删除整个 node_modules 文件夹，再重新安装
- **自动清理**：安装前不会检查现有 node_modules
- **使用场景**：
  - CI/CD 流水线
  - 生产环境部署
  - 需要确保环境完全一致的场景
  - 自动化测试环境

```bash
# 必须确保 package-lock.json 存在
npm ci

# 只安装生产依赖
npm ci --only=production
```

## 何时使用哪个？

### 使用 `npm install` 当：
- ✅ 在开发机器上工作
- ✅ 需要添加、更新或删除依赖
- ✅ 修改 package.json
- ✅ 创建初始的 lock 文件

### 使用 `npm ci` 当：
- ✅ 在 CI/CD 服务器上
- ✅ 部署到生产环境
- ✅ 需要确保所有环境完全一致
- ✅ 希望安装过程更快、更可靠
- ✅ 不想意外更新依赖版本

## 实际示例

```json
// package.json
{
  "dependencies": {
    "lodash": "^4.17.0"
  }
}
```

```json
// package-lock.json（部分）
{
  "lodash": {
    "version": "4.17.21"
  }
}
```

```bash
# npm install 可能会安装 4.17.21 或更新版本（如 4.17.22）
# 只要满足 ^4.17.0 的范围

# npm ci 只会安装 4.17.21（严格匹配 lock 文件）
```

## 最佳实践

1. **开发流程**：
   ```bash
   # 开发时使用 install
   npm install some-package
   
   # 提交 lock 文件到版本控制
   git add package-lock.json
   
   # CI/CD 中使用 ci
   npm ci
   ```

2. **确保一致性**：
   - 总是将 `package-lock.json` 提交到版本控制
   - 在自动化环境中使用 `npm ci`

3. **性能提示**：
   - 在 CI 中，`npm ci` 通常比 `npm install` 快 2-10 倍
   - 因为跳过了依赖解析阶段

## 注意事项
- 使用 `npm ci` 前必须确保 lock 文件存在且与 package.json 兼容
- `npm ci` 不会修改 package.json 或 lock 文件
- 如果 lock 文件过时，应使用 `npm install` 更新它

**简单总结**：开发时用 `npm install`，部署/测试时用 `npm ci`。这样可以兼顾开发的灵活性和部署的可靠性。