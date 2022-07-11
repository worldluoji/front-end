<!-- https://staging-cn.vuejs.org/guide/extras/render-function.html#jsx-tsx -->
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
