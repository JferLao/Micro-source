const axios = require('axios')
const util = require('util')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Favor } = require('../models/favor')

class Book extends Model {
    constructor() {
        super()
    }

    // 根据id获取书本详情
    static async detail(id) {
        const url = util.format(global.config.yushu.detailUrl, id) //拼接url地址
        const detail = await axios.get(url) //发送请求
        return detail.data //返回请求结果    
    }

    // 搜索书籍
    static async searchFromYushu(q, start, count, summary = 1) {
        // 拼接url请求地址
        const url = util.format(
            global.config.yushu.keywordUrl, encodeURI(q), count, start, summary)
        const result = await axios.get(url)
        return result.data
    }

    // 获取喜欢数
    static async getMyFavorBookCount(uid) {
        const count = await Favor.count({
            where: {
                uid
            }
        })
        return count
    }
}

Book.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    },
    fav_nums: {
        type: Sequelize.INTEGER,
        default: 0
    }
}, {
    sequelize,
    tableName: 'book'
})

module.exports = {
    Book
}