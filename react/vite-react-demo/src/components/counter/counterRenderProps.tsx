
import React, { useState, useCallback } from "react";

interface Props {
  count: number,
  increment: () => void,
  decrement: () => void
}

function CounterRenderProps(action: { children: ({ count, increment, decrement }: Props) => JSX.Element}) {
  const [count, setCount] = useState(0)
  const increment = useCallback(() => {
    setCount(count + 1)
  }, [count])
  const decrement = useCallback(() => {
    setCount(count - 1)
  }, [count])

  return action.children({ count, increment, decrement })
}
// 这里利用了 children 这个特殊属性。也就是组件开始 tag 和结束 tag 之间的内容，其实是会作为 children 属性传递给组件。

function CounterRenderPropsExample() {
    return (
      <CounterRenderProps>
        {({ count, increment, decrement }: Props) => {
          return (
            <div>
              <button onClick={decrement}>-</button>
              <span>{ count }</span>
              <button onClick={increment}>+</button>
            </div>
          );
        }}
      </CounterRenderProps>
    )
}

export default CounterRenderPropsExample