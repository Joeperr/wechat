//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    wo:-1,
    now:1,
    songs:[{"singername":"张碧晨","songname":"时间有泪 (Live)"},{"singername":"张杰","songname":"突然想爱你 (Live)"},{"singername":"李健","songname":"异乡人 (Live)"}],
    istrue:true,
    picArr:[],
    imgArr:[],
    hot:[],
    songAll:[],
    isfocus:false,
    focus:true,
    hotKey:{},
    display:true,
    songsName:[],
    searchFor:[],
    ifsearch:false,
   
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
     var that=this;
     wx.request({
       url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=749807486&uin=492132175&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489043166879',
      //  data: {},
      
       success: function(res){
         console.log(res.data.data.slider)
         that.setData({
           picArr:res.data.data.slider,
           imgArr:res.data.data.radioList,
           hot:res.data.data.songList,
         })
       },
       fail: function(err) {
          console.log(new Error(err))
       },
       complete: function() {
          console.log("请求完成")
       }
     });
     wx.request({
       url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg?format=json&g_tk=749807486&uin=492132175&&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489063717895',
      //  data: {},
      
       success: function(res1){
         console.log(res1.data.data.topList)
         that.setData({
             songAll:res1.data.data.topList,
         })
       },
       fail: function(err1) {
          console.log(new Error(err1))
       },
       complete: function() {
          console.log("请求完成la")
       }
     });
        wx.request({
       url: 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1489196930836',
      //  data: {},
       success: function(res2){
         console.log(res2.data)
         that.setData({
             hotKey:res2.data.data
         })
       },
       fail: function(err1) {
          console.log(new Error(err1))
       },
       complete: function() {
          console.log("请求完成lalala")
       }
     });



  },
   
   buttonClick(e){
    //  console.log(e.target.dataset.index)
       this.setData({
           now:e.target.dataset.index  
       });
      
   },
   focus(e){
       e.detail.value=""
      this.setData({
        isfocus:true,
        focus:false

      })
   },
   blur(e){
     var that=this;
     this.setData({
        isfocus:false,
        focus:true,
        ifsearch:true,
        display:false,
      })
       wx.request({
       url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=755886580&uin=492132175&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1489212403214',
       data: {
         w:e.detail.value
       },
       success: function(res1){
         console.log(res1.data.data.song.list)
         that.setData({
             searchFor:res1.data.data.song.list
         })
         console.log(e.detail.value)
       },
       fail: function(err1) {
          console.log(new Error(err1))
       },
       complete: function() {
          console.log("请求完成lalala")
       }
     })
   },





   btClick(e){

console.log(e.target.dataset.value)

     var that=this;
    //  console.log(e.target.dataset.index)
     this.setData({
        wo:e.target.dataset.index,
        display:false,
         isfocus:true,
        focus:false
      });
    wx.request({
       url:'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp?g_tk=755886580&uin=492132175&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p=1&remoteplace=txt.mqq.all&_=1489212403214',
       data: {
         w:e.target.dataset.value
       },
       success: function(res){
         console.log(res.data.data.song.list)
         that.setData({
             songsName:res.data.data.song.list
         })
       console.log(that.data.songsName)
       },
       fail: function(err1) {
          console.log(new Error(err1))
       },
       complete: function() {
          console.log("请求完成lalala")
       }
     });
      
   },
   console(e){
         this.setData({
       
        display:true,
         isfocus:false,
        focus:true
      });
   }

})
