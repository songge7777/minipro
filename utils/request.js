// 封装 wx 的请求
export default function requeset(url,data,method='Get'){
  return new Promise((resolve,reject)=>{
    wx.request({
      url:"http://localhost:3000" +url,
      data,
      method,
      success:(res)=>{
        resolve(res.data)
      },
      fial:(err)=>{
        reject(err)
      }
    })
  })
}