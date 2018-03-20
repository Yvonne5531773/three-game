//x越大，物体就越上; y越大，物体就越里面
//x = b/Math.cos(A); y = b* Math.tan(A); width = 88
const thickWidth = 85,
	middleWidth = 78,
	fineWidth = 43,
	offestX = 8,
	rotationX = Math.PI* 0.5,
	rotationY = Math.PI* 0.5,
	z = 0
export const whiteThickblocks = [
	{  //1
		x: 0, y: 540, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //2
		x: thickWidth, y: 540, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //12
		x: 2*thickWidth+4*middleWidth+5*fineWidth-11.6*offestX, y: 1410, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //15
		x: 3*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1503, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //16
		x: 4*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1540, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //17
		x: 5*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1575, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
	{  //18
		x: 6*thickWidth+4*middleWidth+7*fineWidth-14*offestX, y: 1575, z: z, rotationX: -rotationX, rotationY: rotationY, rotationZ: 0
	},
]