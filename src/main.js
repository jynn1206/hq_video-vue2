import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

import axios from 'axios'

// import Hls from "hls.js";

import VueAliplayerV2 from "vue-aliplayer-v2";

import vCookies from "@/common/js/cookies.js";//引入自己封装的获取cookies的js

// import tool from '@/common/js/tool.js'

// Vue.prototype.$vCookies = vCookies;//把全局js挂接到vue原型上

// Vue.use(tool);

//创建一个空的Vue对象作为事件总线，用于在不相关的组件之间传递消息
// Vue.prototype.$EventBus = new Vue();



import store from './store'

Vue.use(vCookies);

Vue.use(VueAliplayerV2);

Vue.config.productionTip = false

Vue.use(ElementUI);

//请求预处理，可将后端信息存储到cookie中
axios.defaults.withCredentials = true

new Vue({
  store,
  render: h => h(App),
  router
  // created() {
  //   const wsUrl = 'ws://127.0.0.1:7763/websocket/1'; // 动态配置的WebSocket地址
  //   this.$store.dispatch('initWebSocket', wsUrl);
  // }
}).$mount('#app')
