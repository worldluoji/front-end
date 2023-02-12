<template>
  <div class="component">
    <child @countChange="countChange" msg="父传子" />
    <br />
    <div class="pad-20">子传过来的值:{{ count }}</div>
    <el-button @click="$router.push('/')" class="mg-right-10">去首页</el-button>
  </div>
</template>

<script>
import child from "../components/child.vue";
export default {
  name: 'home',
  data() {
    return {
      count: 0,
    };
  },
  methods: {
     countChange(e) {
      this.count = e;
    },
  },
  components: {
    child
  },
};
</script>


<style lang="scss">
.component {

  
}
</style>