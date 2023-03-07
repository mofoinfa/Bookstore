import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);
const billStore = new vuex.Store({
	state: {
		uid: '',
		billlist: [],
		search: '',
		pageSize: 5,
		currentPage: 1,
		total: 0,
	},
	getters: {
		getmybilllist(state) {
			return state.billlist.filter(p => p.uid == state.uid && p.status != 4 && p.status != 5 && p.status != 9);
		},
		getallBilllist(state) {
			return state.billlist;
		},
		getAll: state => {
			var start = (state.currentPage - 1) * state.pageSize;
			var end = state.pageSize + start;
			var order = []
			if (state.search != '') {
				var reg = new RegExp(state.search + '+');
				order = state.billlist.filter(p => p.id.toString().match(reg) && p.status != 4 && p.status != 9);
				var ordertemp = order.slice(start, end)
				while (order.length > 0 && ordertemp.length == 0) {
					state.currentPage = state.currentPage - 1;
					start = (state.currentPage - 1) * state.pageSize;
					end = state.pageSize + start;
					ordertemp = order.slice(start, end);
				}
				state.total = order.length
				return ordertemp;
			} else {
				order = state.billlist.filter(p => p.status != 4 && p.status != 9).slice(start, end);
				state.total = order.length
				return order;
			}
		},

		getbillList(state) {
			return state.billlist.filter(p => p.status == 2);
		},
		getPay(state) {
			var start = (state.currentPage - 1) * state.pageSize;
			var end = state.pageSize + start;
			var order = []
			if (state.search != '') {
				var reg = new RegExp(state.search + '+');
				order = state.billlist.filter(p => p.id.match(reg) && (p.status == 2 || p.status == 9));
				var ordertemp = order.slice(start, end)
				while (order.length > 0 && ordertemp.length == 0) {
					state.currentPage = state.currentPage - 1;
					start = (state.currentPage - 1) * state.pageSize;
					end = state.pageSize + start;
					ordertemp = order.slice(start, end);
				}
				state.total = order.length
				return ordertemp;
			} else {
				order = state.billlist.filter(p => p.status == 2 || p.status == 9).slice(start, end);
				state.total = order.length
				return order;
			}
		}


	},
	mutations: {
		searchData(state, data) {
			vue.set(state, "search", data.data)
		},
		//分页 
		updatePageSize(state, data) {
			vue.set(state, "pageSize", data.data)
		},
		// 页号
		updatePage(state, data) {
			vue.set(state, "currentPage", data.data)
		},
		setUid(state, data) {
			vue.set(state, "uid", data.data);
		},
		insertBillList(state, data) {
			state.billlist.push(data.data)
		},
		editBillList(state, data) {
			vue.set(state, "billlist", state.billlist.filter(p => p.id != data.data.id));
			state.billlist.push(data.data)
		},
		changeOrder(state, data) {
			var orders = state.billlist;
			for (var i = 0; i < orders.length; i++) {
				if (orders[i].id == data.data) {
					orders[i].status = data.pay_status;
					break;
				}
			}
			vue.set(state, "billlist", orders)
		},

	},
})

export default billStore;
