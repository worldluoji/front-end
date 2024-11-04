
import useCounter from "../../hooks/useCounter";

interface Counter {
    count: number;
}

function CountLabel({ count }: Counter) {  
    // 子组件用于显示颜色
    const color = count > 3 ? "red" : "blue";  
    return <span style={{ color }}>{ count }</span>;
}

export default function Counter() {
  const { count, increment, decrement, reset } = useCounter();
  return (
    <div>
      <p><CountLabel count={ count } /></p>      
      <button onClick={increment}> + </button>
      <button onClick={decrement}> - </button>       
      <button onClick={reset}> reset </button>
    </div>
  );
}