/**
 * 新增图书
 * 1 调用豆瓣信息
 * 2 入库
 */

 const https = require('https')
 const {mysql} = require('../qcloud')

 module.exports = async ctx => {
  //  ctx.request.body 请求的参数都在这里
  const {isbn, openid} = ctx.request.body
  if(isbn && openid) {
    const url = `https://api.douban.com/v2/book/isbn/${isbn}`
    let bookinfo = await getJSON(url)
    const rate = JSON.stringify({average:bookinfo.rating.average, numRaters: bookinfo.rating.numRaters})
    const {title, image, alt, publisher, summary, price} = bookinfo
    const tags = bookinfo.tags.map(v=> `${v.title}`).join(',')
    const pubdate = bookinfo.pubdate
    const author = bookinfo.author.join(',')
    const author_intro = bookinfo.author_intro
    const catalog = bookinfo.catalog
    const subtitle = bookinfo.subtitle
    try {
      await mysql('books').insert({
          isbn, openid, subtitle, rate, catalog, title, image, alt, publisher, summary, price, tags, author, pubdate, author_intro
      })
      ctx.state.data = {
          title,
          msg: 'success'
      }
    } catch (e) {
        ctx.state = {
            code: -1,
            data: {
                msg: '新增失败:' + e.sqlMessage
            }
        }
    }
  }
 }

//  https://api.douban.com/v2/book/isbn/:name
 function getJSON (url) {
  return new Promise((resolve,reject) => {
    https.get(url, res => {
      let urlData = ''
      res.on('data', data => {
        urlData += data
      })
      res.on('end', data => {
        let bookInfo = JSON.parse(urlData)
        if(bookInfo.title) {
          resolve(bookInfo)
        }
        reject(bookInfo)
      })

    })
  })
 }
