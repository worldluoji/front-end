# Gesture 实现 Android 回弹下拉刷新
实现 Android 回弹下拉刷新的难点在于 Android 的 ScrollView 组件就没有滚动回弹属性 bounces。而 iOS 的 ScrollView 组件是有滚动回弹属性 bounces 的，而且是默认开启的。

在真实的业务开发中，实现双端下拉刷新的正确逻辑是：iOS 基于 bounces 实现，Android 基于手势实现。

要实现回弹下拉刷新，首先要理解 Android 回弹滚动的原理，我们先来看一下 Android 回弹滚动的结构示意图：

<img src="./pics/android bounce.png" />

Android 回弹滚动涉及的结构一共有 5 种:
- 最外层是手机屏幕
- 手机屏幕内有一个比屏幕高一些的 Animated.View。
- Animated.View 比屏幕高出来的部分，正好等于 Loading 视图的高度，Loading 视图这里用 Text 元素代替了。
- Animated.View 和屏幕同高的部分是 ScrollView 视图。
- 在 ScrollView 视图的内部，ScrollView 的内容 Content 部分是比 ScrollView 容器更高的，这样内容才能滚动。


这里有个小细节。并没有使用 absolute 绝对定位将 Text 定位到手机屏幕上方的位置，而是增加了其父容器 Animated.View 的高度。这是因为，以前遇到过 Android 手机子视图超出父容器后不显示的问题。为了避免超出不显示，在 Animated.View  的子视图这里，我采用的是从上到下的默认布局方式，把子视图都包裹在 Animated.View 视图内部，而不是让子视图 Loading 浮在 Animated.View 视图的外面。

回弹下拉核心代码如下：
```JSX
const LOADING_HEIGHT = 30

function PanAndScrollView() {
  const refreshY = useSharedValue(-LOADING_HEIGHT);
  const scrollY = useSharedValue(0); // scrollY：ScrollView 滚动偏移量
  const {height: windowHeight} = useWindowDimensions()
  const wrapperHeight = windowHeight + LOADING_HEIGHT

  const scrollGesture = Gesture.Native()

  const panGesture = Gesture.Pan()
    .onChange(e => {
      // 滚动到顶部或者容器整体偏离正常位置时，可触发手势动画
      if (scrollY.value === 0 || refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value =  Math.max(-LOADING_HEIGHT, refreshY.value + e.changeY) ;
      }
    })
    .onEnd(() => {
      // 松手时，如果容器整体偏离正常位置
      if (refreshY.value !== -LOADING_HEIGHT) {
        // 则使用弹性动画 withSpring，回弹至原位置
        refreshY.value = withSpring(-LOADING_HEIGHT, {
          stiffness:300,
          overshootClamping: true
        })
      }
    })

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: refreshY.value}],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      // 记录偏移量，只读不写
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
        <Animated.View style={[{height: wrapperHeight}, animatedStyle]}>
          <Text style={{height: LOADING_HEIGHT }}>loading...</Text>
          <GestureDetector gesture={Gesture.Simultaneous(scrollGesture, panGesture)}>
            <Animated.ScrollView 
              bounces={false}
              onScroll={scrollHandler}
              scrollEventThrottle={1}>
              {Array(100).fill(1).map((_, index) => (<Text key={index}>{index}</Text>))}
            </Animated.ScrollView>
          </GestureDetector>
        </Animated.View>
  );
}
```