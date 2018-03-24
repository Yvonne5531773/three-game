const offest = 1200,
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
		x: -100+2*middleWidth+fineWidth+offest-0.5*offestX, y: 502+offest+12*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+42*(duration), duration: duration
	},
	{  //L4
		x: -100+2*middleWidth+2*fineWidth+offest-1.6*offestX, y: 502+offest+16*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+44*(duration), duration: duration
	},
	{  //L5
		x: -100+2*middleWidth+3*fineWidth+offest-2.8*offestX, y: 502+offest+20*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+46*(duration), duration: duration
	},
	{  //L6
		x: -100+2*middleWidth+4*fineWidth+offest-4*offestX, y: 502+offest+34*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+48*(duration), duration: duration
	},
	{  //L7
		x: -100+2*middleWidth+5*fineWidth+offest-5.2*offestX, y: 502+offest+44*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+50*(duration), duration: duration
	},
	{  //L11
		x: -100+thickWidth+4*middleWidth+6*fineWidth+offest-9*offestX, y: 502+offest+104*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+61*(duration), duration: duration
	},
	{  //L12
		x: -100+thickWidth+4*middleWidth+7*fineWidth+offest-10*offestX, y: 502+offest+104*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+63*(duration), duration: duration
	},
	{  //L15
		x: -100+2*thickWidth+5*middleWidth+8*fineWidth+offest-13*offestX, y: 502+offest+108*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+68*(duration), duration: duration
	},
	{  //L18
		x: -100+3*thickWidth+6*middleWidth+9*fineWidth+offest-16*offestX, y: 502+offest+111.2*offestY, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0, animt: 1, direction: 0, delay: delay+72*(duration), duration: duration
	},

	{  //R4
		x: 520+offest+19.8*offestX, y: -175+thickWidth+middleWidth+fineWidth+offest-1.8*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+41*(duration), duration: duration
	},
	{  //R5
		x: 520+offest+31*offestX, y: -175+thickWidth+middleWidth+2*fineWidth+offest-3.2*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+43*(duration), duration: duration
	},
	{  //R6
		x: 520+offest+31*offestX, y: -175+thickWidth+middleWidth+3*fineWidth+offest-4.4*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+45*(duration), duration: duration
	},
	{  //R11
		x: 520+offest+43*offestX, y: -175+4*thickWidth+2*middleWidth+4*fineWidth+offest-7.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+53*(duration), duration: duration
	},
	{  //R15
		x: 520+offest+70*offestX, y: -175+4*thickWidth+5*middleWidth+5*fineWidth+offest-15*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+60*(duration), duration: duration
	},
	{  //R16
		x: 520+offest+75*offestX, y: -175+4*thickWidth+5*middleWidth+6*fineWidth+offest-16.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+62*(duration), duration: duration
	},
	{  //R17
		x: 520+offest+80*offestX, y: -175+4*thickWidth+5*middleWidth+7*fineWidth+offest-18*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+64*(duration), duration: duration
	},
	{  //R18
		x: 520+offest+103*offestX, y: -175+4*thickWidth+5*middleWidth+8*fineWidth+offest-19.5*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+67*(duration), duration: duration
	},
	{  //R19
		x: 520+offest+108*offestX, y: -175+4*thickWidth+5*middleWidth+9*fineWidth+offest-21*offestY, z: z, rotationX: rotationX, rotationY: rotationRY, rotationZ: 0, msort: 1, direction: 1, animt: 1, delay: delay+69*(duration), duration: duration
	},
]