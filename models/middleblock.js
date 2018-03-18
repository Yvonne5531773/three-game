//x越大，越里面；y越大，越上
const offest = 1400,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationY = 1.6
export const whiteMiddleblocks = [
	{  //3
		x: -140+thickWidth+middleWidth-.3*offestX, y: 540, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: -140+thickWidth+2*middleWidth-2*offestX, y: 620, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //10
		x: -140+thickWidth+3*middleWidth+5*fineWidth-7*offestX, y: 1220, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //11
		x: -140+thickWidth+4*middleWidth+5*fineWidth-9*offestX, y: 1280, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //18
		x: -140+5*thickWidth+5*middleWidth+7*fineWidth-11*offestX, y: 1495, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //20
		x: -140+5*thickWidth+6*middleWidth+8*fineWidth-13*offestX, y: 1490, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},

	{  //2
		x: 690, y: -120+middleWidth-.5*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //3
		x: 770, y: -120+2*middleWidth-2*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //10
		x: 965, y: -120+3*thickWidth+3*middleWidth+3*fineWidth-7*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //12
		x: 970, y: -120+3*thickWidth+4*middleWidth+4*fineWidth-10*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //13
		x: 1050, y: -120+3*thickWidth+5*middleWidth+4*fineWidth-11.5*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //14
		x: 1120, y: -120+3*thickWidth+6*middleWidth+4*fineWidth-13*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},

	{  //右二
		x: 598+offest, y: -150+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 2, direction: 1
	},
	{
		x: 664+offest, y: 2+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 684+offest, y: 68+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 174+offest, y: 998+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 744+offest, y: 225+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 238+offest, y: 1040+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 308+offest, y: 1120+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 858+offest, y: 484+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 437+offest, y: 1190+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 506+offest, y: 1250+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 556+offest, y: 1300+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 705+offest, y: 1320+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 1194+offest, y: 678+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
]