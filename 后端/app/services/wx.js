const axios = require('axios')
const util = require('util');
const { User } = require('../../app/models/user')
const { generateToken } = require('../../core/util')
const { Auth } = require('../../middlewares/auth')

// 微信类
class WXManage {
    // 获取openid
    static async codeToToken(code) {
        // 拼接url地址
        const url = util.format(global.config.wx.loginUrl, global.config.wx.appID, global.config.wx.appSecret, code)
            // 向腾讯地址发送请求
        const result = await axios.get(url)
        if (result.status !== 200) {
            throw new global.errs.AuthFailed('openid获取失败')
        }
        const errcode = result.data.errcode
        const errmsg = result.data.errmsg
        if (errcode) {
            throw new global.errs.AuthFailed('openid获取失败:' + errmsg)
        }

        // 根据openid写入用户到数据库的user表内
        // 在model层写上查询数据库的方法
        let user = await User.getUserByOpenid(result.data.openid)
        if (!user) {
            user = await User.registerByOpenid(result.data.openid)
        }
        return generateToken(user.id, Auth.USER)
    }
}

module.exports = { WXManage }