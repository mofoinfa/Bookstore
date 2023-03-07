<template>
	<div>
		<el-row>
			<el-col :span="2"><h3 style="margin: 0px;">书籍管理中心</h3></el-col>
			<el-col :span="4" :offset="8">
				<el-input
				  placeholder="请输入内容"
				  v-model="searchData"
				  prefix-icon="el-icon-search"
				  clearable>
				</el-input></el-input>
			</el-col>
			<el-col :span="7" :offset="3">
				<el-button type="success" @click="drawer = true">添加</el-button>
				<el-button type="info">导入</el-button>
				<el-button type="info">导出</el-button>
				<el-button type="primary" @click="booktype = true">分类管理</el-button>
			</el-col>
		</el-row>
		<router-view name="booklist"></router-view>
		<el-drawer :visible.sync="drawer" :with-header="false">
			<router-view name="addbook"></router-view>
		</el-drawer>
		<el-drawer size='50%' direction='ltr' :visible.sync="booktype" :with-header="false">
			<router-view name="addbook"></router-view>
		</el-drawer>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				drawer: false,
				booktype:false,
				searchData:'',
				
			}
		},
		filters: {

		},
		mounted() {
			var that = this;

		},
		methods: {

		},
		components: {
			
		}

	}
</script>

<style scoped>


</style>
