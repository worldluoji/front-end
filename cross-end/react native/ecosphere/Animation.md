# Animation
React Native中，动画常用的方案有这三种：
- 第一种是 React Native 本身提供的 Animated API；
- 第二种是社区提供的 Reanimated 组件；
- 第三种是直接接入设计师使用的 AE 输出的 Lottie 动画。

那这三个方案怎么来进行选择呢？你可以根据具体的业务情况来选择：
- 如果是轻量级的动画，你不想多集成一个库，那你可以直接使用 Animated；
- 如果你对性能要求高又要大规模使用， 那 Reanimated 是你最好的选择；
- 最后 Lottie 的方案，适合那种没有人机交互的、由 UI 直接提供动画配置文件的动画形式。