<template>
  <span data-num="21" ref="dataNum"  @click="getData($event)">55</span>
</template>

<script>
export default {
  methods: {
    getData: function (e) {
      console.log(this.$refs.dataNum.getAttribute('data-num'))
    }
  }
}
</script>

<style>

</style>
