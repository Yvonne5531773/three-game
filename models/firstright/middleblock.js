//x越大，越里面；y越大，越上
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10,
	offestY = 20,
	z = 0
export const whiteMiddleblocks = [
	{  //2
		x: 840+offestX, y: -20+middleWidth-.5*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //3
		x: 920+offestX, y: -20+2*middleWidth-2.3*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //10
		x: 1115+offestX, y: -20+3*thickWidth+3*middleWidth+3*fineWidth-6.8*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //12
		x: 1119+offestX, y: -20+3*thickWidth+4*middleWidth+4*fineWidth-9.7*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //13
		x: 1200+offestX, y: -20+3*thickWidth+5*middleWidth+4*fineWidth-11.5*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //14
		x: 1260+offestX, y: -20+3*thickWidth+6*middleWidth+4*fineWidth-13.3*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]