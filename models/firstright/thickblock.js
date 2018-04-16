//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10,
	offestY = 16,
	z = 2,
	delay = 1,
	duration = .4
export const whiteThickblocks = [
	{  //7
		x: 664+(middleWidth)+5.5*(fineWidth+1), y: thickWidth+2*middleWidth+3.5*(fineWidth+1)-offestY, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+10*(duration), duration: duration
	},
	{  //8
		x: 735+(middleWidth)+4.5*(fineWidth+1), y: 2*(thickWidth+1)+2*middleWidth+3.5*(fineWidth+1)-offestY/2, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+12*(duration), duration: duration
	},
	{  //9
		x: 735+(middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+2*middleWidth+3.5*(fineWidth+1)+1, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 1, delay: delay+14*(duration), duration: duration
	},
]