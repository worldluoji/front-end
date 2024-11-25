# nodemon
`nodemon` 是一个用于 Node.js 应用程序的工具，它可以在检测到文件变化时自动重启 Node.js 应用。这对于开发过程中测试和调试应用非常有帮助，因为它可以减少手动重启服务器的需要，从而加快开发流程。

### 主要特点

- **自动重启**：当检测到任何代码更改时，`nodemon` 会自动重启 Node.js 应用，这使得开发者可以立即看到更改的效果。
- **配置灵活**：可以通过命令行参数或配置文件来指定哪些文件类型的变化会触发重启，以及排除某些文件或目录。
- **支持多种环境**：不仅支持本地开发环境，还可以与 CI/CD 流程集成，在不同的环境中使用。
- **插件支持**：可以通过安装插件来扩展 `nodemon` 的功能，例如支持其他编程语言或框架。

### 安装

可以通过 npm (Node Package Manager) 来安装 `nodemon`。全局安装可以让您在任何项目中使用 `nodemon`：

```bash
npm install -g nodemon
```

或者，如果只想在某个特定项目中使用 `nodemon`，可以作为开发依赖项安装：

```bash
npm install --save-dev nodemon
```

### 使用

安装完成后，可以直接使用 `nodemon` 命令来启动您的 Node.js 应用，而不是使用 `node` 命令。例如，如果您有一个名为 `app.js` 的入口文件，可以这样启动应用：

```bash
nodemon app.js
```

`nodemon` 会监控文件的变化，并在检测到变化后自动重启应用。

### 配置

虽然 `nodemon` 默认会监控 JavaScript 文件的变化，但您可以通过 `.nodemonignore` 文件或命令行选项来自定义哪些文件应该被忽略或特别关注。例如，要在命令行中指定监控特定的文件夹，可以这样做：

```bash
nodemon --watch ./src --exec "node ./src/app.js"
```

这里，`--watch` 参数指定了要监控的目录，`--exec` 参数指定了执行的应用。

总之，`nodemon` 是一个非常实用的工具，对于提高 Node.js 应用程序的开发效率非常有帮助。