<template>
  <div class="state">
    <div class="pad-10">{{$store.getters.getFood}}</div>
    <el-button @click="addFood" class="mg-right-10">辣椒炒肉</el-button>
    <el-input v-model="other" placeholder="请输入" style="width: 300px" clearable>
      <template #append><el-button @click="addOther">加点别的</el-button></template>
    </el-input>
    <el-button @click="replace" class="mg-left-10">换菜谱</el-button>
    <el-button @click="setFood" class="mg-left-10">拿地址栏参数</el-button>
  </div>
</template>

<script>

export default {
  setup() {
    const store = Vuex.useStore();
    const query = VueRouter.parseQuery(location.search)
    Object.hasOwnProperty.call(query, 'foods')
    // 状态的控制事件
    const setFood = () => {
      if (Object.hasOwnProperty.call(query, 'foods')) {
        store.commit("setFood", [...query.foods]);
      } else {
        ElementPlus.ElMessage('拿地址栏没有参数呢')
      }
    };
    return {
      setFood
    }
  },
  data() {
    return {
      count: 0,
      other: ''
    };
  },
  created () {

  },
  methods: {
    addFood (e) {
      this.$store.commit('addFood', '辣椒炒肉')
    },
    addOther () {
      this.other && this.$store.commit('addFood', this.other)
    },
    replace () {
      this.$store.commit('setFood', ['剁椒鱼头', '农家一碗香'])
    }
  },
  components: {
    
  },
};
</script>


<style lang="scss">
.state {

  
}
</style>