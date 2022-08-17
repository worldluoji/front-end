<!-- 使用vue create构建的项目本身支持JSX/TSX, 否则需要参考：https://staging-cn.vuejs.org/guide/extras/render-function.html#jsx-tsx -->
<!-- 使用typescript，这里要用tsx -->
<script lang="tsx">
export default {
  props: {
    username: { type: String },
  },
  setup(props) {
    // 使用JSX语法
    const vNode = <div>hello {props.username}</div>;
    // 返回渲染函数
    return () => vNode;
  },
};
</script>
<!-- JSX 可以支持更动态的需求。而 template 则因为语法限制原因，不能够像 JSX 那样可以支持更动态的需求。
这是 JSX 相比于 template 的一个优势
我们实现业务需求的时候，也是优先使用 template，动态性要求较高的组件使用 JSX 实现 -->