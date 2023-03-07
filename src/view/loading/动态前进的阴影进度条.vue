<template>
	<section>
		<div>
			<span>完成百分比:</span>
			<progress id="p" max=100></progress>
			<span id="span">0%</span>
			<p class="bar"></p>
		</div>
	</section>
</template>

<script>
	setInterval(() => {
		button_onclick()
	}, 50)
	var i = 0;

	function button_onclick() {
		var progressBar = document.getElementById("p");
		if (i < 100) {
			i++;
			progressBar.value = i;
			document.getElementById('span').innerHTML = i + "%";
		}
	}
</script>

<style>
	section {
		width: 420px;
		margin: 50px auto;
		text-align: center;
	}

	div {
		position: relative;
	}

	.bar {
		position: absolute;
		top: -14px;
		left: 154px;
		width: 30px;
		height: 16px;
		background-image: linear-gradient(-45deg, transparent, rgba(255, 255, 255, 0.8), transparent);
		animation: shadow 2s 5 normal linear forwards;

	}

	@keyframes shadow {
		0% {
			left: 154px;
		}

		100% {
			left: 313px
		}
	}
</style>
