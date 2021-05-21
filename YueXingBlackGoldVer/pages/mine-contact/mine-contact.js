// pages/mine-contact/mine-contact.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataContact } from '../../utils/fetch'
Page({
  data: {
    contactInfo: null
  },
  async postFeedback() {// 提交意见反馈
    try {
      let result = await getDataContact({})
      if(result.code == 0){
        this.setData({contactInfo: result.data})
      }
    } catch (error) {
      console.log(error)
    }
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.postFeedback();
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