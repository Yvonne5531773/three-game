//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const offest = 1200,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = Math.PI* 0.5,
	rotationLY = Math.PI* 0.5,
	rotationY = Math.PI,
	z = 0
export const whiteThickblocks = [
	{  //L10
		x: -102+thickWidth+4*middleWidth+5*fineWidth+offest-11*offestX, y: 502+offest+86*offestY, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0
	},
	{  //L13
		x: -102+2*thickWidth+4*middleWidth+7*fineWidth+offest-13*offestX, y: 502+offest+100.5*offestY, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0
	},
	{  //L16
		x: -102+3*thickWidth+5*middleWidth+8*fineWidth+offest-16*offestX, y: 502+offest+108*offestY, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0
	},

	{  //R1
		x: 520+offest+1.4*offestX, y: -165+offest-offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R7
		x: 520+offest+28*offestX, y: -175+2*thickWidth+middleWidth+3*fineWidth+offest-7.5*offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R8
		x: 520+offest+34*offestX, y: -175+3*thickWidth+middleWidth+3*fineWidth+offest-7.5*offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},
	{  //R9
		x: 520+offest+40*offestX, y: -175+4*thickWidth+middleWidth+3*fineWidth+offest-7.5*offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1
	},

]