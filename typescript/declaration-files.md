# 声明文件
TypeScript 作为 JavaScript 的超集，在开发过程中不可避免要引用其他第三方的 JavaScript 的库。
虽然通过直接引用可以调用库的类和方法，但是却无法使用TypeScript 诸如类型检查等特性功能。
为了解决这个问题，需要将这些库里的函数和方法体去掉后只保留导出类型声明，而产生了一个描述 JavaScript 库和模块信息的声明文件。
通过引用这个声明文件，就可以借用 TypeScript 的各种特性来使用库文件了。

假如我们想使用第三方库，比如 jQuery，我们通常这样获取一个 id 是 foo 的元素：
```
$('#foo');
// 或
jQuery('#foo');
```

但是在 TypeScript 中，我们并不知道 $ 或 jQuery 是什么东西：
```
jQuery('#foo');
// index.ts(1,1): error TS2304: Cannot find name 'jQuery'.
```

这时，我们需要使用 declare 关键字来定义它的类型，帮助 TypeScript 判断我们传入的参数类型对不对，
通常我们会把声明语句放到一个单独的文件（jQuery.d.ts）中，这就是声明文件：
```
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
```
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
```
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
```
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
如果是需要扩展原有模块，需要在类型声明文件中先引用原有模块，再使用 declare module 扩展原有模块：
```
// types/moment-plugin/index.d.ts

import * as moment from 'moment';

declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
// src/index.ts

import * as moment from 'moment';
import 'moment-plugin';

moment.foo();
```
declare module 也可用于在一个文件中一次性声明多个模块的类型：

```
// types/foo-bar.d.ts

declare module 'foo' {
    export interface Foo {
        foo: string;
    }
}

declare module 'bar' {
    export function bar(): string;
}
// src/index.ts

import { Foo } from 'foo';
import * as bar from 'bar';

let f: Foo;
bar.bar();
```

<br>

## 自动生成声明文件
如果库的源码本身就是由 ts 写的，那么在使用 tsc 脚本将 ts 编译为 js 的时候，添加 declaration 选项，就可以同时也生成 .d.ts 声明文件了。

我们可以在命令行中添加 --declaration（简写 -d），或者在 tsconfig.json 中添加 declaration 选项。这里以 tsconfig.json 为例：
```
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