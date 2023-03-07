<template>
	<div>
		<div>
				 <el-menu mode="horizontal" :router="true">
					 <el-menu-item>
					 	  <h1 style="text-align: center;color: gainsboro;margin-top: -10px;">精文书城</h1>
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
		<div>
			<el-carousel :interval="5000" arrow="always">
			    <el-carousel-item v-for="item in imageitem" :key="item">
			      <!-- <h3>{{ item }}</h3> -->
				  <img :src='item'/>
				  
			    </el-carousel-item>
			  </el-carousel>
		</div>
		<h1 style="text-align: center;">书籍推送</h1>
		<div>
			<el-row style="margin-left: 60px;">
			  <el-col :span="5" v-for="(o, index) in t" :key="o" :offset="index > 0 ? 1 : 0">
			    <el-card :body-style="{ padding: '0px' }">
			      <img :src='o'/>
			      <div style="padding: 14px;">
			        <div class="bottom clearfix">
			          <div class="time">倾城,如泡沫的幻影</div>
			        </div>
			      </div>
			    </el-card>
			  </el-col>
			</el-row>
		</div>
		<div>
			<el-row style="margin-left: 60px;margin-top: 30px;">
			  <el-col :span="5" v-for="(o, index) in t" :key="o" :offset="index > 0 ? 1 : 0">
			    <el-card :body-style="{ padding: '0px' }">
			      <img :src='o'/>
			      <div style="padding: 14px;">
			        <div class="bottom clearfix">
			          <div class="time">倾城,如泡沫的幻影</div>
			        </div>
			      </div>
			    </el-card>
			  </el-col>
			</el-row>
		</div>
		<div class="footer">
		  <el-steps :active="5" simple>
		    <h1 style="text-align: center;color: gainsboro;">精文书城</h1>
		  </el-steps>
		</div>
	</div>
</template>

<script>
	import login from './Login.vue'
	import register from './Register.vue'
	export default {
	  data() {
	    return {
	      currentDate: new Date(),
		  isName:false,
		  show:false,
		  eshow:false,
		  imageitem:[
			  require('../dist/img/dl2.png'),
			  require('../dist/img/dl1.png'),
			  require('../dist/img/dl3.png')
		  ],
		  t:[
			  require('../dist/img/dls1.png'),
			  require('../dist/img/dls2.png'),
			  require('../dist/img/dls3.png'),
			  require('../dist/img/dls4.png'),
		  ]
	    };
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

<style scoped>
 .el-carousel__item h3 {
    /* background-image: url('../../dist/img/3012.02af68cf.png'); */
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .time {
      font-size: 20px;
      color: #999;
    }
    
    .bottom {
      margin-top: 13px;
      line-height: 20px;
    }
  
    .button {
      padding: 0;
      float: right;
    }
  
    .image {
      width: 100%;
      display: block;
    }
  
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    
    .clearfix:after {
        clear: both
    }
	.avatar{
		width:40px;
		height:40px;
		border-radius:40px;
	}
	.regist-btn{
		margin-top: -59px;
		margin-left: 60px;
	}
	.footer{
		width: 1200px;
		line-height: 10px;
		margin: 0 auto;
		text-align: center;
		color:white;
	}
</style>