<template>
	<div class="animbox">
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
	.animbox {
		margin: 50px auto;
		width: 200px;
		text-align: center;
	}

	/*设置各竖条的共有样式*/
	.animbox>div {
		background-color: #279fcf;
		width: 4px;
		height: 35px;
		border-radius: 2px;
		margin: 2px;
		animation-fill-mode: both;
		display: inline-block;
		animation: anim 0.9s 0s infinite cubic-bezier(.11, .49, .38, .78);
	}

	/*设置动画延迟*/
	.animbox> :nth-child(2),
	.animbox> :nth-child(4) {
		animation-delay: 0.25s !important;
	}

	.animbox> :nth-child(1),
	.animbox> :nth-child(5) {
		animation-delay: 0.5s !important;
	}

	/*定义动画*/
	@keyframes anim {
		0% {
			transform: scaley(1);
		}

		80% {
			transform: scaley(0.3);
		}

		90% {
			transform: scaley(1);
		}
	}
</style>
