//x越大，越里面；y越大，越上
const offest = 1136,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	rotationRY = Math.PI,
	z = 0,
	delay = 1,
	duration = .4
export const whiteMiddleblocks = [
	{  //L1
		x: -88+middleWidth+offest-offestX, y: 432+offest+5*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+37*(duration), duration: duration
	},
	{  //L2
		x: -102+2*middleWidth+offest-offestX, y: 432+offest+5*offestY+middleWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+39*(duration), duration: duration
	},
	{  //L8
		x: -106+3*middleWidth+5*fineWidth+offest-8*offestX, y: 502+offest+73*offestY+middleWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+55*(duration), duration: duration
	},
	{  //L9
		x: -106+4*middleWidth+5*fineWidth+offest-9.5*offestX, y: 502+offest+80*offestY+middleWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+57*(duration), duration: duration
	},
	{  //L14
		x: -106+2*thickWidth+5*middleWidth+7*fineWidth+offest-13*offestX, y: 502+offest+100.3*offestY+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+66*(duration), duration: duration
	},
	{  //L17
		x: -106+3*thickWidth+6*middleWidth+8*fineWidth+offest-16*offestX, y: 502+offest+118.2*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+71*(duration), duration: duration
	},
	{  //L19
		x: -106+3*thickWidth+7*middleWidth+9*fineWidth+offest-19*offestX, y: 502+offest+118.2*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+73*(duration), duration: duration
	},

	{  //R1
		x: 520+offest+12*offestX-middleWidth, y: -222+thickWidth+offest-offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+36*(duration), duration: duration
	},
	{  //R2
		x: 520+offest+11*offestX, y: -158+thickWidth+offest-offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+38*(duration), duration: duration
	},
	{  //R3
		x: 520+offest+21*offestX, y: -158+thickWidth+offest+middleWidth-2.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+40*(duration), duration: duration
	},
	{  //R10
		x: 520+offest+38.5*offestX, y: -175+4*thickWidth+2*middleWidth+3*fineWidth+offest-4.7*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+52*(duration), duration: duration
	},
	{  //R12
		x: 520+offest+38.5*offestX, y: -175+4*thickWidth+3*middleWidth+5*fineWidth+offest-12.8*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+54*(duration), duration: duration
	},
	{  //R13
		x: 520+offest+38.5*offestX+middleWidth, y: -175+4*thickWidth+4*middleWidth+5*fineWidth+offest-14.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+56*(duration), duration: duration
	},
	{  //R14
		x: 520+offest+38.5*offestX+2*middleWidth, y: -175+4*thickWidth+5*middleWidth+5*fineWidth+offest-16.2*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+58*(duration), duration: duration
	},

]