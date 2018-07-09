<template>
 <div class="info">
   <div class="info-top">
    <div class="info-base">
      <img class="info-img" mode="aspectFit" :src="info.image" >
      <!-- <div class="info-text">
        <p class="title">{{info.title}}</p>
        <p class="author">作者:{{info.author}}</p>
        <p class="publisher">出版社:{{info.publisher}}</p>
        <p class="pubdate">出版时间:{{info.pubdate}}</p>
        <p class="price">价格:{{info.price}}</p>
        <span class="tags" v-for="(tag,index) in tags" :key="index">{{tag}}</span>
      </div> -->
    </div>
    <div class="mask"></div>
    <img class="info-background"  :src="info.image">
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
       <span class="want1">想读</span>
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
   <div class="info-summary">
       <span>简介</span>
       <span>{{info.summary}}</span>
   </div>
   <div class="info-author">
       <span>作者</span>
       <span>{{info.author_intro}}</span>
   </div>
   <div class="info-catalog">
       <span>目录</span>
       <span v-html="info.catalog"></span>
   </div>
 </div>
</template>

<script>
import Card from '@/components/Card'
import Rate from '@/components/Rate'
export default {
  props: ['info'],
  components: {
    Card,
    Rate
  },
  computed: {
    tags () {
      if(this.info.tags){
        return this.info.tags.split(',').splice(0,3)
      }
      return this.info.tags
    },
    rate () {
      if(this.info.rate){
        return JSON.parse(this.info.rate).average
      }
    },
    numRaters () {
      if(this.info.rate){
        return JSON.parse(this.info.rate).numRaters
      }
    }
  },
  mounted () {

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
        filter:blur(25px);
        width: 150%;
        height: 700rpx;
        top: -20px;
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
    .info-summary,.info-author,.info-catalog{
        font-size: 12px;
        padding: 20px;
        padding-bottom: 0;
        span:nth-child(1){
          color: #999;
          display: block;
          margin-bottom: 4px;
        }
        span:nth-child(2){
          color: #666;
          display: block;
          margin-bottom: 4px;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          overflow: hidden;
        }
      }
  }
</style>
