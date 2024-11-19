
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

const useThunkReducer = createReducer(thunk) as (reducer: (state: StateType, action: ActionType) => StateType, initialState: StateType, initializer?: ((value: StateType) => StateType) | undefined) => [StateType, Dispatch<ActionType>];

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
  
  const [state, dispatch] = useThunkReducer(reducer, { count: initialCount });

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