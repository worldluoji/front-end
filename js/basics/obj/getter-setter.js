const obj = {
    log: ["a", "b", "c"],
    get latest() {
      return this.log[this.log.length - 1];
    },

    set latest(value) {
      this.log.push(value);
    }
};

console.log(obj.latest);
obj.latest = "d";

console.log(obj.latest);