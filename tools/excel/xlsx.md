在 Node.js 中，有几个流行的库可以用来生成 Excel 文件。其中一个最常用的库是 `xlsx`，它支持读写 `.xls` 和 `.xlsx` 格式的文件。下面是一个简单的示例，展示如何使用 `xlsx` 库来创建一个 Excel 文件，并填充一些数据。

### 安装 `xlsx` 库

首先，你需要安装 `xlsx` 库。可以通过 npm 安装：

```sh
npm install xlsx
```

### 示例代码

接下来，这里是一个使用 `xlsx` 库创建 Excel 文件的基本示例：

```javascript
const XLSX = require('xlsx');

// 准备数据
const data = [
  ['姓名', '年龄', '城市'],
  ['张三', 25, '北京'],
  ['李四', 30, '上海'],
  ['王五', 22, '广州']
];

// 将数据转换为工作表
const worksheet = XLSX.utils.aoa_to_sheet(data);

// 创建工作簿
const workbook = XLSX.utils.book_new();

// 添加工作表到工作簿
XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

// 写入文件
XLSX.writeFile(workbook, 'output.xlsx');
```

### 代码解释

1. **准备数据**：我们定义了一个二维数组 `data`，其中第一行是表头，后面几行是数据。
2. **转换为工作表**：使用 `XLSX.utils.aoa_to_sheet` 方法将二维数组转换为工作表。
3. **创建工作簿**：使用 `XLSX.utils.book_new` 方法创建一个新的空白工作簿。
4. **添加工作表到工作簿**：使用 `XLSX.utils.book_append_sheet` 方法将工作表添加到工作簿。
5. **写入文件**：使用 `XLSX.writeFile` 方法将工作簿写入到文件中。

### 注意事项

- 确保你的 Node.js 环境已经安装了 `xlsx` 库。
- 运行代码之前，请确保你有足够的权限在指定目录下创建文件。

### 使用示例

你可以将上述代码保存为一个 `.js` 文件，例如 `create-excel.js`，然后在命令行中运行：

```sh
node create-excel.js
```

这将在当前目录下生成一个名为 `output.xlsx` 的 Excel 文件。

希望这能帮到你！如果有任何其他问题或需要进一步的帮助，请随时告诉我。