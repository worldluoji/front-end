在 JavaScript 中，正则表达式（RegExp）是处理字符串的瑞士军刀，其应用场景覆盖数据验证、文本解析、路由过滤等关键领域。以下从 7 个维度 系统解析其应用，包含典型代码示例和性能优化建议：

---

一、基础语法：两种创建方式
```javascript
// 1. 字面量形式（推荐静态模式）
const reg1 = /pattern/flags; 

// 2. 构造函数形式（动态生成正则）
const dynamicPattern = "api";
const reg2 = new RegExp(`${dynamicPattern}`, "gi");
```

| 修饰符 | 作用                                | 示例场景                   |
|------------|------------------------------------|---------------------------|
| `i`        | 不区分大小写                        | `/hello/i` 匹配 "Hello"   |
| `g`        | 全局匹配                            | 替换所有匹配项             |
| `m`        | 多行模式（^和$匹配行首行尾）         | 日志分析                  |
| `u`        | 支持 Unicode 字符                   | 处理 emoji 或特殊符号     |
| `y`        | 粘滞模式（从上次匹配位置继续）       | 流式数据解析              |

---

二、核心应用场景

1. 表单验证（精确匹配）
```javascript
// 邮箱验证（RFC 5322 简化版）
const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
if (!emailReg.test(userInput)) {
  alert("邮箱格式错误");
}

// 密码强度：8-20位，必须包含大小写和数字
const pwdReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\S]{8,20}$/;
```

2. URL/路径处理（路由拦截）
```javascript
// Next.js 中间件：排除静态资源和API路由
export function middleware(req) {
  const path = req.nextUrl.pathname;
  const excludeReg = /^\/(api|_next\/static|_next\/image|.*\.(png|ico)$)/;
  if (!excludeReg.test(path)) {
    // 执行身份验证逻辑
  }
}

// 提取URL参数（分组捕获）
const url = "/user/123/profile";
const match = url.match(/\/user\/(\d+)\/profile/);
const userId = match ? match[1] : null; // 123
```

3. 文本清洗与替换
```javascript
// 敏感词过滤（全局替换）
const bannedWords = /(暴力|色情|赌博)/gi;
const cleanText = dirtyText.replace(bannedWords, "***");

// 日期格式转换：YYYY-MM-DD => DD/MM/YYYY
const dateStr = "2023-10-05";
dateStr.replace(/(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1"); // "05/10/2023"
```

4. 数据提取（非结构化转结构化）
```javascript
// 从日志提取IP和访问时间
const log = `192.168.1.1 - - [10/Oct/2023:14:23:45] "GET /api/user";
const logReg = /(\d+\.\d+\.\d+\.\d+).+\[(\d{2}\/\w+\/\d{4}:\d{2}:\d{2}:\d{2})\]/;
const [, ip, timestamp] = log.match(logReg) || [];
```

5. 字符串分割（复杂分隔符）
```javascript
// 按多种符号分割句子
const text = "Hello,world!How-are_you?";
const words = text.split(/[,!\-_]+/); // ["Hello", "world", "How", "are", "you?"]
```

---

三、性能优化策略

1. 预编译高频使用正则
```javascript
// ❌ 错误写法（每次循环重新编译正则）
users.forEach(user => {
  const reg = /@example.com$/; // 重复创建
  if (reg.test(user.email)) { /* ... */ }
});

// ✅ 正确写法（提前预编译）
const emailReg = /@example.com$/;
users.forEach(user => {
  if (emailReg.test(user.email)) { /* ... */ }
});
```

2. 避免回溯灾难
```javascript
// 危险正则：嵌套量词导致指数级复杂度
const dangerousReg = /(a+)+b/; // 输入 "aaaaaaaaac" 会长时间挂起

// 优化方案：明确匹配规则
const safeReg = /a+b/; // 使用原子组或限制重复次数
```

3. 用^和$锚定边界
```javascript
// ❌ 未锚定导致部分匹配
const leakyReg = /user/; 
leakyReg.test("api/user"); // true（可能非预期）

// ✅ 精确匹配整段字符串
const preciseReg = /^user$/;
```

---

四、进阶技巧

1. 命名捕获组（ES2018+）
```javascript
// 提取日期各部分
const dateReg = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
const { groups } = dateReg.exec("2023-10-05");
console.log(groups.year); // "2023"
```

2. 正向/反向断言
```javascript
// 提取价格数值（不带货币符号）
const priceStr = "USD 199.99, EUR 159.00";
const priceReg = /(?<=\$|USD )\d+\.\d{2}/g; 
priceStr.match(priceReg); // ["199.99"]

// 匹配未闭合的HTML标签（反向否定）
const htmlReg = /<(div)\b(?![^>]*\/>)[^>]*>/gi;
```

---

五、调试工具推荐
1. [RegExr](https://regexr.com/)：实时高亮匹配结果，解释正则结构
2. [Regex101](https://regex101.com/)：生成测试用例，分析性能开销
3. VS Code插件：Regex Previewer 边写边测

---

六、典型错误案例

| 错误类型          | 错误示例               | 修复方案               |
|-----------------------|-----------------------|-----------------------|
| 未转义特殊字符         | `/user/123.45/`       | `/user\/123\.45\//`   |
| 贪婪匹配导致意外结果   | `/".*"/` 匹配整个字符串 | `/".*?"/`（非贪婪）   |
| 忽略多行模式           | `^Start` 只匹配行首    | `/^Start/gm`          |

---

七、何时不该用正则？
1. 嵌套结构解析（如 XML/HTML）：用专用解析器（DOMParser）
2. 复杂语法分析（如编程语言）：用词法分析器（ANTLR）
3. 超长文本处理：考虑分块处理或流式解析

---

掌握正则表达式是提升 JavaScript 开发效率的关键技能，核心原则是：简单场景用字符串方法，复杂模式用正则，极端性能需求用状态机。