import { SourceModel } from '../../models/source'
const sourceModel = new SourceModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type: [],
        source: [],
        curNav: 1,
        curIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.onGetType()
        this.onGetAll()
    },

    // 获取全部课程分类
    onGetType() {
        sourceModel.getAllType((res) => {
            let data = res.type
            this.setData({
                type: data
            })
        })
    },

    // 获取全部课程
    onGetAll() {
        sourceModel.getAllSource((res) => {
            this.setData({
                source: res.source
            })
        })
    },

    // 根据课程id获取课程
    onGetSourceByTypeId(id) {
        sourceModel.getSourceByTypeId(id, (res) => {
            this.setData({
                source: res.type
            })
        })
    },

    //事件处理函数
    switchRightTab: function(e) {
        // 获取item项的id，和数组的下标值
        let id = e.target.dataset.id
        let index = parseInt(e.target.dataset.index);
        // 把点击到的某一项，设为当前index
        this.setData({
            curNav: id,
            curIndex: index
        })
        if (id !== 1) {
            this.onGetSourceByTypeId(id)
        } else {
            this.onGetAll()
        }
    }

})