import { defineStore } from 'pinia';

const canvasStore = defineStore("canvas", {
  state: () => {
    return {
      canvasWidth: ''
    };
  },
  getters: {
    getWidth(state) {
      return state.canvasWidth
    },
  },
  actions: {
    setWidth(c) {
      this.canvasWidth = c
    },
  },
});

export default canvasStore