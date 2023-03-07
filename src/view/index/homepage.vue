<template>
	<div class="homepage">
		<div class="recom">
			<div style="height:20px"></div>
			<div style="margin:0 430px;">
				<el-carousel direction="vertical" :autoplay="false">
					<el-carousel-item v-for="(item,index) in img" :key="index">
						<img :src="item.imgUrl">
					</el-carousel-item>
				</el-carousel>
			</div>
		</div>
		<div class="content">
			<div class="recommendation">
				<div class="recommendation_title">
					<h2>精选图书</h2>
				</div>
				<div class="recommendation_book">
					<div>
						<ul class="recommendation_list">

							<li class="recommendation_list_box" v-for="(item,index) in list" :key="index">
								<div class="rpd"  @click="send(item)">
									<div class="book_img">
										<img :src="item.imgurl" class="square_box1"></img>
									</div>
									<div class="book_context">
										<p class="book_name">{{item.name}}</p>
										<p class="book_cost">
											<span class="money">￥{{item.price}}</span>
										</p>
									</div>
								</div>
							</li>

						</ul>
					</div>
				</div>
			</div>
			
			<div class="recommendation">
			
				<div class="recommendation_title">
					<h2>新书上架</h2>
				</div>
				<div class="recommendation_book">
					<div>
						<ul class="recommendation_list">
			
							<li class="recommendation_list_box" v-for="(item,index) in list" :key="index">
								<div class="rpd" @click="send(item)">
									<div class="book_img">
										<img :src="item.imgurl" class="square_box1"></img>
									</div>
									<div class="book_context">
										<p class="book_name">{{item.name}}</p>
										<p class="book_cost">
											<span class="money">￥{{item.price}}</span>
										</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import book from '../bookcenter/image/bookcenter.js';
	import shop from '../../config/shopingcenter/shopcenter.js';
	export default {
		name: 'Lbt',
		data() {
			return {
				img: [{
						imgUrl: require('./images/lbt1.jpg')
					},
					{
						imgUrl: require("./images/lbt2.jpg")
					},
					{
						imgUrl: require("./images/lbt3.jpg")
					},
					{
						imgUrl: require("./images/lbt4.jpg")
					},
				]
			}
		},
		methods:{
			send(item){
				this.$router.push({
					path:"/book",
					query:item
				})
				shop.commit({
					type:"setBid",
					data:item
				})
			}
		},
		computed: {
			list(){
				return book.getters.getIndexBookList;
			}
		},
	}
</script>

<style scoped>
	.homepage{
		font-size: 14px;
	}
	
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

	.recom {
		text-align: center;
		background: url(images/lbtbg.gif) no-repeat center top;
		height: 350px;
		min-width:1200px;
	}
	
	.recom img{
		min-width: 100%;
	}

	.content {
		min-width:1200px;
		width:1200px;
		overflow: hidden;
		margin: 0 auto;
	}

	.recommendation {
		overflow: hidden;
		margin-top: 20px;
	}

	.recommendation_title {
		width: 1200px;
		text-align: center;
		padding: 1px 0 30px 0;
	}

	.recommendation_title h2 {
		font-size: 26px;
		color: #212121;
		height: 36px;
		font-style: normal;
		font-weight: normal;
	}

	.recommendation_book {
		width: 1200px;
		background: #FFF;
	}

	.recommendation_list {
		width: 1199px;
		position: relative;
		border: 1px solid #f5f5f5;
		list-style: none;
		float: right;
		background: #FFF;
	}

	.recommendation_list_box {
		text-align: center;
		width: 16.666667%;
		float: left;
	}

	.rpd {
		border: 1px solid #f5f5f5;
		padding: 5px;
	}

	.rpd:hover{
		box-shadow: 0 0 8px rgb(0 0 0/14%);
		cursor:pointer;
	}

	.book_img {
		overflow: hidden;
		padding: 20px;
		position: relative;
	}

	.square_box1 {
		padding-bottom: 30%;
		background-position: center center;
		background-size: contain;
		background-repeat: no-repeat;
		display: block;
		height: 0;
		overflow: hidden;
		width:156px;
		height:180px;
	}
	
	.rpd:hover .square_box1{
		transform: scale(1.1,1.1);
		transition: 0.3s;
		opacity:1;
	}

	.book_name {
		line-height: 18px;
		color: #666;
		overflow: hidden;
		margin-top: 2px;
		height: 36px;
		display: block;
		text-decoration: none;
		outline: none;
	}
	
	.rpd:hover .book_name{
		color:#212121;
	}

	.book_cost{
		line-height: 40px;
	}

	.money {
		font-size: 16px;
		color: #e4393c;
	}
</style>
