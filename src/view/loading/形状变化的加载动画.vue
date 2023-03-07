<template>
	<div id="cont"></div>
</template>

<script>
	var i = 0;

	function changeShape() {
		var cont = document.getElementById("cont")
		cont.setAttribute('style','');
		i++;
		if (i >= 4) {
			i = 0;
		}
		cont.className = "shape" + i
	}

	function changeColor() {

		var cont = document.getElementById("cont")
		if (i % 2 == 0) {
			cont.style.backgroundColor = "rgb(0,255,127)";
		}
		if (i % 2 == 1) {
			cont.style.backgroundColor = "rgb(245,148,144)"
		}
	}

	setInterval(() => {
		changeShape()
	}, 1000);
	setInterval(()=>{
		changeColor()
	}, 500);
</script>

<style>
	#cont {
		width: 40px;
		height: 40px;
		margin: 200px auto;
		background-color: #f59490;
		animation: 1s move infinite ease-in-out alternate;
	}

	.shape0 {
		clip-path: polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%);
	}

	.shape1 {
		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
	}

	.shape2 {
		clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
	}

	.shape3 {
		clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
	}

	@keyframes move {
		0% {
			margin-top: 200px;
		}

		50% {
			margin-top: 150px;
		}

		100% {
			margin-top: 200px;
		}
	}
</style>
