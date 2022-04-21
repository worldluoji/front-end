<template>
    <div>
        <RButton msg='click me' @click="test"></RButton>
    </div>
</template>

<script>
export default {
    name: 'App',
    methods: {
    test () {
      window.location.href='https://cn.bing.com'
    }
  }
}
</script>