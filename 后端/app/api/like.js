const Router = require('koa-router')
const { Auth } = require('../../middlewares/auth')
const { LikeValidator } = require('../validators/validator')
const { Favor } = require('../models/favor')
const { success } = require('../lib/helper')
const router = new Router({
    prefix: '/book'
})

router.post('/like', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'artId'
    })
    await Favor.like(v.get('body.artId'), ctx.auth.uid)
    success()
})

router.post('/unlike', new Auth().m, async ctx => {
    const v = await new LikeValidator().validate(ctx, {
        id: 'artId'
    })
    await Favor.disLike(v.get('body.artId'), ctx.auth.uid)
    success()
})



module.exports = router