<template>
  <div class="text" @click="show">
    <p class="title">{{text.title}}</p>
    <div class="content" :class="{'content-less': !isMore}">
      <p v-if='!isMore' class="item" v-for="(item,index) in text.content" :key="index">{{item}}</p>
      <p v-if="isMore" class="string">{{contentString}}</p>
    </div>
    <span class="more iconfont">&#xe8f1;</span>
  </div>
</template>
<script>
export default {
  props: {
    text: {
      type: Object,
      default: ''
    }
  },
  data () {
    return {
      isMore: true
    }
  },
  computed: {
    contentString () {
      if(this.text.content){return this.text.content.join(',')}
    }
  },
  methods: {
    show() {
      this.isMore = !this.isMore
    }
  }
}
</script>
<style lang='scss'>
  .text{
      position: relative;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      padding: 0 20px 10px;
      margin-top: 10px;
      .title{
        color: #999;
        margin-bottom: 5px;
      }
      .content{
        // height: 100px;
        overflow: hidden;
        color: #666;
        .string{
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
      .content-less{
        // height: 50px
        text-indent: 2em;
      }
      .more{
        position: absolute;
        top: 50%;
        right: 10px;
        transform: translate(0, -50%)
      }
    }
</style>


