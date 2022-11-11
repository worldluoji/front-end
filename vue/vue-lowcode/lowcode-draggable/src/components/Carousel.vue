
<template>
    <div>
        <van-swipe class="my-swipe" :autoplay="2000">
            <van-swipe-item>1</van-swipe-item>
            <van-swipe-item>2</van-swipe-item>
        </van-swipe>
    </div>
</template>

<script setup>
import { Swipe, SwipeItem } from 'vant'
defineProps({
  props: Object,
  className: String,
})
// props可用于传递参数，比如上面的autoplay等等
</script>
  
<style scoped>
.my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
}
</style>