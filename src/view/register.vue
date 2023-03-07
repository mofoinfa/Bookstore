<template>
	<div>
		<div class="main">
			<div class="header">
				<h1>注&nbsp;&nbsp;册</h1>
			</div>
			<div class="bodyer">
				<div class="input">
					<span>账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</span>
					<input type="text" placeholder="请输入账号" v-model="uname">
				</div>
				<div class="input">
					<span>手&nbsp;&nbsp;机&nbsp;&nbsp;号：</span>
					<input type="text" placeholder="请输入手机号" v-model="phone">
				</div>
				<div class="input">
					<span>密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码：</span>
					<input type="password" placeholder="请输入密码" v-model="upwds">
				</div>
				<div class="input">
					<span>确认密码：</span>
					<input type="password" placeholder="请确认密码" v-model="repwd">
				</div>
			</div>
			<div class="footer">
				<div class="login" @click="tologin">登录</div>
				<button>注册</button>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				uname: '',
				upwds: '',
				code: '4399',
				recode: '',
			}
		},
		mounted() {

		},
		methods: {
			tologin(){
				this.$router.push('/login')
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
		--blue:#409eff;
		--white:white;
	}
	:root{
		
	}
	.main {
		width: 400px;
		border-radius: 18px;
		background-color: var(--blue,#409eff);
		color: var(--white,white);


		/* 居中使用 */
		margin-top: 100px;
		margin-left: 36.69%;
	}

	.header {
		height: 120px;
		line-height: 150px;
		text-align: center;
	}

	.bodyer {
		width: 400px;
		height: 236px;
	}

	input {
		height: 36px;
		width: 200px;
		outline: none;
		border-radius: 5px;
		border: none;
		font-size: 16px;
		text-indent: 6px;
	}

	input::placeholder {
		text-indent: 3px;
		font-size: 13px;
	}

	.input {
		margin-left: 15%;
		margin-bottom: 23px;
	}

	.footer {
		height: 88px;

	}

	button {
		height: 35px;
		width: 202px;
		background-color: #909399;
		border: none;
		border-radius: 3px;
		color: var(--white,white);
		font-size: 16px;
	}

	button:hover {
		background-color: #c0c4cc;
	}

	.login {
		width: 70px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #606266;
		border-radius: 3px;
		float: left;
		margin-left: 15%;
		margin-right: 8px;
		cursor: pointer;
	}

	.login:hover {
		background-color: #c0c4cc;
	}



	a {
		color: var(--white,white);
		text-decoration: none;
	}

	a:hover {
		color: black;
	}

	span {
		width: 60px;
		margin-right: 1px;

	}


</style>
