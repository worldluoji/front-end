//
//  FavoriteButton.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/26.
//

import SwiftUI

struct FavoriteButton: View {
    @Binding var isSet: Bool
    
    var body: some View {
//        Create a Button with an action that toggles the isSet state, and that changes its appearance based on the state.
        Button {
            isSet.toggle()
        } label: {
            Label("Toggle Favorite", systemImage: isSet ? "star.fill" : "star")
                .labelStyle(.iconOnly)
                .foregroundStyle(isSet ? .yellow : .gray)
        }
    }
}

#Preview {
    FavoriteButton(isSet: .constant(true))
}
