# NodeJS 参考题1

### **I. 基础篇**  
1. **模块导出与导入**  
   写出以下场景的ESM语法：  
   a) 导出名为`fetchData`的函数和`API_URL`常量  
   b) 默认导出`Logger`类  
   c) 动态导入`utils.mjs`模块并获取其默认导出  
   ```javascript
   // 答案示例
   export const API_URL = "https://api.example.com";
   export function fetchData() { /*...*/ }
   
   export default class Logger { /*...*/ }
   
   const { default: utils } = await import('./utils.mjs');
   ```

2. **路径解析规则**  
   以下代码为何会报错？如何修复？  
   ```javascript
   import { helper } from './lib'; // 报错
   ```
   > **答案**：ESM要求显式文件扩展名（`.js/.mjs`）或目录下的`index.mjs`，需改为`from './lib/index.mjs'`或使用`package.json`的`exports`字段配置路径映射。

---

### **II. 概念篇**  
3. **模块作用域**  
   解释以下代码的输出及原因：  
   ```javascript
   // module.mjs
   export let counter = 0;
   export const increment = () => counter++;

   // main.mjs
   import { counter, increment } from './module.mjs';
   increment();
   console.log(counter); // 输出？
   ```
   > **答案**：输出`1`。ESM导出的是值的**动态绑定**（非快照），模块内变量变化会同步到导入方。

4. **模块加载机制**  
   以下哪种场景会触发模块重复执行？说明理由：  
   a) 相同URL多次`import`  
   b) 不同查询参数的URL导入同一文件  
   ```javascript
   import './module.mjs?foo=1';
   import './module.mjs?foo=2';
   ```
   > **答案**：选b。ESM以完整URL（含查询参数）作为缓存键，不同参数的导入被视为独立模块。

---

### **III. 编码实战**  
5. **现代API应用**  
   用ESM和Node.js 21+内置API实现：  
   - 创建HTTP服务器返回JSON数据  
   - 使用`fetch`调用外部API  
   - 流式处理大文件  
   ```javascript
   // 答案示例（HTTP服务器）
   import { createServer } from 'node:http';
   import { pipeline } from 'node:stream/promises';
   import { createReadStream } from 'node:fs';

   const server = createServer(async (req, res) => {
     if (req.url === '/data') {
       const response = await fetch('https://api.example.com/data');
       res.writeHead(200, { 'Content-Type': 'application/json' });
       res.end(JSON.stringify(await response.json()));
     } else if (req.url === '/download') {
       res.setHeader('Content-Type', 'text/plain');
       await pipeline(
         createReadStream('./large-file.txt'),
         res
       );
     }
   }).listen(3000);
   ```

6. **元编程实践**  
   用`import.meta`实现：获取当前模块路径，并解析其目录路径  
   ```javascript
   // 答案
   import { fileURLToPath } from 'node:url';
   import { dirname } from 'node:path';

   const __filename = fileURLToPath(import.meta.url);
   const __dirname = dirname(__filename); // ESM替代CommonJS的__dirname
   ```

---

### **IV. 综合设计**  
7. **性能优化场景**  
   用`Worker Threads`和ESM实现CPU密集型任务分流：  
   ```javascript
   // main.mjs
   import { Worker, isMainThread } from 'node:worker_threads';

   if (isMainThread) {
     new Worker(new URL('./worker.mjs', import.meta.url));
   } else {
     // Worker线程执行复杂计算
     const result = heavyTask();
     parentPort.postMessage(result);
   }
   ```

8. **生态兼容性**  
   如何让ESM项目使用仅支持CommonJS的第三方库？  
   > **答案**：通过动态导入`createRequire`：  
   ```javascript
   import { createRequire } from 'node:module';
   const require = createRequire(import.meta.url);
   const legacyLib = require('cjs-only-package');
   ```

---

### **核心考点解析**  
- **Tree Shaking机制**：ESM的静态结构分析使打包工具可消除未使用代码（如Webpack/Rollup）。  
- **顶层Await**：ESM支持在模块顶层直接使用`await`，简化异步初始化。  
- **浏览器兼容**：通过构建工具（如Vite）将ESM转换为浏览器兼容格式。  

保持内容结构清晰，所有引用标记已移除。建议结合Node.js官方文档和现代工具链（如ESLint、TypeScript）实践，深化理解。