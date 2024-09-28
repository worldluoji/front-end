//
//  ProfileHost.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/28.
//

import SwiftUI

struct ProfileHost: View {
    @Environment(ModelData.self) var modelData
    @Environment(\.editMode) var editMode
    @State private var draftProfile = Profile.default
    
    var body: some View {
        HStack {
            Spacer()
            EditButton()
        }
        .padding()
        
        VStack(alignment: .leading, spacing: 20) {
            if editMode?.wrappedValue == .inactive {
               ProfileSummary(profile: modelData.profile)
            } else {
               Text("Profile Editor")
            }
        }
        .padding()
    }
}

#Preview {
    ProfileHost()
        .environment(ModelData())
}
