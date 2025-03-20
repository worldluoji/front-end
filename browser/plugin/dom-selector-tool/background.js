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
  if (info.menuItemId === "copySelector") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getSelector
    }, (results) => {
      const selector = results[0].result;
      if (selector) {
        selectedItems.push({ selector, key: "" });
        chrome.storage.local.set({ selectedItems });
      }
    });
  }
});

// 获取当前元素的 CSS Selector
function getSelector() {
  function getPathTo(element) {
    if (element.id !== "") return `#${element.id}`;
    if (element === document.body) return element.tagName;

    // 递归构建选择器路径
    let ix = 0;
    const siblings = element.parentNode.childNodes;
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element)
        return `${getPathTo(element.parentNode)} > ${element.tagName}:nth-child(${ix + 1})`;
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
    }
  }

  // window.getSelection() 返回一个 Selection 对象，表示用户选择的文本范围或光标的当前位置。
  return getPathTo(window.getSelection().anchorNode.parentElement);
}