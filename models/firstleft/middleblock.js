//x越大，越里面；y越大，越上
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationY = 1.6
export const whiteMiddleblocks = [
	{  //3
		x: -140+thickWidth+middleWidth-.3*offestX, y: 540, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: -140+thickWidth+2*middleWidth-2*offestX, y: 620, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //10
		x: -140+thickWidth+3*middleWidth+5*fineWidth-8.6*offestX, y: 1220, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //11
		x: -140+thickWidth+4*middleWidth+5*fineWidth-10.3*offestX, y: 1280, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
	{  //20
		x: -140+6*thickWidth+5*middleWidth+8*fineWidth-15.7*offestX, y: 1492, z: -10, rotationX: -1.6, rotationY: rotationY, rotationZ: 0
	},
]