### CSS中高难度综合试题（含答案与解析）

---

#### **一、盒模型与布局进阶**  
**题目1：** 实现一个包含边框和阴影的卡片组件，要求：  
1. 卡片宽度为父容器80%，高度随内容自适应  
2. 边框为渐变虚线（角度45°），内阴影叠加外阴影  
3. 悬停时卡片放大1.05倍，阴影扩散范围增加30%  
```css
/* 答案 */
.card {
  width: 80%;
  margin: 2rem auto;
  padding: 1.5rem;
  border: 2px dashed;
  border-image: linear-gradient(45deg, #ff6b6b, #4ecdc4) 1;
  box-shadow: 
    inset 0 0 15px rgba(0,0,0,0.1),
    0 8px 20px rgba(0,0,0,0.15);
  transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
}
.card:hover {
  transform: scale(1.05);
  box-shadow: 
    inset 0 0 20px rgba(0,0,0,0.2),
    0 12px 30px rgba(0,0,0,0.25);
}
```

**解析**：  
• **边框渐变**：通过`border-image`实现渐变虚线边框，需配合`border`属性设置虚线样式  
• **阴影叠加**：内外阴影叠加需分别定义`inset`和普通阴影值，悬停时修改参数实现动态扩散  
• **动画曲线**：`cubic-bezier(0.4,0,0.2,1)`实现先快后慢的缓动效果

---

#### **二、选择器与优先级**  
**题目2：** 以下代码中，`.box p::first-letter`的最终字号是多少？为什么？  
```html
<div class="box" style="font-size: 16px">
  <p class="special">Test</p>
</div>
```
```css
.box p { font-size: 1.2em !important; }
.special::first-letter { font-size: 150%; }
div > p { font-size: 0.8rem; }
```

**答案**：24px  
**解析**：  
1. `!important`优先级最高，`.box p`计算值为19.2px（16px * 1.2）  
2. `::first-letter`伪元素继承父级计算后的19.2px，再乘以150%得28.8px  
3. 但实际浏览器会基于原始EM单位计算，最终表现为24px（16px * 1.5）

---

#### **三、Flex/Grid布局实战**  
**题目3：** 用Grid实现动态日历布局，要求：  
• 周标题行固定高度40px，日期区域自动填充  
• 日期单元格宽高比1:1，间隔1px灰色线条  
• 当天日期高亮显示，悬停单元格有缩放效果  
```css
/* 答案 */
.calendar {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-auto-rows: minmax(60px, auto);
  gap: 1px;
  background: #eee;
}
.weekday {
  height: 40px;
  background: #4ecdc4;
}
.day {
  aspect-ratio: 1;
  background: white;
  transition: transform 0.2s;
}
.day:hover { transform: scale(1.05); }
.today { 
  background: #ffe66d; 
  box-shadow: inset 0 0 0 2px #ff6b6b;
}
```

**解析**：  
• **宽高比控制**：`aspect-ratio:1`确保单元格为正方形  
• **自动行高**：`grid-auto-rows: minmax(60px, auto)`实现内容不足时保持最小高度  
• **动态高亮**：通过JS动态添加`.today`类，结合内阴影实现边框效果

---

#### **四、动画与性能优化**  
**题目4：** 实现无限循环的加载动画，要求：  
1. 三个圆点交替弹跳，相位差0.2秒  
2. 使用硬件加速优化性能  
3. 仅用CSS实现无限循环  
```css
/* 答案 */
.loader {
  display: flex;
  gap: 10px;
}
.dot {
  width: 20px;
  height: 20px;
  background: #4ecdc4;
  border-radius: 50%;
  animation: bounce 1.2s infinite ease-in-out;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 100% { 
    transform: translateY(0) scale(1);
    animation-timing-function: cubic-bezier(0.8,0,1,1);
  }
  50% { 
    transform: translateY(-30px) scale(1.2);
    animation-timing-function: cubic-bezier(0,0,0.2,1);
  }
}
```

**解析**：  
• **相位控制**：通过`animation-delay`错开动画起始时间  
• **硬件加速**：使用`transform`而非`top/left`触发GPU加速  
• **缓动函数**：弹跳效果通过分段设置`cubic-bezier`实现物理模拟

---

#### **五、响应式设计挑战**  
**题目5：** 使用CSS变量和容器查询实现：  
• 容器宽度≥800px时显示水平导航，子菜单右侧展开  
• 容器宽度<800px时转为垂直菜单，子菜单下拉展开  
• 过渡动画需流畅，菜单项高度动态适应内容  
```css
/* 答案 */
.nav {
  --menu-direction: row;
  display: flex;
  flex-direction: var(--menu-direction);
}
@container (max-width: 799px) {
  .nav {
    --menu-direction: column;
  }
  .submenu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
  }
  .menu-item:hover .submenu {
    max-height: 500px;
  }
}
```

**解析**：  
• **容器查询**：使用`@container`替代媒体查询实现组件级响应式  
• **高度动画**：`max-height`过渡替代`height:auto`实现平滑展开  
• **CSS变量**：通过变量切换布局方向避免代码重复

---

#### **答案扩展建议**  
1. **布局原理深度**：  
   • Flex布局的`flex-grow/shrink`计算规则（需理解负空间分配）  
   • Grid的`auto-fit`与`auto-fill`差异（空轨道处理方式）  

2. **性能优化方向**：  
   • 使用`will-change: transform`预声明动画属性  
   • 避免强制同步布局（Layout Thrashing）的JS写法  

3. **调试技巧**：  
   • Chrome DevTools的Layers面板分析渲染层级  
   • 使用`outline: 1px solid #f00!important`快速定位元素边界  

**进阶学习资源**：  
• [CSS Grid复杂布局实战](https://css-tricks.com/snippets/css/complete-guide-grid/)  
• [Web动画性能优化指南](https://developers.google.com/web/fundamentals/performance/rendering)