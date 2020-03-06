import { SourceModel } from '../../../models/source'
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
})