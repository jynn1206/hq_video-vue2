<template>
    <div>
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
                        <!-- <el-menu-item index="index"><i class="fa fa-home"></i>首页</el-menu-item> -->
                        <el-menu-item index="Index" @click="goToRoute('Index')"><i class="fa fa-home"></i>首页</el-menu-item>
                        <!-- <el-menu-item index="play"><i class="fa fa-film"></i>视频</el-menu-item> -->
                        <el-menu-item index="Video"  @click="goToRoute('Video')"><i class="fa fa-film"></i>视频</el-menu-item>
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
                        <!-- <el-menu-item index="message" style="left: 530px"><i class="fa fa-envelope-o"></i>消息</el-menu-item> -->
                        <el-menu-item index="Message"  @click="goToRoute('Message')" style="left: 530px"><i class="fa fa-envelope-o"></i>消息</el-menu-item>
                </el-menu>
            </el-col>
        </el-row>    
        <router-view></router-view>
    </div>
</template>

<script>
import vCookies from "../../../common/js/cookies"

export default {
    name: "UserNav",
    components: {    
        // Index        
    },
    data() {
        return {
            webLogo: require('./../../../assets/image/webLogo.png'),
            activeIndex: 'Index',
            input: '',
            path: '',
            loginIcon: require('./../../../assets/image/loginIcon.png')              
        };
    },
    created(){
        // this.activeIndex = this.$route.name.replace(/\//g,"");//页面刷新后，导航栏激活的标签设置为当前路由(打印值为index)
        // console.log("当前path为："+this.$route.path);// /index
        // console.log("当前name为："+this.$route.name);// Index
        // console.log(this.activeIndex);        
    },    
    methods: {
        goToRoute(routeName){
            this.activeIndex = routeName;
            this.$router.push({ name: routeName });
        },
        handleSelect(key, keyPath) {
            // console.log("key为"+key,"keyPath为"+ keyPath);
            this.activeIndex = keyPath;//修改激活标签为当前路由            
        },
        openUserOperation(){
            console.log(this.loginIcon);
            if (this.loginIcon!= require('./../../../assets/image/loginIcon.png')) {
                // this.path = '/space'; 
                // this.$router.push({path: '/space'}); //跳转路由到个人空间页
                this.$router.push({name: 'Space'});        
            }else {
                // this.path = '/login'; 
                // this.$router.push({path: '/login'});//跳转路由到登录页
                this.$router.push({name: 'Login'});        
            }
        },
        checkUserIcon(cookies){
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
    mounted(){
        //获取浏览器cookies
        const cookies = this.$parseCookies(document.cookie);//调用全局函数来获取cookies
        this.checkUserIcon(cookies);
        //页面刷新后，导航栏激活的标签设置为当前路由
        this.activeIndex = this.$route.name.replace(/\//g,"");
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