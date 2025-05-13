# PM2
PM2 是 Node.js 生态中广泛使用的**进程管理工具**，专为生产环境设计，能够帮助开发者高效管理 Node.js 应用的启动、守护、监控和扩展。以下是关于 PM2 的详细讲解：

---

### 一、PM2 的核心作用
1. **进程守护**  
   当 Node.js 应用崩溃或意外退出时，PM2 会自动重启应用，保障服务持续运行。
2. **集群模式**  
   支持以集群方式运行多个应用实例，充分利用多核 CPU，提升性能和稳定性。
3. **日志管理**  
   集中收集应用的标准输出（`stdout`）和错误输出（`stderr`），支持日志分割和保存。
4. **监控与性能分析**  
   提供实时监控界面，可查看 CPU、内存等资源占用，并支持性能分析工具。
5. **零停机热重载**  
   通过 `pm2 reload` 实现不停机更新代码，减少服务中断时间。

---

### 二、快速上手 PM2
#### 1. 安装
通过 npm 全局安装：
```bash
npm install pm2 -g
```

#### 2. 基本命令
```bash
# 启动应用（默认前台运行）
pm2 start app.js

# 后台运行并命名为 MyApp
pm2 start app.js --name MyApp

# 查看运行中的进程列表
pm2 list

# 停止指定应用
pm2 stop MyApp

# 重启应用
pm2 restart MyApp

# 删除应用
pm2 delete MyApp

# 查看日志
pm2 logs MyApp

# 监控资源使用
pm2 monit
```

---

### 三、高级功能
#### 1. 集群模式
启动多个实例，自动负载均衡：
```bash
pm2 start app.js -i 4  # 启动4个实例（或使用 max 自动匹配 CPU 核心数）
```

#### 2. 环境变量与配置文件
通过 `ecosystem.config.js` 管理配置（推荐）：
```bash
pm2 init simple  # 生成配置文件模板
```
示例配置文件：
```javascript
module.exports = {
  apps: [{
    name: "MyApp",
    script: "app.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
    instances: "max",  // 使用所有 CPU 核心
    exec_mode: "cluster"
  }]
};
```
启动应用：
```bash
pm2 start ecosystem.config.js --env production
```

#### 3. 日志管理
- **查看日志**：`pm2 logs`
- **清空日志**：`pm2 flush`
- **日志分割**：通过 `pm2-logrotate` 插件实现日志自动分割和压缩。

---

### 四、部署与生产环境
#### 1. 部署工作流
PM2 支持通过配置文件定义部署流程（多服务器部署）：
```javascript
// ecosystem.config.js
module.exports = {
  deploy: {
    production: {
      user: "ubuntu",
      host: ["server1.com", "server2.com"],
      ref: "origin/main",
      repo: "git@github.com:user/repo.git",
      path: "/var/www/myapp",
      "post-deploy": "npm install && pm2 reload ecosystem.config.js"
    }
  }
};
```
执行部署：
```bash
pm2 deploy production setup  # 初始化服务器
pm2 deploy production        # 更新代码并重启应用
```

#### 2. 开机自启动
保存当前进程列表，并生成开机启动脚本：
```bash
pm2 save
pm2 startup
```

---

### 五、最佳实践
1. **使用配置文件**：避免命令行参数过多，统一管理环境变量和部署设置。
2. **集群模式优化**：根据 CPU 核心数调整实例数量（`instances: "max"`）。
3. **日志管理**：定期清理或分割日志，避免磁盘空间不足。
4. **结合 Docker**：在容器化部署中，PM2 可作为容器主进程管理多个应用。

---

### 六、总结
PM2 是 Node.js 开发者不可或缺的工具，简化了进程管理、负载均衡、日志收集等复杂任务。通过灵活配置和丰富的功能，能够显著提升生产环境的稳定性和可维护性。建议结合 `ecosystem.config.js` 和集群模式，充分发挥其潜力。