const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class SourceType extends Model {
    // 获取全部课程分类
    static async getAllType() {
        const type = await SourceType.findAll({
            // 排序:[['属性',排序顺序]]
            order: [
                ['type', 'DESC']
            ]
        })
        let res = type.map(type => {
            return {
                type: type.type,
                name: type.name
            }
        })
        return res
    }

    // 根据id获取课程分类
    static async getTypeById(id) {
        const type = await SourceType.findOne({
            where: {
                type: id
            }
        })
        return type
    }
}

SourceType.init({
    type: Sequelize.INTEGER,
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'sourcetype'

})

module.exports = { SourceType }