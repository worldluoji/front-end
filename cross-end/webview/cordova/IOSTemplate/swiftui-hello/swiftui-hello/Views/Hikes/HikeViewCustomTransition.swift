//
//  HikeViewCustomTransition.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/27.
//

import SwiftUI

// Customize view transitions
extension AnyTransition {
    static var moveAndFade: AnyTransition {
        // Use the asymmetric(insertion:removal:) modifier to provide different transitions for when the view appears and disappears.
        .asymmetric(
            insertion: .move(edge: .trailing).combined(with: .opacity),
            removal: .scale.combined(with: .opacity)
        )
    }
}

struct HikeViewCustomTransition: View {
    var hike: Hike
    @State private var showDetail = false

    var body: some View {
        VStack {
            HStack {
                HikeGraph(hike: hike, path: \.elevation)
                    .frame(width: 50, height: 30)

                VStack(alignment: .leading) {
                    Text(hike.name)
                        .font(.headline)
                    Text(hike.distanceText)
                }

                Spacer()

                Button {
                    // default animation
                    withAnimation() {
                        showDetail.toggle()
                    }
                } label: {
                    Label("Graph", systemImage: "chevron.right.circle")
                        .labelStyle(.iconOnly)
                        .imageScale(.large)
                        .rotationEffect(.degrees(showDetail ? 90 : 0))
                        .scaleEffect(showDetail ? 1.5 : 1) //  make the button larger when the graph is visible.
                        .padding()
                }
            }

            if showDetail {
                HikeDetail(hike: hike)
                    .transition(.moveAndFade)
            }
        }
    }
}

#Preview {
    VStack {
        HikeViewCustomTransition(hike: ModelData().hikes[0])
            .padding()
        Spacer()
    }
}
