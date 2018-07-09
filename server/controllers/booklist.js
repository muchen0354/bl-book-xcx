
const {mysql} = require('../qcloud')
module.exports = async (ctx) => {
  // 联表查询
  // 设置起始页码和数据量
  const page = ctx.request.query.page
  const size = ctx.request.query.size
  // 获取图书列表页
  const bookList = await mysql('books')
                      .select('books.*','cSessionInfo.user_info')
                      .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                      .limit(size)
                      .offset(Number(page) * size)
                      .orderBy('books.id', 'desc')
  ctx.state.data = {
    booksList: bookList.map(val => {
      const info = JSON.parse(val.user_info)
      val.rate = JSON.parse(val.rate)
      return Object.assign({}, val, {
        user_info: info.nickName
      })
    })
  }
}
