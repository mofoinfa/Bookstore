export default {
	//1.设置路由的模式 hash 地址栏中有#后面值 history 真实的地址（我们常用） abstract 路径直接读取内存中的地址（移动端）
	mode: "history",
	//2.配置路径 与需要跳转的组件相关联
	routes: [
		//*其他所有的path没有匹配到的就走*
		// /user-* 配置以"user-"开头的任意路径
		{
		path: "/",
		name:"home",
		component: () => import('@/views/Home.vue')
		},
		{
		path: "/",
		name:"login",
		component: () => import('@/views/Login.vue'),
		
		},
		
		{
		path: "/",
		name:"home",
		component: () => import('@/views/Home.vue')
		},
		{
		path: "/1-2",
		name:"rootPaymanage",
		component: () => import('@/views/rootPaymanage')
		},
		{
		path: "/1-1",
		name:"test",
		component: () => import('@/views/test')
		},
		{
		    path: "/register",
		    alias: "/9",
		    name: "register",
		    component: () => import('@/views/Register.vue'),
		    meta:{
		
		        title: "图书管理系统-注册页面",
		    }
		},
	]
}