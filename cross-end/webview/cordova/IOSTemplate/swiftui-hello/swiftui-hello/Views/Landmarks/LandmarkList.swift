//
//  Views/LandmarkList.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct LandmarkList: View {
    @Environment(ModelData.self) var modelData
    @State private var showFavoritesOnly = false
    
    var body: some View {
        /* 这里是设置唯一标识为id,如果landmarks读取到的数据中，已经有了id的数据，并且Landmark已经实现了Identifiable接口，也可以不写id: \.id
        List(landmarks, id: \.id) { landmark in
            LandmarkRow(landmark: landmark)
        }
        */
        
        // You add navigation capabilities to a list by embedding it in a NavigationSplitView, and then nesting each row in a NavigationLink to set up a transtition to a destination view.
        NavigationSplitView {
            List() {
                // Toggle能自动更新showFavoritesOnly的值
                Toggle(isOn: $showFavoritesOnly) {
                    Text("Favorites only")
                }
                // To combine static and dynamic views in a list, or to combine two or more different groups of dynamic views, use the ForEach type instead of passing your collection of data to List.
                ForEach(filteredLandmarks) { landmark in
                    NavigationLink {
                        LandmarkDetail(landmark: landmark)
                    } label: {
                        LandmarkRow(landmark: landmark)
                    }
                }
            }
            .animation(.default, value: filteredLandmarks) // Improve the filtering animation by adding an animation(_:) modifier that begins when the filteredLandmarks value changes.
            .navigationTitle("Landmarks")
        } detail: {
            Text("Select a Landmark")
        }
    }
    
    // filter用法
    var filteredLandmarks: [Landmark] {
        modelData.landmarks.filter { landmark in
            (!showFavoritesOnly || landmark.isFavorite)
        }
    }
}

#Preview {
    LandmarkList()
        .environment(ModelData())
}
