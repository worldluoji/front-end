# image orc detector thinking
Plasmo 是一个现代的浏览器扩展开发框架，它简化了浏览器扩展的开发流程，并支持多种浏览器。如果你使用 Plasmo 开发 Chrome 浏览器插件，可以采用类似的方法来处理鼠标右键点击图片的情况，但具体实现细节会有所不同。

下面是如何使用 Plasmo 创建一个处理鼠标右键点击图片的插件：

### 步骤 1: 初始化项目
首先，你需要使用 Plasmo CLI 初始化一个新的项目。如果你还没有安装 Plasmo CLI，可以使用 npm 或 yarn 安装它：

```bash
pnpm create plasmo
```

### 步骤 2: 修改配置文件
在项目的package.json 的 manifest 配置项添加需要添加必要的权限和配置。
```json
"permissions": [
    "activeTab",
    "contextMenus"
]
```
- "activeTab"：允许访问当前活动标签页的信息。
- "contextMenus"：允许创建上下文菜单。

https://docs.plasmo.com/framework/customization/manifest

### 步骤 3: 添加右键菜单项
接下来，你需要在背景脚本中添加代码来创建右键菜单项，并监听点击事件。

### 步骤 4: 处理图片数据
当用户点击右键菜单项时，从事件参数中获取图片的 URL，并处理图片。

### 示例代码

#### background/index.ts
```typescript
import { create, onClicked } from "plasmo-context-menus";

// 创建一个右键菜单项
create({
  id: "handle-image",
  title: "Handle this image",
  contexts: ["image"]
});

// 监听菜单项点击事件
onClicked.addListener(async (info, tab) => {
  if (info.menuItemId === "handle-image") {
    // 获取图片的URL
    const imageUrl = info.srcUrl;

    // 处理图片，例如打开新标签页显示图片
    await chrome.tabs.create({ url: imageUrl });

    // 其他处理逻辑，例如上传图片到服务器
    // ...
  }
});
```

### 说明
1. **创建右键菜单项**：
   - 使用`create`方法创建一个右键菜单项，只在图片上显示。
   - 设置菜单项的标题为“Handle this image”。

2. **监听菜单项点击事件**：
   - 使用`onClicked.addListener`监听器来处理菜单项点击事件。
   - 在点击事件处理器中，获取图片的URL（`info.srcUrl`），然后可以执行任何你想要的操作，例如打开新标签页显示图片。

### 步骤 5: 构建和测试插件
1. **构建插件**：
   - 使用 Plasmo CLI 构建你的插件：
     ```bash
     plasmo build
     ```

2. **加载未打包的扩展程序**：
   - 打开 Chrome 浏览器，进入 `chrome://extensions/` 页面。
   - 开启右上角的“开发者模式”。
   - 点击“加载已解压的扩展程序”，选择你的插件目录。
   - 你的插件现在应该出现在列表中，并且可以使用了。

3. **测试插件**：
   - 在任意网页中找到一张图片，右键点击该图片。
   - 你会看到一个名为“Handle this image”的菜单项。
   - 点击该菜单项，应该会打开一个新的标签页显示选中的图片。

通过以上步骤，你就成功地使用 Plasmo 开发了一个处理鼠标右键点击图片的 Chrome 浏览器插件。