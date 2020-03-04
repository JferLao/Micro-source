import { HTTP } from '../utils/http'

class SourceModel extends HTTP {
    constructor() {
        super()
    }

    // 获取最新课程
    getLatestSource(start, count, success) {
        var params = {
            url: 'source/getLatest',
            data: {
                start,
                count
            },
            success
        }
        this.request(params)
    }
}
export {
    SourceModel
}