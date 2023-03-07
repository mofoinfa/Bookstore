<template>
	<div class="search">
		<div class="content">
			
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

	export default {
		methods: {
			send(item) {
				this.$router.push({
					path: "/book",
					query: item
				})
			},
			
		},
		computed: {
			list() {
				return book.getters.IndexgetSelectedBook;
				
			}
		},
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

	.search .content {
		width: 1000px;
		overflow: hidden;
		margin: 0 auto;
		padding-top: 40px;
		color: #9e9e9e;
		font: 12px "Microsoft Yahei", arial, sans-serif;
		font-weight: normal;
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
/* 
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
	} */
</style>