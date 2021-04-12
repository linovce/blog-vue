import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ArticleEditor from '../views/ArticleEditor.vue'
import AdminHome from '../views/AdminHome.vue'
import ArticleShow from '../views/ArticleShow.vue'
import ArticleManagement from '../views/ArticleManagement.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import ArticleManage from '../views/ArticleManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'AdminHome',
    component: AdminHome,
    children: [
      {
        path: '/login',component: Login
      },
      {
        path: '/articleManagement',component: ArticleManage
      },
      {
        path: '/articleEditor',component: ArticleEditor
      },{
        path: '/articleShow',component: ArticleShow
      },{
        path: '/about',component: About
      },
      {
        path: '/home_page',component: Home
      }

    ]
  }
  ,
  {
    path:'/home',
    name:'Home',
    component: Home,
  },
  {
    path: '/articleManage',component: ArticleManage
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
