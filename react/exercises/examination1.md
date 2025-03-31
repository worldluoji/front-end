# 综合题目1

---

### **一、基础概念题**
1. 类组件与函数组件的生命周期方法对应关系（使用Hooks模拟）？
2. 受控组件 vs 非受控组件的区别？分别在什么场景下使用？
3. 如何实现兄弟组件之间的通信（不借助状态管理库）？
4. 虚拟DOM的作用是什么？描述diff算法的大致流程
5. 为什么React的setState是异步的？如何立即获取更新后的状态？

---

### **二、Hooks实战题**
1. 用useEffect实现组件挂载时获取数据，并处理卸载时的资源清理
2. 实现自定义Hook `useWindowSize` 实时获取浏览器窗口尺寸
3. 用useReducer+useContext实现全局主题切换功能
4. 以下代码有什么问题？如何修复？
   ```jsx
   function Counter() {
     const [count, setCount] = useState(0);
     
     useEffect(() => {
       const timer = setInterval(() => {
         setCount(count + 1);
       }, 1000);
       return () => clearInterval(timer);
     }, []);
     
     return <div>{count}</div>;
   }
   ```

---

### **三、性能优化题**
1. 父组件更新时，如何避免不必要的子组件重新渲染？给出3种方案
2. 实现一个大型列表的虚拟滚动（简述思路即可）
3. 以下代码有什么性能问题？如何优化？
   ```jsx
   function App() {
     const [data] = useState(/* 大数据源 */);
     
     return (
       <div>
         {data.map(item => (
           <ExpensiveComponent 
             key={item.id}
             onClick={() => handleClick(item)}
           />
         ))}
       </div>
     );
   }
   ```

---

### **四、状态管理题**
1. 用Redux Toolkit实现异步获取数据的完整流程（包含slice创建）
2. 什么情况下应该选择使用Context API而不是Redux？
3. 如何用React Query优化数据请求场景？

---

### **五、综合应用题**
实现一个商品筛选列表：
• 从API获取商品数据（字段包含id, name, price, category）
• 实现按价格排序（升序/降序）
• 实现按类别多选过滤
• 展示加载状态和错误处理
• 使用React.memo优化列表项渲染
• （附加）实现分页功能

---

### **六、进阶思考题**
1. 如何用React实现"撤销/重做"功能？
2. 解释React Server Components的工作原理及使用场景
3. 在Next.js中，如何实现SSG和SSR的混合渲染？

---

### **参考答案关键点**（部分示例）：
**二.4 修复方案**：  
依赖数组缺少count，应改为：
```jsx
useEffect(() => {
  const timer = setInterval(() => {
    setCount(c => c + 1); // 使用函数式更新
  }, 1000);
  return () => clearInterval(timer);
}, []);
```

**三.3 优化方案**：  
1. 用useMemo缓存data.map结果  
2. 将ExpensiveComponent用React.memo包裹  
3. 将onClick改为useCallback或传递item.id到父组件处理

**五、综合应用题关键步骤**：  
1. 使用useState管理排序状态和选中分类  
2. 使用useMemo计算过滤后的数据  
3. 封装fetch请求到自定义Hook  
4. 列表项组件用React.memo包裹  
5. 错误边界处理

