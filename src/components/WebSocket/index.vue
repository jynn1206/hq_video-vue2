<!--<template>
    <div>
        
    </div>
</template>

<script>
export default {
    name: "WebSocket",
    components:{

    },
    data(){
        return{
            webSocket:undefined,
            wsUri:undefined,
            sendMsg:''
        }
    },
    created(){
        this.initWebSocket();
    },
    methods: {
        initWebSocket(){
            this.initWebSocketUri();
            //建立连接
            if(typeof (WebSocket) == "undefined"){
                console.log("您的浏览器不支持WebSocket");
            }else{
                this.webSocket = new WebSocket(this.wsUri);
                // console.log("this.websocket",this.webSocket);
                this.webSocket.onopen = this.webSocketOnopen;
                this.webSocket.onclose = this.webSocketOnclose;
                this.webSocket.onmessage = this.webSocketOnmessage;
                this.webSocket.onerror = this.webSocketOnerror;
            }
        },
        initWebSocketUri(){
            this.wsUri = 'ws://127.0.0.1:7763/websocket/1';
        },
        webSocketOnopen(){
            console.log("连接成功");
        },
        webSocketOnclose(){
            console.log("关闭连接");
        },
        webSocketOnmessage(res){
            console.log("接收消息",res);
        },
        webSocketOnerror(){
            console.log("连接出错");
        }
    },
    mounted(){
        let that = this;
	    window.addEventListener("setItemEvent", function(e) {
            console.log(e.key);
		    if (e.key === "msgContent") {
                console.log("检测到消息变化");
			    that.sendMsg=e.newValue;
                console.log("要发送的消息为:"+that.sendMsg);
		    }
	    })
    }
}
</script>