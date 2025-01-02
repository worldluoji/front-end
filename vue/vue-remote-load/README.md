# Vue remote demo
实际可以使用模块联邦实现类似的功能。

该工程使用 defineAsyncComponent + vue3-sfc-loader 实现。

## 启动步骤
启动远程服务：
```shell
cd remote
http-server -p 8096 --cors
```

启动vue本地工程
```shell
cd ..
pnpm dev
```

## vue3-sfc-loader 
vue3-sfc-loader 是一个用于加载和解析Vue单文件组件（SFC, Single File Component）的工具。

defineAsyncComponent实际加载的是解析后的 Vue SFC 对象。

https://github.com/FranckFreiburger/vue3-sfc-loader