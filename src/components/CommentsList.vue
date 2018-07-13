<template>
 <div class="comments">
   <div class="commentslist clearfix">
     <div class="avatar p-left">
       <img :src="userinfo.avatar" mode="aspectFit" >
     </div>
     <div class="right p-left">
       <div class="name">
         {{userinfo.username}}
       </div>
       <div class="content">{{comment.comment}}</div>
       <div class="jiqi clearfix">
          <span  style="margin-right:5px;">{{comment.location}}</span>
          <span >{{comment.phone}}</span>
       </div>
     </div>
   </div>

 </div>
</template>

<script>
 export default {
   props: {
     comment: {
       type: Object,
       default:{}
     }
   },
   computed: {
     userinfo () {
       return this.comment.user_info || {}
     }
   },
   mounted (){
  }
 }
</script>

<style lang="scss" scoped>
  .comments{
    padding: 10px 20px;
    box-sizing: border-box;
    position: relative;
    .commentslist{
      width: 100%;
      display: flex;
      .avatar {
        width: 20px;
        height: 20px;
        img{
          width: inherit;
          object-fit: cover;
          height: inherit;
          border-radius: 50%;
        }
      }
      .right{
        flex: 1;
        margin-left: 5px;
        .name{
          font-size: 14px;
          color: #666;
          font-weight: 600;
          span{
            margin-left: 5px;
            margin-right: 20px;
          }
        }
        .content{
          margin-top: 5px;
          font-size: 14px;
          color: #999;
        }
      }
    }
    .jiqi{
      color: #ccc;
      font-size: 12px;
      // position:absolute;
      // bottom: 10px;
      // right: 20px;
    }
  }

</style>
