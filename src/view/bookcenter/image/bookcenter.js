import vue from 'vue';
import vuex from 'vuex';
import bookdata from './bookdata';

vue.use(vuex);
const bookStore = new vuex.Store({
	state: {
		bookData: bookdata.bookList,
		// 书籍列表
		bookList: [],
		// 搜索框
		search: '',
		// 每页显示条数
		pageSize: 5,
		// 当前页码
		currentPage: 1,
		// 数据条数
		total: 0,
		// 书籍分类
		bookType: bookdata.bookTypeList,
		// 添加修改页面中间变量
		bookTemp: '',
		// 首页搜索框
		IndexSearch: '',
		// 首页数据
		IndexbookList: bookdata.bookList,
	},
	getters: {
		// 书籍中心获取的数据
		getBookList(state) {
			var start = (state.currentPage - 1) * state.pageSize;
			var end = state.pageSize + start;
			if (state.search != '') {
				var reg = new RegExp(state.search + '+');
				var books = state.bookData.filter(p =>
					p.name.match(reg) ||
					p.author.match(reg) ||
					p.publisher.match(reg) ||
					p.introduction.match(reg) ||
					p.booktype.findIndex((i, any) => {
						return state.search === i
					}) != -1)
				var returnbook = books.slice(start, end);
				while (books.length > 0 && returnbook.length == 0) {
					state.currentPage = state.currentPage - 1;
					start = (state.currentPage - 1) * state.pageSize;
					end = state.pageSize + start;
					returnbook = books.slice(start, end);
				}
				vue.set(state, "total", books.length)
				return returnbook;
			} else {
				vue.set(state, "total", state.bookData.length);
				return state.bookData.slice(start, end);
			}
		},
		// 用户首页获取的数据
		getIndexBookList(state) {
			return state.bookData.filter(p=>p.bookstate==1).slice(0,6)
		},

		getBookTemp(state) {
			return state.bookTemp;
		},
		getBookType(state) {
			return state.bookType;
		},
		getTypeBook(state) {
			var books = []
			state.bookData.map((item, index) => {
				if (item.booktype.findIndex((i, any) => {
						return state.search === i
					}) != -1) {
					books.push(item)
				}
			});
			return books;
		},
		IndexgetBookListBybooktype(state) {
			if (state.type == '' || state.type == null) {
				return state.IndexbookList.filter(p => p.bookstate == 1);
			}
			var books = []
			state.IndexbookList.map((item, index) => {
				if (item.booktype.findIndex((i, any) => {
						return state.type === i
					}) != -1) {
					books.push(item)
				}
			});
			return books.filter(p => p.bookstate == 1);
		},
		IndexgetSelectedBook(state) {
			if (state.IndexSearch != '') {
				var reg = new RegExp(state.IndexSearch + '+');
				var books = [];
				state.IndexbookList.map((item, index) => {
					if (item.name.match(reg)) {
						books.push(item);
					}
				})
				return books.filter(p => p.bookstate == 1);
			} else {
				return state.bookData.filter(p => p.bookstate == 1);
			}
		},

	},
	mutations: {
		//分页 
		updatePageSize(state, data) {
			vue.set(state, "pageSize", data.data)
		},
		// 页号
		updatePage(state, data) {
			vue.set(state, "currentPage", data.data)
		},
		// 搜索
		searchData(state, data) {
			vue.set(state, "search", data.data)
		},
		// 上下架
		delBook(state, data) {
			var books = state.bookData;
			for (var i = 0; i < books.length; i++) {
				if (books[i].id == data.data) {
					books[i].bookstate = data.state;
					break;
				}
			}
			vue.set(state, "bookData", books)
		},
		editBookNum(state,data){
			var book = JSON.parse(JSON.stringify(state.bookData.filter(p=>p.id==data.data.book.id)))[0]
			book.num=parseFloat(book.num) - parseFloat(data.data.num) 
			vue.set(state, "bookData", state.bookData.filter(p=>p.id!=data.data.book.id))
			state.bookData.push(book)
		},
		editBookNumplus(state,data){
			var book = JSON.parse(JSON.stringify(state.bookData.filter(p=>p.id==data.data.book.id)))[0]
			book.num=parseFloat(book.num) + parseFloat(data.data.num) 
			vue.set(state, "bookData", state.bookData.filter(p=>p.id!=data.data.book.id))
			state.bookData.push(book)
		},
		addBook(state, data) {
			state.bookData.push(data.data)
		},
		editBook(state, data) {
			var books = JSON.parse(JSON.stringify(state.bookData))
			for (var i = 0; i < books.length; i++) {
				if (books[i].id == data.data.id) {
					books[i] = data.data
				}
			}
			vue.set(state, "bookData", books)
		},
		toAddBook(state) {
			vue.set(state, "bookTemp", bookdata.defaultBook)
		},
		toEditBook(state, data) {
			vue.set(state, "bookTemp", data.data)
		},
		selectType(state, data) {
			vue.set(state, "type", data.data)
		},
		IndexsearchData(state, data) {
			vue.set(state, "IndexSearch", data.data)
		},
		// 修改分类
		editbooktype(state, data) {
			var booktype = JSON.parse(JSON.stringify(state.bookType))
			var oldtype = '',
				newtype = '';
			for (var i = 0; i < booktype.length; i++) {
				if (booktype[i].id == data.data.id) {
					oldtype = booktype[i].name;
					newtype = data.data.name;
					booktype[i].name = data.data.name
					break;
				}
			}
			var books = JSON.parse(JSON.stringify(state.bookData))
			for (var i = 0; i < books.length; i++) {
				var index = books[i].booktype.findIndex((i, any) => {return oldtype === i});
				if(index!=-1){
					books[i].booktype[index]=newtype;
				}
			}
			vue.set(state, "bookData", books)
			vue.set(state, "bookType", booktype)
		}
		,addbooktype(state,data){
			state.bookType.push(data.data)
		}
	}
})

export default bookStore;
