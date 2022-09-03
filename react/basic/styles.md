# styles

If you import styles from a stylesheet, it isn't much different at all. You apply a class to your JSX element using the <strong>className</strong> attribute, and apply styles to the class in your stylesheet. 

example:
<div calssName="myDiv">Mellow Yellow</div>

Another option is to apply inline styles, which are very common in ReactJS development.

example:
```
html:
<div style="color: yellow; font-size: 16px">Mellow Yellow</div>

JSX:
<div style={{color: "yellow", fontSize: 16}}>Mellow Yellow</div>
```

```
class Colorful extends React.Component {
  render() {
    return (
      <div style={{color: "red", fontSize: "72px"}}>Big Red</div>
    );
  }
};
```

If you have a large set of styles, you can assign a style object to a constant to keep your code organized:
```
const styles = {color: "purple", fontSize: 40, border: "2px solid purple"}
class Colorful extends React.Component {
  render() {
    return (
      <div style={styles}>Style Me!</div>
    );
  }
};
```

example: Change Inline CSS Conditionally Based on Component State
```
class GateKeeper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ input: event.target.value })
  }
  render() {
    let inputStyle = {
      border: '1px solid black'
    };
    // Change code below this line
    if (this.state.input.length > 15) {
      inputStyle.border = '3px solid red'
    }
    // Change code above this line
    return (
      <div>
        <h3>Don't Type Too Much:</h3>
        <input
          type="text"
          style={inputStyle}
          value={this.state.input}
          onChange={this.handleChange} />
      </div>
    );
  }
};
```

# define html class

In JSX is that you can no longer use the word class to define HTML classes. This is because class is a reserved word in JavaScript. Instead, JSX uses <strong>className</strong>.

The naming convention for all HTML attributes and event references in JSX become camelCase. For example, a click event in JSX is onClick, instead of onclick. Likewise, onchange becomes onChange.

example:
```
const JSX = (
  <div className="myDiv">
    <h1>Add a class to this div</h1>
  </div>
);
```

# br and hr
Any JSX element can be written with a self-closing tag, and every element must be closed. The line-break tag, for example, must always be written as `<br />` in order to be valid JSX that can be transpiled. A `<div>`, on the other hand, can be written as `<div />` or `<div></div>`. The difference is that in the first syntax version there is no way to include anything in the `<div />`

```
const JSX = (
  <div>
    <h2>Welcome to React!</h2> <br/>
    <p>Be sure to close all tags!</p>
    <hr/>
  </div>
);
```
