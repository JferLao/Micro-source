import { BookModel } from '../../models/book'

let bookModel = new BookModel

Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: null,
        comments: [],
        noComment: true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        let bid = options.bid

        // 获取书本详情
        bookModel.getBookDetail(bid, (data) => {
            this.setData({
                book: data
            })
        })

        // 获取书本详情的短评
        bookModel.getCommentById(bid, (data) => {
            console.log(data);
            this.setData({
                noComment: data.comments == false ? true : false,
                comments: data.comments
            })
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})