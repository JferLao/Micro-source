import { HTTP_P } from '../utils/http-p'

class Mine extends HTTP_P {
    constructor() {
        super()
    }

    // 获取关于我的信息
    getAbout() {
        return this.request({
            url: 'about/getAbout'
        })
    }
}
export {
    Mine
}