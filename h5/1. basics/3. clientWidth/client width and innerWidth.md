以下是关于 `clientHeight`、`clientWidth` 与 `innerHeight`、`innerWidth` 的详细讲解：

---

## **1. 基本定义**

### **(1) clientHeight 和 clientWidth**
- **所属对象**：`document.documentElement`（即 `<html>` 元素）。
- **含义**：
  - `clientHeight`：表示浏览器视口（viewport）的高度，不包括滚动条和边框。
  - `clientWidth`：表示浏览器视口的宽度，不包括滚动条和边框。
- **特点**：
  - 它们是 DOM 对象的属性，直接从文档的根元素（`<html>`）获取。
  - 不包含滚动条的宽度或高度。

### **(2) innerHeight 和 innerWidth**
- **所属对象**：`window` 对象。
- **含义**：
  - `innerHeight`：表示浏览器窗口的内部高度，包括滚动条。
  - `innerWidth`：表示浏览器窗口的内部宽度，包括滚动条。
- **特点**：
  - 它们是全局 `window` 对象的属性，直接反映浏览器窗口的尺寸。
  - 包含滚动条的宽度或高度。

---

## **2. 区别对比**

| 特性                     | `clientHeight` / `clientWidth`          | `innerHeight` / `innerWidth`            |
|--------------------------|-----------------------------------------|-----------------------------------------|
| **所属对象**             | `document.documentElement`              | `window`                                |
| **是否包含滚动条**       | 不包含                                 | 包含                                   |
| **是否包含边框**         | 不包含                                 | 不包含                                 |
| **适用场景**             | 获取视口的实际内容区域尺寸             | 获取浏览器窗口的完整内部尺寸           |
| **兼容性**               | 标准模式下兼容性较好                   | 更广泛的兼容性，适用于所有现代浏览器   |

---

## **3. 实际应用场景**

### **(1) 使用 `clientHeight` 和 `clientWidth`**
- **场景**：需要获取视口的内容区域大小，用于布局计算或动态调整页面元素。
- **示例**：
  ```js
  let clientHeight = document.documentElement.clientHeight;
  let clientWidth = document.documentElement.clientWidth;
  console.log(`视口内容区域大小: ${clientWidth}x${clientHeight}`);
  ```

### **(2) 使用 `innerHeight` 和 `innerWidth`**
- **场景**：需要获取浏览器窗口的整体尺寸，包括滚动条，用于全屏操作或窗口适配。
- **示例**：
  ```js
  let innerHeight = window.innerHeight;
  let innerWidth = window.innerWidth;
  console.log(`浏览器窗口大小: ${innerWidth}x${innerHeight}`);
  ```

---

## **4. 注意事项**

### **(1) 滚动条的影响**
- `clientHeight` 和 `clientWidth` 不包含滚动条，因此在有滚动条的情况下，它们的值会比 `innerHeight` 和 `innerWidth` 小。
- 示例：
  ```js
  console.log(window.innerWidth); // 包含滚动条
  console.log(document.documentElement.clientWidth); // 不包含滚动条
  ```

### **(2) 浏览器兼容性**
- 在标准模式下，`document.documentElement.clientHeight` 和 `document.documentElement.clientWidth` 是获取视口尺寸的推荐方式。
- 在某些旧版浏览器中，可能需要使用 `document.body.clientHeight` 和 `document.body.clientWidth`，但现代浏览器中这些值通常为 `0`。

### **(3) 动态变化**
- 当用户调整浏览器窗口大小时，`innerHeight` 和 `innerWidth` 会实时更新。
- 可以通过监听 `resize` 事件来捕获这些变化：
  ```js
  window.addEventListener('resize', () => {
    console.log(`窗口大小: ${window.innerWidth}x${window.innerHeight}`);
  });
  ```

---

## **5. 总结**

- **`clientHeight` 和 `clientWidth`**：
  - 用于获取视口的内容区域大小。
  - 不包含滚动条和边框。
  - 推荐在标准模式下使用。

- **`innerHeight` 和 `innerWidth`**：
  - 用于获取浏览器窗口的整体内部尺寸。
  - 包含滚动条。
  - 兼容性更好，适合大多数场景。

通过理解这两组属性的区别，你可以根据具体需求选择合适的属性来获取浏览器窗口或视口的尺寸。

<img src="./assets/client width and height.png" />

---

## references
- https://developer.mozilla.org/en-US/docs/Web/API/Element/clientHeight
- https://developer.mozilla.org/zh-CN/docs/Glossary/Layout_viewport