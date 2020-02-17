const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class About extends Model {

}

About.init({
    index: Sequelize.INTEGER,
    content: Sequelize.STRING
}, {
    sequelize,
    tableName: 'about'

})

module.exports = { About }