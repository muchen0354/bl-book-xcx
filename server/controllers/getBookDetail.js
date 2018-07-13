const {mysql} = require('../qcloud')

module.exports = async ctx => {
  const {id} = ctx.request.query
  const detail = await mysql('books')
                            .select('books.*','cSessionInfo.user_info')
                            .join('cSessionInfo', 'books.openid', 'cSessionInfo.open_id')
                            .where('id', id)
                            .first()
  const info  = JSON.parse(detail.user_info)
  ctx.state.data = Object.assign({},detail, {
    user_info: {
      name:info.nickName,
      img:info.avatarUrl,
      openid:info.openId
    },
    catalog: {title: '目录', content: detail.catalog.split('\n')},
    author_intro: {title: '作者', content: detail.author_intro.split('\n')},
    summary: {title: '简介', content: detail.summary.split('\n')}
  })
  await mysql('books').where('id', id).increment('count', 1)

}

