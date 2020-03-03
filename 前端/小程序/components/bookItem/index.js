// components/bookItem/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        bookImage: String,
        bookName: String,
        author: String,
        id:Number,
        book:Object
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
      onSelect(event){
        this.triggerEvent('selectBook',{
          book:this.properties.book
        })
      }
    }
})