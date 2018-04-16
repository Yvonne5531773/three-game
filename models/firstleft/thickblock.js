//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 2,
	delay = 1,
	duration = .4
export const whiteThickblocks = [
	{  //12
		x: thickWidth+5*middleWidth+5*(fineWidth+1), y: 845+3*thickWidth+4*middleWidth+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+22*(duration), duration: duration
	},
	{  //15
		x: 2*thickWidth+5*middleWidth+7.5*(fineWidth)+5, y: 828+3*thickWidth+4*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+28*(duration), duration: duration
	},
	{  //16
		x: 3*thickWidth+5*middleWidth+8*(fineWidth), y: 828+3*thickWidth+5*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+30*(duration), duration: duration
	},
	{  //17
		x: 4*thickWidth+5*middleWidth+8*(fineWidth)+1.5*offestX, y: 828+3*thickWidth+5*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+32*(duration), duration: duration
	},
]