import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { type ImageSource } from 'expo-image';

type Props = {
  imageSize: number;
  stickerSource: ImageSource;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  // 定义双击事件
  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
        if (scaleImage.value !== imageSize * 2) {
            scaleImage.value = scaleImage.value * 2;
        } else {
            scaleImage.value = Math.round(scaleImage.value / 2);
        }
    });

  const imageStyle = useAnimatedStyle(() => {
    return {
        width: withSpring(scaleImage.value),
        height: withSpring(scaleImage.value)
    }
  });

  // 拖拽事件
  const drag = Gesture.Pan().onChange(event => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
        transform: [
            {
                translateX: translateX.value,
            },
            {
                translateY: translateY.value
            }
        ]
    }
  });

  return (
    <GestureDetector gesture={drag}>
        <Animated.View style={[containerStyle, { top: -350 }]}>
            <GestureDetector gesture={doubleTap}>
                {/* Animated.Image 是 React Native 中的一个特殊组件，它继承自 Image 组件，但提供了额外的功能来支持动画效果 */}
                <Animated.Image 
                    source={stickerSource} 
                    style={[imageStyle, { width: imageSize, height: imageSize }]}
                    resizeMode="contain"
                    // resizeMode="contain"：设置图像的缩放模式。"contain" 表示图像会缩放以适应容器，同时保持其宽高比不变。
                />
            </GestureDetector>
        </Animated.View>
    </GestureDetector>
  );
}

/* 总结一下
*  1. 手势Gesture里操作的是useSharedValue里的值；
*  2. 产生动画的组件，用GestureDetector包裹，里面设置的style是useAnimatedStyle。
*/
