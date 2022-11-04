# modal
## 常用modal方案存在的问题
```
function MainLayout() {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);
  const showUserModal = (user) => {
    setModalVisible(true);
    setUser(user);
  }
  return (
    <div className="main-layout">
      <Sider onNewUser={showUserModal}/>
      <UserList onEditUser={user => showUserModal(user)}/>
      <UserInfoModal visible={modalVisible} user={user} />
    </div>
  );
}
```
一般情况我们写modal，都和具体的组件或页面绑定了。
但这种写法其实隐含着如下两个问题：

第一，语义隔离不明确。MainLayout 这个组件应该只做布局的事情，而不应该有其他的业务逻辑。
但是在这里，由于我们加入了用户信息处理的逻辑，就让本不相关的两块功能产生了依赖。

而且，如果要增加另外一个对话框，那意味着又要在 Layout 上增加新的业务逻辑了。
这样的话，代码很快就会变得臃肿，且难以理解和维护。

第二，难以扩展。现在我们只是在 MainLayout 下面的两个组件共享了对话框，
但是如果和 MainLayout 同级的组件也要访问这个对话框呢？
又或者， MainLayout 下面的某个深层级的孙子组件也要能显示同一个对话框呢？

<br>

## 解决思路
使用全局状态管理所有对话框。

对话框在本质上，其实是独立于其他界面的一个窗口，用于完成一个独立的功能。

如果从视觉角度出发，你会发现在使用对话框的时候，你完全不会关心它是从哪个具体的组件中弹出来的，而只会关心对框本身的内容。

在定义一个对话框的时候，其定位基本会等价于定义一个具有唯一 URL 路径的页面。只是前者由弹出层实现，后者是页面的切换。