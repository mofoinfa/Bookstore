import vue from 'vue';
import vuex from 'vuex';
import defultUserData from './userdata.js'


vue.use(vuex);
const userStore = new vuex.Store({
	state: {
		userData: defultUserData,
		userList: [],
		search: '',
		pageSize: 5,
		currentPage: 1,
		total: 0,
	},
	getters: {
		getAllusers: state => {

			var start = (state.currentPage - 1) * state.pageSize;
			var end = state.pageSize + start;

			vue.set(state, "userList", state.userData.slice(start, end))
			while (state.userList.length == 0) {
				state.currentPage = state.currentPage - 1;
				start = (state.currentPage - 1) * state.pageSize;
				end = state.pageSize + start;
				state.userList = state.userData.slice(start, end);
			}

			vue.set(state, "total", state.userData.length)

			return state.userList;
		},
	},
	mutations: {
		// 修改账号角色信息
		updateUserData(state, data) {
			state.userData.map((item, i) => {
				if (item.name == data.user.name) {
					item = data.user;
				}
			})
			// vue.set(state, "userData", state.userData)

		},


		updatePageSize(state, data) {
			vue.set(state, "pageSize", data.data)
		},
		updatePage(state, data) {	
			vue.set(state, "currentPage", data.data)
		},


		modify(state, list) {
			for (var i = 0; i < state.userData.length; i++) {
				if (list[0].name == state.userData[i].name && list[0].role == state.userData[i].role) {
					console.log(list[1]);
					state.userData[i].role = list[1].role;
					return;
				}
			}
		}
	},

	actions: {
		modify({
			commit
		}, list) {
			commit('modify', list);
		}
	}
})

export default userStore;
