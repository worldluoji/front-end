document.addEventListener("DOMContentLoaded", () => {
    const saveTargetPageUrlButton = document.getElementById("saveTargetPageUrl");
    const targetPageUrlInput = document.getElementById("targetPageUrl");

    const selectedItemsContainer = document.getElementById("selectedItems");
    const saveSelectedItemsButton = document.getElementById("saveSelectedItems");
  
    const outputDataContainer = document.getElementById("outputData");
    const saveOutputButton = document.getElementById("saveOutput");
    const clearOutputButton = document.getElementById("clearOutput");

    const exportButton = document.getElementById("export");
    
    const addItemButton = document.getElementById("addItem");
    const newItemKeyInput = document.getElementById("newItemKey");
    const newItemSelectorInput = document.getElementById("newItemSelector");
    const newItemDefaultValueInput = document.getElementById("newItemDefaultValue");
  
    let targetPageUrl = "";
    let selectedItems = [];
    let output = [];
  
    // 加载缓存数据
    chrome.storage.local.get(["selectedItems", "output", "targetPageUrl"], (data) => {
      selectedItems = data.selectedItems || [];
      output = data.output || [];
      targetPageUrl = data.targetPageUrl || "";
      targetPageUrlInput.value = targetPageUrl;
      renderSelectedItems();
      renderOutputData();
    });
  
    // render selectedItems to a table
    function renderSelectedItems() {
      // clear the container
      selectedItemsContainer.innerHTML = "";

      // create table
      const table = document.createElement("table");
      table.style.width = "100%";
      table.style.borderCollapse = "collapse";
      table.style.marginBottom = "5px";

      // create table header
      const thead = document.createElement("thead");
      const headerRow = document.createElement("tr");
      headerRow.innerHTML = `
        <th style="border: 1px solid #ddd; padding: 8px;">Key</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Selector</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Unique</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Default Value</th>
        <th style="border: 1px solid #ddd; padding: 8px;">Actions</th>
      `;
      thead.appendChild(headerRow);
      table.appendChild(thead);

      // create table content
      const tbody = document.createElement("tbody");
      selectedItems.forEach((item, index) => {
        const row = document.createElement("tr");

        // Key column
        const keyCell = document.createElement("td");
        keyCell.style.border = "1px solid #ddd";
        keyCell.style.padding = "8px";
        keyCell.style.textAlign = "center";
        const keyInput = document.createElement("input");
        keyInput.type = "text";
        keyInput.value = item.key;
        keyInput.placeholder = "Enter key";
        keyInput.oninput = (e) => {
          selectedItems[index].key = e.target.value;
        };
        keyCell.appendChild(keyInput);
        row.appendChild(keyCell);

        // Selector column
        const selectorCell = document.createElement("td");
        selectorCell.style.border = "1px solid #ddd";
        selectorCell.style.padding = "8px";
        selectorCell.textContent = item.selector;
        selectorCell.style.textAlign = "center";
        row.appendChild(selectorCell);

        // Unique column
        const uniqueCell = document.createElement("td");
        uniqueCell.style.border = "1px solid #ddd";
        uniqueCell.style.padding = "8px";
        uniqueCell.style.textAlign = "center";
        const uniqueCheckbox = document.createElement("input");
        uniqueCheckbox.type = "checkbox";
        uniqueCheckbox.checked = item.unique;
        uniqueCheckbox.addEventListener("click", (e) => {
          selectedItems[index].unique = e.target.checked;
        });
        uniqueCell.appendChild(uniqueCheckbox);
        row.appendChild(uniqueCell);

        // Default Value column
        const defaultValueCell = document.createElement("td");
        defaultValueCell.style.border = "1px solid #ddd";
        defaultValueCell.style.padding = "8px";
        defaultValueCell.style.textAlign = "center";
        const defaultValueInput = document.createElement("input");
        defaultValueInput.type = "text";
        defaultValueInput.value = item.defaultValue || "";
        defaultValueInput.placeholder = "Default Value when not found";
        defaultValueInput.oninput = (e) => {
          selectedItems[index].defaultValue = e.target.value;
        };
        defaultValueCell.appendChild(defaultValueInput);
        row.appendChild(defaultValueCell);

        // Actions column
        const actionsCell = document.createElement("td");
        actionsCell.style.border = "1px solid #ddd";
        actionsCell.style.padding = "8px";
        actionsCell.style.textAlign = "center";
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.onclick = () => {
          selectedItems.splice(index, 1);
          renderSelectedItems();
        };
        actionsCell.appendChild(removeButton);
        row.appendChild(actionsCell);

        // add row to body
        tbody.appendChild(row);
      });

      // add body to table
      table.appendChild(tbody);

      // add table to container
      selectedItemsContainer.appendChild(table);
    }
  // render output data
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
  
    // save selectedItems
    saveSelectedItemsButton.onclick = () => {
      chrome.storage.local.set({ selectedItems }, () => {
        alert("Selected items saved!");
      });
    };
  
    // save output data
    saveOutputButton.onclick = () => {
      chrome.storage.local.set({ output }, () => {
        alert("Output data saved!");
      });
    };
  
    // clear output data
    clearOutputButton.onclick = () => {
      chrome.storage.local.set({ output: [] }, () => {
        output = [];
        renderOutputData();
        alert("Output data cleared!");
      });
    };

    // save target URL
    saveTargetPageUrlButton.onclick = () => {
        targetPageUrl = targetPageUrlInput.value;
        chrome.storage.local.set({ targetPageUrl });
        alert("Target Page URL Saved!");
    };

     // export button
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

    // add new selectedItem
    addItemButton.onclick = () => {
        const key = newItemKeyInput.value.trim();
        const selector = newItemSelectorInput.value.trim();
        const defaultValue = newItemDefaultValueInput.value.trim();

        if (key === "") {
          alert("Please enter key.");
          return;
        }

        if (selector === "" && defaultValue === "") {
          alert("Please enter selector or defaultValue.");
          return;
        }
       

        selectedItems.push({ key, selector, defaultValue });
        renderSelectedItems();
        newItemKeyInput.value = "";
        newItemSelectorInput.value = "";
        defaultValue.value = "";
    };
});