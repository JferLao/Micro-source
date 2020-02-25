import { config } from '../config/config'
import { Base64 } from './base64'

class HTTP {
    constructor() {
        this.baseRestUrl = config.api_url
    }
    request(params) {
            var that = this
            var url = this.baseRestUrl + params.url //合并请求地址
            var header = {}
                // 请求与方法
            if (!params.method) {
                params.method = 'POST'
            }
            // 请求头部设置
            if (params.isAuth) {
                header = {
                    'content-type': 'application/json',
                    'Authorization': HTTP._encode()
                }
            } else {
                header = {
                    'content-type': 'application/json'
                }
            }
            wx.request({
                url: url,
                data: params.data,
                header: header,
                method: params.method,
                // 对完成请求进行处理
                success: (res) => {
                    // 判断以2（2xx)开头的状态码为正确
                    // 异常不要返回到回调中，就在request中处理，记录日志并showToast一个统一的错误即可
                    var code = res.statusCode.toString();
                    var startChar = code.charAt(0);
                    if (startChar == '2') {
                        params.success && params.success(res.data);
                    } else {
                        params.error && params.error(res);
                    }
                },
                // 未能完成请求的处理
                fail: (err) => { params.fail && params.fail(err) },

            });
        }
        // token的解码
    static _encode() {
        var token = wx.wx.getStorageSync('token')
        const base64 = Base64(token + ':')
        return 'Basic ' + base64

    }
}

export { HTTP }