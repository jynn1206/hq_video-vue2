<template>
    <div>
        <el-row :gutter="0">
            <el-col :span="24">
                <div id="bgBox">
                    <el-image
                    style="width: 1140px; height: 200px"
                    :src="bgUrl"
                    :fit="fit">
                    </el-image>
                    <img id="userBigIcon" :src="userBigIcon">
                    <span id="bigUserName">{{bigUserName}}</span>                    
                </div>                
            </el-col>
        </el-row>
        <el-row :gutter="0" id="spaceInfoBox">
            <el-col :span="16">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>我的视频</span>                        
                    </div>
                    <div>
                        <div v-if="!haveVideo">还没有上传过视频哦~ <span style="color: #00a1d6;cursor: pointer" @click="uploadFile">立即上传</span></div>
                        <div v-else>
                            <div class="userVideoInfo"  @click="watchVideo" data-video="5f6045d1c2f146ec85ea825f9fd80423">
                                <el-image
                                    style="width: 160px; height: 100px"
                                    :src="url1"
                                    :fit="fit"></el-image>
                                <span class="userVideoText">丞相司徒深情对唱</span>
                                <span class="userVideoText">2023-07-19</span>
                            </div>
                            <div class="userVideoInfo"  @click="watchVideo" data-video="73772252bf704c7b8c000754ce0f8892">
                                <el-image
                                    style="width: 160px; height: 100px"
                                    :src="url2"
                                    :fit="fit"></el-image>
                                <span class="userVideoText">能不能给我一首歌的时间</span>
                                <span class="userVideoText">2023-07-21</span>
                            </div>
                            <div class="userVideoInfo"  @click="watchVideo" data-video="73772252bf704c7b8c000754ce0f8892">
                                <el-image
                                    style="width: 160px; height: 100px"
                                    :src="url2"
                                    :fit="fit"></el-image>
                                <span class="userVideoText">能不能给我一首歌的时间</span>
                                <span class="userVideoText">2023-07-21</span>
                            </div>
                            <div class="userVideoInfo"  @click="watchVideo" data-video="73772252bf704c7b8c000754ce0f8892">
                                <el-image
                                    style="width: 160px; height: 100px"
                                    :src="url2"
                                    :fit="fit"></el-image>
                                <span class="userVideoText">能不能给我一首歌的时间</span>
                                <span class="userVideoText">2023-07-21</span>
                            </div>
                        </div>
                    </div>
                </el-card>                
            </el-col>
            <el-col :span="8">
                <el-card class="box-card" id="personIndoBox">
                    <div slot="header" class="clearfix">
                        <span>个人介绍</span>                        
                    </div>
                    <div>
                        <span class="userInfo">昵称：{{userInfoList.username}}</span>
                        <span class="userInfo">个性签名：{{userInfoList.introduce}}</span>
                        <span class="userInfo">生日：{{ userInfoList.birth | formatDate }}</span>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import axios from 'axios';
import { formatDate } from "../../common/js/date";

export default {
    name: "Space",
    components: {    
        // Index        
    },
    data() {
        return {
            bgUrl: require("../../assets/image/userSpaceBackground.jpg"),
            fit: 'fill',
            userBigIcon: '',
            bigUserName: '',
            haveVideo:false,//用户是否拥有视频的标志，默认没有
            url1:require('../../assets/image/chengxiang.png'),
            url2:require('../../assets/image/jielun.png'),
            userId:'',
            userInfoList:{}
        }
    },
    methods: {
        updateUserInfo(cookies){
            // 遍历cookie对象
            for (let cookieName in cookies) {
                if (`${cookieName}`=='htmlDanmuUserIcon') {
                    //确定用户已登录时，替换头像        
                    const userNavIconPath = `${cookies[cookieName]}`;        
                    this.userBigIcon = require('D:/upload/danmu/userIcon/'+userNavIconPath);
                }
                if (`${cookieName}`=='htmlDanmuUserName') {
                    //解析中文cookies
                    const username = decodeURIComponent(`${cookies[cookieName]}`);                    
                    //确定用户已登录时，替换用户名
                    this.bigUserName =  username;              
                    break;        
                }
                if (`${cookieName}`=='htmlDanmuUserId') {
                    //确定用户已登录时，获取用户id        
                    const userID = `${cookies[cookieName]}`;        
                    this.userId = userID;
                }            
            }
        },
       watchVideo(ev){            
            this.selectVideo= "/api/download/"+ev.currentTarget.getAttribute("data-video")+".m3u8";            
            // this.$router.push({path: '/play'});
            this.$router.push({name:'Play',query: {source:this.selectVideo}})
        },
        uploadFile(){
            this.$router.push({path: '/upload'});//跳转路由到文件上传页
        },
        getUserInfo(userId){
            axios.get('/api/users/'+userId).then((resp)=>{
                this.userInfoList = resp.data.data;
                console.log(this.userInfoList);
            });
        }
    },
    filters: {
        formatDate(time) {
        let date = new Date(time);
        return formatDate(date, "yyyy-MM-dd");
        },
    },
    mounted(){
        //获取浏览器cookies
        const cookies = this.$parseCookies(document.cookie);//调用全局函数来获取cookies
        this.updateUserInfo(cookies);
        //获取用户信息详情
        this.getUserInfo(this.userId);
    }
}
</script>

<style>
#bgBox {
    margin-left: 60px;
    width: 1140px;
}
#userBigIcon {
    width: 80px;
    height: 80px;
    position: absolute;
    top: 50px;
    left: 590px;
    border-radius: 50%;
}
#bigUserName {    
    position: absolute;
    top: 140px;
    left: 614px;
    font-weight: 700;
    font-size: 18px;
    color: #fff;
}

#spaceInfoBox {
    margin-left: 50px;
}
.userVideoInfo{
    display: inline-block;
    padding:  10px;
    height: 140px;
}
.userVideoInfo .el-image{
    cursor: pointer;    
}
.userVideoText{
    display: block;        
    width: 160px;    
    cursor: pointer;
    font-size: 14px;
}

#personIndoBox {
    width: 330px;
}
.userInfo{
    display: block;
}
</style>