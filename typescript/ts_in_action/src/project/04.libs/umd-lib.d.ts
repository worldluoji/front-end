declare namespace umdLib {
    const version: string
    function doSomething(): void
}

// export as 专门为umd库编写
export as namespace umdLib

export = umdLib
