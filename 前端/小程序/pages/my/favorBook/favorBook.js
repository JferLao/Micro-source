import {
  BookModel
} from '../../../models/book'
const bookModel = new BookModel()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    booklist: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getFavor()
    console.log(this.data);
  },

  // 获取喜欢的图书
  getFavor() {
    let that = this
    bookModel.getFavor((data) => {
      let res = data.book
      let list = res.map(item => {
        return item.artId
      })
      let o = []
      for (let i = 0; i < list.length; i++) {
        bookModel.getBookDetail(list[i], (data) => {
          that.setData({
            booklist: this.data.booklist.concat([data])
          })
        })
      }
    })
  },

  // 跳转到对应图书
  selectBook: function(events) {
    let id = events.detail.book.id
    wx.navigateTo({
      url: '../../detail/detail?bid=' + id
    })

  }

})