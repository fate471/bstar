import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../components/Home.vue'
// import Search from '../components/Search.vue'

// 懒加载 动态加载
const bilibili = () => import('../components/bilibili.vue')
const Search = () => import('../components/Search.vue')
const login = () => import('../components/login.vue')
const register = () => import('../components/register.vue')
const user = () => import('../components/user.vue')
const Message = () => import("../components/Message.vue")



Vue.use(VueRouter)

// 路由操作 no-referrer 解决跨域问题
const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login', component: login, meta: {
      title: "欢迎登陆（～￣▽￣～）♥",
      name: "login",
      content: "no-referrer",
    }
  },
  {
    path: '/register', component: register, meta: {
      title: "欢迎注册(●'◡'●)ﾉ♥<",
      name: "register",
      content: "no-referrer",
    }
  },

  {
    path: '/user', component: user, meta: {
      title: "我的主页  (=￣ω￣=)　",
      name: "user",
      content: "no-referrer",
    }
  },

  {
    path: '/bilibili', component: bilibili, meta: {
      title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
      name: "referrer",
      content: "no-referrer",
      requireAuth: true
    }
  },

  {
    path: '/search', component: Search, meta: {
      title: "哔哩哔哩 (゜-゜)つロ 干杯~-bilibili",
      name: "referrer",
      content: "no-referrer",
      requireAuth: true
    }
  },
  {
    path: '/message', component: Message, meta: {
      title: "给我留言＼（￣︶￣）／　",
      name: "referrer",
      content: "no-referrer",

    }
  },



]

const router = new VueRouter({
  routes
})

export default router
