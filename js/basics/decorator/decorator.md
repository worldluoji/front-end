# decorator
​JavaScript 装饰器（Decorators）​：一个 Stage 3 阶段的提案，语法为 @decorator，功能类似注解，但更专注于修改类/方法的行为。

## 与 TypeScript 的协作
目前，TypeScript 通过 experimentalDecorators 选项支持装饰器：

```json
// tsconfig.json
{
  "compilerOptions": {
    "experimentalDecorators": true
  }
}
```

当前对 JavaScript 的装饰器保持关注即可。