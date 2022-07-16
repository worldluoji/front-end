
import React from "react";

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
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>
        <CountLabel count={ count } />
      </button>
    </div>
  );
}