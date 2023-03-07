<template>
	<div class="ball">
		<div></div>
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
	.ball {
		width: 100px;
		position: relative;
		margin: 50px auto;
	}

	.ball>div {
		background-color: #279fcf;
		width: 15px;
		height: 15px;
		border-radius: 100%;
		margin: 2px;
		animation-fill-mode: both;
		position: absolute;
	}

	/*设置各圆圈的位置以及动画*/
	.ball>div:nth-child(1) {
		top: 25px;
		left: 0;
		animation: loading 1s 0s infinite linear;
	}

	/*此处省略为其余7个圆形设置位置以及动画的代码*/
	.ball>div:nth-child(2) {
		top: 17px;
		left: 17px;
		animation: loading 1s 0.12s infinite linear;
	}

	.ball>div:nth-child(3) {
		top: 0;
		left: 25px;
		animation: loading 1s 0.24s infinite linear;
	}

	.ball>div:nth-child(4) {
		top: -17px;
		left: 17px;
		animation: loading 1s 0.36s infinite linear;
	}

	.ball>div:nth-child(5) {
		top: -25px;
		left: 0;
		animation: loading 1s 0.48s infinite linear;
	}

	.ball>div:nth-child(6) {
		top: -17px;
		left: -17px;
		animation: loading 1s 0.6s infinite linear;
	}

	.ball>div:nth-child(7) {
		top: 0;
		left: -25px;
		animation: loading 1s 0.72s infinite linear;
	}

	.ball>div:nth-child(8) {
		top: 17px;
		left: -17px;
		animation: loading 1s 0.84s infinite linear;
	}

	@keyframes loading {
		50% {
			opacity: 0.3;
			transform: scale(0.4);
		}

		100% {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
