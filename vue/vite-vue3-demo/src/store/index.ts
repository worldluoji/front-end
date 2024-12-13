import { defineStore } from "pinia";
import { movieStore } from "./movie";

export const mainStore = defineStore("main", {
  state: () => {
    return {
      msg: "Hello Vue3 with TypeScript!!!",
      count: 0,
    };
  },
  getters: {
    getCountBuf(state) {
      return `${state.msg}***${state.count}`;
    },
    getMsgWithThis(): string {
      return `${this.msg}***${this.count}`;
    },
    getMovies() {
      return movieStore().movieList;
    },
  },
  actions: {
    changeState() {
      this.count++;
      this.msg = "Hello Pinia with actions!!!";
    },
  },
});
