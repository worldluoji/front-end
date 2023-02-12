
export default Vuex.createStore({
  state: {
    count: 0,
    food: []
  },
  getters: {
    getCount: (state) => {
      return state.count
    },
    // 只读
    getFood: (state) => {
      return Vue.readonly(state.food)
    },
  },
  mutations: {
    setCount(state) {
      state.count++
    },
    setFood(state, food) {
      state.food = food
    },
    addFood(state, food){
      if (Array.isArray(food)) {
        state.food.concat(food)
      } else {
        state.food.push(food)
      }
    }
  },
  actions: {
  },
  modules: {
  }
})