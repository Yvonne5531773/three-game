const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0,
	initX = 5100 + 150,
	initY = 4900 + 1100
export const whiteFineblocks = [
	{  //3
		x: middleWidth + 2*fineWidth + 1.5*offestX  + initX, y: initY + 100 , z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: middleWidth + 3*fineWidth + 2*offestX  + initX, y: initY + 100 +fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //12
		x: 5*thickWidth+3*middleWidth+4*fineWidth + initX + 10*offestX, y: initY+100+0.5*thickWidth+2*middleWidth+5.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //13
		x: 5*thickWidth+3*middleWidth+5*fineWidth + initX + 10.5*offestX, y: initY+100+0.5*thickWidth+2*middleWidth+6.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //15
		x: 5*thickWidth+4*middleWidth+6*fineWidth + initX + 11*offestX, y: initY+100+0.5*thickWidth+2*middleWidth+7.5*fineWidth+3*offestX, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
