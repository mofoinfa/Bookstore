<template>
	<div>
		<!-- 用户充值 -->
		<el-dialog title="用户充值" width="400px" :visible="showMoney" :before-close="clikeMoney">
			<el-form label-position="right">
				<el-form-item label="充值金额">
					<el-input v-model="moneyNum" v-text=""></el-input>
				</el-form-item>
				<el-button @click="toMoney">确认充值</el-button>
			</el-form>
		</el-dialog>
		<!-- 查看用户信息 -->
		<el-dialog title="个人信息" width="330px" :visible="!showMoney" :before-close="clikeclose">
			<el-form label-position="right">
				<el-form-item label="姓名:" style="margin-top: 3%;font-size: 18px;">
					<el-input maxlength="4" show-word-limit v-model="name" class="adinput"
						style="width: 200px;margin-left: 8%;" readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="账号:" style="margin-top: 3%;font-size: 18px;">
					<el-input v-model="username" class="adinput" style="width: 200px;margin-left: 8%;" readonly>
					</el-input>
				</el-form-item>
				<el-form-item label="余额:" style="margin-top: 3%;font-size: 18px;">
					<el-input v-model="m" class="adinput" style="width: 200px;margin-left: 8%;" readonly></el-input>
				</el-form-item>
				<el-form-item label="积分:" style="margin-top: 3%;font-size: 18px;">
					<el-input v-model="point" class="adinput" style="width: 200px;margin-left: 8%;" readonly>
					</el-input class="adinput">
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="openMoney" style="background-color: #0099FF;color: white;">充值余额
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	import user from '../../../config/usercenter/usercenter.js';
	import bill from '../../../config/billcenter/billcenter.js'

	// 格式化日对象
	const getNowDate = () => {
		var date = new Date();
		var sign2 = ":";
		var year = date.getFullYear() // 年
		var month = date.getMonth() + 1; // 月
		var day = date.getDate(); // 日
		var hour = date.getHours(); // 时
		var minutes = date.getMinutes(); // 分
		var seconds = date.getSeconds() //秒
		var weekArr = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期天'];
		var week = weekArr[date.getDay()];
		// 给一位数的数据前面加 “0”
		if (month >= 1 && month <= 9) {
			month = "0" + month;
		}
		if (day >= 0 && day <= 9) {
			day = "0" + day;
		}
		if (hour >= 0 && hour <= 9) {
			hour = "0" + hour;
		}
		if (minutes >= 0 && minutes <= 9) {
			minutes = "0" + minutes;
		}
		if (seconds >= 0 && seconds <= 9) {
			seconds = "0" + seconds;
		}
		return year + "-" + month + "-" + day + " " + hour + sign2 + minutes + sign2 + seconds;
	}

	export default {
		name: "AppRegister",
		data() {
			return {
				name: '',
				username: '',
				point: '',
				m: '',
				moneyNum: '',
				showMoney: false,

			}
		},
		computed: {
			getMe() {
				return user.state.users.filter(p => p.id == user.state.id)[0];
			}
		},
		mounted() {
			//获取初始信息
			// console.log(this.getMe)
			this.name = this.getMe.name
			this.username = this.getMe.username
			this.point = this.getMe.point;
			this.m = this.getMe.m
		},
		methods: {
			// 设置隐藏
			clikeclose() {
				this.showphone = true;
				this.$emit('closeMyself', false)
			},
			clikeMoney() {
				this.showMoney = false
			},
			openMoney() {
				// this.$emit('closeMyself', false)
				this.showMoney = true
			},
			toMoney() {
				this.$store.dispatch({
					type: "asynctoMoney",
					recharge: {
						user: "",
						event: "充值",
						changeManey: this.moneyNum,
						data: "0",
						moneyNum: "0",
						point: "0"
					},
				});

				if (this.$store.state.toMoneyToken == 1) {
					this.showMoney = false;
					this.m = this.$store.state.m
					console.log(this.moneyNum)
					// 生成订单信息
					var temp = {
						uid: this.getMe.id,
						create_time: getNowDate(),
						id: Date.now(),
						status: 9,
						total_payment: parseFloat(this.moneyNum),
						list: [],
						start: 0,
						point: 0,
					}
					// 插入订单
					bill.commit({
						type: 'insertBillList',
						data: temp
					})
					this.$message({
						message: "充值成功！",
						type: "succes",
						duration: 2000
					})
					this.moneyNum = ''
				}else{
					this.$message({
						message: "充值失败！",
						type: "error",
						duration: 2000
					})
				}
				
				
				this.$emit('closeMyself', false)
			},
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
