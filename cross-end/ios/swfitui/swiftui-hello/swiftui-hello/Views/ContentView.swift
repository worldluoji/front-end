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
    @State private var selection: Tab = .featured
    
    enum Tab {
        case featured
        case list
    }
    
    var body: some View {
        TabView(selection: $selection) {
            CategoryHome()
                .tabItem {
                     Label("Featured", systemImage: "star")
                 }
                .tag(Tab.featured)


            LandmarkList()
                .tabItem {
                    Label("List", systemImage: "list.bullet")
                }
                .tag(Tab.list)
        }
    }
}

#Preview {
    ContentView()
        .environment(ModelData())
}
