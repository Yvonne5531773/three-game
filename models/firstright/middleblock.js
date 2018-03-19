//x越大，越里面；y越大，越上
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offest = 8,
	rotationX = 1.6,
	rotationY = 3.14,
	offestX = -10,
	offestY = 20
export const whiteMiddleblocks = [
	{  //2
		x: 690+offestX, y: -120+middleWidth-.5*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //3
		x: 770+offestX, y: -120+2*middleWidth-2.3*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //10
		x: 965+offestX, y: -120+3*thickWidth+3*middleWidth+3*fineWidth-6.8*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //12
		x: 969+offestX, y: -120+3*thickWidth+4*middleWidth+4*fineWidth-9.7*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //13
		x: 1050+offestX, y: -120+3*thickWidth+5*middleWidth+4*fineWidth-11.5*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //14
		x: 1120+offestX, y: -120+3*thickWidth+6*middleWidth+4*fineWidth-13.3*offest+offestY, z: 0, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]