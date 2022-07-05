// moudule-lib.js的声明文件
declare function moduleLib(options: Options): void

interface Options {
    [key: string]: any
}

// 合并声明，使得moduleLib函数有如下属性
declare namespace moduleLib {
    const version: string
    function doSomething(): void
}

export = moduleLib
