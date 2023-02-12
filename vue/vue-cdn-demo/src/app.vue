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
    <component :is="'OfferList'" />
  </div>
</template>

<script>
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
  mounted() {
    const s = document.createElement('script');
    const url = 'http://localhost:8099/cutomerElements/1.0.0/cutomerElements.umd.cjs'
    s.type = 'text/javascript';
    s.src = url;
    document.body.appendChild(s);    
    setTimeout(() => {
      console.log(window, window.location, window.cutomerElements);
      Object.assign(this.$.components, window.cutomerElements.CustomerComponents);
      console.log(this.$.components);
      this.$forceUpdate();
    }, 1000);
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