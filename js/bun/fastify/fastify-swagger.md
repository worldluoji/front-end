通过 `fastify-swagger` 生成 API 文档，再使用 `swagger-codegen` 生成管理端代码的步骤如下：

---

### 1. **安装依赖**
首先，安装 `fastify-swagger` 和 `swagger-codegen` 所需的工具。

```bash
npm install fastify-swagger @fastify/swagger-ui
```

`swagger-codegen` 可以通过以下方式安装：

```bash
# 使用 npm 安装 swagger-codegen-cli
npm install -g swagger-codegen-cli
```

---

### 2. **配置 Fastify 和 Swagger**
在 Fastify 应用中配置 `fastify-swagger` 插件，自动生成 Swagger 文档。

```javascript
const fastify = require('fastify')({ logger: true });
const fastifySwagger = require('fastify-swagger');
const fastifySwaggerUI = require('@fastify/swagger-ui');

// 注册 fastify-swagger 插件
fastify.register(fastifySwagger, {
  routePrefix: '/documentation',
  swagger: {
    info: {
      title: 'My API',
      description: 'API documentation',
      version: '1.0.0',
    },
    host: 'localhost:3000', // 你的服务地址
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
  },
});

// 注册 fastify-swagger-ui 插件
fastify.register(fastifySwaggerUI, {
  routePrefix: '/documentation',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
});

// 定义一个示例路由
fastify.get('/hello', {
  schema: {
    description: 'Say hello',
    tags: ['hello'],
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
}, async (request, reply) => {
  return { message: 'Hello, world!' };
});

// 启动服务
fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
  console.log('Server is running on http://localhost:3000');
});
```

启动服务后，访问 `http://localhost:3000/documentation` 即可查看 Swagger UI。

---

### 3. **导出 Swagger JSON 文件**
Swagger 文档的 JSON 文件可以通过以下 URL 获取：

```
http://localhost:3000/documentation/json
```

将该文件保存为 `swagger.json`，或者直接通过命令行下载：

```bash
curl -o swagger.json http://localhost:3000/documentation/json
```

---

### 4. **使用 swagger-codegen 生成管理端代码**
使用 `swagger-codegen` 根据 `swagger.json` 生成客户端或管理端代码。

#### 生成 TypeScript 客户端代码
```bash
swagger-codegen generate -i swagger.json -l typescript-angular -o ./client
```

#### 生成 Java 客户端代码
```bash
swagger-codegen generate -i swagger.json -l java -o ./client
```

#### 生成其他语言或框架的代码
`swagger-codegen` 支持多种语言和框架，可以通过以下命令查看支持的语言列表：

```bash
swagger-codegen langs
```

然后根据需要生成代码，例如生成 React 前端代码：

```bash
swagger-codegen generate -i swagger.json -l typescript-react -o ./client
```

---

### 5. **使用生成的代码**
生成的代码会包含 API 客户端、模型和接口定义。你可以将这些代码集成到你的管理端项目中。

例如，如果生成了 TypeScript 客户端代码，可以在管理端项目中这样使用：

```typescript
import { DefaultApi, HelloResponse } from './client';

const api = new DefaultApi();

api.hello().then((response: HelloResponse) => {
  console.log(response.message); // 输出: Hello, world!
});
```

---

### 6. **自动化流程**
可以将上述步骤整合到 CI/CD 流程中，实现自动化生成和部署：
1. 启动 Fastify 服务。
2. 下载 Swagger JSON 文件。
3. 使用 `swagger-codegen` 生成代码。
4. 将生成的代码部署到管理端项目。

---

### 总结
通过 `fastify-swagger` 生成 API 文档，再使用 `swagger-codegen` 生成管理端代码，可以快速构建基于 API 的管理工具。这种方法适用于需要快速开发前端或客户端应用的场景。