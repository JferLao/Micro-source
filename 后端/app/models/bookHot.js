const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Favor } = require('../models/favor')

class HotBook extends Model {
    static async getAll() {
        // 找出热销图书表中的全部数据
        const books = await HotBook.findAll({
                artId: {
                    order: [
                        ['index']
                    ]
                }
            })
            // 将全部数据的id保存在数组中
        const ids = []
        books.forEach((book) => {
                ids.push(book.id)
            })
            // 查询favor表找出点赞过的图书
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

    // 获取每本书的点赞状态
    static _getEachBookStatus(book, favors) {
        let count = 0 //计数器
            // 遍历favor表找出与热销图书点赞相同的id数
        favors.forEach(favor => {
            if (book.id === favor.artId) {
                count = favor.get('count')
            }
        })

        // book添加属性点赞数
        book.setDataValue('fav_nums', count)
        return book
    }

}

HotBook.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    author: Sequelize.STRING,
    title: Sequelize.STRING
}, {
    sequelize,
    tableName: 'hotBook'
})

module.exports = {
    HotBook
}