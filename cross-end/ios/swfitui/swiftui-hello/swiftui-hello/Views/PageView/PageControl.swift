//
//  PageControl.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/29.
//

import SwiftUI
import UIKit


// UIViewRepresentable and UIViewControllerRepresentable types have the same life cycle, with methods that correspond to their underlying UIKit types.
struct PageControl: UIViewRepresentable {
    var numberOfPages: Int
    @Binding var currentPage: Int

    func makeCoordinator() -> Coordinator {
        Coordinator(self)
    }

    func makeUIView(context: Context) -> UIPageControl {
        let control = UIPageControl()
        control.numberOfPages = numberOfPages
        
        // Add the coordinator as the target for the valueChanged event, specifying the updateCurrentPage(sender:) method as the action to perform.
        control.addTarget(
            context.coordinator,
            action: #selector(Coordinator.updateCurrentPage(sender:)),
            for: .valueChanged)
        
        return control
    }


    func updateUIView(_ uiView: UIPageControl, context: Context) {
        uiView.currentPage = currentPage
    }
    
    class Coordinator: NSObject {
        var control: PageControl


        init(_ control: PageControl) {
            self.control = control
        }


        @objc
        func updateCurrentPage(sender: UIPageControl) {
            control.currentPage = sender.currentPage
        }
    }
}
