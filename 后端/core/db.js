const { Sequelize } = require('sequelize')
const { dbName, host, port, user, password } = require('../config/config').database
const { unset, clone } = require('lodash')

// 参数database,user,password,js对象
const sequelize = new Sequelize(dbName, user, password, {
    dialect: 'mysql',
    host,
    port,
    timezone: '+08:00',

    define: {
        paranoid: true, // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时)
        underscored: true, // 将自动设置所有属性的字段参数为下划线命名方式
    }
})

sequelize.sync({
    // 每次数据库都会清空
    // force: true
})

// Model.prototype.toJSON = function() {
//     let data = clone(this.dataValues)

//     unset(data, 'updatedAt')
//     unset(data, 'createdAt')
//     unset(data, 'deletedAt')

//     for (key in data) {
//         if (key === 'image') {
//             if (!data[key].startsWith('http'))
//                 data[key] = global.config.host + data[key]
//         }
//     }

//     return data
// }

module.exports = {
    sequelize
}