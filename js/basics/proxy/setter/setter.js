// Vue2 就是利用setter来实现的响应式，Vue 2 使用 getter/setters 完全由于需支持更旧版本浏览器的限制。
const language = {
    set current(name) {
        this.log.push(name);
    },
    log: []
}

language.current = 'EN';
console.log(language.log); // ['EN']

language.current = 'FA';
console.log(language.log); // ['EN', 'FA']


// To append a setter to an existing object, use Object.defineProperty().
const o = {a: 0};

Object.defineProperty(o, 'b', {
  set: function(x) { this.a = x / 2; }
});

o.b = 10;
//  Runs the setter, which assigns 10 / 2 (5) to the 'a' property

console.log(o.a)
//  5


// computed
const expr = 'foo';

const obj = {
  baz: 'bar',
  set [expr](v) { this.baz = v; }
};

console.log(obj.baz);
//  "bar"

obj.foo = 'baz';
//  run the setter

console.log(obj.baz);
//  "baz"


// 参考： https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/set