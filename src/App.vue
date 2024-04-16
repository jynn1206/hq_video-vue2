<template>
  <div id="app">
    <!-- 导航栏 -->
    <el-row :gutter="0">
      <el-col :span="3">
        <span id="webLogoBox">
          <img :src="webLogo">
        </span>        
      </el-col>
      <el-col :span="21">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router>          
          <el-menu-item index="index"><i class="fa fa-home"></i>首页</el-menu-item>
          <el-menu-item index="play"><i class="fa fa-film"></i>视频</el-menu-item>
          <span id="navSearch">
            <el-input            
              placeholder="发现更多内容"
              prefix-icon="el-icon-search"
              v-model="input"
              clearable>
            </el-input>
          </span>          
          <router-link :to="path" style="position: relative;top: 12px" @click.native="openUserOperation">
              <el-avatar ref="userNavIcon" :src="loginIcon"></el-avatar>
          </router-link>
          <el-menu-item index="message" style="left: 530px"><i class="fa fa-envelope-o"></i>消息</el-menu-item>
        </el-menu>
      </el-col>
    </el-row>    
    <router-view></router-view>      
  </div>
</template>

<script>
// import Index from '@/components/page/Index'

export default {
  name: 'App',
  components: {    
    // Index
  },
  data() {
    return {
      webLogo: require('./assets/image/webLogo.png'),
      activeIndex: 'index',
      input: '',
      path: '',
      loginIcon: require('./assets/image/loginIcon.png')              
    };
  },
  created(){                
    this.activeIndex = this.$route.path.replace(/\//g,"");//页面刷新后，导航栏激活的标签设置为当前路由
    // console.log(this.activeIndex);
    // 定义全局函数
    window.parseCookies = (cookieStr) => {
      // 解析cookie字符串并转换为对象
      return cookieStr.split('; ').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=');
        cookies[name] = value;
        return cookies;
      }, {});
    };
    window.checkUserIcon = (cookies) => {
      // 遍历cookie对象
      for (let cookieName in cookies) {
        if (`${cookieName}`=='htmlDanmuUserIcon') {
          //确定用户已登录时，替换头像        
          const userNavIconPath = `${cookies[cookieName]}`;        
          this.loginIcon = require('D:/upload/danmu/userIcon/'+userNavIconPath);               
          break;        
        }            
      }
    }            
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);            
    },
    openUserOperation(){
      console.log(this.loginIcon);
      if (this.loginIcon!= require('./assets/image/loginIcon.png')) {
        // this.path = '/space'; 
        this.$router.push({path: '/space'}); //跳转路由到个人空间页        
      }else {
        // this.path = '/login'; 
        this.$router.push({path: '/login'});//跳转路由到登录页        
      }
    }                
  },
  mounted(){
    //获取浏览器cookie    
    const cookies = parseCookies(document.cookie);    
    checkUserIcon(cookies);
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}
 #webLogoBox{
  display: inline-block;
  width: 126px;
  height: 26px;
  padding: 17px;
  background-color:#545c64;  
 }
 ul .el-menu-item{
  font-size: 18px;
 }
 .el-menu-item i{
  margin-right: 5px;
 }  
 #navSearch{
  display: inline-block;
  position: relative;  
  right: 50px;
  width: 388px;
  height: 40px;  
 } 
 #navSearch .el-input{
  width: 388px;
 }  
</style>