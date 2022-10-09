# react with redux
because Redux is not designed to work with React out of the box, 
you need to use the <strong>react-redux</strong> package. 
It provides a way for you to pass Redux state and dispatch to your React components as props.

## 第一步： 使用组件内部状态
1. input的值与 state中的input同步
2. 点击按钮时，messages中加入input的值，并清空input
3. 在列表中展示messages

```
class DisplayMessages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      messages: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitMessage = this.submitMessage.bind(this)
  }
  // Add handleChange() and submitMessage() methods here
  handleChange(event) {
    this.setState({
      input: event.target.value
    })
  }

  submitMessage() {  
    this.setState((state) => {
      const currentMessage = state.input;
      return {
        input: '',
        messages: state.messages.concat(currentMessage)
      };
    });
  }

  render() {
    const items = this.state.messages.map(s => <li>{s}</li>)
    return (
      <div>
        <h2>Type in a new Message:</h2>
        { /* Render an input, button, and ul below this line */ }
        <input value={this.state.input} onChange={this.handleChange}/>
        <button onClick={this.submitMessage}>click me</button>
        <ul>
          {items}
        </ul>
        { /* Change code above this line */ }
      </div>
    );
  }
};
```

## 第二步：定义Redux store
```
// Define ADD, addMessage(), messageReducer(), and store here:

const ADD = 'ADD'

// define an action creator
const addMessage = (message) => {
    return {
      type: ADD,
      message: message
    }
}

const messageReducer = (state = [], action) => {
  switch(action.type) {
    case ADD:
      return [...state, action.message]
    default:
      break
  }
  return state
}

let store = Redux.createStore(messageReducer)
```

## 第三步：Use Provider to Connect Redux to React
React Redux provides a small API with two key features: Provider and connect.

The Provider is a wrapper component from React Redux that wraps your React app. This wrapper then allows you to access the Redux store and dispatch functions throughout your component tree. 

example:
```
<Provider store={store}>
  <App/>
</Provider>
```

使用Provider整合前面两步：
```
const Provider = ReactRedux.Provider;

class AppWrapper extends React.Component {
  // Render the Provider below this line
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={store}>
        <DisplayMessages/>
      </Provider>
    )
  }
  // Change code above this line
};
```

<br>

## Map state and dispatch to props
You make sure that each component only has access to the state it needs. You accomplish this by creating two functions: mapStateToProps() and mapDispatchToProps().

In these functions, you declare what pieces of state you want to have access to and which action creators you need to be able to dispatch.

React Redux uses the store.subscribe() method to implement mapStateToProps().

map state to props:
```
const state = [];

const mapStateToProps = (state) => {
  return {
    messages: state
  }
}
```
其实就是把组件需要的state映射成一个对象

map dispatch to props:
```
const addMessage = (message) => {
  return {
    type: 'ADD',
    message: message
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
}
```
其实就是把dispatch作为入参，把action creator与dispatch组合成一个对象

## 第四步：Connect Redux to React

The connect method from React Redux can handle this task. This method takes two optional arguments, mapStateToProps() and mapDispatchToProps(). They are optional because you may have a component that only needs access to state but doesn't need to dispatch any actions, or vice versa.
```
connect(mapStateToProps, mapDispatchToProps)(MyComponent)
```

```
// Redux:
const ADD = 'ADD';

const addMessage = (message) => {
  return {
    type: ADD,
    message: message
  }
};

const messageReducer = (state = [], action) => {
  switch (action.type) {
    case ADD:
      return [
        ...state,
        action.message
      ];
    default:
      return state;
  }
};

const store = Redux.createStore(messageReducer);

// React:
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// Change code below this line
class Presentational extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.submitMessage = this.submitMessage.bind(this);
  }
  handleChange(event) {
    this.setState({
      input: event.target.value
    });
  }
  submitMessage() {
    this.props.submitNewMessage(this.state.input)
    this.setState((state) => ({
      input: ''
    }));
  }
  render() {
    return (
      <div>
        <h2>Type in a new Message:</h2>
        <input
          value={this.state.input}
          onChange={this.handleChange}/><br/>
        <button onClick={this.submitMessage}>Submit</button>
        <ul>
          {this.props.messages.map( (message, idx) => {
              return (
                 <li key={idx}>{message}</li>
              )
            })
          }
        </ul>
      </div>
    );
  }
};
// Change code above this line

const mapStateToProps = (state) => {
  return {messages: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    submitNewMessage: (message) => {
      dispatch(addMessage(message))
    }
  }
};

const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational);

class AppWrapper extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Container/>
      </Provider>
    );
  }
};
```