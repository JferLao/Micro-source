const Router = require('koa-router')
const router = new Router({ prefix: '/book' })
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { HotBook } = require('../models/bookHot')

// 获取热销图书的列表
router.post('/getHotBookList', async(ctx) => {
    const books = await HotBook.getAll()
    ctx.body = { books }
})




module.exports = router