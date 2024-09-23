//
//  Views/LandmarkList.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct LandmarkList: View {
    var body: some View {
        /* 这里是设置唯一标识为id,如果landmarks读取到的数据中，已经有了id的数据，并且Landmark已经实现了Identifiable接口，也可以不写id: \.id
        List(landmarks, id: \.id) { landmark in
            LandmarkRow(landmark: landmark)
        }
        */
        
        // You add navigation capabilities to a list by embedding it in a NavigationSplitView, and then nesting each row in a NavigationLink to set up a transtition to a destination view.
        NavigationSplitView {
            List(landmarks) { landmark in
                NavigationLink {
                    LandmarkDetail(landmark: landmark)
                } label: {
                    LandmarkRow(landmark: landmark)
                }
            }
            
            .navigationTitle("Landmarks")
        } detail: {
            Text("Select a Landmark")
        }
    }
}

#Preview {
    LandmarkList()
}
