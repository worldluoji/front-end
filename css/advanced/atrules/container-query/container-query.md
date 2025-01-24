# container query 说明

### `container-type` 属性
`container-type` 是 CSS 中的一个属性，用于定义一个元素是否可以作为容器查询（Container Queries）的容器。容器查询允许你根据包含元素的尺寸（如宽度、高度）来应用不同的样式，而不仅仅是视口尺寸（viewport）。这为响应式设计提供了更大的灵活性和细粒度的控制。

#### 1. **基本概念**

- **容器查询**：类似于媒体查询（Media Queries），但针对的是包含元素的尺寸，而不是整个视口。
- **容器类型**：通过 `container-type` 属性定义一个元素是否可以作为容器查询的容器。

#### 2. **`container-type` 属性**

- **语法**：
  ```css
  container-type: normal | inline-size | size;
  ```

- **取值**：
  - `normal`（默认值）：元素不能作为容器查询的容器。
  - `inline-size`：元素可以作为容器查询的容器，并且容器查询将基于元素的内联尺寸（宽度）。
  - `size`：元素可以作为容器查询的容器，并且容器查询将基于元素的尺寸（宽度和高度）。

#### 3. **使用场景**

- **响应式设计**：根据包含元素的尺寸应用不同的样式。
- **组件化开发**：在组件内部使用容器查询，使其更具响应性。
- **嵌套布局**：处理嵌套布局中的响应式问题。

#### 4. **示例**

以下是一个详细的示例，展示了如何使用 `container-type` 和容器查询来实现响应式设计。

##### HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Container Queries Example</title>
    <style>
        /* 定义容器 */
        .container {
            container-type: inline-size; /* 使用内联尺寸作为容器查询的基准 */
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            border: 2px solid #ccc;
            padding: 20px;
            box-sizing: border-box;
        }

        /* 默认样式 */
        .card {
            background-color: #f0f0f0;
            padding: 20px;
            border-radius: 8px;
            margin-bottom: 20px;
        }

        .card h2 {
            font-size: 1.5em;
            margin: 0 0 10px;
        }

        .card p {
            font-size: 1em;
            margin: 0;
        }

        /* 容器查询：当容器宽度小于 600px 时 */
        @container (max-width: 600px) {
            .card {
                background-color: #e0e0e0;
            }

            .card h2 {
                font-size: 1.2em;
            }

            .card p {
                font-size: 0.9em;
            }
        }

        /* 容器查询：当容器宽度大于等于 600px 且小于 800px 时 */
        @container (min-width: 600px) and (max-width: 800px) {
            .card {
                background-color: #d0d0d0;
            }

            .card h2 {
                font-size: 1.4em;
            }

            .card p {
                font-size: 1em;
            }
        }

        /* 容器查询：当容器宽度大于等于 800px 时 */
        @container (min-width: 800px) {
            .card {
                background-color: #c0c0c0;
            }

            .card h2 {
                font-size: 1.6em;
            }

            .card p {
                font-size: 1.1em;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h2>Card Title 1</h2>
            <p>This is the content of the first card. It demonstrates how container queries can be used to apply different styles based on the container's width.</p>
        </div>
        <div class="card">
            <h2>Card Title 2</h2>
            <p>This is the content of the second card. Container queries provide more granular control over responsive design.</p>
        </div>
    </div>
</body>
</html>
```
- 根据 `.container` 的宽度应用不同的样式。
- 当 `.container` 的宽度小于 600px 时，应用第一个容器查询的样式。
- 当 `.container` 的宽度在 600px 到 800px 之间时，应用第二个容器查询的样式。
- 当 `.container` 的宽度大于等于 800px 时，应用第三个容器查询的样式。

#### 5. **容器类型 `inline-size` vs `size`**

- **`inline-size`**：
  - 基于元素的内联尺寸（宽度）进行容器查询。
  - 适用于大多数响应式设计场景。

- **`size`**：
  - 基于元素的尺寸（宽度和高度）进行容器查询。
  - 适用于需要同时考虑宽度和高度的场景。

##### 示例：使用 `size`

```css
.container {
    container-type: size; /* 使用尺寸（宽度和高度）作为容器查询的基准 */
    width: 100%;
    max-width: 800px;
    max-height: 400px;
    margin: 0 auto;
    border: 2px solid #ccc;
    padding: 20px;
    box-sizing: border-box;
}

@container (max-width: 600px) {
    .card {
        background-color: #e0e0e0;
    }

    .card h2 {
        font-size: 1.2em;
    }

    .card p {
        font-size: 0.9em;
    }
}

@container (min-width: 600px) and (max-height: 300px) {
    .card {
        background-color: #d0d0d0;
    }

    .card h2 {
        font-size: 1.4em;
    }

    .card p {
        font-size: 1em;
    }
}
```

在这个示例中，`.container` 的 `container-type` 设置为 `size`，因此容器查询可以同时考虑宽度和高度。


#### 6. **最佳实践**
- **明确容器**：确保明确哪些元素可以作为容器查询的容器。
- **简化样式**：使用容器查询简化复杂的媒体查询，提高代码的可维护性。
- **测试兼容性**：在不同浏览器中测试容器查询的兼容性，确保样式在所有目标浏览器中正常工作。


### 总结
- **默认值**：`container-type` 的默认值是 `normal`，表示元素不能作为容器查询的容器。
- **启用容器查询**：通过将 `container-type` 设置为 `inline-size` 或 `size`，可以启用容器查询。
- **容器查询**：使用 `@container` 规则根据容器的尺寸应用不同的样式。