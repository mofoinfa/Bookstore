<template>
	 <div>
		 <el-menu mode="horizontal" :router="true">
			 <el-menu-item>
			 	  <h1 style="text-align: center;color: gainsboro;margin-top: -10px;">李钦书城</h1>
			 </el-menu-item>
			
			<el-menu-item style="float:right">
				  <template v-if="isName">
					  <img class="avatar" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="">
					   <span style="color:blue;" v-if="this.$store.state.f!=2">{{this.$store.state.name}}</span>
				  </template>
				  <div v-else>
					  <div @click="clikeregister" >注册</div>
					  <div @click="clikelogin" class='regist-btn'>登陆</div>
				  </div>
				  
				  
			</el-menu-item>
		</el-menu>
		<register :visible.sync="eshow" v-on:loginstate="loginstate"></register>
		<login :visible.sync="show" v-on:toMainPage="toMainPage"></login>
	 </div>
	 
</template>

<script>
import login from './Login.vue'
import register from './Register.vue'
	export default{
		data(){
			return{
				isName:false,
				show:false,
				eshow:false
			}
		},
		components: {
			login:login,
			register:register
		},
		methods:{
			clikelogin(){
				this.show=true
			},
			clikeregister(){
				this.eshow=true
			},
			loginstate(){
				this.eshow=false,
				this.show=true
			},
			toMainPage(){
				this.isName=true,
				this.show=false
			}
		}
	}
</script>

<style>
	.avatar{
		width:40px;
		height:40px;
		border-radius:40px;
	}
	.regist-btn{
		margin-top: -59px;
		margin-left: 60px;
	}
</style>