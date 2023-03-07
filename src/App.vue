<template>
  <div id="app">
    <!--顶部导航栏-->
	<Header></Header>
	<!--中间部分 通过导航栏区分显示的-->
	<div>
		<!--通过路由来实现组件的切换-->
		<!--接收登录用户的信息
		<h1>欢迎{{this.$route.params.username}}</h1>-->
		<router-view></router-view>
	</div>
	<Footer></Footer>
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  }
}
</script>

<style>

</style>
