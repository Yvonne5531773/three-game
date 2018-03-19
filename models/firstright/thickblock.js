//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offest = 8,
	rotationY = 3.14,
	offestX = -10,
	offestY = 20
export const whiteThickblocks = [
	{  //1
		x: 590+offestX, y: -120+offestY, z: -10, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //7
		x: 855+offestX, y: -120+thickWidth+2*middleWidth+3*fineWidth-7*offest+offestY, z: -10, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //8
		x: 900+offestX, y: -120+2*thickWidth+2*middleWidth+3*fineWidth-6.8*offest+offestY, z: -10, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //9
		x: 950+offestX, y: -120+3*thickWidth+2*middleWidth+3*fineWidth-6.5*offest+offestY, z: -10, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]