
import { useCallback } from 'react';
// import logger from 'redux-logger';
import { thunk } from 'redux-thunk';
import { createReducer } from 'react-use';
import { Dispatch } from 'redux';


interface ActionType {
  type: string,
  payload?: {
    count: number
  },
}

interface StateType {
  count: number
}

// const useThunkReducer = createReducer(thunk) as (reducer: (state: StateType, action: ActionType) => StateType, initialState: StateType, initializer?: ((value: StateType) => StateType) | undefined) => [StateType, Dispatch<ActionType>];

/* 使用泛型指定状态类型和动作类型，
   useThunkReducer 被定义为一个泛型函数, 接受两个类型参数 S 和 A，分别代表状态类型和动作类型。
   A extends { type: any }：代表动作类型（Action Type），并且动作类型必须有一个 type 属性。
   这里的 as 断言是一个类型断言，用于告诉 TypeScript 编译器我们希望 createReducer(thunk) 返回的函数具有特定的类型。
*/
const useThunkReducer = createReducer(thunk) as <S, A extends { type: string }>(
  reducer: (state: S, action: A) => S,
  initialState: S,
  initializer?: (value: S) => S
) => [S, Dispatch<A>];

function reducer(state: StateType, action: ActionType) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: action.payload ? action.payload.count : 1 };
    default:
      throw new Error();
  }
}

const CreateReducerDemo = ({ initialCount = 1 }) => {
  
  const [state, dispatch] = useThunkReducer<StateType, ActionType>(reducer, { count: initialCount });

  // Action creator to increment count, wait a second and then reset
  const addAndReset = useCallback(() => {
    return (dispatch: Dispatch<ActionType>) => {
      dispatch({ type: 'increment' });

      setTimeout(() => {
        dispatch({ type: 'reset', payload: { count: initialCount } });
      }, 1000);
    };
  }, [initialCount]);

  return (
    <div>
      <p>count: {state.count}</p>
      <button onClick={() => addAndReset()(dispatch)}>Add and reset</button>
      <button
        onClick={() => dispatch({ type: 'reset', payload: { count: initialCount }})}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
    </div>
  );
};

export default CreateReducerDemo;