const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
    constructor(level) {
        // 设置权限等级,默认为1
        this.level = level || 1
        Auth.USER = 8
        Auth.ADMIN = 16
        Auth.SUPER_ADMIN = 32
    }
    get m() {
            // 返回中间件函数
            return async(ctx, next) => {
                const userToken = basicAuth(ctx.req)
                let errMsg = 'token不合法'
                let decode = {}
                if (!userToken || !userToken.name) {
                    throw new global.errs.Forbbiden(errMsg)
                }
                try {
                    decode = jwt.verify(userToken.name, global.config.security.secretKey)
                } catch (err) {
                    if (err.name === 'TokenExpiredError') {
                        errMsg = 'token已过期'
                    }
                    throw new global.errs.Forbbiden(errMsg)
                }
                if (decode.scope < this.level) {
                    errMsg = "权限不足"
                    throw new global.errs.Forbbiden(errMsg)
                }

                // 开发者的自定义对象属性保存在ctx的auth属性上  
                ctx.auth = {
                    uid: decode.uid,
                    scope: decode.scope
                }

                // 执行next触发下一个中间件的执行
                await next()
            }
        }
        // 验证token
    static verifyToken(token) {
        try {
            // jwt解析加密token
            jwt.verify(token, global.config.security.secretKey)
            return true
        } catch (error) {
            return false
        }
    }
}

module.exports = { Auth }