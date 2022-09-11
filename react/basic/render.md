# render
React 组件会渲染出一棵元素树。因为开发者使用的是 React 的声明式 API，在此基础上，每次有 props、state 等数据变动时，组件会渲染出新的元素树，React 框架会与之前的树做 Diffing 对比，将元素的变动最终体现在浏览器页面的 DOM 中。这一过程就称为协调（Reconciliation）。

从 React v16 开始，协调从之前的同步改成了异步过程，这主要得益于新的 Fiber 协调引擎。从此在 React 中更贴近虚拟 DOM 的，是在 Fiber 协调引擎中的核心模型 FiberNode。
- 渲染阶段是异步过程，主要负责更新虚拟 DOM（ FiberNode ）树，而不会操作真实 DOM，这一过程可能会被 React 暂停和恢复，甚至并发处理，因此要求渲染阶段的生命周期方法必须是没有任何副作用（Side-effect）的纯函数（Pure Function）；
- 提交阶段是同步过程，根据渲染阶段的比对结果修改真实 DOM，这一阶段的生命周期方法可以包含副作用。

FiberNode 依靠对元素到子元素的双向链表、子元素到自元素的单向链表实现了一棵树，这棵树可以随时暂停并恢复渲染，触发组件生命周期等副作用（Side-effect），并将中间结果分散保存在每一个节点上，不会 block 浏览器中的其他工作。

## diffing要点
- 从根元素开始，React 将递归对比两棵树的根元素和子元素；
- 对比不同类型的元素，如对比 HTML 元素和 React 组件元素，React 会直接清理旧的元素和它的子树，然后建立新的树；
- 对比同为 HTML 元素，但 Tag 不同的元素，如从 <a> 变成 <div> ，React 会直接清理旧的元素和子树，然后建立新的树；
- 对比同为 React 组件元素，但组件类或组件函数不同的元素，如从 KanbanNewCard 变成 KanbanCard ，React 会卸载旧的元素和子树，然后挂载新的元素树；
- 对比 Tag 相同的 HTML 元素，如  <input type="text" value="old" /> 和 <input type="text" value="new" /> ，React 将会保留该元素，并记录有改变的属性，在这个例子里就是 value 的值从 "old" 变成了 "new" ；
- 对比组件类或组件函数相同的组件元素，如 <KanbanCard title="老卡片" /> 和 <KanbanCard title="新卡片" /> ，React 会保留组件实例，更新 props，并触发组件的生命周期方法或者 Hooks。

如果对比结果是在列表末尾新增或者减少元素那还好，但如果是在列表头部或者中间插入或者删除元素，React 就不知道该保留哪个元素了，干脆把整个列表都推翻了重建，这样会带来性能损耗。
为了应对这种情况，React 引入了 key 这个特殊属性，当有子元素列表中的元素有这个属性时，React 会利用这个 key 属性值来匹配新旧列表中的元素，以减少插入元素时的性能损耗。

props 从组件外面传进来，state 则是活跃在组件内部，至于 context ，在组件外面的 Context.Provider 提供数据，组件内部则可以消费 context 数据。
只要这三种数据之一发生了变化，React 就会对当前组件触发协调过程，最终按照 Diffing 结果更改页面。

## ReactDOM.render
ReactDOM.render(componentToRender, targetNode), where the first argument is the React element or component that you want to render, and the second argument is the DOM node that you want to render the component to.

example
```
class TypesOfFood extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h1>Types of Food:</h1>
      </div>
    );
  }
};

let target = document.getElementById('challenge-node');
ReactDOM.render(<TypesOfFood />, target);
```

## Use Array.map() to Dynamically Render Elements
```
const frontEndFrameworks = [
  'React',
  'Angular',
  'Ember',
  'Knockout',
  'Backbone',
  'Vue'
];

function Frameworks() {
  const renderFrameworks = frontEndFrameworks.map(u => {
    return (
      <li key={u}>{u}</li>
    )
  });
  return (
    <div>
      <h1>Popular Front End JavaScript Frameworks</h1>
      <ul>
        {renderFrameworks}
      </ul>
    </div>
  );
};
```
循环里使用key，可以使得render的效率更高。

<br>

## Use Array.filter() to Dynamically Filter an Array
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        {
          username: 'Jeff',
          online: true
        },
        {
          username: 'Alan',
          online: false
        },
        {
          username: 'Mary',
          online: true
        },
        {
          username: 'Jim',
          online: false
        },
        {
          username: 'Sara',
          online: true
        },
        {
          username: 'Laura',
          online: true
        }
      ]
    };
  }
  render() {
    const usersOnline = this.state.users.filter(user => user.online);
    const renderOnline = usersOnline.map(user => {
      return (
        <li key={user.username}>{user.username}</li>
      )
    }); 
    return (
      <div>
        <h1>Current Online Users:</h1>
        <ul>{renderOnline}</ul>
      </div>
    );
  }
}
```

<br>

## renderToString()
The renderToString() method is provided on ReactDOMServer. The method takes one argument which is a React element
```
class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div/>
  }
};

ReactDOMServer.renderToString(<App />);
```