# BEM
BEM (Block Element Modifier) 是一种广泛使用的 CSS 命名方法论，它帮助开发者组织和编写可维护的 CSS 代码。BEM 的核心思想是将页面划分为独立的块（Blocks），每个块可以包含一个或多个元素（Elements），并且可以通过修饰符（Modifiers）来改变块的行为或外观。

### BEM 的组成部分:

1. **Block (块)**: 页面上的独立模块，如 header、footer 或 button。块通常是页面上功能完整的一部分，可以被复用。

2. **Element (元素)**: 构成块的子部分，如 button 内的图标或文本。元素不能独立存在，必须属于某个块。

3. **Modifier (修饰符)**: 改变块或元素的外观或行为的标识符。修饰符通常用于表示不同的状态或样式变化。

### BEM 的命名约定:

- 块: `block-name`
- 元素: `block-name__element-name`
- 修饰符: `block-name--modifier-name` 或 `block-name__element-name--modifier-name`

#### 示例:

假设我们有一个导航栏（`navbar`）作为块，其中包含一个列表（`list`）作为元素，以及一个表示导航栏处于展开状态的修饰符（`expanded`）。

- 导航栏的 CSS 类: `.navbar`
- 列表的 CSS 类: `.navbar__list`
- 展开状态的修饰符: `.navbar--expanded`

#### CSS 示例:

```css
.navbar {
  /* 导航栏的基本样式 */
  background-color: #333;
  color: white;
}

.navbar__list {
  /* 列表的基本样式 */
  list-style: none;
  padding: 0;
  margin: 0;
}

.navbar--expanded .navbar__list {
  /* 当导航栏展开时列表的样式 */
  display: block;
}
```

### BEM 的优点:

- **可维护性**: BEM 鼓励使用更具描述性的类名，使得 CSS 更容易理解和维护。
- **可复用性**: 由于块和元素是独立的，它们可以在多个地方复用，而不会相互影响。
- **隔离性**: BEM 减少了全局样式冲突的风险，因为类名通常较长且具有明确的意义。
- **可扩展性**: 通过添加修饰符，可以轻松地扩展组件的功能和样式。

### 使用 BEM 的注意事项:

- **保持简洁**: 尽管 BEM 的类名可能较长，但应尽量避免过于冗长的类名。
- **避免过度嵌套**: 虽然 BEM 支持嵌套选择器，但过多的嵌套可能导致代码难以维护。
- **考虑性能**: 过多的类可能会导致 CSS 选择器变得复杂，进而影响渲染性能。

通过遵循 BEM 方法论，你可以构建出更易于维护和扩展的 CSS 结构，这对于大型项目来说尤其重要。

<br>

## reference
https://getbem.com/introduction/