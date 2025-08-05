# webpack-vite混合模块联邦
**模块联邦（Module Federation）完全支持一个工程使用 Vite，另一个工程使用 Webpack**。这种混合构建工具的方案已在社区中得到验证，核心依赖 **`vite-plugin-federation`** 插件实现 Vite 端与 Webpack 的协议兼容。以下是关键细节和注意事项：

---

### 🔧 **一、技术实现原理**
1. **协议统一性**  
   模块联邦的核心是一套**独立于构建工具的运行时协议**，定义了模块暴露（`exposes`）、远程引用（`remotes`）和依赖共享（`shared`）的规则。无论使用 Webpack 的 `ModuleFederationPlugin` 还是 Vite 的 `vite-plugin-federation`，最终生成的 `remoteEntry.js` 文件均遵循相同协议，实现跨工具互操作。

2. **角色分工**  
   - **Webpack 作为 Host（宿主）**：必须使用 Webpack 5+ 的 `ModuleFederationPlugin` 配置 `remotes`，声明 Vite 远程模块的入口 URL（`remoteEntry.js`）。  
   - **Vite 作为 Remote（远程）**：通过 `@originjs/vite-plugin-federation` 插件配置 `exposes`，暴露模块并生成兼容的 `remoteEntry.js`。

---

### ⚙️ **二、具体配置示例**
#### **Vite 远程工程配置**（暴露模块）
```javascript
// vite.config.js
import federation from "@originjs/vite-plugin-federation";

export default {
  plugins: [
    federation({
      name: "vite_remote", // 唯一标识
      filename: "remoteEntry.js",
      exposes: {
        "./Button": "./src/components/Button.vue", // 暴露组件
      },
      shared: ["vue"], // 共享依赖
    }),
  ],
  build: {
    target: "esnext", // 必需：支持高级 ES 特性
  },
};
```

#### **Webpack 宿主工程配置**（引用模块）
```javascript
// webpack.config.js
const ModuleFederationPlugin = require("webpack").container.ModuleFederationPlugin;

module.exports = {
  plugins: [
    new ModuleFederationPlugin({
      name: "webpack_host",
      remotes: {
        vite_remote: "vite_remote@http://localhost:5001/remoteEntry.js", // 指向 Vite 的 remoteEntry.js
      },
      shared: {
        vue: { singleton: true }, // 确保依赖单例
      },
    }),
  ],
};
```

#### **宿主代码使用远程模块**
```javascript
// 动态加载（推荐）
const RemoteButton = React.lazy(() => import("vite_remote/Button"));

function App() {
  return (
    <Suspense fallback="Loading...">
      <RemoteButton />
    </Suspense>
  );
}
```

---

### ⚠️ **三、关键注意事项**
1. **开发模式限制**  
   - Vite 的 Remote 工程在开发时需先执行 `vite build --watch` 生成 `remoteEntry.js`（因 Vite 开发模式为 Bundleless）。  
   - Webpack Host 可正常使用开发服务器（Dev Server）。

2. **共享依赖版本冲突**  
   - 双方必须通过 `shared` 配置**显式声明共用依赖（如 Vue、React）**，并约定版本范围（`requiredVersion`）。  
   - 建议开启 `singleton: true` 避免多实例冲突（尤其对全局状态敏感的库如 React/Vue）。

3. **格式兼容性**  
   - Webpack 引用 Vite 暴露的模块时，优先使用 **ESM 格式**（配置 `build.target: 'esnext'`）。  
   - 避免在 React 项目中混合使用 Vite 和 Webpack 的 CommonJS 格式（易引发 `shared` 依赖问题）。

4. **生产部署**  
   - 需将 Vite 构建的产物（含 `remoteEntry.js`）部署至 CDN 或静态服务器，确保 URL 可访问。  
   - 通过环境变量动态配置 `remotes` 的 URL，适配多环境（如测试/生产）。

---

### 🌐 **四、适用场景**
1. **微前端架构**  
   Webpack 基座（Host）动态加载 Vite 子应用（Remote）的页面或组件。  
2. **跨团队组件共享**  
   Vite 工程独立构建 UI 组件库，供多个 Webpack 项目按需引用，无需 NPM 发布。  
3. **技术栈渐进迁移**  
   旧 Webpack 项目逐步替换为 Vite 模块，实现平滑过渡。

---

### 💎 总结
通过 `vite-plugin-federation` + `ModuleFederationPlugin`，Vite 与 Webpack 的混合工程可无缝实现模块联邦，**打破构建工具边界**。重点在于：  
✅ 协议兼容性（`remoteEntry.js` 统一）  
✅ 依赖共享配置（`shared` 严格一致）  
✅ 格式与部署适配（ESM 优先，URL 可访问）  
此方案已在字节跳动等大型项目中落地，是微前端与分布式架构的高效实践。