// pages/mine-vip-one/mine-vip-one.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getUserInfo } from '../../utils/fetch'
Page({
  data: {
    userName: '',
    userIcon: '',
  },
  goNext() {
    wx.navigateTo({
      url: '../mine-vip-two/mine-vip-two',
    })
  },
  async getInfo() {// 获取用户信息
    let result = await getUserInfo()
    if(result.code == 0){
      this.setData({
        showBtn: false,
        userIcon: result.data.photo,
        userName: result.data.name
      })
    }else{
      this.setData({showBtn: true})
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