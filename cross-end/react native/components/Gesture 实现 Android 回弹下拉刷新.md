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
  const refreshY = useSharedValue(-LOADING_HEIGHT); // refreshY：Animated.View 拖拽偏移量;默认 refreshY 的值为 -30，也就是 LOADING_HEIGHT 的负值，此时正好把 Loading  隐藏在屏幕外。
  
  const scrollY = useSharedValue(0); // scrollY：ScrollView 滚动偏移量;由于 ScrollView 的滚动偏移量是由原生平台控制的，Animated 动画库和 Gesture 手势库都控制不了，因此 scrollY 只可读、不可写。读取 scrollY 靠的是 ScrollView 的 onScroll 回调和 Reanimated 的 useAnimatedScrollHandler 的配合，整个过程在 UI 线程中进行。另外，我们也通过 scrollEventThrottle 属性，将两次 onScroll 回调的执行间隔设置为 1ms，以此来保证获取 scrollY 的时效性。

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
原理图如下：

<img src="./pics/gestrue scroll principal.png" />


## 多视图多手势的冲突问题
上面的Android 回弹下拉刷新功能，大体上是能用的，但是它还有两个小的体验问题。

首先是 Loading 本身不能不响应拖拽手势，这就限制了回弹下拉刷新功能的通用性。如果你想把 Loading 替换成类似淘宝二楼的效果，用刚刚我们实现的下拉刷新组件来做就会有 Bug。要知道，二楼视图的高度可要比只有 30 像素的 Loading 高很多，用户很容易拖拽到二楼视图，如果用户拖拽后发现没有反应，肯定会感觉到很奇怪。

淘宝二楼的效果通常指的是当用户在首页下拉时，会有一个新的视图层（二楼）滑入，而不是直接刷新页面。

<img src="./pics/tb second.jpg" />

另外一个体验方面的问题是，不松手而是反向滚动或拖拽这个步骤时，滚动动画和拖拽动画都没有禁止，二者可能会同时触发，这会导致出现两个叠加视图偏移问题。


解决多视图多手势的冲突问题，我们首先要学会站在单个手势的视角来解决这个问题，示意图如下：

<img src="./pics/Gusture conflict.png" />

示意图中左边的部分，就是站在拖拽手势的视角来解决冲突问题的。拖拽手势是这么想的：既然你想在响应我拖拽手势的同时响应轻按、滚动手势，那我可以<strong>提供一个方法函数，你把轻按、滚动手势都告诉我吧</strong>。

然后我们再看示意图中右边的部分，在这种情况下，我们希望允许用户同时使用滚动手势(列表滚动)和拖拽手势（下拉刷新），但是又不希望滚动动画和拖拽动画同时执行，因为这会导致用户体验上的混乱和视觉上的不连贯。但滚动手势并不知道拖拽动画是否能执行。


为了解决这个问题，提出了以下思路：
- 创建一个“假的轻按手势”。这个轻按手势实际上是一个用来协调滚动手势和拖拽手势的信号。
- 当拖拽动画不可执行时（比如用户正在拖拽一个不能移动的视图），通过结束这个轻按手势来给滚动手势发送一个信号。
- 滚动手势监听到轻按手势结束后，会认为此时拖拽动画不会执行，因此可以安全地开始执行滚动动画。

以上就是我们站在手势的视角，解决两个下拉刷新体验问题的核心思路，这也是为什么前面的示意图中会多一个轻按手势的原因。


新的 JSX 结构的实现，代码如下：
```JSX
<GestureDetector gesture={panGesture}>
  <Animated.View style={[{height: wrapperHeight}, animatedStyle]}>
    <Text>loading...</Text>
    <GestureDetector gesture={Gesture.Simultaneous(scrollGesture, tapGesture)}>
      <Animated.ScrollView/>
    </GestureDetector>
  </Animated.View>
</GestureDetector>
```
这段代码就是站在视图的视角，把手势和视图绑定在一起了。这里有三个手势，分别是 panGesture、scrollGesture、tapGesture。当你手指触碰到外层容器 Animated.View 时，panGesture 就会响应。这样无论你是触碰到它的子容器 Text，还是 ScrollView ，都能触发 panGesture 手势。

而 scrollGesture 手势只能在触碰到 ScrollView 视图时进行响应，而且我还配了一个控制滚动动画是否执行的 tapGesture 手势。

接下来的代码，就是站在 panGesture 手势的视角，让它支持和 scrollGesture、tapGesture 这两个手势同时响应，示例代码如下：
```JSX
const tapGesture = Gesture.Tap()
const scrollGesture = Gesture.Native()
const panGesture = Gesture.Pan()
    .simultaneousWithExternalGesture(scrollGesture, tapGesture)
```
这段代码的意思是，在响应我 panGesture 手势时，可以同时响应 scrollGesture、tapGesture 手势。

Gesture 手势库中的 9 个手势，每个手势对象上都有 simultaneousWithExternalGesture 方法，该方法接收若干个其他手势作为参数，作用是让该手势能和若干个其他手势同时进行响应。

然后我们再站在 scrollGesture 手势的视角，让它在整体视图没有回归到正常位置的时候，不执行滚动动画，示例代码如下：
```jsx
// hack: 使用 tapGesture 手势作为控制 scrollGesture 是否执行动画的开关
// 并不是真正的要响应 Tap 手势
const tapGesture = Gesture.Tap()
  .onTouchesMove((_, manager) => {
      // 如果 ScrollView 容器没有顶到屏幕顶部
    if (LOADING_HEIGHT + refreshY.value === 0) {
        // 则设置 Tap 手势内部状态为 FAILED
      manager.fail();
    } else {
        // 其他情况则设置 Tap 手势内部状态为 ACTIVE
        // 因为 Tap 手势实际触发了，所以内部也会调用
        // 这里又显式调用了一次，为的是让大家看得更明白一些。
      manager.activate();
    }
  })
  .maxDuration(1000000);

  const scrollGesture = Gesture.Native()
    // 当 Tap 手势内部状态为 ACTIVE 时，滚动动画不执行
    // 当 Tap 手势内部状态为 FAILED 时，滚动动画执行
    .requireExternalGestureToFail(tapGesture);
```
requireExternalGestureToFail 方法在 Gesture 手势库中的 9 个手势对象上都能调用。该方法接收若干个其他手势作为参数，只有在其他若干个手势都失败后，该手势才会变为 ACTIVE 响应，在滚动手势上表现为执行滚动动画。

优化后得代码如下：
```JSX
const LOADING_HEIGHT = 200;

function PanAndScrollView() {
  const refreshY = useSharedValue(-LOADING_HEIGHT);
  const scrollY = useSharedValue(0);
  const {height: windowHeight} = useWindowDimensions();
  const wrapperHeight = windowHeight + LOADING_HEIGHT;

  const tapGesture = Gesture.Tap()
    .onTouchesMove((_, manager) => {
      if (LOADING_HEIGHT + refreshY.value === 0) {
        manager.fail();
      } else {
        manager.activate();
      }
    })
    .maxDuration(1000000);

  const scrollGesture = Gesture.Native()
    .requireExternalGestureToFail(tapGesture);

  const panGesture = Gesture.Pan()
    .onChange(e => {
      if (scrollY.value === 0 || refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value = Math.max(-LOADING_HEIGHT, refreshY.value + e.changeY);
      }
    })
    .onEnd(() => {
      if (refreshY.value !== -LOADING_HEIGHT) {
        refreshY.value = withSpring(-LOADING_HEIGHT, {
          stiffness: 300,
          overshootClamping: true,
        });
      }
    })
    .simultaneousWithExternalGesture(scrollGesture, tapGesture);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: refreshY.value}],
    };
  });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: e => {
      scrollY.value = e.contentOffset.y;
    },
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[{height: wrapperHeight}, animatedStyle]}>
        <Text style={{height: LOADING_HEIGHT,}}>
          loading...
        </Text>
        <GestureDetector
          gesture={Gesture.Simultaneous(scrollGesture, tapGesture)}>
          <Animated.ScrollView  onScroll={scrollHandler} scrollEventThrottle={1}>
             {Array(100).fill(1).map((_, index) => (<Text key={index}>{index}</Text>))}
          </Animated.ScrollView>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  );
}
```