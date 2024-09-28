//
//  EmbededUIKitView.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct EmbededUIKitView: View {
    var body: some View {
        NavigationView {
            VStack {
                HStack {
                    Text("This is a SwiftUI View")
                }
                
                // 显示 UIKit 视图控制器
                MyUIKitViewControllerWrapper()
            }
            .navigationTitle("Mixed UI")
        }
    }
}

// 使用 UIViewControllerRepresentable 包装 UIKit 视图控制器
struct MyUIKitViewControllerWrapper3: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> ViewController {
        return ViewController()
    }
    
    func updateUIViewController(_ uiViewController: ViewController, context: Context) {
        // 更新视图控制器的状态（如果需要）
    }
}

#Preview {
    EmbededUIKitView()
}
