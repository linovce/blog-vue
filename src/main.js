import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import './assets/css/global.css'
Vue.use(less)

//全局引入axios
import axios from 'axios'
Vue.prototype.$axios = axios

//引入element-ui依赖
import Element from 'element-ui'
import "element-ui/lib/theme-chalk/index.css"
Vue.use(Element)

// 全局注册基于Vue的markdown编辑器mavon-editor
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// use
Vue.use(mavonEditor)

import hljs from 'highlight.js'
Vue.directive('highlight', function (el) {  //注意这里是highlight；没有带js，因为这里是用来指定指令的
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block) => {
    hljs.highlightBlock(block)
  })
})

import marked from "marked";
import "highlight.js/styles/atelier-cave-light.css"; //这里可以选择不同的样式主题【主要是code的渲染样式】


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
