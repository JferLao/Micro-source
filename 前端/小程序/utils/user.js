import { config } from '../config/config'
class User {
    constructor() {}
    static loginById(openid) {
        var url = config.api_url + 'token/login'
        var header = {
            'content-type': 'application/json'
        }
        console.log(url);
        wx.request({
            url: url,
            data: {
                account: openid
            },
            header: header,
            method: 'POST',
            // 对完成请求进行处理
            success: (res) => {
                if (res.data) {
                    if (res.data.token) {
                        let token = res.data.token
                        wx.setStorageSync('token', token)
                    }
                }


            },
        });

    }
    login() {
        wx.login({
            success(res) {
                if (res.code) {
                    let token = wx.getStorageSync('token')
                    if (!token) {
                        User.loginById(res.code)
                    }
                    return token
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    }
}
export { User }