<template>
	<div style="text-align: center;">
		<div style="width: 850px;margin-left: 300px;height: 600px;margin-top: 30px;">
			<el-table ref="multipleTable" :data="shoplist" tooltip-effect="dark" style="width: 100%;border-top: 1px solid #EBEEF5" height="550"
				@selection-change="handleSelectionChange">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" width="50"></el-table-column>
				<el-table-column prop="book.name" label="书名" width="140"></el-table-column>
				<el-table-column label="封面" width="180">
					<template slot-scope="scope">
						<el-popover placement="top-start" title="" trigger="hover">
							<img :src="scope.row.book.imgurl" alt="" style="width: 180px;height: 200px">
							<img slot="reference" :src="scope.row.book.imgurl" style="width: 90px;height: 106px">
						</el-popover>
					</template>
				</el-table-column>
				<el-table-column prop="book.price" label="单价" width="80">
				</el-table-column>
				<el-table-column prop="num" label="数量" width="200">
					<template slot-scope="scope">
						<el-input-number v-model="scope.row.num" @change="handleChange(scope.row)" :min="0"
							:max="scope.row.book.id | getnum"></el-input-number>
					</template>
				</el-table-column>
				<el-table-column prop="num" label="总价" width="150">
					<template slot-scope="scope">
						{{scope.row.book.price*scope.row.num}}
					</template>
				</el-table-column>
			</el-table>
			<div class="float-bar" style="background-color:beige">
				<div style="width:1190px;position:static;">
					<div class="float-bar-wrapper">
						<div class="float-bar-right">
							<div class="amount_items">
								<span>已选商品</span>
								<i
									style="color:#f40;float:left;font-weight:700;font-style:normal;font-size:28px">{{num}}</i>
								<span>件</span>
							</div>
							<div class="price_sum">
								<span class="total">合计:</span>
								<strong class="price">
									<i
										style="font-weight:700;font-size:24px;padding:0 3px;color:#f40;font-style: normal;">
										<span class="total_symbol">￥{{cost}}</span>
									</i>
								</strong>
							</div>
							<button class="sub-button" @click="gocost">结 算</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import shop from '../../config/shopingcenter/shopcenter.js';
	import book from './image/bookcenter.js'
	import bill from '../../config/billcenter/billcenter.js'
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
		created() {
			if (!this.$store.state.f) {
				this.$emit("loginstate", {
					flag: true
				})
				this.$router.push('/')
			}
			// 获取用户id
			shop.commit({
				type: "setBid",
				data: this.$store.state.id
			})
		},
		computed: {
			shoplist() {
				return shop.getters.getMyShopList;
			},
		},
		data() {
			return {
				cost: 0,
				num: 0,
				multipleSelection: [],
			}
		},
		filters: {
			getnum(data) {
				return book.state.bookData.filter(p => p.id == data)[0].num;
			}
		},
		methods: {
			toggleSelection(rows) {
				if (rows) {
					rows.forEach(row => {
						this.$refs.multipleTable.toggleRowSelection(row);
					});
				} else {
					this.$refs.multipleTable.clearSelection();
				}
			},
			changeCost() {
				var cost = 0;
				var num = 0;
				this.multipleSelection.map((item, i) => {
					cost += item.book.price * item.num;
					num += item.num;
				})
				this.num = num;
				this.cost = cost;
			},

			handleSelectionChange(val) {
				this.multipleSelection = val;
				this.changeCost();
			},
			handleChange(item) {
				if (item.num == 0) {
					shop.commit({
						type: 'del',
						data: item
					})
				}
				this.changeCost();
			},
			gocost() {
				if (this.cost == 0) {
					return;
				}
				// 判断货源是否充足
				for (var i = 0; i < this.multipleSelection.length; i++) {
					if (book.state.bookData.
					filter(p => p.id == this.multipleSelection[i].book.id && !(p.num < this.multipleSelection[i].num )).length <1) {
						console.log(this.multipleSelection[i].book.name,'库存不足！')
						return;
					}
				}
				// 生成订单信息
				var temp = {
					uid: this.$store.state.id,
					create_time: getNowDate(),
					id: Date.now(),
					status: '1',
					total_payment: this.cost,
					list: this.multipleSelection,
					start: 0,
					point: 0,
				}

				// 删除购物车选中的信息,书的数量
				for (var i = 0; i < this.multipleSelection.length; i++) {
					shop.commit({
						type: 'del',
						data: this.multipleSelection[i]
					})
					book.commit({
						type: 'editBookNum',
						data: this.multipleSelection[i]
					})
				}
				// 插入订单
				bill.commit({
					type: 'insertBillList',
					data: temp
				})
				this.$notify({
					title: '订单消息',
					message: '订单添加成功，请立即前往订单记录页面支付订单',
					type: 'success'
				});
				this.$router.push('blog')
			}
		}
	}
</script>

<style scoped>
	i {
		font-size: 16px;
	}

	.float-bar {
		position: relative;
		height: 72px;
		border-top: 1px solid #e6e6e6;
		border-radius: 5px;
	}

	.float-bar-wrapper {
		height: 72px;
		overflow: hidden;
		margin: 0 20px;
	}

	.float-bar-right {
		float: right;
		position: absolute;
		right: 18px;
		top: 15px;
		z-index: 4;
		padding-left: 20px;
	}

	.amount_items {
		cursor: pointer;
		height: 48px;
		color: #3c3c3c;
		float: left;
		letter-spacing: 1px;
		margin-right: 30px;
	}

	.amount_items span {
		float: left;
		line-height: 48px;
		font-size: 20px;
		color: #000;
	}

	.price_sum {
		margin-right: 7px;
		height: 48px;
		color: #3c3c3c;
		float: left;
		font-style: normal;
	}

	.total {
		line-height: 48px;
		font-size: 20px;
		color: #000;
	}

	.price-sum .price {
		color: #f40;
		font-weight: 400;
		font-size: 18px;
		line-height: 48px;
		font-family: Arial;
		vertical-align: middle;
		float: left;
	}

	.total-symbol {
		font-size: 14px;
		font-family: verdana;
		font-weight: 400;
	}

	.sub-button {
		text-align: center;
		width: 94px;
		height: 42px;
		line-height: 42px;
		color: #fff;
		background: #FF5000;
		border-radius: 21px;
		font-size: 16px;
		cursor: pointer;
		border: none;
	}
</style>
