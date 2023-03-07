// import login from '@/view/login.vue';
// import register from '@/view/register.vue';
// import index from '@/view/index.vue';
import bookcenter from '@/view/bookcenter/bookcenter.vue';
import booklist from '@/view/bookcenter/booklist.vue';
import bookadd from '@/view/bookcenter/bookadd.vue';
import booktype from '@/view/bookcenter/booktype.vue';
import shopcar from '@/view/bookcenter/shopcar.vue';


import index1 from '@/view/index1.vue';
import index2 from '@/view/index2.vue';
import homepage from '@/view/index/homepage.vue';
import classification from '@/view/index/classification.vue';
import rank from '@/view/index/rank.vue';
import book from '@/view/index/book.vue';
import search from '@/view/index/search.vue';
import manage from '@/view/index/manage.vue';
import message from '@/view/comment/Message.vue';
import messagelist from '@/view/comment/MessageList.vue';
import blog from '@/view/list/Blog.vue';
import billcenter from '@/view/list/billcenter.vue';
import rootPaymanage from '@/view/Payment/views/rootPaymanage.vue';

export default {
	mode: "history",
	routes: [
		// 用户路由
		{
			path: "/",
			component: index1,
			children: [{
					path: "/",
					component: homepage
				},
				{
					path: "/classification",
					component: classification
				},
				{
					path: "/rank",
					component: rank
				},
				{
					path: "/book",
					component: book,
					children: [{
						path: '/',
						component: message
					}]
				},
				{
					path: "/search",
					component: search
				},
				{
					path: "/shopcar",
					component: shopcar,
				},
				{
					path: "/blog",
					component: blog
				},
			]
		},
		// 管理员路由
		{
			path: "/index",
			name: "index",
			component: index2,
			children: [
				{
					path: "/",
					component: manage
				},
				{
					path: "/manage",
					component: manage
				},
				{
					path: "/bookcenter",
					component: bookcenter,
					children: [{
						path: '/',
						components: {
							booklist: booklist,
							bookadd: bookadd,
							booktype: booktype,
						}
					}, ]
				},

				{
					path: "/messagelist",
					component: messagelist
				},

				{
					path: "/billcenter",
					component: billcenter
				},
				{
					path:"/rootPaymanage",
					component: rootPaymanage
				}
			]
		},
		// // 注册
		// {
		// 	path: "/register",
		// 	component: register,
		// },
		// // 登录
		// {
		// 	path: "/login",
		// 	component: login,
		// },


	]
}
