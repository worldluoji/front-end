在JavaScript中生成Excel文件有多种方法，具体取决于你的开发环境（浏览器端或Node.js服务器端）以及你对功能的需求。以下是几种常见的方法和工具：

### 1. 使用 SheetJS (xlsx)

**SheetJS** 是一个非常流行且强大的库，支持读取和写入多种电子表格格式，包括Excel (.xls, .xlsx)。它可以在浏览器端和Node.js环境中使用。

- **GitHub**: [SheetJS/sheetjs](https://github.com/SheetJS/sheetjs)
- **文档**: [SheetJS Documentation](https://sheetjs.com/docs)

#### 示例代码 - 浏览器端

```html
<!DOCTYPE html>
<html>
<head>
    <title>Generate Excel Example</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js"></script>
</head>
<body>
    <button onclick="generateExcel()">Download Excel</button>

    <script>
        function generateExcel() {
            /* 创建工作簿 */
            var wb = XLSX.utils.book_new();

            /* 准备数据 */
            var data = [
                ["Name", "Age", "City"],
                ["Alice", 30, "New York"],
                ["Bob", 25, "Los Angeles"],
                ["Charlie", 35, "Chicago"]
            ];

            /* 将数组转换为工作表 */
            var ws = XLSX.utils.aoa_to_sheet(data);

            /* 添加工作表到工作簿 */
            XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

            /* 生成并下载Excel文件 */
            XLSX.writeFile(wb, "example.xlsx");
        }
    </script>
</body>
</html>
```

#### 示例代码 - Node.js

如果你是在Node.js环境中运行，你需要先安装`xlsx`库：

```bash
npm install xlsx
```

然后你可以用以下方式创建和保存Excel文件：

```javascript
const XLSX = require('xlsx');

// 准备数据
var data = [
    ["Name", "Age", "City"],
    ["Alice", 30, "New York"],
    ["Bob", 25, "Los Angeles"],
    ["Charlie", 35, "Chicago"]
];

// 将数组转换为工作表
var ws = XLSX.utils.aoa_to_sheet(data);

// 创建工作簿
var wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

// 写入文件
XLSX.writeFile(wb, 'example.xlsx');
```

### 2. 使用 ExcelJS

**ExcelJS** 是另一个流行的库，特别适合需要更复杂操作的场景，比如添加图表、样式等。它同样适用于浏览器端和Node.js环境。

- **GitHub**: [exceljs/exceljs](https://github.com/exceljs/exceljs)
- **文档**: [ExcelJS Documentation](https://github.com/exceljs/exceljs#readme)

### 3. 使用导出CSV文件

如果你只需要简单的表格数据而不需要复杂的格式化，那么将数据导出为CSV文件可能是一个更简单的方法。CSV文件可以被大多数电子表格软件打开，并且可以直接通过JavaScript生成。

#### 示例代码 - 浏览器端

```html
<!DOCTYPE html>
<html>
<head>
    <title>Export CSV Example</title>
</head>
<body>
    <button onclick="exportToCSV()">Download CSV</button>

    <script>
        function exportToCSV() {
            const rows = [
                ["Name", "Age", "City"],
                ["Alice", 30, "New York"],
                ["Bob", 25, "Los Angeles"],
                ["Charlie", 35, "Chicago"]
            ];

            // 将二维数组转换成CSV字符串
            const csvContent = "data:text/csv;charset=utf-8," 
                             + rows.map(e => e.join(",")).join("\n");

            // 创建隐藏的<a>标签来触发下载
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "example.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "example.csv".
        }
    </script>
</body>
</html>
```

选择哪种方法取决于你的具体需求，例如是否需要复杂的样式、图表、公式等功能，以及你是在客户端还是服务器端进行操作。对于大多数简单的应用场景，SheetJS 和直接导出CSV应该是足够了；而对于更高级的需求，ExcelJS可能会更适合。