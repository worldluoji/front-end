# Mock.js
Mock.js 是一个非常实用的 JavaScript 库，主要用于前端开发过程中模拟 HTTP 请求和响应数据，特别适用于后端接口尚未完成时的前端开发工作。

### 主要功能

- **生成随机数据**：Mock.js 可以根据预定义的规则生成各种类型的随机数据，包括但不限于字符串、数字、布尔值、对象、数组等。
- **拦截 Ajax 请求**：它能够拦截由 `XMLHttpRequest` 或者 `fetch` 发起的请求，并返回自定义的模拟数据，而不需要实际发送请求到服务器。
- **支持正则表达式**：你可以使用正则表达式来匹配 URL 和路径，以便更灵活地控制哪些请求需要被拦截和模拟。
- **模板引擎**：内置了简单的模板语言，允许你通过占位符来定义返回的数据结构和格式。

### 安装与使用

首先，你需要安装 Mock.js：

```bash
npm install mockjs --save-dev
```

然后，在你的项目中引入并配置它：

```javascript
import Mock from 'mockjs';

// 定义一个简单的API
Mock.mock('/api/users', {
    'list|1-10': [{
        'id|+1': 1,
        'name': '@name',
        'age|18-60': 1,
        'address': '@city'
    }]
});

// 现在，当你的应用向 '/api/users' 发起请求时，Mock.js 将会返回模拟的数据。
```

### 实际应用场景

假设你在开发一个用户管理系统，但后端服务还没有准备好。你可以利用 Mock.js 来模拟获取用户列表的 API 响应：

```javascript
Mock.mock('/api/getUserList', {
    'users|5-20': [{
        'userId|+1': 1,
        'userName': '@cname',
        'gender|1': ['male', 'female'],
        'age|18-60': 1,
        'email': '@email'
    }]
});
```

这样，无论何时你的前端代码尝试访问 `/api/getUserList`，Mock.js 都会返回一段包含随机生成用户信息的模拟数据，帮助你继续进行前端界面的开发而不受后端进度的影响。

可以通过环境变量来避免生产环境受mock的影响：
```js
if (process.env.NODE_ENV !== 'production') {
    import('mockjs').then(Mock => {
        // 配置你的Mock规则
        Mock.default.mock('/api/example', {
            'key': 'value'
        });
    });
}
```

Mock.js 还有很多高级用法和配置选项，建议查阅官方文档来深入了解它的所有特性和最佳实践。