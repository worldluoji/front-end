# 普通css和tailwind常用映射关系
下面我将总结一些常用的普通 CSS 写法，并列出它们在 Tailwind CSS 中的对应类名。这可以帮助你理解如何从传统的 CSS 过渡到使用 Tailwind 的实用优先（utility-first）CSS 方法。

### 布局相关

#### 普通 CSS
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
}
```

#### Tailwind CSS
```html
<div class="container mx-auto max-w-3xl w-full"></div>
```

### 定位相关

#### 普通 CSS
```css
.position-relative {
  position: relative;
}

.position-absolute {
  position: absolute;
  top: 10px;
  right: 10px;
}
```

#### Tailwind CSS
```html
<div class="relative"></div>
<div class="absolute top-2.5 right-2.5"></div>
```

### 显示和隐藏

#### 普通 CSS
```css
.hidden {
  display: none;
}

.block {
  display: block;
}
```

#### Tailwind CSS
```html
<div class="hidden"></div>
<div class="block"></div>
```

### 浮动与清除浮动

#### 普通 CSS
```css
.float-left {
  float: left;
}

.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
```

#### Tailwind CSS
```html
<div class="float-left"></div>
<div class="clearfix"></div>
```

### 边距和填充

#### 普通 CSS
```css
.margin-all {
  margin: 10px;
}

.padding-top-bottom {
  padding-top: 20px;
  padding-bottom: 20px;
}
```

#### Tailwind CSS
```html
<div class="m-2.5"></div>
<div class="py-5"></div>
```

### 文本样式

#### 普通 CSS
```css
.text-center {
  text-align: center;
}

.font-bold {
  font-weight: bold;
}
```

#### Tailwind CSS
```html
<p class="text-center"></p>
<p class="font-bold"></p>
```

### 颜色

#### 普通 CSS
```css
.background-red {
  background-color: red;
}

.text-white {
  color: white;
}
```

#### Tailwind CSS
```html
<div class="bg-red-500 text-white"></div>
```

### 尺寸

#### 普通 CSS
```css
.width-50 {
  width: 50%;
}

.height-100 {
  height: 100%;
}
```

#### Tailwind CSS
```html
<div class="w-1/2"></div>
<div class="h-full"></div>
```

### Flexbox

#### 普通 CSS
```css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

#### Tailwind CSS
```html
<div class="flex justify-between items-center"></div>
```

### Grid

#### 普通 CSS
```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

#### Tailwind CSS
```html
<div class="grid grid-cols-3"></div>
```

### 响应式设计

Tailwind CSS 提供了丰富的响应式前缀，例如 `sm:`, `md:`, `lg:`, `xl:` 和 `2xl:`，用于根据不同的屏幕尺寸应用样式。例如：

#### 普通 CSS
```css
@media (min-width: 640px) {
  .responsive-padding {
    padding: 20px;
  }
}
```

#### Tailwind CSS
```html
<div class="p-2.5 sm:p-5"></div>
```

### 总结

Tailwind CSS 通过提供大量的预定义类来简化 CSS 样式的编写，使得开发者能够快速地构建响应式的用户界面。它的实用优先方法鼓励直接在 HTML 中添加样式，从而减少了对自定义 CSS 文件的需求。不过，这也意味着对于大型项目或复杂的样式需求，可能需要更多的规划和组织以保持代码的可维护性。