<template>
	<div style="margin-left: 15px;margin-right: 15px;">
		<h1>书籍添加</h1>
		<el-row>
			<el-col :span="3" style="line-height: 40px;">书名：</el-col>
			<el-col :span="21">
				<el-input v-model="book.name"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3" style="line-height: 40px;">作者：</el-col>
			<el-col :span="21">
				<el-input v-model="book.author"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="3" style="line-height: 40px;">分类：</el-col>
			<el-col :span="21">
				<el-checkbox-group v-model="book.booktype" :max='3'>
					<el-checkbox :label="i.name" v-for="(i,n) in getBookType" ></el-checkbox>
				</el-checkbox-group>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="12">
				<el-row style="">
					<el-col :span="12" style="line-height: 40px;">进价(单位:元):</el-col>
					<el-col :span="12">
						<el-input v-model="book.cell" @change="cellVerify"></el-input>
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="12" style="line-height: 40px;">售价(单位:元):</el-col>
					<el-col :span="12">
						<el-input v-model="book.price" @change="priceVerify"></el-input>
					</el-col>
				</el-row>
				<el-row >
					<el-col :span="12" style="line-height: 40px;">数量(单位:本):</el-col>
					<el-col :span="12">
						<el-input v-model="book.num" @change="numVerify"></el-input>
					</el-col>
				</el-row>
			</el-col>
			<el-col :span="9" :offset='3'>
				<img :src="book.imgurl" id="myimg" style="width: 100px;height: 150px;" />
				<input type="file" id="myfile" style="display: none;" @change="setImgUrl" />
				<el-row>
					<span @click="delMyFile" class="inputbtn" v-if="imgflag">删除封面</span>
					<span @click="clickMyFile" class="inputbtn" v-else="imgflag">选择封面</span>
				</el-row>
			</el-col>
		</el-row>
		<el-row style="margin-top: -30px;">
			<el-col :span="4" style="line-height: 40px;">出版社：</el-col>
			<el-col :span="8">
				<el-input v-model="book.publisher"></el-input>
			</el-col>
			<el-col :span="3" style="line-height: 40px;" :offset='1'>年份：</el-col>
			<el-col :span="8">
				<el-input v-model="book.publication_year" @change="publication_yearVerify"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<span>简介：</span>
			<el-input type="textarea" v-model="book.introduction"></el-input>
		</el-row>
		<el-button type="primary" style="width: 430px;" @click="tosubmit" v-if="state">确认修改</el-button>
		<el-button type="primary" style="width: 430px;" @click="tosubmit" v-else="state">确认添加</el-button>
	
	</div>
</template>
<script>
	import bookStore from './image/bookcenter.js';
	export default {
		mounted() {
			this.book = JSON.parse(JSON.stringify(this.getBook))
			if (this.book.id == 0) {
				this.book.id = Date.now();
			} else {
				this.state = true;
				this.imgflag = true;
			}
			this.defaultImg = require('../bookcenter/image/subpicture.png')
		},
		computed: {
			getBookType() {
				return bookStore.state.bookType;
			},
			getBook() {
				return bookStore.state.bookTemp;
			}
		},
		data() {
			return {
				defaultImg: '',
				imgflag: false,
				state: false,
				book: {
					id: 0,
					name: '',
					booktype: [],
					imgurl: require('../bookcenter/image/subpicture.png'),
					cell: null,
					price: null,
					num: null,
					author: '',
					publisher: '',
					introduction: '',
					publication_year: '',
					bookstate:1
				},
			};
		},
		methods: {
			cellVerify() {
				const h = this.$createElement;
				var regnum = new RegExp('^[0-9]+(.[0-9]{1,2})?$');
				if (!this.book.cell.match(regnum)) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '进价不符合规范！')
					});
					this.book.cell = ''
				}

			},
			priceVerify() {
				const h = this.$createElement;
				if (this.book.cell == '') {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '进价不能为空！')
					});
					this.book.price = ''
					return;
				}
				var regnum = new RegExp('^[0-9]+(.[0-9]{1,2})?$');
				if (!this.book.price.match(regnum)) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '售价不符合规范！')
					});
					this.book.price = ''
					return;
				}
				if (!(parseFloat(this.book.cell) < parseFloat(this.book.price))) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '售价应该大于进价！')
					});
					this.book.price = ''
					return;
				}
			},
			numVerify() {
				const h = this.$createElement;
				var regnum = new RegExp('^([1-9][0-9]*)$');
				if (!this.book.num.match(regnum)) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '进货数量不符合规范！')
					});
					this.book.num = ''
				}
			},
			publication_yearVerify() {
				const h = this.$createElement;
				var regnum = new RegExp('^([1-9][0-9]*)$');
				if (!this.book.publication_year.match(regnum)) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '出版年份不符合规范！')
					});
					this.book.publication_year = ''
					return;
				}
				if (this.book.publication_year > new Date().getFullYear()) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '发售的书不能是未来年份！')
					});
					this.book.publication_year = ''
				}
			},
			setImgUrl() {
				var oFReader = new FileReader();
				var file = document.getElementById('myfile').files[0];
				oFReader.readAsDataURL(file);
				var that = this;
				oFReader.onloadend = function(oFRevent) {
					var src = oFRevent.target.result;
					document.getElementById('myimg').src = src;
					that.book.imgurl = src;
				}
				this.imgflag = true;
			},
			clickMyFile() {
				document.getElementById('myfile').click()
			},
			delMyFile() {
				this.imgflag = false;
				document.getElementById('myfile').value = ''
				document.getElementById('myimg').src = this.defaultImg
			},
			tosubmit() {
				const h = this.$createElement;
				var imgurl = document.getElementById('myimg').src
				if (!this.imgflag) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '没有上传图书封面！')
					});
					return;
				}
				if (this.book.name == '') {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个名称！')
					});
					return;
				}
				if (this.book.author == '') {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个作者！')
					});
					return;
				}
				if (this.book.booktype.length == 0) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个分类！')
					});
					return;
				}
				if (this.book.cell == null) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个进价！')
					});
					return;
				}
				if (this.book.price == null) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个售价！')
					});
					return;
				}
				if (this.book.num == null) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个数量！')
					});
					return;
				}
				if (this.book.publisher == '') {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个出版社！')
					});
					return;
				}
				if (this.book.publication_year == null) {
					this.$notify({
						title: '警告',
						message: h('i', {
							style: 'color: red'
						}, '书籍需要一个出版年份！')
					});
					return;
				}
				if (this.state) {
					if (bookStore.state.bookData.filter(p =>
							p.id!=this.book.id&&
							p.author == this.book.author &&
							p.name == this.book.name &&
							p.cell == this.book.cell &&
							p.price == this.book.price &&
							p.publisher == this.book.publisher &&
							p.publication_year == this.book.publication_year
						).length != 0) {
						this.$notify({
							title: '提示',
							message: h('i', {
								style: 'color: red'
							}, '数据重复！')
						});
						return;
					}
					bookStore.commit({
						type: 'editBook',
						data: this.book
					});
					this.$notify({
						title: '提示',
						message: h('i', {
							style: 'color: red'
						}, '修改成功！')
					});
				} else {
					if (bookStore.state.bookData.filter(p =>
							p.author == this.book.author &&
							p.name == this.book.name &&
							p.cell == this.book.cell &&
							p.price == this.book.price &&
							p.publisher == this.book.publisher &&
							p.publication_year == this.book.publication_year
						).length != 0) {
						this.$notify({
							title: '提示',
							message: h('i', {
								style: 'color: green'
							}, '数据重复！')
						});
						return;
					}
					bookStore.commit({
						type: 'addBook',
						data: this.book
					});

					this.$notify({
						title: '提示',
						message: h('i', {
							style: 'color: green'
						}, '添加成功！')
					});
				}
				setTimeout(() => {
					this.$emit("bookState", {
						flag: false
					})
				}, 500)

			}
		}
	}
</script>

<style>
	.el-row {
		margin-bottom: 30px;
	}

	.inputbtn {
		position: relative;
		display: inline-block;
		width: 100px;
		height: 30px;
		text-align: center;
		line-height: 24px;
		vertical-align: center;
		border: 1px solid #23c6c8;
		background-color: #23c6c8;
		color: #fff;
		border-radius: 3px;
		/* margin-left: 20px; */
	}

	.inputbtn:hover {
		border: 1px solid #23babc;
		border: 1px solid #23babc;
	}

	.inputbtn input {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>
