const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0,
	initX = 5100 + 150,
	initY = 4900 + 1100
export const whiteThickblocks = [
	{  //2
		x: middleWidth + 1.5*offestX + initX, y: initY + 40, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //5
		x: thickWidth+middleWidth+3*fineWidth + initX, y: initY + 100 +fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //6
		x: 2*thickWidth+middleWidth+3*fineWidth + initX + 1.5*offestX, y: initY + 100 + 2*fineWidth,z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //7
		x: 3*thickWidth+middleWidth+3*fineWidth + initX + 3*offestX, y: initY + 100 + 3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //8
		x: 4*thickWidth+middleWidth+3*fineWidth + initX + 4.5*offestX, y: initY + 100 + 3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //9
		x: 5*thickWidth+middleWidth+3*fineWidth + initX + 6*offestX, y: initY + 100 + 3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]
