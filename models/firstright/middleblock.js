//x越大，越里面；y越大，越上
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -50,
	offestY = 20,
	z = 2,
	delay = 1,
	duration = .45
export const whiteMiddleblocks = [
	{  //1
		x: 690, y: 0, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay, duration: duration
	},
	{  //2
		x: 690+(middleWidth), y: middleWidth, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+2*(duration), duration: duration
	},
	{  //3
		x: 690+(middleWidth)+2*(fineWidth), y: 2*middleWidth, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+4*(duration), duration: duration
	},
	{  //10
		x: 748+(middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+3*middleWidth+3.5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+15*(duration), duration: duration
	},
	{  //12
		x: 748+(middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+4*middleWidth+4.5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+17*(duration), duration: duration
	},
	{  //13
		x: 748+(2*middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+5*middleWidth+4.5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+19*(duration), duration: duration
	},
	{  //14
		x: 748+thickWidth+(2*middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+6*middleWidth+4.5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+21*(duration), duration: duration
	},
]