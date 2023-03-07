<template>
	<div>
		<div class="main"  @keyup.enter="login">
			<div class="header">
				<h1>登&nbsp;&nbsp;录</h1>
			</div>
			<div class="bodyer">
				<div class="input">
					<span>账&nbsp;&nbsp;&nbsp;号：</span>
					<input type="text" placeholder="请输入账号" v-model="uname">
				</div>
				<div class="input">
					<span>密&nbsp;&nbsp;&nbsp;码：</span>
					<input type="password" placeholder="请输入密码" v-model="upwds">
				</div>
				<div class="input">
					<span>验证码：</span>
					<input type="text" class="code" placeholder="请输入验证码" v-model="recode">
					<input type="text" class="code rainCode" v-model="code"  title="点击切换验证码" @click="getcode">
				</div>
			</div>
			<div class="footer">
				<div class="register" @click="toregister">注册</div>
				<button @click="login">登录</button>
				<div class="getpwd">密码不幸丢失，<a href="" @click="togetpwd">找回密码</a>？</div>
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
				code: '',
				recode: '',
			}
		},
		mounted() {
			this.getcode()
		},
		methods: {
			getcode() {
				var code = new Array(
					'1', '2', '3', '4', '5', '6', '7', '8', '9', '0',
					'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
					'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
					'u', 'v', 'w', 'x', 'y', 'z',
					'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
					'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
					'U', 'V', 'W', 'X', 'Y', 'Z'
				);
				var codes = ''; // 重新初始化验证码
				for (var i = 0; i < 4; i++) {
					// 随机获取一个数组
					var a = parseInt(Math.random() * code.length);
					codes += code[a];
				}
				this.code=codes;
				this.recode=codes;
			},
			toregister() {
				this.$router.push('/register')
			},
			login() {
				if(this.code.toLowerCase()!=this.recode.toLowerCase()){
					this.$message.error('验证码错误！');
					this.getcode();
					return;
				}
				
				this.$router.push('/index2');
				
			},
			togetpwd() {

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
		height: 188px;
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

	.code {
		width: 88px;
		margin-right: 20px;

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

	.register {
		width: 60px;
		height: 35px;
		line-height: 35px;
		text-align: center;
		background-color: #606266;
		border-radius: 3px;
		float: left;
		margin-left: 15%;
		margin-right: 5px;
		cursor: pointer;
	}

	.register:hover {
		background-color: #c0c4cc;
	}

	.getpwd {
		line-height: 45px;
		text-align: center;
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

	.rainCode {
		border: none;
		font-size: 24px;
		/*设置背景渐变色*/
		background-image: linear-gradient(to right, var(--blue,#409eff), var(--blue,#409eff), var(--blue,#409eff), var(--blue,#409eff), var(--white,white), var(--white,white), var(--white,white));
		/*chrome私有样式，加前缀，文字显示背景图片*/
		-webkit-background-clip: text;
		animation: move 1s linear 1s infinite alternate;
		/*文字颜色设为透明*/
		color: transparent;
		letter-spacing: 6px;
		cursor: pointer;
	}

	@keyframes move {
		0% {
			background-position: 0 0;
		}

		100% {
			/*宽度固定，如果为百分比背景不会滚动*/
			background-position: -150px 0;
		}
	}
</style>
