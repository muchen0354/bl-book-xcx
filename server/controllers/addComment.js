const {mysql} = require('../qcloud')

module.exports = async ctx => {
  const {location, phone, bookid, openid, comment} = ctx.request.body
  try{
    await mysql('comments').insert({location, phone, bookid, openid, comment})
    ctx.state.data = {
      msg: '添加评论成功'
    }
  } catch (e) {
      ctx.state = {
        code: '-1',
        data: {
          msg: `评论失败,${e.sqlMessage}`
        } 
      }
  }
}
  // ctx.state.data = {location, phone, bookid, openid, comment}

