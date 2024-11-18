class Secret {
  // #secret 是一个私有字段（private field），这是 ES6 引入的一种新的类字段声明方式。私有字段使用 # 前缀来标识，只能在类的内部访问，不能在类的外部访问。这种方式提供了一种更严格的封装机制，确保类的内部状态不会被外部代码随意修改。
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }
  get secret() {
    return this.#secret.replace(/\d+/, "[REDACTED]");
  }
}

const aSecret = new Secret("123456");
console.log(aSecret.secret); // [REDACTED]
// Looks like a no-op forwarding...
const proxy = new Proxy(aSecret, {});
console.log(proxy.secret); // TypeError: Cannot read private member #secret from an object whose class did not declare it

// A proxy is still another object with a different identity — it's a proxy that operates between the wrapped object and the outside. 
// As such, the proxy does not have direct access to the original object's private properties.

/*
class ClassWithPrivate {
  #privateField;
  #privateFieldWithInitializer = 42;

  #privateMethod() {
    // …
  }

  static #privateStaticField;
  static #privateStaticFieldWithInitializer = 42;

  static #privateStaticMethod() {
    // …
  }
}
*/
