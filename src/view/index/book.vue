<template>
	<div class="book_content">
		<div class="book_info">
			<div class="bookL">
				<a><img :src="thisbook.imgurl" style="width:156px;height:208px"></a>
			</div>
			<div class="bookR">
				<div class="bookinfo1">
					<div class="bookname">
						<h2>{{thisbook.name}}</h2>
					</div>
					<p>
						<span class="author" style="margin-right:12px">作者:{{thisbook.author}}</span>
						<span class="otherinfo" style="margin-right: 12px;">出版社:{{thisbook.publisher}}</span>
						<span class="otherinfo" style="margin-right: 12px;">出版年份:{{thisbook.publication_year}}</span>
						<span style="margin-right: 12px;">类别: <span v-for="(i,n) in thisbook.booktype"
								:key="i">{{i}}</span></span>
					</p>
				</div>
				<div class="bookinfo2">
					<div class="left">
						<p>价格:<i style="margin-left: 5px;">{{thisbook.price}}元</i></p>
						<el-button v-if="thisbook.num<1" type="info" round>暂无货源</el-button>
						<el-button v-if="state&&thisbook.num>0" type="danger" round @click="addtoshopcar(thisbook)">
							加入购物车</el-button>
						<el-input-number v-if="!state" :min="0" :max="thisbook.id | getnum" v-model="num">
						</el-input-number>
						<el-button v-if="!state" type="danger" round style="margin-left:20px" @click="goshopcar">前往购物车
						</el-button>
						<el-button v-if="!state" type="danger" round style="margin-left:20px" @click="costmoney">去结算
						</el-button>
					</div>
				</div>
				<div class="bookinfo3">
					<p>
						{{thisbook.introduction}}
					</p>
				</div>
			</div>
		</div>
		<router-view v-on:loginstate="loginstate"></router-view>
	</div>
</template>

<script>
	import book from '../bookcenter/image/bookcenter.js'
	import shop from '../../config/shopingcenter/shopcenter.js';
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
		watch: {
			num(n, o) {
				if (n == 0) {
					this.shoping.num = this.num
					shop.commit({
						type: 'del',
						data: this.shoping
					})
					this.state = true;
					this.$notify({
						title: '移出购物车',
						message: '移出购物车成功',
						type: 'success'
					});
				} else if (o != 0) {
					this.shoping.num = this.num
					shop.commit({
						type: 'edit',
						data: this.shoping
					})
				}
			}
		},
		filters: {
			getnum(data) {
				return book.state.bookData.filter(p => p.id == data)[0].num;
			}
		},
		computed: {
			getstate() {
				return shop.getters.getBookShop;
			},
		},
		data() {
			return {
				num: 0,
				state: true,
				shoping: '',
				thisbook: ''
			};
		},
		methods: {
			loginstate() {
				this.$emit("loginstate", {
					flag: true
				})
			},
			addtoshopcar(item) {
				if (!this.$store.state.f) {
					this.$emit("loginstate", {
						flag: true
					})
					return
				}
				// 判断书籍数量是否可供应
				if (book.state.bookData.filter(p => p.id == this.thisbook.id && p.num > 0).length < 1) {
					// console.log(this.thisbook.name, this.thisbook.num)
					this.$notify({
						title: '提示',
						message: '该书库存不足',
					});
					return;
				}
				this.num = 1;
				this.shoping = {
					uid: this.$store.state.id,
					book: this.thisbook,
					num: this.num
				}
				shop.commit({
					type: 'insertShop',
					data: this.shoping
				})
				this.state = false;
				this.$notify({
					title: '加入购物车',
					message: '加入购物车成功',
					type: 'success'
				});
				// console.log(shop.state.shoplist)
			},
			costmoney() {
				// 判断书籍数量是否可供应
				if (book.state.bookData.filter(p => p.id == this.shoping.book.id && !(p.num < this.shoping.num)).length < 1) {
					// console.log(this.thisbook.name, this.thisbook.num)
					this.$notify({
						title: '提示',
						message: '该书库存不足',
					});
					return;
				}
				// 生成订单
				var temp = {
					uid: this.$store.state.id,
					create_time: getNowDate(),
					id: Date.now(),
					status: '1',
					total_payment: parseFloat(this.shoping.num) * parseFloat(this.thisbook.price),
					list: [this.shoping],
					start: 0,
					point: 0
				}

				// 删除购物车信息
				shop.commit({
					type: 'del',
					data: this.shoping
				})
				this.state = true

				// 修改书籍最大数量
				book.commit({
					type: 'editBookNum',
					data: this.shoping
				})
				// console.log(this.shoping)
				//插入订单 
				bill.commit({
					type: 'insertBillList',
					data: temp
				})
				this.$notify({
					title: '订单',
					message: '新的订单已产生，请随即前往订单记录页面支付订单',
					type: 'success'
				});
				this.$router.push('/blog')
			},
			goshopcar() {
				this.$router.push('/shopcar')
			}
		},
		created() {
			if (this.$store.state.f) {
				shop.commit({
					type: "setUid",
					data: this.$store.state.id
				})
			}
			this.thisbook = book.state.bookData.filter(p => p.id == this.$route.query.id)[0]

			if (this.getstate.length > 0) {
				this.state = false;
				this.shoping = JSON.parse(JSON.stringify(this.getstate[0]));
				this.num = this.shoping.num;
			}

		}
	};
</script>

<style scoped>
	.book_content {
		width: 1000px;
		margin: 42px auto 0;
		position: relative;
		color: #9e9e9e;
		font: 12px/20px "Microsoft Yahei", arial, sans-serif;
		font-weight: normal;
	}

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

	.book_info {
		width: 1000px;
		overflow: hidden;
		background: #fff;
	}

	.book_info .bookL {
		float: left;
		width: 26.9%;
	}

	.book_info .bookL a {
		margin: 68px auto 0;
		width: 156px;
		height: 208px;
		display: block;
		position: relative;
		z-index: 1;
	}

	.book_info .bookR {
		float: left;
		width: 73.1%;
		overflow: hidden;
		padding-bottom: 27px;
		border-left: 1px solid #f0f0f0;
		box-sizing: border-box;
	}

	.bookR .bookinfo1 {
		padding: 22px 40px 0 30px;
		height: 72px;
		border-bottom: 1px solid #f0f0f0;
	}

	.bookinfo1 .bookname {
		overflow: hidden;
		margin-bottom: 15px;
		color: #212121;
	}

	.bookinfo1 .bookname h2 {
		max-width: 438px;
		height: 22px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		float: left;
		color: #212121;
		font-size: 20px;
		font-style: normal;
		font-weight: normal;
	}

	.bookinfo1 p {
		overflow: hidden;
		font-style: normal;
		font-weight: normal;
	}

	.bookinfo1 p .otherinfo {
		float: left;
	}

	.bookR .bookinfo2 {
		padding: 24px 40px 0 30px;
		height: 98px;
		border-bottom: 1px solid #f0f0f0;
	}

	.bookinfo2 .left {
		float: left;
		width: 500px;
		margin-top: 4px;
	}

	.bookinfo2 .left p {
		margin-bottom: 10px;
		font-size: 15px;
	}

	.bookinfo2 .left p i {
		margin-right: 10px;
		margin-left: 2px;
		color: red;
		font-size: 25px;
		font-style: normal;
		font-weight: normal;
	}

	.bookR .bookinfo3 {
		padding: 24px 40px 0 30px;
	}
</style>
