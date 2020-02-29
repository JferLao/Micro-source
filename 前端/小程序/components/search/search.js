import { HTTP } from '../../utils/http'
import { KeywordModel } from 'keyword.js'
import { paginationBev } from '../behaviors/pagination'

let http = new HTTP()
let keyModel = new KeywordModel()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: '_loadMore'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyKeys: [],
        hotKeys: [],
        finished: false,
        q: '',
        loading: false,
        loadingCenter: false
    },

    /**
     * 组件的方法列表
     */
    methods: {
        _loadMore: function() {
            if (!this.data.q) {
                return
            }
            let hasMore = this.hasMore()
            if (!hasMore) {
                return
            }
            this.setData({
                loading: true
            })
            http.request({
                url: 'book/search?summary=1',
                data: {
                    q: this.data.q,
                    start: this.getCurrentStart()
                },
                success: (data) => {
                    this.setMoreData(data.books)
                    this.setData({
                        loading: false
                    })
                }
            })
        },
        // 触发取消事件,在页面接收
        onCancel: function(event) {
            this.triggerEvent('cancel', {}, {})
        },
        onDelete: function(event) {
            console.log(123);
            this.setData({
                finished: false,
                empty: false,
                q: ''
            })
        },

        onConfirm: function(event) {
            // 首先切换状态，隐藏内容,保持客户端流畅
            this.setData({
                finished: true,
                loadingCenter: true
            })

            this.initPagination()

            // 获取输入关键词
            let q = event.detail.value || event.detail.text

            http.request({
                url: 'book/search?summary=1',
                data: {
                    q: q,
                    start: this.getCurrentStart()
                },
                success: (data) => {
                    if (!(data.books == false)) {
                        keyModel.addToHistory(q)
                    }
                    this.setMoreData(data.books)
                    this.setData({
                        q: q,
                        loadingCenter: false
                    })
                }
            })
        }
    },
    // 组件的生命周期,初始化时调用
    attached: function() {
        // 绑定关键词
        this.setData({
            historyKeys: keyModel.getHistory()
        })

        // 绑定热门关键词
        keyModel.getHot((data) => {
            this.setData({
                hotKeys: data.hot
            })
        })
    }
})