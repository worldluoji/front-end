# React Native Android环境搭建
安卓的安装，基本参考（官网）(https://reactnative.dev/docs/set-up-your-environment)即可，
有几个注意点。

第一，**国内需要设置代理**
```
腾讯： https://mirrors.cloud.tencent.com/AndroidSDK/
阿里： https://mirrors.aliyun.com/android.googlesource.com/
```
<img src="./pics/Android Proxy.webp" />

第二，**HAXM安装可能会出错**
```
Intel® HAXM installation failed. To install Intel® HAXM follow the instructions found at: https://github.com/intel/haxm/wiki/Installation-Instructions-on-Windows
```
HAXM不装的情况下模拟器也是能运行的，装了HAXM只是会提高模拟器运行的流畅程度。
[这里](https://blog.csdn.net/qq_24033983/article/details/123335806)。

第三，当前官网已经明确说明Android Studio编译**不支持arm版windows**，arm版windows还需要等等。


## grandle慢的问题
一是解决相关依赖包慢的问题，替换为阿里云源，也可以替换腾讯、中科院的，
修改文件：settings.gradle.kts 或 build.gradle, 添加镜像源：
```
maven { url = uri("https://maven.aliyun.com/repository/public/") }
maven { url = uri("https://maven.aliyun.com/repository/google/") }
maven { url = uri("https://maven.aliyun.com/repository/jcenter/") }
maven { url = uri("https://maven.aliyun.com/repository/central/") }
maven { url = uri("https://maven.aliyun.com/repository/gradle-plugin/") }
maven { url = uri("https://dl.google.com/dl/android/maven2/") }
```
而是解决gradle包本身慢的问题，可以使用国内源，比如：
```
https://mirrors.cloud.tencent.com/gradle/
```
此时需要修改gradle/wrapper/gradle-wrapper.properties文件，
修改distributionUrl：
```
https://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```

<br>

## 包位置
如果不想包都在C盘，就要设置如下环境变量：
- 变量名：ANDROID_SDK_HOME 变量值：D:\Software\Android.android
- 变量名：GRADLE_USER_HOME 变量值：D:\Software\Android.gradle

第一个是说Android SDK、模拟器等，都放到D盘对应目录，第二个是说把依赖的包放到D盘对应目录

## 其它
如果是 windows, 推荐使用[chocolatey](https://chocolatey.org/install)管理Node、JDK等包。