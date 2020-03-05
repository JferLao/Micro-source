import { BannerModel } from '../../models/banner'
import { SourceModel } from '../../models/source'
const sourceModel = new SourceModel()
const bannerModel = new BannerModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner: {},
        start: 1,
        count: 5,
        source: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBanner()
        this.getLatestSource()
    },

    // 获取轮播图
    getBanner: function() {
        bannerModel.getBannerPic().then((res) => {
            this.setData({
                banner: res.banner
            })
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

    // 查看更多
    onMore() {
      wx.navigateTo({
            url: '../soureMenu/sourceMenu'
        })
    }
})