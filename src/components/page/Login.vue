<template>
  <div>
    <el-row :gutter="0">
      <el-col :span="14">
        <img :src="loginBackground" id="loginBackground" />
      </el-col>
      <el-col :span="10">
        <p id="loginTitle">登录HQ弹幕网</p>
        <el-form ref="form" :model="form" label-width="66px">
          <el-form-item label="用户名">
            <el-input
              placeholder="请输入用户名"
              v-model="form.username"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="userLogin">登录</el-button>
            <el-button type="primary">注册</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      loginBackground: require("../.././assets/image/loginBackground.jpg"),
      form: {
        username: "",
        password: "",
      }      
    };
  },
  methods: {    
    userLogin() {      
      axios({
        method: "post",
        url: "/api/users/login",
        data: {
          username: this.form.username,
          password: this.form.password,
        },
      }).then((resp)=> {               
        if(resp.data.msg =="success"){
            console.log("登陆成功!");            
            // console.log(resp.data);                        
            this.$router.push({path: '/index'});//跳转路由到首页
            //登陆后替换头像（强制刷新一次，以触发cookies遍历）
            if (location.href.indexOf("#reloaded") == -1) {
                location.href = location.href + "#reloaded";
                location.reload();
            }           
        }else{
            alert(resp.data.data);
        }        
      });
    },    
  }  
};
</script>

<style>
#loginBackground {
  width: 700px;
  height: 498px;
}
#loginTitle {
  font-size: 30px;
  font-weight: bold;
}
.el-form {
  width: 400px;
  margin-top: 50px;
}
.el-form-item__label {
  border: 1px solid lightgray;
  border-radius: 4px 0 0 4px;
  background-color: lightgray;
}
.el-input input {
  border-radius: 0 4px 4px 0;
}
</style>