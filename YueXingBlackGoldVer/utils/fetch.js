const app = getApp();
console.log(app);
// ------------公共------------
// 获取token
export const getToken = params => {
  return app.POST('/wx/wechat/appletLogin', params)
}
// 获取车辆列表
export const getDataCarList = params => {
  return app.POST('/wx/car/list', params)
}
// 获取车辆详情
export const getDataCarDetail = params => {
  return app.POST('/wx/car/detail', params)
}
// 获取基础数据
export const getDataBase = params => {
  return app.POST('/wx/data/getData', params)
}

// ------------首页------------
// 获取banner
export const getDataBanner = params => {
  return app.POST('/wx/banner/list', params)
}
// 提交闲车信息
export const postDataSpareCar = params => {
  return app.POST('/wx/idleCar/fillIn', params)
}

// ------------选车------------
// 获取品牌列表-按abc
export const getDataBrandlist = params => {
  return app.POST('/wx/type/all', params)
}
// 获取日期
export const getDataDate = params => {
  return app.POST('/wx/data/getDate', params)
}



// ------------我的------------
// 提交用户信息
export const postUserInfo = params => {
  return app.POST('/wx/wechat/register', params)
}
// 查询个人信息
export const getUserInfo = params => {
  return app.POST('/wx/account/getUserInfo', params)
}
// 查询是否签到
export const getDataSignYet = params => {
  return app.POST('/wx/account/signForNow', params)
}
// 签到
export const postDataSign = params => {
  return app.POST('/wx/account/sign', params)
}
// 积分列表
export const getIntegralDetail = params => {
  return app.POST('/wx/account/integraliList', params)
}
// 余额列表
export const getMoneyDetail = params => {
  return app.POST('/wx/Balance/list', params)
}
// 提交反馈
export const postDataFeedback = params => {
  return app.POST('/wx/feedback/save', params)
}
// 获取联系方式
export const getDataContact = params => {
  return app.POST('/wx/connection/info', params)
}
// 发送短信验证码
export const getCode = params => {
  return app.POST('/wx/data/sendSms',params)
}
// 成为会员
export const postVip = params => {
  return app.POST('/wx/account/vip',params)
}
