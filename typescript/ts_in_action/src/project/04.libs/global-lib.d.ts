// 全局库的声明文件
declare function globalLib(options: globalLib.Options): void;

// namespace进行声明合并，使得上面的globalLib函数，有了如下的属性
// version,doSomething就是全局库中定义的
declare namespace globalLib {
    const version: string;
    function doSomething(): void;
    interface Options {
        [key: string]: any
    }
}

// interface Options 也可以放到namespace外面，但这样就暴露到全局了