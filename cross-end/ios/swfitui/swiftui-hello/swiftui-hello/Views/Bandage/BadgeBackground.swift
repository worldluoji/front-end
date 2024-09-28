//
//  BadgeBackground.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/26.
//

import SwiftUI

struct BadgeBackground: View {
    var body: some View {
        // Wrap the path in a GeometryReader so the badge can use the size of its containing view, which defines the size instead of hard-coding the value (100).
        GeometryReader { geometry in
            // You use paths to combine lines, curves, and other drawing primitives to form more complex shapes like the badge’s hexagonal background.
            Path { path in
                // assuming a container with size 100 x 100 px.
                var width: CGFloat = min(geometry.size.width, geometry.size.height)
                let height = width
                
                let xScale: CGFloat = 0.832
                let xOffset = (width * (1.0 - xScale)) / 2.0
                width *= xScale
                
                // The move(to:) method moves the drawing cursor within the bounds of a shape as though an imaginary pen or pencil is hovering over the area, waiting to start drawing.
                path.move(
                    to: CGPoint(
                        x: width * 0.95 + xOffset,
                        y: height * (0.20 + HexagonParameters.adjustment)
                    )
                )
                
                // Draw the lines for each point of the shape data to create a rough hexagonal shape.
                HexagonParameters.segments.forEach { segment in
                    // The addLine(to:) method takes a single point and draws it. Successive calls to addLine(to:) begin a line at the previous point and continue to the new point.
                    path.addLine(
                        to: CGPoint(
                            x: width * segment.line.x + xOffset,
                            y: height * segment.line.y
                        )
                    )
                    
                    // Use the addQuadCurve(to:control:) method to draw the Bézier curves for the badge’s corners.
                    path.addQuadCurve(
                        to: CGPoint(
                            x: width * segment.curve.x + xOffset,
                            y: height * segment.curve.y
                        ),
                        control: CGPoint(
                            x: width * segment.control.x + xOffset,
                            y: height * segment.control.y
                        )
                    )
                }
            }
            .fill(.linearGradient(
                 Gradient(colors: [Self.gradientStart, Self.gradientEnd]),
                 startPoint: UnitPoint(x: 0.5, y: 0),
                 endPoint: UnitPoint(x: 0.5, y: 0.6)
             ))
        }
    }
    static let gradientStart = Color(red: 239.0 / 255, green: 120.0 / 255, blue: 221.0 / 255)
    static let gradientEnd = Color(red: 239.0 / 255, green: 172.0 / 255, blue: 120.0 / 255)
}

#Preview {
    BadgeBackground()
}
