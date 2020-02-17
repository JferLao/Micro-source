const Router = require('koa-router')
const router = new Router({
    prefix: '/about'
})
const { About } = require('../models/about')


module.exports = router