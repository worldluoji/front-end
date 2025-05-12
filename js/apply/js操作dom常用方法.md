# js操作dom常用方法
JavaScript 操作 DOM（文档对象模型）的方法非常多，下面列举了一些常用的方法，这些方法可以帮助你创建、修改、删除和查询页面中的元素。

### 1. 创建与添加元素

- `document.createElement(tagName)`: 创建一个新的元素节点。
- `element.appendChild(child)`: 将一个子节点添加到指定父节点的最后一个子节点之后。
- `element.insertBefore(newNode, referenceNode)`: 在参考节点之前插入新节点。
- `element.cloneNode(deep)`: 克隆一个节点，`deep` 参数为 true 表示深度克隆，即包括所有后代节点。

### 2. 修改元素

- `element.setAttribute(name, value)`: 设置元素的属性值。
- `element.getAttribute(name)`: 获取元素的属性值。
- `element.removeAttribute(name)`: 移除元素的某个属性。
- `element.innerHTML`: 获取或设置元素的内容，包含HTML标记。
- `element.outerHTML`: 获取或替换整个元素及其内容。
- `element.textContent`: 获取或设置元素的文本内容，不解析HTML标签。
- `element.style.property = "value"`: 直接设置内联样式。
- `element.classList.add/remove/toggle("className")`: 操作元素的class属性。

### 3. 删除元素

- `element.removeChild(child)`: 从文档中移除一个子节点。
- `element.replaceChild(newChild, oldChild)`: 替换一个子节点。

### 4. 查询元素

- `document.getElementById(id)`: 根据ID获取单个元素。
- `document.getElementsByClassName(names)`: 根据类名获取一组元素。
- `document.getElementsByTagName(name)`: 根据标签名获取一组元素。
- `document.querySelector(selector)`: 根据CSS选择器获取第一个匹配的元素。
- `document.querySelectorAll(selectors)`: 根据CSS选择器获取所有匹配的元素。

### 5. 事件处理

- `element.addEventListener(event, function, useCapture)`: 给元素添加事件监听器。
- `element.removeEventListener(event, function, useCapture)`: 移除元素的事件监听器。

### 6. 其他操作

- `element.hasAttribute(name)`: 检查元素是否有特定属性。
- `element.closest(selector)`: 返回最接近的选择器匹配的祖先元素（可以是元素本身）。
- `element.matches(selector)`: 检查元素是否匹配给定的选择器字符串。

## reference
https://developer.mozilla.org/zh-CN/docs/Web/API/Document/querySelectorAll