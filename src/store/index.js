import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //控制登录/注册框
    loginPanel:{
      DialogVisible: false,
      registerSign: false
    },
    //定位数据
    ipLocation: {
      status: 0, //返回结果状态值,0表示失败；1表示成功
      //info: "", //返回状态说明,status为0时，info返回错误原因，否则返回“OK”。
      // infocode: "", //返回状态说明,10000代表正确,详情参阅info状态表
      province: "", //省份名称
      city: "", //城市
      adcode: "", //城市的adcode编码
      childAdcode:'',   //次级行政区域的adcode
      rectangle: "", //所在城市范围的左下右上坐标对
    },
  
    //shopList:[],
    shop: {
      id:'',
      name:'',
      type:'',
      address:'',
      tel:'',
      location:'',          //坐标
      photos:[],            //数组元素：{title:'',url:''},
      reviews:[             //shop评论：{userName:'',userReview:''},
      {userName:'haha',review:'我觉得不行'},
      {userName:'wawa',review:'我觉得可以'},],
    },
    user:{
      isUser:false,         //判断当前用户是否登录
      userInfo:{
        username:'',
        imgUrl:'',
        token:'',
      },           //用户信息
      userGoods:[            //发布数据
        { },
      ]         
    },             
  },
  mutations: {
    //mutations中方法为同步操作，通过commit请求
    //为避免阻塞，不建议组件直接调用

    setMutIpLocation(state, res) {
      state.ipLocation.status = res.status
      state.ipLocation.province = res.province
      state.ipLocation.city = res.city
      state.ipLocation.adcode = res.adcode
      state.ipLocation.rectangle = res.rectangle
    },
    serMutAdcode(state,adcode){
      state.ipLocation.childAdcode=adcode
    },

    setMutShop(state, res) {
      state.shop.id = res.id
      state.shop.name=res.name
      state.shop.type=res.type
      state.shop.address=res.address
      state.shop.photos=res.photos
      state.shop.tel=res.tel
      state.shop.location=res.location
    },
    setMutReview(state,res){
      // for(let i=0;i<res.length;i++)
      //   state.shop.reviews.push(res[i])
      state.shop.reviews=res
    },
    mutUserReview(state,res){
      state.shop.reviews.push(res)
    },
    mutUser(state,res){
      if(res){
        state.user.isUser=true
        state.user.userInfo=res
      }else{
        state.user.isUser=false
        state.user.userInfo={},
        state.user.userGoods.length=0
      }

    },
    mutRemoveUser(state){
      state.user.isUser=false
      state.user.userInfo={}
    },
    mutLoginPanel(state){
      state.loginPanel.DialogVisible=!state.loginPanel.DialogVisible
    },
    mutRegister(state,res){
      state.loginPanel.registerSign=res
    },
    mutUserGoods(state,res){
      state.user.userGoods=res
    }
  },
  actions: {
    //action中为异步操作；组件通过dispatch请求相应方法
    //从action中请求mutations方法,修改state数据；

    //修改IpLocation
    setActIpLocation(context, res) {
      context.commit("setMutIpLocation", res)
    },
    //设置用户选择的当前城市次级行政区域adcode
    setActAdcode(context,adcode){
      context.commit("serMutAdcode",adcode)
    },

    //修改shop数据
    setActShop(context, res) {
      context.commit("setMutShop", res)
    },
    setActReview(context,res){
      context.commit("setMutReview", res)
    },
    actUserReview(context,res){
      context.commit("mutUserReview",res)
    },

    //user
    actUser(context,res){
      context.commit('mutUser',res)
    },
    actRemoveUser(context){
      context.commit('mutRemoveUser')
    },

    //登录/注册面板
    actLoginPanel(context){
      context.commit('mutLoginPanel')
    },
    actRegister(context,res){
      context.commit('mutRegister',res)
    },

    //用户购买数据
    actUserGoods(context,res){
      context.commit('mutUserGoods',res)
    }
  },
  modules: {
  }
})
