import { HTTP } from '../utils/http'
class BookModel extends HTTP {
    constructor() {
        super()
    }

    getHotList(success) {
        var params = {
            url: 'book/getHotBookList',
            success: success
        }
        this.request(params)
    }

    getBookDetail(id, success) {
        var params = {
            url: `book/detail/${id}`,
            success
        }
        this.request(params)
    }
}


export { BookModel }