// https://babeljs.io/docs/babel-plugin-proposal-decorators
// https://github.com/tc39/proposal-decorators
// npx babel index.js  --out-dir dist
// node dist/index.js 

@isTestable(true)
class C {
  message = "hello!";

  @bound
  @logged
  m() {
    console.log(this.message);
  }
}

function isTestable(value) {
  return function decorator(target) {
    target.isTestable = value;
  };
}

function logged(value, { kind, name }) {
  if (kind === "method") {
    return function (...args) {
      console.log(`starting ${name} with arguments ${args.join(", ")}`);
      const ret = value.call(this, ...args);
      console.log(`ending ${name}`);
      return ret;
    };
  }
}



/**
type Decorator = (value: Input, context: {
  kind: string;
  name: string | symbol;
  access: {
    get?(): unknown;
    set?(value: unknown): void;
  };
  private?: boolean;
  static?: boolean;
  addInitializer?(initializer: () => void): void;
}) => Output | void;

The context object also varies depending on the value being decorated. Breaking down the properties:

kind: The kind of decorated value. This can be used to assert that the decorator is used correctly, or to have different behavior for different types of values. It is one of the following values.
"class"
"method"
"getter"
"setter"
"field"
"accessor"

name: The name of the value, or in the case of private elements the description of it (e.g. the readable name).

access: An object containing methods to access the value. 
These methods also get the final value of the element on the instance, not the current value passed to the decorator.
This is important for most use cases involving access, such as type validators or serializers.

static: Whether or not the value is a static class element. Only applies to class elements.

private: Whether or not the value is a private class element. Only applies to class elements.

addInitializer: Allows the user to add additional initialization logic. 
This is available for all decorators which operate per-class, 
as opposed to per-instance (in other words, decorators which do not have kind "field" - discussed in more detail below).

*/

function bound(value, { name, addInitializer }) {
  addInitializer(function () {
    this[name] = this[name].bind(this);
  });
}

console.log(C.isTestable);

let { m } = new C();
m(); // hello!