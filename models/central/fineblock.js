const offest = 1200,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = 1.6,
	rotationY = 1.6,
	z = -10
export const whiteFineblocks = [
	{  //L3
		x: -244+2*middleWidth+fineWidth+offest, y: 412+offest+12*offestY, z: -10, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L4
		x: -244+2*middleWidth+2*fineWidth+offest-1.2*offestX, y: 412+offest+16*offestY, z: -10, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L5
		x: -244+2*middleWidth+3*fineWidth+offest-2.4*offestX, y: 412+offest+20*offestY, z: -10, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L6
		x: -244+2*middleWidth+4*fineWidth+offest-3.6*offestX, y: 412+offest+34*offestY, z: -10, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L7
		x: -244+2*middleWidth+5*fineWidth+offest-4.8*offestX, y: 412+offest+44*offestY, z: -10, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //L10
		x: -244+thickWidth+4*middleWidth+6*fineWidth+offest-8*offestX, y: 412+offest+104*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},
	{  //L11
		x: -244+thickWidth+4*middleWidth+7*fineWidth+offest-9*offestX, y: 412+offest+104*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},
	{  //L13
		x: -244+2*thickWidth+5*middleWidth+8*fineWidth+offest-12*offestX, y: 412+offest+108*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},
	{  //L16
		x: -244+3*thickWidth+6*middleWidth+9*fineWidth+offest-14*offestX, y: 412+offest+111*offestY, z: z, rotationX: -rotationX, rotationY: 1.6, rotationZ: 0
	},

	{  //R4
		x: 380+offest+19.8*offestX, y: -275+thickWidth+middleWidth+fineWidth+offest-1.8*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R5
		x: 380+offest+31*offestX, y: -275+thickWidth+middleWidth+2*fineWidth+offest-3.2*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R6
		x: 380+offest+31*offestX, y: -275+thickWidth+middleWidth+3*fineWidth+offest-4.4*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R11
		x: 380+offest+44*offestX, y: -275+4*thickWidth+2*middleWidth+4*fineWidth+offest-6*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R14
		x: 380+offest+70*offestX, y: -275+4*thickWidth+5*middleWidth+5*fineWidth+offest-12*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R15
		x: 380+offest+75*offestX, y: -275+4*thickWidth+5*middleWidth+6*fineWidth+offest-13*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R16
		x: 380+offest+80*offestX, y: -275+4*thickWidth+5*middleWidth+7*fineWidth+offest-14*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R17
		x: 380+offest+103*offestX, y: -275+4*thickWidth+5*middleWidth+8*fineWidth+offest-15*offestY, z: z, rotationX: 1.6, rotationY: 3.14, rotationZ: 0, msort: 1, direction: 1
	},
	// {
	// 	x: 33+offest, y: 550+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 68+offest, y: 630+offest, z: 0, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 758+offest, y: 275+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 758+offest, y: 310+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 758+offest, y: 345+offest, z: 10, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 356+offest, y: 1190+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 389+offest, y: 1190+offest, z: -10, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 928+offest, y: 528+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 928+offest, y: 538+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 1018+offest, y: 578+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 740+offest, y: 1333+offest, z: -20, rotationX: -1.6, rotationY: 1.6, rotationZ: 0
	// },
	// {
	// 	x: 1088+offest, y: 610+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
	// {
	// 	x: 1148+offest, y: 630+offest, z: 0, rotationX: 1.6, rotationY: 3.14, rotationZ: 0
	// },
]