<template>
  <button @click='onclick'>{{ msg }}</button>
</template>

<script>

export default {
  name: 'RButton',
  props: {
    msg: String
  },
  methods: {
    onclick () {
      this.$emit('click')
    }
  }
}
</script>

<style scoped>
button {
  padding: 15px;
  background-color: rgb(202, 219, 219);
  color: rgb(233, 35, 35);
  border-radius: 5px;
}
</style>
