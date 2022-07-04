/// <reference path="a.ts" />
namespace Shape {
    export function square(x: number) {
        return x * x
    }
}

// circle方法在另外一个文件中，但都是namespace Shape，因此可以调用，但必须写第一行的refernce path
console.log(Shape.cricle(2))
console.log(Shape.square(2))

import cricle = Shape.cricle
console.log(cricle(2))

// namespace不要当作module来使用，namepace最好是一个全局的方式使用，
// ts为了兼容性，保留了namespace, 现在可以不必使用命名空间,使用module即可