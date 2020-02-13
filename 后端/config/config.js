module.exports = {
    // 开发环境设置
    environment: 'dev',
    database: {
        dbName: 'source',
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '123'
    },
    security: {
        // 设置的令牌
        secretKey: "jferlaoSource",
        // 失效时间设置为1个小时
        expiresIn: 60 * 60 * 24 * 30

    },
    wx: {
        appID: 'wx2c04ed64726ed38d',
        appSecret: 'fc6f17b8c393cdb768ba1be0095d97a9',
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code'
    },
    yushu: {
        detailUrl: 'http://t.yushu.im/v2/book/id/%s',
        keywordUrl: 'http://t.yushu.im/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'https://127.0.0.1:3000/'
}