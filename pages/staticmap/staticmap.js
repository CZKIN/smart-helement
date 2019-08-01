// pages/staticmap/staticmap.js
var amapFile = require('../../libs/amap-wx.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    editTrue: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    wx.request({
      url: 'https://api.baize97.com/getmap.php',
      success(res){
        console.log(res)
        app.path.url = res.data;
        console.log(app.path.url)
      }
    })
  },

getstaticmap: function () {
  var that = this;
  var myAmapFun = new amapFile.AMapWX({ key: "" });//填写自己的KEY
  wx.getSystemInfo({
    success: function (data) {
      var height = data.windowHeight;
      var width = data.windowWidth;
      var size = width + "*" + height;
      myAmapFun.getStaticmap({
        size: size,
        scale: 2,
        paths: "10,0x0000ff,1,,:"+app.path.url,
        success: function (data) {
          console.log(data);
          that.setData({
            src: data.url
          })
        },
        fail: function (info) {
          wx.showModal({ title: info.errMsg })
        }
      })
    }
  });
  if(that.data.editTrue == true){
    that.setData({
      editTrue:false
    })
  }else{
    that.setData({
      editTrue:true
    })
  }
},
  previewImage: function (e) {
    var current = this.data.src;
    wx.previewImage({
      current: current,
      urls: [current]
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
