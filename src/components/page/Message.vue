<template>
    <div id="MsgBody">
        <el-row :gutter="0">
            <el-col :span="3" :push="3" id="MsgNav">
                <div id="moduleTitle">
                    <i class="fa fa-envelope-o"></i>消息中心
                </div>
                <el-menu
                    id="MsgNavItem"                    
                    :default-active="activeIndex"
                    class="el-menu-demo"                    
                    @select="handleSelect"                    
                    text-color="#6b757b"
                    active-text-color="rgb(255,159,13)"
                    router>          
                    <el-menu-item index="index"><i class="fa fa-circle"></i>回复我的</el-menu-item>
                    <el-menu-item index="message"><i class="fa fa-circle"></i>收到的赞</el-menu-item>                                        
                    <el-menu-item index="message"><i class="fa fa-circle"></i>系统通知</el-menu-item>
                    <el-menu-item index="message"><i class="fa fa-circle"></i>我的消息</el-menu-item>
                    <el-menu-item index="message" style="padding-top: 10px"><i class="fa fa-circle"></i>消息设置</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="6" :push="3" id="msgShowBox">
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>回复我的</span>                        
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <div style="margin-top: 5px">
                            {{'测试用户' + o + ' ' + '回复了我的评论'}}
                        </div>                        
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name: "Message",
    data() {
        return {
            activeIndex: 'index',
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);            
        }    
    }
}
</script>

<style>
    #MsgBody {        
        background-image: url('../../assets/image/msgBg2.jpg');
        background-size: 100% 100%;        
    }
    #MsgNav {
        height: calc(100vh - 62px);
        opacity: 0.75;
    }
    #moduleTitle {
        padding: 15px 0 20px 30px;        
        background-color:#ffffff;
        font-weight: bold;
    }
    #MsgNavItem {
        height: calc(100vh - 117px);
    }
    #msgShowBox {
        width: calc(100vw - 492px);
        height: calc(100vh - 62px);
        background-color: rgba(255, 255, 255, 0.4);
    }
    .el-card {
        margin: 10px;
        width: calc(100vw - 512px);        
        opacity:1
    }
</style>