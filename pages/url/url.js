// pages/maptest/maptest.js
var amapFile = require('../../libs/amap-wx.js');
var config = require('../../libs/config.js');
const app = getApp();
const utilApi = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _that = this;
    _that.getLocationData();
    _that.getmap();
    _that.show();
    setInterval(function () {
      _that.getLocationData();
      _that.getmap();
      _that.show();
    }, 8000)
  },

  /**
   * 获取当前经纬度信息
   */
  getLocationData: function () {
    var that = this;
    wx.request({
      url: 'https://api.baize97.com/getlocation.php',
      success(res) {
        console.log(res.data);
        app.addressData.lat = res.data.lat;
        app.addressData.lng = res.data.lng;
        app.addressData.province = res.data.province;
        app.addressData.city = res.data.city;
        app.addressData.district = res.data.district;
        app.addressData.description = res.data.description;
        app.addressData.sos = res.data.sos;
        that.setData({
          lat: res.data.lat,
          lng: res.data.lng,
          province: res.data.province,
          city: res.data.city,
          district: res.data.district,
          description: res.data.description,
          sos: res.data.sos
        })
      }
    })
  },

  getmap: function () {
    var _this = this;
    var key = config.Config.key;
    var myAmapFun = new amapFile.AMapWX({ key: key });
    myAmapFun.getRegeo({
      iconPath: "../../images/marker.png",
      iconWidth: 22,
      iconHeight: 32,
      location: app.addressData.lng + ',' + app.addressData.lat,
      success: function (data) {
        console.log(data)
        var marker = [{
          id: data[0].id,
          latitude: data[0].latitude,
          longitude: data[0].longitude,
          iconPath: data[0].iconPath,
          width: data[0].width,
          height: data[0].height
        }]
        _this.setData({
          markers: marker
        });
        _this.setData({
          latitude: data[0].latitude
        });
        _this.setData({
          longitude: data[0].longitude
        });
        _this.setData({
          textData: {
            name: data[0].name,
            desc: data[0].desc
          }
        })
      }
    })
  },

  show: function () {
    if (app.addressData.sos > 0) {
      wx.showModal({
        title: '紧急提示',
        content: '出事地点：' + app.addressData.province + app.addressData.city + app.addressData.district + app.addressData.description + '经纬度：' + app.addressData.lat + ',' + app.addressData.lng,
        confirmText: "我知道了",
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: 'https://api.baize97.com/changesos.php',
            })
          }
        }
      })
    }
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

  },
})