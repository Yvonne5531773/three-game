import { barricades } from "./central/barricades"
import { leftbarricades } from "./firstleft/leftbarricades"
import { rightbarricades } from "./firstright/rightbarricades"
import { diamentOffests } from './diament/diamentoffest'
import firstleft from './firstleft/index'
import firstright from './firstright/index'
import central from './central/index'
import config from '../config/index'

const materials = [
	{  //开始左横条
		name: 'LEFT_BARRICADE',
		url: config.modelSrc + "/leftbarricade.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		positions: leftbarricades,
		scale: 11
	},
	{  //开始右横条
		name: 'RIGHT_BARRICADE',
		url: config.modelSrc + "/rightbarricade.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		positions: rightbarricades,
		scale: 11
	},
	{  //中部横条
		name: 'BARRICADE',
		url: config.modelSrc + "/barricade.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		positions: barricades,
		scale: 11
	},
	{  //钢琴粗白块
		name: 'WHITE_THICK_BLOCKS',
		url: config.modelSrc + "/whitethickblock.json",
		material: {color: '#fff'},
		positions: firstleft.whiteThickblocks.concat(firstright.whiteThickblocks).concat(central.whiteThickblocks),
		scale: 11,
	},
	{  //钢琴中白块
		name: 'WHITE_MIDDLE_BLOCKS',
		url: config.modelSrc + "/whitemiddleblocks.json",
		material: {color: '#fff'},
		positions: firstleft.whiteMiddleblocks.concat(firstright.whiteMiddleblocks).concat(central.whiteMiddleblocks),
		scale: 11
	},
	{  //钢琴细白块
		name: 'WHITE_FINE_BLOCKS',
		url: config.modelSrc + "/whitefineblocks.json",
		material: {color: '#fff'},
		positions: firstleft.whiteFineblocks.concat(firstright.whiteFineblocks).concat(central.whiteFineblocks),
		scale: 11,
	},
	{  //钻石
		name: 'DIAMENT',
		url: config.modelSrc + "/diament.json",
		material: {color: '#f0efa5'},
		positions: diamentOffests[0],
		scale: 1200,
	},
	// {  //皇冠
	// 	name: 'CROWN',
	// 	url: config.modelSrc + "/crown.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //宝石
	// 	name: 'GEMSTONE',
	// 	url: config.modelSrc + "/gemstone.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //垂直线
	// 	name: 'STRING2',
	// 	url: config.modelSrc + "/string2.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //三角块
	// 	name: 'ENDHALFRESCALE',
	// 	url: config.modelSrc + "/endHalfRescale.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //方块
	// 	name: 'CUBE',
	// 	url: config.modelSrc + "/cube.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //钢琴锤
	// 	name: 'PIANOHAMMER',
	// 	url: config.modelSrc + "/pianoHammer.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //钢琴边境
	// 	name: 'PIANOBORDER',
	// 	url: config.modelSrc + "/pianoBorder.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// },
	// {  //后20%钢琴黑块
	// 	name: 'BARRICADE3',
	// 	url: config.modelSrc + "/blackKeysPart3.json",
	// 	material: {},
	// 	positions: [],
	// 	scale: 1,
	// }
]

export default {
	materials,
	diamentOffests,
}