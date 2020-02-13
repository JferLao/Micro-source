const { HttpException } = require('../core/http-exception')

const catchError = async(ctx, next) => {
    try {
        // 异步执行中间件next()捕获错误
        await next()
    } catch (error) {
        // 捕获错误
        const isDev = global.config.environment === 'env'
        const isHttpException = error instanceof HttpException

        // 开发环境如果是开发环境并且是http的错误则抛出异常
        if (isDev && !isHttpException) {
            throw error
        }
        if (isHttpException) {
            ctx.body = {
                msg: error.msg,
                error_code: error.errorCode,
                request: `${ctx.method} ${ctx.path}`
            }
            ctx.status = error.code
        } else {
            ctx.body = {
                msg: '服务器异常',
                error_code: 9999,
                request: `${ctx.method} ${ctx.path}`,
            }
            ctx.status = 500
        }
    }
}

module.exports = catchError