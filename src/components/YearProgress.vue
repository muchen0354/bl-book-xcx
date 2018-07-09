<template>
  <div class="progressbar">

    <progress :percent="percent" color='#ea5149' />
    <p class="text">{{year}}年已经过去了{{day}}天, {{percent}}%</p>
  </div>
</template>

<script>
export default {
  methods: {
    isLeapYear () {
      let year = new Date().getFullYear
      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getDayOfYear () {
      return this.isLeapYear() ? 366 : 355
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    day () {
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // start 是今年的第一天
      let offset = new Date().getTime() - start.getTime()
      return offset / 1000 / 60 / 60 / 24
    },
    percent () {
      return (this.day * 100 / this.getDayOfYear()).toFixed(1)
    }
  }
}
</script>

<style lang='scss' scoped>
  .progressbar{
    margin-top: 20rpx;
    margin-bottom: 30px;
    text-align: center;
    font-size: 28rpx;
    width: 100%;
    .text{
      margin-top: 12px
    }
  }
</style>

