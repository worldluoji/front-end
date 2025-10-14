/**
* T extends (infer U)[] 是一个条件类型判断。它检查 T 是否可以赋值给 (infer U)[] 这种数组类型。
* infer U 是一个类型推断关键字，它会在满足条件时推断出数组元素的类型，并将其赋值给 U。
* 如果 T 是数组类型，那么 ElementType<T> 的结果就是数组元素的类型 U；如果 T 不是数组类型，
  结果为 never 类型，never 表示永远不会出现的值的类型。
*/

type ElementType<T> = T extends (infer U)[] ? U : never;
type StringArray2 = string[];
type StringElement = ElementType<StringArray2>; // string



type Parameters2<T> = T extends (...args: infer P) => any ? P : never;

// 使用示例
function greet(name: string, age: number): string {
  return `Hello ${name}, you are ${age} years old`;
}

// 它让你能够从任何函数中提取参数类型
type GreetParams = Parameters2<typeof greet>; // [string, number]
