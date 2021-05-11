import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueCookies from 'vue-cookies'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import * as api from './restful/api' 

Vue.config.productionTip = false

Vue.use(ElementUI);  //通过全局方法 Vue.use() 注册使用插件ElementUI(需要这个插件有install方法)
Vue.use(VueCookies)
Vue.prototype.$http=api //为了便利挂载api(axios)到Vue下，作为一个全局自定义属性http

//设置全局路由守卫，每一次路由跳转都进行token验证
router.beforeEach((to, from, next) => {
  let token=VueCookies.get('token')
  if(token){
      api.tokenCheck(token).then(res=>{
    if(res.data==true){
      //验证通过，返回用户信息存入store
      let keys=VueCookies.keys()
      let user={}
      for(let i=0;i<keys.length;i++){
        user[keys[i]]=VueCookies.get(keys[i])
      }
      store.dispatch('actUser',user)
    }
    else{
      //否则要求用户重新
      alert("登录超时")
      store.dispatch('actRemoveUser')
    }
  }).catch(err=>{
    console.log(err)
  })
  }
  next()
})

//挂载库到vue实例,把 router、store 的实例注入到所有的子组件
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
