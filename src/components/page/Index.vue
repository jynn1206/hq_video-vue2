<template>
    <div>
        <el-row :gutter="10">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-col :span="3" v-for="menuItem in menuItems" :key="menuItem.index">
                    <el-menu-item>{{menuItem.name}}</el-menu-item>
                </el-col>
            </el-menu>                        
        </el-row>
        <el-row :gutter="0">
            <el-col :span="13">
                <el-carousel trigger="click" height="326px">
                    <el-carousel-item>
                        <el-image                                        
                            :src="carousel1"
                            :fit="fit">
                        </el-image>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-image                                        
                            :src="carousel2"
                            :fit="fit">
                        </el-image>
                    </el-carousel-item>
                    <el-carousel-item>
                        <el-image                                        
                            :src="carousel3"
                            :fit="fit">
                        </el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-col>
            <el-col :span="11" id="mockVideoBox">
                <div class="mockVideoInfo"  @click="watchVideo" data-video="5f6045d1c2f146ec85ea825f9fd80423">
                    <el-image
                    style="width: 250px; height: 150px"
                    :src="url1"
                    :fit="fit"></el-image>
                    <span class="mockVideoText">丞相司徒深情对唱</span>
                </div>                    
                <div class="mockVideoInfo"  @click="watchVideo" data-video="73772252bf704c7b8c000754ce0f8892">
                    <el-image
                    style="width: 250px; height: 150px"
                    :src="url2"
                    :fit="fit"></el-image>
                    <span class="mockVideoText">能不能给我一首歌的时间</span>
                </div>
                <div class="mockVideoInfo"  @click="watchVideo" data-video="79ff250e53764addbf8bb6a1fab8a428">
                    <el-image
                    style="width: 250px; height: 150px"
                    :src="url3"
                    :fit="fit"></el-image>
                    <span class="mockVideoText">今天也要当可爱的欧尼酱呀~~</span>
                </div>
                <div class="mockVideoInfo"  @click="watchVideo" data-video="9ed9e337175a49e894042bf870c408e1">
                    <el-image
                    style="width: 250px; height: 150px"
                    :src="url4"
                    :fit="fit"></el-image>
                    <span class="mockVideoText">爱你无需多言~~</span>
                </div>            
            </el-col>
        </el-row>
    </div>    
</template>

<script>
export default {
    name: 'Index',
    data() {
        return {
            menuItems: [
                {index:1,name:"动画"},
                {index:2,name:"音乐"},
                {index:3,name:"科技"},
                {index:4,name:"记录"},
                {index:5,name:"鬼畜"},
                {index:6,name:"生活"},
                {index:7,name:"舞蹈"},
                {index:8,name:"番剧"}
            ],
            fit: 'cover',
            carousel1: require('../../assets/image/onimai.jpg'),
            carousel2: require('../../assets/image/cat_and_duck.jpg'),
            carousel3: require('../../assets/image/changming.webp'),
            url1:require('../../assets/image/chengxiang.png'),        
            url2:require('../../assets/image/jielun.png'),       
            url3:require('../../assets/image/onimai5.png'),        
            url4:require('../../assets/image/missYou.png'),
            selectVideo:''        
        };
    },
    methods: {
        watchVideo(ev){            
            this.selectVideo= "/api/download/"+ev.currentTarget.getAttribute("data-video")+".m3u8";            
            // this.$router.push({path: '/play'});
            this.$router.push({name:'Play',query: {source:this.selectVideo}})
        }
    }
}
</script>

<style>
    .el-carousel{
        width: 580px;
        margin-left: 40px;
        margin-top: 20px;
        border-radius: 5px;        
    }
    #mockVideoBox{
        margin-top: 10px;
    }
    .mockVideoInfo{
        display: inline-block;
        padding:  0 10px;
        height: 200px;        
    }
    .mockVideoInfo .el-image{
        cursor: pointer;
    }
    .mockVideoText{
        display: block;
        padding-top: 5px;
        width: 250px;
        cursor: pointer;
    }
</style>