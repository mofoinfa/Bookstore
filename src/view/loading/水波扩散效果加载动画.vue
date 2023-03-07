<template>
	<div class="ball">
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</div>
</template>

<script>
</script>

<style>
	.ball {
		width: 100px;
		height: 100px;
		margin: 50px auto;
		position: relative;
		transform: translateY(-30px);
	}

	.ball>div {
		/*设置水波纹的样式*/
		background-color: #279fcf;
		border-radius: 100%;
		margin: 2px;
		position: absolute;
		left: 15px;
		top: 15px;
		opacity: 0;
		width: 60px;
		height: 60px;
		animation: anim 1s 0s linear infinite both;
	}

	.ball>div:nth-child(2) {
		/*设置动画延迟*/
		animation-delay: 0.2s;
	}

	/*此处省略设置第三个和第四个圆圈的动画延迟的代码*/
	.ball>div:nth-child(3) {
		animation-delay: 0.4s;
	}

	.ball>div:nth-child(4) {
		animation-delay: 0.6s;
	}

	@keyframes anim {
		0% {
			transform: scale(0);
			opacity: 0;
		}

		5% {
			opacity: 1;
		}

		100% {
			transform: scale(1);
			opacity: 0;
		}
	}
</style>
