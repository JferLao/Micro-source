import { BookModel } from '../../models/book'
let bookModel = new BookModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchPanel: false,
        books: Object,
        more: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(_options) {
        // 获取热门图书
        bookModel.getHotList((data) => {
            this.setData({
                books: data.books
            })
        })
    },
    // 显示搜索栏
    onActivateSearch: function(event) {
        this.setData({
            searchPanel: true
        })
    },
    // 隐藏搜索栏
    onCancel: function() {
        this.setData({
            searchPanel: false
        })
    },

})