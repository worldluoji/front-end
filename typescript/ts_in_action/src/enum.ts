
// 1. 数字枚举
enum Role {
    reportor = 1,
    developer,
    maintainer,
    owner
}

// 枚举就是一个对象
console.log(Role)

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
console.log(Ok.No)

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
console.log(r)