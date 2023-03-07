<template>
	<div class="orderList" style="margin-left: 15%;">
		<div class="page-wrap w">
			<div class="orderList-table">
				<table class="order-head">
					<tbody>
						<tr class="table">
							<th class="order_info">商品信息</th>
							<th class="order_price">单价</th>
							<th class="order_num">数量</th>
							<th class="real_pay">实付款</th>
							<th class="order_status">订单状态</th>
							<th class="order_handle" style="">交易操作</th>
						</tr>
					</tbody>
				</table>
				<div v-for="(item, index) in getBillList" :key="index" class="order-body" style="width: 100%;">
					<table class="body_top" style="width: 1083px;">
						<tbody>
							<br />
							<div class="body_top_con">
								<div class="top_con_shop">
									<span class="top_con_num" style="font-weight: bold;">订单号：{{ item.id }}</span>
									<span class="top_con_time">下单时间：{{ item.create_time }}</span>
								</div>
								<div class="top_con_del" v-if="item.status==2">
									<i class="el-icon-delete" @click="delCost(item,5)"></i>
								</div>
								<div class="top_con_del" v-else>
									<i class="el-icon-delete" @click="delCost(item,4)"></i>
								</div>
							</div>
						</tbody>
					</table>

					<table>
						<tbody>
							<tr class="body_content">
								<div v-for="(shopbook, ind) in item.list" :key="ind">
									<td class="body_content_info" @click="tobook(shopbook.book)">
										<div class="info_box">
											<div class="info_box_img">
												<img :src="shopbook.book.imgurl" alt=""
													style="height: 100px;width: 80px;" />
											</div>
											<div class="info_describe">
												<div>
													<span style="font-weight: 600;font-size: 15px;color:#3c3c3c">书名：{{ shopbook.book.name }}</span>
												</div>
												<div>
													<span style="font-weight: 600;font-size: 15px;color:#3c3c3c">作者：{{shopbook.book.author}}</span>
												</div>
												<div>
													<span style="font-weight: 600;font-size: 15px;color:#3c3c3c">出版社：{{shopbook.book.publisher}}</span>
												</div>
												<div>
													<span style="font-weight: 600;font-size: 15px;color:#3c3c3c">出版年份：{{shopbook.book.publication_year}}</span>
												</div>											
												
											</div>
										</div>
									</td>
									<td class="order_price body_content_price" style="margin: auto auto;">
										<p>￥{{ shopbook.book.price }}</p>
									</td>
									<td class="order_num body_content_num">
										<p>{{ shopbook.num }}</p>
									</td>
								</div>
								<td :rowspan="item.list.length" headers="" class="real_pay body_content_pay">
									<p class="price">￥{{ item.total_payment }}</p>
								</td>
								<td :rowspan="item.list.length" headers="" class="order_status body_content_status">
									<p>
										<span v-if="item.status == 1">等待付款</span>
										<span v-if="item.status == 2">已付款</span>
										<span v-if="item.status == 3">已取消</span>
									</p>
								</td>
								<td colspan="" :rowspan="item.list.length" headers=""
									class="order_handle body_content_ohandle">
									<p v-if="item.status == 1">
										<el-button size="mini" type="success" @click.prevent="changecost(item)">立即付款
										</el-button>
									</p>
									<p v-if="item.status == 1" class="order_cancel">
										<el-button size="mini" type="danger" @click.prevent="delCost(item,3)">取消订单
										</el-button>
									</p>
									<p class="order_cancel">
									<div v-if="item.start!=0">
										您已评价！<br>{{item.start*2}}分
									</div>
									<div v-if='item.status == 2&&item.start==0' style="margin-top: 20px;">
										尊敬的客户请评分：
										<el-rate v-model="item.start"></el-rate>
									</div>
									</p>
									<p v-if="item.status == 3" class="order_cancel">
										<el-button size="mini" type="info" @click="goother">浏览其它商品</el-button>
									</p>
									<p class="order_cancel">
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import bill from '../../config/billcenter/billcenter.js'
	import shop from '../../config/shopingcenter/shopcenter.js'
	import book from '../bookcenter/image/bookcenter.js'
	export default {
		computed: {
			getBillList() {
				return bill.getters.getmybilllist;
			}
		},
		data() {
			return {
				isShow: false
			}
		},
		methods: {
			tobook(item) {
				this.$router.push({
					path: "/book",
					query: item
				})
				shop.commit({
					type: "setBid",
					data: item
				})
			},
			goother(){
				this.$router.push('/')
			},
			delCost(item,i){
				item.status = i
				if (i == 3 || i == 4) {
					for (var i = 0; i < item.list.length; i++) {
						book.commit({
							type: 'editBookNumplus',
							data: item.list[i]
						})
					}
				}
				bill.commit({
					type: 'editBillList',
					data: item
				})
				if(i!=3){
					this.$notify({
						title: '订单通知',
						message: '订单删除成功',
					});
				}else{
					this.$notify({
						title: '订单通知',
						message: '订单取消成功',
					});
				}

			},
			
			changecost(item) {
				this.$confirm('请选择支付类型?', '提示', {
					distinguishCancelAndClose: true,
					confirmButtonText: '积分加余额',
					cancelButtonText: '余额',
					type: 'warning'
				}).then(() => {
					if(this.$store.state.point==0){
						// console.log('积分不足')
						this.$notify({
							title: '积分通知',
							message: '积分不足',
							type: 'warning'
						});
						return;
					}
					
					var tempbill = {
						money:item.total_payment,
						point:0
					}
					// console.log(this.$store.state.point)
					var point = 0;
					if(this.$store.state.point>parseInt(item.total_payment/10)){
						tempbill.point = parseInt(this.$store.state.point) - parseInt(item.total_payment/10)
						point = parseInt(item.total_payment/10);
						tempbill.money = parseFloat(item.total_payment)*0.9;
					}else{
						tempbill.money = parseFloat(item.total_payment)-parseFloat(this.$store.state.point)/10
						point = this.$store.state.point;
					}
					if(this.$store.m < tempbill.money){
						this.$notify({
							title: '余额通知',
							message: '余额不足',
							type: 'warning'
						});
						// console.log('余额不足请充值')
						return;
					}
					
					item.status = 2;
					item.point = tempbill.point;
					
					this.$store.commit({
						type:'CostBookPlus',
						data:tempbill
					})
					item.point = -point;
					bill.commit({
						type: 'editBillList',
						data: item
					})
					this.$notify({
						title: '支付通知',
						message: '积分加余额支付成功!',
						type: 'success'
					});
					// this.$message({
					// 	type: 'success',
					// 	message: '积分加余额支付成功!'
					// });

				}).catch(action => {
					if(action === 'cancel') {
						if (parseFloat(this.$store.state.m) < parseFloat(item.total_payment)) {
							// console.log('余额不足请充值')
							this.$notify({
								title: '余额通知',
								message: '余额不足',
								type: 'warning'
							});
							return;
						}

						item.status = 2;
						item.point = parseInt(item.total_payment/10);
						this.$store.commit({
							type:'CostBook',
							data:item
						})
						bill.commit({
							type: 'editBillList',
							data: item
						})
						
					this.$notify({
						title: '支付通知',
						message: '余额支付成功!',
						type: 'success'
					});
					}else{
						this.$notify({
							title: '支付通知',
							message: '支付已取消!',
						});
					}
				});

			}
		},
		created() {
			if (!this.$store.state.f) {
				this.$emit("loginstate", {
					flag: true
				})
				this.$router.push('/')
			}

			bill.commit({
				type: "setUid",
				data: this.$store.state.id
			})
		}
	}
</script>
<style scoped>
	.orderList-table {
		margin-top: 20px;
	}

	.order_info {
		width: 460px;
		border: none;
	}

	.order_price {
		width: 107px;
		border: none;

	}

	.order_num {
		width: 55px;
		border: none;
	}

	.goods_handle {
		width: 110px;
		border: none;
	}

	.real_pay {
		width: 128px;
		border: none;
	}

	.order_status {
		width: 110px;
		border: none;
	}

	.order_handle {
		width: 223px;
		border: none;
	}

	.body_top_con {
		background: #f5f5f5;
		border: 1px solid #e5e5e5;
		width: 100%;
		padding: 10px;
		display: flex;
		justify-content: space-between;
	}

	.top_con_time {
		color: #3c3c3c;
		/* font-weight: bold; */
		margin: 0 10px 0 0;
	}

	.top_con_num {
		margin: 0 50px 0 0;
	}

	.top_con_del {
		cursor: pointer;
	}

	.el-icon-delete:before {
		content: '\e6d7';
		font-size: 15px;
	}

	p {
		margin: 4px 0;
	}

	.body_content_info {
		width: 460px;
		border-top: unset;
	}

	.info_box {
		display: flex;
		align-items: center;
		margin: 0 10px;
	}

	.info_box_img {
		cursor: pointer;
		width: 80px;
		flex: 0 0 80px;
		margin-right: 10px;
	}

	img {
		width: 80px;
		height: 100px;
	}

	.text {
		margin-bottom: 6px;
		cursor: pointer;
	}

	.attr {
		color: #9e9e9e;
	}

	span {
		margin-right: 6px;
	}

	.body_content_price {
		text-align: center;
		border-top: unset;
		padding: 10px 0;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
	}

	.body_content_num {
		text-align: center;
		border-top: unset;
		border-right: unset;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
	}

	.body_content_handle {
		text-align: center;
		border-top: unset;
		padding: 10px 0;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
	}

	.body_content_pay {
		text-align: center;
		border-top: unset;
		padding: 10px 0;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
	}

	.price {
		color: #3c3c3c;
		font-weight: bold;
	}

	.postage {
		color: #6c6c6c;
	}

	.body_content_status {
		text-align: center;
		border-top: unset;
		padding: 10px 0;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
	}

	.detail {
		cursor: pointer;
	}

	.body_content_ohandle {
		text-align: center;
		border-top: unset;
		padding: 10px 0;
		border-top: none;
		border-bottom: 1px solid #e5e5e5;
		border-left: 1px solid #e5e5e5;
		border-right: 1px solid #e5e5e5;
	}

	.order_cancel {
		cursor: pointer;
	}

	th {
		padding: 10px 0;
		border: 1px solid #e5e5e5;
		vertical-align: top;
	}

	td {
		padding: 10px 0;
		border: 1px solid #e5e5e5;
		vertical-align: top;
	}
</style>
