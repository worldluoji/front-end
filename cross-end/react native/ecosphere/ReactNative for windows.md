# ReactNative for windows
可用于开发window、mac的桌面应用。比PyWebview、Electron性能更好。

windows参考： https://microsoft.github.io/react-native-windows/

macos参考：https://microsoft.github.io/react-native-windows/docs/rnm-getting-started

会提示使用 @react-native-community/cli
```shell
npx @react-native-community/cli init RnMacDemo --version 0.76.0
```

---

## 注意
整个工程的路径里不能有空格，否则会的错误：React-Codegen Error when build iOS

https://github.com/facebook/react-native/issues/44625


运行之前
```shell
npx react-native run-macos
```
需要启动metro服务：
```shell
npx react-native start
```
否则报错： react-native No bundle URL present...