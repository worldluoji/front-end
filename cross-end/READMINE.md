## 跨端说明
跨端，即要一套代码，需要支持多个平台。

常用技术选型如下：
1. React Native: 一套代码可以支持Android和IOS, 不支持小程序，脸书背书
rn 跨端包括逻辑跨端和渲染跨端，rn 的逻辑跨端是基于 js 引擎，通过 bridge 注入一些设备能力的 api，
而渲染跨端则是使用安卓、ios 实现 react 的 virtual dom 的渲染。  

native api 和组件并没有做到双端一致，而且有的时候需要原生配合，混杂 rn 代码和自己扩展的代码导致代码比较难管理。
最著名的事件就是 airbnb 从最大的 react native 支持者到弃用 react native。

2. Flutter: 一套代码支持Android、IOS、WEB，不支持小程序，谷歌背书。
它最大的特点是渲染不是基于操作系统的组件，而是直接基于绘图库（skia）来绘制的，这样做到了渲染的跨端。
逻辑的跨端也不是基于 js 引擎，而是自研的 dart vm 来跨端，通过 dart 语言来写逻辑。

3. Taro: 支持Android、IOS、WEB、小程序，京东背书

4. UniApp: 支持Android、IOS、WEB、小程序

所以：
1. 如果要考虑小程序，又需要跨端的场景，应该从Taro和UniApp之间进行选择
2. 如果不考虑小程序，又需要跨端，可以选择React Native或Flutter
3. 考虑技术人员的技术栈（比如flutter使用dart语言，但团队技术人员只熟悉JS，不熟悉dart，就不应该考虑flutter）