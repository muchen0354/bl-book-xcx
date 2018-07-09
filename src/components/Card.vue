<template>
<a :href="detailUrl">
    <div class="card">
      <div class="img">
        <image class="image"  mode="scaleToFill" :src='book.image'></image>
      </div>
      <div class="desc">
        <h2 class="title">{{book.title}}</h2>
        <div class="content">
          <p class="row">豆瓣评分: <span class="rate">{{book.rate.average}} <Rate :value="book.rate.average"></Rate></span></p>
          <p class="row">作者: {{book.author}}</p>
          <p class="row">出版社: {{book.publisher}}</p>
          <p class="row">价格: <span class="price">￥{{book.price}}</span> 浏览量: <span>{{book.count}}</span></p>
          <!-- <div class="buy p-right" @click="tip">购买</div> -->
        </div>
      </div>
    </div>
  </a>
</template>
 <script>
 import {showSuccess} from '@/util'
 import Rate from '@/components/Rate'
 export default {
   props: [
     'book'
   ],
   components: {
     Rate
   },
   methods: {
    //  tip () {
    //    showSuccess('你没有资格购买')
    //    return false
    //  }
   },
   computed: {
     detailUrl () {
       return `/pages/detail/main?id=${this.book.id}`
     }
   }
 }
 </script>
 <style lang="scss" scoped>
  .card {
    width: 100%;
    height: 100px;
    overflow:hidden;
    padding-left: 10px;
    padding-top: 10px;
    margin-top: 5px;
    border-bottom: 1px solid #eee;
    // &:hover{
    //   background-color: #eee;
    // }
    .img{
      float: left;
      width: 60px;
      height: 90px;
      .image {
        width: 60px;
        height: 90px;
      }
    }
    .desc{
        width: 100%;
        position: relative;
        padding-left: 60px;
        padding-top: 2px;
      .title{
        font-weight: 500;
        font-size: 14px;
        padding-left: 10px;
      }
      .content {
        padding-left: 10px;
        font-size: 12px;
        .row{
          width: 70%;
          color: #888;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          .rate{
            color: #ef4238;
            font-size: 14px;
            .rate-start{
              position:absolute;
              right: 20px;
            }
          }
          .price{
            color: #000;
          }
        }
        .buy{
          position: absolute;
          top: 15px;
          right: 20px;
          font-size: 14px;
          text-align: center;
          padding-top: 5px;
          width: 50px;
          height: 25px;
          color: #fff;
          background-color: #ef4238;
          border-radius: 15px;
          &:active {
            background-color: #fa4238
          }
        }
      }
    }
  }
 </style>

