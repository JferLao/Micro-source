const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')


class Banner extends Model {

}
// 数据库表初始化
Banner.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true // 自动增长
    },
    image: Sequelize.STRING,
    index: Sequelize.INTEGER


}, {
    sequelize,
    tableName: 'banner'
})

module.exports = { Banner }