//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const offest = 1200,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = 1.6,
	rotationY = 3.14,
	z = -10
export const whiteThickblocks = [
	{  //L9
		x: -244+thickWidth+4*middleWidth+5*fineWidth+offest-10*offestX, y: 412+offest+86*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},
	{  //L12
		x: -244+2*thickWidth+4*middleWidth+7*fineWidth+offest-12*offestX, y: 412+offest+100.5*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},
	{  //L14
		x: -244+3*thickWidth+5*middleWidth+8*fineWidth+offest-15*offestX, y: 412+offest+108*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},

	{  //R1
		x: 380+offest+1.4*offestX, y: -267+offest-offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R7
		x: 380+offest+28*offestX, y: -275+2*thickWidth+middleWidth+3*fineWidth+offest-7.2*offestY, z: z, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R8
		x: 380+offest+34*offestX, y: -275+3*thickWidth+middleWidth+3*fineWidth+offest-7*offestY, z: z, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R9
		x: 380+offest+40*offestX, y: -275+4*thickWidth+middleWidth+3*fineWidth+offest-6.6*offestY, z: z, rotationX: 1.6, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},

	// {
	// 	x: 648+offest+offestX, y: -75+offest+offestY, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 684+offest+offestX, y: 148+offest+offestY, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 98+offest+offestX, y: 838+offest+offestY, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 778+offest+offestX, y: 407+offest+offestY, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 630+offest+offestX, y: 1310+offest+offestY, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 805+offest+offestX, y: 1310+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
]