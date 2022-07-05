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

// 命名空间与类进行声明合并，要放在类定义的后面
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
