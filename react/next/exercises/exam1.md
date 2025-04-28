以下是一套精心设计的Next.js核心知识点试题，结合了框架特性、开发实践与架构设计，帮助你系统性提升Next.js能力。题目分为基础概念、实战应用和进阶原理三部分，覆盖90%以上的核心场景。

---

**一、基础概念题**（共30分）  
多选题：  
Next.js的内置特性包含哪些？  
A. 文件系统路由  
B. 服务端组件（RSC）  
C. 自动CSS模块化  
D. 原生WebSocket支持  
E. 图片优化组件（next/image）  

答案：A、C、E  
解析：文件系统路由是核心路由机制；CSS默认使用TailWindCSS, 如不使用TailWindCSS，CSS模块化通过`*.module.css`实现；next/image提供懒加载与格式转换。WebSocket需自行实现。RSC是React的特性，Next.js使用RSC的特性。

---

填空题：  
Next.js的三种渲染策略分别是______、______、______。  

答案：SSG（静态生成）、SSR（服务端渲染）、ISR（增量静态再生）

---

简答题：  
说明`getStaticProps`与`getServerSideProps`的核心差异与应用场景。  

答案：  
- `getStaticProps`：构建时执行，生成静态HTML，适用于内容不变页面（如博客）。  

- `getServerSideProps`：每次请求时执行，返回动态数据（如用户仪表盘）。  


---

**二、实战应用题**（共50分）  
代码补全题：  
实现一个动态路由页面`pages/products/[id].js`，要求：  
- 预生成10个产品的静态路径  

- 从API获取产品详情数据  


```javascript
export async function getStaticPaths() {
  const res = await fetch('https://api.example.com/products');
  const products = await res.json();
  const paths = products.slice(0,10).map(product => ({
    params: { id: __________ } // 补全代码
  }));
  return { paths, fallback: 'blocking' };
}
```

答案：`product.id.toString()`  
考点：动态路由参数处理与fallback策略。

---

场景分析题：  
某电商网站需实现以下功能：  
- 商品列表页（每天更新一次）  

- 实时库存显示  

- 用户个性化推荐  

请为每个功能选择合适的Next.js数据获取方案并说明理由。  

答案：  
- 商品列表：`getStaticProps` + ISR（每日再生），适合低频更新的静态内容。  

- 实时库存：客户端渲染（SWR或`useEffect`），需实时获取动态数据。  

- 个性化推荐：`getServerSideProps`（基于用户Cookies），依赖请求时用户身份信息。  


---

**三、进阶原理题**（共20分）  
架构设计题：  
设计一个支持多语言SEO优化的Next.js项目结构，需包含：  
- 路由层级规划  

- 语言切换实现方案  

- 静态生成策略  


答案：  
- 路由层级：使用`/app/[lang]/layout.tsx`作为根布局，子页面继承语言参数。  

- 语言切换：通过中间件处理语言重定向，结合`next-intl`管理多语言资源。  

- 静态生成：通过`generateStaticParams`预生成多语言路径，结合ISR更新内容。  


---

性能优化题：  
列举三种Next.js图片加载优化方案，并说明适用场景。  

答案：  
- `priority`属性：首屏关键图片预加载（如Hero图片），优化LCP指标。  

- `placeholder="blur"`：配合小尺寸Base64占位图，减少布局偏移。  

- 第三方Loader：使用Cloudinary或Imgix等CDN服务，动态适配图片尺寸与格式。  


---

**学习建议**  
1. 错题定位：  
   - 基础题错误 → 复习路由机制与数据获取API。  

   - 实战题错误 → 练习动态路由与渲染策略组合。  


2. 延伸学习：  
   - 部署优化：研究`next.config.js`的ISR配置与Vercel托管策略。  

   - 状态管理：结合Zustand或Context API实现跨组件通信。  


3. 模拟训练：  
   - 在Vercel部署一个包含API路由、ISR和中间件的完整项目。