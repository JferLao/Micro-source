const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Source } = require('../models/source')
class SourceType extends Model {
    // 获取全部课程分类
    static async getAllType() {
        const type = await SourceType.findAll({
            // 排序:[['属性',排序顺序]]
            order: [
                ['type', 'ASC']
            ]
        })
        let res = type.map(type => {
            return {
                type: type.type,
                name: type.name,
                id: type.id
            }
        })
        return res
    }

    // 根据id获取课程分类
    static async getTypeById(id) {
            const type = await SourceType.findOne({
                where: {
                    type: id - 1
                }
            })
            const source = await Source.findAll({
                where: {
                    type: type.type
                }
            })
            return source
        }
        // 根据
}

SourceType.init({
    type: Sequelize.INTEGER,
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'sourcetype'

})

module.exports = { SourceType }