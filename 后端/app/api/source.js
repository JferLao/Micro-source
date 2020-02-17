const Router = require('koa-router')
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const { PositiveIntegerValidator } = require('../validators/validator')
const router = new Router({
    prefix: '/source'
})
const { Source } = require('../models/source')
const { SourceType } = require('../models/sourceType')

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
    ctx.body = type
})

// 获取全部课程
router.post('/getAll', async ctx => {
    const source = await Source.getAll()
    ctx.body = source
})


module.exports = router