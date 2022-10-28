interface Am {
    x: number;
    // y: string;
    foo(bar: number): number; // 5
    foo(bar: 'a'): string; // 2
}

// 名字相同，接口会进行合并，即使在不同的文件中
interface Am {
    y: number;
    foo(bar: string): string; // 3
    foo(bar: string[]): string[]; // 4
    foo(bar: 'b'): string; // 1  字符串会被拍到第一位，从下到上
}

let am: Am = {
    x: 1,
    y: 2,
    foo(bar: any) {
        return bar
    }
}
// 接口的非函数的成员应该是唯一的。如果它们不是唯一的，那么它们必须是相同的类型。如果两个接口中同时声明了同名的非函数成员且它们的类型不同，则编译器会报错。
// 对于函数成员，每个同名函数声明都会被当成这个函数的一个重载。
// https://www.tslang.cn/docs/handbook/declaration-merging.html

interface Cloner {
    clone(animal: Animal): Animal;
}
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
}

// 合并声明为：
interface Cloner {
    clone(animal: Dog): Dog;
    clone(animal: Cat): Cat;
    clone(animal: Animal): Animal;
}
// 注意每组接口里的声明顺序保持不变，但各组接口之间的顺序是后来的接口重载出现在靠前位置。


// 命名空间与类进行声明合并，要放在类定义的后面, namespace声明可以用来添加新类型，值和命名空间，只要不出现冲突。
// 如下为Cm添加了一个静态成员state
class Cm {}
namespace Cm {
    export let state = 1
}
console.log(Cm.state)

// 命名空间与函数进行声明合并，要放在函数定义的后面
function Lib() {}
namespace Lib {
    export let version = '1.0'
}
console.log(Lib.version)

// 命名空间与枚举进行声明合并，这样枚举会多一个mix方法
enum Colorm {
    Green,
    White,
    Blue
}
namespace Colorm {
    export function mix() {}
}
console.log(Colorm)


// class C { }和interface C { }可以同时存在并且都可以做为C类型的属性。
class MFoo {
    x: number;
}
  // ... elsewhere ...
interface MFoo {
    y: number;
}

let mf: MFoo = { x: 1, y: 2};
console.log(mf.x + mf.y); // OK