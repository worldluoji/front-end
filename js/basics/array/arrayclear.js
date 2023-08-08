let foo1 = [1,2,3]
let bar1 = [1,2,3]
let foo2 = foo1
let bar2 = bar1
// 已经赋值的foo2不受影响
foo1 = []
// 它删除了数组中的所有内容，这确实会影响其他引用。如果我们有两个对同一个数组的引用，我们使用 Arr1.length = 0 删除数组的内容，现在两个引用都将指向同一个空数组。
bar1.length = 0
console.log({foo1, foo2, bar1, bar2})


let Arr1 = ["Tomato", "Letcuce", "Spinash", "Cucumber"]
// 从第2个元素开始，删除0个元素，加入后面的...
Arr1.splice(2, 0, "Lemon", "Kiwi")
console.log(Arr1)

Arr1.splice(0, Arr1.length)
console.log(Arr1)

// tips: 使用delete 删除数组的元素时，对应位置的元素变为空，并不会消失；但使用delete删除Object {} 的key 时， 会直接将对应key-value移除