import { HTTP_P } from '../utils/http-p'

class BannerModel extends HTTP_P {
    constructor() {
            super()
        }
        // 获取轮播图
    getBannerPic() {
        return this.request({
            url: 'banner/getBanner'
        })
    }
}
export {
    BannerModel
}