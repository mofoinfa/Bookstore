<template>
	<div style="width: 90%;margin: 30px auto 0px;">


		<!-- 表格管理 -->
		<el-table :data="tableData" style="width: 100%;margin: 0 auto;">
			<el-table-column label="订单编号" prop="id"></el-table-column>
			<el-table-column label="用户账号" prop="uid">
				<template slot-scope="scope">
					{{scope.row.uid | getusername}}
				</template>
			</el-table-column>
			<el-table-column label="用户昵称" prop="uid">
				<template slot-scope="scope">
					{{scope.row.uid | getname}}
				</template>
			</el-table-column>
			
			<el-table-column label="交易金额" prop="total_payment">
				<template slot-scope="scope">
					<span v-if="scope.row.status!=9" style="color: red;">
						花费：{{scope.row.total_payment}}
					</span>
					<span v-else style="color: green;">
						充值：{{scope.row.total_payment}}
					</span>
				</template>
			</el-table-column>
			<el-table-column label="日期" prop="create_time">
			</el-table-column>
			
			<el-table-column label="积分变动" prop="point">
				<template slot-scope="scope">
				<span v-if="scope.row.point>0" style="color: green;">
					+{{scope.row.point}}
				</span>
				<span v-if="scope.row.point<0" style="color: red;">
					{{scope.row.point}}
				</span>
				<span v-if="scope.row.point==0">
					{{scope.row.point}}
				</span>
				</template>
			</el-table-column>
			<el-table-column align="right">
				<template slot="header" slot-scope="scope">
					<el-input v-model="search" size="mini" placeholder="输入关键字搜索" @change="givedata"/>
				</template>
				<template slot-scope="scope">
				</template>
			</el-table-column>
		</el-table>
<!-- 		分页
		<el-pagination style="margin-top:30px;" background layout="sizes,prev, pager, next"
			:page-sizes="[5, 10, 300, 400]" :total="gettotal" @current-change="changepage" @size-change="changepagesize"
			:page-size="5">
		</el-pagination> -->
	</div>
</template>

<script>
	import bill from '../../../config/billcenter/billcenter.js';
	import user from '../../../config/usercenter/usercenter.js';
	export default {
		filters: {
			getname(data) {
				return user.state.users.filter(p => p.id == data)[0].name;
			},
			getusername(data) {
				return user.state.users.filter(p => p.id == data)[0].username;
			}
		},
		computed: {

			gettotal() {
				return bill.getters.getPay.length;
			},
			getdata() {
				return bill.getters.getPay;
			}
		},
		data() {
			return {
				showUser: true,
				tableData: [],
				search: ''
			}
		},
		methods: {
			handleEdit(index, row) {
				console.log(index, row);
			},
			handleDelete(index, row) {
				console.log(index, row);
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			toBuy() {
				this.$router.push({
					path: "/1-1",
					params: {},
				});
			},
			changepage(data) {
				bill.state.currentPage=data;
				// this.$store.commit({
				// 	type: "changepaypage",
				// 	data: data
				// })
			},
			changepagesize(data) {
				bill.state.pageSize=data;
				// this.$store.commit({
				// 	type: "changepaypagesize",
				// 	data: data
				// })
			},
			givedata(){
				
				if(this.search==''){
					this.tableData = this.getdata
				}else{
					var reg = new RegExp(this.search + '+');
					this.tableData = this.getdata.filter(p=>p.id.toString().match(reg))
				}
				
			}
			
		},
		mounted() {
			this.tableData=this.getdata
			// bill.state.pageSize=5;
			// bill.state.currentPage=1;
			// bill.state.search='';
		}
	}
</script>

<style>
	.el-header,
	.el-footer {
		background-color: #B3C0D1;
		color: #333;
		text-align: center;
		line-height: 60px;
	}

	.el-aside {
		/* background-color: #D3DCE6; */
		color: #333;
		text-align: center;
		line-height: 200px;
	}

	.el-main {
		background-color: #E9EEF3;
		color: #333;
		text-align: center;
		line-height: 50px;
	}

	body>.el-container {
		margin-bottom: 30px;
	}

	.el-container:nth-child(5) .el-aside,
	.el-container:nth-child(6) .el-aside {
		line-height: 260px;
	}

	.el-container:nth-child(7) .el-aside {
		line-height: 320px;
	}
</style>
