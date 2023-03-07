<template>
	<div>
		<div class="el-card-messages">
			<el-input v-model="getName" size="mini" class="message-nick-name" type="text" readonly>
				<template slot="prepend">昵称：</template>
			</el-input>
			<el-input slot="prepend" v-model="message" type="textarea" :rows="2" class="message-text"
				placeholder="输入想评论的内容" maxlength="200" />
			<el-button type="info" round class="submit-message" size="mini" @click="submitMessage">评论</el-button>
		</div>
		<el-card class="el-card-d" shadow="always">
			<h3>评论区</h3>
			<el-timeline infinite-scroll-disabled="disabled">
				<div v-if="pagemessages.length > 0">
					<el-timeline-item v-for="(item, index) in pagemessages" :key="index" :timestamp="item.createDate"
						placement="top">
						<el-card class="el-card-m">
							<span class="el-card-m-content">{{ item.content }}</span>
							<div />
							<span class="el-card-m-nick-name">{{ item.user.name }} 提交于 {{ item.createTime }}</span>
						</el-card>
					</el-timeline-item>
				</div>
				<div v-else>
					<el-timeline-item placement="top">
						<el-card class="el-card-m">
							<p class="el-card-m-nick-name"> 没有任何评论</p>
						</el-card>
					</el-timeline-item>
				</div>
			</el-timeline>
			<el-pagination background :current-page="currentPage" :page-size="pagesize" layout="prev, pager, next"
				:total="allmessages.length" :hide-on-single-page="true" @current-change="handleCurrentChange" />
		</el-card>

	</div>
</template>

<script>
	// 格式化时间函数
	import {
		parseTime
	} from './index.js';
	import comment from './commentcenter.js';
	export default {

		computed: {
			getmessagelist() {
				return comment.getters.getMessages;
			},
			getId() {
				return comment.state.id;
			},
			getName() {
				return this.$store.state.name;
			}
		},
		data() {
			return {
				user: this.$store.state.users.filter(p => p.id == this.$store.state.id)[0],
				id: 0,
				message: '',
				pagesize: 3,
				currentPage: 1,
				pagemessages: [],
				allmessages: [],
			}
		},
		created() {
			comment.commit({
				type: 'setId',
				data: this.$route.query.id
			})
			if (this.$store.state.f) {
				comment.commit({
					type: 'setUser',
					data: this.user
				})
			}
			this.allmessages = this.getmessagelist;
			this.id = parseInt(this.getId);
			this.doQuery()
		},
		methods: {
			// 模拟后台查询
			doQuery() {
				const start = (this.currentPage - 1) * this.pagesize
				const end = start + this.pagesize
				for (var i = start; i < end; i++) {
					if (i < this.allmessages.length) {
						this.pagemessages.push(this.allmessages[i])
					}
				}
			},
			// 翻页
			handleCurrentChange(val) {
				this.currentPage = val
				this.pagemessages = []
				this.doQuery()
			},
			// 提交留言
			submitMessage() {
				if (!this.$store.state.f) {
					this.$emit("loginstate", {
						flag: true
					})
					return
				}
				
				
				if (this.message === '' || this.message.replace(/(^\s*)|(\s*$)/g, '') === '') {
					this.$message('留言不能为空')
					return
				}
				//  模拟保存数据
				var timestamp = Date.parse(new Date())
				this.allmessages.push({
					createTime: parseTime(timestamp),
					createDate: parseTime(timestamp, '{y}-{m}-{d}'),
					user: this.user,
					content: this.message
				})
				var message = {
					createTime: parseTime(timestamp),
					createDate: parseTime(timestamp, '{y}-{m}-{d}'),
					user: this.user,
					content: this.message,
					id: this.id,
					name: this.$route.query.name
				};

				comment.commit({
					type: 'messageAdd',
					data: message
				})

				this.message = ''
				// 翻页到最后一页
				this.currentPage = Math.ceil(this.allmessages.length / this.pagesize, 0)
				this.handleCurrentChange(this.currentPage)
			}
		}
	}
</script>

<style scoped>
	.el-input__inner {
		font-family: '楷体';
	}

	body {
		font-family: "楷体";
	}

	.el-card-d {
		float: left;
		margin-top: 20px;
		width: 100%;
		max-height: 750px;
		background: #EEEEEE;
	}

	.el-card-m {
		height: 120px;
		font-family: "楷体";
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
		font-size: 15px;
		position: absolute;
		bottom: 15px;
		font-size: 17PX;
		line-height: 50px;
	}

	.el-card-messages {
		float: left;
		margin-top: 20px;
		width: 100%;
		font-family: "楷体";
	}

	.message-nick-name {
		width: 100%;
		font-family: "楷体";
		margin-top: 10px;
		font-size: 14PX;
	}

	.message-text {
		margin-top: 10px;
		display: block;
		width: 80%;
		outline-style: none;
		border: 1px solid #c0c4cc;
		border-radius: 5px;
		width: 100%;
		height: 100%;
		padding: 10px 15px;
		box-sizing: border-box;
		font-family: "楷体";
		padding-right: 120px;
		/* padding-bottom: 50px; */
	}

	.submit-message {
		width: 100px;
		background: antiquewhite;
		color: cadetblue;
		text-align: center;
		letter-spacing: 30px;
		font-family: "楷体";
		font-size: 20px;
		line-height: 40px;
		margin-left: 890px;
		margin-top: -500px;
		padding-bottom: 0px;
		transform: translateY(-40px);
	}

	.el-card-messages {
		border-top: 2px solid #D4D0AB;
		border-bottom: 1px solid gray;
		padding-bottom: 10px;
	}
</style>
