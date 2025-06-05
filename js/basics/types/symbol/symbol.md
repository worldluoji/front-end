# symbol
如果直接在obj上添加一个「可被外界知道的属性」这样好吗？万一obj上本来就存在这个属性呢？
关于Object的key的类型，有两种方式：
- 一种是字符串
- 另一种就是Symbol

使用Symbol的好处就是: 不可被枚举到，只有你知道，不会覆盖别人，别人也没法知道，只要你不把这个 symbol 暴露给别人，别人就不能通过正常手段获取到。
```
从技术上说，symbol 不是 100% 隐藏的。
有一个内建方法 Object.getOwnPropertySymbols(obj) 允许我们获取所有的 symbol。
还有一个名为 Reflect.ownKeys(obj) 的方法可以返回一个对象的 所有 键，包括 symbol。
但大多数库、内建方法和语法结构都没有使用这些方法。
```