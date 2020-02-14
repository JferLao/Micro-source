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