const { Sequelize, Model, Op } = require('sequelize')
const { sequelize } = require('../../core/db')
const { Art } = require('../models/art')

class MySource extends Model {
    // 把课程加入到我的课程中
    static async like(sourceId, uid) {
        const favor = await MySource.findOne({
                where: {
                    sourceId,
                    uid
                }
            })
            // 如果点赞信息存在则抛出已点过赞
        if (favor) {
            throw new global.errs.LikeError()
        }

        return sequelize.transaction(async t => {
            // 添加一条记录(MySource表)
            await MySource.create({
                sourceId,
                uid
            }, { transaction: t })

            const art = await Art.getSourceData(sourceId)
            await art.increment('stu_num', { by: 1, transaction: t })
        })
    }

    // 取消点赞
    static async disLike(sourceId, uid) {
        const favor = await MySource.findOne({
                where: {
                    sourceId,
                    uid
                }
            })
            // 如果点赞状态不存在抛出已取消点赞的状态
        if (!favor) {
            throw new global.errs.DislikeError()
        }
        return sequelize.transaction(async t => {
            // 删除一条记录(favor一条记录)
            await favor.destroy({
                force: true,
                transaction: t
            })
            const art = await Art.getSourceData(sourceId)
            await art.decrement('stu_num', { by: 1, transaction: t })
        })
    }
}

MySource.init({
    uid: Sequelize.INTEGER,
    sourceId: Sequelize.INTEGER
}, {
    sequelize,
    tableName: 'mySource'

})

module.exports = { MySource }