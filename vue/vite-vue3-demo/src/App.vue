<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/dynamic">Dynamic</router-link> |
    <router-link to="/directive">Directive</router-link> |
    <router-link to="/h">h</router-link> |
    <router-link to="/built">built</router-link> |
    <router-link to="/reactive">reactive</router-link> |
    <router-link to="/pinia">pinia</router-link> |
    <router-link to="/setup">setup</router-link> |
    <router-link to="/jsx">jsx</router-link> |
    <router-link to="/dynmd">dynmd</router-link> |
    <router-link to="/dyform">dyform</router-link> |
    <router-link to="/counterhook">counterhook</router-link> |
    <router-link to="/fallthroughbtn">fallthroughbtn</router-link> |
  </nav>
  <router-view />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
