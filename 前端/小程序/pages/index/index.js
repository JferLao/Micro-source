import { BannerModel } from '../../models/banner'
const bannerModel = new BannerModel()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        banner: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.getBanner()
    },

    // 获取轮播图
    getBanner: function() {
        bannerModel.getBannerPic().then((res) => {
            this.setData({
                banner: res.banner
            })
        })
    },
    // 查看更多
    onMore() {

    }
})