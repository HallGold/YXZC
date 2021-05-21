// pages/car-hosting-next/car-hosting-next.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { postDataSpareCar } from '../../utils/fetch'
Page({
  data: {
    name: '',
    phone: '',
    belongToArea: '',
    brand: '',
    licensedDate: '',
    model: '',
    color: '',
    mileage: '',
    showSuccess: false
  },
  setInput(e) {
    let label = e.currentTarget.dataset.label;
    this.setData({ [label]: e.detail.value })
  },
  async submit() {
    if(!this.data.name){
      wx.showToast({
        title: '请填写您的姓名',
        icon: 'none'
      })
      return
    }
    let reg = /^1[3-9]\d{9}$/;
    if(!reg.test(this.data.phone)){
      wx.showToast({
        title: '请填写正确的手机号',
        icon: 'none'
      })
      return
    }
    if(!this.data.belongToArea){
      wx.showToast({
        title: '请填写您的牌照归属地',
        icon: 'none'
      })
      return
    }
    if(!this.data.brand){
      wx.showToast({
        title: '请填写您的车辆品牌',
        icon: 'none'
      })
      return
    }
    if(!this.data.licensedDate){
      wx.showToast({
        title: '请填写您的上牌时间',
        icon: 'none'
      })
      return
    }
    if(!this.data.model){
      wx.showToast({
        title: '请填写您的车型',
        icon: 'none'
      })
      return
    }
    if(!this.data.color){
      wx.showToast({
        title: '请填写您的爱车颜色',
        icon: 'none'
      })
      return
    }
    if(!this.data.mileage){
      wx.showToast({
        title: '请填写您的行使里程',
        icon: 'none'
      })
      return
    }

    try {
      let params = {
        name: this.data.name,
        phone: this.data.phone,
        region: this.data.belongToArea,
        brand: this.data.brand,
        license: this.data.licensedDate,
        type: this.data.model,
        color: this.data.color,
        mileage: this.data.mileage
      }
      let result = await postDataSpareCar(params)
      if(result.code == 0){
        this.setData({ showSuccess: true })
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