//x越大，越里面；y越大，越上
const offest = 1400,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationY = 1.6
export const whiteMiddleblocks = [
	{  //3
		x: -140+thickWidth+middleWidth, y: 540, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: -140+thickWidth+2*middleWidth-offestX, y: 620, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //10
		x: -140+thickWidth+3*middleWidth+5*fineWidth-6*offestX, y: 1220, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
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