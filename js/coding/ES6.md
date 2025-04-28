# ES6
## 1. Object.freeze
const declaration alone doesn't really protect your data from mutation. 
To ensure your data doesn't change, JavaScript provides a function Object.
freeze to prevent data mutation.

const声明一个数组，还是可以改变其下标的值，和Java一样。如果想内部属性不能被修改，那么就要用freeze.

Once the object is frozen, you can no longer add, update, or delete properties from it. 

Any attempt at changing the object will be rejected without an error.
```js
 let obj = {
    name:"FreeCodeCamp",
    review:"Awesome"
  };
  Object.freeze(obj);
  obj.review = "bad";
  obj.newProp = "Test";
  console.log(obj);
```
 
## 2. lambda赋默认值
```js
const increment = (number, value=1) => number + value;
```
则有 increment(2) = 3

## 3. 任意参数求和
```js
const sum = (...args) => {
    return args.reduce((pre, current) => pre + current, 0);
}
```
首先是入参args为可变参数，可以有任意长度。
其次是reduce的用法，第二个参数0表示第一次进入时pre为0，第二次开始，pre就是上一次的返回值。
除了reduce外，还有map和filter，一个用于转换，一个用于过滤。

## 4. ES6批量赋值
```js
const HIGH_TEMPERATURES = {
  yesterday: 75,
  today: 77,
  tomorrow: 80
};
  
const { today,tomorrow } = HIGH_TEMPERATURES;
```


还可以左映射，相当于定义了变量highToday和highTomorrow，值分别为HIGH_TEMPERATURES.today和HIGH_TEMPERATURES.tomorrow
```js
const {today:highToday, tomorrow:highTomorrow} = HIGH_TEMPERATURES;
```

进一步：
```js
const LOCAL_FORECAST = {
    yesterday: { low: 61, high: 75 },
    today: { low: 64, high: 77 },
    tomorrow: { low: 68, high: 80 }
};
  
const {today: {low: lowToday, high: highToday}} = LOCAL_FORECAST;
```
则lowToday = 64， highToday=77

再进一步：
```js
const source = [1,2,3,4,5,6,7,8,9,10];
function removeFirstTwo(list) {
  // Only change code below this line
  const [a,b,...arr] = list;
  // Only change code above this line
  return arr;
}
const arr = removeFirstTwo(source);
```
等价于ES5中的
Array.prototype.slice() 

## 5. 拆包
```js
let arr1 = [1,2,3]
let arr2 = [...arr1]
```
这里要注意，...拆包是浅拷贝，
```js
let a = [1,2,3,[4,5]]
let b = [...a]
b[3][1] = 6
console.log(a[3][1]) // 6
```

## 6. 交换
[a,b] = [b,a]

## 7. 对象作为参数
```js
const stats = {
    max: 56.78,
    standard_deviation: 4.34,
    median: 34.54,
    mode: 23.87,
    min: -0.75,
    average: 35.85
};
  
const half = ({max, min}) => (max + min) / 2.0; 
```

这样，入参可以传入stats
```js
half(stats) = (56.78 - 0.75) / 2.0
```

## 8. 字符串
```js
`<li class="text-warning">${item}</li>`
```
其中item是一个变量

## 9. lambda简洁的创建一个对象
```js
const createPerson = (name, age, gender) => ({
  name,
  age,
  gender
});
```

## 10. ES6函数定义简化
```js
const bicycle = {
  gear: 2,
  setGear (newGear) {
    this.gear = newGear;
  }
};
bicycle.setGear(48);
console.log(bicycle.gear);
```
  

## 11. class
```js
// Only change code below this line
class Thermostat {
  constructor(temperature) {
    this._temperature = temperature;
  }
  
  get temperature() {
    return this._temperature;
  }
  
  set temperature(temperature) {
    this._temperature = temperature;
  } 
}
// Only change code above this line

const thermos = new Thermostat(76); // Setting in Fahrenheit scale
let temp = thermos.temperature; // 24.44 in Celsius
thermos.temperature = 26;
temp = thermos.temperature; // 26 in Celsius
```

Note: It is convention to precede the name of a private variable with an underscore (_). 

However, the practice itself does not make a variable private.

## 12. export and import
```js
const uppercaseString = (string) => {
  return string.toUpperCase();
}

const lowercaseString = (string) => {
  return string.toLowerCase()
}

export {uppercaseString, lowercaseString};

import { uppercaseString, lowercaseString } from './string_functions.js';  
uppercaseString("hello");
lowercaseString("WORLD!");
```
  
Use * to Import Everything from a File:
```js
import * as stringFunctions from './string_functions.js';
stringFunctions.uppercaseString("hello");
stringFunctions.lowercaseString("WORLD!");
```

export default is used to declare a fallback value for a module or file, 
you can only have one value be a default export in each module or file. 
Additionally, you cannot use export default with var, let, or const:
```js
export default function subtract(a,b) {
    return a - b;
}

import subtract from './math_functions.js';
```

## 13. Promise
```js
const makeServerRequest = new Promise((resolve, reject) => {
  // responseFromServer is set to false to represent an unsuccessful response from a server
  let responseFromServer = false;
    
  if(responseFromServer) {
    resolve("We got the data");
  } else {  
    reject("Data not received");
  }
});

makeServerRequest.then(result => {
  console.log(result);
}).catch(error => {
  console.log(error)
}); 
```


