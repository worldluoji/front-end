class Secret {
    #x = 1;
    x() {
      return this.#x;
    }
}
  
const aSecret = new Secret();
const proxy = new Proxy(aSecret, {
    // receiver means either the proxy or an object that inherits from the proxy.
    get(target, prop, receiver) {
      const value = target[prop];
      if (value instanceof Function) {
        return function (...args) {
          console.log(this, receiver, target)
          return value.apply(this === receiver ? target : this, args);
        };
      }
      return value;
    },
});

console.log(proxy.x());
  