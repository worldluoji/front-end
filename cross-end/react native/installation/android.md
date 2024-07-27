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


## 其它
如果是 windows, 推荐使用[chocolatey](https://chocolatey.org/install)管理Node、JDK等包。