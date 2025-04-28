# Zod
Zod 是一个 TypeScript 优先的数据模式声明和验证库，它允许开发者通过定义模式（Schema）来验证数据结构的合法性，并自动生成 TypeScript 类型，减少重复的类型定义。以下从基础使用、核心场景和实际示例展开讲解：

---

**1. 安装与基础使用**
```bash
npm install zod
```

**基本模式定义**
```typescript
import { z } from "zod";

// 定义用户模式
const UserSchema = z.object({
  name: z.string().min(3),
  age: z.number().int().positive(),
  email: z.string().email(),
  isAdmin: z.boolean().optional(),
});

// 推断出 TypeScript 类型
type User = z.infer<typeof UserSchema>;
```

**数据验证**
```typescript
const rawData = { name: "Alice", age: 25, email: "alice@example.com" };

try {
  const user = UserSchema.parse(rawData); // 验证数据，失败则抛出错误
  console.log("Valid user:", user);
} catch (error) {
  console.error("Validation error:", error.errors);
}
```

---

**2. 核心使用场景**

**场景 1：表单验证**
在 React 或前端应用中，验证用户输入的表单数据：
```typescript
const LoginFormSchema = z.object({
  username: z.string().min(5),
  password: z.string().min(8),
});

// 在表单提交时验证
const validateLoginForm = (data: unknown) => {
  return LoginFormSchema.parse(data);
};
```

**场景 2：API 请求/响应验证**
验证 API 请求参数或外部接口返回的数据结构：
```typescript
// 验证 API 响应
const fetchUser = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`);
  const data = await response.json();
  return UserSchema.parse(data); // 确保响应符合预期结构
};
```

**场景 3：配置验证**
验证配置文件或环境变量：
```typescript
const EnvSchema = z.object({
  API_KEY: z.string().min(32),
  PORT: z.number().default(3000),
});

const env = EnvSchema.parse(process.env);
```

**场景 4：类型安全的持久化数据**
验证本地存储（如 localStorage）中的数据：
```typescript
const saveUser = (user: User) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const loadUser = () => {
  const data = JSON.parse(localStorage.getItem("user") || "null");
  return UserSchema.parse(data);
};
```

---

**3. 高级功能与技巧**

**组合模式（Composition）**
复用和扩展现有模式：
```typescript
const BaseUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

const AdminUserSchema = BaseUserSchema.extend({
  role: z.enum(["admin", "superadmin"]),
  permissions: z.array(z.string()),
});
```

**自定义错误消息**
提供友好的错误提示：
```typescript
const PasswordSchema = z
  .string()
  .min(8, "密码至少需要 8 个字符")
  .regex(/[A-Z]/, "必须包含大写字母");
```

**数据转换**
在验证前对数据进行预处理：
```typescript
const NumberStringSchema = z.string().transform((val) => parseInt(val, 10));
const number = NumberStringSchema.parse("123"); // 输出 number 类型 123
```

**联合类型与鉴别器**
处理不同类型的数据结构：
```typescript
const CatSchema = z.object({ type: z.literal("cat"), meow: z.boolean() });
const DogSchema = z.object({ type: z.literal("dog"), bark: z.boolean() });

const PetSchema = z.union([CatSchema, DogSchema]);
```

---

**4. safeParse**
parse方法可能会抛出错误，safeParse 方法会返回一个对象，包含 success 属性，表示验证是否成功，如果成功，则包含 data 属性，表示解析后的安全数据。
```ts
const result = schema.safeParse(data);

if (result.success) {
  // 验证成功：result.data 是解析后的安全数据
  console.log(result.data);
} else {
  // 验证失败：result.error 包含错误详情
  console.log(result.error.errors);
}
```

---

**5. 对比其他库（Yup/Joi）**
- TypeScript 集成：Zod 自动生成类型，无需额外维护 `.d.ts` 文件。
- 零依赖：体积小巧，适合浏览器和 Node.js。
- 链式 API：更符合现代 TypeScript 开发习惯。


---

**总结**
Zod 适用于任何需要结构化数据验证的场景，尤其是在 TypeScript 项目中，它能显著提升类型安全和开发效率。常见场景包括表单处理、API 数据校验、配置管理以及状态持久化。通过组合模式、自定义错误和类型推断，Zod 帮助开发者减少样板代码并避免运行时错误。