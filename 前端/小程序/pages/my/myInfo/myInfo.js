// pages/my/myInfo/myInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        info: '',
        avaName: '',
        icon: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.getUserInfo({
            success: data => {
                console.log(data.userInfo);
                this.setData({
                    info: data.userInfo.nickName,
                    name: '姓名',
                    avaName: '头像',
                    icon: data.userInfo.avatarUrl
                })
            }
        })
    },


})