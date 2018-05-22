// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import qs from 'qs';
//axios.defaults.withCredentials=true;//让ajax携带cookie
//axios.defaults.timeout = 5000
Vue.prototype.axios = axios
Vue.prototype.qs = qs

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)

//import AlloyFinger from 'alloyfinger/alloy_finger' // 手势库
//import AlloyFingerVue from 'alloyfinger/vue/alloy_finger.vue'
//Vue.use(AlloyFingerVue, {
 // AlloyFinger
//})

import './assets/css/app.css'

import layer from '../static/layer_mobile/layer.js'


Vue.config.productionTip = false
//Vue.prototype.api='http://ec2-52-80-156-87.cn-north-1.compute.amazonaws.com.cn:8090/phr-mobile';
Vue.prototype.api='http://192.168.21.85:28085/phr-mobile';
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
