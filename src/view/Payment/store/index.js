import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		name: 0,
		point: 0,
		m: 20,
		radio:0,
		buytoken: 0,
		token: 0,
		toMoneyToken: 0,
		registerToken: 0,
		username: 2116191001,
		adminusername: 2022103,
		accountShowOrNot: false,
		adminusername: "",
		usercount: 0,
		count: 2,
		Rf:false,//注册验证
		f: false,//登陆验证
		users: [{
				id: 1,
				name: '张三',
				radio: 1,
				username: "211619000",
				password: "12345",
				m: 200,
				point: 0
			},
			{
				id: 2,
				name: '李三',
				radio: 2,
				username: "211619001",
				password: "12345",
				m: 200,
				point: 0
			},
		],
		RootPayments: [{
				id: 1,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 2,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 3,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 4,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 5,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
			    id: 1,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 2,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 3,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 4,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			{
				id: 5,
				user: "张三",
				event: "购买老人与海",
				changeManey: "-5元",
				data: "2016-05-02",
				moneyNum: "50元",
				point: "0"
			},
			
		],
		paypage: 1,
		paypagesize: 7,
	},
	/*对数据进行过滤*/
	getters: {
		getRootPayments(state) {
			var start = (state.paypage - 1) * state.paypagesize;
			var end = state.paypagesize + start;
			return state.RootPayments.slice(start, end);
		},
		getRootPaymentsTotal(state) {
			return state.RootPayments.length;
		},

		getAllLesson: state => {
			return state.lessons;
		},
		getAllLesson2: state => {
			return state.lessons2;
		},
		getAll: state => {
			return state.rankinfo
		},
		getrank1: state => {
			return state.rankinfo
		},
		getrank2: state => {
			return state.rankinfo2
		},
		getactive: state => {
			return state.activeinfo
		},
		getcourselist: state => {
			return state.courselist
		},
		getAllCourse: state => {
			// return state.course
			return state.course
		},
		getAll2: state => {
			return state.course2
		}
	},
	mutations: {
		changepaypage(state, data) {
			Vue.set(state, "paypage", data.data)
		},
		changepaypagesize(state, data) {
			Vue.set(state, "paypagesize", data.data)
		},

		checkLogin(state, login) {
			var that = login.login;
			if (that.username == "" || that.password == "") {

				state.token = 1;
				return
			}
			console.log(that.username, state.username)
			var length = (state.users.filter(users => users.username == that.username).filter(users => users
				.password == that.password)).length;
			if (length == 0) {
				state.token = 2;
				return;
			}
			if (length !== 0) {
				//获取登陆者的信息
				state.usercount = parseInt(that.username) - 211619000;
				state.name = state.users[state.usercount].name;
				state.m = state.users[state.usercount].m; //登陆者的资金存入
				state.point = state.users[state.usercount].point //登陆者积分存入
				state.radio=state.users[state.usercount].radio;//获取当前用户的角色
				console.log(state.radio)
				//返回真值
				state.Rf=false;//注册显示关闭
				state.f = true; //显示为登陆状态
				state.token = 3;

			}
		},
		checkRegister(state, register) {
			state.time = new Date();
			var that = register.register;
			if (that.password == "" || that.name == "" || that.rePassword == "" || that.radio == "") {
				state.registerToken = 1;
				return;
			}
			if (that.rePassword != that.password) {
				state.registerToken = 2;
				return;
			}
			if (that.radio == 1) {
				state.registerToken = 3;
				that.username = "21161900" + state.count;
				state.username = that.username;
				var newUsers = state.users;
				/*设置插入属性的账号*/
				Vue.set(that, "username", that.username);
				newUsers.push(that);
				Vue.set(state, "users", newUsers);
				// 更新账号数据
				state.count = parseInt(state.count) + 1;
				state.Rf = true

			} else if (that.radio == 2) {
				state.registerToken = 3;
				that.username = "21161900" + state.count;
				state.username = that.username;
				var newUsers = state.users;


				/*设置插入属性的账号*/
				Vue.set(that, "username", that.username);
				newUsers.push(that);
				Vue.set(state, "users", newUsers);
				// 更新账号数据
				state.count = parseInt(state.count) + 1;
				state.Rf = true
			}
		},
		// 根据角色跳转
		findUserById(state, user) {
			var that = user.user
			var user1 = state.users.filter(users => users.username == that.username)
			state.currentUser = user1[0];
			console.log(state.currentUser);
		},
		//买书
		BuyBook(state, buy) {
			var that = buy.buy;
			var mm=0;
			if (state.m > that.changeManey) {
				//购买成功操作
				state.m = parseInt(state.m) - parseInt(that.changeManey); //余额减少
				state.point = parseInt(state.point) + parseInt(that.point); //积分增加
				//调整插入数据
				that.user = state.name;
				that.changeManey = "-" + that.changeManey + "元";
				that.moneyNum = state.m + "元";
				that.point = state.point;
				mm=parseInt(new Date().getMonth())+1;
				that.data=new Date().getFullYear()+"-"+mm+"-"+new Date().getDate();
				//插入数据
				var newRootPayment = state.RootPayments;
				newRootPayment.push(that);
				Vue.set(state, "RootPayments", newRootPayment);
				//返回真值
				state.buyToken = 1;

				return;
			} else if (state.m < that.changeManey) {
				//失败
				state.buyToken = 2;
				// state.m=state.m-that.price;
				return;
			}
		},
		//充值
		toMoney(state, recharge) {
			var that = recharge.recharge;
			var mm;
			state.m = parseInt(state.m) + parseInt(that.changeManey); //余额等于原来的余额加现在的
			//跳整交易流水
			that.moneyNum = state.m + "元"; //总资金
			that.point = state.point; //总积分
			that.changeManey = "+" + that.changeManey + "元" //交易金额
			that.user = state.name; //用户名字
			mm=parseInt(new Date().getMonth())+1;
			that.data=new Date().getFullYear()+"-"+mm+"-"+new Date().getDate();
			//插入交易流水
			var newRootPayment = state.RootPayments;
			newRootPayment.push(that);
			Vue.set(state, "RootPayments", newRootPayment);
			state.toMoneyToken = 1; //返回真值

			return;
		},
		//退出登陆
		Exit(state, exit) {
			var that=exit.exit;
			state.f=that.f;
			console.log(state.f)
		}
	},
	actions: {
		/*当mutation中的方法vue实例被vue实例调用之后，再次提交关闭当前方法的进程*/
		asyncCheckLogin(context, payload) {
			/*定时器*/
			// setTimeout(()=>{
			//     context.commit("checkLogin",payload)
			// },2000)
			context.commit("checkLogin", payload)
		},
		asyncCheckRegister(context, payload) {
			/*定时器*/
			// setTimeout(()=>{
			//     context.commit("checkLogin",payload)
			// },2000)
			context.commit("checkRegister", payload)
		},
		//不同角色登陆
		asyncFindUserById(context, payload) {
			context.commit("findUserById", payload)
		},
		// 购买书籍
		asyncBuyBook(context, payload) {
			context.commit("BuyBook", payload)
		},
		//充值入口
		asynctoMoney(context, payload) {
			context.commit("toMoney", payload);
		},
		//退出
		asyncExit(context, payload) {
			context.commit("Exit", payload);
		}
		
	}

})

export default store
