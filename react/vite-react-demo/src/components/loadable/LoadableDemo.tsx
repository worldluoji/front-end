
import Loadable from 'react-loadable'
// react-lodable 本身是通过高阶组件来实现的，这个高阶组件实现了模块加载、loading 状态以及错误处理的功能。

// 创建一个显示加载状态的组件
function Loading({ error } : any) {
  return error ? <h1>Failed!!!</h1> : <h1>Loading...</h1>
}
// 创建加载器组件
const HelloLazyLoad = Loadable({
  loader: () => import('./RealHelloLazyLoad').then(module => module.default),
  loading: Loading 
  // 在模块加载完成之前，加载器就会渲染Loding组件。如果模块加载失败，那么 react-loadable 会将 errors 属性传递给 Loading 组件，方便你根据错误状态来显示不同的信息给用户。
})

const LazyLoadDemo = () => {
  return (
    <div>
      <HelloLazyLoad />
    </div>
  );
};

export default LazyLoadDemo

// react-loadable 和 React.lazy(() => import())的区别是什么 ？ 
// 答：可以认为没有区别，因为核心机制都是 import。只是 react-lodable 提供的 API 和选项比 React.lazy 丰富。