<template>
	<div class="head-container" style="width: 60%;margin-left: 20%;margin-top: 30px;">
		<el-tabs type="border-card">
			<el-tab-pane label="留言列表">
				<el-table ref="table" style="width: 100%; font-size: 12px" :data="getmessagelist">
					<el-table-column type="index" width="55" label="序号" />
					<el-table-column :show-overflow-tooltip="true" width="120" label="用户昵称" prop="user.name" />
					<el-table-column :show-overflow-tooltip="true" width="155" label="留言书籍" prop="name" />
					<el-table-column :show-overflow-tooltip="true" width="200" label="留言内容" prop="content" />
					<el-table-column :show-overflow-tooltip="true" width="155" label="留言时间" prop="createTime" />

					<el-table-column label="操作" width="190" align="center">
						<template  slot-scope="scope">
							<el-button size="mini" type="text" @click="del(scope.row)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<el-pagination @current-change="updatePage" @size-change='updatePageSize' :current-page="getPage"
					:page-size="getSize" class="page" background :page-sizes="[5, 10, 15, 20]"
					layout="sizes,prev, pager, next" :total="getTotal"/>
			</el-tab-pane>
		</el-tabs>
	</div>

</template>

<script>
	import comment from './commentcenter.js';
	export default {
		computed: {
			getmessagelist() {
				return comment.getters.getAllMessages;
			},
			getPage() {
				return comment.state.curpage;
			},
			getSize() {
				return comment.state.pagesize
			},
			getTotal(){
				return comment.getters.getAllMessagesTotal;
			}
		},
		data() {
			return {
				//当前显示的内容
				messagelist: [],
				//总页数
				totalPage: 0,
				// 当前页数
				currentPage: 1,
				// 每页显示的数量
				pageSize: 5
			}
		},
		methods:{
			
			updatePage(data){
				comment.commit({
					type:'updatePage',
					data:data
				})
			},
			updatePageSize(data){
				comment.commit({
					type:'updateSize',
					data:data
				})
			},
			del(data){
;
				comment.commit({
					type:'del',
					data:data
				})
				this.$notify({
					title: '消息提示',
					message: '删除成功',
				})
			}
			// update
		}
	}
</script>

<style scoped>
	.el-card-m {
		height: 100px;
	}

	.el-card-m-content {
		display: block;
		font-weight: bold;
	}

	.el-card-m-nick-name {
		display: block;
		font-size: x-small;
		margin-top: 15px;
		color: gray;
	}

	.page {
		float: right;
		margin-top: 5px;
	}
</style>

<style scoped>
	::v-deep .el-input-number .el-input__inner {
		text-align: left;
	}
</style>
