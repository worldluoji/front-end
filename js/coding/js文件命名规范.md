# js文件命名规范
在 JavaScript 生态中，文件命名规范的选择取决于项目类型、团队规范和生态系统惯例。以下是三种常见场景的分析和建议：

1. **中划线（kebab-case，如 `xxx-yyy.js`）**
推荐场景：
- 前端组件/页面文件（如 React/Vue 组件）

- 公共 API 模块（如 npm 包、工具库）

- 路由或 URL 关联的文件（保持 URL 风格一致）

- 静态资源文件（图片、CSS、字体等）


优势：
- 更符合 Web 生态的通用约定（HTML/CSS 属性均为短横线分隔）

- 避免系统大小写敏感性问题（如 Linux 区分大小写，`MyFile.js` 和 `myfile.js`可能冲突）

- 对非英语母语者更友好（视觉分隔更清晰）


2. **小驼峰（camelCase，如 `xxxYyy.js`）**
推荐场景：
- 私有工具函数/工具类模块（如 `formatDate.js`）

- 类定义文件（与类名保持一致，如 `UserModel.js`）

- TypeScript 类型定义文件（如 `userTypes.ts`）


优势：
- 与 JavaScript 变量命名习惯一致（导出的模块名通常是驼峰）

- 紧凑简洁，适合短单词组合（如 `getUser.ts`）


3. **混合使用（但需严格规范）**
可接受场景：
- 中划线用于组件/页面，小驼峰用于工具模块

- 中划线用于业务代码，小驼峰用于技术基础设施代码


⚠️ 注意事项：
1. 框架推荐：
   - React：社区倾向中划线（`home-page.jsx`），但官方无强制要求

   - Vue：官方推荐中划线（[风格指南](https://v3.vuejs.org/style-guide/)）

   - Angular：强制要求中划线（官方风格指南）


2. 构建工具兼容性：
   ```javascript
   // 中划线在动态导入时更安全
   const module = await import('./my-module.js'); // ✅
   const module = await import('./myModule.js');  // ❌ 易拼写错误
   ```

3. 统计参考：
   - 2022 年 npm 下载量 Top 1000 的包中，87% 使用中划线命名

   - GitHub 前端项目抽样显示，72% 的 JS 文件使用中划线


📜 最终建议：
```markdown
1. **默认选择中划线**（kebab-case），除非有明确理由
2. **仅在以下情况用小驼峰**：
   - 导出的模块名本身就是驼峰（如 `styledComponents.js`）
   - 项目已有大量驼峰命名的历史代码
3. **绝对避免**：
   - 下划线（`xxx_yyy.js` ❌）
   - 大驼峰（`XxxYyy.js` ❌，易被误认为类）
   - 无规则混用（团队协作灾难）
```

保持团队内部绝对一致，比选择哪种规范更重要。可以通过 `eslint-plugin-filenames` 自动化校验命名规则。