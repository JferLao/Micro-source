const Router = require('koa-router')
const router = new Router({ prefix: '/book' })
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { HotBook } = require('../models/bookHot')
const { PositiveIntegerValidator, SearchValidator } = require('../validators/validator')
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

// 搜索书本(可翻页)
router.post('/search', async ctx => {
    const v = await new SearchValidator().validate(ctx)
    const result = await Book.searchFromYushu(
        v.get('body.q'), v.get('body.start'), v.get('body.count'))
    ctx.body = result
})

// 获取图书的点赞数
router.post('/favor/count', new Auth().m, async ctx => {
    const count = await Book.getMyFavorBookCount(ctx.auth.uid)
    ctx.body = {
        count
    }
})



module.exports = router