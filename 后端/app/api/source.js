const Router = require('koa-router')
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { PositiveIntegerValidator, LikeValidator, SourceValidator } = require('../validators/validator')
const router = new Router({
    prefix: '/source'
})
const { GetLatest } = require('../validators/validator')
const { Source } = require('../models/source')
const { SourceType } = require('../models/sourceType')
const { MySource } = require('../models/mySource')

// 获取全部课程分类id和名称
router.post('/getAlltype', async ctx => {
    const type = await SourceType.getAllType()
    ctx.body = {
        type
    }
})

// 根据种类id获取课程
router.post('/getSourceByTypeId/:id', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const type = await SourceType.getTypeById(v.get('path.id'))
    ctx.body = { type }
})

// 获取全部课程
router.post('/getAll', async ctx => {
    const source = await Source.getAll()
    ctx.body = { source }
})

// 获取最新课程
router.post('/getLatest', async ctx => {
    const v = await new GetLatest().validate(ctx)
    const source = await Source.getLatest(v.get('body.start'), v.get('body.count'))
    ctx.body = { source }
})

// 根据id获取课程详情
router.post('/getDetailById/:id', new Auth().m, async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const source = await Source.getSourceById(v.get('path.id'))
    ctx.body = { source }
})

// 把课程加入到我的课表中
router.post('/like', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'sourceId'
    })
    await MySource.like(v.get('body.sourceId'), ctx.auth.uid)
    success()
})

// 把课程从我的课表中移除
router.post('/unlike', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'sourceId'
    })
    await MySource.disLike(v.get('body.sourceId'), ctx.auth.uid)
    success()
})


//获取我的课程
router.post('/getMySource', new Auth().m, async ctx => {
    const mySource = await MySource.getMySource(ctx.auth.uid)
    ctx.body = {
        mySource
    }
})

// 搜索课程
router.post('/search', async ctx => {
    const v = await new SourceValidator().validate(ctx, {
        key: 'key'
    })
    const source = await Source.search(v.get('body.key'))
    ctx.body = {
        source
    }
})


module.exports = router