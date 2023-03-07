<template>
	<div style="">
		<el-table :data="booklist" style="width: 100%;" max-height="540">
			<el-table-column type="index" label="序号" width="50" fixed></el-table-column>
			<el-table-column prop="name" label="书名" width="120" fixed>
				<template slot-scope="scope">
					<el-tooltip :content="scope.row.name" placement="top" effect="light">
						<span>{{scope.row.name | shortText}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column label="封面" width="120" prop="imgurl">
				<template slot-scope="scope">
					<el-popover placement="top-start" title="" trigger="hover">
						<img :src="scope.row.imgurl" alt="" style="width: 180px;height: 200px">
						<img slot="reference" :src="scope.row.imgurl | geturl(scope.row,scope.row.imgurl) "
							style="width: 90px;height: 106px">
					</el-popover>
				</template>
			</el-table-column>
			<el-table-column prop="author" label="作者" width="100">
				<template slot-scope="scope">
					<el-tooltip :content="scope.row.author" placement="top" effect="light">
						<span>{{scope.row.author | shortText}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="publisher" label="出版社" width="100">
				<template slot-scope="scope">
					<el-tooltip :content="scope.row.publisher" placement="top" effect="light">
						<span>{{scope.row.publisher | shortText}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column prop="publication_year" label="出版年份" width="80"></el-table-column>
			<el-table-column prop="cell" label="进价" width="80"></el-table-column>
			<el-table-column prop="price" label="售价" width="80"></el-table-column>
			<el-table-column prop="num" label="库存量" width="80"></el-table-column>
			<el-table-column prop="introduction" label="简介" width="230" open-delay="2000">
				<template slot-scope="scope">
					<el-tooltip :content="scope.row.introduction" placement="top" effect="light" width='200'>
						<span>{{scope.row.introduction | longText}}</span>
					</el-tooltip>
				</template>
			</el-table-column>
			<el-table-column fixed="right" label="操作" width="150" prop="bookstate">
				<template slot-scope="scope">
					<div v-if="scope.row.bookstate==1">
						<el-button @click.native.prevent="deleteBook(scope.row.id,scope.row.bookstate)" type="danger">
							&nbsp;&nbsp;&nbsp;&nbsp;下&nbsp;&nbsp;&nbsp;&nbsp;架&nbsp;&nbsp;&nbsp;&nbsp;
						</el-button>
					</div>
					<div v-if="scope.row.bookstate==0">
						<el-button @click.native.prevent="deleteBook(scope.row.id,scope.row.bookstate)" type="success">
							&nbsp;&nbsp;&nbsp;&nbsp;上&nbsp;&nbsp;&nbsp;&nbsp;架&nbsp;&nbsp;&nbsp;&nbsp;
						</el-button>
					</div>

					<el-button type="primary" @click="openBook(scope.row)">
						查&nbsp;&nbsp;看&nbsp;详&nbsp;&nbsp;情
					</el-button>

				</template>
			</el-table-column>
		</el-table>
		<div v-if="total!=0" style="text-align: center;">
			<el-pagination background @current-change="changePage" @size-change='changePageSize'
				:current-page="currentPage" :page-sizes="[5, 10]" :page-size="pageSize"
				layout="sizes, prev, pager, next, total ,jumper" :total="total">
			</el-pagination>
		</div>
	</div>
</template>

<script>
	
	import bookStore from './image/bookcenter.js';
	export default {
		computed: {
			booklist() {
				return bookStore.getters.getBookList;
			},
			total() {
				return bookStore.state.total;
			},
			currentPage() {
				return bookStore.state.currentPage;
			},
			pageSize() {
				return bookStore.state.pageSize;
			}
		},
		data() {
			return {

			}
		},
		filters: {
			// 使文字显示少于10个字符，防止页面布局变动
			shortText(value) {
				if (!value)
					return "";
				if (value.length > 5) {
					return value.slice(0, 5) + "...";
				}
				return value;
			},
			longText(value) {
				if (!value)
					return "";
				if (value.length > 38) {
					return value.slice(0, 38) + "...";
				}
				return value;
			},

			// 防止图片内容不符
			geturl(url, n) {
				var url2 =
					"http://celiang.oss-cn-hangzhou.aliyuncs.com/measurement/2022-05/19/G0JSVphpS2MItH1652924237220519.jpg";
				var img = new Image();
				img.src = url;
				img.onload;
				setTimeout(() => {
					if (img.width < 10 || img.height < 10) {
						n.imgurl = url2;
					}
				}, 1500)
				return url;
			}
		},
		mounted() {

		},
		methods: {
			deleteBook(id, state) {
				bookStore.commit({
					type: 'delBook',
					data: id,
					state: state == 1 ? 0 : 1
				})
			},
			changePage(currentPage) {
				bookStore.commit({
					type: 'updatePage',
					data: currentPage
				})
			},
			changePageSize(size) {
				bookStore.commit({
					type: 'updatePageSize',
					data: size
				})
			},
			openBook(data){
				bookStore.commit({
					type: 'toEditBook',
					data: data
				})
				this.$emit("t1",{
					flag:true
				})
			}
		}
	}
</script>


<style>
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
