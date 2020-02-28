import { HTTP } from '../utils/http'
class BookModel extends HTTP {
    constructor() {
        super()
    }

    // 获取热搜
    getHotList(success) {
        var params = {
            url: 'book/getHotBookList',
            success: success
        }
        this.request(params)
    }

    // 获取书本详细信息
    getBookDetail(id, success) {
        var params = {
            url: `book/detail/${id}`,
            success
        }
        this.request(params)
    }


}


export { BookModel }