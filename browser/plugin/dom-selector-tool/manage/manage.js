document.addEventListener("DOMContentLoaded", () => {
    const selectedItemsContainer = document.getElementById("selectedItems");
    const saveSelectedItemsButton = document.getElementById("saveSelectedItems");
  
    const outputDataContainer = document.getElementById("outputData");
    const saveOutputButton = document.getElementById("saveOutput");
    const clearOutputButton = document.getElementById("clearOutput");
  
    let selectedItems = [];
    let output = [];
  
    // 加载缓存数据
    chrome.storage.local.get(["selectedItems", "output"], (data) => {
      selectedItems = data.selectedItems || [];
      output = data.output || [];
      renderSelectedItems();
      renderOutputData();
    });
  
    // 渲染 selectedItems 列表
    function renderSelectedItems() {
      selectedItemsContainer.innerHTML = "";
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
  
        const span = document.createElement("span");
        span.textContent = item.selector;
  
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
          selectedItems.splice(index, 1);
          renderSelectedItems();
        };
  
        div.appendChild(input);
        div.appendChild(span);
        div.appendChild(removeButton);
        selectedItemsContainer.appendChild(div);
      });
    }
  // 渲染 output 数据
  function renderOutputData() {
    outputDataContainer.innerHTML = "";
    if (output.length === 0) {
      outputDataContainer.textContent = "No output data available.";
      return;
    }

    output.forEach((record, index) => {
      const div = document.createElement("div");
      div.className = "item";

      const span = document.createElement("span");
      span.textContent = `Record ${index + 1}: ${JSON.stringify(record)}`;

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.onclick = () => {
        output.splice(index, 1);
        renderOutputData();
        chrome.storage.local.set({ output }, () => {
          alert("Output record removed!");
        });
      };

      div.appendChild(span);
      div.appendChild(removeButton);
      outputDataContainer.appendChild(div);
    });
  }
  
    // 保存 selectedItems
    saveSelectedItemsButton.onclick = () => {
      chrome.storage.local.set({ selectedItems }, () => {
        alert("Selected items saved!");
      });
    };
  
    // 保存 output 数据
    saveOutputButton.onclick = () => {
      chrome.storage.local.set({ output }, () => {
        alert("Output data saved!");
      });
    };
  
    // 清空 output 数据
    clearOutputButton.onclick = () => {
      chrome.storage.local.set({ output: [] }, () => {
        output = [];
        renderOutputData();
        alert("Output data cleared!");
      });
    };
  });