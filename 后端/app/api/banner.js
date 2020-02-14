const Router = require('koa-router')
const router = new Router({ prefix: '/banner' })
const { Banner } = require('../models/banner')
    // 接收参数 参数校验

// 注册接口
router.post('/getBanner', async(ctx) => {
    const banner = await Banner.findAll({
        // 排序:[['属性',排序顺序]]
        order: [
            ['index', 'DESC']
        ]
    })
    ctx.body = {
        banner
    }
})

module.exports = router