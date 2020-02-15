const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

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