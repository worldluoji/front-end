# Vue remote demo
实际可以使用模块联邦实现类似的功能。

该工程使用defineAsyncComponent + vue3-sfc-loader 实现。

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