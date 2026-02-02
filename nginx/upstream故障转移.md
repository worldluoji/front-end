Nginx 的 upstream 模块有智能的健康检查和故障转移机制，行为比这两种简单的理解更复杂。

## 实际工作原理

### 1. **请求流程示例**

```nginx
upstream backend {
    server 192.168.1.10:80 max_fails=3 fail_timeout=30s;
    server 192.168.1.20:80 backup;
}
```

**情况一：主服务器正常时**
```
客户端请求 -> Nginx -> 主服务器(192.168.1.10) -> 响应客户端
```

**情况二：主服务器开始故障时**（假设连续3个请求失败）
```
请求1 -> 主服务器 -> 失败
请求2 -> 主服务器 -> 失败
请求3 -> 主服务器 -> 失败
请求4 -> 备份服务器(192.168.1.20) -> 成功
请求5 -> 备份服务器(192.168.1.20) -> 成功
...
```

**情况三：主服务器恢复后**（30秒后）
```
请求N+1 -> 主服务器 -> 成功
后续请求 -> 主服务器（恢复正常路由）
```

### 2. **健康检查与状态切换**

Nginx 会跟踪每个服务器的状态：

```nginx
# 服务器状态转换
server 主服务器: 健康(active) → 失败(failing) → 不可用(unavailable) → 恢复中(checking) → 健康(active)
```

## 详细配置解析

### 配置参数决定行为：

```nginx
upstream backend {
    # 参数说明：
    # max_fails=3: 连续失败3次后标记为不可用
    # fail_timeout=30s: 失败后30秒内不转发请求
    # backup: 备份服务器，只有所有主服务器都不可用时才使用
    server 192.168.1.10:80 max_fails=3 fail_timeout=30s weight=5;
    server 192.168.1.11:80 max_fails=3 fail_timeout=30s weight=5;
    server 192.168.1.20:80 backup;
    
    # 负载均衡算法
    # least_conn;  # 最少连接数
    # ip_hash;     # IP哈希
    # random;      # 随机
}
```

### 三种不同的故障转移策略：

#### 策略1：**被动健康检查**（默认）
```nginx
upstream backend {
    server 192.168.1.10:80 max_fails=3 fail_timeout=30s;
    server 192.168.1.20:80 backup;
}
```
**行为**：
- 每次请求都相当于一次健康检查
- 连续失败3次后，标记为不可用30秒
- 30秒内所有新请求都直接发给备份服务器
- 30秒后，第一个新请求会尝试主服务器（测试是否恢复）

#### 策略2：**主动健康检查**（需要商业版或第三方模块）
```nginx
upstream backend {
    server 192.168.1.10:80;
    server 192.168.1.20:80;
    
    # 商业版Nginx Plus功能
    health_check interval=5s fails=3 passes=2;
}
```
**行为**：
- 定期（5秒）主动发送健康检查请求
- 检测到故障后立即切换到备份服务器
- 恢复时自动切换回主服务器

#### 策略3：**即时重试**（通过 `proxy_next_upstream`）
```nginx
upstream backend {
    server 192.168.1.10:80;
    server 192.168.1.20:80;
}

location / {
    proxy_pass http://backend;
    proxy_next_upstream error timeout http_500 http_502;
    proxy_next_upstream_tries 2;  # 最多尝试2个服务器
}
```
**行为**：
- 对**当前请求**立即重试另一个服务器
- 不改变服务器健康状态
- 下次请求可能还会先尝试主服务器

## 实际测试示例

让我们用一个实际的例子来说明：

```nginx
# test.conf
http {
    upstream backend {
        # 主服务器（端口8080，我们会启动）
        server 127.0.0.1:8080 max_fails=2 fail_timeout=10s;
        # 备份服务器（端口8081，也会启动）
        server 127.0.0.1:8081 backup;
    }
    
    # 主服务
    server {
        listen 8080;
        location / {
            # 前5个请求正常，之后模拟故障
            if ($request_id ~ "^[1-5]-") {
                return 200 "Primary: OK\n";
            }
            return 502 "Primary: Error\n";
        }
    }
    
    # 备份服务
    server {
        listen 8081;
        location / {
            return 200 "Backup: Always OK\n";
        }
    }
    
    # 代理服务
    server {
        listen 80;
        
        location / {
            proxy_pass http://backend;
            proxy_next_upstream error timeout http_500 http_502;
            
            add_header X-Upstream-Addr $upstream_addr;
            add_header X-Upstream-Status $upstream_status;
        }
    }
}
```

**测试脚本**：
```bash
#!/bin/bash
echo "发送10个请求："
for i in {1..10}; do
    echo -n "请求 $i: "
    curl -s -H "X-Request-ID: $i-" http://localhost/
    sleep 0.5
done
```

**预期输出**：
```
请求 1: Primary: OK
请求 2: Primary: OK
请求 3: Primary: OK
请求 4: Primary: OK
请求 5: Primary: OK
请求 6: Primary: Error
请求 7: Primary: Error
请求 8: Backup: Always OK  # 主服务器被标记为不可用
请求 9: Backup: Always OK
请求 10: Backup: Always OK
```

## 回答你的问题

**你的两种理解都不完全正确**：

1. ❌ **不是"每个请求来都会先请求主，失败后再请求备"**
   - 只有主服务器**健康时**才会先请求主
   - 主服务器**被标记为不可用期间**，请求会直接发给备份服务器

2. ❌ **不是"只要触发切换到备份地址，后面都会请求备了"**
   - 切换是**临时的**（由 `fail_timeout` 控制）
   - 超时后会自动尝试恢复主服务器
   - 恢复成功后会继续使用主服务器

## 正确的理解

**Nginx upstream 的工作流程是**：

```
正常状态：
  请求 → 主服务器
  （主服务器健康检查通过）

故障检测：
  请求 → 主服务器 → 失败（计数+1）
  （连续失败达到 max_fails 次）

故障状态（持续 fail_timeout 秒）：
  请求 → 备份服务器
  （主服务器被临时标记为不可用）

恢复尝试：
  fail_timeout 后，第一个请求 → 主服务器
  （测试是否恢复）

恢复成功：
  请求 → 主服务器
  （回到正常状态）
```

## 建议的最佳实践

```nginx
upstream backend {
    # 至少2个主服务器，避免单点
    server 192.168.1.10:80 max_fails=3 fail_timeout=30s;
    server 192.168.1.11:80 max_fails=3 fail_timeout=30s;
    
    # 备份服务器
    server 192.168.1.20:80 backup;
    
    # 更平滑的故障转移
    proxy_next_upstream error timeout http_500 http_502 http_503 http_504;
    proxy_next_upstream_tries 3;
    proxy_next_upstream_timeout 10s;
}
```

**总结**：Nginx 的故障转移是**智能的、临时的、可恢复的**，既不是每个请求都重试，也不是永久切换，而是一个基于健康检查的动态负载均衡机制。