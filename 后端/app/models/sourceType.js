const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class SourceType extends Model {

}

SourceType.init({
    type: Sequelize.INTEGER,
    name: Sequelize.STRING
}, {
    sequelize,
    tableName: 'sourcetype'

})

module.exports = { SourceType }