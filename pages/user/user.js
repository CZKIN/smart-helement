// pages/user/user.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    mHidden:true,
    enmname:'',
    enmphone:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getinformation();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    var _set = this;
    setInterval(function () {
      _set.getinformation()
    }, 2000)
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getinformation:function(){
    var _that = this
    wx.request({
      url: 'https://api.baize97.com/information.php',
      success(res){
        app.user.name = res.data.name;
        app.user.phone = res.data.phone;
        _that.setData({
          name: res.data.name,
          phone: res.data.phone
        })
      }
    })
  },

  changeModel:function(e){
    var _change = this;
    wx.request({
      url: 'https://api.baize97.com/geditinformation.php',
      data:{
        name:this.data.enmname,
        phone: this.data.enmphone
      }
    }),
    _change.setData({
      mHidden:true
    }),
    this.getinformation();
  },

  modelCancel:function(){
    this.setData({
      mHidden:true
    })
  },

  changinformation:function(){
    this.setData({
      mHidden:false
    })
  },

  enmnameinput:function(e){
    this.setData({
      enmname:e.detail.value
    })
  },

  enmphoneinput:function(e){
    this.setData({
      enmphone:e.detail.value
    })
  }
})