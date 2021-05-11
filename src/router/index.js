import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../components/Login'
import ShopMessage from '../views/ShopMessage.vue'
import Shops from '../views/Shops'
import UserCenter from '../views/UserCenter'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path:'/Login',
    name:'Login',
    component:Login
  },
  {
    path:'/ShopMessage',
    name:'ShopMessage',
    component:ShopMessage
  },
  {
    path:'/Shops',
    name:'Shops',
    component:Shops
  },
  {
    path:'/UserCenter',
    name:'UserCenter',
    component:UserCenter
  }
  //懒加载
  // {
  //   path: '',
  //   name: '',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
