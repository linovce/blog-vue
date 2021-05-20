import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import ArticleEditor from '../views/ArticleEditor.vue'
import AdminHome from '../views/AdminHome.vue'
import ArticleShow from '../views/ArticleShow.vue'
import ArticleList from '../views/ArticleList.vue'
import About from '../views/About.vue'
import Home from '../views/Home.vue'
import Resume from '../views/Resume.vue'
import ArticleManage from '../views/ArticleManage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
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
      },
      {
        path: '/resume',component: Resume
      }

    ]
  }
  ,
  {
    path:'/',
    name:'Home',
    component: Home,
    redirect: '/articleList',
    children: [
      {
        path: '/articleList',component: ArticleList
      },
      {
        path: '/articleDetail',component: ArticleShow
      }
    ]
  },
  {
    path: '/articleManage',component: ArticleManage
  },
  {
    path: '/articleDetail',component: ArticleShow
  },
  {
    path: '/Login',component: Login
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
