# bcrypt
`bcrypt` 是一个用于密码哈希的库，专门设计用于安全存储用户密码。它通过加盐（Salting）和自适应成本（Work Factor）机制抵御暴力破解和彩虹表攻击，是处理敏感信息（如密码）的行业标准工具之一。以下是 `bcrypt` 的核心用法和场景分析。

---

**1. 核心概念**
**为什么选择 bcrypt？**
- 抗暴力破解：通过调整哈希计算成本（`rounds`），增加暴力破解的时间代价。

- 自动加盐：每次哈希生成的盐值不同，相同密码的哈希结果不同，防止彩虹表攻击。

- 行业标准：长期经受安全审查，广泛用于生产环境。


**哈希流程**
1. 生成盐值（Salt）：随机字符串，与密码混合后哈希。
2. 哈希密码：使用盐值和指定计算成本（`rounds`）生成最终哈希值。
3. 验证密码：用户登录时，用存储的盐值和输入密码重新计算哈希，与存储值比对。

---

**2. 安装与基础使用**
```bash
npm install bcrypt
```

**哈希密码**
```javascript
import bcrypt from "bcrypt";

// 异步哈希（推荐）
const hashPassword = async (plainPassword) => {
  const saltRounds = 10; // 计算成本（通常 10-12）
  const hash = await bcrypt.hash(plainPassword, saltRounds);
  return hash;
};

// 示例
const userPassword = "mySecret123";
const hashedPassword = await hashPassword(userPassword);
console.log(hashedPassword); // 输出类似: $2b$10$3euPcmBFOdRv6q0V7fTXY...
```

**验证密码**
```javascript
const verifyPassword = async (plainPassword, hash) => {
  const isMatch = await bcrypt.compare(plainPassword, hash);
  return isMatch;
};

// 示例
const isPasswordValid = await verifyPassword("mySecret123", hashedPassword);
console.log(isPasswordValid); // true 或 false
```

---

**3. 核心场景**
**场景 1：用户注册流程**
存储用户密码时，永远不保存明文：
```javascript
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // 将 username 和 hashedPassword 存入数据库
  await saveUserToDB(username, hashedPassword);
  res.send("注册成功！");
});
```

**场景 2：用户登录验证**
用户登录时，对比哈希值：
```javascript
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await getUserFromDB(username);

  if (!user) return res.status(404).send("用户不存在");
  
  const isValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isValid) return res.status(401).send("密码错误");

  // 验证通过，生成 Token 或 Session
  res.send("登录成功！");
});
```

**场景 3：密码策略升级**
当需要提升哈希强度（如从 `rounds=10` 升级到 `rounds=12`）时，在用户下次登录时重新哈希：
```javascript
// 用户登录成功后检查是否需要升级
if (user.passwordVersion < 2) {
  const newHash = await bcrypt.hash(password, 12);
  await updateUserPassword(user.id, newHash, 2);
}
```

---

**4. 关键配置与安全建议**
**计算成本（`saltRounds`）**
- 默认值：10（平衡安全性与性能）。

- 推荐范围：生产环境建议 10-12，数值每增加1，计算时间翻倍。

- 测试环境：可设置为4-6加速测试。


**同步 vs 异步**
- 异步方法（`bcrypt.hash`/`bcrypt.compare`）：非阻塞，适合服务器环境。

- 同步方法（`bcrypt.hashSync`/`bcrypt.compareSync`）：仅适合脚本或初始化阶段。


**错误处理**
始终捕获潜在错误（如无效哈希格式）：
```javascript
try {
  await bcrypt.compare("password", invalidHash);
} catch (err) {
  console.error("验证失败:", err);
}
```

---

**5. 与其他库的对比**
| 库          | 特点                                                                 |
|-------------|----------------------------------------------------------------------|
| bcrypt  | 专为密码设计，自动加盐，抗 GPU/ASIC 破解，简单易用。                 |
| scrypt  | 内存密集型算法，抗硬件破解更强，但配置复杂。                          |
| PBKDF2  | 通用密钥派生函数，需手动加盐，依赖迭代次数，不如 bcrypt/scrypt 安全。 |

---

**6. 常见问题**
**哈希值结构**
bcrypt 哈希值包含算法版本、盐值和哈希结果，例如：
```
$2b$10$3euPcmBFOdRv6q0V7fTXYe5Z6W6dFv9K3pW7s1WQzJv4dL4Nxj5O
└─┬─┘└─┬─┘└───────────────────────┬───────────────────────┘
  │    │                          │
算法  计算成本                    盐值 + 哈希结果
```

**版本兼容性**
- `$2a$`：旧版本，部分实现有漏洞。

- `$2b$`：修复了漏洞的版本（推荐）。


---

**7. 总结**
`bcrypt` 是处理用户密码的黄金标准工具，适用于：
- 用户注册/登录系统。

- 敏感数据存储（如 API 密钥）。

- 需要抵御暴力破解和彩虹表攻击的场景。


通过合理配置 `saltRounds` 和结合异步操作，可以在安全性和性能之间取得平衡。始终遵循“不存储明文密码”的原则，结合 HTTPS 和其他安全措施，构建可靠的身份验证系统。