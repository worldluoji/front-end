//
//  SimpleVerifyPlugin.swift
//  helloS
//
//  Created by Luke-Surface-mac on 2024/9/11.
//

// 导入了 Foundation 框架，这个框架提供了许多基本的类和函数，用于处理字符串、数组、字典等常见的数据类型，以及文件操作、日期和时间处理等功能。
import Foundation

// 定义了一个名为SimpleVerifyPlugin的类，它继承自CDVPlugin。@objc(HWPHanggeSwiftPlugin)的标记表示这个类在 Objective-C 中的名称为SimpleVerifyPlugin。
@objc(SimpleVerifyPlugin) class SimpleVerifyPlugin : CDVPlugin {
     
    //验证口令方法。接受一个参数command，类型为CDVInvokedUrlCommand。这个参数可能包含了调用这个方法的相关信息，比如传入的参数等。
    @objc(verifyPassword:)
    func verifyPassword(command:CDVInvokedUrlCommand) {
        NSLog("enter into verrify password");
        //返回结果
        var pluginResult:CDVPluginResult?
        
        //获取参数
        let password = command.arguments[0] as? String
         
        //开始验证
        if password == nil || password == "" {
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR,
                                           messageAs: "口令不能为空")
        } else if password != "test123456" {
            // 这里仅做测试使用，实际不能这么做
            pluginResult = CDVPluginResult(status: CDVCommandStatus_ERROR,
                                           messageAs: "口令不正确")
        } else {
            pluginResult = CDVPluginResult(status:CDVCommandStatus_OK)
        }
         
        //发送结果，调用commandDelegate的send方法，将验证结果pluginResult发送回调用方，使用command的callbackId来标识这个回调。这使得调用这个插件方法的代码可以在结果返回时进行相应的处理。
        self.commandDelegate.send(pluginResult, callbackId: command.callbackId)
    }
}
