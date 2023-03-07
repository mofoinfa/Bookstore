<template>
	<div class="rcontent">

		<div class="rank">

			<div class="rank_title">
				<h2>出版图书</h2>
				<p>
					<span class="lineL"></span>
					排行榜
					<span class="lineR"></span>
				</p>
			</div>

			<div class="rank_content">
				<div class="rank_left rank_book">
					<h3>
						<span></span>
						<a href="">图书畅销榜</a>
					</h3>
					<ul>
						<li v-for="(item,index) in booklist1" :key="index">
							<dl class="close">
								<dt style="color:dimgray;font-weight: 600;">{{index+1}}</dt>
								<dd>
									<i @click="send(item)" style="cursor:pointer">{{item.name}}</i>
								</dd>
							</dl>
						</li>

					</ul>
				</div>

				<div class="rank_center rank_book">
					<h3>
						<span></span>
						<a href="">新书热卖榜</a>
					</h3>
					<ul>
						<li v-for="(item,index) in booklist2" :key="index">
							<dl class="close">
								<dt style="color:dimgray;font-weight: 600;">{{index+1}}</dt>
								<dd>
									<i @click="send(item)" style="cursor:pointer">{{item.name}}</i>
								</dd>
							</dl>
						</li>
					</ul>
				</div>
				<div class="rank_right rank_book">
					<h3>
						<span></span>
						<a href="">好评榜</a>
					</h3>
					<ul>
						<li v-for="(item,index) in booklist3" :key="index">
							<dl class="close">
								<dt style="color:dimgray;font-weight: 600;">{{index+1}}</dt>
								<dd>
									<i @click="send(item)" style="cursor:pointer">{{item.name}}</i>
								</dd>
							</dl>
						</li>

					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { random } from 'core-js/fn/number';
	import book from '../bookcenter/image/bookcenter.js'
	
	export default {
		data() {
			return {
				booklist1:[],
				booklist2:[],
				booklist3:[],
			}
		},
		methods:{
			send(item){
				this.$router.push({
					path:"/book",
					query:item
				})
			},
			getlist(){
				var numList=[];
				for(var i=0;i<book.getters.getBookList.length;i++){
					numList.push(i)
				}
				var books=[]
				while(numList.length!=0){
					var num = Math.floor(Math.random() * (numList.length - 0)) + 0;
					books.push(book.getters.getBookList[num])
					numList.splice(num,1)
				}
				return books;
			}
		},
		mounted() {

			
			this.booklist1 =  this.list1;
			this.booklist2 =  this.list2;
			this.booklist3 =  this.list3;
			
		},
		computed: {
			list1(){
				return book.getters.getBookList.sort(function(){return 0.5 - Math.random()});
			},
			list2(){
				return book.getters.getBookList.sort(function(){return 0.5 - Math.random()});
			},
			list3(){
				return book.getters.getBookList.sort(function(){return 0.5 - Math.random()});
			},

		},
	}
</script>

<style scoped>
	*,
	body,
	ul,
	li,
	h1,
	h2,
	h3,
	h4,
	h5 {
		margin: 0;
		padding: 0;
	}

	ul,
	li {
		overflow: hidden;
	}

	.rcontent {
		width: 1000px;
		overflow: hidden;
		margin: 0 auto;
		color: #9e9e9e;
		font: 12px/20px "Microsoft Yahei", arial, sans-serif;
		font-weight: normal;
	}

	.rank_content a {
		text-decoration: none;
		outline: none;
		font-family: "Microsoft Yahei", arial, sans-serif;
		color: #9e9e9e;
	}

	.rank_title {
		padding: 48px 0 36px 0;
	}

	.rank_title h2 {
		height: 40px;
		font-size: 26px;
		color: #212121;
		margin: 0 auto;
		text-align: center;
		font-style: normal;
		font-weight: normal;
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	.rank_title p {
		width: 94px;
		height: 12px;
		line-height: 12px;
		margin: 0 auto;
		text-align: center;
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	.lineL {
		float: left;
		width: 21px;
		height: 1px;
		background: #9e9e9e;
		margin-top: 6px;
		display: inline-block;
	}

	.lineR {
		float: right;
		width: 21px;
		height: 1px;
		background: #9e9e9e;
		margin-top: 6px;
		display: inline-block;
	}

	.rank_content {
		width: 1000px;
		height: 598px;
		background: #fff;
	}

	.rank_left {
		float: left;
		width: 309px;
		height: 560px;
		padding: 38px 0 0 24px;
	}

	.rank_center {
		float: left;
		width: 307px;
		border-left: 1px solid #f0f0f0;
		border-right: 1px solid #f0f0f0;
		height: 560px;
		padding: 38px 0 0 24px;
	}

	.rank_right {
		float: left;
		width: 309px;
		height: 560px;
		padding: 38px 0 0 24px;
	}

	.rank_book .onShow {
		padding-top: 15px;
	}

	.rank_content h3 {
		height: 32px;
		font-size: 18px;
		font-style: normal;
		font-weight: normal;
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	.rank_content h3 a {
		color: #212121;
	}

	.rank_content h3 a:hover {
		color: #FF5858;
	}

	.rank_left h3 span {
		width: 4px;
		height: 20px;
		border-radius: 50px;
		background: #039af4;
		float: left;
		margin-right: 10px;
		display: inline-block;
	}

	.rank_center h3 span {
		width: 4px;
		height: 20px;
		border-radius: 50px;
		background: #f26552;
		float: left;
		margin-right: 10px;
		display: inline-block;
	}

	.rank_right h3 span {
		width: 4px;
		height: 20px;
		border-radius: 50px;
		background: #ffc107;
		float: left;
		margin-right: 10px;
		display: inline-block;
	}

	.open {
		display: block;
		overflow: hidden;
	}

	.close dt {
		height: 32px;
		line-height: 32px;
		float: left;
		width: 10px;
		text-align: right;
		margin-right: 16px;
	}

	.close dd {
		width: 262px;
		height: 32px;
		line-height: 32px;
		border-bottom: 1px solid #f0f0f0;
		overflow: hidden;
	}

	.close dd i {
		float: left;
		width: 196px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-style: normal;
		font-weight: normal;
	}
	
	.close dd i:hover{
		color:orangered;
	}

	.close dd span {
		float: left;
		font-family: arial;
		margin-left: 10px;
		display: inline-block;
	}
</style>
