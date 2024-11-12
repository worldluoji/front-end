const obj = {
    _name: "test",
    get name() {
        // 这里的this默认指向obj，但是通过Reflect.get修改了this指向
        console.log('get', this === obj);
        return this._name;
    },
    set name(newValue) {
        console.log('set', this === obj);
        this._name = newValue;
    }
}

const objProxy = new Proxy(obj, {
    get: function(target, key, receiver) {
        // receiver是创建出来的代理对象
        console.log("get方法被访问--------", objProxy === receiver);
        return Reflect.get(target, key, receiver);
        // return target[key]
    },
    set: function(target, key, newValue, receiver) {
        console.log("set方法被访问--------", objProxy === receiver);
        // 传入receiver参数，通过Reflect修改了原对象obj 中getter、setter函数调用时的this指向。
        Reflect.set(target, key, newValue, receiver);
        // target[key] = newValue;
    }
})

console.log('************************');
objProxy.name = 'zzh';
console.log(objProxy.name, obj.name);

console.log('************************');
objProxy.name = 'luke';
console.log(objProxy.name, obj.name);
