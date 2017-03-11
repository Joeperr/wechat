const Showapi_sign="a4637e5b2b13469f9e5ed4fbe2a44632";
const Showapi_appid=33406;

const story_list="http://route.showapi.com/955-1";
const story_content="http://route.showapi.com/955-2";


Page({
 
    data:{
       storyData:{},
       textContent:{},
       li:true,
       content:false,
       page:1,
       allPage:0
    },
    onLoad(){
        var that=this;
        wx.request({
          url: story_list,
          data: {
              type:"ly",
              page:1,
              showapi_sign: Showapi_sign,
              showapi_appid:Showapi_appid
          },
          method: 'GET',
          
          success: function(res){
              console.log(res.data.showapi_res_body.pagebean)
               that.setData({
                  storyData: res.data.showapi_res_body.pagebean,
                  allPage: res.data.showapi_res_body.pagebean.allPages
               })
          },
          fail: function() {
              console.log(new Error(err))
          },
          complete: function() {
            console.log("请求完成啦")
          }
        })
    },
    click(e){
         var that=this;
         that.setData({
             li:false,
             content:true,
         })
         wx.request({
          url: story_content,
          data: {
              id:e.target.dataset.id,
              showapi_sign: Showapi_sign,
              showapi_appid:Showapi_appid
          },
          method: 'GET',
          
          success: function(res1){
              console.log(res1.data.showapi_res_body)
              that.setData({
                  textContent:res1.data.showapi_res_body
              })
          },
          fail: function() {
              console.log(new Error(err))
          },
          complete: function() {
            console.log("请求完成啦啦")
          }
        })
    },
    back(){
        this.setData({
             li:true,
             content:false
         })
    },
    onReachBottom(){
        console.log("到底了")
        if(this.data.page>=this.data.allPage){
            return;
        }
        var that=this;
        this.setData({
            page:++that.data.page
        })
         wx.request({
          url: story_list,
          data: {
              type:"ly",
              page:that.data.page,
              showapi_sign: Showapi_sign,
              showapi_appid:Showapi_appid
          },
          method: 'GET',
          
          success: function(res){
              var oldData=that.data.storyData.contentlist
              var newData=res.data.showapi_res_body.pagebean.contentlist;
              res.data.showapi_res_body.pagebean.contentlist=oldData.concat(newData)
              that.setData({
                  storyData:res.data.showapi_res_body.pagebean
              })
               
          },
          fail: function() {
              console.log(new Error(err))
          },
          complete: function() {
            console.log("请求完成啦啦啦")
          }
        })
         

    }



















})