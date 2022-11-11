<script setup>
import { Card } from 'vant'
defineProps({
    props: Object,
    className: String,
})
</script>

<template>
<van-card
  num="1"
  price="2999.00"
  desc="New IPAD 10.8inc"
  title="IPAD 2022"
  thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
/>
</template>