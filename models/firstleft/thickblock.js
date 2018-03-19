//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const offest = 1200,
	width = 85,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	yOffest = 2,
	rotationY = 1.6,
	rightOffest = 0
export const whiteThickblocks = [
	//左白块模型
	{  //1
		x: -140, y: 440, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //2
		x: -140+width, y: 440-yOffest, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //12
		x: -140+2*thickWidth+4*middleWidth+5*fineWidth-11.6*offestX, y: 1320, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //15
		x: -140+3*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1413, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //16
		x: -140+4*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1450, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //17
		x: -140+5*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1485, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //18
		x: -140+6*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1483, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
]