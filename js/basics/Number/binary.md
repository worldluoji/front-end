在JavaScript中，你可以使用内置的方法来将数字转换为二进制、八进制和十六进制字符串。下面是每种转换的示例：

### 1. 转换为二进制
要将一个数字转换成二进制字符串，可以使用 `Number.prototype.toString(2)` 方法。

```javascript
let num = 10;
let binaryString = num.toString(2); // "1010"
console.log(binaryString);
```

### 2. 转换为八进制
对于八进制，使用 `Number.prototype.toString(8)` 方法。

```javascript
let num = 64;
let octalString = num.toString(8); // "100"
console.log(octalString);
```

### 3. 转换为十六进制
转换为十六进制时，可以使用 `Number.prototype.toString(16)` 方法。注意，这会返回小写的字母表示（a-f）。如果你需要大写字母（A-F），可以在结果上调用 `.toUpperCase()` 方法。

```javascript
let num = 255;
let hexString = num.toString(16); // "ff"
console.log(hexString);

// 如果需要大写形式
let hexStringUpper = num.toString(16).toUpperCase(); // "FF"
console.log(hexStringUpper);
```

### 反向转换
如果你想从这些不同的基数字符串再转换回十进制数字，可以使用 `parseInt` 函数，并指定基数作为第二个参数。

- 从二进制到十进制:

```javascript
let binaryString = "1010";
let decimalNum = parseInt(binaryString, 2); // 10
console.log(decimalNum);
```

- 从八进制到十进制:

```javascript
let octalString = "100";
let decimalNum = parseInt(octalString, 8); // 64
console.log(decimalNum);
```

- 从十六进制到十进制:

```javascript
let hexString = "ff";
let decimalNum = parseInt(hexString, 16); // 255
console.log(decimalNum);
```

