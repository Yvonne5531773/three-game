//x越大，越里面；y越大，越上
const thickWidth = 100,
	middleWidth = 92,
	fineWidth = 51,
	offest = 12,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10 + 5100,
	offestY = 20 + 4900,
	z = -20
export const whiteMiddleblocks = [
	{  //2
		x: 900+offestX, y: 460+thickWidth-1.4*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //8
		x: 1400+offestX, y: 460+middleWidth+thickWidth+5*fineWidth-10*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //9
		x: 1500+offestX, y: 460+2*middleWidth+thickWidth+5*fineWidth-12*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
]
