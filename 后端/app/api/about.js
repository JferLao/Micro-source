const Router = require('koa-router')
const router = new Router({
    prefix: '/about'
})
const { PositiveIntegerValidator } = require('../validators/validator')
const { About } = require('../models/about')

router.post('/getAbout/:id', async ctx => {
    const v = await new PositiveIntegerValidator().validate(ctx)
    const res = await About.getContentById(v.get('path.id'))
    ctx.body = {
        res
    }
})

module.exports = router