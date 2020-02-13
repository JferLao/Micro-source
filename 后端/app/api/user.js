const Router = require('koa-router')
const router = new Router({ prefix: 'user' })
const { User } = require('../models/user')
const { RegisterValidator } = require('../validators/validator')
const { success } = require('../lib/helper')
    // 接收参数 参数校验

// 注册接口
router.post('/register', async(ctx) => {
    const v = await new RegisterValidator().validate(ctx)
        // 加密密码(参数为成本值)
    const user = {
        email: v.get('body.email'),
        password: v.get('body.password2'),
        nickname: v.get('body.nickname')
    }
    await User.create(user)
    success()
})

module.exports = router