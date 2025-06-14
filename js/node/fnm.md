# fnm
`fnm`（Fast Node Manager）是一个快速、轻量级的 Node.js 版本管理工具，它可以帮助你在不同的项目中轻松切换 Node.js 版本。以下是 `fnm` 的基本使用方法：

### 安装 `fnm`

首先，你需要安装 `fnm`。你可以通过以下几种方式来安装 `fnm`：

#### 使用 Homebrew（适用于 macOS 和 Linux）
如果你已经安装了 Homebrew，可以使用以下命令来安装 `fnm`：
```sh
brew install fnm
```

#### 使用 curl 或 wget（适用于 macOS 和 Linux）
你也可以使用 `curl` 或 `wget` 来安装 `fnm`：
```sh
curl -fsSL https://fnm.vercel.app/install | bash
```
或者
```sh
wget -qO- https://fnm.vercel.app/install | bash
```

#### 手动安装
你可以从 [fnm 的 GitHub 发布页面](https://github.com/Schniz/fnm/releases) 下载适合你操作系统的二进制文件，并手动安装。

### 配置环境变量

安装完成后，你需要将 `fnm` 添加到你的 shell 配置文件中。通常，安装脚本会自动为你完成这一步，但如果没有，你可以手动添加以下内容到你的 shell 配置文件（如 `.bashrc`、`.zshrc` 等）：

执行命令：
```sh
eval "`fnm env`"
```
.zshrc中配置：
```zsh
# 替换原 eval 命令（推荐此写法）
eval "$(fnm env --use-on-cd)"
```
​说明​：
- $(...) 替代反引号，避免解析错误。
- --use-on-cd 使进入含 .nvmrc 的目录时自动切换 Node 版本。
- 若需多 Shell 支持（如同时开多个终端），改用 --multi

然后重新加载你的 shell 配置文件：
```sh
source ~/.zshrc  # 或者 source ~/.bashrc
```

### 基本使用

#### 列出已安装的 Node.js 版本
```sh
fnm list
```

#### 安装特定版本的 Node.js
```sh
fnm install 14.17.0
fnm install 16.13.0
fnm install 18.12.0
```

#### 使用特定版本的 Node.js
```sh
fnm use 14.17.0
fnm use 16.13.0
fnm use 18.12.0
```

#### 查看当前使用的 Node.js 版本
```sh
fnm current
```

#### 设置默认的 Node.js 版本
```sh
fnm default 14.17.0
```

#### 删除已安装的 Node.js 版本
```sh
fnm uninstall 14.17.0
```

#### 更新 `fnm` 本身
```sh
fnm update
```

### 项目级别的 Node.js 版本管理

`fnm` 支持在项目级别指定 Node.js 版本。你可以在项目的根目录下创建一个 `.node-version` 文件，并在其中写入你希望使用的 Node.js 版本号。例如：

```sh
echo "14.17.0" > .node-version
```

然后在项目目录中运行 `fnm` 时，它会自动使用 `.node-version` 文件中指定的版本。

### 示例

假设你有一个项目需要使用 Node.js 14.17.0，你可以这样做：

1. **进入项目目录**：
   ```sh
   cd /path/to/your/project
   ```

2. **创建 `.node-version` 文件并指定版本**：
   ```sh
   echo "14.17.0" > .node-version
   ```

3. **安装所需的 Node.js 版本**（如果还没有安装的话）：
   ```sh
   fnm install 14.17.0
   ```

4. **使用指定的 Node.js 版本**：
   ```sh
   fnm use 14
   ```

5. **验证当前使用的 Node.js 版本**：
   ```sh
   node -v
   ```

---

## fnm 的常见问题
报错 error: Having a hard time listing the remote versions: error sending request for url (https://nodejs.org/dist/index.json) 是典型的 ​网络访问问题，通常由连接 Node.js 官方源失败引起。

解决方案，使用国内镜像源：
```bash
# 临时生效（当前终端）
export FNM_NODE_DIST_MIRROR="https://npmmirror.com/mirrors/node/"

# 永久生效（写入 Shell 配置文件）
echo 'export FNM_NODE_DIST_MIRROR="https://npmmirror.com/mirrors/node/"' >> ~/.bashrc  # Bash, 如果是zsh终端，则在.zshrc文件中配置
echo '$env:FNM_NODE_DIST_MIRROR="https://npmmirror.com/mirrors/node/"' >> $PROFILE    # PowerShell
source ~/.bashrc   # 或重启终端[9,11](@ref)
```
- 阿里云：https://npmmirror.com/mirrors/node/
- 腾讯云：https://mirrors.cloud.tencent.com/nodejs-release/