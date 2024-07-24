# FlashList
RecyclerListView 的作者加入了 Shopify，并在原有的 RecyclerListView 基础上，打造了一个更易用的组件，名为 FlashList。

RecyclerListView 的工作原理，其基本思路是通过调整 Absolute 布局元素的 Top 位置值，实现元素复用。然而，要确定每个列表项 Item 的 Top 位置值，就必须先知道每个 Item 的 Height 值。因此，开发者需要手动创建一个 LayoutProvider 类，该类需要对 Item 进行分类，并为每一类 Item 设置固定高度。

```JSX
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
这样虽然解决了问题，但实际上开发过的同学都痛苦不已。对于复杂的业务需求，Item 类型太多了，文字高度也不固定。而且一旦计算错误，要定位是哪个 Item 导致的问题，是十分困难的。

FlashList 只通过一个简单的参数 estimatedItemSize 就解决了这个问题。FlashList 的示例代码如下：
```JSX
import React from "react";
import { View, Text, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";

const DATA = [
  {
    title: "First Item",
  },
  {
    title: "Second Item",
  },
];

const MyList = () => {
  return (
    <FlashList
      data={DATA}
      renderItem={({ item }) => <Text>{item.title}</Text>}
      estimatedItemSize={200}
    />
  );
};
```
那 FlashList 是如何做到的呢？答案是渲染两次，不过是直接在 Native 层渲染两次。

前面我们提到，要计算每个表项 Item 的 Top 位置值，就必须知道每个 Item 的 Height 值。FlashList 第一次渲染时，在 Native 层，通过预列估的 Item Height 值，也就是 estimatedItemSize，计算出每个列表项预估的 Top 值，进行渲染。渲染后，获取真实的 Item Height 值，再计算出实际的 Top 值，然后再渲染一次。

由于两次渲染之间没有 JS 与 Native 的通信，是直接发生在 Native 层的，速度非常快，正常看是看不出抖动的。

RecyclerListView 是纯 JS 代码，FlashList 在 RecyclerListView 之上借助了 Native 代码，借助两次快速渲染（如果无需高度修正就是一次渲染），实现了自动布局。

性能上，官方未给出 FlashList 和 RecyclerListView 的性能对比，给出的是 FlashList 和 FlatList 的性能对比，也就是 Shopify 团队提供的 List 组件和 React Native 默认的 List 组件的性能对比。在 Twitter 场景下，整体上 FlatList 只拿到了 39 分，而 FlashList 拿到了 89 分。