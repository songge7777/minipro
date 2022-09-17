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
    currentId:'',
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
  // clickVideo 处理点击视频操作
  clickVideo(event){
    // 获取当前点击 视频组件的 id
    const id = event.target.id
    // this.player 保证全局只有一个 播放的实例
    // 要先判断 当前的视频是否存在
    if(this.player){
      // 如果当前点击的id 和 上一个id 不一样 才进去
      if(this.currentId !== id){
        // 如果有 就暂停上一个视频
        this.player.pause();
        // 创建新的 视频实例this.player赋值  在进行播放
        // 覆盖上一次的 视频实例
        this.player = wx.createVideoContext(id);
        this.player.play();
        // 保存当前播放的id
        this.setData({
          currentId:id
        })
      }else{
        // 当前的id 和 上一次的id 一样
      }
    } else{
      // 首次进入
      // 创建新的 视频实例 给this.player赋值
      this.player = wx.createVideoContext(id);
      this.player.play();
      // 保存当前播放的id
      this.setData({
        currentId:id
      })
    }
    // 创建一个 video 视频实例的对象 
    const player = wx.createVideoContext(id)
    player.play();
    this.player = player
    console.log('处理点击视频操作',event)
  },
  // nav 点击 修改 currenIndex
  handleFn(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.id
    })
    this.getVideoList();
  },
  async getVideoList(){
    const r = await request('/video/group',{id:this.data.currentIndex},'GET')
    this.setData({
      videoList: r.datas.map(item => item.data)
    })
    console.log('获取视频数据',r.datas[0].data)
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