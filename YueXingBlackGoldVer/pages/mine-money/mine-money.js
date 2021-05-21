// pages/mine-money/mine-money.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getMoneyDetail } from '../../utils/fetch'
Page({
  data: {
    balance: 0,
    activeTab: '1',
    totalNum: 0,
    pageNum: 1,
    pageSize: 20,
    isAsc: 'asc',
    pointsList: []
  },
  switchTab(e) {
    this.setData({
      activeTab: e.currentTarget.dataset.index
    })
  },
  async getDataMoneyList() {//查询我的余额明细
    wx.showLoading({
      title: '加载中',
    })
    try {
      if((this.data.pageNum-1)*this.data.pageSize>=this.data.totalNum && this.data.pageNum > 1){
        wx.showToast({
          icon: 'none',
          title: '没有更多了~',
        })
        return
      }
      let params = {
        isAsc: this.data.isAsc,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      }
      let result = await getMoneyDetail(params)
      if(result.code == 0){
        this.setData({
          pageNum: this.data.pageNum+1,
          balance: result.data.balance,
          pointsList: [...this.data.pointsList,...result.data.list.rows],
          totalNum: result.data.list.total
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      wx.hideLoading()
    }
  },
  onLoad: function (options) {

  },
  onShow: function () {
    this.getDataMoneyList()
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