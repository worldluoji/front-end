//
//  ContentView.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/19.
//

import SwiftUI
import SwiftData
import KeychainSwift

struct ContentView: View {
    @State private var showUIKitView = false

    var body: some View {
        NavigationView {
            VStack {
                MapView()
                    .frame(height: 300)
                // 字体颜色
                VStack {
                    // 默认就是居中的
                    Text("This is a SwiftUI View")
                        .font(.title)
                    .foregroundColor(.blue)
                    
                    CircleImage()
                      .offset(y: -280)
                      .padding(.bottom, -280)
                    
                    HStack {
                        Text("Using HStack in horizental dir")
                        // A spacer expands to make its containing view use all of the space of its parent view, instead of having its size defined only by its contents.
                        Spacer()
                        Text("OK")
                    }
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
                .sheet(isPresented: $showUIKitView, content: {
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
    ContentView()
}
