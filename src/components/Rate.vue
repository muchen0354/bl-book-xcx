<template>
  <div class="rate">
    ☆☆☆☆☆
    <div class="active" :style='style'>★★★★★</div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 0
    }
  },
  computed: {
    style () {
      return `width:${this.value / 2}em`
    }
  }
}
</script>

<style lang="scss" scoped>
  .rate{
    display: inline-block;
    position: relative;
    .active{
      position: absolute;
      top:0;
      left: 0;
      width: 0;
      overflow: hidden;
    }
  }
</style>


