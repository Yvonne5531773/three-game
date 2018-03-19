//x越大，越里面；y越大，越上
const offest = 1200,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = 1.6,
	rotationY = 1.6,
	rightOffest = 0,
	z = -10
export const whiteMiddleblocks = [
	{  //L1
		x: -244+middleWidth+offest+offestX, y: 342+offest+4*offestY, z: z, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{  //L2
		x: -244+2*middleWidth+offest-offestX, y: 412+offest+offestY, z: z, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	},
	{  //L8
		x: -244+3*middleWidth+5*fineWidth+offest-8*offestX, y: 412+offest+75*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L8
		x: -244+4*middleWidth+5*fineWidth+offest-9.5*offestX, y: 412+offest+82*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},

	{  //R2
		x: 380+offest+11*offestX, y: -275+thickWidth+offest-offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R3
		x: 380+offest+18*offestX, y: -275+thickWidth+middleWidth+offest-2.6*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R10
		x: 380+offest+42*offestX, y: -275+4*thickWidth+2*middleWidth+3*fineWidth+offest-6.8*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R12
		x: 380+offest+42.5*offestX, y: -275+4*thickWidth+3*middleWidth+4*fineWidth+offest-9.5*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R13
		x: 380+offest+50*offestX, y: -275+4*thickWidth+4*middleWidth+4*fineWidth+offest-11.2*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	// {  //右二
	// 	x: 598+offest, y: -150+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 2, direction: 1
	// },
	// {
	// 	x: 664+offest, y: 2+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 684+offest, y: 68+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 174+offest, y: 998+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 744+offest, y: 225+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 238+offest, y: 1040+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 308+offest, y: 1120+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 858+offest, y: 484+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 437+offest, y: 1190+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 506+offest, y: 1250+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 556+offest, y: 1300+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 705+offest, y: 1320+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 1194+offest, y: 678+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
]