
import React,{ useCallback } from "react";

interface Counter {
    count: number;
}


function CountLabel({ count }: Counter) {  
    // 子组件用于显示颜色  
    const color = count > 3 ? "red" : "blue";  
    return <span style={{ color }}>{ count }</span>;
}

export default function Counter() {
  // 通过 useState 定义这样一个状态，让这个状态来保持计数器的数值，那么在值发生变化时，组件就会自动重新刷新
  // 让函数组件具有维持状态的能力。也就是说，在一个函数组件的多次渲染之间，这个 state 是共享的。
  const [count, setCount] = React.useState(0);

  // 我们把 count 这个 state ，作为一个依赖传递给 useCallback。这样，只有 count 发生变化的时候，才需要重新创建一个回调函数，这样就保证了组件不会创建重复的回调函数。而接收这个回调函数作为属性的组件，也不会频繁地需要重新渲染。
  const handleIncrement = useCallback(
    () => setCount(count + 1),
    [count]
  )

  return (
    <div>
      <button onClick={handleIncrement}>
        <CountLabel count={ count } />
      </button>
    </div>
  );
}