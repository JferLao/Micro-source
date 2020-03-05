import { SourceModel } from '../../models/source'
const sourceModel = new SourceModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        console.log(options);
    },

    // 获取课程内容
    onGetSource(id) {
        sourceModel.getSourceById(id, (res) => {
            console.log(res);
        })
    }


})