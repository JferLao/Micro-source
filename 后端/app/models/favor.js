const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Art } = require('../models/art')
class Favor extends Model {
    // 查出所有书籍
    static async getAll() {
        const books = await HotBook.findAll({
            artId: {
                order: [
                    ['index']
                ]
            }
        })
        const ids = []
        books.forEach((book) => {
            ids.push(book.id)
        })
        const favors = await Favor.findAll({
            where: {
                artId: {
                    [Op.in]: ids
                },
            },
            group: ['artId'],
            attributes: ['artId', [Sequelize.fn('COUNT', '*'), 'count']]
        })
        books.forEach(book => {
            HotBook._getEachBookStatus(book, favors)
        })
        return books

    }

    // 查询书本的点赞状态
    static async getBookFavor(uid, bookId) {
        // 查询点赞数
        const favorNums = await Favor.count({
                where: {
                    artId: bookId,
                }
            })
            // 找出我的喜爱中是否有该书籍
        const myFavor = await Favor.findOne({
            where: {
                uid,
                artId: bookId,
            }
        })
        return {
            favNums: favorNums,
            // 点赞状态
            likeStatus: myFavor ? 1 : 0
        }
    }

    // 点赞
    static async like(artId, uid) {
        const favor = await Favor.findOne({
                where: {
                    artId,
                    uid
                }
            })
            // 如果点赞信息存在则抛出已点过赞
        if (favor) {
            throw new global.errs.LikeError()
        }

        return sequelize.transaction(async t => {
            // 添加一条记录(Favor表)
            await Favor.create({
                artId,
                uid
            }, { transaction: t })
            const art = await Art.getData(artId)
            await art.increment('fav_nums', { by: 1, transaction: t })
        })
    }

    // 取消点赞
    static async disLike(artId, uid) {
        const favor = await Favor.findOne({
                where: {
                    artId,
                    uid
                }
            })
            // 如果点赞状态不存在抛出已取消点赞的状态
        if (!favor) {
            throw new global.errs.DislikeError()
        }
        return sequelize.transaction(async t => {
            // 删除一条记录(favor一条记录)
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getData(artId)
            await art.decrement('fav_nums', { by: 1, transaction: t })
        })
    }
}

Favor.init({
    uid: Sequelize.INTEGER,
    artId: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'favor'
})

module.exports = {
    Favor
}