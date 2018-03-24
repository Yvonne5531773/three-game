//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10,
	offestY = 20,
	z = 0,
	delay = 1,
	duration = .4
export const whiteThickblocks = [
	{  //1
		x: 740+offestX, y: -20+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay, duration: duration
	},
	{  //7
		x: 1005+offestX, y: -20+thickWidth+2*middleWidth+3*fineWidth-7*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+10*(duration), duration: duration
	},
	{  //8
		x: 1050+offestX, y: -20+2*thickWidth+2*middleWidth+3*fineWidth-6.8*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+12*(duration), duration: duration
	},
	{  //9
		x: 1100+offestX, y: -20+3*thickWidth+2*middleWidth+3*fineWidth-6.5*offest+offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+14*(duration), duration: duration
	},
]