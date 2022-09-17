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
    videoPlayHistoryData:[],//[{id,currentTime}]
    refresher: false
  },
  // 上拉触底
  async onScrolltolower(){
    // 1、获取 videoList 的数据
    const videoList = this.data.videoList
    // 简单的控制一下
    if(videoList.length < 50){
      // 2、次函数的 调回执行的时候  拿到最新的数据
      const r = await request('/video/group',{id:this.data.currentIndex},'GET')
      // 3、更新视频列表
      this.setData({
        videoList: [...videoList, ...r.datas.map(item => item.data)] 
      })
    }
    console.log('上拉触底')
  },

  // 下拉刷新的逻辑  回调函数
  async onRefresherrefresh(){
    // 1、下拉的时候 出现。。。。  
    // 2、请求数据
    await this.getVideoList()

    // 3、请求成功后  refresher设置为flase
    // setTimeout 测试延长时间
    setTimeout(()=>{
      this.setData({
        refresher:false
      })
    },2000)

    // console.log('下拉函数触发')
    // setTimeout(()=>{
    //   this.setData({
    //     refresher:false
    //   })
    // },2000)
  },
  // seekHistoryVideo 跳转到指定的视频 上次播放的位子
  seekHistoryVideo(id){
    // 1、获取当前点击的id
    // 2、获取历史数据 是否 有对应的id数据
    const obj = this.data.videoPlayHistoryData.find(item => item.id === id)
    if(obj){
      this.player.seek(obj.currentTime)
    }
    // 3、有 接着上一次位子播放 videoContext.seek(时间)
  },
  // 视频播放完成的事件 回调函数
  getEnded(event){
    // 拿到当前的视频 id
    const id = event.target.id
    const videoPlayHistoryData = this.data.videoPlayHistoryData
    // 用数组的 filter 进行过滤 播放完成的对象
    const obj = videoPlayHistoryData.filter(item => item.id !== id)
    this.setData({
      videoPlayHistoryData:obj
    })
  },
  // 时间节点的回调函数
  getVideoTime(event){
    // 1、获取 当前播放的时间节点 event.detail.currentTime
    const currentTime = event.detail.currentTime
    // 2、获取 video id
    const id = event.target.id;
    // 3、整理好的单个对象 {id,currentTime}  每间隔250ms
    let  currentTimeObj = {
      id,
      currentTime,
    }
    // 4、通过id  去找到历史数据 是否有 
    const videoPlayHistoryData = this.data.videoPlayHistoryData // []
    const obj = videoPlayHistoryData.find(item => item.id === id)
    console.log('去找到历史数据 是否有',obj)
    //  有就直接修改 没有就给他新增
    if(obj){
      obj.currentTime = currentTime
    } else {
      videoPlayHistoryData.push(currentTimeObj)
    }
    // 5、把更新一下历史数据结构
    this.setData({
      videoPlayHistoryData
    })
    // console.log('================')
    // console.log('时间节点的回调函数', event)
    // console.log('================')
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
      if(this.data.currentId !== id){
        // 如果有 就暂停上一个视频
        this.player.pause();
        // 创建新的 视频实例this.player赋值  在进行播放
        // 覆盖上一次的 视频实例
        this.player = wx.createVideoContext(id);
        // 跳转到 历史记录页面
        this.seekHistoryVideo(id);
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
    // // 创建一个 video 视频实例的对象 
    // const player = wx.createVideoContext(id)
    // player.play();
    // this.player = player
    // console.log('处理点击视频操作',event)
  },
  // nav 点击 修改 currenIndex
  handleFn(e){
    this.setData({
      currentIndex:e.currentTarget.dataset.id
    })
    this.getVideoList();
  },
  // 获取视频列表
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
    wx.hideShareMenu({
      menus:['shareAppMessage']
    })
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
   * 1、右上角 原生分享
   */
  onShareAppMessage({from}) {
    // from 的值 menu button用来区别原生和自定按钮
    // 图片的问题
    // 1、组合一堆数据的图片  画布 有兼容
    // 2、后端生成图片
      console.log('用户点击右上角分享',from)
      return {
        imageUrl:'../../static/images/mylove.jpg',
        path:'/pages/index/index',
        title :'测试转发'
      }
  }
})