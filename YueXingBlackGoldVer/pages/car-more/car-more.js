// pages/car-more/car-more.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataCarDetail, postDataCollect, getUserInfo, postDataCollectCancel } from '../../utils/fetch'
const wxParser = require('../../wxParser/index.js')
Page({
  data: {
    bannerList: [],
    carInfo: {},
    isVip: '0',
    ensureList:[{
      image: '../../images/ensure5.png',
      name: '随叫随到',
      detail: '7*24小时专业服务，及时响应'
    },{
      image: '../../images/ensure6.png',
      name: '车辆全险',
      detail: '不计免赔服务，用车无忧'
    },{
      image: '../../images/ensure7.png',
      name: '上门取送',
      detail: '站点城市用车免费上门取送车'
    },{
      image: '../../images/ensure8.png',
      name: '专属管家',
      detail: '一对一管家服务，想你所想'
    },{
      image: '../../images/ensure9.png',
      name: '押金秒退',
      detail: '还车当天无车损，秒退车辆押金'
    }]
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