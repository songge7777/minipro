import request from '../../utils/request'
// startY 记录滑动Y距离
let startY = 0;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    moveY:0,
    transition:'',
    userInfo:{},
    // 保存最近播放的数据
    songUrls:[],
  },
  // 点击事件回调
  handleFn(event){
    console.log('事件回调',event)
  },

  // 手指按下
  handleStart(e){
    console.log('手指按下',e)
    // 第一个 触发 按下,首次 记录
    const  clientY = e.touches[0].clientY
    startY = clientY;
    this.setData({
      transition:'',
    })
  },
  // 手指移动
  handleMove(e){
    // 移动 去计算滑动的Y距离
    const  clientY = e.touches[0].clientY
    if(clientY> startY){
      this.setData({
        moveY: clientY - startY +'rpx'
      })
    }
  },
  // 手指离开
  handleEnd(){
    console.log('手指离开')
    this.setData({
      moveY:'0rpx',
      transition:'all 1s',
    })
  },
  // 跳转登录页面
  toLogin(){
    wx.navigateTo({
      url: '/pages/login/login',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    const userInfo = wx.getStorageSync('userInfo')
    this.setData({
      userInfo
    })
    // 如果有 名字 代表已经登录了
    if(userInfo.nickname){
      const res = await request('/user/record',{uid: userInfo.userId,type:1})
      this.setData({
        songUrls:res.weekData.map(item => item.song.al)
      })
      console.log('最近播放的数据', res.weekData);
    }
    // console.log('获取获取信息', userInfo)
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