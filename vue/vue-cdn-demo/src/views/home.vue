<template>
  <div class="home">
    <h3>首页</h3>
    <el-button @click="$router.push({
      path: '/state',
      query: {
        name: '张三',
        foods: ['西红柿炒蛋', '红烧肉']
      }
    })" class="mg-right-10">去看store</el-button>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
     
    };
  },
  methods: {
    
  },
  components: {
    
  },
};
</script>


<style lang="scss">
.home {

  
}
</style>