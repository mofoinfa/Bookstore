<template>
	<div>
		<el-dialog title="用户登录" width="400px" :visible="showMoney" :before-close="clikeclose" >
			<el-form  label-position="right">
				<el-form-item label="充值金额">
					<el-input v-model="moneyNum" v-text=""></el-input>
				</el-form-item>
				<el-form-item label="密码">
					<el-button @click="toMoney">确认充值</el-button>
				</el-form-item>
				<!-- <div id="winxin">
					
				</div> -->
			</el-form>
		</el-dialog>
		<el-form  label-position="right">
			<table v-text="665"></table>
			<el-form-item label="密码">
				<el-button @click="openMoney">充值</el-button>
			</el-form-item>
			<el-form-item label="5元">
				<el-button @click="buyBook5">购买</el-button>
			</el-form-item>
			<el-form-item label="10元">
				<el-button>购买</el-button>
			</el-form-item>
			<el-button @click="toRoot">跳转管理员</el-button>
			<!-- <div id="winxin">
				
			</div> -->
		</el-form>
	</div>
	
</template>

<script>
	export default {
		
		data() {
			return {
				moneyNum:'',
				showMoney:false
				/* qrcode:'' */
			}
		},
	    methods: {
	      openMoney(){
			  this.showMoney=true
		  },
		  clikeclose(){
			  this.showMoney=false
		  },
		  buyBook5(){
			  this.$store.dispatch({
			      type: "asyncBuyBook",
			      buy: {
			  		  user:"",
			  		  event:"购买老人与海",
			  		  changeManey:10,
			  		  data:0,
			  		  moneyNum:"0",
			  		  point:1,
			      },
			  });
			  if (this.$store.state.buyToken == 1) { 
			      this.$message({
			          message: "购买成功！",
			          type: "succes",
			          duration: 2000
			      })
			      return;
			  }
			  if (this.$store.state.buyToken == 2) {
			      this.$message({
			          message: "余额不足，请充值！",
			          type: "error",
			          duration: 2000
			      })
			      return;
			  }
	       },
		   clikeclose(){
			  this.showMoney=false
		  },
		   toMoney(){
			  this.$store.dispatch({
			      type: "asynctoMoney",
			      recharge: {
					  user:"",
					  event:"充值",
					  changeManey:this.moneyNum,
					  data:"0",
			  		  moneyNum:"0",
					  point:"0"
			      },
			  });
			  if (this.$store.state.toMoneyToken == 1) {
				  this.showMoney=false;
			      this.$message({
			          message: "充值成功！",
			          type: "succes",
			          duration: 2000
			      })
				  this.moneyNum=''
			      return;
			  }
	       },
		   toRoot(){
			   this.$router.push({
			       path:"/1-2",
			       params: {},
			   });
		   },
		   toUser(){
			   this.$router.push({
			       path:"/1-3",
			       params: {},
			   });
		   }
		},  
    }
</script>

<style>
</style>