<template>
    <div id="uploadComponent">        
        <el-upload
            class="upload-demo"            
            :http-request="submitUpload"
            action=""            
            :file-list="tempFile"
            :before-upload="beforeUploadFile"            
            :on-success="onSuccess"
            :on-progress="onProgress">
            <el-button slot="trigger" size="small" type="primary">上传到服务器</el-button>
            <!-- <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button> -->
            <div slot="tip" class="el-upload__tip">推荐上传mp4文件，视频时长为5分钟以内</div>
        </el-upload>
        <el-progress :stroke-width="20" :percentage="percentage" style="margin-top:16px"></el-progress>
        <!-- <video ref="videoPlayer" controls preload="auto">
            <source ref="videoPlayerSource" src="" type="application/x-mpegURL">
        </video> -->
        <vue-aliplayer-v2
            v-if="uploadSuccess"
		    :source="source"
            ref="VueAliplayerV2"
            :options="options"
        />
        <div v-if="uploadSuccess" id="submitVideoForm">
            <el-input style="width:665px;margin-top:16px" v-model="videoInfoForm.title" placeholder="请填写视频标题"></el-input>
            <el-input style="width:665px;margin-top:16px" v-model="videoInfoForm.introduce" placeholder="请填写视频介绍"></el-input>
            <br>
            <el-button type="success" style="margin: 16px 16px 0 0" @click="sendNewVideo">发布</el-button>
            <el-button type="primary" style="margin-top: 16px">清空</el-button>
        </div>        
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "Upload",
    components: {    
        // Index        
    },
    data(){
        return {
            onSuccess: null,
            onProgress: null,
            uploadUrl:'/api/files/upload',
            tempFile: [],//待上传到本地的文件
            uploadFile:[],//待上传到服务器的文件
            percentage: 0,
            m3u8Name:'',
            //播放器的配置
            options: {
                vid: "m3u8Video",
                // source: '../../assets/media/leaderAnger_schoolDiningVersion.m3u8',
                format: "m3u8",
                useH5Prism: true,
                width: "665px",
                height: "352px",
                autoplay: false,
                //设置暂停按钮居中
                skinLayout: [
                    { name: "bigPlayButton", align: "cc" },
                    { name: "H5Loading", align: "cc" },
                    { name: "errorDisplay", align: "tlabs", x: 0, y: 0 },
                    { name: "infoDisplay" },
                    { name: "thumbnail" },
                    {
                        name: "controlBar",
                        align: "blabs",
                        x: 0,
                        y: 0,
                        children: [
                            { name: "progress", align: "blabs", x: 0, y: 44 },
                            { name: "playButton", align: "tl", x: 15, y: 12 },
                            { name: "timeDisplay", align: "tl", x: 10, y: 7 },
                            { name: "fullScreenButton", align: "tr", x: 10, y: 12 },
                            { name: "subtitle", align: "tr", x: 15, y: 12 },
                            { name: "setting", align: "tr", x: 15, y: 12 },
                            { name: "volume", align: "tr", x: 5, y: 10 },
                        ],
                    },
                ],        
            },
            source: '',
            uploadSuccess:false,//视频上传成功的标志，默认为false,
            //用户提交的视频详情信息
            videoInfoForm:{
                title:'',
                introduce:''
            }
        }
    },
    created(){
        
    },
    methods: {
        //上传文件之前
        beforeUploadFile(file){
            console.log("上传的文件为:"+file);
            //获取文件
            this.tempFile = [file];            
            let formData = new FormData(); 
            formData.append("file", file);
            this.uploadFile = formData;
            // console.log("上传的文件为:"+this.uploadFile);
        },                
        //上传视频到服务器
        submitUpload(){
            this.$message.warning("视频开始上传，请耐心等待~~");
            //发送ajax请求
            axios({
                method:"post",
                url:this.uploadUrl,
                data:this.uploadFile,
                timeout:6*60*1000 //超时时间为6分钟
            }).then((resp)=> {                
                console.log(resp);
                //获取m3u8文件名
                const tempArray = resp.data.msg.split(",");
                this.m3u8Name = tempArray[1];
                this.onSuccess(this.m3u8Name);
            });
        },
        //读取m3u8文件
        readM3u8File(m3u8Name){            
            axios({
                method:"get",
                url:"/api/download/"+m3u8Name+".m3u8"
            }).then((resp)=> {
                // const tempArray = resp.config.url.split("/");
                // this.m3u8Name = tempArray[3].split(".")[0];
                // //设置视频播放路径
                // this.$refs.videoPlayerSource.src = resp.config.url;
                // // 加载新的视频流
                // this.$refs.videoPlayer.load();
                this.uploadSuccess = true;
                this.source = resp.config.url;
                this.$message.success('视频上传并处理成功!');                
            });
        },
        //发布新视频
        sendNewVideo(){            
            this.$router.push({name:'Play',query: {source:this.source}})
        }
    },
    mounted() {
        //上传视频成功后，回显视频
        this.onSuccess = (m3u8Name)=> {
           this.readM3u8File(m3u8Name);           
            //设置视频播放路径
            // this.$refs.videoPlayer.src = respData.config.url;
            // this.$message.success('视频上传并处理成功!');
         },        
        //更新进度条
        this.onProgress = (e)=> {
            this.percentage = e.percent;
            // this.uploadFiles = [file];            
            // console.log(this.uploadFiles);
        }
    }
}
</script>

<style>
#uploadComponent {
    margin-top: 30px;
    margin-left: 30px;    
}
</style>