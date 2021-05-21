// pages/mine-vip-two/mine-vip-two.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getCode, postVip } from '../../utils/fetch'
Page({
  data: {
    name: '',
    phone: '',
    code: '',
    timer: '',
    tick: 0,
    showSuccess: false,
  },
  setName (e) {
    this.setData({ name: e.detail.value })
  },
  setPhone (e) {
    this.setData({ phone: e.detail.value })
  },
  setCode (e) {
    this.setData({ code: e.detail.value })
  },
  async getCode() {/* 获取验证码 */
    let reg = /^1[3-9]\d{9}$/;
    if (!reg.test(this.data.phone)) {
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
    } else {
      try {
        let params = {
          phone: this.data.phone
        }
        let result = await getCode(params);
        if(result.code == 0){
          wx.showToast({title: '发送短信成功'});
          this.setData({ tick: 60 });
          this.data.timer = setInterval(() => {
            this.setData({ tick: this.data.tick - 1 });
            if (this.data.tick == 0) {
              clearInterval(this.data.timer);
            }
          }, 1000);
        }  
      } catch (error) {
        console.log(error)
        wx.showToast({
          icon: 'none',
          title: '哎呀，出错啦~',
        })
      }
      wx.hideLoading();
    }
  }, 
  async becomeVip() {// 变成会员
    if(!this.data.name){
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
      return
    }
    if(!this.data.phone){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return
    }
    if(!this.data.code){
      wx.showToast({
        title: '请填写验证码',
        icon: 'none'
      })
      return
    }
    try {
      let params = {
        name: this.data.name,
        phone: this.data.phone,
        code: this.data.code
      }
      let result = await postVip(params)
      if(result.code == 0){
        this.setData({
          showSuccess: true
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  closeSuccess() {
    this.setData({
      showSuccess: false
    })
  },
  backhome() {
    wx.switchTab({
      url: '../index/index',
    })
  },
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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