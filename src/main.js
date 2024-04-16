import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'

// import Hls from "hls.js";

import VueAliplayerV2 from "vue-aliplayer-v2";

Vue.use(VueAliplayerV2);

Vue.config.productionTip = false

Vue.use(ElementUI);

//请求预处理，可将后端信息存储到cookie中
axios.defaults.withCredentials = true

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
