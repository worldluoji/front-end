# nginx location
```
Syntax: location [ = | ~ | ~* | ^~ ] uri { ... }
location @name { ... }
Default: —
Context: server, location
```

## location正则表达式书写示例：

1. 等号（=）
   
表示完全匹配规则才执行操作
```
location = /index {
    [ configuration A ]    
}
```
URL为 http://{domain_name}/index 时，才会执行配置中操作。

2. 波浪号（~）

表示执行正则匹配，但区分大小写
```
location ~ /page/\d{1,2} {
    [ configuration B ]
}
```
URL 为 http://{domain_name}/page/1 匹配结尾数字为1-99时，配置生效。

3. 波浪号与星号（~*）

表示执行正则匹配，但不区分大小写
```
location ~* /\.(jpg|jpeg|gif) {
    [ configuration C ]
}
```
匹配所有url以jpg、jpeg、gif结尾时，配置生效。

4. 脱字符与波浪号（^~）

表示普通字符匹配，前缀匹配有效，配置生效
```
location ^~ /images/ {
[ cofigurations D ]
}
```
URL 为 http://{domain_name}/images/1.gif 时，配置生效。

5. @

定义一个location，用于处理内部重定向
```
location @error {
    proxy_pass http://error;
}
error_page 404 @error;
```

<br>

## 各字符有效优先级
= > ^~ > ~/~*

以上规则简单总结就是优先级从高到低依次为（序号越小优先级越高）：
```
1. location =    # 精准匹配
2. location ^~   # 带参前缀匹配
3. location ~    # 正则匹配（区分大小写）
4. location ~*   # 正则匹配（不区分大小写）
5. location /a   # 普通前缀匹配，优先级低于带参数前缀匹配。
6. location /    # 任何没有匹配成功的，都会匹配这里处理
```
当(~/~*)中有多个正则匹配时，选择正则表达式最长的配置执行。

<br>

### 示例1

在Nginx配置中，如果同时存在 `location ^~ /static/` 和 `location ^~ /static/test/` 这两个规则，并且你尝试访问 `/static/test/1.png`，那么更具体的前缀匹配规则将会被应用。因此，请求 `/static/test/1.png` 将会匹配到 `location ^~ /static/test/` 这个块。

Nginx在处理location指令时，会按照从上至下、从最具体到最通用的顺序进行匹配。具体到这个例子中，`/static/test/` 是 `/static/` 前缀的子集，因此它是一个更加具体的匹配。当Nginx遇到这样的配置时，它会选择最长前缀匹配的规则，这意味着 `/static/test/1.png` 请求将由 `location ^~ /static/test/` 处理。

简而言之，请求 `/static/test/1.png` 会匹配到 `location ^~ /static/test/`。

<br>

### 示例2
在Nginx配置中，如果同时存在 `location ^~ /static/` 和 `location ~ /static/test/(\d+.png)` 这两个规则，并且尝试访问 `/static/test/1.png`，那么 `location ~ /static/test/(\d+.png)` 这个正则表达式匹配的规则将会被应用。

尽管 `^~` 修饰符给予了其所在的前缀匹配规则高优先级，避免被其他不带 `^~` 的正则表达式所覆盖，但是当存在另一个同样带有 `^~` 修饰符的更具体（这里是通过正则表达式定义）的location块时，Nginx会按照最精确匹配的原则来选择。在这个例子中，`location ~ /static/test/(\d+.png)` 是一个精确匹配以 `/static/test/` 开头并且以数字加`.png` 结尾的请求，因此它比仅仅是前缀匹配的 `location ^~ /static/` 更具针对性。

总结来说，对于请求 `/static/test/1.png`，将会匹配到 `location ~ /static/test/(\d+.png)` 这个规则，因为它提供了对URL模式的更精确描述。