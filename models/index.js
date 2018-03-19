import { barricades } from "./central/barricades"
import { leftbarricades } from "./firstleft/leftbarricades"
import { rightbarricades } from "./firstright/rightbarricades"
import { foodOffests } from './food/foodoffest'
import firstleft from './firstleft/index'
import firstright from './firstright/index'
import central from './central/index'

const materials = [
	{  //开始左横条
		name: 'LEFT_BARRICADE',
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/13.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		blocks: leftbarricades,
		scale: 11
	},
	{  //开始右横条
		name: 'RIGHT_BARRICADE',
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/4.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		blocks: rightbarricades,
		scale: 11
	},
	{  //钢琴横条
		name: 'BARRICADE',
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/barricade.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		blocks: barricades,
		scale: 11
	},
	{  //钢琴粗白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitethickblock.json",
		material: {color: '#fff'},
		blocks: firstleft.whiteThickblocks.concat(firstright.whiteThickblocks).concat(central.whiteThickblocks),
		scale: 11,
		name: 'WHITE_THICK_BLOCKS'
	},
	{  //钢琴中白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitemiddleblocks.json",
		material: {color: '#fff'},
		blocks: firstleft.whiteMiddleblocks.concat(firstright.whiteMiddleblocks).concat(central.whiteMiddleblocks),
		scale: 11
	},
	{  //钢琴细白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitefineblocks.json",
		material: {color: '#fff'},
		blocks: firstleft.whiteFineblocks.concat(firstright.whiteFineblocks).concat(central.whiteFineblocks),
		scale: 11
	},
	{  //食物
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/food.json",
		material: {color: '#f0efa5'},
		blocks: foodOffests[0],
		scale: 1200,
		name: 'FOOD'
	}
]

export default {
	materials,
	foodOffests,
}