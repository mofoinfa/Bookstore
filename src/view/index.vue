<template>
	<div>
		<el-container background-color="#545c64">
			<el-header>
				<el-menu :default-active="activeIndex2" class="el-menu-demo" mode="horizontal" @select="handleSelect"
					background-color="#409eff" text-color="#fff" active-text-color="white">
					<el-menu-item index="1">首页</el-menu-item>
					<el-submenu index="2">
						<template slot="title">分类</template>
						<el-menu-item index="2-1">选项1</el-menu-item>
						<el-menu-item index="2-2">选项2</el-menu-item>
						<el-menu-item index="2-3">选项3</el-menu-item>
					</el-submenu>
					<el-menu-item index="3">用户中心</el-menu-item>
					<el-menu-item index="4"><a href="https://www.ele.me" target="_blank" style="text-decoration: none;">订单管理</a></el-menu-item>
				</el-menu>
			</el-header>
			<el-main>
				<router-view></router-view>
			</el-main>
			<!-- <el-footer>Footer</el-footer> -->
		</el-container>
	</div>
</template>

<script>
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
</style>
