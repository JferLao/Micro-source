const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class About extends Model {
    static async getContentById(id) {
        const content = await About.findOne({
            where: {
                id
            }
        })
        return content
    }
}

About.init({
    index: Sequelize.INTEGER,
    content: Sequelize.STRING
}, {
    sequelize,
    tableName: 'about'

})

module.exports = { About }