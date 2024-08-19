# Content scripts and background scripts
content scripts 和 background scripts 在浏览器扩展开发中各自承担不同的职责，它们的工作环境和使用场景也有所不同。下面详细解释它们之间的区别以及各自的使用场景：

### Background Scripts

**用途**：
- Background scripts 主要在浏览器扩展的后端运行，不会直接与网页内容交互。
- 它们通常用于处理长期运行的任务，比如定时任务、持久化存储管理、与其他扩展或浏览器服务的通信等。

**主要功能**：
- **数据存储与管理**：管理本地存储（如 localStorage 或 IndexedDB）。
- **定时任务**：执行周期性的任务，如定期检查更新、定时同步数据等。
- **系统级别的任务**：与浏览器的各种 API 交互，如管理标签、处理通知、处理浏览器事件等。
- **与其他扩展通信**：使用消息传递机制与其他扩展或浏览器服务通信。
- **API 调用**：处理网络请求、API 调用等。

**使用场景**：
- **持久化数据处理**：如缓存数据、存储用户偏好设置等。
- **扩展的主控制逻辑**：处理扩展的核心逻辑，如启动流程、关闭流程等。
- **与 content scripts 通信**：作为中间层，处理 content scripts 与外部服务之间的通信。
- **浏览器事件处理**：监听浏览器事件，如新标签页打开、浏览器启动等。

### Content Scripts

**用途**：
- Content scripts 主要在特定的网页上下文中运行，可以直接访问和修改页面的 DOM。
- 它们通常用于与网页内容进行交互，如修改页面元素、监听页面事件等。

**主要功能**：
- **DOM 操作**：修改页面元素的属性、样式、内容等。
- **事件监听**：监听页面上的事件，如点击事件、输入事件等。
- **数据抓取**：从页面中提取数据，如商品价格、评论等。
- **页面增强**：增加额外的功能或改变页面的行为，如增加搜索功能、更改页面布局等。
- **数据注入**：向页面中注入额外的数据或功能，如翻译功能、注释功能等。

**使用场景**：
- **页面元素修改**：如更改页面的颜色、字体大小等。
- **页面内容抓取**：从页面中提取有用的信息。
- **页面功能增强**：如为特定网站添加额外的功能，如分享按钮、社交插件等。
- **页面事件监听**：监听页面上的事件，如滚动事件、点击事件等。
- **与 background scripts 通信**：通过消息传递机制与 background scripts 交互，以实现更复杂的功能。

总之

- **Background scripts** 更侧重于扩展的后端逻辑和长期运行的任务，而 **content scripts** 则更侧重于与页面内容的交互。
- Content scripts 可以直接与页面内容进行交互，而 background scripts 通常处理更全局的任务，并且可以作为 content scripts 和浏览器服务之间的桥梁。
- 两者通过消息传递机制进行通信，以协同工作并实现扩展的功能。

<br>

## chrome.contextMenus.onClicked.addListener
`chrome.contextMenus.onClicked.addListener` 只能在 background script 中使用，
在 content script 中使用 onClicked 会undefined

### 在 background script 中使用

在 background script 中使用 `chrome.contextMenus.onClicked.addListener` 是最常见的方式。background script 可以处理各种扩展的全局状态，并且可以与 content scripts 以及其他部分进行通信。

#### 示例代码

```javascript
// background.ts

chrome.contextMenus.create({
  title: "Open in New Tab",
  contexts: ["selection"],
  onclick: function(info, tab) {
    chrome.tabs.create({ url: info.selectionText });
  }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  console.log("Menu item was clicked:", info.menuItemId);
  // 在这里处理菜单项被点击后的逻辑
});
```

### 在 content script 中使用

### 为什么不设计在 content script 中使用

1. **作用域限制**：
   - Content scripts 只能访问当前页面的上下文。
   - 它们通常不被设计用来处理全局的状态或与其他页面或扩展的部分进行通信。

2. **资源限制**：
   - Content scripts 在每个页面中都会重新加载，这可能导致不必要的资源消耗。
   - 而 background script 通常只加载一次，并在整个扩展生命周期内保持活动状态。

3. **扩展逻辑管理**：
   - Context menus 通常涉及扩展的核心逻辑，这些逻辑更适合在 background script 中管理，以确保一致性和可维护性。

### 通信方式

如果你需要在 content script 和 background script 之间传递数据或触发事件，你可以使用 `chrome.runtime.sendMessage` 和 `chrome.runtime.onMessage` 进行通信。

#### 示例代码

在 content script 中：

```javascript
// contentScript.js

// 当用户执行某些操作时发送消息
function onUserAction() {
  chrome.runtime.sendMessage({ action: 'userAction' }, function(response) {
    console.log('Received response:', response);
  });
}

// 监听用户操作
document.addEventListener('click', onUserAction);
```

在 background script 中：

```javascript
// background.ts

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'userAction') {
    console.log('User action detected');
    // 在这里处理用户操作
  }
});
```