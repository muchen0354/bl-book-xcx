<template>
 <div class="top-swiper">
   <swiper
    indicator-dots=true
    autoplay=true
    duration="500"
    interval="3000"
    circular=true
    >
      <swiper-item v-for="(top,index) in tops" :key="index">
        <image class="swiper-item" mode="scaleToFill" :src="top.image"></image>
      </swiper-item>

   </swiper>
 </div>
</template>

<script>
 export default {
   props: ['tops'],
   mounted () {
     console.log(this.tops);

   }
 }
</script>

<style lang="scss">

.swiper-item{
  width: 100%;
}
</style>
