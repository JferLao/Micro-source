const requireDirectory = require('require-directory')
const Router = require('koa-router')

// 全局保存的方法和数据
class InitManager {
    static initCore(app) {
        // 入口方法
        // 把app保存在类上
        InitManager.app = app

        // 在类里面调用静态方法
        InitManager.initLoadRouters()
            // 全局进行异常处理
        InitManager.loadHttpException()
            // 把设置保存在全局中
        InitManager.loadConfig()
    }

    static loadConfig(path = '') {
        const configPath = path || process.cwd() + '/config/config.js'
        const config = require(configPath)
        global.config = config
    }

    static initLoadRouters() {
        // 使用绝对路径
        const apiDirectory = `${process.cwd()}/app/api`
        requireDirectory(module, apiDirectory, { visit: whenLoadModule })

        // 加载路由时的回调
        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    // 把所有异常都装载在global下的errs内,然后通过new global.errs.ParameterException()
    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
}
// 导出
module.exports = InitManager