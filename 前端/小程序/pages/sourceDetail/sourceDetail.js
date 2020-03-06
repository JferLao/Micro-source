import {
  SourceModel
} from '../../models/source'
const sourceModel = new SourceModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sources: {},
    video: '',
    start: 1,
    count: 5,
    source: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let id = options.sourceId
    this.onGetSource(id)
    this.getLatestSource()
  },

  // 获取课程内容
  onGetSource(id) {
    sourceModel.getSourceById(id, (res) => {
      let data = res.source.video
      this.setData({
        video: data,
        sources: res.source
      })
    })
  },

  // 查看课程
  enterSource(event) {
    if (event.detail.source.id) {
      let id = event.detail.source.id
      wx.navigateTo({
        url: '../sourceDetail/sourceDetail?sourceId=' + id
      })
    }
  },
  // 查看更多
  onMore() {
    wx.navigateTo({
      url: '../soureMenu/sourceMenu'
    })
  },

  // 获取最新课程
  getLatestSource: function() {
    sourceModel.getLatestSource(this.data.start, this.data.count, (res) => {
      this.setData({
        source: res.source
      })
    })
  },


})