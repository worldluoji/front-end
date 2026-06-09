# TCB deploy
部署两个独立的 Next.js 应用到同一个腾讯云 CloudBase 环境，并共用一个域名，完全可行。核心思路是：**利用 Next.js 的 `basePath` 特性 + CloudBase 云托管服务的路径路由**。

下面是具体实现步骤，假设你的域名是 `example.com`，两个应用分别是 `app-a` 和 `app-b`，希望访问路径为：

- `example.com/app-a` → 应用 A
- `example.com/app-b` → 应用 B

### 1. 改造你的 Next.js 应用（支持子路径）

在每个应用的 `next.config.js` 中，配置 `basePath`，让应用感知到自己所处的路径前缀。

**应用 A (`app-a`)：**
```javascript
// next.config.js
module.exports = {
  basePath: '/app-a',
  // 可选：如果静态资源需要完整 CDN 路径，可以配置 assetPrefix，但通常不需要
  // assetPrefix: '/app-a',
  // 确保输出标准 standalone 模式，方便云托管部署
  output: 'standalone',
}
```

**应用 B (`app-b`)：**
```javascript
// next.config.js
module.exports = {
  basePath: '/app-b',
  output: 'standalone',
}
```

**为什么这样做？**  
这样应用内部的路由（如 `/about`）会自动变成 `/app-a/about`。当请求到达应用时，Next.js 能正确识别并处理，无需额外的路径重写。

### 2. 将每个应用部署到 CloudBase 云托管

CloudBase 云托管支持独立的容器服务，每个应用一个服务。

#### 2.1 准备 Dockerfile（可选，但推荐）
Next.js 的 `output: 'standalone'` 模式会生成一个独立的服务器文件，配合官方 Dockerfile 即可。

创建 `Dockerfile`（放在每个应用根目录）：
```dockerfile
FROM node:18-alpine AS base

# 安装依赖
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# 构建
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# 运行 standalone 服务器
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

#### 2.2 部署到云托管
- 进入 CloudBase 控制台 → **云托管** → 创建**两个服务**，例如 `next-app-a` 和 `next-app-b`。
- 每个服务独立上传代码（或关联 Git），设置**端口为 3000**。
- 部署时环境变量可忽略（默认 `PORT` 会被 CloudBase 自动注入）。
- 等待服务上线，你会得到两个内部访问地址（如 `https://next-app-a-xxx.ap-shanghai.app.tcloudbase.com`）。

### 3. 配置自定义域名 + 路径路由

CloudBase 的 **HTTP 访问服务** 允许将自定义域名的不同路径转发到不同的云托管服务。

#### 3.1 绑定自定义域名
- 进入 CloudBase 控制台 → **HTTP 访问服务** → **自定义域名** → 添加域名 `example.com`。
- 按要求完成 CNAME 解析（域名 DNS 中添加记录指向 CloudBase 给出的 CNAME 地址）。
- 等待 SSL 证书自动签发。

#### 3.2 配置路径转发规则
在同一个自定义域名设置页面，通常会有“路由规则”或“路径匹配”选项（若界面找不到，可使用 CloudBase 的 **云接入** 功能，或直接编辑 `cloudbaserc.json`）。

**示例规则：**
| 路径模式      | 目标服务     | 说明                         |
|---------------|--------------|------------------------------|
| `/app-a/*`    | `next-app-a` | 所有以 `/app-a` 开头的请求转发到服务 A |
| `/app-b/*`    | `next-app-b` | 转发到服务 B                 |
| `/`（根路径） | 可留空或指向一个默认服务 | 可选 |

**注意：** 转发时，请求的完整路径（包括 `/app-a`）会原样发送到目标服务。由于我们的 Next.js 应用已经通过 `basePath` 配置了前缀，它们能正确处理。

#### 3.3 验证
- 访问 `https://example.com/app-a` → 应显示应用 A 的首页。
- 访问 `https://example.com/app-b/about` → 应显示应用 B 的关于页面。
- Next.js 的资源文件（如 `/_next/static/...`）会因为 `basePath` 自动变成 `/app-a/_next/static/...`，也会被正确路由。

### 4. 常见问题与注意事项

#### Q1：静态资源返回 404
- 确保 `basePath` 配置正确，且没有额外配置 `assetPrefix`（除非你明确需要 CDN）。
- 如果静态资源路径仍然不对，在 `next.config.js` 中添加：
  ```js
  assetPrefix: '/app-a'  // 与 basePath 相同
  ```

#### Q2：应用之间的跳转会串路吗？
- 不会。每个应用内部的路由都会自动带上自己的 `basePath`，跳转时相对路径也基于此。如果需要从应用 A 跳转到应用 B，请使用绝对路径 `/app-b/...`。

#### Q3：云托管服务的“访问路径”要不要设置？
- 不要设置。保持每个服务的“访问路径”为空或 `/`。我们完全依赖自定义域名的路由规则来控制。

#### Q4：云托管服务之间如何共用数据库/存储？
- 可以直接共用同一个 CloudBase 环境的数据库、云函数、云存储，完全没问题。

#### Q5：这种方案会额外收费吗？
- 云托管按实际使用的资源（CPU/内存/流量）计费，两个服务独立运行，费用是叠加的。但相比单独买两个环境或两个域名，仍然更节省。

### 5. 备选方案：使用 Nginx 做反向代理（当路径路由不支持时）

如果 CloudBase 控制台不提供灵活的路径转发，可以自己部署一个 Nginx 服务（也放在云托管中）作为统一网关：

- 创建一个 `nginx` 服务，配置 `nginx.conf`：
  ```nginx
  location /app-a/ {
      proxy_pass http://next-app-a:3000/;
      proxy_set_header Host $host;
  }
  location /app-b/ {
      proxy_pass http://next-app-b:3000/;
  }
  ```
- 将自定义域名绑定到这个 Nginx 服务，并由 Nginx 转发给另外两个 Next.js 服务。
- 缺点：多一跳，增加少量延迟和费用。

但 CloudBase 内置的 HTTP 访问服务已经支持路径转发（文档参考：云接入路由），推荐使用原生方案。

### 总结

| 步骤 | 动作 |
|------|------|
| 1 | 在每个 Next.js 项目中配置 `basePath: '/app-xxx'` |
| 2 | 分别部署到两个 CloudBase 云托管服务 |
| 3 | 绑定自定义域名，配置路径转发规则（`/app-a/*` → 服务 A） |
| 4 | 测试访问 |

这样，你用一个域名和一个 CloudBase 环境，就可以同时运行两个独立的 Next.js 应用，而且成本最低。如果后续需要增加第三个应用，只需要再部署一个新服务，并添加一条新的路由规则即可。