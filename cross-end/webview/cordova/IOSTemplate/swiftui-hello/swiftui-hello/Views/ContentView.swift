//
//  Views/ContentView.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/19.
//

import SwiftUI
import SwiftData
import KeychainSwift

struct ContentView: View {
    var body: some View {
        EvokeUIKitSheetView2()
    }
}

#Preview {
    ContentView()
        .environment(ModelData())
}
