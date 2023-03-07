<template>
	<div class="row">
		<div class="col-12">
			<div class="card">
				<div class="card-header">
					<h4 class="card-title">账号管理</h4>
				</div>
				<div class="card-body">
					<div class="table-responsive">
						<table class="table" id="datatable_1">
							<thead class="thead-light">
								<tr>
									<th>ID</th>
									<th>账号</th>
									<th>身份</th>
									<th>操作</th>
								</tr>
							</thead>
							<tbody>
								<tr v-for="(item,index) in list" :key="index">
									<td>{{index+1}}</td>
									<td>{{item.name}}</td>
									<td>
										<div v-if="item.radio==3" style="color:#A9A9A9">
											封号中
										</div>
										<div v-if="item.radio==2">
											用户
										</div>
										<div v-if="item.radio==1" style="color:#3CB371">
											管理员
										</div>
									</td>
									<td>
										<div v-if="item.radio==1 && status==0" style="float:left;margin-right: 10px;">
											<el-button type="primary" @click="updateUserRole(item,2)">取消管理员</el-button>
										</div>
										<div v-if="item.radio==2 && status==0" style="float:left;margin-right: 10px;">
											<el-button type="warning" @click="updateUserRole(item,1)">设置管理员</el-button>
										</div>
										<div v-if="item.radio==2 " style="float:left">
											<el-button type="danger" @click="updateUserRole(item,3)">封号</el-button>
										</div>
										<div v-if="item.radio==3">
											<el-button type="success" @click="updateUserRole(item,2)">解除封号</el-button>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
						<el-pagination background @current-change="updatePage" @size-change='updatePageSize'
							:current-page="getPage" :page-sizes="[2, 5, 10, 20]" :page-size="getSize"
							layout="sizes, prev, pager, next, total" :total="getTotal">
						</el-pagination>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import user from './indexcenter/usercenter.js';
	
	export default {
		name: 'manage',
		created() {
			this.status=this.$store.state.radio
			// console.log(this.status)
		},
		data() {
			return {
				status:2
			}
		},
		methods: {
			updateUserRole(item, radio) {
				item.radio = radio;
				this.$store.commit({
					type: "updateUserData",
					data: item
				})
				// console.log(this.$store.state.users)
			},
			updatePage(page) {
				this.$store.commit({
					type: "updatePage",
					data: page
				})
			},
			updatePageSize(size) {
				this.$store.commit({
					type: "updatePageSize",
					data: size
				})
			}
		},
		computed: {
			list() {
				return this.$store.getters.getMyUserList;
			},
			getTotal() {
				return this.$store.getters.getMyUserListTotal;
			},
			getPage() {
				return this.$store.state.userpage;
			},
			getSize() {
				return this.$store.state.usersize;
			}
		},
	};
</script>

<style scoped>
	* {
		outline: 0;
	}

	body {
		font-size: 14px;
		color: #000444;
		letter-spacing: 0.1px;
		line-height: 1.5;
	}

	.dataTable-table th a {
		text-decoration: none;
		color: inherit;
	}

	.col-12 {
		flex: 0 0 auto;
		width: 100%;
	}

	.card {
		margin: 50px 180px 0;
		background-color: #fff;
		border: none;
		box-shadow: 0 0 0.875rem 0 rgba(52, 58, 64, 0.05);
	}

	.card-header {
		background-color: #fff;
		border-radius: 2px;
		border-bottom: 1px solid #eceff5;
		padding: 16px 16px;
		margin-bottom: 0;
	}

	.card-title {
		text-transform: capitalize;
		letter-spacing: .02em;
		font-size: 20px;
		font-weight: 600;
		margin: 0;
		color: #303e67;
		line-height: 22px;
	}

	.card-body {
		flex: 1 1 auto;
		padding: 16px 16px;
	}

	.table-responsive {
		overflow-x: auto;
	}

	.dataTable-top {
		padding: 8px 10px;
	}

	.dataTable-dropdown {
		float: left;
	}

	.dataTable-dropdown label {
		display: inline-block;
	}


	.dataTable-selector,
	.dataTable-input {
		color: #000444;
		background-color: #fff;
		border: 1px solid #e8ebf3;
		border-radius: .25rem;
	}

	.dataTable-selector {
		padding: 6px;
		word-wrap: normal;
		text-transform: none;
		margin: 0;
		font-family: inherit;
		line-height: inherit;
		font-size: inherit;
	}

	.dataTable-search {
		float: right;
	}

	.dataTable-input {
		padding: 6px 12px;
		width: 230px;
		margin: 0;
		font-family: inherit;
		line-height: inherit;
		font-size: inherit;
	}

	.dataTable-container {
		border-bottom: 1px dashed #eceff5;
	}

	.dataTable-table {
		max-width: 100%;
		border-spacing: 0;
		border-collapse: separate;
	}

	.table {
		width: 100%;
		margin-bottom: 16px;
		color: #000444;
		border-color: #e8ebf3;
		caption-side: bottom;
	}

	.table tr {
		border-color: inherit;
		border-style: solid;
		border-width: 0;
	}

	.thead-light {
		border-width: 0;
		border-style: solid;
		border-color: inherit;
		vertical-align: bottom;
	}

	.table .thead-light th {
		color: #8997bd;
		background-color: #f9fafb;
		border-color: #e8ebf3;
		border-bottom: none;
		padding: 15px 24px;
		text-align: left;
		vertical-align: bottom;
		font-weight: 400;
	}

	.dataTable-sorter {
		display: inline-block;
		height: 100%;
		position: relative;
		width: 100%;
	}

	.table tbody {
		vertical-align: inherit;
		border-top: 0 solid #e8ebf3;
		border-color: inherit;
		border-style: solid;
		border-width: 0;
	}

	.table tr {
		border-color: inherit;
		border-style: solid;
		border-width: 0;
	}

	.table td {
		padding: 15px 24px;
		vertical-align: top;
		font-weight: 500;
		border-bottom-width: 0;
		border-style: solid;
		border-width: 0;
	}

	.dataTable-bottom {
		padding: 8px 10px;
	}

	.dataTable-info {
		float: left;
		margin: 7px 0;
	}

	.dataTable-pagination {
		float: right;
	}

	.dataTable-pagination ul {
		margin: 0;
		padding-left: 0;
	}

	.dataTable-pagination li {
		list-style: none;
		float: left;
	}

	.dataTable-pagination a {
		border: 1px solid transparent;
		float: left;
		margin-left: 2px;
		padding: 6px 12px;
		position: relative;
		text-decoration: none;
		color: #333;
	}

	.dataTable-pagination .active a,
	.dataTable-pagination .active a:focus,
	.dataTable-pagination .active a:hover {
		background-color: #d9d9d9;
		cursor: default;
	}

	.dataTable-pagination .pager a {
		font-weight: bold;
	}
</style>
