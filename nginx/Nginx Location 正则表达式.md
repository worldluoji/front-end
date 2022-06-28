# Nginx Location 正则表达式
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

