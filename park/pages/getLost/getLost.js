var app = getApp()
Page({
  data: {
    start: ['扫描二维码选择','信息学院', '物质学院', '生命学院', '海科路出入口', '环科路出入口', '一食堂'],
    end: ['信息学院','物质学院','生命学院','海科路出入口','环科路出入口','一食堂'],
    start_index: 0,
    end_index: 0,
    scan_result: '',
    code2location: {'0001':'信息学院'}
  },
  bindPickerChange0: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      start_index: e.detail.value
    })
  },
  bindPickerChange1: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      end_index: e.detail.value
    })
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        console.log(res.result)
        
        that.setData({
          scan_result: res.result,
        })
        app.globalData.location = res.result  
        
      },
      fail: function (res) {
      }
    })
  },
  onLoad: function (options){
    var that = this
    that.setData({
      scan_result: options.result      
    })
  },
  toMap: function(e){
    wx.navigateTo({
      url: '/pages/view-scale/index',
    })
  }
})
