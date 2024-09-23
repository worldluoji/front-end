//
//  Landmark.swift
//  swiftui-hello
//
//  Created by 罗家懿 on 2024/9/23.
//

import Foundation
import SwiftUI
import CoreLocation

// Adding Codable conformance makes it easier to move data between the structure and a data file. You’ll rely on the Decodable component of the Codable protocol later in this section to read data from file.
struct Landmark: Hashable, Codable {
    var id: Int
    var name: String
    var park: String
    var state: String
    var description: String
    
    // You make the property private because users of the Landmarks structure care only about the image itself.
    private var imageName: String
    
    var image: Image {
        Image(imageName)
    }
    
    private var coordinates: Coordinates
    // 结构体嵌套
    struct Coordinates: Hashable, Codable {
        var latitude: Double
        var longitude: Double
    }
    
    var locationCoordinate: CLLocationCoordinate2D {
       CLLocationCoordinate2D(
            latitude: coordinates.latitude,
            longitude: coordinates.longitude)
    }
}
