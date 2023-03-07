<template>
	<div class="ball">
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
	.ball {
		width: 60px;
		height: 60px;
		margin: 50px auto;
		position: relative;
	}

	.ball>div {
		/*设置圆圈样式*/
		position: absolute;
		background-color: #279fcf;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 2px;
		animation: ball infinite both 1s;
	}

	.ball>div:nth-child(1) {
		/*设置各圆点的位置以及动画延迟时间*/
		top: -15px;
		left: 0px;
	}

	.ball>div:nth-child(2) {
		top: -4px;
		left: 16px;
		animation-delay: 0.17s;
	}

	/*此处省略雷同代码*/
	.ball>div:nth-child(3) {
		top: 17px;
		left: 15px;
		animation-delay: 0.34s;
	}

	.ball>div:nth-child(4) {
		top: 18px;
		left: -8px;
		animation-delay: 0.51s;
	}

	.ball>div:nth-child(5) {
		top: 0px;
		left: -13px;
		animation-delay: 0.68s;
	}

	@keyframes ball {
		0% {
			-webkit-transform: scale(1);
			transform: scale(1);
		}

		50% {
			-webkit-transform: scale(0.5);
			transform: scale(0.5);
			opacity: 0.7;
		}

		100% {
			-webkit-transform: scale(1);
			transform: scale(1);
			opacity: 1;
		}
	}
</style>
