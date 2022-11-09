# questions

1. 如果希望一个 React 组件不渲染任何内容，可以如何去做？
- A return null
- B return ''
- C return undefined
- D return false

ABD

在处理 falsy 的值时，React 遇到 null, 空字符串或false不会渲染任何内容。undefined会报错，0则返回0。

<br>

2. 以下说法错误的是：
- A. useCallback 可以用 useMemo 来实现
- B. useCallback 可以避免重复创建函数
- C. useCallback 必须提供依赖项
- D. useCallback 不能在条件语句中执行

B

解析：
- A: useCallback 可以用 useMemo 来实现，相当于返回值是一个回调函数。
- C: 如果不给 useCallback 提供依赖项定义，那么和不使用 useCallback 是一样的，所以必须提供
- D：任何 Hook 都不能在条件语句中执行

<br>

3. React 中为什么要使用不可变数据（immutable）？
- A. 提升渲染性能
- B. 方便数据处理
- C. 易于理解和维护
- D. 方便检测数据变化

AD

解析：

<p>A：不可变数据可以很容易地让一个组件知道自己的属性是否发生了变化，从而决定是否要重新渲染，因此可以提升渲染性能。<br><br>
B：不可变数据其实是比普通的数据更难处理的，因为每次修改都要创建新的对象。<br><br>
C：读取不可变数据和读取普通数据，代码是完全一样的，所以并没有变得更容易理解和维护。<br><br>
D：是的，不可变数据只需要通过引用比较，就能知道是否发生了变化。</p>