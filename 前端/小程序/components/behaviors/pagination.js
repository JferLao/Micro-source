const paginationBev = Behavior({
    data: {
        dataArray: [], //分页不断加载的数据
        total: null, //总共数
        noneResult: false, //没有结果
        loading: false //锁的状态
    },

    methods: {
        // 合并新的数据到之间的数据中
        setMoreData(dataArray) {
            // 合并数据
            const tempArray = this.data.dataArray.concat(dataArray)
            this.setData({
                dataArray: tempArray
            })
        },

        // 是否还有更多数据需要加载
        hasMore: function() {
            if (this.data.dataArray.length >= this.data.total) {
                return false
            } else {
                return true
            }
        },

        // 设置数据总数
        setTotal(total) {
            this.data.total = total
            if (total == 0) {
                this.setData({
                    noneResult: true
                })
            }
        },

        // 获取分页数
        getCurrentStart: function() {
            return this.data.dataArray.length
        },

        // 清空数据
        initPagination: function() {
            this.setData({
                dataArray: [],
                noneResult: false,
                loading: false
            })
            this.data.total = null
        },
        // 判断是否锁状态
        isLocked() {
            return this.data.loading ? true : false
        },
        // 请求上锁
        locked() {
            this.setData({
                loading: true
            })
        },
        // 请求解锁
        unLocked() {
            this.setData({
                loading: false
            })
        },
    }
})


export {
    paginationBev
}