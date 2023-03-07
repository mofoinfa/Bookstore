import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);
const commentStore = new vuex.Store({
	state: {
		id: '',
		user: '',
		curpage: 1,
		pagesize: 10,
		allmessages: [{
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:06",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			},
			{
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:06",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			}, {
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:06",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			}, {
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:04",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			}, {
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:08",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			}, {
				content: "你好",
				createDate: "2022-09-22",
				createTime: "2022-09-22 21:53:07",
				id: 1,
				name: '百年孤独',
				user: {
					id: 2,
					name: '李三',
					radio: 2,
					username: "211619001",
					password: "12345",
					m: 200,
					point: 0
				}
			},


		]
	},
	getters: {
		getMessages(state) {
			return state.allmessages.filter(p => p.id == state.id);
		},
		getAllMessages(state) {
			var start = (state.curpage - 1) * state.pagesize;
			var end = state.pagesize + start;
			return state.allmessages.slice(start, end);
		},
		getAllMessagesTotal(state){
			return state.allmessages.length;
		}
	},
	mutations: {
		updateSize(state, data) {
			vue.set(state, "pagesize", data.data)
		},
		updatePage(state, data) {
			vue.set(state, "curpage", data.data)
		},
		setId(state, data) {
			vue.set(state, "id", data.data)
		},
		setUser(state, data) {
			vue.set(state, "user", data.data)
		},
		messageAdd(state, data) {
			state.allmessages.push(data.data)
		},
		del(state,data){
			state.allmessages=state.allmessages.filter(p=>p.id!=data.data.id ||p.user.id!=data.data.user.id||p.createTime!=data.data.createTime)
		}
		// updateUserData(state, data) {
		// 	state.users.map((item, i) => {
		// 		if (item.id == data.data.id) {
		// 			item = data.data;
		// 		}
		// 	})
		// },
	}

});

export default commentStore;
