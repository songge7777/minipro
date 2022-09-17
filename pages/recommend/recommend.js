// pages/recommend/recommend.js
import request from '../../utils/request.js';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    day:'',
    month:'',
    // 存放歌曲的数据
    songLists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    // 日期计算
    const d = new Date()
    const day = d.getDate();
    // 切记 一定要加一
    const month = d.getMonth() + 1;
    this.setData({
      day,
      month
    });
    // 请求歌曲列表的数据
    const r = await request('/recommend/songs',{},'GET')
     this.setData({
      songLists:r.data.dailySongs
     })
    console.log('请求歌曲列表的数据',r.data.dailySongs)
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