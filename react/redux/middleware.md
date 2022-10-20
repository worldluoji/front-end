# middleware
简单来说，middleware 可以让你提供一个拦截器在 reducer 处理 action 之前被调用。
在这个拦截器中，你可以自由处理获得的 action。
无论是把这个 action 直接传递到 reducer，或者构建新的 action 发送到 reducer，都是可以的。

<img src="middleware原理.webp" />

在 Redux 中，处理异步逻辑也常常被称为异步 Action,
Redux 提供了 redux-thunk 这样一个中间件，实现了异步action. 

它如果发现接受到的 action 是一个函数，那么就不会传递给 Reducer，
而是执行这个函数，并把 dispatch 作为参数传给这个函数，从而在这个函数中你可以自由决定何时，如何发送 Action。

```
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import rootReducer from './reducer'

const composedEnhancer = applyMiddleware(thunkMiddleware)
const store = createStore(rootReducer, composedEnhancer)
```
在我们 dispatch action 时就可以 dispatch 一个函数用于来发送请求：
```
function fetchData() {
  return dispatch => {
    dispatch({ type: 'FETCH_DATA_BEGIN' });
    fetch('/some-url').then(res => {
      dispatch({ type: 'FETCH_DATA_SUCCESS', data: res });
    }).catch(err => {
      dispatch({ type: 'FETCH_DATA_FAILURE', error: err });
    })
  }
}
```
那么在我们 dispatch action 时就可以 dispatch 一个函数用于来发送请求：
```
import fetchData from './fetchData';

function DataList() {
  const dispatch = useDispatch();
  // dispatch 了一个函数由 redux-thunk 中间件去执行
  dispatch(fetchData());
}
```
可以看到，通过这种方式，我们就实现了异步请求逻辑的重用。
那么这一套结合 redux-thunk 中间件的机制，我们就称之为异步 Action。

所以说异步 Action 并不是一个具体的概念，而可以把它看作是 Redux 的一个使用模式。
它通过组合使用同步 Action ，在没有引入新概念的同时，用一致的方式提供了处理异步逻辑的方案。