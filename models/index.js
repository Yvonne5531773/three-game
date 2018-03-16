import { barricades } from "./barricades";
import { foodOffests } from './foodoffest'
import { whiteThickblocks } from './thickblock'
import { whiteMiddleblocks } from './middleblock'
import { whiteFineblocks } from './fineblock'

const materials = [
	{  //钢琴横条
		name: 'BARRICADE',
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/barricade.json",
		material: {color: '#9c9c9c', transparent: false, opacity: 0.1},
		blocks: barricades,
		scale: 10
	},
	{  //钢琴粗白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitethickblock.json",
		material: {color: '#fff'},
		blocks: whiteThickblocks,
		scale: 11,
		name: 'WHITE_THICK_BLOCKS'
	},
	{  //钢琴中白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitemiddleblocks.json",
		material: {color: '#fff'},
		blocks: whiteMiddleblocks,
		scale: 11
	},
	{  //钢琴细白块
		url: "http://act.cmcmcdn.com/liebao/wechatGame/danceline/materials/whitefineblocks.json",
		material: {color: '#fff'},
		blocks: whiteFineblocks,
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
	barricades,
	foodOffests,
	whiteThickblocks,
	whiteMiddleblocks,
	whiteFineblocks
}