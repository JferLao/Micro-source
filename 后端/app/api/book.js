const Router = require('koa-router')
const router = new Router({ prefix: '/book' })
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { HotBook } = require('../models/bookHot')
const { PositiveIntegerValidator, SearchValidator, AddShortCommentValidator } = require('../validators/validator')
const { Book } = require('../models/book')
const { Favor } = require('../models/favor')
const { Comment } = require('../models/bookComment')

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

// 获取我喜欢的书籍
router.post('/favor/myfavor', new Auth().m, async ctx => {
    const book = await Book.getMyFavorBook(ctx.auth.uid)
    ctx.body = {
        book
    }
})


//获取书本的点赞
router.post('/favor/:bookId', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'bookId'
    })
    const favor = await Favor.getBookFavor(
        ctx.auth.uid, v.get('path.bookId'))
    ctx.body = favor
})

// 添加短评
router.post('/add/short_comment', new Auth().m, async ctx => {
    const v = await new AddShortCommentValidator().validate(ctx, {
        id: 'bookId'
    })
    await Comment.addComment(v.get('body.bookId'), v.get('body.content'))
    success()
})

//根据id获取书籍的短评
router.post('/short_comment/:bookId', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'bookId'
    })
    const bookId = v.get('path.bookId')
    const comments = await Comment.getComment(bookId)
    ctx.body = {
        comments: comments,
        bookId
    }
})

// 获取热门关键字,直接固定词汇
router.post('/hot_keyword', async ctx => {
    ctx.body = {
        'hot': ['Python',
            '哈利·波特',
            '村上春树',
            '东野圭吾',
            '白夜行',
            '韩寒',
            '金庸',
            '王小波'
        ]
    }
})


module.exports = router