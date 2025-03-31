# hooks浅比较
在类组件中，一般 shouldComponentUpdate 会比较 props 和 state 中的属性是否发生改变 (浅比较) 来判定是否返回 true，从而触发 Reconciliation 过程。典型的应用就是 React 中推出的 PureComponent 这个 API，会在 props 或者 state 改变时对两者的数据进行浅层比较。

用了函数组件后，是不是就没有了浅比较的方案了呢？并不是。React 为函数组件提供了一个 memo 方法，
React.memo 是用于优化函数组件性能的高阶组件，通过 ​缓存组件渲染结果 来避免不必要的重新渲染。它和 PureComponent 在数据比对上唯一的区别就在于 **只进行了 props 的浅比较**。而且它的用法很简单，直接将函数传入 memo 中导出即可。形如:
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

---

## 使用场景
当父组件因状态变化频繁触发渲染，但某些子组件的 ​Props 未改变 时，使用 React.memo 可跳过子组件渲染。
```jsx
// 父组件
function Parent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>点击次数：{count}</button>
      {/* 子组件 Props 未变化时，避免重新渲染 */}
      <StaticChild data="固定数据" />
    </div>
  );
}

// 子组件（用 React.memo 包裹）
const StaticChild = React.memo(function ({ data }) {
  console.log("子组件渲染"); // 仅在 data 变化时打印
  return <div>{data}</div>;
});
```

---

渲染列表时，若列表项的数据大部分未变化，使用 React.memo 可显著减少渲染开销。
```jsx
const List = ({ items }) => (
  <ul>
    {items.map(item => (
      <MemoizedListItem key={item.id} item={item} />
    ))}
  </ul>
);

// 列表项组件（避免无关项因列表更新而重渲染）
const MemoizedListItem = React.memo(function ({ item }) {
  return <li>{item.name}</li>;
});
```

当父组件向子组件传递 ​复杂计算结果​（如过滤后的数据）时，若计算结果未变化，可跳过子组件渲染。
```jsx
const ExpensiveDataChild = React.memo(function ({ processedData }) {
  // 仅当 processedData 变化时重新渲染
  return <Chart data={processedData} />;
});
```
-- 

## 不适用场景
​1. Props 频繁变化

若子组件的 ​Props 频繁变化​（如动画组件），React.memo 的比较开销可能超过渲染收益。

​2. 组件本身渲染成本极低

若组件本身渲染极快（如简单文本展示），使用 React.memo 反而增加性能负担。

​3. 依赖内部状态或上下文

若组件依赖 useState、useReducer 或 useContext，即使 Props 未变，状态/上下文变化仍会触发渲染

---

## 搭配 Hooks使用避免失效
React.memo 默认通过 ​浅比较（Shallow Compare）​ 新旧 Props 的引用是否相同来决定是否重新渲染组件。当子组件的 Props 包含 ​非原始类型（如函数、对象、数组）​ 时，若父组件未缓存这些值，每次渲染都会生成新引用，导致 React.memo 失效。

​1. 使用 useCallback 缓存函数

若子组件接收函数作为 Props，父组件需用 useCallback 避免函数引用变化，否则 React.memo 会失效。
```jsx
function Parent() {
  const [count, setCount] = useState(0);

  // 缓存回调函数，避免每次渲染生成新引用
  const handleClick = useCallback(() => {
    console.log("点击事件");
  }, []);

  return (
    <div>
      <button onClick={() => setCount(c => c + 1)}>更新父组件</button>
      <MemoizedChild onClick={handleClick} />
    </div>
  );
}

const MemoizedChild = React.memo(function ({ onClick }) {
  return <button onClick={onClick}>子按钮</button>;
});
```
若父组件向子组件传递函数，且未使用 useCallback，每次父组件渲染时都会生成新函数，即使函数逻辑未变，子组件也会重新渲染。

---

2. 使用 useMemo 缓存对象/数组

若传递对象或数组作为 Props，父组件需用 useMemo 缓存，避免每次渲染生成新引用。
```jsx
function Parent() {
  const config = useMemo(
    () => ({ color: "red", size: "large" }),
    [] // 依赖为空，仅初始化时生成一次
  );

  return <MemoizedChild config={config} />;
}
```
若未使用 useMemo 缓存，每次渲染都会生成新对象，即使内容相同，子组件也会重新渲染。

若子组件的 Props 仅包含字符串、数字、布尔值等原始类型，父组件无需额外处理，React.memo 可直接生效。

---

## 验证工具
- React DevTools Profiler：检测子组件的渲染次数和原因
​- Why Did You Render：通过 npm install @welldone-software/why-did-you-render 安装，分析不必要的渲染：
```jsx
// 在子组件中启用
MemoChild.whyDidYouRender = true;
```