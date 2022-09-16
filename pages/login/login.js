import requset from '../../utils/request';
// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone:'',
    password:'',
  },
  // 输入的事件回调
  handleInput(e){
    // 拿到类型
    const type = e.currentTarget.id;
    // 输入的文本
    const value = e.detail.value;
    this.setData({
      // type是动态
      [type]:value
    })
  },
   // 登录逻辑
  async loginFn(){
    const password = this.data.password
    const phone = this.data.phone
    console.log('登录获取的数据 手机号', phone, this.data)
    console.log('登录获取的数据 密码', password)
    // 校验 
    // phone :  1开头 全是数字  11位  第二位开始[3-9]
    // test 匹配成功和失败  返回boolean
    if(!/^1[3-9]\d{9}$/.test(phone)){
      // 提示语 
      wx.showToast({
        title: '手机号格式有误',
        icon: "error",
        duration: 5000
      })
      return;
    }
    // 密码校验 
    if(!/\w{6,20}$/.test(password)){
      // 提示语
      wx.showToast({
        title: '密码格式有误',
        icon: "error"
      })
      return;
    }
    // 登录接口 15997477937
    const r = await requset('/login/cellphone',{
      phone:'15997477937',
      password:'songge0322'
    },'GET')
    // 本地保存的数据
    wx.setStorageSync('userInfo', r.profile)
    wx.reLaunch({
      url: '/pages/center/center',
    })
    console.log('登录接口 返回的数据', r)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})