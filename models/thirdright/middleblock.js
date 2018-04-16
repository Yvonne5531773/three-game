//x越大，越里面；y越大，越上
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10 + 5100,
	offestY = 20 + 4900,
	z = 2
export const whiteMiddleblocks = [
	{  //2
		x: 700+offestX+middleWidth, y: 480+middleWidth+offestY-offest, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //8
		x: 700+offestX+4.5*thickWidth+2*middleWidth+6*fineWidth, y: 490+2*middleWidth+4.5*fineWidth+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //9
		x: 700+offestX+4.5*thickWidth+3*middleWidth+6*fineWidth, y: 490+3*middleWidth+4.5*fineWidth+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]
