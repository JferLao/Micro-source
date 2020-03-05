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

    // 获取全部课程分类
    getAllType(success) {
        var params = {
            url: 'source/getAlltype',
            success
        }
        this.request(params)
    }

    // 根据种类id获取课程
    getSourceByTypeId(id, success) {
        var params = {
            url: `source/getSourceByTypeId/${id}`,
            success
        }
        this.request(params)
    }

    // 获取全部课程
    getAllSource(success) {
        var params = {
            url: 'source/getAll',
            success
        }
        this.request(params)
    }

    // 搜索课程
    search(key, success) {
        var params = {
            url: 'source/search',
            data: {
                key
            },
            success
        }
        this.request(params)
    }

}
export {
    SourceModel
}