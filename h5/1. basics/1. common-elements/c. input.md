### `<input>`类型为email/tel/url的浏览器底层验证机制对比分析

---

#### 一、核心验证逻辑差异

| **输入类型** | **验证触发条件**          | **正则表达式基准**                                                                 | **浏览器扩展规则**                                 |
|--------------|---------------------------|-----------------------------------------------------------------------------------|--------------------------------------------------|
| **email**    | 失去焦点或表单提交时      | 简版：`^[^\s@]+@[^\s@]+\.[^\s@]+$` <br>（非官方标准，浏览器实现差异大）           | - 支持国际化邮箱（如中文域名）<br>- 部分浏览器支持`multiple`属性（逗号分隔多邮箱） |
| **tel**      | 仅移动端键盘适配，无强验证| 无固定规则，默认接受任意文本                                                      | - 移动端自动弹出数字键盘<br>- 部分浏览器过滤非数字字符（如Chrome自动移除字母） |
| **url**      | 失去焦点或表单提交时      | 简版：`^(https?\|ftp):\/\/[^\s/$.?#].[^\s]*$` <br>（要求协议头和有效域名结构）       | - 自动补全协议（如输入`example.com`转为`http://example.com`）<br>- 支持`blob:`等非标准协议 |

---

#### 二、浏览器引擎实现差异

##### 1. **Email验证机制**
• **Chromium (Blink引擎)**：
  ```cpp
  // 源码片段：third_party/blink/renderer/core/html/forms/email_input_type.cc
  bool IsValidEmailAddress(const String& value) {
    // 简化的分段检查（非完整RFC 5322）
    size_t at_pos = value.find('@');
    if (at_pos == kNotFound || at_pos == 0 || at_pos == value.length() - 1)
      return false;
    
    // 域名部分必须包含点且非首尾字符
    String domain = value.Substring(at_pos + 1);
    return domain.find('.') != kNotFound && 
           domain[0] != '.' && 
           domain[domain.length() - 1] != '.';
  }
  ```
  • **特性**：允许`user@[IPv6]`格式，支持国际化邮箱（如`用户@例子.中国`）

• **Firefox (Gecko引擎)**：
  ```cpp
  // 源码片段：dom/html/HTMLInputElement.cpp
  bool IsValidEmail(const nsAString& aValue) {
    // 使用更严格的正则（排除连续点）
    static constexpr auto kEmailRegex = u"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$"_ns;
    return RegexMatcher(kEmailRegex).Matches(aValue);
  }
  ```

##### 2. **URL验证机制**
• **WebKit (Safari)**：
  ```objc
  // 源码片段：Source/WebCore/html/URLInputType.cpp
  bool isValidURL(const String& value) {
    URL url({ }, value);
    return url.isValid() && 
           !url.hasFragmentIdentifier() &&  // 忽略锚点
           (url.protocolIs("http") || url.protocolIs("https") || url.protocolIs("ftp"));
  }
  ```
  • **特性**：自动补全协议头（输入`google.com`转为`http://google.com`）

• **Edge (Chromium派生)**：
  ```cpp
  // 复用Blink规则，但增加对`mailto:`等协议的支持
  bool IsValidURL(const String& value) {
    return !KURL(value).isEmpty() && 
           value.ContainsOnlyASCIIOrEmpty();
  }
  ```

##### 3. **Tel验证机制**
• **移动端通用行为**：
  ```java
  // Android WebView实现示例
  public void onReceiveInputEvent(InputEvent event) {
    if (inputType == TYPE_PHONE) {
      // 强制弹出数字键盘
      ((InputMethodManager)context.getSystemService(INPUT_METHOD_SERVICE))
        .showSoftInput(..., InputType.TYPE_CLASS_PHONE);
    }
  }
  ```
  • **特性**：无内容验证，仅输入法适配

---

#### 三、平台特性与安全限制

| **特性**                | **email**                                  | **tel**                                    | **url**                                   |
|-------------------------|--------------------------------------------|--------------------------------------------|------------------------------------------|
| **移动端键盘类型**       | 弹出带`@`和`.com`的优化键盘                | 强制数字键盘（含`*`、`#`）                  | 弹出带`/`和`.com`的URL键盘               |
| **XSS过滤**             | 自动转义`<`、`>`等危险字符                 | 无过滤                                     | 自动移除`javascript:`协议                |
| **粘贴板限制**          | 允许粘贴非邮箱内容但标记为无效             | 允许任意粘贴                               | 自动清除`data:text/html`等危险内容       |
| **最大长度限制**        | 默认254字符（RFC 5321限制）               | 无限制（但运营商号码通常≤15位）            | 默认2083字符（IE遗留限制）               |

---

#### 四、开发者自定义验证

1. **覆盖浏览器默认规则**：
  ```html
    手机号：<input type=text pattern="[0-9]{11}" placeholder="11位手机号" required>
    <br>
    <!-- 扩展email规则（禁止某些域名） -->
    邮&nbsp;&nbsp;箱：<input type="email" placeholder="邮箱" required>
    <script>
      let emailInput = document.querySelector("input[type=email]")
      emailInput.addEventListener("change", (e) => {
        validateEmail(e.target);
      });
      function validateEmail(input) {
        const forbiddenDomains = ["example.com", "test.org"];
        if (input.value.indexOf('@') === -1) {
            console.log("请输入正确的邮箱地址");
            return;
        }
        const domain = input.value.split('@')[1];
        console.log(forbiddenDomains.includes(domain) ? "禁止域名" : "验证通过");
      }
    </script>
  ```

2. **国际化扩展**：
   ```html
   <!-- 接受带中文的email -->
   <input type="email" pattern="[\p{L}0-9._%+-]+@[\p{L}0-9.-]+\.[\p{L}]{2,}$" 
          placeholder="支持国际化邮箱">
   ```

---

#### 五、安全防御场景

| **攻击类型**          | **email防御机制**                      | **url防御机制**                          |
|-----------------------|---------------------------------------|------------------------------------------|
| XSS注入               | 自动转义输入中的HTML标签              | 阻止`javascript:`协议和非法编码           |
| 钓鱼欺骗              | 无直接防御（需结合服务端验证）         | 高亮显示完整URL（Chrome地址栏反钓鱼）     |
| 数据泄露              | 无自动加密（需配合HTTPS）             | 同源策略限制跨域请求                      |

---

#### 六、浏览器兼容性差异

| **行为**               | Chrome 103         | Firefox 102        | Safari 15.5         |
|------------------------|--------------------|--------------------|---------------------|
| **email多地址支持**    | 支持（逗号分隔）   | 仅第一个地址有效    | 不支持               |
| **tel自动格式化**      | 移除所有非数字字符 | 保留输入原样        | 保留输入原样         |
| **url协议补全**        | 自动补全`http://`  | 需手动输入协议      | 自动补全`https://`  |

---

通过分析可见，虽然三种输入类型均基于HTML5规范，但浏览器在实现细节、安全策略和国际化支持上存在显著差异。开发者需结合目标平台特性设计验证逻辑，并在关键场景（如支付、登录）中补充服务端验证。

---

## input事件和change事件的区别
- input 事件​​：在 `<input>` 或 `<textarea>` 的值​​每次发生变化时立即触发​​（实时触发）。
- change 事件​:​	在元素​​失去焦点后​​，且值​​确实发生了变化​​时触发（非实时）。

### 使用场景
​​input 事件​​	
- 实时搜索（输入时立即发送请求）
- 输入时动态计算（如密码强度提示）
- 输入内容实时验证（如字符数限制）
​​
change 事件​​	
- 表单提交前的最终验证（如邮箱格式检查）
- 文件上传（`<input type="file">` 选择文件后触发）
- 下拉选择（`<select>` 选项变化时）

---

## references
https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input