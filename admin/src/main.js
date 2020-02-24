import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import './style.css'

Vue.config.productionTip = false

import http from './http'
Vue.prototype.$http = http 


Vue.mixin({ // 给每一个vue实例写入全局属性或者方法
  computed: {
    uploadUrl() {  // 取出上传地址
      return this.$http.defaults.baseURL + '/upload' // $http.defauts.baseURL + '/upload'  =>  http://localhost:3000/admin/api/upload    
    }
  },
  methods: {
    getAuthHeaders() { // 添加请求头
      return {
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
