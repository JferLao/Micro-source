const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')

class Comment extends Model {
    static async addComment(bookId, content) {
            // 在数据库中根据书本id和短评内容查找
            const comment = await Comment.findOne({
                    where: {
                        bookId,
                        content
                    }
                })
                // 如果短评不存在则创建一条,并且设置短评数为1,存在则数加一
            if (!comment) {
                return await Comment.create({
                    bookId,
                    content,
                    nums: 1
                })
            } else {
                // comment的nums加一
                return await comment.increment('nums', {
                    by: 1
                })
            }
        }
        // 根据书本id获取短评
    static async getComment(bookId) {
        const comments = await Comment.findAll({
            where: {
                bookId
            }
        })
        return comments
    }
}

Comment.init({
    content: Sequelize.STRING(12),
    nums: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    bookId: Sequelize.INTEGER,
}, {
    sequelize,
    tableName: 'comment'
})

module.exports = {
    Comment
}