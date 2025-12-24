/**
 * TypeScript 发布了 5.8 版本，其中有一个改动是添加了 --erasableSyntaxOnly 配置选项，
 * 开启后仅允许使用可擦除语法，否则会报错。
 * enum 就是一个不可擦除语法，开启 erasableSyntaxOnly 配置后，使用 enum 会报错。
 * 
 * 可擦除语法就是可以直接去掉的、仅在编译时存在、不会生成额外运行时代码的语法，
 * 例如 type，interface。
 * 不可擦除语法就是不能直接去掉的、需要编译为JS且会生成额外运行时代码的语法，
 * 例如 enum，namesapce(with runtime code)
 * 
 * reference: https://juejin.cn/post/7478980680183169078
 */

// 1. 数字枚举, developer=2, maintainer=3...
enum Role {
    reportor = 1,
    developer,
    maintainer,
    owner
}

// 枚举就是一个对象
// console.log(Role)

// 2. 字符串枚举
enum Message {
    success = '成功',
    fail = '失败'
}

// 3. 异构枚举, 不建议使用
enum Ok {
    No,
    Yes = 'Yes'
}
// console.log(Ok.No)  0

// 枚举是read-only的，不允许被修改
// Ok.No = 'No'

// 4. 枚举分类
enum EnType {
    // a,b,c 都是 const型枚举，编译时值就确定
    a = 1,
    b = Ok.No,
    c = 1 + 3,

    // computed枚举，程序执行时才会计算，并且在computed枚举后面的成员，必须赋初始值
    d = '1'.length,
    e = Math.random()       
}

// developer
let r: Role = 2
// console.log(r)