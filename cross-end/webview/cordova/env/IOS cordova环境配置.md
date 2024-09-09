# IOS cordova环境配置

https://cordova.apache.org/docs/en/12.x/guide/platforms/ios/index.html

一般按照上述步骤即可。有如下ß注意事项：

## 解决CocoaPods安装问题
在安装 cocoapods 这一步，需要用到gem，但是会遇到网络问题。

可以通过配置国内镜像源来解决`sudo gem update --system`报网络错误的问题。

但建议直接使用brew安装 CocoaPods
```zsh
brew install CococaPods
```
最后可以把ruby环境变量加入
```zsh
echo 'export PATH="/usr/local/opt/ruby@3.3/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
```