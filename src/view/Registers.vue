<template>
	<el-dialog title="注册" width="350px" :visible="visible" :before-close="clikeclose">
		<el-form label-position="right">
			<div  style="line-height: 30px;color: blue;font-size: 20px;">注册完成后自动分配账号</div>
			<el-form-item label="输入姓名" style="margin-top: 3%;font-size: 18px;">
				<el-input placeholder="请输入姓名" maxlength="4" show-word-limit v-model="name" class="adinput"
					style="width: 200px;margin-left: 8%;">
				</el-input>
			</el-form-item>
			<el-form-item label="输入密码" style="margin-top: 3%;font-size: 18px;">
				<el-input placeholder="请输入密码" maxlength="10" show-word-limit v-model="password" class="adinput"
					style="width: 200px;margin-left: 8%;">
				</el-input>
			</el-form-item>
			<el-form-item label="确认密码" style="margin-top: 3%;font-size: 18px;">
				<el-input placeholder="请再次确认密码" maxlength="10" show-word-limit v-model="rePassword" class="adinput"
					style="width: 200px;margin-left: 8%;">
				</el-input class="adinput">
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button v-show="showphone" @click="checkRegister" style="background-color: #0099FF;color: white;">完成注册</el-button>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name: "AppRegister",
		props: ['visible'],
		data() {
			return {
				name: "",
				password: "",
				rePassword: "",
				radio: 2,
				registerForm: {
					phone: null,
					core: null,
				},
				showphone: true,
			}
		},

		methods: {
			// 设置隐藏
			clikeclose() {
				this.showphone = true
				this.$emit('update:visible', false)
			},
			clikeNext() {
				this.showphone = false
			},
			clikeBefore() {
				this.showphone = true
			},
			//业务逻辑
			checkRegister() {
				this.$store.dispatch({
					type: "asyncCheckRegister",
					register: {
						id:'',
						name: this.name,
						username: "",
						password: this.password,
						rePassword: this.rePassword,
						radio: 2,
						m: 0,
						point: 0
					},
				});
				if (this.$store.state.registerToken == 1) {
					this.$message({
						message: "请填写完整注册信息！",
						type: "error",
						duration: 2000
					})
					return;
				}
				if (this.$store.state.registerToken == 2) {
					this.$message({
						message: "两次密码输入不一致！",
						type: "error",
						duration: 2000
					})
					return;
				}
				if (this.$store.state.registerToken == 3) {
					// this.$emit('update:visible',false)
					this.name = '',
						this.password = '',
						this.rePassword = '',
						this.$message({
							message: "注册成功！",
							type: "success",
							duration: 2000
						})
					this.$emit('loginstate', {
						uname: this.uname,
						upwds: this.upwds
					});

					return;
				}
				// user.commit({
				// 	type:'updateRegister',
				// 	user:{
				// 		name:this.username,
				// 		password:this.password,
				// 		role:this.radio
				// 	}
				// })
				return;

			}
		}

	}
</script>

<style>
	.satifycore {
		margin-top: 30px;
	}

	.adinput {
		margin-left: -50px;
		width: 350px;
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
		font-size: 15px;
		color: #606266;
		line-height: 20px;
		padding: 0 0px 0 0;
		box-sizing: border-box;
		margin-top: 3%;
	}
</style>
