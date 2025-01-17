# hooks浅比较
在类组件中，一般 shouldComponentUpdate 会比较 props 和 state 中的属性是否发生改变 (浅比较) 来判定是否返回 true，从而触发 Reconciliation 过程。典型的应用就是 React 中推出的 PureComponent 这个 API，会在 props 或者 state 改变时对两者的数据进行浅层比较。

用了函数组件后，是不是就没有了浅比较的方案了呢？并不是。React 为函数组件提供了一个 memo 方法，它和 PureComponent 在数据比对上唯一的区别就在于 **只进行了 props 的浅比较**。而且它的用法很简单，直接将函数传入 memo 中导出即可。形如:
```jsx
function Home () {
    //xxx
} 
export default React.memo (Home);
```
React.memo 只做浅层比较。如果对象或数组的内容发生了变化但引用没有变，那么它不会检测到这些内部的变化。

其实PureComponent的浅比较也比较简单：
```ts
function shallowEqual (objA: mixed, objB: mixed): boolean {
  // 下面的 is 相当于 === 的功能，只是对 + 0 和 - 0，以及 NaN 和 NaN 的情况进行了特殊处理
  // 第一关：基础数据类型直接比较出结果
  if (is (objA, objB)) {
    return true;
  }
  // 第二关：只要有一个不是对象数据类型就返回 false
  if (
    typeof objA !== 'object' ||
    objA === null ||
    typeof objB !== 'object' ||
    objB === null
  ) {
    return false;
  }

  // 第三关：在这里已经可以保证两个都是对象数据类型，比较两者的属性数量
  const keysA = Object.keys (objA);
  const keysB = Object.keys (objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  // 第四关：比较两者的属性是否相等，值是否相等
  for (let i = 0; i < keysA.length; i++) {
    if (
      !hasOwnProperty.call (objB, keysA [i]) ||
      !is (objA [keysA [i]], objB [keysA [i]])
    ) {
      return false;
    }
  }

  return true;
}
```