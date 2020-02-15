const Router = require('koa-router')
const router = new Router({ prefix: '/book' })
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { HotBook } = require('../models/bookHot')
const { PositiveIntegerValidator } = require('../validators/validator')
const { Book } = require('../models/book')
    // 获取热销图书的列表
router.post('/getHotBookList', async(ctx) => {
    const books = await HotBook.getAll()
    ctx.body = { books }
})

// 根据书本id获取书本详情
router.post('/detail/:id', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
        // const book = new Book()
    ctx.body = await Book.detail(v.get('path.id'))
})



module.exports = router