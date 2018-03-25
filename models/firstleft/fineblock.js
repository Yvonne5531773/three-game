const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0,
	delay = 1,
	duration = .45
export const whiteFineblocks = [
	{  //5
		x: 3*middleWidth+1.5*fineWidth+1, y: 795, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+5*(duration), duration: duration
	},
	{  //6
		x: 3*middleWidth+2.5*(fineWidth+1), y: 795+thickWidth/2, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+7*(duration), duration: duration
	},
	{  //7
		x: 3*middleWidth+3.5*(fineWidth+1), y: 795+thickWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+9*(duration), duration: duration
	},
	{  //8
		x: 3*middleWidth+4.5*(fineWidth+1), y: 795+2*thickWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+11*(duration), duration: duration
	},
	{  //9
		x: 3*middleWidth+5.5*(fineWidth+1), y: 795+3*(thickWidth+3)+offestX, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+13*(duration), duration: duration
	},
	{  //13
		x: thickWidth+5*middleWidth+7*(fineWidth)+3, y: 855+3*thickWidth+4*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+24*(duration), duration: duration
	},
	{  //14
		x: thickWidth+5*middleWidth+8*(fineWidth)+5, y: 855+3*thickWidth+4*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+26*(duration), duration: duration
	},
	{  //19
		x: 4.5*thickWidth+6*middleWidth+8.5*(fineWidth)+2.5*offestX, y: 855+3*thickWidth+5*middleWidth+5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+34*(duration), duration: duration
	},
]