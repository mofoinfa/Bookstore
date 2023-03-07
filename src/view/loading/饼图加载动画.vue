<template>
	<div class="box">
		<div class="rot"></div>
		<div class="right"></div>
		<div class="left"></div>
	</div>
</template>

<script>
</script>

<style>
	.box {
		position: relative;
		width: 50px;
		height: 50px;
		margin: 50px auto;
		border-radius: 40px;
		overflow: hidden;
		background-color: #4b86db;
	}

	.rot,
	.right,
	.left {
		position: absolute;
		width: 50%;
		height: 100%;
	}

	.rot {
		/*旋转的圆形样式*/
		border-radius: 50px 0 0 50px;
		background-color: #89abdd;
		transform-origin: right center;
		animation: spin 1s linear forwards infinite;
		left: 0;
		top: 0;
	}

	.right {
		/*右侧半圆*/
		border-radius: 0 50px 50px 0;
		background-color: #89abdd;
		animation: hide 1s steps(1, end) forwards infinite;
		left: 50%;
		top: 0;
		opacity: 1;
	}

	.left {
		/*左侧半圆*/
		border-radius: 50px 0 0 50px;
		background-color: #4b86db;
		animation: show 1s steps(1, end) forwards infinite;
		left: 0;
		top: 0;
		opacity: 0;
	}

	@keyframes spin {

		/*旋转的动画*/
		0% {
			transform: rotate(360deg);
		}

		100% {
			transform: rotate(0deg);
		}
	}

	@keyframes hide {
		0% {
			opacity: 1;
		}

		50%,
		100% {
			opacity: 0;
		}
	}

	@keyframes show {
		0% {
			opacity: 0;
		}

		50%,
		100% {
			opacity: 1;
		}
	}
</style>
