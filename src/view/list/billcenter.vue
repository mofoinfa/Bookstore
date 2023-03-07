<template>
	<div style="margin-left: 9%;">
		<!-- 面包屑导航 -->
		<!-- 卡片视图 -->
		<el-card>
			<el-row :gutter="20">
				<el-col :span="7">
					<el-input placeholder="请输入内容" clearable v-model="searchValue">
						<el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
					</el-input>
				</el-col>
			</el-row>
		</el-card>

		<!-- table 表格区域 -->
		<el-table :data="orderlist" border stripe>
			<el-table-column type="index"></el-table-column><!-- 索引列 -->
			<el-table-column label="订单编号" prop="id" width="320px"></el-table-column>
			<el-table-column label="用户账号" prop="uid" width="140px">
				<template slot-scope="scope">
					{{scope.row.uid | getusername}}
				</template>
			</el-table-column>
			<el-table-column label="总价" prop="total_payment" width="140px"></el-table-column>
			<el-table-column label="下单时间" prop="create_time" width="280px"></el-table-column>
			<el-table-column label="是否付款" prop="pay_status" width="140px">
				<template slot-scope="scope">
					<el-tag type="success" v-if="scope.row.status==2 || scope.row.status==5">已付款</el-tag>
					<el-tag type="danger" v-if="scope.row.status==1">未付款</el-tag>
				</template>
			</el-table-column>
			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<div v-if="scope.row.status==1">
						<el-button size="mini" type="primary" icon="el-icon-edit"
							@click.native.prevent="change(scope.row)"></el-button>
						<el-button size="mini" type="danger" icon="el-icon-delete"
							@click.native.prevent="deleteRow(scope.row)"></el-button>
					</div>
					<div>
						<div v-if="scope.row.start==0 && scope.row.status==2">
							用户暂未评价
						</div>
						<div v-if="scope.row.start!=0 && scope.row.status==2">
							服务评分：{{scope.row.start}}颗星
						</div>
					</div>
				</template>
			</el-table-column>
		</el-table>
		<div v-if="total!=0" style="text-align: center;">
			<el-pagination background :page-sizes="[2,5, 10]" @current-change="changePage" @size-change='changePageSize'
				:current-page="currentPage" :page-size="pageSize" layout="sizes, prev, pager, next, total ,jumper"
				:total="total">
			</el-pagination>
		</div>
	</div>
</template>
<script>
	import thisstore from './index.js';
	import bill from '../../config/billcenter/billcenter.js';
	import user from '../../config/usercenter/usercenter.js';
	import book from '../bookcenter/image/bookcenter.js';
	export default {
		watch: {
			searchValue(n, o) {
				if (n == '') {
					thisstore.commit({
						type: 'searchData',
						data: ''
					})
				}
			}
		},
		filters: {
			getusername(data) {
				return user.state.users.filter(p => p.id == data)[0].username;
			}
		},
		computed: {
			orderlist() {
				return bill.getters.getAll;
			},
			total() {
				return bill.state.total;
			},
			currentPage() {
				return bill.state.currentPage;
			},
			pageSize() {
				return bill.state.pageSize;
			}
		},
		methods: {
			searchData() {
				bill.commit({
					type: 'searchData',
					data: this.searchValue
				})
			},
			changePage(data) {
				bill.commit({
					type: 'updatePage',
					data: data
				})
			},
			changePageSize(data) {
				bill.commit({
					type: 'updatePageSize',
					data: data
				})
			},
			change(item) {
				// console.log(order_number, pay_status)
				bill.commit({
					type: 'changeOrder',
					data: item.id,
					pay_status: 2
				})
			},
			deleteRow(item) {
				item.status = 4;
				for (var i = 0; i < item.list.length; i++) {
					book.commit({
						type: 'editBookNumplus',
						data: item.list[i]
					})
				}
				bill.commit({
					type: 'editBillList',
					data: item
				})
				console.log('删除未支付的订单记录成功！')
			},
		},
		data() {
			return {
				searchValue: '',

			}
		},
		mounted() {

		}
	}
</script>

<style scoped>
</style>
