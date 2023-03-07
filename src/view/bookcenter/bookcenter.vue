<template>
	<div style="width: 80%;margin-top: 14px;margin-left: 10%;">
		<el-row style="margin-top: 5px;margin-bottom: -5px;">
			<el-col :span="3" :offset="1"><h3 style="margin: 0px;line-height: 40px;">书籍管理中心</h3></el-col>
			
			<el-col :span="4" :offset="10">
				<el-input
				  placeholder="请输入内容"
				  v-model="searchValue"
				  @change="searchData"
				  prefix-icon="el-icon-search"
				  clearable>
				</el-input></el-input>
			</el-col>
			<el-col :span="4" :offset="1" >
				<el-button type="success" @click="toAdd">添加</el-button>
				<el-button type="primary" @click="drawType = true" >分类管理</el-button>
			</el-col>
		</el-row>
		<router-view name="booklist" v-on:t1="t1"></router-view>
		
		<!-- 添加 -->
		<el-drawer :visible.sync="drawAdd" :with-header="false" v-if="drawAdd">
			<router-view name="bookadd" v-on:bookState="bookState"></router-view>			
		</el-drawer>
		<!-- 分类 -->
		<el-drawer size='27%' direction='ltr' :visible.sync="drawType" :with-header="false" v-if="drawType">
			<router-view name="booktype"></router-view>
		</el-drawer>
	</div>
</template>

<script>
	import bookStore from './image/bookcenter.js';
	export default {
		data() {
			return {
				drawAdd:false,
				drawType:false,
				searchValue:''
			}
		},
		filters: {

		},
		mounted() {

		},
		methods: {
			searchData(){
				bookStore.commit({
					type: 'searchData',
					data: this.searchValue
				})
			},
			toAdd(){
				this.drawAdd = true;
				bookStore.commit('toAddBook')
			},
			t1(data){
				this.drawAdd = true;
			},
			toShop(){
				this.$router.push('/shopcar');
			},
			bookState(data){
				this.drawAdd=data.flag
			}
		}
	}
</script>

<style scoped>


</style>
