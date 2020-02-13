const bcrypt = require('bcryptjs')
const { Sequelize, Model } = require('sequelize')
const { sequelize } = require('../../core/db')


class User extends Model {

    // 通过验证邮箱号和密码登录
    static async verifyEmailPassword(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email
            }
        })
        if (!user) {
            throw new global.errs.NotFound('用户不存在')
        }

        // 利用bcrypt解析密码
        const correct = bcrypt.compareSync(plainPassword, user.password)
        if (!correct) {
            throw new global.errs.AuthFailed('密码不正确')
        }
        return user
    }

    // 微信小程序登录
    static async getUserByOpenid(openid) {
            const user = await User.findOne({
                where: {
                    openid
                }
            })

            return user
        }
        // 数据库新增openid
    static async registerByOpenid(openid) {
        return await User.create({
            openid
        })
    }
}
// 数据库表初始化
User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true, // 主键
        autoIncrement: true // 自动增长
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true // 唯一性
    },
    password: {
        type: Sequelize.STRING,
        // 通过set方法保存加密数据进数据库
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt)
            this.setDataValue('password', psw)
        }

    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true // 唯一性
    }
}, {
    sequelize,
})

module.exports = { User }