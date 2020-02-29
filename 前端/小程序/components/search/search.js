import { Book_PModel } from '../../models/book.js'
import { KeywordModel } from '../../models/keyword.js'
import { paginationBev } from '../behaviors/pagination'

const keywordModel = new KeywordModel()
const bookModel = new Book_PModel()

Component({
    /**
     * 组件的属性列表
     */
    behaviors: [paginationBev],
    properties: {
        more: {
            type: String,
            observer: 'loadMore'
                // true, true, true,
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        historyKeys: [],
        hotKeys: [],
        searching: false,
        q: '',
        loading: false,
        loadingCenter: false
    },

    // 组件的生命周期,初始化时调用
    attached: function() {
        // 绑定关键词
        this.setData({
            historyWords: keywordModel.getHistory()
        })

        // 绑定热门关键词
        keywordModel.getHot().then(res => {
            this.setData({
                hotWords: res.hot
            })
        })
    },
    /**
     * 组件的方法列表
     */
    methods: {
        loadMore: function() {
            console.log(this.data);
            // 初始情况下不发送请求
            if (!this.data.q) {
                return
            }
            // 锁住状态不加载更多
            if (this.isLocked()) {
                return
            }
            //   有更多数据加载
            if (this.hasMore()) {
                //   解锁
                this.locked()
                    // 发送搜索请求
                bookModel.search(this.getCurrentStart(), this.data.q)
                    .then(res => {
                        console.log(res);
                        this.setMoreData(res.books)
                            // 上锁
                        this.unLocked()
                    }, () => {
                        this.unLocked()
                    })
                    // 死锁
            }
        },
        // 触发取消事件,在页面接收
        onCancel: function(event) {
            this.initPagination()
            this.triggerEvent('cancel', {}, {})
        },
        // 取消搜索,关闭搜索内容
        onDelete: function(event) {
            this.initPagination()
            this._closeResult()
        },


        onConfirm: function(event) {
            // 首先切换状态，隐藏内容,保持客户端流畅
            this._showResult()
            this._showLoadingCenter()

            // 重置数据
            this.initPagination()

            // 获取输入关键词
            const q = event.detail.value || event.detail.text
            this.setData({
                    q
                })
                //   请求
            bookModel.search(0, q)
                .then(res => {
                    this.setMoreData(res.books)
                    this.setTotal(res.total)
                    keywordModel.addToHistory(q)
                    this._hideLoadingCenter()
                })
        },

        // 显示加载动画
        _showLoadingCenter() {
            this.setData({
                loadingCenter: true
            })
        },
        // 隐藏加载动画
        _hideLoadingCenter() {
            this.setData({
                loadingCenter: false
            })
        },

        //   显示搜索结果
        _showResult() {
            this.setData({
                searching: true
            })
        },

        //   关闭搜索结果
        _closeResult() {
            this.setData({
                searching: false,
                q: ''
            })
        }
    },

})