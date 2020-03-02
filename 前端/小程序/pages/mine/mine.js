// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [
            { title: '个人信息', link: '/' },
            { title: '我的课程', link: '/' },
            { title: '喜欢的图书', link: '/' },
            { title: '帮助中心', link: '/' },
            { title: '关于我', link: '/' },
        ],
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getUserInfo({
            success: data => {
                console.log(data.userInfo);
                this.setData({
                    userInfo: data.userInfo
                })
            }
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