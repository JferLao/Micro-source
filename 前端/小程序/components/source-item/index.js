// components/source-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        source: Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    attached: function() {
        // 在组件实例进入页面节点树时执行

    },
    /**
     * 组件的方法列表
     */
    methods: {
        OnSource() {
            this.triggerEvent('enterSource', {
                source: this.properties.source
            })
        },
        Ondelete(){
          this.triggerEvent('delete', {
            source: this.properties.source
          })
        }
    }
})