# insertAdjacentHTML
使用 insertAdjacentHTML()（推荐🌟）
在元素末尾追加内容而不破坏现有节点​：

```js
element.insertAdjacentHTML('beforeend', '新内容');
```

如下方式会破坏现有节点：
```js
element.innerHTML = element.innerHTML + "新内容";
```
这会导致浏览器执行以下步骤：
- 读取当前 innerHTML 字符串（包含所有子节点的序列化 HTML）；
- 拼接新内容生成新字符串；
- ​清空目标节点的所有子节点；
- 将新字符串解析为 DOM 节点并插入