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
export const whiteFineblocks = [
	{  //L3
		x: -100+2*middleWidth+fineWidth+offest-0.5*offestX, y: 502+offest+12*offestY+1.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+42*(duration), duration: duration
	},
	{  //L4
		x: -100+2*middleWidth+2*fineWidth+offest-1.6*offestX, y: 502+offest+12*offestY+2.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+44*(duration), duration: duration
	},
	{  //L5
		x: -100+2*middleWidth+3*fineWidth+offest-2.8*offestX, y: 502+offest+12*offestY+3.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+46*(duration), duration: duration
	},
	{  //L6
		x: -100+2*middleWidth+4*fineWidth+offest-4*offestX, y: 502+offest+34*offestY+1.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+48*(duration), duration: duration
	},
	{  //L7
		x: -100+2*middleWidth+5*fineWidth+offest-5.2*offestX, y: 502+offest+44*offestY+1.5*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+50*(duration), duration: duration
	},
	{  //L11
		x: -100+thickWidth+4*middleWidth+6*fineWidth+offest-9*offestX, y: 502+offest+102*offestY+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+61*(duration), duration: duration
	},
	{  //L12
		x: -100+thickWidth+4*middleWidth+7*fineWidth+offest-10*offestX, y: 502+offest+102*offestY+2*fineWidth, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+63*(duration), duration: duration
	},
	{  //L15
		x: -100+2*thickWidth+5*middleWidth+8*fineWidth+offest-13*offestX, y: 502+offest+120*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+68*(duration), duration: duration
	},
	{  //L18
		x: -100+3*thickWidth+6*middleWidth+9*fineWidth+offest-16*offestX, y: 502+offest+120*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+72*(duration), duration: duration
	},

	{  //R4
		x: 520+offest+23*offestX, y: -166+2*middleWidth+fineWidth+offest, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+41*(duration), duration: duration
	},
	{  //R5
		x: 520+offest+32*offestX, y: -166+2*middleWidth+2*fineWidth+offest-offestX, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+43*(duration), duration: duration
	},
	{  //R6
		x: 520+offest+32.2*offestX, y: -166+2*middleWidth+3*fineWidth+offest-2.2*offestX, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+45*(duration), duration: duration
	},
	{  //R11
		x: 520+offest+40.2*offestX, y: -175+4*thickWidth+2.5*middleWidth+3.5*fineWidth+offest-6*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+53*(duration), duration: duration
	},
	{  //R15
		x: 520+offest+38.5*offestX+2*middleWidth+2*fineWidth, y: -175+4*thickWidth+5.5*middleWidth+5*fineWidth+offest-15*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+60*(duration), duration: duration
	},
	{  //R16
		x: 520+offest+38.5*offestX+2*middleWidth+2*fineWidth+thickWidth*.3, y: -175+4*thickWidth+5.5*middleWidth+6*fineWidth+offest-16.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+62*(duration), duration: duration
	},
	{  //R17
		x: 520+offest+38.5*offestX+2*middleWidth+2*fineWidth+thickWidth*.6, y: -175+4*thickWidth+5.5*middleWidth+7*fineWidth+offest-17.8*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+64*(duration), duration: duration
	},
	{  //R18
		x: 520+offest+38.5*offestX+3*middleWidth+3*fineWidth+thickWidth*1.4, y: -175+4*thickWidth+5.5*middleWidth+8*fineWidth+offest-19*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+67*(duration), duration: duration
	},
	{  //R19
		x: 520+offest+38.5*offestX+3*middleWidth+3*fineWidth+thickWidth*1.8, y: -175+4*thickWidth+5.5*middleWidth+9*fineWidth+offest-20.2*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+69*(duration), duration: duration
	},
]