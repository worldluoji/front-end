# 注意事项
## 1.  cordova版本和gradle版本、Android SDK版本有匹配关系，具体见：

https://cordova.apache.org/docs/en/12.x/guide/platforms/android/index.html


## 2.  环境变量需要配置，否则cordova无法识别
```shell
# macos .zshrc
export JAVA_HOME=/usr/local/opt/openjdk@17
export ANDROID_HOME=/Users/luke-surface-mac/dev/android-sdk
export PATH=$PATH:$ANDROID_HOME/platform-tools/
export PATH=$PATH:$ANDROID_HOME/cmdline-tools/latest/bin/
export PATH=$PATH:$ANDROID_HOME/build-tools
export PATH=$PATH:$ANDROID_HOME/emulator/
export PATH="/usr/local/opt/gradle@7/bin:$PATH"
export GRADLE_HOME="/usr/local/opt/gradle@7"
export CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL=https://mirrors.cloud.tencent.com/gradle/gradle-8.7-bin.zip
```
这里 CORDOVA_ANDROID_GRADLE_DISTRIBUTION_URL 指定的是 gradle distribution url的地址，改成了腾讯云，防止超时的问题。


## 3. run之前检测环境是否ok
```shell
cordova requirements
```