//
//  Views/EvokeUIKitSheetView2.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct EvokeUIKitSheetView2: View {
    var body: some View {
        NavigationStack {
            VStack {
                NavigationLink(destination: MyUIKitViewControllerWrapper2()) {
                    Text("Go to UIKit View")
                }
            }
//            .navigationTitle("SwiftUI View")
        }
    }
}

// 使用 UIViewControllerRepresentable 包装 UIKit 视图控制器
struct MyUIKitViewControllerWrapper2: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> ViewController {
        return ViewController()
    }
    
    func updateUIViewController(_ uiViewController: ViewController, context: Context) {
        // 更新视图控制器的状态（如果需要）
    }
}


#Preview {
    EvokeUIKitSheetView2()
}
