# Volta
内网只有Volta，没有fnm。

Volta 是一个高效的跨平台 Node.js 版本管理工具，通过项目级自动切换和工具链管理，解决多项目环境不一致的问题。以下是其核心用法详解：

---

### 🔧 **一、安装与环境配置**
1. **安装方法**  
   - **macOS/Linux**：  
     执行命令 `curl https://get.volta.sh | bash`，安装后重启终端或运行 `source ~/.bashrc`（或 `source ~/.zshrc`）激活。  
   - **Windows**：  
     下载官方安装包[安装](https://github.com/volta-cli/volta/releases)，默认安装到 `C:\Program Files\Volta`，需重启终端生效。  

2. **自定义安装路径（可选）**  
   - 修改环境变量 `VOLTA_HOME`（如设为 `D:\Volta`），并将原安装目录文件迁移至此。  
   - 在系统环境变量 `PATH` 中添加 `%VOLTA_HOME%\bin`。

---

### ⚙️ **二、核心操作命令**
1. **安装 Node.js 版本**  
   - 安装最新版：`volta install node`  
   - 安装指定版本：`volta install node@18.15.0`（支持模糊版本如 `node@18`）。  
   - 查看已安装版本：`volta list`（当前环境）或 `volta list all`（所有版本）。

2. **项目级版本锁定**  
   - 进入项目根目录，执行：  
     ```bash
     volta pin node@16.18.1  # 锁定 Node 版本
     volta pin yarn@1.22.17 # 锁定包管理器版本
     ```  
     该命令会修改项目的 `package.json`，添加字段：  
     ```json
     "volta": {
       "node": "16.18.1",
       "yarn": "1.22.17"
     }
     ```  
   - **效果**：进入该项目目录时，Volta 自动切换至指定版本，无需手动操作。

3. **全局默认版本设置**  
   - `volta default node@18`：设置全局默认 Node 版本。

---

### 🚀 **三、高级技巧与问题解决**
1. **网络问题导致安装失败**  
   - 手动下载 Node 二进制包（如 [node-v18.15.0-win-x64.zip](https://registry.npmmirror.com/binary.html?path=node/)），放入 `%VOLTA_HOME%\tools\inventory\node\` 目录，再执行 `volta install node@18.15.0`。

2. **管理其他工具（npm/yarn）**  
   - 安装指定工具：`volta install yarn` 或 `volta install npm@8`。  
   - 更新工具：`volta install npm@latest`。

3. **环境切换验证**  
   - 进入不同项目目录，执行 `node -v` 或 `yarn -v`，检查版本是否自动切换。

---

### ⚖️ **四、Volta 与 nvm 的对比优势**
| **特性**          | **Volta**                            | **nvm**                     |
|-------------------|--------------------------------------|-----------------------------|
| 跨平台支持        | ✅ 全平台（macOS/Linux/Windows）      | ❌ Windows 需额外工具        |
| 版本切换方式      | 🔄 项目目录自动切换                  | ⚠️ 需手动执行 `nvm use`     |
| 工具链管理        | 📦 支持 npm/yarn 等版本锁定          | ❌ 仅管理 Node               |
| 性能              | ⚡️ Rust 原生实现，无需重启终端       | 🐢 依赖 Shell 脚本           |
| 项目协作友好度    | 📝 版本信息写入 `package.json`       | 📖 依赖文档说明              |

---

### 注意事项
使用Volta后，系统里的NODE_PATH环境变量会被Volta自动修改，可能会导致一些情况无法正确识别Node环境，比如
```
npm install -g testcafe
```
你会发现你依然无法使用testcafe命令，这时需要把`<your_volta_path>/bin`加入系统环境的变量中。

---

### 💎 **五、总结**  
Volta 通过 **项目级自动版本切换** 和 **声明式版本锁定**（写入 `package.json`），彻底解决了多项目环境冲突问题。尤其适合：  
- 团队协作项目（确保环境一致）；  
- 需并行维护不同 Node 版本的项目；  
- 希望免手动切换的开发者。  

> 提示：首次安装后若命令未生效，检查终端重启或环境变量配置。更多命令参考[官方文档](https://docs.volta.sh/reference)。