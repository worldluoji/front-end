# driver.js
driver.js 是一个轻量级、无依赖的用户引导（user onboarding）库，用于创建产品导览、功能提示和分步指导。

## 📦 **核心特性**

### 1. **轻量级**
- 无任何依赖
- 仅 ~4KB (gzip)
- 支持所有主流浏览器（包括 IE10+）

### 2. **易用性**
- 简单的 API
- 零配置即可使用
- 易于集成到任何框架

### 3. **灵活性**
- 完全可自定义样式
- 支持异步元素
- 多种定位选项
- 键盘导航支持

## 🚀 **安装与使用**

### 安装
```bash
# npm
npm install driver.js

# yarn
yarn add driver.js

# CDN
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/driver.js@1.0.0/dist/driver.min.css">
<script src="https://cdn.jsdelivr.net/npm/driver.js@1.0.0/dist/driver.min.js"></script>
```

### 基本用法
```javascript
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

// 初始化
const driver = new Driver();

// 定义步骤
driver.defineSteps([
  {
    element: '#first-element',
    popover: {
      title: '欢迎使用',
      description: '这是第一步的介绍',
      position: 'left'
    }
  },
  {
    element: '#second-element',
    popover: {
      title: '主要功能',
      description: '这是第二步的介绍',
      position: 'top'
    }
  }
]);

// 开始引导
driver.start();
```

## 🔧 **详细配置**

### Driver 配置选项
```javascript
const driver = new Driver({
  // 样式配置
  className: 'scoped-class',  // 用于样式作用域
  animate: true,              // 是否启用动画
  opacity: 0.75,              // 遮罩层透明度
  padding: 10,                // 元素与高亮区域的内边距
  allowClose: true,           // 是否允许点击遮罩关闭
  overlayClickNext: false,    // 点击遮罩是否跳到下一步
  doneBtnText: '完成',         // 完成按钮文本
  closeBtnText: '关闭',        // 关闭按钮文本
  nextBtnText: '下一步',       // 下一步按钮文本
  prevBtnText: '上一步',       // 上一步按钮文本
  
  // 键盘控制
  keyboardControl: true,      // 启用键盘控制
  
  // 回调函数
  onHighlightStarted: (Element) => {},  // 开始高亮时
  onHighlighted: (Element) => {},       // 高亮完成时
  onDeselected: (Element) => {},        // 取消高亮时
  onReset: (Element) => {},             // 重置时
  onNext: (Element) => {},              // 点击下一步时
  onPrevious: (Element) => {}           // 点击上一步时
});
```

### 步骤配置
```javascript
const steps = [
  {
    element: '#some-element',
    popover: {
      className: 'popover-class',  // 自定义类名
      title: '步骤标题',
      description: '步骤描述',
      showButtons: true,           // 是否显示按钮
      closeBtnText: '关闭',
      nextBtnText: '下一步',
      prevBtnText: '上一步',
      
      // 位置选项
      position: 'left',  // 'top', 'right', 'bottom', 'left', 'mid-center', 'mid-left' 等
      offset: 10,        // 偏移量
      
      // 自定义事件
      onPopoverRender: (popover) => {
        // 弹出框渲染时的回调
      },
      onNext: (element) => {
        // 自定义下一步逻辑
        driver.moveNext();
      },
      onPrevious: (element) => {
        // 自定义上一步逻辑
        driver.movePrevious();
      }
    }
  }
];
```

## 🎯 **高级用法**

### 1. **动态元素处理**
```javascript
// 等待元素出现后再高亮
const waitForElement = (selector, callback) => {
  const element = document.querySelector(selector);
  if (element) {
    callback(element);
  } else {
    setTimeout(() => waitForElement(selector, callback), 100);
  }
};

waitForElement('#dynamic-element', () => {
  driver.highlight({
    element: '#dynamic-element',
    popover: { title: '动态元素' }
  });
});
```

### 2. **异步步骤流程**
```javascript
const steps = [
  {
    element: '#step1',
    popover: {
      title: '第一步',
      onNext: () => {
        // 执行某些异步操作
        fetch('/api/data')
          .then(() => driver.moveNext());
        return false; // 阻止默认下一步行为
      }
    }
  }
];
```

### 3. **自定义样式**
```css
/* 覆盖默认样式 */
.driver-popover {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.driver-popover-title {
  font-size: 18px;
  font-weight: bold;
  color: #1890ff;
}

.driver-popover-description {
  font-size: 14px;
  color: #666;
}

.driver-popover-footer button {
  border-radius: 6px;
  padding: 8px 16px;
}

/* 高亮区域样式 */
.driver-highlighted-element {
  border: 3px solid #1890ff !important;
  border-radius: 8px;
}
```

### 4. **React 集成示例**
```jsx
import React, { useRef, useEffect } from 'react';
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

const TourComponent = () => {
  const driverRef = useRef(null);
  
  useEffect(() => {
    driverRef.current = new Driver({
      className: 'custom-driver',
      animate: true,
      opacity: 0.5
    });
    
    return () => {
      if (driverRef.current) {
        driverRef.current.reset();
      }
    };
  }, []);
  
  const startTour = () => {
    if (driverRef.current) {
      driverRef.current.defineSteps([
        {
          element: '#tour-step-1',
          popover: {
            title: '欢迎',
            description: '这是第一个功能点',
            position: 'bottom'
          }
        },
        {
          element: '#tour-step-2',
          popover: {
            title: '功能说明',
            description: '这是第二个功能点',
            position: 'right'
          }
        }
      ]);
      driverRef.current.start();
    }
  };
  
  return (
    <div>
      <button onClick={startTour}>开始引导</button>
      <div id="tour-step-1">步骤1</div>
      <div id="tour-step-2">步骤2</div>
    </div>
  );
};
```

### 5. **Vue 集成示例**
```vue
<template>
  <div>
    <button @click="startTour">开始引导</button>
    <div id="step-1">步骤1</div>
    <div id="step-2" v-if="showStep2">步骤2</div>
  </div>
</template>

<script>
import Driver from 'driver.js';
import 'driver.js/dist/driver.min.css';

export default {
  data() {
    return {
      driver: null,
      showStep2: false
    };
  },
  mounted() {
    this.driver = new Driver({
      opacity: 0.6
    });
  },
  methods: {
    startTour() {
      this.driver.defineSteps([
        {
          element: '#step-1',
          popover: {
            title: '第一步',
            description: '请先完成这个操作',
            onNext: () => {
              this.showStep2 = true;
              this.$nextTick(() => {
                this.driver.moveNext();
              });
              return false;
            }
          }
        },
        {
          element: '#step-2',
          popover: {
            title: '第二步',
            description: '现在可以操作这个了',
            position: 'top'
          }
        }
      ]);
      this.driver.start();
    }
  }
};
</script>
```

## 🔄 **API 方法**

```javascript
const driver = new Driver();

// 核心方法
driver.defineSteps(steps);    // 定义步骤
driver.start(stepIndex);      // 开始引导
driver.moveNext();            // 下一步
driver.movePrevious();        // 上一步
driver.hasNextStep();         // 是否有下一步
driver.hasPreviousStep();     // 是否有上一步
driver.highlight(step);       // 高亮特定步骤
driver.reset();               // 重置引导
driver.destroy();             // 销毁实例

// 获取状态
driver.isInitialized;         // 是否已初始化
driver.currentStep;           // 当前步骤索引
driver.steps;                 // 所有步骤
driver.isActivated;           // 是否已激活
```

## 🎨 **主题定制**

### 1. **创建主题文件**
```css
/* theme-driver.css */
.theme-dark .driver-popover {
  background: #1a1a1a;
  color: #fff;
  border: 2px solid #333;
}

.theme-dark .driver-popover-title {
  color: #4fc3f7;
}

.theme-dark .driver-popover-footer button {
  background: #333;
  color: #fff;
  border: 1px solid #444;
}

.theme-dark .driver-popover-footer button:hover {
  background: #444;
}
```

### 2. **使用主题**
```javascript
const driver = new Driver({
  className: 'theme-dark'  // 应用主题类
});
```

## 📱 **移动端适配**

### 响应式配置
```javascript
const driver = new Driver({
  padding: window.innerWidth < 768 ? 5 : 10,  // 移动端减少内边距
  onHighlightStarted: (element) => {
    // 移动端调整定位
    if (window.innerWidth < 768) {
      const popover = element.querySelector('.driver-popover');
      if (popover) {
        const position = popover.getAttribute('data-position');
        if (position === 'left' || position === 'right') {
          // 移动端改为顶部或底部显示
          popover.setAttribute('data-position', 'bottom');
        }
      }
    }
  }
});
```

## 🔗 **与路由集成**

### React Router 示例
```jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const useDriverOnRoute = (driver, stepsByRoute) => {
  const location = useLocation();
  
  useEffect(() => {
    const steps = stepsByRoute[location.pathname];
    if (steps && !localStorage.getItem('tour_completed')) {
      driver.defineSteps(steps);
      driver.start();
    }
  }, [location]);
};
```

## ⚡ **性能优化**

### 延迟加载
```javascript
// 按需加载 driver.js
const startTour = async () => {
  const { default: Driver } = await import('driver.js');
  await import('driver.js/dist/driver.min.css');
  
  const driver = new Driver();
  // ... 使用 driver
};
```

### 步骤分块
```javascript
// 分批加载步骤
const loadTourSteps = async (tourId) => {
  const response = await fetch(`/api/tours/${tourId}/steps`);
  return response.json();
};

// 使用
const steps = await loadTourSteps('welcome-tour');
driver.defineSteps(steps);
```

## 🐛 **常见问题解决**

### 1. **元素不可见**
```javascript
// 滚动到元素
{
  element: '#target',
  popover: {
    title: '需要滚动',
    onPopoverRender: () => {
      const element = document.querySelector('#target');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }
}
```

### 2. **动态内容**
```javascript
// 使用 MutationObserver
const observer = new MutationObserver(() => {
  if (document.querySelector('#dynamic-element')) {
    observer.disconnect();
    driver.highlight({
      element: '#dynamic-element',
      popover: { title: '动态内容已加载' }
    });
  }
});

observer.observe(document.body, { childList: true, subtree: true });
```

### 3. **z-index 冲突**
```javascript
const driver = new Driver({
  onHighlighted: (element) => {
    // 确保 driver 在最上层
    const overlay = document.querySelector('.driver-overlay');
    if (overlay) {
      overlay.style.zIndex = '99999';
    }
  }
});
```

## 📊 **与其他库对比**

| 特性 | driver.js | intro.js | shepherd.js | react-joyride |
|------|-----------|----------|-------------|----------------|
| 大小 | ~4KB | ~10KB | ~20KB | ~50KB |
| 依赖 | 无 | 无 | Popper.js | 有 React 依赖 |
| 学习曲线 | 简单 | 简单 | 中等 | 中等 |
| 自定义程度 | 高 | 中等 | 高 | 高 |
| 框架支持 | 通用 | 通用 | 通用 | React 专用 |

## 🎯 **最佳实践**

1. **渐进式引导**：不要一次性展示所有步骤
2. **上下文相关**：根据用户操作展示相关引导
3. **可跳过**：始终提供跳过选项
4. **持久化状态**：使用 localStorage 记录完成状态
5. **性能考虑**：在用户空闲时启动引导
6. **可访问性**：确保支持键盘导航和屏幕阅读器

driver.js 是一个非常适合快速集成、轻量级的引导解决方案，特别适合需要在多种框架中保持一致的场景。

---

## references
https://driverjs.com/