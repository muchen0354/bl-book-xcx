<template>
 <div class="info">
   <div class="info-top">
    <div class="info-base">
      <img class="info-img" mode="aspectFit" :src="info.image" >
    </div>
    <div class="mask"></div>
    <div class="info-background"  :style="{backgroundColor: bgColor}"></div>
   </div>
   <div class="info-intro">
     <div class="title">{{info.title}}</div>
     <div class="author">作者：{{info.author}}</div>
     <div class="publisher">出版社：{{info.publisher}}</div>
     <div class="pubdate">出版时间：{{info.pubdate}}</div>
     <div class="doubanrate">
       <p class="rate-item title">豆瓣评分</p>
       <p class="rate-item rate-num">{{rate}}</p>
       <Rate :value="rate"></Rate>
       <p class="rate-item raters">{{numRaters}}人</p>
     </div>
     <div class="wangtoread">
       <span class="want1" @click='bgColor'>想读</span>
       <span class="want2">在读</span>
       <span class="want3">读过</span>
     </div>
   </div>
   <div class="info-buy">
     <span class="icon iconfont">&#xe887;</span>
     <span>在暴龙购买：纸质版</span>
     <span class="icon iconfont p-right">&#xe8f1;</span>
     <span class="price p-right">￥{{info.price}}</span>
   </div>
   <div class="info-buy" style="margin-bottom:10px;">
     <img :src="userinfo.img" style="width:20px;height:20px;border-radius:50%;vertical-align:middle;margin-right:5px;" mode="aspectFit"/>
     <span>{{userinfo.name}}</span>
   </div>
   <Model :text='summary'></Model>
   <Model :text='author_intro'></Model>
   <Model :text='catalog'></Model>
 </div>
</template>

<script>
import Rate from '@/components/Rate'
import Model from '@/components/Model'
export default {
  props: ['info'],
  components: {
    Rate,
    Model
  },
  data () {
    return {
      colors: ['#f2efe6', '#d699ba', '#e0b3df', '#606968', '#a35568'],
      active: false
    }
  },
  methods: {
    show () {
      this.active = !this.active
      console.log(this.info.catalog)
    }
  },
  computed: {
    userinfo() {
      return this.info.user_info || {}
    },
    tags () {
      if(this.info.tags){
        return this.info.tags.split(',').splice(0,3)
      }
    },
    catalog(){return this.info.catalog || {}},
    summary(){return this.info.summary || {}},
    author_intro(){return this.info.author_intro || {}},
    rate () {
      if(this.info.rate){
        return JSON.parse(this.info.rate).average
      }
    },
    numRaters () {
      if(this.info.rate){
        return JSON.parse(this.info.rate).numRaters
      }
    },
    bgColor () {
      const select = Math.floor(Math.random()*5)
      return this.colors[select]
    }
  }
}
</script>

<style lang="scss">
  .info{
    background-color: #fefefe;
    .info-top{
      width: 750rpx;
      height: 500rpx;
      overflow: hidden;
      position: relative;
      padding: 20rpx;
      .info-base{
        .info-img{
          position:absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          // width: 133px;
          z-index: 10;
          height: 220px;
        }
        .info-text{
          padding-left: 20px;
          color: #ffffff;
          .title{
            margin-bottom: 15px;
          }
          .author,.publisher,.price,.pubdate{
            width: 70%;
            color: #ccc;
            font-size: 14px;
            margin-bottom: 5px;
          }
          .tags{
            font-size: 10px;
            padding: 2px 4px;
            margin-left: 3px;
            height: 20px;
            border-radius: 6px;
            border: 1px solid #888;
          }
        }
      }
      .mask{
        position:absolute;
        top: 0;
        left: 0;
        width: 150%;
        height: 700rpx;
        background-color: rgba(0, 0, 0, .2)
      }
      .info-background{
        position:absolute;
        top: 0;
        left: 0;
        width: 150%;
        height: 700rpx;
      }
    }
    .info-intro{
      // height: 150px;
      padding: 20px;
      position: relative;
      border-bottom: 1px solid #eee;
      .title{
        width: 60%;
        font-size:18px;
        color: #333;
        margin-bottom: 20px;
      }
      .author,.publisher,.pubdate{
        font-size: 10px;
        color: #999;
      }
      .doubanrate{
        width: 80px;
        height: 80px;
        padding-top: 10px;
        // border: 1px solid #000;
        box-shadow: -1px 1px 5px 2px #eee;
        text-align: center;
        font-size: 10px;
        position: absolute;
        right: 40px;
        top: 20px;
        .title{
          font-size: 10px;
          color: #ccc
        }
        .raters{
          color: #999;
        }
        .rate-item{
          // width: 80%;
          margin-bottom: 4px;
        }
        .rate{
          color: #ff6f00;
          margin-bottom: 5px;
        }
        .rate-num{
          font-size: 16px;
          font-weight: 500;
          margin: 2px 0;
        }
      }
      .wangtoread{
        margin-top: 20px;
        display: flex;
        justify-content: space-between;
        span{
          text-align: center;
          border: 1px solid #ff6f00;
          border-radius: 4px;
          color: #ff6f00;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
        }
        .want1{
          flex: 2;
          margin-right: 10px;
        }
        .want2{
          flex: 2;
          margin-right: 10px;
        }
        .want3{
          flex: 3;
        }
      }

    }
    .info-buy{
      padding: 10px 20px;
      font-size: 14px;
      border-bottom: 1px solid #eee;
      &:active{
        background-color: #ccc;
      }
      span{
        vertical-align: bottom;
      }
      span:nth-child(2){
        font-weight: 600
      }
      .price{
        color: #ef4238
      }
    }



  }
</style>
