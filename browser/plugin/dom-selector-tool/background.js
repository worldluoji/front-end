let selectedItems = [];

// Load cached data
chrome.storage.local.get(["selectedItems"], (data) => {
  selectedItems = data.selectedItems || [];
});

// Remove all existing context menu items
chrome.contextMenus.removeAll(() => {
    // Create context menu item
    chrome.contextMenus.create({
      id: "copySelector",
      title: "Copy Selector",
      contexts: ["all"]
    });
});

// Listen for context menu click events
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "copySelector" && tab.id) {
    // Send message to content script to get selector
    chrome.tabs.sendMessage(
      tab.id,
      { action: "getSelector", x: info.x || 0, y: info.y || 0 }, // Send mouse click coordinates
      (response) => {
        if (response && response.selector) {
          selectedItems.push({ selector: response.selector, key: "" });
          chrome.storage.local.set({ selectedItems }); // Store selector
        }
      }
    );
  }
});