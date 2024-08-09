const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath:"./",
  devServer: {
    port: 7752,
    //关闭默认的全屏警告
    client: {
      overlay: false
    },
    // proxy:{
    //   '/api':{
    //     target:'http://localhost:7720',
    //     timeout:360000//设置超时时间为3分钟
    //   }
    // }
  }
})
