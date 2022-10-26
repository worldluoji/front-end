let list = [4, 5, 6];

for (let i in list) {
    console.log(i); // "0", "1", "2",
}

for (let i of list) {
    console.log(i); // "4", "5", "6"
}

let pets = new Set(["Cat", "Dog", "Hamster"]);
pets["species"] = "mammals";

for (let pet in pets) {
    console.log(pet); // "species"
}

for (let pet of pets) {
    console.log(pet); // "Cat", "Dog", "Hamster"
}


// 当生成目标为ES5或ES3, 迭代器只允许在Array类型上使用。 在非数组值上使用 for..of语句会得到一个错误，就算这些非数组值已经实现了Symbol.iterator属性
// 编译器会生成一个简单的for循环做为for..of循环，比如：

let numbers = [1, 2, 3];

for (let num of numbers) {
    console.log(num);
}
// 生成的代码为：
for (var _i = 0; _i < numbers.length; _i++) {
    var num = numbers[_i];
    console.log(num);
}

// 这样，即使是生成ES5,ES3,也能在ts中快乐的使用ES6语法