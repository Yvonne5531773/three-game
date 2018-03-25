//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offest = 12,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10 + 5100,
	offestY = 20 + 4900,
	z = 0
export const whiteThickblocks = [
	{  //1
		x: 700+offestX-middleWidth/3, y: 460+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //10
		x: 700+offestX+4.5*thickWidth+3.5*middleWidth+7*fineWidth, y: 490+thickWidth+3*middleWidth+4.5*fineWidth+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]
