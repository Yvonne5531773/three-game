//x越大，越里面；y越大，越上
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0
export const whiteMiddleblocks = [
	{  //3
		x: thickWidth+middleWidth-.3*offestX, y: 630, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //4
		x: thickWidth+2*middleWidth-2*offestX, y: 710, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //10
		x: thickWidth+3*middleWidth+5*fineWidth-8.6*offestX, y: 1310, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //11
		x: thickWidth+4*middleWidth+5*fineWidth-10.3*offestX, y: 1370, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //20
		x: 6*thickWidth+5*middleWidth+8*fineWidth-15.7*offestX, y: 1588, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]