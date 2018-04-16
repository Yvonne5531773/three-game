//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const offest = 1136,
	thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	offestY = 8,
	rotationX = Math.PI* 0.5,
	rotationLY = Math.PI* 0.5,
	rotationY = Math.PI,
	z = 2,
	delay = 1,
	duration = .4
export const whiteThickblocks = [
	{  //L10
		x: -102+thickWidth+4*middleWidth+5*fineWidth+offest-11*offestX, y: 502+offest+84*offestY+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0, direction: 0, animt: 1, delay: delay+59*(duration), duration: duration
	},
	{  //L13
		x: -102+2*thickWidth+4*middleWidth+7*fineWidth+offest-13*offestX, y: 502+offest+98.7*offestY+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0, direction: 0, animt: 1, delay: delay+65*(duration), duration: duration
	},
	{  //L16
		x: -102+3*thickWidth+5*middleWidth+8*fineWidth+offest-16*offestX, y: 502+offest+116.6*offestY, z: z, rotationX: -rotationX, rotationY: rotationLY, rotationZ: 0, direction: 0, animt: 1, delay: delay+70*(duration), duration: duration
	},

	{  //R7
		x: 520+offest+29*offestX, y: -166+thickWidth+2*middleWidth+3*fineWidth+offest-5.3*offestX, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+47*(duration), duration: duration
	},
	{  //R8
		x: 520+offest+32*offestX+0.5*middleWidth, y: -175+3*thickWidth+middleWidth+3*fineWidth+offest-4.8*offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+49*(duration), duration: duration
	},
	{  //R9
		x: 520+offest+32*offestX+0.5*middleWidth, y: -175+4*thickWidth+middleWidth+3*fineWidth+offest-4.6*offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+51*(duration), duration: duration
	},

]