//
//  Views/MapView.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import SwiftUI
import MapKit

struct MapView: View {
    // 这里加入了变量，就比如要传参
    var coordinate: CLLocationCoordinate2D
    
    var body: some View {
//        Map(initialPosition: .region(region))
        /*
         Change the map’s initializer to one that takes a position input so that it updates when the value changes.

         This new initializer expects a Binding to a position, which is a bidirectional connection to the value. Use a .constant() binding here because MapView doesn’t need to detect when someone changes the position by interacting with the map.
         */
        Map(position: .constant(.region(region)))
    }
    
    private var region: MKCoordinateRegion {
        MKCoordinateRegion(
            center: coordinate,
            span: MKCoordinateSpan(latitudeDelta: 0.2, longitudeDelta: 0.2)
        )
    }
}

#Preview {
    MapView(coordinate: CLLocationCoordinate2D(latitude: 34.011_286, longitude: -116.166_868))
}
