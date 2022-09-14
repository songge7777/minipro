import request from '../../utils/request'
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerLists:[
      {
        url:'../../static/images/mylove.jpg',
        id:1,
      },
      {
        url:'../../static/images/mylove.jpg',
        id:2,
      },
      {
        url:'../../static/images/mylove.jpg',
        id:3,
      },
    ],
    personalized:[],
    playlists:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBennerList();
    this.getPersonalized();
    this.getTopList();
  },
  // 获取轮播图数据
  async getBennerList(){
    const r = await request('/banner',{type:1},'GET')
    // console.log('获取轮播图数据', r)
    this.setData({
      bannerLists: r.banners
    })
  },
  // 获取nav的数据
  async getPersonalized(){
    const r = await request('/personalized',{limit:10},'GET')
    // console.log('获取nav的数据',r)
    this.setData({
      personalized: r.result
    })
  },
  // 获取排行榜数据
  async getTopList(){
    // const r = await request('/top/list',{idx:3},"GET")
    // console.log('获取排行榜数据',r) 
    // 每一次请求的数据放进去
    const list = []
    let index = 0;
    while(index < 5){
      const r = await request('/top/list',{idx: index++},"GET")
      // console.log('获取排行榜数据',r) 
      // 当前的某一条数据
      const playlist = {
        name:r.playlist.name,
        playlist: r.playlist.tracks.slice(0,3)
      }
      list.push(playlist)
    }
    this.setData({
      playlists: list
    })
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