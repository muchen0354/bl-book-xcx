<template>
  <div class="detail">
    <Info v-if='info' :info='info'></Info>

    <div class="comment">
      <div class="comment-title">评论区</div>
      <Comment-list :comment="item" v-for="item in commentsList" :key="item.bookid"></Comment-list>
      <textarea v-model="comment"
                maxlength="100"
                placeholder="请输入评论"
                class="comment-content" />
      <div class="message">
        <span>{{location}}</span>
        <span style="margin-left:5px;">{{phone}}</span>
      </div>
    </div>
    <div class="location">
      城市：
      <switch color="#ef4238" :checked="location" @change="getGeo"/>
    </div>
    <div class="phone">
      手机型号
      <switch color="#ef4238" :checked="phone" @change="getPhone"/>
    </div>
    <button class="btn" @click="addComment">评论</button>
  </div>
</template>

<script>
  import {get, post, showModal} from '@/util'
  import config from '@/config'
  import Info from '@/components/Info'
  import CommentList from '@/components/CommentsList'
  import RGBaster from '../../../static/lib/rgbaster.min.js'
  export default {
    data () {
      return {
        bookid: '',
        info: {},
        comment: '',
        location: '',
        phone: '',
        openid: '',
        commentsList: []
      }
    },
    components: {
      Info,
      CommentList
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()
      this.getComments(this.bookid)
    },
    methods: {
      async addComment() {
        if(!this.comment){
          showModal( '提交失败','请输入评论')
          return
        }
        const data = {
          phone: this.phone,
          location: this.location,
          comment: this.comment,
          bookid:this.bookid,
          openid: this.openid
        }
        const res = await post('/weapp/addComment', data)
        if(res.msg = '添加评论成功'){
          this.comment = ''
          showModal('Succ', '添加评论成功')
          this.getComments(this.bookid)
        }
      },
      async getComments (bookid) {
        const comments = await get('/weapp/getComments',{bookid})
        this.commentsList = comments.list
      },
      getPhone(e){
        if(e.target.value){
          const phone = wx.getSystemInfoSync()
          this.phone = phone.model
        } else {
          this.phone = ''
        }
      },
      async getGeo (e) {
        const ak = 'ab1lAVQdYSUvYmMpvWowvuzl44F1f5Gb'
        const url = 'http://api.map.baidu.com/geocoder/v2/'
        if(e.target.value){
          wx.getLocation({
            success:geo=>{
              wx.request({
                url,
                data:{
                  ak,
                  location:`${geo.latitude},${geo.longitude}`,
                  output: 'json',
                },
                success: res=> {
                  const data = res.data.result
                  this.location = data.addressComponent.city
                }
              })
            }
          })
          // this.phone = phone.model
        } else {
          this.location = ''
        }
      },
      async getDetail () {
        const detail = await get('/weapp/getBookDetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: detail.title
        })
        if(detail.pubdate === null){
          detail.pubdate = '未知'
        }
        this.openid = detail.user_info.openid
        this.info = detail
      }
    }
  }
</script>

<style lang="scss">
  .comment{
    font-size: 14px;
    color: #999;
    margin-bottom: 5px;
    position: relative;
    .comment-title{
      color: #eee;
      box-sizing: border-box;
      height: 30px;
      width: 750rpx;
      line-height: 30px;
      background-color: #222;
      padding: 0px 20px;
      box-sizing: border-box;
    }
    .comment-content{
      border: 1px solid #eee;
      width: 750rpx;
      box-sizing: border-box;
      height: 100px;
      padding: 10px 20px 0;
    }
    .message{
      position:absolute;
      bottom: 2px;
      right: 20px;
    }

  }
  .location,.phone{
      font-size: 12px;
      display: inline-block;
      height: 30px;
      margin: 5px 20px 10px 0;
    }
</style>
