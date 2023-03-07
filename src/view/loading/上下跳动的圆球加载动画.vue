<template>
	<div class="cont">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<script>
</script>

<style>
	.cont {
		width: 270px;
		margin: 50px auto;
		text-align: center;
	}

	.cont>div {
		/*设置小圆圈的样式*/
		width: 15px;
		height: 15px;
		float: left;
		margin: 0px 10px;
		background: #dd0000;
		border-radius: 100%;
		animation: anim 1s infinite normal ease;
	}

	.cont>:nth-child(2n) {
		/*设置奇数个小圆圈的动画延迟*/
		animation-delay: 0.5s;
	}

	@keyframes anim {

		/*定义动画*/
		0% {
			transform: scale(0.4);
		}

		25% {
			transform: translateY(30px);
		}

		50% {
			transform: scale(1.1);
		}

		75% {
			transform: translateY(-30px);
		}

		100% {
			transform: translateY(0);
			transform: scale(0.75);
		}
	}
</style>
