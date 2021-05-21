// components/image-upload.js
const app = getApp();
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataCarList, postDataCollect, postDataCollectCancel } from '../../utils/fetch'
Component({
  properties: {
    factor: { // 条件筛选
      type: Object,
      value: null
    },
    type: {
      type: String,
      value: '1'
    }
  },
  observers: {
    'factor': function(value) {
      this.carList = [];
      this.getData();
    }
  },
  data: {
    pageNum: 1,
    pageSize: 10,
    isAsc: 'asc',
    totalListNum: 1,
    collectId: '',
    carList:[],
  },
  methods: {
    collectCar(e) {
      this.setData({collectId: e.currentTarget.dataset.id});
      this.postCollect();
    },
    cancelcollectCar(e) {
      this.setData({collectId: e.currentTarget.dataset.id});
      this.postCollectCancel();
    },
    goDetail(e) {
      if(this.data.type == '1'){
        wx.navigateTo({
          url: '../../pages/car-detail/car-detail?id='+e.currentTarget.dataset.id,
        })
      }else if(this.data.type == '2'){
        wx.navigateTo({
          url: '../../pages/car-more/car-more?id='+e.currentTarget.dataset.id,
        })
      }
    },
    async getData() {//获取车列表
      wx.showLoading({
        title: '加载中',
      })
      let page = this.data.factor.pageNum ? this.data.factor.pageNum : this.data.pageNum
      try {
        if((page-1)*this.data.pageSize>=this.data.totalListNum && page > 1){
          wx.showToast({
            icon: 'none',
            title: '没有更多了~',
          })
          return
        }
        
        let params = {
          ...this.data.factor,
          isAsc: this.data.isAsc,
          pageNum: page,
          pageSize: this.data.pageSize
        }
        console.log(params)
        if(page == 1) this.setData({carList:[]})
        let result = await getDataCarList(params)
        if(result.code == 0){
          let key = "factor.pageNum"
          this.data.factor.pageNum ? this.setData({[key]: page+1}):this.setData({pageNum: page+1})
          this.setData({
            carList: [...this.data.carList,...result.data.rows],
            totalListNum: result.data.total
          })
        }
      } catch (error) {
        console.log(error)
      } finally {
        wx.hideLoading()
      }
    },
    async postCollect() {//收藏车
      try {
        let params = {
          id: this.data.collectId
        }
        let result = await postDataCollect(params)
        if(result.code == 0){
          wx.showToast({
            title: '收藏成功',
          })
          let arr = this.data.carList.map((car,index)=>{
            if(car.id == this.data.collectId){
              car.collect = '1';
            }
            return car
          })
          this.setData({carList: arr})
        }
      } catch (error) {
        console.log(error)
      }
    },
    async postCollectCancel() {//取消收藏
      try {
        let params = {
          id: this.data.collectId
        }
        let result = await postDataCollectCancel(params)
        if(result.code == 0){
          wx.showToast({
            title: '取消收藏成功',
          })
          let arr = this.data.carList.map((car,index)=>{
            if(car.id == this.data.collectId){
              car.collect = '0';
            }
            return car
          })
          this.setData({carList: arr})
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  lifetimes: {
    attached: function() {
      
    },
    detached: function() {
      
    }
  }
})
