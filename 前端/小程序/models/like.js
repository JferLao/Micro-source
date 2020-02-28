import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
    constructor() {
        super()
    }

    countBookLike(success) {
        var params = {
            url: 'book/favor/count',
            isAuth: true,
            success
        }
        this.request(params)
    }
    getBookeStatus(bid, success) {
        var params = {
            url: `book/favor/${bid}`,
            isAuth: true,
            success
        }
        this.request(params)
    }
    like(status, bid) {
        let url = status === 'cancel' ? 'book/unlike' : 'book/like'
        this.request({
            url: url,
            data: {
                artId: bid
            },
            isAuth: true,
            success: (data) => {
                console.log(data)
            }
        })
    }
}

export { LikeModel }