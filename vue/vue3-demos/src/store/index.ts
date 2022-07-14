import { defineStore } from "pinia";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      msg: "Hello Vue3 with TypeScript!!!",
    };
  },
  getters: {},
  actions: {},
});
