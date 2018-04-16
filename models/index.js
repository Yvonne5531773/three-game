import { barricades } from "./central/barricades"
import { leftbarricades } from "./firstleft/leftbarricades"
import { rightbarricades } from "./firstright/rightbarricades"
import { diamentOffests } from './diament/diament'
import { crownOffests } from './crown/crown'
import { leftbarricade } from "../asset/jsons/leftbarricade"
import { rightbarricade } from "../asset/jsons/rightbarricade"
import { barricade } from "../asset/jsons/barricade"
import { whitethickblock } from "../asset/jsons/whitethickblock"
import { whitemiddleblock } from "../asset/jsons/whitemiddleblock"
import { whitefineblock } from "../asset/jsons/whitefineblock"
import { barricade3 } from "../asset/jsons/barricade3"
import { diament } from "../asset/jsons/diament"
import { crown } from "../asset/jsons/crown"
import { blackKeysPart3 } from "./blackKeysPart3/blackKeysPart3"
import firstleft from './firstleft/index'
import firstright from './firstright/index'
import central from './central/index'
import config from '../config/index'
import thirdleft from './thirdleft/index'
import thirdright from './thirdright/index'

const materials = [
	// {  //开始左横条
	// 	name: 'LEFT_BARRICADE',
	// 	url: config.modelSrc + "/leftbarricade.json",
	// 	material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
	// 	positions: leftbarricades,
	// 	scale: 11,
	// 	json: leftbarricade
	// },
	// {  //开始右横条
	// 	name: 'RIGHT_BARRICADE',
	// 	url: config.modelSrc + "/rightbarricade.json",
	// 	material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
	// 	positions: rightbarricades,
	// 	scale: 11,
	// 	json: rightbarricade
	// },
	// {  //中部横条
	// 	name: 'BARRICADE',
	// 	url: config.modelSrc + "/barricade.json",
	// 	material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
	// 	positions: barricades,
	// 	scale: 11,
	// 	json: barricade
	// },
	// {  //钢琴粗白块
	// 	name: 'WHITE_THICK_BLOCKS',
	// 	url: config.modelSrc + "/whitethickblock.json",
	// 	material: {color: '#fff'},
	// 	positions: firstleft.whiteThickblocks.concat(firstright.whiteThickblocks).concat(central.whiteThickblocks).concat(thirdleft.whiteThickblocks).concat(thirdright.whiteThickblocks),
	// 	scale: 11,
	// 	json: whitethickblock
	// },
	// {  //钢琴中白块
	// 	name: 'WHITE_MIDDLE_BLOCKS',
	// 	url: config.modelSrc + "/whitemiddleblocks.json",
	// 	material: {color: '#fff'},
	// 	positions: firstleft.whiteMiddleblocks.concat(firstright.whiteMiddleblocks).concat(central.whiteMiddleblocks).concat(thirdleft.whiteMiddleblocks).concat(thirdright.whiteMiddleblocks),
	// 	scale: 11,
	// 	json: whitemiddleblock
	// },
	// {  //钢琴细白块
	// 	name: 'WHITE_FINE_BLOCKS',
	// 	url: config.modelSrc + "/whitefineblocks.json",
	// 	material: {color: '#fff'},
	// 	positions: firstleft.whiteFineblocks.concat(firstright.whiteFineblocks).concat(central.whiteFineblocks).concat(thirdleft.whiteFineblocks).concat(thirdright.whiteFineblocks),
	// 	scale: 11,
	// 	json: whitefineblock
	// },
	// {  //钻石
	// 	name: 'DIAMENT',
	// 	url: config.modelSrc + "/diament.json",
	// 	material: {color: '#f0efa5'},
	// 	positions: diamentOffests,
	// 	scale: 1200,
	// 	json: diament
	// },
	// {  //皇冠
	// 	name: 'CROWN',
	// 	url: config.modelSrc + "/crown.json",
	// 	material: {},
	// 	positions: crownOffests,
	// 	scale: 100,
	// 	json: crown
	// },
	// {  //后20%钢琴黑块
	// 	name: 'BARRICADE3',
	// 	url: config.modelSrc + "/blackKeysPart3.json",
	// 	material: {color: '#9c9c9c'},
	// 	positions: blackKeysPart3,
	// 	scale: 11,
	// 	json: barricade3
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
	// 	positions: hammerOffests,
	// 	scale: 50,
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
	materials
}
