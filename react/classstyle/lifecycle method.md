# Lifecycle Method
Here is a list of some of the main lifecycle methods: 
- componentWillMount() 
- componentDidMount() 
- shouldComponentUpdate() 
- componentDidUpdate() 
- componentWillUnmount()

<br>

## 1. componentWillMount()
The componentWillMount Lifecycle method will be deprecated in a future version of 16.X and removed in version 17.

https://www.freecodecamp.org/news/how-to-safely-use-reacts-life-cycles-with-fiber-s-async-rendering-fd4469ebbd8f/

The componentWillMount() method is called before the render() method when a component is being mounted to the DOM. Log something to the console within componentWillMount()

## 2. componentDidMount、componentWillUnmount

The best practice with React is to place API calls or any calls to your server in the lifecycle method componentDidMount(). 

This method is called after a component is mounted to the DOM. Any calls to setState() here will trigger a re-rendering of your component. 

When you call an API in this method, and set your state with the data that the API returns, it will automatically trigger an update once you receive the data.


The componentDidMount() method is also the best place to attach any event listeners you need to add for specific functionality. 

It's good practice to use this lifecycle method to do any clean up on React components before they are unmounted and destroyed. Removing event listeners is an example of one such clean up action.

componentDidMount相当于Vue中的mounted

```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown',this.handleKeyPress);
  }
  handleEnter() {
    this.setState((state) => ({
      message: state.message + 'You pressed the enter key! '
    }));
  }
  handleKeyPress(event) {
    if (event.keyCode === 13) {
      this.handleEnter();
    }
  }
  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
      </div>
    );
  }
};
```

## 3. Optimize Re-Renders with shouldComponentUpdate

if any component receives new state or new props, it re-renders itself and all its children. This is usually okay. But React provides a lifecycle method you can call when child components receive new state or props, and declare specifically if the components should update or not. The method is shouldComponentUpdate(), and it takes nextProps and nextState as parameters.

类似于Vue中的计算属性computed

```
class OnlyEvens extends React.Component {
  constructor(props) {
    super(props);
  }

  // return a boolean value that tells React whether or not to update the component
  shouldComponentUpdate(nextProps, nextState) {
    console.log('Should I update?');
    return nextProps.value % 2 === 0;
  }
  componentDidUpdate() {
    console.log('Component re-rendered.');
  }
  render() {
    return <h1>{this.props.value}</h1>;
  }
}

class Controller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
    this.addValue = this.addValue.bind(this);
  }
  addValue() {
    this.setState(state => ({
      value: state.value + 1
    }));
  }
  render() {
    return (
      <div>
        <button onClick={this.addValue}>Add</button>
        <OnlyEvens value={this.state.value} />
      </div>
    );
  }
}
```