document.addEventListener("DOMContentLoaded", () => {
    const itemsContainer = document.getElementById("items");
    const saveButton = document.getElementById("save");
    const exportButton = document.getElementById("export");
    const targetPageUrlInput = document.getElementById("targetPageUrl");
    const saveTargetPageUrlButton = document.getElementById("saveTargetPageUrl");
  
    let selectedItems = [];
    let targetPageUrl = "";
  
    // 加载缓存数据
    chrome.storage.local.get(["selectedItems", "output", "targetPageUrl"], (data) => {
      selectedItems = data.selectedItems || [];
      output = data.output || [];
      targetPageUrl = data.targetPageUrl || "";
      targetPageUrlInput.value = targetPageUrl;
      renderItems();
    });
  
    // 渲染列表
    function renderItems() {
      itemsContainer.innerHTML = "";
      selectedItems.forEach((item, index) => {
        const div = document.createElement("div");
        div.className = "item";
  
        const input = document.createElement("input");
        input.type = "text";
        input.value = item.key;
        input.placeholder = "Enter key";
        input.oninput = (e) => {
          selectedItems[index].key = e.target.value;
        };
        input.style.width = "60px";
        input.style.marginRight = "3px";
  
        const span = document.createElement("span");
        span.textContent = item.selector;
        span.style.marginRight = "3px";
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
          selectedItems.splice(index, 1);
          renderItems();
        };
  
        div.appendChild(input);
        div.appendChild(span);
        div.appendChild(removeButton);
        itemsContainer.appendChild(div);
      });
    }
  
    // 保存按钮
    saveButton.onclick = () => {
      chrome.storage.local.set({ selectedItems });
      alert("Saved!");
    };
  
    // 导出按钮
    exportButton.onclick = async () => {
      const output = await chrome.storage.local.get(["output"]);
      if (!output.output || output.output.length === 0) {
        alert("No data to export.");
        return;
      }
  
      const json = JSON.stringify(output.output, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
  
      window.open(url);
      chrome.storage.local.set({ output: [] });
    };
  
    // 保存目标页面 URL 按钮
    saveTargetPageUrlButton.onclick = () => {
      targetPageUrl = targetPageUrlInput.value;
      chrome.storage.local.set({ targetPageUrl });
      alert("Target Page URL Saved!");
    };
});