//app.js
App({
  onLaunch: function () {
  },
  globalData: {
    baseUrl: 'https://jg.bjckczyxgs.com',
    // baseUrl: 'http://123.57.143.152',
    token: ''
  },
  POST : function (url, params) {
    let that = this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: that.globalData.baseUrl + url,
        method: 'post',
        header: {
          "Content-Type": "multipart/form-data",
          'Content-Type': 'application/x-www-form-urlencoded',
          'token': that.globalData.token
        },
        data: params,
        success: function (res) {
          if (res.data.code == 0) {
            resolve(res.data)
          } else if(res.data.code == 100){
            that.globalData.token = null;
            wx.showToast({
              icon: 'none',
              title: '请先登录查看更多内容~',
            })
            resolve(res.data)
          } else if(res.data.code == 101){
            resolve(res.data)
          }else{
            wx.showToast({
              title: '网络开小差了~',
              icon: 'none'
            })
            console.log(res.data.msg)
            resolve(res.data)
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '请稍后再试~',
            icon: 'none'
          })
          reject(res)
        }
      });
    }).catch(err => {
      console.log("catch " + JSON.stringify(err));
    })
  }
})