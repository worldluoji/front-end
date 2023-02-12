<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    
    <br />
    <div class="nav">
      <router-link to="/">路由</router-link>
      <router-link to="/component">组件</router-link>
      <router-link to="/state">仓储</router-link>
    </div>
    <router-view class="router-view"></router-view>
    <hr />
    vuex状态演示<br />
    $store - count：{{ $store.state.count }}<br />
    <el-button @click="setCount">vuex的 计数</el-button><br /><br /><br /><br />
    <OfferList />
  </div>
</template>

<script>
import { onBeforeMount } from 'vue';

export default {
  name: 'app',
  setup() {
    // 传说中的setup
    const store = Vuex.useStore();
    // 状态的控制事件
    const setCount = () => {
      store.commit("setCount");
    };

    return {
      // 返回给模板，否则模板访问不到
      setCount,
    };
  },
  data() {
    return {
      
    };
  },
  components: {
  },
};
</script>


<style lang="scss">
#app {
  text-align: center;
  color: #2c3e50;
  .nav {
    a {
      margin-left: 20px;
    }
  }
}
</style>