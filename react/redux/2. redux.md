# Redux
Redux 是一个用于状态管理的框架，可以与多种不同的 Web 技术结合使用，包括 React。

类似于 Vue 中的 Vuex 和 Pinia，Redux 用于管理应用的状态。Redux 引入了三个核心概念：State、Action 和 Reducer：
- **State**：即 Store，通常是一个纯 JavaScript 对象。
- **Action**：一个对象，用于描述发生的动作。
- **Reducer**：一个函数，接收 Action 和 State 作为参数，并返回新的 State。

<img src="Redux示意图.webp" />

通过将状态放在组件之外，React 组件可以成为更加纯粹的表现层。状态管理和共享可以在组件之外完成（通过 Reducer 和 Action），从而提供更好的状态共享能力。两个典型场景：

- **跨组件的状态共享**：例如，一个组件发起请求时将某个 Loading 状态设为 `true`，另一个全局状态组件则显示 Loading 状态。
- **同组件多个实例的状态共享**：例如，某个页面组件初次加载时获取数据，切换到另一个页面后返回，数据已经存在，无需重新加载。

---

## 什么时候使用 Redux？
- **项目规模**：当项目足够小，引入 Redux 的成本大于收益。
- **预期增长**：如果预期项目规模会逐渐增大或已经是大中型项目，可以考虑引入 Redux。
- **全局状态管理**：Redux 鼓励全局只有一个 Store，适合管理全局状态。
- **状态提升**：当需要将大部分组件的状态提升到根组件时，全局状态会不断膨胀，这时引入 Redux 是必要的。

---

## 创建 Redux Store
Redux Store 是一个对象，用于持有和管理应用状态。

```js
import { createStore } from 'redux';

const reducer = (state = { login: false }) => state;

const store = createStore(reducer);
const currentState = store.getState();
```

### `getState`
获取当前的 State。

```js
function getState() {
  if (isDispatching) throw new Error("You may not call store.getState() while the reducer is executing.");
  return currentState;
}
```

### `dispatch`
派发 Action，触发 State 更新。

```js
function dispatch(action) {
  if (isDispatching) throw new Error("Reducers may not dispatch actions.");

  try {
    isDispatching = true;
    currentState = currentReducer(currentState, action);
  } finally {
    isDispatching = false;
  }

  const listeners = (currentListeners = nextListeners);
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i];
    listener();
  }

  return action;
}
```

### `subscribe`
订阅 Store 的变化。

```js
function subscribe(listener) {
  if (typeof listener !== 'function') throw new Error('Expected the listener to be a function.');
  if (isDispatching) throw new Error("You may not call store.subscribe() while the reducer is executing.");

  let isSubscribed = true;
  ensureCanMutateNextListeners();
  nextListeners.push(listener);

  return function unsubscribe() {
    if (!isSubscribed) return;
    if (isDispatching) throw new Error("You may not unsubscribe from a store listener while the reducer is executing.");

    isSubscribed = false;
    ensureCanMutateNextListeners();
    const index = nextListeners.indexOf(listener);
    nextListeners.splice(index, 1);
  };
}

function ensureCanMutateNextListeners() {
  if (nextListeners === currentListeners) {
    nextListeners = currentListeners.slice();
  }
}
```

### `replaceReducer`
用新的 Reducer 替换当前的 Reducer。

```js
function replaceReducer(nextReducer) {
  if (typeof nextReducer !== 'function') throw new Error("Expected the nextReducer to be a function.");

  currentReducer = nextReducer;
  dispatch({ type: '@@redux/INIT' });
}
```

---

## Redux Action
所有状态更新都是通过派发 Action 触发的。

```jsx
const store = Redux.createStore((state = { login: false }) => state);

const loginAction = () => ({
  type: 'LOGIN'
});

store.dispatch(loginAction()); // 等价于 store.dispatch({ type: 'LOGIN' });
```

---

## Reducer
Reducer 负责根据 Action 修改 State。

```jsx
const defaultState = {
  authenticated: false
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case LOGIN:
      return { authenticated: true };
    case LOGOUT:
      return { authenticated: false };
    default:
      return state;
  }
};

const store = Redux.createStore(authReducer);

const loginUser = () => ({ type: LOGIN });
const logoutUser = () => ({ type: LOGOUT });

store.dispatch(loginUser());
store.dispatch(logoutUser());
```

### 不可变性原则
Reducer 必须返回一个新的 State 对象，不能直接修改 State。

```jsx
const ADD_TO_DO = 'ADD_TO_DO';

const immutableReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_DO:
      return [...state, action.todo];
    default:
      return state;
  }
};

const addToDo = (todo) => ({
  type: ADD_TO_DO,
  todo
});

const store = Redux.createStore(immutableReducer);
```

---

## 注册 Store 监听器
通过 `store.subscribe()` 注册监听器，每当 Action 被派发时，监听器会被调用。

```js
const ADD = 'ADD';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case ADD:
      return state + 1;
    default:
      return state;
  }
};

const store = Redux.createStore(reducer);

let count = 0;

store.subscribe(() => {
  count++;
});

store.dispatch({ type: ADD });
console.log(count); // 1
store.dispatch({ type: ADD });
console.log(count); // 2
```

---

## 合并多个 Reducers
使用 `combineReducers` 方法合并多个 Reducers。

```jsx
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const counterReducer = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

const authReducer = (state = { authenticated: false }, action) => {
  switch (action.type) {
    case LOGIN:
      return { authenticated: true };
    case LOGOUT:
      return { authenticated: false };
    default:
      return state;
  }
};

const rootReducer = Redux.combineReducers({
  count: counterReducer,
  auth: authReducer
});

const store = Redux.createStore(rootReducer);
```

### `combineReducers` 实现

```js
export default function combineReducers(reducers) {
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];
    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  return function combination(state = {}, action) {
    let hasChanged = false;
    const nextState = {};
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      const previousStateForKey = state[key];
      const nextStateForKey = reducer(previousStateForKey, action);
      nextState[key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
```

---

## 发送 Action 数据到 Store
可以在 Action 中传递数据。

```jsx
const ADD_NOTE = 'ADD_NOTE';

const notesReducer = (state = 'Initial State', action) => {
  switch (action.type) {
    case ADD_NOTE:
      return action.text;
    default:
      return state;
  }
};

const addNoteText = (note) => ({
  type: ADD_NOTE,
  text: note
});

const store = Redux.createStore(notesReducer);

console.log(store.getState()); // 'Initial State'
store.dispatch(addNoteText('Hello!'));
console.log(store.getState()); // 'Hello!'
```

---

## 使用 Middleware 处理异步 Action
Redux 提供了中间件（如 Redux Thunk）来处理异步操作。

```jsx
const REQUESTING_DATA = 'REQUESTING_DATA';
const RECEIVED_DATA = 'RECEIVED_DATA';

const requestingData = () => ({ type: REQUESTING_DATA });
const receivedData = (data) => ({ type: RECEIVED_DATA, users: data.users });

const handleAsync = () => {
  return function (dispatch) {
    dispatch(requestingData());
    setTimeout(() => {
      let data = { users: ['Jeff', 'William', 'Alice'] };
      dispatch(receivedData(data));
    }, 2500);
  };
};

const defaultState = {
  fetching: false,
  users: []
};

const asyncDataReducer = (state = defaultState, action) => {
  switch (action.type) {
    case REQUESTING_DATA:
      return { fetching: true, users: [] };
    case RECEIVED_DATA:
      return { fetching: false, users: action.users };
    default:
      return state;
  }
};

const store = Redux.createStore(
  asyncDataReducer,
  Redux.applyMiddleware(ReduxThunk.default)
);
```