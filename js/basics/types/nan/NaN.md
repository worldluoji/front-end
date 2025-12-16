# NaN
在 JavaScript 中，`NaN` 是一个特殊的全局值，表示 **"Not a Number"**（不是一个数字），用于表示无法表示的数值结果。

## 基本特性

### 1. **类型**
```javascript
typeof NaN;  // "number"
```
NaN 是数字类型，但实际上表示一个无效的数字。

### 2. **产生 NaN 的常见情况**
```javascript
// 数学运算失败
0 / 0;              // NaN
Math.sqrt(-1);      // NaN
parseInt("hello");  // NaN
Number("abc");      // NaN

// 不兼容的类型转换
"text" * 2;         // NaN
undefined + 1;      // NaN
```

## 重要的特性

### 3. **NaN 与自身的比较**
```javascript
NaN === NaN;    // false
NaN == NaN;     // false
Object.is(NaN, NaN);  // true
```
这是 NaN 最特殊的属性：它**不等于任何值，包括自己**。

## 检测 NaN 的方法

### 4. **正确检测 NaN**
```javascript
// 方法1: isNaN() 函数（有缺陷）
isNaN(NaN);       // true
isNaN("abc");     // true（会先尝试转换为数字）
isNaN(123);       // false

// 方法2: Number.isNaN()（推荐）
Number.isNaN(NaN);    // true
Number.isNaN("abc");  // false
Number.isNaN(123);    // false

// 方法3: 利用 NaN 不等于自身的特性
function isNaNValue(value) {
    return value !== value;
}
```

## 实际应用示例

### 5. **避免 NaN 传播**
```javascript
function safeDivide(a, b) {
    const result = a / b;
    return Number.isFinite(result) ? result : 0;
}

safeDivide(10, 2);    // 5
safeDivide(10, 0);    // Infinity
safeDivide(0, 0);     // 0
```

### 6. **数组中的 NaN 处理**
```javascript
const arr = [1, NaN, 3, NaN, 5];

// 过滤 NaN
arr.filter(n => !Number.isNaN(n));  // [1, 3, 5]

// 统计 NaN 数量
arr.filter(Number.isNaN).length;    // 2
```

## 注意事项

1. **isNaN() 与 Number.isNaN() 的区别**
   - `isNaN()`：会先进行类型转换
   - `Number.isNaN()`：严格检查，不进行转换

2. **NaN 在比较运算中的行为**
   ```javascript
   NaN > 5;     // false
   NaN < 5;     // false
   NaN === 5;   // false
   ```

3. **JSON 序列化**
   ```javascript
   JSON.stringify({ value: NaN });  // '{"value":null}'
   ```

## 最佳实践

1. 总是使用 `Number.isNaN()` 而不是 `isNaN()`
2. 在处理数学运算时添加边界检查
3. 使用默认值避免 NaN 传播
   ```javascript
   const result = possiblyNaNValue || defaultValue;
   ```