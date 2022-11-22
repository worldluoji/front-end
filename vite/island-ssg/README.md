# island-ssg

## 安装依赖
```
npm install
```

## cli编译
```
npm run start
```

## island命令link到全局
```
npm link
```

## Dev Server启动
```
island dev .
```


## 问题说明
1. React is not defined 的错误

大家可以把 vite 版本锁定为 3.2.1 即可。当然，加上官方的 react 插件 @vitejs/plugin-react 也能解决这个问题。

具体原因: 我们将 jsx: "react-jsx" 参数配置在 tsconfig.json 里面，vite 在 3.2.1 之后内部不再读取这个参数，导致 jsx 语法编译出现问题。