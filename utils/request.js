import config from './config.js';
// 封装 wx 的请求
export default function requeset(url,data,method='Get'){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: config.moblieHost +url, 
      data,
      header:{
        cookie: wx.getStorageSync('cookie') && wx.getStorageSync('cookie').join(';')
      },
      method,
      success:(res)=>{
        // 在登录的时候 获取cookie
        // 怎么区别是登录时候 data.isLogin
        // console.log('传递的参数 data->',data)
        // console.log('接口返回的 data->',res)
        if(data.isLogin){
          wx.setStorageSync('cookie', res.cookies)
        }
        resolve(res.data)
      },
      fial:(err)=>{
        reject(err)
      }
    })
  })
}