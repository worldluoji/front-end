以下是一套针对Vite的综合性试题，旨在通过核心概念、配置实践、原理分析和场景应用全面提升你对Vite的认知：

---

### **第一部分：基础概念（选择题）**
1. **Vite的核心原理基于哪两个主要概念？**  
   A. CommonJS和Babel转换  
   B. 原生ES模块加载与Rollup生产构建  
   C. Webpack打包与热更新  
   D. 服务端渲染与静态资源压缩  
   **答案：B**（原生ES模块按需编译 + Rollup生产优化）

2. **以下哪项是Vite开发模式下启动快的主要原因？**  
   A. 预打包所有依赖  
   B. 利用浏览器原生ES模块按需编译  
   C. 内置TypeScript支持  
   D. 使用WebAssembly加速  
   **答案：B**（无需全量打包，按需处理）

3. **Vite默认的生产构建工具是？**  
   A. Webpack  
   B. Esbuild  
   C. Rollup  
   D. Parcel  
   **答案：C**（Rollup的Tree Shaking和代码分割更高效）

---

### **第二部分：配置与实践（简答题）**
4. **如何在Vite中配置开发服务器端口为3001，并代理`/api`请求到后端服务？**  
   ```javascript
   // vite.config.js
   export default defineConfig({
     server: {
       port: 3001,
       proxy: {
         '/api': {
           target: 'http://localhost:8080',
           changeOrigin: true,
           rewrite: (path) => path.replace(/^\/api/, '')
         }
       }
     }
   });
   ```

5. **如何为Vite项目添加Sass支持？**  
   • **步骤**：安装`sass`依赖，配置`vite.config.js`：  
     ```javascript
     import { defineConfig } from 'vite';
     export default defineConfig({
       css: {
         preprocessorOptions: {
           scss: { additionalData: `@import "@/styles/vars.scss";` }
         }
       }
     });
     ```

---

### **第三部分：原理分析（简答题）**
6. **为什么Vite的热更新（HMR）比传统工具更快？**  
   • **按需更新**：仅编译修改的模块，而非全量打包。  
   • **原生ESM支持**：浏览器直接加载模块，结合WebSocket实时通知变更。  
   • **依赖预构建**：通过Esbuild预转换CommonJS依赖为ESM，减少后续编译开销。

7. **Vite如何处理`.vue`文件？**  
   • **开发阶段**：请求`.vue`文件时，Vite调用`@vitejs/plugin-vue`将其拆解为JS/CSS，浏览器直接执行。  
   • **生产构建**：Rollup打包为静态资源，并应用代码压缩和Tree Shaking。

---

### **第四部分：场景应用（实战题）**
8. **旧版浏览器兼容性问题的解决方案是什么？**  
   • **方案**：使用`@vitejs/plugin-legacy`插件，生成ES5回退包，并通过`<script nomodule>`加载。

9. **如何优化Vite生产构建的代码体积？**  
   • **Rollup配置**：启用代码分割（`dynamicImport()`）、Tree Shaking。  
   • **资源处理**：使用`build.assetsInlineLimit`控制小文件内联为Base64。  
   • **压缩工具**：默认集成Esbuild压缩JS/CSS，可替换为Terser进一步优化。

---

### **第五部分：进阶理解（多选题）**
10. **Vite的依赖预构建解决了哪些问题？**  
    A. 转换CommonJS为ESM格式  
    B. 合并多个小文件减少请求  
    C. 避免浏览器频繁请求`node_modules`  
    D. 支持TypeScript类型检查  
    **答案：A、B、C**（依赖预构建的核心目标）

11. **以下哪些框架被Vite官方模板直接支持？**  
    A. Vue  
    B. React  
    C. Svelte  
    D. Angular  
    **答案：A、B、C**（Angular需额外配置）

---

### **第六部分：综合论述**
12. **对比Vite与Webpack的核心差异**  
   • **开发体验**：Vite基于ESM按需编译，冷启动快（毫秒级 vs 秒级）。  
   • **构建流程**：Webpack全量打包，Vite开发阶段业务代码无打包，生产用Rollup。  
   • **生态扩展**：Webpack插件更成熟，Vite插件兼容Rollup且轻量化。