### **NodeJS必备知识点整理**

---

#### **一、核心运行机制**
1. **事件循环（Event Loop）**  
   - **阶段**：分为 `Timers`（处理定时器回调）、`I/O Callbacks`（处理系统级I/O回调）、`Poll`（等待新I/O事件）、`Check`（执行`setImmediate`回调）、`Close Callbacks`（处理关闭事件）等阶段。  
   - **非阻塞I/O**：通过异步操作（如文件读写、网络请求）避免阻塞主线程，适合高并发场景。  
   - **微任务与宏任务**：`Promise.then`、`process.nextTick`属于微任务，优先级高于宏任务（如`setTimeout`、`setImmediate`）。

2. **单线程模型**  
   - 主线程处理事件循环，通过异步I/O和线程池实现高效并发。  
   - 需避免CPU密集型任务阻塞主线程（如复杂计算、同步文件操作）。

---

#### **二、模块系统与包管理**
1. **模块规范**  
   - **CommonJS**：`require()`导入，`module.exports`导出。  
   - **ES Module**：支持`import/export`语法，需配置`"type": "module"`。现在是主流标准，建议新项目全部使用ES Module。  

2. **核心内置模块**  
   - `fs`（文件操作）、`http`（创建服务器）、`path`（路径处理）、`stream`（流处理）、`crypto`（加密）、`child_process`（子进程管理）等。  

3. **npm/yarn**  
   - 包管理工具，管理项目依赖，支持脚本执行、版本锁定（`package-lock.json`/`yarn.lock`）。

---

#### **三、异步编程模型**
1. **回调函数（Callbacks）**  
   - 基础异步处理方式，但易导致“回调地狱”。  

2. **Promise**  
   - 链式调用（`.then()`/`.catch()`）解决嵌套问题，支持异步操作状态管理。  

3. **async/await**  
   - 以同步风格编写异步代码，基于`Promise`，提升代码可读性。  

4. **事件驱动（EventEmitter）**  
   - 通过`events`模块实现自定义事件监听与触发，适用于解耦逻辑（如HTTP请求处理）。

---

#### **四、Web开发框架与工具**
1. **主流框架**（熟练使用一个）  
   - **Express**：轻量级，支持中间件、路由、模板引擎。  
   - **Koa**：基于`async/await`，更简洁。  
   - **NestJS**：企业级框架，结合TypeScript和依赖注入。  
   - **Fastify**：高性能API开发，低延迟。  

2. **中间件机制**  
   - 处理请求/响应流程（如日志、权限验证），例如`cors`中间件。  

3. **开发工具**  
   - **nodemon**：文件变更自动重启服务。  
   - **PM2**：进程管理，支持集群模式。  

---

#### **五、性能优化与调试**
1. **避免阻塞操作**  
   - 使用异步API（如`fs.readFile`替代`fs.readFileSync`）。  
   - 拆分CPU密集型任务，利用子进程或Worker Threads。  

2. **集群与负载均衡**  
   - 通过`cluster`模块利用多核CPU。  
   - 结合Nginx反向代理分发请求。  

3. **调试工具**  
   - **Chrome DevTools**：调试Node应用。  
   - **Winston/Morgan**：日志记录与分析。  

---

#### **六、数据库与数据流**
1. **数据库集成**  
   - **MySQL/MongoDB**：使用`mysql2`、`mongoose`等驱动库。  
   - **ORM/ODM**：如`Sequelize`（SQL）、`TypeORM`（跨数据库）。  

2. **流处理（Streams）**  
   - 高效处理大文件或实时数据，支持管道操作（`.pipe()`）。  

---

#### **七、应用场景**
1. **高并发服务**：实时聊天、API网关。  
2. **微服务架构**：轻量、模块化部署。  
3. **工具开发**：CLI脚本、构建工具（如Webpack插件）。  
4. **全栈应用**：结合React/Vue（通过`Next.js`/`Nuxt.js`实现SSR）。  

---

**提示**：以上为精简版核心知识点，实际学习中需结合实战项目加深理解。