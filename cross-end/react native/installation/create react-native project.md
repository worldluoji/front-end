# create react-native project
Android或者IOS环境配置好后，可以用如下命令创建 React Native工程：
```shell
npx react-native@latest init AwesomeProject
```
运行上述命令后，会依次下载 JavaScript/Java/Objective-C 的相关依赖和项目模板，如果没有配置 NPM、Maven 或 CocoaPods 的相关镜像，很有可能会遇到运行失败的问题。


在项目的根目录中，运行如下命令，它会帮你在本地启动一个 React Native 构建服务。
```shell
# 如果在 Android 目录，需要 cd ../ 到根目录
$ npx react-native start
```

<br>

## 常见问题
启动时报错模拟器错误
```
AndroidStudio Android Unknown failure: Can't find service: package
```
解决方案：在Device Manager中，选中的你的模拟器 , 设置, 启动模式选择 Cold Boot。