# 为整合后的工程添加现成的cordova插件

**第一步，拷贝原生插件ObjectC文件到IOS工程**

在cordova工程中，我们使用
```
cordova plugin add xxx
```
就能生成一个插件，这个插件最终会在

<img src="./cordova plugin dir.png" />

中Plugins文件夹中，包含所有插件的实现文件。我们只需要把Plugins文件夹中需要的插件，拖拽拷贝到IOS项目中根目录下的主工程的目录的plugins目录，添加时选中Copy items if needed选项，以后添加插件就只需要把插件的独立文件夹拷贝到新项目的Plugins文件夹中。

比如，现在在cordova工程中有添加了两个插件
```
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-inappbrowser
```
我们把它们拷贝到xcode的主工程目录的plugins目录下

<img src="./add plugins.png" />

注意，这里添加到IOS工程时，要选"create groups"


**第二步，拷贝插件js文件到IOS工程**

将 cordova工程的 platforms/ios/www/plugins下的 cordova-plugin-camera 和 cordova-plugin-inappbrowser 拷贝到 ios工程的 www/plugins下。

<img src="./add plugin js.png" />

同时还要将 platforms/ios/www/cordova_plugins.js 里插件相关内容添加 IOS工程的 www/cordova_plugins.js 中去。

**第三步，在config.xml中添加注册信息**

参考标准cordova项目中的config.xml文件内容变化，将相应插件的注册语句拷贝到新项目的config.xml文件中的指定位置，就注册成功了，在网页中就能随意调用了。

```xml
<!-- config.xml -->

<!-- 注册Camera和InAppBrowser组件, 对应上面添加的两个插件 -->
<feature name="Camera">
    <param name="ios-package" value="CDVCamera" />
</feature>
<feature name="InAppBrowser">
    <param name="ios-package" value="CDVWKInAppBrowser" />
    <param name="onload" value="true" />
</feature>

<preference name="CameraUsesGeolocation" value="false" />
```

**第四步, 在Bridging header中添加头信息**
这是为了swift工程可以使用。
```c
#ifndef helloS_Bridging_Header_h
#define helloS_Bridging_Header_h

#import <UIKit/UIkit.h>
#import <Cordova/CDVViewController.h>
#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVCommandQueue.h>
#import "CDVCamera.h" // 新增摄像头组件头, 其它组件的头文件按需导入即可

@interface CordovaViewController: CDVViewController

@end

#endif /* helloS_Bridging_Header_h */
```

完成后的 demo 参考 addPluginDemo

<br>

## reference
- https://www.hangge.com/blog/cache/detail_1160.html