# hybird
App 混合开发，指的是一个 App 部分功能用 Native 构建，部分功能用跨端框架构建。目前比较流行的跨端框架有 H5、React Native、Flutter、布局动态化等。

以 Native 与 React Native 混合开发为例，在同一个 App 中，通常存在以下几种形态：

<img src="./pics/hybird react native app state.webp" />

首先是一些大型 App 中，比如美团、携程、京东、58 等。这些大型 App 一般都非常复杂，整个框架需要包含模块化、组件化、插件化、跨端等能力。相比纯 React Native 工程，大型 App 的实际业务开发还需要考虑如何在已有原生项目中引入 React Native，作为原生框架的扩展能力。比如，部分业务可能对开发效率、多端一致性、动态更新能力有较强要求，就可以使用 React Native 来实现。

除了大型 App 外，如果你要对已上线的项目引入 React Native 也需要使用混合模式。因为原生改造成 React Native 并不是那么简单的事情，毕竟开发语言、页面管理、模块管理完全是另一套东西，而且一些原生页面，如启动页、首页等，出于性能考虑，大都还是会选择原生来实现。

当然一些新开发的轻量级 App，建议你选择纯 React Native 模式。因为新开发的 App 没有技术债，可以从 0 到 1 享受 React Native 跨端的优势，比如项目最关心的开发成本。

现在一般大型 App 都是多套跨端框架并存的，比如 H5 + React Native + 布局动态化，或 H5 + Flutter，具体选型主要以业务场景、包大小、性能、运行内存、动态更新能力为标准进行


在 React Native 的混合开发中，我们需要关注下面这几个主要问题和流程：
- 如何从 0～1 进行环境配置；
- 通用的 React Native 载体页如何设计，需要包含哪些能力；
- 如何调试打包发布；
- 遇到混合开发的 bug 如何进行排查与修复。

<br>

## 纯 React Native 应用和 Hybird React Native 应用的区别

**一、技术架构**
1. **纯 React Native 应用**：
   - 完全使用 React Native 框架进行开发，界面和逻辑都由 JavaScript 和 React Native 的组件来实现。
   - 不依赖原生平台（如 Android 和 iOS）的特定开发技术，仅通过 React Native 提供的桥接机制与原生平台进行交互。
2. **混合 React Native 应用**：
   - 结合了原生开发和 React Native 开发。通常在原生项目中引入 React Native 模块，部分界面和功能使用 React Native 实现，而其他部分可能仍然使用原生代码开发。
   - 可以充分利用原生平台的优势和 React Native 的高效开发特性，根据具体需求灵活选择开发方式。

**二、开发效率**
1. **纯 React Native 应用**：
   - 开发过程相对较为统一，开发者只需要熟悉 JavaScript 和 React Native 的开发技术栈，开发效率较高，尤其是对于跨平台的应用开发。
   - 代码复用性强，一套代码可以在多个平台上运行，减少了开发和维护的工作量。
2. **混合 React Native 应用**：
   - 在某些情况下，混合开发可以结合原生开发的高性能和 React Native 的快速迭代优势，提高开发效率。
   - 但是，由于涉及到两种不同的开发技术，开发团队需要同时掌握原生开发和 React Native 开发，增加了技术门槛和开发成本。

**三、性能表现**
1. **纯 React Native 应用**：
   - 性能主要取决于 React Native 框架的优化程度和与原生平台的交互效率。在一些复杂的界面和动画效果上，可能会出现性能瓶颈。
   - 不过，随着 React Native 的不断发展和优化，性能也在逐步提升。
2. **混合 React Native 应用**：
   - 对于性能要求较高的部分，可以使用原生代码进行开发，从而获得更好的性能表现。
   - 混合应用可以根据具体需求进行优化，在性能和开发效率之间找到平衡。

**四、维护成本**
1. **纯 React Native 应用**：
   - 由于代码结构相对统一，维护起来相对容易。当需要进行功能扩展或修复 bug 时，开发者只需要在 React Native 的代码中进行修改。
   - 但是，如果 React Native 框架本身出现问题，可能会影响到整个应用的稳定性。
2. **混合 React Native 应用**：
   - 维护成本相对较高，因为涉及到两种不同的技术栈，需要同时维护原生代码和 React Native 代码。
   - 在进行功能扩展和 bug 修复时，需要考虑两种技术的兼容性和交互问题。

使用“npx react-native@latest init”创建的是一个纯 React Native 应用。这个命令会初始化一个全新的 React Native 项目，项目中只包含 React Native 的代码和依赖，不涉及原生平台的特定代码。

<br>

## 已有app整合react native
https://reactnative.dev/docs/integration-with-existing-apps

到了Configuring CocoaPods dependencies这一步，要写Podfile，依赖清单在`node_modules/react-native/React.podspec.`

Podfile参考：https://juejin.cn/post/6972066694608977927