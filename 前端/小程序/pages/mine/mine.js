// pages/mine/mine.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: [{
                title: '个人信息',
                link: '/pages/my/myInfo/myInfo'
            },
            {
                title: '我的课程',
                link: '/pages/my/myInfo/myInfo'
            },
            {
                title: '喜欢的图书',
                link: '/pages/my/favorBook/favorBook'
            },
            {
                title: '关于我',
                link: '/pages/my/me/me'
            },
        ],
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        // 判断是否授权过
        wx.getSetting({
            success: (res) => {
                if (res.authSetting['scope.userInfo']) {
                    wx.getUserInfo({
                        success: data => {
                            this.setData({
                                userInfo: data.userInfo
                            })
                        }
                    })
                } else {
                    wx.reLaunch({
                        url: "../login/login"
                    })
                }
            }
        })

    },


})