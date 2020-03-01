const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')

class About extends Model {
    static async getContentById() {
        const content = await About.findOne({
            order: [
                ['created_at', 'DESC']
            ]
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