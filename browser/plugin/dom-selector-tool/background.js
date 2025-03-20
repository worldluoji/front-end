let selectedItems = [];

// 加载缓存数据
chrome.storage.local.get(["selectedItems"], (data) => {
  selectedItems = data.selectedItems || [];
});

// 清理所有现有的右键菜单项
chrome.contextMenus.removeAll(() => {
    // 创建右键菜单项
    chrome.contextMenus.create({
      id: "copySelector",
      title: "Copy Selector",
      contexts: ["all"]
    });
});

// 监听右键菜单点击事件
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copySelector" && tab.id) {
    // 向内容脚本发送消息以获取选择器
    chrome.tabs.sendMessage(
      tab.id,
      { action: "getSelector", x: info.x || 0, y: info.y || 0 }, // 发送鼠标点击坐标
      (response) => {
        if (response && response.selector) {
          selectedItems.push({ selector: response.selector, key: "" });
          chrome.storage.local.set({ selectedItems }); // 存储选择器
        }
      }
    );
  }
});