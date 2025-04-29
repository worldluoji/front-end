# jsonuri
`jsonuri` 是一个用于处理 JSON 数据的 JavaScript 库，支持浏览器和 Node.js 环境。它通过类似 URI 路径的语法简化对复杂 JSON 结构的操作，特别适合需要频繁访问或修改嵌套数据的场景。以下是其主要功能和使用方式：

核心功能
1. 路径化操作  
   使用类似文件路径的语法（如 `user/profile/name`）直接访问或修改 JSON 中的深层嵌套属性，无需手动逐层遍历。

2. 高性能遍历  
   优化了对大规模数据的处理效率，尤其是在涉及数组和嵌套对象时，通过减少冗余计算提升性能。

3. 数据读写方法  
   提供链式调用的 API，包含 `get`（读取）、`set`（写入）、`push`（数组追加）、`delete`（删除属性）等方法，支持对数据的精细控制。

4. 容错处理  
   内置对非法路径或空值的自动判断，避免因路径不存在导致的代码异常。

使用场景
• 动态表单处理：快速定位表单 JSON 中嵌套的字段值。

• API 数据解析：从接口返回的复杂 JSON 中提取特定路径的数据。

• 状态管理：在 Vue/React 等框架中管理深层嵌套的全局状态。


安装与使用
通过 npm 安装：
```bash
npm install jsonuri
```

基础示例：
```javascript
import { get, set } from 'jsonuri';

const data = {
  user: {
    name: "Alice",
    hobbies: ["coding"]
  }
};

// 读取数据
console.log(get(data, "user/name")); // 输出 "Alice"

// 修改数据
set(data, "user/hobbies/1", "music"); 
console.log(data.user.hobbies); // 输出 ["coding", "music"]
```

注意事项
• 路径语法需符合规范，例如使用斜杠 `/` 分隔层级，数组索引从 0 开始。

• 对超大规模数据（如数万条数组）建议分批操作以避免内存压力。

• 在 Vue 等响应式框架中使用时，需确保操作符合数据变更检测规则。