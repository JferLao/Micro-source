const Router = require('koa-router')
const { TokenValidator, NotEmptyValitador } = require('../validators/validator')
const router = new Router({ prefix: '/token' })
const { Auth } = require('../../middlewares/auth')
const { WXManage } = require('../services/wx')

router.post('/login', async(ctx) => {
    // 校验token信息
    const v = await new TokenValidator().validate(ctx)
    let token = await WXManage.codeToToken(v.get('body.account'))
    ctx.body = {
        token: token
    }
})

// 验证token
router.post('/verify', async(ctx) => {
    const v = await new NotEmptyValitador().validate(ctx)
    const result = Auth.verifyToken(v.get('body.token'))
    ctx.body = {
        result
    }
})


module.exports = router