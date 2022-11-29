import { defineStore } from 'pinia';

const currentPanelStore = defineStore("currentPanel", {
  state: () => {
    return {
      current: {},
    };
  },
  getters: {
    get(state) {
      return state.current
    },
  },
  actions: {
    set(c) {
      this.current = c
    },
  },
});

export default currentPanelStore