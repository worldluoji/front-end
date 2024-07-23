# RecyclerListView
React Native 官方提供的列表组件确实是 FlatList，但是推荐优先使用开源社区提供的列表组件 RecyclerListView。因为，开源社区提供的 RecyclerListView 性能更好。

那么，为什么开源社区的 RecyclerListView 比官方的 FlatList 性能更好？FlatList、RecyclerListView 的优化原理是什么？FlatList 和 RecyclerListView 的底层实现都是滚动组件 ScrollView，所以我们先从 ScrollView 聊起。

## ScrollView
ScrollView 是一个支持横向或竖向的滚动组件，几乎所有页面都会用到。ScrollView 组件类似于 Web 中的 `<html/>` 或 `<body/>` 标签，浏览器中的页面之所以能上下滚动，就是因为 html 或 body 标签默认有一个 overflow-y: scroll 的属性，如果你把标签的属性设置为 overflow-y: hidden，页面就不能滚动了。

React Native 的 ScrollView 组件在 Android 的底层实现用的是 ScrollView 和 HorizontalScrollView，在 iOS 的底层实现用的是 UIScrollView。

所谓的滚动，解决的是在有限高度的屏幕内浏览无限高度的内容的问题。有限高度的容器是 ScrollView，无限高度，或者说高度不确定的内容是 ScrollView 的 children。使用 ScrollView 组件时，我们通常并不直接给 ScrollView 设置固定高度或宽度，而是给其父组件设置固定高度或宽度。

一般而言，我们会使用安全区域组件 SafeAreaView 组件作为 ScrollView 的父组件，并给 SafeAreaView 组件设置布局属性 flex:1，让内容自动撑高 SafeAreaView。使用 SafeAreaView 作为最外层组件的好处是，它可以帮我们适配 iPhone 的刘海屏，节约我们的适配成本:
```JSX
<SafeAreaView style={{flex: 1}}>
  <ScrollView>
    <Text>1</Text>
  <ScrollView/>
</SafeAreaView>    
```


下面这段代码，就是使用 ScrollView 组件一次性直接渲染 1000 个子视图，这里没有做任何懒加载优化。
```JSX
// 10 个 item 就能填满整个屏幕，渲染很快
// 1000 个 item 相当于 100+ 个屏幕的高度，渲染很慢
const NUM_ITEMS = 1000; 

const makeContent = (nItems: number, styles: any) => {
  return Array(nItems)
    .fill(1)
    .map((_, i) => (
      <Pressable
        key={i}
        style={styles}>
        <Text>{'Item ' + i}</Text>
      </Pressable>
    ));
};

const App = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>{makeContent(NUM_ITEMS, styles.itemWrapper)}</ScrollView>
    </SafeAreaView>
  );
};
```
使用 ScrollView 组件时，ScrollView 的所有内容都会在首次刷新时进行渲染。内容很少的情况下当然无所谓，内容多起来了，速度也就慢下来了。那有什么优化方案吗？你肯定想到了一些优化方案，比如按需渲染。


## FlatList：按需渲染的列表组件
FlatList 列表组件就是 “自动”按需渲染的。

FlatList 是 React Native 官方提供的第二代列表组件。FlatList 组件底层使用的是虚拟列表 VirtualizedList，VirtualizedList 底层组件使用的是 ScrollView 组件。因此 VirtualizedList 和  ScrollView 组件中的大部分属性,FlatList 组件也可以使用。

简单地讲，FlatList 性能比 ScrollView 好的原因是: <strong>FlatList 列表组件利用按需渲染机制减少了首次渲染的视图，利用空视图的占位机制回收了原有视图的内存</strong>
```
// 从上到下滚动时的渲染方式
// SrcollView 渲染方式：一次渲染所有视图
SrcollView0_9  = [{👁},{ },{ },{ }]  // 浏览0~9条列表项
SrcollView10_19 = [{ },{👁},{ },{ }] // 浏览10~19条列表项
SrcollView20_29 = [{ },{ },{👁},{ }] // 浏览20~29条列表项
SrcollView30_39 = [{ },{ },{ },{👁}] // 浏览30~39条列表项

// FlatList 渲染方式：按需渲染，看不见的地方用 $empty 占位
FlatList0_9  = [{👁},{ }]               // 浏览0~9条列表项
FlatList10_19 = [{ },{👁},{ }]          // 浏览10~19条列表项
FlatList20_29 = [$empty,{},{👁},{}]     // 浏览20~29条列表项
FlatList30_39 = [$empty,$empty,{ },{👁}]// 浏览30~39条列表项
```
具体地说，每次你滚动页面，都会触发滚动组件 ScrollView 组件的一个“异步”回调 onScroll 事件。

在 onScroll 事件中，我们可以获取到当前滚动的偏移量 offset 等信息。以当前滚动的偏移量为基础，默认向上数 10 个屏幕的高度，向下数 10 个屏幕的高度，这一共 21 个屏幕的内容就是需要按需渲染的区域，其他区域都是无需渲染的区域。

这样，即便是异步渲染，我们也不能保证所有 JavaScript 执行的渲染任务都实时地交由 UI 线程处理，立刻展示出来。但因为有这 10 个屏幕的内容作为缓冲，用户无论是向上滚动还是向下滚动，都不至于一滚动就看到白屏。

FlatList 内部实现就是通过 setState 改变按需渲染区域第一个索引和最后一个索引的值，来实现按需渲染的 。怎么计算按需渲染列表项的索引呢？接着我们继续看第二步。这里我们分两种情况，第一种是列表项的高度是确定的情况，另外一种是列表项的高度是不确定的情况。

如果设计师给的列表项的高度是确定的，那么我们在写代码的时候，就可以通过获取列表项布局属性 getItemLayout 告诉 FlastList。在列表项高度确定，且知道按需渲染区域的情况下，“求按需渲染列表项的索引”就是一个简单的四则运算的问题，程序能够准确地计算出来。

如果设计师给的 UI 稿中是不定高的列表项，也就是高度是由渲染内容决定的。对于高度未知的情况，FlastList 会启用列表项的**布局回调函数 onLayout**，在 onLayout 中会有大量的动态测量高度的计算，包括每个列表项的准确高度和整体的平均高度。

在这种列表项高度不确定，而且给定按需渲染区域的情况下，我们可以通过列表项的平均高度，把按需渲染列表项的索引大致估算出来了。即便有误差，比如预计按需渲染区域为上下 10 个屏幕，实际渲染时只有上下 7、8 个屏幕也是能接受的，大部分情况下用户是感知不到的屏幕外内容渲染的。

实际生产中，如果你不填 getItemLayout 属性，不把列表项的高度提前告诉 FlastList，让 FlastList 通过 onLayout 的布局回调动态计算，用户是可以感觉到滑动变卡的。因此，如果你使用 FlastList，又提前知道列表项的高度，我建议你把 getItemLayout 属性填上。


## RecyclerListView：可复用的列表组件
RecyclerListView 是开源社区提供的列表组件，它的底层实现和 FlatList 一样也是 ScrollView，它也要求开发者必须将内容整体分割成一个个列表项。

在首次渲染时，RecyclerListView 只会渲染首屏内容和用户即将看到的内容，所以它的首次渲染速度很快。在滚动渲染时，只会渲染屏幕内的和屏幕附近 250 像素的内容，距离屏幕太远的内容是空的。

在首次渲染时，RecyclerListView 的复用机制是这样的，你可以把列表比作数组 list，把列表项类比成数组的元素。用户移动 ScrollView 时，相当于往数组 list 后面 push 新的元素对象，而 RecyclerListView 相当于把 list 的第一项挪到了最后一项中。挪动对象位置用到的计算资源少，也不用在内存中开辟一个新的空间。而创建新的对象，占用计算资源多，同时占用新的内存空间。

RecyclerListView 有三个必填参数：
- 列表数据：dataProvider(dp)；
- 列表项的布局方法：layoutProvider；
- 列表项的渲染函数：rowRenderer。

**先来看第一个必填参数列表数据 dataProvider（dp）**。为了区分列表数据 dataProvider（第一个字母小写）和列表数据类 DataProvider（第一个字母大写），后面我会用缩写 dp 来代替列表数据，其使用方法如下：
```Javascript
const listData = Array(300).fill(1).map( (_,i) => i)

const dp = new DataProvider((r1, r2) => {
  return r1 !== r2;
});

this.state = {
  dataProvider: dp.cloneWithRows(listData),
};

this.setState({
  dataProvider: dp.cloneWithRows(newListData),
})
```
dp 是列表数据类 DataProvider new 出来的对象，它是一个存放 listData 的数据容器。它有一个必填参数，就是对比函数。在列表项复用时，对比函数会频繁地调用，因此我们只推荐对更新数据进行 r1 !== r2 的浅对比，不推荐深对比。

调用 dp.cloneWithRow 方法，该方法接收 listData 数组作为参数，这时我们正式把 listData 装到了 dp 容器中。其返回值 dataProvider，就是 React 的列表状态。

接着，是我们调用 setState 方法，该方法接收 dp.cloneWithRows()  的返回的 dp 对象作为参数，dp 列表数据对象更新了，整个列表也就更新了。

**第二个必填参数，列表项的布局方法 layoutProvider**。
```javascript
const _layoutProvider = new LayoutProvider(
  index => {
    if (index % 3 === 0) {
      return ViewTypes.FULL;
    } else {
      return ViewTypes.HALF_RIGHT;
    }
  },
  (type, dimension) => {
    switch (type) {
      case ViewTypes.HALF_RIGHT:
        dimension.width = width / 2;
        dimension.height = 160;
        break;
      case ViewTypes.FULL:
        dimension.width = width;
        dimension.height = 140;
        break;
    }
  },
);
```
layoutProvider 类初始化时，有两个函数入参。
- 第一个入参函数是通过索引 index 获取类型 type，对应的是类型可枚举。
- 第二个入参函数是通过类型 type 和布局尺寸 dimension 获取每个类型的宽高 width 和 height，对应的是确定宽高。

使用列表组件 RecyclerListView 有两个前提：首先是列表项的宽高必须是确定的，或者是大致确定的；第二是列表项的类型必须是可枚举的。这两个前提，都体现在了列表项的布局方法 layoutProvider 中了。

先来看第一个前提，宽高必须确定。RecyclerListView 用的是 position:absolute 的绝对定位布局，所有的列表项的宽度 width、高度 height、顶部偏移量 top、左边偏移量 left 都得在布局之前计算出来。

但实际上布局方法 layoutProvider，只需要知道列表项的宽（width）、高（height）就可以了，偏移量 top、left 可以根据宽高推算出来。比如，第 N 个列表项的偏移量 top 值，实际等于前面 N - 1 个列表项的高度之和。

如果宽高不确定呢？分两种情况，一种就是不确定的，另一种是不确定但可以转换为大致确定的。对于就是不确定的情况，RecyclerListView 是无解的；对于大致确定的情况，我们可以开启 forceNonDeterministicRendering 小幅修正布局位置。

比如，信息流的标题文字少的时候是一行布局，文字多的时候是两行布局，一行两行的高度偏差不大，可以在渲染后让框架帮忙进行小幅修正。通常在用户看到之前，这种小幅修正就已经完成了，用户感知不到列表的偏移。但如果是信息流的内容高度不确定，相差百来个像素，这种大幅修正可能会让用户察觉到，不适合使用 RecyclerListView 。

再来看第二个前提，类型可枚举。可枚举很好理解，两个列表项的底层 UI 视图必须一样或者大致相似，才能只改列表数据复用列表视图。如果每个列表项的 JSX 结构完全不一样，就不存在复用的可能性。一般来说，一个类型对应一个自定义组件。

**最后是第三个必填参数，列表项的渲染函数：rowRenderer**。
rowRenderer 的作用就是根据类型和数据，返回对应的自定义列表项组件：
```JSX
//Given type and data return the view component
  _rowRenderer(type, data) {
    //You can return any view here, CellContainer has no special significance
    switch (type) {
      case ViewTypes.HALF_RIGHT:
        return (
          <CellContainer style={styles.containerGridRight}>
            <Text>Data: {data}</Text>
          </CellContainer>
        );
      case ViewTypes.FULL:
        return (
          <CellContainer style={styles.container}>
            <Text>Data: {data}</Text>
          </CellContainer>
        );
      default:
        return null;
    }
  }
```

<br>

## 总结
理解了底层原理，ScrollView、FlatList 和 RecyclerListView 使用场景，估计你也能基本把握住了：
- ScrollView 适合内容少的页面，只有几个屏幕高页面是适合的；
- FlatList 性能还过得去，但我不推荐你优先使用它，只有在你的列表项内容高度不能事先确定，或者不可枚举的情况下使用它；
- RecyclerListView 性能最好，你应该优先使用它，但使用它的前提是可枚举且高度确定或大致确定。

## 注意事项
- 无限列表，理论上页码是无限的，不可能一次请求回来。因此，还需要对请求的数据进行分页。
- 推荐使用 react query，帮你做列表的状态管理，只需配置一下就能帮你自动管理无限列表的分页。


## reference
https://github.com/Flipkart/recyclerlistview