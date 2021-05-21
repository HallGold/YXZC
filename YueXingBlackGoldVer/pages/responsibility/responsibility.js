// pages/responsibility/responsibility.js
const app = getApp()
import { regeneratorRuntime } from '../../utils/regenerator-runtime.js'
import { getDataContact } from '../../utils/fetch'
const wxParser = require('../../wxParser/index.js')
Page({
  data: {

  },
  async getResponsibility () {//获取富文本
    wx.showLoading({
      title: '加载中',
    })
    try {
      let result = await getDataContact()
      if(result.code == 0){
        wxParser.parse({
          bind: 'article',
          html: result.data.protocol,
          target: this,
          enablePreviewImage: false, // 禁用图片预览功能
        });
        // WxParse.wxParse('article', 'html', result.data.protocol, this, 5); //富文本转换
      }
    } catch (error) {
      console.log(error)
    } finally {
      wx.hideLoading()
    }
  },
  onLoad: function (options) {
    this.getResponsibility();
  },
  onShareAppMessage() {
    return {
      title: '新药临床研究',
      imageUrl: '../../images/sharePic.png',
      path: '/pages/index/index'
    }
  }
})