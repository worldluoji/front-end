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
            if editMode?.wrappedValue == .active {
                Button("Cancel", role: .cancel) {
                    // 点击取消，实际没有修改modelData.profile
                    draftProfile = modelData.profile
                    editMode?.animation().wrappedValue = .inactive
                }
            }
            Spacer()
            EditButton()
        }
        .padding()
        
        VStack(alignment: .leading, spacing: 20) {
            if editMode?.wrappedValue == .inactive {
                ProfileSummary(profile: modelData.profile)
            } else {
                ProfileEditor(profile: $draftProfile)
                    .onAppear {
                        draftProfile = modelData.profile
                    }
                    .onDisappear {
                        modelData.profile = draftProfile
                    }
            }
        }
        .padding()
    }
}

#Preview {
    ProfileHost()
        .environment(ModelData())
}
