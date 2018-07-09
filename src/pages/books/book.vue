<template>
  <div class="list">
    <TopSwiper :tops="topList"></TopSwiper>
    <Card v-for= "book in books" :key="book.id" :book="book"></Card>
    <p class="nomore" v-if='!more'>没有更多数据</p>
  </div>
</template>

<script>
import {get} from '@/util'
import Card from '@/components/Card'
import TopSwiper from '@/components/TopSwiper'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      books: [],
      page: {
        page: 0,
        size: 5
      },
      more: true,
      topList:[]
    }
  },
  mounted () {
    this.getList(true)
    this.getTop()
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.page.page = 0
    this.more = true
    this.getList(true)
    this.getTop()
  },
  // 上拉加载
  onReachBottom () {
    if (!this.more) {
      return false
    }
    this.page.page = this.page.page + 1
    this.getList()
  },
  methods: {
    /**
     * getList     获取图书列表数据
     */
    async getList (init) {
      if (init) {
        this.page.page = 0
      }
      // 显示头部loading样式
      wx.showNavigationBarLoading()
      const books = await get('/weapp/booklist', this.page)
      console.log(books.booksList)
      if (books.booksList.length < this.page.size) {
        this.more = false
      }
      if (init) {
        this.books = books.booksList
        // 停止下拉刷新
        wx.stopPullDownRefresh()
      } else {
        this.books = this.books.concat(books.booksList)
        console.log(this.books)
      }
      // 隐藏头部loading样式
      wx.hideNavigationBarLoading()
    },
    /**
     * getTop  获取轮播图数据, 只取前9名
     */
    async getTop () {
      const topList = await get('/weapp/top')
      this.topList = topList.list
    }
  }
}
</script>

<style lang="scss">
  .nomore{
    width: 100%;
    height: 20px;
    margin-bottom: 10px;
    text-align: center;
  }
</style>


