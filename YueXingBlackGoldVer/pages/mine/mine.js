// pages/mine/mine.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { postUserInfo, getUserInfo, getToken, getDataSignYet, postDataSign } from '../../utils/fetch'
Page({
  data: {
    showBtn: true,
    userName: '',
    userIcon: '',
    isVip: '0',
    signYet: false,
    userPoints: 0,
    balance: 0
  },
  goNext (e) {
    switch(e.currentTarget.dataset.index){
      case '1':
        wx.navigateTo({
          url: '../mine-money/mine-money',
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../mine-points/mine-points',
        })
        break;
      case '4':
        wx.navigateTo({
          url: '../mine-spare-car/mine-spare-car',
        })
        break;
      case '5':
        wx.navigateTo({
          url: '../mine-msg/mine-msg',
        })
        break;
      case '6':
        wx.navigateTo({
          url: '../responsibility/responsibility',
        })
        break;
      case '7':
        wx.navigateTo({
          url: '../mine-feedback/mine-feedback',
        })
        break;
      case '8':
        wx.navigateTo({
          url: '../mine-contact/mine-contact',
        })
        break;
      case '9':
        wx.navigateTo({
          url: '../mine-vip-one/mine-vip-one',
        })
        break;
    }
  },
  async getToken() {// 获取token
    let that = this;
    wx.login({
      complete: (res) => {
        let params = {
          code: res.code
        }
        getToken(params).then(res=>{
          if(res.code==0){
            app.globalData.token = res.data.token ? res.data.token : '';
            that.getSignYet();
          }
        })
      }
    })
  },
  async postUserInfoData(e) {// 授权并提交用户信息
    let that = this
    this.setData({
      showBtn: false,
      userIcon: e.detail.userInfo.avatarUrl,
      userName: e.detail.userInfo.nickName
    })
    wx.login({// 登录
      success: async (res) => {
        if (res.code) {
          try {
            let params = {
              name: e.detail.userInfo.nickName,
              photo: e.detail.userInfo.avatarUrl,
              code: res.code,
            }
            let result = await postUserInfo(params)
            that.getToken()
          } catch (error) {
            console.log(error)
          }
        } else {
          wx.showToast({
            title: '登录失败！',
            icon: 'none'
          })
        }
      }
    });
  },
  async getInfo() {// 获取用户信息
    let result = await getUserInfo()
    if(result.code == 0){
      this.setData({
        showBtn: false,
        userIcon: result.data.photo,
        userName: result.data.name,
        isVip: result.data.vip,
        userPoints: result.data.integral,
        balance: result.data.balance
      })
      this.getSignYet();
    }else{
      this.setData({showBtn: true})
    }
  },
  async getSignYet() {// 获取是否签到
    try {
      let result = await getDataSignYet()
      if(result.code == 0){
        if(result.data == '0'){
          this.setData({
            signYet: true
          })  
        }else{
          this.setData({
            signYet: false
          })  
        }
      }
    } catch (error) {
      console.log(error)
    }
  },
  async postSign() {// 签到
    try {
      let result = await postDataSign()
      if(result.code == 0){
        this.setData({
          signYet: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})