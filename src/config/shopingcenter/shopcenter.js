import vue from 'vue';
import vuex from 'vuex';
// import bookdata from './bookdata';

vue.use(vuex);
const shopStore = new vuex.Store({
	state: {
		// 所属用户
		uid: '',
		// 选择的书籍
		book: '',
		// 选择的数量
		num: '',
		shoplist:[]
	},
	getters: {
		getMyShopList(state){
			return state.shoplist.filter(p=>p.uid==state.uid);
		},
		getBookShop(state){
			return state.shoplist.filter(p=>p.uid==state.uid&&p.book.id==state.book.id);
		}
	},
	mutations: {
		setUid(state,data){
			vue.set(state,"uid",data.data)
		},
		insertShop(state,data){
			state.shoplist.push(data.data);
		},
		setBid(state,data){
			vue.set(state,"book",data.data)
		},
		del(state,data){
			vue.set(state,"shoplist",state.shoplist.filter(p=>p.book.id!=data.data.book.id || p.uid!=data.data.uid))
		},
		edit(state,data){
			vue.set(state,"shoplist",state.shoplist.filter(p=>p.book.id!=data.data.book.id || p.uid!=data.data.uid))
			state.shoplist.push(data.data);
		}
	},
})

export default shopStore;
