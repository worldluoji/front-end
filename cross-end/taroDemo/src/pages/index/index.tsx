import { Swiper, SwiperItem, View } from '@tarojs/components'
import './index.scss'
import Taro from '@tarojs/taro'

const toForm = () => {
  Taro.navigateTo({
    url: '/pages/form/form',
  })
}

export default function Index() {
  return (
    <Swiper
      className="box"
      autoplay
      interval={1000}
      indicatorColor="#999"
      onAnimationFinish={() => {}}
    >
      <SwiperItem onClick={toForm}>
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
