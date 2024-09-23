//
//  CircleImage.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct CircleImage: View {
    var body: some View {
        // shanchuan.jpg已经import到了Assets中
        Image("shanchuan")
            .frame(width: 350, height: 350)
            .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/) // Add a call to clipShape(Circle()) to apply the circular clipping shape to the image.
            .overlay {
                // Create another circle with a gray stroke, and then add it as an overlay to give the image a border.
                Circle().stroke(.gray, lineWidth: 4)
            }
            .shadow(radius: 7) // add a shadow with a 7 point radius.
            .padding()
    }
}

#Preview {
    CircleImage()
}
