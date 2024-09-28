//
//  swiftui_helloApp.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/19.
//

import SwiftUI
import SwiftData

@main
struct swiftui_helloApp: App {
    // it initializes state in an app only once during the lifetime of the app.
    @State private var modelData = ModelData()
    
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)

        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()

    var body: some Scene {
        WindowGroup {
            ContentView()
        }
        .modelContainer(sharedModelContainer)
        .environment(modelData)
    }
}
