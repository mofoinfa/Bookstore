<template>
	<el-dialog title="密码登录" width="350px" :visible="showQrcode" :before-close="clikeclose">
		<el-form v-show="showQrcode" label-position="right" style="line-height: 0px;">
			<el-form-item label="账号">
				<el-input v-model="username" v-text=""></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input type="password" v-model="password"></el-input>
			</el-form-item>
			<span style="font-size: 15px;color:blue;" v-if="this.$store.state.Rf==true">{{ "你的账号是："+this.$store.state.username}}</span>

		</el-form>

		<div slot="footer" class="dialog-footer">
			<el-button @click="checkLogin" v-show="showQrcode" style="background-color: #0099FF;color: white;">确认登陆</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		// props: ['visible'],
		data() {

			return {
				labelPosition: 'right',
				showQrcode: true,
				username: '',
				password:''
				/* qrcode:'' */
			}
		},
		methods: {

			clikeclose() {
				this.$emit('update:visible', false)
			},
			checkLogin() {
			    this.$store.commit({
			        type: "Login2Deal",
			        data: {
			            username: this.username,
			            password: this.password,
			        },
			    });
			    if (this.$store.state.token == 1) {
			        this.$message({
			            message: "请输入用户名或密码！",
			            type: "error",
			            duration: 2000
			        })
			        return;
			    } else if (this.$store.state.token == 2) {
					this.password = '',
			        this.$message({
			            message: "用户名或密码错误,请重新输入！",
			            type: "error",
			            duration: 2000
			        })
			        return;
			    } else if(this.$store.state.token == 4){
					this.username = '';
					this.password = '';
					this.$message({
					    message: "账号异常，请稍后重试！",
					    type: "error",
					    duration: 2000
					})
					return;
				}else if (this.$store.state.token == 3) {
					this.username = '',
					this.password = '',
			        this.$notify({
			            title: "登录成功！",
			            type: "success",
			            duration: 2000
			        })
					this.$emit("toMainPage",{flag:true})
					// this.$emit('toMainPage', {
					// 	uname: this.uname,
					// 	upwds: this.upwds
					// });
			        // this.$store.state.usernameShowOrNot = false;
			        // this.$store.dispatch({
			        //     type: "asyncFindUserById",
			        //     user: {
			        //         username: this.username
			        //     },
			        // });
			        if(this.$store.state.radio==0 || this.$store.state.radio==1){
			            this.$router.push("/index");
						return;
			        }
			        if(this.$store.state.radio==2){
			            this.$router.push("/");
			        }
			    }
			}
		},

	}
</script>

<style>
	.qrcode {
		width: 200px;
		height: 200px;
		border: 1px solid #e2e2e2;
	}
	.el-dialog__header {
	    padding: 0px 20px 0px;
	}
	.el-dialog__footer {
	    padding: 0px 20px 0px;
	}
	.el-dialog__body {
	    padding: 0px 20px 0px;
	}
	.el-form-item__label {
	    text-align: right;
	    vertical-align: middle;
	    float: left;
	    font-size: 14px;
	    color: #606266;
	    line-height: 20px;
	    padding: 0 0px 0 0;
	    box-sizing: border-box;
	}
</style>
