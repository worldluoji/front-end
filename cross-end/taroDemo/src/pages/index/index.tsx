import { View } from '@tarojs/components'
import { Swiper, SwiperItem } from '@tarojs/components'
import './index.scss'

export default function Index() {
  return (
    <Swiper
      className="box"
      autoplay
      interval={1000}
      indicatorColor="#999"
      onClick={() => {}}
      onAnimationFinish={() => {}}
    >
      <SwiperItem>
        <View className="text">1</View>
      </SwiperItem>
      <SwiperItem>
        <View className="text">2</View>
      </SwiperItem>
      <SwiperItem>
        <View className="text">3</View>
      </SwiperItem>
    </Swiper>
  )
}
