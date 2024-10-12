//
//  PageViewController.swift
//  swiftui-hello
//
//  Created by Luke-Surface-mac on 2024/9/29.
//

import SwiftUI
import UIKit

// PageViewController 是一个泛型结构体，其中 Page 必须符合 View 协议
struct PageViewController<Page: View>: UIViewControllerRepresentable {
    // pages 是一个数组，包含所有要显示的页面（每个元素都是一个符合 View 协议的视图）。
    var pages: [Page]

    // currentPage 是一个绑定变量，用于跟踪当前显示的是哪个页面
    @Binding var currentPage: Int
    
    // SwiftUI calls this makeCoordinator() method before makeUIViewController(context:), so that you have access to the coordinator object when configuring your view controller.
    // 协调器的作用是在 UIPageViewController 和 PageViewController 之间传递信息。
    func makeCoordinator() -> Coordinator {
        // 这里其实就是把当前PageViewController传入到协调器的init方法
        Coordinator(self)
    }
    
    // 创建并返回一个 UIPageViewController 实例。
    func makeUIViewController(context: Context) -> UIPageViewController {
        let pageViewController = UIPageViewController(
            transitionStyle: .scroll,
            navigationOrientation: .horizontal)
        
        // 将协调器设置为 UIPageViewController 的数据源和委托。
        pageViewController.dataSource = context.coordinator
        pageViewController.delegate = context.coordinator
        
        return pageViewController
    }
    
    /*
        updateUIViewController(_:context:) 方法会在 currentPage 绑定变量改变时被触发。在 SwiftUI 中，当你使用 @Binding 来创建一个双向绑定时，每当这个绑定的值发生变化时，SwiftUI 会自动调用 updateUIViewController(_:context:) 方法来更新与之关联的 UIViewController。
        具体来说，在你的 PageViewController 结构体中，currentPage 是一个 @Binding 变量。这意味着它是一个可以从外部更新的绑定。当外部代码（比如用户交互或状态变化）改变了 currentPage 的值时，SwiftUI 会检测到这个变化，并调用 updateUIViewController(_:context:) 方法来更新 UIPageViewController 的当前显示页面。
    */
    func updateUIViewController(_ pageViewController: UIPageViewController, context: Context) {
        pageViewController.setViewControllers(
            [context.coordinator.controllers[currentPage]], direction: .forward, animated: true)
    }
    
    // SwiftUI manages your UIViewControllerRepresentable type’s coordinator, and provides it as part of the context when calling the methods you created above.
    class Coordinator: NSObject, UIPageViewControllerDataSource, UIPageViewControllerDelegate {
        var parent: PageViewController
        var controllers = [UIViewController]()


        init(_ pageViewController: PageViewController) {
            parent = pageViewController
            // 存储了从 pages 转换来的 UIHostingController 实例数组。UIHostingController 是 SwiftUI 提供的一个特殊的 UIViewController 子类，它的主要作用是将一个 SwiftUI 视图（遵循 View 协议）包装成一个可以被 UIKit 管理的视图控制器。这样就可以在基于 UIKit 的应用程序中使用 SwiftUI 视图了。
            controllers = parent.pages.map { UIHostingController(rootView: $0) }
        }
        
        // 这两个方法是 UIPageViewControllerDataSource 协议所要求实现的方法。它们负责处理页面之间的切换逻辑，即当用户滑动时，如何获取前一个或后一个视图控制器。如果当前视图控制器位于数组的开始或结束位置，则分别返回最后一个或第一个视图控制器，从而实现循环滚动的效果。
        func pageViewController(
                    _ pageViewController: UIPageViewController,
                    viewControllerBefore viewController: UIViewController) -> UIViewController?
        {
            guard let index = controllers.firstIndex(of: viewController) else {
                return nil
            }
            if index == 0 {
                return controllers.last
            }
            return controllers[index - 1]
        }


        func pageViewController(
            _ pageViewController: UIPageViewController,
            viewControllerAfter viewController: UIViewController) -> UIViewController?
        {
            guard let index = controllers.firstIndex(of: viewController) else {
                return nil
            }
            if index + 1 == controllers.count {
                return controllers.first
            }
            return controllers[index + 1]
        }
        
        // SwiftUI calls this method whenever a page switching animation completes, you can find the index of the current view controller and update the binding.
        func pageViewController(
            _ pageViewController: UIPageViewController,
            didFinishAnimating finished: Bool,
            previousViewControllers: [UIViewController],
            transitionCompleted completed: Bool) {
            if completed,
               let visibleViewController = pageViewController.viewControllers?.first,
               let index = controllers.firstIndex(of: visibleViewController) {
                parent.currentPage = index
            }
        }
    }

}
