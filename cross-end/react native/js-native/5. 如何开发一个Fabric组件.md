# 如何开发一个Fabric组件
TODO

https://github.com/reactwg/react-native-new-architecture#guides

```ts
import {HostComponent, type ViewProps} from 'react-native';
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands';
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent';

// 定义视频播放的属性，url 为视频地址
type NativeProps = Readonly<
  ViewProps & {
    url?: string;
  }
>;

export type VideoViewType = HostComponent<NativeProps>;

// 定义视频播放的方法，包括开始播放、停止播放、暂停播放
interface NativeCommands {
  callNativeMethodToPlayVideo: () => void;
  callNativeMethodToStopVideo: () => void;
  callNativeMethodToPauseVideo: () => void;
}

// 导出外部调用的命令，包括开始播放、停止播放、暂停播放
export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: [
    'callNativeMethodToPlayVideo',
    'callNativeMethodToStopVideo',
    'callNativeMethodToPauseVideo',
  ],
});

// 导出包装好的组件，其中 VideoView 为引入 Native 的组件
export default codegenNativeComponent<NativeProps>(
  'VideoView',
) as VideoViewType;
```