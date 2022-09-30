# React 数据流
React 的数据流主要包含了三种数据：属性 props、状态 state 和上下文 context

<br>

## 1. props
props 都是不可变的，不能在组件内改写从外面传进来的 props

props 的数据流向是单向的，只能从父组件流向子组件，而不能从子组件流回父组件，也不能从当前组件流向平级组件

<br>

## 2. state
在函数组件中使用 state，需要调用 useState / useReducer  Hooks

state 与 props 一样，也是不可变的。需要修改 state 时，不能直接给 state 变量赋值，
而是必须调用 state 更新函数，即 setXxx / dispatch 或 this.setState 。

当组件的 state 发生改变时，组件将重新渲染。
那什么才算是改变呢？从底层实现来看，React 框架是用 Object.is() 来判断两个值是否不同的。
尤其注意，当新旧值都是对象、数组、函数时，判断依据是它们的引用是否不同。
比如数组某个值改变，不会触发响应。

## 3. Context
Context 用于组件跨越多个组件层次结构，向后代组件传递和共享“全局”数据。

使用 context 分三个步骤：

1) 创建context对象
```
const MyContext = React.createContext('没路用的初始值')
```

2) 在组件 JSX 中使用 <MyContext.Provider> 组件，定义 value 值，并将子组件声明在前者的闭合标签里
```
function MyComponent() {
  const [state1, setState1] = useState('文本');
  const handleClick = () => {
    setState1('更新文本');
  };
  return (
    <MyContext.Provider value={state1}>
      <ul>
        <MyChildComponent />
        <li><button onClick={handleClick}>更新state</button></li>
      </ul>
    </MyContext.Provider>
  )
}
```

3) 在子组件或后代组件中使用 useContext Hook 获取 MyContext 的值，这个组件就成为 MyContext 的消费者（Consumer）
```
function MyChildComponent() {
  return (
    <MyGrandchildComponent />
  );
}

function MyGrandchildComponent() {
  const value = useContext(MyContext);
  return (
    <li>{value}</li>
  );
}
```
MyContext.Provider 的 value 值发生更改时，会通知到它后代组件中所有消费者组件重新渲染。

从数据流的角度看，context 的数据流向也是单向的，只能从声明了 Context.Provider 的当前组件传递给它的子组件树，即子组件和后代组件。

只有以上这三种数据的变更会自动通知到 React 框架，触发组件必要的重新渲染。
当你的数据流中混入了不属于它们其中任意一种的数据，就要小心，
这种跳出“三界之外”的数据很有可能带来 Bug，比如数据改变了但组件并不重新渲染。