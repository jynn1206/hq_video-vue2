<template>
  <div id="app">
    <!-- 导航栏 -->
    <!-- <WebSocket></WebSocket> -->
    <UserNav></UserNav>      
  </div>
</template>

<script>
// import Index from '@/components/page/Index'
import WebSocket from './components/WebSocket/index.vue'
import UserNav from './components/cell/Nav/UserNav.vue'

export default {
  name: 'App',
  components: {    
    // Index
    UserNav,
    WebSocket
  }  
}
</script>