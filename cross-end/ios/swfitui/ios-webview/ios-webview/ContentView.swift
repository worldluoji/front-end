//
//  ContentView.swift
//  ios-webview
//
//  Created by Luke-Surface-mac on 2024/10/10.
//

import SwiftUI

struct ContentView: View {
    @State private var message: String?
    
    var body: some View {
        VStack {
            if let message = message {
                Text("Received from H5: \(message)")
            }
            
            WebView(url: URL(string: "http://127.0.0.1:8091/")!, message: $message)
                .edgesIgnoringSafeArea(.all)
        }
    }
}

#Preview {
    ContentView()
}
