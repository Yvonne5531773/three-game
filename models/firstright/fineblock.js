const thickWidth = 75,
	middleWidth = 64,
	fineWidth = 31,
	offest = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI,
	offestX = -10,
	offestY = 20,
	z = 2,
	delay = 1,
	duration = .4
export const whiteFineblocks = [
	{  //4
		x: 690+(middleWidth)+2.5*(fineWidth), y: 2*middleWidth+1.5*fineWidth+1, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+5*(duration), duration: duration
	},
	{  //5
		x: 690+(middleWidth)+5.5*(fineWidth+1), y: 2*middleWidth+2.5*(fineWidth+1), z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+6*(duration), duration: duration
	},
	{  //6
		x: 690+(middleWidth)+5.5*(fineWidth+1), y: 2*middleWidth+3.5*(fineWidth+1), z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+8*(duration), duration: duration
	},
	{  //11
		x: 762+(middleWidth)+5.5*(fineWidth+1), y: 3*(thickWidth+1)+3*middleWidth+5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+16*(duration), duration: duration
	},
	{  //15
		x: 748+thickWidth+(2*middleWidth)+8*(fineWidth+1), y: 3*(thickWidth+1)+6.5*middleWidth+5*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+23*(duration), duration: duration
	},
	{  //16
		x: 748+1.3*thickWidth+(2*middleWidth)+8*(fineWidth+1), y: 3*(thickWidth+1)+6.5*middleWidth+6*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+25*(duration), duration: duration
	},
	{  //17
		x: 748+1.6*thickWidth+(2*middleWidth)+8*(fineWidth+1), y: 3*(thickWidth+1)+6.5*middleWidth+7*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+27*(duration), duration: duration
	},
	{  //18
		x: 748+3*thickWidth+(2*middleWidth)+8*(fineWidth+1), y: 3*(thickWidth+1)+6.5*middleWidth+8*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+29*(duration), duration: duration
	},
	{  //19
		x: 748+4.3*thickWidth+(2*middleWidth)+8*(fineWidth+1), y: 3*(thickWidth+1)+6.5*middleWidth+9*(fineWidth+1)+11, z: z, rotationX: rotationX, rotationY: rotationY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+31*(duration), duration: duration
	},
]