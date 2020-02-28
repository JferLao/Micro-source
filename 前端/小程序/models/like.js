import { HTTP } from '../utils/http'

class LikeModel extends HTTP {
    constructor() {
            super()
        }
        // 获取所有点赞数
    countBookLike(success) {
            var params = {
                url: 'book/favor/count',
                isAuth: true,
                success
            }
            this.request(params)
        }
        // 获取书本的点赞状态
    getBookeStatus(bid, success) {
            var params = {
                url: `book/favor/${bid}`,
                isAuth: true,
                success
            }
            this.request(params)
        }
        // 进行点赞/取消点赞
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