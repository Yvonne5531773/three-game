//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 100,
	middleWidth = 92,
	fineWidth = 51,
	offest = 12,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10 + 5100,
	offestY = 20 + 4900,
	z = -20
export const whiteThickblocks = [
	{  //1
		x: 820+offestX, y: 460+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //10
		x: 1600+offestX, y: 460+3*middleWidth+thickWidth+5*fineWidth-12.2*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]
