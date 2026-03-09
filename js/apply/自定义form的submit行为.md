# 自定义form的submit行为
场景：**可以通过JavaScript在表单提交时添加遮罩效果**，既能防止用户重复提交，又能提升用户体验。以下是几种实用方案：

### 1. 基础遮罩层实现（原生JS方案）

在表单提交时显示遮罩层，提交完成后隐藏，这是最常用的方法：

```html
<form id="myForm" action="/submit" method="post">
  <!-- 表单内容 -->
  <button type="submit" class="submit-btn">提交</button>
</form>

<!-- 遮罩层结构 -->
<div id="maskLayer" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: #000; opacity: 0.5; z-index: 9999;"></div>

<script>
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault(); // 阻止默认提交行为
  
  // 显示遮罩层
  document.getElementById('maskLayer').style.display = 'block';
  
  // 执行AJAX提交
  fetch('/submit', {
    method: 'POST',
    body: new FormData(this)
  })
  .then(response => response.json())
  .then(data => {
    // 提交成功处理
    console.log('提交成功:', data);
  })
  .catch(error => {
    // 错误处理
    console.error('提交失败:', error);
  })
  .finally(() => {
    // 隐藏遮罩层
    document.getElementById('maskLayer').style.display = 'none';
  });
});
</script>
```

**关键点**：
- 使用`e.preventDefault()`阻止表单默认提交行为
- 提交前显示遮罩层，提交后（无论成功失败）隐藏遮罩层
- 通过`z-index`确保遮罩层位于最上层

### 2. 使用Element UI等框架的加载状态

如果你使用Element UI，可以利用其内置的`loading`属性实现更简洁的遮罩效果：

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <!-- 表单内容 -->
    <el-button type="submit" :loading="isLoading">提交</el-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isLoading: false
    };
  },
  methods: {
    handleSubmit() {
      this.isLoading = true; // 开启加载状态
      
      // 模拟API调用
      setTimeout(() => {
        console.log('提交成功');
        this.isLoading = false; // 关闭加载状态
      }, 2000);
    }
  }
};
</script>
```

**优势**：
- 无需额外编写遮罩层CSS
- 框架自动处理加载状态和按钮禁用
- 提交完成后自动恢复按钮状态

### 3. 防止重复提交的增强方案

为避免用户在遮罩层显示期间多次点击，可以结合遮罩层和按钮禁用：

```javascript
function submitForm() {
  const submitBtn = document.querySelector('.submit-btn');
  
  // 禁用按钮并显示遮罩
  submitBtn.disabled = true;
  document.getElementById('maskLayer').style.display = 'block';
  
  // 执行提交
  fetch('/submit', { /* ... */ })
    .finally(() => {
      // 恢复按钮状态
      submitBtn.disabled = false;
      document.getElementById('maskLayer').style.display = 'none';
    });
}
```

**最佳实践**：
- **双重防护**：同时使用`type="button"`明确声明非提交按钮，并在事件中调用`event.preventDefault()`
- **超时处理**：为防止请求长时间无响应，可添加超时机制
- **用户反馈**：在遮罩层中添加"正在提交..."等提示文字，提升用户体验

### 4. 遮罩层样式优化建议

```css
#maskLayer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 添加提示文字 */
#maskLayer::after {
  content: "正在提交，请稍后...";
  color: white;
  font-size: 16px;
}
```

**样式要点**：
- 使用`position: fixed`确保遮罩层覆盖整个视口
- 通过`z-index`确保遮罩层位于最上层
- 添加提示文字提升用户体验
- 可使用`transition`实现淡入淡出效果

### 5. 高级技巧：自定义遮罩组件

对于复杂应用，可以创建可复用的遮罩组件：

```javascript
class LoadingMask {
  constructor() {
    this.mask = document.createElement('div');
    this.mask.className = 'loading-mask';
    this.mask.innerHTML = '<div class="spinner"></div><p>正在提交...</p>';
    document.body.appendChild(this.mask);
  }
  
  show() {
    this.mask.style.display = 'flex';
  }
  
  hide() {
    this.mask.style.display = 'none';
  }
}

// 使用示例
const mask = new LoadingMask();
document.getElementById('myForm').addEventListener('submit', function(e) {
  e.preventDefault();
  mask.show();
  // 执行提交...
});
```

**优势**：
- 代码复用性高
- 易于维护和扩展
- 可添加更多功能（如进度显示）

### 常见问题解决

1. **遮罩层不显示**：检查父容器是否设置了`position: relative`，遮罩层是否正确定位
2. **点击遮罩层无法关闭**：确保遮罩层设置了`pointer-events: auto`，并正确处理点击事件
3. **移动端适配问题**：使用`position: fixed`而非`absolute`，避免滚动时遮罩错位