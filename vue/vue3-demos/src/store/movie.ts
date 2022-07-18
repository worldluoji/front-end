import { defineStore } from "pinia";

export const movieStore = defineStore("movie", {
  state: () => {
    return {
      movieList: ["神探大战", "神探", "神探狄仁杰", "神探包青天", "宝镜记"],
    };
  },
  getters: {
    getByKeyWord(state, keyWord?: string) {
      if (keyWord === undefined || keyWord === "") {
        return state.movieList;
      }
      return state.movieList.filter((m) => m.includes(keyWord));
    },
  },
  actions: {
    addMovie(movie) {
      this.movieList.push(movie);
    },
  },
});
