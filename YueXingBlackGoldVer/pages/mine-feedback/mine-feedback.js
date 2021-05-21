// pages/mine-feedback/mine-feedback.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { postDataFeedback } from '../../utils/fetch'
Page({
  data: {
    content: ''
  },
  setContent(e) {
    this.setData({ content: e.detail.value })
  },
  async postFeedback() {// 提交意见反馈
    if(!this.data.content){
      wx.showToast({
        icon: 'none',
        title: '请先填写您的意见和建议'
      })
      return
    }
    try {
      let params = {
        content: this.data.content
      }
      let result = await postDataFeedback(params)
      if(result.code == 0){
        wx.showToast({
          title: '提交成功',
        })
      }
    } catch (error) {
      console.log(error)
    }
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