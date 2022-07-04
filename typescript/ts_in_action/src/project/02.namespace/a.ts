namespace Shape {
    // pi只能在Shape这个namespace下使用
    const pi = Math.PI
    export function cricle(r: number) {
        return pi * r ** 2
    }
}
// 命令空间是可以同名分布在不同的文件的，
// 比如b.ts中也有一个namespace Shape，里面的成员都共享这个namespace