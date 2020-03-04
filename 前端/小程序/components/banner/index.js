// components/banner/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    indicatorDots:{ //显示小圆点
      type:Boolean,
      value:true
    },
    autoPlay:{      //自动播放
      type:Boolean,
      value:true
    },
    interval:{      //自动切换时间
      type:Number,
      value:4000
    },
    duration:{      //滑动时间时长
      type:Number,
      value:500
    },
    banner:Array,
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

  }
})
