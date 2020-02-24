import axios from 'axios'
import Vue from 'vue'
import router from './router'

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL || 'admin/api', 
  // baseURL: 'http://localhost:3000/admin/api'
})


// 添加一个请求拦截器
http.interceptors.request.use(function (config) {
  // Do something before request is sent
  if(localStorage.token) {
    config.headers.Authorization = 'Bearer ' + localStorage.token // 给请求头加上验证信息 token
  }
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});


// 添加一个响应拦截器 详解在 npm axios文档
http.interceptors.response.use(res => { // 拦截响应 
  return res
}, err => { // 如果报错
  if (err.response.data.message) {
    Vue.prototype.$message({ // element的一个方法，当服务端返回错误代码，且有一个message，弹出这个message
      type: 'error',
      message: err.response.data.message // err.response.data.message 服务端发生报错时返回的message
    })

    if(err.response.status === 401) { // 如果服务器返回401，代表没有token 跳转登录页
      router.push('/login')
    }
  }

  return Promise.reject(err)
})

export default http