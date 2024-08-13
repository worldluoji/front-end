import XLSX from 'xlsx';

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