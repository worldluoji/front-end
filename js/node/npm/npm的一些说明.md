# npm 的一些说明

## 1. 库的版本号详解（`^` 和 `~` 的区别）

在 `package.json` 文件中，依赖的版本号通常使用 `^` 和 `~` 符号来指定版本范围。以下是一个示例：

```json
"dependencies": {
  "bluebird": "^3.3.4",
  "body-parser": "~1.15.2"
}
```

- **波浪符号（`~`）**：
  - 表示允许更新到当前 **次要版本（minor version）** 的最新版本。
  - 例如：`body-parser: ~1.15.2` 会匹配 `1.15.x` 的最新版本（如 `1.15.3`），但不会升级到 `1.16.0`。
  - 波浪符号曾经是 npm 安装时的默认符号，但现在已被插入符号取代。

- **插入符号（`^`）**：
  - 表示允许更新到当前 **主版本（major version）** 的最新版本。
  - 例如：`bluebird: ^3.3.4` 会匹配 `3.x.x` 的最新版本（如 `3.4.0`），但不会升级到 `4.0.0`。
  - 插入符号是 npm 目前的默认符号，提供了更大的灵活性。

> **注意**：版本号的格式为 `主版本.次版本.修订版本`（`Major.Minor.Patch`），遵循[语义化版本控制](https://semver.org/)。

---

## 2. `resolutions` 字段

`resolutions` 是 Yarn 提供的一个功能，用于强制锁定 npm 包的版本，解决依赖冲突问题。它可以在 `package.json` 中指定特定依赖的版本，覆盖其他依赖对该包的版本要求。

示例：
```json
"resolutions": {
  "lodash": "4.17.21"
}
```
注意事项：
- Yarn 专属功能：resolutions 是 Yarn 提供的功能，npm 不支持。如果你使用的是 npm，可以考虑使用 [overrides](./overrides.md)（npm 8+）或 npm-force-resolutions 插件来实现类似功能。
- 版本兼容性：强制锁定版本可能会导致某些依赖无法正常工作，因此在修改 resolutions 后需要充分测试。
- 临时解决方案：resolutions 通常是一个临时解决方案，建议在解决依赖冲突后，逐步优化依赖关系。

---

## 3. `peerDependencies` 字段

`peerDependencies` 是“同等依赖”或“同伴依赖”，用于指定当前包兼容的宿主环境版本。它通常用于解决插件与宿主依赖版本不一致的问题。

例如，`antd` 是一个基于 `react` 的 UI 组件库，但它要求宿主环境安装指定版本的 `react`。因此，`antd` 的 `package.json` 中会有如下配置：

```json
"peerDependencies": {
  "react": ">=16.0.0",
  "react-dom": ">=16.0.0"
}
```

这意味着，`antd` 要求宿主环境安装 `react` 和 `react-dom` 的版本必须大于或等于 `16.0.0`。
如果宿主环境没有安装 react 或 react-dom，或者安装的版本不符合要求，npm 会发出警告或报错。

在 npm v7 之前，peerDependencies 不会被自动安装。如果宿主环境没有安装所需的 peerDependencies，开发者需要手动安装。

然而，从 npm v7 开始，默认行为发生了变化：
- npm 会自动安装 peerDependencies。
- 如果项目中存在多个依赖对同一 peerDependency 的不同版本要求，npm 会尝试解决版本冲突。
- 如果无法解决冲突，npm 会中断安装过程并报错。

这种行为变化虽然提高了依赖管理的严谨性，但也带来了一些问题：
- 些老项目或依赖可能没有严格遵循语义化版本控制，导致 peerDependencies 冲突。
- 自动安装 peerDependencies 可能会引入不必要的依赖，增加项目的复杂性。

---

## 4. `npm install xxx --legacy-peer-deps` 命令

在 npm v7 中，默认会安装 `package.json` 中指定的 `peerDependencies`。这可能会导致版本冲突，从而中断安装过程。

`--legacy-peer-deps` 标志的作用是：
- 绕过 npm v7 的默认行为，恢复到 npm v6 及以下版本的处理方式。
- 不自动安装 peerDependencies，而是依赖宿主环境提供所需的 peerDependencies。
- 忽略 peerDependencies 的版本冲突，允许不同依赖对同一 peerDependency 的不同版本要求共存。

**使用场景**：当项目依赖的模块对同一依赖有不同版本要求时，可以使用此标志避免安装失败。

示例：
```bash
npm install some-package --legacy-peer-deps
```

注意事项：
- 手动管理 peerDependencies：使用 --legacy-peer-deps 后，你需要确保宿主环境安装了正确的 peerDependencies 版本，否则可能会导致运行时错误。
- 兼容性问题：某些依赖可能依赖于 npm v7 的自动安装行为，使用 --legacy-peer-deps 可能会导致这些依赖无法正常工作。
- 临时解决方案：--legacy-peer-deps 通常是一个临时解决方案，建议在解决依赖冲突后，逐步迁移到 npm v7 的默认行为。

---

## 5. `npm home` 和 `npm repo` 命令

当你想快速查看某个第三方库的主页或代码仓库时，可以使用以下命令：

- **打开库的主页**：
  ```bash
  npm home PACKAGE_NAME
  ```
  示例：
  ```bash
  npm home react
  ```

- **打开库的代码仓库**：
  ```bash
  npm repo PACKAGE_NAME
  ```
  示例：
  ```bash
  npm repo react
  ```

这两个命令可以帮助开发者快速访问库的文档和源码，提升开发效率。

---

## 总结

- **版本号控制**：`~` 和 `^` 分别控制次要版本和主版本的更新范围。
- **`resolutions`**：用于强制锁定依赖版本，解决版本冲突问题。
- **`peerDependencies`**：用于指定宿主环境的依赖版本，确保插件与宿主兼容。
- **`--legacy-peer-deps`**：解决 npm v7 中 `peerDependencies` 安装冲突的问题。
- **`npm home` 和 `npm repo`**：快速访问库的主页和代码仓库。

