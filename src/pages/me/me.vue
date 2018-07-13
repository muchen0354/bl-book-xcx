<template>
  <div class="container">
    <div class="userinfo" >
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
    </div>
    <YearProgress></YearProgress>
    <button  @tap='scan' class='btn'>查看二维码</button>
    <button v-if='userinfo.openId' @tap='scanBook' class='btn'>添加图书</button>
    <button v-else open-type="getUserInfo" lang="zh_CN" class='btn' @getuserinfo="doLogin">点击登录</button>
  </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import {showSuccess, post, showModal} from '@/util'
import config from '@/config'
import YearProgress from '@/components/YearProgress'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: 'http://image.shengxinjing.cn/rate/unlogin.png',
        nickName: ''
      },
      logged: false
    }
  },
  created () {
    qcloud.setLoginUrl(config.loginUrl)
    const session = qcloud.Session.get()
    if (session) {
      this.userinfo = session.userinfo
    }
  },
  methods: {
    async addBook (isbn) {
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      console.log(res)
      if (res.msg === 'success') {
        showSuccess('添加成功', `${res.title}添加成功`)
      }
    },
    // 扫二维码获取图书信息
    scanBook () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
          this.addBook(res.result)
        }
      })
    },
    scan () {
      wx.scanCode({
        success: (res) => {
          console.log(res)
        }
      })
    },
    getWxLogin: function ({encryptedData, iv, userinfo}) {
      const self = this
      wx.login({
        success: function (loginResult) {
          console.log('loginResult', loginResult)
          var loginParams = {
            code: loginResult.code,
            encryptedData: encryptedData,
            iv: iv
          }
          qcloud.setLoginUrl(config.loginUrl)
          qcloud.requestLogin({
            loginParams,
            success () {
              qcloud.request({
                url: config.userUrl,
                login: true,
                success (userRes) {
                  showSuccess('登录成功')
                  wx.setStorageSync('userinfo', userRes.data.data)
                  self.userinfo = userRes.data.data
                }
              })
            },
            fail (error) {
              showModal('登录失败', error)
            }
          })
        },
        fail: function (loginError) {
          showModal('登录失败', loginError)
        }
      })
    },
    login (e) {
      const self = this
      // 查看是否授权
      wx.getSetting({
        success: function (res) {
          // 授权信息里有用户信息
          if (res.authSetting['scope.userInfo']) {
            // 检查用户登录是否过期
            wx.checkSession({
              success: function () {
                // 没过期 直接成功
                showSuccess('登录成功')
              },
              fail: function () {
                // 过期了 重新登录 先清楚登录的状态
                qcloud.clearSession()
                // 登录态已过期，需重新登录
                // 登录需要的加密信息
                var options = {
                  encryptedData: e.mp.detail.encryptedData,
                  iv: e.mp.detail.iv,
                  userinfo: e.mp.detail.userInfo
                }
                self.getWxLogin(options)
              }

            })
          } else {
            showModal('用户未授权', e.mp.detail.errMsg)
          }
        }

      })

      // let user = wx.getStorageSync('userinfo')
      // const self = this
      // if (!user) {
      //   qcloud.setLoginUrl(config.loginUrl)
      //   qcloud.login({
      //     success: function (userinfo) {
      //       qcloud.request({
      //         url: config.userUrl,
      //         login: true,
      //         success (userRes) {
      //           showSuccess('登录成功')
      //           wx.setStorageSync('userinfo', userRes.data.data)
      //           self.userinfo = userRes.data.data
      //         }
      //       })
      //     }

      //   })
      // }
    },
    doLogin () {
      const self = this
      const session = qcloud.Session.get()

      if (session) {
        // 第二次登录或者本地已有登录状态，可以使用这个函数更新登录状态
        qcloud.loginWithCode({
          success: res => {
            self.userinfo = res
            // this.setData({userInfo: res, logged: true})
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            showModal('登录错误', err.message)
          }
        })
      } else {
        // 首次登录
        qcloud.login({
          success: res => {
            self.userinfo = res
            // this.setData({ userInfo: res, logged: true })
            showSuccess('登录成功')
          },
          fail: err => {
            console.error(err)
            showModal('登录错误', err.message)
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

.container  {
  padding:0 30rpx;
}
.userinfo {
  margin-top:100rpx;
  text-align:center;
  img {
    width: 150rpx;
    height:150rpx;
    margin: 20rpx;
    border-radius: 50%;
  }
}

button {
  margin-top: 10px;
}



</style>


