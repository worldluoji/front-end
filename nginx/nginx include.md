# include
在 Nginx 中，`include` 指令的作用是将指定文件的内容插入到配置文件中 `include` 指令所在的位置。从行为上看，它确实类似于“替换”或“插入”，但更准确地说，它是将被包含文件的内容逻辑上合并到主配置文件中相应的位置。

### 1. 工作原理

当 Nginx 启动或重新加载配置时，它会解析主配置文件（通常是 `/etc/nginx/nginx.conf`），遇到 `include` 指令时，Nginx 会读取并解析由 `include` 指定的文件，并将其内容按顺序添加到当前上下文中。这意味着：

- **顺序重要**：被包含文件中的指令会按照它们出现在配置文件中的顺序执行。
- **作用域保持**：`include` 指令不会改变其所在的作用域。例如，如果你在一个 `http` 块内使用 `include`，那么被包含文件中的所有指令都将在 `http` 上下文中生效；同理适用于 `server` 和 `location` 等块。


假设你有如下的主配置文件 `/etc/nginx/nginx.conf`：

```nginx
http {
    include /etc/nginx/mime.types;
    include /etc/nginx/conf.d/*.conf;

    server {
        listen 80;
        server_name example.com;

        location / {
            root /var/www/html;
            index index.html;
        }
    }
}
```

并且 `/etc/nginx/conf.d/default.conf` 文件内容如下：

```nginx
# /etc/nginx/conf.d/default.conf
server {
    listen 80;
    server_name another.example.com;

    location / {
        proxy_pass http://backend;
    }
}
```

那么 Nginx 在解析配置时，实际上会把 `/etc/nginx/conf.d/default.conf` 的内容逻辑上插入到 `include /etc/nginx/conf.d/*.conf;` 这一行的位置，结果就像是这样：

```nginx
http {
    # 内容来自 /etc/nginx/mime.types
    types {
        text/html html htm shtml;
        text/css css;
        # ... 其他 mime 类型定义 ...
    }

    # 内容来自 /etc/nginx/conf.d/default.conf
    server {
        listen 80;
        server_name another.example.com;

        location / {
            proxy_pass http://backend;
        }
    }

    server {
        listen 80;
        server_name example.com;

        location / {
            root /var/www/html;
            index index.html;
        }
    }
}
```

---

### 2. 创建专门的配置文件结构

为了更好地组织和管理 Nginx 配置文件，可以创建一个清晰且易于维护的目录结构。这种结构不仅有助于分离不同的配置部分，还能简化站点的启用和禁用操作。

#### 推荐的目录结构：

- **`/etc/nginx/nginx.conf`** - 主配置文件，包含全局设置和对其他配置文件或目录的引用。
- **`/etc/nginx/conf.d/`** - 用于存放全局配置片段，例如日志格式、HTTP 设置等。这些配置适用于所有服务器块（server blocks）。
- **`/etc/nginx/sites-available/`** - 存放所有站点的完整配置文件模板。这里存放的是未激活的站点配置文件。
- **`/etc/nginx/sites-enabled/`** - 存放实际启用的站点配置文件。通常，这里的文件是通过符号链接指向 `sites-available` 中的文件。

#### 启用和禁用站点：

- **启用新站点**：创建从 `sites-enabled` 到 `sites-available` 的软链接。例如，要启用名为 `example.com.conf` 的站点配置文件，你可以执行以下命令：
  
  ```bash
  ln -s /etc/nginx/sites-available/example.com.conf /etc/nginx/sites-enabled/
  ```

- **禁用现有站点**：删除 `sites-enabled` 目录下的相应软链接即可。例如，要禁用 `example.com.conf` 站点，可以执行如下命令：
  
  ```bash
  rm /etc/nginx/sites-enabled/example.com.conf
  ```

这种方法允许你轻松地添加、移除或切换不同版本的站点配置，而不需要直接编辑主配置文件。每次修改配置后，请记得使用 `nginx -t` 测试配置文件的有效性，并在确认无误后重新加载 Nginx (`nginx -s reload`) 使更改生效。

---

### 3. 使用环境变量

有时你可能希望根据不同的部署环境（如开发、测试、生产）来动态加载不同的 Nginx 配置。这可以通过环境变量实现，使得同一套代码可以根据运行时环境的不同而应用不同的配置选项。

#### 在 Nginx 配置中使用环境变量：

Nginx 支持在配置文件中使用环境变量。你可以在配置文件中定义路径或其他可变参数，让它们基于环境变量进行调整。例如，假设你有一个通用的日志格式配置，但想要为每个环境指定不同的日志文件位置：

```nginx
http {
    ...
    # 定义日志格式
    log_format main '$remote_addr - $remote_user [$time_local] "$request" '
                    '$status $body_bytes_sent "$http_referer" '
                    '"$http_user_agent" "$http_x_forwarded_for"';

    # 根据环境变量选择日志文件路径
    access_log /var/log/nginx/${ENV}_access.log main;
    error_log /var/log/nginx/${ENV}_error.log;

    include /etc/nginx/conf.d/${ENV}.conf;
    ...
}
```

在这个例子中，`${ENV}` 是一个环境变量，它将被替换为实际的环境名称（如 `development`, `staging`, 或 `production`），从而改变日志文件的位置以及加载特定环境的额外配置文件。

#### 设置环境变量并启动 Nginx：

当你启动 Nginx 时，可以通过命令行传递环境变量。例如，在 Docker 或者系统服务管理器（如 systemd）中启动 Nginx 时设置环境变量：

```bash
env ENV=production nginx -g "daemon off;"
```

或者如果你使用的是 Dockerfile 或 docker-compose.yml 文件，可以在其中定义环境变量：

```dockerfile
ENV ENV=production
CMD ["nginx", "-g", "daemon off;"]
```

```yaml
# docker-compose.yml
services:
  web:
    image: nginx
    environment:
      - ENV=production
    command: nginx -g "daemon off;"
```

这种方法提供了极大的灵活性，允许你在不修改配置文件的情况下快速切换不同的环境设置。确保每次修改配置后都运行 `nginx -t` 来验证配置文件的正确性，然后再重新加载 Nginx (`nginx -s reload`) 使更改生效。

通过结合使用专门的配置文件结构和环境变量，你可以构建出既灵活又易于维护的 Nginx 配置体系。

### 注意事项

- **通配符支持**：`include` 指令可以接受通配符模式（如 `*.conf`），这允许你一次性包含多个文件。这些文件会被按照字母顺序依次处理。
- **递归限制**：虽然可以在被包含文件中再次使用 `include` 指令来包含其他文件，但是要注意避免创建循环依赖，否则会导致配置解析失败。
- **错误处理**：如果某个被包含的文件不存在或有语法错误，Nginx 将无法启动或重新加载配置。你可以使用 `nginx -t` 来测试配置的有效性。

总之，`include` 指令提供了一种灵活且强大的方式来组织和管理 Nginx 配置文件，使得大型项目的配置更加模块化和易于维护。