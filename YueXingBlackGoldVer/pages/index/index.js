//index.js
//获取应用实例
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getToken, getDataBanner, getDataCarList } from '../../utils/fetch'
Page({
  data: {
    indicatorDots: false,
    bannerList: [],
    factor: {
      type: '2'
    },
    pageNum: 1,
    pageSize: 10,
    isAsc: 'asc',
    carList: []
  },
  goNext (e) {
    switch(e.currentTarget.dataset.index){
      case '1':
        wx.navigateTo({
          url: '../car-plan/car-plan',
        })
        break;
      case '2':
        wx.navigateTo({
          url: '../car-rent/car-rent',
        })
        break;
      case '3':
        wx.navigateTo({
          url: '../car-hosting/car-hosting',
        })
        break;
      case '4':
        wx.navigateTo({
          url: '../webview/webview?url='+e.currentTarget.dataset.url,
        })
        break;
    }
  },
  goDetail(e) {
    wx.navigateTo({
      url: '../../pages/car-more/car-more?id='+e.currentTarget.dataset.id,
    })
  },
  async getBanner() {// 获取banner
    try {
      let result = await getDataBanner()
      if(result.code == 0){
        this.setData({
          bannerList: result.data.rows
        })
      }
    } catch (error) {
      console.log(error)
    }
  },
  async getData() {//获取车列表
    wx.showLoading({
      title: '加载中',
    })
    try {
      if((this.data.pageNum-1)*this.data.pageSize>=this.data.totalListNum && this.data.pageNum > 1){
        wx.showToast({
          icon: 'none',
          title: '没有更多了~',
        })
        return
      }
      let params = {
        ...this.data.factor,
        isAsc: this.data.isAsc,
        pageNum: this.data.pageNum,
        pageSize: this.data.pageSize
      }
      let result = await getDataCarList(params)
      if(result.code == 0){
        this.setData({
          carList: [...this.data.carList,...result.data.rows],
          totalListNum: result.data.total,
          pageNum: this.data.pageNum+1
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      wx.hideLoading()
    }
  },
  onLoad: function () {
    this.getBanner();
    this.getData();
  },
  onShow() {
    wx.login({
      complete: (res) => {
        let params = {
          code: res.code
        }
        getToken(params).then(res=>{
          if(res.code==0){
            app.globalData.token = res.data.token ? res.data.token : '';
          }
        })
      }
    })
    
  },
  onReachBottom: function () {
    this.getData();
  },
  onPullDownRefresh: function(){
    this.setData({pageNum: 1})
    this.getData();
  }
})
