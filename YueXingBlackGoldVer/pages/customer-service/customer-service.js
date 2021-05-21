// pages/customer-service/customer-service.js
Page({
  data: {
    serviceList:[{
      id: 1,
      name: '创客悦行客服1号',
      src: '../../images/ercode1.png'
    },{
      id: 2,
      name: '创客悦行客服2号',
      src: '../../images/ercode2.png'
    }],
    showPop: false,
    ercodeSrc: ''
  },
  toggleShow() {
    this.setData({showPop: !this.data.showPop})
  },  
  showErcode(e) {
    for(let item of this.data.serviceList){
      if(item.id == e.currentTarget.dataset.id){
        this.setData({ercodeSrc: item.src,serviceName:item.name,showPop: true})
      }
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