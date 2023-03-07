const user = {
	//用户id
	uid: '12',
	//用户名
	uname: "",
	//用户角色身份
	radio: 1,
	//用户账号
	username: "",
	//密码
	password: "",
	//用户余额
	balance: 0,
	//用户积分
	point: 0,
};

const userlist=[
	{
		uid: 1,
		uname: "不起眼的小石头",
		radio: 0,
		username: "2116190066",
		password: "123456",
		balance: 0,
		point: 0,
	},
	{
		uid: 2,
		uname: "到处乱晃的李子",
		radio: 1,
		username: "2116190088",
		password: "123456",
		balance: 200,
		point: 50,
	}
]


export default {
	user,userlist
}


// import vue from 'vue';
// import vuex from 'vuex';
// import userdata from './userdata.js';

// vue.use(vuex);
// const userStore = new vuex.Store({
// 	state: {
// 		user:userdata.userlist[0], 
// 		userlist: [],



// 	},
// 	getters: {
// 		getMe(state) {
// 			return state.user.uid;
// 		},

// 	},
// 	mutations: {

// 	},
// })

// export default userStore;

