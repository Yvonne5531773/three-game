const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0,
	delay = 1,
	duration = .4
export const whiteFineblocks = [
	{  //5
		x: thickWidth+2*middleWidth+fineWidth-1.2*offestX, y: 830, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+5*(duration), duration: duration
	},
	{  //6
		x: thickWidth+2*middleWidth+2*fineWidth-2.4*offestX, y: 860, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+7*(duration), duration: duration
	},
	{  //7
		x: thickWidth+2*middleWidth+3*fineWidth-3.6*offestX, y: 880, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+9*(duration), duration: duration
	},
	{  //8
		x: thickWidth+2*middleWidth+4*fineWidth-4.6*offestX, y: 960, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+11*(duration), duration: duration
	},
	{  //9
		x: thickWidth+2*middleWidth+5*fineWidth-5.6*offestX, y: 1050, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+13*(duration), duration: duration
	},
	{  //13
		x: 2*thickWidth+4*middleWidth+6*fineWidth-9.4*offestX, y: 1530, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+24*(duration), duration: duration
	},
	{  //14
		x: 2*thickWidth+4*middleWidth+7*fineWidth-10.8*offestX, y: 1530, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+26*(duration), duration: duration
	},
	{  //19
		x: 6*thickWidth+4*middleWidth+8*fineWidth-12*offestX, y: 1602, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, direction: 0, animt: 1, delay: delay+34*(duration), duration: duration
	},
]