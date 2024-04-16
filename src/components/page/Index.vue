<template>
    <div>
        <el-row :gutter="10">
            <el-menu class="el-menu-demo" mode="horizontal">
                <el-col :span="3" v-for="menuItem in menuItems" :key="menuItem.index">
                    <el-menu-item>{{menuItem.name}}</el-menu-item>
                </el-col>
            </el-menu>                        
        </el-row>        
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
            carousel3: require('../../assets/image/changming.webp')        
        };
    }
}
</script>

<style>
    .el-carousel{
        width: 580px;        
    }
</style>