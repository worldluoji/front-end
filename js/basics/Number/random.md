# random
在JavaScript中，`Math.random()` 函数用于返回一个0（包括）到1（不包括）之间的伪随机数。这意味着该函数的返回值可以是0，但永远不会是1。

例如，如果你需要生成一个介于0和1之间（不包括1）的随机数，你可以直接使用 `Math.random()`。如果你想生成一个包括1在内的随机数范围，你需要采用其他方法来调整这个范围。但通常情况下，我们不会这样做，因为 `Math.random()` 的设计初衷就是提供一个开区间 (0, 1) 的随机数。

如果你需要一个特定范围内的随机整数，比如从最小值 `min` 到最大值 `max` （包括 `max`），你可以使用下面的公式：

```javascript
let randomInt = Math.floor(Math.random() * (max - min + 1)) + min;
```

这里 `Math.random()` 产生的随机数乘以 `(max - min + 1)` 确保了结果可以达到 `max` 值，而 `Math.floor` 则将结果向下取整为最接近的整数。这样，`randomInt` 就是一个从 `min` 到 `max` 之间（包括 `min` 和 `max`）的随机整数。