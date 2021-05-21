// pages/car-plan-next/car-plan-next.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataBrandlist } from '../../utils/fetch'
Page({
  data: {
    factor: {
      type: '1',
      pageNum: 1
    },
    brandList: [],
  },
  async getBrandList() {// 获取品牌列表
    try {
      let result = await getDataBrandlist()
      if(result.code == 0){
        this.setData({
          brandList: result.data
        })
      }    
    } catch (error) {
      console.log(error)
    } finally {
      wx.hideLoading()
    }
  },
  async onLoad (options) {
    
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