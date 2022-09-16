// pages/video/video.js
import request from '../../utils/request'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLists:[],
    currentIndex:'',
    videoList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    await this.getNavList()
    await this.getVideoList()
  },

  // 获取nav 列表数据
  async getNavList(){
    const r = await request('/video/group/list',{},'GET')
    this.setData({
      navLists: r.data.slice(0,30)
    })
    // 首页的时候  给 currentIndex 默认为第一个的数据
    this.setData({
      currentIndex:r.data.slice(0,30)[0].id
    })
    console.log('获取nav 列表数据', r.data.slice(0,30))
  },
  // nav 点击 修改 currenIndex
  handleFn(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.id
    })
    console.log('===>')
    this.getVideoList();
  },
  async getVideoList(){
    const r = await request('/video/group',{id:this.data.currentIndex},'GET')
    this.setData({
      videoList: r.datas.map(item => item.data.urlInfo)
    })
    console.log('获取视频数据',r.datas[0])
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