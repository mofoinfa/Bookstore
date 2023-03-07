import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './config/index.js';
import store from './config/usercenter/usercenter.js'
// import user from './config/usercenter/usercenter.js';

// 生产提示开关，尚未发现用途（22-9-15）
// Vue.config.productionTip = true


Vue.use(ElementUI);

// new Vue({
//   el: '#app',
//   render: h => h(App),
//   router
// });
new Vue({
    render: h => h(App),
    router,
    store,
}).$mount('#app')
