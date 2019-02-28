// import axios from 'axios'
// import { Message, MessageBox } from 'element-ui'
// import store from '../store'
import { getToken } from '@/utils/auth'
const qs = require('qs');

// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url

  timeout: 50000, // 请求超时时间
})

// service.defaults.headers.common['Authorization'] = getToken();
// request拦截器
service.interceptors.request.use(config => {
  // config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  if(config.method === 'post') {
    let obj = JSON.parse(config.data)
    obj.token  = sessionStorage.getItem('token');
   // console.log(obj)
    config.data = JSON.stringify(obj)
  }
  // let token = sessionStorage.getItem("admin_token")
  // if(token){
  //   config.headers.token = sessionStorage.getItem("admin_token")
  // }

  // if (store.getters.token) {
  //   console.log(getToken())
  // console.log(getToken())
  // config.headers.Authorization =  getToken()
    // config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  // }
  return config
}, error => {
  // Do something with request error
 // console.log(error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data;
  if(Number(res.resultcode)==404){
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('admin')
    alert('token已过期!请重新登录')
    location.reload();
  }

    return response
    // const res = response.data
    // if (res.code !== 20000) {
    //   Message({
    //     message: res.message,
    //     type: 'error',
    //     duration: 5 * 1000
    //   })
    //
    //   // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
    //   if (res.code === 50008) {
    //     MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
    //       confirmButtonText: '重新登录',
    //       cancelButtonText: '取消',
    //       type: 'warning'
    //     }).then(() => {
    //
    //     })
    //   }
    //   return Promise.reject('error')
    // } else {
    //   return response.data
    // }
  },
  error => {
  //  console.log('err' + error)// for debug
  //   Message({
  //     message: error.message,
  //     type: 'error',
  //     duration: 5 * 1000
  //   })
    return Promise.reject(error)
  }
)

export default service
