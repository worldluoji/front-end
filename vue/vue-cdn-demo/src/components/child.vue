<script>
export default {
  data(){
    return{
      count: 0
    }
  },
  props: {
    msg: String
  }
}
</script>

<template>
  <div>
    <h1>{{ msg }}</h1>
    <el-button @click="count++">点击自增{{ count }}</el-button> 
    <el-button class="mg-left-10" @click="$emit('countChange', count)">传给父</el-button>
  </div>
</template>

<style scoped>
a {
  color: #42b983;
}
</style>
