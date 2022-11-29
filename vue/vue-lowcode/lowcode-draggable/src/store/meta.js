import { defineStore } from 'pinia';

const metaStore = defineStore("meta", {
  state: () => {
    return {
      content: [],
    };
  },
  getters: {
    get(state) {
      return state.content
    },
  },
  actions: {
    set(c) {
      this.content = c
    },
  },
});

export default metaStore