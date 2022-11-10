<script setup lang="ts">
</script>

<template>
    <nav>
      <router-link to="/">Go to Home Page</router-link> <br>
      <router-link to="/twolist">Go to two-list-draggable demo</router-link>  <br>
      <router-link to="/clone">Go to clone demo</router-link>
    </nav>
    <router-view />
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}
</style>