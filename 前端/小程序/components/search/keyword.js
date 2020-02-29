import { HTTP } from '../../utils/http.js'
class KeywordModel extends HTTP {
    key = 'q' //方法都用到key
    max = 10
    constructor() {
            super()
        }
        // 获取缓存中的搜索历史
    getHistory() {
        var keywords = wx.getStorageSync(this.key)
        return keywords
    }

    // 获取热门搜索关键词
    getHot(success) {
        this.request({
            url: 'book/hot_keyword',
            success: success
        })
    }

    // 把关键字写入缓存
    addToHistory(word) {
        let keywords = this.getHistory()
            // 如果缓存有存在
        if (keywords) {
            let index = keywords.indexOf(word)
            if (index == -1) {
                let length = keywords.length
                if (length >= this.max) {
                    // 超过限制缓存关键词数则移除最后一个关键词
                    keywords.pop(word)
                }
                // 把搜索词放置在缓存第一位
                keywords.unshift(word)
            }
            wx.setStorageSync(this.key, keywords)
        } else {
            // 缓存不存在
            keywords = [word]
            wx.setStorageSync(this.key, keywords)
        }
    }
}

export { KeywordModel }