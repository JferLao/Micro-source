import { HTTP } from '../utils/http'

class CommentModel extends HTTP {
    constructor() {
        super()
    }

    // 获取评论
    getComment(bid, success) {
            var params = {
                url: `book/short_comment/${bid}`,
                isAuth: true,
                success
            }
            this.request(params)
        }
        // 添加评论
    addComment(bid, content, success) {
        var params = {
            url: 'book/add/short_comment',
            isAuth: true,
            data: {
                bookId: bid,
                content: content
            },
            success,
            error: (err) => {
                wx.showToast({
                    title: '评论失败',
                })
            }
        }
        this.request(params)
    }
}

export {
    CommentModel
}