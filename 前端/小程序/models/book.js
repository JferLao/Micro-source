import { HTTP } from '../utils/http'
import { HTTP_P } from '../utils/http-p'
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

    //获取点赞图书
    getFavor(success) {
        var params = {
            url: 'book/favor/myfavor',
            isAuth: true,
            success
        }
        this.request(params)
    }

    // 获取我喜欢的图书
    getMyFavorBook(success) {
        let r = this.getFavor(success)

    }
}

class Book_PModel extends HTTP_P {
    constructor() {
            super()
        }
        // 获取搜索数据
    search(start, q) {
        return this.request({
            url: 'book/search',
            data: {
                q: q,
                start: start,
                count: 20
            }
        })
    }
}

export { BookModel, Book_PModel }