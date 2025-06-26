# 解决浏览器自动将http转化为https的问题
TestCafe 打开某些版本的Chrome浏览器时，Chrome浏览器会自动将 HTTP 站点升级为 HTTPS 站点。可能测试环境根本没有https，导致用例执行失败。

解决方案：通过 TestCafe 配置禁用 Chrome 的 HTTPS 升级

在启动命令中添加 Chrome 实验性参数，关闭自动升级功能：

```bash
testcafe "chrome --disable-features=HttpsUpgrades" tests/
```
--disable-features=HtsUpgrades：显式关闭 HTTPS 自动升级。
​适用场景​：临时测试 HTTP 站点。

目前edge没有发现有问题。