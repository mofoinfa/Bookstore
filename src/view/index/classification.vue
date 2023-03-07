<template>
	<div class="classification">
		<div class="content">
			<div class="genre">
				<div class="difgenre">
					<span class="left">类型</span>
					<div class="right">
						<ul>
							<li class="current superdefaultli" @click="active('',$event)">
								<p>全部</p>
							</li>
							<li v-for="(item,index) in typelist" :key="index" @click="active(item.name,$event)" class="superdefaultli">
								<p>{{item.name}}</p>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="show">
				<ul class="newShow">
					<li v-for="(item,index) in list" :key="index">
						<img :src="item.imgurl" />
						<div class="bookMation">
							<h3 @click="send(item)">
								{{item.name}}
							</h3>
							<p class="author">
								{{item.author}}
							</p>
							<p class="introduce">
								{{item.introduction}}
							</p>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script type="text/javascript">
	import book from '../bookcenter/image/bookcenter.js'
	import $ from 'jquery';

	export default {
		methods: {
			send(item) {
				this.$router.push({
					path: "/book",
					query: item
				})
			},
			active(item,event){
				book.commit({
					type:"selectType",
					data:item
				});     
				var dom= document.getElementsByClassName('superdefaultli')
				for(var i=0;i<dom.length;i++){
					if(event.target.parentNode==dom[i]){
				 		dom[i].classList.add('current')
					}else{
						dom[i].classList.remove('current')
					}
				}
			}
		},
		computed: {
			list() {
				return book.getters.IndexgetBookListBybooktype;
				
			},
			typelist(){
				return book.getters.getBookType;
			}
		},
		mounted() {
			book.commit({
				type:"selectType",
				data:''
			});    
		}
	}

</script>

<style scoped>
	a {
		text-decoration: none;
		outline: none;
		color: #9e9e9e;
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	i {
		font-style: normal;
		font-weight: normal;
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

	.classification .content {
		width: 1000px;
		overflow: hidden;
		margin: 0 auto;
		padding-top: 40px;
		color: #9e9e9e;
		font: 12px "Microsoft Yahei", arial, sans-serif;
		font-weight: normal;
	}

	.genre {
		padding: 18px 46px;
		background: #fff;
	}

	.difgenre {
		overflow: hidden;
	}

	.difgenre .left {
		float: left;
		width: 48px;
		height: 50px;
		line-height: 50px;
		color: #ccc;
		display: inline-block;
		font-size: 12px;
	}

	.difgenre .right {
		float: left;
		width: 848px;
		padding: 0 0 0 6px;
		border-bottom: 1px solid #f0f0f0;
		overflow: hidden;
	}

	.difgenre ul {
		width: 848px;
		float: left;
		padding: 6px 0;
		font-size: 12px;
	}

	.difgenre ul li {
		float: left;
		margin-right: 14px;
		padding: 8px 0;
		list-style: none;
	}

	.difgenre ul .current p {
		background: #9e9e9e;
		border-radius: 50px;
		color: #fff;
		border: 1px solid #9e9e9e;
		line-height: 18px;
	}

	.difgenre .right p {
		display: inline-block;
		height: 20px;
		line-height: 20px;
		padding: 0 9px;
		border: 1px solid #fff;
	}

	.difgenre .right .more {
		float: right;
		margin-top: 14px;
		display: inline-block;
	}

	.difgenre .right .clickMore {
		display: none;
	}

	.difgenre .right .more a {
		width: 38px;
		height: 20px;
		border: none;
	}

	.difgenre .right .more a i {
		float: left;
		font-size: 12px;
	}

	.el-icon-plus {
		float: right;
		width: 9px;
		height: 6px;
		background-position: 0 0;
		margin-top: 5px;
		margin-left: 2px;
	}

	.el-icon-minus {
		float: right;
		width: 9px;
		height: 6px;
		background-position: 0 0;
		margin-top: 5px;
		margin-left: 2px;
	}

	.showTitle {
		width: 1000px;
		height: 41px;
		padding-top: 23px;
	}

	.showTitle .new,
	.showTitle .comment {
		float: left;
		width: 114px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 3px;
		background: #f5f5f5;
		font-size: 14px;
		display: inline-block;
	}

	.showTitle .current {
		background: #fff;
		height: 41px;
	}

	.showTitle a {
		display: block;
		overflow: hidden;
		text-decoration: none;
		outline: none;
	}

	.show {
		width: 930px;
		overflow: hidden;
		background: #fff;
		padding: 42px 35px 0;
	}

	.newShow {
		display: block;
		overflow: hidden;
	}

	.newShow li {
		padding: 0 20px;
		margin-bottom: 44px;
		overflow: hidden;
		float: left;
	}

	.newShow li img {
		float: left;
		width: 105px;
		height: 140px;
		border: 1px solid #f0f0f0;
		margin-right: 14px;
	}

	.newShow li .bookMation {
		width: 148px;
		height: 142px;
		float: left;
	}

	.newShow li .bookMation h3 {
		height: 27px;
		width: 148px;
		margin-bottom: 10px;
		border-bottom: 1px solid #f0f0f0;
		font-size: 14px;
		color: #212121;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.newShow li .bookMation h3:hover {
		cursor: pointer;
		color: orangered;
	}

	.newShow li .bookMation .author {
		font-family: "Microsoft Yahei", arial, sans-serif;
	}

	.newShow li .bookMation .introduce {
		width: 148px;
		height: 48px;
		line-height: 16px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 3;
		-webkit-box-orient: vertical;
		margin-top: 8px;
	}

	.changepage {
		height: 36px;
		padding-top: 22px;
		text-align: center;
	}

	.changepage span {
		display: inline-block;
	}

	.changepage .up,
	.changepage .down {
		width: 80px;
		height: 34px;
		text-align: center;
	}

	.changepage a {
		float: left;
		line-height: 34px;
		background: #fff;
		border-radius: 3px;
		margin: 0 8px;
		border: 1px solid #fff;
	}

	.el-icon-arrow-left {
		float: left;
		width: 7px;
		height: 11px;
		background-position: 0 -38px;
		margin: 12px 0 0 14px;
	}

	.el-icon-arrow-right {
		background-position: 0 -50px;
		width: 7px;
		height: 11px;
		float: right;
		margin: 12px 14px 0 0;
	}
</style>
