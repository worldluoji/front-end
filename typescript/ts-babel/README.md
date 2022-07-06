# ts-babel

## tsc可以编译，为什么还要babel?
开发ts，Babel不是必选项。使用Babel有两个原因，一个是大部分已存系统依赖了Babel，另一个是Babel有非常丰富的插件，它的生态发展得很好。

## 开发typescript使用babel编译
1. 首先要在package.json中引入babel相关依赖，babel7以后才支持编译TypeScript，但是babel不支持类型检查
2. tsc init 生成tsconfig.json，配置"noEmit": true, 表示ts编译器只作类型检查，不做编译（因为编译的事交给babel了）
3. package.json中配置脚本："type-check": "tsc --watch", 这样npm run type-checker即可进行类型检查。

## 注意事项
- namespace，类型断言，常量枚举，默认导出（export = ），这4种，babel无法转换
- 不要混用ts编译器和babel编译
- 优先直接使用ts编译器