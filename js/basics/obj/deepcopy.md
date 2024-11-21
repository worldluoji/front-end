# deepcopy
在 JavaScript 中，实现深拷贝有多种方法。以下是几种常见的实现方式：

### 1. 使用 `JSON.parse` 和 `JSON.stringify`

这种方法适用于大多数简单的对象和数组，但不适用于函数、日期、正则表达式、循环引用等复杂类型。

```javascript
function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

const originalObject = { a: 1, b: { c: 2 } };
const copiedObject = deepCopy(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 } }
```

### 2. 使用递归函数

这种方法可以处理更复杂的对象，包括函数、日期、正则表达式等。

```javascript
function deepCopy(obj, hash = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') return obj;
    if (hash.has(obj)) return hash.get(obj);

    let cloneObj = Array.isArray(obj) ? [] : {};
    hash.set(obj, cloneObj);

    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            cloneObj[key] = deepCopy(obj[key], hash);
        }
    }

    return cloneObj;
}

const originalObject = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: new Date(), f: /abc/ };
const copiedObject = deepCopy(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 }, d: [1, 2, 3], e: Date, f: /abc/ }
```

### 3. 使用第三方库

一些流行的第三方库如 Lodash 提供了深拷贝的功能。

#### 使用 Lodash

```javascript
const _ = require('lodash');

const originalObject = { a: 1, b: { c: 2 } };
const copiedObject = _.cloneDeep(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 } }
```

### 4. 使用 `structuredClone`（现代浏览器）

`structuredClone` 是一个现代浏览器提供的内置函数，可以用于深拷贝对象。它支持更多的数据类型，包括 `Map`、`Set`、`Date`、`RegExp` 等。

```javascript
const originalObject = { a: 1, b: { c: 2 }, d: [1, 2, 3], e: new Date(), f: /abc/ };
const copiedObject = structuredClone(originalObject);

console.log(copiedObject); // { a: 1, b: { c: 2 }, d: [1, 2, 3], e: Date, f: /abc/ }
```

### 总结

- **`JSON.parse` 和 `JSON.stringify`**：简单快捷，但不适用于复杂类型。
- **递归函数**：灵活且强大，可以处理各种复杂类型。
- **第三方库**：如 Lodash，提供丰富的功能和良好的兼容性。
- **`structuredClone`**：现代浏览器提供的内置函数，支持更多数据类型。