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
                    <el-menu-item index="index"><i class="fa fa-circle"></i>我的消息</el-menu-item>          
                    <el-menu-item index="message"><i class="fa fa-circle"></i>回复我的</el-menu-item>
                    <el-menu-item index="message"><i class="fa fa-circle"></i>收到的赞</el-menu-item>                                        
                    <el-menu-item index="message"><i class="fa fa-circle"></i>系统通知</el-menu-item>                    
                    <el-menu-item index="message" style="padding-top: 10px"><i class="fa fa-circle"></i>消息设置</el-menu-item>
                </el-menu>
            </el-col>
            <el-col :span="6" :push="3" id="msgShowBox">
                <el-row :gutter="0">
                    <el-col :span="6" style="border-right: 1px solid rgb(233,234,236)">
                        <!-- <div id="listHeader">消息列表</div>
                        <ul id="msgList">
                            <li>测试用户1</li>
                            <li>测试用户2</li>
                            <li>测试用户3</li>
                        </ul> -->
                        <el-descriptions class="margin-top" title="好友列表" :column="1" direction="vertical" :colon="false">                            
                            <el-descriptions-item><img :src="replyIcon1" class="replyIcon">小黑子</el-descriptions-item>
                            <el-descriptions-item><img :src="replyIcon2" class="replyIcon">茶杯猫</el-descriptions-item>
                            <el-descriptions-item><img :src="replyIcon3" class="replyIcon">甲鱼1</el-descriptions-item>                            
                            <el-descriptions-item><img :src="replyIcon3" class="replyIcon">甲鱼2</el-descriptions-item>                            
                            <el-descriptions-item><img :src="replyIcon3" class="replyIcon">甲鱼3</el-descriptions-item>                            
                        </el-descriptions>
                    </el-col>
                    <el-col :span="18">
                        <div style="background-color: white">小黑子</div>
                        <div id="chatShowBox">
                            <ul id="msgShowList" style="margin: 0;padding: 10px">
                                <!-- <li style="list-style: none;float: right;margin-right: 10px">
                                    <span class="msgBubble">{{inputMsg}}</span>
                                    <el-avatar ref="userSendMsgIcon" :src="sendMsgIcon" class="msgIcon"></el-avatar>
                                </li> -->
                            </ul>
                        </div>
                        <div id="chatControlBox">
                            <div id="chatMedia" style="padding-left: 10px;padding-top: 10px">
                                <i class="fa fa-picture-o" style="color: rgb(185,186,186);font-size: 22px;cursor: pointer;margin-right: 20px"></i>
                                <i class="fa fa-smile-o" style="color: rgb(185,186,186);font-size: 22px;cursor: pointer"></i>
                            </div>
                            <el-input
                                type="textarea"
                                :rows="3"
                                placeholder=""
                                v-model="textarea"
                                resize="none"
                                maxlength="500">
                            </el-input>
                            <div style="margin-left: 500px">
                                <!-- <span style="margin-right: 10px">0/500</span> -->
                                <el-button @click="sendMsg">发送</el-button>
                            </div>                            
                        </div>
                    </el-col>
                </el-row>
                <!-- <el-card class="box-card" id="msgList">
                    <div slot="header" class="clearfix">
                        <span>消息列表</span>                        
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <div style="margin-top: 5px">
                            {{'测试用户' + o + ' ' + '回复了我的评论'}}
                        </div>                        
                    </div>
                </el-card>                
                <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>回复我的</span>                        
                    </div>
                    <div v-for="o in 4" :key="o" class="text item">
                        <div style="margin-top: 5px">
                            {{'测试用户' + o + ' ' + '回复了我的评论'}}
                        </div>                        
                    </div>
                </el-card> -->
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    name: "Message",
    data() {
        return {
            activeIndex: 'index',
            replyIcon1: require('D:/upload/danmu/userIcon/87f6b824-4d49-468c-ba28-ae0a3090a0eb.jpg'),
            replyIcon2: require('D:/upload/danmu/userIcon/20170708222507174.jpg'),
            replyIcon3: require('D:/upload/danmu/userIcon/userDefaultIcon.jpg'),
            textarea:'',
            inputMsg:'',
            sendMsgIcon:require('D:/upload/danmu/userIcon/20200722185954.png'),
            userId: 2
        };
    },
    computed: {
        ...mapState(['messages'])
    },
    methods: {
        ...mapActions(['sendMessage']),
        handleSelect(key, keyPath) {
            console.log(key, keyPath);            
        },
        sendMsg(){
            //获取文本域信息
            const msgShowList = document.getElementById('msgShowList');
            // const newLi = document.createElement('<li style="list-style: none;float: right;margin-right: 10px"></li>');
            // const newMsgBubble = document.createElement('<span class="msgBubble">{{inputMsg}}</span>');
            // const newMsgIcon = document.createElement('<el-avatar ref="userSendMsgIcon" :src="sendMsgIcon" class="msgIcon"></el-avatar>');            
            // console.log(this.textarea);            
            if (this.textarea.trim()) {
                //获取用户输入的消息
                this.inputMsg = this.textarea;
                //将新消息追加到聊天页面
                msgShowList.innerHTML = '<li style="list-style: none;float: right;margin-right: 10px"><span class="msgBubble">{{inputMsg}}</span><el-avatar ref="userSendMsgIcon" :src="sendMsgIcon" class="msgIcon"></el-avatar></li>'
                msgShowList.append(newLi);
                //发送消息到后台                
                this.sendMessage({ message: { text: this.textarea }, userId: this.userId });
                this.textarea = '';
            }
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
    /* .el-card {
        margin: 10px;
        width: calc(100vw - 512px);        
        opacity:1
    } */
    /* #listHeader {
        background-color: rgb(255, 255, 255);
    }
    #msgList {
        list-style: none;
        background-color: rgb(255, 255, 255);
        cursor: pointer;
    } */
     /* 消息列表部分 */
    .el-descriptions {
        background-color: white;
     }
    .el-descriptions__body .el-descriptions__table {
        cursor: pointer;
     }
    .replyIcon {
        border-radius: 50%;
        width: 60px;
        height: 60px;
     }
     /* 聊天内容显示区 */
     #chatShowBox {
        background-color: rgb(244, 245, 247);
        height: 300px;
        border-bottom: 1px solid rgb(216,216,216);
     }
     .msgBubble {
        border: 1px solid white;
        border-radius: 5px 0 5px 5px;
        background-color: white;
        padding: 8px 16px;
        margin: 0 10px;
        position: relative;
        bottom: 17px        
     }
     .msgIcon {
        margin-top: 20px;
     }
     #chatControlBox {
        background-color: rgb(244, 245, 247);
        height: 170px;
     }    
     .el-textarea .el-textarea__inner {
        background-color: rgb(244, 245, 247);
        border: none;
     }   
</style>