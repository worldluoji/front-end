# 声明文件
TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。
虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。
为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。
通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。

假如我们想使用第三方库，比如 jQuery，我们通常这样获取一个 id 是 foo 的元素：
```js
$('#foo');
// 或
jQuery('#foo');
```

但是在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西：
```ts
jQuery('#foo');
// index.ts(1,1): error TS2304: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对，
通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件：
```ts
declare var jQuery: (selector: string) => any;
jQuery('#foo');
```
一般来说，ts 会解析项目中所有的 *.ts 文件，当然也包含以 .d.ts 结尾的文件。
所以当我们将 jQuery.d.ts 放到项目中时，其他所有 *.ts 文件就都可以获得 jQuery 的类型定义了。

假如仍然无法解析，那么可以检查下 tsconfig.json 中的 files、include 和 exclude 配置，确保其包含了 jQuery.d.ts 文件。

## 全局类型
- declare var 是最简单的，它能够用来定义一个全局变量的类型。与其类似的，还有 declare let 和 declare const
- 当全局变量是一个类的时候，我们用 declare class 来定义它的类型
- declare function 用来定义全局函数的类型, 示例见ts_in_action/src/project/04.libs/global-lib.d.ts
- 使用 declare enum 定义的枚举类型也称作外部枚举（Ambient Enums），举例如下：
```ts
// src/Directions.d.ts
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
// src/index.ts
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
```
与其他全局变量的类型声明一致，declare enum 仅用来定义类型，而不是具体的值。

<br>

## declare namespace
namespace 是 ts 早期时为了解决模块化而创造的关键字，中文称为命名空间。

随着 ES6 的广泛应用，现在已经不建议再使用 ts 中的 namespace，而推荐使用 ES6 的模块化方案了。

namespace 被淘汰了，但是在声明文件中，declare namespace 还是比较常用的，它用来表示全局变量是一个对象，包含很多子属性。
```ts
// src/jQuery.d.ts
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
// src/index.ts

jQuery.ajax('/api/get_something');
```

<br>

## interface 和 type
除了全局变量之外，可能有一些类型我们也希望能暴露出来。
在类型声明文件中，我们可以直接使用 interface 或 type 来声明一个全局的接口或类型

暴露在最外层的 interface 或 type 会作为全局类型作用于整个项目中，我们应该尽可能的减少全局变量或全局类型的数量。故最好将他们放到 namespace 下：
```ts
// src/jQuery.d.ts
declare namespace jQuery {
    interface AjaxSettings {
        method?: 'GET' | 'POST'
        data?: any;
    }
    function ajax(url: string, settings?: AjaxSettings): void;
}
```

<br>

## 第三方声明文件
一些声明文件不需要我们定义了，社区已经帮我们定义好了，我们可以直接下载下来使用，
但是更推荐的是使用 @types 统一管理第三方库的声明文件。

@types 的使用方式很简单，直接用 npm 安装对应的声明模块即可，以 jQuery 举例：
```
npm install @types/jquery --save-dev
```
第三方声明文件可以在
```
https://www.typescriptlang.org/dt/searchhttps://www.typescriptlang.org/dt/search
```
进行搜索。

<br>

## declare module
如果是需要扩展原有模块，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块, 看一个vue的例子：
```ts
// shims-vue.d.ts

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
```
declare module '*.vue' : 这行代码声明了一个模块，匹配所有以 .vue 结尾的文件。* 是通配符，表示任意文件名。

import { DefineComponent } from 'vue'; : 引入 Vue 的 DefineComponent 类型。这是 Vue 3 中定义组件的类型，它具有良好的类型推断和检查功能。

const component: DefineComponent<{}, {}, any>; : 定义一个常量 component，它的类型是 DefineComponent，并且泛型参数设置为 {} 表示没有 props 和 methods 的基本 Vue 组件类型。any 用来宽泛地表示组件的任意状态。

export default component; : 将这个组件类型默认导出。这样，当你在 TypeScript 文件中导入 .vue 文件时，TypeScript 就知道导入的内容是一个 Vue 组件。

<br>

## npm包声明文件编写
包声明文件的编写，一般是创建一个 types 目录，专门用来管理自己写的声明文件，
将 foo 的声明文件放到 types/foo/index.d.ts 中。
这种方式需要配置下 tsconfig.json 中的 paths 和 baseUrl 字段。
目录结构：
```
/path/to/project
├── src
|  └── index.ts
├── types
|  └── foo
|     └── index.d.ts
└── tsconfig.json
```
tsconfig.json 内容：
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "baseUrl": "./",
        "paths": {
            "*": ["types/*"]
        }
    }
}
```
npm 包的声明文件主要有以下几种语法：
- export 导出变量
- export namespace 导出（含有子属性的）对象
- export default ES6 默认导出
- export = commonjs 导出模块

我们可以使用 declare 先声明多个变量，最后再用 export 一次性导出。
```ts
// types/foo/index.d.ts
declare const name: string;
declare function getName(): string;
declare class Animal {
    constructor(name: string);
    sayHi(): string;
}
declare enum Directions {
    Up,
    Down,
    Left,
    Right
}
interface Options {
    data: any;
}

export { name, getName, Animal, Directions, Options };
```
注意，与全局变量的声明文件类似，interface 前是不需要 declare 的。


### export namespace
与 declare namespace 类似，export namespace 用来导出一个拥有子属性的对象：
```ts
export namespace foo {
    const name: string;
    namespace bar {
        function baz(): string;
    }
}
// src/index.ts

import { foo } from 'foo';

console.log(foo.name);
foo.bar.baz();
```

## 自动生成声明文件
如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。

我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
```json
{
    "compilerOptions": {
        "module": "commonjs",
        "outDir": "lib",
        "declaration": true,
    }
}
```
上例中我们添加了 outDir 选项，将 ts 文件的编译结果输出到 lib 目录下，
然后添加了 declaration 选项，设置为 true，表示将会由 ts 文件自动生成 .d.ts 声明文件，也会输出到 lib 目录下。

<br>

## 参考
- https://ts.xcatliu.com/basics/declaration-files.html
- https://www.tslang.cn/docs/handbook/declaration-files/by-example.html