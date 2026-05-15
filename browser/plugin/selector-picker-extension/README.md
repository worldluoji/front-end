# 稳定选择器生成器

点击扩展图标，然后点击页面元素，自动生成稳定的唯一 CSS 选择器。

## 功能特性

- 点击扩展图标进入「选取元素」模式
- 自动优先使用语义化属性：`data-testid`、`aria-label`、`placeholder`、`name`、`title`、`id`
- 属性无法构成唯一选择器时，回退为最短的 `:nth-of-type` 路径
- 结果输出到浏览器控制台，并通过弹窗展示

## 文件结构

```
selector-picker-extension/
├── manifest.json    # 插件配置文件
├── background.js    # 后台脚本
├── content.js       # 内容脚本（核心逻辑）
├── icon16.png       # 16x16 图标
├── icon48.png       # 48x48 图标
└── icon128.png      # 128x128 图标
```

## 安装

1. 将插件文件夹放入合适的位置（如 `~/selector-picker-extension/`）
2. 打开 Chrome，访问 `chrome://extensions/`
3. 开启右上角 **「开发者模式」**
4. 点击 **「加载已解压的扩展程序」**
5. 选择 `selector-picker-extension` 文件夹

安装成功后，扩展图标会出现在地址栏右侧的扩展程序区域。

## 使用

1. 打开目标网页
2. 点击扩展图标，鼠标变为十字准星
3. 点击想要选取的元素
4. 插件会自动生成稳定的选择器：
   - 控制台（F12）输出完整选择器
   - 弹窗显示选择器内容，方便复制
