# erasableSyntaxOnly
TypeScript 发布了 5.8 版本，其中有一个改动是添加了 --erasableSyntaxOnly 配置选项，开启后仅允许使用可擦除语法，否则会报错。enum 就是一个不可擦除语法，开启 erasableSyntaxOnly 配置后，使用 enum 会报错。

例如，如果在 tsconfig 文件中配置 "erasableSyntaxOnly": true（只允许可擦除语法），此时使用不可擦除语法，将会得到报错。

可擦除语法就是可以直接去掉的、仅在编译时存在、不会生成额外运行时代码的语法，例如 type。不可擦除语法就是不能直接去掉的、需要编译为JS且会生成额外运行时代码的语法，例如 enum。 

具体举例如下：
- 可擦除语法，不生成额外运行时代码，比如 type、let n: number、interface、as number 等。
- 不可擦除语法，生成额外运行时代码，比如 enum、namespace、类属性参数构造语法糖（Class Parameter properties）等

官方既然没有直接表达不推荐 enum，那为什么要出 erasableSyntaxOnly 配置来排除 enum 呢？
因为之前 Node 新版本中支持了执行 TS 代码的能力，可以直接运行包含可擦除语法的 TypeScript 文件。


## enum使用建议
- TypeScript 的 enum 在编译后会生成额外的 JavaScript 双向映射数据，这会增加运行时的开销
- enum 默认的枚举值从 0 开始，你传入了默认枚举值时，居然是合法的，这无形之中带来了类型安全问题
- 不支持枚举值字面量

```ts
enum METHOD {
    ADD = 'add'
}

function doAction(method: METHOD) {
  // some code
}

doAction(METHOD.ADD) // ✅ 可以
doAction('add') // ❌ 不行	
```

建议方案：
```ts
type METHOD =
  | 'add'
  /**
   * @deprecated 不再支持删除
   */
  | 'delete'
  | 'update'
  | 'query'


function doAction(method: METHOD) {
    // some code
}

doAction('delete') // ✅ 可行，没有 TSDoc 提示
doAction('remove') // ❌ 不行
```