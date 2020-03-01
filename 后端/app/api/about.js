const Router = require('koa-router')
const router = new Router({
    prefix: '/about'
})
const { PositiveIntegerValidator } = require('../validators/validator')
const { About } = require('../models/about')

router.post('/getAbout', async ctx => {
    // const v = await new PositiveIntegerValidator().validate(ctx)
    const res = await About.getContentById()
    ctx.body = {
        res
    }
})

module.exports = router