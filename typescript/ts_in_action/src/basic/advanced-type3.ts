/*
* 映射类型
*/

interface Obja3 {
    a: string;
    b: number;
    c: boolean;
}

// 所有属性都变成了只读,实现原理其实就是把每个属性加上只读
/*
* type Readonly<T> = {
*    readonly [P in keyof T]: T[P];
*};
*/
type ReadonlyObj = Readonly<Obja3>


// 把所有属性都变成可选的
type PartialObj = Partial<Obja3>

// 抽取属性a和b
type PickObj = Pick<Obja3, 'a' | 'b'>

// 自己实现Pick, 可以点进Pick实现查看
type MyPick<T, R extends keyof T> = {[P in R]: T[P]}

// Readonly Partial Pick 被称为同态，因为不会引入新的属性，只会作用于Obja3

// 非同态，增加x,y两个属性，且都是Obja3类型
type RecordObj = Record<'x' | 'y', Obja3>
/*
type RecordObj = {
    x: Obja3;
    y: Obja3;
}
*/

let map1: Record<string, number> = {
    'John': 25,
    'Mary': 21,
}

interface PersonInfo {
    age: number;
    salary: number;
}

let map2: Record<string, PersonInfo> = {
    'John': { age: 25, salary: 10},
    'Mary': { age: 21, salary: 20}
}

console.log(map2)