import {
  SourceModel
} from '../../../models/source'
const sourceModel = new SourceModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    source: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.onGetMySource()
  },

  onGetMySource() {
    sourceModel.getMySource((res) => {
      this.setData({
        source: res.mySource
      })
    })
  },
  // 查看课程
  enterSource(event) {
    if (event.detail.source.id) {
      let id = event.detail.source.id
      wx.navigateTo({
        url: '../../sourceDetail/sourceDetail?sourceId=' + id
      })
    }
  },

  // 移除课程
  deleteSource(event) {
    let id = event.detail.source.id
    wx.showModal({
      title: '提示',
      content: '是否移除该课程',
      success(res) {
        if (res.confirm) {
          sourceModel.deleteMySource(id, (res) => {
            if (res.msg === '请求已完成') {
              wx.showToast({
                title: '课程移除成功',
                icon: 'success',
                duration: 2000
              })

            } else {
              wx.showToast({
                title: '课程移除失败',
                icon: 'none',
                duration: 2000,
                image: '../../images/icon/失败.png'
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '用户取消了操作',
            icon: 'loading',
            duration: 1000
          })
        }
      }
    })
    this.onGetMySource()
  }
})