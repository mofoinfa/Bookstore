import vueRouter from 'vue-router';
import vue from 'vue';
import myRouter from './router.js';

// 路由
vue.use(vueRouter);
const router = new vueRouter(myRouter);
// 使用路由跳转时将页面拉到顶部
router.beforeEach((to, from, next) => {
	// 兼容chrome
	document.body.scrollTop = 0
	// 兼容firefox
	document.documentElement.scrollTop = 0
	// 兼容safari
	window.pageYOffset = 0
	next()
})

const originalPush = vueRouter.prototype.push;
vueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}
export default router;
