import { SourceModel } from '../../models/source'
const sourceModel = new SourceModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        source: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let id = options.sourceId
        this.onGetSource(id)
    },

    // 获取课程内容
    onGetSource(id) {
        sourceModel.getSourceById(id, (res) => {
            let data = res.source.video
            console.log(data);
            this.setData({
                source: data
            })
        })
    }


})