//
//  HikeBandage.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/28.
//

import SwiftUI

struct HikeBandage: View {
    var name: String
    var body: some View {
        VStack(alignment: .center) {
            Badge()
                .frame(width: 300, height: 300)
                .scaleEffect(1.0 / 3.0)
                .frame(width: 100, height: 100)
            Text(name)
                .font(.caption)
                .accessibilityLabel("Badge for \(name).")
        }
    }
}

#Preview {
    HikeBandage(name: "test")
}
