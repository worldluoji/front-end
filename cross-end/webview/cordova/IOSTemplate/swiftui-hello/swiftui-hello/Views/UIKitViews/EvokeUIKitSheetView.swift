//
//  Views/EvokeUIKitSheetView.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct EvokeUIKitSheetView: View {
    @State private var showUIKitView = false
    
    var body: some View {
        NavigationView {
            VStack {
                // 字体颜色
                VStack {
                    // 默认就是居中的
                    Text("This is a SwiftUI View")
                        .font(.title)
                    .foregroundColor(.blue)
                }
                .padding() // 两侧留出一点空隙
                
                Divider() // 分割线
                
                Button(action: {
                    self.showUIKitView = true
                }) {
                    Text("Go to UIKit View")
                        .padding()
                        .background(Color.blue)
                        .foregroundColor(.white)
                        .cornerRadius(8)
                }
                // .sheet上面会空出一点灰色的东东
                .fullScreenCover(isPresented: $showUIKitView, content: {
                    MyUIKitViewControllerWrapper()
                })
                
                Spacer()
            }
            .navigationTitle("Mixed UI")
        }
    }
}

// 使用 UIViewControllerRepresentable 包装 UIKit 视图控制器
struct MyUIKitViewControllerWrapper: UIViewControllerRepresentable {
    func makeUIViewController(context: Context) -> ViewController {
        return ViewController()
    }
    
    func updateUIViewController(_ uiViewController: ViewController, context: Context) {
        // 更新视图控制器的状态（如果需要）
    }
}

#Preview {
    EvokeUIKitSheetView()
}
