//
//  Views/CircleImage.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI

struct CircleImage: View {
    var image: Image
    
    var body: some View {
        // shanchuan.jpg已经import到了Assets中
        image
           .clipShape(Circle())
           .overlay {
               Circle().stroke(.white, lineWidth: 4)
           }
           .shadow(radius: 7)
    }
}

#Preview {
    CircleImage(image: Image("turtlerock"))
}
