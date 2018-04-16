//x越大，越里面；y越大，越上
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 2,
	delay = 1,
	duration = .4
export const whiteMiddleblocks = [
	{  //1
		x: 0, y: 545, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //2
		x: middleWidth, y: 545, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 0, direction: 0
	},
	{  //3
		x: 2*middleWidth, y: 630, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+duration, duration: duration
	},
	{  //4
		x: 3*middleWidth, y: 685, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+3*(duration), duration: duration
	},
	{  //10
		x: 4*middleWidth+5*(fineWidth+1), y: 795+3*thickWidth+3*middleWidth+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+18*(duration), duration: duration
	},
	{  //11
		x: 5*middleWidth+5*(fineWidth+1), y: 795+3*thickWidth+4*middleWidth+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+20*(duration), duration: duration
	},
	{  //18
		x: 4.5*thickWidth+5.5*middleWidth+8*(fineWidth)+2.2*offestX, y: 841+3*thickWidth+5*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+33*(duration), duration: duration
	},
	{  //20
		x: 4.5*thickWidth+6.5*middleWidth+9*(fineWidth)+2.6*offestX, y: 841+3*thickWidth+5*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+35*(duration), duration: duration
	},
]