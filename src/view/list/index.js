import Vue from 'vue'
import Vuex from 'vuex'


Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		orderlist: [{
				order_number: '115615',
				order_book: '朝花夕拾',
				order_num: '2',
				order_price: '35',
				order_time: '2022-9-22',
				pay_status: '0'
			},
			{
				order_number: '115616',
				order_book: '朝花夕拾',
				order_num: '2',
				order_price: '35',
				order_time: '2022-9-22',
				pay_status: '1'
			},
			{
				order_number: '115617',
				order_book: '朝花夕拾',
				order_num: '2',
				order_price: '35',
				order_time: '2022-9-22',
				pay_status: '1'
			},
			{
				order_number: '115618',
				order_book: '朝花夕拾',
				order_num: '2',
				order_price: '35',
				order_time: '2022-9-22',
				pay_status: '1'
			},
		],
		search: '',
		pageSize: 2,
		currentPage: 1,
		total: 0,
	},
	getters: {
		getAll: state => {
			var start = (state.currentPage - 1) * state.pageSize;
			var end = state.pageSize + start;

			var order = []
			if (state.search != '') {
				var reg = new RegExp(state.search + '+');
				state.orderlist.map((item, i) => {
					console.log()
					if (item.order_number.match(reg)) {
						order.push(item)
					}
				})
				var ordertemp = order
				order = order.slice(start, end)
				while (ordertemp.length > 0 && order.length == 0) {
					state.currentPage = state.currentPage - 1;
					start = (state.currentPage - 1) * state.pageSize;
					end = state.pageSize + start;
					order = ordertemp.slice(start, end);
					// console.log(state.bookList)
				}
				state.total = ordertemp.length
			} else {
				state.total = state.orderlist.length
				order = state.orderlist.slice(start, end);
			}
			return order;
		},

	},
	mutations: {
		searchData(state, data) {
			Vue.set(state, "search", data.data)
		},
		//分页 
		updatePageSize(state, data) {
			Vue.set(state, "pageSize", data.data)
		},
		// 页号
		updatePage(state, data) {
			Vue.set(state, "currentPage", data.data)
		},
		changeOrder(state, data) {
			console.log(data)
			var orders = state.orderlist;
			for (var i = 0; i < orders.length; i++) {
				if (orders[i].order_number == data.data) {
					orders[i].pay_status = data.pay_status;
					break;
				}
			}
			Vue.set(state, "orderlist", orders)
		},
	}
})

export default store
