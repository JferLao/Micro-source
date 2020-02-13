const Koa = require('koa') // 导入koa
const parser = require('koa-bodyparser')
const static = require('koa-static')
const path = require('path')
const InitManager = require('./core/init')

const catchError = require('./middlewares/exception')

// 实例化koa应用
const app = new Koa();

app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))

process.cwd()
    // 把路有方法分离到外面的文件
InitManager.initCore(app)



// 启动程序
app.listen(3000)