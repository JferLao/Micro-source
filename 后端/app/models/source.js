const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class Source extends Model {
    static async getAll() {
        const source = await Source.findAll({
            // 排序:[['属性',排序顺序]]
            order: [
                ['index', 'DESC']
            ]
        })
        return source
    }

    static async getLatest(start, count) {
        const source = await Source.findAll({
            // 排序:[['属性',排序顺序]]
            order: [
                ['created_at', 'DESC']
            ],
            offset: (start - 1) * count,
            limit: count
        })
        return source
    }

}

Source.init({
    index: Sequelize.INTEGER,
    image: Sequelize.STRING,
    name: Sequelize.STRING,
    type: Sequelize.INTEGER,
    stuNum: Sequelize.INTEGER,
    video: Sequelize.STRING,
    detail: Sequelize.STRING
}, {
    sequelize,
    tableName: 'source'

})

module.exports = { Source }