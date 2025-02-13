# Expo
Expo is a set of tools and services built around React Native and, while it has many features, the most relevant feature for us right now is that it can get you writing a React Native app within minutes.

first steup: create project in your PC:
```
npx create-expo-app AwesomeProject

cd AwesomeProject
npx expo start
```
second step:

Install the Expo Go app on your iOS or Android phone and connect to the same wireless network as your computer. On Android, use the Expo Go app to scan the QR code from your terminal to open your project. On iOS, use the built-in QR code scanner of the default iOS Camera app.

carveat:

Expo Go allows you to run your React Native app on a physical device without installing iOS and Android native SDKs. Expo Go makes this possible by including a feature-rich native runtime made up of every module in the Expo SDK, so all you need to do to use a module is install the package with npx expo install and reload your app.

The tradeoff is that **the Expo Go app does not allow you to add custom native code — you can only use native modules built into the Expo SDK**. There are many great libraries available outside of the Expo SDK, and you may even want to build your own native library. You can leverage these libraries with development builds, or by using "prebuild" to generate the native projects, or both.


The Expo Go app is a great tool to get started — it exists to help developers quickly get projects off the ground, to experiment with ideas (such as on Snack) and share their work with minimal friction.

If you want to run your app on the iOS Simulator or an Android Virtual Device, please refer to the instructions for "React Native CLI Quickstart" to learn how to install Xcode or set up your Android development environment.

## a0.dev
Expo 出了一个 [a0.dev](https://a0.dev/)，可以一句话生成一个 react native App

核心思路很简单：
- 预先构建好一个最小化的 React Native 模板，包含 Expo 生态里的各种默认配置。
- 使用 Turbo 模块技术，加速包管理和初始化过程，让项目能在几秒钟内搭建完成。
- 自动配置 TypeScript、ESLint、Prettier、Metro 等各种开发工具，避免手动折腾。

## reference
- https://docs.expo.dev/
- https://juejin.cn/post/7470426236615966755