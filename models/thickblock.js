//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const offest = 1200,
	width = 85,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	yOffest = 2,
	rotationY = 1.6
export const whiteThickblocks = [
	//左白块模型
	{  //1
		x: -140, y: 440, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //2
		x: -140+width, y: 440-yOffest, z: 0, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //12
		x: -140+2*thickWidth+4*middleWidth+5*fineWidth-10*offestX, y: 1320, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //15
		x: -140+3*thickWidth+4*middleWidth+7*fineWidth-11*offestX, y: 1415, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //16
		x: -140+4*thickWidth+4*middleWidth+7*fineWidth-11*offestX, y: 1450, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //17
		x: -140+5*thickWidth+4*middleWidth+7*fineWidth-11*offestX, y: 1485, z: -15, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},

	//右白块模型
	{  //1
		x: 590, y: -120, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //7
		x: 855, y: -120+thickWidth+2*middleWidth+3*fineWidth-6.5*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //8
		x: 900, y: -120+2*thickWidth+2*middleWidth+3*fineWidth-6.5*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //9
		x: 950, y: -120+3*thickWidth+2*middleWidth+3*fineWidth-6.5*offestX, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},

	//中间区域
	{  //左一
		x: -115+offest, y: 440+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{  //左二
		x: -28+offest, y: 438+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{  //右一
		x: 498+offest, y: -220+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{
		x: 648+offest, y: -75+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 684+offest, y: 148+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 98+offest, y: 838+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 778+offest, y: 407+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	},
	{
		x: 630+offest, y: 1310+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{
		x: 805+offest, y: 1310+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
]