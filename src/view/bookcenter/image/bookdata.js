const defaultBook = {
	id: 0,
	name: '',
	booktype: [],
	imgurl: require('../image/subpicture.png'),
	cell: '',
	price: '',
	num: '',
	author: '',
	publisher: '',
	introduction: '',
	publication_year: '',
	bookstate: 1
};

const bookList = [{
		id: 1,
		name: '百年孤独',
		author: '加西亚·马尔克斯',
		imgurl: require('./p1.jpg'),
		publisher: '海南出版社',
		publication_year: '2017',
		price: 45,
		num: 20,
		cell: 15,
		introduction: '《百年孤独》是魔幻现实主义文学的代表作，描写了布恩迪亚家族七代人的传奇故事，以及加勒比海沿岸小镇马孔多的百年兴衰，反映了拉丁美洲一个世纪以来风云变幻的历史。作品融入神话传说、民间故事、宗教典故等因素，巧妙地糅合了现实与虚幻，展现出一个瑰丽的想象世界，成为20世纪重要的经典文学巨著。1982年加西亚·马尔克斯获得诺贝尔文学奖，奠定世界文学大师的地位，很大程度上便是凭借《百年孤独》的巨大影响',
		booktype: ['小说'],
		bookstate: 1
	},
	{
		id: 2,
		name: '人生',
		author: '路遥',
		imgurl: require('./p2.jpg'),
		publisher: '收获',
		publication_year: '1981',
		price: 45.5,
		num: 20,
		cell: 15,
		introduction: '主人公是高加林，他高中毕业回到村里后当上了民办小学的教师，很满足这个既能体现他的才能而又对他充满希望的职业，但是好景不长，他就被有权有势的大队书记高明楼的儿子顶替了，他重新回到了土地。正当他失意无奈，甚至有些绝望的时候，善良美丽的农村姑娘刘巧珍闯进了他的生活，刘巧珍虽然没有文化，但是却真心真意地爱上了高加林这个“文化人”，她的爱质朴纯真，她以她的那种充满激情而又实际的做法表白了她的炽烈的爱。而实际上她所得到的爱从一开始就是不平等，高加林在她的眼中是完美的，而她对于高加林来说只是在他失意时找到了精神上的慰藉。当机遇再次降临到了高加林身上，他终于抓住了这次机会，重新回到了城市。',
		booktype: ['小说'],
		bookstate: 1
	},
	{
		id: 3,
		name: '活着',
		author: '余华',
		imgurl: require('./p3.jpg'),
		publisher: '收获',
		publication_year: '2017',
		price: 45,
		num: 20,
		cell: 15,
		introduction: '《活着》讲述了在大时代背景下，随着内战、三反五反、大跃进、“文化大革命”等社会变革，徐福贵的人生和家庭不断经受着苦难，到了最后所有亲人都先后离他而去，仅剩下年老的他和一头老牛相依为命。小说以普通、平实的故事情节讲述了在急剧变革的时代中福贵的不幸遭遇和坎坷命运，在冷静的笔触中展现了生命的意义和存在的价值，揭示了命运的无奈，与生活的不可捉摸。',
		booktype: ['小说'],
		bookstate: 1
	},
	{
		id: 4,
		name: '平凡的世界',
		author: '路遥',
		imgurl: require('./p4.jpg'),
		publisher: '海南出版社',
		publication_year: '2017',
		price: 45,
		num: 20,
		cell: 15,
		introduction: '该书以中国70年代中期到80年代中期十年间为背景，通过复杂的矛盾纠葛，以孙少安和孙少平两兄弟为中心，刻画了当时社会各阶层众多普通人的形象；劳动与爱情、挫折与追求、痛苦与欢乐、日常生活与巨大社会冲突纷繁地交织在一起，深刻地展示了普通人在大时代历史进程中所走过的艰难曲折的道路。',
		booktype: ['小说'],
		bookstate: 1
	},
	{
		id: 5,
		name: '大悲咒',
		author: '佚名',
		imgurl: require('./p5.jpg'),
		publisher: '未知',
		publication_year: '未知',
		price: 88,
		num: 11,
		cell: 20,
		introduction: '《大悲咒》出自“伽梵达摩”所译的《千手千眼观世音菩萨广大圆满无碍大悲心陀罗尼经》，全名为《广大圆满无碍大悲心陀罗尼》。按照内容文字的多少，《大悲咒》有广、中、略三种不同的版本。现今通行的“伽梵达摩”84句《大悲咒》，其经本以《大正藏》的底本为依据，是一个变化差异较大的晚期增改本，并非“伽梵达摩”译本的原始面貌。除此类藏经外，还有一些很重要且更准确的可参考文献。如与译经年代较接近的敦煌抄本、房山石经，以及与汉译本多有一致的西藏大藏经等。',
		booktype: ['经文'],
		bookstate: 0
	},
	{
		id: 6,
		name: '十万个为什么',
		author: '佚名',
		imgurl: require('./p6.jpg'),
		publisher: '少年儿童出版社出版',
		publication_year: '1961',
		price: 20,
		num: 100,
		cell: 8,
		introduction: '《十万个为什么》是少年儿童出版社在20世纪60年代初编辑出版的一套青少年科普读物，最新版本是第六版，第六版总主编是韩启德。50年来，这套书先后出版了6个版本，累计发行量超过1亿册，是新中国几代青少年的科学启蒙读物，已经成为中国原创科普图书的第一品牌。它在传播知识、普及科学方面发挥了积极的作用，影响几代青少年走上了科学的道路。受其影响，冠以“十万个为什么”的图书层出不穷，成为少儿科普类图书的代名词。',
		booktype: ['科普'],
		bookstate: 1
	},
	{
		id: 7,
		name: '三体',
		author: '刘慈欣',
		imgurl: require('./p7.jpg'),
		publisher: '科幻世界',
		publication_year: '2006',
		price: 50,
		num: 30,
		cell: 15,
		introduction: '《三体》是刘慈欣创作的长篇科幻小说系列，由《三体》《三体2：黑暗森林》《三体3：死神永生》组成，第一部于2006年5月起在《科幻世界》杂志上连载，第二部于2008年5月首次出版，第三部则于2010年11月出版。作品讲述了地球人类文明和三体文明的信息交流、生死搏杀及两个文明在宇宙中的兴衰历程。其第一部经过刘宇昆翻译后获得了第73届雨果奖最佳长篇小说奖',
		booktype: ['小说', '科幻'],
		bookstate: 1
	},
	{
		id: 8,
		name: '朝花夕拾',
		author: '鲁迅',
		imgurl: require('./p8.jpg'),
		publisher: '新华出版社',
		publication_year: '1922',
		price: 45,
		num: 20,
		cell: 15,
		introduction: '此文集作为“回忆的记事”，多侧面地反映了作者鲁迅青少年时期的生活，形象地反映了他的性格和志趣的形成经过。前七篇反映他童年时代在绍兴的家庭和私塾中的生活情景，后三篇叙述他从家乡到南京，又到日本留学，然后回国教书的经历；揭露了半封建半殖民地社会种种丑恶的不合理现象，同时反映了有抱负的青年知识分子在旧中国茫茫黑夜中，不畏艰险，寻找光明的困难历程，以及抒发了作者对往日亲友、师长的怀念之情。',
		booktype: ['散文'],
		bookstate: 1
	},
	{
		id: 9,
		name: '王维诗集',
		author: '王维',
		imgurl: require('./p9.jpg'),
		publisher: '未知',
		publication_year: '未知',
		price: 45,
		num: 20,
		cell: 15,
		introduction: '记录了王维的诗集',
		booktype: ['诗集'],
		bookstate: 1
	},
]

const bookTypeList = [
	{id:0,name:'小说',flag:false},
	{id:1,name:'科幻',flag:false},
	{id:2,name:'散文',flag:false},
	{id:3,name:'经文',flag:false},
	{id:4,name:'科普',flag:false},
	{id:5,name:'诗集',flag:false},
]
export default {
	bookList,
	bookTypeList,
	defaultBook

};
