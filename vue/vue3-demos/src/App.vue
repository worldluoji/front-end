<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/dynamic">Dynamic</router-link> |
    <router-link to="/directive">Directive</router-link> |
    <router-link to="/h">h</router-link> |
    <router-link to="/built">built</router-link> |
    <router-link to="/reactive">reactive</router-link> |
    <router-link to="/drag">drag</router-link> |
    <router-link to="/pinia">pinia</router-link> |
    <router-link to="/setup">setup</router-link> |
    <router-link to="/jsx">jsx</router-link> |
    <router-link to="/dynmd">dynmd</router-link> |
    <router-link to="/dyform">dyform</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
