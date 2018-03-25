//x越大，越里面；y越大，越上
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0,
	initX = 5100 + 150,
	initY = 4900 + 1100
export const whiteMiddleblocks = [
	{  //1
		x: initX, y: initY , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},	
	{  //10
		x: 5*thickWidth+2*middleWidth+3*fineWidth + initX + 7.5*offestX, y: initY+100+middleWidth+3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //11
		x: 5*thickWidth+3*middleWidth+3*fineWidth + initX + 7.5*offestX, y: initY+100+2*middleWidth+3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //14
		x: 5*thickWidth+4*middleWidth+4.5*fineWidth + initX + 10.5*offestX, y: initY+100+0.5*thickWidth+2*middleWidth+7.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
