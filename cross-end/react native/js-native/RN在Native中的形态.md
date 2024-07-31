# RN 在 Native 中的形态
RN 在 Native 中，可以是独立的页面，也就是整个页面都是 RN，也有可能是局部动态化方案，只有一部分是 RN，其他部分是 Native 或者其他的技术栈。

在 RN 中每一个应用都有一个入口文件，RN 中提供了注册根本应用的方法，那就是 AppRegistry，这一点和 React Web 应用会有一些区别。Web 应用中，主要依赖于 react-dom 中提供的 api ，但是在 RN 项目中，无需再下载 react-dom，取而代之的是 react-native 包。
```jsx
import {AppRegistry} from 'react-native'
/* 根组件 */
import App from './app' 

AppRegistry.registerComponent('MyReactNativeApp', () => <App />)
```
我们拿安卓为例，看一下怎么注册页面。在安卓中，每一个页面都是一个 Activity，在 RN 的 Android 中，有用于管理和渲染 RN 组件的 Android Activity 类。
```java
import com.facebook.react.ReactActivity;

public class MyReactActivity extends ReactActivity {
  @Override
  protected String getMainComponentName() {
    return "MyReactNativeApp"; /* 这里的名称对应你的 RN 应用的名称 */
  }
}
```
现在我们清楚了，在 Native 中 RN 是什么。