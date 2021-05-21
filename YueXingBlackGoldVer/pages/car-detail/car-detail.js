// pages/car-detail/car-detail.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataCarDetail, postDataCollect, getUserInfo, postDataCollectCancel } from '../../utils/fetch'
const wxParser = require('../../wxParser/index.js')
Page({
  data: {
    bannerList: [],
    carInfo: {}
  },
  async getCarDetail() {// 获取车子详情
    try {
      let params = {
        carId: this.data.id
      }
      let result = await getDataCarDetail(params)
      if(result.code == 0){
        this.setData({
          carInfo: result.data,
          bannerList: [...result.data.bannerList]
        })
        wxParser.parse({
          bind: 'article',
          html: result.data.content,
          target: this,
          enablePreviewImage: false, // 禁用图片预览功能
        });
      }
    } catch (error) {
      console.log(error)
    }
  },
  goNext() {
    wx.switchTab({
      url: '../customer-service/customer-service',
    })
  },
  onLoad: function (options) {
    this.setData({id: options.id})
  },
  onShow: function () {
    this.getCarDetail();
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