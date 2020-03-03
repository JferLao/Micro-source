import { BookModel } from '../../models/book'
import { LikeModel } from '../../models/like'
import { CommentModel } from '../../models/comments'
let bookModel = new BookModel
let likeModel = new LikeModel
let commentModel = new CommentModel
Page({

    /**
     * 页面的初始数据
     */
    data: {
        book: null,
        comments: [],
        noComment: true,
        posting: false,
        like: false,
        count: 0
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
        commentModel.getComment(bid, (data) => {
            this.setData({
                noComment: data.comments == false ? true : false,
                comments: data.comments
            })
        })

        // 获取书籍的点赞数
        likeModel.getBookeStatus(bid, (data) => {
            this.setData({
                like: data.likeStatus,
                count: data.favNums
            })
        })
    },
    // 展开输入框
    onFakePost: function() {
        this.setData({
            posting: true
        })
    },
    // 收起输入框
    onCancel: function() {
        this.setData({
            posting: false
        })
    },
    // 确认输入的短评
    onPost: function(event) {
        let comment = event.detail.value || event.detail.text
        if (!comment) {
            return
        }
        if (comment.length > 12) {
            wx.showToast({
                title: '短评最多12个字',
                icon: 'none'
            })
            return
        }
        commentModel.addComment(this.data.book.id, comment, (data) => {
            wx.showToast({
                title: '+ 1',
                icon: "none"
            })
            this.data.comments.unshift({
                content: comment,
                nums: 1
            })
            this.setData({
                comments: this.data.comments,
                noComment: false
            })
        })
    },
    // 点赞
    onLike: function(event) {
        console.log(event.detail);
        let status = event.detail.behavior
        likeModel.like(status, this.data.book.id)
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})