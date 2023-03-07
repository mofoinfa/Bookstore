import vue from 'vue';
import vuex from 'vuex';

vue.use(vuex);
const shopStore = new vuex.Store({
	state: {
		uid:'',
		bid:'',
		shoplist:[]
	},
	getters:{
		// 获取用户的购物车信息
		getMyShopList(state){
			return state.shoplist.filter(p=>p.uid==state.uid);
		},
		// 获取用户购物车中是否含有这本书
		getBookShopState(state){
			return state.shoplist.filter(p=>p.uid==state.uid&&p.bid==state.bid).length>0?true:false;
		},
		// 获取用户购物车中关于这本书的全部内容
		getBookShopAll(state){
			return state.shoplist.filter(p=>p.uid==state.uid&&p.bid==state.bid)[0];
		},
		
	},
	mutations:{
		
	}
})
export default shopStore;