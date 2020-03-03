// pages/login/login.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    onGetUserInfo(res) {
        let that = this
        console.log(res);
        wx.showToast({ title: '加载中', icon: 'loading', duration: 10000 });
        if (res.detail.userInfo) {
            wx.login({
                success: function(res) {
                    wx.reLaunch({
                        url: "../mine/mine"
                    })
                }
            })
        } else {
            console.log("点击了拒绝授权");
        }
    },
})