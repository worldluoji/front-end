const target = {
    message1: 'hello',
    message2: 'everyone',
};
  
const handler1 = {};
  
const proxy1 = new Proxy(target, handler1);
target.message3 = 'onlyone'

// Because the handler is empty, this proxy behaves just like the original target:
console.log(proxy1.message1); // hello
console.log(proxy1.message2); // everyone
console.log(proxy1.message3);