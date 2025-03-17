# npm vs yarn

## Yarn 是什么？

Yarn 是由 Facebook、Google、Exponent 和 Tilde 联合推出的一款新的 JavaScript 包管理工具。正如官方文档所述，Yarn 的出现是为了弥补 npm 的一些缺陷。以下是一些使用 npm 时常见的痛点：

- **安装速度慢**：`npm install` 的速度较慢，尤其是在拉取新项目或重新安装 `node_modules` 时，等待时间较长。
- **版本不一致**：由于 `package.json` 中版本号的灵活性，不同开发者可能会安装到不同的依赖版本，导致项目在不同环境下表现不一致。例如：
  - `"5.0.3"`：安装指定的 5.0.3 版本。
  - `"~5.0.3"`：安装 5.0.X 中最新的版本。
  - `"^5.0.3"`：安装 5.X.X 中最新的版本。
- **错误处理不友好**：在安装过程中，如果某个包抛出错误，npm 会继续安装其他包，导致错误信息被淹没在大量日志中，开发者可能难以察觉。

## Yarn 的优点

1. **速度快**：
   - **并行安装**：Yarn 采用并行安装策略，而 npm 是按队列顺序安装，因此 Yarn 的安装速度更快。
   - **离线模式**：如果之前安装过某个包，Yarn 会从缓存中直接获取，无需重新下载。

2. **版本一致性**：
   - Yarn 通过 `yarn.lock` 文件锁定依赖版本，确保每次安装时使用的都是相同的版本。
   - npm 虽然也有类似的 `npm-shrinkwrap.json` 文件，但需要手动生成，而 Yarn 默认会自动生成锁定文件。

3. **简洁的输出**：
   - Yarn 的输出信息简洁明了，结合 emoji 直观展示安装进度和结果，而 npm 的输出较为冗长。

4. **多注册来源处理**：
   - Yarn 会从统一的注册源安装依赖，避免因不同库间接引用导致的版本混乱。

5. **更好的语义化命令**：
   - Yarn 的命令更直观，例如 `yarn add` 和 `yarn remove` 比 npm 的 `install` 和 `uninstall` 更易理解。

## Yarn 和 npm 命令对比

| npm 命令                          | Yarn 命令                          |
|-----------------------------------|------------------------------------|
| `npm install`                     | `yarn`                             |
| `npm install react --save`        | `yarn add react`                   |
| `npm uninstall react --save`      | `yarn remove react`                |
| `npm install react --save-dev`    | `yarn add react --dev`             |
| `npm update --save`               | `yarn upgrade`                     |
| `npm list undici`                 | `yarn why undici`（查看依赖树）    |

## npm 的未来：npm 5.0

在 Yarn 的压力下，npm 5.0 也进行了一系列改进：

- **默认生成 `package-lock.json`**：类似于 Yarn 的 `yarn.lock`，确保依赖版本一致性。
- **Git 依赖优化**：支持直接安装 Git 仓库中的依赖，方便使用未发布的版本。
- **文件依赖优化**：使用符号链接（symlinks）代替文件拷贝，提升安装速度。目前 Yarn 还不支持此功能。

## npx 是什么？

npx 是 npm 5.2 版本后引入的一个工具，用于执行 Node.js 包。它的主要功能包括：

1. **自动查找本地依赖**：如果本地项目中已安装该包，npx 会直接执行。
2. **自动安装并执行**：如果包未安装，npx 会自动安装最新版本并执行。
3. **跳过安装**：通过 `--no-install` 参数，npx 可以仅执行已安装的包，而不进行安装。

## 常见问题：npm 安装报错 `CERT_HAS_EXPIRED`

近期有开发者遇到 `npm ERR! code CERT_HAS_EXPIRED` 错误，原因是 npm 淘宝镜像的 HTTPS 证书过期。解决方法如下：

1. 清除 npm 缓存：
   ```bash
   npm cache clean --force
   ```
2. 关闭严格 HTTPS 验证：
   ```bash
   npm config set strict-ssl false
   ```
3. 重新安装依赖：
   ```bash
   npm install
   ```

## 总结

在 npm 5.0 之前，Yarn 的优势非常明显。然而，随着 npm 5.0 的发布，npm 在速度和使用体验上有了显著提升，虽然尚未完全超越 Yarn，但已经非常接近。

**个人建议**：
- 如果你已经在使用 Yarn 并且没有遇到问题，可以继续使用。
- 如果你需要兼容 npm，或者团队中使用的是 npm、cnpm、tnpm，可以尝试升级到 npm 5.0 及以上版本。

## 补充：npx 的使用场景

npx 非常适合以下场景：
- **临时执行命令**：无需全局安装包，直接使用 npx 执行。
- **执行本地依赖**：自动查找项目中的依赖并执行。
- **快速测试新包**：无需安装即可运行最新版本的包。

通过合理使用 npx，可以减少全局安装的包数量，保持开发环境的整洁。