const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class Source extends Model {
    // 获取全部课程
    static async getAll() {
        const source = await Source.findAll({
            // 排序:[['属性',排序顺序]]
            order: [
                ['index', 'DESC']
            ]
        })
        return source
    }

    // 获取最新课程(可分页)
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

    // 根据id获取课程详情
    static async getSourceById(id) {
        const source = await Source.findOne({
            where: {
                id
            }
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