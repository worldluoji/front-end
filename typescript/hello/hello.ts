interface Pokemon {
    readonly id: number;
    name: string;
    age: number;
	address?: string;
    //如果希望在实例里自由添加属性，可以使用任意属性
    //但是要注意的是，一旦创建了任意属性，那么接口里面的确定属性和必要属性必须为任意属性类型的子集
    //比如任意属性的类型为string的话，age会报错，因为它为number
    [propName: string]: any;
}

let pikachu: Pokemon = {
    id: 1,
    name: 'Pikachu',
    age: 2,
    attribute: 'Thunder'
}


console.log(pikachu, typeof pikachu)
