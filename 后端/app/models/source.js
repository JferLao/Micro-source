const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class Source extends Model {

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