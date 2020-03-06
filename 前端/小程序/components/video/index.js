// components/video/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    video:Object,
  },

  /**
   * 组件的初始数据
   */
  data: {
    videoControl:{
      controls:true,  //控件显示
      autoplay:false, //自动播放
      loop:false,     //循环播放
    }
  },

  attached: function () {
    // 在组件实例进入页面节点树时执行
    console.log(this.properties.video)
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
