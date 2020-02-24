import Vue from 'vue'
import App from './App.vue'

import './assets/scss/style.scss'
import router from './router'

import VueAwesomeSwiper from 'vue-awesome-swiper' // 使用 vue-awesome-swiper 插件做轮播图
// require styles
import 'swiper/dist/css/swiper.css'
Vue.use(VueAwesomeSwiper, /* { default global options } */)

import './assets/iconfont/iconfont.css' //引入字体图标

import Card from './components/Card' // 引入全局组件
Vue.component('m-card', Card) 

import ListCard from './components/ListCard' // 引入全局组件
Vue.component('m-list-card', ListCard)

import VideoCard from './components/VideoCard' // 引入全局组件
Vue.component('m-video-card', VideoCard)

import axios from 'axios'
Vue.prototype.$http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || '/web/api'
  // baseURL: 'http://localhost:3000/web/api'
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
