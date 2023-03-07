<template>
	<div>
		<div class="header">
			<div class="section_inner">
				<div class="section_inner_wrap">
					<h1 class="market_title">
						<img src="../../src/view/index/images/logo.png" />
						精文书城
					</h1>
					<div class="section_inner_right">
						<ul class="ul_top">
							<!-- 							<li class="li_nav_top active" @click="getActive($event)">
								<router-link to="index2" class="top_nav_link ">首页</router-link>
							</li> -->
							<li class="li_nav_top active" @click="getActive($event)">
								<router-link to="/manage" class="top_nav_link">管理</router-link>
							</li>
							<li class="li_nav_top" @click="getActive($event)">
								<router-link to="/bookcenter" class="top_nav_link">书籍管理</router-link>
							</li>
							<li class="li_nav_top" @click="getActive($event)">
								<router-link to="/messagelist" class="top_nav_link">评论管理</router-link>
							</li>
							<li class="li_nav_top" @click="getActive($event)">
								<router-link to="/billcenter" class="top_nav_link">订单管理</router-link>
							</li>
							<li class="li_nav_top " @click="getActive($event)">
								<router-link to="/rootPaymanage" class="top_nav_link ">流水管理</router-link>
							</li>
							<li class="li_nav_top ">
								<span class="top_nav_link" @click="goOut">退出登陆</span>
							</li>
						</ul>
						<div class="login_register" style="margin-left: 30px;">
							<img class="avatar"
								src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" style="margin-top: 13px;float: left;">
							<span style="color:#fff;margin-left: 12px;float: left;" v-if="this.$store.state.f!=2">{{this.$store.state.name}}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="container">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import book from './bookcenter/image/bookcenter.js';

	export default {
		created() {
			if(this.$store.state.radio>1){
				this.$router.push('/')
			}
		},
		data() {
			return {
				booksearch: ''
			}
		},
		methods: {
			search() {
				book.commit({
					type: 'IndexsearchData',
					data: this.booksearch
				})
				this.$router.push({
					path: "/search",
					query: {
						booksearch: this.booksearch
					}
				}).catch(err => err);
			},
			getActive(event) {
				var dom = document.getElementsByClassName('li_nav_top')
				for (var i = 0; i < dom.length; i++) {
					if (event.target.parentNode == dom[i]) {
						dom[i].classList.add('active')
					} else {
						dom[i].classList.remove('active')
					}
				}
			},
			goOut() {
				this.$store.dispatch({
					type: "asyncExit",
					exit: {
						f: false
					},
				});
				this.$router.push('/')
			}
		}
	}
</script>

<style scoped>
	*,
	body,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5 {
		margin: 0;
		padding: 0;
	}

	a {
		text-decoration: none;
		outline: none;
		color: #fff;
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	i {
		font-style: normal;
		font-weight: normal;
	}

	body {
		color: #fff;
		font: 12px/20px "Microsoft Yahei", arial, sans-serif;
		background: #f0f0f0;
		font-weight: normal;
		max-width: 100%;
		min-width: 100%;
	}

	ul,
	li {
		overflow: hidden;
	}

	.active {
		border-bottom-color: #fff !important;
		padding-bottom: 10px;
	}

	.header {
		width: 100%;
		height: 68px;
		min-width: 100%;

	}

	.section_inner {
		height: 68px;
		background-color: #409EFF;
	}

	.section_inner_wrap {
		width: 1200px;
		height: 68px;
		line-height: 68px;
		margin: 0 auto;
		padding: 0 2px;
	}

	.section_inner_wrap h1 {
		float: left;
		height: 68px;
		font-style: normal;
		font-weight: normal;
	}

	.market_title {
		font-size: 24px;
		color: #fff;
	}

	.section_inner_right {
		float: right;
		height: 68px;
	}

	.ul_top {
		float: left;
		overflow: hidden;
	}

	.li_nav_top {
		position: relative;
		float: left;
		margin-left: 20px;
		list-style: none;
		border-bottom: 3px solid transparent;
		height: 50px;
		color: #fff;
		transition: 0.5s;
	}

	.li_nav_top:hover {
		background-color: #405eeF;
		padding-bottom: 10px;
		color: #000;
	}

	.top_nav_link {
		display: block;
		padding: 0 20px;
		text-align: center;
		font-size: 18px;
	}

	.book_search {
		float: left;
		position: relative;
		margin-left: 300px;
	}

	.book_search input {
		width: 200px;
		height: 30px;
		line-height: 30px;
		border: 1px solid #d2d2d2;
		border-radius: 50px;
		color: #9e9e9e;
		margin: 0 22px 0 20px;
		padding: 0 36px 0 12px;
		font-size: 15px;
		outline: none;
		background: none;
	}

	.book_search input:hover {
		border-color: chocolate;
	}

	.el-icon-search {
		width: 15px;
		height: 15px;
		cursor: pointer;
		position: absolute;
		right: 40px;
		top: 27px;
	}

	.login_register {
		float: left;
		position: relative;
	}

	.el-icon-user {
		margin-left: 15px;
		margin-right: 5px;
	}

	.login_register a:hover {
		color: #f60;
		transition: 0.3s;
	}

	.container {
		width: 100%;
	}

	.avatar {
		width: 40px;
		height: 40px;
		border-radius: 40px;
	}
</style>
