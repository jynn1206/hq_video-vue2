import VueRouter from "vue-router";
import Vue from "vue";
import Index from '@/components/page/Index.vue';
import Play from '@/components/page/Play.vue';
import Login from '@/components/page/Login.vue';
import Message from '@/components/page/Message.vue';
import Space from '@/components/page/Space.vue';

// this.path = '/space'; 
//this.$router.push({path: '/space'});
//重复路由跳转的问题,由上两行代码连起来用而触发，把第一行代码注释掉即解决

//以下注释的代码曾用来解决重复路由跳转的问题：

//获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
// VueRouter.prototype.push = function push(location) {
//   return originalPush.call(this, location).catch(err => err)
// }

Vue.use(VueRouter)

const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/index'},
        {path:'/index',component:Index},
        {path:'/play',component:Play},
        {path:'/login',component:Login},
        {path:'/message',component:Message},
        {path:'/space',component:Space},
    ]
})

export default router