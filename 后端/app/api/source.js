const Router = require('koa-router')
const { Auth } = require('../../middlewares/auth')
const { success } = require('../lib/helper')
const router = new Router({
    prefix: '/source'
})
const { Source } = require('../models/source')
const { SourceType } = require('../models/sourceType')


module.exports = router