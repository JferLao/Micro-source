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
        // 缓存分类
        let typeStorage = wx.getStorageSync('soureType')
        if (typeStorage) {
            this.setData({
                type: typeStorage
            })
        } else {
            sourceModel.getAllType((res) => {
                let data = res.type
                wx.setStorageSync('soureType', data)
                this.setData({
                    type: data
                })
            })
        }

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
        // wx.showLoading({
        //     title: '搜索中',
        // })
        sourceModel.getSourceByTypeId(id, (res) => {
            // wx.hideLoading()
            this.setData({
                source: res.type
            })
        })
    },



    //搜索
    onSearch(key) {
        wx.showLoading({
            title: '搜索中',
        })
        sourceModel.search(key, (data) => {
            wx.hideLoading()
            if (!data.source) {
                wx.showToast({
                    title: '没有找到课程喔',
                    icon: 'success',
                    duration: 2000,
                    image: '../../images/icon/tips.png'
                })
            } else {
                if (data.source.id) {
                    let id = data.source.id
                    wx.navigateTo({
                        url: '../sourceDetail/sourceDetail?sourceId=' + id
                    })
                }
            }
        })
    },

    // 确认搜索
    onConfirm(event) {
        let key = event.detail.value
        this.onSearch(key)
    },

    enterSource(event) {
        console.log(event.currentTarget.dataset.id);
        if (event.currentTarget.dataset.id) {
            let id = event.currentTarget.dataset.id
            wx.navigateTo({
                url: '../sourceDetail/sourceDetail?sourceId=' + id
            })
        }
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