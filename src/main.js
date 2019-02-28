// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import VueLazyLoad from 'vue-lazyload'
import store from './store'
import router from './router'
import * as filters from './filters'

import '@/assets/css/reset.css'
import '@/assets/css/common.css'
import seeImage from '@/plugin/SeeImage'
Vue.use(seeImage);

import uploader from 'vue-simple-uploader'
Vue.use(uploader)

// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key) => {
  Vue.filter(key, filters[key]);
})

Vue.use(VueLazyLoad,{
  error:'http://hly.1000da.com.cn/assets/img/error.jpg',
  dispatchEvent:true,
  loading:'http://hly.1000da.com.cn/assets/img/loading.gif',
});

// axios.interceptors.request.use(function (config) {  //配置发送请求的信息\
//   let admin = JSON.parse(sessionStorage.getItem('userInfo'))
//   let data = JSON.parse(config.data)
//   data.token = admin.token
//   config.data = JSON.stringify(data)
//   return config;
// }, function (error) {
//   return Promise.reject(error);
// });


Vue.config.productionTip = false
Vue.use(ELEMENT)

/* eslint-disable no-new */
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app-box')
