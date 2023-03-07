<template>
	<div>
		<el-row style="margin: 0;">
			<el-col :span="14">
				<el-input v-model="addvalue" placeholder="请输入分类名称"></el-input>
			</el-col>
			<el-col :span="4">
				<el-button type="success" @click="addbooktype">添加</el-button>
			</el-col>
		</el-row>
		<el-table :data="booktype" style="width: 100%;">
			<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
			<el-table-column prop="name" label="类名" width="120" fixed>
				<template slot-scope="scope">
					<el-input v-model="scope.row.name" v-if="scope.row.flag" />
					<span v-text="scope.row.name" v-else></span>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150" prop="bookstate">
				<template slot-scope="scope">
					<el-button type="danger" @click="closeBook(scope.row)" v-if="scope.row.flag">
						保存
					</el-button>
					<el-button type="primary" @click="openBook(scope.row)" v-else>
						修改
					</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	import bookStore from './image/bookcenter.js';
	export default {
		computed: {
			getBookType() {
				return bookStore.getters.getBookType;
			},
		},
		data() {
			return {
				booktype: [],
				tempdata: '',
				addvalue: ''
			}
		},
		methods: {
			openBook(item) {
				const h = this.$createElement;
				if (this.tempdata != '') {
					this.$notify({
						title: '提示',
						message: h('i', {
							style: 'color: red'
						}, '请先保存正在修改的值！')
					});
					return;
				}
				this.tempdata = item.name;
				item.flag = true
			},
			closeBook(item) {
				const h = this.$createElement;
				if (this.getBookType.filter(p => p.name == item.name).length > 0) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '名称重复或没有修改！')
					});
					item.name = this.tempdata;
				} else {
					bookStore.commit({
						type: 'editbooktype',
						data: item
					})
				}
				this.tempdata = ''
				item.flag = false

			},
			addbooktype(){
				
				const h = this.$createElement;
				if(this.addvalue==''){
					this.$notify({
						title: '提示',
						message: h('i', {
							style: 'color: red'
						}, '类名不能为空！')
					});
					return;
				}
				
				if(this.getBookType.filter(p=>p.name==this.addvalue).length>0){
					this.$notify({
						title: '提示',
						message: h('i', {
							style: 'color: red'
						}, '分类已存在！')
					});
					return;
				}else{
					bookStore.commit({
						type:'addbooktype',
						data:{
							id:Date.now(),
							name:this.addvalue,
							flag:false
						}
					})
					this.booktype = JSON.parse(JSON.stringify(this.getBookType))
				}
				this.$notify({
					title: '提示',
					message: h('i', {
						style: 'color: green'
					}, '添加成功！')
				});
				this.addvalue=''
			}
		},
		mounted() {
			this.booktype = JSON.parse(JSON.stringify(this.getBookType))
		}
	}
</script>


<style scoped>
	* {
		margin: 10px;
	}

	/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
	::-webkit-scrollbar {
		background-color: #f5f5f5;
		width: 5px;
		height: 5px;
	}

	/*定义滚动条轨道 内阴影+圆角*/
	::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px 6px rgba(0, 0, 0, 0.1);
		border-radius: 10px;
		background-color: #f5f5f5;
	}

	/*定义滑块 内阴影+圆角*/
	::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px 6px rgba(0, 0, 0, 0.3);
		background-color: #ddd;
	}
</style>
