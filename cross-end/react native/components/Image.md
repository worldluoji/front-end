# Image
React Native 的 Image 组件一共支持 4 种加载图片的方法：
- 静态图片资源；
- 网络图片；
- 宿主应用图片；
- Base64 图片。

## 1. 静态图片资源
静态图片资源中的“静态”指的是每次访问时都不会变化的图片资源。

如果图片每次都不会变化，那么你就可以把这张图片作为静态图片资源，内置在 App 中。这样，用户在打开你的 App 时，图片是从本地直接读取的，直接读取图片的速度比走网络请求先下载再加载的速度要快上很多。一张网络图片从下载到展示的耗时通常需要 100ms 以上，而一张内置图片从读取到展示的耗时通常只有几 ms，甚至更低，二者耗时相差了两个数量级。

```
// 方案一：正确
const dianxinIcon = require('./dianxin.jpg')
<Image source={dianxinIcon}/>

// 方案二：错误
const path = './dianxin.jpg'
const dianxinIcon = require(path)
<Image source={dianxinIcon}/>
```
在使用 require 函数引入静态图片资源时，图片的相对路径必须用字面常量表示的原因是，字面常量'./dianxin.jpg'提供的是一个直接的明确的图片相对路径，打包工具很容易根据字面常量'./dianxin.jpg' 找到真正的图片，提取图片信息。而变量path 提供的是一个间接的可变化的图片路径，你光看require(path) 这段代码是不知道真正的图片放在哪的，打包工具也一样，更别提自动提取图片信息了。

## 静态图片资源的加载原理
**第一步编译**：在编译过程中，图片资源本身是独立于代码文件之外的文件，图片资源本身是不能编译到代码中的，所以，我们需要把**图片资源的路径、宽高、格式**等信息记录到代码中，方便后面能从代码中读取到图片。

在你引入静态图片资源完成后(index.tsx中引入上述方案一正确代码)，可以先本地试试图片是否能正常展示。如果展示没有问题，直接运行react-native bundle的打包命令，开始打包编译：
```
npx react-native bundle --entry-file index.tsx --dev false --minify false --bundle-output ./build/index.bundle --assets-dest ./build
```
这段打包（bundle）命令的意思是，以根目录的 index.tsx 文件为入口（entry file），产出 release（dev=false）环境的包，这个包不用压缩（minify=false），并将这个包命名为 ./build/index.bundle，同时将静态资源编译产物放到 ./build 目录。这个 build 目录结构大致如下：
```
./build
├── assets
│   └── src
│       └── Lesson3Image
│           └── dianxin.jpg
└── index.bundle
```
你可以在 build 目录中找到 index.bundle 文件，它是编译后的 JavaScript 代码。另外， build 目录中还有一个 assets 目录，assets 目录放的是编译后的图片 dianxin.jpg。

打开 index.bundle 文件，搜索 dianxin 关键字。我们可以找到一个和 dianxin 关键字相关的独立模块，这个模块的作用就是将静态图片资源的路径、宽高、格式等信息，注册到一个全局管理静态图片资源中心。这个独立模块的代码如下：
```
  module.exports = _$$_REQUIRE(_dependencyMap[0]).registerAsset({
    "__packager_asset": true,
    "httpServerLocation": "/assets/src/Lesson3Image",
    "width": 190,
    "height": 190,
    "scales": [1],
    "hash": "0d4ac32eb69529cf90a7b248fee00592",
    "name": "dianxin",
    "type": "jpg"
  });
```
我们第一步“编译时”生成的图片注册函数和其注册的信息，我们在后面的第三步“运行时”还会用到。


**第二步构建**：编译后的 Bundle 和静态图片资源，会在构建时内置到 App 中。
- 如果你搭建的是 iOS 原生环境，那么你应该运行 react-native run-ios 构建 iOS 应用。
- 如果你搭建的是 Android 原生环境，那么你应该运行 react-native run-android 构建 Android 应用。

不过，默认构建的是调试包，而我们想要的是正式包，因此我们还需要在命令后面加一行配置--configuration Release。这样就能在你的真机或者模拟器上，构建出一个 React Native 应用了，具体命令如下：
```
npx react-native run-ios --configuration Release
```
在这一步，编译后的 Bundle，包括 Bundle 中的静态图片资源信息，和真正的静态图片资源都已经内置到 App 中了。现在你可以关闭网络，然后打开 App 试试，如果这时页面和图片依旧能正常展示，那就证明图片确实内置成功了。

实际上，上面的命令 react-native run-ios 既包括第一步的编译 react-native bundle又包括第二步的构建。在真正编译和构建内置时候，你只需要运行 react-native run-ios  即可。


**第三步运行**：在运行时，require 引入的并不是静态图片资源本身，而是静态图片资源的信息。Image 元素要在获取到图片路径等信息后，才会按配置的规则加载和展示图片。

可以通过 Image.resolveAssetSource 方法来获取图片信息。具体的示例代码如下：
```
const dianxinIcon = require('./dianxin.jpg')

alert(JSON.stringify(Image.resolveAssetSource(dianxinIcon)))

// 弹出的信息如下：
{
    "__packager_asset": true,
    "httpServerLocation": "/assets/src/Lesson3Image",
    "width": 190,
    "height": 190,
    "scales": [1],
    "hash": "0d4ac32eb69529cf90a7b248fee00592",
    "name": "dianxin",
    "type": "jpg"
}
```
在 Image 组件底层，使用的就是 Image.resolveAssetSource 来获取图片信息的，包括图片目录（httpServerLocation）、宽高信息 （width 和 height）、图片哈希值（hash）、图片名字（dianxin）、图片格式（jpg），等等。然后，再根据这些图片信息，找到“构建时”内置在 App 中的静态图片资源，并将图片加载和显示的。这就是静态图片资源的加载原理。

<br>

## 2. 网络图片
网络图片（Network Images）指的是使用 http/https 网络请求加载远程图片的方式。
```
// 建议
<Image source={{uri: 'https://reactjs.org/logo-og.png'}}
       style={{width: 400, height: 400}} />

// 不建议
<Image source={{uri: 'https://reactjs.org/logo-og.png'}} />
```
在使用网络图片时，我建议你将宽高属性作为一个必填项来处理。为什么呢？和前面介绍的静态图片资源不同的是，网络图片下载下来之前，React Native 是没法知道图片的宽高的，所以它只能用默认的 0 作为宽高。这个时候，如果你没有填写宽高属性，初始化默认宽高是 0，网络图片就展示不了。

**缓存和预加载机制**

React Native Android 用的是 Fresco 第三方图片加载组件的缓存机制，iOS 用的是 NSURLCache 系统提供的缓存机制。

Android 和 iOS 的缓存设置方式和实现原理虽然有所不同，但整体上采用了内存和磁盘的综合缓存机制。第一次访问时，网络图片是先加载到内存中，然后再落盘存在磁盘中的。后续如果我们需要再次访问，图片就会从缓存中直接加载，除非超出了最大缓存的大小限制。

例如，iOS 的 NSURLCache 遵循的是 HTTP 的 Cache-Control 缓存策略，同时当 CDN 图片默认都已经设置了 Cache-Control 时，iOS 图片就是有缓存的。

而 NSURLCache 的默认最大内存缓存为 512kb，最大磁盘缓存为 10MB，如果缓存图片的体积超出了最大缓存的大小限制，那么一些老的缓存图片就会被删除。

通过图片缓存机制和预加载机制的配合，我们可以合理地利用缓存来提高图片加载速度，这能进一步地提升用户体验。

使用图片预加载机制，可以提前把网络图片缓存到本地。对于用户来说，提前缓存的图片是第一次看到的，但对于系统缓存来说图片是第二次加载，它的加载速度是毫秒级的甚至亚秒级的。这就是预加载机制，提升图片加载性能的原理。


举个例子，你打算买个机械键盘，打开了个购物 App，滑动手机翻页选购，键盘图片和介绍都能马上地呈现出来。你没有感受丝毫的等待和卡顿，你可能就会直接下单买了。相反，如果你选购的过程中图片加载很慢，翻页还要等待很久，你就可能会考虑换个购物 App。在这种无限滚动的长列表场景中，图片预加载就非常适合了。React Native 也提供了非常方便的图片预加载接口 Image.prefetch：
```
Image.prefetch(url);
```
函数 Image.prefetch 接收一个参数 url，也就是图片的远程地址，函数调用后，React Native 会帮你在后台进行下载和缓存图片。这样，你下拉加载的图片时，网络图片是从本地缓存中加载的，就感受不到网络加载的耗时过程了。

<br>

## 3. 宿主应用图片
宿主应用图片（Images From Hybrid App’s Resources​）指的是 React Native 使用 Android/iOS 宿主应用的图片进行加载的方式。在 React Native 和 Android/iOS 混合应用中，也就是一部分是原生代码开发，一部分是 React Native 代码开发的情况下，你可能会用到这种加载方式。

```
// Android drawable 文件目录
// iOS asset 文件目录
<Image source={{ uri: 'app_icon' }} />

// Android asset 文件目录
<Image source={{ uri: 'asset:/app_icon.png' }} />
```
iOS 宿主图片用的是图片名称 app_icon，是 URN。而 Android 宿主图片用的是图片位置 asset:/app_icon.png，是 URL。而 URI 的所代表的含义更广，既包括图片名称 URN，又包括图片位置 URL ，所以 Image 组件的 source 属性中，代表图片名称或地址的键名是 URI。

在实际工作中，并不推荐在 React Native 中使用宿主应用图片资源。
- 首先，这种加载图片的方法没有任何的安全检查，一不小心就容易引起线上报错。
- 第二，大多数 React Native 是动态更新的，最新代码是跨多个版本运行的，而 Native 应用是发版更新的，应用的最新代码只在最新版本运行，这就导致 React Native 需要确切知道 Native 图片到底内置在哪些版本中，才能安全地使用，这对图片管理要求太高了，实现起来太麻烦了。
- 最后，开发 React Native 的团队，和开发 Android/iOS 的团队很可能不是一个团队，甚至可能跨部门。复用的收益抵不上复用带来的安全风险、维护成本和沟通成本，因此我并不推荐你使用。

<br>

## 4. Base64 
图片最后一类常见的 React Native 图片加载方式是 Base64 图片。Base64 指的是一种基于 64 个可见字符表示二进制数据的方式，Base64 图片指的是使用 Base64 编码加载图片的方法，它适用于那些图片体积小的场景。
```
<Image
  source={{
    uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADMAAAAzCAYAAAA6oTAqAAAAEXRFWHRTb2Z0d2FyZQBwbmdjcnVzaEB1SfMAAABQSURBVGje7dSxCQBACARB+2/ab8BEeQNhFi6WSYzYLYudDQYGBgYGBgYGBgYGBgYGBgZmcvDqYGBgmhivGQYGBgYGBgYGBgYGBgYGBgbmQw+P/eMrC5UTVAAAAABJRU5ErkJggg=='
  }}
/>
```


## 更优的组件——FastImage
React Native 框架对图片的默认缓存处理并不是最优的方案，社区中提供了替代方案 [FastImage](https://github.com/DylanVann/react-native-fast-image)，它是基于 SDWebImage (iOS) 和 Glide (Android) 实现的性能和效果会更好一些。