# Navigation
尽管导航是开发 React Native App 必不可少的工具之一，但 React Native 框架并未将其内置，需要开发者自己进行集成。在 2018 年之前，业内用得比较多的导航是 React Native Navigation，在 2018 年之后大家用得更多的是 React Navigation。它们的名字很相似，不过你可千万不要搞混了，目前官方推荐的、主流的导航是 **React Navigation**，而不是 React Native Navigation。

## 导航基础
要实现一个基础的跳转导航，一共需要三步：
- 创建“导航地图”；
- 携带参数跳转页面；
- 页面接收和解析参数。

假设有两个页面：
```JSX
function Discover() {
  return <Text>发现视图</Text>
}
function Detail() {
  return <Text>详情视图</Text>
}
```
有了页面，就可以**创建导航**，需要使用到 React Navigation 提供的容器组件 NavigationContainer ，以及创建导航的方法 createNativeStackNavigator，示例如下：
```JSX
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Discover">
        <Stack.Screen name="Discover" component={Discover} />
        <Stack.Screen name="Detail" component={Detail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
```
要创建页面，我们首先要从 @react-navigation/native 库中引入 NavigationContainer 容器组件，并将其放在最外层包裹住整个 App 的 JSX 元素。然后从 @react-navigation/native-stack 库中引入 createNativeStackNavigator 方法，并使用它来**创建原生堆栈导航 Stack**。

原生堆栈导航 Stack，是用来创建页面和收集该导航下有哪些页面的。创建页面用的是 Stack.Screen 组件，收集页面用的是 Stack.Navigator 组件。initialRouteName 设置成了 Discover，目的是告诉导航展示的默认页面是 Discover 页面。

需要提醒你的是，在上述示例中，页面名字和函数组件名字用的叫法是一样的，这只是为了好理解，实际上页面名字和组件名字可以取不同的名字，甚至你可以通过同一个组件来创建多个页面。示例代码如下：
```JSX
<Stack.Navigator initialRouteName="Discover1">
  <Stack.Screen name="Discover1" component={Discover} />
  <Stack.Screen name="Discover2" component={Discover} />
  <Stack.Screen name="Discover3" component={Discover} />
</Stack.Navigator>
```
如上所示，你可以使用 Discover 函数组件同时创建三个不同名字的页面 Discover1、Discover2、Discover3。

有了导航地图，就可以实现**页面跳转**，实现页面之间跳转，最常用的方法就是使用 navigation.navigate 函数。
```JSX
// 函数组件默认是没有 navigation 对象的
// 当函数组件通过 Stack.Screen 生成页面时，才会有 navigation 对象
function Discover({navigation}) {
  return (
       <Pressable onPress={()=> {
            navigation.navigate('Detail');
       }}>
          <Image source={require('./images/dog.png')} />
      </Pressable>
  );
}

function Detail() {  
  return (
    <View>
      <Text>旺财旺财旺财~</Text>
      <Image source={require('./images/dog.png')} />
    </View>
  )
}
```

然后就是要解决携带参数跳转的问题。
```JSX
const ALL_NTF = [
  {/* ... */},
  {
    describe: '旺财旺财旺财~',
    image: require('./images/dog.png'),
  },
  {/* ... */},
];

function Discover({navigation}) {
  return (
    {/* ... */}
       <Pressable onPress={()=> {
            navigation.navigate('Detail', ALL_NTF[1]);
       }}>
          <Image source={ALL_NTF[1].image} />
      </Pressable>
    {/* ... */}
  );
}

function Detail({route}) {
  const { describe, image }  = route.params
  return (
    <View>
      <Text>{describe}</Text>
      <Image source={image} />
    </View>
  )
}
```
当你使用 Stack.Screen 创建页面时，用来创建页面的函数组件就会同时获取到 navigation 对象和 route 对象。其中 navigation 对象的主要作用是跳转，route 对象的主要作用是获取自定义参数。

返回的相关工作，React Navigation 会帮你处理，它会给页面创建导航栏，并帮助页面处理返回相关手势动画。在导航栏中会有个回退到上一个页面的返回按钮，除此之外，它还支持 iOS 侧滑手势返回上个页面，以及 Android 点击底部虚拟回退按钮返回上级页面。

<br>

## 自定义参数
使用 React Navigation 创建出来的页面，有两类属性值比较常用，它们是：
- params：它是开发者自定义参数，通常用来渲染页面主体的数据，它是挂在 route 上的对象；
- options：它是导航相关的配置属性，包括手机顶部的状态栏、页面的标题栏、导航相关手势等等。

<img src="./pics/navigation params.webp" />

在一些场景下，params 和 options 并不是固定的，当前页面也可以根据实际情况使用 setParams 和 setOptions 方法，对二者进行重新设置。initialParams示例代码如下：
```JSX
// 数据
const ALL_NTF = [
  {title: 'Kitty',...},
  {title: '旺财', ...},
  {title: 'Simba', ...},
];

// 页面声明
<Stack.Screen name="Detail" initialParams={ALL_NTF[0]} component={Detail} />

// （1）跳转页面，携带 Params
navigation.navigate('Detail', ALL_NTF[1]);
// （2）跳转页面，不携带 Params，使用默认的 initialParams
navigation.navigate('Detail');
```
在页面跳转的过程中，initialParams 对象和 params 对象会进行对象合并，而不是替换，演示代码如下：
```
// 对象合并 
跳转时： params {price: 99.9 }
配置的： initialParams {symbol: '$'}
获取后： route.params {symbol: '$', price: 99.9 }
```
重置 params 参数，用到的是 **navigation.setParams** 方法，示例代码如下：
```JSX
// 初始化 params：{symbol: '$', price: 99.9, image: 'dog.png' }
// 重置后 params：{symbol: '￥', price: 629.37, image: 'dog.png' }
function Detail({route, navigation}) {  
  const { price, symbol, image} = route.params 
  return (
      <>
        <Image source={image} />
      <Text>{symbol}{price}</Text>
      <Text onPress={() =>{
        if (symbol === '￥') return 
        navigation.setParams({
          symbol:'￥',
          price: price * 6.3 
        })  
      }}>切换成￥</Text>
    </>
     )
}
```

### 导航配置 options
options 具体的配置非常多, 一些常用的配置项都列了出来，分成了 3 类：

header 类：
- title：它是字符串，用于设置导航标题；
- headerBackTitleVisible：它是布尔值，用于决定返回按钮是否显示回退页面的名字。默认是 true 显示，大多数应用是不显示，因此最好设置为 false（iOS 专属）；
- headerShown：它是布尔值，用于决定是否隐藏导航头部标题栏；
header：它接收一个返回 React 元素的函数作为参数，返回的 React 元素就是新的导航标题栏。

status 类：
控制屏幕顶部状态栏用的，也可使用 React Native 框架提供的 <StatusBar /> 组件进行代替。
- statusBarHidden：它是布尔值，它决定了屏幕顶部状态栏是否隐藏。

手势动画类：
- gestureEnabled：它是布尔值，它决定了是否可用侧滑手势关闭当前页面（iOS 专属）；
- fullScreenGestureEnabled：它是布尔值，它决定了是否使用全屏滑动手势关闭当前页面（iOS 专属）；
- animation：它是字符串枚举值，它控制了打开或关闭 Stack 页面的动画形式，默认“default”是页面从右到左地推入动画，也可以设置成其他类型的动画，比如“slide_from_bottom”是页面从下到上的推入动画和从上到下的推出动画；
- presentation：它是字符串枚举值，它控制了页面的展现形式，其主要作用是设置页面弹窗。常用的配置值是 “transparentModal”  它会将页面展示为一个透明弹窗。

示例：
```JSX
<Stack.Screen name="Detail" component={Detail} options={{
  headerShown: false,
  fullScreenGestureEnabled: true
}} />
```

在当前页面重置 options 参数用的方法就是 setOptions:
```JSX
function Detail({ navigation}) {

  // React.useEffect() 异步副作用回调，执行 setOptions 会导致闪屏，不推荐使用。

  // 页面初始化时，同步设置
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      fullScreenGestureEnabled: true,
    });
  }, [navigation])

  // 点击按钮后，异步设置
  const handlePress = () => {
    navigation.setOptions({
      title: '新标题',
    });
  }

  return (
    <Text onPress={handlePress}>设置新标题</Text>
  );
}
```
在初始化时，为了页面不抖动，我们必须使用同步的方法渲染页面。比如要隐藏头部和设置全局返回手势，如果是放在 React.useEffect 这种在页面渲染完成后再异步执行的副作用函数中，就会导致先渲染一次有头部的页面，然后再渲染一次没有头部的页面，头部的消失就会影响到整体页面的高度的变化，这时页面看起来就是抖动的。

React 提供了同步执行的副作用函数 React.useLayoutEffect，把 navigation.setOptions 放在这里面执行，页面初始化的时候会同步地把头部隐藏起来，这样就不会出现页面抖动的现象了。

<br>

## 其它导航
在上述导航示例中，我用的例子都是大家用得最多的 Native Stack Navigator。而实际上，除了 Native Stack Navigator 这类导航之外，还有 5 类导航：
- Stack Navigator：Stack Navigator 和 Native Stack Navigator 都属于堆栈导航，也就是每跳转一次在堆栈的最上面增加一个新页面，每回退一次在堆栈的最上面减少一个老页面。不同的是，Stack Navigator 底层使用的是 Gesture 手势库和 Reanimated 动画库实现的堆栈导航，而 Native Stack Navigator 使用的是 iOS 原生 UINavigationController 和 Android 原生 Fragment 实现的堆栈导航。一般情况下，我不推荐你使用 Stack Navigator，Native Stack Navigator 的功能更多，性能也更强大。
- Drawer Navigator：抽屉导航，也就是从侧边栏推出的导航页面。底层也是用的 Gesture 手势库和 Reanimated 动画库实现的，类似微信首页侧滑查看收起的小程序或公众号文章，这就属于抽屉导航，具体见[文档和动图](https://reactnavigation.org/docs/drawer-navigator/)。
- Bottom Tabs Navigator：底部标签导航。基本上每个 App 底部有好几个 Tab，这种多 Tab 的页面切换的效果在 React Native 中就可以用它来实现，具体见[文档和动图](https://reactnavigation.org/docs/bottom-tab-navigator/)。
- Material Bottom Tabs Navigator：带 Material 样式的底部标签导航，具体见[文档和动图](https://reactnavigation.org/docs/material-bottom-tab-navigator/)。
- Material Top Tabs Navigator：带 Material 样式的顶部标签导航，它是基于 react-native-tab-view 实现的，你可以把 Material 样式换成你自己的样式，常见的多列表 Tabs 就可以用它来实现，具体见[文档和动图](https://reactnavigation.org/docs/material-top-tab-navigator/)。

<br>

## reference
- https://reactnavigation.org/docs/7.x/getting-started
- https://github.com/react-navigation/react-navigation/tree/main/example
- https://reactnavigation.org/docs/native-stack-navigator/#options