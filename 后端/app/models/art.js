const { Op } = require('sequelize')
const { flatten } = require('lodash')



class Art {
    // 业务id和查询的种类
    constructor(artId) {
        this.artId = artId
    }

    // 获取详情
    async getDetail(uid) {
        // 局部导入防止模块循环
        const { Favor } = require('./favor')
        const art = await Art.getData(this.artId)
        if (!art) {
            throw new global.errs.NotFound()
        }
        // 点赞状态
        const like = await Favor.userLikeIt(this.artId, uid)
        return {
            art: art,
            like_status: like
        }
    }

    static async getList(artInfoList) {
        // 每种类型放置
        const artInfoObj = {
            100: [],
            200: [],
            300: []
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.art_id)
        }
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (!ids.length) {
                continue
            }
            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }
        return flatten(arts)
    }

    // 私有方法
    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh'
        switch (type) {
            case 100:
                arts = await Movie.findAll(finder)
                break
            case 200:
                arts = await Music.findAll(finder)
                break
            case 300:
                arts = await Sentence.findAll(finder)
                break
            case 400:
                break
            default:
                break
        }
        return arts
    }

    static async getData(artId) {
        const { Book } = require('../models/book')
        const finder = {
            where: {
                id: artId
            }
        }
        let art = await Book.findOne(finder)
        if (!art) {
            art = await Book.create({
                id: artId
            })
        }
        return art
    }

    static async getSourceData(sourceId) {
        const { Source } = require('../models/source')
        let art = await Source.findOne({
            where: {
                id: sourceId
            }
        })
        if (!art) {
            art = await Source.create({
                id: sourceId
            })
        }
        return art
    }
}

module.exports = { Art }