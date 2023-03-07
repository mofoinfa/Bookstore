//1.导入路由插件
import VueRouter from 'vue-router'
//2.导入vue插件
import Vue from 'vue'
//3.导入路由的配置信息
import config from './config.js'
//4.使用路由插件

Vue.use(VueRouter);

/* const stylePush= */
//5.创建路由实例  并加载配置信息
/* 相当于把config放入:
	const router=new VueRouter({

	mode:"history"

	routes:[
		{
			path:"/",
			component:()=>import('@/views/Home.vue')
		},
		{
			path:"/blog",
			component:()=>import('@/views/Blog.vue')
		},
		{
			path:"/about",
			component:()=>import('@/views/About.vue')
		},
	]
}); */
const router=new VueRouter(config);
//6.导出设置
export default router;

