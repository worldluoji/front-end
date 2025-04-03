### Web Storage隐私模式行为对比分析

#### 一、核心差异总览

| **特性**               | **sessionStorage**                     | **localStorage**                      |
|------------------------|----------------------------------------|---------------------------------------|
| **隐私模式数据持久性**  | 标签页关闭即清除                        | 浏览器关闭即清除（部分浏览器实例隔离）|
| **存储配额**           | 通常5MB                                | 隐私模式可能降级为2MB                 |
| **跨窗口访问**         | 严格单标签页隔离                        | 同源窗口共享（但隐私/普通模式隔离）    |
| **异常处理**           | 静默失败                               | 可能触发QuotaExceededError            |
| **浏览器实现差异**     | 主要浏览器行为一致                      | Safari隐私模式完全禁用                |

#### 二、底层机制解析

1. **存储沙箱隔离**：
   ```javascript
   // Chrome隐私模式实现伪代码
   class StoragePartition {
     constructor(isPrivate) {
       this.isPrivate = isPrivate;
       this.storages = new Map();
     }

     getStorage(type) {
       if (!this.storages.has(type)) {
         const storage = this.isPrivate ? 
           new EphemeralStorage() : new PersistentStorage();
         this.storages.set(type, storage);
       }
       return this.storages.get(type);
     }
   }

   // 隐私窗口创建时生成独立分区
   const privatePartition = new StoragePartition(true);
   ```

2. **数据销毁策略**：
   • **sessionStorage**：
     ```cpp
     // Blink引擎处理逻辑
     void TabClosed() {
       if (is_private) {
         session_storage->ClearAll();
         DOMStorageMap().erase(tab_id);
       }
     }
     ```
   • **localStorage**：
     ```cpp
     void BrowserShutdown() {
       if (is_private) {
         leveldb::DestroyDB(private_db_path);  // 直接删除LevelDB文件
       }
     }
     ```

#### 三、跨浏览器行为差异

| **浏览器**      | **sessionStorage**                | **localStorage**                 |
|-----------------|-----------------------------------|-----------------------------------|
| Chrome 95+      | 标签页关闭清除                    | 浏览器关闭清除，支持5MB           |
| Firefox 93       | 标签页关闭清除                    | 浏览器关闭清除，配额2MB           |
| Safari 15       | 标签页关闭清除                    | 完全禁用，setItem报SecurityError  |
| Edge 95         | 同Chrome                         | 同Chrome                          |
| iOS Safari 14.5 | 标签页切换即可能清除              | 完全禁用                          |

#### 四、异常场景处理

1. **Safari隐私模式访问示例**：
   ```javascript
   try {
     localStorage.setItem('key', 'value');
   } catch (e) {
     // 输出：SecurityError: The operation is insecure.
     console.error(e);  
   }
   ```

2. **Firefox配额限制示例**：
   ```javascript
   // 尝试写入3MB数据
   const data = new ArrayBuffer(3 * 1024 * 1024);
   try {
     localStorage.setItem('bigData', data);
   } catch (e) {
     // 触发QuotaExceededError
     console.error(e.name);  // "QuotaExceededError"
   }
   ```

#### 五、工程实践建议

1. **特性检测方案**：
   ```javascript
   function isLocalStorageSupported() {
     const testKey = '__test__';
     try {
       localStorage.setItem(testKey, testKey);
       localStorage.removeItem(testKey);
       return true;
     } catch(e) {
       return false;
     }
   }
   ```

2. **隐私模式适配策略**：
   ```javascript
   const storage = {
     set: (key, value) => {
       try {
         if (isLocalStorageSupported()) {
           localStorage.setItem(key, value);
         } else {
           // 回退到内存存储
           memoryCache[key] = value; 
         }
       } catch (e) {
         // 上报监控
         Sentry.captureException(e);
       }
     }
   };
   ```

3. **数据同步策略**：
   ```mermaid
   graph LR
     A[用户操作] --> B{隐私模式检测}
     B -->|正常模式| C[写入localStorage]
     B -->|隐私模式| D[使用sessionStorage]
     D --> E[监听beforeunload事件]
     E --> F[提示数据保存]
   ```

#### 六、底层存储差异

| **存储类型**       | **物理存储位置**                  | **隐私模式加密**          |
|--------------------|-----------------------------------|--------------------------|
| sessionStorage     | 内存存储                          | 不加密                   |
| localStorage       | 磁盘LevelDB/SQLite               | Chrome使用OS加密文件系统 |
| 隐私localStorage   | 内存虚拟文件系统                   | AES-256内存加密          |

该对比揭示了现代浏览器如何在隐私模式下通过存储隔离、配额限制和数据销毁策略实现隐私保护。开发者需特别注意Safari的严格限制和不同浏览器的配额差异，采用渐进增强策略保障应用兼容性。