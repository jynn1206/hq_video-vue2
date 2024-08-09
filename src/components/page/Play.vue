<template>
  <div>
    <el-row :gutter="0" style="height: 100px">
      <el-col :span="13" id="videoTag" :push="2" style="height: 100px">
        <el-descriptions
          title="【元首】元首对学校食堂的愤怒"
          size="medium"
          :column="column"
          style="height: 100px"
        >
          <el-descriptions-item label="类别">
            <el-tag size="small">生活</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="弹幕">0</el-descriptions-item>
          <el-descriptions-item label="评论">0</el-descriptions-item>
          <el-descriptions-item label="时间"
            >2019-09-01 18:46:18</el-descriptions-item
          >
        </el-descriptions>
      </el-col>
      <el-col :span="8" :push="2" style="height: 100px; margin-left: 10px">
        <el-row :gutter="50">
          <el-col :span="4">
            <el-avatar
              :src="authorIcon"
              style="margin-top: 20px; width: 60px; height: 60px"
            ></el-avatar>
          </el-col>
          <el-col :span="11">
            <el-descriptions
              title="测试用户1"
              size="mini"
              :column="1"
              :colon="colon"
            >
              <el-descriptions-item
                label="该用户很懒，没有留下签名"
              ></el-descriptions-item>
            </el-descriptions>
            <el-button type="primary" style="width: 200px">＋关注</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-row :gutter="0">
      <el-col :span="13" id="m3u8Video" :push="2">
	      <vue-aliplayer-v2
		      :source="source"
          ref="VueAliplayerV2"
          :options="options"
        />          
        <el-row
          :gutter="0"
          style="
            width: 665px;
            padding-top: 7px;
            box-shadow: 5px 5px 5px 2px rgb(246, 247, 247);
          "
        >
          <el-col :span="13">
            <span id="marqueeFontSet">
              <i class="fa fa-font"></i>
            </span>
          </el-col>
          <el-col :span="8">
            <el-input
              v-model="marqueeInput"
              placeholder="点我发弹幕"
              id="marqueeInputBox"
            ></el-input>
          </el-col>
          <el-col :span="3">
            <el-button type="primary" id="marqueeSendBtn">发送</el-button>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="7" :push="2" style="margin-left: 10px">
        <el-collapse @change="spreadMarqueeList" id="marqueeList">
          <el-collapse-item title="弹幕列表">
            <div
              v-if="
                checkedPlay == false && marqueeData && marqueeData.length > 0
              "
            >
              <div id="showType">
                <span style="padding-left: 10px; padding-right: 30px"
                  >时间</span
                >
                <span style="padding-right: 100px">弹幕内容</span>
                <span>发布时间</span>
              </div>
              <div v-for="item in marqueeData" :key="item.id">
                <span
                  style="
                    display: inline-block;
                    padding-left: 10px;
                    padding-right: 30px;
                  "
                  >{{ formatSeconds(item.videoTime) }}</span
                >
                <el-tooltip
                  effect="dark"
                  :content="item.text"
                  placement="bottom-start"
                  :open-delay="1200"
                  style="position: relative; top: 5px"
                >
                  <span class="marqueeListItem" style="padding-right: 20px">{{
                    item.text
                  }}</span>
                </el-tooltip>
                <span>{{ item.sendTime | formatDate }}</span>
              </div>
            </div>
            <div v-else>
              <el-skeleton :rows="6" animated :loading="loading" />
            </div>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import { formatDate } from "../../common/js/date";

// import Hls from "hls.js";

export default {
  name: "Play",
  data() {
    return {
      column: 3, //一行 Descriptions Item 的数量
      authorIcon: require("../../assets/image/loginIcon.png"),
      colon: false,
      isPlaying: false,
      //播放器的配置
      options: {
        vid: "m3u8Video",
        // source: '../../assets/media/leaderAnger_schoolDiningVersion.m3u8',
        format: "m3u8",
        useH5Prism: true,
        width: "665px",
        height: "372px",
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
      // source: "media/leaderAnger_schoolDiningVersion.m3u8",
      // m3u8FilePath: 'D:/software/nginx-1.16.1/html/hq-video/client/media',      
      source: '',      
      marqueeInput: "",
      loading: true,
      checkedPlay: true,
      marqueeData: [],
      timer: ""                        
    };
  },
  // created(){
  //   this.source = this.m3u8FilePath+'/leaderAnger_schoolDiningVersion.m3u8';
  // },
  methods: {        
    spreadMarqueeList() {
      //获取视频弹幕
      axios({
        method: "get",
        url: "/api/videos/1",
      }).then((resp) => {
        const sortData = resp.data.data.sort(
          (a, b) => a.videoTime - b.videoTime
        ); //根据所处的播放时间来从小到大排序
        this.marqueeData = sortData;
        this.timer = setTimeout(() => {
          //首次展开弹幕列表，骨架屏将会显示3秒
          this.loading = false; //销毁骨架屏
          this.checkedPlay = false; //显示视频的弹幕信息
        }, 3000);
      });
    },
    //将播放时间的秒数转化为分秒的形式
    formatSeconds(second) {
      let result = parseInt(second);
      let m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      let s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      result = `${m}:${s}`;
      return result;
    },
    addToList() {
      this.barrageList.push({
        id: ++this.currentId,
        msg: this.msg,
        time: 5,
        type: MESSAGE_TYPE.NORMAL,
      });
    },
  },
  filters: {
    formatDate(time) {
      let date = new Date(time);
      return formatDate(date, "MM-dd hh:mm");
    },
  },
  // mounted() {    
    // const hls = new Hls();
    // const videoSrc = "media/leaderAnger_schoolDiningVersion.m3u8";        
    // this.vueVideo = player;
    // hls.attachMedia(player.video);
    // hls.loadSource(videoSrc);

    // hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    //   hls.loadSource(videoSrc);      
    // });
  // },
  mounted(){
    // axios({
    //     method: "get",
    //     url: "/api/download/5f6045d1c2f146ec85ea825f9fd80423.m3u8",        
    //   }).then(()=> {               
    //     console.log("视频接收成功");          
    //   });
    this.source = this.$route.query.source;
  }    
};
</script>

<style>
/* 视频简单信息样式 */
#videoTag .el-descriptions {
  width: 665px;
}
.el-descriptions .el-descriptions__header {
  margin-bottom: 12px;
}
/* 弹幕列表标题样式 */
#marqueeList .el-collapse-item__header {
  border-radius: 5px;
  background-color: rgb(211, 211, 211);
}
/* 弹幕列表内容样式 */
.el-collapse-item .el-collapse-item__wrap {
  height: 338px;
  overflow: auto;
}
.marqueeListItem {
  display: inline-block;
  width: 130px;
  white-space: nowrap; /* 文本不换行 */
  overflow: hidden;
  text-overflow: ellipsis; /* 文本溢出时，用省略号代表被修剪文本 */
}
/* 弹幕列表内容中的标题样式 */
#showType {
  font-weight: bold;
}
/* 弹幕文本选择按钮的样式 */
#marqueeFontSet {
  display: inline-block;
  background-color: rgb(241, 242, 243);
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  margin-left: 330px;
  border-radius: 4px 0 0 4px;
}
/* 弹幕输入框的样式 */
#marqueeInputBox {
  background-color: rgb(241, 242, 243);
  border: 0px;
  border-radius: 0px;
  height: 30px;
}
#marqueeInputBox::placeholder {
  color: rgb(117, 117, 117);
}
/* 弹幕发送按钮的样式 */
#marqueeSendBtn {
  width: 60px;
  height: 30px;
  border-radius: 0 4px 4px 0;
}
#marqueeSendBtn span {
  position: relative;
  bottom: 5px;
  right: 5px;
}
</style>