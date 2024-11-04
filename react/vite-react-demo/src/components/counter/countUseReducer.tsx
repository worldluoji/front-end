import React,{ useReducer } from "react";
// useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values. 
// It also lets you optimize performance for components that trigger deep updates because you can pass dispatch down instead of callbacks.

const initialState = {count: 0};
type typeOfState = typeof initialState
interface actionType {
    type: string
}

// 第二个参数：state的reducer处理函数
function reducer(state: typeOfState, action: actionType) {
    switch (action.type) {
        case 'increment':
          return {count: state.count + 1};
        case 'decrement':
           return {count: state.count - 1};
        default:
            throw new Error();
    }
}

export default function CountUseReducer() {
    // 返回值：最新的state和dispatch函数, 这样通过dispatch分发，避免大量useState
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <>
            {/* useReducer会根据dispatch的action，返回最终的state，并触发rerender */}
            Count: {state.count}
            {/* dispatch 用来接收一个 action参数「reducer中的action」，用来触发reducer函数，更新最新的状态 */}
            <button onClick={() => dispatch({type: 'increment'})}>+</button>
            <button onClick={() => dispatch({type: 'decrement'})}>-</button>
        </>
    );
}