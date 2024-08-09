export default {
  install(Vue){
    //定义全局函数
    Vue.prototype.$parseCookies = function (cookieStr) {
      return cookieStr.split('; ').reduce((cookies, cookie) => {
        const [name, value] = cookie.split('=');
        cookies[name] = value;
        return cookies;
      }, {});
    }    
  }
}