// 构造函数
function Preson(name, age) {
    this.name = name;
    this.age = age;
}
// 所有实例共享的公共方法
Preson.prototype.say = function (word) {
    console.log(`${this.name}说：${word}`);
}

const p1 = new Preson('张三', 18); // 创建一个Person实例对象
const p2 = new Preson('李四', 20); // 新创建一个Proson实例对象
p1.say('hello world'); // 调用公共方法
p1.hasOwnProperty('say') // false 说明不是定义在其本身上的
p1.__proto__.do = function () {
    console.log('往原型对象中添加方法');
}
p2.do(); // 打印出了-往原型对象中添加方法
