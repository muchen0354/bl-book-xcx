<template>
  <div class="detail">
    <Info :info='info'></Info>
  </div>
</template>

<script>
  import {get} from '@/util'
  import Info from '@/components/Info'
  export default {
    data () {
      return {
        bookid: '',
        info: {}
      }
    },
    components: {
      Info
    },
    mounted () {
      this.bookid = this.$root.$mp.query.id
      this.getDetail()

    },
    methods: {
      async getDetail () {
        const detail = await get('/weapp/getBookDetail', {id: this.bookid})
        wx.setNavigationBarTitle({
          title: detail.title
        })
        if(detail.pubdate === null){
          detail.pubdate = '未知'
        }
        this.info = detail
      }
    }
  }
</script>

<style lang="scss">


</style>
