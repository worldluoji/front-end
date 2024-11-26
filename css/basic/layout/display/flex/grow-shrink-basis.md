# 理解 flex-grow、flex-shrink 和 flex-basis
`flex-grow`、`flex-shrink` 和 `flex-basis` 是 CSS Flexbox 布局中的重要属性，它们共同决定了弹性项目（flex items）在弹性容器（flex container）中的行为。下面是这些属性的详细解释以及它们的简写方式：

### 1. `flex-grow`
- **定义**：`flex-grow` 属性定义了弹性项目在主轴方向上的增长比例。当弹性容器中有剩余空间时，`flex-grow` 决定了每个弹性项目如何分配这些剩余空间。
- **默认值**：`0`，表示项目不会增长。
- **取值**：非负数（可以是整数或小数）。
- **示例**：
  ```css
  .item {
    flex-grow: 1;
  }
  ```
  如果一个弹性容器中有两个弹性项目，且它们的 `flex-grow` 都为1，那么这两个项目将平分容器中的剩余空间。

### 2. `flex-shrink`
- **定义**：`flex-shrink` 属性定义了弹性项目在主轴方向上的收缩比例。当弹性容器中的空间不足时，`flex-shrink` 决定了每个弹性项目如何缩小。
- **默认值**：`1`，表示项目会按比例缩小。
- **取值**：非负数（可以是整数或小数）。
- **示例**：
  ```css
  .item {
    flex-shrink: 2;
  }
  ```
  如果一个弹性容器中有两个弹性项目，且它们的 `flex-shrink` 分别为2和1，那么当空间不足时，第一个项目会以两倍的速度缩小。

### 3. `flex-basis`
- **定义**：`flex-basis` 属性定义了在分配多余空间之前，弹性项目的初始主轴大小。它可以是一个具体的长度（如 `100px`）、一个百分比（如 `50%`），或者 `auto`。
- **默认值**：`auto`，表示项目的初始大小基于其内容。
- **取值**：长度值、百分比或 `auto`。
- **示例**：
  ```css
  .item {
    flex-basis: 100px;
  }
  ```
  这个弹性项目的初始大小为100像素。

### 简写方式 `flex`
`flex` 是一个简写属性，可以同时设置 `flex-grow`、`flex-shrink` 和 `flex-basis`。它的语法如下：
```css
flex: <flex-grow> <flex-shrink> <flex-basis>;
```

- **全部三个值**：
  ```css
  .item {
    flex: 1 1 100px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 100px */
  }
  ```

- **省略 `flex-shrink`**：
  如果省略 `flex-shrink`，则默认为1。
  ```css
  .item {
    flex: 1 100px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 100px */
  }
  ```

- **省略 `flex-shrink` 和 `flex-basis`**：
  如果只提供 `flex-grow`，则 `flex-shrink` 默认为1，`flex-basis` 默认为0。
  ```css
  .item {
    flex: 1; /* flex-grow: 1, flex-shrink: 1, flex-basis: 0 */
  }
  ```

### 示例
假设我们有一个简单的弹性容器，包含三个弹性项目：

```html
<div class="container">
  <div class="item item1"></div>
  <div class="item item2"></div>
  <div class="item item3"></div>
</div>
```

```css
.container {
  display: flex;
  height: 300px;
}

.item1 {
  flex: 1 1 100px; /* flex-grow: 1, flex-shrink: 1, flex-basis: 100px */
  background-color: red;
}

.item2 {
  flex: 2 1 50px; /* flex-grow: 2, flex-shrink: 1, flex-basis: 50px */
  background-color: green;
}

.item3 {
  flex: 1 0 auto; /* flex-grow: 1, flex-shrink: 0, flex-basis: auto */
  background-color: blue;
}
```

在这个例子中：
- `item1` 的初始大小为100像素，增长比例为1，收缩比例为1。
- `item2` 的初始大小为50像素，增长比例为2，收缩比例为1。
- `item3` 的初始大小基于内容，增长比例为1，不会收缩。

希望这些解释能帮助你更好地理解 `flex-grow`、`flex-shrink` 和 `flex-basis` 以及它们的简写方式。